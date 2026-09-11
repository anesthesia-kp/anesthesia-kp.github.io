#!/usr/bin/env node
// status-sync-test.mjs — proves status.mjs's "vs origin" column never reports success it cannot justify.
// <!-- answers: the executable guard on status.mjs's origin column (§198(1)) — builds throwaway git repos
//      and runs the REAL extracted sync(); read or run it when that column or refAgeDays is touched -->
//
// WHY (§198(1), 11 Sep 2026): "in sync with origin" used to be the FALLTHROUGH of sync(), so one green
// cell covered three different states — a true match, refs left stale by a blocked `git fetch`, and git
// failing outright. status.mjs never fetches, so that cell is only ever as fresh as the local refs.
//
// It EXECUTES the real functions lifted out of status.mjs (never a re-implementation), against real git
// repos built in a temp dir. Deliberately NOT named test-*.mjs and NOT in tests/: the auction battery
// must not gain a dependency on this repo.
//
// RUN:  node status-sync-test.mjs            (exit 0 = pass, 1 = fail)
//       SRC=<other status.mjs> node status-sync-test.mjs     — honesty run against a previous build

import { readFileSync, statSync, mkdtempSync, existsSync, utimesSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const SRC = process.env.SRC || join(dirname(fileURLToPath(import.meta.url)), 'status.mjs');
const src = readFileSync(SRC, 'utf8');

const grab = name => {
  const i = src.indexOf(`const ${name} = `);
  if (i < 0) throw new Error('not found: ' + name);
  const j = src.indexOf('\n};', i);
  if (j < 0) throw new Error('unterminated: ' + name);
  return src.slice(i, j + 3);
};

// A function absent from the source under test must report a LEGIBLE FAILURE, never throw (§3 r11).
let parts;
try { parts = [grab('git'), grab('refAgeDays'), grab('sync')]; }
catch (e) {
  console.log(`  [honesty] ${e.message} — substituting a null stub so sync() still executes`);
  parts = [grab('git'), 'const refAgeDays = () => null;', grab('sync')];
}
const sync = new Function('statSync', 'execSync', 'join', parts.join('\n') + '\nreturn sync;')(statSync, execSync, join);

// --- fixtures: real git repos, built fresh every run ----------------------
const q = c => execSync(c, { stdio: 'pipe' });
const R = mkdtempSync(join(tmpdir(), 'status-sync-'));
q(`git init -q --bare -b main "${R}/bare.git"`);
q(`git clone -q "${R}/bare.git" "${R}/normal"`);
q(`cd "${R}/normal" && git config user.email t@t && git config user.name t && echo a > a.txt && git add a.txt && git commit -qm init && git push -q -u origin main`);
q(`git init -q -b main "${R}/noupstream" && cd "${R}/noupstream" && git config user.email t@t && git config user.name t && echo b > b.txt && git add b.txt && git commit -qm init`);
mkdirSync(join(R, 'notgit'));
q(`git clone -q "${R}/bare.git" "${R}/stale"`);
const NINE_DAYS = Date.now() / 1000 - 9 * 86400;
for (const f of ['refs/remotes/origin/main', 'FETCH_HEAD', 'packed-refs']) {
  const p = join(R, 'stale', '.git', f);
  if (existsSync(p)) utimesSync(p, NINE_DAYS, NINE_DAYS);
}

// --- assertions: each pins an INVARIANT, not a quoted string (§3 r16) -----
let pass = 0, fail = 0;
const check = (label, repo, re) => {
  let got;
  try { got = sync(join(R, repo)); } catch (e) { got = 'THREW: ' + e.message; }
  const ok = re.test(got);
  ok ? pass++ : fail++;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(36)} -> ${got}`);
};

console.log('\nstatus.mjs "vs origin" column — ' + SRC + '\n');
check('a real clone with fresh refs',      'normal',      /^in sync with origin$/);
check('a branch with NO upstream',         'noupstream',  /UNKNOWN/);
check('a directory that is not a repo',    'notgit',      /UNKNOWN/);
check('a directory that does not exist',   'nope',        /UNKNOWN/);
check('refs nine days stale',              'stale',       /\bold\b|UNKNOWN/);
// The invariant that matters: nothing but a verified match may ever read as plain "in sync".
for (const r of ['noupstream', 'notgit', 'nope', 'stale']) {
  let got; try { got = sync(join(R, r)); } catch { got = ''; }
  const ok = got !== 'in sync with origin';
  ok ? pass++ : fail++;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${('"' + r + '" must not read as in-sync').padEnd(36)} -> ${got}`);
}

console.log(`\n  ${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
