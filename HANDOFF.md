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
- **`device_commit_files` can deliver an EARLIER upload when the staged path is reused** (18 Oct 2026, the alerts test page): re-saving `outputs/x.html` after changing it left the Mac copy at the old md5 twice — once because the copy and the save ran in the same parallel batch, once with them in order. Give each save a NEW staged file name, run it only after the copy has finished, and md5 the Mac side before saying it is saved.
- **The device VM's `/tmp` can hold OLD files and refuse writes** (18 Oct 2026): `node status.mjs > /tmp/st.out` failed on permission, so the script never ran, and the `tail /tmp/st.out` after it printed a stale 15 Oct run (admin 379) as if it were today's. Write outputs under `$HOME`, read the exit code, and check that the output names today's builds.
- **A cloud CONTAINER RESTART kills every background job** (18 Oct 2026, build 219): batteries and agents running in the background are lost; run batteries in foreground chunks with results on disk, and resume agents by id.
- **A SUBAGENT HERE CANNOT WRITE ITS OWN REPORT FILE** (18 Oct 2026): have it return its findings in the reply and save them yourself.
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

## 16 Oct 2026 — "Vacation Auction 16 Oct 2026 V1" — STAFF 216 / ADMIN 380 + RULES LIVE (§282, build 1): THE STANDARD / STRICT RULE SET · COMBINATION BIDS EXPLORED AND ANSWERED (§285)

**State.** LIVE: staff 216 / admin 380 + rules `d43d2ef` (pushed by him about 8:10 PM after RA-2 276 / 276, honesty 5 of 5 GOOD, the rules published; served twice; pushed pages md5-identical to the gated `b615591e…` / `5d76a2cb…`), schedule 151 / 51. Test site republished (216 / 380). Next honesty baseline `d43d2ef`. The setting is unsaved, so the site runs Standard, exactly as before.
**The session, in order.** (1) 5:45 AM re-grounding at 179,785. (2) Build 1's wording redrafted and approved (W1–W6); ties confirmed a legitimate way out; the backup re-run with "must win there". (3) 6:06 AM his go, with his critical gate: Standard identical to 215 / 379. (4) A designer agent, a builder, a test writer, three blind lanes (Standard, red team, data / rules); fix round F1–F7 (the Fair Play report's changes made Strict-only); his answers: the Edit-to-NP route left, ties always free, the info table in both sets; an independent verifier — SAFE TO DEPLOY, STANDARD IDENTICAL (bidder rules): yes. (5) The phone test page "Strict Mode Boxes"; wording approved 5:50 PM. (6) Filed about 6:40 PM; Mac 155 / 155, isolation 36 / 36; RA-2 by him; pushed. (7) Build 2 delayed; the tabled list given; combination bids (then "Strict only above n") set as next; explored, answered 8:43 PM (§285).
**Lessons.** (1) **AN INVARIANCE GATE MUST COVER THE ADMIN'S DERIVED VIEWS, NOT ONLY THE BIDDER'S** — the staff side was identical at the first try; the blind Standard lane found the Fair Play report judging differently under Standard, which no staff-side harness could see. (2) **STAGING A LIVE PAGE INTO `/mnt/user-data/uploads/GitHub/vacation-kp.github.io` STILL TRIPS EIGHT SUITES** (START-HERE §6 already warns) — move the staged copy aside before any cloud battery. (3) **AN INTERRUPT STOPS RUNNING AGENTS MID-EDIT** — a stopped agent had half-edited the RA-2 files; a fresh agent read `git diff` first and finished them. After any interrupt, check what each stopped agent last wrote. (4) **THE DEVICE `/tmp` HOLDS OTHER SESSIONS' FILES AND MAY REFUSE WRITES** — a refused redirect left `tail` reading a stale file from another day; write device outputs under `$HOME`, never `/tmp`. (5) **A SUITE LONGER THAN ONE DEVICE CALL** — `test-216-standard-invariance.mjs` (about 6 min at FUZZ=1200) ran on the Mac at FUZZ=150 / MUT_BOARDS=40 and in full in the cloud on md5-identical bytes; `run-chunks.py` stops on such a suite (an unhandled TimeoutExpired) — record its result by hand as done here, or teach the runner a per-suite FUZZ.
**Next session.** Combination bids (§285, `tests/docs/PLAN-COMBO-BIDS-2026-10-16.md` with his answers in §12): the phone test page first (two screens always, all combinations together on the second), then the build with agents, adversarial lanes and a verifier; ask him for a backup for the forged-combination count (Q17). Then "Strict only for bids stronger than n".
**Session close** about 8:50 PM 16 Oct at 503,855 tokens. `_to_delete/` holds about 734 MB — his to empty.

## 16–17 Oct 2026 — "Vacation Auction 16 Oct 2026 V2" — STAFF 217 / ADMIN 381 + RULES FILED (§285): COMBINATION BIDS 2/3, 3/4, 4/5 AND THE TWO-SCREEN BID BOX · STRICT ABOVE N EXPLORED · LOWERINGS UNDER STRICT ANSWERED

**State.** LIVE unchanged: staff 216 / admin 380 + rules `d43d2ef`, schedule 151 / 51. **FILED, NOT PUSHED: staff 217 / admin 381 + rules** (gated `16b20a05…` / `507fb327…` / `b548004f…`, versions.json `eca64fe2…`); test site republished (217 / 381); `status.mjs` exit 0. **His order: RA-2 (expected 291 / 291; honesty "6 of 6 new-gate assertions FAILED — GOOD") → publish the rules → push the three repos.**
**The session, in order.** (1) 8:58 PM re-grounding at 198,328. (2) The phone test page "Combination Bids Test"; his wording "better than n", 1/2/3 "better than 1/2"; "perfect" 9:23 PM; "go" (the three recommendations taken: button hidden when none allowed, the second-screen hint, the admin label). (3) Build by agents in the cloud: designer-builder (61 once-only edits), test writer (9 new suites, 15 repointed), three blind lanes (all SAFE TO DEPLOY), fix round F1–F6 decided while he slept, an independent verifier — SAFE TO DEPLOY yes, STANDARD IDENTICAL (behaviour, unset) yes. Q17 from his backup: no forged combination. (4) Filed about 3:40 AM: 35 files md5-identical on the Mac; Mac 164 / 164 (8,161), isolation 36 / 36, honesty red on `d43d2ef`. (5) His bedtime order: Strict above n explored (`tests/docs/PLAN-STRICT-ABOVE-N-2026-10-17.md`, 14 questions); his lowerings question answered as findings (`tests/docs/FINDINGS-LOWERINGS-UNDER-STRICT-2026-10-17.md`).
**Lessons.** (1) **A FILE WRITTEN TO THE MAC BY `device_commit_files` MAY NOT BE VISIBLE TO `device_bash` FOR SEVERAL SECONDS** — a rewrite run straight after read the OLD bytes and put them back; wait until the md5 matches before touching the file (a loop on md5, as the unpack steps now do). (2) **A TEST HARNESS'S CACHE KEY MUST HASH THE WHOLE SOURCE** — `lib215` sampled every 7th character, so a mutant of equal length reused the real page's cached world and survived; now SHA-1 of the whole source, the 15 suites using it identical before and after. (3) **A SUBAGENT CAN BE REFUSED A SECOND DELIVERABLE FILE** — ask for long text deliverables to be returned in the report as well, and write them yourself. (4) **THE GAP AFTER RESULTS IS STILL JUDGED LIVE** — any setting an engine reads (floors, now combinations) can repaint a decided phase until the next Begin Phase; F1 closed it for combinations only.
**Next session.** First his three steps and, after the push: verify live twice, `status.mjs`, the BUILD-LOG commit id, START-HERE's LIVE line (delete the FILED line). Then his answers: the Phase-4 guard (switching a combination off between rounds — DECISIONS §285 last lines), the Strict-above-n plan's 14 questions, the findings.
**Session close** about 4:10 AM 17 Oct at 445,768 tokens; reopened 6:53 AM: RA-2 291 / 291 (honesty 6 of 6 GOOD), rules published, pushed by him about 6:55 AM as `2346239` (tests `a7b05e6`, hub `de04449`), served twice, md5-identical; START-HERE's LIVE line updated, the FILED line removed; his lock / lowerings exploration filed for later. Hand-over 7:05 AM. `_to_delete/` holds about 815 MB — his to empty.

## 17 Oct 2026 — "Vacation Auction 17 Oct 2026 V1" — STAFF 218 / ADMIN 382 + RULES FILED (§286): THE STRICT LEVEL · AUCTION SETUP PLANNED AND APPROVED (§287)

**State.** LIVE unchanged: staff 217 / admin 381 + rules `2346239`, schedule 151 / 51. **FILED, NOT PUSHED: staff 218 / admin 382 + rules** (gated `e24b05d2…` / `55eb9ce8…` / `4406bc79…`, versions.json `a42cbee8…`); test site republished (218 / 382); `status.mjs` exit 0. **His order: RA-2 (expected 312 / 312; honesty "9 of 9 new-gate assertions FAILED — GOOD") → publish the rules → push the three repos.** He is away from the Mac; he will push.
**The session, in order.** (1) 7:03 AM re-grounding at 183,681. (2) His 7:07 idea (settings set before Phase 1, never changeable) filed; Strict-above-n's 14 questions answered (§286), Q5 = B after Claude first mis-framed it as an exit allowance and then conceded it is his own §248 + n rule working together. (3) Phone page "Strict Level Test", "looks good" 7:29, "go" 7:30. (4) Build by agents: builder (21 edits, R2 comment approved by the lead), test writer (9 new suites, 15 repointed, RA-2 generation), three blind lanes + verifier — SAFE TO DEPLOY yes, no fix round. Filed about 10:50 AM: Mac 173 / 173 exit 0 (8,347), cloud 173 / 173 (7,853), isolation 36 / 36. (5) Afternoon: §287 explored (54 admin controls inventoried; ONE plan `tests/docs/PLAN-AUCTION-SETUP-2026-10-17.md`), answered in full and the phone page "Auction Setup Test" (v6) approved — one review per phase start, optional, with the FTE on the weeks about to open; a bail-out per setting behind two warnings and UNLOCK.
**Lessons.** (1) **THE HARDCODED HONESTY PATH BIT AGAIN** — the session staged the live pages to read them, which put them at `/mnt/user-data/uploads/GitHub/vacation-kp.github.io/`, and 8 old suites then "failed" their honesty blocks on the baseline run; move staged pages away before any battery (START-HERE §6 already warns — read it before staging). (2) **RE-DELIVERING A FILE UNDER THE SAME OUTPUTS NAME CAN LAND THE OLD BYTES ON THE MAC** — `device_commit_files` of a re-sent outputs file wrote the previous version; give every re-delivery a NEW outputs name (v2, v3 …) and loop on the md5 before copying. (3) **A PREMISE INHERITED FROM AN EARLIER SESSION IS NOT VERIFIED** — "undecided bids carry into the next Phase 4 round" (§285's note, the runbook's combination line 4) was repeated to him without reading the code; the inventory lane found it appears false. To be proven by a test first (plan Q1) — run it, don't recall it. (4) **THE 216 INVARIANCE SUITE OUTRUNS `run-chunks.py`'s 170 s ON THE MAC** — run it alone at `FUZZ=150` and record it by hand, as the BUILD-LOG row says.
**7:39 PM, his first RA-2 run:** every new [GATE] passed on the 218 rules and all 9 failed on 2346239, but the suite CRASHED after (4b) both times — a test defect, not the rules: the new "Strict level" section called `ctx.firestore()` twice in one `withSecurityRulesDisabled` callback ("Firestore has already been started"). Fixed (one `ctx.firestore()` per callback; `tests/rules-emu/assertions.mjs` → `fb1aced9…`), delivered, RA-2 to be re-run before the rules are published. Lesson: **an emulator section that cannot run here must at least be checked for one `ctx.firestore()` per callback**.
**Next session.** After his push: verify live twice, `status.mjs`, the BUILD-LOG commit id, START-HERE's LIVE line (delete the FILED sentence). Then, on his go, build §287 (the plan + its §11 answers + the test page `tests/docs/setup/phone-test-auction-setup.html`), starting with plan Q1's test of the Phase 4 premise.
**After the close (7:39–7:45 PM):** RA-2 re-run 312 / 312 after the test fix; rules published; pushed by him as `2705630` (tests `4867107`, hub `5254a45`), served twice as 218 / 382, md5-identical; START-HERE's LIVE line updated, the FILED sentence removed. **Session close** about 5:20 PM at 581,554 tokens; final hand-over 7:45 PM at 622,027 tokens. `_to_delete/` holds the transfer files of this build (see the chat) — his to empty.

## 17–18 Oct 2026 — "Vacation Auction 17 Oct 2026 V2" — STAFF 219 / ADMIN 383 + RULES FILED (§287): AUCTION SETUP — THE WHOLE-AUCTION LOCK, THE SETUP PAGE, ONE REVIEW PER PHASE START, THE TWO-STEP MONTH PICKER

**State.** LIVE unchanged: staff 218 / admin 382 + rules `2705630`, schedule 151 / 51. **FILED, NOT PUSHED: staff 219 / admin 383 + rules** (gated `3cf7c53b…` / `09ce018e…` / `8f6d85be…`, versions.json `22530e2e…`); test site republished (219 / 383, `tests/testsite/published.json`). **His order: RA-2 ✅ 371 / 371, honesty 26 / 26 red (18 Oct ~7:43 AM) → publish the rules → push the three repos.**
**The session, in order.** (1) 7:45 PM re-grounding at 187,236. (2) 7:46 his go on §287. (3) Plan Q1 answered by test (`test-219-p4-carry`, 107 / 107; mutant caught): the Phase 4 carried-bid premise DISPROVED; one narrow admin-only route found (an Add Bid dialog left open across Complete Round) — his call, not built. (4) Built by agents from BRIEF-219 with his rulings of the evening (§287 7:58 PM – 11:55 PM: bail-out between phases only, 10-minute unlock with Lock again, clean-and-simple as a standing constraint, one screen per setting with Skip the rest = reviewed, the Dashboard button opens the page, ↩ Back to the review, UNLOCK in any capitals, the Phase 4 FTE check as a second step of the month picker with ↩ Back to Round N, "▶ Begin Phase 4: Round N"). Phone preview "Auction Setup Preview" (https://claude.ai/artifact/RGFcxW4tQievKG5C3FRgzK) iterated to v6; "Good" 11:55 PM. (5) Gates: three blind lanes (one HIGH: a leftover back link could resume a begin without the backup offer; one MEDIUM: a non-roster admin's address fragment), fix round F1–F10, independent verifier (SAFE yes; N1 fixed after). Cloud 184 / 184 (8,679), Mac 184 / 184 (8,659), isolation 36 / 36. Records: BUILD-LOG row, `tests/docs/REVIEW-219-383-2026-10-18.md`, `tests/docs/build219/`.
**Lessons.** (1) **A CONTAINER RESTART KILLS BACKGROUND JOBS** — the test writer's battery runs were lost mid-way; run batteries in foreground chunks with results on disk. (2) **A SUBAGENT CANNOT WRITE ITS REPORT FILE** here — have it return the findings and save them yourself. (3) **THE OWNER'S PREVIEW FOUND WHAT NO GATE COULD** — the live-updating table "bouncing all over the place"; rule 19 paid again. (4) **FILES THAT EXIST ONLY IN THE CLOUD COPY ARE EASY TO MISS** — make219 / un219 / gen_un219 were not in the test writer's list and the Mac battery failed until they were delivered; diff the whole tests tree against the staged original before delivering. (5) **test-218-fairplay was clock-dependent** (a minute boundary between two renders) — made deterministic.
**Next session.** After his push: verify live twice, `status.mjs`, the BUILD-LOG commit id, START-HERE's LIVE line (delete the FILED sentence).
**After the filing (7:43–7:50 AM, 18 Oct):** RA-2 371 / 371 (honesty 26 / 26 red on 2705630); rules published; pushed by him as `b1ca0f8` (tests `ba4fd73`, hub `50cf46e`); served twice as 219 / 383, md5-identical; START-HERE's LIVE line updated, the FILED sentence removed.
**After it went live (18 Oct, 7:51 AM – 5:57 PM):** answered how the setup lock can be changed once Phase 1 begins (the bail-out; between phases only for the five frozen keys; the year never; Reset). Pending list given on his ask; the Add Bid stale-dialog route and the Fair Play crafted-row fix **DECLINED** (§287). **§288 — E-MAIL ALERTS:** explored as ONE plan, `tests/docs/PLAN-ALERTS-2026-10-18.md` (15 e-mail kinds, three groups), and **ALL ANSWERED** the same day (plan §9 + DECISIONS §288): two switches; group 1 always sent; the get-in alert uncapped (one per week), ending at phase / round end, each one switchable off by its owner; **Part A AND Part B removed** (no e-mail suggests lowering); one confirmation e-mail per change of choices; the welcome e-mail sent by Begin Phase 1 (late joiners at first sign-in); no new alerts; **his 60-second hold on a CANCEL's alerts** (a bid on that same week inside the 60 s ends the hold and sends ONE netted e-mail at once; the held alert sits in the shared mail queue; no backup measurement); the countdown restart filed for the future.
**Next session.** The alerts build (§288): re-do the plan's §3–§6 wording and size for every §288 answer (plan §9 lists them), the phone test page, his go, then build (agents, blind lanes, verifier, RA-2 — the rules gain one document). The admin warning (§282 build 2) stays separate and later.
**Session close** 18 Oct 2026 about 6:00 PM at 593,458 tokens (no build started above 550,000; filing of 219 / 383 finished at about 495,000). Pending his push: the docs commits below. `_to_delete/` holds 21 entries, 165 MB — his to empty.


## 18 Oct 2026 — "Vacation Auction 18 Oct 2026 V1" — NO BUILD (credits; his order, §289): THE ALERTS PLAN FINISHED AND SHOWN ON HIS PHONE (five versions), THREE MORE PLANS WRITTEN AND ANSWERED, THE RULES WORDING RE-DONE

**State.** LIVE unchanged: staff 219 / admin 383 + rules `b1ca0f8`, schedule 151 / 51 — each served twice with different cache-busters. Nothing built, no page touched, no battery run (no page changed). Test site not republished (no page changed; still 219 / 383).

**The session, in order:**
1. 6:12 PM — re-grounded at 211,239.
2. 7:04 / 7:05 PM — his order: no builds for a few days, planning only (§289).
3. The alerts plan finished as §10 of `tests/docs/PLAN-ALERTS-2026-10-18.md` (every §288 answer, read on the live code). Finding: the admin's Send Pending would send a held cancel alert early, so it must honour the hold.
4. Three plans written, each read-only on 219 / 383, and ALL ANSWERED at 7:21 PM (*"agree with all above"*):
   - `PLAN-ADMIN-WARNING-2026-10-18.md` — Option B first;
   - `PLAN-COUNTDOWN-RESTART-2026-10-18.md` — its own small build right after the alerts build;
   - `PLAN-PRIORITY-LOCK-UNDER-STRICT-2026-10-18.md` — keep as is, no build. Lowerings have been unlimited since 15 Oct, so the lock refuses nobody.
5. 7:21–7:34 PM — the Rules & Reminders and welcome e-mail wording re-done (plan §11a–§11h):
   - removed: the "now called bids" rule, the ATO, overpaying, early, sniping and bailing lines, and "Ideally…" (when unlimited);
   - the "No cap…" line shows only when a cap exists;
   - his merged phase rule;
   - the two alert lines;
   - the Strict-only competition line, with no set names, and nothing for Standard;
   - "1 is the strongest…" KEPT (Claude pushed back on removing it; he agreed);
   - the My Bids note removed.
6. 7:35 PM – 8:56 PM — the phone test page "E-mail Alerts Test" (https://claude.ai/artifact/GX5yAX85HLNVNEc21NMcX9), versions 1–5. His looks re-shaped the get-in alert (§11j–§11m):
   - set only in the 🔔 box;
   - any week, with the bid he would be willing to place (not what he holds);
   - no drop-downs;
   - a three-step full-screen alert window;
   - Change beside Remove;
   - a 🔔 marker on the week card with no tap of its own;
   - the 🔔 button on its own line under Sign out.
   Versions 4 and 5 were driven in headless Chromium at 390 × 800 before publishing — it caught the window drawn while hidden; fixed.

**Lessons (promoted to STANDING TRAPS):**
1. A re-used staged path makes `device_commit_files` deliver an old upload.
2. The device VM's `/tmp` can hand back a stale file after a failed redirect.

**Next session:**
- **When he has credits and gives his GO:** the alerts build (staff 220 / admin 384 + rules), from plan §10 and §11 whole. §11a–§11m supersede earlier sections where they differ. Open: §11k Q2 (locked weeks — recommended yes).
- **Then:** the countdown restart.
- **Then:** the admin warning, Option B.
- **Before building the bell:** read the real week card for where it fits.

**Session close** 18 Oct 2026 about 9:00 PM at 515,208 tokens (no build started). Pending his push: tests and hub docs commits below. `_to_delete/` holds about 165 MB — his to empty.

## 18–21 Oct 2026 — "Vacation Auction 18 Oct 2026 V2" — NO BUILD (his order, §289): §11k Q2 RULED, EIGHT ITEMS FILED FOR LATER, THE TEST SITE'S E-MAILS ANSWERED

**State.** LIVE unchanged: staff 219 / admin 383 + rules `b1ca0f8`, schedule 151 / 51 — served twice at the opening (18 Oct 9:22 PM). No page changed: no battery run, test site not republished (still 219 / 383). The Mac link dropped several times; nothing was written while it was down.
**The session, in order.**
1. 18 Oct 9:22 PM — re-grounded at 202,963.
2. 9:42 PM — §11k Q2 RULED: *"locked weeks not choosable"* (DECISIONS §289, plan §11m; Claude's "yes" withdrawn on the code). The alerts plan has no open questions.
3. 19–21 Oct — filed for later in TODO §1, his words verbatim, each with Claude's first notes: the cosmetic redesign; NP line hidden when NP is off in every phase; bids 11–16 (his answer: extra numbers leave the bid caps untouched); a Phase 4 week picker with FTE set from it (rounds: no limit; one week alone not cleanly reachable today); FVA phases chosen per auction and Phase 4 as the RVA; the Remove box's note shorter with small ✎ Edit / ⇄ Swap buttons and no e-mail talk (inventory of other e-mail notices still to do); Smart Lock Control in the settings review (recommended with the admin warning build).
4. 20 Oct — owner-found on the test site, answered read-only (TODO §1): the simulator's batch sends alerts only for weeks a person already had a bid on, so an empty board gives none, live too; Swap lists every own week (no knock-out needed); the simulator does not apply the competition-week entry rule. Open: his test site's review threshold decides whether SS's "to LOSE" e-mail was right — asked, not answered.
5. 21 Oct 3:00 PM — *"I am ready to build now"*: the alerts build recommended for a FRESH session (this one at 365,241 and the plan says fresh); his *"then handoff"*.
**Lessons.** (1) Five unpromoted lessons of 14–15 Oct promoted to START-HERE rule 20 before their entries were archived — and 20(a) bit this session: the Wk 14 / Wk 52 outcomes were worked by hand from the engine's code, not run (said in TODO). (2) The device `/tmp` stale-file trap struck again (a failed redirect, then an old `/tmp/st.out` read back) — write `status.mjs` output under `$HOME`, never `/tmp`.
**Next session.** When he gives his GO: the alerts build (staff 220 / admin 384 + rules), from plan §10 and §11 whole (§11a–§11m supersede; §11k Q2 answered: locked weeks not choosable). Then the countdown restart; then the admin warning (Option B), with Smart Lock Control in the review if he agrees.
**Session close** 21 Oct 2026 about 3:10 PM at 391,715 tokens (no build started). Pending his push: hub and tests docs commits below. `_to_delete/` holds about 165 MB — his to empty.
