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

**⛔ NO TOKEN LINE STOPS A SESSION (§437, 13 Nov 2026: *"Remove 550 and 650 limits, they aren’t helpful."*) — instead rule 33: everything goes to the Mac as it is made, so this checklist only CHECKS. The reading is still measured (`START-HERE.md` §4, Context) and goes in the "Session close" line.**

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

**`device_commit_files` CAN WRITE THE OLD BYTES OF A FILE RE-STAGED UNDER THE SAME `stagedPath`** (11 Nov 2026 V1, seen twice: CHECKPOINT and PLAN rewritten in the cloud, committed again from the same path, the Mac got the first version with a fresh mtime). Stage every revision under a NEW name (`v2-PLAN.md`) and md5 the Mac copy after every commit.

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
- **A shell redirect to a file it cannot write prints the OLD file** (9 Nov 2026; again 14 Nov 2026): `status.mjs > /tmp/st.txt` never ran and an earlier result was read back. On the device write under `$HOME`, and check the file's time before believing it.
- **The device VM's `/tmp` does not last across calls, and its `$HOME` can be nearly full from outside the session** (9–10 Nov 2026): keep work copies in `_to_delete/xfer/` (the connected folder); clone with `file://` (packed), not `--no-hardlinks`.
- **WebFetch can be refused by github.io ("robots_disallowed")** (10 Nov 2026): then the served check is his page-load (`status.mjs` reads "LIVE, verified <how>:"); never go around it with curl.
- **Only RA-2 sees Firestore's 1000-expression limit, and its honesty step can silently test the CURRENT rules** (10 Nov 2026): a rules clause added late needs his run; compare the honesty step's counts with step 3 — identical counts, or an error line past the old file's length, mean it never loaded the old rules.
- **A suite with many standing reds hides a new one** (9 Nov 2026; six suites red on base and build, 14 Nov 2026): compare the failure LINES old vs new, never the counts.
- **A comment appended by a patch can swallow the code after it** (9 Nov 2026): when a patch adds `// …` to a line, put it last on the line.
- **Helpers return their report as their final message** (10–13 Nov 2026): their sandbox may refuse to write report files; brief them to put the whole report in the final answer.
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
  refused by the sandbox (4–5 Sep). `tests` is private: attached at the opening and cloned from GitHub (START-HERE §4 step 3, §6); only when the Mac holds
  unpushed `tests` work, tar it on the Mac (minus `node_modules`) and stage it.
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

## 10 Nov 2026 — "Vacation Auction 10 Nov 2026 V3" — 417 LIVE (his page-load) · THE FINER HEADROOM READING (§395) · SPLIT WEEKS: TRIMS PLANNED, ANSWERED AND GIVEN THE GO (§396–§400) — NOTHING BUILT
**State.** Live = 251 / 19 / 417 (`9e4339d`), served by his admin page-load 4:45 PM (WebFetch refused: robots). Uncommitted: hub (START-HERE LIVE line + rules 30–31, DECISIONS §395–§400, TODO, MAP, status.mjs), tests (`docs/split-trim/`). **▶ NEXT SESSION: BUILD THE SPLIT-WEEKS TRIMS from `tests/docs/split-trim/PLAN.md` (FINAL) + `MAP.md`, `CHECKPOINT.md` beside them (§400 GO; both sites together; the mail server `sa` lines on both projects before his push; no rules change).**
**The session, in order.** 4:01 PM opened (§4 from disk; 417 already pushed 4:00 PM). 4:05 PM his RA-2-HEADROOM block (§395). 4:09–4:16 PM split weeks "clunky… vastly simplify", staff side, finding partners stays, no admin step; a read-only walkthrough helper (19 card states, 21 buttons, 17 taps, nobody told). 4:20–4:29 PM the "Simpler Staff Design" page (propose → accept), reworded on his points (§396 voice, "Interested in a split"); 4:37 PM answers (§397) and doubt about the track; 4:42 PM TRIM FIRST (§398); 4:45 PM 417 live; 4:51–4:59 PM vocabulary, Add the matching week removed, rule 30 (§399), Change stays. A helper drafted the plan (MAP.md); 5:05 PM "Trims Plan Review"; 5:07 PM answers (§400); 5:09 PM go.
**Lessons.** (1) **Wording patched one line at a time reads as clunky** (his 4:26 PM *"the clunkiness is contiuing.  be smarter and cleaner and more clear"*) — when he objects to a screen's wording twice, rewrite the whole screen once, in one voice, before showing it again. (2) **When WebFetch is refused, his page-load is the served check** — `status.mjs` reads "LIVE, verified <how>:" (shown red on a wrong number, 416). (3) **The session file §4 names was missing again** — context from the metered totals (V2 lesson 1), an upper bound. **Session close** 10 Nov 2026 about 5:12 PM; NO compaction; at most about 480,000 tokens at the last reading.

## 10 Nov 2026 — "Vacation Auction 10 Nov 2026 V4" — THE SPLIT-WEEKS TRIMS BUILT, REVIEWED TWICE AND FILED (staff 252 / admin 418 + the mail server's `sa` line) — NOT PUSHED
**State.** Live = 251 / 19 / 417 (`9e4339d`), verified this session by WebFetch twice per site (both answered; schedule 54 / 156). FILED, not pushed: auction (staff 252 `73a16db7`, admin 418 `9d27c31e`, versions 252·19·418, `testing/` stamped, `crna-stamp.mjs`, BUILD-LOG row), tests (`server/mail/lib/mail-core.js` `97bd67c4`, `server/test/test-mail-sa.mjs`, test-252-trims, lib418, 14 repoints, `testsite/published.json`, `docs/split-trim/` SPEC + build/), hub (START-HERE FILED line, DECISIONS §401–§404, TODO, this entry). Test site v52 = 252 / 418. **▶ NEXT SESSION: (1) after his mail-server deploy on both projects and his push, fetch both sites twice, write the LIVE line, delete the FILED line; (2) his try on the testing site; then items 9–11 (§398) are planned.**
**The session, in order.** 5:10 PM opened (§4 from disk; about 175,000 tokens at the first metered reading). The plan + SPEC.md (the review answers mapped). Lane A (staff), Lane B (mail-core + admin), both checked. 5:46 PM End split stays on accepted cards (§401). Lane T (tests), the phone shots, a blind review: H1 + M1 (with no OK a declined step stays saved; a declined ending refuses bids). §402 answered three ways: OK → the page clears it itself → (after a second review found a NEW fault in the automatic clean-up, rule 21 stop) **OK, as 251**; §403 the rare 251 case left. Fix round (greyed buttons, "Week 3 · Jan 17", row kept in view, L1–L3). Phone page "Split Weeks — Build 252 on a Phone". 6:52 PM his look: "agreement" only in the 251 shots; Withdraw kept; **Add · Remove (§404)**. Filed about 7:05 PM. No helper was messaged while running. NO compaction.
**Lessons.** (1) **A phone test page that shows the OLD build beside the new one reads as the new one** — he took the 251 shots' "agreement" for 252. Show only the build being filed, or mark old shots unmistakably (a banner across the image, not a caption). (2) **Removing a tap that WRITES is a design change, not a trim** — the OK tap was the only write that cleared a declined step; the plan called it display only. Before removing any button, ask what its handler writes. (3) **A background writer that runs on data arrival meets half-loaded data** — the automatic clean-up could act before the admin's record arrived. Prefer a tap after the page is loaded, or gate on the board being ready. (4) **A wording edit to an approved rules item breaks every suite that pins that text** (lib418's RULES_418, test-252-trims) — change the page and the pins in one step and re-run the Rules suites. **Session close** 10 Nov 2026 about 7:10 PM; NO compaction; about 490,000 tokens at the last reading (upper bound, metered).

## 10 Nov 2026 — "Vacation Auction 10 Nov 2026 V5" — 252 / 418 LIVE · SPLIT WEEKS: ONE WEEK PER BOX — TEST PAGE, PLAN, ANSWERS AND THE GO (§405–§406) — NOTHING BUILT
**State.** Live = 252 / 19 / 418 (`e0d1f98`), WebFetch twice per site (each under its own address, 7:03 PM) and his admin page-load by 7:12 PM; the mail server's `sa` line on both projects about 7:10 PM (after his 7:01 PM push). Uncommitted: hub (START-HERE LIVE line, DECISIONS §405–§406, TODO, MAP, this entry), auction (BUILD-LOG: 252's commit), tests (`docs/split-box/`). Test site — no page changed, not republished (carries 418 / 252). **▶ NEXT SESSION: BUILD from `tests/docs/split-box/PLAN.md` (FINAL, §9 ANSWERS win) + `MAP.md`, keeping `CHECKPOINT.md` — its first step is the Fair Play facts check (PLAN §7).**
**The session, in order.** 7:02 PM opened (§4 from disk). 7:07 PM *"neither"*: pushed at 7:01 PM before the mail deploy and the page-load → told the gap (the old server drops `sa` lines for good) → his steps 1–2 by 7:12 PM; the LIVE line. 7:14–7:23 PM trying 252 on the testing site: "The split ended." note, the scrolling (7:20 PM *"leave as it is for now"* → TABLED), Add beside Send, *"this is just more of this all being confusing"* · *"it's not well designed"*. 7:24 PM no card clutter, no admin step; 7:26 PM the phone test page "One Week per Box"; 7:30 PM the "I'm interested" tick; 7:32 PM *"this is better"*, Change split dropped, *"plan all of it"* (§405). A read-only mapping helper (item 9 needs one rules condition, R 437); PLAN DRAFT 1 and the review page 7:54 PM; 8:31 PM every answer as recommended and the GO (§406). No helper was messaged while running.
**Lessons.** (1) **A redirect to the device VM's `/tmp` fails (not writable), but an OLD file of the same name can sit there** — the first `status.mjs` "run" printed a 9 Nov file's failures (415 / 249) while the command never ran. Write gate output under `$HOME` and read the command's own exit code (rules 8, 11). (2) **Read his push steps before writing the LIVE line** — 252 was pushed before the mail-server deploy; ask which steps ran, then write. (3) **Trim-first did not fix a box doing four jobs at once** — when he calls a trimmed screen confusing again, show one simpler whole design on a phone test page before any more trims (rule 21). **His RA-2 run, 8:36 PM** (on today's rules `65ce6476`, before any build): 721 passed, 0 failed; honesty 48 of 48 new gates FAILED on the old rules — ✅ BOTH. The build's rules change (PLAN §3.1) still needs its own RA-2 run. **Session close** 10 Nov 2026 about 8:40 PM; NO compaction; about 510,000 tokens at the last reading (an estimate — the session file was missing; the metered upper bound at the opening was 255,000).

## 10 Nov 2026 — "Vacation Auction 10 Nov 2026 V6" — THE CONTEXT READING AND THE `tests` CHECK FIXED; RULE 32 (§407) — NOTHING BUILT
**State.** Live = 252 / 19 / 418 (`e0d1f98`), WebFetch twice per site, each under its own address (8:36 PM; schedule 54 / 156); HEAD = origin on all four repos (`tests` `7644b50` by `ls-remote` from the cloud, once attached). Uncommitted: hub only (START-HERE §4 context + step 3 + §6 + rule 32, SESSION-START line 0, DECISIONS §407, TODO STATUS, MAP, this entry, and V5's RA-2 line). Test site — no page changed, not republished (carries 418 / 252). **▶ NEXT SESSION: BUILD from `tests/docs/split-box/PLAN.md` (FINAL, §9 ANSWERS win) + `MAP.md`, keeping `CHECKPOINT.md` — its first step is the Fair Play facts check (PLAN §7). Open on the new start message (line 0 attaches `tests`).**
**The session, in order.** 8:35 PM opened (§4 from disk). The context reading UNKNOWN: the session file is gone and the workspace restarted at about 8:37 PM with a new session ID. 8:38–8:41 PM his *"fix the unknown context"*, *"fix it now and prevent the problem from recurring"* (both the context and `tests`) → §4 reads the metered totals (`explain-usage`: cache reads ÷ requests + all cache writes, at most N); rule 32. `tests`: the cloud had no sign-in; two attach attempts refused by the safety check; 8:45 PM his *"attach anesthesia-kp/tests"* · *"attach to this session and all future sessions"* → attached, cloned, `7644b50` = GitHub = disk; SESSION-START line 0; §6 and STANDING TRAPS no longer tar `tests`. 8:49 PM the reading at most about 345,000 → the split-box build (about 315,000 in V4's like build) held for a fresh session; his *"yes"* to the hand-over. No helper used.
**Lessons.** (1) **The metered reading is an upper bound that loosens as a session grows** (cache reads ÷ requests sits below the true figure, all cache writes above it): 8:49 PM it read at most 345,000 against a true figure nearer 250,000. A build is judged on the bound (§4: in doubt, it waits). (2) **The cloud attaches a private repo only on his own words** — the safety check refused Claude's two attempts and passed his line; hence line 0 of the start message. **Session close** 10 Nov 2026 about 8:52 PM; NO compaction; at most about 345,000 tokens at the last reading (metered, 8:49 PM).

## 10 Nov 2026 — "Vacation Auction 10 Nov 2026 V7" — BUILD 253 / 419 BUILT, REVIEWED, FIXED, FILED AND LIVE ON BOTH SITES (+ rules + mail server) · SPLITS ONLY WHILE BIDDING IS OPEN AND THE WEEK BOX REDESIGN RULED FOR THE NEXT PLAN (§408) · RULE 29 WIDENED (§409)
**State.** Live = 252 / 19 / 418 (`e0d1f98`, WebFetch twice per site, each under its own address, 8:52 PM); HEAD = origin on all four repos at the opening. FILED (not pushed): staff 253 `09bc21f3`, admin 419 `1cde6005`, rules `525bc26f`, mail-core `178e837d`, versions `c4950f73`, `testing/` stamped; test site v53 carries 253 / 419 (`published.json` `01c97225`). Uncommitted: all three repos (BUILD-LOG row, COMMIT-MESSAGE ×3, `Claude outputs/COMMIT-MESSAGES.txt` and `firestore-rules.txt`). **LIVE:** RA-2 ✅ BOTH 10:28 PM; rules on both; mail on both 10:30 PM; pushed about 10:33 PM (`2b08f7b`, tests `b7e5dbc`, hub `d9e1cba`); served 253 / 19 / 419 twice + `testing/`; his admin page-load 10:33 PM. **▶ HIS STEP:** try it on the testing site. **▶ NEXT SESSION: PLAN the follow-up build** (TODO §1 / DECISIONS §408) — planning only (rule 25).
**The session, in order.** 8:51 PM opened (§4 from disk; `tests` attached by line 0). Step 1 the Fair Play check: no facts row expected. Lanes A (staff) and B (admin, rules, mail, RA-2) in parallel, then C (test-253-box + 12 repoints) and D (one blind review: no HIGH; M1–M4, L1–L9 → `tests/docs/split-box/REVIEW-1.md`). 9:29–10:00 PM his rulings (§408): the ending's cap line "Without the split, …"; ☰ count per split; declined splits keep one OK tap; splits only while bidding is open (tick too, page and rules); the week box design; proposals about the split or week; the partner's refusal line. 9:46 PM his *"can we wrap up this build to complete something and then hand over?"* — fix round 1 (M1, the cap line, L4) only; the rest to the next plan. 10:10 PM rule 29 widened (§409). Filed about 10:30 PM, md5-verified.
**Lessons.** (1) **Mid-build design rulings are a re-plan, not a fix round** — five rulings arrived during one build; the scope was held to the plan and the rulings filed for the next (rules 21, 25). (2) **A partner's tap runs the bidder's follow-ups** — the timer must be judged for the BIDDER (M1); the honesty core caught it on its own. **Session close** 10 Nov 2026 about 10:35 PM; NO compaction; at most about 481,000 tokens at the last reading (metered, 10:22 PM).

## 10 Nov 2026 — "Vacation Auction 10 Nov 2026 V8" — BUILD 254 / 420 PLANNED, BUILT, REVIEWED, FIXED AND FILED OVERNIGHT (+ rules + mail server) — NOT PUSHED · "OPEN A WEEK" AND "END SPLIT / KEEP SPLIT" RULED (§410)
**State.** Live = 253 / 19 / 419 (`2b08f7b`; WebFetch twice per site, each under its own address, 10:36 PM); HEAD = origin on all four repos at the opening. FILED (not pushed) about 12:10 AM: staff 254 `1f5bd460`, admin 420 `c0a7b756`, rules `de42a03c`, mail-core `908d8c9e`, versions `22cf60dd`, `testing/` stamped; test site v54 = 254 / 420 (`published.json` `ae87f124`). **▶ HIS STEPS:** TODO §1 top line (RA-2 → rules on both → mail on both → push → admin page-load). **▶ NEXT:** his review of PLAN §8 (Claude's choices) and his try on the testing site.
**The session, in order.** 10:35 PM opened (§4 from disk; `tests` attached by line 0). 10:38 PM his order: plan and build tonight on prior decisions, with helpers (rule 25 set aside for this build at his word). Planner → PLAN.md (17 choices in §8). 10:43 / 10:47 PM two owner-found items, ruled (§410): "Open a week"; End split / Keep split. Lanes A (staff) and B (admin, rules, mail, RA-2) in parallel; C (test-254-follow + 16 repoints + lib420) and D (one blind review: no HIGH; M1, L1–L5) in parallel; fix round 1 (M1, L1, L2, L4); C2 (fix assertions, full re-run). Gates: test-254-follow 170/0, 60/110 exit 1 on `2b08f7b`; 20 suites + mail-sa green; 401-outbox-admin-results 170/2 as on 253/419 (pre-existing). Stamp, testsite-check 31/31, test site published v54. Filed by one zip, 37 files md5-verified. HANDOFF archive pass (four entries of 7–8 Nov).
**Lessons.** (1) **An owner-found item that lands while a helper runs goes into the brief as an addendum, for the NEXT helper** (rule 29) — both §410 items reached the build that way with no helper interrupted. (2) **The cloud `testsite-check` needs the script's own `CHROMIUM_PATH=/usr/bin/google-chrome`** — the battery's playwright symlinks point at another Chromium build. (3) **`publish_files` needs the artifact's UUID slug** (`get_artifact` gives it), not the short id in the URL. **Morning (6:16–6:30 AM, nothing built — his "any fixes are for the next session"):** his review-page answers (C2, C3, C15, A3), his 6:24 AM question (the bid stays when a split ends) and the 6:25 AM owner-found (admin views do not mark splits) measured by read-only helpers and filed as DECISIONS §411 for the next plan; 254 safe to push as filed. **Session close** 11 Nov 2026 about 6:30 AM; NO compaction.

## 11 Nov 2026 — "Vacation Auction 11 Nov 2026 V1" — 254 / 420 SERVED VERIFIED · BUILD 255 / 421 PLANNED, ANSWERED, BUILT, REVIEWED, FIXED AND FILED (+ rules + mail server) — NOT PUSHED · THE CONTEXT LINES MADE SOFT (§414)
**State.** Live = 254 / 19 / 420 (`0abdff4`; WebFetch twice per site, each under its own address, 6:41 AM); HEAD = origin on all four repos at the opening. FILED (not pushed) about 12:58 PM: staff 255 `e99a9a55`, admin 421 `4b20adcb`, rules `5528db2f`, mail-core `7ba49452`, versions 255 / 19 / 421, `testing/` stamped; test site v55 = 255 / 421. 46 files by one zip, md5-verified. **▶ HIS STEPS:** TODO §1 top line (RA-2 → rules on both → mail on both → push → admin page-load). **▶ NEXT:** his try on the testing site.
**The session, in order.** 6:39 AM opened (§4 from disk; `tests` attached by line 0). 6:44 AM his "plan AND build this session, use helpers". Planner → `tests/docs/split-follow/PLAN.md`; review page (5 Q, 3 Rules items, 20 choices). 10:51–10:53 AM the tick before Phase 1 and between phases (§412, "Both"). 11:02 AM his answers (§413); C16 withdrawn — the Dashboard's cards / grid and its export are code no screen shows (PLAN §12). 11:11 AM the go; 11:13 AM the context lines made soft (§414); 11:14 AM his override. Lanes A (staff), B (admin), C (rules, RA-2 copy, mail) in parallel; D (test-255-follow + 26 repoints) and E (one blind review: no HIGH / MEDIUM, L1–L5) in parallel; 12:15 PM his "Do it all" (§415); F the fix round (L1, L2, L3, L5, the admin-remove note, 6.35); phone test page "Split Weeks Follow-up — Boxes (test page)" https://claude.ai/artifact/Ejrvc63Y33rbDN5kAB76UU; G stamp, testsite-check 31/31, zip; test site published v55; filed.
**Lessons.** (1) **A class hunt lists only views a button or menu reaches** — the planner put three hidden / unreachable views in the class and Claude relayed them without checking (his "None of this is true"); PLAN §12 and the rule in the plan. (2) **`device_commit_files` can write the old bytes of a re-staged file** — stage each revision under a new name, md5 after (STANDING TRAPS). (3) **21 suites are red on the unchanged 254 / 420** (old pins, restore fixtures without the split documents, missing inputs) — the same 21 on 255 / 421; known, not new. **1:01–1:20 PM:** his "The cancels read poorly" → every split box's no-button "Not now" (§416; "I don't like double negatives"; phone page "All looks good"); Lane H re-filed staff `cdb7e808` + 6 suites + `testing/` + BUILD-LOG; test site v56; 10 files md5-verified. **9:27–9:30 PM:** RA-2 ✅ BOTH (his run, 9:28 PM); his order that a changed rules file is SENT as an output in the chat every time, never pasted as text (§417, START-HERE §3); `firestore-rules.txt` sent. **Session close** 11 Nov 2026 about 9:31 PM; NO compaction; at most about 631,000 tokens at 12:40 PM (metered) — past 650,000 by the close under his override (§414).

## 11 Nov 2026 — "Vacation Auction 11 Nov 2026 V2" — 255 / 421 LIVE (served verified, his page-load) · SPLIT WORDING RULED (§418–§420) · BUILD 256 / 422 PLANNED, ANSWERED AND GIVEN THE GO (§421) — NOTHING BUILT
**State.** Live = 255 / 19 / 421 (`de0c316`; WebFetch twice per site, each under its own address, 9:35 PM; his admin page-load 9:36 PM); schedule 54 / 156; HEAD = origin on all four repos (tests `da250a6`, ls-remote). Nothing filed. **▶ NEXT SESSION: BUILD staff 256 / admin 422 + mail server from `tests/docs/split-wording/PLAN.md` §1–§11 (CHECKPOINT.md beside it) — the go is given (§421), nothing to ask him.**
**The session, in order.** 9:33 PM opened (§4 from disk; `tests` attached by line 0). 9:36 PM his testing of 255 began: the pronouns ("I bid looks off"), 9:38 PM the Change Log must show a split bid (owner-found), 9:40–9:46 PM names: the other person's full name first, then initials; the user by initials (§418–§419), 9:48 PM the User Summary dates, 9:49 PM the schedule question (split weeks do not reach it correctly — TODO's pile, hand-worked). 9:52 PM the review page "Split Wording Review (§418–§419)" https://claude.ai/artifact/QB43eT3o7jiFht8BZBLibS (38 lines + H1 / H2, every "now" line read from staff 255 / mail-core); 10:05 PM his answers, then C1, D3, E3, E4, E5, E7, E12 in the chat (§420); 10:21 PM his "go" to plan; PLAN.md + CHECKPOINT.md written to `tests/docs/split-wording/` (md5-verified); 10:26 PM Q1–Q3 answered, 10:29 PM the go (§421). 10:30 PM his "handoff".
**Lessons.** (1) **A review page's numbers are his** — Claude dropped an item and renumbered E7–E13 before publishing, then read his answers by the old numbers (E12 misread; corrected 10:17 PM); rule 26 now says never renumber. (2) **Four chips per line confused him, and a pre-selected OK is not an answer on a line he did not understand** — rule 26: two choices per line. (3) **The Mac's `/tmp` refuses writes from `device_bash`** (`Permission denied`): a `node status.mjs > /tmp/…` run never started and an OLD log was read back as its result — write logs under `$HOME`. (4) **Read a rule's reason in the code before restating it** — on E4 Claude first said a former partner "could be allowed to bid"; the code (`getPriorPhaseWinners`, 410 Q2) already stops a partner bidding there again. **Session close** 11 Nov 2026 about 10:40 PM; NO compaction; at most 565,216 tokens at 10:29 PM (metered).

## 11–12 Nov 2026 — "Vacation Auction 11 Nov 2026 V3" — BUILD 256 / 422 BUILT, GATED, REVIEWED AND FILED (+ mail server) — NOT PUSHED · THE LIVE CHECK'S ADDRESSES IN THE START MESSAGE (§422)
**State.** Live = 255 / 19 / 421 (served verified, WebFetch twice per site, own addresses, 10:41 PM); schedule 54 / 156; HEAD = origin on all four repos at the opening. FILED, not pushed: auction (staff 256 `68d175cb`, admin 422 `0fb7c2ac`, versions 256 · 19 · 422, `testing/` stamped, BUILD-LOG row), tests (mail-core `4e07a7fa`, test-256-wording, lib422, 21 repoints, test-mail-sa, `published.json`, `docs/split-wording/` GATES + REVIEW-256 + text/rules-text.json), hub (START-HERE FILED line, §4 step 2 + rule 32 note, SESSION-START line 3, DECISIONS §422, TODO, this entry). Test site v57 = 256 / 422. **▶ NEXT SESSION (Claude's recommendation, not ruled): a TODO §1 tidy pass — check every line against the BUILD-LOG, tick what shipped, and put the real open list to him on a review page (rule 26); stale lines misled this session (the timer bar, shipped in 417). His own step: try 256 / 422 on the testing site.**
**The session, in order.** 10:33 PM opened (§4 from disk; `tests` attached by line 0). The four live-check fetches waited for approval (addresses built from disk) — 10:41 PM his message let them through; 10:42–10:43 PM his "yes" to carrying them in the start message (§422, done). 10:50 PM the build began from PLAN.md with helpers: lanes A (staff), B (admin), C (mail-core) in parallel, then D (tests) and E (blind review) in parallel; fix round = REVIEW-256 L2 (code comments, comment-only diff read); the tests clone deepened so 254-follow / 255-follow read their old mail-core refs (green); stamped, test site republished (v57), filed by one zip, 39 files md5-verified on the Mac.
**Lessons.** (1) **An address Claude builds is not in the chat** — the fetch tool asked for approval and the opening stalled; the start message now carries the four (§422). (2) **A shallow `tests` clone turns the follow suites red** (they `git show` older mail-core commits) — deepen it (`git fetch --depth=1000`) before reading their reds as old. (3) **A later ruling on an exact line outranks an earlier general one** — G1 "<Full name> proposed a split." reverses §408's "about the split" wording; he approved that exact line (§420), so two [420] checks were rewritten as invariants of the new form, not deleted. **Filed** 11 Nov 2026 about 11:55 PM; NO compaction; at most 450,424 tokens (metered) after filing. 12 Nov 2026: 6:08 AM his mail-server deploy on both projects (screenshot: "Deploy complete!" on crna-vacation and vacation-25e8e); 6:09 AM his push (auction `899b645`, tests `d76da79`, hub `d708fe1`); 6:10 AM served 256 / 19 / 422 verified (WebFetch twice per site at the start message's four addresses — no approval asked, §422 works); LIVE line written, FILED line deleted; 6:13 AM his admin page-load ("done"). TODO §1's split-weeks lines settled by 253 / 256 marked done. 6:16 AM his *"timer save bar is fixed"* — Claude had named it as next from TODO's line without reading the BUILD-LOG (rule 14); it shipped in admin 417 (§393); both timer lines marked done. 6:18 AM his *"any other items on todo?"* — the queue read: many lines are shipped records never ticked; the tidy pass recommended. 6:19 AM his *"handoff"*. Lesson (4): **TODO §1's lines are not the state — before naming anything "next", read its BUILD-LOG row** (rule 14). **Session close** 12 Nov 2026 about 6:22 AM; NO compaction; at most 664,908 tokens (metered, 6:15 AM) — over the 650k line, so he was recommended to hand over.

## 12 Nov 2026 — "Vacation Auction 12 Nov 2026 V1" — ADMIN 423 LIVE (THE WEEK CAPACITY CARD + "BACK TO SETTINGS", §423 / §425) · TODO §1 TIDY (§424) · SPLIT-WEEKS MEGA FUZZ CLEAN
**State.** Live = staff 256 / mobile 19 / admin 423 (auction `9fcddc0`, pushed about 6:55 PM; his admin page-load 7:01 PM showed 423), schedule 54 / 156; hub `aa4fcce`, tests `864f434`; HEAD = origin on all four. Test site v59 = 256 / 423. Pending his push: two docs commits (vacation BUILD-LOG row → `9fcddc0`; hub LIVE line, TODO, this entry). TODO §1 now: the rules headroom (T14, open idea) and one idea of Claude's ("Back to Settings" clears when leaving by the menu). **▶ NEXT: nothing ruled — his pick.**
**The session, in order.** 6:22 AM opened (§4 from disk, `tests` attached by line 0; 256 / 19 / 422 served). 6:31 AM his tidy pass + the Week Capacity card idea + a fuzz; 6:35 AM "build here" (§423; the fuzz is of split weeks). Helpers: the TODO §1 sort (79 entries, 73 finished), the split-weeks fuzz (26 runs, ≈869,000 boards / auctions, 0 failures), the gates (40 suites base vs build, 11 pins repointed via `lib423.mjs`, two reds settled: the button id dropped, test-404-a3 D1 repointed). 6:51 AM his "great" → the tidy applied (§424, every paragraph accounted for). About 7:15 AM 423 filed (test site v58). 1:42 PM his "Back to Settings"; over the 650k line Claude recommended 424 next session — 1:47 PM his override, folded into 423 (§425); re-gated (test-423 30/0, honesty 6/24 exit 1, every suite = base, K2 repointed), test site v59, refiled about 2:05 PM. 6:55 PM his push; 7:01 PM his page-load "says 423"; LIVE line written, FILED line deleted.
**Lessons.** (1) **After a push, WebFetch read 422 eight times over six minutes** (the start message's four addresses and four fresh ones) while the page showed 423 — his page-load settled it; a stale read is not "not deployed". (2) **A helper could not publish the test site** (the permission check refused it) — the main session publishes; helpers build and check only. (3) **Write device-side logs under `$HOME`, never `/tmp`** — a refused `/tmp` redirect left an OLD log that read like a fresh run (it named admin 419). (4) **status.mjs reads the LIVE line only in the shape "LIVE, verified <how>, <date>: auction admin …"** — keep "verified" and the how. (5) A long pause re-writes the whole cache: the metered reading jumped twice (482k → 686k → 950k), most of it re-writes, not new work. **Session close** 12 Nov 2026 about 7:10 PM; NO compaction; at most 950,340 tokens (metered, 7:02 PM) — over the 650k line (the §425 build by his override).

## 12–13 Nov 2026 — "Vacation Auction 12 Nov 2026 V2" — ADMIN 424 LIVE ("BACK TO SETTINGS" GOES WHEN WEEK CAPACITY IS LEFT) · THE LIGHTER SPLIT RULES BUILT, RA-2 GREEN WITH THE ROOM CHECK, PUBLISHED ON BOTH PROJECTS (§426–§429) · RULE 32: LIVE-CHECK ADDRESSES END IN THE PUSHED COMMIT (§428)
**State.** Live = staff 256 / mobile 19 / admin 424 (auction `56e075c`; his admin page-load 424, 10:24 PM). The lighter split rules `a5620f15` published on both projects by him 13 Nov 6:17 AM; filed about 6:20 AM, not pushed when the session ended — pushed by him 13 Nov about 6:30 PM (vacation `c4413f7`, tests `b80b662`), its paperwork written by session "Vacation Auction 13 Nov 2026 V1" from this session's zip (`rules-429-files.zip`, `HANDOFF-NOTE-V2.md`).
**The session, in order.** 12 Nov 8:46 PM opened. WebFetch read admin 422 at the start message's fixed addresses (stale) → rule 32 fixed without Chrome, §428 (the addresses end in the pushed commit; SESSION-START line 3 changed). §426: the headroom re-measured on the live rules (tightest 1–9). §427: his "agreed" + "build here with helpers" (rule 25 overridden): admin 424 built by a helper, blind review SAFE, live `56e075c`; the lighter split rules by a helper, merged onto 424's test files (the helper had started from the pre-424 tests — test-254 / test-255 changed by both), blind review SAFE. 13 Nov ~6:11 AM his RA-2 all four green with the new room check; ~6:16 AM his RA-2-HEADROOM (least room 45–49); 6:17 AM "rules published" on both projects (§429). About 6:12 AM the link to the Mac dropped; the filing went to the next session by zip.
**Lessons.** (1) **Fixed WebFetch addresses go stale for good** — §428. (2) **Two helpers building from the same base must not both edit one test file** — the second's edits had to be re-applied onto the first's. (3) **On 13 Nov the link to the Mac dropped (a connection error, not the Mac asleep)** — the filing went to the next session by a zip with a hand-over note. **Session close** 13 Nov 2026 after the filing (about 6:20 AM, by zip); NO compaction; about 535,000 tokens at the close (estimated), under 550k.

## 13 Nov 2026 — "Vacation Auction 13 Nov 2026 V1" — V2'S PAPERWORK FILED FROM ITS ZIP · THE LIGHTER SPLIT RULES PUSHED (§429) · THE TABLED LIST RULED (§430) · THE STARTUP COST: LAST REVISED CUT, CONNECTORS OFF (§431)
**State.** Live = staff 256 / mobile 19 / admin 424 (served verified, WebFetch at both commit addresses per site, 6:29 PM); schedule 54 / 156; the lighter split rules `a5620f15` published on both projects and pushed (vacation `c4413f7`, tests `b80b662`, 6:30 PM; paperwork `dfe7f33` / `feece5f` / hub `f607da4`, 7:01 PM). Pending his push: hub only (DECISIONS §430–§431, TODO, START-HERE, START-HERE-ARCHIVE, MAP, this entry). **▶ NEXT SESSION: compare its opening reading (after the §4 ritual) with 255,882 (§431), then close TODO §1's top line.** Queued, not planned: three sets of sites (§430).
**The session, in order.** 6:21 PM opened (§4 from disk; `tests` attached by line 0). The zip named in the start message was not attached — said and stopped; 6:29 PM attached. HANDOFF-NOTE-V2 step 1: the two pushes it expected had not happened — said and stopped; 6:30 PM his push; the zip's files written with the push commit (md5 each; `RA-2.command` lost its run permission on writing — restored), CHECKPOINT closed, three oldest HANDOFF entries archived, V2's entry written. 7:06 PM his tabled items; 7:08 PM his rulings (§430). 7:10 PM the startup cost measured and put to him; 7:30 PM *"i think we do 1 and 3, skip 2"* (§431): START-HERE 66,400 → 53,138 characters; 7:35 PM he disconnected Gmail and Claude Docs.
**Lessons.** (1) **Read a build's BUILD-LOG row before saying an item was never done** — a keyword search missed that staff 253 ("one week per box") answered the scrolling item; he caught it ("fixed"). (2) **`device_commit_files` drops a file's run permission** — `chmod 755` after writing any `.command` and check git sees no mode change. (3) **The app's own instructions are about 65% of a session's use** — our files can cut only a few percent (§431). **Session close** 13 Nov 2026 about 7:38 PM; NO compaction; at most about 380,000 tokens (metered 7:31 PM, 59 requests).

## 13 Nov 2026 — "Vacation Auction 13 Nov 2026 V2" — THE LIVE AUCTION CHECKED ON ITS REAL DATA: NO RISK (§432) · BUILD 425 PLANNED AND APPROVED: FINISH OFFERS A BACKUP FIRST (§433) · THE STARTUP-COST LINE CLOSED (§431)
**State.** Live = staff 256 / mobile 19 / admin 424; schedule 54 / 156 (served verified 7:40 PM, WebFetch at both commit addresses per site). No page, rules or server change this session. Pending his push: hub (DECISIONS §431 result, §432, §433, TODO, MAP, this entry) and `tests` (`docs/live-check-2026-11-13/`, `docs/build425-plan/`). **▶ NEXT SESSION: build admin 425 from `tests/docs/build425-plan/PLAN.md` — GO given (§433, his *"ok to all"*), all three questions answered.** The three-sites item is tabled by him (*"hold that for later"*).
**The session, in order.** 7:37 PM opened (§4 from disk; `tests` attached by line 0). The live check's first WebFetches timed out unapproved; his *"yes"* 7:40 PM, re-run: both sites match disk. Opening reading at most 216,545 against V1's 255,882 → TODO's startup-cost line closed (§431). 7:45 PM his request to be certain the live auction still works; plan 7:47 PM; 7:49 PM he attached the live backup; 7:51 PM *"do all of it here"* (rule 25 overridden, §432). Sandbox built (real pages on the `tests/sweep` fakes, seeded with the backup — builder `make-real-site.mjs` filed beside the result); three helpers (A results as 211 / 373 showed them, B settings never saved, C Phase 4 to the finish), each finding checked in code by Claude; ~8:55 PM result: no risk, one question (Finish has no backup offer). 9:45 PM *"plan it"*; 9:47 PM *"ok to all"* (§433).
**Lessons.** (1) **Helpers cannot write their report files** — all three were refused ("subagents should return findings as text"); the report comes back as the final message, so a brief should ask for it there, and the lead files what matters. (2) **The live backup is the best test data there is** — the sandbox replay found what synthetic seeds cannot (old-auction defaults, real refusals); keep the real file out of every repo and name people by initials only. (3) **`tests/sweep/phase-runthrough.mjs` predates builds 394 / 395** (round functions renamed, no Finish, the month picker, outbox mail) — lane C's adapted runner lived in the cloud only; refresh the repo's copy before relying on it.
**Session close** 13 Nov 2026 about 9:52 PM; NO compaction; at most about 443,711 tokens (metered 9:51 PM, 79 requests; the three helpers ran on their own, not counted here). Closing checklist: 0 fetch (all in sync) · 1 chat reviewed (§431 result, §432, §433, the tabled three-sites item) · 2 `status.mjs` exit 0, no build so START-HERE and BUILD-LOG unchanged · 3 no code changed, no battery · 3a test site — no page changed, not republished · 4 hub 3 files + this entry, `tests` 2 new folders · 4a `_to_delete/` about 274 MB, his to empty · 5 handed over.


## 13–14 Nov 2026 — "Vacation Auction 13 Nov 2026 V3" — ADMIN 425 (FINISH OFFERS A BACKUP FIRST) AND STAFF 257 / ADMIN 426 (SPLIT WORDING IN "YOU", §435–§438) BUILT AND LIVE · THE 550,000 / 650,000 LINES REMOVED; RULE 33, FILE TO THE MAC AS THINGS PROGRESS (§437)
**State.** Live = staff 257 / mobile 19 / admin 426 (`2fe1b0d`, verified at the pushed commit on live and `testing/`, 7:37 AM 14 Nov); mail server deployed by him to both projects 7:35 AM; tests `0ab553d`, hub `d087967` + this hand-over's commit. Records: BUILD-LOG rows 425 and 257 / 426; `tests/docs/build425-plan/`, `tests/docs/split-you/` (PLAN, CHECKPOINT, build.py, scratch zip). Test site v62 = 257 / 426. Nothing queued in TODO §1.
**The session, in order.** 10:00 PM opened (§4 from disk; reading at most 226,420). 425 built from V2's plan, gated (helper repointed 8 suites, lib425), filed 10:22 PM. 10:07 PM his split-message screenshot → §435 ("you", his pick), the 24-line review page, all OK 10:15 PM (§436), Y23 corrected 10:19 PM. 10:25 PM §437 (lines removed, rule 33, plan and build here); plan + Q1 both together / Q2 6.35 (§438); 257 / 426 built, two helpers (test-257-you; 19 repoints, lib426), filed 10:55 PM. 14 Nov 7:35 AM his mail deploy; 7:36 AM his push.
**Lessons.** (1) **Read the code before explaining a line on a review page** — Y23's note said "My bid" was the other person's; the e-mail goes to the bidder, so it was the reader's (corrected before the build). (2) **Cite the NEWEST ruling on a subject** — Claude first quoted §396 (first person) for split wording when §419 governed it. (3) **Some suites read pages from their own folder's parent, not GH_ROOT** (test-394) — run a build's battery from a real root holding a `tests` copy beside the pages. (4) **The sweep sandbox's Next Step box needs a capacity for every week** before it shows the workflow buttons. **Session close** 14 Nov 2026 about 7:40 AM; NO compaction; at most about 702,000 tokens (metered 13 Nov 10:57 PM, 161 requests; helpers not counted). Closing checklist: 0 all four repos = origin · 1 chat reviewed (§435–§438, Y23, rule 33) · 2 `status.mjs` exit 0 · 3 batteries as in the BUILD-LOG rows · 3a test site 257 / 426 · 4 hub only uncommitted (this hand-over) · 4a `_to_delete/` about 274 MB, his to empty · 5 handed over.

## 14 Nov 2026 — "Vacation Auction 14 Nov 2026 V1" — STAFF 258 / ADMIN 427 PLANNED, BUILT AND LIVE (SPLIT DATES, A SPLIT'S HALF IN THE HISTORY, THE SIMULATOR FIX, THE CHECK FTE TABLE) · RULES 25 AND 26 CHANGED · NEXT: THE THREE SETS OF SITES (§451)
**State.** Live = staff 258 / mobile 19 / admin 427 (`b026001`, verified at the pushed commit on live and `testing/`, about 10:07 AM 14 Nov); mail server deployed by him to both projects 10:05 AM; tests `65d6be7`, hub `d05a122` + this hand-over's commit. Records: BUILD-LOG row 258 / 427; `tests/docs/split-dates/` (PLAN, CHECKPOINT, build.py, REVIEW, REVIEW-2, PHONE-TEST, scratch zip). Test site v63 = 258 / 427. **▶ NEXT SESSION: PLAN the three sets of sites (TODO §1 top line, DECISIONS §451 / §386).**
**The session, in order.** 7:40 AM opened (§4 from disk; reading at most 221,166). 7:42–7:44 split interest: admin has no control — left as is (§439). 7:52–8:28 split dates: review page (§440; OK / Change confusing → rule 26 buttons name the outcome, §441), his answers (§442; S6 kept as the one exception to "others never see the days"), the half-week defect in View previous phases (+ bid confirm, ½W / ½L), the five questions (§443). 8:29 "build here" (§444) and rule 25 → offer build here or next session (§445). Mid-build: no dates on week cards (§446), the simulator gave a split's partner a bid (§447, owner-found; the stray bid left, §448), initials in the two new lines (§449), the check FTE table shows Available, drops "In Phase 3" (§450). One helper repointed 23 suites (lib427); Claude re-ran them on the final bytes. Filed about 10:00 AM; his deploy and push 10:05 AM. §451 the next session's work.
**Lessons.** (1) **A guard written in many places can miss one** — every bid path counted a split's partner as holding the week except the simulator, which read the approvals lists alone; when a rule about "who holds a week" changes, grep every reader of approvals for it. (2) **Answer buttons must name the outcome** — "OK" meant "add" on some lines and "leave" on others (rule 26 now says so). (3) **Mid-build changes stay safe when build.py stays the source** — after each of four changes, a clean rebuild from `757bd3a` gave the scratch bytes exactly. (4) **Six suites are red on base and build alike** (stale pins: 393, 399-users, 401, 409, 410-admin-core, 412) — known, not this build's; compare their failure lines. **Session close** 14 Nov 2026 about 10:12 AM; NO compaction; at most 887,086 tokens (metered 10:08 AM, 229 requests; the helper's 367,464 not counted). Closing checklist: 0 all four repos = origin · 1 chat reviewed (§439–§451 on disk) · 2 `status.mjs` · 3 batteries as in the BUILD-LOG row · 3a test site v63 = 258 / 427 · 4 uncommitted: hub (this hand-over), auction (BUILD-LOG served), tests (CHECKPOINT) · 4a `_to_delete/` his to empty · 5 handed over.
