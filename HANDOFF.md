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
  LAST REVISED date against git, regenerates the MAP (`MAP.md`, §293) and the DECISIONS index, and
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

**A FILE WRITTEN TO THE MAC BY `device_commit_files` MAY NOT BE VISIBLE TO `device_bash` FOR SEVERAL SECONDS** (16–17 Oct 2026, promoted 23 Oct). A rewrite run straight after read the OLD bytes and put them back. Wait until the md5 matches before touching the file — unpack with `unzip -p` and `md5sum -c` against a shipped checksum file.

**A SUBAGENT CAN BE REFUSED A SECOND DELIVERABLE FILE** (16–17 Oct 2026, promoted 23 Oct). Ask for long text deliverables to come back in its report as well, and write the file yourself.

**A CONTAINER RESTART KILLS BACKGROUND JOBS** (17–18 Oct 2026, promoted 23 Oct). Run batteries in foreground chunks with results on disk.

**FILES THAT EXIST ONLY IN THE CLOUD COPY OF `tests` ARE EASY TO MISS** (17–18 Oct 2026, promoted 23 Oct). Diff the whole tests tree against the staged original before delivering. The Mac battery failed until three generated files were sent.

**RE-DELIVERING A FILE UNDER THE SAME OUTPUTS NAME CAN LAND THE OLD BYTES ON THE MAC** (17 Oct 2026, promoted 23 Oct). Give every re-delivery a NEW outputs name (v2, v3 …) and check the md5 before copying.

**THE 216 INVARIANCE SUITE OUTRUNS `run-chunks.py`'s 170 s ON THE MAC** (17 Oct 2026, promoted 23 Oct). Run it alone at `FUZZ=150` and record it by hand, as its BUILD-LOG row says.

**AN RA-2 EMULATOR SECTION MUST CALL `ctx.firestore()` ONCE PER `withSecurityRulesDisabled` CALLBACK** (17 Oct 2026, promoted 23 Oct). Twice crashes the suite ("Firestore has already been started"). The emulator cannot run in either sandbox, so check this by reading before he runs RA-2.

**A FIRESTORE DOCUMENT HOLDS 40,000 INDEX ENTRIES, AND THAT LIMIT ARRIVES LONG BEFORE THE 1 MiB ONE** (found by a blind reviewer, 10 Oct 2026, staff 203 / admin 364 — Claude had sized the visit list against bytes only). Every stored VALUE costs two entries (a list: about one per element); a map of three values costs six. When a document reaches it, every write to that document is refused — silently wherever the write is fire-and-forget. **Before putting a growing list into one shared document: count VALUES × 2 × people at the cap, not bytes; prefer ONE value per entry; and remember a cap enforced by the admin page holds only while an admin page is open.** Measured 10 Oct from his backup: nothing near a limit (`changesArchive` 12.6% of size, 2–4% of index); `mailLog` at its cap is the closest on the site (about 63% typical, 85% worst case, by count from the code — the backup file does not include `mailLog` or `loginLog`).

**THE CLOUD CLONE OF `tests` IS SCRATCH — NEVER PUSH FROM IT.** A stop-hook in the cloud session reports its uncommitted files and asks for a push. Every push is the owner's (START-HERE rule 4). After his push, fetch and check the clone's files are byte-identical to `origin/main`, then `git reset --hard` the clone to it. On the Mac's VM, write scratch scripts under `$HOME`, not `/tmp` (a stale unwritable `/tmp/chk.mjs` cost one run).

**THE BUTTON SWEEP ATTRIBUTES CLICKS TO THE PANEL IT STARTED ON, NOT THE ONE IT ENDS UP IN** (found 15 Sep 2026, admin 337). `sweep/driver.mjs` collects every visible `button, [onclick], input[type=checkbox]` in the WHOLE document, not just the open panel — so the nav links are always in its list. It clicks one, the page changes panel underneath it, and it carries on clicking what is now visible while still labelling everything with the panel it began on. Adding the Reports page put 22 clicks under `reports`, of which only 4 were that page's buttons; the other 18 were Approvals/Denials controls it wandered into. **This is long-standing and harmless** — every panel has always done it, the totals are honest, and the per-panel comparison still localises a change correctly (every pre-existing panel was byte-identical between 336 and 337). But **do not read a per-panel click count as "what that panel contains"**, and do not treat a jump in one panel's number as evidence about that panel until you have listed the entries.


**A TEST BROWSER THAT CANNOT SHOW THE DEFECT PASSES IT** (15–16 Sep 2026, admin 338; story in `HANDOFF-ARCHIVE.md` by that date): a reproduction that finds nothing in the sandbox browser is not evidence against what he SEES in his own — check the browser differs before withdrawing a finding.

The rules live in `START-HERE.md` §3 and §6; these are the tool-level gotchas that cost a session an hour each,
one line per trap, dated by the session that paid for it (the full story: `HANDOFF-ARCHIVE.md`, by that date).
Add a line the turn a new one is paid for. Retire a line only when the tool or machine it describes is gone.

**The Mac and the bridge**
- **`device_commit_files` can deliver an EARLIER upload when the staged path is reused** (18 Oct 2026, the alerts test page): re-saving `outputs/x.html` after changing it left the Mac copy at the old md5 twice — once because the copy and the save ran in the same parallel batch, once with them in order. Give each save a NEW staged file name, run it only after the copy has finished, and md5 the Mac side before saying it is saved. Hit again 7 Nov 2026 (V4), four times with a reused staged name (each first commit reported "written" and left the old bytes).
- **Never write a clock time that was not read** (31 Oct 2026, twice in one evening — a checkpoint's estimated times ran hours ahead): run `TZ=America/Los_Angeles date` on the Mac before writing ANY time. (Promoted 7 Nov 2026 V4 from the 31 Oct V3 / V4 entries.)
- **`tests/.gitignore` ignores every `package.json` / `package-lock.json`** (31 Oct 2026): a new folder that needs its own package files needs a `!` exception; check with `git status -uall`.
- **`status.mjs` reads START-HERE's "FILED" line as a PAGE build** (31 Oct 2026): a filed build with no page change keeps its state in `TODO.md` §1, not in that line.
- **`zip` cannot write into a connected folder** (31 Oct 2026 — it replaces a temporary file, which is a delete): zip in the VM home, then `cp` the zip across.
- **A computed-style check can pass while the thing is invisible** (31 Oct 2026: a band hidden under the sign-in screen passed): look at the screenshot, or check its pixels. Blind reviewers RESUMED for each verify (they keep their findings) catch a new fault class each round at a fraction of a fresh review's cost.
- **The device VM's `/tmp` can hold OLD files and refuse writes** (18 Oct 2026): `node status.mjs > /tmp/st.out` failed on permission, so the script never ran, and the `tail /tmp/st.out` after it printed a stale 15 Oct run (admin 379) as if it were today's. Write outputs under `$HOME`, read the exit code, and check that the output names today's builds.
- **A cloud CONTAINER RESTART kills every background job** (18 Oct 2026, build 219): batteries and agents running in the background are lost; run batteries in foreground chunks with results on disk, and resume agents by id.
- **A SUBAGENT HERE CANNOT WRITE ITS OWN REPORT FILE** (18 Oct 2026): have it return its findings in the reply and save them yourself.
- The Mac sleeps the moment he walks away and the bridge drops with it (the fix is START-HERE §4). A `device_bash` or
  `device_commit_files` call that returned an error may still have LANDED — check before repeating it (1 Sep, 4 Sep).
- A background process started in `device_bash` dies when the call returns, `setsid nohup` included. The shape that works
  is a resumable chunk runner (~145 s of work per call, a done-list on disk, called until it prints ALL-DONE) (4 Sep).
- `device_bash` has an argument-size limit (E2BIG): a long heredoc goes over in two (29 Aug). A heredoc quoted `'EOF'` passes `'\\n'` to Python as a literal backslash-n — write real newlines (31 Oct 2026; three DECISIONS bullets got a literal "\n").
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
- **RA-2's emulator shares the Mac's clock** — a case that stamps `Date.now()` and expects `at != request.time` passes or fails by the millisecond; stamp a time clearly off (26 Oct V3).
- **A phone test page that copies the page's CSS can freeze in the artifact viewer** (the page's `min-height:100vh` makes the frame grow without end) — turn the screen-height rules off on test pages (26 Oct V4).
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


**PROMOTED 22 Oct 2026 (V2), from the 15–16 Oct V4 and 16 Oct V1 entries as they were archived:** (1) **COUNT THE RULES' DOCUMENT-ACCESS CALLS BEFORE PUTTING WRITES IN ONE TRANSACTION** — Firestore sums them over the transaction (limit 20; over = permission-denied, which a page reads as "closed"); RA-2 is the proof. (2) **AN INTERRUPT OR A CONTAINER RESTART STOPS AGENTS MID-EDIT** — before going on, read what each stopped agent last wrote (`git diff`), and a resumed agent checks its own last write first. (3) **AN INVARIANCE GATE MUST COVER THE ADMIN'S DERIVED VIEWS** (Fair Play, reports), not only the bidder's page. (4) **DELEGATE THE READING, NOT ONLY THE WRITING** — re-verifying a plan's line numbers by hand cost a session 100k before a line was written; an agent hands back the conclusion, the lead re-reads the deciding lines.
**PROMOTED 2 Nov 2026 (V2), from the 27 Oct V1–V3 and 28 Oct V1–V2 entries as they were archived:** (1) **A FRESH SESSION OPENS NEAR 205,000–210,000 TOKENS** (the opening context alone; 209,794 measured 2 Nov) — budget the work from there, not from zero. (2) **A STOPPED TOOL CALL MAY ALREADY HAVE RUN** (a TODO write had landed) — check before repeating it. (3) **BATCH HIS WORDING CHANGES BEFORE REBUILDING** — ask him to send everything, then "that's all"; each late change costs a rebuild and a re-run. A long list of decisions goes on a TICK-BOX REVIEW PAGE (an artifact with its own store) — one pass for him. (4) **A "REMOVAL" CATEGORY CAN OVER-REACH** — list removals inside the Rules text one by one and ask. (5) **A SUITE'S FIXTURES MUST BE REPRODUCIBLE FROM A SHA ON EITHER MACHINE** — never a cloud-only default path. (6) **ESTIMATE A DATABASE LIMIT FROM THE DATABASE'S OWN DOCUMENTED RULE, AND CHECK IT AGAINST A REAL MEASUREMENT BEFORE SHIPPING A GUARD.** (7) **HELPERS CAN RUN `device_bash` THEMSELVES** — a build can live on the Mac VM's scratch with no transfer; tell a builder helper to save its script in parts from the first section (a silent helper with nothing on disk is found only by its silence). A page builder of E size takes hours — plan it as the session's day. (8) **`tests/run-chunks.py` READS `~/mnt/GitHub/tests` ONLY** — for a scratch tree run one suite per call and read each exit code directly.

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

**✅ CLOSED 4 Nov 2026 (DECISIONS §341):** measured 33,342 bytes after Phases 1–3; Reset Auction rewrites the record from scratch each auction, so it never carries across years; ~380 KB at worst for a whole auction.

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

## 5 Nov 2026 — "Vacation Auction 5 Nov 2026 V1" — PLANNING ONLY: BUILD 406 PLANNED AND RULED (§346–§348) · TODO §1 TIDIED · NEXT: BUILD 406
**State.** LIVE staff 241 / admin 405 / mobile 19 on the live site and `testing/` (`dad2722`), schedule 54 / 156 — two cache-busted fetches each about 8:41 AM; nothing on either site changed this session. **NEXT SESSION: build staff 242 / admin 406 from `tests/docs/build406-plan/PLAN.md`** (ANSWERS at its end; `CHECKPOINT.md`, `INVENTORY.tsv`, `probe-search.mjs` beside it) — nothing to re-ask.
**The session, in order.** 8:40 AM opened (Mac; `git fetch` over the bridge refused by the proxy — heads by `git ls-remote` from the cloud, all matching). 8:43 his "what else from todo can be added?" — every open item checked against the pages first; four "for later" items found already live (403) and two settled (§342, 405). 8:44 *"1-3 plus FTE capacity"* · *"go"* (§346); TODO §1 tidied (12 lines marked done / closed / into 406). Inventory (staff 5, admin 63 shown places), the search rule run on all 173 live rule rows, the Pacific-time failure measured (4 red each). Review page "Build 406 Review" (R1–R16). 10:36–10:40 the two capacity pages stay separate (§347). 10:43 his staff-card question answered from the code (the top number is the fixed capacity; "Remaining" is this round). 10:48 his answers (§348).
**Lessons.** (1) **Check every TODO "for later" line against the code before offering it** — four had shipped in 403 with their lines never marked; marking a for-later line in the same turn its build is filed is the TODO rule, and it had slipped. (2) **Two admin pages showing the same number is a design question, not just a naming one** — he chose to keep a settings page and a report page (§347); the naming then follows that split.
**Session close** 5 Nov 2026 about 10:55 AM at about 350,000 tokens. Uncommitted at the close: hub (DECISIONS §346–§348, TODO, MAP, this entry, HANDOFF-ARCHIVE), `tests` (`docs/build406-plan/`). `vacation-kp.github.io` and `schedule` clean. No build, so no battery or isolation run; test site — no page changed, not republished. `_to_delete/` about 4 MB.

## 5 Nov 2026 — "Vacation Auction 5 Nov 2026 V3" — PLANNING ONLY: BUILD 407 WORDING APPROVED (W1–W10, §351) · O2 SCANNED AND CLOSED (§352) · O5 DONE — BOTH FIREBASE KEYS ACCEPT ONLY THE SITE (§353)
**State.** LIVE unchanged: staff 242 / admin 406 / mobile 19, schedule 54 / 156 (served twice each at the opening, 12:28 PM). No page, rules or server change; test site — no page changed, not republished. **NEXT SESSION: BUILD 407 from `tests/docs/build407-plan/PLAN.md` (ANSWERS at its end) + CHECKPOINT — nothing to ask (rule 25).**
**The session, in order.** 12:27 PM opened (Mac; `git fetch` refused by the proxy again — heads by `git ls-remote`, all matching). His "all of them": the W review page "Build 407 Wording" (v1 8 items; v2–v3 after his W6 "Auction complete." and W5 to match, plus W9 / W10 from the "finished" class hunt); 12:44 PM all approved (§351). O2: the three public repos' files and their whole history scanned for personal details (report in the PRIVATE `tests/docs/O2-PUBLIC-NOTES-SCAN-2026-11-05.md`): only his own admin addresses, which the pages and rules need; 12:41 his "test account" / "not real"; 12:44 "close o2" (§352). O5 in his Google Cloud console, Claude guiding: the testing key restricted 12:51 PM (an outside "geocoding" usage warning — that API is not enabled there, so unbillable), checked 3:20 PM; the live key restricted 3:22 PM (no warning), checked 3:24–3:25 PM (§353). Between 12:51 and 3:20 the Mac slept; his phone showed the red reconnect banner after a sign-out (normal; it cleared).
**Lessons.** (1) **Hunt the class BEFORE saying "the one place"** — W5 was called the only "finished" left, and a grep found two more (W9, W10); grep first, then speak. (2) **An API key's referrer restriction is checked by the owner pasting the API's URL with the key into a new tab** — the address bar sends no referrer, so a working restriction answers 403 `API_KEY_HTTP_REFERRER_BLOCKED`; no browser tool needed (the Chrome extension was not connected). (3) The red "LIVE CONNECTION LOST" banner right after a sign-out / sign-in on an open page is the reconnect, not a fault — the decisive test is a reload.
**Session close** 5 Nov 2026 about 3:30 PM at about 385,000 tokens. Uncommitted at the close: hub (DECISIONS §351–§353, TODO, this entry, MAP), `tests` (`docs/build407-plan/PLAN.md` + `CHECKPOINT.md`, `docs/O2-PUBLIC-NOTES-SCAN-2026-11-05.md`). `vacation-kp.github.io` and `schedule` clean. `_to_delete/` about 24 MB — his to empty.

## 5–6 Nov 2026 — "Vacation Auction 5 Nov 2026 V4" — BUILD 407 BUILT AND LIVE ON BOTH SITES (staff 243 / admin 407, §350–§351, §354): THE ROLLING VACATION AUCTION YES / NO
**State.** LIVE: staff 243 / admin 407 / mobile 19, schedule 54 / 156 — pushed by him 6 Nov about 12:39 AM (`aeba35c`), served twice each, live and testing. Test site v45 (407 / 243). **OPEN: he opens the admin page once (arms `requiredBuilds` 243 / 407).** Nothing filed and unpushed after this entry's commit.
**The session, in order.** 3:28 PM opened (Mac; fetch worked, three `maintenance.lock`s moved to `_to_delete/`). Built from `tests/docs/build407-plan/PLAN.md` with nothing asked (rule 25): `build/patch407.py` (once-only, counted) on `488c98f`; `test-407.mjs` (70 / 70; honesty 48 red, the 22 greens true invariants); 68 suites reading the changed code — 61 green, 7 red exactly as on 406; 12 moved targets repointed by three helpers (subagents) in parallel, each green on 407 and unchanged on 406 (`lib407.mjs`). Four lines the plan did not word built in his approved words and put to him; his "Great, will push later" taken as OK (§354). Filed about 4:55 PM; test site rebuilt in the cloud (31 / 31) and republished; pushed 12:39 AM. Between: his "what's left" — the list given; his "4 is dropped. 5 is dropped." — both had been CLOSED 4 Nov (§341) already.
**Lessons.** (1) **Before listing open items, check each against its LATER status** — two items were read off the 3 Nov review and listed as open, though §341 had closed both on 4 Nov (one with a wrong claim about the pages); TODO §1's own line was the place to look. (2) **`device_commit_files` to the same path a second time can deliver the FIRST staged copy** — the md5 check caught it; a small change to a file already on the Mac is made there with a counted python edit instead. (3) **A crash is not a failing honesty run** — the old page went past the refusal into the Round months picker the sandbox lacked; stub what the old build reaches (test-394's stub) so it fails legibly. (4) Three helpers for the suite repoints kept a 12-suite repoint inside one session.
**Session close** 6 Nov 2026 about 12:45 AM at 517,241 tokens. `_to_delete/` about 102 MB (this build's scratch, `b407/`) — his to empty.

## 6 Nov 2026 — "Vacation Auction 6 Nov 2026 V1" — PLANNING ONLY: RA-12 (A FULL AUDIT OF THE MONTH'S BUILDS) PLANNED AND RULED (§355) · BATCH ADD TRIED ON THE TESTING SITE · TODO §1 CLEARED
**State.** LIVE unchanged: staff 243 / admin 407 / mobile 19, schedule 54 / 156 (served twice each at the opening, live and testing). `requiredBuilds` 243 / 407 armed (his "admin done", 12:56 AM). Nothing built; only docs changed (hub `TODO.md`, `DECISIONS.md`, `HANDOFF.md`; `tests/docs/RA-12/`). **▶ NEXT SESSION: RUN RA-12 from `tests/docs/RA-12/BRIEF.md` + `CHECKPOINT.md`; he attaches a live backup at the start.**
**The session, in order.** 12:48 AM opened (git fetch over the bridge refused by the proxy — 403 — so the three public repos were checked from the cloud with `git ls-remote`: all matched the Mac; no locks). 12:50 his "what's on todo" — the open items checked against their later status (lesson of V4) before listing. 12:53–12:55 the 19-line batch for "Add several users" (BA–BS, read against the page's own `_baReadLine` first) — his "worked perfectly". 12:56 the 404 tryout made his to track, off the list. 12:57–1:00 RA-12 asked, planned, ruled.
**Lessons.** (1) **Before re-running an old tool, check what it reads** — `mega-fuzz.mjs` still points at build 267's files; a green from it would have been a lie (rule 8). (2) A git fetch can fail at the proxy (403) — `git ls-remote` from the cloud answers "in step with GitHub?" without touching the Mac's `.git`.
**Session close** 6 Nov 2026 about 1:06 AM at 292,622 tokens.

## 6 Nov 2026 — "Vacation Auction 6 Nov 2026 V2" — RA-12 RUN (THREE HIGH, §356) · TESTING-SITE ITEMS F4–F6 · BUILD 408 PLANNED AND RULED (§357) — NOTHING BUILT
**State.** LIVE unchanged: staff 243 / admin 407 / mobile 19 `07d2012`, schedule 54 / 156 (served twice each at the opening, live and testing); rules `063fe451`. Only docs changed (hub `DECISIONS.md`, `TODO.md`, `HANDOFF.md` + archive; `tests/docs/RA-12/` report + lanes + repro, `tests/docs/build408-plan/`, `tests/fuzz/mega-fuzz-243-407.mjs`). **▶ NEXT SESSION: BUILD 408 from `tests/docs/build408-plan/CHECKPOINT.md` + `PLAN.md` (FINAL; TODO §1 top line).**
**The session, in order.** 1:05 AM opened; his live backup attached (cloud scratch only, never in a repo; counts and week dates only). RA-12 lanes 1–6 two at a time, lane 7 verifier on shape + evidence only (`CLAIMS.md`); one compaction mid-run (about 1:10 AM). Report `tests/docs/RA-12/RA-12-REPORT.md`; review page "RA-12 Audit Review"; 10:01 AM his answers (§356, "Skip move to server now"). 10:03–11:14 AM his testing-site tryout → F4 (Save and Reload), F5 (Swap reasons), F6 ("What's this?"), §248 kept. 11:15 "go" to plan; three exploring agents; F3 reversed to a notice (11:39–11:40); review page "Build 408 Decisions"; 11:57–11:59 answers (§357).
**Lessons.** (1) **Lane briefs must include the RETIRED-SUITES list** — lane 5 reported 8 "drifted" suites that §298 had already retired; the planner caught it. (2) **A verifier's "fix shape" is not a design** — lane 7's one-line F3 fix turned out to refuse real bids when explored; explore before promising him a fix. (3) **Privacy check before filing audit output** — names/initials from the backup were counted against every file to be filed (0 hits; one fake test name "AA" coincided). (4) The bridge's `git fetch` stays refused (403); `git ls-remote` from the cloud confirmed the three public heads.
**Session close** 6 Nov 2026 about 12:05 PM at about 384,000 tokens.

## 6 Nov 2026 — "Vacation Auction 6 Nov 2026 V3" — BUILD 408 BUILT, REVIEWED AND FILED (staff 244 / admin 408 + rules + mail server) — NOT PUSHED
**State.** ✅ LIVE: staff 244 / admin 408 / mobile 19 (`22214f6`), rules `06bd1164` on both projects, mail server deployed testing then live — pushed about 4:42 PM, served twice each live and testing about 4:50 PM. What was filed: `vacation-kp.github.io` (admin 408 `de2eb494`, staff 244 `461ab256`, rules `06bd1164`, versions 244/19/408, `testing/` stamped, BUILD-LOG row); `tests` (mail server `server/mail/lib/{run,mail-core}.js`, server tests, SCHEMA, `test-408-lock-mirror.mjs`, `lib408.mjs`, `test-swap.mjs`, `fuzz/mega-fuzz.mjs` (renamed), RA-2 + `rules-emu/assertions.mjs`, SHAPES, repointed suites, RETIRED-SUITES `#` block, `testsite/published.json` v46, `docs/build408-plan/`); hub (DECISIONS §358, TODO §1, this entry). RA-2 green (4:41 PM); his "all done" (4:49 PM); the LIVE line written. Then (5:12–6:56 PM) his between-phases ideas explored and BUILD 409 PLANNED from his live backup (§360–§363: Round Down Capacity + Smart Lock default; overage guide dropped). **▶ NEXT: BUILD 409 — TODO §1 top line.**
**The session, in order.** 12:02 PM opened (§4 ritual from disk). Built F4, F5/F6, F1 + W1, F2 + B+, battery tidy, bumps + stamps on copies in `tests/docs/build408-plan/build/` (Mac only). test-399-L L5 caught "countdown" against §306 → asked him → "timer" (§358). One compaction (announced). Blind review (subagent, read-only): no HIGH; MEDIUM — the lock copy could loop (a refused copy write re-sent every round-trip; a page with a broken locks feed fighting a healthy one) → fixed with two brakes in `_syncLockMirror`, proven by test-408 G1–G3 (the page without them reproduces both loops: 13 tries / 24 writes); LOW rules comment fixed; two LOW for later (TODO §2 Optional hardening). Filed (md5-verified, 32 files), suites rerun from the real `tests/`, test site v46 published (31/31).
**Lessons.** (1) **Suites that compare with an older pushed build need that build's file** — on the Mac, `git show` from a mirror failed silently and turned 399-users / 400-users / 398-hd red; `BASE_ADMIN` / `BASE_SRC` pointed at `git show` output fixed it. Check a new red's message before believing it. (2) **A comment-only rules edit still changes the pinned md5** (test-234 R1) — grep the suites for the old md5 after any rules edit. (3) A copy written in reply to a snapshot needs a brake for refused writes and broken feeds from the start; the review found it, the plan had not. (4) **Test an idea on his real data before planning it** — the overage guide looked useful until the backup showed it said "up to 50 weeks" for every value. (5) Auto-Approve/Deny is a simulator tool; never describe it as part of a live auction. (6) **When he asks size and risk after a scope change, say which version the numbers are for** — "20–30 lines, low risk" for the Smart Lock part alone read as the whole build (§364). Continued 7 Nov 4:33–5:10 AM: 409 re-ruled — the Smart Lock box remembers the last value applied (kept by Reset) + "Use lowest FTE" (§365); Round down capacity = one always-shown button, weeks with between 1 and 2 FTE left, only the part nobody can win, no tick list (§366); half weeks / shared weeks / a post-phase trade board explored and FILED (TODO §1 IDEA, 7 Nov 4:58 AM). **Session close** 7 Nov 2026 about 5:12 AM at about 495,000 tokens (one compaction, announced); 409 planned in full (§360–§366), not built.

## 7 Nov 2026 — "Vacation Auction 7 Nov 2026 V1" — BUILD 409 BUILT, REVIEWED, FILED AND LIVE ON BOTH SITES (admin 409, §367) · SPLIT WEEKS EXPLORED (§368) — NOTHING PLANNED
**State.** ✅ LIVE: admin 409 / staff 244 / mobile 19 (`51aa787`), live and testing, served twice each about 11:05 AM; schedule 54 / 156 unchanged; rules `06bd1164` unchanged. Test site v47 (409 / 244). To push (his): `vacation-kp.github.io` (BUILD-LOG "409 live"), hub (LIVE line, DECISIONS §368, TODO, this entry). **▶ NEXT SESSION: explore split weeks further (TODO §1 top line).**
**The session, in order.** 5:13 AM opened (§4 ritual from disk; 221,131 tokens). Built 409 on copies by once-only patch scripts; two helpers: the new suite `test-409-round-down.mjs` (159/0; honesty on 408 FAILED 13/61; 15 planted bugs caught) and the repoints (18 suites `[409]` + `lib409.mjs`); the suite writer found a silent failed write and the plan's "Jan 10" label → fix round 1; blind review: no HIGH / MEDIUM in the page, a suite gap closed, feeds-before-gap → fix round 2. Phone check 320/375/390. Filed about 6:50 AM; pushed 11:03 AM; LIVE line 11:05 AM. 11:04 AM–2:31 PM split weeks explored (§368).
**Lessons.** (1) **When he says "not sure", go one step at a time** — at 12:19 PM a whole workflow was put before he had said what "facilitate" meant; his 2:06 PM: *"you jumped ahead, slow down"*. Ask one question; file only his words as settled. (2) **Republishing the test site**: the Artifact tool refuses a publish to an artifact this session has not read, then refuses files not read as published — read `site/built.json`, accept the refusal's live copy, read `site/admin/index.html` and `site/versions.json` by `paths`, diff the old test copy against the new (it must differ by exactly the build), then publish. (3) The device VM's `/tmp` is not writable in this session — a redirect there fails and the command never runs (an old `/tmp` file then reads like fresh output); write scratch under `$HOME`. (4) A build folder that symlinks the repos (for the reruns) must have its links moved out before filing — a `.git` link inside the tests repo would confuse GitHub Desktop. (5) A suite's "added exactly" function lists and the approved Rules text file must move with every build that adds functions or Rules items (`lib409.mjs` follows `lib408.mjs`).
**Session close** 7 Nov 2026 about 2:32 PM at about 500,000 tokens; no compaction.

## 7 Nov 2026 — "Vacation Auction 7 Nov 2026 V2" — SPLIT WEEKS EXPLORED FURTHER (§368) — REVIEW PAGE PUBLISHED — NOTHING PLANNED OR BUILT
**State.** No page changed: admin 409 / staff 244 / mobile 19 LIVE as in V1's entry. Only `DECISIONS.md` (§368) and `TODO.md` (§1) changed — docs, uncommitted. **▶ NEXT SESSION: his answers to the split-weeks review page (TODO §1 top line).**
**The session, in order.** About 2:31 PM opened (§4 ritual from disk); explored split weeks one question at a time, each ruling filed in §368 with his words: one bidder per pair, days-weighted FTE blend rounded up to 0.1, patterns, 0.6/0.4 cap shares only while the bid is live, the two checks, both-people approve and cancel, swap, results e-mail days, reports, the swapped-role two-week shortcut as one droppable item. Phone test page for the icon (E). 3:53 PM his ruling: one review page of everything settled, wording minimal, the rest behind "Why?" / "What's this?"; published about 3:56 PM (private artifact, 4 open items O1–O4, 15 wording drafts W1–W15, "Copy my answers"; source `split-weeks-review.html` was in the cloud scratchpad only).
**Lessons.** (1) The Mac bridge cannot delete: a `git fetch` over it stranded `objects/maintenance.lock` in three repos, moved to `_to_delete/`. (2) Check an answer against the engine code before giving it (the engine fits each week alone; the bid cap counts whole weeks).
**Session close** 7 Nov 2026 about 4:00 PM at about 146,000 tokens; no compaction.

## 7 Nov 2026 — "Vacation Auction 7 Nov 2026 V3" — V2 REVIEWED · SPLIT WEEKS REVIEWED, ITS STAFF WORDING APPROVED (§368) — NOTHING PLANNED OR BUILT
**State.** No page changed: admin 409 / staff 244 / mobile 19 LIVE (served twice each at the opening). Only `DECISIONS.md` (§368) and `TODO.md` (§1) changed. **▶ NEXT SESSION: PLAN SPLIT WEEKS (TODO §1 top line).** Test site — no page changed, not republished.
**The session, in order.** 3:59 PM opened (§4 ritual from disk; 192,170 tokens). His ask: review V2 (it ran on Sonnet, medium). V2's code claims re-read and correct (each week alone, the engine stops at the first group that does not fit; cap = won weeks + live bids; weeks Sun–Sat; a locked card takes no tap); "Mail Log" is the admin's E-mail Log; the 2 Nov entry it archived arrived byte-identical. The helper copying V2's transcript was STOPPED by a safeguard flag — the quote-by-quote check of V2's §368 entries was NOT done (told to him). Ruled: blend 0.6/0.4; won split weeks count shares. The review page then redrawn as mock staff screens (his 4:42 PM) and worked through to 5:13 PM: O1–O4 yes; seven request choices, "available" rows, week numbers, either person starts, Reject on three answers, cancel / change both sides, the outcome check DROPPED (5:00 PM); every staff line OK. 5:17 PM: Reject lines, no approval e-mail, testing first; one build or several after the design.
**Lessons.** (1) An undefined word in a ruling hides a choice ("days-weighted" was calendar 4/7 or weekdays 0.6) — file weights and counts as numbers. (2) Wording drafts in shorthand ("Week · Open to · Post") confused him; draw wording on mocks of the screen it sits on. (3) A helper asked to copy a chat transcript verbatim was stopped by a safeguard flag, and the same work cannot then be done in that session — such a check is his to start in a fresh session.
**Session close** 7 Nov 2026 about 5:20 PM at about 385,000 tokens; no compaction. The review page's source was in the cloud scratchpad only; §368 holds the approved wording in full and "Split Weeks Review" (version 19) is the drawn copy.
## 7 Nov 2026 — "Vacation Auction 7 Nov 2026 V4" — PLANNING ONLY: SPLIT WEEKS S1 PLANNED, RULED AND GIVEN ITS GO (§369) — NOTHING BUILT
**State.** No page changed: admin 409 / staff 244 / mobile 19 LIVE (served at the opening; see the cache-buster caveat, START-HERE §4 step 2). Changed: `DECISIONS.md` (§369), `TODO.md` (§1 top line: the go), `START-HERE.md` (§4 step 2 caveat, LAST REVISED), this file (two entries archived, their lessons promoted to STANDING TRAPS), and `tests/docs/split-weeks-plan/` (PLAN.md FINAL for S1, CHECKPOINT.md). **▶ NEXT SESSION: BUILD S1 (TODO §1 top line), testing first.** Test site — no page changed, not republished.
**The session, in order.** 5:20 PM opened (§4 ritual from disk; 228,384 tokens). His "go" 5:23 PM: the code read on both pages (two read-only helpers mapped the admin page; key lines spot-checked), the mail server read (it sends the body the page writes: no server change), PLAN.md draft 1 with the sweep, the review page "Split Weeks Plan Review" (6:2x PM). 10:41–11:04 PM his answers: Q1–Q10 yes (two builds: S1 the core with admin-recorded splits, then S2 staff self-service); §369 — a half-holder of a won split may be the PARTNER in one more split for the exact other half (his "build this in" against Claude's advice; the newcomer bids); results e-mail — a split week is an ordinary APPROVED line for both; the admin wording seen drawn on "Split Weeks Admin Mock" (v1–v5) and approved; the Splits table with the usual Phase drop-down; Remove offers keep-the-bid or cancel-the-bid; 6.29 reworded. 11:05 PM "yes and yes": the go for S1 and the hand-over.
**Lessons.** (1) **An assumption in a draft must be marked as Claude's** — "the week then goes to the bidder" was written into Rules item 6.29 as if ruled; his ruling said only "assigned to 1 person" (he caught it, 11:00 PM). (2) **A mock built from the page's own CSS must also undo its phone menu** — the admin page hides `.bar` off-screen under 900 px, so v1 showed a broken strip on his phone; render every mock at 390 px before publishing (a local headless Chrome is in the cloud: `/usr/bin/google-chrome` with Python Playwright). (3) **The WebFetch cache-buster check is not independent** (START-HERE §4 step 2, corrected).
**Session close** 7 Nov 2026 about 11:07 PM at 480,739 tokens; no compaction.
## 7 Nov 2026 — "Vacation Auction 7 Nov 2026 V5" — BUILD S1 (SPLIT WEEKS) BUILT OVERNIGHT, REVIEWED AND FILED FOR THE TESTING SITE — NOT PUSHED
**State.** Live unchanged: staff 244 / admin 409 / mobile 19. **`testing/` serves staff 245 / admin 410 (S1)** — RA-2 ✅ BOTH 7:32 AM, the rules on both projects, pushed by him 7:34 AM (auction `a462f38`, tests `78dafec`, hub `58cb2a3`), served 245 / 19 / 410 on `testing/`. **▶ NEXT SESSION: the partner's card green + equally bold (DECISIONS §370; TODO §1), then the live filing (the gated pages).** As filed then pushed: `vacation-kp.github.io` `testing/` = staff 245 / admin 410 (stamped) + `firestore.rules` `6c81b188` + its BUILD-LOG row; `tests` (4 new 410 suites, lib410, 23 suites repointed, RA-2 generation "Split weeks (8 Nov)", `docs/split-weeks-plan/` gated/ build/ text/ reports); hub TODO §1 top line + this entry. **▶ NEXT: his steps in TODO §1's top line** (RA-2 → rules on both projects → push → try S1 on the testing site → the live filing). Test site (private) — the live pages on disk did not change, not republished.
**The session, in order.** 11:09 PM opened (§4 ritual from disk; 212,112 tokens); his order, verbatim: *"going to sleep, do what you can overnight based on my decisions. try to proceed with the build without me."* Cloud workspace `/home/claude/s1`; shared SPEC; lanes as subagents: STAFF (245) and ADMIN-CORE (410 engine) in parallel, then ADMIN-PAGE (Split weeks page, switch, Create, Remove, Change Log, backups, Reset, rules, Rules items) and INTEGRATION (staff ↔ admin twins + a parity suite with splits), REPOINT (22 suites + RA-2), a BLIND REVIEW (no blocker, 4 SHOULD-FIX) and a FIX lane (F1–F4). ~1:10 AM **⚠ the conversation was COMPACTED** (against §264) — announced, every fact re-read from disk. Phone test page "Split Week Cards" (rule 19) published ~1:35 AM. Filed ~3:55 AM, every extracted file md5-identical. 7:28–7:30 AM his two card requests (§370, next session). 7:32 AM RA-2 ✅ BOTH; 7:34 AM pushed; testing served 245 / 410.
**For him (the plan was silent — CHECKPOINT has the list).** The card's partner row less bold than the bidder's; only the bidder's card coloured while live; a week locked while a split bid is live hides the split; results e-mail uses the name on file ("B. Chen" in ANSWERS); dashboard grid shows the partner as a winner initial; User Summary counts the partner's row; the switch not server-frozen and not in the Phase-1 setup review; removing a user leaves their splits; the record key overwrites an earlier phase's ended split; Create refused between phases.
**Lessons.** (1) **A compaction still happened at about 400k of lane traffic** — the subagents' hand-backs are large; ask lanes for SHORT reports and keep detail in their REPORT.md. (2) **A blind review found a real race the lanes had reasoned away** (F1: "the board must wait for nothing new" — but `_boardMark` already handles a missing document); check a lane's stated premise against the code before accepting it.
**Session close** 8 Nov 2026 about 7:37 AM at 315,335 tokens; ONE compaction (about 1:10 AM, announced). All repos: the post-push docs uncommitted (hub DECISIONS §370, START-HERE, TODO, HANDOFF, MAP; auction BUILD-LOG; tests CHECKPOINT). Test site (private) — the live pages did not change, not republished. `_to_delete/` about 234 MB — his to empty.

## 8 Nov 2026 — "Vacation Auction 8 Nov 2026 V1" — S1 FOLLOW-UP (staff 246 / admin 411) PLANNED, BUILT, REVIEWED AND PUSHED TO THE TESTING SITE (§371) · BUILD 412 PLANNED AND GIVEN ITS GO
**State.** Live unchanged: staff 244 / admin 409 / mobile 19. **`testing/` serves staff 246 / admin 411** — pushed by him about 9:56 AM (auction `f5129ca`, tests `6d1da91`, hub `75bfe8a`), served 246 / 19 / 411 on `testing/` (cache-busted, 9:58 AM). **▶ NEXT SESSION: BUILD 412 from `tests/docs/split-weeks-plan/PLAN-412.md` (COMPLETE, GO his 10:12 AM): P1 split results private until sent, P2 no bid-cap line in Create's box, P3 the Bid column — testing first; his try; then THE LIVE FILING of S1 with 411 and 412 (his 10:12 AM: "complete these small fixes along with completing the split week build in next session").** The 411 live bytes are in `gated-411/`; the 412 build starts from them.
**The session, in order.** 7:37 AM opened (§4 ritual from disk; 203,478 tokens). 7:40–8:04 the S1 follow-up planned and ruled in the chat (§371): the switch to Settings + the Phase-1 review row; Create may place the bid (Q1 refuse the whole step, Q2 caps, Q3 competition week "Create anyway"); the staff menu line written now (his, over Claude's push-back); 4.9 / 6.31. 8:04 GO, built in a device scratch copy (`$HOME/w`, gone with the session; the patch scripts are in `split-weeks-plan/build/`). 8:45 `test-411-followup.mjs`. A REPOINT helper (lib411, 21 suites) found a conflict with §334 A1 · E → his 9:01 "match the others" (the card joins the run-lock cards). A blind review: no blocker, three SHOULD-FIX + a race → his 9:36 / 9:39 ("b": the last-bid limit shown with "Create anyway", as Add Bid does not check it). Filed 10:05, pushed 9:56 (the order of his push before Claude's final paperwork). 9:57 his ruling: results never readable before sent → a helper mapped it (`MARKS-AT-PUBLISH.md`); 10:09–10:12 PLAN-412 written and ruled (P1–P3).
**For him.** Nothing open beyond PLAN-412 and the live filing.
**Lessons.** (1) **A repoint lane is also a conflict detector** — it found a new wording that broke an older ruling (§334's no-"when it can change" labels); check new admin wording against the Settings page's own rules before proposing it. (2) **Claude's "Q2" framing was wrong once** (the bidder's cap is the staff whole-bid test, not their half) — found by reading the staff page before building; said and dated in the chat. (3) The STANDING TRAP on `device_commit_files` visibility bit twice (the md5 after each write caught both).
**Session close** 8 Nov 2026 about 10:20 AM at about 530,000 tokens; NO compaction. All repos: this close's docs uncommitted (hub DECISIONS §371 / TODO / START-HERE / HANDOFF / HANDOFF-ARCHIVE / MAP; tests PLAN-412, MARKS-AT-PUBLISH). Test site (private) — the live pages did not change, not republished. `_to_delete/` a few lock files — his to empty.

## 8 Nov 2026 — "Vacation Auction 8 Nov 2026 V2" — ADMIN 412 BUILT, REVIEWED AND FILED FOR THE TESTING SITE (§371–§372) · S2 TO BE PLANNED NEXT SESSION
**State.** Live unchanged: staff 244 / admin 409 / mobile 19. `testing/` served 246 / 19 / 411 at 10:55 AM. **Admin 412 filed for `testing/` and committed by him** (auction `ddddbed` — at 10:55 AM GitHub still had `f5129ca`, so the auction push had not landed; tests `87c3e07` and hub `e7aa8e5` were on GitHub). **▶ NEXT SESSION: TODO §1's top line** — confirm the push and `testing/` 412, his try, the live filing of S1 + 411 + 412 from `gated-412/`, then PLAN S2 (§372).
**The session, in order.** 10:16 AM opened (§4 ritual from disk; 232,390 tokens). 10:2x his "Can we complete the entire split week build in this session?" — 412 + the live filing yes, S2 no (unplanned, rule 25). 10:20 his "s2 and then check it all together" — pushed back (unplanned, large, the 550k / 650k lines, holds S1 back); 10:21 "okay, good" (§372). Built in a device scratch copy (`$HOME/w`, gone with the session; patches in `split-weeks-plan/build/`): patch412.py; `test-412.mjs`; 45 suites run on 411 and 412 trees — test-410-admin-core I2 found a real point (patch412b: the worked-out result for the current phase only); 5 suites repointed (lib412, `build/repoint/patch_412.py`). Blind review: no blocker, one SHOULD-FIX → his "Fix it" (patch412c); the Begin self-repair DECLINED (his 10:4x / 10:49 AM). Filed 10:55; he committed and pushed 10:54; 10:55 "plan s2 in next" → hand-over.
**Lessons.** (1) **Claude's cost estimate was low** — 412 took about 165k tokens (232k → 397k), not the 100–150k said; the subagent review alone was 165k of its own. Estimate a build from the last comparable session's actual spend, and say the number with its basis. (2) **`/tmp` on the device VM is shared with other sessions** — a redirect to `/tmp/st.txt` was refused (another session's file) and `tail` printed THAT session's old status output; write scratch files under `$HOME`, never `/tmp`, and never read a status that the run may not have written. (3) The STANDING TRAP on reused `device_commit_files` names bit again (a fixed suite part arrived as the old bytes) — the md5 check caught it; new name every time.
**Session close** 8 Nov 2026 about 11:00 AM at about 400,000 tokens; NO compaction. Uncommitted at the close: hub this close's docs (DECISIONS §372, TODO, START-HERE, HANDOFF, HANDOFF-ARCHIVE, MAP); tests CHECKPOINT-412. Test site (private) — the live pages on disk did not change, not republished. `_to_delete/` a few files — his to empty.

## 8 Nov 2026 — "Vacation Auction 8 Nov 2026 V3" — S1 + 411 + 412 FILED LIVE (NOT PUSHED) · S2 PLANNED: TWO BUILDS, S2a COMPLETE WITH ITS GO (§373)
**State.** Live unchanged: staff 244 / admin 409 / mobile 19. `testing/` serves 246 / 19 / 412 (`ddddbed`, pushed by him 10:59 AM, served twice ~11:01 AM). **FILED, NOT PUSHED: the live pages = `gated-412/` byte-for-byte** (staff `ff71dbf6` 246, admin `b3bfc2b9` 412, versions `6a57b2fe`); no rules, mail-server or console step. Test site v48 (246 / 412). **▶ NEXT SESSION: (1) confirm his push of all three repos and that he opened the live admin page once (arms `requiredBuilds` 246 / 412); fetch live and `testing/` twice each; write the LIVE line, delete the FILED line; (2) BUILD S2a — `PLAN-S2.md` §12–§13, testing first (a rules change that ADDS a document: RA-2 his, console publish on both projects before the push).**
**The session, in order.** 10:57 AM opened (§4 ritual from disk; 230,001 tokens). 10:59 his push of 412 landed; 11:03 his try: *"Good, thanks. Proceed."* 11:10 filed live: gated-412 → root, live vs `testing/` = the stamp only (whole diff read), node --check 3/3 each, test-412 48/0 and the five 410/411 split suites 0 failed on the live pages; test site republished (testsite-check 31/31; the old published copy proven equal to a rebuild from 244 / 409 first). 11:11 his "away from the Mac" → S2 planned: PLAN-S2.md draft 1 + review page "Split Weeks S2 Review"; 11:30 his answers; 12:42–12:54 the three stages; 1:12 the go; 1:13 the frozen line's place (DECISIONS §373).
**For him.** Push `vacation-kp.github.io`, `tests`, hub; open the live admin page once.
**Lessons.** (1) **`git fetch` over the bridge is refused by the device's proxy (HTTP 403)** — read GitHub's heads with `git ls-remote` from the cloud instead (it worked every time today). (2) **Republishing the test site: prove the published copy first** — a rebuild of the previous pages (`TS_OUT=… make-testsite.mjs`) matched the published files' sha256 exactly, so the publish could send only the four changed files. (3) **Diff a stamped page pair with a count first** — a whole `diff` of live vs testing printed two minified style lines (~20k tokens); count the differing lines, then show them cut to width.
**Session close** 8 Nov 2026 about 1:35 PM at about 440,000 tokens; NO compaction. Uncommitted at the close: auction (live pages, versions, BUILD-LOG); tests (PLAN-S2, CHECKPOINT-412, testsite/published.json); hub (DECISIONS §373, TODO, START-HERE, HANDOFF, MAP). `_to_delete/` holds `ts-v3.tgz` (the test-site transfer) and a few older files — his to empty.

## 8 Nov 2026 — "Vacation Auction 8 Nov 2026 V5" — S2a FINISHED, REVIEWED AND PUSHED TO THE TESTING SITE (staff 247 / admin 413 + rules, §373–§374) · HIS TRY ✅ · THE CORNER BUTTON RULED FOR THE NEXT BUILD (§375) · RULE 29
**State.** Live unchanged: staff 246 / admin 412 / mobile 19 (`a173925`). **`testing/` serves staff 247 / admin 413** — pushed by him about 9:21 PM (auction `8ded0af`, tests `5165288`, hub `324857a`) after RA-2 ✅ BOTH (640 / 0; the 12 new gates FAIL on `a462f38`) and the rules `988f2666` on both projects; served 247 / 19 / 413 twice (about 9:25 PM). His try 9:29 PM: *"all of that's working."* Live bytes in `tests/docs/split-weeks-plan/gated-413/`. **▶ NEXT SESSION: BUILD the split-request corner button — DECISIONS §375, complete (29 px bordered button in the card's top-right corner; the bell beside it, no border; both symbols about 12 px; NO LABEL OVERLAPS, measured on every combination; his phone first); then the live filing of S2a with it.**
**The session, in order.** 7:30 PM opened (§4 ritual from disk; 220,405 tokens; V5, since V4 had already used that name without a HANDOFF entry). No Mac↔cloud file tools at first; the build re-run on the device in `$HOME/w`. Every V4 script reproduced its bytes — except RA-2's assertions: two hand edits of V4 recorded nowhere, now `ra2/patch_ra2_413c.py`. Gates as V4 (196/0; honesty 8/179). 7:5x the four open points on the review page "S2a Open Questions"; a helper repointed the 11 pins (`lib413`, 0 failed on 413 and 412). 7:45 his "yes" → the file tools turned back on (via the app-browser enable); phone check on a test-site copy made from the build. 7:47 his W1 wording; 7:49 his answers (6.32 reworded) — §374. Three review helpers lost (7:53, 8:42, 9:13); his 9:13 PM *"stop the 3rd reviewer, this isn't working"* → reviewed by Claude in the chat (`s2a-build/REVIEW-S2a.md`: no blocker). ~9:16 filed for testing; 9:19 RA-2; 9:21 push. 9:30–9:40 the button (§375). 9:45 *"handoff time"*.
**Lessons.** (1) **A message to a running helper ends its run** (7:53 PM) — rule 29; booked check-ins on helpers were rejected by him (9:13 PM, *"terrible plan"*). (2) **A file in the repo mount can lock mid-write** ("Resource deadlock avoided", the second helper's report file, moved to `_to_delete/REVIEW-S2a-stuck.md`): a helper's working files belong in device scratch, copied into the repo once at the end. (3) **Every hand edit becomes a script** — V4's two unrecorded edits to RA-2's assertions broke "the scripts reproduce the build" until written as `patch_ra2_413c.py`. (4) **A testing-first filing turns some suites red on the real tree by design** (test-crna-stamp 80/4, test-410-admin-page 106/2: the testing pages and the rules run ahead of the live pages) — run them with the gated pages as the root (84/0, 108/0). And `status.mjs` reads a "FILED, NOT YET PUSHED:" line as live-pending: a testing-first filing uses the "TESTING SITE AHEAD OF LIVE" wording. (5) **The device's Mac↔cloud file tools can be absent at the start** — they came only after an `enable__mcp__remote-devices__*` call. (6) Don't pass a build's `RTJSON` to another build's suite (a false red, caught on the re-run).
**Session close** 8 Nov 2026 about 9:50 PM at about 485,000 tokens; NO compaction. Uncommitted at the close: hub (DECISIONS §375, TODO, START-HERE, HANDOFF, MAP); auction BUILD-LOG (the S2a row's push and serve lines); tests CHECKPOINT-S2a. Test site (private) — the live pages did not change, not republished. `_to_delete/` 21 files, 14.1 MB — his to empty.

