#!/usr/bin/env node
// archive.mjs — MOVING is a tool, not an edit (DECISIONS §188, plan §7c).
//
// Cuts ONE section out of a governing file and appends it, verbatim, to that file's archive
// (`<stem>-ARCHIVE.md`, same folder) under a dated header. Nothing is ever typed into an archive
// by hand, so nothing is paraphrased on the way. The §101 test — "if a fresh session never read
// this, would it do anything wrong?" — stays a judgement; this only guarantees the move is lossless.
//
// RUN (from this repo):
//     node archive.mjs <file.md> "<exact heading line, without the leading #s>"
//     node archive.mjs <file.md> --line <n>        # the heading at line n (1-based)
//     add --dry-run to see what would move without writing anything
//
// A section runs from its heading to the line before the next heading of the SAME OR HIGHER level
// (a `##` section ends at the next `##` or `#`). The file keeps everything else byte-for-byte.
//
// REFUSES, and says why: the heading is not found or not unique · the file is DECISIONS.md (a
// register, never trimmed) · the section lies in a NEVER-ARCHIVED part (HANDOFF: anything that is
// not a dated session entry — the closing checklist, MAINTAINING, PART A–D, D1–D5, the standing
// traps; TODO: the STATUS block and the CLOSED / DECLINED table; START-HERE: the generated MAP,
// the LIVE line and the LAST REVISED line) · the section contains a generated block's markers.
//
// VERIFIES after writing: the section's lines are present in the archive as one contiguous block,
// and the heading no longer exists in the file. On any failure nothing is written (both files are
// written only after every check passes; if the second write fails the first is rolled back).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';

const argv = process.argv.slice(2);
const dry = argv.includes('--dry-run');
const args = argv.filter(a => a !== '--dry-run');
if (args.length < 2) {
  console.error('usage: node archive.mjs <file.md> "<exact heading>" | --line <n>   [--dry-run]');
  process.exit(2);
}
const filePath = resolve(args[0]);
const fileName = basename(filePath);
const dir = dirname(filePath);
if (!existsSync(filePath)) { console.error(`✗ no such file: ${filePath}`); process.exit(2); }
if (/^DECISIONS\.md$/i.test(fileName)) {
  console.error('✗ REFUSED: DECISIONS.md is a register and is never trimmed (HANDOFF §maintaining; §188).');
  process.exit(3);
}
const stem = fileName.replace(/\.md$/i, '');
const archivePath = join(dir, `${stem}-ARCHIVE.md`);

const text = readFileSync(filePath, 'utf8');
const lines = text.split('\n');
const isHeading = l => /^#{1,6}\s/.test(l);
const level = l => (l.match(/^(#{1,6})\s/) || [, ''])[1].length;

// --- locate the section ---------------------------------------------------
let start;
if (args[1] === '--line') {
  start = Number(args[2]) - 1;
  if (!(start >= 0 && start < lines.length) || !isHeading(lines[start])) {
    console.error(`✗ line ${args[2]} is not a heading line.`); process.exit(3);
  }
} else {
  const want = args[1].trim();
  const strip = l => l.replace(/^#{1,6}\s+/, '').trim();
  const hits = lines.map((l, i) => (isHeading(l) && strip(l) === want) ? i : -1).filter(i => i >= 0);
  if (hits.length === 0) {
    // Help the caller: show near-misses by prefix.
    const near = lines.map((l, i) => (isHeading(l) && strip(l).startsWith(want.slice(0, 30))) ? `${i + 1}: ${l.slice(0, 100)}` : null).filter(Boolean);
    console.error(`✗ REFUSED: no heading reads exactly "${want}".` + (near.length ? `\n  near misses:\n  ${near.join('\n  ')}` : ''));
    process.exit(3);
  }
  if (hits.length > 1) {
    console.error(`✗ REFUSED: the heading is not unique — lines ${hits.map(i => i + 1).join(', ')}. Use --line <n>.`);
    process.exit(3);
  }
  start = hits[0];
}
const lvl = level(lines[start]);
let end = lines.length;
for (let i = start + 1; i < lines.length; i++) {
  if (isHeading(lines[i]) && level(lines[i]) <= lvl) { end = i; break; }
}
const section = lines.slice(start, end);
const heading = lines[start];

// --- protection --------------------------------------------------------------
const markers = /<!--\s*(STATUS|MAP|DECISIONS-INDEX):(BEGIN|END)/;
if (section.some(l => markers.test(l))) {
  console.error('✗ REFUSED: the section contains a generated block (STATUS / MAP / DECISIONS-INDEX markers). Those are never archived.');
  process.exit(3);
}
const datedEntry = /^#{1,3}\s+(📓\s+)?(SESSION\b|\d{1,2}(\s*[–-]\s*\d{1,2})?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+20\d\d)/;
if (/^HANDOFF\.md$/i.test(fileName)) {
  if (!datedEntry.test(heading)) {
    console.error('✗ REFUSED: in HANDOFF.md only DATED SESSION ENTRIES are archived (a heading that starts with a date, or "SESSION"). The checklist, MAINTAINING, the standing traps, PART A–D and D1–D5 are reference, never narrative.');
    process.exit(3);
  }
  // A dated entry that sits INSIDE a PART (e.g. under PART D) is still an entry; but a PART heading itself never matches above.
}
if (/^TODO\.md$/i.test(fileName)) {
  if (/CLOSED\s*\/\s*DECLINED/i.test(heading)) {
    console.error('✗ REFUSED: the CLOSED / DECLINED — never re-raise table stays in TODO.md forever (§188).');
    process.exit(3);
  }
}
if (/^START-HERE\.md$/i.test(fileName)) {
  if (section.some(l => /LAST REVISED:|LIVE, verified cache-busted TWICE/.test(l))) {
    console.error('✗ REFUSED: the section carries the LAST REVISED or LIVE line, which status.mjs reads. Move the rest, not that.');
    process.exit(3);
  }
}

// --- the archive block ---------------------------------------------------------
const OWNER_TZ = 'America/Los_Angeles';
const _p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: OWNER_TZ, day: 'numeric', month: 'numeric', year: 'numeric' }).formatToParts(new Date()).map(x => [x.type, x.value]));
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const today = `${_p.day} ${MON[Number(_p.month) - 1]} ${_p.year}`;
const headText = heading.replace(/^#{1,6}\s+/, '');
const block = [
  '',
  '---',
  `## ⤵ moved ${today} from ${fileName} — ${headText}`,
  '',
  ...section,
].join('\n');
// Keep exactly one trailing newline on the archive.
let archive = existsSync(archivePath) ? readFileSync(archivePath, 'utf8') : `# ${stem} ARCHIVE — sections moved out of ${fileName}\n<!-- answers: sections archived from ${fileName}, verbatim and dated (moved by archive.mjs) — read when a working file points here, or when a fact is absent from the working file -->\n\nNothing here is deleted or paraphrased: each block below is a section of ${fileName} exactly as it stood, under a header saying when it moved. Grep this file before concluding something was never written.\n`;
if (!archive.endsWith('\n')) archive += '\n';
const newArchive = archive + block.replace(/\n+$/, '') + '\n';

// Remove the section; collapse the blank lines it leaves to at most one.
const before = lines.slice(0, start), after = lines.slice(end);
while (before.length && before[before.length - 1].trim() === '' && after.length && after[0].trim() === '') after.shift();
const newText = [...before, ...after].join('\n');

console.log(`${dry ? '[dry-run] would move' : 'moving'} ${section.length} line(s) (${start + 1}–${end}) from ${fileName} → ${basename(archivePath)}`);
console.log(`  ${heading.slice(0, 110)}`);
if (dry) process.exit(0);

// --- write, then verify; roll back on any failure ------------------------------
const prevArchive = existsSync(archivePath) ? readFileSync(archivePath, 'utf8') : null;
writeFileSync(archivePath, newArchive);
try {
  const check = readFileSync(archivePath, 'utf8');
  const sectionText = section.join('\n').replace(/\n+$/, '');
  if (!check.includes(sectionText)) throw new Error('the section is not present in the archive as one contiguous block');
  writeFileSync(filePath, newText);
  const back = readFileSync(filePath, 'utf8');
  const countH = t => t.split('\n').filter(l => l === heading).length;
  if (countH(back) !== countH(text) - 1) throw new Error('the heading was not removed exactly once');
  if (back.length >= text.length) throw new Error('the file did not shrink');
  // Every non-blank line of the section that is not also elsewhere in the file must be gone.
  const rest = new Set(back.split('\n').map(l => l.trim()));
  const stray = section.filter(l => l.trim() && rest.has(l.trim()) && !(text.split('\n').filter(x => x.trim() === l.trim()).length > 1));
  if (stray.length) throw new Error(`${stray.length} section line(s) still in the file`);
} catch (e) {
  if (prevArchive === null) writeFileSync(archivePath, ''); else writeFileSync(archivePath, prevArchive);
  writeFileSync(filePath, text);
  console.error(`✗ verification failed, both files rolled back: ${e.message}`);
  process.exit(1);
}
console.log(`✓ moved and verified. ${fileName}: ${lines.length} → ${newText.split('\n').length} lines · ${basename(archivePath)}: ${newArchive.split('\n').length} lines`);
