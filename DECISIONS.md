# Owner rulings — BOTH sites

*The title said "Daily Schedule" until 19 Aug 2026. It was never renamed as auction and
process rulings were added, and by §62 that was simply wrong — §58 (auction build 270),
§59 (auction timer modes), §60 (a whole auction session), §61 (Firestore billing) and §62
(commit summaries) are not schedule rulings. Corrected rather than left to mislead. The
section numbers are unchanged; nothing below moved.*

**Settled decisions. Do not re-litigate.** Add to the bottom with a date; never quietly
reverse an entry. If a ruling turns out to be wrong, write a new dated entry that says so
and why — the history is the point.

Mirrors the Vacation Auction's practice of recording owner rulings so a later session
can't undo them by accident.

---

## THE CARDINAL RULE — 15 Aug 2026

> *"Anything we work on for now cannot mess with the vacation site. There is some
> interaction and the absolute guiding principal must be to not disturb the vacay site."*

The Vacation Auction is live and running **all year**. Nothing built on the schedule
site may put it at risk. This outranks every other consideration in this file.

**Enforced by** `tests/tests-schedule-isolation.mjs`, which fails if the schedule gains
a write path to a `vacations/*` document outside the sanctioned set below.

**Note:** Firestore rules *cannot* enforce this — same project, same signed-in person, so
the server can't tell which page a write came from. The guarantee is the code plus the
test, nothing else.

---

## 1 · Roster writes stay on the schedule site — 15 Aug 2026

Claude proposed making the schedule read-only against the auction's roster. **Rejected.**

> *"I am okay with just the User section being able to write, but nothing else."*
> *"I want to keep full permissions for users in the schedule site. In the future, the
> schedule site will be used much more often than the Vacation site."*

The Users panel keeps full write access to `vacations/userList`, `usernames`,
`loginEmails`, `emails` and `emailToUser`. Nothing else on either schedule page may write
the auction — the staff page writes none today and must stay that way.

**Live hazards accepted by this ruling**, both in the Users panel:
- 🗑 Remove strips a physician from the live auction roster.
- Saving a login e-mail rebuilds `vacations/emailToUser`, the H-3 bid-security map, with a
  full non-merge overwrite. A duplicate address is dropped from the map, and that person
  then cannot bid.

Mitigation is still owed — see TODO. It must **not** be a phase gate: the auction runs all
year, so "refuse while a phase is live" would block roster changes for twelve months.
Ruled out 15 Aug.

## 2 · FTE stays independent of the auction — 15 Aug 2026

> *"The key about this feature is that the FTE setting must remain independent of
> vacation site."*

The schedule's FTE is `dailysched/fteMap`. The auction's is `vacations/fteMap`. Same
person, two numbers, deliberately. No seeding, no syncing, no fallback in either
direction. Already true as of build 48; now pinned by 5 assertions in the isolation test.

## 3 · Confirm every change — 15 Aug 2026

> *"I certainly want confirmation alert for every change that is made by both admin
> and user."*

Every mutating action, admin and staff, names exactly what it is about to do before
doing it — not a generic "are you sure." Applies to configuration as much as to
assignments (see the shift editor's Save dialog, which names the knock-on effects).

## 4 · Nothing is ever blocked — 15 Aug 2026

Safety checks **warn and let you override**. Nothing is hard-blocked. Every override is
recorded with who, when, and which rule.

Rationale: real scheduling breaks its own rules, and a tool that fights you at 6am gets
worked around.

## 5 · Draft vs published months — 15 Aug 2026

Each month has a draft (admins only) and a published version (what staff see).

> *"All admin approved swaps and requests once immediately, as long as the final schedule
> has been published for that specific month. Any requests made before final schedule
> published are part of draft schedule."*

- Month **published** → approving a request or swap applies immediately and lands in the
  affected people's change feed at once.
- Month **not yet published** → the approval builds the draft and reaches people at publish.

**Claude's default on the edge case** (stated 15 Aug, not contradicted): the test is the
month's state *at the moment of approval*, not when the request was submitted. Otherwise
an old request approved after publication would become an invisible change.

## 6 · Change feed is personal — 15 Aug 2026

> *"Users should only see changes that involve them."*

## 7 · Compatibility = times AND an approved-pairs list — 15 Aug 2026

Both, not either. Times and location filter automatically and cannot be overridden by
approval; whatever survives, the admin ticks. An unticked surviving pair is *unapproved*
(warns, per ruling 4), not impossible.

## 8 · People can hold two day shifts — 15 Aug 2026

> *"People can definitely have 2 daytime shifts. No shift can ever just be replaced.
> Good to have the warning, but some day shifts are compatible together."*

The `{day, call, off}` slot model is wrong and must become a list. No operation may
remove a shift as a side effect; removal is always explicit and named.

## 9 · Shift demand — every imaginable frequency — 15 Aug 2026

> *"Daily. Weekly on certain days, certain days/week or month, weekdays, weekends,
> holidays, every combination of the above, and more."*

Modelled as a **stacking list of rules per shift**, last match wins — not one setting.
Requires a live preview of the next 60 days, because the failure mode is silent.

Also: *"Not all shifts need a person every day. Some shifts are only once per month."*
A shift with no rules is never demanded and never counts as uncovered.

## 10 · Groups — 15 Aug 2026

> *"MD vs. CRNA is primary. Each person in that group is further subdivided into
> additional groups: pediatric, obstetric, admin, call/non-call, per diem, locums, and
> probably more."*

One primary role plus **any number of overlapping groups**, admin-created, not a fixed
list in code and not a tree. Rules target: everyone · a role · a group · a combination ·
named individuals.

> ⚠️ *Marked 17 Aug 2026: §53b supersedes the shape here. Subgroups are WITHIN-CATEGORY
> (MD or CRNA) — which IS a two-level structure, despite "not a tree" above. A capability
> both categories share becomes TWO same-named subgroups, one per category (§53b flags this
> for the owner). The example list here ("pediatric, obstetric, admin…") predates that.*

## 11 · Everything admin-editable — 15 Aug 2026

> *"I want all builds and choices to be admin editable so that when something changes,
> I don't have to go into code."*

Every value and every instance is editable in the admin UI: shifts, times, locations,
demand, rules, approved pairs, groups, holidays.

**Stated boundary, accepted:** rule *types* are code. "Minimum hours between shifts" is
built once; after that the owner creates as many instances as wanted, for anyone, with any
numbers, without a build. A genuinely new *kind* of constraint is a build.

## 12 · Lock / unlock for rarely-changed config — 15 Aug 2026

> *"Features like the times and days will likely only require editing before go live and
> occasionally after that. It should have lock and unlock feature to prevent mistakes."*

Shift configuration is locked by default. Unlock is deliberate, logged, and shows a
persistent banner while open. Must be enforced in the Firestore rules, not only in the
page — the same discipline as the auction's 7-key config freeze.

> ⚠️ *Marked 17 Aug 2026: §50 opened three config locks BY DEFAULT (§50 names only §20, but
> the change reaches this ruling too). §12's Firestore-rules enforcement clause was never
> built and is not honoured by an open-by-default lock — whether server-side enforcement is
> still wanted is UNRESOLVED. Ask before building either way.*

## 13 · Group editing — 15 Aug 2026

Times (and location) can be applied across a multi-shift selection. The confirmation lists
every affected shift before → after, and names any approved pairing the change would
invalidate.

## 14 · Demo banner removed — 15 Aug 2026

Both pages. Shipped in admin 49 / staff 25.

## 15 · Working discipline — inherited from the Vacation Auction

- **The owner does every git push.** Claude files to the working tree and byte-verifies;
  the owner commits and pushes.
- Never write to production Firebase. Never deploy.
- Smallest change → explicit go → only that change.
- Every fix ships with tests that **execute** real extracted code, plus an honesty check
  proving they fail on the previous build.
- Bump `var BUILD` **and** `versions.json` together.
- Anything that decides who works gets an adversarial audit before it ships.
- Plain language. The owner is not a coder. Push back on bad ideas.
- No reassurance without an executed reproduction.

## 16 · Test battery and periodic audits — 15 Aug 2026

> *"I will also need a full battery of test in similar fashion to the Vacation site.
> I want periodic extensive audits of new features in new builds with adversarial reviews."*

The schedule gets its own suite grown to vacation-site standard, and each feature build
gets a multi-agent adversarial audit.

## 17 · Times, sites and the clock — 15 Aug 2026

- **24-hour clock everywhere.** The native `<input type="time">` renders AM/PM on a
  US-locale browser and cannot be forced; the field must be a custom one.
- **Labels and times are separate data.** A shift whose label carries a 12-hour time
  (`4 to 8`, `6 to 8`, `11-7:30`) **keeps that label** and stores 24-hour times
  underneath. Neither is ever derived from the other.
- **No default times in code.** Every shift is blank until an admin sets it. Blank warns
  against every pairing rather than being treated as compatible.
- **Sites: Oakland and Richmond only.**
- Owner's dictated times, 15 Aug (21 shifts): D shifts 07:30–15:30 · D10 07:30–17:30 ·
  AP 07:30–19:30 · all PM shifts 15:30–07:30 next day · `4 to 8` 15:30–19:30 ·
  `6 to 8` 17:30–19:30 · `4 to 6` 15:30–17:30 (**not in the catalog — add?**) ·
  `D am` 07:30–11:30 · `D6` 07:30–13:30 · `Call 12 PM` and `OB PM` 19:30–07:30 ·
  `Call 16` 15:30–07:30 · `Call 24` 07:30–07:30 ·
  `PACU MD` and `OFL` same as D shifts.
- **`Eye Call` 07:30–15:30** (owner, 16 Aug) — **a call-family shift with ordinary day
  hours.** This kills the assumption that `kind: 'call'` implies evening or overnight
  hours. `kind` is a *tag* driving post-call and call-fairness counting; it says nothing
  about when the shift runs. Four of Claude's guesses rested on that bad assumption
  (`C2PA`, `C2AP`, `Call 8`, `PCV Call`) and are now marked SUSPECT rather than merely
  estimated.
- **`EV` corrected 16 Aug to 15:30–23:30** (8h, does not cross midnight). Supersedes the
  15 Aug statement *"Ev is 15:30-730 next day"*.
- **THE BLANKET PM RULE IS DEAD — do not apply it to a new shift.** The 15 Aug rule
  *"all PM shifts start at 15:30 and end at 07:30 next day"* has been superseded by named
  values for every shift it touched: `Admin PM` 13:30–17:30 · `Pedi PM` 13:30–17:30
  (owner, 16 Aug) · `Pedi Admin PM` 13:30–17:30 (inferred) · `D pm` 11:30–15:30 ·
  `CVpm` 13:30–17:30 · `OB PM` and `Call 12 PM` 19:30–07:30. **Nothing is left on it.**
  A future `* PM` shift must be given its own times, not the retired rule's.
- **Admin is an exception to the blanket PM rule** (owner, 15 Aug): *"Nothing admin runs
  past 1730 … AM is 730-1130 and PM is 1330-1730."* So `Admin AM` 07:30–11:30 and
  `Admin PM` 13:30–17:30 — **no admin shift may end after 17:30**, which is a validation
  rule the app should enforce, not just a set of values.
- Further named corrections: `D pm` **11:30–15:30**, `CVpm` **13:30–17:30**.
  `Pedi Admin AM` / `Pedi Admin PM` follow the admin pattern by inference (estimated).
  `Pedi PM` was **not** mentioned in the original dictation — ~~flagged CHECK ME~~
  **RESOLVED by Q14 (owner, 16 Aug): 13:30–17:30 confirmed.** With that, no shift remains
  on the blanket PM rule and it is retired (as the list above already records).
- **Estimated times must be visibly distinct from confirmed ones.** The owner said
  *"make your best guess at the rest… I can edit later"*, so every shift carries a
  confirmed/estimated flag and an estimated time stays provisional until accepted.

## 18 · One site per day — 15 Aug 2026

A person is at **one site for a whole day, never both**. A site mismatch between two
shifts is impossible *regardless of their hours* — it is not a timing question. Site
therefore becomes a property of a person's day, and near-mandatory data on every shift.

## 19 · Group rules drive the eligibility grid — 15 Aug 2026

The eligibility grid stays the single per-person truth. Applying a group rule ticks the
grid for everyone in that group; an individual can still be overridden afterwards. Rules
and the grid are never two competing sources of the same answer.

## 20 · Locks — one master switch PER PAGE — 15 Aug 2026

> *"The unlock for shift edits should be a master lock for batch editing."*
> *"Master switch on each page would be good."*

**One switch per admin page, not one for the site.** Unlocking a page is what puts it
into batch-editing mode — the selection boxes, group edit and bulk actions only exist
while its switch is open. Unlocking one page never unlocks another.

**Scope on each page is all-or-nothing**, including adding and removing (so the Shift
Catalog's switch covers add/remove shifts, not just their configuration).

**Pages that get a switch:** Shift Catalog · Compatibility · Shift Families ·
Shift Eligibility · Users · Schedule Grid · Requests · Swaps · Open Shifts.
Audit Log and Stats are read-only and get none.

**Defaults on open:** config pages **locked** (Shift Catalog, Compatibility, Families,
Eligibility, Users); daily-work pages **unlocked** (Schedule Grid, Requests, Swaps,
Open Shifts) — a lock on the daily job is friction every single time.

**Re-locking:** a page stays open until you lock it or reload. **No inactivity timeout,
and no relock when you navigate away.** A banner stays visible the whole time it is open,
naming the page and who unlocked it.

Enforced in the Firestore rules as well as the page, per §12.

> ⚠️ *Marked 17 Aug 2026: §50 opened the Shift Catalog, Report settings and Simulator, and
> §50a deliberately kept Users and the month guard shut. **Compatibility, Shift Families and
> Shift Eligibility — in this ruling's locked list — were never mentioned in §50 either
> way.** Whether they fall under the owner's "all the locks" or stay locked is UNRESOLVED.*

## 21 · "N per month" is a debt the month owes, with suggestions — 15 Aug 2026

A shift owed N times in a month is tracked as an obligation: the coverage board reports it
short until N are placed. The app **suggests candidate dates** based on who is eligible and
free; the owner accepts or moves them. It never places one silently.

**Per-person monthly caps are NOT wanted yet** — shift demand only, revisit once the Rules
section exists.

## 22 · Never present invented data as the owner's — 15 Aug 2026

Claude invented "Pedi Cardiac, twice a month" as an illustrative example, then repeated it
across the spec, the preview seed data and chat as though it were the owner's figure. The
owner caught it: *"Who said pedi cardiac is twice /month?"*

**Rule:** any placeholder, sample or guessed value shown to the owner must be labelled as
such at the point it appears — not in a footnote, and not only the first time. Applies to
demand rules, headcounts, capacities, times, locations and anything else. Where a value is
genuinely unknown, leave it empty rather than plausible.

All invented demand rules were stripped from the previews on 15 Aug; the spec's examples
are now marked. The times spreadsheet uses an explicit CONFIRMED / ESTIMATED flag per row.

## 23 · Bulk entry — duplicate first — 15 Aug 2026

> *"Love the duplicate idea."*

Duplicate-an-existing-shift is the priority, ahead of paste-a-list and bulk demand.
Rationale: the catalog is full of near-identical clusters (`ICU7A8` / `ICU7A12` /
`ICU7B8` / `ICU7B12` / `ICU7C8` / `ICU7C12`, `D10` / `D10+` / `D10 Float` / `D10Float2`).

## 24 · Catalog size — corrected 15 Aug 2026

The catalog holds **91 shifts**, not 104. Claude reported 104 from the highest `order`
value; the orders have gaps. Verified by counting entries in `DEFAULT_SHIFTS` (7) and
`ADDITIONAL_SHIFTS_V2` (84).

## 25 · Tracking: universal counting + admin-defined tags — 16 Aug 2026

> *"Call will have to be specified as such on the admin site and during shift edition …
> some items labeled call are actually not tracked as call or overnight … Ideally all
> shifts should be able to be audited and tracked although overnight call is definitely
> the most important one."*

Two separate things, deliberately:

**Tracking is universal and needs no configuration.** Every shift is counted per person
per period, always. Any shift can be audited and reported on. This is the default, not a
setting.

**Tags are what rules and fairness point at.** Admin-defined named sets of shifts,
managed exactly like Shift Families — create a tag, drop shifts into it. A fairness rule
balances *a named tag* across a population; a post-call rule triggers off *a named tag*.
`Overnight call` is expected to be the first and most important one.

**This retires `kind: 'day' | 'call'`.** "Call" stops being a property baked into a shift
and becomes one tag among several. That is what the `Eye Call` correction (§17) implies:
a shift can be called "call", run 07:30–15:30, and belong to no overnight-call tag at all.

Consequences: the shift editor gains tag membership; the Stats page can report on any tag
or any single shift; `windowShiftCounts` (today the only real fairness input, and it
counts day shifts as well as call despite the UI calling it call fairness) is rewritten to
count a named tag.

## 26 · Per diem and locums are OUT of the fairness pools — 16 Aug 2026

They are scheduled and tracked like anyone else, but excluded from the balancing maths —
a locum should not dilute the partners' call equity. Which pools a group is excluded from
is set on the group (§10), not hard-coded.

## 27 · Overnight call is a list the admin sets — 16 Aug 2026

> *"The shifts that count will be specified as call shifts by admin. You don't know those
> yet. You can start with call 16 call 24 and OB PM."*

**Starting set: `Call 16`, `Call 24`, `OB PM`. Nothing else.**

It cannot be derived, and Claude must not try:
- *Crossing midnight* would include `RCH-ICU B` (19:30–07:30), a night ICU shift.
- *The call family* would include `Eye Call` (07:30–15:30) and `Call 12 AM` (07:30–19:30),
  both daytime.

An untagged shift is **not** overnight call, whatever its name or hours suggest. This is
the first instance of the tag model in §25 and is admin-editable per §11.

Claude pre-ticked five shifts on first pass, including `Call 12 PM` and `Call 8`, which
was an assumption dressed as a default — corrected on the owner's instruction. Cf. §22.

## 28 · Reports — first set — 16 Aug 2026

**Admin only.** Not exposed on the staff site; Claude's suggestion of a staff-facing
"my report" was declined.

**Per person, not per shift.** A shift report can come later *"if needed."*

Each doctor's report, for a chosen day / month / quarter / year / custom range:

1. **How many of each shift they actually did**, with **overnight call at the top**, each
   line carrying the group average and the difference, plus subtotals for all overnight
   call and for all shifts.
2. **A dated list of every overnight call** in the period — a list, not a count.
3. **Compared with the group** — their number against the average, lowest, highest, and
   their standing.

Producible for one doctor or for every doctor in one page-broken document, in the shape
of the auction's User Summary. Visual language is the auction's `REPORT_CSS`, lifted
verbatim.

Sections Claude proposed and the owner rejected as not useful: requests/swaps activity,
change history, hours-and-shifts group summary, individual printable schedule.

## 29 · Report comparisons are FTE-adjusted; per diem and locums excluded — 16 Aug 2026

> *"For these averages, FTE must be considered in numbers should be adjusted for FTE.
> That should be specified in the report. Locum's and per diem are excluded."*

Not a flat mean. The method:

1. **The pool** is every doctor except per diem and locums. *(Narrowed since: §36 — no FTE →
not in the pool; §35/§43 — an explicit counts-toward-comparisons flag, per-person now,
per-group when stage 4 lands. This sentence alone is not the current definition.)*
2. **A rate per 1.0 FTE** is taken across the pool: pool total ÷ pool FTE.
3. **Each doctor's expectation** is that rate × their own FTE. A 0.6 FTE is measured
   against 0.6 of the load, never against a full-timer's number.
4. The report shows *Did · Expected at FTE x.x · per 1.0 FTE for them · per 1.0 FTE for
   the group · difference*.

**The method is printed inside the report** — the owner asked for it to be specified, so
it is stated on the page rather than assumed: pool size, pool FTE, and who is excluded
and why, by name.

**An excluded doctor still gets a full report.** They are shown and measured against
their own FTE; they simply do not influence the rate, their block says so explicitly, and
they get no pool ranking (which would be meaningless).

Worked example from the preview: pool of 4 = 3.8 FTE, 24 overnight calls → 6.3 per 1.0
FTE. A 0.8 FTE doctor is expected to do 5.1. The old flat mean over all six would have
said 4.7 — a materially different bar.

## 30 · Roster-write mitigation — the per-page lock is the answer — 16 Aug 2026

The Users panel keeps full write access to the auction roster (§1). A phase gate was ruled
out (§1). Offered the choice between naming the live auction consequence in the
confirmation, a soft delete, both, or relying on the per-page lock, the owner chose:

> **"Leave it — the per-page lock is enough."**

*(Flagged 17 Aug: this was an option-selection, like §§35–37, and per §37's stated practice
those are recorded WITHOUT quotation marks. Whether this exact sentence was dictated cannot
be verified from the surviving record — treat it as the recorded outcome, not certified
verbatim speech.)*

**Accepted, with the hazard restated so it is never mistaken for closed:** an unlocked
Users page still removes a physician from the LIVE auction roster in one click, and still
rebuilds `vacations/emailToUser` on a login-e-mail save. The lock makes that two
deliberate actions instead of one. It does not make it recoverable.

**Caveat flagged 16 Aug: the per-page lock is designed, not built.** Until it ships there
is no mitigation at all. The Users-page lock is therefore pulled forward into the small-fix
build rather than waiting for stage 1.

## 31 · Quick View bug now, phone view and notifications later — 16 Aug 2026

Suggestion 3 (stage 8) is split. The **Quick View month-boundary bug is fixed now** — it
makes the staff page look broken on first load. The phone-first view and e-mail
notifications stay at stage 8.

## 32 · Report Excel matches the auction — 16 Aug 2026

Fully styled: title row, coloured scope row, timestamp, navy block headers, colour-coded
cells, auto-sized columns — the same construction as `exportUserSummary`. Roughly half the
effort of the reports section; the owner judged it worth it.

## 33 · Build order, 16 Aug — small independent fixes first

Before stage 1 or stage 9: the batch of small, self-contained defect fixes that carry no
data-model risk.

## 34 · One chat for both sites — 16 Aug 2026

> *"I changed my mind. It seems to be working for us to move back and forth like this."*

Claude had recommended separate chat sessions, reasoning from context budget and
mis-filing risk. **Withdrawn** — a day of evidence contradicted it: the auction's context
is what made the schedule work good (REPORT_CSS reused verbatim, the stale-build gate
ported from auction 268, the holiday computation reused), the cardinal rule was enforced
*better* for holding both systems at once, and the predicted mis-filing never occurred.

The sites are deliberately convergent — same visual language, same confirmation style,
same discipline. Splitting the sessions would work against that.

Safe because the **repos hold the memory, not the chat**. Revisit only when the schedule
reaches the auction's scale.

**How the switching works:** a day or a session at a time — *"today is all scheduling,
tomorrow could be vacation"*. On every switch, **re-ground from disk before working**:
that site's start prompt and TODO, its live `versions.json` cache-busted, its `git status`.
The failure mode is not mixing the sites up; it is answering from stale in-chat memory.
On 16 Aug the handoff claimed the vacation battery had 8 reds — it had none. Run it, don't
recall it.

**Unchanged:** the auction takes absolute priority, and a Firestore rules change is an
auction deploy whichever site it serves.

## 35 · The comparison pool — a per-person switch ~~on Users~~ — 16 Aug 2026
> ⚠️ **SUPERSEDED IN PART, marked 17 Aug 2026.** The switch SHIPPED on the **Reports** page,
> not Users — owner-approved 16 Aug (see the Note at the end of §41, and §43). The Users page
> is the one page that writes the LIVE auction roster and opens locked for that reason; a
> schedule-only report setting must never be a reason to unlock it. **Do not move the switch
> to Users.** §43 further rules that when groups land, the group is the default and the
> per-person value becomes the override.

§26 excludes per diem and locums from the fairness pools, and §29 requires the report to
name who was excluded. **Neither can be answered from the data that exists**: a person's
record holds name, username, login e-mail, KP e-mail and FTE, and nothing else. There is
no per diem or locum flag anywhere on either page (`grep` on both, 16 Aug: zero hits).
`role` exists but sits on *shifts*, not people, and is decorative (defect 23). Groups are
stage 4 and not built.

Offered the choice between adding a per-person switch now, shipping Reports without the
comparison, or building stage 4 first, the owner chose **the per-person switch**.

**Ruling:** each person carries a *counts toward comparisons* flag on the Users page,
**defaulting to ON**. The admin unticks per diem and locums. Stored as the schedule's own
data; admin-editable per §11, with no code change needed to alter it later.

This is a thin slice of stage 4, in the same way the Overnight-call tag is a thin slice of
stage 1. **When stage 4 lands, the switch moves onto the group** (§26 says which pools a
group is excluded from is set on the group) and the per-person flag becomes the override,
not the source. Written down here so the later session migrates it rather than finding two
competing answers.

## 36 · A doctor with no FTE — reported, but never guessed — 16 Aug 2026

FTE is deliberately optional: `getSchedFTE` returns undefined and the code says *"no
default on this site, ever"* (§2 territory). The Users page already counts how many are
blank, so this is a live condition, not a hypothetical.

Offered the choice between excluding them from the rate, treating blank as 1.0, or
refusing to run the report at all, the owner chose **exclude from the rate, still report
them**. Claude argued against treating blank as 1.0 — it would measure a half-timer
against a full load and never say so, which is §22.

**Ruling:** a doctor with no FTE recorded gets their **full report** — shift counts and
the dated overnight-call list — but **no expected figure**, and their block states plainly
that no FTE is set so no expectation can be worked out. They do **not** enter the pool and
do **not** influence anyone else's rate. Nothing is assumed in either direction.

## 37 · The call baseline — out of period reports, in a rolling-12-month view — 16 Aug 2026

`dailysched/callBaseline` holds admin-entered call from before the site existed: one lump
per person per shift, **no dates**, one `_asOf` stamp, and a weight of
`(12 − months elapsed) ÷ 12` so it decays to zero across a year.

The owner first chose to include it in report totals. Claude pushed back once, on two
grounds not covered by the original framing:

1. **It cannot be apportioned to a period.** Nothing records which of the lump fell in
   August 2026, or in Q3, or in any chosen range. Adding it to a one-month report puts all
   prior call inside 31 days, and re-running that same August report months later gives a
   different number each time.
2. **It is fractional and time-dependent by design.** The decay is correct for fairness,
   where a starting handicap should wash out. It is wrong for a document someone prints and
   hands to a colleague, which has to be reproducible.

The owner then chose the **two-view** answer.

**Ruling:**

- **Period reports** — day / month / quarter / year / custom range — are **pure schedule
  data**. The baseline never enters their totals. The report says so on the page.
- **A separate "last 12 months — fairness view"** shows exactly what auto-populate and the
  fairness maths see: baseline included, decayed, fractional — and states that on the page,
  including the `_asOf` stamp and the weight currently applied.

Two views with different jobs, each honest about which it is. Neither is allowed to be
mistaken for the other.

**Not the owner's words.** Rulings 35, 36 and 37 were settled by the owner selecting from
written options, not by dictation. Recorded that way on purpose — see §22. No quotation
marks appear above because there is nothing to quote.

## 38 · Estimated times are parked — every unconfirmed shift stays BLANK — 16 Aug 2026

Owner, 16 Aug, on Q13 and Q15: *"q15 - leave all these blank for now. q13 - leave
remaining times blank for now."*

Claude estimated times for 68 of the 91 shifts and flagged 4 of them SUSPECT after
`Eye Call` disproved the reasoning behind them (§17). **None of the estimates go into the
app.** A shift whose time the owner has not stated stays empty.

~~This is the same answer §17 already gave~~ *(Corrected 17 Aug: it is NOT — §17 put
estimates IN the app behind a confirmed/estimated flag; §38 keeps them OUT entirely. §38
WINS on the estimates. §17's flag mechanism remains right for times the owner later accepts)* — *"no default times in code. Every shift is blank
until an admin sets it"* — now extended to Claude's spreadsheet: an estimate is not a
setting, and a blank is not a gap to be helpfully filled. A blank time warns against every
pairing rather than being treated as compatible, which is the safe direction.

`design/shift-times.xlsx` stays as a **worksheet for the owner**, not as an import.
The CONFIRMED rows are his own words and remain usable; the ESTIMATED and SUSPECT rows are
Claude's and are now explicitly not to be loaded. Cf. §22.

## 39 · `4 to 6` is a real shift — add it — 16 Aug 2026

Owner, 16 Aug, on Q11: *"add 4-6 as a shift in the weekday daytime category."*

Times are already confirmed in §17: **15:30–17:30.** Catalog size goes 91 → 92.

**How it gets added matters.** The v2 catalog seeding is one-shot and self-marking
(`_v2Seeded`), so editing the source constants has no effect on a database that has already
been seeded — that is defect 24, and it applies here. Adding this shift is therefore either
a few clicks in the Shift Catalog UI or a new one-shot migration in code.

**The UI is the right route**, and §11 is the reason: *"when something changes, I don't have
to go into code."* A shift is data. Claude does not write to production Firebase.

## 40 · No bulk demand editing — 16 Aug 2026

Owner, 16 Aug, on Q7: *"No."*

Bulk demand would have **replaced** whatever demand rules each selected shift already had —
the most destructive bulk operation on the page, and the one needing the sharpest
confirmation. It is not wanted. Bulk times and bulk location stay (§13); bulk demand is
dropped from stage 1 and from the §23 ordering, where it was third and last anyway.

## 41 · Only some shifts are requestable — it is a curated list — 16 Aug 2026

> *"Not all shifts can be requested, that's why i want just these."*

Shown the 27-entry Task list from the current system, Claude proposed generating the
"request to work X" entries from the 91-shift catalog, reasoning from §11 that a
hand-maintained list means a build every time it changes. **Overruled, and rightly.**

A person may not request most shifts. Offering all 91 would invite requests that can never
be granted, and put the refusal at the end of the process instead of the start.

**Ruling: requestable shifts are an admin-curated list**, seeded with the entries the owner
already uses. The app never derives it from the catalog, from `kind`, from a family, or
from eligibility. This is the **same shape as §27** — overnight call is a list the admin
sets, and so is this — and it is the second instance of the tag model in §25.

§11 is not violated: the list is **data, editable in the admin UI**, so changing it never
needs a build. What §11 forbids is a value baked into code, not a value chosen by a human.

**Note on §35.** The comparison-pool switch shipped in build 51 on the **Reports** page
rather than the Users page as §35's wording said. The wording was Claude's, not the
owner's; the owner approved the move on 16 Aug. Reason: the Users page is the one page that
writes the LIVE auction roster and opens locked for that reason, and a schedule-only report
setting must never be a reason to unlock it.

## 42 · "Both" is a property of the SHIFT, not the person — 16 Aug 2026

> *"Both means that both MDs and CRNAs do the shift. MDs are always different users from
> CRNAs however."*

Claude asked whether `Both (MD & CRNA)` was a third **role for a person**. It is not, and
the question was wrong.

* **A person is an MD or a CRNA. Never both.** One value, no third option.
* **A shift is MD only, CRNA only, or Both** — *Both* meaning either may cover it.

**This makes the shift's `role` field mean something for the first time.** Defect 23 records
that it is currently decorative: stored, shown, and filtered in the catalog, but **never
compared to a person anywhere**. Once people carry a role it becomes a real eligibility
constraint — a person may only be given a shift marked for their own role or marked *Both* —
and defect 23 is closed by using the field rather than by removing it.

Defect 21 is also resolved by this: the hardcoded `MD / CRNA / Both` three-option list is
correct **on a shift**. What must become data is the list of **person roles**, which is two
entries today and should not be baked in (§11).

Consequence for stage 5: role is a legitimate rule target (*"everyone · a role · a group"*,
§10) and needs no group to express it.

## 43 · The fairness pool — the group sets it, a person can override — 16 Aug 2026

The question: whose numbers go into the group average a report compares someone against?
§26 already ruled that per diem and locums are out of it. This settles *where that is set*.

Offered per-group, per-person, or group-with-override, the owner chose
**group sets it, person can override**.

**Claude argued against it and was overruled.** The objection was §19 — *"Rules and the grid
are never two competing sources of the same answer"* — which is the lesson from the
eligibility grid. Two places that can answer "does this person count?" is exactly that shape.

**Accepted, with the hazard named so it is never mistaken for closed, and with a mitigation
that is part of the ruling rather than an afterthought:**

An override must be **visible everywhere it matters**, never a quiet difference between two
screens:

1. On the **person**, wherever their status is shown: *"In Per diem, which does not count
   toward averages — individually overridden to count."*
2. On the **group**, listing its members whose individual setting disagrees with it.
3. **Inside the report itself.** §29 already requires the method to be printed on the page,
   naming the pool and who was excluded and why. An override is part of that answer and must
   appear there by name — otherwise a number changes and nothing on the page explains it.

The rule: **there is one answer, with visible exceptions** — not two answers that happen to
disagree. That is the difference between this and what §19 warns about, and it only holds if
the visibility above is actually built.

**Supersedes the placement in §35.** (The Reports-page shipping decision is recorded in the Note at the end of §41 — §35 itself never said Reports.) The per-person switch shipped in build 51 as an interim. That per-person value becomes the *override*, not the source. When groups
land, the group is the default and the person's setting is an exception to it.

## 44 · THE TARGET ARCHITECTURE — an engine, fed by rules and requests — 16 Aug 2026

> *"The ultimate workflow will be a set of rules, users submit requests, admin
> approves/denies requests, then the engine creates a schedule that takes all that into
> account."*

**This is the most important thing said in the project so far, and it reframes the whole
roadmap.** Stages 1, 3, 4 and 5 are not a list of features. They are the **inputs to an
engine**:

```
     RULES            (stage 5 — what scheduling must obey)
       +
     REQUESTS         (what people asked for, approved or denied by an admin)
       +
     SHIFTS, PEOPLE   (stages 1 and 4 — times, sites, demand, roles, groups)
       ↓
     THE ENGINE  →  a proposed schedule
       ↓
     an admin accepts, adjusts, or rejects it — nothing is placed silently (§21)
```

**Consequences a later session must not lose:**

* **Auto-populate is NOT the engine.** It is a crude ancestor of one — greedy, single-pass,
  fairness-only. Do not grow it into the engine by accretion; the engine is a build of its
  own, against rules that do not exist yet.
* **Every earlier stage is now judged by whether the engine can consume it.** A shift with
  no time is not just an incomplete record — it is an input the engine cannot reason about.
  That is why §38 leaving times blank has a real cost, and why stage 1 is the bottleneck.
* **§4 still holds at the engine's output.** Whatever it proposes, nothing is blocked and
  nothing is placed silently. The engine suggests; a person accepts.
* **§21's shape generalises**: the app suggests candidate dates, the owner accepts or moves
  them. The engine is that idea at full size.

Not yet designed. Recorded now so the stages are built as inputs rather than as islands.

## 45 · Auto-populate is a TESTING tool, and moves to a Testing section — 16 Aug 2026

> *"Auto-populate is funky. My original thought was that it would work as a simulator so I
> could rapidly assign shifts to test things. For this reason, I think it should move to a
> new testing section of admin, like the vacation site. Auto-pop month and year should move
> there. Let's stash clear month there as for now. Auto-pop for now should only give 1
> assignment."*

**What moves:** Auto-populate month · Auto-populate year · Clear Month.

**Where to:** a new **Testing** section, mirroring the Vacation Auction's exactly — which
already has a `Testing` nav heading, a 🎲 Simulator page, and a **Rehearsal Mode** master
switch that arms every destructive testing tool at once, with a persistent red banner while
it is on and blunt wording: *"This is NOT a sandbox: everything still writes the real
auction."* The schedule copies that shape rather than inventing one. The sites are
deliberately convergent (§34).

**Behaviour change:** auto-populate gives **one shift per person per day, total** — not one
day shift plus one call as it does today (owner, 16 Aug, asked to choose). A simulator that
can never double someone up is easier to reason about while testing.

**Why it matters beyond tidying:** per §44 the real thing is an engine driven by rules and
approved requests. Auto-populate is not that and must not become it by accretion. Moving it
out of the daily-work pages stops a prototype sitting where a stray click has consequences.

## 46 · Per-person caps ARE wanted — as a rule type — 16 Aug 2026

> *"Yes, as a rule type. Maybe it's time to have a rules section of admin where I will enter
> all the rules that scheduling must follow and shift assignments must follow."*

**Supersedes §21's deferral**, which said per-person monthly caps were *"NOT wanted yet —
shift demand only, revisit once the Rules section exists."* This is that revisit.

A cap is an instance of the **Not more than N of [tag] per week / month** rule type in
`design/RULES.md` — targeted at everyone, a role, a group, or named individuals. Per §4 it
**warns and is overridable**, never blocks, and every override is recorded.

## 47 · Split the month document into a subcollection — now — 16 Aug 2026

Defect 8: each month is a single `dailysched/sched_YYYY-MM` document, Firestore caps a
document at 1 MB, and **every write rewrites the whole thing**. Build 52 made each cell
larger — a list with provenance on every entry instead of two strings — so the headroom
shrank at exactly the moment it became easier to fix.

Offered now / later / measure-first, the owner chose **now, while there is no real data**.

Three things it buys, not one:

1. **The cap stops being a question.** A year of daily use by 60 people cannot approach it.
2. **A write stops rewriting the month.** Today two admins editing different days contend on
   one document; build 52's transactions make that safe but not cheap.
3. **Defect 9 becomes fixable.** Firestore rules cannot constrain a write to one person's
   entry while the whole month is one document. Per-day documents are what makes a real
   server-side rule possible — and rules are the only enforcement that does not depend on
   the page behaving.

Timing: after the Testing section and after stage 1 — it is independent of both, since stage
1 is the shift catalog rather than month documents.

## 48 · "N per month" is deferred — daily demand only, for now — 16 Aug 2026

> *"Skip monthly thing for now."*

Build 55 gives each shift a stacking list of **per-day** rules — daily, weekdays, weekends,
named weekdays, holidays — each carrying how many people that day needs. A shift owed *N
times a month with no particular dates* is **not** built.

**§21 is not reversed, only postponed.** It already ruled the shape: *"a shift owed N times
in a month is tracked as an obligation… the app suggests candidate dates and the owner
accepts or moves them. It never places one silently."* When it arrives it is a separate
field on the shift, not another row in the day-by-day list — a stacking rule cannot express
*"any two days, you pick"* without naming dates, which is the thing §21 forbids.

## 49 · Holidays — computed federal dates, editable on top — 16 Aug 2026

Offered the auction's computed federal set, a hand-kept list, both, or skipping holidays,
the owner chose **both**: the federal dates appear automatically and can be added to or
removed from.

**On lifting the auction's code.** The auction has a holiday computation, and §32's
instinct is to lift rather than approximate — but it returns **week indices**, because the
auction reasons in weeks. The schedule reasons in days. So the *definitions* and the
nth-weekday / last-weekday helpers port; the return type does not. This is a **port, not a
verbatim lift**, and it is described that way rather than claimed as identical.

**Two things stated rather than assumed:**

* The computed set is the **eleven US federal holidays**, not the auction's seven — the
  auction's list is trimmed to the ones that shape bidding. A hospital may well not care
  about all eleven, which is exactly why the list is editable.
* **The actual date is used, not the observed one.** When a holiday falls at the weekend the
  federal *observed* day shifts to the Friday or Monday; a hospital runs on the real day.
  This may be wrong for how the group treats coverage — it is a guess about their practice,
  so it is flagged here rather than buried, and the override list is how it gets corrected.

**§19 applies.** Computed dates plus overrides is two sources for one answer, which is what
that ruling warns about. It is allowed here on the same condition as §43: an override must
be **visible** — a removed federal holiday and an added local one are both shown as
deliberate changes, never as a silent difference between what the code computes and what
the calendar says.

---

## §47 (outcome) — DONE, build 59. How it actually came out. Carries §47a–§47d.

The ruling was "split the month document into a subcollection, NOW, while there is no
real data." Built. `dailysched/sched_YYYY-MM/days/{DD}`, one document per day.

Three things were decided during the build that the ruling did not cover, and they are
binding from here:

**47a — An unconverted month is READ-ONLY, not merged.** The tempting alternative was to
read both places and merge. That gives one question two sources of truth, which is what
§19 forbids, and it makes a half-and-half month possible. So: `sched_YYYY-MM.v2 === true`
means the day records are the truth (even when empty); days present without the marker
means unconverted, shown in full but locked, with a banner and a Convert button.

**47b — Converting COPIES; the old record is kept as the backup.** It is not moved and
not deleted. Deleting the old month documents is a separate decision for a later day, once
there has been real data in the new shape for a while. The copy is ONE batch — all of it
or none of it — because a half-copied month leaves the uncopied days invisible.

**47c — The lock is checked inside the write's own transaction, never from a flag.**
The on-screen "is this month converted" flag describes the month you are LOOKING at.
Request approval and swap apply both write to other months. A cached answer is wrong for
exactly the cases that matter, so `mutateCell` re-reads the month marker inside its own
transaction before writing anything.

### §47d — settled here, binding: **Clear Month must write the v2 marker alongside the deletions.**
Without it, clearing empties the day records, the reader falls back to the old document,
and every assignment just cleared comes back. That is a general shape worth remembering —
whenever "empty" and "look somewhere else" are both possible, something must say which.

---

## §50 — The config locks open by default. Two do not.

Owner, 16 Aug 2026: *"The locking of all settings is annoying and unnecessary right now. We
are many months away from this being used and there's plenty of time to fix any errors that
occur. For now, make it so that all the locks on the schedule site for editing are
unlocked. we can change later."*

Built as build 60. **OPEN by default:** the Shift Catalog, the Report settings, the
Simulator. All three are schedule-only configuration, and the owner's reasoning holds
exactly: a mistake has months to surface before anyone depends on it. §20 is superseded for
the DEFAULT only.

**§50a — TWO were deliberately NOT opened, and Claude said so rather than doing as asked.**

**The Users page stays locked.** It is the single sanctioned exception to the cardinal rule:
it writes the roster the LIVE Vacation Auction reads. Removing a user takes them off the
auction; saving a login e-mail rebuilds the auction's bid-security map. The owner's
reasoning — errors have months to surface — is TRUE of the schedule and FALSE here, because
the auction is running today. This is the cardinal rule, not a preference. It can be opened
on request; it will not be opened by inference from a sentence about schedule settings.

**The unconverted-month guard stays.** It is not a settings lock. It stops one month
existing in two storage formats at once (§47a), which is silent corruption rather than a
recoverable error, and Convert is one click away — so opening it buys no convenience at all.

**§50b — What was never the annoying part, and stays.** Confirmations are not locks.
Clear Month still asks. The simulator still says it is not a sandbox. Hand-editing still
warns and records overrides. Removing a *question* was not what was asked for.

**§50c — An open-by-default bar must not claim someone opened it.** Each lock records WHO
opened it; the bar says "open by default while the site is being built" when nobody did.
A convenience default that fabricates an audit trail would be worse than the friction.

---

## §51 — Approval checks: warn, allow the override, record it. Never block.

Defect 1 was that request and swap approval wrote assignments with no eligibility,
capacity, vacation or collision check, while hand-editing a cell checked. The same action
gave two answers depending on which button you pressed — the split §19 forbids.

Owner ruling, 16 Aug 2026, choosing between warn / split / block: **warn, let me override,
record it.** And separately: **eligibility should be checked everywhere**, including
hand-editing, which never checked it at all.

Built as build 61. There is now ONE `assignmentWarnings()`; the cell editor, request
approval and swap approval all call it. Nothing blocks. Every override is written to the
audit log **in the same entry as the change it authorised**, naming the reason.

**§51a — the check runs before anything is committed.** Before the status flip, and before
an open-shift claim is consumed. Declining a warning must leave the world exactly as it
was; approving first and asking second would strand an "approved" request with nothing
assigned. Asserted.

**§51b — a swap simulates the giver's side first.** A straight swap does not change how
many people are on a shift, so checking capacity against the current day would warn on
every ordinary swap. A warning that always fires is a warning nobody reads.

---

## §49a — BOTH the real holiday and the observed day. Supersedes §49's "real date only".

Owner, 16 Aug 2026: *"Observed holiday matters for this… Both real holiday and observed
holiday should be included… for all holidays."*

Built as build 62. Saturday is observed the Friday before, Sunday the Monday after, and
**both dates count as holidays** — the hospital runs on the real day, and the observed day
is when most of the group is off. Computed from the actual day of the week, not from a
hardcoded list of which holidays can move, so a future calendar change cannot leave a
stale list behind. Either date can still be removed by hand.

**The trap worth remembering:** New Year's Day of the following year, when it falls on a
Saturday, is observed on **31 December of the current year**. Without that, the last day of
the year silently is not a holiday — a bug that only surfaces every few years.

---

## §52 — The Shift Catalog is grouped by family, and sortable.

Owner, 16 Aug 2026: *"reorder shifts in the catalog so that they are grouped by family.
Also make them sortable by family."*

Built as build 62. Grouped by family by default with a coloured heading per family,
families A–Z, "No family" last. Sortable by family, by catalog order, or A–Z; the family
headings disappear under A–Z, because a heading there would be a lie.

**This is a view preference for ONE page and does not touch `shiftList()`**, which feeds
the grid, the simulator and the reports. Changing how the catalog reads must not quietly
change what the schedule draws. Asserted.

---

## §53 — ROLES AND SUBGROUPS. Answers the "Both" question (asked and settled in §42, mis-credited to §43 in the original heading). Unblocks stage 4.

Owner, 16 Aug 2026:

> *"There are only 2 broad categories of users: MD and CRNA. Some roles are covered by MD,
> some by CRNA, and some by both."*
> *"MDs and CRNAs then can each have subgroups they are a part of. This is important because
> subgroups determines which shifts they can be assigned."*

**Two levels, and they are different kinds of thing. Do not collapse them.**

**Level 1 — CATEGORY, on the PERSON.** Exactly two: `MD` or `CRNA`. Every person is one.
There is no third value. This is a property of who they are.

**Level 2 — SUBGROUPS, on the PERSON, within their category.** A person belongs to zero or
more subgroups. **Subgroups are what determine which shifts a person can be assigned** —
they are the mechanism eligibility should eventually rest on, not a label.

**"Both" is a property of the SHIFT, never of a person** — this restates §42 and it still
holds. A shift is covered by MD, by CRNA, or by both. Nobody is "Both".

### What this settles, and what it does NOT

- ✅ §43's open question is answered: **"Both" is not a third role and not two groups.** It
  is a field on the shift.
- ✅ Stage 4 is unblocked and its shape is now known: a category on each person, a subgroup
  list on each person, and a subgroup requirement on each shift.
- ⚠️ **STILL OPEN — do not guess (§22):** whether a shift requires *any one* of its
  subgroups or *all* of them; whether a person may belong to subgroups across categories
  (the ruling says "MDs and CRNAs each have subgroups", which reads as within-category, but
  it was not said outright); and how subgroups interact with the existing per-shift
  eligibility ticks — whether subgroups REPLACE that grid or filter it. Ask before building.

### The migration hazard to respect

Eligibility today is a per-person-per-shift tick grid (`dailysched/eligibility`). If
subgroups become the source of truth, that grid is a SECOND answer to "can this person do
this shift" — precisely what §19 forbids. Whichever wins, the other must stop being
consulted, not merely stop being edited. Build 61 routed every path through one checker,
so there is exactly one place to change.

## §53a — Subgroups: ~~two~~ ONE of §53's three questions ANSWERED here (the rest in §53b) — 16 Aug 2026
> *Heading corrected 17 Aug: the owner's message answered any-one-vs-all only; multi-membership
> answered a question §53 had already settled ("zero or more"). §53b closed the remainder.*

Owner, 16 Aug 2026, verbatim:

> *"A shift may require any one OR all of them. A person may belong to 1 or more subgroups.
> not sure what 3rd question means"*

**1. ANY-vs-ALL is a per-shift setting, not a global policy.** "any one OR all" means both
modes exist and each shift says which it uses. So a shift carries a subgroup requirement
AND a mode: `any` (in at least one of the listed subgroups) or `all` (in every one of them).
A global switch would be the wrong build — it cannot express both, and the sentence asks
for both.

**2. A person may belong to more than one subgroup.** Confirmed.

**3. ~~STILL OPEN~~ — ANSWERED SAME DAY. See §53b.** The question was restated in plain
language and the owner chose option C.

### Two residuals raised by the answers themselves — BOTH ANSWERED in §53b

- **"1 or more" vs §53's "zero or more".** §53 wrote *zero* or more; the owner wrote *1* or
  more. If every person must be in at least one subgroup, that is a validation rule and it
  changes what happens to a person the day they are added, before anyone has classified
  them. If it was loose phrasing, zero stands. **Not resolved. Not assumed either way.**
- **Across categories.** §53 asked whether a person may hold subgroups belonging to the
  other category. The answer given ("1 or more subgroups") settles the COUNT but not the
  SCOPE. Still open.

## §53b — Subgroups: the LAST three questions are answered. §53 and §53a are now CLOSED — 16 Aug 2026

Owner, 16 Aug 2026, verbatim:

> *"I choose C, thank you for that. I can live with 0 or more, maybe usefyl for new users.
> MDs and CRNAs can only stay in that subgroup."*

**1. SUBGROUPS GRANT; THE TICK GRID IS AN EXCEPTION LIST.** (Option C of the three put to
him.) Being in a subgroup a shift requires makes a person eligible **by default**. The
per-person-per-shift grid survives, but it stops being the roster of who may work what and
becomes the short list of deliberate departures from the subgroup answer.

Rejected, and why — so this is not relitigated:
- **A (subgroups replace the grid entirely)** — no way to exclude one person from one shift
  without pulling them out of a subgroup that governs every other shift too.
- **B (a person must be BOTH in the subgroup AND ticked)** — two independent reasons a
  person can be ineligible, neither visible from the other. That is §19's forbidden second
  source of truth, and it makes "why can't he be assigned?" a two-place lookup forever.

⚠️ **The §19 obligation this creates.** `allowed(u,id)` (admin ~1201) is today the ONE gate,
and it reads `elig[u][id]===true` — a bare tick. Under C it must become: *does a subgroup
grant this, and has an exception overridden it.* An unticked box must stop meaning
"ineligible" and start meaning "no exception recorded". Migrating the existing grid is
therefore **not** a data copy — every existing tick has to be re-interpreted, and the ones
that merely restate what a subgroup would grant are noise that should not become 60 × 91
exceptions. **How that migration runs: ANSWERED — the §56 cutover switch (17 Aug).**

**2. ZERO subgroups is legal.** Owner: *"I can live with 0 or more, maybe usefyl for new
users."* [sic — verbatim] §53's original "zero or more" stands; §53a's residual is closed. A person in no
subgroup is a valid, saveable person — not an error state. They are simply granted nothing
by subgroup, and can still be reached by an explicit exception.

**3. ~~SUBGROUPS ARE WITHIN-CATEGORY~~ — SUPERSEDED BY §53c (17 Aug): a subgroup MAY span both categories.**
Every subgroup belongs to exactly one category. §53's reading of *"MDs and CRNAs then can
each have subgroups"* was correct.

### ~~One consequence to put to the owner~~ — ANSWERED, see §53c: one shared subgroup is fine

If subgroups are strictly within-category, then a capability both groups share — a Peds
skill, say — cannot be one subgroup. It is **two** subgroups with the same name, one per
category, and a shift open to both would list both. That is a direct consequence of the
ruling, not a disagreement with it; it is recorded here so the shape is not a surprise when
the UI shows it. Ask whether that is what he pictured before building the editor.

## Buried rulings — an index, added 17 Aug 2026

Binding decisions that live inside another ruling's prose. Numbered here so they cannot be
lost; the text stays where it is.

| lives in | the ruling |
|---|---|
| end of §41 | the comparison-pool switch shipped on REPORTS, owner-approved — §35 carries the warning |
| §47 (outcome) | **§47d** — Clear Month must write the v2 marker alongside the deletions |
| bottom of §37 | rulings 35–37 were settled by option-selection, not dictation (governs §22 handling) |
| §17 | no admin shift may end after 17:30 — an app VALIDATION rule, not just a value |
| §17 | `EV` corrected 16 Aug to 15:30–23:30, superseding the 15 Aug statement |
| §1 | a phase gate on the Users panel is RULED OUT (the auction runs all year) |
| §11 | rule *types* are code; a genuinely new *kind* of constraint is a build |
| §42 | defects 21 and 23 are resolved by using the shift's category field |
| §52 | the catalog sort is a view preference for ONE page — it must not touch `shiftList()` |
| §47 | subcollection timing: after the Testing section and after stage 1 |

## §54 — Calendar feed: design and build YES, release to doctors NO — 17 Aug 2026

Owner, verbatim:

> *"calendar feed can be designed and built, but we can't push calendar to docs until the
> schedule is complete, which is weeks to months away."*

**What this settles:**
1. The per-doctor `.ics` calendar feed (IDEAS 1b) is **approved for design and build** — the
   first item from the ideas list to get a go.
2. **It is NOT released, announced, or offered to any doctor until the owner says the
   schedule is complete.** Building and releasing are two separate gates; only the first is
   open. Any subscribe button/link stays admin-only or hidden until the second gate opens.
3. Residual **ASK** from IDEAS 1b still stands before design: feed contents (shifts only?)
   and the per-doctor secret-URL security ruling.

## §55 — Staff may NOT request ineligible shifts. A deliberate exception to §51 — 17 Aug 2026

Owner, verbatim, overruling Claude's warn-and-allow proposal for the staff page:

> *"Users should not be able to request shifts they are not marked as eligible for. Admin
> can override assign with a conifirmation warning, but not users themselves."*

**What this settles:**
1. **The staff request form is a HARD BLOCK.** The shift dropdown lists only shifts the
   signed-in user is marked eligible for, and the submit handler refuses an ineligible
   shift outright even if the page is manipulated. No override, no confirm-and-proceed.
2. **§51 is UNCHANGED for admins** — warn, allow the override, record it. The two rules
   are one policy seen from two sides: the admin is trusted to override with a recorded
   reason; a user is not.
3. This eligible-only dropdown is **not** §41's curated requestable list — §41, when built,
   narrows the list FURTHER (eligible AND requestable). Eligibility is the floor.
4. **Stage-4 note (§53b):** today "unticked = ineligible" is the truth of the grid. When
   option C lands and an untick comes to mean "no exception recorded", this staff check
   must be re-pointed at the same single checker the admin uses — the code carries the
   same note.
5. Enforcement is client-side only for now; the Firestore rules cannot cheaply check
   per-shift eligibility, and a rules change is an auction deploy — deferred, noted here
   so it is a decision and not an oversight.

## §53c — Shared subgroups ARE allowed across categories. Amends §53b item 3 — 17 Aug 2026

Asked directly whether a skill both categories share (e.g. Peds) must be TWO same-named
subgroups (one MD, one CRNA), the owner chose: **"No — one shared subgroup is fine."**

**What this settles:**
1. **A subgroup MAY contain both MDs and CRNAs.** §53b item 3's strict within-category rule
   is SUPERSEDED. The owner's original sentence ("MDs and CRNAs can only stay in that
   subgroup") is now read as being about the PERSON's category — an MD is always an MD —
   not about a subgroup's membership.
2. A shift open to both categories can require ONE subgroup. No duplicated skill lists.
3. §10's original shape ("any number of overlapping groups, not a tree") turns out closer
   to the final model than §53b's tree reading — the 17 Aug annotation on §10 should be
   read with this amendment in mind.
4. The shift's own MD/CRNA/Both field (§42) still exists and still filters WHO can hold
   the shift — a CRNA in a shared Peds subgroup still cannot take an MD-only Peds shift.
   Category and subgroup are independent tests, both applied.

## §54a — Calendar feed: contents and access — 17 Aug 2026

Chosen from options, recorded per §37 practice (no quotation marks; selections, not
dictation):

1. **Contents: the doctor's assigned shifts (times + site) PLUS their approved vacation
   weeks as all-day events.** Not the whole group's schedule; no who-else-is-on.
2. **Access: a per-doctor secret link** — an unguessable token in the URL, the standard
   calendar-sharing mechanism. A leaked link is revoked by regenerating THAT doctor's
   token; nobody else's feed is affected. No sign-in step (calendar apps cannot log in).
3. §54's two gates unchanged: build when slotted, RELEASE only when the owner declares the
   schedule complete.

## §56 — Stage 4 ships with a CUTOVER SWITCH, not a flag day — 17 Aug 2026

Chosen from options: **"Cutover switch."**

1. **Stage 4 ships with the tick grid still authoritative.** Subgroups can be created,
   staffed and attached to shifts with NO effect on eligibility answers.
2. **One deliberate, admin-pressed switch** flips authority to subgroups-plus-exceptions
   (§53b option C). Until it is pressed, nothing changes; after it is pressed, the old
   ticks are RETIRED BUT KEPT as a record, never consulted (§19: the loser stops being
   consulted, not merely stops being edited).
3. There is never a moment where nobody is eligible for anything, and no machine-invented
   exceptions are ever created (auto-convert was explicitly declined).
4. The switch is the §47-style pattern: a one-way, confirmed, audited conversion with the
   old data preserved.

## §57 — Three residuals settled by option-selection — 17 Aug 2026

Recorded per §37 practice (selections from written options, not dictation):

1. **Approval timing (closes §5's open edge, Q19):** an approval is checked against the
   schedule **as it is at the moment of approval**, not as it was when the request was
   made. Claude's stated default of 15 Aug is now owner-confirmed. This is how build 61's
   checker already behaves; no code change.
2. **Timeless shifts and the rules engine (Q20):** stage 5 **works around blank times** —
   a shift with no time is a visible, warned-about gap ("cannot check overlaps for this
   one"), never a guess. §38 (estimates stay out) stands unchanged. The owner fills real
   times in the catalog at his own pace.
3. **Catalog data checks (Q10r):** the 7 R-rule Richmond guesses, the 2 no-rule sites
   (NICU9+, SMOB Uro) and the 5 photo-transcribed labels (NICU9+, RC0+, R9/5, R11+, CV8+)
   are **handed to the owner to correct in the Shift Catalog UI** — data, not code (§11).
   They stay flagged in TODO until he says they are done; sites matter once the schedule
   goes real (§18, one site per day).

Also confirmed in the same round: **Phase 3 is still running** — the M3 build window is
not yet open.

## §58 — The M3 build (270/140): case-blind sent-checks IN, schedule-side saves DEFERRED — 18 Aug 2026

Two rulings made while approving the M3 build's final shape, plus one recorded
interpretation:

1. **The already-sent checks ignore case (IN scope, owner: "also make the already sent
   checks ignore case").** Lower-casing `recipientsFor` alone would have made lower-cased
   recipients miss MIXED-CASE entries recorded in the delivered-address ledgers before 270 —
   a retry of an already-sent phase could then RE-send to exactly the addresses M3 affects
   (the duplicate-mass-e-mail never-event). So 270/140 lower-case ledger membership at the
   comparison point: `_sentAddrsFor`, `_ledgerFresh`, and both sites' mail-queue `sentTo`
   skips. Context that informed the ruling, all verified in code that day: Reset Auction
   preserves the roster (names, FTE, login + KP e-mails) and wipes the ledger; the Users
   page refuses case-only edits as "no change", so hand-editing stored case was never a
   workable alternative; welcome e-mails were off during the discussion but that bears only
   on the (rejected) manual-edit path.

2. **Schedule-side KP-address saves DEFERRED (owner picked "defer to a schedule build").**
   The schedule admin's Users page also writes `vacations/emails` (four handlers). It keeps
   saving as-typed until its own gated build folds in the same normaliser — recorded as
   S-hygiene in TODO §3. Harmless meanwhile: the auction read side now lower-cases
   regardless of stored case.

3. **Recorded interpretation (not an owner ruling): "leading/trailing dot"** in the frozen
   rejection list is implemented as a leading or trailing dot in the LOCAL PART or the
   DOMAIN (covers `.a@kp.org`, `a.@kp.org`, `a@.kp.org`, `a@kp.org.`). Every rejected shape
   is unarguable garbage; no deliverable address is refused. The old floor (must contain
   `@`, non-empty) is kept; NO domain policy of any kind (HANDOFF D5 untouched).

## §59 — Build 274 rulings: timer-mode empty-week, V5 inclusion, bundle order — 18 Aug 2026

1. **Timer modes, first bid on an empty week — NO special case.** The V3 record's open
   question ("should a first bid on an empty week reset the timer in modes 2/3?") was put
   to the owner; his answer, verbatim: *"why should first bids be different?"* Resolution:
   mode 2 stays strictly affects-others (a first bid on an empty week does NOT reset);
   wanting first bids to keep the phase alive IS mode 3, which the owner already specced.
   The distinction lives in the mode choice, never in a hidden exception. The admin card
   states this plainly on the mode-2 option.

2. **V5 rides build 274** (owner picked "Include V5"): the Fair Play winning-position
   lowering flag ships with V1's unlimited wording, so unlimited mode is never blind to
   lowering behaviour.

3. **Bundle order** (owner, mid-session): *"Then do C7 bundle and V3 as next build"* —
   274/141 = MD labels + roster removal + V1 + V2 + V5 + V3. V4 (year derivation) and V6
   (batch-add users) remain queued, untouched.

---

## §60 — The 19 Aug 2026 session: every ruling the owner made, verbatim — 19 Aug 2026

**Why this section exists.** Owner, 19 Aug 2026: *"ensure that all of my decisions are in the
handoff so that i never depend on chat history."* This is that guarantee. Rulings live HERE
(this file is the rulings register); `HANDOFF.md` §5b carries the narrative and points here.
Nothing below needs the chat to be understood.

**1 · Build the timer-editor fixes as one build — "Fix now, all of it."** Presented with three
defects (TR-1 wrong line, TR-2 unvalidated ladder, TR-3 invented rules) plus his own batching
idea (TR-4) and three options — fix all now / two-line fix now and batch later / park all —
the owner chose all of it, in one build. Shipped as **276**. Claude's stated reason for one
build rather than two, which the owner accepted: they live in the same two functions, and
splitting them means touching live auction code twice for one outcome.

**2 · Batched timer-rule saves — the owner's own idea.** Verbatim: *"Would it help to batch
save timer edits? Make admin responsible for clicking save at the end of re-working the
times/days?"* and *"those things will generally be edited several at a time and it's actually
annoying to click save each time."* Adopted. The admin now edits freely and presses Save once;
one confirm dialog still guards the write (§3 rule 5 is NOT weakened). Side benefit recorded
at the time: a multi-field edit became ATOMIC — the old per-field save briefly wrote
half-finished ladders that were the live rule for seconds.

**3 · Fix the Change Log — "let's fix this."** CL-1 (system admin actions rendered as bids)
and CL-2 (the same entries counted as bid activity on both sites, including every bidder's
"changes in last 24h" chip). Shipped as **277**.

**4 · Rules copy — COPY-1, Claude's proposal, approved as written.** Collapse the lowering
sentence so adjacent phases sharing an allowance merge and "up to" is said once. Phase 4 never
merges, because its count is per ROUND.

**5 · Rules copy — COPY-2, the owner's OWN wording, supplied verbatim:** *"On the highest
demand weeks (Ski Week, Spring Break, Thanksgiving, Christmas, New Year's), your bid must be 5
or better · On summer weeks it must be 8 or better"*. He rejected Claude's longer variants
that kept the range. Verified before writing, and the reason it is safe to drop the list of
allowed values: the engine's `priorityScore` ranks 1/2 (score 1) and 1/2/3 (score 0) ABOVE a
solo 1 (score 2), so "N or better" still includes the combinations at every floor.

**6 · COPY-2 follow-up — "1-agree."** The summer sentence must STAND ALONE ("On summer weeks,
your bid must be 8 or better"), not lean on the sentence above with "it must be". Reason,
found by the owner: the rules list joins the two sentences with a separator, but the welcome
e-mail prints them as SEPARATE BULLETS, where a leading pronoun has nothing to refer to.

**7 · "2- fix."** The staff rules list's hardcoded placeholder still carried the old wording
and a floor that was never live. Now empty and hidden until the live floors fill it. Recorded
as a Claude miss in the first pass, not an owner change of mind.

**8 · COPY-3 — "I prefer just eliminating the rule altogether if there is no floor."** A floor
that is not set produces NO sentence at all; the old "currently have no bid floor — all bids
may be used" wording is retired, and with neither floor set the bullet disappears entirely.
Consequence recorded for whoever reads this later: with no floor the engine also re-admits
**NP** bids on those weeks (any numeric floor rejects NP), subject to the separate NP phase
toggle — the text now says nothing about it either way.

**9 · COPY-4 — the admin "Save bid floors?" dialog, owner's wording verbatim:** *"High demand
weeks: 4 or better. Summer weeks: 10 or better. All other weeks: no floor — every bid
allowed."* He asked for it simpler after Claude proposed a version that also carried the
range and an NP note. **Stated trade, explicitly the owner's call:** the dialog no longer
mentions that any numeric floor blocks NP while "No floor" allows it. That consequence is
still spelled out in the Bid Floors card description directly above the controls.

**10 · COPY-5 — "I don't want that type of wording anywhere."** Ruling on enumerated
allowed-bid lists. A sweep found one remaining producer (the staff bid-rejection alert), now
"This high-demand week needs a bid of 4 or better." `bfAllowedText` was then left with zero
callers on either page and was DELETED outright rather than kept as dead code able to
regenerate the banned wording. A suite assertion sweeps both pages so it cannot return
without a test going red. Shipped as **280 / staff 145** with COPY-4 (279) in one commit.

**11 · "leave this" — CLOSED, do not re-raise.** *"A combined bid like 1/2/3 uses bids 1, 2,
and 3 at once"* stays on the rules list and in the welcome e-mail. It defines what a combined
bid IS rather than listing which bids are allowed, so ruling 10 does not reach it.

**12 · A-AUDIT — "hold for now, will do soon."** Still the queue head, still the next
substantial piece of work. Do NOT start it unsolicited, and do not start a feature either.

**13 · The launch checklist — "i know."** Those are the owner's actions, not a session's work
queue. Do not re-present the list unprompted.

**14 · V6 · C6 · C8 · `phases` doc growth · both optional-hardening items — "keep deferred."**
None is a launch blocker; none starts without a fresh explicit "go".

**15 · The owner finds defects a code-reading pass does not — and the audit changed because of
it.** Owner, verbatim: *"In my experience, I am able to find defects that you can't."*
Assessed as substantially true and the reason recorded, because it is structural rather than
effort: all five of the evening's defects were code doing exactly what it said, where what it
said was wrong for a HUMAN. Intent ("the ladder must tighten", "a log row should be readable")
is not written in the code; the owner holds it, Claude infers it. Resulting binding change,
now in `TODO.md` §1 and `START-HERE.md`: the audit must include a reviewer that EXECUTES the
render functions and reads the produced markup as a person would, and **"the screen tells the
admin or a bidder something untrue" is HIGH** even with no data loss and no bid affected.

**16 · Standing instruction — "ensure that all of my decisions are in the handoff so that i
never depend on chat history."** Every ruling gets written to this file in the turn it is
made, in the owner's own words where he gave them, with enough surrounding fact that it is
intelligible without the conversation. This supersedes nothing; it makes §3's paperwork rule
explicit about WHY.


---

## §61 — Firestore moved to pay-as-you-go; the reads tracker declined — 19 Aug 2026

**Context.** Analysis in `TODO.md` FB-1: on the FREE plan, the owner's own numbers (35
participants, ~400 bid actions on a busy day) project ~43,000–63,000 document reads against a
hard 50,000/day cap. Exceeding it DENIES reads until UTC midnight — the board stops loading
and nobody can bid, mid-phase. The multiplier was verified against the code, not estimated:
one staff bid writes 3 listened documents always (`schedule` · `changes` · `bidTimes`) plus up
to 2 conditionally (`timer`, `bestBids`), and every staff page listens to all five.

**Ruling 1 — the owner is SWITCHING to pay-as-you-go. DECIDED 19 Aug 2026, NOT YET DONE —
it is a line on the LAUNCH CHECKLIST in `TODO.md`, added at his request.** Verbatim:
*"switching to pay as you go."* This removes the cliff: the same free allowances continue and only usage beyond them is
charged. Priced 19 Aug 2026 from Google's own pricing page: reads **$0.03 per 100,000**,
writes $0.09 per 100,000, 10 GiB/month egress free then $0.12/GiB. At a sustained 100,000
reads/day for a month that is 1.5M billable reads ≈ **$0.45/month**, writes free, storage
negligible; outbound data transfer is the only meaningful variable. Re-check prices in the
console rather than trusting this note — they change.

**The stated downside, accepted:** a budget alert NOTIFIES, it does not STOP spending. There
is no true hard cap on the paid plan. So the failure mode changes from "the auction stops" to
"an unexpected bill", which is the trade the owner chose knowingly.

**Ruling 2 — no reads tracker.** Verbatim: *"skip the tracker."* FB-2 stays in `TODO.md` as
the record of what was possible and what was not, chiefly so the anti-pattern (a shared
counter document incremented per read — which adds a write per read AND re-broadcasts to every
listener) is never built by a later session. **Do not propose it again unless the owner asks.**

**Still true regardless of plan:** the cheapest code lever, if this is ever revisited, is
dropping the staff page's `changes` listener — ~25% of every bid's read cost for a purely
decorative Popcornometer and "changes in last 24h" chip. The WRITE would stay, so the admin
Change Log and Fair Play reconstruction lose nothing. Audit item, not a pre-launch patch.


---

## §62 — Commit summaries: a hard length cap — 19 Aug 2026

**Owner, verbatim:** *"the commits have been consistent and great. i am using only the
summaries though and they are too long. add to the handoff that these commit summaries must
remain short, maybe 1/4 of what they are now."*

**The cap: a subject line plus AT MOST 4 short lines — about 50 words.** Say WHAT changed.
Not why, not how it was proven. No test counts, no honesty-check numbers, no battery
results — those belong in `BUILD-LOG.md`, which is where the full record already lives.

**Recorded honestly:** this rule already existed in `START-HERE.md` §3 ("SHORT — a
recognisable subject + 2–4 plain lines") and Claude drifted past it steadily across 18–19
Aug, writing 150–200-word messages, because each one individually felt justified by the size
of the build. The cap is now numeric precisely so the drift is measurable instead of a
judgement call. The owner reads only the summary; length costs him time on every push.

## §63 — Pre-launch security: App Check across all six pages; privacy after — 19 Aug 2026

**Context that makes this a ruling and not a preference.** The owner moved the project to
Blaze pay-as-you-go and set billing alerts on 19 Aug, and stated the same day that the
rehearsal is over and he has **a few weeks to update and test before go-live**. He then asked
for "billing and privacy security". Both facts matter: pay-as-you-go turns the failure mode
from an outage into a bill, and a multi-week window with no live auction is the only safe time
to change sign-in plumbing.

**RULING 1 — App Check ships BEFORE go-live.** Claude first advised the opposite ("not before
launch") and reversed it once the timeline was known. Recorded as a reversal, per the rule that
a wrong ruling is corrected in a new dated entry rather than quietly overwritten. The original
reasoning was sound for a launch believed days away; it inverted when the window appeared,
because doing this AFTER go-live means changing the live site under a running auction.

**PLAIN-LANGUAGE NOTE, added after the owner asked "do we have to change how users log in?" —
NO, AND NOTHING HERE DOES.** Claude twice wrote "auth plumbing", which was loose and misleading
and caused the question. App Check does not touch sign-in: users open the site and click Sign
in with Google exactly as today. What it adds is an invisible token attached to the page's
DATABASE requests, so Google can tell our real pages apart from a script. FB-5 does not change
login either — it changes WHEN the page loads certain data (after sign-in rather than before).
Neither piece of work alters the login screen, the Google accounts, or anything a bidder does.

**RULING 2 — SCOPE: all six pages in ONE build (owner's choice, 19 Aug).** Auction staff +
admin, schedule staff + admin, CRNA staff + admin. Claude recommended auction-first and the
owner chose all six; recorded as his call. What makes it tractable: only FOUR pages are
hand-edited — the two CRNA pages are GENERATED by `crna-stamp.mjs`, whose count-verified field
substitution already swaps the Firebase config per project, so the CRNA App Check key follows
the same mechanism. **Required additions to the stamper: the site key joins `crna-config.json`
and `REQUIRED`, and the MD site key joins `FORBIDDEN`** — so a leak of the MD key into the CRNA
build fails the stamp test rather than shipping.

**RULING 3 — ENFORCEMENT IS STAGED, NOT BUNDLED (Claude's condition, owner to confirm at the
time).** The BUILD may cover six pages because App Check in MONITORING mode blocks nothing —
it only reports what would have been rejected. **Enforcement is where lockout lives**, so it is
switched on one service and one project at a time from the console, never all at once, and only
after monitoring shows the real pages producing valid traffic. It is a one-click revert.

**TWO CONSOLE REGISTRATIONS, owner-owned:** the auction and the schedule share `vacation-25e8e`
and therefore share one registration; **`crna-vacation` is a separate project and needs its
own.** Also owner-owned and now DEMOTED to a minor bonus: the API-key HTTP-referrer
restriction. Referrer headers can be forged and App Check attests properly, so it is worth ten
minutes and no more. If done, the project's own `firebaseapp.com` auth domain must be allowed
or Google sign-in breaks.

**RULING 4 — READ-PRIVACY (FB-5) COMES AFTER, and is paced.** A question Claude was about to
put to the owner — open auction or sealed? — was answered by the code instead: the staff board
already renders every other participant's bid on live weeks under a "competitors" label. **The
auction is OPEN by design.** So gating those reads costs participants nothing and the whole
gain is against non-participants. It is nonetheless TWO changes — move the pre-sign-in
listeners onto the signed-in path FIRST (the staff page's existing sensitive-doc pattern), then
gate documents ONE AT A TIME — because gating a read the login bootstrap silently needs does
not degrade the site, it locks everyone out.

## §64 — The login-screen security box: REPLACE the domain sentence — 19 Aug 2026

**OWNER RULING, verbatim:** *"Replace it, as I said. Update crna site as necessary. Nobody is
reading it anyway it looks strange."* The box under the Sign in with Google button on all six
pages loses its Google-hosted-domain explanation and gains a security line in its place.

**FINAL COPY (all six pages):**
> 🔒 **Secured by Google sign-in and reCAPTCHA.**
> This site never sees or stores your password.

Line 1 bold, site blue, ~.82rem — deliberately a step up from the current .72rem so it is
noticed, which was the owner's stated goal ("just big enough that users would see it, but
unobtrusive"). Line 2 stays .72rem grey. The surrounding box keeps its existing styling.

**CLAUDE DISSENTED; THE OWNER OVERRULED. Recorded so the reasoning survives if it ever needs
revisiting — NOT to relitigate it.** Claude argued the removed sentence answers a specific
moment of doubt (an unfamiliar domain appearing mid-sign-in) that a generic security line does
not cover, and that deleting it could make a hesitant user feel LESS safe at exactly the wrong
moment. The owner's counter is direct evidence Claude does not have: he watches these people
use the site, and says nobody reads it and it looks strange. **Owner's judgement about his own
users beats Claude's reasoning about hypothetical ones.** If sign-in confusion is ever reported,
this entry is where to start.

**Copy claims verified before shipping, not assumed.** "Never sees or stores your password" is
true and stays true: the passcode path is retired, `updateLoginPwState()` is an empty stub, and
`passcodesEnabled` defaults false so no password prompt can appear. If a password path is ever
reintroduced, this copy becomes a lie and must change in the same build.

**REQUIRED TOOLING CHANGE — `crna-stamp.mjs`, and it is not optional.** The stamper does a
count-verified replacement of the literal `“<MD authDomain>.”` exactly once per page, precisely
so the CRNA site never names the MD login screen (its comment: *"or it trains CRNAs to trust the
wrong screen. (Found by the canary.)"*). **With the sentence gone that replacement has nothing
to match and the stamp FAILS.** So: remove that `rep()` block, and — strictly stronger than what
it replaces — **add `MD_FB.authDomain` to the stamper's `FORBIDDEN` canary list**, so any future
appearance of the MD login domain anywhere in CRNA output fails the stamp instead of shipping.
The protection the old comment was worried about survives the copy change, in a better form.

**SEQUENCING — this copy ships WITH App Check, never before it.** The line claims reCAPTCHA
protection; shipping it while App Check is unbuilt would tell 35 people the site is protected by
something that is not installed. One build, both changes, or neither.

## §65 — The reCAPTCHA badge is SHOWN; enforcement documented, not yet done — 19 Aug 2026

**The finding this settles.** After 281/146 went live the owner said *"I don't see the
recaptcha."* Diagnosed by INSPECTING THE LIVE PAGE in a browser, not by re-reading code:
**Firebase App Check renders the reCAPTCHA v3 badge inside a container it creates itself —
`div#fire_app_check_<firebaseAppName>` — and puts an inline `display:none` on that container.**
The badge was present, sized and working the whole time; Firebase hides it. This is Firebase's
documented-by-behaviour default, not a misconfiguration, and no amount of key-checking would
have found it. **Claude had told the owner the badge would be visible. That was wrong**, and it
was only caught because he looked at his own site and said so — the same pattern recorded in
`TODO.md` A-AUDIT's human lens.

**RULING — SHOW IT.** One CSS rule on all six pages:
`div[id^="fire_app_check"]{display:block!important}`. Two independent reasons, either
sufficient: the owner wants visible reCAPTCHA because it reassures users (§63), AND showing the
badge exactly as Google serves it is **the one position that requires no attribution text**.
The alternative — leaving it hidden — would oblige us to carry Google's specified wording plus
links to its Privacy Policy and Terms. Before 282/147 the site sat in NEITHER position, which
is the state actually worth avoiding.

**Two constraints on any future edit here.**
1. **PREFIX selector, never a hardcoded id.** The container id embeds the Firebase app name,
   which differs per page: `user-site` · the default app (auction admin) · `sched-user-site` ·
   `sched-admin`. A hardcoded id would silently cover one page and miss three. The suite
   asserts the prefix form and fails a hardcoded one.
2. **Do NOT restyle or reposition the badge itself.** Google's terms permit showing it as
   served or hiding it with attribution, and nothing in between. The badge's own
   `right:-186px` is Google's design — a logo tab that expands on hover — not a bug to fix.

**Verified in a real browser BEFORE shipping**, per "run it, don't recall it": with the rule
applied the badge measures 294×69 at the bottom-right with the standard logo tab on screen.

**ENFORCEMENT — DOCUMENTED, DELIBERATELY NOT DONE (owner, 19 Aug: "document for later").**
App Check is live in MONITORING mode on both projects: pages carry tokens, nothing is rejected.
Turning it on is console-only, no code, no deploy — and it is the single action in this whole
thread that can lock people out, so it stays the owner's, taken deliberately. The steps live in
`TODO.md` FB-4 under "ENFORCEMENT — the checklist for when you are ready".

## §66 — The reCAPTCHA badge is HIDDEN after all; attribution now mandatory — 19 Aug 2026

**REVERSES §65, same day, on the owner's word after seeing it live:** *"I don't like the
recaptcha being visible actually. it's in the way."* §65 stands as the record of why it was
shown; this entry supersedes its ruling. **Nobody was wrong here** — §65 was built from what he
asked for before it existed on screen, and he changed his mind once it did. That is the correct
order of events and the cheapest possible moment to change course. The badge was visible for
exactly one build (282/147 · 72/32).

**THE CONSEQUENCE IS NOT OPTIONAL, and it is the whole point of this entry.** Google's branding
terms permit exactly TWO positions and nothing between them:
1. show the badge as Google serves it — no attribution text needed; or
2. hide it — and carry the reCAPTCHA attribution **visibly in the user flow**.
We are now in position 2, so the sign-in security box gained a third line, in Google's own
words, with both required links:
> This site is protected by reCAPTCHA and the Google [Privacy Policy] and [Terms of Service] apply.

**A PAIRED INVARIANT, pinned by the suite.** The un-hide CSS rule and the attribution text are
now two halves of one obligation: `test-appcheck-login.mjs` asserts the rule is ABSENT **and**
the attribution plus both links are PRESENT, on all six pages. A future edit that deletes the
attribution without restoring the badge fails the battery rather than shipping a quiet terms
violation. The CSS comment left in each page says the same thing at the point of temptation.

**KNOWN GAP, ACCEPTED FOR NOW AND TRACKED AS `TODO.md` FB-6.** The security box lives inside the
sign-in PICKER panel, and "Remember me on this device" is checked by default — so returning
users see the WELCOME BACK panel and do not see the box, or therefore the attribution. This
predates the change (the old note had the same placement) but it now carries a compliance
dimension as well as the owner's original goal of people actually seeing the line. **FB-6 is
raised to the next build.** Claude deliberately did NOT relocate it in this build: it is
structural DOM surgery across four differently-shaped files, and this was the tail of a very
long session (START-HERE §4). Splitting it was the safer call, and the gap is written down here
rather than left implicit.

## §67 — Audit scope EXPANDED: megafuzz, full-UI Chrome walkthrough, security focus — 19 Aug 2026

Owner, verbatim, on giving the FB-5 go: *"then I want the audit include a megafuzz and chrome
control walk throughs of every single button click to ensure proper functionality in addition
to the full overhail audit. we are close to complete with the vacation site. Add new security
features, logins, recaptcha others done in last session as a focus of audit."*

Three additions to the A-AUDIT brief (the brief itself stays in `TODO.md` §1 — this section is
the ruling, that one is the plan):
1. **MEGAFUZZ** — a fuzzing pass over the auction's input surfaces, in addition to the
   adversarial code review.
2. **CHROME-CONTROLLED WALKTHROUGH** — drive the real pages in Chrome and exercise every
   button to prove proper functionality, not just read the code. Safety rule (Claude's,
   standing unless the owner overrules): on the LIVE site, destructive or sending actions are
   walked TO their confirmation dialog and then CANCELLED — the dialog appearing is the pass;
   confirming a wipe or a mass mail on live data is never part of a walkthrough.
3. **SECURITY AS A FIFTH FOCUS** — everything the 19 Aug security session shipped: App Check
   enforcement on all six pages, the sign-in gating of listeners (FB-5 stages), the login
   flows, reCAPTCHA (hidden badge + mandatory attribution, §65/§66), the EmailJS domain
   restriction, and the Firestore rules changes.

Ordering also ruled the same turn: FB-5 stage 2 batch 2 completes BEFORE the audit (so the
audit sees the final security posture, timer included); S5c waits until after.

Addendum, 20 Aug 2026 — owner: *"I want a new session for my audit."* The audit runs in a
FRESH session, per the original 18 Aug order. Its first task is PW-1 (TODO): the schedule
Playwright harness must gain the firebase-app-check stub before the in-cloud baseline can run.

## §68 · A-AUDIT scope narrowed — walkthrough is MD-only (owner, 20 Aug 2026)

Given mid-audit, correcting the §67 walkthrough scope, verbatim:

> "Correction, only walk through the MD vacation admin and user sites. This audit should
> oinly look at parts of crna vacation or schedule sites IF there is something that could
> touch and effect the MD vacation auction."

So: the Chrome walkthrough drives ONLY the MD vacation admin and staff pages (still
everything on them — every button, input, toggle, tab and dialog, per the same-day
clarification in TODO §1). CRNA and schedule are in the audit's scope ONLY where they
could touch or affect the MD auction (the CRNA-clean proof and the shared-roster writer
remain in scope for exactly that reason).

Two follow-ups the same turn: *"OVerall, this audit is purely for the vacation sites"* —
the audit is for the VACATION sites; the schedule appears only where it could touch them.
And walkthrough logistics: *"I will sign in, you drive"* — the owner signs the live MD
pages in (AF test account / admin Google); Claude drives every control from there,
cancelling every dialog.


## §69 — Admin Edit Selections: duplicate numbers REFUSED; admin edits re-stamp the lock — 20 Aug 2026

Owner found two defects in admin Edit Selections (his words: "1 more example of me finding
2 things you didn't"):

1. **Duplicate bid # → both weeks lose.** Admin surfaces warned but allowed a current-phase
   number on two weeks; the engine's I2 anti-forgery rule then scores every bid carrying the
   number as no-bid. Ruling: **"disallow with explanation. good call."** The refusal is HARD
   (no "Save anyway") and explains why; it covers exactly the state the engine kills. Reuse
   of a number consumed by a prior-phase WIN stays a warning — the engine honors that
   override. The engine itself is untouched: I2 cannot tell an admin duplicate from a forged
   one, so entry is the gate.

2. **Admin edit deleted the week's priority lock.** Ruling: **"do as described"** — the
   admin-set bid BECOMES the new lock (staff-lowering precedent build 139; simulator
   precedent), NP stamps "NP" exactly like the staff twin. Admin adds stamp the lock too —
   every placed bid stamps; no path leaves "no lock". Deliberate unlocking lives on the
   Priority Locks page (its Clear button unchanged); remove/cancel still clear the lock
   because the bid is gone.

Built together as admin 291 (owner: "do together"). Logged as ES-1/ES-2 in TODO §1. Same
turn the owner also ruled: admin Edit Selections becomes a dedicated RA-1 audit lens
("perhaps admin edit selections needs a more thorough review and audit").


## §70 — Engine ruling: denials are CAPACITY vs POLICY, judged against the pre-denial natural projection — 20 Aug 2026 (owner, away, via question card)

RA-H9/H10 fix semantics, owner's choice, verbatim option: **"Capacity vs policy"** —
judge each denial against the PRE-denial natural projection. A denied bid that could not
have fit naturally keeps blocking every weaker bid (NE-1 holds). A policy denial of a
naturally-winning bid frees its spot WITHOUT demoting the other rightful natural winners.
This corrects build 239's arithmetic; it does not change its intent. Both twins in
lockstep; both audit repros become suite fixtures.

Same card: **FB-5 rules publish = PREPARE AND HOLD** — Claude writes and tests the
firestore.rules change and delivers the captioned plain-text file; the owner pastes it
into the console on return. Nothing deploys before that paste.

Same message (owner): proceed with as many RA fixes as safe, Claude decides order,
grouping allowed if safe; "the key is not to break things and create a critical problem
to fix a high/medium problem." Also ordered: the ENGINE RULES review doc (Word, concise,
every rule, all phases + admin decisions + never-events if useful).


## §71 — DB-1 ruling: "THE BOUNDARY FORGETS" — denied bids retire at every phase boundary — 20 Aug 2026

Owner: **"Agree, the boundary forgets."** Phase boundaries adopt the round rule
(startNextP4Round precedent, build 255): Begin Phase N retires every strictly-prior
non-winning live entry in the SAME atomic batch that clears locks and decisions — the bid
numbers return, the live doc forgets. NEVER at denial time (revocability + the §70 block
floor both need the denied bid's value while the phase runs). Winners' live entries are
permanent and never scrubbed.

**Binding look-back requirement, owner verbatim: "Any look back at prior phases must show
the bid placed, the projection, and the result."** Satisfied by the archives: every phase
snapshot already stores schedule (bids as placed) + projections (pre-admin outcomes,
"kept for reports") + approvals/denials (results); the Reports phase views read those
archives, not the live doc. Round archives gain the same projections field (295), and the
Edit Selections completed-phase filters now read the archives too — so history never
depends on corpses again. Built as admin 295; logged DB-1.


## §72 — Floors are ABSOLUTE (admin included); NE-14 mid-decision stability; caps/locks stay overridable — 20 Aug 2026

Owner, on reviewing the rules doc (verbatim): *"This doesn't seem like a rule admin should
be allowed to break. It would be visible to all users and create trouble."* Rulings:

1. **Below-floor bids: HARD refusal for admin, everywhere** (entry surfaces, write-level
   backstops) — same contract as duplicate numbers. **The build-266 approve-override
   (_bfOverrideEligible) is RETIRED**: the engine no longer honors an approval of a
   floor-filtered bid, and adApprove refuses the click with the honest route ("change the
   floor setting itself"). NP-in-an-NP-off-phase is folded into the same refusal (it is the
   same engine filter and the same all-users-can-see-it logic) — **flag for the owner: veto
   this half if NP should stay overridable.** Built as admin 296.
2. **NE-14 (owner: "That should be a never event"): a bid or projection must not change
   under the admin's decisions.** VERIFIED already server-enforced for the designed rhythm:
   once bidding closes (timer expiry or the Close flag), firestore.rules refuse every user
   bid write (the 25 Jul audit closed exactly this). Deciding while bidding is still OPEN is
   the one window where projections can legitimately move — the Approvals & Denials panel
   now says so in a banner (296). Added to NEVER-EVENTS.md as NE-14.
3. **RETAINED, owner verbatim: "Admin should retain the ability to place bids over caps and
   in locked weeks."** Caps, locked weeks, and Phase-1 scope stay warn-and-override.


## §73 — Rules files: ALWAYS the paste-ready presentation — 20 Aug 2026 (post-push)

Owner, verbatim: **"I always want new firestore rules presented just like this."** "This" =
re-sent FRESH to outputs at paste time, standalone ⚙️-captioned plain-text .txt, caption
carrying the full console path (console → vacation-25e8e → Firestore Database → Rules →
select-all, paste, Publish), the console-validates / on-error-publish-nothing line, and a
VERIFIED md5 match to the repo copy. Rule text (one copy): START-HERE §3, 📋 block.

## §74 — Commit-length cap RE-AFFIRMED; Claude drifted again within a day — 20 Aug 2026

Owner, verbatim: **"I always commit messages just like you are doing. Ensure they continue
like this and don't get longer,"** then, minutes later: **"I can actually see that the
commit messages are expanding beyond the rules."** He was right: the wave's vacation-repo
message ran 5 lines / ~60 words against the §62 cap (subject + ≤4 short lines, ~50 words).
The cap is unchanged; the discipline is now explicit in START-HERE §3: COUNT lines and
words before sending; a multi-build wave is summarized as a wave, never enumerated.

## §75 — RA-3 triage: the Daily Schedule is OUT of scope until much later — 20 Aug 2026 (night)

Owner, verbatim, on the RA-3 findings: **"I don't care about what the daily schedule shows
currently, that's a problem for MUCH later."**

Six of the 39 RA-3 findings are schedule-only and are DEFERRED, not fixed, not re-raised
each session: the schedule ADMIN grid missing Phase-4 round wins (the RA-H12 twin gap), the
world-readable `dailysched` audit log, registered users being able to overwrite schedule
audit entries, `vacations/passcodes` still world-readable, the shared browser-storage keys
across the two sites on one origin, and the schedule admin's un-embargoed subscription to
the auction's mid-phase decision sheet. They stay listed in TODO under a single deferred
heading. This is §1 applied, not an exception to it: the auction is weeks from go-live and
the schedule is months from use.

## §76 — World-readable data: fix it only if the fix is cheap — 20 Aug 2026 (night)

Owner, verbatim: **"I don't even care that much about world readable unless it's a super
easy fix that doesn't mess with code that much."**

The standing test for any data-exposure finding is therefore COST, not severity alone:
- **Rules-only, no client change** → propose it, it qualifies as cheap.
- **Needs page code to change** → it goes on the list and waits, however bad it reads.

Verified against the pushed bytes the night this was ruled: the two auction documents
(`changesArchive`, `welcomeLog`) meet the cheap test — each is one document name added to
an existing list in `firestore.rules`, with NO page edited, because every page that reads
them already does so from a signed-in position. The cost that remains is not the edit: it
is the console paste, the emulator suite re-run on the owner's Mac (`tests/RA-2.command`),
and new assertions covering the two gates. A rules change is still an auction deploy.

## §77 — PROJECTIONS NEVER CHANGE. They freeze when the phase closes. SUPERSEDES §70 — 20 Aug 2026 (night)

Owner, verbatim: **"I 100% want the projection to say lose if it said lose when the phase
closed. we already decided that projections never change. I don't care what admin
approves/denies, PROJECTIONS NEVER CHANGE!!!!!"**

THE RULE. A projection is computed from the bids as they stood when bidding closed, and
from nothing else. Once the phase closes it is FROZEN — a historical fact about that phase,
not a live readout. No approval, no denial, no revocation, no re-open, no later phase
recomputes it. If a bid read "Losing" at close, it reads "Losing" for ever.

WHAT THIS DELETES. The whole §70 apparatus goes: the capacity-vs-policy classification, the
pre-denial "natural" re-run, the contested set, the block floor, and the demotion loop that
strips weaker bids off the board after a denial. About 45 lines in `admin/index.html` and
the same block in the CRNA twin. Both of that machinery's failure directions die with it —
the one that PROMOTED a weaker bid over a capacity-denied stronger one (RA-3's CRITICAL),
and the one that ERASED bidders from a week that still had room (owner-found, same night,
reproduced on both the current and the pre-wave engines).

WHAT REPLACES IT. Two independent things on the admin's decision board:
  · the FROZEN projection — win / draw / review / lose, as at close. Never recomputed.
  · a LEDGER — plain arithmetic over the admin's own decisions: capacity, how much has been
    approved, how much room is left. Denials change nothing in it; they neither consume nor
    free capacity. The admin reads both numbers and decides.

CONSEQUENCES to carry into the build. ① `test-admin-294-engine.mjs` becomes nine assertions
guarding a deleted rule — it is replaced in the SAME build, never after; its oracle shared
the engine's blind spot and would certify either behaviour. ② The ENGINE-RULES-REVIEW docx
needs revising: rule 26 ("a denied bid that could not have fit anyway keeps blocking every
weaker bid") is retired by this ruling. ③ The staff site is already compliant and must stay
so — it never reads approvals/denials, and its runtime guard against cross-porting the admin
engine variant stays. ④ The board must say plainly that the projection is as-at-close, so a
frozen label is never mistaken for live advice.

## §78 — The public/private repo question is CLOSED for now; the closed-phase pop-up goes — 20 Aug 2026 (night)

Two owner calls at the end of the RA-3 session.

**(a) Repo visibility is not being touched.** Owner: **"I don't want to touch the public vs.
private repos now."** So SEC-1 stays deferred, and with it the RA-3 leakage findings that
are only fixable by moving or hiding files — `build269-staged/ADVERSARIAL-AUDIT-269.md`,
`BUILD-NOTES-269.md`, the two personal e-mail addresses hard-coded in the public staff page,
and the README that wrongly calls the auction repo private. They stay listed, unfixed, and
are NOT to be re-raised as urgent each session. The standing discipline is unchanged and
still binding: nothing new that describes a defect by reproduction goes into a public repo.

**(b) The closed-phase pop-up is to go.** Owner, on the modal that fires on every click once
bidding is closed: **"it actually just gets in the way."** It is removed; the page states the
closed state instead. Claude's caveat, recorded because it is evidence from this same
session (finding F-2): a message placed only at the TOP of the page is invisible to someone
scrolled down at the bidding board, which is where every bid is made. So the closed state
must also be visible AT the week cards — greyed or locked, so nobody is invited to tap
something that will not respond. Removing the pop-up must not leave a dead-feeling board.

---

## §79 — Approvals and denials are BLOCKED while bidding is open, not merely discouraged — 21 Aug 2026

Owner, on the existing dialog warning: **"we currently have a warning not to do that, but
blocking is better."** Confirmed in code the same turn: `adApprove` and `adDeny` consult
nothing about bidding state — the readiness warning renders in the dialog body, but the
click is not stopped. So this is a new guard, not a tightening of an old one.

**Two conditions on how it is built, both from earlier audits of this repo:**

**(a) One definition of "open", and it is the one that already survived an audit.** The
phase-readiness check uses SERVER truth: the `biddingClosed` flag OR an enabled timer past
its deadline. A comment at that check records the bug it was written for — a merely
switched-OFF timer was treated as closed, the dashboard printed "Bidding is now closed",
and every bidder could still write from devtools. A second, hand-rolled definition of open
is how that bug returns. The block reuses the existing expression.

**(b) Phase 4 runs in rounds all year — a false refusal is its own incident.** §72 spent an
entire audit lens on refusals firing on legitimate admin flows. The refusal must name what
is blocking it and which button clears it, never just say no.

**This does NOT substitute for §77.** The decision cascade §77 removes happens AFTER bidding
closes, which is exactly when deciding is legitimate. The two are complements: bids frozen
by the close, projection made decision-blind by §77, so the projection at close is one fixed
thing for the whole decision session — which is the natural anchor for the rewritten NE-1.

---

## §80 — NE-1 rewritten: the guarantee moves off the projection and onto the outcome — 21 Aug 2026

Owner, asked whether this is the right replacement sentence: **"good."** NE-1 now reads:

> **Nobody gets a week unless the frozen PROJECTION gave it to them, or the admin approved
> them by name. Denying someone gives their spot to no one.**

**Why it had to change.** The old NE-1 guarded against the engine promoting a weaker bid —
deny the bid of 2 on a week with room for three, and the engine re-dealt the week so the bid
of 4, which had lost fairly, became a projected winner. §77 removes the re-deal entirely: the
projection is computed once from BIDS ALONE, and decisions are not an input to it. Promotion
is impossible by construction, not by a test catching it. The four red suites are not finding
a bug — they check for promotion by asserting a denied person is ABSENT from the projected
list, and under §77 that person is still present, because the projected list never changes.
They are speaking the old language.

**What is now worth guarding** is the far side: that the DECIDED list is the frozen projection
plus the admin's explicit decisions and nothing else. That is what the sentence above says,
and it is what the suites get rewritten to.

## §81 — VOCABULARY, BINDING EVERYWHERE: "projected" or "decided", never a bare "winner" — 21 Aug 2026

Owner, after a run of confused explanations: **"You must always specify projected verse admin
approved/denied. I 100% want the projection to remain the same. I have said this 1000 times."**

Two different things share one word today, and that is the root of the confusion:

- **PROJECTED** — what the engine computes from the bids. Frozen at phase close. Never changed
  by an approval or a denial, ever (§77). This is the one the owner has repeatedly protected.
- **DECIDED** — who actually gets the week: the projection, plus the admin's explicit
  approvals, minus the people the admin denied.

**The rule.** Every reference — in chat, in the repos, in commit messages, in test names and in
on-screen copy — says which one it means. A bare "winner", "wins" or "winner list" is a defect,
the same way a bare build number is.

**On-screen shape, owner's own words (21 Aug):** *"If a projected winner is denied, the
projection should say winning, and the result should say approved."* Two independent columns:
the PROJECTED outcome (winning / losing / draw / review), which never moves, and the DECISION
(approved / denied), which is the admin's. A row reading winning + denied is not a
contradiction; a row reading losing + approved makes an override visibly an override.

**A wrinkle Claude raised and the owner closed (21 Aug):** *"The auction cannot progress unless
every single bid is either approved or denied. The admin must make a decision on every bid
explicitly."* So the decision column is never blank at results time and needs no third word.
**Consequence — §77 costs ZERO extra clicks:** under the old engine, denying a projected winner
auto-promoted the next person, whom the admin then had to approve anyway. Under §77 that person
stays projected-losing and the admin approves them by name. Same number of decisions either
way. The only difference is that the PROJECTED list holds still while the admin works.

## §82 — §77 acceptance conditions — 21 Aug 2026

**(a) NO BADGE.** Owner, explicitly: *"No badge at all."* The earlier proposal to paint a
"denied" marker on a row of the PROJECTED list is withdrawn. The decision column carries that
information; the projected list gets no new ornament.

**(b) The approve/deny page does not change.** Owner: *"I absolutely do not want the appearance
or functionality of the admin approval/denial page to change."* Buttons, layout, wording and
flow are untouched by §77.

**(c) The ONE exception is the fix itself, and the owner wants it.** After a denial on a
contested week the PROJECTED list stops rearranging. Claude put it to him that there is no
version where the re-deal stops and the screen is identical in every case. His answer: *"I did
notice that it was rearranging actually, and I don't like that part of it."* So the single
visible change §77 makes is a change he asked for. This is the SECOND time he has caught this
class of defect from the screen alone.

**(d) VERIFIED 21 Aug — and it FOUND A DEFECT. The parked build is NOT ready to file.**
Measured by running BOTH real engines (297 and the parked 298) on ~4,000 random week states
and comparing the four repointed readouts. Result:

- The two "approved FTE" unions and the cap-breach warning are **CORRECT**. They differ from
  297 in 852 of 3,958 states, and in **zero** states where nothing was denied — i.e. they
  differ only where 297 was re-dealing the week, which is the intended §77 change (c).
- The **capacity readouts and the approve dialog's "how full is this week" are WRONG**: 2,864
  of 3,958 states differ, in the dangerous direction. `weekLedger`'s `committedFte` is the
  union of the frozen projection's winners and the decided winners — and it never subtracts
  the DENIED. Under §77 the projection still lists denied people, so their FTE counts as
  consuming the week. Worst measured case: a week of capacity 3 whose bidders were all denied
  reports **0.2 remaining instead of 3** — a panel telling the admin a week is full when it is
  empty. In 296/297 this could not happen, because the old engine removed denied bids from the
  competitor set before `fteWon` was computed.
- **ROOT CAUSE, one shape, applied unevenly.** §70 did two things — it filtered denials OUT of
  the projection and promoted approvals IN. §77 removes both. The three consumers that were
  hand-repointed each compensate for the half they needed. `weekLedger` was not given the
  denial half, and the two consumers that read the ledger inherited the gap.
- **THE FIX IS PROVEN, not guessed.** The harness tested the hypothesis directly: subtract the
  denied inside `committedFte` and the differences fall from 2,864 to **852 — exactly matching
  the two consumers that are already correct**, i.e. only the intended re-deal cases remain.
  One line, in one function.
- The harness itself should become a permanent suite when §77 lands: it is the honesty check
  for the CONSUMERS, which the §77 invariance oracle does not cover. It models neither build —
  it runs both and compares.

**Superseded text (kept for the record):** it was previously listed as UNVERIFIED — The parked build repoints four
callers of "how full is this week" onto `weekLedger`, including the capacity readouts and the
over-cap warnings. Those may show different numbers, because they would count DECISIONS rather
than the PROJECTION. Claude owes a precise before-and-after of every on-screen difference
between admin 297 and the parked 298 before the owner commits. It is the only part of (b) that
is not yet proven.

**(d-CLOSED, 21 Aug):** the one-line fix is in admin 298 and proven by the same harness that
found the defect — differences fell from 2,864 to 852, exactly matching the three consumers
that were already correct. The harness is now a permanent suite, `test-admin-298-readouts`,
which proves its own teeth by putting the defect back and requiring the assertions to fail.

**(e) `test-admin-294-engine.mjs` is RETIRED.** Owner: *"Yes, to question number four."* It
tests the §70 re-dealing machinery that §77 deletes, so it cannot be repaired, only archived
(to `_archive/tests/`, per the never-delete rule). The other three red suites —
`test-engine-fuzz`, `test-never-events`, `test-priority-inversion` — are REWRITTEN to §80, not
archived.

**(f) FILED 21 Aug on the owner's "go on all".** Admin 298, CRNA restamped, 294 archived, the
three suites replaced by the §77 invariance, two new suites registered. Auction battery 47
suites / 1,861 assertions green with honesty EXECUTED; schedule battery 27/27 with ZERO
skipped. Two things the batteries caught that no one had asked for: `test-c4-phase-identity`
went red because `adApprove` gained a real ledger dependency its sandbox did not know about
(fixed by giving the sandbox the real functions and real data, never a stub), and 21 schedule
browser suites had been silently skipping on the owner's Mac for want of a browser — they now
run in-cloud, which is the first time the schedule battery has ever been complete.

## §79a — §79 as built: what is gated, what is not, and why — 21 Aug 2026

Filed as admin **299** on the owner's "go".

**ONE definition of "bidding is open".** The expression was LIFTED out of `approvalReadiness`
into a single named `biddingOpenOnServer()`, which both the readiness check and the new guard
call. SERVER truth only — the `biddingClosed` flag, or an ENABLED timer past its deadline. Week
locks are client-side and never count. This satisfies §79(a) literally: there is now exactly one
copy of the expression whose earlier duplication produced the timer-OFF bug.

**GATED — the five surfaces that CREATE or CHANGE a decision:** Approve, Deny, Approve All
Current Winners, Deny All Losers, confirmApprove.

**NOT GATED — the two REVOKES**, and this is a deliberate judgment the owner should know about.
A revoke only ever REMOVES a decision: it moves toward the ruling, never against it. Blocking it
would leave an admin who reopened bidding staring at a stale decision with no way to undo it —
which is §72's failure mode, a refusal with no way out. If the owner wants revokes gated too,
say so and it is a one-line change.

**The refusal names what is blocked, why, and which button clears it**, and in Phase 4 it names
the open ROUND rather than the phase (§79(b)).

**Gates:** `test-admin-299-bidding-open.mjs` 18/18 executing the real handlers against real
server states, including the historical timer-OFF trap and the revokes staying available;
honesty vs the last PUSHED build fails 12 of 17, the 5 passing being exactly the
must-keep-working ones; auction battery 48 suites / 1,881 green.

**The one gap is now closed.** The 21 browser-based schedule suites could not be re-run in-cloud
when this was written — staging was refused mid-session (`untrusted_device`, a stale desktop
sign-in). The §6 cost gate was obeyed: the owner was told the 30-second fix rather than a
workaround being attempted. He signed in, and the schedule battery then ran **27/27 in-cloud
against admin 299 with ZERO skipped**. Both builds pushed as `2cd6a55` (suites `985e9b4`), and
live `versions.json` was verified twice at admin 299 / staff 161 / mobile 18.

## §83 — A thin commit SUBJECT is acceptable; the summary that matters is the BUILD-LOG row — 21 Aug 2026

Owner, on the schedule repo's commit landing with GitHub's default "Update BUILD-LOG.md" instead
of the prepared text: **"I'm ok with the brief uninformative commit summary."**

So this stops being raised. It has now happened four times (`7fcd3f1`, `594778e`, `2c97296`,
`fe168c5`) and each time the CONTENTS were correct — which is the whole reason BUILD-LOG exists.
A future session should note a thin subject in the row, if it notices, and move on. It is not a
defect, it does not warrant an amend, and it must never become a reason to rewrite history.

**What this does NOT relax:** §62's hard cap still governs the messages Claude PREPARES (a
subject plus at most 4 short lines, ~50 words), they are still delivered to the outputs column
every time they change, and every build still gets its BUILD-LOG row written in the same breath
as the code. The ruling is about what happens when a prepared message does not make it into the
commit box — not about writing worse ones.

## §84 — THE AUDIT CHARTER for the next session: serious harm only — 21 Aug 2026

Owner, closing the 21 Aug session: **"I want the next session to audit only for bugs that could
directly harm the vacation auction. I am not after cosmetic or wording things at this time, only
serious problems."**

This supersedes the scope of every prior audit. The §67 METHOD is unchanged — batteries green on
the PUSHED bytes first, blind lenses, an adversarial skeptic per finding, a second skeptic on
anything CRITICAL or HIGH, the human lens mandatory, report kept OUT of the public repos. What
changes is what counts as a finding.

**IN SCOPE — a defect qualifies only if it can produce one of these:**
1. **A wrong outcome.** Someone gets a week they should not have, or loses one they should have.
2. **Lost or corrupted bid data.** A bid silently not saved, overwritten, or destroyed; a
   decision that vanishes; an archive that does not match what was announced.
3. **A locked-out bidder.** Someone who cannot sign in, cannot bid, or cannot change a bid when
   the rules say they may — including App Check refusing a legitimate person.
4. **Wrong or missing mail.** Results to the wrong people, wrong contents, sent twice, or never
   sent; the quota exhausted so real mail stops.
5. **Exposure.** Bid data, e-mail addresses or decisions readable by someone who should not see
   them, or visible BEFORE results are announced.
6. **An unguarded destructive action.** Any one-click path that erases or overwrites auction
   state without a dialog AND a guard at the moment of action.
7. **A stuck auction.** A phase or round that cannot be completed, or state that corrupts so the
   year cannot finish.
8. **A runaway bill or an outage** from listener or write volume.

**OUT OF SCOPE — do not raise, do not build, do not re-verify:** wording, labels, copy, tone,
layout, spacing, colour, tooltips, naming consistency, keyboard reachability, console noise,
dead code, and every other cosmetic or ergonomic item. The 10 MEDIUM and the LOW/NIT tail
already listed in TODO stay listed and stay UNWORKED.

**THE ONE CARVE-OUT, and it is deliberate.** Wording is in scope when the words cause a wrong
ACTION — a destructive button that does not say what it destroys, a dialog whose buttons invite
the wrong click, a screen that states the opposite of what the system will do. That is not
cosmetic; it is a defect wearing a copy costume. Judge by consequence, never by category.

**What to do with a non-qualifying finding:** one line in the audit report's appendix, no
verification effort, no build. Do not spend a skeptic on it.

**WHERE TO LOOK FIRST.** Admin **298** and **299** shipped 21 Aug and have never been audited by
anybody. 298 changed what the engine means (the projection is frozen; decisions live in their own
ledger) and repointed four capacity readouts — one of which was already found wrong before it
shipped, which is evidence the blast radius of that change is real. 299 added a REFUSAL to five
decision paths, and a refusal that fires when it should not is exactly the §72 failure mode.
Those two builds are the hottest bytes in the repo.
