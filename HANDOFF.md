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

**⛔ NO TOKEN LINE STOPS A SESSION (§437, 13 Nov 2026: *"Remove 550 and 650 limits, they aren’t helpful."*) — instead rule 33: everything goes to the Mac as it is made, so this checklist only CHECKS. No context reading is measured or reported (§496).**

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
- in the cloud, with the repos laid out as for the battery: `GH_ROOT=<root> node tests/testsite/testsite-check.mjs` — it rebuilds `tests/testsite/out/` from the pages on disk (refusing a page mid-build or one where a live address would survive) and drives it in Chromium; it must say **35/35 passed, exit 0** (the private artifact is "the rehearsal site", §465);
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
| `tests/_archive/<area>/<category>/` (in the private tests repo — §529) | superseded but real: old audit reports, retired suites, prior revisions of a document, session records. Areas are `vacation`, `schedule`, `tests`, `anesthesia` — **use those four, never invent a sibling** | **NOBODY — `_archive` is KEPT FOREVER.** "Nothing is ever deleted" means archived, not erased |
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

**⛔ NO COMMIT LINES IN THE CHAT (owner, 14 Nov 2026, DECISIONS §458, replacing §246):** *"I don't plan to use github desktop at all.  i still need next session start prompt at each close."* Each repo with something to push has its one line in `<repo>/COMMIT-MESSAGE.txt`; the hand-over names those repos and says ▶ RELEASE. No copy-boxes, no `COMMIT-MESSAGES.txt`.

**⛔ `START-HERE.md` NO LONGER GOES TO THE OUTPUTS COLUMN (§280, 15 Oct 2026 — his *"yes stop that"*, replacing §212's order of 17 / 22 Sep).** Instead, **the short start message from `SESSION-START.md` goes IN THE CHAT, in its own copy-box** — at the hand-over ONLY, never mid-session (owner, narrowed 12:01 PM: *"next session start message should only be displayed when handoff routine is performed."*; first: *"always present the new, shortened start here message with the commit lines within the chat so it's easy to copy and start the next session.  Ensure that's remembered."*). Copy it from the file, never retyped. **NEVER paste START-HERE itself into the chat (DECISIONS §247, tried and WITHDRAWN 6 Oct 2026).**

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

**`device_commit_files` CAN WRITE AN OLDER COPY OF A RE-USED STAGED FILE NAME** (20 Nov 2026 V3, twice): a file re-written under `/mnt/user-data/outputs/` with the SAME name and committed again landed on the Mac as its PREVIOUS version (md5 of the old one), even after a few seconds' wait. Stage each new version under a NEW name (`CHECKPOINT-B.v4.md`) and commit it to the real path; md5 the Mac's file after every commit (that check is what caught it).

**`get_page_text` READS HIDDEN TEXT AS IF IT WERE ON SCREEN** (19 Nov 2026 V1, twice in one run): "Bidder names are hidden" and the Popcornometer's "Quiet, no changes yet" were both inside `display:none` boxes; the second became a false review-page finding (§536 Q1, withdrawn). Before reporting what a page SAYS, check the element is visible (`offsetParent`, computed `display`) or read a screenshot.

**COMPUTER USE CANNOT TYPE INTO TERMINAL — ▶ RELEASE CANNOT BE DRIVEN FROM HIS PHONE** (19 Nov 2026 V1): Terminal is granted at the "click" tier (no typing), so the release's `y` needs him at the Mac; he declined setting up remote desktop (§536 3:25 PM). Do not offer to run the release by computer use.

**THE BRIDGE SHELL CANNOT WRITE `/tmp`** (19 Nov 2026 V1): `> /tmp/x` fails "Permission denied" and a later `tail /tmp/x` reads a STALE file from an earlier session — write scratch to `$HOME` instead.

**CLAUDE IN CHROME SEES ONLY ITS OWN TAB GROUP, NEVER HIS OPEN TABS** (18 Nov 2026 V5): when he says a page is "already open", `tabs_context_mcp` shows nothing of his; open the same address in a new tab of the session's group (his sign-in carries over; the MD admin still needs its "Continue" click). Read the MD site VIEW ONLY: page text and `javascript_tool` reads; on the admin, expand/collapse and page links only — never a button that saves, sends, begins, resets or restores.

**IN HIS CHROME THE SCREENSHOT FRAME AND THE PAGE CAN SHIFT MID-SESSION** (17 Nov 2026 V4): the tab's frame went from 1440 to 1171 wide and the rehearsal page's header later sat 8 px lower, so stored click coordinates landed on the wrong control. Take a screenshot (its reply names the frame) before reusing any coordinate, and after every sign-in, reload or window change.

**A HELPER (SUBAGENT) CANNOT WRITE ITS OWN REPORT FILE** (16 Nov 2026 V3, all three build helpers): the environment refuses a subagent writing a report `.md`; each returned its report as its final message instead. Brief helpers to return the report as their final message (their build scripts, suites and diffs they CAN write); Claude files the report to the Mac when it arrives (rule 33).

**HIS CHROME CAN BE "NOT CONNECTED" FOR A WHOLE SESSION, AND THE APP'S BUILT-IN BROWSER IS NOT SIGNED IN TO CLAUDE.AI** (16 Nov 2026 V3). The built-in browser reads the public sites (§4 step 2, §481) but shows "Sign in to view this page." for the rehearsal site (a claude.ai artifact); Claude never types his sign-in. A session that needs the rehearsal site in a browser needs his Chrome connected, or him signed in to claude.ai in the built-in browser.

**A NEW STAFF OR ADMIN BUILD NUMBER TURNS ABOUT 20 ACTIVE SUITES RED FOR REASONS THAT ARE NOT THE BUILD'S** (14 Nov 2026 V4, staff 259). `RETIRED-SUITES.txt` covers only the old `un<N>` chain; the active suites of builds 248–258 still read the pages through the newest put-back library (`lib427.mjs`: `S258` / `un258` / `BUILD_STAFF`) and pin the build number and the versions.json pair. On a 259 page the put-back did not recognise it, so they "lost" functions (`_splitHalfLabel is not defined`) — 300+ reds that looked like a broken build. The fix, two scripts: teach the newest library the new build (its pairs READ out of the build script and checked md5-equal — `tests/docs/site-label/lib427-259.py`) and repoint the pins that remain (`repoint-259.py`, old line kept as a comment). **Always run the same suites on the LIVE build side by side**: a red is the build's only if the live build is green there (many share reds in the cloud because its shallow clone lacks old commits).

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
- **A helper that says it is "waiting on its own background work" may still write files** (14 Nov 2026 V5): check for running processes before filing its files, and compare its files with the Mac's again after its final notice.
- **Helpers return their report as their final message** (10–13 Nov 2026): their sandbox may refuse to write report files; brief them to put the whole report in the final answer.
- **Never write a clock time that was not read** (31 Oct 2026, twice in one evening — a checkpoint's estimated times ran hours ahead): run `TZ=America/Los_Angeles date` on the Mac before writing ANY time. (Promoted 7 Nov 2026 V4 from the 31 Oct V3 / V4 entries.)
- **`tests/.gitignore` ignores every `package.json` / `package-lock.json`** (31 Oct 2026): a new folder that needs its own package files needs a `!` exception; check with `git status -uall`.
- **`status.mjs` reads START-HERE's "FILED" line as a PAGE build** (31 Oct 2026): a filed build with no page change keeps its state in `TODO.md` §1, not in that line.
- **`zip` cannot write into a connected folder** (31 Oct 2026 — it replaces a temporary file, which is a delete): zip in the VM home, then `cp` the zip across.
- **A computed-style check can pass while the thing is invisible** (31 Oct 2026: a band hidden under the sign-in screen passed): look at the screenshot, or check its pixels. Blind reviewers RESUMED for each verify (they keep their findings) catch a new fault class each round at a fraction of a fresh review's cost.
- **The device VM's `/tmp` can hold OLD files and refuse writes** (18 Oct 2026): `node status.mjs > /tmp/st.out` failed on permission, so the script never ran, and the `tail /tmp/st.out` after it printed a stale 15 Oct run (admin 379) as if it were today's. Write outputs under `$HOME`, read the exit code, and check that the output names today's builds.
- **A cloud CONTAINER RESTART kills every background job** (18 Oct 2026, build 219): batteries and agents running in the background are lost; run batteries in foreground chunks with results on disk, and resume agents by id.
- **A SUBAGENT HERE CANNOT WRITE ITS OWN REPORT FILE** (18 Oct 2026): have it return its findings in the reply and save them yourself.
- **The rehearsal's honesty run rebuilds the shared output folder** (15 Nov 2026): rebuild the rehearsal site (with its gate) before publishing, or the old layer goes out.
- **A helper's proof is not the owner's requirement met** (15–16 Nov 2026): before saying a run met what he asked, count it in the run's own record.
- **`mobile.html` is retired** — a 39-line forward to the staff page; it has no bid box, list or alert window of its own (read 15–16 Nov 2026).
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
- The device VM has no zsh (macOS does) (20 Nov 2026 V2): `test-release-tools` runs in the cloud, not through `device_bash`.
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
- **The rehearsal site (the claude.ai artifact) in his Chrome is screenshot + click only** (16 Nov 2026): `read_page`, `find` and `get_page_text` see only the claude.ai frame, and scripts on claude.ai are refused without his approval card — never work around that. A native `<select>` is set by focusing it (click, then Escape) and TYPING the option's text; arrow keys do nothing. The sign-in picker's search box needs a click first (it has no focus) — a click a few pixels low signs in the person in the list instead; zoom on the result before clicking it. Every first sign-in shows the KP e-mail box, which covers the page. If he resizes the window the coordinates move; ask him to leave it, and screenshot after any doubt.
- **On the rehearsal site, Send Results strands the phase** (16 Nov 2026, F5 — there is no mail server): use "Skip sending (testing)". A reset is the only way out once sent.
- **In his Chrome the window size changes under you** (16 Nov 2026 V4): screenshot before every click; focus-click a heading, never the page's right side. **Its tab group can vanish between turns** ("Couldn't determine which page", 16–17 Nov V5): `tabs_context_mcp` with createIfEmpty, then navigate again. **Count a rehearsal run as done only when its auction is finished** (V4).
- **A Chrome pass goes to ONE helper at a time** (17 Nov 2026 V2, V5): screenshot runs fill the chat fast, so each part goes to a helper with a written brief on the Mac (`tests/docs/rehearsal-final/CHROME-BRIEF.md` is the pattern), which writes each item to CHECKPOINT before it reports; two at once would clobber the one rehearsal site. A server restart stops a running helper without a report — it is then stopped, not running: check what it wrote, then resume it by message.
- **He CAN work on the Mac while Chrome control runs** (17 Nov 2026 V5, correcting V2's "he cannot work on that Mac while a run goes"): clicks and typing go to the tab, not his mouse and keyboard; each screenshot may bring Chrome to the front, so his typing can land in the page then. Tell him: other apps, or a separate Chrome window, and mind keystrokes when Chrome jumps forward.
- **Chrome will not make a window narrower than about 500 px, and a full-screen window cannot be resized at all** (17 Nov 2026 V5): `resize_window` cannot reach a phone. Phone width is checked in the CLOUD, headless at 390 × 844 with touch (`tests/docs/rehearsal-final/phone/phone.mjs` + a scenario). **Never press the full-screen key (cmd+ctrl+f) in his Chrome** — it toggles; a helper pressed it after he had taken the window out of full screen. Ask him instead.
- **`device_bash`'s `/tmp` is not writable and can hold another session's old files** (17 Nov 2026 V5): `node status.mjs > /tmp/x` failed, and a `tail` of an old `/tmp/st.txt` showed a stale "START-HERE IS STALE" that this session never produced. Never redirect there; read output directly.
- **A headless drive of the rehearsal build (`drive-v5.mjs`, `tests/docs/r2-fix-build/drive-r2.mjs`)** (17 Nov 2026 V3): the pages' main scripts are modules, so a page variable (`phasesData`, `_saF`, `getCurrentUser`) is not reachable from the drive — use `window.*` functions, the DOM and the rehearsal store (`localStorage` `ts:doc:vacations/<doc>`); after a reload the admin gate shows "Continue →" and the staff gate "Sign in as someone else"; one staff person at a time (`ts:auth:staff` is shared). Run the same drive on a rehearsal build of the OLD pages to prove it bites.

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
- When a rule about "who holds a week" changes, grep EVERY reader of the approvals lists — the simulator was the one path that missed a split's partner (14 Nov 2026 V1).
- Cite the NEWEST ruling on a subject, and read the code before explaining a line on a review page (13 Nov 2026 V3: §396 quoted where §419 governed; a note had the e-mail's reader backwards).
- Some suites read the pages from their own folder's parent, not `GH_ROOT` (test-394): run a build's battery from a real root with `tests` beside the pages (13 Nov 2026 V3).

**Records and paperwork**
- GitHub Desktop pre-fills the Summary on a ONE-file commit and the pasted message is LOST (proved by a controlled
  comparison, 1 Sep). The structural fix (a suites index) was DECLINED (§157): say so in the handover, tell him to clear
  the box, and prefer two-file commits where honest.
- `_archive/` lives in the private `tests` repo since 18 Nov 2026 (§529, `tests/_archive/`) — ▶ RELEASE backs it up; it was in no repo before (the 5 Nov close, §349 O7, rested on a Mac backup that ended with §527). The three repo archives (`*-ARCHIVE.md`) are in git too.
- Three BUILD-LOG rows are missing (schedule 96; the CRNA stamper's 17 Aug work; the 18 Aug UX-PLAN directive) — his
  call, listed in TODO (25 Aug).
- `sched/run-all.mjs` keeps a hand-written suite list; the runner exits 2 naming any unregistered suite, so register a
  suite in the same turn it is written (25 Aug). The auction runner discovers suites by `readdirSync` — no such gap (1 Sep).
- Real Firestore data reaches the cloud only as his backup JSON attached to the chat. Extract the subset a task needs into
  a file with no names or e-mails before it goes near a repo; never print the backup's keys blind (3 Sep).

**Firebase, EmailJS and the release window**
- A new Firebase project cannot register reCAPTCHA v3 (Classic) in App Check — the secret box is greyed out; register Fraud Defense and give that copy `ReCaptchaEnterpriseProvider` (the stamp does it for `testing/`) (14 Nov 2026 V2).
- EmailJS shows an edit in its preview before it is saved: after a template paste, reload the template page or send a test (14 Nov 2026 V2).
- Never rewrite a `.command` while its Terminal window is open — the shell may still be reading it; zsh's `read -r` trims spaces itself, so a trimming check proves nothing (14 Nov 2026 V3).

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
**PROMOTED 20 Nov 2026 (V1), from the 18 Nov V4 entry as it was archived and from this session:** (1) **`testsite-check.mjs` serves `tests/testsite/out/` whatever `TS_OUT` says** — with TS_OUT set it drives an empty or stale folder and fails at "front door opens on Home" (0/2 ran) on any build; run it without TS_OUT, from a copied tree. (2) **`git fetch` from the Mac bridge leaves `.git/objects/maintenance.lock`** (the bridge cannot delete) — move each to `_to_delete/` afterwards; the tests repo cannot be fetched from the bridge (no GitHub credentials there). (3) **Re-running a helper's suites needs its exact setup** — its shadow tree's `--preserve-symlinks --preserve-symlinks-main`, and a `lib427` layer that knows every amendment's lines; a red run there was the run, not the build. (4) **A comment dropped mid-line can swallow the rest of the line** — check the built diff line by line. (5) **A wording Claude recommended can turn false later** — check it against the code / rule text, not memory.

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

## 20–21 Nov 2026 — "Vacation Auction 20 Nov 2026 V3" — BATTERY CLEANUP PART B (§542): 51 OF 60 OLD SUITES READ TODAY'S PAGES; 9 SPLIT-WEEK SUITES LEFT, HIS CALL — NO SITE CHANGE
**State at the opening (10:03 PM).** His ▶ RELEASE at 10:02 PM had pushed V2 (Part A + the TODO tidy). LIVE 269 / 19 / 437 on `/vacation/`, `crna/`, `testing/` (his Chrome, aaronjfrankel profile by ID, at `?c=372b188`, the MD site read twice), schedule 54 / 156 at `3f9af33`; all four heads = GitHub (hub `4c83cbb`, auction `372b188`, schedule `3f9af33`, tests `e0de019`); three `maintenance.lock` from the fetch moved to `_to_delete/`.
**Work (§542).** His 10:06 PM *"go on part b"*. `libnow.mjs` (readers only) + gate3c (gate 3 counted by occurrence — Part A's gate-3 tool had read "✓0 / ✓0" for a dozen suites it could not parse) + 9 pieces, two helpers at a time, each piece filed to `tests/docs/battery-cleanup/partB/` as it ended. 51 moved, 9 NOTDONE (the split-week wording suites). His 11:24 PM worry → answered (no site touched; partial win); 11:28 PM *"finish if it's safe"*, *"continue overnight"*. Gate 2: two independent reviewers read every diff and re-ran every mutant (GB 0 flags; GA 2, fixed — test-234 S2 had got weaker under its name, restored). Whole battery 187 / 187 exit 0; the 51 on the Mac exit 0; served files md5 unchanged. **Filed into `tests/` ~12:15 AM, 53 files md5 equal; COMMIT-MESSAGE.txt in tests and hub — waiting for his ▶ RELEASE.** Open, his call: `partB/NOTDONE-OPTIONS.md` (the 9 suites; rule 35 wording).
**Lessons.** 1. **Repacking a bundle can drop its contents** — a `tar` with relative `-C` and errors hidden emptied P05's bundle of its suites; listed before filing, rebuilt with absolute paths. List every bundle before it leaves. 2. **Gate 3 sees names, not conditions** — only the diff reader caught a check weakened under its own name; keep both. 3. The copy tool's stale-name trap (STANDING TRAPS).

**Session close** 21 Nov 2026 about 12:25 AM (he is asleep). Closing checklist: in the chat (steps 0–5). Test site — no page changed, not republished.
**6:20 AM** his *"pushed.  agree with your recs."* — Part B on GitHub (tests `2bc7091`, hub `0bb4a64`); the 9 split-week suites left as they are; START-HERE rule 35 added (§543). Hub COMMIT-MESSAGE.txt written — ▶ RELEASE. **Session closed** about 6:25 AM.

## 21 Nov 2026 — "Vacation Auction 21 Nov 2026 V1"
**State at the opening (about 6:25 AM).** LIVE 269 / 19 / 437 on `/vacation/` (read twice), `crna/`, `testing/` at `?c=372b188`; schedule 54 / 156 at `?c=3f9af33` — his Chrome (aaronjfrankel profile, picked by ID `477f9b79…`). All four heads = GitHub, trees clean (hub `bbec6ff` — rule 35 released 6:22 AM; auction `372b188`; schedule `3f9af33`; tests `2bc7091`, cloud clone = `ls-remote`). Three `maintenance.lock` from the fetch moved to `_to_delete/`.
**Work (§544).** His 6:26 AM *"testing site run #4 that's similar to 3"*: reset, Phases 1–2 in his four Chrome profiles (HD capacity 3 → 2 at his question, put back), 8 settings changed and put back as found, every §539 fix seen working; cloud mega-fuzz 4F / 4R / 4M in ten ~30-minute pieces (~70 runs, ~4,600 e-mails, 0 regressions). Ruled in the chat: capacity stays changeable mid-phase; O-1 split e-mail intro "There were changes on your split weeks:"; "Admin ended your split with <name>."; F-1 passed-over → e-mail only; F-2 leave. Review page "Testing-Site Run 4 — Findings" https://claude.ai/artifact/9MLSE1UWSwHVu65zFvPo2K (7 lines) — waiting on his answers. Record `tests/docs/testing-email-run-4/CHECKPOINT.md`. Testing site left at Phase 2 complete. COMMIT-MESSAGE.txt in hub and tests — ▶ RELEASE.
**Part C and filing (afternoon).** His 12:45 *"Let's do b now"*: the 9 frozen suites moved onto today's pages (1,589 checks, all green; gate-2 flags fixed — §544, `tests/docs/battery-cleanup/partC/RECORD.md`); build 544 filed with md5 checked both ends; test-544 and test-crna-stamp green on the Mac. ▶ RELEASE pending: pages ×3 + mail server ×3, no rules change.
**Session close** 21 Nov 2026 about 5:45 PM, at his 5:36 PM *"pushed. handoff."* Build 544 served at `d078692` on `/vacation/`, `crna/`, `testing/` (270 / 19 / 438, his Chrome); pushed bytes md5-identical to the filed copies (auction 10 files, tests `301bd5f` 29 files). Closing checklist: below in the chat (steps 0–5).

## 21 Nov 2026 — "Vacation Auction 21 Nov 2026 V2" — THE FIFTH TESTING-SITE TRIAL RUN (§545) → BUILD 545 (STAFF 271 / ADMIN 439 + MAIL SERVER) RELEASED
**State at the opening (5:43 PM).** LIVE 270 / 19 / 438 at `?c=d078692` (`/vacation/` twice, `crna/`, `testing/`), schedule 54 / 156 at `?c=3f9af33` — his Chrome by ID `477f9b79…`. Heads = GitHub; V1's paperwork waiting for ▶ RELEASE. Three `maintenance.lock` moved to `_to_delete/`.
**Work.** His 5:42 PM order: run 5 — Strict and Loose, blinded on and off, heavy splits, every feature. Testing site reset; Phase 1 Strict (blinding off → on), Phase 2 Loose (on → off) in his four Chrome profiles, driven by small page scripts that click the pages' own buttons (`/home/claude/run5chrome/helpers.js` pattern, record `tests/docs/testing-email-run-5/CHECKPOINT.md`); settings put back (NP Phase 2 stays On — locked by N1 until a reset). Cloud mega-fuzz 5F / 5R / 5M, 13 pieces, ~3,500 e-mails, independent engine = admin rows in all four combinations. Findings: 5C-1 / 5M-3 (a removal e-mail lost when Begin follows within ~90 s), S-b / 5R-1 (the proposer's own bid blocks her waiting proposal), 5M-1 (RVA NP switch) — ruled 6:35 PM; review page W1 C1 C2 A1 — answered 8:55 PM. Build 545 planned, built here ("Build here" 9:01 PM), blind review NOT SAFE (two MEDIUM in the mail fix) → one fix round, the simpler shape (only the admin's lines cross a phase change) → verifier SAFE; 68/68 suites with full history (6 repointed, rule 35); released by him 9:58 PM, served 271 / 19 / 439 at `?c=69b1cce`.
**Lessons.** (1) A cloud gate root built from `--depth 1` clones turns every honesty block that `git show`s an old SHA red — 15 false reds; build the gate root from a full-history clone (as START-HERE §6 says for `schedule`), and read a red's cause before calling it the build's. (2) `device_commit_files` twice wrote the PREVIOUS bytes of a staged file that had just been rewritten in place — md5 the device copy after every write and re-commit (force) when it differs.
**Next session (TODO §1):** check the Strict-split walkthrough deck against 271 / 439; one ~30-minute cloud piece for run 5's untested corners.
**Session close** 21 Nov 2026 about 10:05 PM, at his 10:01 PM *"handoff"*.

## 21–22 Nov 2026 — "Vacation Auction 21 Nov 2026 V3" — THREE NEW WALKTHROUGH DECKS, RUN 5'S CORNERS, BUILD 546 (ADMIN 440) RELEASED
**State at the opening (10:03 PM).** LIVE 271 / 19 / 439 at `?c=d9333d1` (`/vacation/` twice, `crna/`, `testing/`), schedule 54 / 156 at `?c=3f9af33` — the app's built-in browser (his Chrome not connected). All heads = GitHub, trees clean (hub `ee3e256`, tests `64beecb` = `ls-remote`). Three `maintenance.lock` moved to `_to_delete/`.
**Work (§546).** His 10:10 PM "both": (1) cloud helper piece for run 5's corners (fuzz-C) — s2 green in all four Strict/Loose × blinded combinations, NP in an RVA Round 2 green, tm seed 1 green; finding 5X-1 (the NP box named the phase, not the round). (2) Three new decks — MD settings re-read in his Chrome (Loose, 2/4/4/2, splits and blinding off; locked weeks in place Phases 2–3); every picture re-taken on 271 / 439; four lines in the site's words; frame + shadow on his slides 25 / 28 / 29; then his 10:48–10:50 PM order — the Strict decks lose the lowerings slide, "Winning bids on competition weeks can't be removed" after Competition weeks, every deck in teaching order (`tests/docs/deck-update-2/`). (3) Build 546, his 11:09 PM "Here. Go.": admin 440, "…placed in Phase 4: Round 2 will stop counting." (the two Fair Play "Round N:" prefixes turned out never shown — left). Released by him 6:23 AM; served 271 / 19 / 440 at `?c=20c861e`.
**Lessons.** (1) `device_commit_files` refuses a staged file over about 25 MB ("HTTP 400 fetching session file") — split it (`split -b 9m`) and commit the parts. (2) It again wrote the PREVIOUS bytes of rewritten files (decks, twice) — md5 every write and re-commit with force. (3) Claude in Chrome's `javascript_tool` result can be blocked ("Cookie/query string data") — read settings by page text, `find` and screenshots instead. (4) The 19 Nov deck scripts rebuild the approved decks shape for shape from `Walkthrough-Old.pptx` — prove that before changing them.
**Session close** 22 Nov 2026 about 6:30 AM, at his 6:24 AM *"handoff"*. Closing checklist: in the chat (steps 0–5). Test site — carries admin 440 / staff 271; no page changed since.


## 22–23 Nov 2026 — "Vacation Auction 22 Nov 2026 V1" — PUSH ALERTS AND APP ICONS: BUILDS 547 / 548 / 549 RELEASED (STAFF 274 / ADMIN 441 + MAIL SERVER + RULES; SCHEDULE 55 / 157 ICONS)
**State at the opening (6:31 AM, 22 Nov).** LIVE 271 / 19 / 440 at `?c=20c861e`; schedule 54 / 156. Heads at the opening: hub `f9404ec`, auction `e1c3073`, schedule `3f9af33`, tests `b643357`.
**Work (§547).** Push alerts (a push with every auction e-mail, off until each person turns it on; staff menu "Push alerts"; admin Messaging → Push Alerts, view + Turn off only; Rules lines; a slide in the three walkthrough decks) and the Home Screen icons (design F, 8 icons with short names). Built mostly in the cloud while the Mac was away (his "Go"), four helpers + integrate + blind review + four fix rounds; one design stopped by rule 21 and replaced by the simpler one (deliberate Sign out: sign out at once, push cleanup in the background). Push keys made in his Chrome (his "you do it please"). RA-2 passed "ALL FOUR". **547 released 22 Nov about 11:05 PM; 548 (first-try turn-on attempt + the alert badge) 23 Nov about 7:05 AM at `38c872c`; 549 (a tapped alert opens the "Auction Alert" box with the e-mail's words) about 4:52 PM at `090f490`** — served 274 / 19 / 441 on all three sites. Record: `tests/docs/push-alerts-plan/` (CHECKPOINT.md top = where it stands).
**Open.** Turning push on is glitchy on his iPhone (switch flips off after Allow; works after several tries) — two guessed fixes missed; his 4:52 PM pick: the cable diagnosis (TODO §1, first). His 4:51 PM: personal phones are what matter; shared-device limits accepted.
**Lessons.** (1) Firestore rejects `serverTimestamp()` inside an array — an emulator test that builds one crashes RA-2; use a plain `Timestamp`. (2) A suite that drives Chromium must skip that part cleanly where no browser exists (the Mac's device VM): close its server and still print its tally (test-549). (3) A wait placed BEFORE Sign out can leave a person signed in when the tab closes — sign out first, clean up after.
**Session close** 23 Nov 2026 about 4:56 PM, at his *"maybe handoff first?"*. Closing checklist: in the chat (steps 0–5). Test site — carries admin 441 / staff 274; no page changed since. The 20 Nov V1 and V2 entries archived for room (V2's zsh trap promoted to STANDING TRAPS).
