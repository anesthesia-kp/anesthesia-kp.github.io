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


**PROMOTED 22 Oct 2026 (V2), from the 15–16 Oct V4 and 16 Oct V1 entries as they were archived:** (1) **COUNT THE RULES' DOCUMENT-ACCESS CALLS BEFORE PUTTING WRITES IN ONE TRANSACTION** — Firestore sums them over the transaction (limit 20; over = permission-denied, which a page reads as "closed"); RA-2 is the proof. (2) **AN INTERRUPT OR A CONTAINER RESTART STOPS AGENTS MID-EDIT** — before going on, read what each stopped agent last wrote (`git diff`), and a resumed agent checks its own last write first. (3) **AN INVARIANCE GATE MUST COVER THE ADMIN'S DERIVED VIEWS** (Fair Play, reports), not only the bidder's page. (4) **DELEGATE THE READING, NOT ONLY THE WRITING** — re-verifying a plan's line numbers by hand cost a session 100k before a line was written; an agent hands back the conclusion, the lead re-reads the deciding lines.
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

## 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V2" — NO BUILD: THE START SLIMMED (§293) · PLAN 221 / 385 WRITTEN AND ANSWERED (§292)
**State.** LIVE unchanged: staff 220 / admin 384 / mobile 18 + rules `6905471`, schedule 151 / 51 (served twice at the opening, 9:23 AM). Nothing filed; no page changed (test site not republished — no page changed).
**The session, in order.** 9:22 AM re-grounded at 239,718. He asked for every pending item; three were reported open that he had answered on 18 Oct (the countdown restart, the admin warning, the priority-lock plan) — TODO corrected. B revisited (§292): the priority lock and bid lowerings retired as a feature — finally as "ARCHIVED SETTINGS" below Auction Setup (defaults lock ON / unlimited; the user-facing text automatic, only while lowerings are limited or the lock is off; the Priority Locks page removed); the competition-week weakening rule kept (it is what makes Strict hold); the scare-off settled by information and time — a change that sends a get-in alert restarts the countdown (mode 2, every week), with the 18 Oct competition-week trigger; timer mode 3 removed; wording ruled (the get-in rule line, "Always sent: …" in the e-mail and the box, "Done — no changes.", the mode 1 / 2 descriptions, W1–W4, the KP prompt row into E-mail Sending Controls). The plan: `tests/docs/PLAN-221-385-RETIRE-LOCK-AND-COUNTDOWN-2026-10-22.md` (two read-only explorers + re-reads; §11 holds his answers and supersedes §3's shape A). The start slimmed (§293): the MAP to `MAP.md` (`status.mjs` writes it there), TODO §1's shipped records archived verbatim (lossless check: 0 lines missing), START-HERE 124,691 → 41,218 characters, TODO's start 121,503 → 31,631; a fresh-eyes retrieval check 12 / 12 (two by-kind lines added); two HANDOFF entries archived after their unpromoted lessons went to STANDING TRAPS.
**Lessons.** (1) **A TODO STATUS CAN BE A DAY STALE: before reporting a plan's questions as open, read the plan's own "His answers" section** — three answered plans were reported as waiting. (2) **The inventory found the simpler shape** — his live settings already gave the retirement's behaviour, so the plan moved settings instead of removing machinery (rule 21). (3) **A promise in a rule line must hold on every week** — the get-in line forced the get-in restart onto competition weeks too.
**Next.** A FRESH session: his go to build staff 221 / admin 385 from the plan (§11 first; W4 wording to confirm), no rules change (no RA-2); then the admin warning (Option B; its Clear-floor part changes with the retirement).
**Session close** 22 Oct 2026 about 10:55 AM at about 470,000 tokens. Isolation not run (no page or writer touched); `status.mjs` exit 0; all four repos checked, three fetched and in sync with origin (tests judged from disk), no locks (three fetch locks moved to `_to_delete/`).

## 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V3" — STAFF 221 / ADMIN 385 SHIPPED (§292): ARCHIVED SETTINGS · THE COUNTDOWN RESTART · MODE 3 REMOVED · THE ADMIN GET-IN LIST
**State.** LIVE: staff 221 / admin 385 / mobile 18 `bd738bf` (pushed about 7:05 PM; origin/main md5-identical to the gated copies; served twice 7:08 PM); rules unchanged since `6905471`; schedule 151 / 51. Test site carries 221 / 385. Next honesty baseline `bd738bf`.
**The session, in order.** 10:51 AM re-grounded at 159,066. His idea (10:57) — an admin view of the get-in alerts — answered (A, in E-mail Sending Controls), put into 385; W4 approved; **GO 11:05 AM**. Built in the cloud by builders working from `tests/docs/build221/BRIEF-221.md` (parts 1–3, his 1:23 / 1:25 PM answers as PART 1 FIX), gated (battery 200 / 200), reviewed blind by two lanes (admin safe; staff **H1**: false countdown restarts in later Phase 4 rounds), fixed; M1 put to him → **A** (3:39 PM: a get-in e-mail is no longer sent for a bid the bid box would refuse); the verifier found **V1** in the fix → rule 21 stop → his **B** (4:42 PM); the re-verify found **N1** in the guard → rule 21 stop → his **A** (5:19 PM: filed as is, N1 a recorded residual, `review/verify/mutant-v2.html` its tested fix). Final gate: battery 200 / 200, 9,314 assertions; sweep clean at 1440 / 390 / 375 / 320; test site 31 / 31. Filed 7:01 PM (144 files md5-checked both sides). 7:08 PM his redesign idea widened (oriona.ai; colours now open too) — read in Chrome, filed in TODO.
**Lessons.** (1) **A runner must export nothing a suite reads**: the battery runner exported `LOGS` (its log folder), which `test-216-380-ko-twin` reads as its fuzz size — it ran 0 logs and its own "the fuzz really ran" check failed it (rule 8 working). (2) **A comment that NAMES a function drags it into the house extractor's test copy**: one 220 comment naming `_subscribeSensitiveOnce` pulled the alert listener and 45 functions into the save's copy, changing what the harness sent (PART 2 FIX: describe it in words). (3) **An oracle that shares the page's assumption cannot catch it**: the restart suite's oracle judged the same incomplete "after" picture as the page; judge restarts and get-in e-mails against the board AFTER the save lands, with Phase 4 later-round boards (carried bids, no log rows). (4) **When a fix borrows a row into a log, ask whether the real row may already be there** (V1). (5) Subagents cannot write report files here — the session saves their reports itself (`review/*/FINDINGS.md`, `VERIFY.md`). (6) Rule 21 held twice and both times he chose in a minute.
**Next.** His choice: the redesign phone test pages (TODO: his 7:08 PM idea, a FRESH session) or the admin warning (Option B; its Clear-floor part drops).
**Session close** 22 Oct 2026 about 7:15 PM at about 470,000 tokens. All four repos checked; isolation not run (no schedule page or shared writer touched); `status.mjs` below.

## 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V4" — NO BUILD: THE REDESIGN'S LOOK CHOSEN ON A PHONE TEST PAGE (§294)
**State.** LIVE unchanged: staff 221 / admin 385 / mobile 18 `bd738bf`, schedule 151 / 51 (served twice at the opening, 7:15 PM). Nothing on either site changed; test site not republished (no page changed). Recorded: DECISIONS §294, TODO §1 (one line; the two old idea entries to TODO-ARCHIVE), the kit `tests/docs/redesign-2026-10-22/` (11 files, md5-matched).
**The session, in order.** 7:13 PM re-grounded at 167,126; his choice: the redesign test pages, Mac off (cloud clone of `8ece811`, `tests` attached read-only). The test page: the live staff 221 drawn by the test site, its own stylesheet, every colour a slot — 16 versions: 3 directions → the sage family → Linen → Contrast + earthy status sets → W / R / L clarity → colour-blind measurement (`cvd.py`; today 6.1, his paint chips 8.0, Sage & oxblood 21.9) → backgrounds, popcorn (his own drawing code, recoloured), your bids bold, month "Line". 11:33 PM the last picks.
**Lessons.** (1) **A republished test page updates his OPEN page and resets his picks** (each new storage key) — he saw shades "change while I'm looking"; say so before publishing, and publish only after he has chosen. (2) **A REJECTED tool call can still have run** — the Bold / Card / Dim edit landed though rejected; after a rejection, read the files before building on them. (3) **A phone test page's bar is a layout too** — rows added one by one grew it past the screen, and one dropped `</div>` folded the rest into the popcorn row ("i can't access the picker"); count open / close tags after every edit and keep only the undecided rows. (4) **Measure colour-blind safety, don't eyeball it** — today's colours "seem quite good" to him and measure 6.1.
**Next.** His order: the admin page in the §294 look on its own phone test page (a fresh session), then ONE plan for both pages.
**Session close** 22 Oct 2026 about 11:40 PM at about 556,000 tokens. All four repos checked; isolation not run (nothing served changed); `status.mjs` below.

## 22–23 Oct 2026 — "Vacation Auction 22 Oct 2026 V5" — NO BUILD: THE ADMIN LOOK APPROVED · EVERY LOOK QUESTION RULED (§294) · THE REDESIGN PLAN WRITTEN, BLIND-REVIEWED AND ANSWERED
**State.** LIVE unchanged: staff 221 / admin 385 / mobile 18 `bd738bf`, schedule 151 / 51 (served twice at the opening, 11:36 PM). Nothing on either site changed; test site not republished (no page changed). Recorded: DECISIONS §294 (four additions, 22 Oct 11:41 PM – 23 Oct 11:19 AM), TODO §1, the admin kit `tests/docs/redesign-admin-2026-10-22/`, the plan `tests/docs/PLAN-REDESIGN-2026-10-23.md`.
**The session, in order.** 22 Oct 11:36 PM re-grounded at 158,648. His order: the admin page to follow every staff decision; the symbol-only emoji question (the bell) ruled — no emoji, line icons. Built the admin test page (live admin 385, all 18 menu pages, Today pixel-checked against the live capture) and published it (https://claude.ai/artifact/4wFm99VrZ8f7maZhaSsNvr, v1 → v8). 23 Oct 8:39–11:19 AM, on his phone: "It looks great"; chart moss and tint kept; three outcome colours everywhere (report options page https://claude.ai/artifact/L1YgoRwzGHTaL7ThvWyguh); everything changes; no dashes; pale projection beside solid result only where side by side; admin background Sage mist with white tables. 11:09 AM his go for ONE plan with two conditions (no leftovers; function 100% identical); 11:12 one build if safe. Plan written 3:00 PM (late — lesson 1), reviewed blind by a separate agent: three blocking holes (holiday constants are DATA written by Auction Setup; condition-chosen emoji carry meaning; the behaviour check could not be byte-identical) and wrong counts (a `#`-only search) — revision 2 answers all; 3:48 PM his answers: schedule site included, the rest as recommended.
**Lessons.** (1) **Answering a side question ends the turn — say so, or keep working** (promoted: START-HERE rule 22). At 11:22 AM he asked "can i close mac?"; the answer ended the turn and the plan he had ordered sat unwritten for 3½ hours ("Terrible"). When work is under way and he asks something else, answer AND carry on in the same turn, or say plainly that the work has paused. (2) **The bridge drops mid-session when he walks away; hold rulings in the chat and file them first thing on its return** — 23 Oct three rounds of rulings were filed only when the Mac came back; say each time what is not yet on disk. (3) **A table with no fill shows the page through it** — the live admin draws tables standing on the page transparent; on a coloured page that reads as "too green". Check what sits directly on the page, not only the cards.
(4) **A count from a quick regex is a floor, not a fact** — revision 1 said 195 colours / 855 emoji; measured with Unicode properties and decoded `%23` / bare hex / escapes it is 339 / ~950, plus 53 other symbols. Measure the §1 way before quoting a number.
**Next.** His order (3:02 / 3:48 PM): the NEXT session starts the plan — `tests/docs/PLAN-REDESIGN-2026-10-23.md`, session A (tools + one phone test page for his remaining rulings; nothing on the site changes), aiming to finish all the styling, schedule site included. His go on the plan is still needed (§92).
**Session close** 23 Oct 2026 about 3:55 PM at about 515,000 tokens. All four repos fetched (tests judged from disk); no build, so no battery or isolation run; test site — no page changed, not republished; `status.mjs` below.
## 23 Oct 2026 — "Vacation Auction 23 Oct 2026 V1" — NO BUILD: HIS GO ON THE REDESIGN PLAN (§294) · SESSION A PART 1 — THE SYMBOL LIST, THE COLOUR MAP, GATES G1 / G2 / G5-STATIC / G7, THE RULINGS PAGE (ALL 15 ITEMS RULED)
**State.** LIVE unchanged: staff 221 / admin 385 / mobile 18 `bd738bf`, schedule 151 / 51 (served twice at the opening, 3:53 PM). Nothing on either site changed; test site not republished (no page changed). Recorded: DECISIONS §294 (his go, 3:55 PM; the 15 rulings, 9:31 PM), the plan's status line and §5, TODO §1, the tools `tests/docs/redesign-build-2026-10-23/` (its README is the record).
**The session, in order.** 3:52 PM re-grounded at 196,185 (`git fetch` over the bridge refused with 403 again — origin confirmed by `ls-remote` from the cloud, STANDING TRAPS). 3:55 PM his go, verbatim in §294: function unchanged first; every colour scheme and style changed; no old scheme left; no emoji; line icons where needed. 3:56 PM: both the auction and the Daily Schedule sites. About 4:00 PM the bridge dropped; 4:07 PM his order: "mac will be offline. cont in cloud." — the work was done in the cloud (all four repos cloned; `tests` attached read-only). Built and proven, each passing on unchanged and legal copies and refusing one-fault copies: the inventory scanner, the symbol sort, the colour map, G1 code tokens, G2 markup and stylesheets, G5's static half, G7 colour-blind sets. Published the rulings page https://claude.ai/artifact/WSbmiA4NbNVKezySy2AzGn (v4). 9:29 PM the Mac back; 9:31 PM his answer to all 15 items: *"proposal is good, all of it"*. This session had no file-transfer tool to the Mac, so the scripts were written over the bridge as text and every data file regenerated there — all md5-identical to the cloud.
**Lessons.** (1) **Hunt the class of a data hazard, not the instance (rule 17)** — the plan named the holiday EMOJI as data; the config loader showed the holiday COLOURS are written to the database too (`_acColorFor`), so the colour map leaves those lines byte-identical. (2) **A proof fault that lands outside the gate's reach passes it — read the passes (rule 18)**: two "broken" copies for G1 had their fault in markup; re-aimed, G1 refused both, and the markup copies became G2's proof. (3) **Never key a cache on Python's `id()`** — ids are reused, and the scanner gave one file wrong line numbers for a run. (4) **A quoted font name inside a quoted script string breaks the page** (admin 10139) — the build writes `Hanken Grotesk` unquoted. (5) **Text sent over the bridge: escape codes like `️` arrive as the real character** — build such lines from character numbers (`chr()`) and md5 every file.
**Next.** Session A part 2: G3 / G3b on the test site (the holiday-note setting added inside G3's own run, not to the shared seed), G5's drawn half, and the second rulings page (dialogs, sign-in, toasts, alerts window, report sheet, the Daily Schedule's pages). Session B (the build) only after that.
**Session close** 23 Oct 2026 about 9:50 PM at about 615,000 tokens. No build, so no battery or isolation run; test site — no page changed, not republished.

## 23–24 Oct 2026 — "Vacation Auction 23 Oct 2026 V2" — NO BUILD: SESSION A PART 2 — G3 / G3b / G5-DRAWN BUILT AND PROVEN · TWO GAPS IN PART 1'S SCANNER FIXED · RULINGS PAGE 2 PUBLISHED (20 ITEMS, HIS TO RULE)
**State.** LIVE unchanged: staff 221 / admin 385 / mobile 18 `bd738bf`, schedule 151 / 51 (served twice at the opening, 9:45 PM). Nothing on either site changed; test site not republished. All work in `tests/docs/redesign-build-2026-10-23/` (README, part 2; `page2/` for the rulings page) and this file, TODO §1, the plan's §5 status. **Not yet on the Mac** — it went off at 11:03 PM ("mac will be off, keep going in the cloud"): every file is in the session's zip (`session-a2-files.zip`, sent in the chat); write it in and md5 it at the next session's start, then run `node status.mjs`.
**The session, in order.** 9:44 PM re-grounded at about 184,000 (`git fetch` refused again, origin confirmed from the cloud). 9:45 PM his go on part 2. Built `g3.mjs` (a recorder walking both auction pages the sweep's way, recording every database write, storage write, e-mail, Excel workbook, download, report window, alert and error after every click, plus each control's clickability) and `g5_drawn.mjs` (every colour, font and symbol actually drawn). Proven: three recordings of the unchanged pages identical (1,056 steps); the legal copy passes G3 and G3b; six behaviour faults refused (an admin database value, an e-mail word, an Excel heading, a staff database value — G3; an unclickable button — G3b; a hidden button — G3); G5 drawn fails old (505) and legal (40), passes the full proof copy (0). A separate agent built rulings page 2 (https://claude.ai/artifact/7BQtDnGyNKtFu7nsj4zbqZ, version 2, 20 items: dialogs, sign-in, toasts, alerts window, report sheet, the Daily Schedule's sign-in / staff / admin, the shift colours, and five newly found schedule symbols); checked here at phone width.
**Lessons.** (1) **A gate's first runs must be checked for determinism ALONE as well as side by side** — Playwright's page clock keeps running after install until paused; the sign-in wait moved the clock by load speed; the pages' one-time reload on a new stored setting runs in real time; two side-by-side runs agreed while both were load-dependent. (2) **Read the passes (rule 18), again:** the first Excel fault changed a heading no export in the walk draws, and passed. (3) **Part 1's static scanner had two gaps, both found by this session's work and checked before believed:** a quoted colour whose colour word sat more than 40 characters back (admin 10491, the capacity workbook — found by the drawn half); and a `<style>` inside a JS comment that hid schedule admin 1745–10639 from every tool (found by the rulings-page agent: 137 colour uses and 99 symbols newly read; the auction pages' counts exactly unchanged). Both fixed, the class hunted, G1 / G2 / static G5 re-proven. (4) **The static half passes a font rule that starts right but is broken** — the drawn half catches it. (5) **A slip in a batch script** (every recording written to one file named `x`) voided one run: write batches as a file, not a one-liner.
**24 Oct 2026 6:37 AM — his ruling on page 2** (verbatim in DECISIONS §294): all 20 as proposed except the sign-in screens, which are MOSS (items 7 and 12); the page redrawn to show it (v3). **Next.** Before session B: the Daily Schedule's own G3 run (not built); the schedule shift colours into the §3.1 data list; ruling 13's eight pale tints into `map.json`.
**Session close** 24 Oct 2026 about 12:40 AM at about 470,000 tokens. No build, so no battery or isolation run; test site — no page changed, not republished.
**24 Oct 2026, 6:37–10:57 AM — the session went on (the same chat), his rulings on the look, all verbatim in DECISIONS §294.** Rulings page 2: all 20 as proposed, except the sign-in screens. The sign-in panel: moss shown, then *"too much moss green"* — five options, **D grey-green `#646A5C`** chosen; and a standing rule, **no large area in the original moss anywhere** — Claude found three (the Excel header bands, the reports' phase badge, the Dashboard chart), shown, all moved to D in the colour map. Then a **dark sage stripe**, final: **no calendar picture, a 24-point stripe of `#36694A` above the panel's words** (option T1); the three small words on the panel **full white**. The options page: https://claude.ai/artifact/SH3KtgvZGbw1sVsgSoEvsz (v5; kit `tests/docs/redesign-build-2026-10-23/page2/moss-options/`). The stray broken copy of page 2 deleted at his word.
**Also this morning.** (1) **G1 had never passed the admin legal copy** — its last printed line reports the data-range check, not its verdict; read by EXIT CODE it was refused, part 1's own tools too (emoji written as JS escapes). Fixed; every page re-proven by exit code; B1 / B5 were G2's catches, two true in-script faults (B7 / B8) added (tools README items 13–14). (2) The Mac came back at 10:45: **all 119 files of this session written into the four folders and md5-verified** (the replaced files first checked against their last commit); `status.mjs` exit 0. The context reading fell from about 562,000 (6:57 AM) to about 462,000 (10:45 AM) with no work between — the whole conversation still visible, so not a compaction (most likely old tool output cleared); treated as past the 550,000 line all morning: rulings and filing only.
**Lessons.** (1) **Read a gate's EXIT CODE, never its last line (rule 11)** — the G1 miss stood a whole session. (2) **A colour shown in a large flat area reads far stronger than in a test-page swatch** — he rejected the moss only when a full panel was drawn; show large areas at full size before ruling a colour for them.
**Next — session B, the build, in a FRESH session.** Its first steps (no ruling needed): the Daily Schedule's own G3 run; the schedule shift colours into the §3.1 data list; ruling 13's eight pale tints into `map.json`; the style block's font / colour / `accent-color` on buttons and fields; today's sign-in changes (calendar hidden, the stripe, the three words white). Then apply, every gate, his phone look, file, push. His, any time: the EmailJS template (he sends its HTML, gets it back restyled, pastes it).
**Session close** 24 Oct 2026 about 11:00 AM at about 470,000 tokens. No build, so no battery or isolation run; test site — no page changed, not republished.

## 24 Oct 2026 — "Vacation Auction 24 Oct 2026 V1" — NO BUILD: THE E-MAIL TEMPLATE RULED (B) · SESSION B'S PREP DONE IN THE CLOUD · TWO TOOL FAULTS FIXED, BOTH RECORDERS RE-PROVEN
**State.** LIVE unchanged: staff 221 / admin 385 / mobile 18 `bd738bf`, schedule 151 / 51 (served twice at the opening, 11:00 AM). Nothing on either site changed; test site not republished. Recorded: DECISIONS §294 (option B, 11:14 AM — written on the Mac), TODO §1, the plan's §5 status, the tools README "Session B prep". **The tools work is NOT yet on the Mac** (the Mac went away at 11:15: "do in cloud, mac will be away"): every file is in the session's zip — write it in, md5 it, then `node status.mjs`.
**The session, in order.** 11:00 AM re-grounded at 199,050 (`git fetch` worked over the bridge this time; three stray maintenance locks moved to `_to_delete/`). 11:03 his question, what is left besides session B: the EmailJS template. 11:06 its source: four unstyled lines; the pages send only name, address and plain-text wording. 11:11 his test of the first restyle — *"I like the simplicity, but it also seems not great yet"*; three versions on a phone test page (https://claude.ai/artifact/463TsuRXNRUNcdbMm8k7dV); 11:14 *"b good."* (§294). 11:14 *"ready to build?"* — refused at 264,320: the redesign build cannot plainly be filed before 650,000 from there; its prep done instead. In the cloud: (1) the schedule's shift colours (`FAMILY_PRESETS`, `PALETTE`) are data, kept byte-identical (G1 / static G5 refuse a changed one); (2) ruling 13's eight pale tints mapped; (3) `g3s.mjs`, G3 / G3b for the Daily Schedule, generated from `g3.mjs`.
**Lessons.** (1) **A gate can lie about WHAT it pressed (rule 8):** the walk pressed controls by their place in a list taken before earlier presses re-drew the page, so later steps pressed a different control from the one they name — found when a fault aimed at one toggle showed up at another button. Fixed (found again by what it is) and both recorders re-proven. (2) **Read the passes (rule 18), three times in a row:** the clickability fault passed on three aims, each at a control the walk already reads as covered on the unchanged page — about a fifth of the schedule admin's presses (why the side menu answers there is not yet known). (3) **A rule that names a variable passes a check of the rule:** `font-family:var(--mono)` passed while `--mono` still held SF Mono; G5's drawn half found it, the scanner now reads variables. (4) **An emoji removed at the edge of one element joins two elements' words** in a label's text; steps are now matched without spaces.
**Next — session B, the build, in a FRESH session**, after the zip is written in. Its remaining first steps: the style block (font, colour and `accent-color` on buttons and fields; `--mono` on both schedule pages); the sign-in changes. His, any time: paste template B at emailjs.com, Save, Test It.
**Paused** 24 Oct 2026 about 12:40 PM at about 475,000 tokens, the prep reported to him; no build, so no battery or isolation run; test site — no page changed, not republished. If this chat goes on, it does rulings and filing only.
**24 Oct 2026, 3:22–8:30 PM — the chat went on.** His "Just 2": the clickability blind spot looked into — cause found (a press that opens another panel leaves the rest of the round's controls hidden); a second walk fix reached more controls but exposed new faults in the same walk (an unseeded random feed code broke the schedule's repeat runs; the auction's legal copy took another path) — stopped under rule 21 and put to him: **option A, the walk stays as proven** (DECISIONS §294, 4:02 PM); the cloud copies were set back to it. 8:22 PM: the session zip written into the folders over the bridge, every replaced file first checked against its last commit, all 20 md5-identical; `status.mjs` run. **Session close** about 8:30 PM at about 510,000 tokens. No build, so no battery or isolation run; test site — no page changed, not republished.

## 24–26 Oct 2026 — "Vacation Auction 24 Oct 2026 V2" — STAFF 222 / ADMIN 386 · SCHEDULE 52 / 152 FILED (§294): THE REDESIGN BUILT
**State.** LIVE unchanged: staff 221 / admin 385 / mobile 18 `bd738bf`, schedule 151 / 51. **FILED, NOT PUSHED: the redesign** — auction staff 222 / admin 386 / mobile 19 (versions.json 222 / 19 / 386), schedule staff 52 / admin 152, the hub front door, `fonts/` (Hanken Grotesk + `OFL.txt`) in all three site repos; `firestore.rules` unchanged (no RA-2). Gated bytes and every gate: the two BUILD-LOG rows (frozen-v7, `frozen-v7.md5` `cdc2a117…`; the full battery on v5, v6 / v7 targeted checks). Test site republished to its usual link with 222 / 386 (31/31). Phone test page https://claude.ai/artifact/MwioBADoLcMNbUz5Gg3A4Z (version 2, the v6 / v7 pages). Build record: `tests/docs/redesign-build-2026-10-23/records/`. Rulings: DECISIONS §294 (this session's block, his rulings apart from Claude's overnight calls).
**The session, in order.** 24 Oct 8:24 PM opened; the build in the cloud by agents from `tests/docs/redesign-build-2026-10-23/` (`build.py`, `build_sched.py`), base `8ece811` / `0a61585`. Baseline on the base pages: auction 200 / 200 (8,800), schedule 107 / 108 — `build51` red on the base (the missing print line) → 9:52 PM his *"a"*. Build v1 → G3 found four console errors in the sealed report frame → *"Embed it"* (v2). *"Keep saved text"* (the schedule's saved audit-log emoji). Two blind reviews (function, leftovers) → *"Update all three"* and Claude's side-bar and state-cue calls → fix round 3 (v3). The suite edits (G4); a machine restart killed the G4 agent mid-work — a second agent audited every edit before trusting it (`SUITE-EDITS.md`, filed in `tests/docs/redesign-build-2026-10-23/records/`). The flattened-cue hunt (17) → *"Fix the 3 invisible ones"*, fix 2 stopped under rule 21 → *"Darker grey letters"* → fix round 4 (v4): auction 200 / 200 (8,805), schedule 105 / 108 (three look findings), isolation 36 / 36. 25 Oct 10:54 PM his overnight directive → gates C1 text contrast, C2 look words, C3 phone and computer, and Claude's calls (DECISIONS §294) → fix round 5 (v5, frozen 26 Oct about 5:42 AM): every gate 0 (the ruled differences only). Final battery on v5: auction 200 / 200 exit 0 (8,805 assertions; the 3 known no-op skips — the real-data replays 217 / 218, the rules emulator), schedule 108 / 108 exit 0 (3,708), isolation guard 36 / 0 exit 0 — on the v5 pages; v6 / v7 targeted checks only, by his order. 26 Oct 6:37 AM his *"I decided that I don't love the grey-green of the sign in page…"* → an options page (https://claude.ai/artifact/AQ1HAsk27iyUKwAS3DyUkH); 6:38 *"Will be for all areas with this color"*; 6:40 *"Why do we need a full eduction battery for such a small change? …"* — the checking matched to the change; 6:52 *"C without a top stripe"* → fix round 6 (v6): every grey-green `#646A5C` area to ink `#1F2329`, the 24-point stripe removed; targeted checks only (static gates 0, contrast 15.78 : 1, `test-346` repointed, `un222` regenerated, eight suites unedited 0, test site check 31 / 31); the phone test page redrawn (version 2). About 7:20 AM the schedule staff sign-in's title found above the screen at phone width (−28 px) → Claude's call, a 24 px top edge in the panel's own ink (v7: back to v5's 3 px; only `schedule/index.html` changed; static gates all pass).
**Lessons.** (1) **A machine restart kills a background agent mid-work** — its half-made edits were audited one by one against their diffs before any was trusted, and its bind mount (`g4root/tests`) had silently gone empty. (2) **`ps | grep -c` waits that match their own shell never end** (rule 8's trap again) — count only `node` processes. (3) **A sealed report frame (`sandbox=''`, origin null) cannot load a self-hosted font** — embed it. (4) **A looks block with `!important` overrides the page's own STATE cues** — hunt by toggling every state with the block on and off. (5) **The colour map can flatten a cue on its own** — measure state vs non-state ΔE, not only old vs new. (6) **Text contrast and phone width need gates of their own** — G1–G7 passed pages on which C1 still found 18 faint texts; C3 is the only gate that measures phone width. (7) **Match the checking to the size of the change** — his 26 Oct words: *"No need to recheck every single thing, targeted check"*; a colour-only change after a fully gated build takes the gates that prove code and markup identical, the measures of the changed areas and the suites that pin them, not the full battery again.
**Next.** His: look at the phone test page, push the four repos (commit lines in the chat), paste e-mail template B if not yet done; then the LIVE line and `node status.mjs`. Then his order of 18 Oct: the admin warning (Option B).
**Session close** 26 Oct 2026 about 7:40 AM at about 550,000 tokens. FILED, NOT PUSHED: auction staff 222 / admin 386 / mobile 19, schedule staff 52 / admin 152, the hub front door — 283 files written into the four folders from one bundle and every one md5-verified against it; `firestore.rules` unchanged. Test site republished to its usual link carrying 222 / 386 (31/31; `tests/testsite/make-testsite.mjs` now copies `fonts/`, `published.json` recorded). Batteries: full on v5 (auction 200/200 · schedule 108/108 · isolation 36/0); v6 / v7 targeted only, by his order. His to do: look at the phone test page, push the four repos (one commit line each, in the chat).

## 26 Oct 2026 — "Vacation Auction 26 Oct 2026 V1" — THE REDESIGN LIVE (222 / 386) · THE FIRST TOUCH-UPS LIVE (223 / 387 · 53 / 153) · THE CONTINUE BUTTON FILED (224 / 388 · 54 / 154) · TARGETED GATES FOR EVERY BUILD (§294)
**State.** LIVE: auction staff 224 / admin 388 / mobile 19 `e32a004`, schedule 54 / 154 `506d291`, hub `77b1d96`, tests `651d951` (pushed by him about 12:44 PM; served, two fetches each; pushed bytes = gated). Nothing filed and unpushed. Test site carries 224 / 388.
**The session, in order.** 7:38 AM opened: the redesign pushed — served 222 / 386 · 52 / 152, pushed bytes = gated; template B pasted. 7:53 AM *"i still don't like the sign in page… i want some color"*, the Change Log as a whiter table, *"why is the edit selections card square corners"* (no reason: the rounding rule reached only `.card`) → test page AaJTf6iY6gtjgG16mv1nbY → 8:09 AM *"1-A.  2-yes,3-yes"*, *"go"* → 8:12 AM *"yes, all sign in pages and landing page need the update"* → 8:13 AM the standing order *"always target gates going forwarded for the checks"* (START-HERE §6). Built in the cloud, filed about 9:10 AM. 9:27 AM *"still a little too green… I like the pale sage as a background, but I want contrast so it's not green everywhere"* → his idea (the testing and e-mails boxes white, the Popcornometer ink) → test page MC3wgk5v2bHj8n8uJ6WyYk → 9:43 AM *"Fold in please"* → re-filed. 12:14 PM pushed; served 223 / 387 · 53 / 153 (two cache-busted fetches each). 12:16 PM *"you forgot the right side of these pages"* → *"leave everything, match the green continue button to the left"* → 224 / 388 · 54 / 154 built, targeted gates, filed about 12:45 PM.
**Lessons.** (1) **A gate tool that cannot START reports the same exit code as a failing gate** — G1 / G2 first "failed" on every page, the unchanged mobile page included, because acorn / regex were missing in the cloud: read the log before the exit code (rule 8). (2) **A `/tmp` file the shell cannot overwrite leaves an OLD report in place** — `node status.mjs > /tmp/st.out` hit "Permission denied" on the Mac and the grep read a stale file; write reports under `$HOME`. (3) **An assertion of ORDER passes on absence** — "the header comes before the first day" was green on the old page (no header); assert existence first (rule 11). (4) **Every new build extends the suites' build-number lists** — two suites failed only because `[…, 222]` / `=== 386` enumerations stopped at the last build; the undo chain now needs a `wireNNN.py` per build (`tests/docs/build223/wire223.py`, `tests/docs/build224/wire224.py`) — the cost his filed "simplify the undo chain" idea is about. (5) **Pages deploys lag a push by a minute or two** — two fetches in the first minute read 222 / 386, the third 223 / 387. (6) **A rejected bridge command may already have run** — his 12:16 PM rejection of the close-out edit arrived after the Mac had applied it: check `git status` before assuming a rejected call changed nothing.
**Session close** 26 Oct 2026 about 12:50 PM at about 510,000 tokens. FILED, NOT PUSHED: 224 / 388 · 54 / 154 (63 files written from one bundle, every one md5-verified). Batteries: targeted only, by his order. `_to_delete/` holds 7 files, 11.6 MB (status.mjs) — his to empty. HANDOFF.md is at 890 / 900: the next session's entry crosses the tripwire, so the archive pass (`node archive.mjs`) comes first at its close. Pushed 12:44 PM; the after-push paperwork done (one docs commit in the hub, two BUILD-LOG commits).

## 26 Oct 2026 — "Vacation Auction 26 Oct 2026 V2" — BUILD A LIVE (225 / 389, §295): NO NP LINE WHEN NP IS OFF · THE P4 PICKER'S TICK BOXES · FOUR OWNER-FOUND STAFF ITEMS
**State.** LIVE: auction staff 225 / admin 389 / mobile 19 `797d1f9`, schedule 54 / 154 unchanged, hub `0004129`, tests `ab2bd44` (pushed by him about 3:58 PM; served twice; pushed bytes = gated). Rules unchanged. Test site carries 225 / 389. Nothing filed and unpushed except this docs close (one hub commit, one BUILD-LOG commit).
**The session, in order.** 12:46 PM opened. 12:57 *"I want to do 3, 4, 5, 6 next. do they fit in 1 build?"* → no; Build A = NP line + P4 week picker, then bids 11–16 alone, then phases explored first (§295). Plan `tests/docs/buildA-225-389/PLAN.md` → *"1/2-yes"*; asked whether FTE changes re-decide winners between phases (no — read in the engine; Claude's plan wording corrected) → *"4- simpler option is good. go."* (tick boxes only). Built in the cloud (`build225.py`). Mid-build, owner-found (his screenshots): the meter card stretching, the "Vacation Admin →" button, "complete" said three times → *"remove in all gaps"*, *"when the timer is off, the popcornometer should disappear"*, *"1-3 - yes"* — folded in. Test page https://claude.ai/artifact/24ZHMwq9FQ5fKvcdkT5b1R → *"This all looks great"*. 3:24–3:33 PM the "Signed in as" line → hidden on every screen (*"remove this entirely"*). Three items FOR LATER (TODO §1). Blind review (no HIGH; MEDIUM a suite anchor, fixed); 41 targeted suites on the final bytes; filed about 3:55 PM; pushed 3:58 PM.
**Lessons.** (1) **A rebuild that resets the build clone (`git checkout -- .`) also wipes files written there for filing** — the BUILD-LOG row vanished once; keep filing edits out of the clone or re-add after the last rebuild. (2) **A `sed` keyed on a line's ending can hit two lines** — it overwrote the generator's base md5 as well as the new one; key on the name. (3) **Helper agents die when the session pauses (Mac off, an interrupt)** — a stopped agent never reports; check before waiting on one. (4) **Changing the pages mid-run invalidates the run** — stop it and re-run on frozen bytes, md5-checked at the end. (5) **A new column in a phone dialog can push content off screen** — the test page caught FTE clipped at 390; measure 390 / 375 before showing him. (6) **A stub that answers the same for every page passes on the old page too** — model the DOM from the page's own markup (rule 18 caught it).
**Session close** 26 Oct 2026 about 4:05 PM at about 605,000 tokens. LIVE 225 / 389. The close is docs only; `_to_delete/` holds this session's transfer files and stale locks — his to empty.

## 26 Oct 2026 — "Vacation Auction 26 Oct 2026 V3" — BUILD B LIVE (226 / 390 + rules, §295): BID NUMBERS 11–16 · RULE 23 · FIVE STAFF-PAGE ITEMS FOR THE NEXT BUILD
**State.** LIVE: auction staff 226 / admin 390 / mobile 19 `378db73` + `firestore.rules` `703530a8` (published by him first), schedule 54 / 154 unchanged, hub `24f5523`, tests `e0c5ace` (pushed about 8:47 PM; served twice; pushed bytes = gated; RA-2 "✅ BOTH" 8:46 PM). Test site carries 226 / 390. Nothing filed and unpushed except this docs close.
**The session, in order.** 4:16 PM opened (Mac). 4:23 *"yes, go"* (Build B's plan) · *"work in cloud.  mac will be off."* — the four repos cloned in the cloud, md5-checked against the Mac. Plan `tests/docs/buildB-226-390/PLAN.md` (one setting `topBid`, ONE bid-box screen, locked like combination bids) → 4:42 answers, rule 23 (START-HERE §3) → 4:50 the Edit pop-up, wording approved → phone test page R7rwji9v1Ai9VaTCyDw79s (10–16) → 4:52 *"Build in this session. Use subagents. Will be fine."* Built in the cloud (`build226.py`, helper agents: builder, bench, own suites, repoints + undo chain, blind review, RA-2 generation, paperwork). 5:24 the stop hook silenced (START-HERE §4). 7:16 three e-mail wording items FOR LATER; 7:51–7:55 five staff-page items → *"This is all for the next build"* (TODO §1). Filed about 8:35 PM; RA-2 8:42 (433 / 1) → test fixed → 8:46 BOTH; 8:47 *"rules publish.  pushed."*
**Lessons.** (1) **`pkill -f <pattern>` kills the shell that runs it** (its own command line matches) — twice this session (exit 144); find the PID with `ps … | grep "[p]attern"` and kill by number (rule 8's `pgrep -f` trap, now with a kill). (2) **A fix after a gate run leaves that gate stale** — the "eleven" comment fix changed the rules after `test-226`'s final run, and its A5 pin failed on the final bytes; the paperwork agent caught it by checking md5s against log times. Re-run every gate whose inputs changed, on the FINAL bytes, before writing "exit 0". (3) **RA-2's emulator shares the Mac's clock** — a test stamping `Date.now()` and expecting `at != request.time` passes or fails by the millisecond; stamp a clock clearly off. (4) **A container restart stops every helper and background run, but the disk survives** — resume helpers by message; write progress to disk as you go (the repoint agent's PROGRESS file lost nothing). (5) **Two processors, three helpers running suites**: a full baseline battery under that load took 40 min for 44 suites and made browser suites time out — gate one thing at a time; a baseline is cheaper suite by suite on demand. (6) **Check the identity of a screenshot item before filing it** — "MD" was the site label under the title, not the initials pill; filed wrong once, corrected the same minute.
**Session close** 26 Oct 2026 about 8:55 PM at about 545,000 tokens. LIVE 226 / 390. The close is docs only (one hub commit, one BUILD-LOG commit). `_to_delete/` holds this session's transfer zip and stale locks — his to empty.

## 26–27 Oct 2026 — "Vacation Auction 26 Oct 2026 V4" — STAFF 227 / ADMIN 391 LIVE (§296): THE ☰ MENU · THE RULES BOX · E-MAIL GREETINGS BY NAME
**State.** LIVE: auction staff 227 / admin 391 / mobile 19 `ddc7b36` (pushed about 5:57 AM 27 Oct; served twice; pushed bytes = gated), `firestore.rules` unchanged `703530a8`, schedule 54 / 154 unchanged, tests `e48df28`. Test site carries 227 / 391. Nothing filed and unpushed except this docs close. NEXT BUILD has one item so far: the "Hi <first name>," greeting on every e-mail (TODO §1).
**The session, in order.** 8:50 PM opened (Mac). Plan for the five staff-page items → 8:53 his ☰ menu and its layout → 9:00 answers → 9:01 the e-mail wording joins → phone test page KSzA9nVtx1vEhpzMj7StTe → 9:12 alert look B → 9:15 *"go"* → built in the cloud by helpers (builder, own suites, repoints + undo chain, blind review) → 9:33 look A instead → 10:02 the Rules box opens at its top, Close always visible → review HIGH 0 / MEDIUM 2, one fix round → M2's wording ("their full name") taken while he was away → filed about 2:15 AM → 5:57 pushed → 5:58 "Hi <first name>" for the next build → 5:59 *"handoff"*.
**Lessons.** (1) **A test page that copies the page's CSS can freeze inside the artifact viewer**: the viewer sizes the frame to the content while the page's `body` has `min-height:100vh`, so it grows without end and will not scroll — turn the screen-height rules off on test pages (rule 20(e)'s corollary). (2) **Write the owner's ruling into the SPEC in his words, not a narrowed reading**: "addressed to the user's full name" became "`Hi <initials>` greetings" in the SPEC, and the admin "Hello" e-mails were missed until the builder listed them. (3) **Focus placement scrolls**: the SPEC focused the Rules box's Close button on open, which scrolled the box to its bottom; focus the title with `preventScroll`. (4) **The device's `/tmp` holds other sessions' files**: a redirect to `/tmp/st.txt` was refused, and the OLD file there read like this run's status output — write tool output under `$HOME` and check the run's own exit line. (5) **A stopped tool call may already have run**: at 5:58 AM a rejected call's DECISIONS / TODO edits were found on disk — check before repeating any write.
**Session close** 27 Oct 2026 about 6:05 AM at about 440,000 tokens. LIVE 227 / 391. The close is docs only (one hub commit, one BUILD-LOG commit). `_to_delete/` holds this session's transfer files — his to empty.

## 27 Oct 2026 — "Vacation Auction 27 Oct 2026 V1" — BUILD C (228 / 392) LIVE · 229 / 393 BUILT, HANDED OVER UNFILED
**State.** LIVE: staff 228 / admin 392 / mobile 19 `5481ba4` (pushed about 6:56 PM, served twice, pushed bytes = gated); rules unchanged; schedule 54 / 154. Unpushed: two docs commits for 228 (BUILD-LOG row, hub "228 live") and this close. **Staff 229 / admin 393 is NOT filed** — `tests/docs/build229-393/HANDOVER.md`. Test site carries 229 / 393 (ahead of disk: status.mjs exit 8 is expected until 229 lands).
**The session, in order.** 6:01 AM opened · the greeting planned, then moved back to TODO (6:18) · Build C scoped (6:24): the notes pass, the Remove box, the NP leftovers, initials as text · a 127-item review page with "Don't change" ticks (his ticks 9:22) · phone test page · go 10:51 · built by helpers; blind review HIGH 0 · a stream of late wording rulings 12:42–5:35 PM, each a rebuild · targeted gates (5:35) · filed about 6 PM · pushed 6:56 · edits to Build C ruled 6:59–7:58 → 229 / 393 built · tests helper stopped; handed over 8:36 PM.
**Lessons.** (1) **Batch the owner's wording changes before rebuilding**: each late change cost a rebuild plus a re-run; asking "send everything, then 'that's all'" (5:11 PM) cut that. (2) **A tick-box review page with the page's own store** turned 127 decisions into one pass for him — use it for any long list. (3) **A "removal" category can over-reach**: "remove e-mail talk" swept up a Rules line he wanted kept (211) — list removals inside the Rules separately and ask. (4) **Test helpers die with a container restart** — run long sweeps in the foreground in chunks and record each exit to a file as it finishes. (5) **A stopped tool call may already have run** (7:14 PM: the TODO write had landed) — check before repeating.
**Session close** 27 Oct 2026 about 8:45 PM at about 560,000 tokens.

## 27 Oct 2026 — "Vacation Auction 27 Oct 2026 V2" — NO BUILD: THE OVERNIGHT RUN PLANNED AND RULED (§297) — UNDO-CHAIN FREEZE · 229 / 393 WIDENED · BUILD D RE-PLANNED, WORDING APPROVED
**State.** LIVE unchanged: staff 228 / admin 392 / mobile 19 `5481ba4`, schedule 54 / 154 (served twice each, 8:41 PM). Nothing built or filed. His GO (9:07 PM) for ONE unattended overnight run in a FRESH session: TODO §1's "▶ NOW — THE OVERNIGHT RUN" is the order and the brief.
**The session, in order.** 8:39 PM opened (Mac; `git fetch` over the bridge refused by the proxy, 403 — the three public heads checked from the cloud with `git ls-remote` instead: all equal to the Mac's) · 8:41 the My Bid Count labels (→ 229) · 8:45 "Hi <first name>" wanted in 229; the 🔑 Sync login move stays in the admin clean-up; the phone scroll freeze declined · 8:49 his rule: first name = the name minus its last word · 8:52 plan all, build next session; the undo chain dropped FIRST so 229 needs no un229 · 8:53 one overnight build · the undo-freeze plan, SPEC items 7–8, Build D re-read on 392 by a helper · phone test page `8Swoe3PsLRrs52UUcTL5nr` · 9:03 "as brief as can be?" → the short wording (v2) · 9:06 approved; the two extra cuts declined · 9:07 "yes": the two limits, no lowering warning, a fresh session.
**Lessons.** (1) **Check the CLOSED / DECLINED table before listing anything as open** — a §1 "open bits" line still called the Fair Play crafted-row fix "its own small fix later" though he declined it 18 Oct; Claude listed it, and the line was corrected the same turn. (2) **A chain that every build must extend can often be frozen at its input** — one saved copy of the last pushed pages gives the old suites the same "old page" for ever; ask what the chain buys before extending it again. (3) **A fresh session starts near 205,000 tokens** (the opening context alone) — budget a session's work from there, not from zero.
**Session close** 27 Oct 2026 about 9:15 PM at about 330,000 tokens.

## 27–28 Oct 2026 — "Vacation Auction 27 Oct 2026 V3" — THE OVERNIGHT RUN: STAFF 229 / ADMIN 393 WITH BUILD D FILED (§297) · THE UNDO-CHAIN FREEZE NOT ADOPTED
**State.** LIVE unchanged: staff 228 / admin 392 / mobile 19 `5481ba4`, schedule 54 / 154 (served twice each, 9:10 PM). **FILED, NOT PUSHED: staff 229 / admin 393** (staff `ab9311a0…` / admin `fd8e668f…` / versions.json `14d80c34…`; rules unchanged) — the six wording items, the My Bid Count labels, "Hi <first name>,", Build D. Test site carries 229 / 393 (with Build D). Three readings for his confirmation: TODO §1 FILED block.
**The session, in order.** 9:09 PM opened (Mac; context 189,684) · 9:11 his: *"Make the best decisions you can since I won't be available.  I will leave mac on."* · *"try to keep going based on decisions i've made in the past"* · helpers: the freeze + its proof; the 229 builder (items 7–8 on `build229.py`); the Build D builder (`buildD.py`) · blind reviews: 229 HIGH 0 / MEDIUM 3 / LOW 4, Build D HIGH 0 / MEDIUM 1 / LOW 3 — no fix round · own suites, honesty-checked, mutants killed · ~1 AM the freeze proof FAILED → reverted, `un229` instead · gates: 140 targeted suites, 136 passed, 1 environment fail, 2 skipped · the pages re-made on the Mac from the two scripts (same bytes) and written into the repo; 15 suites re-run on the Mac's disk, all green · test site republished · filed about 4:30 AM.
**Lessons.** (1) **A freeze that swaps the page under test hides the page from the suite**: wrapping every undo entry point also froze the suites' own read of the NEW page — 17 suites went blind. Freeze only the BASELINE look-ups, never the step applied to the page under test. (2) **A suite with a cloud-only default path fails on the Mac**: `test-393-buildD` first pointed its baseline at a cloud scratch folder; it now makes the baseline itself from `5481ba4` with `build229.py` — a suite's fixtures must be reproducible from a SHA on either machine. (3) **This session has no file-sending tool**: deliveries went to `/mnt/user-data/outputs/` and on with `device_commit_files` to `_to_delete/xfer/`, then `unzip -p` per file, md5-checked (94 files, all OK).
**6:05 AM** he pushed (`10699b7`; tests `e34cd4e`; hub docs `5de54ed`) — served 229 / 19 / 393 twice, pushed bytes = gated; his ruling: the admin get-in wording goes into the admin clean-up (TODO §1); *"handoff"*.
**Session close** 28 Oct 2026 about 6:10 AM at about 300,000 tokens. LIVE 229 / 393. The close is docs only.
