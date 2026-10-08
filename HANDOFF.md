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


## 1 Oct 2026 — "Vacation Auction 1 Oct 2026 V2" — STAFF 183 / ADMIN 345 LIVE (§220 · §223 · §224 · §227).

**State at hand-over.** LIVE: **staff 183 / admin 345 (`aa10c51`, pushed 1 Oct about 5:17 PM during live Phase 1 — his decision)**, served twice, pushed bytes md5-equal to the gated copies (staff `79dcd87a…`, admin `36379b08…`); tests `9004ee7`, hub `9820f6e`. All four repos level with origin before the closing docs. Nothing is queued to build. **Watch after this push:** the first bids made on 183 are the first change-log entries to carry `tRem` / `tDur` / `tReset` / `aff` — if the Fair Play report ever looks wrong, open the Change Log and read those fields on the entry.
**Rulings (§227):** *"1 - build now and i'll push when ready.  2 - that's fine.  3 - a.  4 - good.  5 - make sure it's accurate with the selected timer settings."* and, on stalling for old entries, *"good.  proceed."*
**Built ON THE MAC** (`device_bash`, python patches that refuse to apply twice; no cloud clone), the battery run there in the foreground. Gates and review: the BUILD-LOG row and `tests/docs/REVIEW-183-345-2026-10-01.md`.
**What the monitor shows after the push:** only bids made on staff 183 carry late-timer, stalling or winning-bid flags. Phase 1's earlier flags are gone from the report by his rulings — if he asks where they went, that is the answer. The report itself does NOT say so: he had the explanatory footnote removed (*"remove that footnote"*, same session).
**Lessons.** (1) `grep -o` with a fixed window HID a user-visible "outbid" on a 900-character line; the new suite's "nowhere outside comments" assertion found it. Assert the absence, do not eyeball a grep. (2) A heredoc over about 16 KB fails with `E2BIG` on the bridge — write the file in the cloud, `device_commit_files` to `_to_delete/xfer/`, then `cat` it into the repo with `device_bash`. (3) The reviewer's one MEDIUM was a question Claude had asked itself mid-build and waved through; the live 5-day window made it real. Check a doubt against the live settings in the runbook before dismissing it. (4) Six older suites failed on the first battery; each was re-anchored on what is TRUE now (rule 12), and the old `byte-identical` timer check became an undo-then-compare.

## 1–3 Oct 2026 — "Vacation Auction 1 Oct 2026 V3" — ADMIN 346 LIVE (§228): THE PDF EXPORTS KEEP THEIR COLOURS · ADMIN 347 LIVE (§229): "WITH BIDS ONLY" ON THE REPORTS PAGE · ADMIN 348 LIVE (§230): THE CHANGE LOG EXPORTS · ADMIN 350 LIVE, CARRYING 349 (§231 the export drawn like the page · §232 the timer-reset row states a time).

**State at hand-over.** LIVE: **admin 350 (`1dc3cb9`, pushed 2 Oct about 4:39 PM) / staff 183 (`aa10c51`)**, served twice, the pushed admin page md5-equal to the gated copy (`7a546dd0…`). The day's admin builds: 346 `f09da91` (10:03 AM, between phases), 347 `c1b6382` (10:18 AM), 348 `41bc1a0` (4:08 PM), 350 `1dc3cb9` (4:39 PM, carrying 349, which was never pushed alone). Tests `07029e4`, hub `8e46123`. **Phase 1 is complete; Phase 2 starts 2 Oct (owner).** He confirmed 346 and 347 in his own browser ("works. thanks."), exported 348 himself and ruled its solid colour blocks distracting (§231); 350's restyled export and timer-reset row not yet confirmed by him. **OPEN, 3 Oct — THE NEXT SESSION'S JOB (his ruling: *"Build needs to happen in a new session"*): two valid alerts were parked and never sent (owner-found). NOTHING BUILT. Read `DECISIONS.md` §233 first (his eight rulings verbatim; settled: failure path only, success path proven unchanged, do not overbuild, never delete a parked e-mail, notices to the Vacation Goddess address, stuck = 2 minutes; size A chosen after close-out — *"A"*: the strike rule plus recording the reason, nothing else; NOT settled: what the ⛔ parked dialog offers, and the go on A's own plan), then `tests/docs/PLAN-MAIL-QUEUE-NO-FALSE-PARKING-2026-10-03.md` (its §0 says which parts are NOT approved). Honesty baselines: staff `aa10c51`, admin `1dc3cb9`. He pushes during Phase 2 with bidding closed.**
**Session start (1 Oct evening).** Six auction fetches: four said 183 / 345, one said 181 / 344 and one 136 / 17 / 265 — never explained (a stale edge or the fetch tool's own small model); disk and origin agreed with 183 / 345 throughout. He pushed V2's closing docs (hub `85759d6`, auction `ee2bd9a`).
**Lessons.** (1) A "PDF export" that is really the print dialog inherits the browser's print defaults — backgrounds are OFF. Anything drawn as a fill needs `print-color-adjust: exact`, and the test must print with backgrounds off or it proves nothing. (2) Playwright can be importable with no browser behind it (the Mac): launch inside the try, or "not run" becomes a throw (rule 11). (3) `BUILD = 345` pinned in a suite failed the first battery on 346 — the fourth time a pinned build number has done it; assert BUILD equals `versions.json`.
(4) A try/catch in the PAGE can hide a missing collaborator from the test resolver: the week label fell back to the raw key on BOTH sides of a screen-vs-export comparison, which then passed while both were wrong. When a comparison is the gate, also pin one literal value. (5) An older suite that extracts one function by name throws the day that function gains a helper — add the helper to its list; a null from an older build joins as nothing.
(6) A plan that says "coloured labels" approves the labels, not a look — Claude chose solid chips and dark bars for the Change Log export and he found them distracting within the hour. When a new document has a screen it mirrors, draw it like that screen unless told otherwise. (7) When the bridge drops mid-write, the first call after reconnecting is a READ of what is on disk (md5 and a grep for the new marker), never the write again.
(8) An assertion that calls a function with a RAW record proves nothing about a page that only ever calls it with the NORMALIZED one — `test-341` passed for two weeks while every timer-reset row on the live page read "to h". Drive the sentence through the real render. (9) Look at the owner's screenshots for what he did NOT mention: the defect of §232 was sitting in the picture he sent about colours.
(10) Before designing around an outside service's limits, read its documentation that day: "1 request per second" was a recollection for three turns and a fact only after the REST page was fetched. (11) When the owner asks "what else needs considering?", the answer is a list he can rule on — and the plan file is written BEFORE the go, so a compaction or a walk-away cannot lose it.
(12) **Size the fix to the evidence.** For a fault seen once, with its cause inferred, Claude designed seven parts including a rewrite of every send; he cut it three times (*"is this being done in the safest way possible?"* · *"Only address the failure path"* · *"This only happened once, so we shouldn't overbuild"*). Offer the smallest fix that removes the fault FIRST, and name anything larger as a separate, optional step. (13) Do not write the owner's choices for him: Claude's fallback said he could "delete it from the parked list"; his answer was that he never wants to delete one.
**Session close (3 Oct).** Checklist run: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed, rulings §228–§233 on disk and grepped · 2 `status.mjs` exit 0 · 3 no code changed since 350 (`1dc3cb9`), so no battery was owed; the last one ran on 350 — 105 suites, exit 0 · 4 uncommitted, all docs: hub 4 files, auction `BUILD-LOG.md`, tests the plan file · 4a `_to_delete/` reported to him · 5 START-HERE delivered. Context at close: about 530k.

## 3 Oct 2026 — "Vacation Auction 3 Oct 2026 V1" — STAFF 184 / ADMIN 351 LIVE (§233 size A): AN ANSWERED REFUSAL IS NEVER A MAIL-QUEUE STRIKE; EVERY FAILURE'S REASON IS KEPT.

**State.** LIVE: **staff 184 / admin 351 (`091b0f6`, pushed 3 Oct about 9:59 PM)**, served twice, pushed bytes md5-equal to the gated copies. Gated copies: staff 184 `a7647cb9…`, admin 351 `29241306…`, `versions.json` 184 / 351 — the SECOND cut (the first, which retried every non-422 failure without limit, was never pushed). His rulings this session are §233 rulings 10–14. **Nothing is open on the build. His e-mail-log idea is in `TODO.md` §1 — a separate build, needs a plan and a go.**
**Gates run:** the new suite 173/173 and 77 FAILED on the live pair (exit 1), passes read; auction battery 106 suites / 3608 assertions, exit 0; isolation 36/0; inline scripts `node --check` clean; schedule battery 22 of 108 on the Mac (browser suites cannot run there; no schedule byte changed). Independent review filed.
**Lessons.** (1) A change that removes a cap needs its own question: "what now stops this?" — the plan named the unlimited retry but not the duplicate-delivery case; the reviewer found it, he ruled *"I don't want duplicate messages"*, and the fix became narrower and safer: only a refusal the service ANSWERS with is exempt. Ask of every failure class: could the thing have happened anyway? (2) When two things share one write, make the cheaper one unable to fail: the helpers were hardened so a strange error value cannot lose the strike. (3) `device_bash` refuses a command over a certain size (`E2BIG`, seen at about 19 KB): write a large new file in the cloud, zip it, `device_commit_files` to `_to_delete/xfer/`, `unzip -p` into place, md5 both sides. (4) A test harness that extracts a page function must use THAT page's names for its data (`loginEmailsDataAdmin`, not `loginEmailsData`) — the first admin run failed on the harness, not the code.
**Later the same session — STAFF 185 / ADMIN 352 LIVE `9af2c46` (§234; pushed 3 Oct about 10:24 PM, served twice, pushed bytes md5-verified; tests `dedf99c`): THE E-MAIL LOG.** His idea, his go. One line in `_mailLogNote` on each page plus `_mailHistNote`; People → ✉️ E-mail Log on the admin page (filters, PDF / Excel export, newest 1,000 kept). Gated copies: staff `8e0a0089…`, admin `efc2c4d7…`. Suite 124/124, 42 fail on `091b0f6`; battery 107 suites / 3728, exit 0. Lessons: (5) an invariance proof against a fixed SHA ("the rest of the page is byte-identical") is a FILING proof — the next build ends it by nature; keep it out of the standing battery or retire it when the next build lands (rule 12), and keep the narrow promise (the relay through its catch) asserted for good. (6) A patch anchor that looks unique in a truncated grep is not: the loginLog and mailLog listeners end in the same words; the `count==1` assertion stopped it before any write (rule 15 earning its keep). (7) Reading the honesty passes found `[undefined, undefined]` serialising to the same text as `[null, null]` — a vacuous pass on a page with no history at all.
**Session close (3 Oct, about 10:35 PM).** He confirmed the E-mail Log in his own browser (*"looks good, do handoff"*). Checklist run: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed — rulings §233 10–14 and §234 on disk and grepped; the two shipped builds left `TODO.md` §1 as one paragraph each, after every verbatim ruling in the removed block was confirmed present in `DECISIONS.md` · 2 `status.mjs` exit 0 · 3 the last battery ran on the pushed bytes of 185 / 352: 107 suites, 3728 assertions, exit 0; isolation 36/0; the Mac ran 22 of 108 schedule suites earlier in the session (no schedule byte changed) · 4 uncommitted, all docs: hub `DECISIONS.md` `HANDOFF.md` `TODO.md` `START-HERE.md`, auction `BUILD-LOG.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered. **NEXT SESSION: nothing is queued on the auction.**

## 3–4 Oct 2026 — "Vacation Auction 3 Oct 2026 V2" — STAFF 186 / ADMIN 353 LIVE (§236): A PAGE THAT GETS NO ANSWER FROM THE MAIL SERVICE STEPS ASIDE · §235 TABLED.

**State.** LIVE: **staff 186 / admin 353 (`c127fac`, pushed 4 Oct about 9:40 AM during live Phase 2, his decision)**, served twice, pushed bytes md5-equal to the gated copies (staff `6b757b23…`, admin `cdd8ea46…`); tests `8c710ea`. Owner-found in his new E-mail Log: one page that got no answer failed four times on a good alert (six minutes, three strikes, reason shown as "[object Object]"). Built: such a page lets go of its claim at once, takes a second attempt after 20 s, then steps aside 30 minutes; the log reason reads "no answer"; two pills beside Current Phase on the admin dashboard (waiting over 2 minutes · parked). His rulings are §236 1–5. **§235: cancel-and-re-bid sends several alerts — the swap and the hold are TABLED for a build when the auction is not live.** Not yet confirmed by him in use.
**Gates run:** new suite 172/172; `--pre` on `9af2c46` FAILED 88 of 152 (exit 1), its 64 passes read; 14 of 14 hand mutations caught, control green; auction battery 108 suites / 3,898 assertions, exit 0 (`test-rules-emulator` reports rules not covered — no rules change); isolation 36/0; `node --check` clean on all 8 inline scripts; the pills rendered with the Rehearsal pill in Chromium at five widths. Schedule battery NOT run (no schedule byte changed). Independent review before the push: no CRITICAL / HIGH; M1 fixed before filing; M2 / M3 in `TODO.md` HIS CALL.
**Lessons.** (1) **Count attempts, not failures.** The first cut counted every failed send, so one blip on a bid that alerts two people used up both attempts in a second; the reviewer found it, not the suite — the suite fed the counter by hand and so could not see the loop that feeds it twice. When a counter is fed from a loop, drive the loop's shape (N calls in one instant) in the test. (2) **His instinct beat the plan:** the first plan stepped a page aside on its first failure; his *"how about a 2nd attempt"* kept the self-heal a healthy page has today. Before removing a retry, write down what the retry is currently rescuing. (3) **`_mailLogNote` is the one place every send on both pages reports to** (ok / err) — anything that needs "did this page's send work" belongs there, with no send block touched. (4) Old suites that extract `_mailLogNote` or a relay need the two new real helpers in their harness (`_mqNoAnswer`, `_mqSendNote`) and the four page-memory values; three were repointed (184 / 351, 185 / 352, 330). (5) Rule 11 slipped once: `status.mjs | tail` reported tail's exit; caught on the next line and re-run bare. (6) E2BIG again at about 27 KB — a 39 KB suite went over in three appended heredocs, each under 17 KB.
**Session close (4 Oct, about 2:20 PM).** Checklist run: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed — §235, §236 rulings 1–5 on disk and grepped; Q11 left `TODO.md` when the build was filed; M2 / M3 and the test gaps filed there · 2 `status.mjs` exit 0 · 3 battery re-run on the pushed bytes at close · 4 uncommitted, all docs: hub `DECISIONS.md` `HANDOFF.md` `TODO.md` `START-HERE.md`, auction `BUILD-LOG.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered. **NEXT SESSION: nothing is queued on the auction.**

## 4 Oct 2026 — "Vacation Auction 4 Oct 2026 V1" — STAFF 187 / ADMIN 354 LIVE (§237 · §238): THE REMOVE-BID BOX POINTS TO EDIT · THE E-MAIL LOG SAYS WHOSE PAGE MADE EACH ATTEMPT · THE CANCEL-ALERT HOLD PLANNED AND WITHDRAWN.

**State.** LIVE: **staff 187 / admin 354 (`ebe2ef4`, pushed 4 Oct about 4:55 PM during live Phase 2, his decision)**, served twice, pushed bytes md5-equal to the gated copies (staff `b21d207b…`, admin `2642b938…`); tests `ac108d8`. He un-tabled §235 (*"it keeps happening"*). A one-minute hold on a cancel's alerts was planned, then WITHDRAWN on his own concern — a bidder who cancels and leaves, with no other page open, strands a real alert. Ruled instead (§237): one boxed note in the remove-bid box, above the priority-lock note, his wording; the lock note quieter; he e-mails the group himself; the swap stays parked. Then, from two E-mail Log screenshots (§238): the log's last column now reads `staff page · XYZ`, the initials signed in on the page that made the attempt — rolled into the same push at his ask. **Confirmed by him 4 Oct 2026, about 5:20 PM: *"confirmed new builds appear working"*.**
**Gates run:** suite `test-187-354-remove-note-sent-from.mjs` 88/88; `--pre` on `c127fac` FAILED 32 of 86 (exit 1), its 54 passes read; 7 of 7 hand mutations caught, control green; auction battery 109 suites / 3,986, exit 0, re-run on the pushed bytes at close (`test-rules-emulator` reports rules not covered — no rules change); isolation 36/0; `node --check` clean on all 8 inline scripts; the remove box rendered at 375 / 320 and the E-mail Log at 1440 / 1100 / 900 in Chromium, no sideways scroll. Schedule battery NOT run (no schedule byte changed). No independent review (wording, styling, one logged field; said to him).
**Lessons.** (1) **There is no server: before proposing anything that DELAYS a send, answer "who sends it if the bidder leaves and nobody else is on?"** Claude planned a hold twice (3 Oct, 4 Oct) and he found the hole in one question. A stale pair is a nuisance; a stranded alert breaks §236's "timely alerts". Work on the CAUSE (why people cancel), not the mail. (2) **A limit stated from memory was wrong:** "pages that haven't reloaded keep the old code" — the push gate (`requiredBuilds`, armed when the admin page loads) reloads every open tab in 5 seconds. He caught it; rule 14 — read the reload code before stating what an old tab does. (3) **A suite's "nothing else changed" list is a promise about the NEXT build too.** Rolling §238 into the unpushed 187 turned the 187 suite's own "admin untouched" check red within the hour, and each build since 184 has had to extend the previous suite's changed-function list — expect it, repoint to the invariant (the function differs by exactly the tagged line), never delete. (4) **Look at the picture.** The first E-mail Log render measured "no slider" and showed a loading overlay over an empty page; the numbers were right and the screenshot proved nothing until the overlay was hidden. (5) **The bridge dropped mid-edit when he stepped away;** two retries wrote nothing; on return `grep -c` showed the edit had NOT landed, and only then was it applied. A late self-scheduled check-in then arrived after the work was done — it was read and not acted on. (6) Twins stay twins cheaply: the one new line in `_mailHistNote` is byte-identical on both pages and guards on `typeof getCurrentUser`, so the 185 suite's twin check needed no edit.
**Session close (4 Oct, about 5:10 PM).** Checklist run: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed — §237, §238 and every verbatim ruling on disk and grepped; the hold plan kept, marked withdrawn · 2 `status.mjs` exit 0 · 3 battery re-run on the pushed bytes, honesty red, isolation green · 4 uncommitted, all docs: hub `DECISIONS.md` `HANDOFF.md` `TODO.md` `START-HERE.md`, auction `BUILD-LOG.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered. **NEXT SESSION: nothing is queued on the auction.**

## 4 Oct 2026 — "Vacation Auction 4 Oct 2026 V2" — STAFF 189 / ADMIN 356 LIVE (§240): LONE UNDER REVIEW ROWS SHOW THE UNUSED BIDS THAT WOULD HAVE WON OR TIED · 20% MORE POPCORN · 188 / 355 LIVE (§239): "POPCORN PANDEMONIUM!" AT 90 OR MORE · 187 / 354 CONFIRMED IN USE.

**State.** LIVE: **staff 188 / admin 355 (`afb5f79`, pushed 4 Oct about 9:34 PM during live Phase 2, his decision)**, served twice, pushed bytes md5-equal to the gated copies (staff `be562f15…`, admin `123e5667…`); tests `729fcc9`. Staff 187 / admin 354 **confirmed by him in use, about 5:20 PM: *"confirmed new builds appear working"*** (186 / 353's step-aside: *"hasn't happened yet, so don't know"* — still unconfirmed). 188 / 355 is his request, his label, his number (100, then 90: *"more consistent"*); the go came before a plan file, so §239 and the BUILD-LOG row are the record. Not yet confirmed by him in use.
**Gates run:** suite 48/48; `--pre` on `ebe2ef4` FAILED 20 of 47 (exit 1), its 27 passes read; 12 of 12 hand mutations caught, control green; auction battery 110 suites / 4,034, exit 0 (`test-rules-emulator` reports rules not covered — no rules change); isolation 36/0; `node --check` clean on all 8 inline scripts; the real code rendered in Chromium at five counts on both pages. Schedule battery NOT run (no schedule byte changed). No independent review (said to him).
**Lessons.** (1) **Print the md5 AFTER the last edit, not the one before it.** The device md5 was read after the 100-change version; his "make it 90" came mid-turn and the staged cloud copies then disagreed with the remembered number — the pages were right, the remembered md5 was stale. (2) **A number he changes mid-build is three places:** the page, the suite's assertions, and the suite's own "undo" strings — grep the suite for the old number afterwards. (3) The 186 and 187 suites needed their "nothing else changed" lists extended again, as lesson (3) of V1 said they would. (4) A wider label is a layout change: measure the new text against the longest existing label before calling a wording change "one line".
**Later the same session (4 Oct evening → 5 Oct morning).** 188 / 355 pushed by him about 9:34 PM and verified live (`afb5f79`, served twice, a fresh clone md5-equal to the gated copies). Then §240: **staff 189 (`d0c3fc1e…`) / admin 356 (`9327b664…`) LIVE `0e2630a` — pushed by him 5 Oct about 6:23 AM, served twice (after one minute's wait for Pages), pushed bytes md5-equal to the gated copies; tests `5ca2b74`; not yet confirmed by him in use** — the unused-bids line on lone Under Review rows (both pages, ties and combined bids included, his wording), the renamed button, 20% more popcorn kernels. Gates: suite 80/80; `--pre` on `afb5f79` FAILED 53 of 79, its 26 passes read; 23 of 25 mutations caught (two equivalent in context); battery 111 / 4,114; isolation 36/0; 8 inline scripts clean; real rows rendered in Chromium; **independent review: no CRITICAL / HIGH / MEDIUM**. **Lessons.** (5) **A helper that catches its own faults hides a missing dependency in the sandbox AND on the page** — the first run returned "not a lone review" for everything because `availableNumbersFor` was not in the sandbox; the fault path now returns a different value and the row says so. (6) **Answers to a plan's questions are not a "go"** — he answered seven questions over five messages and added two requirements before saying it; asking each time cost three short turns and no rework. (7) **Take the competitors from the engine's own answer, not from a second copy of its filters** — the reviewer's 80,000-board run with floors, reuse and rounds found nothing because there was no second filter to drift. (8) He numbers his answers by the list he was FIRST shown; when a list is re-issued, keep its numbering.
**Session close (5 Oct, about 9:20 AM).** He asked for the handoff at about 6:50 AM while away from his Mac; the bridge was down, so the text was delivered as `HANDOFF-PENDING-2026-10-05.md` in the outputs column and filed when he returned. **New, filed at close:** (a) his next task — explore the leave-and-return e-mail alert, `TODO.md` §1 NEXT, his words verbatim; (b) his question *"is there any user who is favored over another user in the wheel of names spins?"* — answered NO from the code and from over 40 million spins of the page's own wheel; record `tests/docs/WHEEL-FAIRNESS-CHECK-2026-10-05.md`, standing gate `tests/test-wheel-fairness.mjs` (29 / 29; 8 of 8 deliberate tilts caught; no auction byte touched, so no build and no §92 decision). Checklist: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed — §239, §240 and every verbatim ruling on disk; the confirmation of 187 / 354 on disk; 189 / 356 not yet confirmed by him · 2 `status.mjs` exit 0 · 3 battery re-run with the new suite: 112 suites / 4,143, exit 0; isolation 36/0 · 4 uncommitted, all docs or tests: hub `DECISIONS.md` `HANDOFF.md` `START-HERE.md` `TODO.md`, auction `BUILD-LOG.md`, tests `test-wheel-fairness.mjs` `docs/WHEEL-FAIRNESS-CHECK-2026-10-05.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered. **Lessons.** (9) Two of the first five wheel runs wobbled past the 5% line; the honest move was to repeat and measure the spread (60 batches) before saying "fair", not to report the clean-looking rows. (10) **Unverified base → ship the patch:** away from the Mac the working files were ahead of GitHub by two unpushed commits, so the handoff went out as text to file, never as rebuilt copies of `TODO.md` / `HANDOFF.md`. (11) `device_commit_files` delivered an EARLIER saved copy of a file edited seconds before; the md5 on the device caught it — md5 after every transfer, both sides. **NEXT SESSION: explore the leave-and-return alert (TODO §1 NEXT).**

## 5 Oct 2026 — "Vacation Auction 5 Oct 2026 V1" — STAFF 190 FILED, NOT PUSHED (§241): THE BOARD WAITS FOR ITS DATA.

**State.** **LIVE: staff 190 (`ec66488`, pushed by him 5 Oct about 3:05 PM during live Phase 2, served twice, pushed page md5-equal to the gated copy `c1282126…`; tests `7c91f7d`, hub `c3d342e`; not yet confirmed by him in use)** / admin 356 (`0e2630a`). 190 was built on `0e2630a`; admin, mobile and rules untouched. Owner-found during live Phase 2 — users signing in saw no bids, or everyone Losing, until the page corrected itself. Cause: `render()` drew from whichever board documents had arrived (capacity not arrived = 0). 190 holds the board behind "Loading your bids…" until all ten have arrived and refuses a save until then. His go: *"1-yes.  2-now.  3-include.  go."* — the push moment is his.
**Gates run:** suite 124/124; `--pre` on `0e2630a` FAILED 111 of 119, its 8 passes read; 26 of 27 mutations caught (one equivalent in context); `un190` byte-identity with 189; browser check 241/241 three times, desktop and phone, and FAILED 188 on a site made from 189 — reproducing his report; battery 113 suites / 4,265, exit 0; isolation 36/0; 4 inline scripts clean; button sweep rows identical 189 vs 190; four other staff browser checks green, `dropdown-180-check` 571/1 on BOTH builds in the cloud browser (not this build). Independent review: one HIGH, fixed and re-reviewed clean (`tests/docs/REVIEW-190-2026-10-05.md`); M1 and L1–L5 told to him. Schedule battery NOT run (no schedule byte changed).
**Lessons.** (1) **A fake models what its author knew.** The review's HIGH — a document that does not exist sends no second snapshot after the offline stand-in — was found by reading the Firestore source, and no test could have failed for it: the sandbox's `release()` delivered a snapshot the real SDK never raises. The fake now behaves as the SDK does there; when a build leans on SDK event semantics, read the SDK. (2) **A "has it loaded" flag must name what counts as loaded** — "the callback ran" is not it (the stand-in runs the callback); "says it is from the server, or carries a document" is. (3) **Playwright's `clock.fastForward` jumps; `clock.runFor` runs.** A frame asked for by a timer was left waiting about one run in three; `runFor` made it deterministic. A flaky check is read as a finding until explained. (4) **`device_bash` refuses a command over roughly 30 KB (E2BIG).** A long new file goes: written in the cloud → `device_commit_files` into `_to_delete/xfer/` → `cat` into the repo with `device_bash` (so git sees it), md5 both ends. Do not `Write` it under the outputs folder — that puts a card in his column. (5) **The battery total can go DOWN honestly:** `test-189-356`'s byte-for-byte undo retires itself when a later build is on disk (−2); account for the count before believing or doubting it. (6) The "nothing else moved" pins of older suites are best served by an exact inverse of the new build's edits (`un190.mjs`) rather than by lengthening their lists again.
**Later the same session (5 Oct afternoon).** 190 pushed by him about 3:05 PM and verified live (`ec66488`, served twice, `origin/main:index.html` md5-equal to the gated copy). Then §242, his ask and his go: **staff 191 (`d4e9f3da…`) / admin 357 (`6db2551d…`) FILED, NOT PUSHED** — `popcornRate` × 1.2 again, one line a page. Gates: suite 34/34; `--pre` on `ec66488` FAILED 22 of 31, its 9 passes read; 12 of 12 mutations caught; `un191` byte-identity on both pages; battery 114 suites / 4,301; isolation 36/0; 8 inline scripts clean; real pages in Chromium at four counts; sweep rows identical; `board-waits-190-check` 241/241. No independent review (said to him). **Lessons.** (7) **A build that follows another the same day must not retire the earlier build's byte-identity proof — chain it:** `test-190` now puts 191's line back (`un191`) and goes on proving 190's insertions are all that separates the page from 189; 189's own proof had simply switched itself off. (8) **A loop that can throw one kernel a frame has a ceiling of the frame rate** — say so when a rate is raised toward it, and measure at 30 frames a second as well as 60. (9) A wide band on a noisy measurement passes on the old build (the 10-change loop check did, at one minute); lengthen the run until the old number is outside the band.
**Session close (5 Oct, about 4:40 PM).** **LIVE: staff 191 / admin 357 (`86c99e2`, pushed by him about 4:27 PM during live Phase 2, served twice after a minute's wait for Pages, pushed pages md5-equal to the gated copies; tests `ecd52f9`, hub `af7c4cd`).** Neither 190 nor 191 / 357 confirmed by him in use yet. Next in the queue: explore the leave-and-return e-mail alert (`TODO.md` §1 NEXT) — read and plan only. Checklist: 0 fetch (three public repos; `tests` judged from log and disk; three stranded locks moved) · 1 chat reviewed — §241, §242 and every verbatim ruling on disk; the 190 review's unbuilt notes and the `dropdown-180-check` cloud failure filed under HIS CALL · 2 `status.mjs` exit 0 · 3 battery re-run after the push: 114 suites / 4,301, exit 0, none skipped; isolation 36/0; `--pre` red on `ec66488` (191 / 357) and on `0e2630a` (190) · 4 uncommitted, all docs: hub `DECISIONS.md` `HANDOFF.md` `START-HERE.md` `TODO.md`, auction `BUILD-LOG.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered.

## 5 Oct 2026 — "Vacation Auction 5 Oct 2026 V2" — STAFF 192 FILED, NOT PUSHED (§243 · §244): "YOUR WITHDRAWN BID WOULD WIN AGAIN" · "THE LOWEST BID OF YOURS THAT WOULD ALSO WIN".

**State.** **LIVE: staff 191 / admin 357 (`86c99e2`), verified served at session start and again on his question. FILED, NOT PUSHED: staff 192 (`b624feec…`; first filed as `167528b7…`, replaced — see "The second audit" below), built on `86c99e2`; admin, mobile and rules untouched.** His idea of the morning (a notice to someone who left a week when it comes back within reach) was explored, planned and re-ruled across the evening — every ruling verbatim in DECISIONS §243 and §244, the plan as approved in `tests/docs/PLAN-LEFT-WEEK-WITHIN-REACH-2026-10-05.md`. Where it ended: WIN only; the withdrawn bid alone; within a phase only (*"bidding must remain independent in each phase"*); the existing line states the lowest bid of theirs that would also win, counting numbers live on their other weeks; neither line says where a number is. His go: *"Go"*. **The push is his — he said tonight, during live Phase 2.**
**Gates run:** suite 124/124 (6,000-auction fuzz against an oracle built on the real bid box and the real engine; 40,000 also clean); `--pre` on `86c99e2` FAILED 109 of 124, its 15 passes read; 23 mutations, 21 caught and 2 equivalent; invariance proof holds; `un192` wired into six older pins; battery ON THE MAC 115 suites / 4,431, exit 0; 4 inline scripts clean; browser check 12/12 on the real page and FAILED 6 of 12 on 191; button sweep clean. Independent review: one HIGH and two MEDIUM, fixed and re-reviewed clean (`tests/docs/REVIEW-192-2026-10-05.md`); the bid-limit case told to him. Schedule battery NOT run (no schedule byte changed).
**Lessons.** (1) **An oracle that shares the code's assumption cannot see the code's defect.** The first fuzz was green on 6,000 and 40,000 auctions and still missed the review's HIGH: code and oracle both "moved" a conflicting bid off a locked week. The cure was to stop re-deriving and ASK THE REAL BID BOX (on the conflicting week first, then on the target week). When an oracle re-implements a rule, name the rule's source and ask it instead. (2) **In the cloud, `test-333` and `test-335` fail on the untouched live build and `test-347` failed once in four runs; on the Mac all three pass.** The Mac battery is the gate for a build; say which machine a count came from. (3) **A later build breaks every older "nothing else moved" pin on the page it touches** — six this time. The `unNNN.mjs` pattern (an exact, proven undo, wired in front of each old comparison) is the standing answer; build it from the same pairs as the edits and assert the undo gives back the baseline before using it. (4) **He re-ruled the design five times in one evening, each time by quoting a sentence back.** A quoted line with no instruction is a question or a correction, never a go: ask what it means before touching a file (three of his quotes meant something other than the first reading).
**After his push:** fetch `versions.json` twice (wait a minute — Pages lagged twice today), md5 `origin/main:index.html` against `167528b7461142e87e3fc2f4cff75984` [CORRECTED 8 Oct 2026 (§253): superseded the next day — re-filed as `b624feec…`, and what went live is `9c70defb…`, `c8887e7`], then START-HERE's LIVE line, the BUILD-LOG row's commit, TODO, and `node status.mjs`. Not yet confirmed by him in use: 190, 191 / 357.
**The second audit (5–6 Oct, his question: *"Does this maybe deserve 1 more adversarial audit since items were found?"*).** Yes, and it did: a blind second agent said NO to the first filing — (H1) the existing line was going to different people than in 191, because the wider number list had leaked from NAMING the bid into DECIDING whether to send (and Claude had told him "less often, never more": wrong); (H2) a Confirm-Remove box left open across a phase close let a previous phase's bid produce the new line, then a narrower second-device route. Fixed inside the alert only: a `wide` flag asked for in one place; a third lock (the last thing they did on that week before the removal was to place that very bid). **Re-filed `b624feec…`.** Final gates: suite 140/140, `--pre` FAILED 125, Mac battery 115 / 4,448, straddle browser check 11/11 through the real ✕ on three pages, 120,000-case differential against 191 with 0 lines lost or gained; three re-audits, last verdict *safe to push — yes*. **Lessons.** (5) **"Since items were found" is the right trigger for another audit: a review that finds a HIGH has shown the build's own gates are blind somewhere, and the same reviewer re-checking its own fix shares its blind spots.** A second, BLIND auditor with a different method (a differential against the live build; the real page end to end) found two HIGH the first could not. (6) **When a ruling says "X does not change", the test for it is a DIFFERENTIAL against the live build, not an oracle** — an oracle is rebuilt by the person who changed the code. (7) **A lock that reads what the page stores is only as good as every path that stores it**: hand-staged floors and log entries hid the stale-box route; one check must take the state through the real controls. (8) Raised to him, not built: the stale Confirm-Remove box itself (TODO §1, HIS CALL).
**Session close (6 Oct, about 1 AM; context 601,441).** After reading why H1 mattered he ruled a narrowing (*"#2"*, §244): no "still projected to WIN" line when a bid the person holds would already have won — then asked for a new session (*"this has gotten long"*). **The Mac holds 192 `b624feec…` WITHOUT it: not to be pushed until the narrowing is built, gated and audited.** The edit (two lines in `_lwOpenings`) and the order of work are in the plan file §11; it was drafted in the cloud, proof-checked, NOT suite-tested, NOT filed. Also open, his call: the stale Confirm-Remove box (TODO §1). Not confirmed by him in use: 190, 191 / 357. Checklist: 0 fetch — NOT re-run at the close (HEADs read unchanged and unpushed at 12:30 AM) · 1 chat reviewed — every ruling of the session is verbatim in §243 / §244 · 2 `status.mjs` exit 0 · 3 commit messages delivered · 4 START-HERE delivered. Schedule: untouched all session.

## 6 Oct 2026 — "Vacation Auction 6 Oct 2026 V1" — STAFF 193 LIVE (§245): A WINNING BID CANNOT BE LOWERED BELOW THE WEAKEST WINNING BID · STAFF 192 WENT LIVE WITH THE §244 NARROWING BEFORE ITS AUDIT · §246 COMMIT LINES IN THE CHAT.

**State.** **LIVE: staff 193 / admin 357 — staff `1173efd` (`a3720e21…`), pushed about 8:45 PM during live Phase 2 with bidding LOCKED by him, served twice, pushed page md5-identical to the gated copy; admin `86c99e2`.** At the close: auction `26650e2` and schedule `0a61585` clean and in sync; tests `67c4671` plus this hand-over's commit (`apply193.py`); hub `9176970` plus this hand-over's commit. Next auction honesty baseline: `1173efd` staff, `86c99e2` admin. Not confirmed by him in use: 190, 191 / 357, 192, 193.
**The day, in order.** (1) Opening report repeated START-HERE's "192 … the push is his"; the previous entry's last line said do not push (the §244 narrowing was ruled but not built). He caught it: *"192 needs an update before pushing. can you see that?"* (2) On his *"go"* the narrowing (two lines in `_lwOpenings`) was edited INTO THE REPO FOLDER; he pushed at 11:31 AM (`c8887e7`, `9c70defb…`) believing it was the original — so 192 went live with the narrowing before its audit. Measured afterwards on the live bytes: 120,000-case differential against the audited `b624feec…` — 359 lines withheld, all the rule, gained 0. His ruling on the rest: *"file this to do later"* (TODO §1). (3) He raised double e-mail sends and the Popcornometer to 12 hours, then: *"wait on 2/3/4 until we address this bigger issue"* (both explored read-only, in TODO §1, unruled). (4) About 6 PM he LOCKED all bidding: winners were lowering after losers left. The rule was settled in the chat over about an hour — every ruling verbatim in DECISIONS §245 — and built as staff 193 on *"Go. I will amphetamine on."*; filed about 8:40 PM, pushed 8:45 PM. (5) §246: commit lines pasted in the chat, one copy-box per repo, every time.
**Gates for 193** are in its BUILD-LOG row; the blind audit is `tests/docs/REVIEW-193-2026-10-06.md` (safe to push; M1 and M2 told to him, HIS CALL, not built). **[ADDED 8 Oct 2026 (§253): this entry was written before §247 — the same evening START-HERE pasted in the chat was tried once and WITHDRAWN (*"that starthere within the chat is terrible, don't do that"*); outputs column only.]**
**Lessons.** (1) **Build an auction page OUTSIDE the folder he pushes from** — now START-HERE rule 4. 193 was built by `tests/apply193.py` (exact once-only replacements from the live page; it also GENERATES `un193.mjs` from the same pairs, so the undo cannot drift from the build) in `_to_delete/wip193/`, and written into the repo only after the gates. (2) **Read the last HANDOFF entry to its last line at session start** — now START-HERE §4 step 1. (3) **A mutation run in which every mutant shows the SAME number of reds has tested nothing.** All 34 first "died" with exactly one red — the suite's undo guard no longer matched the mutated page. Read the red, not the count (rule 18); the suite takes its unmutated side from `S0_PAGE` in mutation runs. A second false alarm the same way: a shortened fuzz (`FUZZ_N`) trips the suite's own exercise thresholds — run mutants at the default size. (4) **A later build that changes what a user may DO breaks the behaviour suites of earlier builds, not just their byte pins**: the 182 / 192 alert suites and their three browser checks now take 193 out first with `un193` (a miss is a failed gate) and go on pinning their own build; `un192` calls `un193` first. The alerts UNDER the rule are pinned by the 193 suite. (5) **A battery can be run against an unfiled page**: a shadow root (`REPO_ROOT` / `GH_ROOT` at a folder of symlinks with only `index.html` and `versions.json` replaced) ran 115 of 116 green; the one red was `test-187`'s `git status` check seeing the symlinks. The real-tree battery after writing the page in is still the gate. (6) **Background processes do not survive between `device_bash` calls** — a `nohup … &` is killed when the call returns; run long jobs in the foreground in batches under 180 s. (7) **The auditor's browser scenarios were kept as the build's browser check** (`sweep/weakest-winning-193-check.mjs`) after making every assertion unconditional so it FAILS on 192 (as handed over, its 193-only assertions were skipped on 192 — green on the old build). (8) **A quoted sentence with no instruction was, twice more, a correction** (*"While a losing bid is still on the week, the rule changes nothing…"* → *"I don't think that's true"* → *"I think anyone can place a losing bid at any time"*): re-check the claim against the code before answering, then ask what is meant.
**For the next session — his order: *"I want the next agent to review what we did"*, then the items he raised at the top of this chat.** The brief is at the top of `TODO.md` §1.
**Session close (6 Oct, about 9 PM; context 592,773).** Checklist: 0 fetch run on the three public repos (tests judged from log and disk), three stranded `maintenance.lock` moved to `_to_delete/` · 1 chat reviewed — rulings in §244 (6 Oct entry), §245, §246; his raised items in TODO §1 · 2 `status.mjs` exit 0 after the archive pass (two September entries moved by `archive.mjs`) · 3 code proven on the filed bytes = the live bytes (md5) · 4 every repo accounted for · 5 commit lines in the chat (§246) and START-HERE delivered. Schedule: untouched all session.

## 6–7 Oct 2026 — "Vacation Auction 6 Oct 2026 V2" — THE OWNER-ORDERED REVIEW OF THE 6 OCT WORK · STAFF 194 FILED, NOT PUSHED (§248): ON A COMPETITION WEEK A BID MAY BE WEAKENED ONLY IF IT WOULD STILL WIN.

**State.** **LIVE: staff 194 / admin 357 — staff `e154617` (`857cf83d…`), pushed 7 Oct 2026 about 7:48 AM during live Phase 2, served twice, pushed page md5-identical to the gated copy (tests `db6042d`, hub `9f04f7d`).** Next auction honesty baseline: `e154617` staff, `86c99e2` admin. **RULED and NOT built: §249 — no weakening at all on a competition week (staff 195, to be planned in a new session; wordings proposed, not ruled).** Schedule untouched.
**The night, in order.** (1) Re-grounding; his paste arrived whole. Before anything he asked whether 193 lets a winner on his live Week 14 board drop from a 7 to a 9 — yes (a weaker bid that would not win was allowed); *"perfect"*. (2) On his *"go"* the review ran to his audit standard — four lanes, a red team, an independent verifier: `tests/docs/REVIEW-6OCT-WORK-2026-10-06.md`. The code of 193 does what was built; the §244 narrowing is safe (its owed audit and mutations DONE); **one HIGH in the rule's reach** — a two-move way to a lowered winning bid while a weaker bid is still on the week. (3) His answer was his own, and better than Claude's fix (remember the strongest bid): *"I would prefer to block dropping to a 9."* Claude: it also has to cover a re-bid after removing, and a drop into Under Review; he first kept Under Review, weighed option B, found it *"too complicated"*, and ruled A — §248, every sentence verbatim there. (4) *"Go"* about 11:30 PM; the Mac link dropped at that moment, so 194 was built and gated in the cloud and written in when the link returned (bundle, `unzip -p`, 12 files md5-verified; the 193 page saved first as `_to_delete/xfer/index-193-a3720e21.html`). (5) His idea for the NEXT session: track "bailing" in the Fair Play report (TODO §1, his words and the suggestions).
**Lessons.** (1) **A rule that judges a change against the CURRENT state can be walked around in two moves** — ask of every "may not be made weaker / later / larger" rule what it remembers. 193's own audit tested single steps only; the fuzz now WALKS (any offered move or a removal, then a move refused at the start). (2) **A walk's model of the save path must be read off the code, not assumed**: the first walk "found" a route by removal that was the model forgetting that a removal stamps the floor (`removeSelection` → `saveBestBid`). Read the red before believing it. (3) **In the browser sandbox the seed already uses numbers**: a bid whose number the person holds on another seed week is silently invalid to the engine and shows as Losing — assert the BOARD on the week card before asserting the rule (the two-slot case was wrong twice for this). (4) **`un<N>` must be safe to run twice** once `un<N-1>` calls it (un193 → un194): an edit already taken out is left alone, anything else is a miss. (5) **A build that makes a page's own advice false is not finished at the gates**: the blind audit found the Remove box still offering what 194 refuses (M2). Grep the page for every sentence that describes the thing a rule changes. (6) `test-334`'s INVARIANCE block has compared against 333/171 with four assertions that no longer hold on ANY recent build; it only runs when a baseline is supplied, so nobody sees it — a decayed gate, filed here, not fixed.
**The morning of 7 Oct.** He took up the all-grey box: the bid box now says why and the way back (§248 addendum) — added to 194 BEFORE any push (one build, one push; *"Please don't push yet"* said in the same turn as the first edit), re-gated, audited a second time, re-filed about 7:45 AM as `857cf83d…`. Two more lessons: (7) **a stress test's own statement of WHEN something should show is a claim too** — its first version expected the note in a box the rule refuses nothing in, and the page was right; (8) **an audit's surviving mutant is closed by a test that makes the thing happen** (the paint made to throw), not by a text pin.
**For the next session.** After his push: the three checks on START-HERE's FILED line. His two calls from the audit (TODO §1: M1 in-flight; M2 the Remove box wording, proposed and not taken up). Then, in his order: bail tracking (plan first), the double e-mail sends, the Popcornometer to 12 hours. The ten paperwork corrections listed in REVIEW-6OCT-WORK are still NOT made.
**After the push (7 Oct, 7:48–8:30 AM): the "week with room left" gap, §249.** He ruled "no weakening at all", saw within ten minutes that it ends the come-down he wants (*"this is a problem"*), and then gave the better rule himself: *"Why can't each person lower to a 5 and a new person would have to come in with a 5?"* — an ENTRY LEVEL. Ruled in full the same half-hour; staff 195, new session (TODO §1, item 1). Lesson (9): **when he picks one of Claude's options in a few words, restate what it costs him in a concrete board BEFORE filing it as settled** — the cost line was in the options, but only the table made him see it; the ruling was filed, pushed past and withdrawn in ten minutes.
**Second session close (7 Oct, about 8:35 AM; context 622,947).** Checklist: 0 fetch on the three public repos, locks moved · 1 chat reviewed — §248 addendum, §249 (every turn of it), the bail idea and its answers in TODO §1 · 2 `status.mjs` exit 0; TODO §1's NEXT block rewritten for the next session · 3 live 194 = the gated bytes (md5), served twice · 4 every repo accounted for (two docs commits handed over) · 5 commit lines in the chat, START-HERE delivered.
**First session close (7 Oct, about 1:15 AM; context reading in the chat).** Checklist: 0 fetch at the start (three public repos; `tests` judged from log and disk), locks moved · 1 chat reviewed — rulings in §248; his idea and its answers in TODO §1 · 2 `status.mjs` exit 0 after the archive pass (two September entries moved by `archive.mjs`) · 3 code proven on the filed bytes (md5 both sides, Mac battery 117 / 4,562) · 4 every repo accounted for · 5 commit lines in the chat (§246), START-HERE delivered to the outputs column. He was asleep from about midnight (*"done for tonight… will pick up in the morning"*, *"amphetamine on"*); everything after that ran unattended on his standing go.

## 7 Oct 2026 — "Vacation Auction 7 Oct 2026 V1" — STAFF 195 LIVE (§249): THE ENTRY LEVEL ON A COMPETITION WEEK.

**State.** **LIVE: staff 195 / admin 357 — staff `bff8c42` (`63afb2cc…`), pushed by him 7 Oct 2026 about 3:10 PM during live Phase 2, served twice, pushed page md5-identical to the gated copy (tests `b506fc8`, hub `310629e`).** Next auction honesty baseline: `bff8c42` staff, `86c99e2` admin. Schedule untouched.
**The day, in order.** (1) Re-grounding; his paste arrived whole; START-HERE delivered. (2) *"go"* on the exploration → ONE plan with four open points; he ruled all four (keeping his own ruling on the emptied week against Claude's recommendation, twice), the wording and the greyed numbers, then *"go"* on the build. (3) Built outside the repo (`apply195.py`), gated, first blind audit: the rule right, the Remove box now false. (4) His three rulings of the afternoon — the returning winner (*"same bid only or stronger"*), each Phase-4 round its own record (*"I want that done now"*), the Remove-box warning — built into the same unfiled 195. (5) Second blind audit: a win could be banked on a quiet week → narrowed (a win is recorded only when the bid leaves a competition week). (6) Third pass: safe to deploy; filed.
**Lessons.** (1) **A record that opens a door must be asked what it is a record OF.** "Was winning when it left" was built as "was projected WIN at removal" — true of a lone bid on an empty week, which is not what he meant. The audit banked it in three moves. Ask of every flag written at one moment and read at another: who can cause it to be written, cheaply, with nothing at stake? (2) **A rule that changes what comes back must be read against every sentence that says what comes back** (lesson 5 of the last entry, paid for again: the Remove box). Grep the page for the advice BEFORE the first audit, not after it. (3) **When he asks "are you sure that's a problem?", he has usually seen the simpler rule** — the returning winner was his, and it replaced a warning-only fix. Answer the question on the board he named before defending the build. (4) **A liveness counter is not an assertion**: "23 bids were offered" stayed green on the old build; tie every "it really ran" count to the independent statement, or it proves only that the loop turned. (5) **A fuzz run at a smaller N can fail a liveness assertion and look like a killed mutant** — a kill counts only when a DIRECTED assertion is among the reds (two false kills caught this way). (6) **`pkill -f <name>` from the bridge kills the shell that typed it** (START-HERE rule 8's `pgrep` trap, the other direction); background jobs do not outlive a bridge call — batch long runs inside the 180 s limit. (7) **Claude told him the greyed numbers would newly reveal the level; the week card already shows every bid.** A claim about what the page shows is a claim about code: it was not re-read before it was made (rule 14).
**For the next session.** His call on R1 (TODO §1). Then, in his order, what TODO §1's NEXT block lists after item 1.
**Session close (7 Oct, about 3:20 PM; context reading in the chat).** Checklist: 0 fetch on the two public repos touched, locks moved · 1 chat reviewed — every ruling of the day is in §249 (verbatim), R1 and the test-clock note in TODO §1 · 2 `status.mjs` exit 0 · 3 live 195 = the gated bytes (md5 of `origin/main:index.html`), served twice · 4 every repo accounted for (two docs commits handed over: auction BUILD-LOG, hub) · 5 commit lines in the chat (§246), START-HERE delivered to the outputs column.
**AFTER THE CLOSE (7 Oct, 4:56–5:30 PM, from his phone; the Mac link was down).** He read a live Week 31 card and asked three questions about the rule as it now runs (TODO §1, the FIRST item, has them and the answers), then gave the next session its first item: **label competition weeks as such, and join the name to its definition in Rules & Reminders** — plan first; then the other pending items in the order already set. Nothing was read from the Mac for those answers: they rest on the page as read that morning and on his statement that Week 31 is a competition week. Filed by `handoff-patch-7oct.py` when the link returned (about 6 PM), and the page's wording then re-read and confirmed. Closing checklist re-run: `status.mjs` exit 0, repos accounted for (two docs commits handed over), commit lines in the chat, START-HERE delivered.

## 7 Oct 2026 — "Vacation Auction 7 Oct 2026 V2" — STAFF 196 / ADMIN 358 LIVE (§250 · §251 · §252): A COMPETITION MEANS "AT THE SAME TIME"; THE LABEL; 12 HOURS.

**State.** **LIVE: staff 196 / admin 358 — `37d200c`, pushed by him about 9:45 PM during live Phase 2, served twice, the pushed pages md5-identical to the gated copies `aee2a457…` / `91b02a81…` (tests `84e1ee6`, hub `d258b94` · `6c9e263`, auction docs `472096f`).** Next auction honesty baseline: `37d200c`, both pages. Schedule untouched.
**The day, in order.** (1) Re-grounding; START-HERE delivered. (2) His *"Go"* on the label exploration, widened by him to the Popcornometer + changes chip on 12 hours and a correctness pass on Rules & Reminders (§250); one plan. (3) His placement (top right of the card), then his question *"is this only if it's more people all at the same time?"* → the definition changed (§251: same time; *"I want A"*); his wording of the definition line; his six answers; then *"Dr. A must come back with the same rules as anyone else"* withdrew 195's returning-winner exception — shown that it contradicted his morning ruling, he chose *"tonights rule.  go."* (4) Built outside the repo (`apply196.py`), gated, three blind audits; two rounds of fixes inside `_wwContested` only. (5) He pushed; then §252: the forged-log rules build is LATER (*"when phase 3 is complete maybe"*), and the NEXT build removes the admin's "Clear Change Log".
**Lessons.** (1) **When a test that read several records is replaced by one that reads fewer, list what each old record was covering first.** 196's first filing replayed the change log alone; the page itself ignores a failed log write, and the floors 195 also read were what covered it. The first audit found it (one lost write switched the rule off). (2) **A "never stricter than X" claim needs a fuzz that reaches the boundaries** — the suite's own times all sat near 1000, so `since` was never ahead of the clock and nothing was `-Infinity`; the third audit found an ordering slip that was stricter than 195. (3) **A fixture must keep the records the page keeps**: floors written for entries before the window made the Phase-4 tests wrong until the fixture cleared them as Start Round does. (4) **Run a failing browser check on the OLD page with the same fixture before blaming the build** — the 340px wrap in `dropdown-180-check` failed on 195 too (clock-dependent). (5) **An undo chain needs a sentinel the build alone owns**: four 196 edits put 194's text back, so "none of 196's texts present" was true again after un195 ran — `un196` keys on `function _wwLabelOn(` instead. (6) The time stated to him at filing ("about 11 PM") was wrong — it was about 9 PM; corrected in the BUILD-LOG row. Read the clock (`TZ=America/Los_Angeles date`) before writing a time.
**For the next session.** TODO §1's NEXT BUILD: remove the admin's "Clear Change Log" (explore, one plan, his go). Then, in his order, what TODO §1 lists after it.
**Session close (7 Oct, about 10 PM).** Checklist: 0 fetch on the three public repos, locks moved · 1 chat reviewed — §250, §251 (with every sub-ruling verbatim), §252, the TODO items · 2 `status.mjs` exit 0 · 3 battery 119 suites / 4,809 cloud and Mac, honesty FAILED 60 on `bff8c42` / `86c99e2`, isolation 36/36, browser 43/43 · 4 every repo accounted for (one docs commit handed over: hub); `_to_delete/` reported · 5 commit line in the chat, START-HERE delivered.

## 7–8 Oct 2026 — "Vacation Auction 7 Oct 2026 V3" — STAFF 197 / ADMIN 359 FILED, NOT PUSHED (§252 – §254): CLEAR LOG GONE, "RETRY LOG RESET", THE "MAY BE A REPEAT" RE-SEND, THE BID-BOX NOTE · NEXT: BUILD 198, A COMPETITION WEEK WITH NO EXCEPTION.

**State.** LIVE: staff 196 / admin 358 (`37d200c`), served twice at the session's start. **FILED, NOT PUSHED: staff 197 `793a9f70…` / admin 359 `870f770b…`** (the pages, `versions.json`, the BUILD-LOG row in the auction repo; suites, undo, browser check and records in tests; §253 · §254 and this entry in the hub). The three docs commits of the morning are folded into the same three pushes.
**The day, in order.** (1) Opened 7 Oct 10 PM: re-grounding, START-HERE delivered. (2) 8 Oct morning: two ideas filed (a winner may cancel on a competition week only when the number is needed on another week; the "harvested number" alert); §253 — bail tracking WAITS, the mid-way question declined, the ten paperwork statements corrected, the wording of 194–196 checked (accurate; three notes), Clear Log and the double sends explored and planned. (3) His go with the Mac off: 197 / 359 built in the cloud from a clone of the live pages, own suites, three blind audits. (4) Midday: his worry about everyone leaving a competition week and returning lower → the last-person edit WITHDRAWN, "Retry log reset" ruled, build 198 ruled (§254). (5) Rebuilt, re-audited (final bytes + a verifier), the older suites repointed, battery and browser checks, filed.
**Lessons.** (1) **A scratch root for the battery needs the repo's git**: a copy without `.git` turned 20 suites red on "baseline unreadable"; a one-line `.git` file (`gitdir: <real repo>/.git`) in the scratch copy fixed it and let the whole battery run on unfiled pages (`_to_delete/wip197/root`). (2) **A mutation run that cannot take the build apart "catches" everything**: with no path to the live page, every staff mutant died on "197's edits can't be taken out", not on its own assertion — the tally looked perfect and meant nothing until the live page was passed in (`mutate197.mjs <built> <live index.html>`). Read WHICH assertion killed each mutant. (3) **A fuzz's clock can walk into the future**: the engine suite stamped log entries a second apart across 1,500 histories, ran past "now + 10 minutes", and the page (rightly) counted those entries as always there — the differential was exercising the strict fallback, not the replay. Reset the clock per history. (4) **A guard copied from the page's own state is not a guard at the moment of action** — the retry first re-checked `phasesData` (this page's mirror); the audit's reproduction was a stale page beside a restore on another device. For anything destructive: ask the SERVER, and use the feed-health gate the neighbouring actions use. (5) **When a rule edit and a wording edit ride together, withdraw them together**: "nobody else" belonged to the last-person edit and came out with it; the rule line's last sentence is 196's until 198.
**For the next session.** His push of 197 / 359 (then the after-push steps in TODO §1's ⏳ line); his two calls (§254 (a) · (b)); then BUILD 198 — explore, ONE plan, his go.
