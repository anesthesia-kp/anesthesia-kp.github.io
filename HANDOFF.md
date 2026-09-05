# HANDOFF — KP East Bay Anesthesia. Both sites.

**Read `START-HERE.md` first.** It carries the cardinal rule, every binding working rule, and
the current state of both sites. This file is the per-site detail behind it.

Nothing here restates a rule from `START-HERE.md`. If you find something that does, delete it
here and keep the copy there — that duplication is the disease this merge cured.
---

# ⭐ CLOSING A SESSION — the handoff checklist. Owner order, 25 Aug 2026.

*"Let's add to the handoff a set of instructions for the handoff that ensure everything is
updated and the chat is reviewed for important items."*

**This is a PROCEDURE, not a set of rules — the rules live in `START-HERE.md` and are not
restated here.** Work it top to bottom before saying a session is finished, and say in the
chat which steps ran. A step that was skipped is reported as skipped, never left silent.

**Run it at every handoff point, not only at the end** — before a compaction, before a long
gap, before "what's next?", and whenever the owner is about to walk away. A session that ends
without this ends in whatever half-state it happened to be in.

---

### 0 · `git fetch` EVERY repo FIRST — before reading anything to decide what is recorded

**A clone is not the project; `origin/main` is.** On 25 Aug the cloud clone was 8 commits behind,
had never been fetched, and Claude "discovered" that eight rulings, an owner instruction and a
gate fix were all missing. Every one of them was already committed and pushed. Committing the
reconstructions would have deleted 991 lines of the owner's own words.

**Absence in a working copy is evidence of NOTHING.** Fetch first, then grep — and when a file
seems to be missing something it should have, check `git log`/`git show origin/main:<file>`
before concluding it was never written.

### 1 · Review THE CHAT for things that must outlive it

This is the step that gets skipped, and it is the reason this checklist exists. **A session
is deleted; a file is not.** Re-read the conversation from its start (or from the compaction
summary plus everything after it) and pull out every item below. For each, decide its ONE home
(§ "a fact has ONE home"), write it there in this turn, and quote the owner verbatim where he
gave a ruling.

| what to look for | where it goes |
|---|---|
| **"that should be remembered" / "remember this" / "don't do that again"** — the owner saying something explicitly | the file that owns that subject, **in the same turn he says it** |
| A **ruling** — he chose between options, or overruled a recommendation | `DECISIONS.md`, numbered, including the argument he overruled and why |
| A **correction to how the work is done** (a preference, a boundary, a thing he does or does not do) | `START-HERE.md`, in the section that already covers it |
| A **correction of an existing rule** — anything that makes a sentence already in a file WRONG | edit that sentence. **Do not add a second, newer sentence beside it** — two answers is the rot |
| A **defect he found** that is not being fixed now | `TODO.md` |
| **What shipped**, and what the gates said | `BUILD-LOG.md`, one row per build |
| A **lesson from something that went wrong this session** | `HANDOFF.md` (here), dated |

⚠️ **Believing it was written down is not the same as it being written down.** On 24 Aug the
owner said *"I can run RA2, you built a system for me"* and *"that should be remembered"*. A
later session believed that was recorded in `START-HERE.md` §6; it was not, and §6 went on
stating the opposite blanket rule for a full day. **GREP FOR IT. Open the file and confirm the
sentence is on disk before reporting it as recorded.**

⚠️ **After a compaction, treat the summary as second-hand.** Everything before the compaction
reaches you as somebody's précis, not as the source. Re-ground the specific facts you are about
to act on by reading them off disk — `DECISIONS.md`, the code, `git show` — rather than
trusting the summary's paraphrase of them.

### 2 · Make the state files true

- **`node status.mjs`** from this repo. **It must exit 0.** It is the gate, not a report: it
  checks every build number `START-HERE.md` calls LIVE against **`origin/main`** (what the site
  is actually serving), checks that anything filed-but-unpushed is named, and checks the
  LAST REVISED date against git. If it cannot reach `origin/main` it says so LOUDLY — in that
  state, `git fetch` first and believe no build number until you have.
- **`START-HERE.md`** — the LIVE line, the `FILED, NOT YET PUSHED:` line, and LAST REVISED,
  bumped in the SAME turn as the edit. Delete the FILED line once it is pushed.
- **`BUILD-LOG.md`** — a row for every build, written at the same time as the code, in the
  repo the build belongs to.
- **`TODO.md`** — anything raised and not done. `status.mjs` rewrites its STATUS block; the
  rest is hand-kept. ⚠️ **And REMOVE from it anything whose `BUILD-LOG.md` row you just wrote,
  in this same turn** (standing rule, 25 Aug 2026). A fact lives in one of the three files —
  outstanding here, shipped in `BUILD-LOG.md`, settled in `DECISIONS.md`. The moment something
  ships, `TODO.md` is no longer its home. One deletion per build; skipping it is how that file
  grew to 2,600 lines and became something people skim instead of read.

### 3 · Prove the code

- Batteries run, with the numbers quoted from the RUN and never from memory or from a doc.
- **Every honesty check must say FAILED with a non-zero exit.** A skip is a failed gate.
- Name the baseline by its **explicit SHA**, and say so.
- `node --check` on every page touched.
- The **isolation guard** (the cardinal rule) re-run after anything that touches a writer.
- Say how many suites RAN and how many were SKIPPED. "All green" beside 22 skips is a lie.

### 4 · Account for every file

- `git status` in **all four** repos. Name every uncommitted file and say why it is uncommitted
  — a modified file nobody mentions is the one that gets lost.
- Anything the owner must push: **deliver the actual file** and give its md5. Do not describe a
  change and leave him to find it.
- `tests/` is **not a git clone in the cloud sandbox** — its files only exist there because they
  were staged. Anything edited there must be sent back explicitly or it dies with the session.
- If the cloud clone is BEHIND origin, say so. It is a fine place to build from a delivered
  whole file; it is **not** a safe base for a patch script.

### 4a · Take the rubbish out — the housekeeping step (owner order, 31 Aug 2026)

*"the files in my github folder are piling up with older files that i don't need or use… can you
ensure it happens automatically going forward?"* On 31 Aug `_to_delete/` had reached **151 MB across
403 entries** — spent transfer zips, old build snapshots and about forty empty lock folders — because
it is the owner's job to empty it and nothing ever reminded him. It is now empty. Keep it that way.

**The three destinations, and the one-line test for each.** This is the whole filing system:

| where | what goes there | who empties it |
|---|---|---|
| the repo itself | anything LIVE or in flight | nobody — it is the project |
| `_archive/<area>/<category>/` | superseded but real: old audit reports, retired suites, prior revisions of a document, session records. Areas are `vacation`, `schedule`, `tests`, `anesthesia` — **use those four, never invent a sibling** | **NOBODY — `_archive` is KEPT FOREVER.** "Nothing is ever deleted" means archived, not erased |
| `_to_delete/` | true machine junk with no historical value: spent transfer zips and tarballs, stranded `.lock` files, empty directories, probe and scratch files, `firestore-debug.log`, `.DS_Store` | **the owner, and it should be empty at every handoff** |

**The test that decides between the last two:** *would anyone ever want to read this again?*
Yes → `_archive/`. No, it is a byproduct of moving bytes around → `_to_delete/`.
**Genuinely unsure → `_archive/`.** It costs a few kilobytes to be wrong in that direction and
costs the owner his history to be wrong in the other.

**Before anything leaves a repo:** grep the WHOLE GitHub folder for its name. If a document is the
only copy of something — a ruling, a finding, a decision — its CONTENT must already be in
`DECISIONS.md` / `TODO.md` / `HANDOFF.md` / `BUILD-LOG.md` before the file moves anywhere. On 31 Aug
three files in `_to_delete/xfer/` turned out to be sole copies (`RULINGS-98-99.md`,
`todo-section3.md`, `card95.txt`) and were pulled back into `_archive/anesthesia/session-docs/`
rather than deleted. **Never move what the live site serves** — the hash-named HTML files are LIVE
REDIRECTS; open one and read its `<title>` before touching it.

**How this is now automatic — three layers, because a rule alone already failed once:**
1. **`node status.mjs` measures `_to_delete/` and `_archive/` and writes a 🧹 line into the STATUS
   block at the top of `TODO.md`.** That runs after every push, so the pile is now visible in the
   first thing anyone reads. Over 50 MB it says so in bold. It only ever REPORTS — it deletes nothing.
2. **This step.** Every handoff: read that 🧹 line, file anything loose, and if `_to_delete/` is not
   empty, tell him in the handover with the size.
3. **The deletion itself needs him or a permission grant.** The device bridge cannot delete by
   default; `device_request_delete_permission` puts a prompt on his Mac and a person must answer it.
   So Claude may ASK to empty `_to_delete/`, and may never quietly do it. If he declines or is away,
   say the folder is full and move on — never delete around the refusal, and never touch `_archive/`.

**Housekeeping is its own commit** (START-HERE §3) and every move is recorded in `_archive/README.md`.

### 5 · Hand over

State, in the chat: what shipped, what the gates said, what is pending a push, what was recorded
and where, and what is recommended but deliberately NOT built. Then stop and wait (§7).

---

# 🧹 MAINTAINING THIS FILE AND `TODO.md` — archiving is CONTINUOUS, not a spring clean

**Owner order, 25 Aug 2026: build the archiving into both files so the process is maintained.**
These two files grow every session and nothing ever left them, so by 25 Aug this file was ~2,300
lines and `TODO.md` ~2,600. **A file long enough to skim is a file that stops being read**, and
outstanding work then goes missing in plain sight — which is the opposite of what both exist for.

**The trigger is numeric ON PURPOSE**, for the same reason §62 made the commit cap a number:
drift that depends on judgement is drift nobody notices. Three rules, all mechanical:

**1 · `TODO.md` — shipped work leaves as it enters `BUILD-LOG.md`, in the SAME TURN.**
A fact lives in ONE of the three files — outstanding in `TODO.md`, shipped in `BUILD-LOG.md`,
settled in `DECISIONS.md`. The moment something ships, `TODO.md` is not its home. One deletion
per build. This is step 2 of the checklist above and it is where the rule is enforced.

**2 · THIS FILE — an entry leaves when it is NO LONGER NEEDED, never because it got old.**
Move it to `_archive/`, dated, in one file. **Never delete.**

> **Owner ruling, 25 Aug 2026, replacing the 14-day rule he set the day before** — verbatim:
> *"14 days doesn't seem reasonable. i want to remove items no longer needed rather than remove
> by time."* **He is right, and the first pass proved it from the other end:** the 14-day
> cut-off reached only four sections, because at 200–400 lines a session a fortnight of sessions
> is roughly this whole file. Age was buying nothing and spending judgement. A three-week-old
> trap that still bites matters more than yesterday's build narrative.

**AN ENTRY STAYS while it carries something a future session would ACT on:**
· a trap, a lesson or a gotcha still true of the code, the tools or the machines **as they are today**;
· an unresolved question, an accepted risk, or a limit nobody has worked around yet;
· the reasoning behind something still in force, where only the outcome is recorded elsewhere.

**AN ENTRY GOES once all of that is gone:**
· it is a build narrative and `BUILD-LOG.md` carries the row;
· its lesson has been promoted into `START-HERE.md` §3 or `DECISIONS.md` — the rule now lives
  where rules live, so the story here is the second copy, and second copies are what rot;
· it describes a machine, a tool, a file or a code path that **no longer exists**.

> ✅ **THE TEST, in one question: if a fresh session never read this entry, would it do anything
> wrong?** Yes → it stays. No → it goes. That is the whole rule.

> ⭐ **AND THE HABIT THAT MAKES IT WORK: promote the lesson, THEN archive the story.** An entry
> you cannot archive because its lesson lives nowhere else is not a reason to keep the entry —
> it is a sign the lesson was never filed properly. Put it where it belongs first
> (`START-HERE.md` §3 for a working rule, `DECISIONS.md` for a ruling), and the narrative is then
> free to go. Done this way the archive pass stops being tidying and becomes the thing that
> forces every hard-won lesson into the file a fresh session actually reads.

> ⛔ **NEVER ARCHIVED, whatever the test says:** the closing checklist above · this section ·
> PART A (shared), PART B (auction), PART C (schedule) and PART D (rescued records) ·
> ARCHITECTURE · DEPLOY FLOW · anything describing how the system WORKS rather than what happened
> on a day. Those are reference, not narrative. Only the **dated session entries** are ever
> archived.

**3a · `START-HERE.md` HAS A TRIPWIRE OF ITS OWN: 700 LINES** (owner ruling, 25 Aug 2026).
It is lower than the other two on purpose — it is the ONE file he PASTES into every session, so
every line in it is a tax on every session forever, where a line in `TODO.md` is read only when
someone goes looking. **And the rule that keeps it there: a working rule that has not been needed
in months moves to `START-HERE-ARCHIVE.md` rather than staying in the paste.** Same test as
everything else — if a fresh session never read it, would it do anything wrong?

**3 · THE TRIPWIRE — if either file passes 2,000 lines, the archive pass is DUE**, and it is
taken before the next feature build rather than "when there's time". Measure it, do not estimate:
`wc -l TODO.md HANDOFF.md`. `TODO.md` carries the full pass procedure and its acceptance
criteria in its §1 queue.

⚠️ **`DECISIONS.md` IS EXEMPT AND MUST NOT BE TRIMMED.** It is a register: it should only ever
grow, every entry stays live forever, and a ruling from July governs exactly as much as one from
today. Length there is correctness, not rot. Do not "tidy" it.

**The judgement call, and it only goes one way:** if you cannot say whether an item is shipped,
outstanding, parked or a standing rule, **it stays**. Uncertainty keeps it. Archiving something
still owed is far worse than a file that is fifty lines longer than it needed to be.

---


---

## 5 Sep 2026 (LATE MORNING, same session) — §184: THE TESTS MADE HONEST ABOUT THE HOLDS BUILD. 328 LIVE. NOTHING OPEN.

**What the session did.** He pushed 328 (`e5eea70`, verified served twice), chose (2) of the recommendation and declined (3)
(*"skip 3"*). Two agents in parallel, no page touched: **F3/F4/F5** in `test-327` (82 → 108: the staff dropdown and write-time guard
EXECUTED with a hold — exact disabled/enabled option lists, `persistScheduleChange` not called, a free-number control that does persist;
Add Bid EXECUTED at click and at Confirm with the hold arriving in between — recorded writes, not text; a Phase-1 fixture through all four
helpers; honesty 62 → 80 RED on 326, no throw) and `'bidHoldsRef'` in `test-appcheck-login`'s MOVED list; **F6** in `test-backup-restore`
(177 → 182: `bidHoldsRef` in the restore harness; a 326-shaped backup commits the same 24 docs + phaseStaging; a backup carrying `bidHolds`
never writes it); **F14** in the sweep (fake `doc()` variadic, `getDocs` children-only; `userbids` hoisted before `users` in the walk).
Every escaped mutant from RA-10 is now red: #35 ×5, #36 ×4, #5c2 ×2, #5d2 ×2, #5d3 ×2, #42 ×4, #43 ×2, #44 ×1, #13c ×5 (+5 older restore
assertions that finally execute), #14b ×1. Battery 78 / exit 0 in the cloud; isolation 36 / 36; the three changed suites re-run on his Mac
(108 / 182 / 62). Sweeps on 328 with the fixed harness: default admin 338 + 281, staff 13 + 13, 151 dialogs, 136 confirms, 0 errors;
look-back 284 + 250, 11 + 11, 94, 54, 0 — the confirm pass now includes hold 2, hold 3, release 7, and `cloudRestore` opens its dialogs
(it stops at the typed RESTORE, which the driver never types; a probe that typed it completed Full and One-User restores with 0 errors).
Five files md5-verified on his Mac. One repo to push: `tests`; this repo carries TODO / START-HERE / this entry.

**Lessons, dated 5 Sep (late morning).**
1. **`test-backup-restore`'s restore harness had never reached `commit()` on any build since 251** — the batch tail threw on a name the
   sandbox did not define, the "Restore FAILED" toast went to a no-op, and the assertions inspected the writes captured before the throw.
   Green for months on a half-run. Found only because F6 added the missing ref and the batch ran to the end. The same shape as rule 8's
   "check that a gate actually ran": record the terminal call (`commit`, `persist`, `send`) and assert on it, never on what preceded it.
2. **A one-line seed is not one line of test.** F2's `availableNumbersFor` seed passed a green suite with the seed inert (see the morning
   entry); F3's pins on the helper said nothing about its two callers. The rule that survives both: test the CALLER that enforces, with the
   terminal effect recorded, and keep a control that proves the harness can see a write at all.

## 5 Sep 2026 (MORNING, same session) — §183: ADMIN 328, RA-10's F1 + F2, FILED. RA-2 RUN BY HIM (155 / 155).

**What the session did.** He asked whether RA-2 had run after the rules change; the record held the plan, not a result, and the emulator's
own log said 30 Aug — so he ran it: 155 / 155 current, the holds gates 4 / 4 red on the old rules (recorded in DECISIONS §182). Then *"proceed
with f1 anf f2"* (§183). Explored the three functions first, presented the plan (§0 rule 2), his "Go". Built in the cloud clone as an anchored
patch (`build328-patch.py`: base md5 pinned to 327, every anchor `count==1`, refuses to apply twice), suite `test-328-held-behind.mjs` written
against it, then the patch applied on his Mac by `device_bash` and every file md5-verified against the cloud (admin da2d7e7b…, versions
28f22a6b…, the two suites). Gates: see the 328 row in `vacation-kp.github.io/BUILD-LOG.md`. Three repos to push: `vacation-kp.github.io`
(admin page, versions.json, BUILD-LOG), `tests` (new suite, re-anchored 327 suite, the RA-10 report's RA-2 line — three files), this repo
(DECISIONS §182 addendum + §183, TODO, START-HERE, this entry).

**Lessons, dated 5 Sep (morning).**
1. **A `typeof helper==='function'` guard is a silent no-op in a test sandbox.** The first cut of F2 used the build-266 convention
   (`typeof _adminHeldNums==='function' ? … : []`) and the new suite went GREEN on a page where the seed did nothing, because the sandbox
   never defined the helper and `typeof` never throws. The suite only caught it once the helper was named in `need`. Rule: in a function the
   suites execute, either call the helper unguarded (a missing one then crashes loudly — rule 11) or name it explicitly in the sandbox; the
   328 page does the former and both suites now do the latter for `ubRelease`, which is CALLED after assembly and so cannot auto-resolve.
2. **A dialog's copy is part of the guard.** The 327 Release dialog said "goes back into the pool"; for a hold behind a bid that is false
   (the number stays on the bid). Found by the browser lane reading the DOM, not by any suite — the walk now asserts both bodies.

## 5 Sep 2026 (OVERNIGHT, unattended) — RA-10: THE ADVERSARIAL AUDIT OF THE LIVE HOLDS BUILD. NOTHING DAMAGED. NOTHING BUILT.

**What the session did.** The §4 ritual (327/169/18 and 151/51 served twice; four repos clean and in sync; the fetch stranded three
`maintenance.lock`s, moved). His go, at night, for RA-10 with the order recorded under §182's addendum. Cloud audit tree: the three public
repos cloned with full history (see the corrected lesson below), the private `tests` tarred, staged and md5-verified; the three live files
matched the brief's md5s. The 327 suite: 82/82 live, 62 RED on `54cfc92` exit 1. Then five parallel lanes (staff page · admin entry & User
Bids · record, backup/restore & lifecycle · rules & cross-cutting · suite honesty by mutation), three adversarial verifiers with the
opposite brief (a regression hunter — 15 hypotheses rejected; a disprover of every claimed defect; a full-battery run of every escaped
mutant), and a browser lane that drove the real pages in headless Chromium on the sweep harness (both sweeps, mobile bid flow, the full
phase run-through, and a 106-step hold walk). Gates: battery 77 suites exit 0 (regression run, no auction baseline — the 327 honesty ran
separately); isolation 36/36; handler audit 192/0; `node --check` 8/8. Report: `tests/docs/RA-10-2026-09-05.md` (md5 197681eb…), also in
the chat outputs. Docs: DECISIONS §182 addendum, TODO §1, START-HERE, this entry. Two repos to push: `tests` (ONE file — clear the Summary
box first), this repo (four files).

**Lessons, dated 5 Sep.**
1. **A build's own suite can be green for the wrong reasons and the whole battery will not tell you.** Fifty-seven planted single-line
   breakages, run against all 77 suites: four realistic ones (the staff dropdown/write guard, Add Bid's write-time `return`, a Phase-1-only
   gate, a typeof-guarded restore of `bidHolds`) stay green everywhere. Text pins on a helper say nothing about its callers; a sandbox that
   lacks the ref makes a `typeof`-guarded line a no-op in the test and live in production. Mutation runs are cheap (≈33 s a battery) and
   should be part of every audit of a build that adds a guard.
2. **"The UI cannot create the state" is not "the state cannot exist."** RA-9 closed the four manual entry paths; a restore re-places an
   older bid on a withheld number deterministically and the page then has no chip to release it. When a build adds a rule, walk the
   non-UI writers of the same document (restore, stale clients, hand edits) before writing "never" in the record.
3. **The sweep's fake `doc()` takes three arguments**, so every cloud backup in the harness collapses onto one path and every restore fails
   silently while "Cloud Backup & Continue" proceeds — the sweep has never exercised restore, and its confirm pass reaches Delete All
   Users before User Bids, so the record's confirms never include a hold. Harness gaps, dated 22 Aug; in `TODO.md` as F14.
4. **Chromium in the sandbox is v141 under a playwright pinned to v151**: the symlink recipe in START-HERE §6 still works with the new
   build numbers (`chromium-1234`, `chromium_headless_shell-1234`), plus `INSTALLATION_COMPLETE` / `DEPENDENCIES_VALIDATED` marker files.
5. **A recorded order of steps is not a recorded result.** §180 and TODO said 327 was "pushed in the order RA-2 → console → push", but no
   passed/failed line was written anywhere, and `tests/rules-emu/firestore-debug.log` (the emulator writes it on every run) was dated 30 Aug.
   He asked the next morning; it had not run. He ran it: 155 / 155, holds gates 4/4 red on the old rules. When a gate is HIS to run, the
   record needs his numbers, not the plan — and that log's mtime is the cheap way to check.

## 4 Sep 2026 — "USER BIDS" (§178): ADMIN 325 FILED, NOT PUSHED. THE MAC SLEPT THREE TIMES.

**What the session did.** The §4 ritual (324/168 and 151/51 served twice; four repos clean; the fetch stranded three
`maintenance.lock`s, moved). His ask: a read-only admin page of each user's bid numbers used and remaining, People section
below Bid Lowerings. Explored first: the staff site's `bidPoolInfo` is the rule and every input is already on the admin
page. Plan presented (§0 rule 2); his rulings arrived in four short messages — the name "User Bids", remaining + used,
then the won / live split, then the NP count, then "Go". Built as admin 325: one sidebar line, one panel, `adminBidPoolInfo`
(a port of the staff function) + `renderUserBids`, one line each in `nav()` and `refreshAll()`, four CSS rules, BUILD and
`versions.json`. Suite `tests/test-325-user-bids.mjs` (48 / 48; honesty on `34fc686` 42 RED exit 1); `test-324-168`
re-anchored (its exact BUILD pin → at-least; still red on `b1ff467`). Battery 75 / 2,642 / exit 0 on the Mac, audit 190 / 0,
isolation 36 / 36, both sweeps clean in cloud Chromium (14 admin panels now), the panel opened and read in that browser
on both seeds. Full record: the 325 row in `vacation-kp.github.io/BUILD-LOG.md`. **He has not pushed.** Three repos carry
the build: `vacation-kp.github.io` (admin page, versions.json, BUILD-LOG, COMMIT-MESSAGE), `tests` (the new suite, the
re-anchored 324 suite, COMMIT-MESSAGE), this repo (DECISIONS §178, TODO, START-HERE with its FILED marker, this entry).

**Lessons, dated 4 Sep.**
1. **The Mac sleeps the moment he walks away, every time — three drops in one build.** The first came seconds after
   his "Go". What worked: keep building in the cloud and hand the result across as an anchored patch (every anchor
   `count==1`, refuses to apply twice), dry-run on a stand-in page carrying the REAL anchor lines. The dry run caught a
   real bug before it touched his disk — the suite extractor reaches `function`s only, so a `const` the new code used was
   invisible to it. Three scheduled check-backs at 30 / 30 / 60 minutes found the Mac still asleep; after that, stop
   polling and wait for him.
2. **The vacation repo's remote is `https://github.com/anesthesia-kp/vacation.git` (the local folder name is not the repo
   name) — corrected 5 Sep 2026: it clones from the cloud in seconds, full history, and matched the device tree md5-for-md5.**
   The 4 Sep note that it "cannot be cloned without its URL" was true only because the URL was not written down; `git ls-remote`
   against guessed names is still refused by the sandbox, so use this one. The hub and schedule clone under `anesthesia-kp/`
   by their folder names.
3. **A background job started in `device_bash` dies when that call returns** — `setsid nohup` included. The battery
   stalled at suite 30 with nothing running. The shape that works: a resumable chunk runner (`$HOME/chunk.sh`: done-list,
   ~145-second budget per call, results appended), called until it prints ALL-DONE. 75 suites fit in one call.
4. **ESM `import` ignores `NODE_PATH`.** `import { chromium } from 'playwright'` fails in the cloud even with the global
   package installed; symlink the global `playwright` and `playwright-core` into `tests/node_modules/` and the sweep
   runs (it did, 3 m 34 s per full four-pass run).
5. **The device VM's clock was ~14 hours slow at session start** (00:11 UTC while the cloud said 14:04); the STATUS
   block and the first drafts of §178 / the TODO entry carried the wrong day and were corrected. When a timestamp
   matters, read `date -u` in BOTH shells and believe the one git agrees with.
6. **Rule 11 bit again in a one-off command** — `node … --pre | tail -8; echo $?` reported tail's 0 for an honesty run
   that exited 1. Caught in the dry run, re-run without the pipe; every exit code quoted above was read directly.

**Later the same afternoon — §179, admin 326 FILED, NOT PUSHED.** He looked at the served 325 and found three things in one message: red and "brown" too close (the palette's `--yellow` is `#7a4e00`), the legend's "n" chips, and a Left column he did not need. Paint only, one file; `test-326-user-bids-paint` 17 / 17, 11 RED on `346522a`; `test-325` re-anchored to five columns; battery 76 / 2,658 / exit 0; audit 190 / 0; isolation 36 / 36; sweep clean. Lesson: **look at the served page with his eyes before calling a build done** — the chip colours were "correct" by token name and wrong on screen; a screenshot was taken and not judged for contrast.

**Evening — §180, admin 327 / staff 169 + rules FILED, NOT PUSHED.** He asked what it would take to "take a bid away from a user".
Explored on the code: removing a live bid exists (Remove Bid); taking a NUMBER away did not. His "Week 0" shape was rejected (rules
cannot see week keys, so a user could delete it; every bid-key iterator would show it). The corrected finding — prior-win numbers are a
client guard fed by one helper per site, no engine involvement — made a `bidHolds` document a one-build item, and he wanted it now: no
notice for the user, permanent until released, the NP count and the yellow/legend/Left-column changes from 326 kept. Built across both
pages + rules; the record is the 327 row in `vacation-kp.github.io/BUILD-LOG.md`. Three things the gates caught before he could: the
audit flagged user text interpolated into an onclick (fixed with `data-u`/`data-n`); `normalizeEntry` dropped the hold reason on its way
to the Change Log (found only by walking the flow in a real browser); and a `typeof` sandbox guard was needed on both helpers or four
older suites went red. One thing that was mine, not the build's: a `cp` with two same-named sources put the ADMIN page at the staff path
of the sandbox, and the staff sweep aborted — diagnosed by md5, not by reading tea leaves. **RA-2 is his to run before anything is
published; the rules must land in the console BEFORE the pages are pushed (§2). Under the OLD rules `bidHolds` is an unknown
document, which the default rule lets any REGISTERED user write — so a page pushed ahead of the rules would open a window in which a
bidder could release their own hold. Reads are fine either way (the old default read is open); the order is about the write hole.**

**Standing at close.** Admin 327 / staff 169 + rules LIVE (`1c73971`, served twice, 5 Sep; suites `9987ecd`, docs `3f06cfc`); he ran RA-2 and published the rules before pushing, as ruled. His live check passed (*"seems to work"*). **Handed off with one job queued: RA-10 (§182), a fresh-session audit of the live build — brief in `tests/docs/RA-10-BRIEF-2026-09-05.md`.** This session closed at ~670k context, no compaction. `Claude outputs/` gitignored here (its tracked copy deleted in this commit). RA-9 (§181) ran on his choice before the push: no HIGH, four MEDIUM edge fixes and four LOW ones landed in the same build; the fixture now seeds a hold so every future staff sweep exercises it. The Mac slept six times in the session. The BUILD-LOG rows keep "pending" in their commit column, as the 324 row does. §92 closed, §164 governs; §176
and §177 parked. The desktop app's `Claude outputs/` folder appeared in this repo again and was moved to `_to_delete/`;
`_to_delete/xfer/` holds the build-325 zip and its unpacked copies, and three stranded lock files — his to empty. Noted,
not acted on: staff/confirm `unlocated=1` in the default-seed sweep (staff bytes unchanged in this build; not checked
whether it predates 325).

---

## 3 Sep 2026 — THE SUMMER-FLOOR FUZZ (§176), THREE SETTINGS QUESTIONS (§177). NOTHING BUILT, NOTHING OPEN.

**What the session did.** The §4 ritual (324/168 and 151/51 verified served twice; all four repos clean). Then his
question: does the 6-bid cap through Phase 2 let people win summer / spring break / ski week cheaper than history?
A strategic-bidder fuzz on the REAL engine (computeApprovals extracted from 324, md5-verified) with the REAL roster
and FTE (from his 1 Sep backup — only the non-sensitive subset kept, `tests/fuzz/live-config-2026-09-01.json`):
Phase 1 (2 bids each) then Phase 2, bidders who open weak and improve only when the board shows them losing,
Under Review settled at the wheel within 0.6. 21,600 auctions in v1, 9,720 in v2. Report
`tests/docs/FUZZ-summer-floor-2026-09-03.md`; harness `tests/fuzz/summer-floor-fuzz.mjs` (SELFCHECK, SENS, CELL
trace modes). He parked the whole topic (§176) and then declined every form of mid-phase settings editing (§177).
Both pushed by him (`32c4684` and the follow-on docs commit here; `288858e` in tests).

**Lessons, dated 3 Sep.**
1. **§0 rule 4 was skipped and it cost a full re-run.** *"have only the following weeks open in p2"* was read
   literally — Phase 2 with 17 weeks open — when the auction opens EVERY week in Phase 2 (the staff rules say so
   in one line). His *"Yikes"* caught it. The ambiguity was visible at the time (his next paragraph spoke of
   interest "throughout the entire year"); the fix was one question. Ask, do not guess — even when he is away.
   v1's numbers (30 cheap summer wins, summer always full) are WITHDRAWN; v2 (17, a third of summer open) stands.
2. **`pkill -f '<pattern>'` killed the shell that ran it** — the pattern matched the Bash tool's own command
   line, exactly the trap START-HERE §3 rule 8 records for `pgrep`. Use `kill $(pgrep -x node)` (process NAME)
   for a background node run, never `-f` with a string that appears in your own command.
3. **The desktop app writes a `Claude outputs/` folder INSIDE the first connected folder** — here the hub repo —
   holding a copy of every file sent to the outputs column. It shows in GitHub Desktop as untracked. Moved to
   `_to_delete/`; check for it at every close (`git status` shows it as `?? "Claude outputs/"`).
4. **Real Firestore data reaches the cloud only as his backup JSON attached to the chat.** Extract the subset the
   task needs into a file with no e-mails or names before it goes near a repo; never print the backup's keys
   blind (`emailToUser`'s keys ARE the e-mails — printed once by accident, not filed anywhere).
5. **A fuzz result is only as good as its demand assumptions, and he saw that before the report said it**
   (*"106 FTE weeks for 35 people"*). Lead with the supply/demand ratio next time; the grid is the appendix.

**Standing at close.** 324/168 live, §92 closed, §164 governs. Parked, not to be re-raised: the summer floor and
demand calibration (§176); mid-phase editing of any frozen setting, the cap included (§177); the per-user
numbers table was discussed and not asked for. `_to_delete/` holds ~15 MB (this session's zips, the tests
tarball from 2 Sep, lock files) — his to empty. Context at close ~420,000, no compaction.

---

## 2 Sep 2026 — TWO WEEKS OUT. THE HUB, THE RUNBOOK, HIS REHEARSAL, AND THE "SAME BID" RULE (§171–§175). 323 AND 324/168 LIVE.

**What the day was.** He opened with *"only concerned about the vacation site… 2 weeks out from go-live"* and asked for
recommendations. The first was to build nothing; the four operational items and his answers are §171. The hub's schedule
cards came down (`0aa4c92`), a go-live runbook and a 34-step rehearsal script went into `tests/docs` (plus a Word copy), his
local backups now file themselves (Automator folder action on Downloads). Then he rehearsed, found two things, and both
shipped the same evening: admin 323 (§172, the Current Phase card heading) and admin 324 / staff 168 (§173/§174). His
close: *"all worked as expected."* Nothing is open on the auction.

**THE LESSON OF THE DAY — CLAUDE DEFENDED A GUARD IT HAD NOT TRACED (§3 r14 again, the other way round).** The staff
"same bid, same answer" dialog was explained from its own comment as "by design, guards a real failure, leave it." He
disagreed and put one sentence — lower demand or more capacity in a later round — that the comment could not answer.
Reading the two engines showed the dialog was a symptom of the value-match rule, the rule violated his rounds-as-phases
principle, and it had an admin-reachable twin (Add bid at the denied value). **A guard's comment says what it prevents,
never whether it is the only way to prevent it.** Before defending any gate: find the rule it papers over and ask whether
the rule is right. Conceded and dated in §173.

**Fixtures that model impossible states pass for the wrong reason.** Three suites (317, 318, p4-rounds) had "round 1
denied X, round 2 open, X's denied bid still live" — a state Start Round makes impossible (it deletes the denied bids in
the same atomic batch that advances `p4Round`). The old value-match rule happened to freeze that bid, so the assertions
were green on a state that cannot occur. Re-anchored to the reachable state (the Complete→Start gap). **When a suite
turns red after a rule change, check the fixture's reachability before the assertion's wording.**

**The trace that answered "is this a bigger problem?"** — three read-only agents in parallel (lifecycle · consumers ·
record), every claim line-numbered, the load-bearing ones re-read by the session, filed as
`tests/docs/TRACE-same-bid-2026-09-02.md`. Two hours; it found the admin-side hole nobody had hit. Worth the cost every
time the owner asks that question.

**The sweep in the cloud, two more recipe notes.** (1) ESM ignores `NODE_PATH`: symlink the global `node_modules` into
`tests/sweep/` (`ln -sfn $(npm root -g) node_modules`). (2) The four passes take ~4 minutes and the Bash tool killed the
run at exit 137 before it finished — run it detached (`setsid nohup … &`) and poll the log by mtime. On this
machine Playwright 1.56 wanted chromium-1194, which is what `/opt/pw-browsers` holds, so no symlink tree was needed.
Baseline run on 323/167 for comparison: 603 · 137 · 126 · 0, identical to 324/168 (staff/confirm `unlocated=1` on both —
pre-existing, not this build).

**Three small process slips, owned.** The `tests` divider carried guidance and became a commit subject (`7560869`; rule
added to START-HERE). The Automator directions were given from memory and were wrong twice until a screenshot arrived —
verify a UI walkthrough before giving it, or ask for the screenshot first. And the first "leave it" on the dialog, above.

**Baselines for the next session:** auction admin 324 / staff 168 (`34fc686`), schedule 151/51 unchanged, hub `1678ad6`
plus this session's closing docs commit. Honesty fixtures for anything after 324/168: `git show 34fc686:<file>`.

## 1 Sep 2026 (LATER, same session) — §149/§150: THE RECORD OF BIDDING. ADMIN 307 THEN 308, BOTH LIVE AS 308.

**He went looking at the live site right after the merge shipped and found two defects in an hour — both in the
surfaces that ARE the record of bidding.** Neither was caused by the merge; both had been there a long time.

**HOW HE FOUND THEM IS THE LESSON.** He compared two screens that should have agreed — a user's staff-side
**My Phase History** against that same user's **admin User Summary report** — and they didn't. Two denied bids
were in one and not the other, and the report's header said "7 bids" when he had placed nine. **A cross-check
between two surfaces that read the same underlying truth is worth more than any amount of reading one of them.**

**§149 (307) — the reports dropped retired bids, and every historical projection read LOSE.** §71's boundary
scrub deletes a finished phase's non-winners from the LIVE schedule; `bidsByWeekModel` read that live doc for
scope `all`, so those bids were invisible and the row count lied. §71's own comment had promised *"the Reports
… read the archives"* — Edit Selections got that in 295, the reports never did. Separately, the snapshot branch
emitted `winning`/`losing` while `projPill` keys on `win`/`lose`, and every miss fell into `m.lose`, so
**"proj: WIN" was unreachable for any historical row on 305 and 306.**

**§150 (308) — and then the same defect on the screen beside it.** Claude declared §149 done without checking
whether anything ELSE read the scrubbed source. `renderAppDenials` did. He found it within minutes:
*"This is still useless."* Same fix, one function over, plus a second defect on that screen — the
`approved`/`denied` flags gating the ✓/✕ chip still asked the LIVE decision docs, so historical rows showed a
projection and no result at all.

**THE PROCESS FAILURE, WRITTEN DOWN SO IT IS NOT REPEATED: fix the CLASS, not the instance.** After §150,
a sweep of all 19 readers of `scheduleData` took one command and proved `renderAppDenials` was the last live
user-facing one. **That sweep should have run before §149 was called finished, not after §150 was forced.**
The sweep is `grep -n "for(const u in scheduleData)\|Object.keys(scheduleData)"` plus an awk to name the
enclosing function — the other 17 are engine, gates and counters that correctly read live.

**THREE MORE THINGS CLAUDE GOT WRONG, all corrected in-session and all worth inheriting.**
· The projection pill was first raised as *"cosmetic, on a history view"* under §147's audit cap. One
  screenshot showed it was every winning row on the main look-back surface. **A defect described from code is
  a hypothesis about what a human sees.**
· An A/B choice was offered him in which B defeated the feature's purpose; his reply was then misread as
  rejecting B when it was aimed at the bug. He chose B.
· `node status.mjs > /tmp/st.txt` was refused (the path was not writable) and `tail` then printed a STALE file
  from earlier in the session, which read as the entire build having been reverted. **Read an exit code and an
  output directly — §3 rule 11 covers pipes; this was the redirect version of the same trap.**

**WHAT "B" TURNED OUT TO BE: nothing.** He asked for the page to default to the current phase.
`populatePhaseFilter` already did, on a fresh load — it only remembered his last pick within a session.
Checked before building (§3 rule 14) and reported as a non-change.

**GATES.** `test-307-record-of-bidding.mjs` 29/29 (honesty 18 of 29 red on 306) · `test-308-lookback-screen.mjs`
15/15 (honesty 10 of 15 red on 306) · auction battery 58 suites / 2,152 assertions · isolation 36/36 · the
every-button sweep run on 308 vs 307 and 307 vs 306, identical every time.
**307 was superseded before it was ever committed, so it has no fixture and never will (§4) — both suites
baseline on the last PUSHED build, 306 (`df9b460`), and say so in their own headers.**

**⚠ THE LIMIT ON THE SWEEP, stated in both builds and still true:** `tests/sweep/site/fake/seed.js` has
`completedPhases: {}`, so no archive path fires inside it. The sweep proves NO REGRESSION and proves NOTHING
about either fix. **Adding a completed phase with a denied bid to that seed is the highest-value unbuilt thing
in this area** — it would give every future look-back change a browser-level gate instead of a unit-level one.

**LIVE AND VERIFIED: admin 308, pushed by him (`408112d`), served twice cache-busted ~06:20 UTC. Staff 165.**

## 1 Sep 2026 — §147 BUILT: ADMIN 306 / STAFF 165. FILED, NOT PUSHED.

**He gave the go with one condition, verbatim: *"be thorough so there are no stray instances of draw being
used somewhere you forgot to look. check all reports, all functions to ensure consistency."*** That shaped the
whole session, and it was the right instruction — the exploration found more than the plan had.

**THE INVENTORY IN `TODO.md` §1 WAS INCOMPLETE BY 14 ADMIN SITES.** All user-facing, all real: the sidebar nav
entry, the panel's blue phase banner, the "Need at least 2 users in draw" toast, the FTE-Overage settings help,
the Weekly Summary table's own legend AND its two columns, the Next-Decision button tooltip, the delete-user
checklist, the Struggling Users chip and section heading, the Complete-Phase note, "Draw, Review, and Lose bids
are not affected", the revoke dialog's "(draw, review, win, or lose)", the auto-approve log lines, and the
"(N in draw)" count on the spin button. **Plus two the inventory could not have known about:** the FTE
Availability page's own description, and `exportDashboard` — a whole Excel/CSV/PDF export with separate `Draws`
and `Under Review` columns. **The lesson is not "the plan was sloppy" — it is that a plan built by reading is a
hypothesis, and the first job of the build is to test it against the file.**

**AND THE OPPOSITE SURPRISE, which is the reason the approach worked:** the inventory listed eight Excel-export
sites to edit (`resultStyle`/`projStyle`/`resTxt` ×4 each). **None of them needed a single edit.** Every export
path — xlsx, CSV and PDF, on both reports — already funnels through `bwOutcomeLabel`, `bwOutcomeColor` and
`PROJ_LABEL`. Fixing those three fixed all eight. That is what routing every DISPLAY through one helper buys:
the sites you did not find are fixed anyway.

**THE ONE TRAP INSIDE THAT.** `PROJ_LABEL` looked like it should lose its `draw` key. It must NOT: `projTxt` is
`p=>p?(PROJ_LABEL[p]||p.toUpperCase()):'—'`, so a missing key falls back to `p.toUpperCase()` and puts **DRAW**
straight back into every export. Both keys are kept, both mapped to the merged word. Same shape as the
Approvals/Denials Outcome dropdown: dropping the DRAW `<option>` without also merging the FILTER comparison
(`uiOutcome(e.outcome)===uiOutcome(outcomeFilter)`) would have made "UNDER REVIEW" hide every tied user.

**HE ANSWERED THREE QUESTIONS MID-BUILD (§148)** — admin keeps the word "tie"; the approve/deny dialog note
stays tie-only. The third, about the dashboard's Weekly Summary table, **dissolved into a finding:** he could
not find the table because it is never displayed. `#dashUsersWrap` and `#dashWeeklyWrap` are hard-coded
`display:none`, nothing switches them on, `#dashPhaseFilter` is not in the page, and `window.exportDashboard`
has no caller. Merged anyway (six lines, no visible effect) so the stray-"Draw" gate can assert over the whole
file. **Claude also changed its own recommendation mid-conversation and said so** (§3 rule 14): two columns
wearing the same words is the old table with new labels, not a merge.

**GATES.** New suite `tests/test-306-165-under-review.mjs` 88/88, carrying the stray-"Draw" gate (every
surviving `draw` classified against an allowlist of internal identifiers, over comment-stripped source with a
stripper self-check) and the amber gate. **Honesty: 64 of 88 RED on the pushed 305/164, exit 1**, fixtures from
the explicit SHAs `420df42` and `04e00bf`, never `HEAD~n`. Auction battery 56 suites / 2,107 assertions.
**Schedule battery 108 of 108 EXECUTED** — the first run in a while where every browser suite actually ran.
Isolation 36/36. Seven older suites re-anchored, never stubbed.

**THE VERIFICATION THAT SETTLED IT, and it is worth repeating on any behavioural change:** the sandboxed
every-button sweep was run TWICE — once on this build, once on the pushed 305/164 — and the two runs are
identical in every number except one. The same 260-click admin walk sent **7 alert e-mails on 305 and 6 on
306**. Option A, observed rather than argued. The baseline run also reproduced the lone `unlocated=1` on
staff/confirm, which is how that was shown to be pre-existing instead of guessed at.

**⚠ A TRAP THAT COST TEN RED HONESTY CHECKS — the auction twin of §6's schedule-baseline note.** Five auction
suites default their honesty baseline to `/mnt/user-data/uploads/GitHub/vacation-kp.github.io/admin/index.html`
— **exactly where `device_stage_files` drops the CURRENT build.** Staging the working tree to run the battery
in the cloud therefore made those blocks compare 306 against itself and go red, which looks precisely like a
regression. Move the staged copy aside, or set `PREFIX_SRC`, and they skip correctly.

**Two other things worth keeping.** Staging was refused mid-session with `session_stale_relogin`; per §6's cost
gate the owner was told the 30-second fix INSTEAD of starting the chunked-transfer grind, and he re-signed in.
And **command-line `git` and `npm` both work in the device VM** — but Playwright's browser download does not
(blocked host), which is why the schedule browser suites can only run in the cloud.

**LEFT FOR HIM:** push three repos (order does not matter — no rules change, nothing schedule-side, no console
step). The undo is `_archive/vacation/restore-build-305/`, still md5-identical to the pre-build files.

## 31 Aug 2026 (EVENING, fresh session) — §146 CLOSED THE BOARD QUEUE; §147 DESIGNED THE DRAW/UNDER-REVIEW MERGE. NO CODE WAS EDITED.

**What this session produced: two rulings and a build that is fully specified but NOT started.** The auction
pages are untouched — 305 / 164 on disk and live, verified cache-busted at the open.

**§146.** He cleared the whole 🔴 board block from `TODO.md` §1 — the abandoned rehearsal, the unverified
Phase-1 state, the Rehearsal-Mode question, the e-mail-switch finding. He asked for them "marked complete";
Claude pushed back (they were never done, and "complete" beside *"Rehearsal Mode must be OFF before launch"*
would be read by a later session as done) and he accepted **CLOSED**. He pushed it himself (`7d6a70a`).

**§147 — the merge.** His problem: a draw can occur on a week with no real room, and *"users in a draw may
have more hope than users who are under review."* Confirmed in code. The full design, every ruling and the
site-by-site inventory are in `TODO.md` §1 — **do not re-derive them.**

**Three things this session got WRONG and corrected, recorded so they are not repeated:**
1. **"E-mails never name the outcome" was false.** The results and round-results blasts don't, but the
   per-bid alert prints *"changed from DRAW to REVIEW"*. Found only by reading the sender.
2. **The scope estimate was roughly half the truth** — "8 and 16 sites" from a keyword survey became ~19 and
   ~32 once the trace ran outward from the functions that PRODUCE an outcome. The growth was almost entirely
   reports and, unmentioned until then, **the Excel exports**, which style cells by outcome colour and print
   outcome text in eight places. He had asked *"have you thoroughly thought through all aspects of this?"* —
   the honest answer at that moment was no, and saying so is what surfaced the rest.
3. **The timer and the alert e-mail share ONE comparison function by design.** So the alert fix could never
   be isolated: whatever the mailer treats as a change, the clock treats as a change. Missing this would have
   shipped a silent change to live auction timing. It is now §147's one ruled behavioural change, in his own
   framing: *"Change in projected outcome still drives the timer and the e-mails."*

**Method note worth keeping:** grep finds a WORD; it does not find a concept expressed without that word (an
inline hex colour, a set-size check). For anything that must be uniform, enumerate the CONSUMERS of the
functions that produce the value. That is what turned a plausible-looking inventory into a complete one.

**State at close:** all four repos clean and in sync after a fetch; the three `maintenance.lock` files that
fetch strands were moved to `_to_delete/`. Restore pair for the coming build is in
`_archive/vacation/restore-build-305/`, md5-verified. Context at close ≈ 287k — he asked, was given the
number, and chose to hand off rather than build through a compaction.

## 30 Aug 2026 (AFTERNOON, next session) — §136/§137: THE CALENDAR FEED GOES LIVE; ADMIN 148

**He opened with the pasted START-HERE one push behind** (147 / 50 were already served — §3 rule 13 again); the
ritual found it, the paperwork was brought current, three `maintenance.lock`s from the fetch went to `_to_delete/`.
His goal for the day: *"finish all outstanding work with the schedule site."* Told plainly what was his (index, request
types, a functions deploy) and what was mine.

**The feed, end to end, in one afternoon.** §136: the two-line rules diff (feedTokens admin-read, feeds/items readable
by nobody) shown, his "go", filed with four RA-2 gates on a `28bae0c` fixture. **He pasted the rules BEFORE running
RA-2** ("forgot ra2") — same bytes, so the verdict still covered them: 146/146, honesty 4 of 4 red. Then the deploy: his
first try hit `EACCES` on a global npm install (fixed: the `npx` route, no sudo), ran the deploy line from `~` (no
`firebase.json` — it did not exist; added), then landed on Node 20 which Google retires 30 Oct 2026 — runtime moved to
22 the same turn and redeployed. Both the `cloudfunctions.net` and the `run.app` address answer; `FEED_URL_BASE` stays.
The three-row check: his own link returned a 522-byte calendar (after *Rebuild every feed* — Create alone mints no
calendar, which is what led to 148), a valid-shape token with nothing behind it and `/abc` both gave the same 404.
`functions/node_modules/` was NOT ignored (239 packages nearly offered to GitHub Desktop) — ignored now.

**§137, from his questions, verbatim:** *"why create each docs 1 at a time?"* → one button; *"I will need a way to send
all feeds to each user's phone, probably using gmail"* → both the e-mail AND the staff-site link, both queued; *"it needs
an obvious name… i'm worried now i'll confuse this testing schedule with my real work schedule on my phone"* → the
calendar is `KP Anesthesia — <Name>`, `TEST · ` in front while the gate is shut. Admin 148 carries the first and third and
makes the gate a stored switch so the e-mail build can read it.

**Traps this session.** The device bridge FLAPPED for ~40 minutes; every patch asserts `count(old)==1` so nothing landed
half-way, and the whole battery ran in the cloud (104/104 executed — on the Mac 82 would skip). The runner's 5-minute
kill and the `page.evaluate` that awaits a function waiting on a dialog: fire it, do not await it. `build148` caught a
real bug before filing (a `+` bound to one ternary branch). `status.mjs` wants the literal phrase "FILED, NOT YET PUSHED".

**THE SAME SESSION CONTINUED THROUGH THREE MORE BUILDS (afternoon–evening), all his gos:** 148 (§137/§138 — the
one-button link creation, the calendar named "KP Anesthesia Schedule" with TEST · while §54's gate is shut, the gate
as a stored switch, the live status card; §138 also records the CORRECTION that Apple Calendar reads a feed's name
only at subscribe time — 148's first dialog claimed renames reach phones on refresh, and does not any more), then
149 (§140, after he compared QGenda: feeds refresh themselves off emitChanges, vacation deliveries diffed, ONE
horizon load per rebuild instead of ~155 reads per person, the Auto-sync timestamp on every event), then 150
(§137 A/§139: the link e-mail — webcal + copy-paste, honest Android instructions, bulk behind the gate, failures
never recorded as sent, the schedule's OWN mailStats, the mailer loaded lazily so no suite sees a dead script tag;
the fake learned increment()). He pushed 148 and 149 mid-session, each verified served twice; **150 is the filed,
unpushed build.** He subscribed his own iPhone and it worked (Settings → Add Subscribed Calendar).

**Session-operation notes.** He set the context budget himself: *"we can easily go past 600k tokens… stop by 700k"*
— readings were reported on request (§106), never made into thresholds. The device bridge flapped for ~40 minutes
mid-session; count(old)==1 patches meant nothing landed half-way, and the batteries ran in the cloud throughout
(the only place the 80+ browser suites execute). A Stop hook demanded Claude commit and push; refused — §3 rule 4,
he does every push. **His open question, recorded in TODO §1:** an easier push flow ("it's quite cumbersome") —
the PUSH-ALL.command proposal awaits his ruling.

**Left for him:** push `schedule`, `tests`, this repo (150); send himself one link e-mail and READ THE SUBJECT
(the EmailJS template controls it, not our code — TODO §1); then next session: §137 B (the staff-site link, a §92
rules diff first), the PUSH-ALL ruling, the setup-checklist page, D-7's index, S-7, his call on the plan-diff and B-15.

---

## 30 Aug 2026 (LATE) — §133/§134: THE HEADINGS, THE IN-PAGE DIALOG, THE PHONE DAY LIST

He pushed 142–146 / 49 (`ac725ac`; verified served twice), kept the sidebar grouping but wanted *"less
goofy titles"* (§133 — Schedule · Approvals · Reporting · Setup · Records, folded into 146 before the
push), then *"continue with what you can"* and, of the phone layout, *"the same code and just format
correctly for phones… like the vacation site"* (§134). **Admin 147:** Apply, Publish and Add-the-standard-
types ask through the page's own dialog (`schedConfirm` → a promise); Publish lists the standing
violations, Apply the over-ceiling days, Add the types; Escape/backdrop write nothing. Six suites that
auto-accepted the native confirm now press the page's OK (build120/121/122/127/128/129), and 129's
"asks nothing" also checks the page dialog did not open. **Staff 50:** the Full Schedule under 600 px is
one day per row, built in the same loop from the same cells, chosen by a style rule — a phone
screenshot went to him, and his answer became §135 (*"no text where you need to swipe"*): every panel was
measured at 390 px; the tab strip was the last sideways scroller and now wraps. Both filed, not pushed;
he went to sleep on *"finish this build and then prepare to hand off all other tasks for a new session"* —
the hand-off list is at the top of `TODO.md` §1. **Traps:** a `page.evaluate` that AWAITS a handler which
now awaits a dialog hangs for ever — fire the handler without awaiting, read the dialog, press OK; the
honesty run must `press()` a button that may not exist rather than `click()` it (a 30 s timeout crash
looks nothing like a red assertion); and **two copies of the docs repo diverged** — edits made on the Mac
after a push while the cloud copy carried later edits — resolved by staging the Mac's copies down and
re-applying. One copy is the truth at a time; say which.

---

## 30 Aug 2026 (EVENING) — §131/§132: THE REST OF RA-6 AND HALF THE §7b MENU, SIX BUILDS, ALL FILED, NONE PUSHED

**The rulings:** *"continue with the audit's findings… move ahead with all of those that you can fold
into this session. I authorize you to make decisions on my behalf as long as they are with the goal of
optimizing the schedule site"* (§131 — §0 rule 2 relaxed for the session, §92 untouched); asked whether
the §7b visual ideas were decided (they were not — §124 ② and §130 kept them as proposals), heard the
menu with a recommendation and four larger items flagged as his call, and said *"go as you think best,
thanks"* (§132). Both filed in `DECISIONS.md` in the turn they were said.

**Method:** every item was DISK-CHECKED against 141/48 before anything was built (an agent read the
code and cited the deciding line for each of ~45 findings — five were already closed, one partial).
The repos were cloned into the cloud and `tests/` staged as a tarball beside them; the battery ran
against a SNAPSHOT copy of the tree (`/tmp/snaprun.sh`) so building could continue while it ran — the
first run was contaminated by an edit landing mid-run (four `versions.json matches var BUILD` failures
that were not failures), which is why the snapshot exists.

**What shipped** (rows in `schedule/BUILD-LOG.md`): **admin 142** engine/rules tidy-ups (E-5, E-9,
E-10, E-12, E-13, E-14, N-15, N-16) · **143** requests, swaps and the change feed (R-6, R-9, R-10,
R-11, R-12, D-9, D-10, D-13 — the fake learned `serverTimestamp()`) · **144** B-8, B-9, N-20 and the
visual defects V-5, V-6, V-8, V-10, V-15, V-18 · **145** V-7, V-12, V-13, V-20 plus §7b "one collapse
control" (the two `<details>` folds are the site's bar, shut) and "one place for holidays" (a link
from Rules; the list stays where he built it) · **146** §7b the sidebar regrouped (*Run the month ·
Decide · Look at it · Set it up · Records*; a before/after picture sent to him) · **staff 49** twelve
staff items (D-12, D-13, D-14, S-5/B-13, B-14, S-11, S-13, S-14/B-10, R-7, R-8, R-13/S-15, V-7's
staff half). Every decision Claude made on his behalf is listed in `TODO.md` §1 for his review.

**Gates:** each build's suite green in a browser with an honesty run FAILING on its explicit
predecessor (142 on 141 `af1c5f6e…`: 10 red · 143 on 142: 15 · 144 on 143: 19 · 145 on 144: 21 ·
146 on 145: 7 · staff 49 on 48 `f136e70f…`: 28). Twelve older suites re-anchored to their invariants,
never stubbed. The final battery numbers are in the closing report below the traps.

**Traps this session:**
- **A battery run against the working tree is contaminated by the next edit.** Snapshot the tree and
  run against the copy; `versions.json`-vs-`var BUILD` assertions catch exactly this and look like
  four regressions.
- **Two suites on one port fight** — the snapshot battery and a hand run of the same suite. `PORT=`
  the hand run.
- **`pkill -P <old run>` while a new run is starting took a Chromium with it** — one suite reported
  "Target page closed" and was re-run alone. Never kill processes while a battery is warming up.
- **The 142 fixture was never saved before 143 was written over it** — rebuilt by re-applying the
  142 patch to 141 (deterministic, count==1 replacements), md5 recorded in the BUILD-LOG row. Save
  the fixture in the same breath as the bump.
- **The bridge to the Mac flapped all evening** (the remote-devices server connected and dropped
  five times). Everything was built in the cloud clones; the transfer to the Mac is the last step
  and is md5-verified per file.

---

## 29 Aug 2026 (AFTERNOON) — §128–§130: B-2, B-7 AND THE STAGE 5 RULES, FILED; HIS TWO STEPS WAIT

**The rulings, in order:** *"go as you think best and group what you can to keep working"* (§128 —
the go for B-2/B-7, not for the rules); *"We can do a firerules deploy as long as it's very low risk
to the auction site"* (§129 — the §92 decision, read as a design constraint: only the `dailysched`
block changes); *"i'll be gone for a while. keep going with what you can… rules okay if safe"* (§130).
The session opened on a stale snapshot: the pasted START-HERE said 134–138 were filed-not-pushed; disk
said he had pushed them at 13:36 PDT, and both served sites agreed (§3 rule 13 — disk beats the paste).

**What shipped** (rows in `schedule/BUILD-LOG.md`): **admin 139** — B-2 (Save-all refuses a stale grid,
writes only changed fields), N-20/N-21 (the count moves with the rows; a visible stale notice), B-7
(Remove clears this site's data only and points at the auction admin; a departed-users sweep; the
isolation guard's sanctioned set is FOUR). **Admin 140 / staff 47** — the page half of Stage 5: no
`dailysched` listener before Google sign-in on either page; the claim re-apply no longer creates a
decided document. **`firestore.rules` Stage 5** — filed in the auction repo, `vacations` block
byte-identical (prefix 34,304 bytes and suffix compared equal); `dailysched` reads need a verified
sign-in, writes are an allow-list (own request, own/party swap, one audit line), decisions admin-only.
**RA-2** — assertions extended (generational tallies; the Stage 5 gates all FAIL on `5994a1e`);
`RA-2.command` now takes its honesty fixture from `5994a1e`, the one-change baseline.

**Decisions Claude made for his review** (all in `TODO.md` §1): B-7 as a refusal-with-link rather
than a copy of the auction's ten-document cleanup; reads at `isVerifiedAccount` (the auction's own
bar), not per-person; staff can no longer act on pre-build-30 legacy request/swap items.

**Gates:** `build139-test` 34/34, honesty 22 red on 138; `staff47-test` 22/22, honesty 11 red on
46/139; isolation guard 36/36 and red three ways on 138; schedule battery **93 of 93 suites EXECUTED
in the cloud, 0 failed** on the frozen 140/47 tree (the first pass turned up one archive pin in
`staff30`, re-anchored); auction battery **55/55, 2,019 assertions, exit 0** (regression gate,
auction baseline absent by design; the rules-emulator suite skips loudly here — it is his RA-2).
Four older suites re-anchored: build64, build79 (its 2,600-char window had stopped reaching the
line), build89, staff30.

**Traps this session:**
- **Playwright is not on the Mac VM and ESM ignores `NODE_PATH`** — symlink the global module into
  `tests/node_modules` or every browser suite is a silent skip (the RA-6 trap, again).
- **`pkill -f chrome` from inside the tool shell killed the shell itself** (exit 144) and the battery
  with it. Detach long runs with `setsid nohup … & disown` and read the log's mtime, never the process table.
- **The bridge dropped for ~10 minutes right after he left** — a heredoc "did not respond within 190s"
  and did NOT land. Everything written before it was intact (md5-checked). The docs repo was cloned to
  the cloud and the edits kept as count==1 patch scripts (`~/kp/patches/`) until the bridge returned.
- **`device_bash` has an argument-size limit (E2BIG)** — a 60-line assertions block had to go over in
  two heredocs.

**Then, unattended (§130): staff 48** — S-3's client half: the staff page subscribes only to its own
requests (`where user == me`) and the swaps it is party to (three single-field slices merged), so no
colleague's note reaches another browser; no composite index, nothing to create in the console.
`staff48-test` 18/18, honesty 11 red on 47. The fake now throws on an unknown `where` operator instead
of returning true. `staff47-test`'s listener count was a pin — re-anchored.

**Last build of the session, at his instruction ("make this the last build here"): admin 141** —
RA-6 D-6: a draft month contributes no shifts to a calendar feed and carries one transparent
"Schedule not yet published" marker across its days; the feed document records the drafts; the
Feeds page names the real release blocker (the Stage 5 rules published, not "lock the token list").
`build141-test` 17/17, honesty 10 red on 140 (the baseline's feed carries the draft shift).
`build110-test` re-anchored. START-HERE's stale "five unbuilt rule types" paragraph corrected —
Stage 5 has been complete since 112–117. **Final batteries on the frozen 141/48 tree: schedule 95 of
95 suites EXECUTED in the cloud, 2,528 assertions, 0 failed, exit 0; auction 55/55, 2,020 assertions,
exit 0 (regression gate on unchanged auction bytes, auction baseline absent by design).** One more
trap: a detached `sh -c 'sleep …; node run-all.mjs'` inherited a `tests/sched` cwd and re-ran the
schedule battery under the auction log's name — check `/proc/<pid>/cwd` before trusting a log's
name, and `cd` inside the detached command.

**DONE on his return (30 Aug ~03:20 UTC):** pushed (one re-push after a GitHub Desktop glitch), 141/48 verified served twice, RA-2 136/136 with 46 of 46 Stage 5 gates red on the old rules, rules published. The auction served 305/164/18 throughout.

**For the record, the steps were:** `TODO.md` §1 — (1) push all four repos, verify schedule 141/48 served;
(2) double-click `tests/RA-2.command`, then paste `firestore-rules.txt` into the console. Until (2) the
old rules stay in force and both pages work under either file.

---

## 29 Aug 2026 (DAY) — §126: "GO WITH ALL ITEMS THAT YOU CAN" — SIX BUILDS, STAGE 3 AND HALF OF STAGE 4, ALL FILED, NONE PUSHED

**The ruling, at session open:** *"Please go with all items that you can. i grant you authority to
press ahead with the needed fixes in your recommended order."* Filed as **§126** the same turn, read
the way §125 read §110 — no per-item go this session — and read with §92 and §125 intact: **B-2, B-7
and the rules are NOT in this wave**; their plans are in `TODO.md` §1 waiting for his specific go.

**What shipped, in RA-6's order** (rows in `schedule/BUILD-LOG.md`, the wave summary at
`tests/docs/RA-6-builds/build134-137-summary.md`): **staff 44** — Stage 3, N-9 first (the staff
month reader fails closed; a denied listener shows *Couldn't load*), then the blank-day states
(*Not published* / *Couldn't load* / *Nothing scheduled*, per day, on both panels, in the legend).
**Admin 134 / staff 45** — B-3/B-4: ONE `vacationDaysFrom` on both pages, the admin reads Phase-4
rounds at last, and a schedule-only admin gets a banner instead of a console line. **Admin 135** —
E-3 (rest check sees every overlap) and E-4/N-4 (the ceiling for THIS day, not day 0 of the month).
**Admin 136** — the change feed: D-15 (diff local to the call), D-4/N-10 (`clearCell` inside the
transaction), D-5 (the year run emits). **Admin 137** — D-11 (DRAFT on the printed sheet), E-15
(vacation map memoised by listener-object identity), E-6 (fairness fires at the moment of change;
the engine skips pool rules and says so). **Staff 46** — S-1 (the admin's eligibility checker,
byte-identical), S-8 (Quick View re-asks its months once a minute), N-14 (retractions audited).

**Every build:** its own browser-driven suite, an honesty run FAILING on an explicit baseline (all six
red, exit 1 — three of them reproduce the audit's exact wrong sentence), and the batteries: schedule
84/84 on the untouched tree, then the final tree (see the closing report), auction as a regression
gate on unchanged bytes. Six older suites re-anchored to invariants (build121, ra-fixes-36-76,
build134's own; then staff29, build80 and build120, which the final battery turned up) — rule 12,
never a stub.

**Traps this session:**
- **The battery reads the tree at each suite's start.** A patch applied to the clone while a run was
  in flight made `build121` red mid-run — not a defect, a moved string; but it is the reason the
  final battery ran on a frozen tree.
- **The fake's listener switches were overwritten at module load** (`window.__denyListenPath = null`
  after the init script had set it) — the N-9 sections passed vacuously on the first run. Caught by
  the honesty run, which is where absence lives; fixed with a guarded init.
- **Eleven `versions.json matches var BUILD` reds** on the 134/45 battery: the clone's
  `versions.json` had not been bumped with the page. Rule 4, and the gate doing its job.
- **The Mac's bridge dropped repeatedly** during the session (five reconnects), and was down at
  filing time — so the docs repo was cloned to the cloud and edited there; every file in this wave
  goes to the Mac as a patch script (count==1 anchors) or a zip, md5-verified, when the bridge is back.
**Then §127, at his review:** *"schedule can only populate vacations approved once admin has sent the
e-mail results"* — which overruled the build-134 decision within hours. Admin 138: the admin reads the
released view and no longer reads `vacations/approvals`; `build134-test` re-anchored by ruling, and
so were sixteen older suites that had seeded a vacation week through the live document (they now
seed an e-mailed completed phase — same week, same people, announced). Session
closed at his request ("complete this session and i'll start fresh").

- **S-8's first test was wrong, not the page:** pinning the clock to 23:59 on the 31st put April
  inside the seven-day window at FIRST render, so the baseline passed. The defect needs the window to
  reach April only AFTER load — the 25th. Rule 8: change the input and check the output changed.

---

## 28 Aug 2026 (NIGHT) — RA-6: THE AUDIT OF THE 118–126 WAVE, AND THREE TRAPS ON THE WAY

**01:45 — 131–133 / 41–43 PUSHED AND VERIFIED LIVE (133/43, two cache-busters). SESSION CLOSED
by the owner ("will start fresh"), checklist run: fetch (three `maintenance.lock`s stranded again,
moved to `_to_delete/locks-2026-08-29/`), chat reviewed (§124, §125 on disk — grepped), state files
true, `status.mjs` exit 0, all four repos clean and in sync, no locks. Context at close ~313k tokens;
no compaction occurred. **Lesson worth keeping:** past ~290k the session stayed reliable by putting
every build in a sub-agent with a tight brief and verifying only exit codes and md5s in the main
context — five builds and an audit shipped that way with no detected slip. Auction live builds at
close: admin 305 / staff 164 / mobile 18, unchanged all session.**

**29 Aug, 00:40–01:30 — 127–130 PUSHED AND VERIFIED LIVE (130/40, two cache-busters); STAGE 2 BUILT.**
The cloud clone was reset to the pushed `3810e83` so 131's honesty baseline is an explicit SHA; 132 and
133 baseline on md5-named snapshots of 131 and 132 (no intermediate commits). Three builds by three
sub-agents in sequence, each verified from the exit code before the next started. Two findings turned
out to be *not* what the report said: V-3's run-together catalog header was an undefined CSS class, not
markup, and the staff grid's overflow was the column-flex `.content` sizing to max-content, not the
wrapper. The link dropped twice more; the Stage 2 zip waited in the chat outputs until it came back.

**LATER THE SAME NIGHT — §125: "you decide best order and start please."** Stage 0 and builds 127–130
shipped in the cloud clone, each by a sub-agent with a tight brief, each verified by Claude from the exit
code (rule 11) before filing; transferred by zip and md5-verified on the Mac (the link dropped four times
in the session; the zip in the chat outputs is the fallback delivery). One sub-agent decision was
REVERSED by Claude before filing: 127 first wrote a planned shift beside `off:true`; the admin's later
decision now beats the stale plan (skipped and reported). Two suites were re-anchored under rule 12
(build127 by 129; build123 by 130 — its 2-way had asserted a one-way gift as correct). Honesty
baselines: 126 = `c73fbde`; 127/128/129 = `/tmp/admin-12N.html` snapshots taken in the cloud between
builds (no intermediate commits exist, so those three baselines live only in the cloud session — the
suites carry their md5s in BUILD-LOG). Not pushed at the time of writing.

**Ruling §124.** After the §4 ritual (first schedule fetch returned a stale 111/37 from the CDN;
the second returned 126/40 — the exact trap §4 names), the owner accepted the recommendation to audit
before building and asked for a visual review with the standard *clean, organized, intuitive*. Method:
five subsystem auditors → five independent verifiers, each EXECUTING findings against the real page in
the suites' fake-Firebase rig → a headless screenshot pass with seeded data (62 shots) → a live-site
pass through his Chrome (39 shots, read-only). Report and evidence: `tests/docs/RA-6-2026-08-28.md`,
`tests/docs/RA-6-shots/` (headless harness `seed.mjs`/`shoot.mjs` is reusable). Queue: `TODO.md` §1.

**Three traps, all recorded so nobody pays twice.** (1) The first cloud schedule battery printed
"all 22 passed · 55 skipped" and EXITED 0 — `playwright` was resolvable from a global install for a
one-line `import()` check but not from the suites; `npm i playwright` in `tests/` fixed it and the
re-run was 77/77 with zero skips. The runner should fail hard on a missing browser dependency
(RA-6 N-19). (2) The Mac dropped off the bridge twice mid-session (Chrome extension and desktop
bridge together); the visual pass was done headless first and on the live site once he reconnected —
no time was spent retrying. (3) Context reached ~291k tokens after the five verifications returned;
every report was already written to disk by its agent, and the Chrome pass and the report assembly
were delegated to sub-agents so nothing was lost to a compaction.

**Paperwork gates:** `git fetch` over the bridge stranded `maintenance.lock` in all three public repos
again, moved to `_to_delete/locks-2026-08-28/`. `status.mjs` re-run. `tests` judged from `git log` and
disk (cannot be fetched over the bridge). Nothing in any repo was changed except the new docs.

## 28 Aug 2026 — STAGE 5 FINISHED IN ONE SESSION: SIX BUILDS (112–117), ALL FILED, NONE PUSHED

**Rulings §119 (the schedule comes back; scope = Stage 5 only, cheap types first) and §120 (the
session runs on Claude's decisions, each recorded; §92 untouched).** Owner, mid-session: *"make
good decisions for what a complex physician staffing website needs to do. We can fix problems
later"* and *"Let's power through and finish the build that's left."* Per-build detail is in
`schedule/BUILD-LOG.md`; the decisions are listed under §120. The deck is done and many users
signed in successfully on 28 Aug (PART B).

**THE SHAPE OF THE SESSION, for whoever picks it up.** The whole build ran IN THE CLOUD: the two
public repos cloned, `tests` tarred from the Mac and staged, md5-verified against the device tree,
playwright installed in `tests/` and the chromium build symlinked into the expected path — so all
browser suites RAN. **Then the bridge to the Mac dropped mid-session and did not come back**, so
from build 113 on every file exists in the cloud workspace and in the delivered zip, and the Mac
holds only build 112 (applied and md5-verified before the drop). **The zip is the delivery; the
Mac is behind.** Unpack it per §3's zip route — `unzip -p`, never `unzip -o` — and md5-verify
every file against the manifest inside it before trusting the tree. The admin page is shipped as
a WHOLE FILE (the base on the Mac is the pushed 111 plus the verified 112 patch; the six patch
scripts are in the zip too, and each refuses to apply twice).

**THINGS THE GATES CAUGHT THIS SESSION, each one a rule already in START-HERE:**
· The runner's own unregistered-suite guard fired the moment a suite sat on disk unregistered.
· My own new suites pinned exact counts (`length===4`) and exact build numbers — §3 rule 16's
  decay, the same one I had just re-anchored in `build106`. All three re-anchored to invariants.
· Two honesty runs CRASHED on the baseline instead of failing legibly (§3 rule 11): a picker the
  old build never had, and an assertion MESSAGE that threw. Both guarded.
· Two batteries overlapped on one port (EADDRINUSE) because `pgrep` matched its own shell — §3
  rule 8's exact trap; the log's mtime, not the process table, said the first had died. Re-run
  cleanly before any number was recorded.
· A 400-char truncation in a suite's writes reader hid a correct write; the test was wrong.
· A design finding from a suite: quota A's top-up tipped quota B over and then reported B as a
  conflict — correct and unhelpful; the filler now prefers a shift that tips nothing.
· A frame defect from 106: the card header said "not checking anything" for ANY note. Fixed.

**BATTERIES (cloud, browser suites running):** schedule 63/2,192 on 112 · 65/2,280 on 114 ·
67/2,354 on 116 · 68 suites on 117 (number in the 117 row) — all zero failed, zero skipped.
Auction battery on unchanged auction bytes: 55 suites / 2,020 assertions / exit 0 after 112 and
again after 117 (no auction baseline supplied — §6's legitimate skip). Isolation guard green.

**THE AFTERNOON, under §120 ⑦ (he left for the day):** builds 118–124 and staff 38–39 — §121's
built-in switches, §122's collapse control, §123's Engine page (Simulator gone, Admin group moved
up), §5's draft/published months, §6's change feed, defect 3 closed, §90's in-grid marks. Every
build: suite, honesty check failing on the previous build, full battery. Nine older suites were
re-anchored by ruling (53, 60, 69, 70, 78, 98, 101, 105, 111, 117, the isolation guard's positive
control) — each one a premise the rulings changed, never a stub of the new behaviour. **Seven of
my own new suites had to be tightened the same day** (a 3,000-char grab window that over-reached
once `gridViolIndex` landed beside `mutateCell`; exact counts; unguarded baselines) — §3 rules
10, 11 and 16 apply to suites written that morning exactly as to old ones.
**By the evening the Mac holds everything — 112–126 and staff 38–40 — verified file by file
against the bundles' manifests** (the bridge dropped six times during the day; each bundle was
unpacked the moment it held). **He pushed that night; admin 126 / staff 40 were verified SERVED
(two cache-busters), the auction's 305/164/18 unchanged; `node status.mjs` exits 0 and START-HERE's
LIVE line names 126 / 40. Nothing in the cloud is ahead of the Mac.**

**WHAT A FRESH SESSION SHOULD KNOW IS LEFT (all in `TODO.md`):** uniform confirmations (40 raw
`confirm(`, cosmetic); the staff phone view beyond its existing small-screen rule; e-mail alerts
(shares the auction's EmailJS quota — his decision); the calendar feed's two decisions (§92 and a
deploy path); rules-level enforcement of the draft gate and the change feed (§92); holiday
multi-year equity from §90's list. The engine's month filler cannot see the last day of the
previous month for the post-call day (§121 ④ — his "no").

**NOT DONE, DELIBERATELY:** the `maintenance.lock` check after this session's fetch was done at
the start (three moved to `_to_delete/locks-2026-08-28/`); `tests/README.md` is still stale.

---

## 26 Aug 2026 (EVENING) — THE PIVOT BACK TO THE AUCTION, ONE OWNER-FOUND DEFECT, AND THE DECK

**Shipped, PUSHED and VERIFIED LIVE: auction admin 305 (TM-1, §117), and the CRNA suspension
(§118 — both CRNA addresses now 404, landing cards gone).** Rulings §116–§118. Per-build detail
is in `BUILD-LOG.md`. The deck (now 35 slides) is `tests/docs/VacationAuctionWalkthrough.pptx` —
one current copy, private repo, by his ruling that evening.

**THREE LATE-SESSION FACTS a fresh session needs, all owner-stated 26–27 Aug:**
· **The real auction runs TIMER MODE 2** (resets only when a bid affects others) — his words:
  *"With the real auction, we are going to use the mode currently set, resets only when affects
  others."* That is why TM-1 mattered and why 305's suite pins mode 2 hardest.
· **The live supply is reconfigured: THREE high-demand weeks** (Thanksgiving, Christmas,
  New Year's at 6 FTE with the 5-or-better floor); Ski Week and the 2 Spring Break weeks keep
  6 FTE but open in Phase 2 with no floor; Summer 5/30–9/5 at 5; every other week 4. Verified on
  the SERVED site 27 Aug; the deck's slides 6–10, 19 and 28–29 were rebuilt to match, with fresh
  screenshots (Week 47, his bid). Read the board, not this paragraph, for current numbers.
· **The Phase 4 extra FTE is a MANUAL step he owns** — see TODO.md, PHASE-4 EXTRA FTE.

**THE DEFECT, and why the owner found it and no battery did.** Mode 2 (affects-others only) was
gated on the staff page since 154/274 and never on the admin page — build 289 added the admin
reset AFTER the modes existed and wired only the classic guards. Every suite that touched it
stubbed `_adminBidTimerReset: () => {}`, and test-admin-timer-289 asserted only that the reset
FIRES. Nothing asserted that it must sometimes NOT fire. **A guard with only positive cases is
half a guard.** The 305 suite has both halves, and runs the real projection engine under them.

**Three small things that cost time, so they are written down:**
· **A `//` comment appended inside an argument list swallows the closing bracket.** The 289
  re-anchor was first written that way and produced a SyntaxError; the comment goes on its own
  line above the call.
· **A background process over the bridge dies when the `device_bash` call returns.** `nohup … &
  disown` survived only when the same call also slept. The auction battery runs in ~25 s, which
  fits the 45 s call limit — **run it in the foreground** and read the exit code directly.
· **`test-crna-stamp` regenerates `crna/` IN PLACE as its check.** After an admin build its first
  run goes red on the drift assertion and leaves the restamped files on disk; the second run is
  green. That red is the stamper doing its job, and the restamped `crna/admin/index.html` +
  `crna/versions.json` are part of the build to push — not a regression to chase.

**Deck notes for whoever touches it next:** python-pptx re-serialises every part on save (bytes
change, meaning does not — verified by C14N) and drops the `jpg` content-type Default; the
fix is one line in `[Content_Types].xml`. The cover art on slide 1 is a parody built from a
640-px source with a traced silhouette; `make_cover.py` in the session workspace rebuilds it,
but that script is NOT in any repo. The FTE numbers on slides 26–27 and 7 come from the table
he photographed on 26 Aug (6/5/4 FTE; 235 FTE-weeks in Phases 1–3; +1 FTE on 34 weeks in
Phase 4, shown in amber and excluded from the totals by his instruction).

## 25–26 Aug 2026 — SIX BUILDS, AND EVERY ONE FOUND A GATE THAT WAS NOT LOOKING

**Shipped live: 99 · 100 · 101 · 102 · 103. Filed and awaiting a push: 104.** Per-build detail is
in `schedule/BUILD-LOG.md`. This entry is the pattern, which is the part a fresh session would
otherwise repeat.

**THE PATTERN.** Six builds, six instruments that were wrong:
· **99** — `toggleSect` ends in `else renderCatalog()`, so an unregistered key redraws an
  unrelated page. Found by a BEHAVIOURAL probe (plant a marker, toggle elsewhere, see if it
  survived), never by reading the source.
· **100** — a `/*` inside a LINE comment had opened a block comment **347,322 characters long**,
  so `build80-test`'s stripper was testing ~30% of the page and its `prompt()` gate never fired
  while a real blocking `prompt()` sat in the group rename.
· **101** — `sched/run-all.mjs` keeps a HAND-WRITTEN suite list, and builds 99, 100 and 101's
  suites were none of them in it. The battery reported *"49 suites, all green"* over three suites
  it had never heard of. The runner now **exits 2 and names them** if any suite on disk is
  unregistered.
· **103 and 104** — the extractor gotcha, twice: `build78`, then `build69`/`build70`, all extract
  a function and eval it alone, and all broke the moment that function grew a dependency.

⚠️ **AND CLAUDE ADDED TWO OF HIS OWN, which are the ones worth reading.**
**① A false claim, filed.** He reported that two red suites failed identically on three earlier
builds and wrote **"proven by execution"** on it, into `BUILD-LOG.md`. The bisect had never run:
those suites read `SCHED_ROOT` and he was passing `ADMIN=`. **The input was ignored rather than
rejected, so every run returned the same number — which is exactly what a clean result looks
like.** A subagent re-running it properly is what caught it. Now §3 rule 8's third kind.
**② A near-miss in 104.** Fixing the extractor break by extracting the REAL `staffingOn` bypassed
the fixture map `build69`/`build70` drive everything from, silently turning every day into "not
asked for". The right fix was to stub it **in the SHAPE of the real function** beside the
`demandOn` stub those suites always had — §3 rule 10's FAST-1 lesson, arriving from a new angle.

**THE THING TO CARRY: the code was fine and the instruments were not.** Every one of these was
found by RUNNING something, or by a second reader re-running it with different inputs. When a
gate agrees with you, ask what it would have said if it were broken.

**ON CONTEXT.** This session ran past **580,000 tokens with no compaction**, having started the
day with Claude asserting a 160,000-token ceiling as fact. The thresholds were invented twice and
overruled twice by the owner, and §106 now records what the number does and does not measure.

## 25 Aug 2026 (LATE) — THREE BUILDS, AND EVERY ONE OF THEM FOUND A LYING GATE

**Shipped: admin 99 (collapse sweep), 100 (group rename, stripper), 101 (§103 "Staffing").**
99 is live; 100 and 101 are filed and awaiting a push. Detail is in `schedule/BUILD-LOG.md`;
this entry exists for the pattern, which is the part a fresh session would otherwise repeat.

**THE PATTERN: every one of the three builds was gated green by something that was not looking.**
· **99** — `toggleSect` ends in `else renderCatalog()`, so an unregistered key re-draws an
  unrelated page. Caught by a BEHAVIOURAL probe (plant a marker, toggle elsewhere, see if it
  survived), not by reading the source.
· **100** — a `/*` inside a line comment had been blanking 70% of the page before `build80-test`
  read it, so its `prompt()` gate never fired while a real blocking `prompt()` sat in the code.
· **101** — `sched/run-all.mjs` keeps a HAND-WRITTEN suite list, and builds 99, 100 and 101's
  suites were none of them in it. The battery said *"49 suites, all green"* over three suites it
  had never heard of.

⚠️ **AND CLAUDE ADDED A FOURTH, WHICH IS THE ONE WORTH READING.** It reported that two red suites
failed identically on three earlier builds, wrote **"proven by execution"** on it, and filed that
into `BUILD-LOG.md`. The bisect had never run: those suites read `SCHED_ROOT`, and `ADMIN=` was
being passed. **The input was ignored rather than rejected, so every run returned the same number
— which is exactly what a clean result looks like.** A subagent re-running it properly is what
caught it. Corrected in the row and in `TODO.md`. The general form is now §3 rule 8's third kind.

**What that says about the day: the code was fine and the instruments were not.** Three of the
four were found only because something ran the thing rather than reading it, and the fourth was
found only because a second pair of eyes re-ran it with different inputs. **Run it, don't recall
it — and when a gate agrees with you, ask what it would have said if it were broken.**

## 25 Aug 2026 (ARCHIVE PASS) — the tripwire pass ran, and a gate that had been lying for a week

**No code shipped. Docs and one tooling fix.** Owner asleep for most of it, on a clear "do all
these"; everything is filed in the working tree and nothing is pushed.

**THE GATE THAT LIED, and it is the most reusable thing here.** `node status.mjs` opened the
session by declaring `START-HERE.md` STALE. It was not. The file said *25 Aug*; git said the last
commit touching it was *2026-08-24*. Both were right: the commit landed at **22:42 PDT on 24 Aug**,
which is already 25 Aug in UTC. **The old gate read its two clocks from different places** — the
git branch used `%cs`, the committer's LOCAL day (Pacific), while the not-yet-committed and mtime
branches used `new Date()`, the day of whatever BOX runs node (UTC in a cloud session, Pacific on
the Mac). So the same document could pass or fail depending on whether it happened to be committed
yet and on which machine asked. In practice it cried STALE for **seven hours out of every
twenty-four** — every session working past 5pm Pacific.

Fixed by pinning both sides to `America/Los_Angeles` (the owner types the date and the owner reads
it) and by asking the question the gate actually exists to ask: **does this document UNDER-report
its own age?** A stated day that is older than the last change is staleness. A stated day equal to
the change day, or one day after it, is the legitimate UTC/Pacific straddle. More than a day ahead
is a typo. **Proved four ways before it was trusted** — stated 17 Aug → exit 3 (the exact 17-Aug-
on-19-Aug failure the owner caught himself still fires) · 30 Aug → exit 3 as a typo · 25 Aug and
24 Aug → exit 0. The old gate on the same fixtures failed 24 Aug and passed 25 Aug on the mtime
branch, and did the exact reverse on the git branch — which is the bug, stated as a test.

**A gate that fails when nothing is wrong is the same disease as one that passes when something
is** — people stop reading both. Worth remembering the next time a green tick is the thing being
checked.








> ⚠️ **AND THE PASS CAUGHT ITSELF IN A LIE, which is worth more than the tidying.** Three bullets
> were cut in place and replaced with a note reading *"archived with the narrative"* — they were
> not; the surgery ran before the block move, so those lines existed nowhere. **The conservation
> check found it**: every line of the original is compared against the new file plus the archive,
> and anything in neither is listed. **Run that check on any pass that claims nothing was
> deleted.** A claim of conservation is worth exactly as much as the thing that verifies it.

⚠️ **A STANDING RISK, written down rather than acted on: `_archive/` IS NOT IN ANY GIT REPO.** It is
a plain folder under `~/Documents/GitHub`. The one place this project promises *nothing is ever
deleted* is the one place git has never seen — precisely the 22 Aug failure mode, when two
untracked files were recovered from iCloud with hours to spare. Every previous archive went there
too, so the convention was followed, not changed. **It is the owner's call whether it should be.**


# PART A — SHARED

## STILL-OPEN NOTES CARRIED OUT OF RA-3 (20 Aug 2026)

*The RA-3 narrative was archived 25 Aug 2026 under §101. These two blocks were kept because they
are not narrative: one is an OPEN item, the other is a do-not-quote list. Everything else RA-3
produced is in `DECISIONS.md` §75–§78 and in the private reports in `tests/docs/`.*

**OPEN — the sandbox button sweep must be made to fail loudly.**

* **It had been measuring nothing since App Check went in (19 Aug).**
  `make-site.mjs` faked four Firebase modules but not `firebase-app-check`; offline that
  import failed and took every page handler with it. The staff pass clicked **0** controls;
  the admin pass logged 325 copies of one error. FIXED and pushed (`af57c09`): a new
  `sweep/fake/firebase-app-check.js` plus one line in `make-site.mjs`. After the fix, with the
  driver restored byte-for-byte: **584 clicks · 261 dialogs · 154 confirms · 0 errors**, both
  sites, four passes. STILL OPEN: make the harness fail LOUDLY (zero clicks on a site, or more
  page errors than clicks, must exit non-zero) — this rot was silent.
*(Three further bullets stood here and were archived with the narrative: the bidder-page refusal
placement, which SHIPPED as staff 162's H-3; the live walkthrough record; and that session's
battery counts.)*

### RA-3 honesty notes — things that did NOT survive, recorded so nobody quotes them

* The CRITICAL's original evidence cited an in-file comment that **does not exist** — the wave
  deleted it; it survives only on the `-` side of the diff. The skeptic caught it. The finding
  stands on its other, verbatim-accurate quote and on the reproduction.
* The CRITICAL's second scenario ("a bid of 10 wins outright") is **not settled** — the two
  agents disagreed, the reproduction is ambiguous, and the denial in it looks like a policy
  denial. **Do not quote it.** The clean case is the E/D one above.
* A 20,000-scenario fuzz Claude wrote to size the problem **proved nothing** — it flagged
  near-identical counts on both engines, so its oracle cannot separate a legitimate cascade
  from an inversion. Only signal worth noting: weaker-bid REVIEW promotions 242 post-wave vs
  31 pre-wave.
* Two items Claude nearly reported were wrong and the code said so: the greyed NP chip already
  carries its own reason, and the "No limit" bid caps really are set to 6/6.
* `audit-handlers.mjs` now prints 1 violation where 0 is expected. It is a **false positive** —
  line 6991 is a COMMENT quoting an onclick pattern, and the auditor has no comment stripping.

## 4. ARCHITECTURE — unchanged (the 29 Jul handoff's §4 ten-line summary is still accurate)

Two static sites + schedule app sharing one Firestore. All logic inline `<script>`. Two
computeApprovals twins differ in SIGNATURE deliberately; port logic only. Mail relayed by any open
signed-in page. Rules enforce per-user bid confinement via emailToUser (now collision-fail-closed),
server-clock timer, biddingClosed gate, append-only changes, admin-only decisions/backups.

## 5. DEPLOY FLOW — unchanged. Rules changes publish in the console BEFORE dependent client pushes.


---

# PART B — VACATION AUCTION


### LIVE STATE THE OWNER OWNS — kept here as REFERENCE, not as a reminder (25 Aug 2026)

**He asked for these off the queue** — *"I know the launch checklist, I don't need reminders"* and,
of the sign-in test, *"I'll mention it if it becomes a problem, stop reminding me."* **They are
recorded here so a fresh session knows the state and does not ask him again. Do NOT surface them
as work, and do not re-add them to `TODO.md`.** The full LAUNCH CHECKLIST and the sign-in section
are in `_archive/anesthesia/superseded-docs/TODO-archived-2026-08-25.md`, intact.

· **Outbid-alert and welcome e-mails are BOTH switched OFF.** Verified by RA-5: switching them on
  fires **no backlog** — neither generator keeps a "last notified" state, so there is nothing to
  replay. Worst case is two mails per physician at their next individual sign-in.
· **Launch has not happened.** It is his, on his timing.
· **35 participating anesthesiologists** (owner, 19 Aug). Older docs saying ~60 meant the roster
  size, not the number bidding.
· **Real-bidder sign-ins** were being tested. Any count predating the roster update to 35 is
  stale and must be recounted, never repeated. **28 Aug 2026, owner: *"Many users logged in
  successfully today."*** No number given; do not invent one. Still not a queue item.

**LIVE. Build numbers live in `TODO.md`'s STATUS block, which is generated** — the ones typed
here read 269/139/17 until 25 Aug 2026, thirty-five auction builds out of date. The cardinal rule
in `START-HERE.md` exists to protect this site.

> ⚠️ **Sections dated 3 Aug and earlier are HISTORICAL.** They were accurate when written and
> are kept for the reasoning they contain, not as a statement of today. The build numbers above
> and in `versions.json` are authoritative — do not trust a date heading below over them.


## ⭐ BACKLOG — pending updates (added 11 Aug 2026, after the first live rehearsal)

**Live state ~~right now~~ AS OF 11 AUG — HISTORICAL, live is 269/139/17:** admin **264** (F1 fix: Begin-Phase-4 clears the round
mirrors locally before the Round-1 month picker reads them), staff index **135**, mobile **17**;
versions.json matches. First live rehearsal with real users ran clean. The only real issue was a
data-entry typo — a user's corrupted KP e-mail (`...Bielinski.kp@org`, `@` misplaced) made EmailJS
return `422 "recipients address is corrupted"`, so that mailQueue entry looped forever (~every 90s
via claim expiry) and held the red "outbid alerts queued" flash lit. Fixed by correcting the roster
address; no code change. That episode surfaced items 2–4 below.

**Do these as ONE batched build AFTER the rehearsal is fully done** — full gate on all, user
pushes, code-freeze discipline (propose → user go → smallest change). Items 1–4 are small and
self-contained; **item 5 is behavioral/fairness-critical and needs the read-only touchpoint map
FIRST**, for the user to sign off on before any edit.

1. **noindex tag** — keep the site out of Google. Today there is no `noindex` meta and no honored
   robots.txt (a robots.txt under `/vacation/` is ignored — robots.txt must live at the host root,
   which is the *separate* `anesthesia-kp.github.io` repo). Fix = add
   `<meta name="robots" content="noindex">` to the `<head>` of admin/index.html AND staff
   index.html. ~2 lines. The site is NOT currently indexed (a `site:` search returns nothing), so
   no urgency.

2. **Mail-queue hardening** — a permanently-rejected address is retried forever, never quarantined,
   so one bad e-mail can hold the queue's red flash hostage (see the rehearsal issue above). Fix =
   after N failed sends, drop/park the entry with an admin-visible flag instead of looping. See
   `processMailQueue` (admin ~line 1742, staff ~line 1452) and the
   `console.warn('Queue send failed for', e.user, err)` catch.

3. **Relabel the queue counter** — the dashboard "Outbid alerts — N queued" counts the WHOLE
   mailQueue outbox (welcome + results + outbid), so a stuck welcome shows up as an "outbid alert."
   Rename to e.g. "Queued e-mails." Cosmetic; see `updateMailQueueBadge` (~line 1714).

4. **EmailJS sent-counter undercount** — RECURRING; a prior fix did NOT hold. User reset it from
   ~280 to ~390 (dropped ~a third of sends). [BELIEVED] cause = lost concurrent increments: a
   read-modify-write in `trackEmailSent()` gets clobbered when multiple sends/tabs fire at once.
   Fix = atomic Firestore `increment(1)`, not read-then-set. DIAGNOSE `trackEmailSent` + its
   persistence path and CONFIRM the mechanism before changing anything (same discipline we used on
   the queue). Meanwhile the EmailJS account dashboard is the true count.

5. **Make holiday weeks + auction year admin-configurable (with guardrails)** — REPLACES the
   one-off "move spring break to weeks 14 & 15." Goal: no annual code rewrite — designate holiday
   weeks and set the auction year from the controls section (same stored-config pattern as
   timerRules / FTE caps / Smart Lock Controls in `adminSettings`). This is BEHAVIORAL and
   fairness-critical: it feeds `HIGH_DEMAND_WEEKS` → Phase-1 Smart Lock, FTE caps/slots, holiday
   labels, reports, and the never-event guards. **REQUIRED FIRST STEP = a read-only touchpoint map
   of EVERY place spring break / weeks 14-15 / high-demand weeks / FTE caps / holiday labels are
   defined or referenced, for the USER to sign off on before ANY edit.** Then wire those reads to
   config, add validation + a lock so the values can't change once an auction is underway, full
   gate + targeted fairness tests. The map is safe to build anytime (it changes nothing).

> NOTE: the sections below (dated 3 Aug 2026, admin 239) predate this rehearsal and are STALE on
> build numbers and suite counts. Trust the live state above; refresh §1 and the "Start here"
> command when the batch build lands.

---

## 6. DEFERRED / KNOWN-ACCEPTED — the 29 Jul list still stands, PLUS: passcodes retired
permanently; the refuted items in §3 above.


---

# PART C — DAILY SCHEDULE


### TRAP — TWO WAYS A GATE READ SOMETHING OTHER THAN WHAT YOU THOUGHT (25 Aug 2026)

Both were found in one evening, both had been live for weeks, and both printed clean numbers.

**① `SCHED_ROOT`, not `ADMIN`.** Most schedule suites take their page from `SCHED_ROOT`;
`build99-test` and `build100-test` take theirs from `ADMIN`. Passing the wrong one is **ignored,
not rejected** — the suite silently tests the working tree and returns the same number for every
input, which reads exactly like a clean bisect. It produced a confident, false "proven by
execution" claim that reached `BUILD-LOG.md` before a re-run caught it. **Before believing any
bisect, change the input and check the OUTPUT changed.**

**③ A SUITE THAT IS NOT IN `sched/run-all.mjs` NEVER RUNS.** The list is hand-kept, and builds
99, 100 and 101's suites were all missing from it — written, passed by hand, then silent, while
the battery reported a confident total that did not include them. **Register it in the same turn
you write it**, and when a battery total looks unchanged after adding a suite, that is the tell.

**⚠ AND ONE STANDING RULE IS NOW IN DOUBT, IN A GOOD WAY (25 Aug).** The rule says anything
that must be COMMITTED is written with `device_bash`, because `device_commit_files` files were
once invisible to git over the bridge. **That has now failed to reproduce twice**: the four
`.pptx` files on 24 Aug, and `tests/sched/build102-test.mjs` today — delivered with
`device_commit_files`, md5-identical to the cloud copy, and listed by `git status` as `??`
immediately afterwards. Two clean observations is not a proof, but the rule was written *"until
it is understood"* and it is now the expensive option for a large file. **Worth the owner's word
before relaxing it; until then, keep verifying md5 AND `git status` after any such transfer.**

**② A `/*` inside a line comment.** `admin/index.html` has three (`// … dailysched/*, …`). Any
comment-stripper that removes block comments first will open a block there and delete everything
to the next real `*/` — measured at 347,322 characters. The page is valid JavaScript; the
stripper was the bug. **Strip line comments first, then block comments, and assert what survived.**

**Build numbers live in `TODO.md`'s STATUS block, which is generated** — the ones typed here
read 63/28 until 25 Aug 2026, thirty admin builds out of date. In active development.

## THE RULINGS — read them in `DECISIONS.md` (this repo), not here

An index of every ruling used to live here. It stopped at §41 while DECISIONS ran to §53b —
an incomplete copy claiming to be complete, which is worse than no copy. **`DECISIONS.md` is
the authority and its headings ARE the index** (§1–§53b, plus the buried-rulings index at
the end of that file). Do not re-litigate anything there; rulings marked as overruling
Claude mean Claude argued the opposite and was told no.

## Four traps a fresh session will fall into

1. **Module scope.** Both pages are one `<script type="module">`. A plain `function foo`
   is invisible to inline `onclick=`/`oninput=` handlers **and** to `page.evaluate` in
   tests. This has already caused one shipped-quality bug (`renderElig`, caught by the
   harness) and two false test failures. Expose with `window.foo=foo`, and assert through
   the DOM rather than by poking internals.
2. **The fake Firestore must fail like the real one.** `mergeFields()` catches an
   `updateDoc` rejection and retries with `setDoc`, so a one-shot denial is absorbed
   silently — `window.__denyPath` is sticky for that reason. And `tx.set` is synchronous
   in the real SDK; an earlier version of the fake dropped the rejected promise and
   reported denied writes as successful, which would have hidden exactly the bug class
   these tests exist to catch.
3. **A fixture's `versions.json` must match the `var BUILD` of the bytes under test.**
   From build 50 both pages carry a stale-build gate: on a mismatch the page reloads
   itself mid-run and wipes the seeded fakes. It looks exactly like a page bug and is not
   one — it cost most of an hour on 16 Aug. Both harnesses now read the number out of the
   file, so they keep working on every future build; do not reintroduce a hardcoded one.
4. **The fake auth starts SIGNED OUT.** Hiding `#authGate` is not enough — nothing has
   fired `onAuthStateChanged`, so the page never resolves who it is talking to and every
   grid renders header-only. Call `window.__signInNow()`. On 16 Aug this made `elig-test`
   report 8 failures against a page that was completely fine; adding the call took it
   straight back to 33/0 with no change to the page at all.

   Both of these have the same shape, and it is the shape to watch for: **a red test that
   is the harness's fault reads exactly like a red test that is the code's fault.** Before
   believing a new failure, run the same suite against the PREVIOUS build. If it fails
   there too, the harness moved, not the page.
5. **The `requiredBuilds` ratchet cannot be ported naively.** Whoever brings the auction's
   stale-build ratchet across must give it **its own key namespace**: the schedule's `PAGE`
   values are `'index'` and `'admin'` — the very same keys the auction ratchets — so a direct
   port would have schedule admin 93 compare itself against the AUCTION's admin build and
   reload-gate forever. (Promoted here 25 Aug 2026 from the 24 Aug schedule reconciliation,
   whose narrative was archived under §101.)

## Design artefacts — delivered, NOT built

`design/` holds six previews, three specs and a README (statuses corrected 17 Aug — several shipped; each file now carries a dated status banner). They are **mockups, not the app** — no
Firebase, no real data, every invented value labelled (§22).

| file | what |
|---|---|
| `elig-grid-preview.html` | the eligibility rebuild — **shipped in 49** |
| `shift-editor-preview.html` | stage 1 — times, sites, stacking demand rules, 60-day preview |
| `reports-preview.html` | stage 9 — **shipped in 51** |
| `REQUEST-TYPES.md` + `request-types-preview.html` | the owner's 27-entry Task list, modelled |
| `ASSIGNMENT-MODEL.md` + `assignment-model-preview.html` | stage 3 — the preview reproduces defect 2 live |
| `RULES.md` + `rules-preview.html` | stage 5 — **blocked on roles/groups**, two questions flagged |
| `shift-times.xlsx` | the owner's worksheet. **Not an import** — §38 parks every estimate |

## Next actions

**The queue lives in ONE place: `TODO.md` §1 (this repo).** The list that used to sit here
went stale within a day of being written (it still ordered a push that had long landed and
called defect 1 open after build 61 closed it). This file records what happened; TODO
orders what happens next.

---

# PART D — RESCUED RECORDS, 16 Aug 2026

Everything in this part existed in exactly ONE place, and that place was a file that looks
obsolete and was a candidate for archiving. It was lifted here on 16 Aug so that archiving
those files costs nothing. **Sources are named at each section; the source files keep their
original text as historical evidence.**

---

## D1 · Open residuals on the LIVE auction → the vacation section of `TODO.md`

The auction's deliberately-open defects and their mitigations have ONE home:
**the vacation section of `TODO.md` in this repo** (one-TODO ruling, 17 Aug). Do not restate them anywhere else; point there. It carries M1, M3, L2, L3, L4 and the cosmetic items, each with what neutralises it.

Two things to know without opening it:

- **M3 was never triaged, and it reproduces on the live build.** The two sites disagree about
  a doctor's e-mail address whenever that address contains a capital letter, because the KP
  address is not normalised on save and only one of the two sites lower-cases what it returns.
  Reproduced 16 Aug by extracting and executing both sites' real functions. Whether it has
  ever fired depends on whether any stored KP address has a capital letter — a data question,
  answerable on the admin Users page.
- **M1's mitigation is complete and is an operating habit, not code:** a single admin runs the
  auction. The same is true of L3: after Reset Auction, Global Lock ON until Begin Phase 1.

> ⚠️ **ID COLLISION.** Part B of this file contains items also labelled **M1, L2 and L3** —
> those are the **31 Jul Batch-D** numbering and are different, closed defects. The residuals
> file uses the **25 Jul code-review** numbering. Never quote a bare ID; name the list.

---

## D2 · Phase 4 — rounds as mini-phases. The lifecycle, in one place

*(18 Aug 2026: the REHEARSAL's phase 4 was skipped by owner ruling — this lifecycle was never exercised live. It remains the reference for real phases run with rounds.)*

*Rescued from NEXT-SESSION-PROMPT-2026-08-11 (now `_archive/tests/session-docs/`), which was the only
human-readable description of this machine anywhere in the project. The mechanism is
implemented in both pages and pinned by `tests/test-p4-rounds.mjs` (154 assertions) — but a
suite tells you what breaks, not how the thing is meant to work.*

**In plain terms:** Phase 4 is not one phase with many decisions. It is a series of small
phases. Each round closes, gets decided, gets archived, gets mailed, and only then does the
next round open. Nothing a doctor sees moves until the results for that round have actually
been sent.

**The sequence, quoted from the 11 Aug record:**

> close bidding → decide → Complete Round N (archives to admin-only staging `pendingP4Rounds`)
> → Send Round N Results (mails that round, publishes archive to `phases.p4Rounds[N]` +
> `p4RoundResultsSent[N]`) → Start Round N+1 (retires denied bids from `schedule` + `bidPhase`,
> clears approvals/denials/worstBids docs, `p4Round++`, smart-lock reopen) → … → Complete
> Phase 4 (gated: current round archived, all rounds sent, no orphan live decisions; year
> record = union of round archives; finish via `_p4FinishStamp`).

**The invariants, likewise quoted:**

> announced round wins lock via `getPriorPhaseWinners` (`p4RoundWinnersOn`) on BOTH sites;
> announced denials freeze until retirement (staff `p4AnnouncedDecision`); unsent results never
> visible to users; archived decisions immutable (`_p4ArchivedDecisionRound` guards
> approve/deny/revoke, pending counts, decide panel); plain Reopen redirects to Start Round
> when round archived; reports/history/filters treat rounds like phases ('Phase 4: Round N').

**Why each invariant is there, in one line:** results are not visible before they are sent, so
nobody learns their outcome early. An archived round cannot be re-decided, so the record of
what was announced cannot drift. Both sites agree on who won, so the two pages never show
different answers to the same doctor.

---

## D2a · Requested next auction feature (17 Aug 2026) — capacity-by-week report

The owner's first post-Phase-3 feature request: a report on the Reports dash, beneath the
user summaries, showing **each week of the year with what's been taken and what's
available**, styled like the existing reports. Verbatim wording and the one open scoping
question were in `TODO.md` §1 B4. **B4 SHIPPED as build 271 and B4's entry was archived
25 Aug 2026** to `_archive/anesthesia/superseded-docs/TODO-archived-2026-08-25.md`; the shipped record is the
build-271 row of `vacation-kp.github.io/BUILD-LOG.md`. This note is kept as the dated record of
when the feature was queued.

## D3 · A dated capacity ceiling on a live document

*Same source, and it appeared nowhere else in the project.*

> phases doc grows ~20KB/round (watch vs 1MB late 2027)

The `phases` document grows by roughly 20KB each Phase-4 round. Firestore caps a single
document at 1MB. On the growth rate observed in August 2026 that becomes a problem around late
2027. **This is not urgent and it is not theoretical** — it is a dated arithmetic fact about a
document the live auction writes every round. Tracked as a watch item in
`vacation-kp.github.io/TODO.md`.

---

## D4 · Operating habits for the live auction

*Rescued from §5 of SESSION-HANDOFF-2026-08-07 (now `_archive/tests/session-docs/`). Several of these are carried
elsewhere already; the three marked ★ were carried nowhere.*

1. **Run as the sole admin.** Most residual risks require two simultaneous admins.
2. **The timer may expire on its own** — safe since build 244. The admin machine's clock should
   be OS-synced. ★ **Keep one admin page open at and after expiry** so auto-close can fire; the
   manual Close Bidding path still works either way.
3. **Rehearsal Mode was once found unexpectedly OFF.** Verify the banner state before a
   rehearsal (ON) and before a real launch (OFF). Reset keeps it armed by design.
4. **After any Reset:** Global Lock ON until Begin Phase 1. See L3 in the residuals file.
5. **E-mail quota:** the in-app meter is advisory; **EmailJS's dashboard is the source of
   truth.** ★ The app's cycle resets on a configurable day, **default the 22nd**, which may
   differ from EmailJS's own billing day — that mismatch is why the meter can under-state.
6. **Send (or rehearsal-skip) each phase's results before beginning the next phase.** Build 245
   auto-targets an earlier unsent phase, but do not rely on it live.
7. ★ **Don't reload the admin dashboard mid-presentation**, and give it ~2s after opening.

---

## D5 · Accepted design decisions — do NOT relitigate

*Rescued from §6 of the same file. The first is carried in Part A; the rest were carried
nowhere.*

- `computeApprovals` has deliberately different signatures on the two sites (admin: an
  `ignoreAdmin` boolean; staff: a schedule snapshot). Port the logic only, never the signature.
- Reset Auction keeps Rehearsal Mode armed.
- **Review overage up to 1.0 is allowed**, and overage locks while the current phase has bids —
  including after the final phase. A reset clears it.
- **No e-mail-domain restriction.** *(Settled July 2026. Anything that would refuse an address
  for its domain — including a non-blocking "that doesn't look like a KP address" warning — is
  a change to this decision and needs the owner to say so explicitly.)*
- Passcodes are retired. The staff site does not auto-reconnect.
- The NP phase toggle is superseded by the high-demand week rule: Phase-1 weeks are all
  high-demand, so an NP-in-P1 toggle is moot. That is correct behaviour, not a bug.
- **Priority-lock OFF legalises below-floor bids, and re-enabling it does not unwind them.**
- **Raising a cap auto-raises later phases' caps.**

---

## 31 Aug 2026 — the §142 batch (admin 151 / staff 51 / PUSH-ALL), and two session-specific notes
Shipped and verified per BUILD-LOG; rulings §141–§143. Worth keeping: (1) with `device_stage_files`
blocked by a stale sign-in, the current build reached the cloud by RE-APPLYING the same
count-guarded python substitutions to a fresh clone — md5 then proved byte-identity, no transfer
needed. (2) In-cloud, ESM suites ignore NODE_PATH — symlink the global node_modules to
`<root>/tests/node_modules`; and the full schedule battery (108 suites, browser suites RUN) takes
>10 min — run it with nohup in the background and read the log, never in a foreground call.

---

## SESSION — 31 Aug 2026 · the abandoned Chrome rehearsal (§144, §145)

**Ended at his instruction**, mid-run: *"forget it, this a waste of my tine"* → *"prepare handoff, i need a
new session"* → *"stop working. just prepare end of session docs."* Nothing is half-written to disk; the one
uncommitted change is this paperwork.

**Done and durable**
· Re-grounding: four repos clean and in sync; auction 305/164/18 and schedule 151/51 verified served twice
  cache-busted; three stranded `maintenance.lock` files moved to `_to_delete/locks-31aug/`.
· §144 — PUSH-ALL dropped on its first run. Terminal git IS installed (the 22 Aug note was wrong, now
  corrected in START-HERE §6); the COMMIT succeeded, the PUSH failed for want of a saved GitHub sign-in
  (all four remotes are HTTPS; GitHub Desktop carries its own credential Terminal git cannot see). He
  declined both fixes. Do not re-propose it or the credential setup.
· **Pre-flight PASSED** — `tests/sweep/phase-runthrough.mjs` against live build 305, in the cloud container:
  all four phases begun/closed/decided/completed/sent, two P4 rounds, the auction-ending step,
  **0 console errors · 0 page errors · 0 native dialogs · 0 never-event findings**; the draw randomizer spun
  twice and both winners approved. Scope limit, stated honestly: fake backend, ~9 seeded users, its built-in
  NE checks cover only NE-2, NE-3 and a heuristic NE-1.
  **Cloud recipe (it is not obvious, save the rediscovery):** clone the two public repos beside a `tests`
  extracted from a tarball; `REPO_ROOT` must be `/root/kp` (the container's `~` is `/root`, NOT
  `/home/claude` — one run died on exactly this); ESM ignores `NODE_PATH`, so symlink the global
  `playwright` and `playwright-core` into `tests/node_modules/`; the script hardcodes
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, which exists. `make-site.mjs` lives in `sweep/`.
  And it reproduced §3 rule 11 live: `node … | tail` printed EXIT=0 for a run that died — read exit codes
  directly.

**The live run, and where it stopped**
Baseline captured (Phase 1 open, 5 bids from AF and GL on Wk 47/51/52, timer running, 49/52 locked, both
e-mail toggles OFF, queue 0, EmailJS 0 of 2,000). Two cloud backups taken, both *Phase 1 · 5 bids*. **He
performed the reset himself** (typed RESET) after Claude's flow was interrupted. Claude then clicked
`🔒 Lock standard weeks & Begin Phase 1` — **and the connection died before the result could be read, so
whether Phase 1 is open is UNVERIFIED.** Rehearsal Mode is ON and nobody has claimed arming it. All of this
is at the top of `TODO.md` §1 as the first job of the next session, with the findings.

**The disconnections — evidence, not a conclusion**
Four drops in roughly ninety minutes. Every one followed a heavy page operation (cloud backup ≈30 document
writes, the reset, Begin Phase 1's 52 lock writes). The tab reported `document.hidden = true` throughout, and
each recovery coincided with him switching to Chrome. Best current reading: **the extension's background
worker idles out while Chrome sits behind other windows, and a long busy page gives it the gap it needs** —
so it drops precisely when he comes to the Claude app to read a message. NOT PROVEN. What IS proven: clicks
work fine on a hidden tab (tested), so "hidden" alone is not the cause, and screenshots are not the cause
either (a screenshot-free batch timed out). **Do not repeat the two wrong diagnoses below by theorising
first.**

**Claude's own errors this session, recorded so they are not repeated**
· Diagnosed the drops twice from theory and was wrong twice, before running the one cheap test that settled
  each. §3 rule 14 — *run it, don't recall it* — applies to Claude's diagnoses as much as its assertions.
· Read button coordinates off a screenshot by eye and missed a button by seven pixels, then treated the
  silence as a failed backup. Screenshot pixels are CSS pixels × 1.133 here (1568/1384); get the rect from
  `getBoundingClientRect()` and scale it, never eyeball it.
· Worked screenshot-free for speed and left him unable to see what was happening — he said so: *"I can't see
  where you're working."* If the work is invisible to him, say where it is, every time.
· Spent his time on reconnaissance side-quests (the Fair Play report, the report-tab workaround) before the
  main run had started.

**Environment note:** this session's own safety classifier twice blocked the reset steps as destructive.
Both cleared on retry. Expect it around Reset/Delete flows; do not fight it — say so and let him decide.

---

# 📓 SESSION RECORD — 1 Sep 2026. RA-7, then eight owner-found defects. Builds 309–314.

**What shipped:** 309–311 (RA-7's own findings, §151/§152), 312–313 (his D1–D4, §153), 314 (D5–D7,
§154). All pushed by him and verified served twice. Battery grew 58 → 64 suites, 2,151 → 2,240
assertions. Detail is in the BUILD-LOG rows; this is only what the session itself taught.

### ⚠️ THE LESSON OF THE DAY: an audit's confidence is bounded by its fixture

RA-7 audited the Approvals/Denials screen, answered "no double-counting" to its own question 4, and
reported it clean. **The owner found four defects on that exact screen within the hour** — and then a
sweep with the right fixture found three more, on three further surfaces. Seven defects on ground an
audit had just walked over.

The cause was not carelessness in the reading. **RA-7's fixture had no Phase-4 rounds, and RA-7's own
report NAMED a round fixture as the biggest gap it was leaving open** — then reported the flat answer
anyway. The finding should have read *"no double-counting **for phases**; rounds untested"*.

**The rule this earns: a negative finding is only as wide as the fixture that produced it, and the
scope belongs IN the sentence, not in a caveat further down the page.** "No X" with an untested case
is not a cautious claim, it is a wrong one.

### ⚠️ AND THE INSTANCE/CLASS FAILURE REPEATED, HERE, HAVING JUST CRITICISED IT

RA-7's F-1 criticised §149 for fixing an instance rather than a class. Build 312 then fixed D1's
duplicate defect **on one screen** — and D5 turned out to be the identical defect in the report, one
surface over, found by the very next sweep. **The same mistake, in the same session, by the session
that had named it.** When a defect is a shape rather than a line, the fix is not done until every
surface with that shape has been checked — and "which other code has this shape?" is a grep, not a
judgement call.

### ⚠️ A FAILED REDIRECT LEAVES THE OLD LOG, AND `tail` THEN REPORTS SOMEBODY ELSE'S RUN AS YOURS

`node status.mjs > /tmp/st.log 2>&1` failed with **Permission denied** — `/tmp/st.log` existed from an
earlier session and was not writable. The command chain carried on, `tail` read the *31 Aug* file, and
the output looked like a completely normal status run: auction 305/164, START-HERE "31 Aug", suites
55. Every number stale, all of it presented as current. It was caught only because those numbers were
recognisably old.

This is §3 rule 8's family — a gate that lies — with a new mechanism. **Write logs somewhere you own
(`$HOME`), and check the log's mtime against `date` before believing it.** The existing rule already
says to check mtime for a hung process; the same medicine cures this.

### ⚠️ WHEN AN EXISTING SUITE BREAKS ON YOUR CHANGE, CONSIDER THAT IT IS RIGHT

F-5b's first cut guarded the phase advance on `completedPhases` alone. Four suites went red.
`test-admin-295-db1` was modelling the real mechanism correctly: at that moment the finished phase's
snapshot may still be in `phaseStaging`, about to be published by that very batch. **The suite was
right and the guard was wrong; the guard changed.** §3 rule 12 asks which is changing, what is TRUE
or what is ASSERTED — this is the case where the answer is "the code", and it is easy to miss when
you wrote the code an hour ago.

### ⚠️ A FIXTURE CAN FLATTER THE CODE

The first draft of the D5 fixture gave the phase-4 roll-up a full, correct `projections` map — and
three assertions then PASSED on the broken build. The real field is written by `serializeProjections()`
reading the **live** schedule at completion, which the round boundaries have already emptied, which is
precisely why every P4 row in his screenshot read LOSE. **Model what the code actually writes, not
what makes the test easy.** Two false-pass assertions were also caught and fixed the same day: a bare
`indexOf` ordering comparison that passed on the old build because `-1 < anything`, and a guard that
passed vacuously while its sandbox was crashing.

### ⚠️ AND THE DAY'S LAST MISTAKE WAS CLAUDE'S, ON THE VERY RULE IT HAD JUST WRITTEN

The docs commit for all of the above shipped as `fbea125` with the subject
`anesthesia-kp.github.io   (docs)    changed: START-HERE.md · …` — a whole-file paste, the divider
becoming the subject. **That is the identical failure START-HERE §3 already records from 18 Aug
(`7fcd3f1`/`594778e`), in the same turn that added a new rule about commit subjects being lost.**

**The cause was Claude's formatting, not the owner's paste.** Only one repo changed, so the standard
`⚠ COPY ONE SECTION PER REPO` banner was replaced with prose, and a helpful note about GitHub
Desktop's single-file behaviour was put INSIDE the file above the message. The file stopped looking
like "one block to copy" and started looking like a document.

**The rule this earns, and it is narrow enough to keep: the outputs file contains ONLY text that gets
pasted. Guidance goes in the chat, never in the file — however useful it is, and however few repos
changed.** The banner is not decoration; it is the thing that tells the eye where the copy starts.
Recorded, not rewritten — the history stands, as it did in August.

### Owner-facing facts settled today
- **The bridge drops were macOS sleep** — his own diagnosis. Mains covered by Settings; battery needs
  Amphetamine (installed) or `caffeinate -di`. Recorded in START-HERE §4.
- **GitHub Desktop silently replaces the commit subject on any SINGLE-FILE commit.** He spotted the
  symptom. Four commits in the history prove it. Recorded in START-HERE §3.
- **He does not use any old archives** — everything so far is testing, nothing live — so the
  pre-build-295 fallback paths are unreachable in practice (§151).
- **Phase 4 always opens on Round 1.** His correction; Claude had it wrong. §152/§153.

## SESSION — 1 Sep 2026 (later) · D8 and F-9b as admin 315 (§155)

He opened with **"go with both"** on the two items the re-grounding report put in front of him, then
**"go"** on the plan. Both are filed, not pushed.

**They were one defect wearing two names.** D8 and F-9b sit in the SAME function a few lines apart —
`bidsByWeekModel`, which feeds the reports and all three export paths. Build 309 had already written
the correct rule for the Approvals/Denials screen (`_adSnapProj`: trust a phase's recording WHOLE,
never per week). Nobody carried it across. **The lesson is the one this project keeps paying for: a
rule applied to one surface is not a rule.** 309, 312 (D2), 314 (D5) and now 315 are four builds
fixing the same idea on four screens — each found separately, none found by the fix before it.

**The measurement that made F-9b concrete.** Argued in the abstract it sounds theoretical. Driven on
the pushed 314 at a raised cap — his own Phase-4 EXTRA FTE workflow — a closed phase whose recording
names ONE winner reported FIVE, one of them a bid that phase had DENIED. That is the whole case, and
it took a fixture, not a paragraph.

### The sweep had to move to the cloud, and the recipe gained two steps
The Mac's device VM has **no Playwright browser and no egress to download one** (`npx playwright
install chromium` dies with a download failure — the allowlist). So the every-button sweep ran in the
cloud container against a fresh clone of both public repos plus a staged `tests.tgz`, per §6.

**Two things §6 does not yet say, both of which cost a cycle:**
- The cloud's Chromium is build **1194**; the pinned Playwright wants **1234**, and it wants
  `chrome-linux64/`, not `chrome-linux/`. A writable `PLAYWRIGHT_BROWSERS_PATH` with symlinks fixes it.
- **The driver launches the HEADLESS SHELL, not chrome** — a second, differently-named binary
  (`chrome_headless_shell-<v>/chrome-headless-shell-linux64/chrome-headless-shell`, where the 1194
  build calls it `headless_shell`). Symlinking only `chromium-*` gets you an abort on all four passes.

**The sweep behaved well and deserves the note:** all four passes aborted on the missing binary and it
printed **"SWEEP FAILED — this run does NOT count as coverage"** with a non-zero exit, rather than
reporting zero errors over zero clicks. That is §3 rule 8's good direction, and it is rarer than the
bad one.

### One near-miss, Claude's, caught before the honesty run
The first draft of the 315 suite contained `ok(!Object.values(raised).some(v => v === 'winning' &&
false) && …)` — a clause that can never be true, so half that assertion was decoration. **§3 rule 10:
an assertion that cannot fail is not a weak test, it is a false one.** Replaced with the invariant
that actually matters (the only projected winner anywhere is the one the recording names), which is
strictly stronger than what it replaced. Recorded because it was written by the same session that
quotes rule 10 in its own plan.

### The single-file commit ate another message — the WARNING is not a fix (1 Sep 2026, after the 315 push)

315 pushed clean and was verified served twice (`89f9bda`, auction admin **315** live ~17:19 UTC;
schedule unchanged at 151/51). Two of the three commit messages landed whole. **The third did not.**

`tests` was a ONE-FILE commit, so GitHub Desktop pre-filled the Summary, and `ad9179d` reads
**`Create test-315-recorded-projections.mjs`** with an **empty body** — not merely a replaced subject,
the *whole message gone*. The written message survives only in `tests/COMMIT-MESSAGE.txt`.

**This is the third time in one day, and the second time AFTER the rule was written.** The handover
said, in bold, that `tests` was a single-file commit and that the Summary box had to be cleared first.
It still happened. **So the mitigation — "say so in the handover" — does not work, and repeating it
harder will not make it work.** A rule that depends on catching a pre-filled box at the moment of
pasting is a rule that fails at the rate people miss pre-filled boxes.

**PROPOSED, NOT BUILT, and it needs his go.** Make a `tests` commit structurally incapable of being
single-file: keep a one-line-per-suite index in `tests/README.md` (or a small `SUITES.md`) that every
new suite appends a row to. Two files change, Desktop pre-fills nothing, and the index is independently
useful — `sched/run-all.mjs`'s hand-kept list has its own rot problem recorded in TODO. Cost is one
line per new suite. **Do not build this unasked.**

Until it is ruled on, the honest statement of the situation is: **`tests` commit subjects will keep
being lost whenever a build adds exactly one suite file**, and the real message lives in that repo's
`COMMIT-MESSAGE.txt`. Recorded, not rewritten — the history stands, as it did in August.

## SESSION — 1 Sep 2026 (later still) · the audit that followed the empty queue, and E1 as 316

With the auction queue empty he said **"keep going."** That is not a §92 go, so the turn was spent
**reading and executing, not building** — the two surfaces the round sweep never reached. Two were
clean. The third was E1, he gave it its own go, and it shipped as 316.

**The habit worth keeping from this:** an empty queue is not the end of the work, and "keep going"
against an empty queue is best answered with the audit that needs no permission rather than with a
question or with a change nobody authorised.

### Three process notes, each of which nearly cost something

**· The render lied in the safe direction, and reading it alone would have produced a wrong report.**
The Remove button looked like the finding. It refuses. The dropdown beside it did not. Driving both
is what separated them — §3 rule 5 read in the direction it is usually *not* used.

**· `PREFIX_SRC` was IGNORED, not rejected — §3 rule 8's third kind, hit live.** Checking whether the
re-anchored `test-p4-rounds` assertion was a real gate, `PREFIX_SRC=/tmp/vac315/... node
test-p4-rounds.mjs` printed a PASS. That looked like proof the assertion was weak. It was not: that
suite reads `adminSrc` from the **working tree**, and `PREFIX_SRC` only feeds its honesty blocks. The
answer came from running the check against the 315 bytes directly, which reports `adminChangePriority`
unguarded. **Change the input, check the output changed** — the rule already says it, and it still
took a second to notice.

**· A pinned COUNT went red for a build that made the code stronger.** `test-p4-rounds` asserted
"exactly 5 + exactly 1" refusal sites; a seventh broke it. That is rule 16's decay verbatim. The
important half is the other direction: **a count would have stayed green if someone added a new
UNGUARDED handler — which is precisely how E1 lived through 312, 313, 314 and 315**, four builds whose
whole subject was rounds. Re-anchored to the seven handlers by name.

### The single-file diagnosis is CONFIRMED by the 316 push (1 Sep 2026)

316 pushed clean — auction admin **316** live and verified served twice (`b295714`, ~18:00 UTC), schedule
unchanged at 151/51. **All three commit messages survived this time, `tests` included** (`b50f01d`,
"Suite for 316; the archived-decision pin re-anchored"), and the only thing that differed from the 315
push is that the `tests` commit carried TWO files rather than one.

**That is the diagnosis confirmed by a controlled comparison rather than by reasoning:** same repo, same
person, same paste, one variable changed, message preserved. It also means the proposed structural fix
— a suites index so a `tests` commit is never single-file — is now evidence-backed rather than a guess.
**Still PROPOSED, still needs his go.** Do not build it unasked.

## SESSION — 1 Sep 2026 (evening) · the inventory, and 317

The auction queue emptied after 316, he chose the surface inventory over the alternatives (§158), it
found three on the admin dashboard, he said **"go on all"**, and they shipped as 317.

**The inventory is repeatable and should be repeated.** Script both served pages into functions, keep the
ones that read phase/round/decision state (154), mark each against the four shapes, cross-check against
one discriminator — *does it ask which round decided this?* — and drive the survivors. It found in one
pass what five consecutive builds had been finding one screen at a time.

**Two mistakes of Claude's, both caught, both worth the record:**

**· A stub manufactured a false finding.** The first dashboard probe stubbed `bidMatchesPhaseFilter` —
the function that decides which bids a filter shows — and duly reported that the cards ignored the round
filter. With the real function in place the filter is honoured and the OUTCOME is the defect. §3 rule 10
is usually quoted as "a stub can hide a bug"; this is the other direction, where a stub invents one. The
suite now names that function explicitly and never stubs it, with a comment saying why.

**· A false gate survived into the suite and the honesty run caught it.** The F3 assertions tested
`bwScopeLabel`, which was already correct — the defect was that `exportDashboard` didn't call it. All
three passed on the old build. **That is exactly what the honesty run is for, and it is the second time
today it earned its place.** Replaced with an assertion over the function's own comment-stripped source,
plus a proof the stripper kept the code, because this build's comment quotes the forbidden string.

**The standing lesson from F2, in one line:** D7 fixed one of two consumers of the same dropdown. When a
defect is fixed, find every consumer of the same input — not every screen with a similar name.

## SESSION — 1 Sep 2026 (close) · the mail path, and the sweep stopped on purpose

**He ended the sweep with the right question:** *"how much more of this do we have? i don't want to
endlessly chase things that might be fine."* The answer existed only because §158 had counted: 28
flagged, 9 fixed, 2 clean, 4 by design, 1 worth checking, 12 not. **That is the value of the inventory,
and it is worth more than any single defect it found** — before it, "how much more" had no answer.

He chose the mail path and then to stop (§160). **The mail path was the right one, and it found three
chained defects — G1, G2, G3, all UNBUILT and needing his go.** A physician whose bid a round already
denied can be e-mailed *"your projection changed from UNDER REVIEW to WIN"*, and it is reachable
because `adminAddSelection` has no completed-phase gate at all (driven: five writes, no refusal).

### The pattern under D8, E1 and now G1 — say it as a rule about the WEEK
The archived-round guard on the other write handlers protects **the bid being acted on, never the
bystanders on the same week.** Three separate findings have now lived in that one gap. Whoever fixes G1
should state the rule that way rather than adding a fourth per-handler guard.

### Two disciplines that paid for themselves today, both recorded because they nearly did not
**· A stub INVENTED a finding** (`bidMatchesPhaseFilter`), and **a false gate survived into a suite**
(the F3 assertions tested a helper that was already correct, so they passed on the old build). The
honesty run caught the second. Both are the same lesson from opposite ends: **the thing you did not
write is the thing to check.**
**· The first mail fixture proved nothing** — it was built so the bidder won in both states, so no mail
was due and the run looked clean. A probe that cannot distinguish the two answers is not evidence. The
second fixture gave every scope a different right answer, and that is when it spoke.

### Housekeeping done at close
`TODO.md` crossed its **2,000-line tripwire** (2,013). The three shipped-and-live write-ups from this
session (315, 316, 317) were moved to `_archive/anesthesia/todo-sections/2026-09-01-shipped-315-317.md`
under the standing rule — a fact lives in ONE file, and all three have BUILD-LOG rows and DECISIONS
entries. **1,887 lines now. ⚠️ The older shipped sections (306–314, RA-7) are STILL in `TODO.md` and a
full archive pass is DUE before the next feature build** — deliberately left for a fresh session rather
than run at the tail end of a long one.

## SESSION — 1 Sep 2026 (late evening, fresh session) · the archive pass, then RA-8. NOTHING BUILT.

**What happened, in order.** §4 ritual clean (318/165/18 · 151/51 live, all repos in sync). He chose the archive pass
(TODO 1,902 → 1,587 with the new queue; START-HERE 687 → 667; the week's shipped write-ups in
`_archive/anesthesia/todo-sections/2026-09-01-shipped-306-318.md`) and MANDATED RA-8 (§162), then widened it three times
while it ran — §163 (rounds are phases), §165 (O-1…O-4, *"don't lose track of any of them"*) — and set the standing
order for everything after it (§164: narrow, safe, winding down). He asked whether to build the §163 fix first; Claude
argued audit-first (one build closing the class beats two chasing it) and he agreed.

**How RA-8 ran, so it can be repeated.** Cloud container; both public repos cloned and md5-verified against the Mac on the
five served files; `tests` staged as a tarball; baseline 305/164 from `git show 420df42:`. A shared brief
(`tests/docs/RA-8/PREAMBLE.md`) carried the domain, the house harness and the finding format. Eight lanes in parallel
(engine · merge · Under Review page · reports · capacity · diff review · battery+sweeps · rounds-as-phases), a ninth for
the timer when O-1/O-2 arrived, then **four adversarial verifiers with their own probes and their own fixtures**, told
to break the findings AND the clean verdicts. Every finding driven on 305 too. ~3.6M subagent tokens.

**Three things the verifiers earned their keep on:** (1) verifier C found R-4 (add/approve on a completed ROUND vanishes
at Start Round) inside the 30 "correct-as-phase" sites lane 7 had passed; (2) verifier B established WHEN a phase archive
becomes readable (admin tabs at once via the local merge; staff only after Send Results) — which decides whether R-3's
fix has data, and turned "users see nothing" into "users see Losing until Send Results"; (3) verifier D reconciled the
battery's 2,321 vs BUILD-LOG's 2,322 to one named assertion instead of a shrug.

**Traps hit, for the next session.** `md5` does not exist in the device VM — it is Linux: `md5sum`. A `&&` chain that
starts with a failing command silently skips the unzip loop that follows (good — nothing half-written — but read the
output). Per-file `unzip -p` for 338 files was fine; verify with ONE combined hash of the sorted per-file md5 list on both
sides rather than 338 lines of output. `rsync` is not in the cloud container; use `cp -r` and prune.

**State at close.** Four repos: `anesthesia-kp.github.io` has four modified docs; `tests` has the RA-8 files (338 new,
multi-file commit — no Summary-box trap); the auction and schedule repos are untouched and clean. Nothing filed but not
pushed on either site. His rulings on the RA-8 queue are the next step; §164 item 5: *"i don't need an answer until
audit is complete"* — it is complete.

**Addendum (same session, later).** §167: his three answers (no e-mail on a raise; the confirm on a cut below approved;
the "3-bid limit" was Claude's error — a fixture default, his setting is `maxBidsCumulative` 6 through Phase 2, none
after — withdrawn and recorded). §168: his go on ALL groups A–F including his P4 comments and rules text. A Plan agent
drafted the three-build plan (`tests/docs/RA-8/PLAN.md`, every anchor grep-verified unique on 318/165, baseline SHAs
`dd36c3b` / `df9b460`); it was presented and the session STOPPED there for his go (§0 rule 2). Also corrected: the
context-threshold rule in START-HERE §4 — his sessions never compact below 600k; Claude invented a third threshold at
300k and was overruled within the minute. If this session compacts before the go: everything above is on disk; the
cloud workspace (`/home/claude/ra8/`) holds the clones, the 305 baseline, the tests tarball and the probes, and is
rebuilt in ten minutes from START-HERE §6 if lost.

## SESSION — 2 Sep 2026 (continued) · RA-8 Build 1 filed: admin 319 / staff 166

His *"pushed. go."* on the plan. Built in the cloud by one agent from `tests/docs/RA-8/PLAN.md` BUILD 1 with an
anchored patch script (`split(OLD).length===2` before, `count(NEW)==1` after; a second run refuses). Two plan anchors
were tightened by the builder and are recorded in the BUILD-LOG row (a phase-1–3 bid's `phase` stays numeric while
Phase 4 is open; the dashboard card says "round" only on the live view). Claude re-ran the new suite and BOTH honesty
checks itself before shipping (85/85 · 55 red on the 318 fixture, exit 1 · staff 20/20 · 11 red, exit 1) and read the
three re-anchored suites' diffs — all stricter, real extractions. Shipped as ONE zip of 19 files, unpacked per-file on
the Mac, combined md5 identical (`f4ffe262…`). **Thirteen existing suites changed** because the build routed existing
functions through new helpers; each change adds the real helper to a fixed sandbox. Nothing was committed by Claude.
Cloud workspace `/home/claude/ra8/` still holds the working tree with Build 1 applied (= the Mac's), the 318/165
fixtures under `/tmp/vac318`, `/tmp/vac165`, and the sweep symlink tree — Builds 3 and 2 start from it.

## SESSION — 2 Sep 2026 (continued) · RA-8 Build 3 filed: admin 321

*"pushed. keep going"* after 319/166 (verified live twice, clone re-synced to `d533420`, md5-identical to the Mac).
Build 3 (the record: R-1 round capacity frozen, R-3 the closed-current-phase views) built the same way from PLAN §BUILD 3,
17 anchored edits, all anchors located by TEXT because Build 1 moved the plan's line numbers. Claude re-ran the suite and
its honesty check itself (56/56 · 24 red on the 319 fixture, exit 1). One thing to know: a round archived BEFORE 321 has no
frozen header and prints the live backfill under the "(as of completion)" label — accepted because he has said every
archive so far is test data; the first real auction archives every round on ≥321. Shipped as one zip of 7 files, combined
md5 identical (`d9050ce3…`). Build 2 (the per-round timer clock, admin 320 + staff 167) is the last and the one rated
MEDIUM; its honesty baseline is whatever he pushes next, so it starts only after this push.

## SESSION — 2 Sep 2026 (continued) · RA-8 Build 2 filed as admin 322 / staff 167 — ALL THREE BUILDS DONE

*"pushed. go."* after 321 (verified live twice; clone re-synced to `dc9dcd8`, md5-identical to the Mac). **The plan's
"320" became 322** — Claude caught it while briefing the builder: a served admin whose `var BUILD` is below the live
`versions.json` number reads itself as stale. Built from PLAN §BUILD 2; the builder restarted once (a trailing comment
said `phaseBeganAt[cur]`, which the suite's own comment-stripped allow-list assertion flagged — the gate worked on the
build that created it), `git checkout` back to `dc9dcd8`, re-applied. Claude re-ran the suite and honesty itself
(70/70 · 29 red on the 321/166 fixtures, exit 1). Shipped as one zip of 10 files, combined md5 identical (`0d2d643d…`).
**Both pages must be pushed together** (one timer doc, two readers). Harness lesson filed in the BUILD-LOG row: a helper
called from inside a try/catch that swallows ReferenceError must be NAMED in fixed sandboxes — the auto-resolver never
sees it. Left for him: the welcome e-mails' "Each phase opens with" sentence (scope), and a rehearsal Start Round with
the timer ON. The cloud workspace (`/home/claude/ra8/`) holds every build's patch script, diff and logs under
`build1/`, `build3/`, `build2/` — not filed to the repos (the suites and BUILD-LOG rows are the record).

## SESSION CLOSE — 2 Sep 2026 · RA-8 done, its three builds live, the deck updated. NOTHING OPEN ON THE AUCTION.

**Checklist run.** Step 0: the three public repos fetched — all in sync with origin, nothing arrived from elsewhere;
`tests` judged from `git log` (private, cannot fetch over the bridge). The fetch stranded `objects/maintenance.lock` in
all three, as §4 says it will — moved to `_to_delete/locks/`; no locks remain. `node status.mjs` exit 0. START-HERE's
live line reads 322/167, verified served twice.

**What this session did, in one paragraph.** The archive pass (TODO 1,902 → ~1,600, START-HERE 687 → 667). RA-8: eight
lanes, a ninth for the timer, four adversarial verifiers, filed with every probe — verdict: nothing breaks the auction;
four record defects and the rounds-as-phases class remained, all pre-existing. His rulings §162–§170. Then three builds
from one plan, each with its own suite red on the previous pushed SHA, an open-phase invariance block, the full battery,
the handler audit, the isolation guard and both sweeps: **319/166** (gates, labels, dialogs, his rules text in three
copies), **321** (a round keeps its capacity; a completed-unsent phase is closed on the admin views), **322/167** (each
round opens with the window on its own clock — renumbered from the plan's 320 so no served page reads as stale). All
three pushed by him and verified live. Finally his updated walkthrough deck, brought into line with the Draw merge.

**Waiting on him at close:** two commits — the deck in `tests` (ONE file — clear GitHub Desktop's Summary box) and the
docs here (four files). Messages in the outputs column.

**Standing at close.** §92 closes the auction code again. §164 governs any future build: narrow and safe, winding down.
The rehearsal is HIS (§169) — do not remind. The schedule stays parked (§143/§157). `_to_delete/` holds ~15 MB (this
session's transfer zips, the tests tarball, the lock folder) — his to empty.

**For the next session, the things that are easy to get wrong:** (1) the honesty baseline for any new auction build is
now `d554242` (admin 322 / staff 167); (2) `tests/docs/RA-8/PLAN.md` describes the three builds as designed — the
BUILD-LOG rows describe them as shipped, and the two differ in small named ways (322's number, the numeric-phase
tightening, the round-relabel); read the rows; (3) the cloud workspace is gone with this session — START-HERE §6 rebuilds
it in ten minutes; (4) the context number at close was ~490,000, under his 600k floor, with no compaction.

