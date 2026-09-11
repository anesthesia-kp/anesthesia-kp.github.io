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
// rewrites ONLY the generated blocks: the STATUS block in TODO.md, the MAP block in
// START-HERE.md (stamping LAST REVISED when the map changed) and the index block at the top
// of DECISIONS.md — see THE DOCS GATES below (§188, 8 Sep 2026).
//
// It never writes anything outside those markers, never runs a mutating git command, never deploys.

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
// [11 Sep 2026 · §198(1)] How stale are the local origin refs? This script never fetches, and on
// the owner's Mac the bridge's `git fetch` can be refused outright by the egress allowlist — so the
// refs this comparison trusts may not have moved in days. Newest mtime of the origin ref / FETCH_HEAD
// / packed-refs, in days; null when nothing has ever been fetched here.
const refAgeDays = repo => {
  const branch = git(repo, 'rev-parse --abbrev-ref HEAD');
  if (branch === '(git unavailable)') return null;
  const times = [
    join(repo, '.git', 'refs', 'remotes', 'origin', branch),
    join(repo, '.git', 'FETCH_HEAD'),
    join(repo, '.git', 'packed-refs'),
  ].map(f => { try { return statSync(f).mtimeMs; } catch { return 0; } }).filter(Boolean);
  return times.length ? (Date.now() - Math.max(...times)) / 86400000 : null;
};
const sync = repo => {
  // [5 Sep 2026] Read the BRANCH line only: a FILENAME containing "behind" (test-328-held-behind.mjs) once
  // made this report "BEHIND origin" for a repo in sync — a gate firing on the wrong thing (START-HERE §3 r8).
  // [11 Sep 2026 · §198(1)] "in sync" used to be the FALLTHROUGH, so the same green covered a true match,
  // refs left stale by a blocked fetch, and git failing outright. Every not-known case now SAYS so.
  const raw = git(repo, 'status --short --branch');
  if (raw === '(git unavailable)') return '❓ UNKNOWN — git unavailable';
  const head = (raw.split('\n')[0] || '');
  if (/\[[^\]]*ahead \d+/.test(head)) return 'AHEAD of origin — push pending';
  if (/\[[^\]]*behind \d+/.test(head)) return 'BEHIND origin';
  if (!head.includes('...')) return '❓ UNKNOWN — no upstream on this branch';
  const age = refAgeDays(repo);
  if (age === null) return '❓ UNKNOWN — origin refs have never been fetched here';
  if (age > 1) return `matches origin refs, but they are ${Math.floor(age)}d old — fetch before believing this`;
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
// Is a BUILD filed but not yet live? The question is deliberately narrow: does `versions.json`
// differ from what origin holds — either edited in the working tree or committed and unpushed.
// `git diff origin/main` covers both. It must NOT be "is the tree dirty": an uncommitted
// BUILD-LOG or TODO edit is paperwork, not a filed build, and treating it as one made this
// gate cry wolf the first time it was used in anger (24 Aug). versions.json IS the record of
// what the site serves, so it is the only file worth asking about.
function pendingPush() {
  if (_pending === null) _pending = [REPOS.auction, REPOS.schedule].some(r => {
    const out = git(r, 'diff --name-only origin/main -- versions.json');
    return out !== '(git unavailable)' && out.trim() !== '';
  });
  return _pending;
}
const shPath = process.env.SH_PATH || join(here, 'START-HERE.md');
const shStale = [];
let shDate = '(no LAST REVISED line)';
let shDateHow = 'git';
// The owner's calendar is the one that matters: he types the LAST REVISED date and he
// reads it. Git records a commit date in the committer's local zone; node's new Date()
// follows whatever box it runs on (UTC in a cloud session). Before these were pinned to
// one zone the gate compared two different clocks, and cried STALE for seven hours out
// of every twenty-four — any session working past 5pm Pacific. A gate that fails when
// nothing is wrong gets ignored, which is the same disease as a gate that passes when
// something is.
const OWNER_TZ = 'America/Los_Angeles';
const dayIn = d => new Intl.DateTimeFormat('en-CA', { timeZone: OWNER_TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
const dayAfter = s => { const t = new Date(s + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + 1); return t.toISOString().slice(0, 10); };
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
    // The WHERE TO START "LIVE NOW" line was a SECOND copy of the header line above it and was
    // archived in the §106 housekeeping pass, 25 Aug 2026. Its check is gone with it: the header
    // line is checked, so nothing is now unguarded. Do not restore this without restoring a
    // second live line to guard — two copies of the build numbers is the rot this file exists
    // to catch.
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
  // The question this half actually asks is "does this document under-report its own
  // age?" — that is the failure that mis-briefs a fresh session, and the owner caught it
  // himself reading 17 Aug on 19 Aug. It is NOT "do two machines agree on today's date".
  // A session labels the file with its own UTC day while git records the owner's Pacific
  // day, so the stated day is legitimately allowed to be the actual day OR the one after
  // it. Older than the last change is the real staleness. More than a day ahead is a typo.
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
      shDateHow = `file mtime in ${OWNER_TZ} (git unavailable — DEGRADED: a fresh clone can false-alarm here)`;
      actual = dayIn(statSync(shPath).mtime);
    } else if (changed.trim()) {
      shDateHow = `git, read in ${OWNER_TZ} (edited, not yet committed — so it must say today or tomorrow)`;
      actual = dayIn(new Date());
    } else {
      shDateHow = `git, read in ${OWNER_TZ} (date of the last commit touching it)`;
      const ct = git(here, 'log -1 --format=%ct -- START-HERE.md');
      actual = /^\d+$/.test(ct) ? dayIn(new Date(Number(ct) * 1000)) : '(git unavailable)';
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(actual) && /^\d{4}-\d{2}-\d{2}$/.test(stated)) {
      if (stated < actual)
        shStale.push(`START-HERE says LAST REVISED ${shDate}, but it was last changed ${actual} — by ${shDateHow}. It is under-reporting its own age: bump the date in the SAME TURN as the edit.`);
      else if (stated > dayAfter(actual))
        shStale.push(`START-HERE says LAST REVISED ${shDate}, which is more than a day AHEAD of when it was last changed (${actual}, by ${shDateHow}). That is a typo, not a fresh document.`);
    }
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

// --- THE DOCS GATES (DECISIONS §188, 8 Sep 2026): the map, the tripwires, the index ----
// WHY: the governing files grew until they stopped being read (HANDOFF 2,011 lines against a
// 2,000 trigger nobody measured). The owner's requirement, verbatim: "Your map must be complete
// and self-updating… All the docs need to be self-updating to keep the context manageable
// without prompting by me." So every run of this script — after every push, at every close —
// (a) REGENERATES THE MAP on START-HERE's first screen from the files that exist and each file's
//     own one-line "answers" note (first three lines: <!-- answers: … -->). A mapped file with
//     no note is a FAILED gate naming the file — a Claude cannot be sent to a file nobody described.
// (b) MEASURES every governing file against its tripwire and EXITS NON-ZERO when one is over:
//     that is how "archive pass due" reaches a session without the owner noticing anything.
// (c) KEEPS THE DECISIONS INDEX: every `## §n — title — date` heading gets a row (status blank);
//     a row whose title drifted from its heading is a failed gate. The body is never touched.
// (d) CHECKS TODO's never-re-raise table: every § it cites must exist in DECISIONS.
// Exit codes: 3 START-HERE stale (above) · 4 tripwire · 5 map/notes · 6 DECISIONS index · 7 never-re-raise.
const TRIPWIRE = { 'START-HERE.md': 350, 'TODO.md': 700, 'HANDOFF.md': 900 };
const docsFail = [];   // [{code, msg}]
const lineCount = f => { try { return readFileSync(f, 'utf8').split('\n').length - 1; } catch { return null; } };
const noteOf = f => {
  try {
    const head = readFileSync(f, 'utf8').split('\n').slice(0, 3).join('\n');
    const m = head.match(/<!--\s*answers:\s*([\s\S]*?)\s*-->/);
    return m ? m[1].replace(/\s+/g, ' ').trim() : null;
  } catch { return null; }
};
const lastChanged = (repo, rel, abs) => {
  const dirty = git(repo, `status --short -- "${rel}"`);
  if (dirty !== '(git unavailable)' && dirty.trim()) return 'today (uncommitted)';
  const ct = git(repo, `log -1 --format=%ct -- "${rel}"`);
  if (/^\d+$/.test(ct)) return dayIn(new Date(Number(ct) * 1000));
  try { return dayIn(statSync(abs).mtime) + ' (mtime)'; } catch { return '?'; }
};
// The files the map covers, in reading order: the hub's own files, then the private record, then the two build logs.
const mapped = [];
const hubMd = readdirSync(here).filter(f => f.endsWith('.md')).sort((a, b) => {
  const order = ['START-HERE.md', 'TODO.md', 'HANDOFF.md', 'DECISIONS.md'];
  const ia = order.indexOf(a), ib = order.indexOf(b);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
});
for (const f of hubMd) mapped.push({ label: `anesthesia-kp.github.io/${f}`, abs: join(here, f), repo: here, rel: f });
try {
  for (const f of readdirSync(join(REPOS.tests, 'docs')).filter(f => f.endsWith('.md')).sort())
    mapped.push({ label: `tests/docs/${f}`, abs: join(REPOS.tests, 'docs', f), repo: REPOS.tests, rel: `docs/${f}` });
} catch { docsFail.push({ code: 5, msg: 'tests/docs is not beside this repo — the map cannot list the audits and plans' }); }
// The two BUILD-LOGs live in the SITE repos. A push there is a deploy (START-HERE §2) and the auction's is closed by
// §92, so the pass did not add a line-2 note to them; each carries a built-in note here instead, used only while the
// file has none of its own (add the line to the file and this default is ignored).
const BUILT_IN = {
  'vacation-kp.github.io/BUILD-LOG.md': 'what shipped on the Vacation Auction — one row per build with its gates and its commit; read for any auction build number\'s record',
  'schedule/BUILD-LOG.md': 'what shipped on the Daily Schedule — one row per build with its gates and its commit; read for any schedule build number\'s record',
};
for (const [repo, label] of [[REPOS.auction, 'vacation-kp.github.io'], [REPOS.schedule, 'schedule']])
  mapped.push({ label: `${label}/BUILD-LOG.md`, abs: join(repo, 'BUILD-LOG.md'), repo, rel: 'BUILD-LOG.md', builtIn: BUILT_IN[`${label}/BUILD-LOG.md`] });

const mapRows = [];
for (const m of mapped) {
  if (!existsSync(m.abs)) { docsFail.push({ code: 5, msg: `mapped file missing: ${m.label}` }); continue; }
  const note = noteOf(m.abs) || m.builtIn;
  if (!note) docsFail.push({ code: 5, msg: `${m.label} has no "<!-- answers: … -->" note in its first three lines — write one (what it answers, when to read it)` });
  m.lines = lineCount(m.abs);
  m.note = note || '⚠️ NO NOTE — this file is undescribed';
  m.when = lastChanged(m.repo, m.rel, m.abs);
  mapRows.push(`| \`${m.label}\` | ${m.note.replace(/\|/g, '\\|')} | ${m.lines} | ${m.when} |`);
}
const mapBlock = `<!-- MAP:BEGIN — generated by status.mjs from each file's own "answers" note. DO NOT EDIT BY HAND. -->
| file | answers | lines | last changed |
|---|---|---|---|
${mapRows.join('\n')}
<!-- MAP:END -->`;

// (b) tripwires — measured, never estimated.
const sizes = {};
for (const [f, cap] of Object.entries(TRIPWIRE)) {
  const n = lineCount(join(here, f));
  sizes[f] = n;
  if (n !== null && n > cap) docsFail.push({ code: 4, msg: `ARCHIVE PASS DUE — before hand-over: ${f} is ${n} lines, tripwire ${cap}. Promote any lesson first, then \`node archive.mjs ${f} "<heading>"\` for what fails the §101 test, then re-run.` });
}
const archSizes = hubMd.filter(f => /-ARCHIVE\.md$/.test(f)).map(f => `${f} ${lineCount(join(here, f))}`).join(' · ') || 'none';
for (const f of hubMd.filter(f => /-ARCHIVE\.md$/.test(f)))
  if (!mapRows.some(r => r.includes(`anesthesia-kp.github.io/${f}`))) docsFail.push({ code: 5, msg: `the map does not name ${f}` });

// (c) the DECISIONS index — rows generated from headings, status words kept from the file.
const decPath = join(here, 'DECISIONS.md');
let decText = '';
try { decText = readFileSync(decPath, 'utf8'); } catch { docsFail.push({ code: 6, msg: 'DECISIONS.md unreadable' }); }
const idxRe = /<!-- DECISIONS-INDEX:BEGIN[^\n]*-->\n([\s\S]*?)<!-- DECISIONS-INDEX:END -->/;
const idxMatch = decText.match(idxRe);
let decIndexBlock = null, decHeadings = [];
if (decText && !idxMatch) {
  docsFail.push({ code: 6, msg: 'DECISIONS.md has no DECISIONS-INDEX markers — the index cannot be kept' });
} else if (decText) {
  const body = decText.slice(decText.indexOf('<!-- DECISIONS-INDEX:END -->'));
  const parseHeading = h => {
    // Shapes seen: "## §92 — TITLE — 24 Aug 2026 (evening)" · "## 12 · Title — 15 Aug 2026" ·
    // "## §47 (outcome) — DONE, build 59. …" · "## THE CARDINAL RULE — 15 Aug 2026" · "## Buried rulings — an index, added 17 Aug 2026"
    let t = h.replace(/^##\s+/, '').trim();
    let id = null;
    const m = t.match(/^§?(\d+[a-z]?)(\s*\(outcome\))?\s*[·—–-]\s*/);
    if (m) { id = '§' + m[1] + (m[2] ? ' (outcome)' : ''); t = t.slice(m[0].length); }
    let date = '';
    const d = t.match(/\s[—–-]\s(\d{1,2}\s+[A-Z][a-z]{2,4}\s+20\d\d(?:\s*\([^)]*\))?)\s*$/);
    if (d) { date = d[1]; t = t.slice(0, d.index); }
    if (!id) id = t.length > 40 ? t.slice(0, 40) + '…' : t;
    return { id, date, title: t.trim() };
  };
  decHeadings = body.split('\n').filter(l => /^## /.test(l)).map(parseHeading);
  // existing rows: | id | date | title | status |
  const existing = new Map();
  for (const l of idxMatch[1].split('\n')) {
    const c = l.match(/^\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*$/);
    if (c && c[1] !== '§' && !/^-+$/.test(c[1])) existing.set(c[1], { date: c[2], title: c[3], status: c[4] });
  }
  const esc = x => x.replace(/\|/g, '\\|');
  const seen = new Set();
  const rows = [];
  for (const h of decHeadings) {
    let key = h.id; while (seen.has(key)) key += "'"; seen.add(key);
    const row = existing.get(key);
    if (row && row.title !== esc(h.title)) docsFail.push({ code: 6, msg: `DECISIONS index row ${key} says "${row.title.slice(0, 60)}…" but the heading reads "${h.title.slice(0, 60)}…" — fix the row (status word kept)` });
    rows.push(`| ${key} | ${h.date || row?.date || ''} | ${esc(h.title)} | ${row ? row.status : ''} |`);
  }
  for (const k of existing.keys()) if (!seen.has(k)) docsFail.push({ code: 6, msg: `DECISIONS index has a row ${k} with no matching heading — a ruling is never deleted, so fix the row` });
  decIndexBlock = `<!-- DECISIONS-INDEX:BEGIN — generated by status.mjs from the "## §n — title — date" headings below. Only the STATUS word is hand-kept (LIVE / BUILT / DECLINED / PARKED / SUPERSEDED BY §n; blank when unsure). DO NOT edit ids or titles by hand. -->
| § | date | title (exactly as headed) | status |
|---|---|---|---|
${rows.join('\n')}
<!-- DECISIONS-INDEX:END -->`;
}

// (d) TODO's never-re-raise table cites only real rulings.
try {
  const todoText = readFileSync(join(here, 'TODO.md'), 'utf8');
  const sec = todoText.match(/^#{1,3} .*CLOSED\s*\/\s*DECLINED[^\n]*\n([\s\S]*?)(?=^#{1,3} |\Z)/m);
  if (!sec) docsFail.push({ code: 7, msg: 'TODO.md has no "CLOSED / DECLINED — never re-raise" section' });
  else {
    const ids = new Set(decHeadings.map(h => h.id));
    for (const m of sec[1].matchAll(/§(\d+[a-z]?)/g)) if (!ids.has('§' + m[1])) docsFail.push({ code: 7, msg: `TODO's never-re-raise table cites §${m[1]}, which is not a DECISIONS heading` });
  }
} catch {}

const docsRow = `**Governing files:** START-HERE **${sizes['START-HERE.md']}** / 350 · TODO **${sizes['TODO.md']}** / 700 · HANDOFF **${sizes['HANDOFF.md']}** / 900 · DECISIONS ${lineCount(decPath)} (unlimited, indexed ${decHeadings.length} rulings) · archives: ${archSizes}. Over a tripwire = this script exits non-zero = the archive pass is due before hand-over.`;

// --- render ---------------------------------------------------------------
// ── Housekeeping gate (31 Aug 2026, owner request: "ensure it happens automatically").
// _to_delete/ is designated junk the OWNER empties — the device bridge cannot delete without a
// per-session permission grant, so this never happens on its own. Measuring it here puts it in
// the STATUS block after every push, where it cannot be ignored. Reporting only: deletes nothing.
function folderSize(dir) {
  let bytes = 0, files = 0;
  const walk = (d) => {
    let ents = [];
    try { ents = readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      const f = join(d, e.name);
      if (e.isDirectory()) walk(f);
      else { files++; try { bytes += statSync(f).size; } catch {} }
    }
  };
  walk(dir);
  return { bytes, files };
}
function human(b) {
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return Math.round(b / 1024) + ' KB';
  return (b / 1024 / 1024).toFixed(1) + ' MB';
}
const junk = folderSize(join(GH, '_to_delete'));
const arch = folderSize(join(GH, '_archive'));
const junkRow = junk.files === 0
  ? '🧹 `_to_delete/` is **empty** · `_archive/` holds ' + arch.files + ' files (' + human(arch.bytes) + ')'
  : '🧹 **`_to_delete/` holds ' + junk.files + ' files (' + human(junk.bytes) + ') — empty it.** '
    + (junk.bytes > 50 * 1024 * 1024 ? '**Over 50 MB: this is the closing-checklist step nobody has run.** ' : '')
    + 'Finder → Documents/GitHub/_to_delete → select all → delete. '
    + '`_archive/` holds ' + arch.files + ' files (' + human(arch.bytes) + ') and is KEPT, never emptied.';

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

${junkRow}

${docsRow}

**START-HERE.md** — \`LAST REVISED ${shDate}\`, date checked by ${shDateHow} — ${shRow}
${shStale.map(l => '- ⚠️ ' + l).join('\n') || '_(the only document the owner pastes; this gate exits non-zero when it drifts)_'}
<!-- STATUS:END -->`;

const todoPath = join(here, 'TODO.md');
const todo = readFileSync(todoPath, 'utf8');
const re = /<!-- STATUS:BEGIN[\s\S]*?<!-- STATUS:END -->/;
if (!re.test(todo)) { console.error('No STATUS markers in TODO.md — refusing to guess where to write.'); process.exit(1); }
if (process.env.SH_PATH) {
  console.log(block.replace(/<!-- STATUS:(BEGIN|END)[^>]*-->/g, '').trim());
  console.log('\nSH_PATH set — dry run, TODO.md / START-HERE.md / DECISIONS.md NOT written.');
} else {
  writeFileSync(todoPath, todo.replace(re, block));
  console.log(block.replace(/<!-- STATUS:(BEGIN|END)[^>]*-->/g, '').trim());
  console.log('\nTODO.md STATUS block updated.');

  // THE MAP on START-HERE's first screen. When it changes, LAST REVISED is stamped with today's
  // date in the owner's zone — the map IS a revision of the one document he pastes.
  const shText = readFileSync(shPath, 'utf8');
  const mapRe = /<!-- MAP:BEGIN[\s\S]*?<!-- MAP:END -->/;
  if (!mapRe.test(shText)) docsFail.push({ code: 5, msg: 'START-HERE.md has no MAP markers — the map cannot be written' });
  else {
    const current = shText.match(mapRe)[0];
    if (current !== mapBlock) {
      let next = shText.replace(mapRe, mapBlock);
      const MONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const [y, mo, d] = dayIn(new Date()).split('-');
      const todayOwner = `${Number(d)} ${MONS[Number(mo) - 1]} ${y}`;
      next = next.replace(/LAST REVISED:\s*\d{1,2}\s+[A-Za-z]{3}[a-z]*\s+\d{4}/, `LAST REVISED: ${todayOwner}`);
      writeFileSync(shPath, next);
      console.log(`START-HERE.md MAP regenerated (${mapRows.length} files) and LAST REVISED stamped ${todayOwner}.`);
    } else console.log(`START-HERE.md MAP unchanged (${mapRows.length} files).`);
  }
  if (decIndexBlock !== null) {
    const nextDec = decText.replace(idxRe, decIndexBlock);
    if (nextDec !== decText) { writeFileSync(decPath, nextDec); console.log(`DECISIONS.md index rewritten (${decHeadings.length} rulings; body untouched).`); }
    else console.log(`DECISIONS.md index unchanged (${decHeadings.length} rulings).`);
  }
}

let exitCode = 0;
if (shStale.length) {
  console.error('\n' + '='.repeat(74));
  console.error('⛔ START-HERE.md IS STALE. ' + (process.env.SH_PATH
    ? 'Dry run — TODO.md was not written.'
    : 'The STATUS block above WAS still written;'));
  console.error('   this non-zero exit IS the gate. Fix START-HERE, then re-run.');
  for (const l of shStale) console.error('   · ' + l);
  console.error('='.repeat(74));
  exitCode = 3;
}
if (docsFail.length) {
  console.error('\n' + '='.repeat(74));
  console.error('⛔ DOCS GATES FAILED (§188) — the STATUS block was still written; this non-zero exit IS the gate.');
  for (const f of docsFail) console.error(`   · [${f.code}] ${f.msg}`);
  console.error('='.repeat(74));
  if (!exitCode) exitCode = docsFail[0].code;
}
process.exit(exitCode);
