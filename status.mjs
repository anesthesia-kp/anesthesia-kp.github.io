#!/usr/bin/env node
// status.mjs — regenerates the STATUS block in TODO.md from the facts themselves.
//
// WHY: build numbers, push state and suite counts used to be hand-typed in up to five
// files, and each copy rotted on its own schedule (the 16 Aug audit found tables 12
// builds stale presented as current). A generated number cannot disagree with itself.
//
// RUN: from this repo's folder, on the owner's machine or in a session:
//     node status.mjs
// Reads the sibling repos, runs READ-ONLY git (--no-optional-locks), counts suites,
// and best-effort fetches the live versions.json (5s timeout, cache-busted). Then
// rewrites ONLY the block between the STATUS markers in TODO.md.
//
// It never writes anything else, never runs a mutating git command, never deploys.

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const GH = join(here, '..');
const REPOS = {
  auction:  join(GH, 'vacation-kp.github.io'),
  schedule: join(GH, 'schedule'),
  tests:    join(GH, 'tests'),
  master:   here,
};

const buildOf = f => {
  try { return (readFileSync(f, 'utf8').match(/var\s+BUILD\s*=\s*(\d+)/) || [])[1] ?? '?'; }
  catch { return '?'; }
};
const jsonOf = f => { try { return JSON.parse(readFileSync(f, 'utf8')); } catch { return {}; } };
const git = (repo, args) => {
  try { return execSync(`git --no-optional-locks -C "${repo}" ${args}`, { encoding: 'utf8', timeout: 15000 }).trim(); }
  catch { return '(git unavailable)'; }
};
const dirty = repo => {
  const out = git(repo, 'status --short');
  if (out === '(git unavailable)') return out;
  const lines = out.split('\n').filter(Boolean);
  return lines.length ? `${lines.length} uncommitted file(s)` : 'clean';
};
const sync = repo => {
  const out = git(repo, 'status --short --branch');
  if (out.includes('ahead')) return 'AHEAD of origin — push pending';
  if (out.includes('behind')) return 'BEHIND origin';
  return 'in sync with origin';
};
const locks = repo => {
  try {
    const gd = join(repo, '.git');
    const found = [];
    for (const f of readdirSync(gd)) if (f.endsWith('.lock')) found.push(f);
    return found.length ? `⚠️ STALE LOCK: ${found.join(', ')}` : 'no locks';
  } catch { return '?'; }
};
const countSuites = (dir, pattern) => {
  try { return readdirSync(dir).filter(f => pattern.test(f)).length; } catch { return '?'; }
};

// --- gather ---------------------------------------------------------------
const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
const vJson = jsonOf(join(REPOS.auction, 'versions.json'));
const sJson = jsonOf(join(REPOS.schedule, 'versions.json'));
const disk = {
  aAdmin: buildOf(join(REPOS.auction, 'admin', 'index.html')),
  aStaff: buildOf(join(REPOS.auction, 'index.html')),
  sAdmin: buildOf(join(REPOS.schedule, 'admin', 'index.html')),
  sStaff: buildOf(join(REPOS.schedule, 'index.html')),
};
const auctionSuites = countSuites(REPOS.tests, /^test-.*\.mjs$/);
const schedSuites = countSuites(join(REPOS.tests, 'sched'), /-test\.mjs$/);

// --- THE START-HERE FRESHNESS GATE (added 24 Aug 2026) --------------------
// WHY: START-HERE.md is the ONLY document the owner pastes, so a stale copy mis-briefs
// every fresh session at the exact moment it is trusted most. On 24 Aug it was quoting
// schedule builds four behind while TODO.md was correct. Prose cannot police itself.
// This checks TWO things and FAILS THE RUN (exit 3) if either disagrees:
//   A. every build number START-HERE claims is LIVE, against versions.json;
//   B. its LAST REVISED date, against when the file was actually last changed.
// The STATUS block is still written first — the non-zero exit IS the gate, not an error.
// Testability: SH_PATH=<file> points the gate at another copy (e.g. the previous version,
// to prove the gate FAILS on it) and suppresses the write to TODO.md.
let _pending = null;
// A build FILED into the working tree, or committed and not yet pushed, means versions.json
// on disk is ahead of the served site. Cached because dirty()/sync() shell out to git.
function pendingPush() {
  if (_pending === null) _pending = [REPOS.auction, REPOS.schedule].some(r => dirty(r) !== 'clean' || sync(r) !== 'in sync with origin');
  return _pending;
}
const shPath = process.env.SH_PATH || join(here, 'START-HERE.md');
const shStale = [];
let shDate = '(no LAST REVISED line)';
let shDateHow = 'git';
const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
try {
  const raw = readFileSync(shPath, 'utf8');
  // Normalise blockquote markers and line wrapping away, so a claim that wraps across
  // lines still matches. START-HERE is hand-wrapped and re-wraps constantly.
  const flat = raw.replace(/^[ \t]*>[ \t]?/gm, ' ').replace(/\s+/g, ' ');

  // --- A. the build numbers it quotes as live -----------------------------
  // FILED IS NOT LIVE. Between Claude filing a build and the owner pushing it, versions.json
  // on disk is AHEAD of the served site — so comparing START-HERE's "LIVE, verified" line
  // against disk in that window would fail a line that is perfectly true. In that window the
  // gate asks a different, better question instead: does START-HERE SAY a build is filed and
  // waiting, and name it? And once the push lands, that marker must be GONE — a stale
  // "awaiting push" note is the same rot in the other direction.
  const want = {
    'auction admin': String(vJson.admin), 'auction staff': String(vJson.index),
    'auction mobile': String(vJson.mobile),
    'schedule admin': String(sJson.admin), 'schedule staff': String(sJson.index),
  };
  const claims = [
    { name: 'the header LIVE line',
      re: /LIVE, verified cache-busted TWICE: auction admin (\d+) . staff \(index\) (\d+) . mobile (\d+) . schedule admin (\d+) \/ staff (\d+)/,
      order: ['auction admin', 'auction staff', 'auction mobile', 'schedule admin', 'schedule staff'] },
    { name: 'the WHERE TO START "LIVE NOW" line',
      re: /LIVE NOW[^:]*: auction staff (\d+) \/ admin (\d+) \/ mobile (\d+) . schedule admin (\d+) \/ staff (\d+)/,
      order: ['auction staff', 'auction admin', 'auction mobile', 'schedule admin', 'schedule staff'] },
  ];
  // What START-HERE's two live lines actually claim for a given thing — used both by the
  // filed-vs-live check above and by the comparison below.
  function claimsSay(what) {
    for (const c of claims) {
      const m = flat.match(c.re);
      if (!m) continue;
      const i = c.order.indexOf(what);
      if (i >= 0) return m[i + 1];
    }
    return null;
  }
  for (const c of claims) {
    const m = flat.match(c.re);
    if (!m) {
      shStale.push(`${c.name} no longer has the shape this gate reads. Fix the line, or fix status.mjs — a gate that cannot find its target is NOT a pass (START-HERE §6).`);
      continue;
    }
    if (!pendingPush()) c.order.forEach((k, i) => {
      if (m[i + 1] !== want[k]) shStale.push(`${c.name} says ${k} ${m[i + 1]}; versions.json says ${want[k]}`);
    });
  }

  const pending = pendingPush();
  const filedMark = /FILED, NOT YET PUSHED:([^\n]*)/.exec(raw);
  if (pending) {
    if (!filedMark) shStale.push('a build is FILED BUT NOT PUSHED and START-HERE does not say so. Add a "FILED, NOT YET PUSHED: <what>" line naming it, so a fresh session cannot read the live line as covering it.');
    else {
      const said = filedMark[1];
      for (const [what, n] of [['auction admin', vJson.admin], ['auction staff', vJson.index], ['schedule admin', sJson.admin], ['schedule staff', sJson.index]]) {
        const claimed = new RegExp('\\b' + n + '\\b').test(said);
        const live = claimsSay(what);
        if (live !== null && String(n) !== live && !claimed)
          shStale.push('versions.json has ' + what + ' at ' + n + ', START-HERE\'s live line says ' + live + ', and its FILED line does not name ' + n + '.');
      }
    }
  } else if (filedMark) {
    shStale.push('everything is pushed, but START-HERE still carries a "FILED, NOT YET PUSHED" line. Remove it and bring the live line up to date.');
  }

  // --- B. its LAST REVISED date -------------------------------------------
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dm = raw.match(/LAST REVISED:\s*(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})/);
  if (!dm) {
    shStale.push('START-HERE has no readable "LAST REVISED: D Mon YYYY" line, so the date half of this gate cannot run.');
  } else {
    shDate = `${dm[1]} ${dm[2]} ${dm[3]}`;
    const mi = MON.indexOf(dm[2]);
    const stated = mi < 0 ? '?' : `${dm[3]}-${String(mi + 1).padStart(2, '0')}-${dm[1].padStart(2, '0')}`;
    const changed = process.env.SH_PATH ? '(git unavailable)' : git(here, 'status --short -- START-HERE.md');
    let actual;
    if (changed === '(git unavailable)') {
      shDateHow = 'file mtime (git unavailable — DEGRADED: a fresh clone can false-alarm here)';
      actual = ymd(new Date(statSync(shPath).mtime));
    } else if (changed.trim()) {
      shDateHow = 'git (edited, not yet committed — so it must say today)';
      actual = ymd(new Date());
    } else {
      shDateHow = 'git (date of the last commit touching it)';
      actual = git(here, 'log -1 --format=%cs -- START-HERE.md');
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(actual) && actual !== stated)
      shStale.push(`START-HERE says LAST REVISED ${shDate}, but it was last changed ${actual} — by ${shDateHow}. Bump the date in the SAME TURN as the edit.`);
  }
} catch (e) {
  shStale.push('could not read START-HERE.md: ' + e.message);
}
const shRow = shStale.length
  ? `⚠️ **STALE — ${shStale.length} problem(s), listed below**`
  : (pendingPush()
      ? '✅ fresh — and it names the build that is filed but not yet pushed. Its LIVE line is NOT compared while a push is pending: disk is ahead of the served site, so that comparison would fail a true line.'
      : '✅ fresh — every build number it quotes matches `versions.json`');

// live fetch, best effort
async function live(url) {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 5000);
    const r = await fetch(url + '?cb=' + Date.now(), { signal: ctl.signal });
    clearTimeout(t);
    return await r.json();
  } catch { return null; }
}
const liveV = await live('https://anesthesia-kp.github.io/vacation/versions.json');
const liveS = await live('https://anesthesia-kp.github.io/schedule/versions.json');
// A null here means THIS MACHINE could not fetch, which on the owner's device is the
// normal case (the bridge VM has no outbound network). That is not a failed live check
// and must not read like one — say so plainly, and check live from the session instead.
const cmp = (livej, diskj) => livej === null ? 'not checked from here (no network) — fetch live separately'
  : JSON.stringify(livej) === JSON.stringify(diskj) ? 'live MATCHES disk'
  : `⚠️ LIVE DIFFERS FROM DISK — live says ${JSON.stringify(livej)} (just pushed? fetch again before trusting)`;

// --- render ---------------------------------------------------------------
const block = `<!-- STATUS:BEGIN — generated by status.mjs. DO NOT EDIT BY HAND. -->
**STATUS — generated ${now} by \`node status.mjs\`. Regenerate after every push.**

| | build (disk) | versions.json | live check |
|---|---|---|---|
| Auction admin / staff / mobile | ${disk.aAdmin} / ${disk.aStaff} / — | ${vJson.admin} / ${vJson.index} / ${vJson.mobile} | ${cmp(liveV, vJson)} |
| Schedule admin / staff | ${disk.sAdmin} / ${disk.sStaff} | ${sJson.admin} / ${sJson.index} | ${cmp(liveS, sJson)} |

| repo | working tree | vs origin | git locks |
|---|---|---|---|
| vacation-kp.github.io | ${dirty(REPOS.auction)} | ${sync(REPOS.auction)} | ${locks(REPOS.auction)} |
| schedule | ${dirty(REPOS.schedule)} | ${sync(REPOS.schedule)} | ${locks(REPOS.schedule)} |
| tests | ${dirty(REPOS.tests)} | ${sync(REPOS.tests)} | ${locks(REPOS.tests)} |
| anesthesia-kp.github.io | ${dirty(REPOS.master)} | ${sync(REPOS.master)} | ${locks(REPOS.master)} |

Suites on disk: auction **${auctionSuites}** (\`tests/test-*.mjs\`) · schedule **${schedSuites}**
(\`tests/sched/*-test.mjs\`). Assertion counts come from RUNNING the batteries, never from here.

**START-HERE.md** — \`LAST REVISED ${shDate}\`, date checked by ${shDateHow} — ${shRow}
${shStale.map(l => '- ⚠️ ' + l).join('\n') || '_(the only document the owner pastes; this gate exits non-zero when it drifts)_'}
<!-- STATUS:END -->`;

const todoPath = join(here, 'TODO.md');
const todo = readFileSync(todoPath, 'utf8');
const re = /<!-- STATUS:BEGIN[\s\S]*?<!-- STATUS:END -->/;
if (!re.test(todo)) { console.error('No STATUS markers in TODO.md — refusing to guess where to write.'); process.exit(1); }
if (process.env.SH_PATH) {
  console.log(block.replace(/<!-- STATUS:(BEGIN|END)[^>]*-->/g, '').trim());
  console.log('\nSH_PATH set — dry run, TODO.md NOT written.');
} else {
  writeFileSync(todoPath, todo.replace(re, block));
  console.log(block.replace(/<!-- STATUS:(BEGIN|END)[^>]*-->/g, '').trim());
  console.log('\nTODO.md STATUS block updated.');
}

if (shStale.length) {
  console.error('\n' + '='.repeat(74));
  console.error('⛔ START-HERE.md IS STALE. ' + (process.env.SH_PATH
    ? 'Dry run — TODO.md was not written.'
    : 'The STATUS block above WAS still written;'));
  console.error('   this non-zero exit IS the gate. Fix START-HERE, then re-run.');
  for (const l of shStale) console.error('   · ' + l);
  console.error('='.repeat(74));
  process.exit(3);
}
