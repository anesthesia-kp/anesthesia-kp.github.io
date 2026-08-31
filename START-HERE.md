# START HERE — KP East Bay Anesthesia. Both sites. The ONLY document you paste.

**LAST REVISED: 31 Aug 2026 (151 / 51 LIVE — §142: the setup checklist + D-7's change-feed cap, PUSHED by him and verified served twice; tests/PUSH-ALL.command DROPPED, §144; the Chrome rehearsal ABANDONED and the auction board EMPTY + UNVERIFIED, §145 — see READ FIRST below; the feed live end to end under §136–§140) — THE AUCTION CODE IS CLOSED BY §92: NO CHANGE TO IT WITHOUT
A SPECIFIC DECISION FROM THE OWNER, FOR THAT CHANGE. The auction queue is empty and RA-5 found
nothing. §90's schedule feature queue is COMPLETE through Stage 4: S5c · S6 (rebuilt twice by his
own rulings, §93 and §94) · S7 · §95 · Stage 4 as builds 88–89, with §98 retiring the tick grid
outright, and builds 92–93 completing S5c and executing §43 (the fairness pool now lives on the
GROUP). STAGE 5 IS COMPLETE (112–117, §119/§120) and the 118–126 wave followed the same night. **THEN
CAME RA-6 (§124): the audit of that wave, verified adversarially, at `tests/docs/RA-6-2026-08-28.md`
— and §125: its order is Claude's. Stages 0–2 shipped as admin 127–133 / staff 41–43. **§126 (29 Aug):
*"go with all items that you can"* — Stage 3, the schedule-only half of Stage 4 and the Tier 2 items
Claude judged necessary shipped as admin 134–137 / staff 44–46, then §127 (only ANNOUNCED vacation
reaches the schedule) as admin 138; then §128–§130 shipped B-2, B-7, the page half of Stage 5, S-3's
client half and D-6 as 139–141 / 47–48, and the Stage 5 rules were PUBLISHED 30 Aug. **§131/§132 (30 Aug
evening): *"move ahead with all of those that you can… I authorize you to make decisions on my behalf"*
and *"go as you think best"* — the remaining Tier 2/3 items, every visual DEFECT and half the §7b menu
(one collapse control, holidays findable from Rules, the sidebar regrouped) shipped as admin 142–146 /
staff 49, since PUSHED (`ac725ac`); the decisions Claude made are listed in `TODO.md` §1 for his review.
What is left of RA-6 is `TODO.md` §1 (D-7 needs a console index; the setup-checklist landing page,
in-page dialogs and the phone layout are unbuilt §7b items). §92 still closes the auction code.** **The AUCTION has no queued work at all.** On the SCHEDULE the owner drove
the shift catalog himself on 25 Aug and produced six items — §90's reasoning arriving exactly as
predicted. One shipped as admin 94; the rest are in `TODO.md` §1, with **§102 ruling the shape of
the largest of them (SHIFT POOLS: a combined staffing total across a named set of shifts, with
per-shift min/max ranges underneath it)**.


# 🔴 READ FIRST — THE AUCTION BOARD IS EMPTY AND IN AN UNVERIFIED STATE (31 Aug 2026, §145)
The Chrome-driven rehearsal he asked for was ABANDONED mid-flight after four extension disconnections
(*"forget it, this a waste of my tine"*). **He reset the board himself, so it holds no bids.** Three things
before anything else — the detail is at the very top of `TODO.md` §1:
**① Whether Phase 1 was BEGUN is UNVERIFIED** — the click landed, the connection died before the result
could be read. Check it and tell him. **② REHEARSAL MODE IS ON and must be OFF before any real launch
(NE-10)** — reset leaves it armed by design, and nobody has claimed arming it. **③ His pre-rehearsal data is
in the two cloud backups stamped *31 Aug · Phase 1 · 5 bids*.**
**⚠️ AND THE FINDING THAT MATTERS MOST: the two e-mail switches do NOT gate admin-initiated sends.**
`Outbid alert e-mails` is checked only where alerts are QUEUED; `Welcome e-mails` only in `welcomeOnce()`.
Every admin blast — Send Phase Results, Send Round Results, Send Reminders, the whitelist ask — reaches
`emailjs.send` through `adminSendEmail()`, which checks NO switch; the queue flusher checks none either.
**"E-mails are toggled off" is NOT a safe basis for a rehearsal.** Only `⏭ Skip sending (testing)`, which
exists only while Rehearsal Mode is ON, completes a phase without mailing. Not a live bug — every send is
still a deliberate confirmed act, NE-13 holds — but it is his decision whether the switches should also gate
the blasts, and §92 governs.
**The rehearsal is UNRUN and stays his final pre-launch check. Do not restart it unasked**, and not at all
until the disconnections are understood — the evidence, and Claude's own errors, are in `HANDOFF.md`.

# ▶ SCHEDULE BUILDING RESUMES — owner, 25 Aug 2026: *"we proceed with schedule builds."*

**THE TOTAL STOP OF 25 Aug IS LIFTED FOR THE SCHEDULE ONLY.** Two things it does NOT touch:
**⛔ the AUCTION stays closed by §92** — no change to anything `vacation-kp.github.io` serves,
including `firestore.rules`, without a specific decision from the owner for that change; and
**§0 rule 2 is RELAXED FOR THE 26 Aug SESSION ONLY, at his explicit request** (§110 — *"as
little prompting from me as possible"*): plans are stated and executed without waiting for a
per-item "go". Every other gate stands. Outside that session it governs every build again —
a queue item is not a "go", and he has never handed over the order of work.
Reading, auditing and running the batteries were in scope throughout and remain so.

**Builds 94–111 are all PUSHED, and the 26 Aug wind-down list is CLOSED.** Stage 5's rules frame
(105), the *Not more than* cap type (106), printable sheets (107), overnight call across years
(108), his dropdown-and-sheet changes (109), the calendar feed's admin half (110) and the collapse
control (111) all went live on 26 Aug. **⚠ `41ca7be` carries build 110 under a subject naming
108-109** — recorded in `BUILD-LOG.md`, not rewritten.
**STAGE 5 IS COMPLETE (112–117, 28 Aug): all seven rule types, warn at the moment of change, quotas
as constraints in auto-populate — the sentence that stood here listing them as unbuilt was a stale
snapshot (§3 rule 13). What is left of the schedule is in `TODO.md` §1: RA-6's Tier 2/3 and §7b
proposals (his to pick), D-7 (needs a console-created index), and the calendar feed's auto-refresh,
parked by him on 26 Aug.** **The Stage 5 rules are PUBLISHED (30 Aug). The feed still cannot be released until the endpoint in
`schedule/functions/` is deployed. §54's release gate is also still shut.** The schedule admin now opens collapsed everywhere the owner asked
(§104): the catalog is four closed bars, an eligibility row is one line, a group card is its header.
Read the CLOSING CHECKLIST at the top of `HANDOFF.md` before ending any session — its step 0,
`git fetch` every repo before judging what is recorded, exists because on 25 Aug a stale clone
led to eight rulings being "rediscovered" and nearly overwritten with paraphrases.**

**THE CALENDAR FEED IS LIVE AND VERIFIED END TO END (30 Aug afternoon): §136 rules published (RA-2 146/146, honesty 4 of 4 red on `28bae0c`), endpoint deployed on Node 22 at the expected address, three-row check passed. 148, 149 and 150 were ALL PUSHED by him and verified served twice each (150 verified 31 Aug ~02:30 UTC, `f5b8138`). Schedule admin 150 (§137 A/§139 — the link e-mail: webcal + copy-paste address, honest phone instructions, bulk send behind §54's gate, failures never recorded as sent, the schedule's own mail meter, lazy mailer) with `build150-test` in `tests` (the fake learned `increment()`). Nothing auction-side changed. ⚠ Before the first real send: the SUBJECT lives in the EmailJS template — he sends himself one and reads it (TODO §1). §54's release gate is SHUT. PARKED by §141 (31 Aug): the e-mail flow needs work down the road — recheck before any real send; the staff-site link (§137 B) waits for a later date.** Schedule admin 147 / staff 50 (§134/§135 — the in-page dialog, the phone day list, nothing to swipe) were pushed by him (`90af11e`) and verified served twice, cache-busted, 30 Aug ~14:10 UTC; nothing auction-side changed.** 142–146 / 49 were pushed 30 Aug (`ac725ac`) and verified served twice. THE STAGE 5 RULES ARE PUBLISHED (30 Aug ~03:20 UTC, after RA-2: 136/136, honesty 46 of 46 red on `5994a1e`). **LIVE, verified
cache-busted TWICE: auction admin 305 · staff (index) 164 · mobile 18 · schedule admin 151 / staff 51** (verified served 31 Aug ~05:15 UTC after his push — §142, the setup checklist + D-7; 148–150 — §136–§140, the calendar-feed wave, `f5b8138`; 147 / 50 — §134/§135, `90af11e`; 142–146 / 49 — §131–§133; 142–146 / 49 carry the rest of RA-6's Tier 2/3, every visual defect and half the §7b menu; 139–141 / 47–48 — §128–§130; 139–141 / 47–48 carry B-2, B-7, the page half of Stage 5, S-3's client half and D-6; 134–138 / 44–46 — §126/§127; 134–138 / 44–46 carry Stage 3, B-3/B-4 and §127; 131–133 / 41–43 — §125; 118–126 · staff 38–40 carry §121–§123, §5, §6, defect 3, §90 grid marks, §41 request types) — all five checked on 26 Aug (admin 305 that evening, after his push) against the SERVED site (via
`WebFetch`, see §4 step 2), not merely against disk. Disk agrees, and `firestore.rules`
is PUBLISHED to BOTH consoles (§100) with its repo copy now committed (`5994a1e`). **RA-2 executed
it: 66/66 on the live rules, and 10 of 10 new-gate assertions FAILED on the old ones** — the owner
ran it, which is how that battery works (§6). All four repos clean and in sync with origin, no
locks. Auction battery re-run on the pushed tree, 24 Aug: **54 suites / 2,050 assertions, zero
skips**. Schedule battery: **35 suites / 995 assertions, zero skipped** (in-cloud, browser suites
RUN; on the Mac 21 of them SKIP, which is a coverage hole and not a pass).



**⚠️ "THE BYTES ARE PUSHED" IS NOT "IT IS LIVE".** FAST-1 shipped inside admin 303 inert in
100% of cases, with a green 52-assertion suite over it, and was reported to the owner as live.
Fixed in 304. Its two rules are §3 rules 9 and 10; the full account is in the §101 archive.

**NOTHING IN THE REPOS IS OUTSTANDING.** What remains is the owner's own and he tracks it
himself — **launch and the sign-in test are OFF the list at his instruction, 25 Aug: do not
re-add them and do not remind him.** Their live state is `HANDOFF.md` PART B, as reference.
**M-4 IS FULLY CLOSED (31 Aug): the owner checked all four documents by caret — NO SPACES in the e-mails.** Nothing
auction-side is open; the record of the check is in `TODO.md`.

**DO NOT PICK THESE UP.** BULK-1 — per-week bulk approve/deny — is **DECLINED** (owner, 24 Aug:
*"No, I don't want that"*); his *"I want both options"* meant the existing phase-wide bulk plus
individual clicking made fast, which is what FAST-1 is. M-3, M-6, M-7, M-9 and M-4 are **off the
queue by §87** (*"i only want to do 100% necessary fixes at this point"*, then *"ignore other
items"*); H-4, H-5, M-8 stay skipped and M-2, M-5 were left alone by §86. The walkthrough deck is
**REOPENED by §116 (26 Aug evening) and now FILED: the single current copy is `tests/docs/VacationAuctionWalkthrough.pptx`**
(owner, same evening: *"keep the single, most recent ppt file"* — private repo, never the public Pages repo); older revisions are in `_archive/tests/walkthrough-deck/`. Do not re-raise any of them.


Read `DECISIONS.md` (§87, §88, **§89 last**), then `TODO.md` §1, then the private reports
**`tests/docs/RA-6-2026-08-28.md` (current — §124; its Tier 1 is the queue)**, then `RA-5-2026-08-24.md` and `RA-4-2026-08-21.md`. **Do not describe any defect by
reproduction in these repos — they are PUBLIC (§3).**


> 🗂️ **THREE FILESYSTEMS, AND SCREENSHOTS LAND IN THE ONE YOU WOULD NOT GUESS (24 Aug 2026).**
> This cost the owner twenty minutes of hunting through Finder for files that were never on his
> Mac. There are THREE separate filesystems in a cloud session, not two:
>   1. **The CLOUD container** — the `Bash` tool. Where deliverables are built. **AND where
>      Chrome-control screenshots land: `save_to_disk:true` writes to `/tmp/claude-chrome-
>      screenshots-<id>/` IN THE CLOUD**, not on the Mac, even though Chrome itself runs on the Mac.
>   2. **The device VM** — `device_bash`. Mounts ONLY `~/Documents/GitHub`. Its `/tmp` is its own
>      and is NOT the Mac's.
>   3. **macOS proper** — not directly reachable by any tool.
> **So the screenshot workflow needs NO transfer at all:** take it with
> `mcp__claude-in-chrome__computer` (`save_to_disk:true`), then open it straight from `/tmp/...`
> in the cloud with PIL and drop it into the deck. **Do NOT ask the owner to drag files anywhere.**
> ⚠️ **AND A SECOND, UNSOLVED ONE (24 Aug):** files delivered with `device_commit_files` land on
> disk but **git over the bridge does not list them as untracked** — so they are silently never
> staged. A file written by `device_bash` in the same folder IS seen. Cause unknown; possibly a
> mount artifact that does not affect git on the Mac itself. **The rule until it is understood:
> anything that must end up in a COMMIT gets written with `device_bash`; `device_commit_files` is
> for delivery only.** This matters most for the files a machine reads — rules, suites, build
> artifacts — not for documents the owner already has copies of. "Filed" means committed and
> pushed, not delivered.
>

The five files that govern everything:

| file | answers |
|---|---|
| **this file** | how we work — every binding rule, once |
| `TODO.md` (this repo) | what is outstanding, both sites — queue at top, STATUS block first |
| `HANDOFF.md` (this repo) | what happened, in detail, both sites |
| `DECISIONS.md` (this repo) | what the owner has ruled — **BOTH sites**, despite its legacy title. §1–§106 plus the buried-rulings index. Never trimmed: a July ruling governs as much as today's |
| `schedule/BUILD-LOG.md` | what shipped, when, in which commit |

A fact lives in ONE of these. Before writing a rule or status anywhere, grep for it; if it
exists, point at it. The pre-merge documents drifted precisely because facts had copies.

---

## 0 · THE OPERATING PROTOCOL — the owner's standing order, 25 Aug 2026, VERBATIM

**This governs every session and every task, and it is the first thing to obey. It is not a
description of how work went once; it is the instruction. Where §3 covers the same ground it is
the SPECIFIC application of these five — §3 never overrides them.**

> *"Act as a Principal Software Engineer. Before implementing any changes or writing a single
> line of code, you must follow these operational rules:*
>
> *1. EXPLORE FIRST: Provide a high-level overview of the relevant files and trace the logic flow
> step-by-step. Do not assume anything.*
>
> *2. PLAN MODE: Output a detailed, multi-step implementation plan. List files to be created or
> modified, edge cases, and potential breaking changes. Wait for my explicit approval before
> proceeding.*
>
> *3. SURGICAL EXECUTION: Make minimal, isolated, and clean modifications. Never rewrite entire
> files unless strictly necessary.*
>
> *4. UNCERTAINTY FLAG: If any part of the requirement is ambiguous or missing context, stop and
> ask clarifying questions instead of guessing.*
>
> *5. TEST-DRIVEN: Outline how we will verify the code works locally before marking the task
> complete."*

**WHAT EACH ONE MEANS HERE, so it is not softened into a formality:**

**1 · EXPLORE FIRST** — read the files before describing them. §3's rules 8–16 exist because
this step was skipped: a claim about code that was not re-read *sounds exactly like* a verified
one. "Do not assume anything" includes not assuming a chat summary is the source (see §4).

**2 · PLAN MODE** — the plan is output and then work STOPS until he says go. A general "keep
going" from an earlier turn is not approval for the next change. This is the same boundary §7
draws between batches, applied one level finer: to each change, not just each batch.

**3 · SURGICAL EXECUTION** — never rewrite a whole file. The admin files are large; edits are
anchored, verified, and land as diffs a human can read.

**4 · UNCERTAINTY FLAG** — ask, do not guess. Cheaper than the alternative every single time:
the day board took three builds because nobody asked what the screen was FOR.

**5 · TEST-DRIVEN** — say how it will be verified BEFORE it is built, and the verification runs
in-session (§6: the owner does not run batteries). This does not replace the honesty check —
every build still ships a suite that FAILS on the previous build.

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
>
> 2. **`tests/package.json` and `package-lock.json` are GITIGNORED** (see that repo's `.gitignore`)
>    — so a fresh clone does NOT restore them and the rules-emulator suite silently cannot run.
>    They were restored by hand on 22 Aug. Same trap for any other local-only file.
> 3. **Repos must never live under iCloud with "Optimize Mac Storage" ON.** That setting evicts
>    local file contents and leaves placeholders; git then reports a healthy repo as corrupt,
>    empty, or "not a git repository". It cost most of 22 Aug. The setting is now OFF; the repos
>    are still in `~/Documents/GitHub`, which is only safe while it stays off.
>
>
>
>
> **THE FOUR FACTS THAT GOVERN EVERYTHING** are unchanged and still below. Two additions from
> 21 Aug: the projected list and the decided list are DIFFERENT THINGS and must never share the
> bare word "winner" (§81), and a thin commit subject is acceptable because the BUILD-LOG row is
> the real summary (§83).
>
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
>
>
>
>


## 2 · THE TWO SITES, AND WHAT THEY SHARE

**Vacation Auction** — `vacation-kp.github.io`, served at
`https://anesthesia-kp.github.io/vacation/`. **Daily Schedule** — `schedule`, in build.
**ONE Firebase project holds both** (`vacation-25e8e`): `vacations/*` belongs to the auction,
`dailysched/*` to the schedule. **That means ONE Firestore quota and ONE bill across both
sites** — verified in the code 19 Aug 2026. The CRNA auction is a SEPARATE project
(`crna-vacation`) with its own allowance — **SUSPENDED 26 Aug 2026 (§118): its two sites 404 and
`crna/` is absent by design; addresses and the revival recipe are in `TODO.md` CRNA-SUSPENDED.** The schedule contributes nothing today, but it
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
- **COST IS A SECURITY INPUT IN THE RULES, not a separate concern.** A rules
  document-access is BILLED on every evaluation, so a stronger predicate on a hot document is a
  permanent per-delivery charge — which is why the bid document is gated by `isVerifiedAccount`
  and not by the stricter `isRegisteredUser`, with the accepted residual written down. Price a
  predicate before strengthening it.
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
   unsure, STOP and ask. Do not agree with bad ideas — push back. **And every owner-found item outranks
   the queue** — he has more than once found, in one sentence, the mirror image of what a
   seven-agent audit found. **This rule is §0 rules 1–4
   applied to a single change; §0 is the governing statement and this is its specific form.**
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
7. ⛔ **THE AUCTION CODE IS OFF LIMITS — owner ruling §92, 24 Aug 2026.** No change to anything
   the vacation auction serves (`vacation-kp.github.io/**` — the staff, admin, mobile and `crna/`
   pages, `versions.json`, and `firestore.rules`, which lives in that repo) without a SPECIFIC
   decision from the owner FOR THAT CHANGE. A general "go" on other work is not that decision, and
   neither is a finding, however good. READING it is always allowed and still required: the
   isolation guard and the full auction battery run after schedule builds exactly as before. If
   something auction-side looks wrong, RAISE it and stop.

**Eight rules the gates themselves taught, each one paid for.** Promoted out of `HANDOFF.md`
25 Aug 2026 under §101 — every one is a mistake this project actually made, usually twice.

8. **A GATE CAN LIE IN BOTH DIRECTIONS, and the second is the one that gets it ignored.** The
   known half: when a gate reports SUCCESS, check it actually ran (the handler audit that always
   printed 1; the button sweep that exited 0 having tested nothing; `pgrep -f run-all.mjs`
   reporting RUNNING for an hour after the process died, because **the pattern matched the
   polling shell's own command line** — check the log's mtime against `date`, never the process
   table). The other half: **a gate that fires on the wrong thing gets ignored, and an ignored
   gate is worse than none** — `pendingPush()` read paperwork edits as a filed build; the
   staleness gate compared two clocks in different timezones. **And a third kind, found 25 Aug:
   an input that is IGNORED rather than rejected** — passing `ADMIN=` to a suite that reads
   `SCHED_ROOT` silently re-tests the working tree, so a bisect returns the same number for every
   build and looks like a clean result. **Before believing a bisect, change the input and check
   the output changed.** Fix the aim, do not lower the bar.
9. **ASK OF EVERY BUILD THAT ADDS A PAGE OR A CONTROL: what would still pass if the whole thing
   were INERT?** If the answer is "everything", the gate is the wrong shape. Executed-function
   coverage proves the logic and says NOTHING about whether a human can reach it. Build 88
   shipped a Groups page where every click threw, with a green suite over the top; FAST-1 shipped
   dead the same way. **Such a build ships with something that DRIVES it** — a browser suite that
   clicks, or at minimum the render harness.
10. **TEST THE CODE, NOT THE PROSE — and an assertion that cannot fail is not a weak test, it is
    a false one.** **AND PROVE THE STRIPPER KEPT THE CODE.** A `/*` inside a LINE comment (the
    schedule admin has three, e.g. `// … dailysched/*, …`) opens a block comment that runs to the
    next real `*/` — measured at **347,322 characters, ~70% of the file** — so a stripper that
    removes block comments FIRST silently deletes most of what it is about to test. Strip line
    comments first, then block comments, and assert what survived: known code landmarks present,
    and the stripped length still a sane fraction of the original. Three assertions in one day failed on perfectly correct pages because a
    tombstone COMMENT named the very thing they forbade; another read `ok(… || true)`. Strip
    comments before any textual assertion, and make the search window reach the line.
    **And stub the SHAPE of the real function, never the convenience** — FAST-1's suite
    passed because its stub returned `''` where the real function always returns a wrapper div.
11. **READ AN EXIT CODE DIRECTLY. NEVER THROUGH A PIPE.** `… | tail` reports tail's status:
    it said 0 for a run that exited 1, twice. Same family: make a MISSING function report a
    legible FAILURE rather than throw — a crash and a real regression look identical from an
    exit code. **AND IT IS NOT ONLY FUNCTIONS — this cost two debug cycles on 26 Aug.** The
    honesty run is where absence lives, so ANYTHING that may be missing on the baseline must be
    handled: a DOM element (`getElementById(x).classList` on a control the old build never had),
    and — the one that is easy to miss — **the assertion MESSAGE itself**, where
    `(probe||[]).map(...)` throws because the probe came back as the string `'__missing__'`
    rather than an array. Guard the message, not just the condition.
12. **WHEN A SUITE MUST BE EDITED TO PASS, ask which you are changing: what is TRUE, or what is
    ASSERTED.** That distinction is the whole game. Repoint an assertion whose target moved;
    replace one whose premise the build deliberately changed with an INVARIANCE the previous
    build fails. Never stub the new behaviour — three suites were nearly given a stub that
    restated the very defect being fixed, which would have written it in as the definition.
13. **THE PASTED GOVERNING DOCUMENT IS A SNAPSHOT; THE DISK COPY IS THE DOCUMENT.** A START-HERE
    pasted into chat was one ruling out of date and would have shipped five findings instead of
    two. Same rule as §4's fetch-before-you-judge: **read from disk, and fetch before reading.**
14. **A CONCESSION IS WORTH NO MORE THAN THE CLAIM IT REPLACED.** Claude conceded a real defect
    because the owner DESCRIBED the symptom differently, and was wrong — both sides arguing from
    memory. *Run it, don't recall it* governs Claude's agreements as much as its assertions.
    And before building anything — or asking him anything — **check whether the code already
    answers it.** A day's rebuild was nearly spent on a paste-a-list feature that had shipped in
    build 56, and a design question about open-vs-sealed bidding was already settled by a board
    that paints every bid. **Check, then ask.** Where Claude does change its own position on
    evidence, say so and date it rather than quietly drifting.
15. **WRITE PATCHES THAT REFUSE TO APPLY TWICE** — assert `count(old)==1` before substituting, so
    an interrupted bridge call is safe to re-run rather than unknown. Then **md5 both sides after
    any interruption.** And when shipping whole files instead: **verified base → ship the file;
    unverified base → ship the patch**, because a patch refuses where a whole file corrupts.
16. **AN ASSERTION THAT PINS A COUNT OR A QUOTED STRING DECAYS INTO A NO-OP AS THE CODE MOVES.
    Assert the INVARIANT.** `test-crna-stamp` pinned a phrase inside curly quotes that a later
    ruling deleted, so it passed by testing for text that existed nowhere and would have kept
    passing with the auth domain sitting in the page unquoted. `test-delta-fixes` pinned
    "exactly three" tracked listeners — a form that PASSES when someone adds an untracked one,
    which is the exact leak it exists to prevent. Both were re-anchored and both came out
    STRICTER than what they replaced.

**The paperwork — at these moments, these files, EVERY time**

| when | what changes |
|---|---|
| a ruling / an idea / a "we should eventually…" | `DECISIONS.md` (ruling) or `TODO.md` (idea) — **IN THE SAME TURN it is said.** A chat is one compaction from gone; this has already cost the owner ideas once |
| a build is filed | `BUILD-LOG.md` row (same breath as the code) · `COMMIT-MESSAGE.txt` per repo touched · the same summary to the chat outputs column · `TODO.md` defect/roadmap status |
| the owner pushes | run `node status.mjs` in this repo — it regenerates the STATUS block in `TODO.md` from `versions.json`, git and the suite counts. Derived facts are never hand-typed |
| a batch completes | tick it in `TODO.md` §1 |
| session end | `HANDOFF.md` if anything session-specific matters · status regenerated · stale-lock check (below) — the repos are the memory, not the chat |
| **THIS file is edited** | **bump `LAST REVISED` IN THE SAME TURN, and re-run `node status.mjs`.** **This file's own tripwire is 700 lines** — lower than `TODO.md`'s and `HANDOFF.md`'s because it is the one file the owner PASTES; over it, a rule not needed in months moves to `START-HERE-ARCHIVE.md`. Since 24 Aug that script is the ENFORCER, not a reminder: it reads this file's `LAST REVISED` date and every build number the LIVE line quotes, compares them against git and `versions.json`, writes the verdict into `TODO.md`'s STATUS block, and **exits non-zero when they disagree**. A stale START-HERE is now a failed gate, like a skipped honesty check |

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
   **USE `WebFetch`, NOT `curl` (25 Aug 2026).** Neither sandbox has egress to
   `*.github.io` — `curl` and node's `fetch()` both return HTTP 000, which is how a session
   came to write "the two cache-busted fetches could not be run from here" into this file.
   `WebFetch` proxies through Anthropic and reaches the served site fine. Two calls per site
   with DIFFERENT cache-busters — it caches 15 minutes per URL, so the same URL twice is one
   fetch, not two. `status.mjs`'s live column still reads "no network": that is its own
   `fetch()` failing, not a fault, and it is exactly why this step exists separately.
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
   **A `git fetch` over the bridge STRANDS `objects/maintenance.lock` in every repo it
   touches (25 Aug).** Git creates the lock, then cannot unlink it, and says so in a warning
   line that is easy to read straight past. So check for locks AFTER fetching as well as
   before, and `mv` any you made to `_to_delete/`.
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

**⚠️ `tests` CANNOT BE FETCHED OVER THE BRIDGE AT ALL (25 Aug).** It is the one PRIVATE
repo, its remote is HTTPS, and the device VM holds no credentials — `git fetch` there dies
with `could not read Username for 'https://github.com'`. The other three are public and
fetch anonymously. So the closing checklist's step 0 structurally CANNOT complete for the
repo that holds the audit reports and the suites. Judge `tests` from `git log` and disk,
and say that is what you did rather than reporting a fetch you did not get.

**⚠️ SAY SO WHEN CONTEXT IS DEGRADING** (owner ruling, 16 Aug). The tells, in order: small
mechanical slips → **asserting things about code without re-reading it** (the dangerous
one — it sounds exactly as confident as a verified claim) → re-deriving settled questions →
losing the thread. Volunteer it, do not quietly compensate; offer a fresh session; make
sure the five files carry everything first. The gate that does not bend: every build still
ships with its suite, executed honesty check, and byte-verified file — tiredness is a
reason to hand over, never to lower the bar.

**⚠️ CONTEXT: REPORT THE READING, NEVER BLOCK ON IT — §106.** The owner judges rot; Claude
states the number. Cloud only: the last `usage` block in
`/root/.claude/projects/-home-claude/$CLAUDE_CODE_SESSION_ID.jsonl`, summing `input_tokens +
cache_creation + cache_read`. Compaction fires at 80% of a window that is NOT exposed (floor:
above 288,000). Over the bridge it is unreadable — say UNKNOWN. **Thresholds were invented twice
and overruled twice; do not invent a third.**

**⚠️ AND SAY SO WHEN IT HAS ALREADY DEGRADED — a COMPACTION is the loudest tell there is, and on
25 Aug it was missed.** The paragraph above lists the tells that come BEFORE the wall; these two
triggers are about the wall itself, and both failed in one session:

**· A compaction has happened → say so in the FIRST sentence of the next turn, before any work.**
The owner is owed the choice of a fresh session at that moment. What happened instead: the summary
arrived, the next build was picked straight back up, and he had to point out the omission himself —
*"you were supposed to warn me signals are in place that the chat history is too long."* Quietly
carrying on IS the failure; there is no version of it that counts as coping well.

**· Run the closing checklist BEFORE the context runs out, not after.** `HANDOFF.md` already
orders this — *"before a compaction, before a long gap, before 'what's next?'"* — and it is worth
almost nothing if it fires after the fact, because by then the chat it was meant to harvest has
already been reduced to somebody else's précis. When a session is long, stop and run it while the
material is still first-hand.

**The compounding half:** work resumed after a compaction is being done on a SUMMARY. Re-ground
each specific fact off disk before acting on it (`git show`, the code, `DECISIONS.md`) — the
summary is a report about the session, not the session.

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

> ⚠️ **AND THAT HARDCODED PATH IS EXACTLY WHERE `device_stage_files` LANDS.** It reads its
> pre-fix schedule baseline from `/mnt/user-data/uploads/GitHub/schedule/admin/index.html`.
> Staging the CURRENT admin page to look at it in the cloud therefore OVERWRITES the fixture,
> and the honesty check then compares a build to itself and reports what looks precisely like a
> regression in the live auction's battery. Nobody chooses this; the staging path collides with
> it. **Before believing a failure in `test-audit-fixes.mjs`, look at what is sitting at that
> uploads path.**

> ⚠️ **ONE `PREFIX_SRC` CANNOT SATISFY EVERY HONESTY BLOCK IN THAT SUITE**, and this is the ONE
> legitimate skip. Each block was written against ITS own immediately-previous build, not
> against a shared ancestor, so supplying a single auction baseline turns five unrelated blocks
> red. **When no auction build changed, leave the auction baseline ABSENT** — those blocks then
> skip, correctly, because the auction battery is running as a REGRESSION gate on unchanged
> bytes and not as any auction build's honesty gate. **Say that out loud in the report** rather
> than quoting "2,050 assertions, zero skips" as though it covered the auction's own honesty.

> 🧪 **RUNNING THE BATTERIES IN THE CLOUD — the things that actually make it work**, so nobody
> rediscovers them. Both site repos are PUBLIC and can be cloned straight into the container;
> only `tests` is private, so tar it (minus `node_modules`) and stage it. Then:
> · **`REPO_ROOT` is NOT enough** — several suites ignore it and hard-code `join(_here,'..')`,
>   so `tests/` must physically SIT BESIDE the repos: `<root>/tests`, `<root>/vacation-kp.github.io`,
>   `<root>/schedule`. Set `REPO_ROOT=<root>` as well, for the suites that do read it.
> · **`schedule` must be present and `--unshallow`ed.** Three auction suites read the schedule
>   admin page (§2's coupling), and the honesty suites run `git show <sha>:<file>` against
>   explicit SHAs in BOTH repos — a `--depth 1` clone makes every one of those a FAILED gate.
> · **The schedule battery additionally needs** the `fake/` firebase shims, `schedule/versions.json`,
>   the auction admin page, and `NODE_PATH` pointing at the global `node_modules`.
> · **md5-verify the clone against the device tree before believing the run** — both
>   `index.html`s, `admin/index.html`, `crna/index.html`, `mobile.html`, `firestore.rules`.
> · A playwright/chromium version mismatch in the sandbox is **fixable, not a reason to skip**:
>   symlink the installed browser build into the expected path and all 21 browser suites run.

**⚠️ A SKIPPED HONESTY CHECK IS A FAILED GATE, NOT A PASS (19 Aug).** Suites skip their
honesty block cleanly when the baseline file is absent — and a skip prints tidily and exits
**0**. The device workspace restarted mid-session and wiped `/tmp`, so all three honesty
checks silently became skips. **Read the honesty line every time: it must say FAILED with a
non-zero exit.** If it says "skipped", regenerate the fixture from its SHA and re-run before
reporting anything.

> ⚙️ **RA-2 IS THE ONE BATTERY THE OWNER RUNS, AND HE HAS SAID SO (25 Aug 2026).** His words:
> *"I can run RA2, you built a system for me."* §6 says the batteries are Claude's job and that
> he does not run them — **RA-2 is the standing exception, and the reason is mechanical, not
> preference.** The Firestore emulator is a Java jar fetched from `storage.googleapis.com`, and
> **that host is blocked by the egress allowlist in BOTH sandboxes** — the cloud container and
> the device VM. The jar exists only on macOS proper, which neither sandbox can see (the
> three-filesystems trap again). So `RA-2.command`, built for him, is the only way it runs.
> **Do not report the rules as untested when the answer is to ask him to double-click it.**
> The honesty half needs a pre-change fixture. `RA-2.command` gets it from git — and **on 25 Aug
> that worked**, despite the 22 Aug note below saying command-line git is missing. Do not assume
> either way: the wrapper tries git and falls through if it fails. **Still save a copy of the
> rules before editing them** and hand him `PRE_RULES=<that copy> node test-rules-emulator.mjs`
> as the fallback — and note the wrapper's built-in fixture is pinned to `d49cd15` (20 Aug), a
> WIDER baseline than one change, so older gates fail there too. That is not a fault; it just
> means a one-change comparison needs the explicit `PRE_RULES`.

**⚠️ COMMAND-LINE GIT: INSTALLED, AND READS FINE — corrected 31 Aug 2026.** The 22 Aug note here
said it was missing. A PUSH-ALL run on 31 Aug proved otherwise: Terminal `git` ran and committed, so
`status.mjs` and `RA-2.command` may shell out to it and the git-fixture route works (as it already
did on 25 Aug). What Terminal git CANNOT do is PUSH — the remotes are HTTPS with no saved sign-in —
and fixing that was DECLINED (§144). If a gate that reads history ever fails anyway, the fallback is
still `PRE_RULES=<file> node test-rules-emulator.mjs` from `tests/`.

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
