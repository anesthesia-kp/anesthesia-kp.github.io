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
