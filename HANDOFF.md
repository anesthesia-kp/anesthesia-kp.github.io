# HANDOFF — KP East Bay Anesthesia. Both sites.
<!-- answers: how a session closes (the checklist), how the files are maintained, the standing traps of the tools and machines, PART A–D reference and D1–D5, and the latest session entries; read the checklist before any hand-over -->

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

**⛔ AT 650,000 TOKENS THIS CHECKLIST RUNS AND THE SESSION ENDS — ABSOLUTE, NO OVERRIDE (§264, owner order 11 Oct 2026: *"i never want a conversation compacted"*). Above 550,000 no new build starts. The rule and how to take the reading are in `START-HERE.md` §4 (Context); the reading at the close goes in the "Session close" line.**

**Run it at every handoff point, not only at the end** — before a long
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
  is actually serving), checks that anything filed-but-unpushed is named, checks the
  LAST REVISED date against git, regenerates START-HERE's MAP and the DECISIONS index, and
  measures every governing file against its tripwire (§188). If it cannot reach `origin/main` it says so LOUDLY — in that
  state, `git fetch` first and believe no build number until you have.
- **`START-HERE.md`** — the LIVE line, the `FILED, NOT YET PUSHED:` line, and LAST REVISED,
  bumped in the SAME turn as the edit. Delete the FILED line once it is pushed.
- **`BUILD-LOG.md`** — a row for every build, written at the same time as the code, in the
  repo the build belongs to.
- **Over a tripwire?** `status.mjs` says so and exits non-zero. Promote any lesson first (a working rule → START-HERE §3,
  a tool trap → the STANDING TRAPS section, a ruling → DECISIONS), then `node archive.mjs <file> "<heading>"` for each
  section that fails the §101 test, then re-run until it exits 0. Uncertainty keeps a section.
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

**⛔ ALWAYS paste the commit messages IN THE CHAT (owner order, 6 Oct 2026, DECISIONS §246):** *"I actually want these message pasted in the chat this way every time going forward. add to the handoff docs so it always happens. it's easier this way."* One copy-box per repo that has something to commit, the repo's name in bold above it, the one line inside and nothing else — in the same message that says what to push, and again whenever a line changes. The `COMMIT-MESSAGES.txt` file and the per-repo `COMMIT-MESSAGE.txt` still go out as before (START-HERE §3).

**⛔ ALWAYS put the current `START-HERE.md` into the outputs column (owner order, 17 Sep 2026, DECISIONS §212 — widened 22 Sep to the START of every session too, START-HERE §4 step 5):**
*"Can the most recent start here always be placed into outputs as part of handoff. it's easier to copy paste that way.
ensure this is remembered and always happens."* Do it LAST — after `status.mjs` has rewritten the map and date — as
`START-HERE.md` (plain Markdown, never a Word doc), md5-identical to the repo copy (verified, never asserted), and say so
in the handover. It goes out even when START-HERE did not change this session. **NEVER paste START-HERE into the chat (DECISIONS §247, tried and WITHDRAWN 6 Oct 2026): a 51 KB copy-box arrived in the next session cut off at line 55 of 200 — his words: *"that starthere within the chat is terrible, don't do that"*. The outputs column is the only delivery; commit lines still go in the chat (§246).**

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
Move it with `node archive.mjs HANDOFF.md "<heading>"` to `HANDOFF-ARCHIVE.md` (this repo), verbatim, dated. **Never delete.**

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

> ⛔ **NEVER ARCHIVED, whatever the test says:** the closing checklist above · this section · the
> STANDING TRAPS section below · PART A (shared), PART B (auction), PART C (schedule) and PART D (rescued records) ·
> ARCHITECTURE · DEPLOY FLOW · anything describing how the system WORKS rather than what happened
> on a day. Those are reference, not narrative. Only the **dated session entries** are ever
> archived.

**3a · `START-HERE.md` HAS A TRIPWIRE OF ITS OWN: 350 LINES** (owner ruling, 25 Aug 2026, lowered from 700 by §188 on 7 Sep 2026 and ENFORCED by `node status.mjs`, which exits non-zero over it).
It is lower than the other two on purpose — it is the ONE file he PASTES into every session, so
every line in it is a tax on every session forever, where a line in `TODO.md` is read only when
someone goes looking. **And the rule that keeps it there: a working rule that has not been needed
in months moves to `START-HERE-ARCHIVE.md` rather than staying in the paste.** Same test as
everything else — if a fresh session never read it, would it do anything wrong?

**3 · THE TRIPWIRES — `TODO.md` 700 lines, this file 900 (§188, 7 Sep 2026; they were 2,000). Over either, the
archive pass is DUE**, and it is taken before the next feature build rather than "when there's time". Nobody measures
it by hand: `node status.mjs` counts every governing file on every run, prints the counts in the STATUS block and
EXITS NON-ZERO naming the file — the same exit that means "START-HERE is stale". The pass itself is `archive.mjs`,
one section per call, verbatim into the file's `-ARCHIVE.md`; `docs-pass-check.mjs` proves a whole pass lost nothing.

⚠️ **`DECISIONS.md` IS EXEMPT AND MUST NOT BE TRIMMED.** It is a register: it should only ever
grow, every entry stays live forever, and a ruling from July governs exactly as much as one from
today. Length there is correctness, not rot. Do not "tidy" it.

**The judgement call, and it only goes one way:** if you cannot say whether an item is shipped,
outstanding, parked or a standing rule, **it stays**. Uncertainty keeps it. Archiving something
still owed is far worse than a file that is fifty lines longer than it needed to be.

---

# 🪤 STANDING TRAPS — the tools and machines as they are today. Promoted from dated entries; NEVER ARCHIVED.

**A FIRESTORE DOCUMENT HOLDS 40,000 INDEX ENTRIES, AND THAT LIMIT ARRIVES LONG BEFORE THE 1 MiB ONE** (found by a blind reviewer, 10 Oct 2026, staff 203 / admin 364 — Claude had sized the visit list against bytes only). Every stored VALUE costs two entries (a list: about one per element); a map of three values costs six. When a document reaches it, every write to that document is refused — silently wherever the write is fire-and-forget. **Before putting a growing list into one shared document: count VALUES × 2 × people at the cap, not bytes; prefer ONE value per entry; and remember a cap enforced by the admin page holds only while an admin page is open.** Measured 10 Oct from his backup: nothing near a limit (`changesArchive` 12.6% of size, 2–4% of index); `mailLog` at its cap is the closest on the site (about 63% typical, 85% worst case, by count from the code — the backup file does not include `mailLog` or `loginLog`).

**THE CLOUD CLONE OF `tests` IS SCRATCH — NEVER PUSH FROM IT.** A stop-hook in the cloud session reports its uncommitted files and asks for a push. Every push is the owner's (START-HERE rule 4). After his push, fetch and check the clone's files are byte-identical to `origin/main`, then `git reset --hard` the clone to it. On the Mac's VM, write scratch scripts under `$HOME`, not `/tmp` (a stale unwritable `/tmp/chk.mjs` cost one run).

**THE BUTTON SWEEP ATTRIBUTES CLICKS TO THE PANEL IT STARTED ON, NOT THE ONE IT ENDS UP IN** (found 15 Sep 2026, admin 337). `sweep/driver.mjs` collects every visible `button, [onclick], input[type=checkbox]` in the WHOLE document, not just the open panel — so the nav links are always in its list. It clicks one, the page changes panel underneath it, and it carries on clicking what is now visible while still labelling everything with the panel it began on. Adding the Reports page put 22 clicks under `reports`, of which only 4 were that page's buttons; the other 18 were Approvals/Denials controls it wandered into. **This is long-standing and harmless** — every panel has always done it, the totals are honest, and the per-panel comparison still localises a change correctly (every pre-existing panel was byte-identical between 336 and 337). But **do not read a per-panel click count as "what that panel contains"**, and do not treat a jump in one panel's number as evidence about that panel until you have listed the entries.


**A TEST BROWSER THAT CANNOT SHOW THE DEFECT PASSES IT** (15–16 Sep 2026, admin 338; story in `HANDOFF-ARCHIVE.md` by that date): a reproduction that finds nothing in the sandbox browser is not evidence against what he SEES in his own — check the browser differs before withdrawing a finding.

The rules live in `START-HERE.md` §3 and §6; these are the tool-level gotchas that cost a session an hour each,
one line per trap, dated by the session that paid for it (the full story: `HANDOFF-ARCHIVE.md`, by that date).
Add a line the turn a new one is paid for. Retire a line only when the tool or machine it describes is gone.

**The Mac and the bridge**
- The Mac sleeps the moment he walks away and the bridge drops with it (the fix is START-HERE §4). A `device_bash` or
  `device_commit_files` call that returned an error may still have LANDED — check before repeating it (1 Sep, 4 Sep).
- A background process started in `device_bash` dies when the call returns, `setsid nohup` included. The shape that works
  is a resumable chunk runner (~145 s of work per call, a done-list on disk, called until it prints ALL-DONE) (4 Sep).
- `device_bash` has an argument-size limit (E2BIG): a long heredoc goes over in two (29 Aug).
- `device_stage_files` takes **at most 50 paths per call** — a bigger batch is split (9 Sep).
- `status.mjs` reads file mtimes in **UTC**: after 17:00 PDT an edit "happened tomorrow" and the LAST REVISED gate
  stamps tomorrow's date. Harmless, but in the evening START-HERE's date runs a day ahead of his (9 Sep).
- Wikimedia Commons search **ANDs every word**, so a long specific query returns nothing — 2–3 words work. Matters to
  `tests/destinations/FETCH-DESTINATIONS.command`, his double-click fetcher, which a CRNA revival would need (9 Sep).
- `md5` does not exist in the device VM — it is Linux: `md5sum` (1 Sep). `rsync` is not in the cloud container: `cp -r` (1 Sep).
- The device VM's clock has run ~14 hours slow. When a timestamp matters, read `date -u` in BOTH shells and believe the one
  git agrees with; the session date is always `TZ=America/Los_Angeles date` (4 Sep, 7 Sep).
- The desktop app writes a `Claude outputs/` folder INSIDE the first connected folder — the hub repo — and GitHub Desktop
  shows it untracked; `git status` shows `?? "Claude outputs/"`. It is gitignored here now; move any copy to `_to_delete/` (3 Sep).
- Two copies of the docs repo (the Mac's and a cloud clone) diverge when both are edited. One copy is the truth at a time;
  say which, and re-stage the Mac's before building on the cloud's (30 Aug).
- Files delivered with `device_commit_files` are not seen as untracked by git over the bridge: anything that must be
  COMMITTED is written with `device_bash` or unpacked with `unzip -p`; `device_commit_files` is delivery only (24 Aug).
- `git fetch` over the bridge can be refused outright: the proxy answers `403 Forbidden` with
  `X-Proxy-Error: blocked-by-allowlist` and NOTHING leaves the Mac — not github.com, not npm, not even the live site.
  The device VM's egress allowlist varies by session: it worked 9 Sep, was empty all day 11 Sep. Read origin from the
  CLOUD instead — `git ls-remote https://github.com/anesthesia-kp/<repo>.git refs/heads/main`, one call per public repo.
  When that fetch fails, `status.mjs`'s "vs origin" column is reading STALE local refs — it never fetches — so it can
  print "in sync with origin" on the day it knows least. Confirm origin by `ls-remote` before believing it (11 Sep).

**The cloud container**
- `~` is `/root`, not `/home/claude`. Use absolute paths everywhere; `REPO_ROOT` must be absolute (31 Aug, 8 Sep).
- The vacation repo's remote is `https://github.com/anesthesia-kp/vacation.git` — the folder name is not the repo name;
  the hub and `schedule` clone under `anesthesia-kp/` by their folder names; `git ls-remote` against a guessed name is
  refused by the sandbox (4–5 Sep). `tests` is private: tar it on the Mac (minus `node_modules`) and stage it (§6).
- ESM `import` ignores `NODE_PATH`: symlink the global `playwright` and `playwright-core` (or the whole global
  `node_modules`) into `tests/node_modules/` or every browser suite is a silent skip (31 Aug, 2 Sep, 4 Sep).
- The sandbox's Chromium and the pinned Playwright disagree on build numbers and folder names, and the sweep driver wants
  the HEADLESS SHELL binary too — the symlink recipe is START-HERE §6; the numbers change (1 Sep, 5 Sep).
- The Bash tool kills a foreground call at ~5 min (exit 137). A longer battery runs detached, and a detached `sh -c`
  inherits its cwd — `cd` inside the command, poll the log's mtime, and check `/proc/<pid>/cwd` before trusting a log's
  name (29 Aug, 2 Sep).
- `pkill -f '<pattern>'` and `pgrep -f` match the tool shell's OWN command line — the first kills the shell, the second
  reports a dead run as RUNNING. Use `kill $(pgrep -x node)` and the log's mtime (29 Aug, 3 Sep; START-HERE §3 r8).
- A redirect to `/tmp/<name>` can hit a file another session left and be refused, and `tail` then prints the STALE file
  as if it were the run. Write logs under `$HOME`; check the log's mtime against `date` (1 Sep).
- The session's safety classifier sometimes blocks Reset / Delete steps as destructive; it clears on retry. Say so and
  let him decide; do not fight it (31 Aug).

**Batteries and honesty runs** (the rules are START-HERE §3 and §6; these are the mechanics)
- A battery run against the working tree is contaminated by the next edit — `versions.json matches var BUILD` goes red
  four times and looks like four regressions. Snapshot the tree and run the copy (30 Aug). Two suites on one port fight:
  `PORT=` the hand run (30 Aug). Never kill processes while a battery is warming up (30 Aug).
- Save the honesty fixture in the same breath as the bump. A build written over before its fixture was taken has NO
  fixture: rebuild it by re-applying the patch (30 Aug), or baseline on the last PUSHED build and say so (1 Sep).
- Five auction suites default their honesty baseline to `/mnt/user-data/uploads/GitHub/vacation-kp.github.io/admin/index.html`
  — exactly where `device_stage_files` drops the CURRENT build (the schedule twin is START-HERE §6). Move the staged copy
  aside or set `PREFIX_SRC` (1 Sep).
- `test-crna-stamp` regenerates `crna/` IN PLACE: after an admin build its first run is red and leaves restamped files that
  are PART OF THE BUILD; the second run is green (26 Aug).
- Record the TERMINAL call (`commit`, `persist`, `send`) and assert on it — `test-backup-restore`'s harness never reached
  `commit()` for months and was green on a half-run (5 Sep). A `typeof helper==='function'` guard is a silent no-op in a
  test sandbox: name the helper in `need` or call it unguarded (5 Sep). A helper called inside a try/catch that swallows
  ReferenceError must be NAMED in fixed sandboxes — the auto-resolver never sees it (2 Sep).
- The sweep fixture (`tests/sweep/site/fake/seed.js`) has no completed phases and no Phase-4 rounds: the sweep proves no
  regression and NOTHING about archive or round paths (1 Sep). Its staff/confirm `unlocated=1` on the default seed is
  pre-existing (1 Sep). Its fake `doc()` was fixed to be variadic on 5 Sep — cloud backup/restore now runs in it.
- Mutation runs (fifty-odd planted one-line breakages across the whole battery, ~33 s) find what green suites miss;
  part of any audit of a build that adds a guard (5 Sep).
- A `//` comment appended inside an argument list swallows the closing bracket (26 Aug). A section key that is a
  superstring of another key (`printshifts` ⊃ `shifts`) breaks every loose selector (26 Aug).

**Driving Chrome on the live site** (the rehearsal record: `tests/docs/REHEARSAL-2026-09-07.md`)
- A background tab lies about time — Chrome throttles it; foreground it (a screenshot) before reading, and trust the
  painted screenshot over `innerText` (7 Sep).
- Click the page's own buttons; a report opened from script is a blocked pop-up. When a pop-up cannot be read
  (`about:blank` is off-limits to the extension), capture the HTML in-page (7 Sep).
- `find` can resolve to the wrong row and open a real change dialog; address rows by their `onclick` target, never by
  description, when a wrong click writes (7 Sep).
- Screenshot pixels are CSS pixels × 1.133 here (1568/1384): get rects from `getBoundingClientRect()` and scale, never
  eyeball (31 Aug). Screenshot-free work leaves him unable to see where you are — say where, every time (31 Aug).
- Chrome-control screenshots land in the CLOUD container (`/tmp/claude-chrome-screenshots-<id>/`), not on the Mac —
  open them there with PIL; never ask him to drag files (24 Aug).

**Method — the lessons that are not tool-specific and not yet a numbered rule**
- A negative finding is only as wide as the fixture that produced it: put the scope IN the sentence ("no double-counting
  for phases; rounds untested"), never in a caveat further down (1 Sep, RA-7).
- Fix the CLASS, not the instance: when a defect is a shape, grep for every surface with that shape before calling it
  done — §149/§150, 312/D5, D8/E1/G1 were each the same defect found one screen at a time (1 Sep).
- A defect described from code is a hypothesis about what a human sees; look at the served page with his eyes before
  calling a build done (1 Sep, 4 Sep). A guard's comment says what it prevents, never whether it is the only way — find the
  rule it papers over before defending it (2 Sep).
- A stub can INVENT a finding as easily as hide one; a fixture that models an impossible state passes for the wrong
  reason; a probe that cannot distinguish the two answers is not evidence (1 Sep, 2 Sep).
- Lead with the supply/demand ratio in any capacity analysis; the grid is the appendix (3 Sep).

**Records and paperwork**
- GitHub Desktop pre-fills the Summary on a ONE-file commit and the pasted message is LOST (proved by a controlled
  comparison, 1 Sep). The structural fix (a suites index) was DECLINED (§157): say so in the handover, tell him to clear
  the box, and prefer two-file commits where honest.
- `_archive/` is not in any git repo — the one place that promises nothing is deleted is the one place git has never seen.
  His call, unacted since 25 Aug. The three repo archives (`*-ARCHIVE.md`) ARE in git.
- Three BUILD-LOG rows are missing (schedule 96; the CRNA stamper's 17 Aug work; the 18 Aug UX-PLAN directive) — his
  call, listed in TODO (25 Aug).
- `sched/run-all.mjs` keeps a hand-written suite list; the runner exits 2 naming any unregistered suite, so register a
  suite in the same turn it is written (25 Aug). The auction runner discovers suites by `readdirSync` — no such gap (1 Sep).
- Real Firestore data reaches the cloud only as his backup JSON attached to the chat. Extract the subset a task needs into
  a file with no names or e-mails before it goes near a repo; never print the backup's keys blind (3 Sep).

**Slide decks**
- pptxgenjs writes a SECOND `<a:pPr>` in the middle of a paragraph whenever one bullet mixes a bold lead-in with plain
  text (and splits the paragraph if both runs carry `bullet`). `validate.py` passes it and LibreOffice renders it, so
  nothing flags it; strip every `<a:pPr>` that is not a paragraph's first child after `writeFile`, then count zero (22 Sep).

**The auction itself — facts that shape a build**
- The real auction runs TIMER MODE 2 (resets only when a bid affects others) — his words, 26 Aug. Current supply numbers
  are on the board, never in a document.
- Phase 4 always opens on Round 1 (his correction, 1 Sep). Rounds are phases to the simulator's "existing bids" count
  too (O-F, testing tool only; 7 Sep). He uses no old archives — everything before the real run is test data (1 Sep).
- The archived-round guard protects the bid being acted on, never the bystanders on the same week — D8, E1 and G1 all
  lived in that gap (G1–G3 built as 318); state any fix there as a rule about the WEEK (1 Sep).
- The honesty baseline for the next auction build is the last PUSHED build's SHA, from its BUILD-LOG row — never `HEAD~n`.

**THE FULL SCHEDULE BATTERY OUTLASTS ONE CLOUD COMMAND** (29 Sep 2026, staff 180). In the cloud all 108 suites run (the Mac runs 22 — no browser) and take ~20 minutes; one `Bash` call is capped at 10, so a foreground run dies at `EXIT=124` mid-suite and reads like a failure. Run it in the background — `(nohup node sched/run-all.mjs > log 2>&1; echo "EXIT=$?" >> log) &` — and poll the log for `EXIT=`.

**A STALE FILE IN THE DEVICE VM'S `/tmp` CAN BE READ INSTEAD OF YOURS — AND `unzip -p … > file` EMPTIES A FILE WHEN THE NAME IS NOT IN THE ZIP** (12 Oct 2026, filing 208 / 371). `/tmp/man.txt` from an earlier session (owned by `nobody`) could not be overwritten ("Permission denied"); the unpack loop then READ that old build-201 manifest and, for each of its 21 names, `unzip -p` found nothing and the redirect left an EMPTY file — 18 files emptied in the hub, auction and tests (START-HERE, TODO, HANDOFF, DECISIONS, BUILD-LOG among them). Recovered the same minute: the 15 tracked ones rewritten from git (`git show HEAD:<path> > <path>`, each verified with `hash-object` = `rev-parse HEAD:<path>`); the three untracked `COMMIT-MESSAGE.txt` held only the previous build's lines and were rewritten. **Rules:** never keep a working file in the device `/tmp` — use `$HOME/<name>-$$`; check the list's line count before using it; extract to a side file and move it into place ONLY when its md5 matches (`unzip -p` then compare, then `cat` over the target); zip names carry no leading `./`. A failed extract must leave the target untouched.

---

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

## 30 Sep – 1 Oct 2026 — "Vacation Auction 30 Sep 2026 V2" — STAFF 181 + ADMIN 344 LIVE (§225): THE TIMER SAYS WHAT A BID REALLY DOES TO IT.

**Start:** staff 180 / admin 343 served twice each; repos in sync after his 23:29 docs pushes; three `maintenance.lock`s moved to `_to_delete/`.

**His question first:** can a bid shorten the clock when the reset window has stepped down (19h left, reset 12h)? Read in code: NO — the save path skips a reset that would not extend, and `firestore.rules` `timerWriteSane()` clause 4 rejects one from a bidder. **He then found the defect:** the staff countdown still said "Resets to 12h with each bid change." Ruling §225, wording settled line by line with him; record of the build: BUILD-LOG row "staff 181 + admin 344".

**Pushed 1 Oct 2026, 1:42 PM** — auction `14807e1`, tests `11ad780`, hub `fec6946`; `versions.json` served 181 / 344 on two cache-busted fetches; pushed pages md5-identical to the gated copies. His word: *"It's working right."* **Also this session:** he questioned two outbid alerts (MA, AQ, 6:02 AM 1 Oct) — neither had touched her bid. Traced with his Change Log and Wk 51 card against `computeApprovals`: ADG's new 4 made the 4s the tied group, so both 5s went Under Review → Lose; alerts report a PROJECTION change, not a bid change. He agreed: *"you are right."* No change.

**Lesson — Claude offered a line that said the opposite of the truth, and corrected it itself:** "Never resets to more time than is already left" (it never leaves LESS). A short rewording of a rule must be re-derived from the code, not from the previous sentence.

**Lesson — work a rule through a full day before recommending how to word it.** Claude recommended showing the "real reset length" overnight; tabulating 3 PM → 3 AM showed the number jumping to 18h and ticking down every minute, and the recommendation changed to naming the end time — said so, dated 1 Oct.

**Lesson — he wants the plan, not the conversation.** After several rounds of piecemeal questions: *"This is all gotten confusing. Present the entire plan as you believe it to be correct."* Lead with one complete plan and the open questions numbered; do not drip options.

**Bridge:** dropped repeatedly while he was away from the Mac (one call hung 190 s). He said *"Stop trying to connect to it"* — the public repo cloned into the cloud was md5-identical to disk and answered every read-only question meanwhile.


## 8–9 Oct 2026 — "Vacation Auction 8 Oct 2026 V2" — STAFF 199 / ADMIN 361 LIVE (§257): "⇄ SWAP BIDS" · THE E-MAIL LOG SAYS WHAT EACH ALERT CARRIED.

**State.** **LIVE: staff 199 / admin 361 — `eb27f69`, pushed by him 9 Oct about 8:16 AM during live Phase 2, served twice, the pushed pages md5-identical to the gated copies `8824e819…` / `2910e403…` (tests `fb1bbbe`, hub `6cf09a6`).** Next auction honesty baseline: `eb27f69`, both pages (this build's own was `1405d99`). Schedule untouched. No rules change.
**The night, in order.** (1) 9:26 PM re-grounding; he asked what was pending and named the "harvest a bid" alert the most important. (2) Explored read-only: the engine throws out every bid of a person with one number on two weeks, so an exchange cannot be two saves; no alert-side fix exists (the hold of §237 is still wrong); ONE plan, the swap he had parked — five questions, all answered. (3) He widened it: every e-mail the site sends listed (fourteen), all kept; the E-mail Log tags; 10:19 PM "1-yes. 2-go." (4) Built in the cloud (`apply199.py`), two new suites, a Chromium check with screenshots. (5) Four blind agents: no CRITICAL / HIGH; two MEDIUM in the save's timing — fixed; a verifier found the fix had opened a smaller window — fixed its way; verified again. Three mutation runs. (6) Zip unpacked with `unzip -p` (19 files md5-verified), Mac gates, filed about 2:50 AM.
**Lessons.** (1) **`REPO_ROOT` ALONE DOES NOT POINT THE BATTERY AT A SCRATCH COPY** — 94 suites read `GH_ROOT`. Four cloud batteries "green on 199" had run them on 198; the Mac, where both roots are the same folder, showed three red (a count of messages, the rules-list order, a send-site pattern). Now in START-HERE §6. A gate that passes on the wrong input is rule 8 again: check what the suite says it tested. (2) **A fix made in answer to an audit needs its own audit.** Closing the box early (to stop a late close shutting another box) let an Edit start before the floor was written; the verifier, blind to round 1, found it. (3) **A fuzz against the real Edit box is the right oracle for "never looser than Edit"** — and it has a blind spot wherever the two weeks act jointly (two lowerings against one left); say so. (4) **Mutation testing found 36 gaps the honesty run could not**: the honesty run proves the suite fails on the OLD build, not that each gate of the NEW code is held by an assertion. A later test also disarmed an earlier one (forged bids left the box un-armed, so "closing an armed box" passed on anything) — when adding a case before an existing one, re-check the existing one's setup. (5) **A non-idempotent action needs its own busy flag** — re-saving a bid is harmless, re-confirming a swap swaps back.
**For the next session.** Nothing is queued on the auction; he drives the order. He accepted everything told to him at filing (*"I'm ok with all of this."*, 9 Oct 8:13 AM) and pushed three minutes later.
**Session close (first at about 3:00 AM while he was away; again 9 Oct about 8:25 AM after his push — context about 750,000, past his 700k line).** Checklist: 0 fetch at the opening, locks moved · 1 chat reviewed — §257 (every ruling verbatim), TODO, the plan · 2 `status.mjs` · 3 gates as in the BUILD-LOG row, cloud and Mac · 4 every repo accounted for (three with files to commit) · 5 commit lines in the chat, START-HERE delivered.

## 9–10 Oct 2026 — "Vacation Auction 9 Oct 2026 V1" — STAFF 201 / ADMIN 362 LIVE (§258): THE BID BOX SAYS WHY · UNAVAILABLE NUMBERS UNDER A "NOT AVAILABLE" HEADING (200'S LINE THROUGH THEM WITHDRAWN) · UNDER-REVIEW ENTRY EXPLORED AND CLOSED.

**State.** **LIVE: staff 201 / admin 362 — `f6a3761`, pushed by him 10 Oct about 7:05 AM during live Phase 2, served twice, the pushed pages md5-identical to the gated copies `363d913b…` / `08186964…` (tests `8de5ef2`, hub `e5bb67b`).** Next auction honesty baseline: `f6a3761`. (Staff 200 = `1a07ba6` was live from 3:28 AM to 7:05 AM.) Schedule untouched. No rules change. (It was built in the cloud because his Mac went off at 12:24 AM, a minute after his go, and filed from `build-200-files.zip` when he came back at 3:21 AM.)
**The session, in order.** (1) 8:25 AM re-grounding, all clean. (2) His timer-window question (the overnight no-close window at a 6-hour reset) — answered from the code (`_quietAdjustExpiry` pushes a close inside the window to its end); a setting of his, nothing filed to build. (3) 10:54 AM: letting a bid ENTER a competition week when it would be Under Review — explored twice at his ask (what it breaks; four ways to build it); 12:11 AM *"Let's leave the design as it is."* — CLOSED, §258 and the CLOSED table. (4) In its place: the note and the line; go at 12:23 AM. (5) Built by `apply200.py`, gated, blind review, 21 mutants; delivered as a zip about 1:25 AM.
**Lessons.** (1) **THE CLOUD CONTAINER'S CLOCK IS NOT ALWAYS UTC** — this one was Pacific, and two admin suites went red on dates; run the cloud battery with `TZ=UTC` (now in START-HERE §6). (2) **A first battery "13 suites failed" was the un-chain, not the build:** every earlier build's invariance suite takes later builds' edits out through `un199`; a new build must generate its own `unNNN.mjs` and hook it into the previous one BEFORE the battery means anything. (3) **An approved sentence can still be untrue** — the reviewer counted, on the real rule, how often the short weakening wording stood over a number it did not explain (467 of 792); a wording check needs the rule run under it, not a read. (4) The env-var trap of §6 again: a `export GH_ROOT` does not survive to the next shell call — the first "run" of the new suite was on the 199 page; the build-number line caught it.
**For the next session.** Nothing is queued on the auction; he drives the order. Both wording points were put to him and accepted as built (*"all sounds good."*). The one thing no gate could look at is a real phone's drop-down.
**FILED 10 Oct about 3:25 AM** — he came back at 3:21 AM (*"back.  all sounds good."*): the Mac's base checked (199 page and the three hub docs exactly as the zip was built on), zip unpacked with `unzip -p` (19 files md5-identical), Mac gates: inline scripts 4/4, battery 126 suites / 5,428 exit 0, isolation 36/36, the 200 suite 67/67 and FAILED 43 of 67 on `eb27f69`; `status.mjs` exit 0 with the FILED, NOT YET PUSHED line. **He pushed three minutes later (3:28 AM); live verified twice; `status.mjs` clean after; two docs-only commits handed over (hub, and the BUILD-LOG commit id).**
**Session close (first at about 1:25 AM with his Mac off; the owed steps 2–4 done at 3:25 AM).** Checklist: 0 fetched at the opening, locks moved · 1 chat reviewed — §258 carries every ruling verbatim · 2 `status.mjs` ran clean at 12:23 AM; NOT re-run after the cloud edits (needs the Mac) — OWED · 3 gates as in BUILD-LOG row 200, cloud only; Mac gates OWED · 4 repos: nothing pushed; everything is in the zip · 5 commit lines in the chat; START-HERE delivered from the cloud copy.
**THEN, the same night — STAFF 201 / ADMIN 362 BUILT AND GATED IN THE CLOUD, NOT YET FILED.** 3:29 AM he found the line through unavailable numbers too faint on his iPhone (live 200); five options; 3:31 AM *"1-1 … Go."* (group them under a heading; leave the line until the replacement is ready). A published phone test page went to him before the build (*"It looks great"*), then his order to drop "greyed out" from the wording. Mac off again about 3:40 AM → `build-201-files.zip`; **FILED about 7:05 AM** when he came back (*"back"*, 7:00 AM): bases matched, 21 files md5-identical, Mac battery 126 / 5,427, isolation 36/36, honesty 37 red on `1a07ba6`, `status.mjs` clean. **He pushed the same minute; live verified twice; `status.mjs` clean after; two docs-only commits handed over.** Nothing is queued on the auction. **Lessons:** (1) **A CHAT PREVIEW IS NOT THE PHONE'S DROP-DOWN** — the struck numbers looked fine in the chat (full-strength text) and faint in the picker (grey text, grey line); what a phone draws is checked on a page he can open on that phone, BEFORE the build is filed (START-HERE rule 19). (2) When a later build WITHDRAWS an earlier build's promise, that build's suite is revised, not left to fail: each withdrawn assertion replaced by what the page now does, and the honesty run moved to the build just pushed.

## 10 Oct 2026 — "Vacation Auction 10 Oct 2026 V1" — STAFF 202 / ADMIN 363 LIVE (§259): THE BID BOX'S CHOICES ARE BUTTONS · CONTINUE STAYS ON SCREEN · THE SWAP STEP THE SAME.

**State.** **LIVE: staff 202 / admin 363 — `2a0c329`, pushed by him 10 Oct about 4:01 PM during live Phase 3, served twice, the pushed pages md5-identical to the gated copies `e97198c5…` / `632abc2b…` (tests `cc975e6`, hub `e24e205`).** Next auction honesty baseline: `2a0c329`. (What follows in this paragraph is how the day stood before the filing: staff 201 / admin 362 (`f6a3761`) was live.) **BUILT AND GATED IN THE CLOUD, in `build-202-files.zip`: staff 202 `e97198c5…` / admin 363 `632abc2b…` — his Mac was off from 8:49 AM, so nothing is in his folders and nothing is pushed.** Phase 3 is running (his word, 9:55 AM); the push goes out during it, at his word. Schedule untouched. No rules change.
**The session, in order.** (1) 7:08 AM re-grounding, all clean (the fetch's three stranded locks moved). (2) 8:48 AM his ask about the bid drop-down; answered from the code, with a phone test page of three versions. (3) 9:55 AM "A is great" + Continue on screen + the Swap step + "Swap bids" larger; ONE plan and a second test page; 10:09 AM praise, not taken as a go; 10:10 AM *"1-all. 2-go. Mac not available."* (4) Built by `apply202.py` on a scratch copy; the suite, the browser check; two blind reviews; the build changed in answer; a verifier; changed again; a second verifier — clean. (5) The sweep compared with 201 row by row, which found a defect in the sweep itself.
**Lessons.** (1) **A CONTROL THAT APPEARS UNDER THE FINGER TAKES THE TAIL OF THE TAP THAT MADE IT APPEAR.** Buttons drawn where a week card, "← Edit" or "← Back" was pressed received the second tap of a double tap and chose silently. Any build that puts a tappable thing where another was pressed needs a guard, and the guard must start again on EVERY change of what is on screen, not only on a paint — the first fix covered the opening and the verifier found the step changes. (2) **A ROW THAT STAYS ON SCREEN COSTS FOUR THINGS, all found by review, none by the first gates:** it can be pressed from where a message at the top is out of view; it covers what the Tab key lands on unless the box has `scroll-padding`; on a short sideways screen it covers the content itself; and it hides the fact that there is more below. (3) **THE SWEEP CLICKED BY POSITION AMONG ALL CONTROLS** — a build that adds controls inside a dialog earlier in the page moves every later click, with no error. It was seen only because the 201 and 202 reports were compared ROW BY ROW, not by their totals (one total differed by one). The comparison is the gate; "sweep clean" alone was true and worthless. (4) **THE PAGE IS DRAWN AT 115% ON A WIDE SCREEN** (`body{zoom:1.15}` above 820px): a height in `vh`/`dvh` is 15% taller than it reads, and a phone held sideways can be wider than 820px. (5) `add_repo` reaches the private `tests` repo from the cloud — the whole battery ran with the Mac off; no tar-and-stage. (6) A slip of Claude's: a stray `git stash` in a diagnostic command line set the tests clone's edits aside for one command; popped at once, nothing lost — one command, one purpose, in a clone that holds unsaved work.
**For the next session.** Nothing is queued on the auction; he drives the order. He has not yet said how the bid box and the Swap step look on his iPhone on the live site. The three points put to him at the hand-over were all accepted as built (3:29 PM, *"I agree with you on all of the calls."*).
**Session close.** Checklist: 0 fetched at the opening, locks moved; the cloud clones match what the Mac held at 7:09 AM (all four clean and level then) · 1 chat reviewed — §259 carries every ruling verbatim · 2 `status.mjs` NOT run on the Mac (off) — OWED at filing · 3 gates as in the BUILD-LOG row, cloud only; Mac gates OWED · 4 repos: nothing pushed, nothing in his folders; everything is in the zip · 5 commit lines in the chat; START-HERE delivered from the cloud copy.
**FILED about 4:00 PM, 10 Oct 2026 (his *"back"*, 3:54 PM): the Mac's bases matched the zip's manifest, 20 files unpacked with `unzip -p` md5-identical, Mac gates green (inline scripts 4/4 both pages, battery 127 suites / 5,507 assertions exit 0, isolation 36/36, the new suite 80/80 and FAILED 52 of 55 on `f6a3761`), `status.mjs` clean.** The owed steps 2–4 of the close are done. **He pushed a minute later (4:01 PM, *"pushed.  handoff."*); live verified twice; the fetch's three stranded locks moved; `status.mjs` clean after; two docs-only commits handed over (hub, and the BUILD-LOG commit id).**

## 10 Oct 2026 — "Vacation Auction 10 Oct 2026 V2" — STAFF 203 / ADMIN 364 LIVE (§260): THE VISIT HISTORY · BLINDED BIDDING RULED AS THE NEXT BUILD.

**State.** **LIVE: staff 203 / admin 364 — `b6b155b`, pushed by him 10 Oct about 5:49 PM during live Phase 3, served twice, the pushed pages md5-identical to the gated copies `a296fd78…` / `fff33be3…` (tests `d931096`, hub `56f392b`).** Next auction honesty baseline: `b6b155b`. Schedule untouched. No rules change.
**The session, in order.** (1) 4:06 PM re-grounding, all clean. (2) 4:12 PM his ask for a history of each user's visits; explored, ONE plan; 4:26 PM his answers and his second idea (a blinded-bidding switch); 4:32 PM *"1- Go"* and blinding ruled the next build. (3) Built by `apply203.py` on the cloud clone; suite, browser check, sweep compared row by row with 202 / 363; two blind reviews; the build changed in answer (below); a verifier on the final bytes — clean. (4) Filed about 5:45 PM (zip, 15 files md5-identical, Mac gates green); he pushed 5:49 PM. (5) 5:50 PM his question whether stored data will become a problem — answered from the code, then MEASURED from the backup he attached (TODO §1's top entry); 5:56 PM whether the E-mail Log's cap of 1,000 needs lowering — no, by count from the code.
**Lessons.** (1) **THE INDEX-ENTRY LIMIT** — promoted to STANDING TRAPS. The first design (a map per visit, 300 a person) would have filled the document and silently stopped the last-sign-in record too; no gate here could have seen it, a reviewer who knew the limit did. (2) **A "MARK" WRITTEN AS A FRAGMENT CAN OUTLIVE THE THING IT MARKS** — `{u:1}` merged into an entry that no longer existed made an entry with no phase. A follow-up write re-states the whole value. (3) **A TRIM THAT JUDGES BY TIME DELETES GOOD DATA ON A COMPUTER WITH A WRONG CLOCK, AND ONE THAT COUNTS ONLY WHAT IT SHOWS LETS THE REST PILE UP** — trim by shape and rank; filter by plausibility only for display. (4) The sweep's seed holds no visits, so the new button is never clicked by `driver.mjs` — the build's own browser check is what drives it (rule 9); a seed with visits would close that. (5) Both first suites let real mutants live (a second person on the same page, a clock set back, the trim tied to the open panel); `mutate203.py` now holds 26, none alive.
**For the next session.** His order: the BLINDED-bidding switch — explore every place the staff page (and the e-mails) names a colleague, ONE plan, his go. Ruled already (§260): a page-level blind is good enough; anonymous bids keep their number and W / R / L; next build. Advised and not yet ruled: switched only between phases; week FTE totals as words in blinded mode. He has not yet said whether his own visit appeared on User Activity after the push — the one proof no gate could give.
**Session close (10 Oct, about 6:00 PM; context 453,608 at 5:56 PM).** Checklist: 0 fetched after his push, all level, the fetch's two stranded locks moved · 1 chat reviewed — §260 carries every ruling verbatim; his two questions and the measurement are in TODO §1 · 2 `status.mjs` exit 0; six session entries (3–5 Oct) archived, this file 897 → under the tripwire · 3 gates as in the BUILD-LOG row, cloud AND Mac, honesty on the explicit SHA `2a0c329` FAILED as it must; 128 suites ran, none skipped on the auction battery · 4 repos: auction 1 uncommitted (BUILD-LOG commit id), hub docs uncommitted, tests and schedule clean — two docs-only commits handed over · 4a `_to_delete/` read (the 🧹 line) · 5 commit lines in the chat; START-HERE delivered from disk.

## 10–11 Oct 2026 — "Vacation Auction 10 Oct 2026 V3" — STAFF 204 / ADMIN 365 LIVE (§261): BLINDED BIDDING · THE OWN ROW'S ✕ STAYS ON THE BID'S LINE · VACATION BUCKS FILED (§262).

**State.** **LIVE: staff 204 / admin 365 — `a0fb452`, pushed by him 11 Oct about 7:07 AM during live Phase 3 (*"pushed all 3, decided it was ok"* — his decision, in place of waiting for the end of Phase 3), served twice, the pushed pages md5-identical to the gated copies `c44cc16c…` / `f20a9244…` (tests `55f470f`, hub `d8fd9ed`).** The blind's switch is OFF until he turns it on. Next auction honesty baseline: `a0fb452`. Schedule untouched. No rules change.
**The session, in order.** (1) 6:35 PM re-grounding, all clean (the first two live fetches came back a cached 201 / 362 — fetched again). (2) 6:39 PM his brief for the blind; explored (two independent inventories of the staff page, one of every e-mail), ONE plan and a phone test page of three looks; 8:04–8:10 PM his answers and *"2-go."* (3) 8:17 PM two ideas for a different session, filed as §262 (Vacation Bucks; no leaving a week from a winning position). (4) Built by `apply204.py` on a cloud copy; suite, browser check, battery, sweep on both builds; two blind lanes. (5) 9:01 PM owner-found: his own row's ✕ on a second line on a phone — in the live 203 too; built into 204; the verifier found the first fix made slivers under enlarged text; re-made with a 20px floor; the verifier clean on the final bytes. 9:04 PM: *"will check in tomorrow. mac should stay on."* (6) Filed about 10:35 PM (zip, 9 files md5-identical, Mac gates green).
**Lessons.** (1) **A ROW TOLD NOT TO WRAP HAS TO SAY WHAT GIVES INSTEAD.** The first own-row fix passed its own check (one line, 96 cases) and would have left a ✕ too thin to press for anyone with enlarged text — and those two buttons are the ONLY way to edit or cancel a bid from the card. The check asked "is it one line?" and never "can it still be pressed?"; the verifier measured sizes. A layout gate measures the thing the user must be able to DO (rule 9). (2) **A BYTE-FOR-BYTE "UN-DO" CHECK IS CIRCULAR AGAINST THE BUILD SCRIPT** — `unNNN.mjs` is generated from the same pairs that built the page, so it proves no stray edit exists and nothing about whether the edits are right. Lane 2 re-ran its mutants with it neutralised; eight survived the node suite. Count kills without it. (3) The cloud battery reads one assertion fewer than the Mac's on unchanged bytes (5,634 against 5,635) — a count that follows the machine, not the build; compare like with like.
**For the next session.** Nothing is queued on the auction. His answers 11 Oct, 7:10–7:12 AM (§261): *"looks good"*; a Full Restore takes the switch from the backup, Reset Auction leaves it alone — both as the live 365 does, so no build. He has not yet said how the mark or the own row look on his own phone. Then, in a different session at his word (§262): Vacation Bucks, and no leaving a week from a winning position.
**Session close (11 Oct, about 7:15 AM; context 520,309 at the filing).** Checklist: 0 fetched after his push, all four level with origin, the fetch's three stranded locks moved · 1 chat reviewed — §261 carries every ruling verbatim and his push, §262 the two ideas · 2 `status.mjs` exit 0 · 3 gates as in the BUILD-LOG row, cloud AND Mac, honesty on the explicit SHA `b6b155b` FAILED as it must; 129 suites ran, none skipped on the auction battery · 4 repos: auction 1 uncommitted (BUILD-LOG commit id), hub docs uncommitted, tests and schedule clean — two docs-only commits handed over · 4a `_to_delete/` read (the 🧹 line) · 5 commit lines in the chat; START-HERE delivered from disk.

## 11 Oct 2026 — "Vacation Auction 11 Oct 2026 V1" — STAFF 205 / ADMIN 366 LIVE (§263): THE FAIR PLAY REPORT'S "BAIL" · VACATION BUCKS FILED AS A FUTURE ITEM (§262).

**State.** **LIVE: staff 205 / admin 366 — `999c85e`, pushed by him 11 Oct about 4:03 PM during live Phase 3; served twice; the pushed pages md5-identical to the gated copies `ac75830c…` / `9760e158…`** (tests `037b105`, hub `b59bdf5`). Next auction honesty baseline `999c85e`. Nothing is queued on the auction.
**The session, in order.** (1) 7:13 AM re-grounding, all clean. (2) Vacation Bucks talked through once, then *"file this as a future item todo"* (§262 addition). (3) 7:23 AM *"explore bail tracking… look back at the change log"*: the monitor already had a crude "Winning-bid cancel"; a read-only look back over his backup (`tests/bail-lookback.py`, `bail-needed.py`; the named list to him only). (4) His definition narrowed over six messages to: a winning bid taken off a competition week is FAIR when the number was needed where he had been knocked out, a "BAIL AND RETURN" when back before anyone else moved, a BAIL otherwise; no clocks; winning-bid lowering retired; the warning line in. 11:53 AM *"go. during p3."* (5) Built in the cloud by `tests/apply366.py`; two blind review lanes and three verifiers; filed about 3:25 PM.
**Lessons.** (1) **A MUTATION RUN ON A RED BASELINE KILLS EVERYTHING FOR NOTHING** — `mutate366.mjs` now refuses unless the suite is green unmutated, and does not count the invariance section (any change to the build's own text trips it). (2) **A REPLAY NEEDS EVERY ENTRY THAT MOVES THE BOARD, NOT ONLY THE BID ENTRIES** — a deleted user, a restore and a lost removal each left ghosts; a blind reviewer with an independent reference found what 94 green assertions had not. (3) **RENDER THE REPORT BEFORE FILING** — every gate was green while a bail's entry ran its table far off the page (the shared report style keeps cells on one line); one picture showed it (rule 19 applies to reports, not only phones). (4) An honesty run that CRASHES is not a red: one new assertion threw on the old page — made a legible failure.
**Session close (11 Oct, about 4:10 PM; context 728,351 at the filing).** Checklist: 0 fetched after his push, all four level with origin, stranded locks moved · 1 chat reviewed — §262 and §263 carry every ruling verbatim · 2 `status.mjs` exit 0 · 3 gates as in the BUILD-LOG row, cloud AND Mac · 4 two docs-only commits handed over · 5 commit lines in the chat; START-HERE delivered from disk.
**For the next session.** His first look at the real report is the remaining proof (it should list 3 bails, 8 fair-needed, 3 bail-and-return, all Phase 2). Residuals, all LOW and lenient: `tests/docs/REVIEW-366-205-2026-10-11.md`. HANDOFF is near its tripwire (900): the archive pass is due at the next close.

## 11 Oct 2026 — "Vacation Auction 11 Oct 2026 V2" — ADMIN 367 LIVE (§263): THE FAIR PLAY REPORT'S ENTRIES AS AN OPENING LINE AND A LABELLED LIST · TWO HARD CONTEXT LINES (§264).

**State.** **LIVE: admin 367 / staff 205 — `1a202bb`, pushed by him 11 Oct about 9:57 PM during live Phase 3; served twice; the pushed page md5-identical to the gated copy `d16270c6…`** (tests `fa1d55f`, hub `89dc5ea`). Next auction honesty baseline `1a202bb`. Nothing is queued on the auction.
**The session, in order.** (1) 4:34 PM re-grounding: all four repos level, live 366/205 and schedule 151/51 twice; his pasted START-HERE was older than disk (disk used). The V1 session had taken his go for 367 at 4:29 PM and was stopped by him while it tried to compact; nothing of its scratch build reached disk. (2) 4:37 PM his order, then 4:39 PM his ruling — **§264: no new build above 550,000 tokens; at 650,000 all work stops and this checklist runs; ABSOLUTE, no override** (*"i want it absolute because i never want a conversation compacted"*) — written into START-HERE §4, the head of this checklist and DECISIONS; he pushed it (`216bb57`). (3) 4:42 PM *"go"* — admin 367 built afresh in the cloud by `tests/apply367.py`, the real report drawn in Chromium on a made-up log and sent to him (about 4:50 PM) before filing, gated cloud and Mac, one blind review (safe to deploy; one wording slip fixed, six assertions added), filed about 5:40 PM; he pushed about 9:57 PM.
**Lessons.** (1) **A SHELL REDIRECT THAT FAILS LEAVES THE LAST RUN'S OUTPUT TO READ** — `node status.mjs > /tmp/x` on the device VM was refused (an old, unwritable `/tmp/x`), node never ran, and `tail /tmp/x` showed a stale run with other line counts and exit 1. Write gate output under `$HOME` on the device and check the file's time before reading it (rule 8). (2) **A FAITHFUL VIEW BESIDE THE OLD TEXT BEATS REWRITING THE OLD TEXT** — keeping `detail` byte-identical let every 366 assertion and a 10,000-log comparison prove that no verdict moved; the view is checked against it. (3) **A BYTE CHECK CATCHES EVERYTHING AND EXPLAINS NOTHING** — five of 36 mutants died only on "taking the edits out gives 366 back"; each now has an assertion of its own.
**Session close (11 Oct, about 10:05 PM; context 345,724 at the post-push reading).** Checklist: 0 fetched after his push, all four level with origin, stranded locks moved · 1 chat reviewed — §263 (the V2 build) and §264 carry every ruling verbatim · 2 `status.mjs` exit 0; the 6 Oct V1 entry archived (HANDOFF 881 → 872 before this entry); `archive.mjs` REFUSED the older "30 Sep – 1 Oct" entry as not a dated session entry — its date range is not read as a date (a gap in the tool, left in place, not fixed) · 3 gates as in the BUILD-LOG row, cloud AND Mac · 4 docs-only commits handed over (auction BUILD-LOG, hub) · 5 commit lines in the chat; START-HERE delivered from disk.
**For the next session.** His first look at the real report in the new layout is the remaining proof. Residuals, all LOW: `tests/docs/REVIEW-367-2026-10-11.md`.

## 11–12 Oct 2026 — "Vacation Auction 11 Oct 2026 V3" — ADMIN 368 AND 369 LIVE (§265): THE ADMIN PAGE WAITS FOR ITS DATA BEFORE IT DRAWS, AND KEEPS LOOKING · BAIL PREVENTION FILED FOR LATER.

**State.** **LIVE: admin 368 / staff 205 — `ac9f859`, pushed by him 12 Oct about 6:20 AM during live Phase 3; served twice; the pushed page md5-identical to the gated copy `58a8bb98…`** (tests `648d7da`, hub `1ebc997`). Next auction honesty baseline `ac9f859`.
**The session, in order.** (1) 10:04 PM re-grounding: four repos level, live 367/205 and schedule 151/51 twice; his pasted START-HERE identical to disk but for its last line break. (2) 10:08 PM his idea, filed for later: solutions that make bailing in its worst form impossible; 10:58 PM his further thoughts on it, filed with it (TODO §1). (3) 10:09 PM his order (§265): the admin site to get a loading cover like staff 190; explored read-only, ONE plan (`tests/docs/PLAN-368-…`), four questions; 10:24 PM *"1-yes. 2-no. 3-yes. 4-don't know. Go"* ("3-yes" read as: pushed during Phase 3 — said back). (4) Built in the cloud by `tests/apply368.py`, gated (suite 68/68, `--pre` failed 59/66; browser check 95/95, failed on a 367 site; batteries cloud and Mac 132 / 6,023), phone test page published to him, one blind review (safe to deploy; one MEDIUM, M1, put to him), filed about 11:12 PM; he pushed 12 Oct about 6:20 AM.
**Lessons.** (1) **A CHANGE TO A SHARED WRAPPER BREAKS EVERY SUITE THAT EXTRACTS IT WITH A HAND-MADE CONTEXT** — `test-audit-fixes.mjs` builds `onSnapshot` and `_feedsHealthyOrExplain` inside `with(ctx)`; a new helper they call is a ReferenceError there, and the crash hid a third of its checks. Grep the suites for the function's name before building, and give them the REAL new helpers, not a stub. (2) **RUN THE FULL BATTERY BEFORE THE REVIEW, NOT BESIDE IT** — the reviewer spent effort reporting a red battery the builder was about to see. (3) **A POINT PROBE MUST AIM AT WHAT CAN HOLD A CONTROL** — "nothing behind the cover can be tapped" first failed on the page's own message strip (`#toast`, z 9999, always above everything by design). (4) **ASK EITHER/OR QUESTIONS SO "YES" CANNOT ANSWER THEM** — "during Phase 3, or between phases?" came back "3-yes".
**Session close (12 Oct, about 6:25 AM).** Checklist: 0 fetched after his push, all four level with origin, stranded locks moved · 1 chat reviewed — §265 carries his order and answers verbatim; both bail notes in TODO §1; M1 and the review's pre-existing items in TODO §1 (his call) · 2 `status.mjs` (below) · 3 gates as in the BUILD-LOG row, cloud AND Mac · 4 docs-only commits handed over (auction BUILD-LOG, hub) · 5 commit lines in the chat; START-HERE delivered from disk.
**For the next session.** His first look at the cover on his phone, in use, is the remaining proof. His ruling at the close (§265, 6:26 AM): the page keeps looking; 6:27 AM *"go"* — **admin 369 built and FILED about 6:46 AM, pushed by him about 6:47 AM — LIVE `ffdfad2`, served twice (Pages took about four minutes), md5-identical to the gated `e0aea875…`; tests `4d3e9b4`, hub `3a46231`; next honesty baseline `ffdfad2`** (one look a minute while the cover is up, and one on reconnect; gates in the BUILD-LOG row; review safe to deploy). The pre-existing e-mail items he filed for later (do not surface). **Lesson (5): A FAKE CLOCK THAT STARTS AT ZERO TESTS A PAGE THAT NEVER EXISTS** — the cover reads a zero start as "not begun"; the first 369 run failed seven checks on the harness, not the page. Start fake clocks at a real-looking time.

## 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V1" — STAFF 206 / ADMIN 370 AND STAFF 207 LIVE (§266): LOCKED WEEKS GREY, IN PLACE BY A PER-PHASE SWITCH; A WON WEEK GREEN.

**State.** LIVE: admin 369 / staff 205 `ffdfad2` (served twice at 6:52 AM). **LIVE: staff 206 / admin 370 — `77c1ed6`, pushed by him about 3:34 PM during live Phase 3; served twice; the pushed pages md5-identical to the gated copies `f5ddab2d…` / `29fe7b60…`** (tests `c581b52`, hub `b88ef93`). Next auction honesty baseline `77c1ed6`.
**The session, in order.** (1) 6:52 AM re-grounding: four repos level, three stranded fetch locks moved, live 369/205 and schedule 151/51 twice. (2) 8:10 AM his idea (locked weeks on the board, greyed); explored read-only; a phone test page published (versions 1–4) and his rulings 1:20–1:42 PM, all verbatim in §266 (grey everywhere, own bid only, won week green from results sent, an admin switch per phase with ONE for Phase 4, every week locked → in place, the tag "🔒 Locked — no bid changes"; "Full" withdrawn on Claude's push-back). ONE plan (`tests/docs/PLAN-206-370-…`); his *"go"* 1:42 PM. (3) Built in the cloud by `tests/apply206.py`, gated (suite 61/61, `--pre` failed 23 of 25; browser check 97/97, failed 52 of 84 on 205; battery cloud and Mac 134 / 6,118; isolation 36/36); one blind review + verifier (safe to deploy; fixes: contrast, the empty-view line, the tests' red scan / leak ban / filtered view); filed while he was away from the Mac, every base md5-checked first.
**Lessons.** (1) **THE SANDBOX BOARD HAS 52 WEEKS, NOT THE SEED'S 8** — "every week locked" first failed in the test, not the page; lock what the page draws. (2) **A BROWSER REWRITES INLINE STYLES** (`rgba(127,29,29,.4)` reads back as `rgba(127, 29, 29, 0.4)`) — match innerHTML with optional spaces. (3) **A REVIEWER CAN BE WRONG — CHECK BEFORE CHANGING**: its "a phase close does not lock every week" was refuted in the admin code (`_lockEveryWeek`) and withdrawn. (4) **MARKUP SCANS CANNOT SEE CSS COLOUR** — scan computed styles.
**Session close (12 Oct, about 3:40 PM).** After his push: fetched, all four level, stranded locks moved; live twice; BUILD-LOG commit id, START-HERE LIVE line (FILED line removed), §266 / TODO / this entry updated; `status.mjs`; docs-only commits handed over (auction BUILD-LOG, hub); START-HERE delivered from disk. Context at close about 480,000. **Then, the same session:** his owner-found item (3:36 PM) answered and ruled 3:40 PM (§266 (11) (12)) and built as **staff 207 — FILED about 4:36 PM, `ed34f097…`** (one review HIGH fixed: a Phase 4 round's denial showed "Winning" before Start Round). **LIVE `17d4e49` — pushed by him about 4:39 PM; served twice; md5-identical to the gated copy** (tests `6958ce0`, hub `866ffe0`); next honesty baseline `17d4e49`. **Lesson (5): A REVIEWER'S "SAFE" IS ONLY AS GOOD AS ITS FIXTURES — the 207 HIGH (a Phase 4 round's denial still "Winning") lived in a window no fixture had: between Send Round Results and Start Round.** **Session close (12 Oct, about 4:45 PM; context about 560,000 — past 550,000, so no new build).** All four repos level with origin, stranded locks moved; live twice; records updated; docs-only commits handed over; START-HERE delivered from disk. **For the next session:** his first look at the board on his iPhone; HANDOFF is at its tripwire — the archive pass (`node archive.mjs`) is due before the next hand-over. Told to him, his call: the holiday label keeps its own colour on a grey card; the admin toggle writes all four values; the empty-view sentence is new wording.

## 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V2" — STAFF 208 / ADMIN 371 LIVE (§267): WHEN BIDDING CLOSES NOTHING MOVES · A HAND UNLOCK AFTER THE CLOSE: DECLINED.

**State.** LIVE: staff 207 / admin 370 `17d4e49` (served twice at the opening). **FILED, NOT PUSHED: staff 208 / admin 371** — gated staff `83b39ae5…`, admin `251feb0a…`, versions.json `abc6f88a…`; the push is his. **PUSHED BY HIM about 7:50 PM — LIVE `ab7f2d8`** (tests `17ba1b7`, hub `7621028`); served twice; the pushed pages md5-identical to the gated copies. Next auction honesty baseline `ab7f2d8`. Phase 3 CLOSED 12 Oct 2026 (his word, 5:50 PM); Phase 4 opens next year.
**The session, in order.** (1) 4:42 PM re-grounding: four repos level, three stranded fetch locks moved, live 207/370 and schedule 151/51 twice; context 171,176. (2) His question on the last build, then owner-found: the board looked different at phase end depending on whether an admin page was open — the lock record is written only by an admin page; explored read-only; options A–D for Phase 1; he chose C; the plan; his go 6:09 PM (§267 verbatim). (3) Built in the cloud while the bridge was down; one blind review + verifier (safe to deploy; two LOW wording cases fixed); the old suites caught three more things (the retired word "draw" in two names, apostrophes in comments vs test-203's stripper, an empty-board edge) — all fixed in the page, 12 suites repointed, `un208.mjs` generated. (4) Bridge back: filed by zip — see the STANDING TRAP of today (18 files emptied by a stale `/tmp` manifest, restored from git the same minute, verified); then the safe unpack, 22 of 22 md5-verified; Mac battery 136 / 6,133.
**Lessons.** (1) **LOCK WHAT THE PAGE DRAWS, AGAIN** — the first browser check locked the seed's 8 weeks, not the board's 52 (206's lesson repeated): take the week list from the drawn board. (2) **A WRAPPER ON A SHARED WRITE TOUCHES EVERY SANDBOX THAT EXTRACTS ITS CALLERS** — seven suites needed the real `_withCloseLayout` added; add the real function, never a stub. (3) **THE STALE `/tmp` TRAP** (STANDING TRAPS).
**His ruling 7:53 PM (§267, verbatim there):** an admin unlock after the close puts that week on the board in its month (up from the bottom if it was there; no change if already in its month) — then, told it arises only after a close in a phase set to the bottom and only on a hand unlock: *"I would never do that"* — DECLINED 8:05 PM; nothing queued.
