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
- **`START-HERE.md`** — the LIVE line (REPLACE its builds, commits and baseline — never append history, §281), the `FILED, NOT YET PUSHED:` line, and LAST REVISED,
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

### 3a · Keep the test site current — owner ruling 13 Oct 2026 (DECISIONS §271: *"keep current always"*)

**WHEN A BUILD IS FILED — before he pushes, not at the close (owner, 14 Oct 2026, §278: *"If they don't, the test site is useless."*)** — and again before closing if either auction page changed on disk since — regenerate and republish the private test site, to the SAME link, never a new one:
- in the cloud, with the repos laid out as for the battery: `GH_ROOT=<root> node tests/testsite/testsite-check.mjs` — it rebuilds `tests/testsite/out/` from the pages on disk (refusing a page mid-build or one where a live address would survive) and drives it in Chromium; it must say **31/31 passed, exit 0**;
- publish `tests/testsite/out/index.html` with the Artifact tool: `url` https://claude.ai/artifact/RqnGwmqua7PW1qhT9aVtnG, `root` `tests/testsite/out`, `files` = every path in `tests/testsite/out-files.json`;
- **record it:** `node tests/testsite/mark-published.mjs` (cloud, from `out/site/built.json`), or on the Mac `node tests/testsite/mark-published.mjs '<the published built.json text>'` — it writes the TRACKED `tests/testsite/published.json` (commit it with the tests repo). **`status.mjs` exits 8 while the md5 of either page on disk differs from what the test site was made from**, so a filed or pushed build the test site does not carry fails the gate (§278);
- say in the chat which builds it now carries (its Home tab names them). If no page changed: say "test site — no page changed, not republished".
The test site never touches the auction; `out/` is never committed. The design and the reasons: `tests/docs/PLAN-TEST-SITE-2026-10-13.md`.

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

**⛔ `START-HERE.md` NO LONGER GOES TO THE OUTPUTS COLUMN (§280, 15 Oct 2026 — his *"yes stop that"*, replacing §212's order of 17 / 22 Sep).** Instead, **the short start message from `SESSION-START.md` goes IN THE CHAT, in its own copy-box, right after the commit lines** — at the hand-over ONLY, never with mid-session commit lines (owner, narrowed 12:01 PM: *"next session start message should only be displayed when handoff routine is performed."*; first: *"always present the new, shortened start here message with the commit lines within the chat so it's easy to copy and start the next session.  Ensure that's remembered."*). Copy it from the file, never retyped. **NEVER paste START-HERE itself into the chat (DECISIONS §247, tried and WITHDRAWN 6 Oct 2026).**

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

## 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V3" — STAFF 209 / ADMIN 372 LIVE (§268): PHASE 4 COUNTS LEAVE AN ANNOUNCED ROUND'S RESULT OUT · THE AUCTION'S PENDING LIST TRIAGED (§269) · THE FORGED-LOG RULES BUILD DECLINED (§252).

**State.** LIVE: staff 209 / admin 372 `7273296` (tests `575fc6b`, hub `6dc2c5b` + the triage docs commit), served twice, pushed pages md5-identical to the gated copies `96f5418f…` / `0ed2ab15…`. Next auction honesty baseline `7273296`. Phase 3 closed; Phase 4 next year. Nothing filed and unpushed but the hub's docs.
**The session, in order.** (1) 8:10 PM re-grounding at 180,157; live 208 / 371 twice. (2) The one current item, F1 (forged change-log entries, a rules build), judged low practical risk — DECLINED (§252). (3) He asked for the whole pending list; Claude recommended what Phase 4 touches; class hunt by one independent agent: nothing that decides anything is wrong, O-G already gone from screen, three real defects; ONE plan. (4) His rulings 8:52 / 8:57 PM: fix (not remove) Struggling Users, the simulator (O-F), the staff chip — built in a scratch copy by `apply209.py`; a blind review (3,000-board fuzz, safe to deploy; one LOW fixed, two LOW accepted by him 9:40 PM); pushed 9:41 PM. (5) §269: his goal to resolve the whole list; triage of groups 1–3 the same evening — the schedule and CRNA stay parked; out of it: the SMALL-FIX BATCH, the timer run-out piece, the TEST SITE, in that order (TODO §1). Owner-found on the way: the changes-list drop-down scroll; reports on his phone (Chrome, from a home-screen icon) with no way back.
**Lessons.** (1) **READ THE HONESTY RUN'S PASSES** (rule 18) paid again: two of 209's assertions passed on the old build by vacancy (an empty simulator result "never on the won week"; an un-chain that is a no-op on the old page) — both now demand the evidence exists. (2) **THE STALE `/tmp` TRAP, AGAIN, in a new form:** a `node status.mjs > /tmp/st.out` redirect failed (Permission denied) and `tail /tmp/st.out` showed an OLD run's output as if it were this one — write gate output into `_to_delete/`, never `/tmp`, and read the exit code. (3) **A MUTATION RUN ON THE MAC NEEDS A FRESH FOLDER PER MUTANT** — the bridge cannot delete, so a reused folder silently fails to reset. (4) **"Exactly the same test" carries that test's edges with it:** the shared round test also left out the CURRENT round's announced denial in the gap before Start Round — the review found it; he accepted it.
**Next session.** The SMALL-FIX BATCH (TODO §1 and §269): explore, ONE plan, his go. Read §269 whole first.
**Session close** about 10:15 PM at 486,149; hub docs to push; `_to_delete/` holds this session's scratch (`wip209/`) — his to empty.

## 12–13 Oct 2026 — "Vacation Auction 12 Oct 2026 V4" — STAFF 210 / ADMIN 373 AND STAFF 211 LIVE (§269): THE SMALL-FIX BATCH · THE CHANGE LISTS REDONE · "🔒 LOCKED".

**State.** LIVE: staff 211 `ebb8438` / admin 373 `3699217` (tests `64337ba`, hub `9c38876` + the closing docs commit), each served twice, pushed bytes md5-identical to the gated copies. Next auction honesty baseline `ebb8438` (staff), `3699217` (admin). Phase 3 closed; Phase 4 next year. He looked at it all on his phone and computer: *"all looks good to me"* (9:19 AM).
**The session, in order.** (1) 10:15 PM re-grounding at 199,948; START-HERE delivered. (2) The small-fix batch explored by four read-only lanes; ONE plan (`tests/docs/PLAN-210-373-SMALL-FIX-BATCH-2026-10-12.md`); found already done: item 12 (admin 350), item 24 (208), two of three T-10 lines (181 / 344). His answers 10:29 PM and go. (3) Built by `apply210.py` in a cloud scratch copy; phone test page sent before filing (rule 19); gates — the new browser check caught a real defect (the sheet's blur override lost to #pcWidget's INLINE style); 29 old suites needed the un-chain (`un210.mjs`) + 13 repoints; blind review SAFE. Filed 6:10 AM on his phone-test approval; pushed 6:20 AM. (4) OWNER-FOUND on the live 210 (6:22 AM): the phone sheet blended in when empty, the ✕ was tiny, the computer list vanished while the cursor was in it (pre-existing `onmouseleave` + a 6 px gap). Redesigned on test pages v2 → v3 (his "can it not move up?" → a box in the MIDDLE of the phone screen; *"perfect now"*). Built as staff 211 with "🔒 Locked" on the locked card (heading kept, his word), the compact Close and sign-out tidying (the review's LOWs, at his word), and `_npFit` (a verifier found the computer list ran off the LEFT edge with the timer off — pre-existing; fixed under his "re-think the box logic" brief and told to him). Three review passes SAFE; pushed 8:42 AM.
**Lessons.** (1) **A TEST PAGE'S MOCK MUST CARRY THE REAL PAGE'S INLINE STYLES** — 210's phone test page used a stylesheet blur where the live box sets it inline, so the page looked right while the real override failed; the gate caught it. (2) **TEST THE EMPTY STATE** — 210's sheet was tried only with a full list; empty, it blended into the page. Every list or panel build now looks at empty and full. (3) **A STOPPED AGENT CAN STILL LEAVE FILES** — two gate runs he stopped had already written drafts (06:38 / 06:43); the next run found and reviewed them rather than trusting them. (4) Known flake: `test-347` "OFF is identical" can straddle a minute boundary; a re-run passes.
**Next session.** The timer run-out piece (TODO §1 ▶ NEXT): explore, ONE plan, his go; then the test site.
**Session close** about 9:25 AM at 512,768; docs to push (auction BUILD-LOG, hub); `_to_delete/` holds this session's transfer bundles (`xfer210/`, `xfer211/`) and moved locks — his to empty.

## 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V1" — ADMIN 374 LIVE (§270): A RUN-OUT CLOSES BIDDING ON THE SERVER · THE TEST SITE PLANNED (§271)

**State.** LIVE: staff 211 `ebb8438` / admin 374 `de3fc98` (tests `887c1c5`, hub `675fa4e` + this close's docs), served twice, the pushed admin md5-identical to the gated `485bdb2d…`. Next auction honesty baseline `de3fc98` (admin), `ebb8438` (staff).
**The session, in order.** (1) 9:50 AM re-grounding at 169,470; START-HERE delivered (the attached copy was an OLDER draft `4e636dab…` than disk `cee9138b…` — disk used, rule 13). (2) The run-out piece explored read-only; ONE plan (`tests/docs/PLAN-374-RUNOUT-SETS-CLOSED-FLAG-2026-10-13.md`); his answers and go 11:23 AM (§270). (3) Rules & Reminders drawn like the change lists — raised by him, advised as its own build, then DECLINED (*"forget it.  the current drop down works well."*). (4) Admin 374 built by `apply374.py` in a cloud scratch copy; `un374` chained ahead of `un211`; four suites repointed; new `test-374` 56/56, FAILS on 373; cloud and Mac batteries 140 / 6,503 green, 0 skipped; blind review SAFE, its three suite gaps closed before filing; filed ~12:30 PM, pushed ~12:38 PM. (5) The test site explored read-only; ONE plan (`tests/docs/PLAN-TEST-SITE-2026-10-13.md`); his four answers 12:49 PM (§271). Not built.
**Lessons.** (1) **SAME-ORIGIN HOSTING SHARES BROWSER STORAGE WITH THE LIVE SITE** — every site on `anesthesia-kp.github.io` is one origin; both real pages read `auctionConfigV1` at start. Any copy of the pages served there could change what the live page shows in that browser. Test copies go on their own origin (a published page). (2) **A SHELL EXIT CODE IS NOT THE SCRIPT'S** — `node status.mjs > /tmp/st.txt` "exited 1" because the redirect was refused on the device, so status.mjs never ran; check the redirect target is writable (use `$HOME/…` on the device) before reading the number. (3) Rule 18 paid again: one new assertion passed on 373 through `[].every()` on an empty list — found by reading the honesty run's passes, closed before filing.
**Next session.** The test site build (TODO §1 ▶ NEXT): his go first; step 1 is the probe page on his phone and computer.
**Session close** about 1:20 PM at 411,050; docs to push (hub, tests); `_to_delete/` holds this session's transfer bundle (`xfer374/`) and moved locks — his to empty.

## 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V2" — THE TEST SITE BUILT AND PUBLISHED (§271) · PHASE 3 RESULTS SENT TWICE, FOUND AND PLANNED (§272)

**State.** LIVE unchanged: staff 211 `ebb8438` / admin 374 `de3fc98`, served twice at the opening. Nothing the auction serves changed this session. Next auction honesty baseline still `de3fc98` (admin), `ebb8438` (staff).
**The session, in order.** (1) 1:20 PM re-grounding at 190,544; START-HERE delivered (the attached copy was older than disk — disk used). (2) His go on the test site, 1:33 PM; the probe page published and run on both his devices (desktop app 13/13; iPhone app 12/13 — a new tab is refused there, as expected). (3) The test site built in `tests/testsite/` and `tests/test-testsite-make.mjs`, published privately (link in HANDOFF checklist step 3a and the plan §10); browser check 31/31 and red under six deliberate breaks; Mac battery 141 / 6,540, exit 0. Files unpacked from `_to_delete/xfer-testsite/` and md5-verified. (4) 6:19 PM his ask to remove the Messaging Users card's extra "Send Phase Results" → read: same function as the phase card's; then his two E-mail Log exports showed every Phase 3 results address e-mailed twice — two overlapping sends; cause read in the code and a five-part plan filed (§272, TODO top). Not built.
**Lessons.** (1) **AN E-MAIL LOG EXPORT ANSWERS WHAT THE CODE CANNOT** — the reading "the extra button caused it" was wrong twice over; the timestamps showed two overlapping sends, which no reading of the buttons could. Ask for the log early. (2) **A bare `fake/x.js` in an `import` is not a path** — the staff copy failed to load until it was `./fake/x.js`; the browser check found it. (3) **A guard that expires is only as good as the longest run it guards** — the results claim lasts 2 minutes; a sleeping phone made a send last 53.
**Next session.** §272 first (owner-found): put the plan to him as ONE plan, his go, build, full gate + independent review. Then the test site waits on his look.
**Session close** about 8:30 PM at about 465,000; his pushes owed: tests (`Tests: test site`) and hub (`Docs: test site built`) — the hub commit now also carries §272, the TODO entry and this entry. Test site: no page changed — not republished. `_to_delete/` holds `xfer-testsite/` and moved locks — his to empty.

## 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V3" — ADMIN 375 LIVE (§272): RESULTS E-MAILS SENT ONCE, HOWEVER MANY ADMINS CLICK · A "BETWEEN PHASES" STATE FILED AS HIS IDEA

**State.** LIVE: staff 211 `ebb8438` / admin 375 `ab6e2ea` (tests `ddd4a83`, hub `8f132e9` + this close's docs), served twice, the pushed admin md5-identical to the gated `38fb99f0…`. Next auction honesty baseline `ab6e2ea` (admin), `ebb8438` (staff).
**The session, in order.** (1) 8:45 PM re-grounding at 184,176; START-HERE delivered (attached copy older than disk — disk used). (2) §272 re-read on live 374 and put to him as ONE plan (`tests/docs/PLAN-375-RESULTS-SENT-ONCE-2026-10-13.md`); answers 8:55 PM, go 8:56 PM. (3) His new idea filed (TODO §1): a "between phases" state for the gap after Complete Phase and before Begin Phase — not explored. (4) His Mac went away: admin 375 built in the CLOUD (the private tests repo attached to the session and cloned — no Mac staging needed), gated, blind review + verifier (SAFE; the clock MEDIUM fixed with a heartbeat claim), delivered as `build-375-files.zip`, unpacked when he came back, pushed ~10:40 PM. Test site republished with 375.
**Lessons.** (1) **A LEASE JUDGED ACROSS TWO DEVICES' CLOCKS IS NOT CLOCK-SAFE** — the plan said a wrong clock could only cause an early handover; the review showed a clock 90 s fast takes over a LIVE send. Fix: never compare clocks — the holder counts a heartbeat, a watcher measures "unchanged for 2 minutes" on its own clock. (2) **A DOCTOR WITH TWO ADDRESSES IS TWO E-MAILS** — checks and records must be per ADDRESS; the new suite's first run found it. (3) **RUN-ALL COUNTS ONLY A LAST LINE ENDING "(N assertions)"** — a new suite without it is run but not counted (the total sat at last build's 6,540). (4) **THE BUTTON SWEEP CLICKS BY POSITION** — after a click changes the page, later clicks land one button off their log line (TODO test gaps). (5) **The private tests repo can be attached to a cloud session** (`add_repo`) — a build no longer needs the Mac to start.
**Next session.** His idea first if he asks: the "between phases" state — explore read-only (what each page shows and works from in that gap), ONE plan with wording.
**Session close** about 10:55 PM; docs to push (hub: TODO, START-HERE, HANDOFF, archive; auction: BUILD-LOG row 375). `_to_delete/` holds `xfer375/` and moved locks — his to empty.

## 13–14 Oct 2026 — "Vacation Auction 13 Oct 2026 V4" — STAFF 212 / ADMIN 376 LIVE (§273): AFTER RESULTS ARE SENT, THE PAGES SAY WHAT IS COMPLETE AND WHAT IS NEXT

**State.** LIVE: staff 212 / admin 376 `23dfb11` (tests `40b62ae`, hub `40c4f22` + this close's docs), served twice, the pushed pages md5-identical to the gated `36749796…` / `9e610606…`. Next auction honesty baseline `23dfb11` (both pages). Test site carries 212 / 376.
**The session, in order.** (1) 10:48 PM re-grounding at 195,210; START-HERE delivered (the attached copy differed only by a final newline — disk used). (2) His "1-go": the "between phases" idea explored by three read-only lanes; ONE plan (`tests/docs/PLAN-212-376-BETWEEN-PHASES-STATE-2026-10-13.md`) and a phone test page. (3) "2-done": he tried the test site. (4) 11:07–11:12 PM his wording replaced "between phases" ("Phase N complete · Phase N+1 is next", "Fall Vacation Auction Complete", rounds the same, "Auction Complete", timer box hidden; "is next" over "starting soon" on Claude's push-back) and "Go". (5) Built in the cloud, gated, one blind review (SAFE; its MEDIUM fixed on admin, told for staff — the last round's line lasts until "Mark results sent"), verified, unpacked on the Mac from `build-212-376-files.zip` (20 files md5-verified; Mac battery 143 / 6,696, isolation 36/36), filed; pushed by him 14 Oct about 7:35 AM.
**Lessons.** (1) **A BROWSER CHECK THAT NEVER SIGNED IN STILL PASSED HALF ITS ASSERTIONS** — `textContent` reads fine on hidden elements, and an element's computed `display` ignores a hidden ancestor; the first assertion of any sandbox browser check is "signed in, the board is on screen". (2) **THE SANDBOX SIGN-IN NEEDS ITS INIT SCRIPT** — `window.__TEST_EMAIL` (a seeded user) and the fixed clock, as `locked-206-check.mjs` does; without them the page stays on the sign-in screen. (3) **A ROUNDS-RUN PHASE 4 HAS TWO "COMPLETE" CLICKS** — Complete Phase 4 stages, "Mark results sent" stamps; wording keyed on the stamps reads the gap between them as the last round's gap.
**Next session.** Nothing queued on the auction from this session.
**Session close** about 7:45 AM 14 Oct; docs to push (hub: TODO, START-HERE, DECISIONS, HANDOFF, archive; auction: BUILD-LOG row 212 / 376 commit). `_to_delete/` holds `xfer212/` and moved locks — his to empty.

## 14 Oct 2026 — "Vacation Auction 14 Oct 2026 V1" — ADMIN 377 LIVE (§276): 📨 MESSAGES · THE TEST SITE GATED (§278) · "RISKY TO BUILD" LIFTED (§274)

**State.** LIVE: admin 377 `d3f8b95` / staff 212 (tests `61d91a4`, hub `024f419` + this close's docs), served twice, the pushed page md5-identical to the gated `e7367ee7…`; rules published by him FIRST (RA-2 193 / 193, honesty 4 / 4 red). Next auction honesty baseline `d3f8b95` (admin), `23dfb11` (staff). Test site republished with 377 / 212 and RECORDED (`tests/testsite/published.json`).
**The session, in order.** (1) 7:41 AM re-grounding at 206,013. (2) §274 *"Remove the guidance that it's risky to do new builds"* — §164 item 4 lifted; §92 and the working method kept. (3) Survey questions and Google Forms answered in chat (not filed). (4) Privacy on the site: six concerns and the admin-only list; §275 *"only address site security for now"* — ONE plan `tests/docs/PLAN-SECURITY-REGISTERED-READS-2026-10-14.md`, his 1-yes (bid documents too) / 2-yes (adminAccess admins-only); the build is the NEXT session's (his order). (5) §276 Messages: explored, planned, ruled, GO 9:20 AM, built in the cloud, gated, blind review (H1 double-send after a page dies — fixed with the "trying" mark; four MEDIUM), verifier SAFE, filed, pushed rules-first. (6) §277 owner-found on the test site (Phase 4 dialog buttons) — filed for later at his word, FIRST next session. (7) §278 he found the test site behind; republished; the gate built (`status.mjs` exit 8).
**Lessons.** (1) **THE TEST SITE IS PART OF FILING, NOT OF CLOSING** — promoted: HANDOFF 3a and START-HERE's paperwork row; `status.mjs` enforces it. (2) **A RULES CHANGE THAT ADDS A DOCUMENT REVERSES THE PUSH ORDER** — under the old rules a new document falls to the public read default and the member write catch-all, so the console publish goes FIRST (the review's M4). (3) **"NEVER TWICE" NEEDS A MARK BEFORE THE SEND, NOT ONLY A RECORD AFTER** — a delivery and its record are two steps; a page can die between them. Admin 375's results sender has the same gap (the review's note) — not raised with him yet.
**Next session.** First §277 (owner-found), then the security build (§275, plan filed, his answers 1 / 2 given; push order to settle). The 375 results sender's same gap: mention when the security build is planned.
**Session close** about 11 AM 14 Oct at about 530,000 tokens; docs to push (hub; tests `published.json`, `mark-published.mjs`). `_to_delete/` holds `xfer377/` and moved locks — his to empty.

## 14 Oct 2026 — "Vacation Auction 14 Oct 2026 V2" — ADMIN 378 LIVE (§277): EVERY ADMIN DIALOG FITS THE SCREEN · THE MESSAGE BOX LETS TAPS THROUGH · THE TEST SITE'S RED BAR GONE

**State.** LIVE: admin 378 `56a5f1c` / staff 212 (tests `ed8a847`, hub `7747c16` + this close's docs), served twice, the pushed page md5-identical to the gated `84cc823d…`. Next auction honesty baseline `56a5f1c` (admin), `23dfb11` (staff). Test site republished with 378 / 212 BEFORE the push and recorded.
**The session, in order.** (1) 10:54 AM re-grounding at 198,972. (2) §277 explored: the cause is the ONE shared admin dialog box (no height limit, nothing scrolls) — the LIVE page too on a short or sideways phone; plan 378. (3) His answers 11:03 AM; a phone test page (old box beside new); GO 11:08 AM. (4) Built in the cloud while he was away (§200 zip precedent), gated, blind review (H1: a dialog opened part-way down → scroll reset AFTER show), verifier found a pre-existing HIGH (the faded message box took taps meant for the month picker's buttons) → `#toast{pointer-events:none}`, his *"keep it."*; filed on his return, pushed ~1:58 PM. (5) §275 his *"fold into next build"* (the results sender's never-twice gap). (6) He asked for the pending list; then §279 (bail prevention A vs B, the minimum-bid label) and *"Handoff now."*
**Lessons.** (1) **A DIALOG CAP BELONGS TO THE SCREEN, NOT TO THE PADDED LAYER** — `max-height:100%` inside a 24px-padded flex layer shrank two dialogs that already fitted; the "same as the old build where it fitted" check is what caught it — keep that shape of check for any layout change. (2) **A HIDDEN ELEMENT IGNORES A SCROLL RESET** — set `scrollTop` after it is shown; the first fix (before "show") passed review by eye and failed the browser gate. (3) **ON THE MAC, `/tmp` IS NOT WRITABLE FROM `device_bash` AND MAY HOLD AN OLD FILE** — a `> /tmp/x; tail /tmp/x` read a stale file from an earlier session as if `status.mjs` had run (it had not); write scratch output under `$HOME`, and read the exit code directly (START-HERE rule 11). (4) **A TEST STUB'S NARROWNESS IS A CONSTRAINT ON THE PAGE'S STYLE, NOT A BUG** — `test-wheel-fairness` offers only `getElementById` on purpose; the page got an id instead of the suite getting `querySelector`.
**Next session.** The site-security build (§275 + the results sender's gap) — push order (rules first, RA-2 his) and his GO first; then §279.
**Session close** about 2:15 PM 14 Oct at about 445,000 tokens. `_to_delete/` holds `xfer378/` and moved locks — his to empty.

## 14–15 Oct 2026 — "Vacation Auction 14 Oct 2026 V3" — STAFF 213 / ADMIN 379 + RULES LIVE (§275): ONLY COLLEAGUES READ ADDRESSES AND BIDS · RESULTS NEVER SENT TWICE, EVEN UNRECORDED · A/B

**State.** LIVE `1a47c63` (staff 213 / admin 379 + firestore.rules published by him ~6:40 AM 15 Oct), served twice, pushed bytes md5-identical (`3e74039d…` / `3b7850c2…` / `0171f0d8…`); tests `6275774`, hub `6e96250` + this close's docs. RA-2 249 / 249 on the new rules, honesty 24 / 24 (run twice by him, the second on the published rules). Test site carries 213 / 379 (recorded). Next auction honesty baseline `1a47c63`.
**The session, in order.** (1) 2:11 PM re-grounding at 228,492. (2) Security plan refreshed on 378 / 212 with the sender gap folded in; his answers 2:21 PM (not-confirmed counts as reached; `signInMisses` admins only; push order) and GO; built in the cloud (Mac away). (3) He filed the private-repos idea for later (TODO §1). (4) Blind review: H1 (a refused first address re-written to the ledger) fixed; H2 ("no answer" also = a browser that cannot reach EmailJS) → pause after that doctor; filed 11:45 PM. (5) His questions (how is he told? can he send to one doctor?) → A (a dialog that stays; Dashboard "Review") and B (per-doctor red-confirmed "send again"); his GO 11:55 PM; built in the cloud; review H1 ("Send to the rest" replayed a stale send after a Reset elsewhere) fixed by rebuilding from current data; re-filed 6:35 AM; pushed 6:40 AM.
**Lessons.** (1) **ON THE MAC, `device_bash` BACKGROUND JOBS DIE WITH THE CALL** — `nohup … &` was killed when the call returned; run the auction battery in the FOREGROUND (it takes ~25 s; START-HERE §6 already says so). (2) **A TEST'S OWN LEFTOVER STATE CAN LOOK LIKE A RULES FAILURE** — RA-2's new last check failed because an earlier section left a 61-key board (the 60-key bound refused one more); re-seed before any check that writes. (3) **A "RESUME" BUTTON MUST REBUILD FROM CURRENT DATA, NEVER REPLAY A CLOSURE** — a dialog can outlive the auction it was opened in. (4) **SWAP-GENERATED UNDO MODULES MUST NOT OVERLAP** — the context of one swap stepped on the next (9 misses); `gen2` stops each swap's context where the next begins.
**Next session.** His order (§279): explore stopping the worst kind of bail (A vs B) and build the "minimum bid required" label. LOWs from the A/B review are in `tests/docs/REVIEW-213-379-2026-10-14.md`.
**Session close** about 6:45 AM 15 Oct at about 540,000 tokens. `_to_delete/` (562 MB) — his to empty.

## 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V1" — STAFF 214 FILED (§279): "MINIMUM NEW BID" AND THE BID BOX'S OWN-MINIMUM NOTE · THE BAIL FIX SHAPED FOR A NEW SESSION

**State.** LIVE: staff 214 / admin 379 + rules — staff 214 `405dda0` pushed by him about 11:30 AM, served twice, the pushed page md5-identical to the gated copy `980c57cf…`; tests `6f727cd`, hub `f69de09` + this close's docs. Mac battery 147 suites exit 0; the test site carries staff 214. Next auction honesty baseline `405dda0`.
**The session, in order.** (1) 6:43 AM re-grounding at 237,379. (2) §279 explored: a plain "block unless needed" would have stopped none of the real bails (Claude corrected its 14 Oct view); move-not-remove proposed; replay of his 15 Oct backup — 15 winning exits in Phases 1–3: 8 needed, 4 bails, 3 bail-and-return. (3) His rulings through the morning (all in §279): move-not-remove yes, then re-opened; exit allowance DECLINED ("terrible"); zero allowances; the zero-bail standard; his "no lowering after a move" idea and its warning; the label as "Minimum new bid" plus the box's note (wordings 1 and 2); bid-lowering items left out; remove bid lowerings later. (4) Staff 214 built in the cloud (Mac asleep 7:10–9:17), reviewed blind (one MEDIUM fixed), verified twice (one HIGH fixed: other weeks' numbers read as a rule limit), filed about 11:19 AM.
**Lessons.** (1) **A NUMBER A PERSON HOLDS ON ANOTHER WEEK IS NOT A RULE** — asking `_wwRefuses` on the live board mixes the engine's one-number-per-phase check into a "what do the rules allow" question; judge on a picture with the person's other weeks taken off. (2) **REASON ABOUT BIDDING OUTCOMES BY RUNNING THE ENGINE, NOT IN THE HEAD** — Claude miscounted a tie in the chat and the owner caught it. (3) **A TEST PAGE WITHOUT THE REAL CSS LIES ABOUT LAYOUT** — the approximate phone page showed clipping the real page does not have; measure with the page's own styles. (4) **THE CLOUD BATTERY'S 8 RED SUITES** read hard-coded baselines at the upload path, where staging had put the live 213 — red identically on a 213 control in the same tree; the Mac run is the clean one.
**Next session.** The bail fix — one full plan (TODO §1 top line).
**Session close** about 11:35 AM 15 Oct at about 595,000 tokens. `_to_delete/` — his to empty.

## 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V2" — NO BUILD: THE SHORT START MESSAGE (§280), THE LIVE LINE SHORTENED (§281), THE RULE SETS SHAPED AND BUILD 1 PLANNED (§282), SETTINGS (§283), THE "LOWER AND STILL WIN" E-MAIL (§284)

**State.** LIVE unchanged: staff 214 / admin 379 + rules (`405dda0`); hub `068b473` + this session's docs, tests `6f727cd` + the new plan. No page changed — batteries not run, test site not republished. He set Bid Lowerings to UNLIMITED in all four phases on the live admin, about 12:35 PM (§282).
**The session, in order.** (1) 11:34 AM re-grounding at 190,259. (2) §280: START-HERE read from disk, never pasted, no longer to the outputs column; `SESSION-START.md` holds the short start message, given in the chat with the commit lines AT THE HAND-OVER ONLY. (3) §281: the LIVE line cut from 17,749 to 866 characters, its history archived verbatim. (4) §282: switchable rule sets — Open declined, Standard (as live) and Strict; lowering unchanged in both and now unlimited; the walled-week gap measured on his backup (19 cases, the newcomer's level dropped once, by a removal) and to be MANAGED BY ALERTS (build 2: personal alert settings, a "tell me when I can get in" alert, a timer restart); tabled at 12:52, un-tabled at 1:26 for exploring. (5) §283: settings survive the reset; the timer's 48 h at reset to fix later. (6) §284: Part A of the "lower and still win" e-mail to be removed, Part B kept — to build later. (7) Build 1 explored by four agents; ONE plan `tests/docs/PLAN-RULE-SETS-STRICT-2026-10-15.md`, fourteen questions.
**Lessons.** (1) **WHEN A LINE CONTRADICTS WHAT HE SAID MINUTES EARLIER, ASK — DO NOT PICK THE CONTRADICTING READING.** "Default them all to off" meant the lowering RESTRICTIONS off; his 12:09 message had just said a 1 lowered to a 10 is fine. (2) **A FIELD'S PRESENCE IS READ ON EVERY ENTRY, NOT THE FIRST** — Claude told him Phases 1–2 had no bid values from one admin entry's keys; every bid entry has them (corrected in §282). (3) **COUNTING CODE IS NOT THE RULE** — Claude said an NP could make a full week a competition week from `_wwContested` alone; the entry rule (`_weBlocks`) refuses that bid; he caught it by asking. (4) **A SKEPTIC FINDS WHAT A DESIGNER DOES NOT** — the red team found the move-then-remove two-click bail, the tie exit, the console shortcuts and the offline fail-open in a design the owner had already approved in outline; use one for every rule build.
**After the first close (2:07–2:12 PM, §282):** his answers — a move only where the moved bid would win AND his projection there went win → Under Review / losing or Under Review → losing; ties, Under Review and losing bids removable any time; the console shortcuts must go; the admin keeps every removal power and an admin change to a person's own bid is never their knock-out; in BOTH sets every bid save refused while the page is not live and re-judged on the server's copy at saving — split out as BUILD 0; a new idea filed: an admin warning when an admin action would be refused for a regular user.
**Next session.** BUILD 0 — explore, one plan, his go, build (TODO §1 ▶ ORDER). Then build 1's remaining questions (plan §10: q7–q14).
**Session close** about 2:15 PM 15 Oct at about 475,000 tokens. `_to_delete/` holds about 659 MB — his to empty.


## 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V3" — NO BUILD: BUILD 0 (STAFF 215) EXPLORED, PLANNED, MEASURED AND APPROVED (§282) — TO BE BUILT IN A FRESH SESSION

**State.** LIVE unchanged: staff 214 / admin 379 + rules (`405dda0`), schedule 151 / 51 — each served twice at the opening. No page changed: batteries not run, test site not republished. Docs only: the plan, its supporting folder, DECISIONS §282, TODO §1, the MAP.
**The session, in order.** (1) 2:15 PM re-grounding at 175,438. (2) His "go" (2:16 PM) to explore build 0 — three agents (the code map; the real Firebase 10.12.0 measured against a stand-in server; the re-judge inventory) and a red team, which found four HIGH in the first design (a value-only "already saved" test silently killing a re-bid of a leftover number; a no-write retry failing while saved; late landings losing their follow-ups; the browser "offline" event stranding the page). ONE plan: `tests/docs/PLAN-215-SAVE-ONLY-WHEN-LIVE-2026-10-15.md`, nine questions. (3) 3:21 PM he agreed with all nine and asked whether a good connection stays quick — measured with his backup's document sizes (plan §10a): as quick or quicker, provided the reads are issued together. (4) 4:11 PM APPROVED, the phone test page waived. At 312,738 the build was judged not plainly finishable before 650,000 (§264) — a fresh session builds it.
**Lessons.** (1) **A REDIRECT THE SANDBOX CANNOT WRITE MEANS THE COMMAND NEVER RAN — AND AN OLD FILE OF THE SAME NAME THEN READS AS ITS OUTPUT.** `node status.mjs > /tmp/…` on the device failed on the redirect; `tail` showed a stale earlier run's text as though fresh. Caught only because `git status` showed START-HERE unchanged. Write outputs under `$HOME`, read the exit code directly, and check the file is new (rule 8). (2) **THE RED TEAM BEFORE THE PLAN, NOT AFTER** — V2's lesson 4 again: a design that read as complete had four HIGH. (3) **HIS PERFORMANCE QUESTION WAS ANSWERED BY MEASUREMENT, AND THE ANSWER DEPENDED ON ONE DESIGN DETAIL** (reads together: 0.18 s; one after another: 0.8–1.3 s) — that detail is now a requirement in the plan. (4) **AGENT WORK LIVES IN THE CLOUD SCRATCH AND DIES WITH THE SESSION** — the plan cited "kept" harnesses that existed only there; they were moved into `tests/docs/build0-2026-10-15/` (54 files, md5-verified) before the close.
**Next session.** BUILD staff 215 from the plan and `tests/docs/build0-2026-10-15/NOTES-FOR-THE-BUILDER.md` (re-read every line number first); the reads issued together; RA-2 by him after it (a new check of the combined save). Then build 1's remaining questions (rule-sets plan §10: q7–q14).
**Session close** about 4:15 PM 15 Oct at 334,693 tokens. `_to_delete/` holds about 654 MB — his to empty.

## 15–16 Oct 2026 — "Vacation Auction 15 Oct 2026 V4" — STAFF 215 LIVE (§282, build 0): EVERY BID SAVE ONLY WHILE LIVE, JUDGED ON THE SERVER'S COPY · BUILD 1'S ANSWERS FILED

**State.** LIVE: staff 215 `4aafdb2` (pushed by him 16 Oct about 5:39 AM after RA-2 255 / 255, honesty 24 / 24; served twice; pushed page md5-identical to the gated `539dbbff…`), admin 379 + rules `1a47c63`, schedule 151 / 51. Test site republished (carries 215 / 379). Next honesty baseline `4aafdb2`.
**The session, in order.** (1) 4:21 PM re-grounding at 181,990. (2) His "go" 4:23 PM; re-reading the code cost ~100k, so at 286,144 he chose "Go, with agents" (the heavy work in agents, a check at 480k). (3) Built by a builder agent from a written design (`tests/docs/build215/DESIGN.md`); two other agents repointed 17 suites and wrote the new suites; a blind review (NOT safe: one HIGH, two MEDIUM) and an independent verifier (two passes) — all fixed, SAFE conditional on RA-2. (4) 8:21 PM his Build 1 answers q7–q14 filed (DECISIONS §282; q13's wording to redraft — only a WINNING competition-week bid is held). (5) Filed about 10:30 PM; Mac per-suite run 149 / 149 exit 0, isolation 36 / 36. (6) 5:38 AM RA-2 255 / 255 — the combined save fits; pushed 5:39 AM.
**Lessons.** (1) **COUNT THE RULES' DOCUMENT-ACCESS CALLS BEFORE PUTTING WRITES IN ONE TRANSACTION** — Firestore sums them over a transaction's writes (limit 20; going over = permission-denied, which a page reads as "closed"); the plan missed it, the builder's correction caught it, the blind review showed the count was unproven, and the page now carries a split-shape safety net; RA-2 (the emulator) said it fits. (2) **DELEGATE THE READING, NOT ONLY THE WRITING** — the §4 ritual plus re-reading the code to the plan's line numbers took the session from 182k to 286k before a line was written; an agent can re-verify line numbers and hand back the conclusion. (3) **THE CONTAINER RESTARTED TWICE MID-WORK** — agents stopped; resuming them by message from their transcripts lost nothing, but a resumed agent must first check what it last wrote. (4) **THE MAC BATTERY OUTGREW ONE DEVICE CALL** — START-HERE §6 corrected; `tests/run-chunks.py`.
**Next session.** Build 1 (the rule sets): redraft q13's wording per his 8:21 PM answers and put it to him; then his go.
**Session close** about 5:45 AM 16 Oct at 482,231 tokens. `_to_delete/` holds about 655 MB — his to empty.
