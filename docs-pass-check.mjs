#!/usr/bin/env node
// docs-pass-check.mjs — the lossless guard for a docs pass (DECISIONS §188, plan §3).
//
// WHAT IT PROVES: every non-blank line of each governing file AS IT STOOD at the pre-pass
// commit still exists, verbatim, somewhere in the union of the live file and its archive.
// Zero exceptions. A line that was shortened in the live file must have its original in the
// archive; a line that was moved must arrive whole. DECISIONS.md additionally must contain its
// pre-pass text as one contiguous block (the body is never edited — it only gains an index).
//
// WHY: the 25 Aug archive pass cut three bullets "with the narrative" and they existed nowhere
// (HANDOFF, 25 Aug entry). A claim of conservation is worth what verifies it. This is the verifier.
//
// RUN (from this repo):   node docs-pass-check.mjs            # pre-pass SHA = PRE_PASS_SHA below
//                          node docs-pass-check.mjs --sha <sha> # any other baseline
//                          DOCS_ROOT=<dir> node docs-pass-check.mjs   # check another copy of the tree
// EXIT: 0 = every line accounted for · 1 = something is missing (listed) · 2 = could not run.
// Honesty: delete one line from a live file and this must exit 1 naming it (plan §3).

import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = process.env.DOCS_ROOT || here;

// The commit the pass started from. Recorded explicitly, never HEAD~n (START-HERE §4).
export const PRE_PASS_SHA = 'b49a18e';

const args = process.argv.slice(2);
const shaArg = args.indexOf('--sha');
const SHA = shaArg >= 0 ? args[shaArg + 1] : (process.env.PRE_PASS_SHA || PRE_PASS_SHA);

const FILES = [
  { file: 'START-HERE.md', archive: 'START-HERE-ARCHIVE.md' },
  { file: 'TODO.md',       archive: 'TODO-ARCHIVE.md' },
  { file: 'HANDOFF.md',    archive: 'HANDOFF-ARCHIVE.md' },
  { file: 'DECISIONS.md',  archive: null, contiguous: true },
];

const norm = s => s.replace(/\s+$/, '').replace(/^\s+/, '');
const read = p => existsSync(p) ? readFileSync(p, 'utf8') : '';

let missingTotal = 0, checked = 0;
for (const { file, archive, contiguous } of FILES) {
  let before;
  try {
    before = execSync(`git --no-optional-locks -C "${here}" show ${SHA}:${file}`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (e) {
    console.error(`✗ cannot read ${file} at ${SHA}: ${e.message.split('\n')[0]}`);
    process.exit(2);
  }
  const live = read(join(root, file));
  const arch = archive ? read(join(root, archive)) : '';
  const union = new Set();
  for (const l of live.split('\n')) union.add(norm(l));
  for (const l of arch.split('\n')) union.add(norm(l));

  // Generated blocks (STATUS / MAP / DECISIONS-INDEX) are derived facts rewritten by status.mjs on
  // every run — never hand-typed, never conserved. Everything else is.
  const missing = [];
  let inGen = false;
  before.split('\n').forEach((l, i) => {
    if (/<!--\s*(STATUS|MAP|DECISIONS-INDEX):BEGIN/.test(l)) inGen = true;
    if (inGen) { if (/<!--\s*(STATUS|MAP|DECISIONS-INDEX):END/.test(l)) inGen = false; return; }
    const n = norm(l);
    if (!n) return;
    checked++;
    if (!union.has(n)) missing.push({ line: i + 1, text: n });
  });
  missingTotal += missing.length;
  const where = archive ? `${file} + ${archive}` : file;
  if (missing.length) {
    console.log(`✗ ${file} @ ${SHA}: ${missing.length} line(s) exist in neither ${where}:`);
    for (const m of missing.slice(0, 40)) console.log(`    ${file}:${m.line}  ${m.text.slice(0, 110)}`);
    if (missing.length > 40) console.log(`    … and ${missing.length - 40} more`);
  } else {
    console.log(`✓ ${file} @ ${SHA}: every non-blank line survives in ${where}`);
  }
  if (contiguous) {
    const ok = live.includes(before.replace(/\n$/, ''));
    console.log(ok
      ? `✓ ${file}: the pre-pass text is present as ONE contiguous block (body untouched)`
      : `✗ ${file}: the pre-pass text is NOT present as one contiguous block — the body was edited`);
    if (!ok) missingTotal++;
  }
}
console.log(`\n${checked} pre-pass lines checked against ${SHA}; ${missingTotal} unaccounted for.`);
if (missingTotal) {
  console.error('\n⛔ NOT LOSSLESS. Put every listed line back — in the live file or, verbatim, in its archive — then re-run.');
  process.exit(1);
}
console.log('✅ LOSSLESS — nothing from the pre-pass files is gone.');
