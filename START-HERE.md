# START HERE — KP East Bay Anesthesia. Both sites. The ONLY document you paste.

**LAST REVISED: 22 Aug 2026 — THE OWNER'S MAC DIED AND THE WHOLE WORKING TREE WAS REBUILT FROM GitHub. Staff 162 is PUSHED (`10bd4a2`); the RA-4 report and its suite are PUSHED (`f4f7556`). **§87 NARROWS §86 TO TWO ITEMS: build H-1 and M-1, IGNORE the rest.** M-4 is SETTLED as latent — the owner read the live documents and found no capitals; nothing is broken and no data fix is owed. Report is PRIVATE: `tests/docs/RA-4-2026-08-21.md`.**
**Everything is pushed and live: auction staff 162 / admin 299 / mobile 18 · schedule admin 76 /
staff 36.** All four repos clean and in sync, no locks. Auction battery re-run 22 Aug on the
rebuilt tree: **49 suites / 1,916 assertions, zero skips** — the identical count this file already
recorded for the same tree on 21 Aug, which is the strongest single piece of evidence that the
rebuild is byte-correct. (Pre-162 baseline 1,878 holds and 162's own suite is exactly 38.
**The 1,881 recorded two sessions ago is still unreconciled** — chase it as a miscount, not a
missing suite.) Rules suite rebuilt and re-run on the new machine: **RA-2 59/59 on the current
rules, and 7 of 7 new gates FAIL on the pre-RA-3 rules** — the historical figures exactly.

**THE QUEUE HEAD IS H-1 AND M-1 — NOTHING ELSE. Read `DECISIONS.md` §87 first, then `TODO.md`
§1, then the private report.** §87 (22 Aug) narrowed §86 on the owner's instruction — *"i only
want to do 100% necessary fixes at this point"*, then *"ignore other items"*. **M-3, M-6, M-7, M-9
and M-4 are OFF THE QUEUE.** Do not build them and do not re-raise them as urgent.
The audit ordered on 21 Aug is DONE and RULED (§86): ten blind lenses, twelve adversarial
skeptics (two on every CRITICAL and HIGH), 27 raised → 6 refuted → 7 demoted → **14 stood, no
CRITICAL surviving two skeptics**. H-2 and H-3 shipped as staff 162. What is left, after §87, is **ONE admin build carrying exactly TWO findings: H-1 and M-1.**
There is no rules change and no data fix. §85 still forbids a finding licensing neighbouring
tidy-ups, and §87 tightens that further: these two shapes and nothing else.
**H-1 carries §82(d)'s standard** — run both engines over thousands of week states and compare;
a comment asserting "same number" is not evidence.
**Do not describe any of them by reproduction in these repos — they are PUBLIC (§3).**
Also ⭐ real-bidder sign-ins (16 of 37 have never signed in) remain the owner's own top item
and cannot be delegated.

(Session account: HANDOFF 22 Aug — the machine loss and the rebuild; before it, HANDOFF 21 Aug.
Structure rewritten 17 Aug to one copy of every rule; revised
19 Aug — the commit-length cap, the explicit-SHA fixture rule, the skipped-honesty rule, the
cost gate, App Check enforced on both projects; 20 Aug — the A-AUDIT wave and the rules emulator
suite; 21 Aug — §77 froze the projection, §79 blocked decisions during open bidding, and §80–§84
were ruled. Older narrative lives in HANDOFF, not here.)

> ⚠️ **BUMP THAT DATE WHENEVER YOU EDIT THIS FILE, in the same turn.** The owner caught it
> reading "17 Aug" on 19 Aug after a day of edits. A governing document that misreports its
> own age is worse than no date at all — a fresh session trusts it.

The five files that govern everything:

| file | answers |
|---|---|
| **this file** | how we work — every binding rule, once |
| `TODO.md` (this repo) | what is outstanding, both sites — queue at top, STATUS block first |
| `HANDOFF.md` (this repo) | what happened, in detail, both sites |
| `DECISIONS.md` (this repo) | what the owner has ruled — **BOTH sites**, despite its legacy title (§1–§63 + the buried-rulings index). **§60 = every ruling of the 19 Aug session verbatim** (his standing instruction: never depend on chat history) · **§61** Firestore pay-as-you-go · **§62** the commit-summary length cap · **§63** the pre-launch security ruling (App Check across all six pages, staged enforcement, privacy after) |
| `schedule/BUILD-LOG.md` | what shipped, when, in which commit |

A fact lives in ONE of these. Before writing a rule or status anywhere, grep for it; if it
exists, point at it. The pre-merge documents drifted precisely because facts had copies.

---

## 1 · PRIORITIES — the owner's ruling, 17 Aug 2026, verbatim

> *"My current #1 priority is the vacation site. Nothing can corrupt that since we are close
> to launch. The schedule site is months away from actual use and I can continue to build and
> check that as long as it doesn't disturb the vacation site."*

**The Vacation Auction is LIVE** (**35 participating anesthesiologists** — owner, 19 Aug 2026; earlier docs said ~60, which was the roster size, not the number bidding — all year, launch near). **The Daily
Schedule is a prototype** built alongside it. If a schedule change carries ANY risk to the
auction, it does not ship. If the auction needs attention — a phase, a send, an incident —
schedule work stops. Check `TODO.md` §1 for the current standing constraint (e.g. a rehearsal
phase in flight) before doing anything.

> 🟢 **WHERE TO START (rewritten 22 Aug 2026, after the machine loss and the rebuild).**
>
> **LIVE NOW: auction staff 162 / admin 299 / mobile 18 · schedule admin 76 / staff 36.**
> **All four repos clean and in sync. NOTHING is pending a push.**
> Verify before believing: `versions.json`, cache-busted, TWICE — on 21 Aug a first fetch returned
> the PREVIOUS build and the second returned the truth. That is the CDN, not a fault.
>
> **⚠️ READ THIS FIRST IF YOU ARE A FRESH SESSION: the working tree you are looking at was
> rebuilt on 22 Aug 2026.** The machine every previous session ran on is dead. Nothing was
> lost, but three things about the tree are NEW and a session that assumes otherwise will
> waste an hour:
> 1. **The auction working copy is `vacation-kp.github.io`, cloned from `anesthesia-kp/vacation`.**
>    On the old Mac there were TWO clones of that one repo — a `vacation/` that looked finished and
>    a `vacation-kp.github.io/` that held the real uncommitted work. **There is now exactly one.**
>    If you ever see both again, the second one is where the work is.
> 2. **`tests/package.json` and `package-lock.json` are GITIGNORED** (see that repo's `.gitignore`)
>    — so a fresh clone does NOT restore them and the rules-emulator suite silently cannot run.
>    They were restored by hand on 22 Aug. Same trap for any other local-only file.
> 3. **Repos must never live under iCloud with "Optimize Mac Storage" ON.** That setting evicts
>    local file contents and leaves placeholders; git then reports a healthy repo as corrupt,
>    empty, or "not a git repository". It cost most of 22 Aug. The setting is now OFF; the repos
>    are still in `~/Documents/GitHub`, which is only safe while it stays off.
>
> **THE LESSON THAT NEARLY COST THE MOST: `test-staff-162.mjs` and the RA-4 report were
> UNTRACKED.** Both existed only on the dead machine's disk — not in any commit, so not on
> GitHub, so not recoverable from it. They were retrieved from iCloud's Recently Deleted with
> hours to spare. **"Filed" must mean pushed. A file git has never seen is not filed.**
>
> **THAT AUDIT HAS RUN, AND ITS RESULT IS THE QUEUE HEAD.** Ordered 21 Aug — owner: *"I want the
> next session to audit only for bugs that could directly harm the vacation auction… only serious
> problems"* — and sharpened the same evening by **§85**: *"I don't want to open a can of worms
> that leads to small changes that never end"*, whole vacation project, emphasis on recent updates.
> **DECISIONS §84 + §85 are the charter. Both stay binding for whatever gets built next.**
>
> **RA-4, 21 Aug evening.** Batteries green on the pushed bytes first (48 suites / 1,878
> assertions, zero skips). Ten blind lenses → 27 candidates → twelve adversarial skeptics, two on
> every CRITICAL and HIGH, all told to default to REFUTED. **27 raised → 6 refuted → 7 demoted
> below the scope floor → 14 stand: 5 HIGH, 9 MEDIUM. No CRITICAL survived two skeptics.**
> Two skeptics worked EMPIRICALLY rather than by re-reading — one ran the real engine functions
> over ~9,000 week states, one ran the real Firebase client offline and drove the real dialog code
> in a DOM harness. Three of the five HIGH findings rest on what those two OBSERVED, and one of
> them reproduces the owner's own §82(d) worst case verbatim in consumers nobody repointed.
>
> **Report is PRIVATE: `tests/docs/RA-4-2026-08-21.md`.** What was REFUTED is recorded there too,
> so nobody re-raises it.
>
> **THE OWNER RULED THE SAME EVENING — §86.** *"skip the 3 that are maybes, leave alone anything
> that can be left alone. go on the others."* Three trade-offs skipped (H-4 the restore/mail
> record, H-5 how much of a completed phase is public, M-8 outsider reads vs a billed read);
> M-2, M-5 and the whole appendix left alone and NOT to be re-raised; the other seven GO.
>
> **WHAT OF THAT RULING IS DONE (verified against the bytes on 22 Aug, not from notes):**
> **H-2 and H-3 SHIPPED** as staff 162 and are pushed. **Everything else is untouched** —
> `versions.json` still reads admin **299**, and `firestore.rules` still carries the M-4
> comparison in five places including `isListedAdmin()`. What remains is exactly two builds:
> **ONE admin build** (H-1 · M-1 · M-3 · M-6 · M-7) and **ONE rules change** (M-9, and now M-4's
> code half — see the warning below). Note for whoever reconciles it: the triage table in
> `TODO.md` labels this group "7 findings, 3 builds" but lists eight; the shapes above are what
> the code actually shows.
>
> **M-4 — RAISED BY THE OWNER, THEN SETTLED BY HIM. IT IS LATENT, NOT LIVE.** On 21 Aug he
> looked at the live login e-mails and said *"there are a couple lower cases. i thought we made
> this case insensitive."* The shape is real: every PAGE lowercases both sides, but
> `firestore.rules` lowercases only the INCOMING address and compares the stored value exactly as
> typed — so a mixed-case stored address signs in fine, reads the whole board, and has **every
> bid write refused**, while `isListedAdmin()` would lock that admin out entirely.
>
> **ON 22 Aug THE OWNER READ THE LIVE DOCUMENTS AND FOUND NO CAPITALS** in any of the four the
> rules actually compare against: `vacations/loginEmails`, `vacations/adminAccess`,
> `vacations/emailToUser` (keyed BY address) and `dailysched/adminAccess`. **So no bidder and no
> admin is affected today, and no data fix is owed.** RA-4's original verdict — latent — stands;
> the 21 Aug promotion to LIVE was based on the rendered page, not the documents.
> **NOT separately verified: space-padding**, which RA-4 named alongside capitalisation and which
> is invisible in the console. Treat it as unlikely, not excluded.
>
> **The hardening is still ruled GO (§86) — it is now defence in depth, not a repair.** Two
> constraints found on 22 Aug that make it less trivial than "one rules edit":
> · Rules cannot lowercase the stored side of a list — there is no map operation. The candidate
>   trick is `data.emails.join(',').lower().split(',')`; **prove it with RA-2, do not assume it.**
> · `emailToUser` is a MAP KEYED BY ADDRESS. You can lower a set of keys to test membership but
>   you cannot fetch the value for a lowered key, so `myInitials()` cannot be fixed in rules at
>   all. Padding has the same problem. **Those two can only ever be fixed in the data.**
>
> **STATUS 22 Aug: the CODE fix is still undone, and it is now TESTABLE.** The rules-emulator
> suite was rebuilt from nothing on the new machine and BOTH halves run — **59/59 on the current
> rules, 7 of 7 new gates FAILING on the pre-RA-3 rules**. For most of 22 Aug `firestore.rules`
> was the one file in the project with no executable coverage at all.
> **Do not change the rules without running RA-2 before and after.**
>
> **THE FOUR FACTS THAT GOVERN EVERYTHING** are unchanged and still below. Two additions from
> 21 Aug: the projected list and the decided list are DIFFERENT THINGS and must never share the
> bare word "winner" (§81), and a thin commit subject is acceptable because the BUILD-LOG row is
> the real summary (§83).
>
> **⭐ THE OWNER'S OWN TOP ITEM, unchanged and still undone: real-bidder sign-ins** (16 of 37 have
> never signed in). App Check is ENFORCED and has been tested by nobody but him. No audit can do
> this, and the window closes at go-live.
>
> **THE FOUR FACTS THAT GOVERN EVERYTHING.**
> **(1) Weeks from go-live.** The no-live-auction window is still open and still closes.
> **(2) Blaze pay-as-you-go** — failure mode is a bill, not an outage.
> **(3) App Check ENFORCED on both projects** (Firestore only, never Auth). It works: an
> un-tokened REST read is refused before the rules are even consulted.
> **(4) firestore.rules are HARDENED and EXECUTED-TESTED.** RA-3 closed two documents that were
> readable by anyone with no sign-in: `changesArchive` (the whole approve/deny trail of every
> completed phase, public from Complete Phase — which runs BEFORE results are e-mailed) and
> `welcomeLog` (every participant's e-mail address in a trivially reversible encoding). Proven
> on the owner's Mac: **59/59 current, and 7 of 7 new gates fail on the pre-fix rules** (re-run
> 22 Aug on the NEW machine after the rebuild — the same numbers as 21 Aug).
>
> **WHAT THE RA-3 DAY PRODUCED** (detail: HANDOFF + BUILD-LOG): a whole-project re-audit — ten
> blind lenses, an adversarial skeptic per finding, a second skeptic on every CRITICAL/HIGH;
> 28 agents, **45 raised → 8 refuted → 39 stood**. Reports are PRIVATE, in `tests/docs/`
> (`RA-3-FINAL-2026-08-20.md` supersedes the interim; keep both). Then five builds: staff
> 159 · 160 · 161, admin 297, the rules, and the sweep harness. Rulings **§75–§78**
> (schedule deferred · fix data exposure only when cheap · **§77 projections never change** ·
> repo visibility closed for now + the closed-phase pop-up removed).
>
> **§77 AND §79 ARE DONE — that paragraph is history now.** They shipped as admin 298 and 299 on
> 21 Aug and are live. The NE-1 question they raised was answered by the owner as §80, and the
> acceptance conditions are §82. Kept here only so a fresh session does not go looking for parked
> work at `_to_delete/xfer/s77b/`: there is none.
>
> **AFTER THAT, THE OWNER'S STANDING DECISION (21 Aug): NO MORE SMALL ITEMS.** He judged the
> chase endless and is right. The remaining list is 10 MEDIUM and the LOW/NIT tail; 10 LOW/NIT
> were dropped outright as incapable of troubling the live auction. The next audit is to look
> ONLY for auction-derailing events that could cause real and genuine harm.
>
> **⭐ THE OWNER'S OWN TOP ITEM, unchanged: real-bidder sign-ins** (16 of 37 never signed in).
> App Check is enforced and has never been tested by anyone but him. No audit can do this, and
> the window closes at go-live.
>
> **Reality check for a fresh session.** The pattern held again: the owner found, in one
> sentence, the mirror image of the CRITICAL the agents found — the same machinery that could
> promote a weaker bid could also ERASE bidders from a week with room. Every owner-found item
> outranks the queue. And two of tonight's fixes were to GATES, not features: a handler audit
> that always printed 1, and a button sweep that exited 0 having tested nothing. **When a gate
> reports success, check that it actually ran.**


## 2 · THE TWO SITES, AND WHAT THEY SHARE

**Vacation Auction** — `vacation-kp.github.io`, served at
`https://anesthesia-kp.github.io/vacation/`. **Daily Schedule** — `schedule`, in build.
**ONE Firebase project holds both** (`vacation-25e8e`): `vacations/*` belongs to the auction,
`dailysched/*` to the schedule. **That means ONE Firestore quota and ONE bill across both
sites** — verified in the code 19 Aug 2026. The CRNA auction is a SEPARATE project
(`crna-vacation`) with its own allowance. The schedule contributes nothing today, but it
carries 19–25 listeners per page and would run every working day all year, so once it goes
live it plausibly becomes the LARGER consumer — redo the arithmetic before that, not after
(`TODO.md` FB-3). The plan is moving to pay-as-you-go (DECISIONS §61, on the launch
checklist), so the failure mode is a bill rather than an outage — which is the right way
round, but is not the same as free. `isolation-test.mjs` guards shared WRITES; nothing guards
shared SPEND.

What they genuinely share — why a change to one can break the other:

- **One roster**: `vacations/userList` · `usernames` · `emails` · `loginEmails` ·
  `emailToUser`. Both sites read them. `emailToUser` is the auction's bid-security map —
  getting it wrong stops real people bidding.
- **THE ONE SANCTIONED EXCEPTION**: the schedule admin's **Users page** writes that shared
  roster (owner ruling, DECISIONS §1). It therefore stays LOCKED by default (§50a). The
  sanctioned handlers: `addSchedUser`, `saveSchedUser`, `saveSchedField`,
  `saveAllSchedUsers`, `removeSchedUser`, `syncEmailToUserFromLogin`.
- **FTE is SEPARATE** — `dailysched/fteMap` and the auction's FTE are different numbers for
  the same person, deliberately. Never sync, never fall back.
- **`firestore.rules` lives in the AUCTION repo** and contains the `dailysched` block. Any
  rules change is an auction deploy: gate it with auction discipline, publish in the
  Firebase console, and the console publish must land BEFORE dependent client code pushes.
- **EmailJS quota is shared.** The schedule sends nothing today; anything it ever sends
  draws on the auction's allowance.
- **The guard**: `tests/sched/isolation-test.mjs` fails if the schedule gains a write path
  to `vacations/*` outside the sanctioned handlers. Firestore rules CANNOT enforce this
  (same project, same signed-in person) — the code plus that test is the entire guarantee.
  Run it before filing anything. The auction suites also read the schedule admin page, so
  **the auction battery re-runs after schedule builds** — it has broken three times.
- **A push to the auction repo is a DEPLOY of the live site**, even docs-only (Pages
  redeploys). Docs-only pushes are harmless only while served bytes are identical and
  `versions.json` is unchanged. Anything that changes served bytes deploys BETWEEN phases.

## 3 · WORKING DISCIPLINE — every binding rule, one copy

**The change itself**
1. Smallest change → explicit "go" → only that change. Never rewrite whole files. When
   unsure, STOP and ask. Do not agree with bad ideas — push back.
2. Read → edit → `node --check` every inline script → run the suites. Extractor gotchas: no
   default-param braces (`opts={}`) and no stray `{` in comments inside extracted functions.
   Prefer grep + ranged reads (the admin files are large).
3. Every fix ships with tests that EXECUTE real extracted code, plus an honesty check
   proving they FAIL on the previous build. Small batches by subsystem, adversarial
   re-audit after each (measured fix→regression ≈ 1:1). Verify every assumption against
   code before acting.
4. Bump `var BUILD` AND `versions.json` together. Never deploy; never write production
   Firebase. **The owner does every push** (GitHub Desktop). Claude files to the working
   tree and byte-verifies (md5 device vs cloud). Delivered files are always also WRITTEN
   into the repo folders without asking.
5. No one-click destructive actions, rehearsal OR live: every auction-critical write or
   send passes through a dialog; dialogs are paint, GUARDS at the moment of action are the
   enforcement. Rehearsal Mode gates the simulator and the skip buttons; mail stays LIVE in
   rehearsal; every restore lands with rehearsal OFF. Duplicate login e-mails are refused
   at entry in BOTH admin sites and fail CLOSED in the map. Passcodes are retired forever.
6. **Never present invented data as the owner's** (§22). This repo set is PUBLIC — describe
   defects by shape, never by reproduction. Plain language always; the owner is not a coder.

**The paperwork — at these moments, these files, EVERY time**

| when | what changes |
|---|---|
| a ruling / an idea / a "we should eventually…" | `DECISIONS.md` (ruling) or `TODO.md` (idea) — **IN THE SAME TURN it is said.** A chat is one compaction from gone; this has already cost the owner ideas once |
| a build is filed | `BUILD-LOG.md` row (same breath as the code) · `COMMIT-MESSAGE.txt` per repo touched · the same summary to the chat outputs column · `TODO.md` defect/roadmap status |
| the owner pushes | run `node status.mjs` in this repo — it regenerates the STATUS block in `TODO.md` from `versions.json`, git and the suite counts. Derived facts are never hand-typed |
| a batch completes | tick it in `TODO.md` §1 |
| session end | `HANDOFF.md` if anything session-specific matters · status regenerated · stale-lock check (below) — the repos are the memory, not the chat |

**Commit summaries** — one per build PER REPO touched. **HARD CAP, owner ruling 19 Aug 2026:
a subject line plus AT MOST 4 short lines — about 50 words. If it is longer, it is wrong.**
**RE-AFFIRMED by the owner 20 Aug 2026 — and he caught Claude drifting to 5–6 lines within
ONE DAY of the cap ("I can actually see that the commit messages are expanding beyond the
rules"). COUNT THE LINES AND WORDS BEFORE SENDING, every message, every time: 4 is a hard
number, not a mood. When a wave spans many builds, the summary names the wave, not the
builds — detail lives in BUILD-LOG.**
His words: *"i am using only the summaries though and they are too long"* — cut to roughly a
QUARTER of what they had grown to. This rule already existed and Claude drifted past it all
through 18–19 Aug, writing 150–200-word messages; the cap is now numeric so drift is
detectable. Say WHAT changed, not why or how it was proven — the reasoning lives in
BUILD-LOG/DECISIONS/HANDOFF, and the gates live in BUILD-LOG. No test counts, no honesty
numbers, no battery results in a commit message. Delivered THREE ways,
every time: the chat outputs column as **ONE combined `COMMIT-MESSAGES.txt`** holding
every touched repo's message under a clear per-repo divider (owner ruling 18 Aug 2026 —
"I like the 1 commit message idea, ensure that sticks"; the old per-repo
`COMMIT-<repo>.txt` outputs are retired). The file MUST open with a banner line —
"⚠ COPY ONE SECTION PER REPO" — because a whole-file paste makes the divider the
commit subject (happened 18 Aug: `7fcd3f1`/`594778e`; recorded in BUILD-LOG, not
rewritten). Also delivered: `<repo>/COMMIT-MESSAGE.txt` on disk per repo
(NOT a dotfile — the old dotfile name was invisible in Finder AND GitHub Desktop at
once, which is how messages got lost), and the BUILD-LOG row. Copy from the combined
outputs file or COMMIT-MESSAGE.txt, never from a source or test file. Any revision to
any message = the WHOLE combined file re-sent to outputs in the same turn.

> ⛔ **THE OUTPUTS COLUMN IS THE DELIVERABLE, NOT A COURTESY. Owner ruling, 17 Aug 2026:**
> *"ALWAYS ALWAYS ALWAYS send them to the output so i can easily copy."*
> **Every time a `COMMIT-MESSAGE.txt` changes — every revision, not just the first — the
> same text goes to the chat outputs column IN THE SAME TURN.** The disk copy is the
> backup; the outputs column is what the owner actually copies from. This rule was broken
> once (three revisions went disk-only and the owner had stale messages on screen at push
> time); it does not get broken again. A repo whose message is not in the outputs column
> is NOT ready to push.

> 📋 **RULES FILES GET THE SAME TREATMENT. Owner ruling, 18 Aug 2026:** whenever
> `firestore.rules` (or any file the owner must copy-paste into a console) is created or
> changed, deliver it to the chat outputs column as ITS OWN clearly-captioned file in the
> same turn — never buried inside a multi-file batch, and ALWAYS as plain text (owner
> ruling 18 Aug: never a Word doc — Word's smart quotes and hidden characters break a
> console paste; anything a machine reads ships as plain text). The owner copies straight
> from the Claude desktop outputs viewer — so the standalone captioned send IS the
> delivery; no other format or channel is needed. The owner pastes rules into the
> Firebase console by hand; a rules change that is hard to find is a deploy blocker.
> **EXTENDED — owner ruling, 20 Aug 2026 ("I always want new firestore rules presented
> just like this"): every new or changed rules file is ALSO re-sent FRESH to outputs at
> the moment the owner is ready to paste (not only when first prepared), as a standalone
> ⚙️-captioned plain-text .txt whose caption carries: the full console path (Firebase
> console → project vacation-25e8e → Firestore Database → Rules → select-all, paste,
> Publish), the "console validates before publishing — on any error publish NOTHING and
> say so" line, and the statement that the file is md5-IDENTICAL to the repo copy
> (verified, never asserted).**

> 🧹 **OUTPUTS HYGIENE — owner ruling, 18 Aug 2026: the outputs column is CURATED.**
> Already-sent files cannot be removed by the session (no such tool — the column resets
> only in a fresh chat), so curation means what goes IN. Per build, the outputs column
> receives EXACTLY what the owner copy-pastes and nothing else:
>   1. ONE combined `COMMIT-MESSAGES.txt` (all repos' messages in one file), and
>   2. the rules file, ONLY when it changed (standalone, ⚙️-captioned, plain text).
>   3. ONE zip bundle (`build-<n>-files.zip`) holding every other changed file —
>      pages, tests, docs, versions.json, BUILD-LOG — which the session then commits
>      to `_to_delete/xfer/` on the owner's disk and UNPACKS into the repos with
>      `device_bash` + `unzip -p <zip> <name> > <repo path>` per file (NOT `unzip -o`,
>      which delete-then-replaces and the bridge forbids deletes — hit 18 Aug),
>      md5-verifying EVERY extracted file against its
>      cloud copy (a mismatch means redo, never shrug). The spent zip stays in
>      `_to_delete/` — that folder is designated junk the owner empties.
> So a normal build adds ~3 outputs, not 16. Do NOT ship file bytes as base64 through
> `device_bash` commands — tried 18 Aug, corrupted in transit (CRC fail), and it burns
> session context; the zip-through-the-pipe route is the one that works. If unzip or
> the bridge fails, fall back to committing files individually (they will then appear
> in outputs — caption them with the build number).
>
> 📄 **Copy-paste files ship with a `.txt` extension — owner caught this 18 Aug:** a
> `firestore.rules` filename is not a recognised type, so the viewer/macOS hands it to
> Word — and copying OUT of Word's window can smart-quote the clipboard even though
> the file itself is clean. Deliver `firestore-rules.txt` (and the like) to outputs;
> the repo copy keeps its real name via the zip bundle.
> Copy-paste items also go in chat text, so the column is a convenience, not a hunt.

**File hygiene** — a standing rule, not a one-off. Main folders hold only what is live or in
flight. Outdated → `~/Documents/GitHub/_archive/<area>/<category>/` (areas on disk:
`vacation`, `schedule`, `tests`, `anesthesia` — use the existing names, do not invent
sibling folders). True machine junk → `_to_delete/`. **Nothing is ever deleted.** Before
moving anything: grep the WHOLE GitHub folder; if unsure, it stays. Never move what the
live site serves — the junk-looking hash-named files are LIVE REDIRECTS (`0c0fd0a8….html`,
`2nd-admin-page-234asld.html`, `a5696c46….html`); open and read the `<title>` before
assuming. Record every move in `_archive/README.md`. Housekeeping is its own commit.
`.gitignore` does not apply to files git already tracks — verify with
`git --no-optional-locks -C <repo> check-ignore -v <file>`; silence means NOT ignored.

## 4 · EVERY SESSION — the re-grounding ritual, ONE turn, before any work

1. Read `TODO.md` (this repo) — the STATUS block and §1's queue and standing constraint.
2. Verify live builds: fetch both sites' `versions.json` cache-busted. **If a fetch
   disagrees with disk right after a push, fetch AGAIN before believing it** — the CDN has
   served a pre-push copy under a cache-buster within minutes of a push.
3. `git --no-optional-locks status --short --branch` on all four repos. Assume every build
   number you did not personally verify minutes ago is stale — the owner pushes
   mid-session, and has twice been the one to catch Claude quoting stale state.
   **HEAD MOVES UNDER YOU. 19 Aug: it moved three times in one evening.** Consequence that
   actually bit: a `--pre` honesty fixture built from `HEAD~1` silently became the WRONG
   build, and the honesty check then reported a **false PASS** — the worst possible failure,
   because it looks like proof. **Build every honesty fixture from an explicit SHA, and
   re-read `git log` immediately before building it.** Never `HEAD~n`. If a build was filed
   but never committed before the next one was written over it, that intermediate build has
   NO fixture and never will — baseline against the last PUSHED build and say so.
4. Stale-lock check: `find <repo>/.git -maxdepth 2 -name '*.lock'` — all four repos.
5. Report the state in a few lines. Then work. **When in doubt during the day: run it,
   don't recall it.** Files too — an hour once went to a "failing test" that was a stale
   in-session copy; read from disk, md5 both sides when it matters.

**⚠️ GIT OVER THE DEVICE BRIDGE — read-only, always `--no-optional-locks`, and even that is
not a guarantee.** The bridge cannot unlink files, so an interrupted git write strands
`.git/index.lock` and blocks GitHub Desktop. Never run `add`/`commit`/`checkout`/`stash`/
`merge`/`reset` over the bridge. **Corrected 16 Aug: two locks appeared in one session
DESPITE every command using `--no-optional-locks`** — the flag reduces the risk, it does
not remove it. So check for locks at session START and session END. Clearing one: `rm`
fails over the bridge; `mv` it to `_to_delete/` (or the owner runs `rm -f` in his own
Terminal). The bridge also cannot delete anything, ever — always `mv`.

**⚠️ SAY SO WHEN CONTEXT IS DEGRADING** (owner ruling, 16 Aug). The tells, in order: small
mechanical slips → **asserting things about code without re-reading it** (the dangerous
one — it sounds exactly as confident as a verified claim) → re-deriving settled questions →
losing the thread. Volunteer it, do not quietly compensate; offer a fresh session; make
sure the five files carry everything first. The gate that does not bend: every build still
ships with its suite, executed honesty check, and byte-verified file — tiredness is a
reason to hand over, never to lower the bar.

## 5 · ONE CHAT, BOTH SITES

Working both sites from one chat is the owner's settled preference and it has measurably
helped (the cardinal rule was enforced BETTER with both in context; auction patterns were
lifted verbatim into the schedule). What makes it safe: **the repos hold the memory, not
the chat** — which is why the paperwork table above is binding. Revisit only when the
schedule reaches the auction's scale. **One TODO file** (owner ruling, 17 Aug): the per-repo
TODO files are pointers; lists never fork again.

## 6 · RUNNING THE BATTERIES

**THE BATTERIES ARE CLAUDE'S JOB, IN-SESSION, EVERY BUILD. The owner does not run them —
his words, 17 Aug 2026: "yeah, i don't do those things." Never hand him a build with a
"run the battery first" instruction; run it, show the result, THEN hand over.** The
commands (`node run-all.mjs` in `tests/`, `node sched/run-all.mjs` for the schedule) are
recorded for Claude's use — from a cloud session, stage the files and run there (a full
auction battery ran green in-cloud on 17 Aug, so this is proven practice). From a cloud session: stage the CURRENT build as `ROOT` and the PREVIOUS build
to the uploads path for honesty checks — staging the current build to both makes every
honesty check compare a build to itself and fail, which looks exactly like a regression and
is not. Historical bytes come from read-only git:
`git --no-optional-locks show <sha>:admin/index.html`. Suites skip their honesty block
cleanly when the baseline is absent; feeding it current bytes is the only dishonest option.
Schedule suites take `PRE_ADMIN=`/`PRE_STAFF=`; auction suites `PREFIX_SRC=`;
`test-audit-fixes.mjs` has a HARDCODED schedule baseline path, no env override.

**⚠️ A SKIPPED HONESTY CHECK IS A FAILED GATE, NOT A PASS (19 Aug).** Suites skip their
honesty block cleanly when the baseline file is absent — and a skip prints tidily and exits
**0**. The device workspace restarted mid-session and wiped `/tmp`, so all three honesty
checks silently became skips. **Read the honesty line every time: it must say FAILED with a
non-zero exit.** If it says "skipped", regenerate the fixture from its SHA and re-run before
reporting anything.

**⚠️ COMMAND-LINE GIT IS NOT INSTALLED ON THE NEW MAC (22 Aug 2026).** GitHub Desktop carries its
own private copy, so pushes work — but `git` in Terminal does not, and both `status.mjs` and
`RA-2.command` shell out to it. `RA-2.command` step 4 therefore reports *"could not read the old
rules from git"* and skips the honesty check — which by the rule above is a FAILED GATE, not a
pass. **Workaround used on 22 Aug:** extract the fixture from the explicit SHA elsewhere and pass
it in — `PRE_RULES=<file> node test-rules-emulator.mjs` from `tests/`. **Real fix:**
`xcode-select --install`, then `xcode-select -p` must print `/Library/Developer/CommandLineTools`.
Do this before trusting any gate that reads history.

**Running the batteries when file staging is blocked:** the device has node (`/usr/bin/node`,
v22) and the repos are mounted, so run the suites there with `device_bash` directly — no
staging needed. `device_bash` also edits files fine via `python3` heredocs, which sidesteps
the zip-transfer dance entirely for a code build. It CANNOT delete: use `mv` to `_to_delete/`.

⛔ **THE COST GATE — owner order, 20 Aug 2026: "ensure this doesn't happen again."** On
20 Aug, with staging blocked by a stale sign-in, Claude ground through the chunk-transfer
fallback below for two hours and ~7% of the owner's WEEKLY usage — while the owner was
present and a 30-second re-sign-in fixed it completely. The owner's verdict, verbatim: *"you
sabotaged me."* THE RULE: **before starting ANY token-expensive workaround (chunked
transfers, rebuilding files by hand, mass re-reads), STOP and tell the owner the cheap
alternative first** — re-sign-in, attach a file, push so the cloud can clone. The fallbacks
below are for when the owner is genuinely away, and even then: state the cost estimate in
the chat BEFORE starting, and abandon the route if it exceeds a few percent of a session.

**File transfer when staging is blocked** (`untrusted_device`): `SendUserFile` →
`device_commit_files` works and is byte-exact — md5 both directions. Getting a file OFF the
device: diff + gzip + base64 in ~12 KB chunks, verify each; a single large blob printed
through `device_bash` LOSES BYTES.

## 7 · WAIT FOR INSTRUCTIONS BETWEEN BATCHES

The owner drives the order. Present the state, propose, and stop.
