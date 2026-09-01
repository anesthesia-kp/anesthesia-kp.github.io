# START-HERE ARCHIVE — rules and history moved out of START-HERE.md

Moved here when START-HERE crossed its 700-line tripwire (see START-HERE §3, the paperwork table).
Nothing here is retired: a rule that governed once governs still. It is simply not needed weekly.

## M-4 — the login-e-mail case/padding question (moved 31 Aug 2026)

**M-4 IS FULLY CLOSED.** Capitalisation was checked by the owner on 22 Aug (no capitals in any of the four
documents the rules compare) and space-padding by caret on 31 Aug (no spaces). No bidder and no admin is
affected and no data fix is owed. The §86 hardening remains ruled GO as defence in depth, not a repair.
The full original text follows.

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
> is invisible in the console. **CHECKED BY THE OWNER 31 Aug 2026 — no spaces found. CLOSED.**
>
> **The hardening is still ruled GO (§86) — it is now defence in depth, not a repair.** Two
> constraints found on 22 Aug that make it less trivial than "one rules edit":
> · Rules cannot lowercase the stored side of a list — there is no map operation. The candidate
>   trick is `data.emails.join(',').lower().split(',')`; **prove it with RA-2, do not assume it.**
> · `emailToUser` is a MAP KEYED BY ADDRESS. You can lower a set of keys to test membership but
>   you cannot fetch the value for a lowered key, so `myInitials()` cannot be fixed in rules at
>   all. Padding has the same problem. **Those two can only ever be fixed in the data.**
>
>


## Retired from START-HERE, 1 Sep 2026 — the 22 Aug "where to start" scaffolding
Moved to keep START-HERE under its own 700-line tripwire (§3). Both facts still hold and are
recorded here rather than deleted: `tests/package.json` is gitignored so a fresh clone cannot run
the rules-emulator suite, and the repos must never sit under iCloud with "Optimize Mac Storage" on.

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


## Retired from START-HERE, 1 Sep 2026 — the 306 and 308 news blocks

Both describe builds superseded four times over the same day (309–314). Their full account lives in
`DECISIONS.md` §147–§150 and the `BUILD-LOG.md` rows; kept here only so nothing is deleted, and moved
to hold START-HERE under its own 700-line tripwire (§3).

# ✅ THE RECORD OF BIDDING IS FIXED AND LIVE — auction admin 308 (§149 + §150), 1 Sep 2026
**The LIVE line below says admin 306 and that is still true — do not read it as covering 307.** His finding:
the reports dropped every bid §71's boundary scrub retired from the live schedule (so denied bids from closed
phases vanished from the All-Phases report, and its "N bids" header counted the survivors), and every
historical row on Approvals/Denials read `proj: LOSE` because two functions spelled the same projection two
ways. Then he found the SAME defect on the Approvals/Denials screen — a closed phase showed only its surviving
winners, and their projections instead of their results (§150). All of it is in 308; 307 was superseded before
it was ever committed, so its honesty baseline is the last PUSHED build, 306. Staff untouched at 165. The fix APPENDS to the report model rather than restructuring
it, so `current` and `phN` are provably unchanged. Gates, the undo and what the screenshots could NOT show are
in `TODO.md` §1; the account is `DECISIONS.md` §149 and the BUILD-LOG row.

# ✅ DRAW IS MERGED INTO UNDER REVIEW — LIVE 1 Sep 2026 (§147/§148), admin 306 / staff 165
**PUSHED by him (`df9b460`) and verified served twice, cache-busted, ~04:20 UTC.** One helper, `uiOutcome`, identical on both
pages, with every DISPLAY routed through it; the internal `draws`/`reviews` sets, `getOutcome`, `projRank`
and all three copies of the allocator are untouched, and nothing is stored in a new shape. **The ONE
behavioural change (§147 option A): a tie forming or dissolving now sends no alert e-mail and resets no
clock** — both the timer predicate and the mailer compare the MERGED label, on both pages. The gates, the
Claude decisions he may want reverted, and two findings raised-but-not-acted-on are in `TODO.md` §1; the
full account is the BUILD-LOG row. His §148 answers: admin keeps the word "tie"; the approve/deny dialog
note stays tie-only. Push order does not matter — no rules change, nothing schedule-side, no console step.

## Retired from START-HERE, 1 Sep 2026 (evening) — the LAST REVISED history paragraph

Replaced by a two-paragraph opener. Every fact in it is also in DECISIONS, BUILD-LOG or TODO; kept verbatim.

**LAST REVISED: 1 Sep 2026 (admin 318 LIVE — §161, G1/G2/G3, the announced-decision mail guard, his go *"go with all 3"*, PUSHED (`dd36c3b`) and verified served twice; 317 before it — §159, the inventory's three dashboard findings, his go *"go on all"*, PUSHED (`b884e27`) and verified served twice; 316 before it — §156, E1, the Edit Selections lock and its missing guard, his go *"go"*, PUSHED (`b295714`) and verified served twice; 315 before it; 314 before it — §154, D5/D6/D7, three more round surfaces, PUSHED and verified served twice; 313 before it — §153, his four owner-found Phase-4 round defects, PUSHED by him (`e4d0572`) and verified served twice; 311 before it (`fad145e`) carried §151/§152, RA-7's audit fixes; RA-7's audit fixes, §151/§152: the recorded projection, the Result/Projection filter split, the open-bidding warning scoped, two silent fallbacks, the timer/mailer contract, and a guard on the destructive phase boundary; admin 315 LIVE — §155, D8 + F-9b, the last two projection-source defects, his go *"go with both"*, PUSHED (`89f9bda`) and verified served twice; WITH IT THE AUCTION QUEUE IS EMPTY; admin 308 LIVE — §149/§150, the record-of-bidding fixes, PUSHED and verified served twice; 306 / 165 LIVE — §147/§148, Draw merged into Under Review, PUSHED by him and verified served twice; 151 / 51 LIVE — §142: the setup checklist + D-7's change-feed cap, PUSHED by him and verified served twice; tests/PUSH-ALL.command DROPPED, §144; the auction-board queue CLOSED by §146 — not re-raised; the feed live end to end under §136–§140) — THE AUCTION CODE IS CLOSED BY §92: NO CHANGE TO IT WITHOUT
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
