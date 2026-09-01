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


