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

## 29 Oct 2026 — "Vacation Auction 29 Oct 2026 V1" — ADMIN 396 FILED (THE ADMIN PAGE CLEAN-UP, §299) · BUILD 397 EXPLORED AND PLANNED
**State.** LIVE staff 231 / admin 395 / mobile 19 `5707d61`, schedule 54 / 154. FILED, NOT PUSHED: admin 396 (`7534e13e…` / versions `df21c801…`), the record its BUILD-LOG row. Test site carries 231 / 396. NEXT (his order 3:58 PM): build 397 — `tests/docs/build397-plan/PLAN.md` (its questions ANSWERED 5:28 PM; the Rules text goes to him on a review page first).
**The session, in order.** 6:14 AM opened (Mac; `git fetch` refused by the proxy — heads by `git ls-remote` from the cloud). 6:33 AM his answers on the clean-up (§299). 6:34–11:03 AM the page wording ruled item by item (`tests/docs/admin-cleanup/WORDING.md`): he cut it hard ("only the necessary info, not how to use"). 11:11 AM–12:26 PM the 143 pop-ups drafted by helpers, cut twice, approved on a review page. 12:46–12:59 PM the menu look approved on a phone test page. 12:59 PM his go to build HERE with helpers (Claude had recommended a fresh session). Built in the cloud by four scripts (s1 structure, s2 page wording, s3 pop-ups, s4 fix-ups), gated (new browser suite 165/165, honesty 104 red on 395, 97/97 suites), blind-reviewed (0 high), rebuilt byte-identical on the Mac by a helper, filed about 3:10 PM. 3:43–5:55 PM build 397 explored (helpers: items 1–3, the Rules page, the decision engine explained with examples RUN on the engine) and planned.
**Lessons.** (1) **`device_commit_files` exists and works** — load it with ToolSearch (`select:`); an earlier assumption that it was missing cost a base64 transfer (by a helper) that a safety check stopped part-way. (2) **Check a claim about which page shows a word before planning around it** — Claude said "Standard" was on the staff page; a grep of shown strings found none (he caught it). (3) **A summary must not narrow the finding** — the class hunt covered Under Review; the chat summary quoted only "Winning" and he thought it was missed. (4) **Approved wording can carry an old untrue line** — the Rehearsal Mode card's "cannot be turned on once the auction is live" was copied into an approved draft before anyone checked the code; check claims in text being shortened, not only its length.
**Session close** 29 Oct 2026 about 6:05 PM at about 540,000 tokens. Admin 396 filed, his push pending (three repos; no console step).

## 29 Oct 2026 — "Vacation Auction 29 Oct 2026 V2" — ADMIN 396 CONFIRMED LIVE · BUILD 397: THE CODE HALF BUILT AND TESTED, THE RULES TEXT APPROVED (§299) — NOTHING FILED
**State.** LIVE staff 231 / admin 396 / mobile 19 `8559eff`, schedule 54 / 154 (396 served by two cache-busted fetches, about 6:30 PM). Nothing on either site changed this session after his push; test site not republished (no page in a repo changed; it carries 231 / 396). Recorded: DECISIONS §299 (his 8:15, 8:16, 8:18 and 8:20 PM words), TODO §1 (the 397 STATUS line), BUILD-LOG row 22's commit column, START-HERE's LIVE line. The 397 work is on the Mac, md5-matched, in `tests/docs/build397-plan/`: `text/` (the approved Rules text `rules-text.json`, 170 items; `VERIFY.md`; the review page), `s1/` (the code half), `engine/` (the example runs).
**The session, in order.** 6:26 PM opened; 396 confirmed live, the records brought up to date. 6:31 PM his "go" on 397. Three helpers: the Rules text (every claim checked against the code; every example RUN on the engine, the six of the plan matching the saved run byte for byte, 11 more agreeing on the admin and staff engines); the review page in the admin look; the code half, s1 (items 1–3, "Loose" and the build numbers: 32 once-only replacements; `test-397-a.mjs` 65/0 on the new pages, 34 failing on 231 / 396). Claude read s1's whole diff. The review page (https://claude.ai/artifact/Cstvd4BGD2xS6BgLVeMPY2, v1 → v4): the opened section's heading brought to the top, the test labels removed, 2.23 removed, 4.6 / 4.10 worded his way, 7.6 added; 8:20 PM *"good as is"*.
**Next.** Build 397's second half in a fresh session, from the files above — nothing to re-ask: the Rules page (admin) from `text/rules-text.json` on top of `s1/out/` (opening a section brings its heading to the top); the two stale comments s1 left (TODO §1); then the gates (the whole diff read, the new suite with its honesty run on `8559eff`, `node --check`, the suites that read the changed code, the isolation guard), the engine examples re-run against 397, and filing.
**Session close** 29 Oct 2026 about 8:30 PM at about 235,000 tokens. All four repos fetched (tests: no credentials over the bridge, judged from disk); no build filed, so no battery or isolation run; test site — no page changed, not republished.

## 29–30 Oct 2026 — "Vacation Auction 29 Oct 2026 V3" — STAFF 232 / ADMIN 397 LIVE (§299): THE RULES PAGE, SWAP AND THE COMPETITION-WEEK RULES · BUILD 398 PLANNED AND RULED (§301–302) · RULE 24
**State.** LIVE staff 232 / admin 397 / mobile 19 `1f11b9c` (pushed 30 Oct about 5:40 AM, bytes md5-identical to the gated copies, served twice about 5:45 AM), schedule 54 / 154. Test site carries 232 / 397. NEXT: build staff 233 / admin 398 (the high-demand weeks builder) from `tests/docs/build398-plan/PLAN.md` — every question ANSWERED (§302, its §10), nothing to re-ask; `review.html` beside it is the approved wording (W1–W49, + W50 in PLAN §10). Filing order for 398: push, open the admin page once (required-builds reload), then use the builder (PLAN §5).
**The session, in order.** 8:27 PM opened (Mac). 8:28–8:30 PM the swap ruling joined 397 (§299). The 397 second half built in the cloud (s2 Rules page, s3 swap), gated (new suites with honesty red on `8559eff`, the reading suites, isolation, engine examples unchanged), blind-reviewed (0 high / 0 medium, 6 low → TODO), filed about 11:25 PM. 10:29 PM his order for the next build; 11:10 PM his answers (§301). Plan written by a helper with a phone review page; 5:44 AM his answers and rule 24 (§302).
**Lessons.** (1) **THE CONVERSATION WAS COMPACTED AT 432,032 TOKENS (30 Oct about 2:30 AM) — BELOW THE 550,000 LINE.** §264's lines assume the session can reach 650,000; this one could not. The 29 Oct V1 session reached about 540,000 without one, so the point moves. Put to him at the close; his decision. (2) **Two suites had gone stale since 396** (test-394 N6, test-396's M1 / W2 / "Loose"): repointed with version-aware conditions (rule 12) — run the suites that read changed code even when the last build's gate did not. (3) **Never stage a file and commit it to the Mac in the same parallel batch** — `device_commit_files` ran before the `cp` and wrote the OLD plan; the md5 check caught it. Stage, then commit, then md5. (4) **The test-site publish is refused until every site file has been read in this conversation** — read the out/ files before publishing.
**Session close** 30 Oct 2026 about 5:55 AM at about 200,000 tokens (after the compaction). All four repos clean and in sync before the close edits (`git fetch` refused by the proxy; heads by `git ls-remote` — vacation, schedule, hub match; tests judged by GitHub Desktop's status); no build since 397 was filed, so no battery or isolation run; test site — no page changed, not republished.

## 30 Oct 2026 — "Vacation Auction 30 Oct 2026 V1" — PLANNING ONLY: 398 AMENDED (§303) · RULE 25 (PLAN AND BUILD IN SEPARATE SESSIONS, A CHECKPOINT PER BUILD) · THE NEXT SESSION BUILDS 398
**State.** LIVE unchanged: staff 232 / admin 397 / mobile 19 `1f11b9c`, schedule 54 / 154 (served twice each, about 5:55 AM). Nothing built, nothing filed. **NEXT: build staff 233 / admin 398** from `tests/docs/build398-plan/PLAN.md` + its AMENDMENTS section — GO given (§303), nothing to re-ask; keep `tests/docs/build398-plan/CHECKPOINT.md` current after every step (rule 25).
**The session, in order.** 5:53 AM opened (Mac). 6:11 AM three 398 amendments asked; answered from the code: "Bid rule set" → "Competition weeks" (ruled); a competition-week failsafe control (6:17–6:18 AM CLOSED: the admin can already enter any bid on a competition week — a warning, never a refusal); 6:22 AM one "Calendar and Phases" card, its Edit opening the builder for both (ruled). 6:24–6:29 AM compaction: lines of 350,000 / 400,000 DECLINED; rule 25 ruled; the startup cost measured (about 165,000 tokens the app's own before any file is read; the ritual adds about 25,000).
**Lessons.** (1) A planning chat is the part of a session that varies — this one spent about 100,000 tokens on questions and rulings; a build session from a filed plan does not. (2) When a session must stop short of its lines, the checkpoint file is what saves a build, not the lines.
6:31–6:37 AM the startup cost: a dramatic cut is not possible from our files; Claude Code to be measured — FOR LATER, his (TODO §1). The 22 Oct 2026 V4 entry archived to `HANDOFF-ARCHIVE.md` (HANDOFF was at 894 / 900). A close-out script emptied `DECISIONS.md` (it opened the file for writing before its text check failed); restored from HEAD and §303 rewritten whole, same turn. **Lesson: read, check, THEN open for writing.**
**Session close** 30 Oct 2026 about 6:40 AM at 281,901 tokens. No build, so no battery or isolation run; test site — no page changed, not republished.

## 30 Oct 2026 — "Vacation Auction 30 Oct 2026 V2" — STAFF 233 / ADMIN 398 FILED (§301–304: THE HIGH-DEMAND WEEKS BUILDER) · BUILD 399 PLANNED AND RULED (§305: THE USERS PAGE TIDY + A STAFF KP E-MAIL ON / OFF ROW)
**State.** LIVE unchanged: staff 232 / admin 397 / mobile 19 `1f11b9c`, schedule 54 / 154 (served twice each at the opening, 6:41 AM). **FILED, NOT YET PUSHED: staff 233 / admin 398** (gated staff `2106d302…` / admin `76991fcc…` / versions.json `d39ebbc5…`; its BUILD-LOG row; START-HERE's FILED line). **Push order: push, open the admin page once, then use the builder.** Test site republished (31 / 31), carries 233 / 398. **NEXT: build staff 234 / admin 399** from `tests/docs/build399-plan/PLAN.md` + `PLAN-AMENDMENT-KP.md` (ANSWERS at its end) — GO given (§305), nothing to re-ask; checkpoint `tests/docs/build399-plan/CHECKPOINT.md`. Baseline: the 398 commit once pushed.
**The session, in order.** 6:39 AM opened (Mac; context 182,198 at the first reading). 398 built in the cloud from the filed plan by helpers (A builder / card merge / Smart Lock; B data twins, staff, "Competition weeks", Rules page; C the suite) as exact once-only patch scripts; integrated 7:35 AM; targeted gates green; a class hunt (40 suites) found only the two known repoints. Blind review: 1 HIGH not foreseen by the plan (Spring Break / Ski Week always saved high-demand) → put to him → **§304, the tick** (9:10 AM); 3 LOW fixed; a verify review of the fix round: sound, 2 LOW two-tab cases left for him (BUILD-LOG row). Filed about 9:05 AM. 6:56 AM he filed the Users page tidy (TODO §1); 9:03 AM "plan the next build" → 399 explored and planned by helpers; a phone review page published ("Users Page Review"); 9:37–9:38 AM the MAK → MMK rename asked and DROPPED; 10:04–10:59 AM answers, the staff KP row added and ruled (§305, W1–W37).
**Lessons.** (1) Rule 25 worked: a build from a filed plan, with helpers doing the code, went from 182,000 to about 345,000 tokens including two reviews and a fix round. (2) The container restarted mid-build (about 9:00 AM); the cloud workspace and the checkpoint survived — the checkpoint plus the zips on the Mac are what made that safe. (3) A plan line ("each one is high-demand") can silently contradict saved data; the blind review is where such a gap shows — hunt it on the stored shapes, not only the new ones.
**After the first close (11:09 AM – 1:07 PM).** He asked to build 399 here — advised against on the readings (§264), not pushed. "What else is left?" — §1 sorted against BUILD-LOG / DECISIONS: about 30 entries already shipped but still listed (tidy offered, not ruled). §306: three items CLOSED; the 397 review's L1 / L3 / L5 / L6 added to 399 (W38–W62), L2 / L4 left.
**Session close** 30 Oct 2026 about 1:10 PM at about 445,000 tokens (first close about 11:05 AM at 412,462). All four repos fetched (none behind origin; `tests` judged from disk); 398's targeted gates and isolation (36 / 36) on the gated bytes; no page changed after filing, so the test site stays at 233 / 398; `status.mjs` below.

## 30–31 Oct 2026 — "Vacation Auction 30 Oct 2026 V3" — STAFF 234 / ADMIN 399 LIVE (§305–313): THE USERS PAGE TIDY · THE STAFF KP E-MAIL SWITCH · THE 397 SMALL POINTS · THE TODO §1 TIDY · BUILD 400 AND THE SERVER RULED (§307–308, §314)
**State.** LIVE: staff 234 / admin 399 / mobile 19 `2872cb6` (pushed 31 Oct about 7:55 AM, served twice, pushed bytes = gated), schedule 54 / 154; rules `19058515` unchanged; test site carries 234 / 399. **NEXT SESSION: his choice — plan build 400 (§314: the Users page with no editing switch, FTE fixed from Phase 1, smaller boxes, the new card order, a confirmation e-mail for every alert change incl. the KP switch) OR the server's full review (§308). Ask which at the opening.**
**The session, in order.** 30 Oct 1:55 PM opened (398 found pushed; LIVE line updated). 399 built from the filed plans by helpers (admin patchA, staff patchB) as exact once-only patch scripts. 2:13 PM no file-copy tool this session → his "B": everything carried to the Mac as text and the patch scripts re-run on the Mac on the live pages, md5-matched (`tests/docs/build399-plan/build/TRANSFER.md`). 2:23 PM the TODO §1 tidy (§307: 32 entries + 4 lines archived verbatim, 393 → 322 lines). 4:07–4:13 PM the server answered and filed (§308). About 4:14 PM the container restarted: three helpers died unfinished and were not noticed until 5:40 PM. Blind reviews → fix rounds §309 (staff: the KP box emptied on every open and close — a pre-existing shared-computer leak) and §310 (an unsaved FTE drawn empty with a "1.0" hint); 8:05 PM §311 the KP row a switch; 31 Oct 7:14–7:34 AM §312 (the KP row name + switch only; a not-won bid an ordinary locked week; Rules 7.6 / 7.7) and §313 (the Users page trimmed, 🔑 removed); 7:38–7:53 AM §314 (400 ruled; 399 filed as it stood). Final gates 16 green on the final bytes; verify reviews no HIGH / MEDIUM. Filed and pushed 7:55 AM.
**Lessons.** (1) **A container restart kills helpers silently** — after any gap, check the helpers' transcript times and the scratch folders before saying "still running"; twice this session a dead helper was reported as running. (2) **Text transfer works and is exact**: patch scripts carried and RE-RUN on the Mac against the live pages, suites carried as `diff -u` + `patch`, parts of about 8 KB (16 KB failed with E2BIG), every part and whole md5-checked. (3) A build that keeps taking owner look changes after its gates should be filed and the rest planned as the next build — 399 took six rulings after its first gates; §314 ended it there.
**Session close** 31 Oct 2026 about 8:00 AM at 521,326 tokens. All four repos clean and in step (fetch refused by the proxy; heads read locally, the pushed bytes read from HEAD); gates and isolation (36 / 36) on the final bytes; test site republished (31 / 31); `_to_delete/` holds about 134 MB (the transfer parts in `xfer399/` and older) — his to empty; `status.mjs` below.

## 31 Oct 2026 — "Vacation Auction 31 Oct 2026 V1" — STAFF 235 / ADMIN 400 LIVE (§314–§315): THE USERS PAGE WITHOUT FTE EDITS FROM PHASE 1 · THE KP CHANGE IN THE ALERT CONFIRMATION + THE UNSUBSCRIBE NOTE · THE CAPACITY REPORT'S FIRST PAGE · THE SERVER REVIEW (§308) · NEXT: PLAN THE SERVER SENDING ALL E-MAILS (§316)
**State.** LIVE: staff 235 / admin 400 / mobile 19 `8166805` (pushed 31 Oct about 11:45 AM, served twice about 11:52 AM, pushed bytes = gated), schedule 54 / 154; rules `19058515` unchanged; test site carries 235 / 400 (v39). **NEXT SESSION: plan the server build — "the server sends all e-mails" (§316), from `tests/docs/SERVER-REVIEW-2026-10-31.md` and `tests/docs/server-stage1-plan/EXPLORE.md` (a helper was still writing it at the close: if it is on disk uncommitted, commit it with tests).**
**The session, in order.** 7:57 AM opened (399 found pushed). 8:00 his: plan 400 AND build it here (one-off to rule 25, §315), + the KP "off" tag removed, the server review alongside. 8:08–8:18 plan answered, test page (artifact "Users Page 400 Test"), "go" at 328,302. Helpers: admin builder, staff builder, server reviewer, two blind reviewers, a cloud test-site / browser runner. Reviews → fix rounds: staff 2 H (another tab's / an admin's change counted as the person's; case) → 235b, + 235c (the note's log on its send line, test-330); admin 1 H / 2 M → 400b; his 11:10 "no FTE edits after P1" → 400c; verify V1 → 400d; his "do it now" on V2 (Add User half-made) → 400e. 9:27 the red tint, 9:39 the capacity report joined 400. Filed about 11:40 AM; pushed about 11:45.
**Lessons.** (1) **`device_stage_files` copies Mac files into the cloud byte-exact** (md5-checked both sides, 31 Oct) — use it to carry pages, patch scripts and suites to the cloud instead of text transfer; the cloud then runs the test site and the browser suites the Mac cannot (Chromium is there, playwright in /opt/npm-tools). (2) Helpers on the Mac via `device_bash` work: builders, reviewers and runners each kept their own context, so a full build + two review rounds + three owner amendments fit under 470k. (3) A blind reviewer RESUMED for the verify (it keeps its findings) is cheap and caught V1/V2 that the builder's own suite did not. (4) Owner amendments during a build: file each the same turn, fold them into the next fix round, never into a page under review.
**Session close** 31 Oct 2026 about 11:58 AM at 493,329 tokens. All four repos fetched and in step with origin before the close edits; heads `8166805` / `506d…`(schedule unchanged) / `fe8270c` / `eba301a`; isolation 36 / 36 and the targeted gates on the filed bytes; test site 31 / 31 (v39); `_to_delete/` about 311 MB (this build's scratch) — his to empty; `status.mjs` below.

## 31 Oct 2026 — "Vacation Auction 31 Oct 2026 V2" — PLANNING ONLY: THE SERVER PLAN FINAL AND RULED (§317) · GO FOR BUILD A · THREE IDEAS FILED FOR LATER
**State.** LIVE unchanged: staff 235 / admin 400 / mobile 19 `8166805`, schedule 54 / 154, rules `19058515` (served twice, 11:53 AM). **NEXT SESSION: BUILD A** — read `tests/docs/server-mail-plan/CHECKPOINT.md` first, then PLAN + amendments 1–3 + WORDING (TODO §1 top line).
**The session, in order.** 11:53 AM opened; V1's `server-stage1-plan/EXPLORE.md` was never on disk — rebuilt by three helpers as `server-mail-plan/EXPLORE.md`. Plan v1 → blind review (REVIEW-1) → v2 → his answers 1:01–1:49 PM (§317) → his 2:05 question → a second sweep (AMENDMENT-1) → 2:28 GO and ONE Build B → On / Off folded (no page switch, 2:36) → the log from the outbox, "Not sent — off" grey, Clear records removed (AMENDMENT-2) → his 2:55 audit → two adversarial reviews (REVIEW-2-STAFF / -ADMIN) → truth notes dropped for dated lines, seconds when needed, one e-mail per person per minute, eight simplifications (AMENDMENT-3, 4:30–4:32). Side answers: billing exposure of the public keys (he then set the EmailJS allow-list, checked reCAPTCHA, set a budget alert); moving the whole site / the professional path. FOR LATER (TODO §1): the bid engine to the server; a proper sending service; the testing site (follows Build B).
**Lessons.** (1) **`device_commit_files` can land late:** a md5 read straight after a write (especially a multi-file write) several times showed the OLD bytes; re-commit that one file, wait a few seconds, re-check — never trust the first read. (2) **A heredoc with `'EOF'` passes `'\\n'` to Python as a backslash-n** — three DECISIONS bullets got a literal "\n"; caught and fixed the same turn; write real newlines. (3) **Rule 21 worked twice in one plan:** both times a reviewer found the newest mechanism (heads-up combining, then truth notes) could not be made true without the engine on the server, the simpler design went to him before any fix round. (4) Ask "what else reads or writes this?" as its own sweep before a plan is called final — his question at 2:05 found Messages, Restore and publish-on-open holes the design reviews had not.

## 31 Oct 2026 — "Vacation Auction 31 Oct 2026 V3" — BUILD A FILED (§316–§318): THE `mailOutbox` RULES BLOCK + THE MAIL SERVER — NOT PUSHED, NOT PUBLISHED, NOT DEPLOYED
**State.** LIVE unchanged: staff 235 / admin 400 / mobile 19 `8166805`, schedule 54 / 154, rules `19058515` (served twice, 4:41 PM). **FILED 8:48 PM, NOT PUSHED:** `vacation-kp.github.io` (`firestore.rules` md5 `ba28fdef` — the one new block; BUILD-LOG row), `tests` (`server/mail/`, `server/test/`, `DEPLOY-MAIL.command`, `SET-EMAILJS-KEY.command`, RA-2's new cases, `.gitignore` exceptions, `docs/server-mail-plan/build-a/`), hub docs. **NEXT (TODO §1 top line):** he pushes → RA-2 (his double-click) → console publish only if green → the EmailJS private key (`SET-EMAILJS-KEY.command`, on the Mac) → the OFF deploy → Build B.
**The session, in order.** 4:39 PM opened (Mac; the bridge's `git fetch` refused by its proxy, 403 — heads checked from the cloud with `git ls-remote`, all equal). Helpers: a data-shape reader (`build-a/SHAPES.md`, 1,770 lines quoted from the live pages); the contract written by the session (`build-a/SCHEMA.md`); a server builder and a rules builder in parallel; two blind reviewers. Review → fix round 1 (2 H: forged "bid removed" lines, an interrupted e-mail never re-sendable; the 30-minute look-back replaced by a `q` waiting flag) → verify found new LOWs in changed mechanisms → STOPPED, put to him (rule 21) → 8:16 PM his "small last round", no alert cap (§318) → final verify: one new very rare welcome point → 8:46 PM his question settled it (Send again is hidden after a Reset; Build B note) → filed 8:48 PM. 8:52–9:00 PM the EmailJS key, from his phone: his Security page shows Domains `https://anesthesia-kp.github.io`, "Allow EmailJS API for non-browser applications" OFF, "Use Private Key (recommended)" ticked but greyed (tip: "requests without the private key will be ignored"); Claude advised keeping non-browser OFF until the server's test e-mail (a change from PLAN §8.1, not ruled); stopped — he was away from the Mac.
**Lessons.** (1) **Never write a clock time that was not read** — the checkpoint's V3 step times were estimates and ran hours ahead; replaced by step numbers the same evening. Read `TZ=America/Los_Angeles date` on the Mac before writing any time. (2) **`device_commit_files` landed STALE bytes twice in one session** (once an intermediate version) — md5 after every write, re-commit with `force` and wait ~8 s; it then matched. (3) **`tests/.gitignore` ignores every `package.json` / `package-lock.json`** — a new folder that needs its own package files needs a `!` exception; check with `git status -uall`. (4) **`status.mjs` reads the START-HERE "FILED" line as a page-build line** — a filed build with no page change keeps its state in TODO §1 instead. (5) Blind reviewers RESUMED for each verify (they keep their findings) caught a new fault class each round at a fraction of a fresh review's cost.
**After the 9:02 PM close, with him (10:42–11:14 PM):** pushed (`25e6420` / `bbd010a` / `f7f25da`); RA-2 green 10:42 ("✅ BOTH"); the rules published 10:44; the EmailJS key stored 10:48 (secret v1); the live timer checked (Phase 3 complete — nothing for the server to close); `DEPLOY-MAIL.command` 10:52 (`mail:mailSender` created); EmailJS non-browser ON + "Use Private Key" ON (active only with non-browser on); `mailServer/control {sending:true}`; **the first server e-mail arrived 11:04 PM** (a test reminder to AF; record, last e-mail and meter checked). The timer-close test could not be run live (only acts on a phase NOT complete) → moved to the testing site (§319); **his "swap": the testing site is planned and built BEFORE Build B.** Lesson (6): **check a test's guards against the live state BEFORE describing the test to him** — "10 minutes in Rehearsal Mode" was put to him without checking that the close skips a completed phase.
**Session close (final)** 31 Oct 2026 11:14 PM at 490,877 tokens (read at the close). Earlier close line: Session close 31 Oct 2026 9:02 PM at 428,308 tokens. All four repos clean except this build's filed work; no lock files; `status.mjs` below; test site — no page changed, not republished; `_to_delete/xfer/` holds this build's zips (his to empty).

## 31 Oct 2026 — "Vacation Auction 31 Oct 2026 V4" — THE TESTING SITE PLANNED (§320–§321), THEN BUILT AND FILED IN THE SAME SESSION BY HIS GO (§322–§323) — NOT PUSHED
**State.** LIVE unchanged: staff 235 / admin 400 / mobile 19 `8166805`, schedule 54 / 154 (served twice, 11:17 PM). **The testing site FILED 11:52 PM, NOT PUSHED** (three repos; BUILD-LOG row; `tests/docs/testing-site-plan/` PLAN + CHECKPOINT). He did PLAN §5 steps 1–2 himself (Blaze 11:28 PM, rules 11:29 PM). **NEXT:** TODO §1 top line (push → fetch twice → the testing admin set-up → its mail server → the timer-close check → plan Build B).
**The session.** 11:16 PM opened (Mac; the bridge's `git fetch` worked tonight, its `maintenance.lock`s moved to `_to_delete/`). Read-only: the stamper dry-run in a device scratch copy (`~/stamptry`, outside the repos) — 5 causes of abort; relative fonts / pictures; the server needs only the project name changed; the console (Chrome): `crna-vacation` is on Spark, its data the August roster + settings (the read of its address lists was REFUSED by the browser safety check — not worked around). 11:20 PM his address `/vacation/testing/`, 11:21 PM both pages + landing cards (§320); plan put before 11:25 PM; 11:27 PM *"make it a thin red band.  all ok"* (§321).
**Build (11:30–11:52 PM, his "can we build it here?" — §322).** Scratch `~/tsbuild` on the device VM; one blind review → one fix round → verify → stopped on four new LOW guard holes (rule 21) → his "File it now" (§323). The render check PASSED a version whose band was hidden under the sign-in screen — only the screenshot showed it; the check now also reads the pixels. **Lessons.** (1) **`crna-vacation` lives under his SECOND Google account** (the console greets it "Vacation", `/u/1/`; the first, "A", lists only `vacation` and `Marathon Training`) — send him there by name, not by a bare link. (2) **A clock time was estimated AGAIN** (the plan's status said "~11:40 PM" when it was ~11:24) — V3's lesson 1 repeated within hours; corrected the same turn. Read `TZ=America/Los_Angeles date` before writing ANY time. (3) **A computed-style check can pass while the thing is invisible** — look at the screenshot, or check its pixels. (4) **`zip` cannot write into a connected folder** (it replaces a temporary file — a delete): zip in the VM home, then `cp` the zip across.
**Session close (final)** 1 Nov 2026 12:15 AM at 524,584 tokens (read at the close). After the push (11:54 PM), with him: the testing site served (pages, then the landing cards ~11:58 PM); Reset Auction; 20 users (AF, AVG + TA–TR, entered by Claude through his Chrome); the EmailJS key and the mail server on `crna-vacation`; Phase 1 begun; **the timer-close check PASSED 12:14 AM** (server log `"timerClosed":true`); the 20 welcome e-mails from the pages all arrived (so "Use Private Key" does not block page sends). Earlier close lines: 11:53 PM at ~472k; 11:27 PM at 315,195. Uncommitted: docs only (BUILD-LOG, TODO, MAP); no lock files; test site — no live page changed.

## 1 Nov 2026 — "Vacation Auction 1 Nov 2026 V1" — BUILD B BUILT, FILED FOR THE TESTING SITE, PUSHED AND TRIED THERE (§324–§329) · BUILD B2 PLANNED AND RULED (§330) — NEXT SESSION: B2, THEN LIVE
**State.** LIVE unchanged: staff 235 / admin 400 / mobile 19 `8166805`, schedule 54 / 154 (served twice). **Testing site: staff 236 / admin 401** (`06ef5ad`, pushed by him 5:20 PM, served twice) with the 3-minute / §326 server deployed on `crna-vacation` and `mailServer/control {sending:true}` there. The gated live Build B bytes are in `tests/docs/server-mail-plan/build-b/gated/`; **NEXT SESSION: BUILD B2** (`tests/docs/server-mail-plan/build-b2/PLAN.md` — 90-second alerts, "within a few minutes", Messages' address list kept at send time, no "." in new initials; 237 / 402 / 156), try it on the testing site, then go live (TODO §1 top line).
**The session, in order.** 12:16 AM opened; 12:18 his "is b not mostly planned already?" — yes; W11 / W14 found contradicting AMENDMENT-3 → 12:21 "a-yes. b-go here overnight…" (§324). Overnight: a planner helper (BUILD-STEPS.md, 4:17 AM) → builders S, A1, A2, SCH in parallel; S, SCH done by ~6:40; **A1 and A2 were STOPPED at 6:36 AM by his interruption of a main turn and not noticed until 9:49 AM** (lesson 1) → his 9:57 "go" → both relaunched. Daytime rulings: §325 (3 minutes, "within 5"), §326 ("Send again" after the server's off switch, his "1" after asking why the switch exists), §327 (two texts), §328 (one last round, stopped by rule 21), §329 (no old-log export), §330 (B2). Two blind reviews → fix round → verify 1 (new faults in touched mechanisms — stopped, put to him) → last round → verify 2 → filed as it is (5:13 PM). He pushed 5:20, deployed the testing server 5:23, set the switch 5:25 and tried it 5:30–6:08 PM: bidding alert after its wait, an add-and-cancel dropped, confirmation, a Message, a reminder, alerts OFF → grey "Not sent — off", Phase 3 results 19 / 19 (he counted 17 in Gmail; EmailJS History 19 sent — Gmail stacking). For later (TODO §1): review every default setting; FTE "apply to all weeks"; "Certain bid changes…"; "Timer Expired" on the timer card; a Refresh button on the E-mail Log; "Notify if a week opens up" under strict rules + a ready-made engine-checked test; the welcome bullets' indent (after live, HTML e-mail).
**Lessons.** (1) **An interruption of the main turn STOPS every background helper, and they cannot be resumed** — and a helper's FILES are not proof it is alive: check its transcript is still growing before saying "still working" (the 7:23 AM "still going" was wrong for three hours). Ask him to send a message, never press stop, while helpers run; save scratch to the Mac as a zip at each step (step 10 did; nothing else was lost). (2) **A builder's suite that STUBS another package's helper can pass a real fault** (admin H1: `_moRetry` refused an "off" root; caught only by the blind review) — after a merge, re-run every suite on the merged page with the real helpers, no stand-ins for code that exists. (3) **Removing unapproved wording can remove a needed warning** (N1: partial write failures went silent) — when a fix round strips a text, ask what the user is told instead; bring the gap to him as wording, never leave it silent. (4) The DECISIONS file reviewers read must be the one with the session's rulings (the cloud copy lacked §324–§326 until staged).
**Session close** 1 Nov 2026 about 6:18 PM at about 515,000 tokens. All repos fetched and in step with origin after his 5:20 PM push; uncommitted: hub docs (DECISIONS §329–§330, TODO, HANDOFF, MAP), `vacation-kp.github.io/BUILD-LOG.md` (the Build B row marked pushed / tried), `tests` (the two checkpoints, `build-b2/PLAN.md`); test site — no live page changed, not republished; `_to_delete/` about 144 MB (this build's zips) — his to empty.

## 1–2 Nov 2026 — "Vacation Auction 1 Nov 2026 V2" — BUILD B2 BUILT, TRIED ON THE TESTING SITE AND LIVE (staff 237 / admin 402 / schedule admin 156, §330–§331) · BUILD 403 EXPLORED, PLANNED AND RULED (§332–§333)
**State.** LIVE: staff 237 / admin 402 / mobile 19 `ba14b75`, schedule 54 / 156 `f82be00` (pushed by him about 9:00 PM 1 Nov, served twice; `requiredBuilds` 237 / 402 and `phases.mailAuctionId` written; the 90-second server deployed on both projects; rules `ba28fdef` unchanged); test site v40 carries 237 / 402. **The server sends every e-mail.** **NEXT SESSION: BUILD 403** — `tests/docs/build403-plan/PLAN.md` (TODO §1 top line).
**The session, in order.** 6:19 PM opened. B2 built with helpers (server; admin page) and the session (staff, schedule): 90-second alerts, "within a few minutes" wording, Messages keep their address list at the send, no "." in new initials. One blind review (0 H / 0 M / 3 L) → fix round → verify (one new LOW: a silent press, his "1": left silent, §331). His 7:37 PM: no full schedule battery. Testing site 8:30 PM, tried by him 8:32–8:40 PM; "go live" 8:41; live console checked (mailQueue empty; results 1–3 sent) → `DEPLOY-MAIL.command` 8:57 → pushed ~9:00 PM. Then build 403 explored by three helpers (`EXPLORE-FIXES.md`, `EXPLORE-DEFAULTS.md`, `EXPLORE-HTML-EMAIL.md`) and ruled with him 9:19 PM–3:41 PM next day (§332–§333): small fixes; his own FTE Availability design; #0; the defaults review stopped after his "don't overbuild" (1:45 PM) — kept: Reset's timer from Timer Rules, leftovers removed, the setup lock changeable after Phase 1 with two confirms (a rules change), Priority Lock fixed ON with a real description, Allowed lowerings moved under Strict / Loose; HTML e-mail in the look of the staff Rules & Reminders box; wording approved on the testing site, one title per dialog.
**Lessons.** (1) **Put questions to him short — one decision per line, the recommendation in brackets.** A long wording list was "too long and confusing" (2:51 PM); the defaults table drew "take them more slowly and 1 at a time" and "you left out items" — list everything by name, decide few. (2) **Before saying a feature exists, check it is reachable in HIS state** — the "Unlock to edit…" link exists only while the setup lock is ON; his is OFF, so he never saw it (his screenshot 9:58 AM). (3) **Check his memory against the record and say so with the quote** — his "Priority Lock off by default" vs his own 22 Oct "priority lock on" (§292); he accepted it. (4) A rules-enforced restriction (the setup lock, the mid-phase freeze) turns a "simple" page change into an RA-2 + publish; say so before he chooses.
**Session close** 2 Nov 2026 about 3:45 PM at 535,036 tokens. Uncommitted at the close: hub (DECISIONS §332–§333, TODO, MAP, HANDOFF) and `tests` (`docs/build403-plan/` — PLAN, CHECKPOINT, three EXPLORE files); `vacation-kp.github.io` and `schedule` clean (his earlier commits). Test site current (237 / 402). `_to_delete/` holds this session's transfer zips — his to empty.

## 2 Nov 2026 — "Vacation Auction 2 Nov 2026 V1" — BUILD 403 BUILT AND FILED FOR THE TESTING SITE (staff 238 / admin 403 + rules `5c3e83c1` + the HTML e-mail server, §333) — NOT PUSHED
**State.** LIVE unchanged: staff 237 / admin 402 / mobile 19, schedule 54 / 156 (served twice at the opening). Filed, not pushed: `testing/` 238 / 403, `firestore.rules` `5c3e83c1`, the server (template id a PLACEHOLDER until his new EmailJS template), suites, `tests/docs/build403-plan/gated/`. **NEXT: TODO §1 top line** (pushes → RA-2 → testing rules → the EmailJS template and its id → testing deploy → his testing round → go live).
**The session, in order.** 6:03 PM opened (206,821). Live settings read in his Chrome: live Priority Lock true, testing false (he set it ON 7:06 PM); setup lock not stored on either. Phone test page → his 7:06 PM dash + plain list. Six helpers (staff, admin ×2, rules, server, page) → merge (three old build-number checks repointed) → two blind reviews (no HIGH) → fix round (+ his 9:04 PM restore ruling; re-lock-on-leaving declined as unreliable) → verify: two new faults in E → stopped, put to him (rule 21) → his 10:29 PM "Agree with wording" → last round → filed 10:40 PM.
**Lessons.** (1) Two helpers patching one page in parallel works when each keeps its anchors inside its own functions, but they wrote the Rules text file to two different paths and both edited six shared suites — name ONE shared data path and one owner per shared suite in the brief. (2) Helpers could not write REPORT.md (blocked) — ask for the report in the hand-back only. (3) Leaving a folder out of a transfer tar (`rules-emu/`) makes it look deleted to a helper — say so in the brief.
**Session close** 2 Nov 2026 about 11:22 PM. After filing: he pushed, ran RA-2, published the testing rules, made the new EmailJS template `template_l9fr654` (filed), deployed the testing server and tried 403 there — all good except the setup-lock confirm (UNLOCK typed both ways). NEXT SESSION (§333 11:20 PM): fix that confirm, explore mid-phase edits of the frozen settings, review every outstanding item, then go live — TODO §1 top line.

## 2–3 Nov 2026 — "Vacation Auction 2 Nov 2026 V2" — PLANNING ONLY: BUILD 404 PLANNED AND RULED (§334) · THE OUTSTANDING-ITEMS REVIEW (32 CLOSED, 2 INTO 404) · RULE 26
**State.** LIVE unchanged: staff 237 / admin 402 / mobile 19, schedule 54 / 156 (served twice at the opening, 2 Nov 11:22 PM). Testing site unchanged (238 / 403). Nothing built, nothing filed for pushing but docs. **NEXT SESSION: BUILD 404** — `tests/docs/build404-plan/PLAN.md` (TODO §1 top line); nothing to re-ask (rule 25).
**The session, in order.** 11:21 PM opened (209,794); HANDOFF archive pass (899 → 870; the 27–28 Oct entries archived, their lessons promoted to STANDING TRAPS). (a) the setup-lock confirm patched in scratch, stopped by him at 11:26 PM (usage) — not saved, his word; the wording ruled, then superseded. Overnight to 12:49 PM: (b) explored read-only (the freeze vs the setup lock), then his redesign — one rule, no switch; one Settings page (test page "Settings Page Test", nine versions on his phone); Strict means no lowering limits; Last bid / Last Bids; every edit confirms (§334). The Mac bridge dropped about 10:20 AM — planning went on from the public repos cloned in the cloud; filing waited. 12:49 PM–7:14 PM: (c) the review of every open TODO item on a review page ("Outstanding Items Review"), his answers pasted back (§334, `REVIEW-2026-11-03.md`); rule 26 from his reaction. Filed 7:2x PM.
**Lessons.** (1) **Take the context reading; never estimate it** — at about 10:20 AM it was reported as "about 265,000" from memory; the measurement an hour later was 350,115. A long planning chat costs far more than it feels. (2) **When the bridge drops, the public repos are still readable** — `git clone --depth 1` of `anesthesia-kp/vacation` and the hub from the cloud let planning and the review go on from the pushed copies; only filing has to wait. (3) **Parse-check a patch script before it goes to the Mac** — a single-quoted Python string broke on an apostrophe ("session's"); `ast.parse` in the cloud first. (4) **Check approved wording against the code before building on it** — 403's "For Loose rules: …" on Allowed lowerings was untrue (the limit applies under both rule sets); found only when he asked to hide the cards under Strict. (5) A long list of decisions on a review page took him one pass (rule 26).
**Session close** 3 Nov 2026 about 7:25 PM at about 480,000 tokens. All repos fetched, in step with origin. Uncommitted: hub (HANDOFF archive pass + this entry, DECISIONS §334, TODO §1 + the closed marks, START-HERE rule 26, MAP) and `tests` (`docs/build404-plan/` — PLAN, REVIEW); `vacation-kp.github.io` and `schedule` clean. Test site — no page changed, not republished. `_to_delete/` about 348 MB — his to empty. **⛔ HOLD, HIS, 3 Nov 2026 8:52 PM, verbatim: *"don't start building in next session, wait for my go since I'm low on usage"* — the next session does the §4 ritual, reports, and WAITS for his go before any build step.**

## 3–4 Nov 2026 — "Vacation Auction 3 Nov 2026 V1" — BUILD 404 BUILT AND LIVE ON BOTH SITES (staff 239 / admin 404, §334–§341) · RULE 27 (LIVE AND TESTING TOGETHER) · FIVE LATER ITEMS + THE PHASES WATCH CLOSED · NEXT: PLAN NOTIFY, BATCH ADD, "WHY?"
**State.** LIVE: staff 239 / admin 404 / mobile 19 on the live site and `testing/` (auction `896fb7e`, records `46d98c9`), schedule 54 / 156 — served twice each, 4 Nov about 7:20 PM; `requiredBuilds` 239 / 404; rules `063fe451` on both projects; 403's HTML mail server on both. Test site v41 (404 / 239). All four repos clean and in step with origin. **NEXT SESSION: PLAN** Notify-under-Strict, batch-add users, "Why?" answers (TODO §1, his 5:42 PM); his 404 tryout on the testing site whenever he likes.
**The session, in order.** 3 Nov 8:54 PM opened (209,325), his hold kept. 10:15 PM plan check → §335 (B2 already done since 220; D1 kept). 4 Nov 2:44 PM *"Usage reset. Go."*: four helpers in parallel (rules, staff, admin logic, admin Last Bids), then the layout helper on the merged page; §336 two staff fixes, §337 Last Bids texts made true, §338 cards fold; gates on 120 older suites; three blind reviews + two verifies — no HIGH; rule 21 stop after the first verify → §339 (the bid box closes); filed 5:00 PM for testing; §340 his rule 27 → filed live too; live server found one build behind (B2) → `DEPLOY-MAIL.command`; RA-2 ✅ BOTH 7:11 PM; pushed 7:19 PM; LIVE line 7:22 PM. §341: four Later items closed after checking the code; the phases record measured (33 KB; Reset rewrites it) and its watch item closed.
**Lessons.** (1) **A build that sits on an unreleased build carries that build's deploy steps** — 403's mail server had reached the testing project only; checked in the Functions console (last deployed date) before trusting "already deployed" (rule 27 now: every deploy on both projects in the same go). (2) **A claim read from code is a hypothesis; run it** — a helper's "Clear lowers the week's minimum for everyone" was wrong when run (rule 20a). (3) **Check the code before listing an item as open** — "pages refresh on load only" had been untrue for weeks (rule 14). (4) Helpers cannot write `.md` files — the session saves their reports itself (`build404-plan/LANE-REPORTS.md`, REVIEWS, GATES). (5) A container restart killed one helper mid-run; its files survived and it resumed from its own record — send each helper's output to the Mac as it finishes. (6) The cloud's `rm -rf <dir>/*` is refused by a safety check — make a fresh directory instead.
**Session close** 4 Nov 2026 about 7:30 PM at about 470,000 tokens. Everything pushed but this entry, TODO's trim and the regenerated MAP (hub). `_to_delete/` about 424 MB — his to empty (§190).

## 4 Nov 2026 — "Vacation Auction 4 Nov 2026 V1" — PLANNING ONLY: BUILD 405 PLANNED AND RULED (§342) · NOTIFY UNDER STRICT RUN ON THE ENGINE · RULE 28 · NEXT: APPROVE R1–R11, THEN BUILD 405
**State.** LIVE unchanged: staff 239 / admin 404 / mobile 19 on the live site and `testing/`, schedule 54 / 156 (served twice each at the opening, 7:3x PM). Nothing built, nothing filed for pushing but docs. **NEXT SESSION (his 9:24 PM): put the S1 reason lines R1–R11 to him (`tests/docs/build405-plan/PLAN.md`, "Reason lines"), then build admin 405 / staff 240 from PLAN.md in the same session** (TODO §1 top line).
**The session, in order.** 7:27 PM opened (209,382). Part 1: "Notify if a week opens up" run on staff 239's own code (`probe-notify-strict.mjs`, `PART1-NOTIFY-FINDINGS.md`) — no build needed. Part 2: Add User read; batch add drafted. Part 3: a read-only helper inventoried every blocked action (`PART3-WHY-INVENTORY.md`). 8:05 PM the review page "Build 405 Decisions"; N and B ruled as recommended, B7 gmail.com only (8:17 PM). 8:18 PM his direction: take the words OUT of the boxes, behind one "Why?". The phone test page "Why Box Test" (8 cards, v1–v11) reworked with him to 9:20 PM "good" — one answer per Why, the Remove box bare, the combination "Available" line kept. 8:46 PM rule 28 (staff never see Strict / Loose). 8:27 PM the admin Rules-page search filed for later. 9:23 PM one build, live and testing together. PLAN.md written; 9:24 PM his hand-over.
**Lessons.** (1) **Check a helper's or one's own premise against the code before putting a question** — W2 ("phones draw their own drop-down") was false since staff 202's tiles; caught only when reading the box's markup for the test page (rule 14). (2) **Run the engine, again (rule 20a)** — the 1 Nov hand-worked answer on Notify was wrong on two counts. (3) **A question built on a page's machinery reads as noise to him** — he answered "what is necessary to say here" by removing, not adding; offer the bare version first (rule 21). (4) Test-page cards built from the page's own `<style>` blocks (cloned public repo, md5 = device) took no layout round-trips.
**Session close** 4 Nov 2026 about 9:35 PM at about 445,000 tokens. Uncommitted: hub (DECISIONS §342, START-HERE rule 28, TODO §1 + the Rules-search item, this entry, MAP) and `tests` (`docs/build405-plan/`: PLAN, CHECKPOINT, PART1–3, the probe, both test pages' HTML). `vacation-kp.github.io` and `schedule` clean. Test site — no page changed, not republished. `_to_delete/` about 424 MB — his to empty (§190).

## 4–5 Nov 2026 — "Vacation Auction 4 Nov 2026 V2" — BUILD 405 (staff 240 / admin 405) AND STAFF 241 BUILT AND LIVE ON BOTH SITES (§343–§345) · NEXT: PLAN THE "CAPACITY" RENAME
**State.** LIVE: staff 241 / admin 405 / mobile 19 on the live site and `testing/` (`dad2722`, served twice each about 8:40 AM), schedule 54 / 156 unchanged. Test site v43 (241 / 405). **NEXT SESSION: plan the rename "FTE available" → capacity everywhere** (TODO §1 top, his 8:26 / 8:31 AM), on a review page, then build. For him: the ~20-person "Add several users" try on the testing site (§344 A6).
**The session, in order.** 9:29 PM opened; 9:36 PM reason lines approved (§343, R7/R8 "weaker than"). Two helpers built the lanes (staff S, admin A) overnight; merged, BUILD 240 / 405, stamped. 7:04 AM wording page "all as recommended" (§344); S2 put back (Claude's words were false) and ruled in his words 7:26. Blind review: 1 BLOCKER (the confirm line never hid again in one page load) + 1 SHOULD-FIX (proposed initials on a departed winner) fixed and verified; MINOR left by him. Filed, pushed 7:54 AM, served. 7:59 auto-scroll asked; 8:15 his R9 / own-weakest choices (§345); the 241 review found R9 false for re-bidders (live since 240) — fixed; 241 pushed 8:37 AM, served.
**Lessons.** (1) **The test site goes up BEFORE his push (§278)** — missed on 405 (republished after), done right on 241. (2) **Check a recommended wording against the page's own predicate before putting it to him** — S2 ("can only be weakened to a bid that still wins") was false for the sole winner; a real-board check (K2) caught it before filing. (3) **A suite that builds a fresh page per case cannot see state carried between openings** — add one same-page-load sequence per box (the confirm-line BLOCKER). (4) **Fuzz the no-live-bid shape** (re-bidding from a floor): the helper's 200,000-board fuzz found a live wrong R9 number the suite's random boards never produced.
**Session close** 5 Nov 2026 about 8:45 AM at about 405,000 tokens. Uncommitted at the close: hub (TODO, START-HERE, DECISIONS, this entry, MAP), `vacation-kp.github.io` (BUILD-LOG commit column), `tests` (CHECKPOINT). `schedule` clean. `_to_delete/` about 4 MB (two transfer zips + three lock leftovers) — his to empty.
