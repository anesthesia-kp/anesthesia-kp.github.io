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

> ✅ **BUILT — schedule admin 93, 25 Aug 2026.** The flag lives on the group document
> (`fairness:false`, stored only when false); **exclusion wins** where a person is in several
> groups, the same shape as §98's block-beats-allow; a person's own value is stored **only when
> it disagrees** with their groups, so everyone else keeps following the group when it changes.
> **Nothing already stored changed meaning**, so there was no migration step — the old document
> held exclusions only and absent meant "counts"; absent now means "follow your groups", and a
> group counts by default. **All three visibility conditions below are built and each is a test
> assertion** — the ruling says it "only holds if the visibility above is actually built", so
> they are gates, not polish. Full detail in `schedule/BUILD-LOG.md`, build 93.

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

**KNOWN GAP, ACCEPTED FOR NOW AND TRACKED AS `TODO.md` FB-6.** *(Status note added 25 Aug 2026:
FB-6 was BUILT as 284/149 + 74/34 on 19 Aug, and its `TODO.md` entry was archived 25 Aug to*
`_archive/anesthesia/superseded-docs/TODO-archived-2026-08-25.md`*. The ruling below is unchanged.)* The security box lives inside the
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
*(Status note added 25 Aug 2026: PW-1 was fixed 20 Aug and its `TODO.md` entry archived to*
`_archive/anesthesia/superseded-docs/TODO-archived-2026-08-25.md`*.)*

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


## §85 — AUDIT SCOPE, SHARPENED: no can of worms; whole vacation project, recent updates first — 21 Aug 2026

Owner, opening the audit session, verbatim: **"The most important thing about this audit is that
i don't want to open a can of worms that leads to small changes that never end. I only want to
look for major bugs that could directly create trouble for the auction. ignore the small stuff."**

And, on breadth, verbatim: **"review the entire project - vacation only with emphasis on recent
updates."**

This does not replace §84; it adds the containment rule §84 lacked and settles the breadth.

**BREADTH:** the WHOLE vacation auction — staff, admin and mobile — not only the two unaudited
builds. The Daily Schedule is OUT (§75 stands). Emphasis, not exclusivity, on the recent wave:
admin 298 and 299 first, then the rest of the auction.

**CONTAINMENT — the new rule.** A finding is judged ALONE, on its own capacity to cause §84 harm.
It does not license neighbouring tidy-ups, refactors, consistency sweeps or "while we are in
here" changes. If fixing a qualifying defect appears to require a wider change, that is not a
licence to make the wider change: STOP, say so, and let the owner rule. The failure mode this
forbids is the one he named — a real finding becoming a cascade of small ones that never ends.

**Consequence for the report:** the report lists what could cause serious harm and nothing else.
No "consider also" section, no ranked backlog of minor items, no re-litigation of the 10 MEDIUM
or the LOW/NIT tail. An appendix line for a non-qualifying item is the ONLY place small stuff may
appear, and it carries no recommendation.


## §86 — RA-4 triage ruled: seven go, three skipped as trade-offs, two left alone — 21 Aug 2026 (evening)

Owner, on Claude's triage of the fourteen RA-4 findings, verbatim: **"skip the 3 that are maybes,
leave alone anything that can be left alone. go on the others."**

**SKIPPED — the three that are trade-offs rather than repairs.** Not refuted, not forgotten;
decisions the owner has chosen not to take now.
- **H-4** — what a restore should do to the "already mailed" record. Clearing it chooses
  duplicate mail over no mail.
- **H-5** — how much of a completed phase belongs in the world-readable published archive.
  Stripping the raw bid values is the cheap version, and it is still a real build.
- **M-8** — outsider read access versus a billed read on the most-delivered document. The rules'
  own comment says tightening it is a one-word change, and names the cost.

**LEFT ALONE, by the same ruling:** M-2 (needs two Google accounts on one browser profile),
M-5 (needs a crash mid-send, and the result is duplicate identical mail, not a wrong outcome),
and the whole RA-4 appendix. Listed, unworked, and NOT to be re-raised as urgent.

**GO — the seven:** H-1 (the five missed consumers of the frozen projection), H-2 and H-3 (a bid
that does not save must say so), M-1 (a decided row still carrying a live destructive button),
M-3 (the admin gate that misreports every read failure as "not authorized"), M-6 (the missing
owner check on the KP address field), M-7 (the unused relay fallback — a deletion), M-9 (the
readout that is world-readable with no reader that needs it).

**AND ONE THE OWNER FOUND HIMSELF, which outranks the queue as owner-found items always do.**
He looked at the live login-e-mail data and reported: *"there are a couple lower cases. i thought
we made this case insensitive."* He is half right, and the half he is wrong about is the
dangerous half: **every PAGE lowercases both sides, so sign-in works and the Users table looks
perfect — but `firestore.rules` lowercases only the INCOMING address and compares it to the
stored value exactly as typed.** A stored `Jane.Doe@...` therefore signs in fine, reads the whole
board, and has every bid write refused. That moves RA-4's M-4 from latent to LIVE.

Two remedies, deliberately split:
- **The DATA is the owner's** — Claude never writes production Firebase. In the Users page,
  **Clear the address first, then re-save it.** Re-saving alone does nothing: the page compares
  the lowercased input against a lowercased copy of the stored value, decides "no change", and
  writes nothing. That short-circuit is why it can look as though this was already fixed.
- **The CODE is Claude's** — make the rule genuinely case-insensitive so it can never matter
  again, and stop the one path that can put a bad value back.

**Flagged in the same breath:** `isListedAdmin()` carries the identical comparison against the
raw `adminAccess` list, so a mixed-case address there locks that admin out of the admin site
completely. That one is data, not code — worth a look while the Users page is open.

## §87 — §86 NARROWED TO TWO: only H-1 and M-1 are to be built — 22 Aug 2026

Owner, at the close of the machine-loss session, verbatim: **"i only want to do 100% necessary
fixes at this point"** and then, on the remainder, **"ignore other items"**.

**BUILD — the two that could actually harm the auction:**
- **H-1** — the five consumers of the frozen projection that build 298 did not repoint. Same
  defect class as §82(d), which the owner caught himself: a capacity-3 week reported 0.2
  remaining when every bidder on it had been denied. Wrong capacity arithmetic changes who gets
  weeks. **§82(d)'s standard applies: run both engines over thousands of week states and compare.
  A comment asserting "same number" is not evidence.**
- **M-1** — on Draws & Reviews an already-approved person is rendered again as an un-badged draw
  row still carrying a live ✕ Deny, and the confirm never mentions the existing approval. One
  click silently destroys an approval.

**IGNORE — off the queue by this ruling.** Not refuted, not forgotten; judged not necessary.
Do NOT build them, and do NOT re-raise them as urgent. They return only if the owner asks.
- **M-3** — the admin gate reporting every read failure as "not authorized". Diagnostics, not
  harm. (Noted only so nobody re-discovers it: it is the failure the owner would meet during the
  sign-in push, on the one page that cannot report it.)
- **M-6** and **M-7** — the mail-address owner check, and the unused relay fallback.
- **M-9** — `fteMap` world-readable. Verified 22 Aug: its listener moved behind sign-in at build
  152, so nothing reads it before sign-in and nothing changes if it is never fixed. A privacy
  tidy-up, not a defect.
- **M-4** — **SETTLED, not deferred.** The owner read all four documents the rules compare
  against — `vacations/loginEmails`, `vacations/adminAccess`, `vacations/emailToUser`,
  `dailysched/adminAccess` — and found no capitals in any of them. Nothing is broken, no data fix
  is owed, and §86's promotion of M-4 to LIVE is hereby withdrawn: it is latent, as RA-4 first
  said. Space-padding was not separately checked and is invisible in the console — unlikely, not
  excluded. Two limits found while scoping the fix, recorded so no one re-scopes it from scratch:
  rules cannot lowercase the stored side of a list without the unproven
  `join(',').lower().split(',')` trick, and `emailToUser` — a map keyed by address — cannot be
  fixed in rules at all.

The three §86 skips (H-4, H-5, M-8) and the two left alone (M-2, M-5) are unchanged and remain so.

## §88 — ALWAYS SORT BY PROJECTION. A decision never drives position — 24 Aug 2026

Owner, verbatim: **"Always sort by projection."**

**THE RULE, binding on every list of bidders in the admin site:**
1. **projection** — win, then draw/review (ONE tier), then lose;
2. **bid strength**, strongest first (`pScore`: 1/2/3 → 0 · 1/2 → 1 · single n → n+1 · NP → 99);
3. **name** — except in by-USER views, where the third key stays the WEEK.

Approved and denied are shown by BADGE, in place. They never move a row.

**HOW HE GOT THERE, in his own observations.** First: *"approving someone who was projected to lose
moves them up the report list."* Second, after Claude had conceded the opposite: *"even complete
phases have users re-order incorrectly."* The two look different and are one defect — position was
keyed on the DECISION, so mid-phase the list moved under the cursor, and in a completed phase (where
every row is approved or denied) bid strength only ever broke ties inside those two blocks, burying
a strong denied bid beneath a weak approved one.

**CLAUDE WAS WRONG TWICE HERE, and the record should say so.** It first claimed the report shared
the panels' defect; when the owner said closed phases do not re-order, it conceded that closed-phase
result-ordering was "arguably right" — reasoning its way into agreement instead of holding the
distinction between *unstable* and *mis-ordered*. The owner's second observation is what separated
them. **Lesson: a concession made from someone else's description is worth no more than the claim it
replaced. Read the code.**

**Draw and review are one tier** on the owner's reasoning — *"they never occur together"* — which
Claude verified in the engine rather than accepting: the per-week group loop sets `settled` at the
first group that does not fit and skips every later group, so exactly one of `draws`/`reviews` can
be populated for a week. The guarantee is PER WEEK; in a by-user view one person may hold a draw on
one week and a review on another, and merged tiers do reorder there. Accepted.

**Measured before building, per §82(d), and it answers a question the owner asked directly** — are
the natural and frozen projections ever different, or is it only the code? Over 6,000 week states
`computeApprovals(true)` and `computeApprovals(false)` are **identical**, and neither moves when a
decision is written. §77 removed everything the flag used to switch, so `ignoreAdmin` is vestigial.
Either key is safe; the builds use the one already computed at each call site.

Shipped as admin **301**.

## §89 — THE FINAL AUDIT SCOPE: only what would derail a live election — 24 Aug 2026

Owner, opening the session, verbatim: **"CRITICAL/HIGH only — things that would truly derail a
live election. The key is here is that I don't want to start chasing small problems. This project
must be completed soon and I am only looking for items that will truly derail me. No more security
improvements, no other items that would be nice, only 100% absolutely necessary fixes."**

This does not replace §84/§85 — it is those two, narrowed once more and made final. Two things
change:

1. **SECURITY WORK IS CLOSED.** §84's harm 5 (exposure) survives only for something LIVE, CERTAIN
   and SEVERE — bid values or decisions readable during an OPEN phase. Hardening, defence in
   depth and "could be tightened" are out, including anything RA-3/RA-4 left on the table.
2. **"NICE" IS OUT, EXPLICITLY.** Not merely cosmetic items — anything whose justification is
   improvement rather than necessity. The test is now: *would this, left alone, derail a live
   election?* If the answer needs a paragraph, it is No.

**RA-5 ran under this ruling and found NOTHING. Zero CRITICAL, zero HIGH.** Seven blind lenses,
one HIGH raised and refuted by execution, four lenses proving their conclusions by running the
real extracted code. Report: `tests/docs/RA-5-2026-08-24.md` (PRIVATE).

**What this means for the next session: the code is not the risk any more.** The three remaining
items are all the owner's own — real-bidder sign-ins, launch, and switching the two mail toggles
on. A session that goes looking for more code work is working against this ruling.

## §90 — THE SCHEDULE'S PRIORITY IS FUNCTION, NOT POLISH — 24 Aug 2026

Owner, verbatim: **"Part of the reason is that the schedule build is still early in its life. i
haven't done much testing of it myself and i'm certain it's a long way from being usable. the key
is getting it functional and build the base features."**

**THE RULING: base features first. Stop working the defect list.**

This is the schedule's counterpart to §89, and it points the opposite way for a reason. The
auction is weeks from a live election with 35 people depending on it, so there the bar is "only
what would derail it". The schedule has **no users at all yet** — the owner has not meaningfully
tested it himself. Polishing a prototype nobody has used is effort spent on the wrong axis: the
defects that matter cannot be known until the features exist and someone drives them.

**WHAT THIS PROMOTES — the approved sequence (18 Aug) is now the queue, in order:**
S5c (filter bar) · **S6 the DAY BOARD, becoming the admin landing page** · S7 (catalog
read-first rows) · Stage 4 (categories + subgroups) · Stage 5 (the rules engine — the goal).

**WHAT THIS DEMOTES — parked, not forgotten, and NOT to be picked up without the owner asking:**
- **Defect 3 · swap atomicity.** Structural, and it only bites once swaps are used in earnest.
  **It stays on the list because it is a real data-integrity gap — but a feature nobody uses
  cannot corrupt anything.** Revisit before the schedule carries real swaps.
- **Defects 17 and 18 · mobile.** The admin page has no responsive rule at all. That matters at
  ROLLOUT, and rollout is months away; the layout it must be responsive to does not exist yet.
- **Defects 5's tail, 7's tail, 20–23 hardcoding, 25–29 dead code** — housekeeping. Several were
  closed in 78–80 already; the rest wait.

**WHAT IS NOT DEMOTED, and the distinction matters:** anything that can DESTROY DATA still gets
fixed the moment it is found, prototype or not. That is why `saveBaseline` (77) and the FTE
loaded-gate (79) were built rather than parked — a wiped baseline is not recoverable, and "we
were going to rewrite that screen anyway" is no comfort to the person whose data went. **Base
features first; data loss still jumps the queue.**

## §91 — NO PHONE NUMBER FIELD FOR NOW; IF EVER, IT IS PER PERSON — 24 Aug 2026

Owner, verbatim: **"don't need phone number now. it would have to be per person if we build it."**

Asked while scoping **S6, the Day Board** (*who's on today/now, per site, contacts*), because the
word "contacts" had no field behind it: there is **no phone, pager, mobile or extension field
anywhere in either schedule page** — verified by grep, not assumed. The only per-person data is a
display name, a KP e-mail, a login e-mail and an FTE.

**THE RULING, two parts:**
1. **Not now.** S6 is built WITHOUT a contact number. It shows who is on, per site, with the
   names and the KP e-mail already held. Do not invent a field (§22).
2. **If it is ever built, it is PER PERSON** — not the per-shift role number (call pager / unit
   extension) that was proposed as the cheaper alternative. That option is closed; do not
   re-propose it as a shortcut.

**WHAT WHOEVER BUILDS IT LATER MUST KNOW, recorded now while it is understood:**
- It goes in **`dailysched/*`, NEVER the shared roster.** Same reasoning that keeps FTE
  deliberately separate (§2): the auction must not gain a personal-phone field, and the Users
  page's sanctioned-writer surface must not grow.
- A personal number **cannot be world-readable**, so it needs a `firestore.rules` change — and
  the rules live in the AUCTION repo, so that is an auction deploy with auction discipline
  (console publish BEFORE dependent client code pushes, RA-2 before and after).
- **It is NOT required for the calendar feed (§54).** An `.ics` feed is a URL the doctor
  subscribes to; the per-doctor secret link IS the identity mechanism. The feed carries date,
  time, title and location and never needs a phone number. The two were briefly conflated when
  this was asked; they are unrelated.

---

## §92 — THE VACATION AUCTION CODE IS OFF LIMITS WITHOUT A SPECIFIC DECISION — 24 Aug 2026

Owner, verbatim: **"are you aware that the vacation site code is off limits without specific
decision from me?"**

Asked at the start of the S6 session, after Claude had proposed a paperwork-only START-HERE
update and S6. **The honest answer was no — not as a stated rule.** It was strongly IMPLIED by
§1 (the auction cannot be corrupted this close to launch), §87 ("only 100% necessary fixes"),
§89 (CRITICAL/HIGH only, and RA-5 then found nothing) and by the standing "smallest change →
explicit go" discipline. But nowhere did any file SAY it, and an implication is not a rule a
fresh session can be held to. It says it now.

**THE RULING.** No change to anything the vacation auction serves without a SPECIFIC decision
from the owner FOR THAT CHANGE. That covers `vacation-kp.github.io/**` — the staff, admin and
mobile pages, `crna/`, `versions.json` — and **`firestore.rules`, which lives in that repo and
is an auction deploy no matter which site motivated the edit** (§2).

**What is NOT a specific decision:** a general "go" on other work · a green audit finding,
however good · "while we're in here" · a defect the session believes is obviously worth fixing.
The correct move for all four is the same: **RAISE IT AND STOP.**

**What is still required, unchanged:** READING the auction code, and running its gates. The
isolation guard (`tests/sched/isolation-test.mjs`) and the FULL auction battery still run after
schedule builds, exactly as §2 requires — three schedule builds have broken the auction suites
before. Running a test is not changing code.

**Why this is recorded rather than assumed:** §89 already closed the audit queue, so the risk
this ruling addresses is not a session finding a bug — it is a session deciding, mid-task, that
a small auction edit is obviously fine. It is not obviously fine. The auction is live to 35
physicians and weeks from launch; the schedule has no users at all. That asymmetry is the whole
reason the two sites share a chat.

---

## §93 — THE DAY BOARD IS REJECTED IN ITS FIRST FORM: WHO IS WORKING, CLEANLY — 24 Aug 2026

Owner, verbatim, on admin 81: **"The day board is not a useful addition in it's current form. I
know shifts aren't assigned and that's part of it. But I want to very easily be able to see who
IS working and care less about who isn't. I want clean and organized, not cluttered. Do better
research into what intiial login screen would be useful for anesthesiua scheduling sites and
improve this."**

**THE RULING, and it is a design rule, not a one-off fix:**
1. **WHO IS WORKING IS THE PAGE.** It is not one card among several. Anything that is not a
   person who is working today is secondary, and most of it does not belong on this screen.
2. **WHO IS NOT WORKING IS NOT INTERESTING.** The "not on anything today" strip was clutter by
   this ruling. Absence may be worth a number; it is not worth a list.
3. **CLEAN AND ORGANIZED BEATS COMPLETE.** Every element earns its place or comes off. A screen
   that shows everything shows nothing — the first version put five statistics, two strips, four
   footnotes and a shortfall count around the one thing he actually asked for.
4. **THE STANDARD IS "AT A GLANCE".** He must be able to answer *who is working* without reading.

**HE ALSO NAMED THE CONFOUND HIMSELF: the schedule has no assignments in it yet**, so the board
renders mostly empty and that is the data, not the code. It does NOT excuse the design — a board
that is unreadable when full is not saved by being empty now. But it does mean **the empty state
is a first-class design problem here**, not an afterthought.

**AND IT IS AN INSTRUCTION TO RESEARCH FIRST.** The first version was built from the brief and
from what the code could support, and never asked what a daily anesthesia board is actually FOR.
That research is owed before the rebuild, and what it finds is recorded with it.

---

## §94 — THE SHIFT FAMILY ORDER, NAMED BY THE OWNER — 24 Aug 2026

Owner, verbatim: **"One list by shift families. Call at top, then AP, then weekday daytime, then
ob, then richmond, then pediatric, then PCV, then ICU, then admin, then unassigned. Also re do
shift families section to this order."**

**THE ORDER, and it is his, not a heuristic:**
`Call · AP · Weekday daytime · OB · Richmond · Pediatric · PCV · ICU · Admin · Unassigned`

**WHERE IT APPLIES:** the Day Board's sections, AND the Shift Families page — he asked for both in
the same sentence. One comparator serves both, so the two pages can never drift apart.

**WHAT THIS REPLACES.** Build 82 ordered families by putting whichever family held `kind:'call'`
shifts first and the rest alphabetically. That was a reasonable guess and it is now superseded:
**a named order beats an inferred one.** Do not re-introduce the inference.

**HOW A FAMILY IS MATCHED TO A POSITION.** By its LABEL, case-insensitively, against the words he
used (with the obvious synonyms — AP also matches "acute pain", pediatric also matches "peds",
ICU also matches "critical care"). Matching is tried MOST SPECIFIC FIRST, so a family called
"Richmond Daytime" lands under Richmond rather than under weekday daytime.

**A FAMILY HE DID NOT NAME sorts alphabetically AFTER the ten and BEFORE Unassigned.** It is not
dropped, not hidden, and not guessed at (§22) — the department can add families this list has
never heard of, and they appear in a predictable place.

**"Unassigned" is the catch-all for a shift with no family at all, and it is ALWAYS LAST.** Build
82 called that bucket "Other" and the Families page put it FIRST as a drop target; both now follow
his word and his position.

---

## §95 — BOTH WAYS OF EDITING THE CATALOG: ONE AT A TIME, AND IN BULK — 24 Aug 2026

Owner, verbatim, in three messages: **"I need a way to do both edit 1 at a time and big batch
edits"** · **"Ideally, I'd also be able to add a group of shifts from a copy paste list that can
read the data."** · **"Then I could enter a block of shifts with times all at once"**

Asked in answer to a direct question: S7's read-first rows removed the tab-down-92-shifts pass,
and he was asked whether that mattered. It does.

**THE RULING, three parts:**
1. **READ-FIRST STAYS THE DEFAULT** (§93's standard — clean, not cluttered). One quiet line per
   shift; the ✎ opens one row.
2. **AND THERE IS A DENSE MODE FOR A BIG PASS.** A switch on the Shift Catalog puts every row
   into its editor at once — the pre-85 page, on demand — so a whole-catalog sweep is one
   uninterrupted tab-through again. Remembered like the grid's view and density toggles.
   **Neither mode is "the" mode: the page must do both, and the choice is his, per sitting.**
3. **PASTING A BLOCK OF SHIFTS MUST LAND THEM FULLY CONFIGURED.**

**⚠️ PART 3 IS MOSTLY ALREADY BUILT, AND THAT MATTERS FOR HOW IT IS ANSWERED.** Paste-a-list has
existed since **build 56**: a textarea on the Shift Catalog ("Paste a list of shifts"), tab- or
comma-separated, a header row dropped if present, a **preview before anything is written**, an
"update shifts that already exist" option, per-row rejection reasons, and duplicate detection
inside the pasted block. **Do not rebuild it.**

**What it actually reads today is `label · start · end · site` — and nothing else.** Family, role
and capacity are not parsed at all, which is why a pasted block still needs a second pass by hand.
That gap — not the feature — is what §95 part 3 asks for. Demand rules stay OUT of the paste: they
are a structured multi-rule editor, and inventing a text syntax for them is exactly the kind of
guess §22 forbids.

**BLAST RADIUS, and why this is two builds and not one:** the dense-mode switch is pure rendering;
extending the paste parser touches a path that WRITES shifts in bulk. They ship separately, as 78
and 79 did, so that if either misbehaves it is obvious which one.

---

## §96 — STAGE 4 WAS ALREADY SPECIFIED. FOUR QUESTIONS WERE ASKED THAT §53a AND §53b HAD ANSWERED — 24 Aug 2026

**This entry exists to record a mistake, because the mistake is more useful than the answers.**

Claude put four questions to the owner about Stage 4, presented as open. **Three of them had been
answered by him on 16 August, in this file, in the two entries written specifically to close
them.** He answered the fourth and then re-answered one of the others from scratch. The record:

| asked today | already ruled |
|---|---|
| how many subgroups may a person be in? | **§53a·2 and §53b** — *"0 or more"*, twice |
| may a person cross categories? | **§53b** — *"MDs and CRNAs can only stay in that subgroup"* |
| if a shift names two, is it any-one or all? | **§53a·1** — *"A shift may require any one OR all of them"* → **a PER-SHIFT setting, both modes exist**, and a global switch is explicitly the wrong build |
| what happens to the eligibility ticks? | **§53b·1** — **option C**, chosen by him in his own words (*"I choose C, thank you for that"*), with options A and B rejected and the reasons recorded so it is not relitigated |

**THE BINDING RULE THIS PRODUCES — and it is an extension of one that already existed:**
START-HERE §3 says *"A fact lives in ONE of these. Before writing a rule or status anywhere, grep
for it."* **That now covers ASKING, not only writing: grep `DECISIONS.md` before putting any
question to the owner.** His attention is the scarcest thing in this project. Spending it on a
question he has already answered is worse than merely wasteful — a re-asked question invites a
different answer, and two contradictory rulings on one point is exactly the drift this file exists
to prevent. The cost was real today: the same four minutes bought one genuinely new decision
(§97) and three restatements.

**A SECOND FAILURE, SEPARATE AND WORTH ITS OWN LINE.** One question used the word *"ticks"* — a
word this project invented and never defined for him. His reply was *"what are ticks?"*, and the
half-answer around it (*"certainly filter the grid"*) could not be used, because *"grid"* means the
SCHEDULE grid everywhere else here. **Never ask the owner a question containing a word the project
invented; define it in his terms in the same breath.** He is not a coder and has said so. A
question he cannot parse does not come back wrong — it comes back answering something else, which
looks like agreement.

**WHAT IS THEREFORE TRUE: Stage 4 needed ONE decision, not four.** Everything else was settled on
16–17 August by §53, §53a, §53b and §56. The one thing genuinely new is §97.

---

## §97 — THE STAGE 4 VOCABULARY: A GROUP CONTAINS TWO SUBGROUPS — 24 Aug 2026

Owner, verbatim: **"Yes, we should call it Group with 2 subgroups"** — confirming, and naming, the
structure he had described a moment earlier: *"MDs can only below MD subs and CRNAs in CRNA subs,
but both of those subgroups should really be 'sub' subgroups since an MD sub and CRNA sub
technically would make up the actual OB subgroup. I think we will need that distinction."*

**THE STRUCTURE, in his words, and these are now the project's terms — use no others:**

- A **GROUP** is the real unit and the thing people name: *OB*, *Pediatric*, *ICU*. It spans both
  categories.
- A group contains exactly **TWO SUBGROUPS**: its **MD subgroup** and its **CRNA subgroup**.
- A person joins a **group**; their category (MD or CRNA) decides which of the two subgroups they
  land in. A person is never asked which subgroup — that would be a second way to say what their
  category already says (§19).
- Nobody crosses: an MD is only ever in MD subgroups (§53b, restated by him today).

**WHY THE DISTINCTION EARNS ITS KEEP, since he asked for it specifically:** a shift already
carries `role` = MD, CRNA or **Both** (§42). A shift that says *OB* + *MD* wants the MD subgroup;
*OB* + *Both* wants either. **Without the two-level shape, "OB" would have to be two unrelated
lists that merely look alike**, and every question about OB — who is in it, is it covered, is it
short — would have to be asked twice and added up by hand.

**THE INITIAL GROUPS ARE THE SHIFT FAMILIES** (§96 C, his words: *"start with the shift families
for now, but create a way to add additional sub groups"*) — the §94 order: Call · AP · Weekday
daytime · OB · Richmond · Pediatric · PCV · ICU · Admin. **Seeded, not chained:** whether a group
stays tied to its family afterwards is NOT settled and must not be assumed. The editor must let
him add groups that are not families.

**CONFIRMED AGAIN, unprompted, the same day** — owner: *"Groups and subgroups will absolutely
drive the shift eligibility and 'ticks'"*. That is §53b option C in his own words a second time,
eight days apart, which is as strong as this record gets. **Eligibility comes FROM group
membership; the per-person-per-shift grid survives only as the list of deliberate exceptions.**
Do not re-open it, and do not ask him about it again.

**WHAT STAGE 4 NOW HAS, COMPLETE:** a category on each person (§53), zero or more group
memberships per person (§53a), no crossing (§53b), a group's two subgroups (§97), a per-shift
group requirement with an any-one-or-all mode (§53a·1), subgroups granting eligibility with the
old tick grid demoted to an exception list (§53b·1), and a one-way, confirmed, audited cutover
switch to flip authority when he is ready (§56). **Nothing about Stage 4 is open. It can be
built.**

---

## §98 — THE ELIGIBILITY REBUILD. FOUR EARLIER RULINGS ARE SUPERSEDED — 24 Aug 2026

Owner, verbatim, in one message:

> *"The current ticks should be forgotten, they mean nothing. I don't have a use for that
> eligibility grid since I need and we are building a much smarter, cleaner, more useful version.
> The eligibility grid should essentially become an interactive board that can filter and sort. It
> will never be useful to have the option to view 3,000 ticks at once. Add to the handoff that the
> schedule site is in early build phase and is not being used at all and won't be for some time.
> Change from before is that every user must have at least 1 group. I need the ability to specify
> shifts are filled by group, subgroup, individuals. I need the ability to add/remove individuals
> from shift eligibility regardless of group/sub. Basically a group or sub override option."*

### 1 · THE EXISTING TICKS ARE DEAD DATA. **Supersedes §53b·1 and §56.**

`dailysched/eligibility` is **not** migrated, **not** re-interpreted, and **not** consulted. It is
not deleted either — nothing in this project is (§3) — but it stops being an input, permanently.

**§53b chose option C: subgroups grant, and the old grid survives as an exception list.** That is
now superseded on its factual premise. Option C existed to protect real eligibility decisions that
someone had made deliberately. He has now said those ticks *"mean nothing"* — so there is nothing
to protect, and re-interpreting 3,000 meaningless ticks into exceptions would manufacture data
rather than preserve it. **The exception mechanism §53b wanted still exists — see item 4 — but it
starts EMPTY.**

**§56's cutover switch was built for the same premise** and is very likely unnecessary now: it
exists so authority never changes under people's feet, and there are no people (item 2). **Claude
has NOT dropped it unilaterally — it is his ruling, and dropping it is proposed and awaiting his
word.**

### 2 · THE SCHEDULE SITE IS IN EARLY BUILD AND HAS NO USERS. Recorded at his explicit request.

*"the schedule site is in early build phase and is not being used at all and won't be for some
time."* He asked for this in HANDOFF; it is here too because it CHANGES WHAT IS SAFE. A data-model
change with no users is cheap: no migration, no compatibility window, no flag day. This is the
window in which restructuring is nearly free, and it will close.

**It does not loosen one thing: the cardinal rule.** The auction is live to 35 physicians all
year, the two sites share one roster and one Firestore bill, and §92 keeps the auction's code shut.
"The schedule has no users" is never a reason to touch anything the auction reads.

### 3 · EVERY USER MUST HAVE AT LEAST ONE GROUP. **Supersedes §53a·2 and §96·A.**

*"every user must have at least 1 group."* Both earlier entries recorded "zero or more" — twice,
in his own words at the time. It is now **one or more**.

⚠️ **Every user is at zero today**, so this cannot be enforced by refusing to save. It is a state
to surface loudly and drive to zero, not a lock that makes the Users page unusable. **How strictly
it is enforced at the moment of adding a person is NOT settled — asked, not assumed (§22).**

### 4 · A SHIFT IS FILLED BY GROUPS, SUBGROUPS, AND INDIVIDUALS — WITH OVERRIDES BOTH WAYS.

*"I need the ability to specify shifts are filled by group, subgroup, individuals. I need the
ability to add/remove individuals from shift eligibility regardless of group/sub. Basically a
group or sub override option."*

Four things a shift can carry, and they compose:

| | what it says |
|---|---|
| **group** | the whole group qualifies — both its MD and CRNA subgroups |
| **subgroup** | only one side of a group qualifies — OB's MD side, say, and not its CRNA side |
| **individual — allow** | this person qualifies **regardless** of any group they are or are not in |
| **individual — block** | this person does **not** qualify, even though a group of theirs does |

**Block beats allow beats group.** An individual entry is an override, and an override that could
be silently outvoted by a group would not be one.

This REPLACES build 89's shape, in which a shift named groups and the shift's own MD/CRNA/Both
marking implied the side. That was a reasonable reading of §53a and it is now too coarse: he wants
to name a side explicitly, and to name a person.

### 5 · THE ELIGIBILITY PAGE BECOMES A BOARD, NOT A GRID.

*"an interactive board that can filter and sort. It will never be useful to have the option to
view 3,000 ticks at once."* The person × shift matrix is not to be rebuilt, not even as an
optional view. **"Never" is his word.** Whatever replaces it answers questions — who can work
this, what can this person work, who is this shift short of — by filtering and sorting, and it
never asks anyone to read a wall of checkboxes.

Note the deliberate difference from §95: the Shift **Catalog** got both a read-first mode and a
dense batch mode because he asked for both. The Shift **Eligibility** page gets no dense mode at
all, because he has ruled the dense view useless here. Do not copy the catalog's pattern across.


---

## §99 — HOW THE SCHEDULE IS BUILT: FEATURES FIRST, BUT NEVER ROUGH — 24 Aug 2026

Owner, verbatim: **"the key to schedule site is currently to build features and functions now.
Fine tuning will come later. Ensure builds are good and solid and ask questions and make recs. I
want the builds clean and highly functional and intuitive."**

Asked whether this was already recorded. **It was half-recorded, and the missing half is the
half that protects him**, so it is written out in full here.

### 1 · WHAT §90 ALREADY SAID, and still says
Base features first; stop working the defect list. The defects that matter cannot be known until
the features exist and somebody drives them. Unchanged.

### 2 · WHAT §90 DID NOT SAY, AND THIS DOES: THE ENGINEERING BAR NEVER MOVES

*"Ensure builds are good and solid."* **"Early build, no users, features first" is not licence to
ship rough work.** Those are two different axes and a future session could easily collapse them:

| axis | where it stands |
|---|---|
| **product polish** — spacing, edge cases, the defect list | **deferred by §90.** Fine tuning comes later. |
| **engineering quality** — executed tests, honesty checks, guards, no silent failure | **NOT deferred. Never deferred.** |

Every gate in START-HERE §3 applies to a schedule build exactly as it applies to an auction one:
tests that EXECUTE real extracted code, an honesty check proving they fail on the previous build,
the isolation guard, the full auction battery, `node --check`, byte verification. **A build that
skips a gate because "the schedule has no users" is not moving fast — it is spending the one
window in which mistakes are cheap on making them undetectable.**

### 3 · ASK, AND RECOMMEND

*"ask questions and make recs."* START-HERE §3.1 already says stop and ask when unsure, and push
back on bad ideas. This adds the third, and it is the one Claude has been weakest at: **come with
options and a recommendation, not a blank question.** Where there is a defensible default, say
what it is and why, then let him choose. A question with no recommendation attached hands the work
back to him, which is the opposite of the point.

**And the standing companion rule (§96): grep `DECISIONS.md` before asking anything.** Three of
four questions put to him about Stage 4 had already been answered by him a week earlier. His
attention is the scarcest resource in this project.

### 4 · THE STANDARD FOR EVERY SCREEN: CLEAN, HIGHLY FUNCTIONAL, INTUITIVE

*"I want the builds clean and highly functional and intuitive."* §93 said this about the day
board; it is now the standard for **everything**. Specifically, and each of these has already been
paid for once:

- **Clean** — a screen is a quiet reading surface first. Controls appear on the row you are
  editing, not on all ninety-two. The day board (§93) and the first cut of the eligibility board
  both failed this and were rebuilt before he ever saw the second one.
- **Highly functional** — it must answer the question the screen exists for, in one look. Counts
  and stat tiles are not answers.
- **Intuitive** — no invented vocabulary. If a word only exists inside this project (§96's
  *"ticks"*), it does not appear in a UI or in a question to him.

---

---

## §100 — THE STAGE 4 RULES CHANGE IS APPROVED. THIS IS THE §92 DECISION — 25 Aug 2026

Owner: **"yes, let's do it"**, answering a specific proposal with the risk stated.

**§92 closed the auction's code without a specific decision from him. This is that decision, and
its scope is exactly one edit:** add `groups`, `groupMembers` and `categories` to
`isSchedAdminOnlyDoc()` in `firestore.rules`, so those three documents can be written only by a
Daily Schedule admin. **Nothing else in that file changes. The approval does not extend to any
other rules edit, and does not reopen the auction's code.**

**WHY IT IS NEEDED.** Those three documents were created by build 88. They fall through the
`dailysched/{docId}` catch-all, which allows ANY registered user to write a document not named on
the admin-only list. Group membership now decides who may work what (§98), so a bidder could
otherwise rewrite the schedule's eligibility.

**THE RISK, AS PUT TO HIM, AND WHY IT IS SMALL.** `isSchedAdminOnlyDoc()` is referenced in four
places, all inside the two `dailysched` match blocks — **zero references in any `vacations/*`
rule**, verified by grep, not assumed. The auction's staff page touches no `dailysched` document;
the auction admin touches exactly one, `adminAccess`, which is already on the list and is not
being changed. The three new documents are new: no auction code has ever heard of them.

**THE REAL RISK IS THE PUBLISH, NOT THE EDIT — and it is procedural.** A rules publish replaces
the ENTIRE ruleset for the whole project, both sites, atomically. The repo copy was last committed
**21 Aug (`6bbb4af`)**, so if anyone has edited rules in the console since, pasting the repo file
would silently revert those edits with no error at all.

**THEREFORE, THE ORDER IS BINDING AND THE FIRST STEP IS HIS:**
1. **He compares the console's live rules against the repo copy BEFORE pasting anything.** If they
   differ, stop and reconcile; do not publish.
2. RA-2 runs against the CURRENT rules first, with the new gates, which must **FAIL** there.
3. RA-2 runs against the new rules; everything passes.
4. He publishes. The console validates before publishing — on any error, publish NOTHING and say so.
5. Full auction battery afterwards, plus a live read, to prove the auction is untouched.

**Timing was part of the decision:** no phase is in flight and the election is weeks away, which
makes this about as cheap as a rules change will ever be. The same edit during open bidding would
be a different conversation.

### PUBLISHED — 25 Aug 2026, BOTH consoles

Owner: *"rules pushed… to both projects."* Published to **`vacation-25e8e` AND `crna-vacation`**,
which is the established practice for this file and not an improvisation — HANDOFF records the
same two-console publish on 20 Aug. **One rules file, two projects.** The repo copy md5s to
`e5f130f9bea0b0a4f3dbd87e88f6e9dc`, identical to the ⚙️ file handed to him.

**On the CRNA project the entire `dailysched` section matches nothing** — there is no schedule in
that project — so the change is inert there. Everything the CRNA auction actually uses is
byte-identical to what it had before.

**⚠️ TWO THINGS THIS RULING IS NOT FINISHED WITHOUT, and neither is code:**
1. **The repo copy is still UNCOMMITTED.** The consoles have the change; git does not. A fresh
   session reading the repo would believe the old rules are live. Commit it.
2. **RA-2 has not been run against it.** The emulator jar is blocked by the egress allowlist in
   BOTH sandboxes, so that run is the owner's — see START-HERE §6. The pre-change fixture is
   saved at `_to_delete/fx/rules-before.txt` so the honesty half works without command-line git:
   `PRE_RULES=../_to_delete/fx/rules-before.txt node test-rules-emulator.mjs` from `tests/`.
   **Until that runs, the three new gates are asserted but not executed** — which by §6's own
   standard is a skipped gate, not a pass.

### RA-2 RUN — 25 Aug 2026, by the owner. §100 IS CLOSED.

**Current rules: 66 passed, 0 failed.** **Honesty run: 10 of 10 new-gate assertions FAILED on the
old rules**, including all three §100 gates — *"a registered bidder may NOT write
dailysched/groups / groupMembers / categories"* — each reported *"Expected request to fail, but it
succeeded."* on the pre-change ruleset. **That is the proof: before the change a registered bidder
COULD have rewritten who works what, and now cannot.** The three admin-can-still-write assertions
passed in both runs, so the fix locks the door without walling out the person who needs it.

**AND THE LIVE CHECK PASSED — owner, 25 Aug: *"sign into vacay works"*.** That is the one piece of
verification no battery could supply: RA-2 executes the rules in an emulator, and the auction
suites test code, but only a real sign-in against the DEPLOYED ruleset proves the publish did not
disturb the live site. **§100 is now closed end to end: reviewed, published to both consoles,
executed in the emulator with a failing honesty baseline, and confirmed live.**

**Two observations from that run, recorded because both correct something written earlier today:**

1. **`RA-2.command` got its honesty fixture from GIT and it worked** — `/tmp/rules-pre-d49cd15.rules`,
   extracted by `git -C ../vacation-kp.github.io show d49cd15:firestore.rules`. START-HERE has said
   since 22 Aug that command-line git is not installed on the Mac; **on this machine, today, it
   ran.** The `rules-before.txt` fallback prepared for this session was therefore not needed. Do
   not assume either way — the wrapper tries git and falls through if it fails, which is the right
   shape regardless.
   **Note the fixture is `d49cd15` (the pre-RA-3 rules, 20 Aug), NOT the rules as they stood
   immediately before §100.** That is a wider baseline than this change alone, which is why seven
   older RA-3 gates also failed there. It does not weaken the proof for §100's three: those three
   documents were absent from `isSchedAdminOnlyDoc()` in every version before this edit, so their
   failure is attributable to this change and nothing else. **A future rules change should point
   the fixture at its own immediate predecessor** if it wants a clean one-change comparison.

2. **The Mac is now on Node v24.19.0**, and npm warned `EBADENGINE` for `superstatic@9.2.0`, which
   wants 18/20/22. Harmless this run — the emulator started and the suite executed — but it is the
   kind of thing that turns into a broken `npm install` later. Recorded, not acted on.


---

## §101 — HANDOFF ARCHIVES BY RELEVANCE, NOT BY AGE. §60's 14-DAY RULE IS REPLACED — 25 Aug 2026

Owner, verbatim: **"14 days doesn't seem reasonable. i want to remove items no longer needed
rather than remove by time."**

**WHAT THIS REPLACES.** The standing rule he set on 24 Aug had three parts. Part ③ said
*"`HANDOFF.md` ages its DATED ENTRIES out at 14 days."* **That part, and only that part, is
superseded.** Part ① (shipped work leaves `TODO.md` as it enters `BUILD-LOG.md`, same turn) and
part ② / rule 3 (the 2,000-line tripwire on either file) **both stand unchanged**, as does the
exemption of this register and the uncertainty-keeps-it clause.

**THE RULE NOW.** An entry leaves `HANDOFF.md` when it is no longer needed. It stays while it
carries something a future session would ACT on — a trap or lesson still true of the code, tools
or machines as they are today; an unresolved question, accepted risk or unworked-around limit;
or the reasoning behind something still in force. It goes when it is a build narrative
`BUILD-LOG.md` already records, when its lesson has been promoted into `START-HERE.md` §3 or into
this file, or when it describes a machine, tool, file or code path that no longer exists.

**THE TEST, in one question: if a fresh session never read this entry, would it do anything
wrong?** Yes keeps it. No archives it. Full wording lives in `HANDOFF.md`'s MAINTAINING section —
this entry is the ruling, not the second copy of the procedure.

**WHY HE IS RIGHT, and the evidence came from the pass itself.** The 25 Aug archive pass applied
the 14-day rule and it reached only FOUR sections, because at 200–400 lines per session a
fortnight of sessions is roughly the whole file. Age was spending judgement and buying nothing.
And age is the wrong axis on its own terms: a three-week-old trap that still bites is worth more
than yesterday's build narrative. **The numeric trigger survives — rule 3's 2,000-line tripwire
still says WHEN to look; relevance now decides WHAT goes.** So §62's principle (a number, because
drift that depends on judgement is drift nobody notices) is not weakened: the trigger stayed
mechanical and only the test became judgement, with uncertainty still keeping the item.

**THE PART WORTH CARRYING FORWARD: promote the lesson, then archive the story.** An entry that
cannot be archived because its lesson lives nowhere else is not a reason to keep the entry — it
is a sign the lesson was never filed. This turns the archive pass from tidying into the thing
that forces hard-won lessons out of narrative and into the files a fresh session actually reads.

---

## §102 — SHIFT POOLS: A COMBINED TOTAL ACROSS A NAMED SET OF SHIFTS — 25 Aug 2026

The owner drove the shift catalog himself under §90 and produced six items. Five of them are UI
(recorded in `TODO.md` §1); this is the sixth, and it turned out to be the largest thing on the
schedule's list since Stage 4.

**THE REQUIREMENT, verbatim:** *"i need option to specify a range of staffing needs, basically 0-1
or 5-6 or whatever"* — then, the same turn, the reason: *"i'll need an option to specify certain
shifts that together have a set total # of people. I need a range for the shifts because some days
there will be more D shifts and other days more D10 shifts, but generally the total combined of
these shifts is set at a certain number. This could be a different set of rules at the top for
broader guiding rules that always apply."*

**THE READING THAT MATTERS: the per-shift range is the SYMPTOM; the combined total is the RULE.**
D and D10 flex against each other precisely because their SUM is fixed. Ranges built alone would
leave the actual constraint unexpressed and would likely be rebuilt to serve it.

**RULED, verbatim, same turn:**

1. *"auto-pop fills to min"* — **auto-populate targets the MINIMUM.** Over-filling costs a person
   a day off; the empty slot above min is a gap somebody may claim, not a hole to plug.
2. *"max should be indicator, not hard ceiling"* — **MAX NEVER REFUSES AN ASSIGNMENT.** It informs.
   This is deliberate and must not be "improved" into a guard later without a new ruling.
3. *"at min below max okay"* — **at-min-below-max is an ACCEPTABLE state, not a shortfall.**
   Coverage therefore needs a THIRD reading (*covered · could take more*), not a binary. Every
   consumer of `demandOn()` that today asks "short or not" has to learn the third answer.
4. *"I like pool of shifts"* — **the name is POOL.** A pool is a set of SHIFTS. **It is NOT a
   `group`**, which since Stage 4 means a set of PEOPLE (`groups` / `groupMembers`, an MD subgroup
   and a CRNA subgroup, deciding who MAY WORK). Two things called a group — one deciding who may
   work and one deciding how many bodies a day needs — is §81's *never say "winner" without saying
   which* failure waiting to happen. **The word `pool` is reserved for shifts from here on.**
5. *"new named set"* — **a pool is its own named set, NOT the existing `family`.** Families were
   considered: shifts already carry one (§94's named order) and D/D10 would likely share one, so it
   was free. Rejected because a family would total EVERY shift in it whether the owner wants that
   or not, while a named set gives exact control and lets a shift belong to more than one pool.
   The cost is setup, and he accepted it.

**SCOPE — "ok to go with 5" IS APPROVAL OF THE POOL FEATURE, NOT OF STAGE 5.** The question of
whether this should BE the Stage 5 slice (in place of Minimum rest) was asked and not answered, so
the §90 hold on Stage 5 STANDS. This is built as demand/coverage work under §90. It will very
likely become the foundation the rules engine reuses — a rule that targets a SET and is evaluated
PER DAY is exactly Stage 5's shape — but the engine, the Rules page, the conflict report and the
warn-and-override path are NOT authorised here. **If this build starts growing into them, stop and
ask.**

**TWO FURTHER RULINGS, 25 Aug, on the design put to him:**

6. **AUTO-POPULATE SATISFIES THE PER-SHIFT MINIMUMS ONLY — it does NOT try to reach a pool's
   total.** Owner: *"good for initial build."* So with D and D10 each min 2 and a pool total of 8,
   auto-populate places 4 and leaves 4 unplaced. **That is correct, not a shortfall:** the system
   guarantees the floor and the owner allocates the flex, because the split between D and D10 is a
   per-day judgement. **Note his words — "for initial build."** He has NOT ruled that it should
   stay this way forever; an option to have auto-populate distribute the remainder is a legitimate
   later request, and is a different build.
7. **A POOL OVER OR UNDER ITS TOTAL IS AN INDICATOR, NEVER A REFUSAL** (owner: *"agree"*), the
   same as ruling 2. It shows; it does not block.

**THE `capacity` TRAP, to be settled by the design and not rediscovered.** A per-shift `capacity`
field already exists and its own tooltip reads *"How many people can hold this shift on the same
day"* — a maximum in everything but use (today it is read only as the auto-populate fallback when
no demand rule exists anywhere). Leaving it beside a new per-shift max would put TWO fields in the
page meaning the most people a shift can take, which is the build-78 defect shape exactly: two
holders of one definition, drifting. The design must say which one survives.

---

## §103 — THE WORD IS "STAFFING". "DEMAND" IS RETIRED FROM THE UI — 25 Aug 2026

Owner, 25 Aug: *"I don;t like using the word demand - present new options. maybe rules? maybe
something else?"* — then, on the options put to him: **"I lik staffing."**

**RULED: the user-facing word is STAFFING.** Section heading *Staffing*; the badge that read
*no demand* becomes *no staffing set*; the buttons become *Set staffing* / *Edit staffing (n)*;
an individual line is a *staffing rule*.

**"RULES" WAS HIS OWN FIRST SUGGESTION AND WAS ARGUED AGAINST, WITH REASONS.** Stage 5 IS the
rules engine, and the auction already has Timer Rules. Putting a third, unrelated meaning on the
bare word would be §81's *never say "winner" without saying which* for the third time in one week
— after pool-versus-group (§102) and projected-versus-decided (§81). **The word "rules" stays
reserved for Stage 5.** *Staffing rule* is fine because it is qualified.

Also considered and rejected: **Coverage** (a page of that name already exists), **Requirements**
(one letter from *Requests*, which sits beside it in the same nav), **Headcount** (jargon),
**Needs** (works in a sentence, awkward as a heading).

⚠️ **THE RENAME IS OF WHAT HE SEES, NOT OF WHAT THE CODE CALLS THINGS — and that split is
deliberate.** `demandOn()`, `demandRules()`, `demandModal` and, above all, the stored Firestore
field `shifts.<id>.demand` keep their names. Renaming the stored field is a DATA MIGRATION with
real risk and zero benefit to him; renaming the identifiers is churn across a large file for the
same nothing. **A future session must not "finish the job" by renaming them** — it would be a
migration wearing a tidy-up's clothes. If the drift between code and UI ever becomes confusing,
the fix is a comment at each definition, not a rename.

---

## §104 — COLLAPSE BY DEFAULT. THE OPEN/CLOSED MODEL, RULED — 25 Aug 2026

The owner raised clutter three times in one afternoon while trying to use the schedule, then gave
the brief and, asked the one question that would have been expensive to get wrong, ruled on it.

**THE TEST HE GAVE, which is the rule and not a list:** *"anything that's used occasionally should
be collapsed by default."* Named explicitly: **Add a shift** and **Holidays**. Everything else is
Claude's judgement (*"use some of your own judgement"*) — but every answer must be defensible by
that one question: **how often does he need to READ this, versus CHANGE it?** Read-often stays
open; set-once-and-forget collapses.

**THE STATE MODEL, ruled 25 Aug:** *"shifts can stay open with option to manually collapse. but on
page re-load, should start collpased."*

1. **Every section starts COLLAPSED.**
2. **State lives in MEMORY ONLY** — no `localStorage`, no Firestore. A page reload is therefore the
   reset, exactly as he asked, and it costs nothing to implement and nothing to read.
3. **A section he opens STAYS open** — including across navigation to another section and back —
   until he collapses it himself or reloads.
4. **ONE EXCEPTION, and it is his own earlier instruction:** individual SHIFT ROWS on Shift
   Eligibility reset to collapsed when he navigates away (*"it then stays open until closed
   intentionally or when page navigates to other section"*). The difference is scale — dozens of
   rows can accumulate open, where there are only a handful of sections.

**THE CATALOG GETS THREE LEVELS**, in his words: the whole Shifts card collapsed → expands to a
list of FAMILIES → a family expands to its shifts. **The reason he gave matters more than the
shape:** *"a scroller within a scroller can be hard to use."* So the fix is FEWER THINGS VISIBLE,
which removes the need for the inner scroller — not a taller inner box.

⚠️ **DO NOT ADD A SECOND COLLAPSE MECHANISM.** The catalog has had collapsible family bands since
S3 (`catCollapsedFams`). The gap is that their default is OPEN and the unit is too coarse — that
is a defaults-and-granularity change, not a new feature (§3 rule 14: check whether it exists).

**A COLLAPSED SECTION MUST STILL SAY WHAT IS INSIDE IT** (a count, a summary line). §93's standard
is at-a-glance; a row of unlabelled closed bars would trade clutter for a guessing game, which is
the same failure wearing the opposite coat.

---

## §105 — AN EARLY RETURN ADDED FOR ONE PANEL OWNS EVERY LINE AFTER IT — 25 Aug 2026

Not a ruling of the owner's; a rule earned by a defect he found, recorded here because it is the
kind of mistake that will otherwise be made again by whoever adds the next collapsible thing.

**WHAT HAPPENED.** Build 96 made the catalog's Shifts section collapsed by default (§104) and, to
avoid building ninety rows into a hidden box, added `if(!sectOpen.shifts){ el.innerHTML=''; return; }`
near the top of `renderCatalog`. That function does not only render the shift list. Everything
below that line died with it whenever the section was shut — **which is the default**:

· the catalog summary · the family dropdown · the **site** dropdown · the **holidays list and its
Remove buttons** · the open demand dialog · the copy-an-existing-shift picker.

**Five of the six had nothing to do with the shift list at all.** The batteries were green: 47
suites, 1,509 assertions, zero skips. Not one of them opened the catalog page with the section
CLOSED and asked whether the rest of the page still worked, because until that build there was no
closed state to ask about.

**THE RULE: skip the WORK, never the REST of the function.**
`el.innerHTML = sectOpen.shifts ? catRowsHtml(list, famHead) : '';`

**AND THE TESTING RULE THAT GOES WITH IT, which is the transferable half:** when a build introduces
a new STATE — collapsed, locked, empty, offline — the gate must exercise the rest of the feature
IN that state. A suite that only ever runs in the state the developer was looking at will pass over
exactly this. Build 97 carries a six-assertion block that loads the catalog with Shifts closed and
checks the other five renders are alive.

**Related, same family:** [303 · FAST-1] shipped bytes that were unreachable; [88] shipped a page
whose every click threw. All three passed their suites. The common thread is a gate that measured
the thing the author was thinking about and nothing around it.


## §106 — THE FOUR GOVERNING FILES, AND WHO JUDGES CONTEXT — 25 Aug 2026

**Owner, verbatim:** *"The files that drive all my work are my decisions, todo, handoff, and
starthere. My primary goal right now is to ensure those are continuously in the best shape
possible because everything stems from them. I don't want completed work or archived work to get
in the way, so part of the process must be self cleaning those files… I also want all sessions to
be better aware of the context history getting too long… I want there to be a defined closing
process for each session that ensures a complete handoff for the new session without loss of
information."*

**THE RULE, in four lines.** It got long before it got short; see the withdrawn drafts at the end.

**① THE FOUR FILES STAY LEAN, CONTINUOUSLY.** Shipped work leaves `TODO.md` as its `BUILD-LOG.md`
row is written; an entry leaves `HANDOFF.md` when a fresh session would no longer do anything
wrong without it; `START-HERE.md` is the file he PASTES, so every line in it is a tax on every
session forever — **it has its own tripwire at 700 lines** (ruled 25 Aug, lower than the other
two for that reason), **and a rule not needed in months moves to `START-HERE-ARCHIVE.md` rather
than staying in the paste.** Procedure and tripwires: `HANDOFF.md`, the MAINTAINING section.
**`DECISIONS.md` is exempt — a register only grows.**

**② HE JUDGES CONTEXT. CLAUDE REPORTS THE READING.** *"I can usually tell when there is rot."*
He can, and this session proved it: **every threshold Claude invented was wrong, and every one of
his three corrections was right.** So there is NO threshold, no traffic light, no gate. At a
build boundary Claude states the reading and that the window is uncalibrated. He calls it.

**③ THE ONE THING HE CANNOT SEE, CLAUDE VOLUNTEERS.** His test is the output, and the prose stays
fluent long after the reliability goes — §4's oldest warning is that a claim about code that was
not re-read sounds exactly as confident as a verified one. So the BEHAVIOURAL tells get reported
the moment they appear, whatever the reading says: asserting without re-reading, re-deriving
something already settled, losing the thread. **And a compaction is announced in the first
sentence of the next turn.**

**④ SUBAGENTS READ, THE SESSION DECIDES.** A subagent has its own context window, so reading is
nearly free and only judgement is expensive — a million-token audit is forty windows, never one.
Delegate surveying, locating, counting. **Never delegate the edit, or any claim acted on as
fact** — a subagent's report is a précis, the same second-hand thing a compaction summary is, so
it is a POINTER TO VERIFY. The session re-reads those exact lines off disk before touching them.
**The four governing files are never edited by a subagent.**

**⭐ DELEGATE TO FIND, AND TO REFUTE; NEVER TO CONCLUDE** — added 25 Aug on the owner's question,
*"does having sub agents do the reading help with both session integrity and token use or just
token use?"* **The honest answer: mostly token use. The integrity gain is real but it comes from
INDEPENDENCE, not from delegation.** A subagent has no stake in the hypothesis it is checking.
That day one was sent to re-run a bisect Claude had already written *"proven by execution"* on
and filed into `BUILD-LOG.md`; it came back and refuted him. **That is not a token saving — it is
the only reason a false claim did not stand.** Being a separate context is what made disagreement
possible.

**So, standing practice: send a skeptic after Claude's OWN conclusions as a matter of course**,
not only when something smells wrong — the adversarial shape RA-4 and RA-5 used on findings,
turned on the session's own claims. Record for the day it is doubted: six surveys ran that day,
none returned a wrong fact, and the one wrong identifier that reached a suite was Claude's own,
invented while writing the patch, which failed loudly when run.

**The cost is unchanged: a subagent's report is a précis** — structurally the same second-hand
thing a compaction summary is. Every returned line number, identifier and quotation is a POINTER
TO VERIFY off disk before it is acted on.

**AND THE REAL DEFENCE IS NONE OF THE ABOVE: it is filing as you go**, which was always the rule.
A ruling reaches `DECISIONS.md` in the turn it is said. If that holds, a compaction costs almost
nothing, because the next session reads files rather than a précis. The 25 Aug compaction hurt
because state was live in the chat — not because a number was exceeded.

### WHAT THE NUMBER IS NOT — corrected 25 Aug, on the owner's challenge

He asked whether token usage actually gauges context rot. **It does not.** Three different things
get called "tokens" and only one fills the window:

**① CONTEXT SIZE** — the prompt sent each request: system prompt + the whole conversation + every
tool result. **Only this causes a compaction**, and it is what the gauge below measures, exactly.
**② TOTAL SPEND** — every request billed, including output and thinking, and the growing context
re-sent each turn. **Subagents cost spend and add NOTHING to context** — which is why they are the
lever. **③ ROT** — degradation of reasoning quality.

**MODEL CHOICE MOVES ① AND ② DIFFERENTLY.** A more verbose model spends far more per turn, and
because its output is appended to the conversation, context also grows FASTER — the wall arrives
after fewer builds. But spend and context size are different numbers and must never be quoted for
each other: a session can burn enormous spend with a small context, and the reverse.

**AND SIZE IS A POOR PROXY FOR ROT, which is the part to internalise.** Size measures distance to
the wall. Quality degrades on things size cannot see:
· **What is IN the context, not how much.** That session's own context held three withdrawn
  versions of the same threshold rule — rot-producing content at any size.
· **Contradiction and supersession.** Where a fact exists in two versions, the odds of citing the
  stale one rise. That is exactly how the *"proven by execution"* claim happened.
· **Distance from the evidence.** A fact read 200k ago and never re-verified is riskier than one
  read 10k ago, at ANY total size.
· **A compaction** is a step change in rot with no change in size at all.

**So: gauge the WALL with the number, and gauge ROT by behaviour** — §4's tells, plus one question
that beats any token count: **when did I last re-read the thing I am about to assert?**

### THE GAUGE — a number, for reporting, not for blocking

Cloud container only: the last `usage` block in
`/root/.claude/projects/-home-claude/$CLAUDE_CODE_SESSION_ID.jsonl` —
**`input_tokens + cache_creation_input_tokens + cache_read_input_tokens` IS the context**, to the
token. Auto-compaction fires at **`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80`** — 80% of a window whose
size the environment does not expose. **Measured floor: the window is above 553,000** (442,834 ÷ 0.80, measured at the close of
25 Aug after a full re-grounding, three builds shipped with their suites, both batteries run
several times over, five subagent surveys and an archive pass across four documents — with no
compaction at any point). Earlier floors from the same session were 209,000, then 251,000, then
288,000; **every one of them was quoted while it was already wrong.** The honest reading is that
this session never found the ceiling, so the number below is a FLOOR and nothing else. The true
figure is settled the first time a compaction is observed — that reading ÷ 0.80 — and not before.

### WITHDRAWN, KEPT SO NOBODY RE-DERIVES THEM

Two drafts died the same day. **Absolute tokens** (80k start / 130k stop) — overruled: *"I think
we are still being too strict. I've had successful sessions with longer start files and multiple
builds."* **Percentages of the window** (55/70/75) — overruled: *"I still think this session feels
fresh."* Both were limits invented from an unmeasured assumption and then defended.
**The lesson is the one that generalises: state the measurement, not a verdict dressed as one.**

## §107 — SCHEDULE BUILDING RESUMES. THE AUCTION DOES NOT — 25 Aug 2026

Owner, closing out the housekeeping session: **"Then we proceed with schedule builds."**

**The total stop of 25 Aug (*"stop building entirely"*) is LIFTED FOR THE SCHEDULE.** Three
things it does not do, written down because a lifted freeze is exactly when they get assumed away:

**① §92 IS UNTOUCHED — the auction code stays closed.** No change to anything
`vacation-kp.github.io` serves — staff, admin, mobile, `crna/`, `versions.json`, or
`firestore.rules` — without a specific decision from him FOR THAT CHANGE. Reading it is still
required: the isolation guard and the full auction battery run after schedule builds as before.

**② §0 RULE 2 IS UNTOUCHED.** A queue item is not a "go". Each build is planned, shown, and waits
for his word. He lifted a stop; he did not hand over the order of work, and he never has.

**③ THE ORDER IS ALREADY ARGUED in `TODO.md` §1, and it is not Claude's to re-rank.** The
collapse work leads it on evidence — he raised clutter three separate times, in three different
wordings, while trying to use the site — ahead of §102's pools. Stage 5 stays on hold.

## §108 — THE NAME IS **QUOTA**, AND IT IS ITS OWN SET — 25 Aug 2026

Owner, ruling the question §102 left open: **"Let's go with quota and this will be its own
separate set for times when a variety shifts contribute to the same quota for a day."**

**① THE WORD IS "QUOTA".** A quota is a named set of SHIFTS that share one combined staffing
total for a day. Chosen because every neighbouring word was already taken — checked in the code,
not recalled: **group** is a set of PEOPLE (§97), **pool** is the FAIRNESS pool (§26/§43, 71
occurrences), **block** is the eligibility block list, **family** is the colour/ordering grouping.
⚠️ **"Shift pool" is RETIRED as a term** — Claude used it loosely for two days, including in
§102's own heading. Where it appears in older notes it means this.

**② IT IS ITS OWN SET — NOT hung on `family`.** His reason is the one family cannot serve: **a
variety of shifts contribute to the same quota**, and a shift carries exactly one `family`, which
also drives its colour and ordering. So a family-based quota would always follow the colours and
could never span them. A quota is a separate named thing with its own membership.

**③ WHAT THIS DECIDES, and what it deliberately does not.** Settled: the word, and that quota
membership is independent of family. **STILL OPEN, and it must be asked before the data shape is
fixed: may ONE shift belong to TWO quotas?** The storage is nearly free either way; the ENGINE is
not — if a shift sits in two quotas, auto-populate and the coverage readout need a rule for which
total governs. **Do not guess at it (§22).**

**④ ALREADY RULED AND UNCHANGED (§102):** auto-populate fills to **MIN** · **MAX is an indicator,
never a refusal** · **at-min-below-max is an acceptable state**, so coverage needs a third reading
(*covered · could take more*), not a binary.

**⑤ THE TRAP THAT SURVIVES THIS RULING.** A per-shift `capacity` field already exists and its own
tooltip reads *"How many people can hold this shift on the same day"* — a maximum in all but name,
read today only as the auto-populate fallback. A separate per-shift max beside it would be **two
fields meaning the same thing**, which is the build-78 defect shape exactly. **The range should
absorb `capacity` rather than sit next to it.** That is a migration, and the schedule having no
users is why it is cheap this week (§99).

## §109 — A SHIFT MAY SIT IN TWO QUOTAS — 25 Aug 2026

Owner, answering the question §108 left open: **"A shift could sit in 2 quotas as you suggested."**

**So quota membership is MANY-TO-MANY.** A shift belongs to any number of quotas; a quota holds
any number of shifts. This is the answer that costs nothing in storage and changes the ENGINE.

**⚠️ AND IT CHANGES WHAT A QUOTA *IS*, which is the part to get right before code.** With overlap
allowed, two quotas can apply to the same shift on the same day — and the honest reading of his
own framing (*"broader guiding rules that always apply"*) is that they do not COMPETE, they both
hold. **A quota stops being a number attached to a set and becomes a CONSTRAINT.** Several
constraints over the same day is the shape of Stage 5, the rules engine, which he has on hold.

**That does not mean quotas wait for Stage 5** — but it does mean the first build must not
pretend to solve constraints it cannot. The split proposed to him, and not yet ruled:
· **Quotas as READOUTS first** — the set, its daily total, and a per-quota report of met / short /
  could-take-more. Auto-populate keeps targeting each shift's own MIN and does NOT try to satisfy
  several quotas at once. Consistent with §102's *"MAX is an indicator, never a refusal."*
· **True multi-constraint filling waits for Stage 5**, where a conflict report and a
  warn-and-override path already have to exist.

**Unchanged and still binding:** auto-populate fills to MIN · MAX indicates, never refuses ·
at-min-below-max is acceptable, so coverage needs a third reading · the per-shift range must
ABSORB the existing `capacity` field rather than sit beside it (§108 ⑤).

## §110 — STAGE 5 IS UNHELD, AND PER-ITEM APPROVAL IS RELAXED FOR ONE SESSION — 26 Aug 2026

Owner, opening the session, verbatim and unedited:

> *"Go with stage 5 and continue as you can with any of the other items that fold into it. I
> would like to clear this list of outstanding items in this session with as little prompting
> from me as possible. I am trying to wrap up this first complete build of the schedule site."*

**① THE HOLD ON STAGE 5 IS LIFTED.** His 25 Aug *"hold for now"* is spent. The rules engine is
in build, following the plan already parked in `TODO.md` §1 — one thin vertical slice, **Minimum
rest**, end to end — which is not re-derived because he asked for it not to be.

**② §0 RULE 2 IS RELAXED, FOR THIS SESSION ONLY, AND HE IS THE ONE WHO RELAXED IT.** The standing
order is plan → show → WAIT, per change (§107 ②). *"As little prompting from me as possible"* is
an explicit instruction to stop waiting, so plans are stated in the chat and executed in the same
turn. **This does not survive the session.** The next session plans and waits again, and nothing
here is precedent for assuming a general "go" — that assumption is the exact thing §107 ② was
written to stop.

**③ WHAT IS NOT RELAXED, AND THIS IS THE HALF THAT MATTERS.** He relaxed the *approval* gate. He
did not touch a single *quality* gate, and reading it that way would be the worst possible
misreading of a request to go faster:

· **§92 stands — the auction code stays closed.** He said "schedule site". Nothing in
  `vacation-kp.github.io` moves, `firestore.rules` included. If schedule work needs a rules
  change, it stops and he is asked, exactly as before.
· **Every build still ships a suite that EXECUTES real extracted code, plus an honesty check
  that FAILS on the previous build** (§3 rule 3), and the new suite is registered in
  `sched/run-all.mjs` in the same turn it is written.
· **Every build still ships something that DRIVES it** (§3 rule 9) — a page of controls with a
  green suite over the top and every click throwing is what build 88 and FAST-1 both did.
· **Surgical edits only** (§0 rule 3). "Go faster" is not "rewrite the file".
· **The paperwork still lands in the same turn** — `BUILD-LOG.md` row, `COMMIT-MESSAGE.txt`,
  the combined `COMMIT-MESSAGES.txt` to outputs, `TODO.md` status.

**④ AND HE STILL GETS ASKED WHEN THE ANSWER IS GENUINELY HIS.** §0 rule 4 is a quality gate, not
an approval gate. *"As little prompting as possible"* means do not ask what the code or the
register already answers (§3 rule 14: **check, then ask**) — it does not mean guess at a design
question he has never ruled on. Those are batched into ONE interruption at the top of the
session rather than dribbled out one at a time.

**⑤ "THIS FIRST COMPLETE BUILD" NAMES THE FINISH LINE.** The target is the schedule site whole
enough to be driven end to end, not a longer feature list. Where an item on the wind-down list
turns out to be bigger than the session, it is reported as unfinished with what is left — never
half-built and reported as done.

## §111 — RULES CARRY THREE SEVERITIES, AND MONTHLY CAPS ARE A RULE TYPE — 26 Aug 2026

Two questions Stage 5 could not be built without. Both were flagged as must-ask in `TODO.md`
and in `design/RULES.md`; both are now answered.

**① SEVERITY: THREE LEVELS, AS DESIGNED.** Owner chose *Serious / Warn / Note* over a flat
single level and over a two-level cut. `design/RULES.md`'s table is therefore the spec and is
built as written:

| severity | in the report | at the moment of the change |
|---|---|---|
| **Serious** | top, red | a confirmation that names the rule and requires a deliberate yes |
| **Warn** | middle, amber | named in the ordinary confirmation |
| **Note** | bottom, grey | listed, not raised |

**SEVERITY IS NEVER A VETO, AND THAT IS NOT NEGOTIABLE BY THE SEVERITY FIELD.** §4 governs:
*"Safety checks warn and let you override. Nothing is hard-blocked."* Serious buys a louder
confirmation and the top of the report. It does not buy a refusal, and a later build that makes
Serious block is reversing a ruling, not tightening one.

**The argument for three, which is the reason it was recommended:** the report is the artefact
people will actually live in, and a report where every row shouts equally is a report you learn
to scroll past. Severity is what keeps a forty-row month readable. The cost is one dropdown when
a rule is created.

**② PER-PERSON CAPS ARE IN SCOPE, AS A RULE TYPE.** §21 deferred them — *"NOT wanted yet —
shift demand only, revisit once the Rules section exists"* — and named this exact moment as
where to revisit. Owner: build it. It lands as the **Not more than** type — *no more than N of
tag X per week or per month* — which is where `design/RULES.md` already put it.

**⚠️ IT POINTS AT A TAG, NEVER AT `kind`.** §25 retired `kind:'day'|'call'` as the basis for
rules, fairness and reports. §27 is the reason and it is a real shift, not a hypothetical: **Eye
Call** is named "call", runs 07:30–15:30, and belongs to no overnight-call tag at all. A cap
written against `kind` would count it as call and be wrong on the first month it ran.

**③ THE ORDER, AND WHY IT IS TWO BUILDS RATHER THAN ONE.** Minimum rest ships first and alone,
because it is the slice that forces every architectural decision into the open — the rule frame,
the target model, the checker, the report. Caps then go on top of a frame that is already
proven, and if caps break something the frame is not a suspect. Both types in one build would
make any regression impossible to attribute, which is the same reasoning build 52 used when it
refused to change storage and policy in one go.

## §112 — THE THREE 26 Aug CHOICES: THE WIDENING STANDS, THE TWO LIMITS ARE ACCEPTED — 26 Aug 2026

Three things were put to him as HIS call rather than Claude's, after builds 105–107 were filed.
His answer, verbatim and in full: **"1 - good.  2 - ok, 3 - ok"**.

**① THE 107 WIDENING STANDS.** His original spec said *"a weekly option for Richmond"*. Build 107
offers the weekly option for **every site**, because sites are DATA (`siteList()`, seeded
Oakland/Richmond by §18) and a site name baked into a control breaks the day one is renamed.
Claude flagged it as a widening rather than shipping it quietly; he approved it. **The print page
does not special-case any site, and a future build must not add one back.**

**② THE WEEKLY-CAP LIMIT IS ACCEPTED AS IT STANDS.** A *Not more than … per week* rule counts a
month's first week from the 1st when the 1st is not a Sunday, because the checker is handed ONE
month. **It says so on screen**; it does not silently under-count. He accepted that rather than
paying for the fix now. **The fix, if it is ever wanted, is reading the adjacent month in the
checker — it is not a change to the rule shape.** Recorded so nobody "discovers" it later as a
defect: it is a known, disclosed, accepted limit.

**③ QUOTAS AS CONSTRAINTS STAYS OPEN, KNOWINGLY.** §109 established that two quotas over one
shift on one day both hold, which makes a quota a CONSTRAINT rather than a number — and that
constraint-solving across several quotas at once, with a conflict report and warn-and-override,
is the fuller Stage 5 work. Quotas still **report only**, and auto-populate still targets each
shift's own minimum. He acknowledged this rather than pulling it forward. **It is outstanding,
not forgotten, and it is the largest single thing left in Stage 5.**

**WHY THIS IS FILED AT ALL, given two of the three answers were "ok".** An accepted limitation
that lives only in a chat becomes a bug report three weeks later, argued from memory by both
sides — which §3 rule 14 records as a thing that has already happened here. A disclosed limit is
only disclosed while it is written down.

## §113 — FOUR CHANGES HE ASKED FOR WHILE 108 WAS BUILDING — 26 Aug 2026

Sent mid-build, verbatim and unedited: **"Add to this build or the next one that the dropdown
menu control is needs to become more visible. Drop the the times on the printable daily/weekly
sheets. Have those sheets be 3 columns: shifts, Staff, Notes. Shifts should be 1/4 of the width,
Staff also 1/4. And notes 1/2."** All four shipped as build 109.

**① "THE DROPDOWN MENU CONTROL" WAS AMBIGUOUS AND WAS RESOLVED BY READING THE CODE, NOT BY
GUESSING (§3 rule 14: check, then ask).** There is no hamburger or collapsing menu on the page.
What there is: `.sel` and `.inp` sharing ONE style rule, so all 19 `<select>` controls were
pixel-identical to text inputs, distinguished only by the platform caret — which is nearly
invisible at that border weight. That is the one thing on the page matching his words, so that
is what was changed. **If he meant something else, this is the sentence to correct.**

**② TIMES LEAVE THE PAPER, NOT THE PRODUCT.** Shift times are still edited in the catalog, still
shown on screen, and still read by the Minimum rest rule type. Only the printed sheet drops them.
Recorded because "drop the times" could later be misread as a licence to remove the field.

**③ THE COLUMNS ARE HIS, INCLUDING THE WIDTHS: Shift ¼ · Staff ¼ · Notes ½.** Notes is empty by
design — it is space to write on, which is why it gets half the sheet.

**④ WHAT HE DID NOT SPECIFY, DECIDED AND FLAGGED: what a WEEK looks like now.** A three-column
sheet cannot also be a seven-column grid, so the weekly option became **seven daily sheets**
rather than one grid — which is the reading that makes a Notes column mean anything. The page
break moved onto a per-site wrapper, because breaking per day turns one week into twenty-one
pages. **His to overturn if he meant the grid to survive.**

## §114 — THE CALENDAR FEED IS APPROVED, AND VACATION IS PER DAY — 26 Aug 2026

**① THE GO.** Claude recommended building it with the finished `.ics` text stored per doctor and
the hosted endpoint reduced to a token lookup. Owner: **"i'm ok with this, proceed with what you
can."** Built as 110.

**② CLAUDE WAS WRONG ABOUT THE COST, AND HE CHALLENGED IT.** His words: *"i'm ok with some
additional cost. firestore seems generally quite cheap."* He was right. Checked against published
pricing rather than recalled: **$0.03 per 100,000 reads, 50,000 free per day** — even the naive
per-request shape is about fifty cents a month. **Leading with cost was a bad call and it is
recorded as one.** The real objections were always the security surface and the deploy path.

**③ WHY THE ENDPOINT IS EMPTY, AND WHAT MUST NEVER BE ADDED TO IT.** The argument for putting any
public endpoint on the project that runs the live auction is not "the code is careful" — it is
"there is nothing in it to get wrong". It names one document path, holds no schedule logic and
performs no query. **The moment it reads the schedule, or accepts a second path, or takes a
parameter that selects a document, it becomes a general-purpose Firestore reader with admin
credentials on a public URL.** Anything clever belongs in the admin page, where it is tested.
**This is a standing constraint on that file, not a note about its first version.**

**④ VACATION IS ONE EVENT PER DAY. OWNER RULING, OVERTURNING CLAUDE'S DESIGN.** His words:
**"vacation should be independent days, not 1 7-day block because sometimes docs trade single
days of vacation."**

Claude built the merged version first, arguing seven "Vacation" entries in a week read worse than
one. That was wrong twice over, and the second reason is the harder one: **a merged block's UID
must be keyed to the RUN's start date**, so trading one day out of the middle changes the run
boundaries, changes the UIDs, and leaves the old block sitting in the doctor's calendar as an
orphan that nothing will ever replace. Per-day events are keyed to their own date, so a traded
day simply stops being sent. **The suite proves it: give one day away and every surviving UID is
byte-identical.** Do not re-merge them for tidiness.

**⑤ WHAT IS STILL HIS, AND NEITHER IS WORKED AROUND.** `dailysched/feedTokens` must become
admin-only in `firestore.rules` before any doctor is told — the dailysched catch-all currently
lets any signed-in user read it, and a readable link list means any doctor can read any other
doctor's calendar. That file is closed by §92. And the endpoint is not deployed. §54's own
release gate is unchanged and still shut.

## §115 — NO MORE SECTIONS COLLAPSE. THE CONTROL GETS THE WORK INSTEAD — 26 Aug 2026

Owner, closing the last item on his own wind-down list: **"No need to collapse anymore sections.
Just style the collapse/expand like the vacation site to be more visible."**

**① THE THREE EXCEPTIONS ARE ACCEPTED, AND THE SWEEP IS OVER.** §104's collapse-by-default was
applied everywhere it was cheap; **Reports**, the **Simulator's Fill/Wipe** and **Stats** keep the
exemptions build 99 recorded, with their reasons. **§104 is not repealed — it stops acquiring new
ground.** A later build does not get to collapse something new by citing it.

**② THE COMPLAINT WAS THE CONTROL, NOT THE COVERAGE, and that is worth understanding.** Claude had
been treating "which sections collapse" as the open question. It was not. The control itself was a
**10px `--t3` arrow nine pixels wide**, on the thing he presses more than anything else on the
page — and the auction admin had solved it already, in its `.chev`: **"▸ Show" / "▾ Hide"**.
**An arrow tells you the STATE; a word tells you what pressing it will DO.** Shipped as 111.

**③ A PER-ITEM CARD KEEPS THE BARE ARROW.** One quota, one rule, one group — the disclosure sits
beside a NAME there, and "Show" once per card is noise. The keys already distinguish them
(`qta:`, `rul:`, `grp:`), so no markup changed.

**④ AND THE BUG THE CHANGE EXPOSED.** Static section bars were relabelled by `sectApply` only on a
TOGGLE, so each showed the raw markup arrow until its first click. **The moment a label is most
useful is before you have pressed it.** A boot sweep fixes it, and it is the kind of defect that
only surfaces when somebody changes what the label says.

**⑤ WHERE THIS LEAVES THE SCHEDULE.** The wind-down list he wrote on 26 Aug is now closed: Stage 5's
frame and two rule types, printable sheets, overnight call across years, the calendar feed's admin
half, and this. What remains is **Stage 5's real remainder** — quotas as constraints (§109), the
five unbuilt rule types, and the warn-at-the-moment-of-change path — plus the calendar feed's
**auto-refresh, parked by his instruction the same day** for a later session.

## §116 — THE VACATION SITE COMES FIRST AGAIN; THE SCHEDULE GOES ON THE BACK BURNER — 26 Aug 2026 (evening)

Owner, opening the evening session: **"I want to move back to some work on the vacation site and
put scheduling on the back burner. don't lose track of scheduling updates still needed. I want to
make some updates to my powerpoint that you helped me make."**

**① THE ORDER OF WORK IS HIS, AND IT HAS CHANGED.** Stage 5 was UNHELD on the morning of 26 Aug
(§110) and is now on the back burner the same evening. Not on hold in §110's sense — nothing is
forbidden — but it is not where the sessions go. **What is left of it stays exactly where it is:**
`TODO.md` §1's Stage 5 remainder (quotas as constraints §109, the five unbuilt rule types, the
warn-at-the-moment-of-change path, the feed's parked auto-refresh). His instruction is that the
list is NOT lost, and the record is the list, not the chat.

**② THIS DOES NOT LIFT §92.** "Work on the vacation site" is a direction, not a decision for any
one change. Every change to anything `vacation-kp.github.io` serves still needs his specific
decision for that change — and §0 rule 2's relaxation was for the 26 Aug daytime session only.

**③ THE WALKTHROUGH DECK IS REOPENED.** §87's "closed at rev 5" is superseded: he has edited the
deck himself since and is bringing that copy in. **His copy is the base** — nothing is built from
the rev4 in `tests/docs/` or from memory of rev 5.

## §117 — ADMIN BID ENTRY OBEYS THE TIMER RESET MODE; THE SIMULATOR DOES NOT — 26 Aug 2026 (evening)

Owner-found, testing mode 2: *"I entered some selections from admin site for users and the timer
would reset even when the bids didn't affect others"* — while the same bids from the staff site
behaved in both directions. The code agreed (TM-1): the staff page gates every reset through the
mode; the admin page's build-289 reset never read it.

**① THE DECISION: *"proceed with build."*** Admin 305: `_adminBidTimerReset` takes the before-picture
the alerts already build and applies the staff predicate — mode 1 always; mode 3 on any new bid,
else only if another user's projected outcome changed; mode 2 only on that change. The three
build-289 guards (timer on · not expired · not in the opening window) stand unchanged. This is the
specific §92 decision for that change and for nothing else.

**② THE SIMULATOR IS LEFT ALONE — his words: *"leave simulator alone, that won't matter in the real
auction."*** Its batch reset keeps the classic behaviour in every mode. Not a defect to re-raise.

## §118 — THE TWO CRNA SITES ARE SUSPENDED: 404 ON THE AIR, NOTHING LOST — 26 Aug 2026 (evening)

Owner: **"I want to temporarily suspend the links on the landing page for the 2 CRNA sites and i
don't want them visible to anyone, not even me for me. I would also like those 2 sites to 404 for
the time being since we are not going to use them for a bit… mark it down so that it's known
these sites exist, but are inactive."** Then: **"Bare 404 is what I want."** and **"Just remember
the site addresses in case I need them again."**

**① WHAT IS DONE.** `crna/` is removed from the auction repo, so GitHub Pages serves its plain 404
for both addresses — no custom page, by his choice. The two cards are gone from the landing page.
`crna-config.json` carries `"suspended": true`; while it does, `crna-stamp.mjs` refuses to write
and `test-crna-stamp.mjs` enforces ABSENCE (three files gone, stamper refusing, no landing link)
instead of drift. `test-appcheck-login.mjs` skips its CRNA rows aloud. The CRNA Firebase project
(`crna-vacation`), its rules, data and App Check are untouched.

**② THE ADDRESSES, so they are never lost:** `https://anesthesia-kp.github.io/vacation/crna/`
(staff) and `https://anesthesia-kp.github.io/vacation/crna/admin/` (admin). Firebase project
`crna-vacation`. Revival recipe: `TODO.md`, CRNA-SUSPENDED.

**③ WHY A FLAG AND NOT JUST A DELETE.** The CRNA pages are generated, and the guard that keeps
them honest runs the generator in place — a bare delete would have been undone by the next
battery run. The flag turns the same guard into the thing that keeps them absent.

## §119 — THE SCHEDULE COMES OFF THE BACK BURNER: FINISH WHAT IS LEFT — 28 Aug 2026

Owner, after closing the deck (*"Done with the ppt"*): **"I would like to move back to the
schedule site. Let's finish what's left there."**

**① §116's direction is reversed; nothing else in it moves.** Sessions go to the schedule again.
"What's left" is the list `TODO.md` §1 already carries — Stage 5's remainder (quotas as
constraints §109, the unbuilt rule types in `design/RULES.md`, the warn-at-the-moment-of-change
path), [103b], and the calendar feed's outstanding decisions — not a new list derived in chat.

**② §92 stands.** The auction code stays closed; the auction battery still re-runs after every
schedule build. **③ §0 rule 2 is NOT relaxed** — the 26 Aug daytime relaxation was for that
session only. Each build is planned, then waits for his go, and he sets the order.

**④ SCOPE AND ORDER, ruled the same turn.** "What's left" is **Stage 5 only** — the five unbuilt
rule types in `design/RULES.md`, the warn-at-the-moment-of-change path, quotas as constraints
(§109), and the two small gaps (the weekly cap's first week; the every-site weekly print option,
his to narrow). The roadmap's later stages (draft/publish, phone view, alerts, uniform
confirmations, swap atomicity) are NOT in this scope; they stay in `TODO.md` §3 as before.
**Order: the cheap rule types first** — Not on vacation, One site per day, Post-tag cooldown,
then Not together — then warn-at-change, then Fairness balance, then quotas as constraints.
Each is its own gated build; a general go on the order is not a go on any one build.

## §120 — "KEEP GOING WITH EVERYTHING YOU CAN DO" — the 28 Aug session runs on Claude's decisions — 28 Aug 2026

Owner, after the build-112 plan asked one question: **"I don't have a lot of time to work on this
site and I want to complete the schedule build work. Keep going with everything you can do, I
authorize you to make decisions to improve the site as long as it doesn't disturb the vacation
site."**

**① §0 rule 2 is RELAXED FOR THIS SESSION, as §110 relaxed it on 26 Aug** — plans are stated
and executed without a per-build go, and design questions that would otherwise stop for him are
decided by Claude and RECORDED here, one line each, so he can reverse any of them. No quality
gate moves: every build still ships its suite, its honesty check, its battery runs and its row.
**② §92 STANDS IN FULL.** "Doesn't disturb the vacation site" is the boundary: no byte the
auction serves changes, and the auction battery plus the isolation guard run after every build.
**③ Scope is §119 ④** — Stage 5's remainder — not the later roadmap stages.

**DECISIONS TAKEN UNDER THIS AUTHORITY (appended as they are made):**
· **One site per day is a RULE TYPE the admin creates once**, not an always-on check — consistent
  with §11 and it gives him the severity knob. `design/RULES.md`'s "universal" is superseded.
· **The vacation predicate is ONE helper** shared by `assignmentWarnings` and the new rule (§19).
· **The every-site weekly print option stays** — he did not narrow it when asked.
· Owner, mid-session: **"make good decisions for what a complex physician staffing website needs
  to do. We can fix problems later."** — the standard for the decisions above and below is the
  needs of a real physician staffing operation, not the narrowest reading of a note.
· **Post-tag cooldown counts its window from the day the trigger STARTS** (a 24-hour call on
  Monday makes Tuesday day one) and offers "any shift at all" as the default thing to avoid.
· **§7's approved-pairs list is a RULE INSTANCE (`Only approved pairs`)** holding the tick list
  as its one parameter, beside a blunt `Not together`. An empty list reports every two-shift
  day and says why.
· **Warn-at-change reports the DIFFERENCE** between the month as it stands and with the change
  applied; on a month not open (approval paths hold one day) the spanning rules say so rather
  than reading the month — the read is a later cost decision (§2).
· **Fairness balance calls `buildModel`** (§29's maths) and reports UNDER as well as over.
· **The filler treats a ceiling as its own target** (for a person it stays an indicator, §108)
  and prefers a shift that does not tip another quota over its total.
· **A rule with a note is no longer labelled "not checking anything"** — the header reads
  ran/considered (a 106 defect, fixed in 116).
· **NOT done, recorded as left:** the weekly cap's first week and the cooldown's last days
  still see one month (the checker is handed one); reading the adjacent month is a read-cost
  decision for him. The every-site weekly print option stays.

**RESULT, same session: Stage 5 is COMPLETE as designed** — builds 112–117, all seven rule
types in `design/RULES.md`, the warn-at-change path, and quotas as constraints.

## §121 — THE §120 DECISIONS REVIEWED: two changed, the rest accepted — 28 Aug 2026

Owner, after pushing 112–117 and reading the list: **"change 1 to something i can turn on/off and
check for site clashes. 2-ok, 3-good, 4- any shift going past midnight should be such that person
isn't given another shift on the post-call day. i want admin to be able to override this with a
confirmation dialogue when necessary, but the engine shouldn't create it. 6- good for now. 7-good.
8- good. 9-good. 10-good. for 6/10-no"**

**① ONE SITE PER DAY becomes a BUILT-IN CHECK WITH A SWITCH**, not a rule he has to create: on by
default, can be turned off, and while on it checks every person for site clashes — in the monthly
report and at the moment of a change. §120's first decision is reversed.
**② THE POST-CALL DAY IS BUILT IN, FROM THE CLOCK, NOT FROM A TAG.** Any shift that crosses
midnight makes the next calendar day a post-call day for that person: **the engine (auto-populate)
never places a shift there**, and **an admin may, through the confirmation dialog, with the override
recorded** — §4 unchanged. Also a switch, on by default. The tag-based *After a shift, avoid…* rule
type stays for anything beyond this.
**③ ACCEPTED AS DECIDED:** the one vacation predicate (2), the every-site weekly print option (3),
warn-at-change as the difference with the one-day honesty on unopened months (6, "good for now"),
fairness via `buildModel` reporting under as well as over (7), the filler's ceiling-as-target and
tip-over preference (8), the header fix (9), the one-month checker (10).
**④ NO READING OF ADJACENT MONTHS** — his "for 6/10 — no". The checker and the approval paths stay
one-month; the record of the gap stands. The year filler already holds the previous month in memory
and may use it for the post-call day; the month filler cannot see the last day of the month before,
and says so.

## §122 — THE COLLAPSE CONTROL, AGAIN: IDENTICAL TO THE VACATION SITE, AND VISIBLE — 28 Aug 2026

Owner: **"you also never fixed the problem with the expand/collapse arrows. I want them to be
identical to the vacay site and they need to be more visible. too hard to see currently."**

Build 111 (§115) styled the SECTION bars as Show/Hide pills and deliberately left the per-item
cards (a quota, a rule, a group) with the bare arrow. **That is not what he asked for.** Ruling:
**every collapse control on the schedule admin — section bars AND per-item cards — is the vacation
admin's control, copied not approximated** (the `.chev` "▸ Show" / "▾ Hide"), and it must be
visibly legible. Owner-found; outranks the queue (§3 rule 1). Build 119.

## §123 — THE SIMULATOR GOES; THE ENGINE GETS ITS OWN SECTION — 28 Aug 2026

Owner: **"I also want to get rid of the simulator, I don't need it. What I will need is a mechanism
to make the engine run and populate the staffing grid. This is a big part of the site and how all
shifts will be assigned. There must be a way for admin to assign shifts 1 at a time or multiple at a
time as well. The engine must follow all rules that are set. I want it to be clean and intuitive and
it will need it's own section in the sidebar."**

**① THE SIMULATOR PAGE IS RETIRED** — rehearsal mode, its banner and its Fill/Wipe framing (§45's
"testing tool" is over). Clear Month keeps a home and its confirmation (§3/§5).
**② A NEW SIDEBAR SECTION — the ENGINE** — is how shifts get assigned: run it for a month (or a
range), see what it will do before it writes, and let it populate the staffing grid.
**③ THE ENGINE FOLLOWS EVERY RULE THAT IS SET** — the built-ins and every admin-made rule, not only
staffing minimums, quotas and the post-call day. A placement that would break a rule is not made by
the engine; what it could not place is reported with the rule that stopped it. §4 unchanged: an admin
may still place anything, with the confirmation and the override recorded.
**④ MANUAL ASSIGNMENT LIVES THERE TOO** — one shift to one person, or several at once, from the
same section, through the same checker.
**⑤ "Clean and intuitive"** is the bar for the screen; the reasoning (what the engine will do and
why it declined) is shown, not buried. Build 120, after the collapse control (119).
**⑥ WHERE IT LIVES — owner, same turn: "This new feature and sim replacement can be filed under
Admin. Admin section should be moved up to be between users and setup."** So the engine is a page
in the ADMIN group of the sidebar, and the Admin group moves up to sit between Users and Setup.

**§120 ⑦ — EXTENDED FOR THE DAY (owner, 28 Aug, leaving): "i'll be gone all day. keep going with
everything that you can. i approve you making some decisions yourself in order to keep building.
ensure that all decisions are done with the goal of an intuitive, clean, functional physician
scheduling site."** The §120 authority runs through the day; the standard is his sentence. Every
decision is still listed under §120, one line each, reversible.

**§120 — DECISIONS APPENDED DURING BUILDS 118–120:**
· **Any severity stops the ENGINE.** Severity is how loudly a person is warned; it is not permission
  for a machine to break a rule he set. A Note-level rule still stops the engine.
· **The engine previews before it writes** (Preview → Apply) — a second press, never a blind run;
  a plan for another month is refused.
· **The 1st of the month is unguarded for the post-call day in the month filler** (§121 ④ — no
  reading of adjacent months); the year filler guards it from its own cache. Said, not hidden.
· **Assign by hand is capped at two months per batch** and reads a day outside the open month once.
· **The Rules page's "no rules yet" hint speaks of rules of his own** above the built-in cards.
· **Draft/published is ONE field on the month document, and ABSENT MEANS PUBLISHED** (build 121 /
  staff 38, §5) — no migration, nothing disappears from staff on deploy. The staff gate is in the
  page; enforcing it in `firestore.rules` is an auction deploy and his call (§92).
· **Publishing names the standing rule violations and does not clear them** — a report, not a gate.
· **The change feed is fed from `mutateCell`, the one assignment writer** (build 122 / staff 39,
  §6), plus the engine, publish and clear. Only published months emit. The staff query is filtered
  to the person; a rules-level read restriction on `dailysched/changes` is an auction deploy (§92).
· **In-grid marks (124) read the same `checkMonth` as the report** — one checker, two views;
  marks follow rule changes; a report row goes to its day on the grid.
· **A swap commits in ONE transaction (123)** — status and every leg, or nothing; a failed commit
  is a toast and the swap stays pending.
· **Request types (125 / staff 40) follow `design/REQUEST-TYPES.md` to the letter** — the standard
  list is 26 (Use PTO if off is a modifier); a work request over several shifts is resolved by the
  admin on the queue row; the four built-in choices stand while the list is empty.
· **The engine reads APPROVED requests only (126)** — avoid excludes, work and available come first,
  a person who asked for another shift is left free for it, and a rule still beats a request.

## §124 — THE POST-WAVE AUDIT: RA-6, MULTI-AGENT, ADVERSARIAL, WITH A VISUAL REVIEW — 28 Aug 2026 (night)

Owner, on Claude's recommendation to audit builds 118–126 before building more: **"I like it. I expect
there will be many problems and a good audit is important. include a review of the visual
presentations across the entire site. The goal is clean, organized, and intuitive. Present ideas for
improvements that get me there. Ensure functionality. I expect you will find a lot."** He asked whether
it would be one Claude or several and whether it included an adversarial Claude; the answer was
several by subsystem, with a separate verifier per report, and he said **"Go."**

**① THE SHAPE OF AN AUDIT, FROM NOW ON:** subsystem auditors → an independent adversarial verifier
per report, executing findings against the real page in the fake-Firebase rig → a visual pass. A
finding unverified is not a finding. **② THE VISUAL STANDARD IS HIS THREE WORDS — clean, organized,
intuitive** — and improvement ideas are PRESENTED to him, never applied unasked. **③ RA-6 is filed at
`tests/docs/RA-6-2026-08-28.md`** with its evidence under `tests/docs/RA-6-shots/`. Its Tier 1 is the
queue in `TODO.md` §1; nothing in it is picked up without his go (§0 rule 2 governs again), and every
rules item in it is his §92 decision.

## §125 — THE RA-6 ORDER IS CLAUDE'S, AND THE SESSION RUNS ON IT — 28 Aug 2026 (night)

Owner, on the report: **"you decide best order and start please."** So: §0 rule 2 is relaxed for this
session the way §110 relaxed it — plans are stated and executed without a per-item go. The order:
**Stage 0** (the isolation guard and the runner — `tests` only, no shipped code) → **Stage 1** as
schedule builds 127+, one gated build each (E-1 with E-11/N-5; E-2; E-7; R-1/R-2) → **Stage 2**.
**NOT under this ruling:** Stage 4 (schedule code that writes auction roster data — B-2, B-7) and
Stage 5 (`firestore.rules`) — each needs his specific go, §92 unchanged. Every build still ships its
suite, an honesty check FAILING on the previous build, and both batteries.

## §126 — "GO WITH ALL ITEMS THAT YOU CAN" — the 29 Aug session runs on Claude's order — 29 Aug 2026

Owner, at session open: **"Please go with all items that you can. i grant you authority to press ahead
with the needed fixes in your recommended order."** Read as §125 read §110: §0 rule 2 is relaxed for
THIS session — plans are stated and executed without a per-item go, in RA-6's remaining order:
**Stage 3** (N-9 first, then the blank-day labelling D-3/D-2/N-17/V-17/V-21) → the schedule-only half of
Stage 4 (B-3/B-4 — one vacation function for both pages, a visible banner when the data is denied) →
Tier 2/3 and the visual items Claude judges necessary. **"All items that you CAN" is read with §92 and
§125 intact:** B-2 and B-7 (the sanctioned roster writers) and Stage 5 (`firestore.rules`) are still
held for his specific go, one each — Claude prepares the plan and the rules text and asks, rather than
treating this sentence as that decision. Every build still ships its suite, an honesty check FAILING on
the previous build, and both batteries.

## §127 — ONLY ANNOUNCED VACATION REACHES THE SCHEDULE — 29 Aug 2026

Owner, reviewing the day's builds: **"schedule can only populate vacations approved once admin has sent
the e-mail results."** So a week is vacation, on EITHER schedule page, only once the auction has
announced it: a completed phase once its results were e-mailed (or a later phase completed), a
Phase-4 round once its results were e-mailed. A decision that is made but not yet e-mailed — a
completed phase awaiting its send, a closed round awaiting its send, anything in the live approvals
document — is not vacation to the schedule, for the admin as much as for staff. **This overrules
Claude's build-134 decision** (the admin saw every decided week); shipped as admin 138, and the
admin page no longer reads `vacations/approvals` at all.

## §128 — "GO AS YOU THINK BEST AND GROUP WHAT YOU CAN TO KEEP WORKING" — 29 Aug 2026 (afternoon)

Owner, in a fresh session after pushing the 29 Aug wave himself (live 13:36 PDT), having just read
Claude's list of what was still held — B-2, B-7, Stage 5: **"go as you think best and group what you
can to keep working. thanks."** Read as §126 read §110: §0 rule 2 is relaxed for THIS session, and
because the sentence answers a list that named B-2 and B-7 specifically, it IS the go for those two —
the sanctioned roster writers in the schedule admin (§1's exception), grouped where they share a
build. **It is NOT the §92 decision for Stage 5:** `firestore.rules` is served by the auction repo,
and §92 says a general go is never that decision. Claude prepares the rules text and the RA-2 plan
and asks. Every build still ships its suite, an honesty check FAILING on the previous build, and
both batteries; the isolation guard learns B-7's new write path in the same build.

## §129 — THE STAGE 5 RULES DEPLOY IS GO, "AS LONG AS IT'S VERY LOW RISK TO THE AUCTION SITE" — 29 Aug 2026 (afternoon)

Owner, mid-session, unprompted: **"We can do a firerules deploy as long as it's very low risk to the
auction site."** This is the §92 decision for Stage 5 (`firestore.rules`) — one deploy, with a
condition that Claude reads as a DESIGN CONSTRAINT, not a mood: **the change may touch only the
`dailysched` block. Not one byte of the `vacations` block changes**, and the diff proves it. The
schedule's staff page already fails closed (staff 44, N-9), so tightening `dailysched` reads cannot
open a draft. The gates: RA-2 on the new rules must pass in full, its new `dailysched` assertions
must FAIL on the current rules (`PRE_RULES=` the saved copy), and every existing `vacations`
assertion must be untouched in count and outcome. **He runs RA-2** (§6 exception). If the rules
cannot be changed that cleanly — if a `vacations` line must move for any reason — Claude stops and
says so rather than reading this sentence as cover. The console publish lands BEFORE any dependent
schedule code pushes (§2).

## §130 — "I'LL BE GONE FOR A WHILE. KEEP GOING WITH WHAT YOU CAN." — 29 Aug 2026 (afternoon, unattended)

Owner, leaving: **"i'll be gone for a while. keep going with what you can. i'm ok with you making some
decisions as long as auction isn't disturbed. rules okay if safe."** Read as: §128 continues through
the unattended stretch — Claude picks the order and makes the small decisions, each one written into
`TODO.md`'s "decisions to review" for him; §129 stands, with "safe" meaning what §129 already says
(only the `dailysched` block changes, RA-2 proves it, the pages go live first). What it does NOT
change: he does every push and every console paste, so "keep going" ends at a filed working tree
with `COMMIT-MESSAGES.txt` and the rules file in the outputs column; the auction code stays closed by
§92 (a general "auction isn't disturbed" is the constraint, not a licence); and §124's rule that
visual proposals are PRESENTED, never applied unasked, is a specific ruling that a general grant does
not override — the §7b items stay proposals.

**§129 — EXECUTED, 30 Aug 2026 ~03:20 UTC.** He pushed all four repos (`f561a43` schedule, `994c173`
tests, `28bae0c` rules, `6e2e53b` docs), schedule 141 / 48 were verified served twice, he ran RA-2
(current rules 136/136; honesty 46 of 46 Stage 5 gates red on `5994a1e`), then published the rules in
the console. The auction served 305 / 164 / 18 before and after — untouched.

## §131 — "MOVE AHEAD WITH ALL OF THOSE THAT YOU CAN" — THE REST OF RA-6 RUNS ON CLAUDE'S ORDER; THE VISUAL MENU IS OPENED — 30 Aug 2026 (evening)

Owner, opening the session: **"I'd like to continue with the audit's findings. Please move ahead with
all of those that you can fold into this session. I authorize you to make decisions on my behalf as
long as they are with the goal of optimizing the schedule site. I would very much like to work on
ideas on cleaning up the site and making it more visually appealing and clean. Are those ideas
already decided?"** Read as §126/§128 read: §0 rule 2 is relaxed for THIS session — RA-6's remaining
Tier 2/3 code items on the SCHEDULE ship in Claude's order, each small decision written into
`TODO.md`'s "decisions to review". What it does NOT change: §92 (the auction code, `firestore.rules`
included, stays closed — "optimizing the schedule site" is the scope, not a licence); he does every
push; every build ships its suite, an honesty check FAILING on the previous build, and both
batteries. **The §7b visual proposals were NOT decided** (§124 ②, §130): they are a menu, and his
sentence opens it — Claude presents the menu with a recommendation and builds what he picks; the
V-* DEFECTS (as opposed to proposals) are audit findings and fall under the general go.

## §132 — "GO AS YOU THINK BEST, THANKS" — THE VISUAL MENU IS CLAUDE'S TO ORDER TOO — 30 Aug 2026 (evening)

Claude presented the §7b menu with a recommendation (freeze the name column and date header; one
collapse behaviour and retire the yellow banners; holidays to the Rules side; Reports prose from the
live catalog) and flagged four larger items as his call (regrouping the admin navigation; a setup
checklist on the landing page; in-page confirmation dialogs; a phone layout for the staff Full
Schedule), pushing back on one ("what a plan would do to existing assignments"). Owner: **"go as you
think best, thanks."** Read as: the visual proposals join §131's grant — Claude orders them and builds
what it judges serves "clean, organized, intuitive", defects first, then the recommended four, then the
larger items as the session allows, each written into `TODO.md`'s "decisions to review". §92 unchanged;
he does every push; every build gated as before.

## §133 — THE SIDEBAR GROUPING STAYS; THE HEADINGS ARE PLAIN NOUNS — 30 Aug 2026 (late)

Shown the before/after of admin 146 (five groups: *Run the month · Decide · Look at it · Set it up ·
Records*), owner: **"I like the grouping, but I want less goofy titles."** The grouping is kept; the
headings become plain nouns — **Schedule · Approvals · Reporting · Setup · Records** — folded into the
still-unpushed 146. A heading names a thing, not an instruction to the reader.

## §134 — "CONTINUE WITH WHAT YOU CAN"; THE PHONE LAYOUT IS THE SAME PAGE, LIKE THE VACATION SITE — 30 Aug 2026 (late)

Owner, after the push of 142–146 / 49 and the list of what RA-6 still held: **"continue with what you
can."** Read as §131/§132 continuing — the unbuilt §7b items in Claude's order (in-page dialogs, then the
phone layout). Then, asked of the phone layout: **"Does the phone formatting use the same code and just
format correctly for phones? that's what i want, like the vacation site."** Ruling: **one page, one set
of code and data, reflowed by style rules for a narrow screen — never a second mobile page.** The
staff site already works this way (its `@media (max-width:700px)` block); the Full Schedule's
day-per-row phone view is built as another such rule on the same page.

## §135 — ON THE PHONE, NOTHING YOU HAVE TO SWIPE SIDEWAYS TO READ — 30 Aug 2026 (late)

Owner, seeing the phone screenshot: **"on the phone, there needs to be text where you need to swipe
left/right to read"** — then, correcting himself: **"I mean no text where you need to swipe."** Ruling:
on a narrow screen every panel of the staff site fits the width — nothing scrolls sideways and no text
sits off the right edge. Measured at 390 px on every tab: the one thing left that did was the tab strip
itself (725 px of tabs, "Changes" off the edge); it wraps now. Pinned by `staff50-test` on every panel.
Then: **"going to sleep. finish this build and then prepare to hand off all other tasks for a new
session."**

## §136 — THE CALENDAR FEED GOES LIVE: A RULES DEPLOY FOR ITS TWO DOCUMENTS' READS — 30 Aug 2026 (afternoon)

Asked what finishing the schedule site would take, and told the calendar feed needed three things — a
rules change under §92, a Cloud Functions deploy from his Terminal, and a three-row check in a browser —
owner: **"proceed"**, then **"rules and calendar"**, then, shown the exact two-line diff, **"go."** This
is the SPECIFIC §92 decision for that change and no other. Ruling: in the `dailysched` block only,
`dailysched/feedTokens` becomes readable by the schedule admin alone and `dailysched/feeds/items/*` by
no client at all (the endpoint reads it with server credentials); every other read is unchanged and the
`vacations` block is byte-identical (md5-checked). Found on the way: the Stage 5 rules had already made
both documents admin-only to WRITE, so `functions/DEPLOY.md`'s "not optional" item was half stale.
Verification is his: `RA-2.command` (fixture `28bae0c`, a one-change baseline). Then the deploy steps in
`schedule/functions/DEPLOY.md`, then the three-row check. **§54's release gate stays SHUT** — no doctor
is told until he says so — and the token question (who may regenerate one) is still his to rule.

## §137 — DELIVERING THE FEED: BOTH BY E-MAIL AND ON THE STAFF SITE; THE CALENDAR NEEDS AN OBVIOUS NAME — 30 Aug 2026 (afternoon)

After the feed was verified end to end (§136), owner: **"I will need a way to send all feeds to each user's
phone, probably using gmail"** — then, shown the two shapes (an e-mail per doctor through EmailJS with a
tap-to-subscribe link; the staff site showing each signed-in doctor their own link, which needs a §92 rules
change), **"I think we do both of these."** Ruling: both are built; the e-mail send stays behind §54's release
gate. Then, having subscribed himself: **"I don't know what the calendar is called. it needs an obvious name.
i'm worried now i'll confuse this testing schedule with my real work schedule on my phone."** Ruling: the
calendar carries an obvious name of its own on every phone, distinct from anything else he has. Neither is
built yet; the rules half of the staff-site link is a separate §92 decision when its diff is shown.

## §138 — THE CALENDAR IS NAMED "KP ANESTHESIA SCHEDULE" — 30 Aug 2026 (afternoon)

Shown 148's `KP Anesthesia — <Name>`, owner: **"KP Anesthesia Schedule is a good name. Can name be locked so it can
always be found?"** Ruling: the calendar's name is exactly **KP Anesthesia Schedule** (`TEST · ` in front while §54's
gate is shut). On "locked", the honest answer given: a feed SUGGESTS its name and a calendar app reads it when the
person subscribes, so every doctor sees it from the start — but nothing stops a person renaming it on their own phone,
and Apple's Calendar does not rename an existing subscription when the feed's name changes later. **Correction, dated
30 Aug:** 148's dialog said subscribed phones "pick the new name up at their next refresh" — not reliable; since nobody
but him is subscribed while the gate is shut, doctors subscribe fresh after it opens and he re-adds his own. Folded
into 148 before its push.

## §139 — THE LINK E-MAIL CARRIES PERFECT PHONE INSTRUCTIONS, iPHONE AND ANDROID — 30 Aug 2026 (afternoon)

Having subscribed on his own iPhone (Settings → Calendar → Accounts → Add Account → Other → Add Subscribed Calendar
worked; a Mac subscription had not reached the phone), owner: **"When we send an e-mail to users with this, we will
need perfect instructions for both iphones and androids that work flawlessly."** Ruling for the §137 e-mail build: the
message carries step-by-step instructions for iPhone and for Android, each verified on a real device before the gate
opens. Recorded with it, so nobody promises what a platform cannot do: iPhone can subscribe from a tapped `webcal://`
link; Android's Google Calendar app has NO subscribe-by-address on the phone — it is done once on calendar.google.com
(Other calendars → From URL) and then appears on the phone, and Google refreshes such feeds on its own schedule
(hours, not minutes). The instructions say so rather than pretending otherwise.

## §140 — UNPARK THE AUTO-REFRESH, WITH THE TIMESTAMP; THEN THE E-MAIL — 30 Aug 2026 (afternoon)

Comparing with QGenda ("autosync from qgenda" with a date/time in each event's notes), owner: **"unpark the
auto-refresh and then do email."** Ruling: the calendar feeds keep themselves fresh — the 26 Aug parking (feeds rebuilt
only on a click) is lifted — and each event carries "Auto-sync from KP Anesthesia Schedule · <date time>" in its notes;
that build comes first, the §137 e-mail (with §139's instructions) after it. Order of work is his; §92 unchanged.

## §141 — THE CALENDAR-FEED E-MAIL AND THE STAFF-SITE LINK ARE PARKED — 31 Aug 2026

Told build 150 was live and offered §137 B as the next build, owner: **"e-mail will need some work down the road.
not for now though. add to todo to recheck this"** — and, of the staff-site link half, **"add this to todo, for a
later date."** Ruling: the §137 A e-mail flow (shipped as admin 150) is not sent and not worked further now; it sits
on the TODO to RECHECK down the road, with the EmailJS subject-line check folded into that recheck. §137 B (each
doctor's own link on the staff site) stays ruled but waits for a later date of his choosing — no longer the queue's
next item. §54's gate stays shut; §92 unchanged.

## §142 — PUSH-ALL (AUCTION INCLUDED), THE SETUP CHECKLIST, AND D-7 ARE GO — 31 Aug 2026

Shown the parked pile with details, owner: **"go with push-all. include auction repo. fix setup-checklist landing
page as you describe. d-7 - go. s-7 and b-15 add to todo for later."** Rulings: PUSH-ALL.command is built WITH the
auction repo included — Claude's shape: the auction never rides along with a plain "y"; it always gets its own
separate typed confirmation inside the script, because pushing it deploys the live site (§92's spirit, §3 rule 5's
guards). The setup checklist ships as proposed (checklist replaces the coverage chip while most of the catalog has
no staffing rules). D-7 ships with a fallback so the page works before he creates the composite index in the
console. S-7 and B-15 stay on the TODO for later.

## §143 — AFTER THIS BATCH THE SCHEDULE IS HELD; BACK TO THE AUCTION — 31 Aug 2026

Mid-batch, owner: **"after that, all remaining schedule items will be held and i will move back to some work with
auction site."** Ruling: once the §142 batch lands, every remaining schedule item (S-7, B-15, §137 A recheck,
§137 B, the rest of TODO §1's schedule pile) is HELD — not picked up unasked, however good — and the next work is
auction-side, driven by him. §92 still requires his specific go for each auction change.

## §144 — PUSH-ALL IS DROPPED — 31 Aug 2026

First run, same day it was built (§142). Terminal git IS installed on the Mac — the 22 Aug note saying otherwise is
wrong, and the commit succeeded (`58833f4`, anesthesia). The PUSH failed: all four remotes are HTTPS and Terminal
git has no saved GitHub sign-in, so it prompted for a password GitHub no longer accepts. GitHub Desktop is
unaffected — it carries its own sign-in Terminal git cannot see. Offered the two fixes (the osxkeychain helper
first, a personal access token as the fallback), owner: **"forget this, i don't want to pursue this anymore."**
Ruling: PUSH-ALL is DROPPED. `tests/PUSH-ALL.command` stays on disk unused; do not fix it, do not re-propose it,
and do not raise the credential setup again. Pushing stays as it always was — GitHub Desktop, every repo, by him.
The §142 go for PUSH-ALL is spent; its other two items (setup checklist, D-7) shipped and are unaffected.

## §145 — THE CHROME-DRIVEN REHEARSAL IS ABANDONED — 31 Aug 2026

Owner asked for a complete test auction driven through Chrome control: reset, Phases 1–4 with three Phase-4
rounds (R1 Apr/May/Jun, R2 Jul/Aug/Sep, R3 Oct/Nov/Dec), 2 bids/user in P1, 4 in P2, 1 in P3 and each P4
round, auto-approve/deny, every button exercised, never-events checked, no e-mail to any user, no settings
changed. He answered the opening questions (dry-run the send dialog then Skip sending; cap P2 at the
configured allowance; never press Delete All Users / Full Restore / delete a backup; skip anything that
would cause trouble and record what was skipped), ran the pre-flight, signed in, and confirmed the CLOSING
reset was his. After four Chrome-extension disconnections he stopped it: **"forget it, this a waste of my
tine"**, then **"prepare handoff, i need a new session."**

Ruling: the live Chrome rehearsal is ABANDONED for this session. It is NOT declined as an idea — it remains
his final pre-launch check and he may ask for it again. Do not restart it unasked, and do not restart it at
all until the disconnection problem is understood (see HANDOFF).

What was actually established, and what a next session must not have to rediscover:
· The pre-flight PASSED on live build 305 (see HANDOFF for the recipe and result).
· **The two e-mail toggles do NOT gate admin-initiated sends** — a defect-class finding, recorded in TODO.
· The board was RESET (by him, typing RESET) and is empty; Rehearsal Mode is ON; whether Phase 1 was begun
  is UNVERIFIED because the connection died on that click. First job next session: verify and report it.
· Claude's share of the blame is recorded plainly in HANDOFF — two wrong diagnoses before testing, and a
  screenshot-free working mode that left him unable to see the work.

## §146 — THE AUCTION-BOARD QUEUE IS CLOSED; NOTHING FROM IT IS RE-RAISED — 31 Aug 2026

Shown the state of the board and the aborted rehearsal at the start of a fresh session, the owner ruled:
**"ignore all of these outstanding items, starting fresh"**, then **"mark them as complete without
suggesting we come back to them."**

Claude pushed back on the word *complete* and he accepted the correction: the rehearsal never ran and the
board was never verified, so a document reading "complete" beside "Rehearsal Mode must be OFF before launch"
would be taken by a later session as done. The items are therefore **CLOSED**, at his instruction, rather
than completed. He said go.

Ruling: the 🔴 block that stood at the top of `TODO.md` §1 — verifying whether Phase 1 was begun, the
Rehearsal Mode question, the abandoned Chrome rehearsal, the e-mail-switch finding and the smaller findings
from that run — is CLOSED. **Do not re-raise any of it, do not list it as outstanding, and do not suggest
returning to it.** This is the same principle as his 25 Aug ruling that launch and the sign-in test are his
own and are not to be put back on any list.

What survives, as record rather than as work:
· §145 and `HANDOFF.md` keep the full account of the aborted run, including the e-mail-switch finding.
· `TODO.md` keeps one line of live state — Rehearsal Mode was ON when the board was last seen — because that
  is a fact about the site, not a task. It carries no action and no suggestion.
· §146 touches nothing else. The calendar-feed section, the RA-6 remainder and the held schedule pile are
  unaffected and stay exactly as they are under §143.

## §147 — MERGE "DRAW" INTO "UNDER REVIEW": THE §92 GO, LABEL-ONLY, WITH A FOCUSED AUDIT — 31 Aug 2026

**This is the specific §92 decision the auction code requires.** It authorises this change and nothing else.

His problem: admin can face a draw where there is no real room for anyone to win, and **"users in a draw may
have more hope than users who are under review."** Confirmed in code — the tie test only asks whether ONE
tied person lands inside the FTE overage allowance, not whether the week has room, so a draw is normal on a
week already filled to the cap. The old wording made it worse: Draw promised a spin-off or approval *"will
resolve the tie"* where Under Review only said admin *"may"* approve.

**His rulings:**
· **Merge them into a single projection, "Under Review."**
· **LABEL-ONLY** — *"I like the idea of label only"*. The two internal sets stay; only what is displayed
  merges. The allocator is untouched, so who wins cannot change, and no data is written in a new shape, so
  the change is cleanly reversible by putting the old files back.
· **The final wording**, after several passes and with the second sentence cut by him:
  > **Under Review (R):** Your bid is over the FTE cap for this week and the projection is uncertain.
  The short form promises nothing, so it cannot over-promise — his own concern: *"I don't want to
  overpromise."* Accepted cost: nothing staff-facing mentions the wheel of names or says he may approve
  no one; he fields that question himself.
· **The surviving badge is R, in purple.** Amber retires from outcomes.
· **Staff are NOT told they are in a tie** — the board already lists every bidder on a week with their
  outcome letter, so several R's IS the tie, visible without being told.
· **The admin's "Draws & Reviews" section is renamed "Under Review."**
· **The Draws & Reviews panel's filter becomes "All / Ties (2+) / Single."** He first overruled this to
  "All / Under Review only", then asked where the filter was, was shown both filter locations, and reversed:
  *"You were right, go with this."* The three options map 1:1 onto the existing internal sets (ties = the
  draw set, single = the review set), so this is option text only — no logic change. Separately, the
  **Approvals/Denials** page's Outcome dropdown loses its two middle entries to one: All / WIN / UNDER
  REVIEW / LOSE / APPROVED / DENIED. That one is forced by the merge, not chosen.
· **The staff week line becomes one number** ("FTE under review: 2.4") rather than two; he did not object to
  Claude's stated choice.
· **ONE VOCABULARY EVERYWHERE, HISTORY INCLUDED.** *"Historical reports don't matter now… Don't edit past
  reports since they don't matter."* Clarified for him: a report is regenerated from the stored snapshot every
  time it is opened, so there is no past report to leave alone — making old phases keep the word DRAW would be
  EXTRA code (a phase-age special case) and would make the stray-"Draw" gate unwritable. So every view merges,
  reports and Excel exports included.
· **THE PRINCIPLE, IN HIS WORDS: *"Change in projected outcome still drives the timer and the e-mails."***
  This is option A stated as a rule rather than an exception, and it is the form to build and test against:
  the timer reset and the alert e-mail both follow the PROJECTED OUTCOME THE USER CAN SEE. If the displayed
  projection changes, the clock resets and the user is told; if it does not, neither happens. A tie forming or
  dissolving is no longer a change in the projection, so it drives nothing.
· **OPTION A ON THE TIMER — FINAL.** The bid timer's "did this affect anyone?" test and the alert e-mail
  share ONE function by design (`_changeAffectsOthers`, staff; its twin in the admin — the comment forbids
  them disagreeing). So the alert fix cannot be isolated: whatever the e-mail treats as a change, the clock
  treats as a change. He chose **B** first (*"since it could be relevant"*), then reversed to **A** —
  *"changed my mind. go with A"* — immediately after being told the two facts that made B's value thinner
  than it looked: the comparison can only ever distinguish ALONE from 2-OR-MORE (a 3-way group shrinking to
  a 2-way sends nothing, today and after), and the e-mail would have had to state the count out loud, which
  cuts against his own ruling that staff are not told about ties.
  **What A means, concretely and it is the ONE behavioural change in this build:** both the comparison and
  the alert run on the MERGED label, so when a tie forms or dissolves there is no e-mail AND no timer reset.
  In the timer mode the live auction uses, the clock therefore runs down sooner in that scenario than it does
  today. Accepted knowingly, twice explained.
· **A thorough audit of the change is authorised** — *"I agree with the big audit you mentioned."*

**AND A SCOPE RULING ON THAT AUDIT, verbatim: *"What I do not want this audit to do is find a bunch of less
meaningful and not very important other issues. keep it focused."*** The audit examines THIS change and its
uniformity. It is not a general defect hunt. Incidental findings outside the merge are not collected, not
listed, and not reported — if something genuinely serious is seen it is raised in one line and nothing more.
This is the same principle as his 11 Aug ruling that minor and cosmetic findings are deferred, applied to a
targeted audit.

Recorded for the record: Claude's earlier claim in this session that e-mails never name the outcome was
WRONG and was corrected — the per-bid alert prints *"changed from DRAW to REVIEW"*. Removing that
meaningless alert is now one of the merge's benefits, and mishandling it is its main trap.

## §148 — THE THREE MERGE QUESTIONS, ANSWERED WHILE 306/165 WAS BEING BUILT — 1 Sep 2026

Claude stopped mid-build and asked three questions §147 did not settle. All three are admin-only surfaces;
none of them touches the staff site or any e-mail.

· **The word "tie" survives on ADMIN screens. Owner: "2 - yes."** A few admin sentences describe a mechanism
  that genuinely differs for a tie and for a single over-cap bid (the auto-approve help text in two places,
  the FTE-overage setting, the "N tied" count on the wheel button, the auto-approve log lines). Those now read
  "ties" where they read "draws". This is not a second vocabulary: §147 already put **Ties (2+) / Single** in
  the panel filter, so "tie" was already the sanctioned admin word. **"Draw" appears nowhere on either site.**

· **The approve/deny dialog note stays TIE-ONLY. Owner: "3 - yes."** "User was in a DRAW — they will be
  notified when phase results are sent" becomes "User was in a tie — …" and fires in exactly the cases it
  fired in before. The alternative (showing it for every under-review person) would have been a SECOND
  behavioural change, and §147 says the timer/e-mail is the only one.

· **The dashboard's Weekly Summary table — asked, then overtaken by a finding.** Claude offered three shapes
  (two columns relabelled / one merged column / one column with ties marked), recommended the first, then
  **changed its own recommendation to the third on reflection** and said so: two columns wearing the same
  words is the old table with new labels, not a merge. Before the owner had to choose, the question dissolved —
  see the finding below. Built as the third shape.

**THE FINDING THAT DISSOLVED IT (raised in one line under §147's scope cap, NOT acted on):** the owner could
not find the table because **it is never displayed.** `#dashUsersWrap` and `#dashWeeklyWrap` are hard-coded
`display:none` and nothing anywhere switches them on; `#dashPhaseFilter` does not exist in the page at all;
and `window.exportDashboard` — the Excel/CSV/PDF export of that same table — has no caller. So the per-user
week cards, their legend, the Weekly Summary table and its export are all computed on every dashboard refresh
and shown to nobody. `renderOverview()` still runs and still does the work. **Whether to switch them on or
delete them is the owner's, another day.** They were merged anyway in 306: six lines, no user-visible effect,
and it lets the stray-"Draw" gate assert over the whole file instead of carving out an exception.

**Recorded, not acted on (§147's audit cap):** in `renderAppDenials`, a HISTORICAL row's projection pill can
read "proj: LOSE" for someone who was winning — `projPill`'s map has no `winning` key, and the snapshot branch
sets `proj='winning'`. Pre-existing on 305, unrelated to the merge, unchanged by it.

## §149 — THE RECORD OF BIDDING MUST BE COMPLETE AND TRUE: TWO DEFECTS, ONE BUILD (307) — 1 Sep 2026

**His finding, verbatim: *"there's an issue where the reports are showing a different history than User's
previous phase history does. It seems like reports are dropping many of the Denied bids altogether. These
reports must reflect every single bid that was placed by every user in each phase because this is what tracks
the record of bidding if we need to look back on something."*** Then, on the Approvals/Denials screen:
***"Also, this doesn't look right"*** — every historical row reading `proj: LOSE`.

**His go, verbatim: *"Go, here."*** This is the specific §92 decision authorising admin 307.

**His ruling that shaped the fix: *"A phase cannot close with undecided bids."*** Verified enforced at both
gates. The build therefore ASSERTS it rather than rendering a third row type.

**DEFECT A — every historical projection read LOSE.** The snapshot branch emitted `winning`/`losing`;
`projPill` keys on `win`/`lose`, and any miss fell into `m.lose`. So **"proj: WIN" was unreachable for every
historical row on both 305 and 306** — every past winner was shown as projected to lose. Fixed on both sides:
the caller emits the canonical tokens, and `projPill` accepts the `-ing` spellings so no future caller can
reintroduce the silent fallback.

**DEFECT B — the All-Phases report dropped every scrubbed bid.** §71's boundary scrub deletes a finished
phase's non-winning entries from the LIVE schedule; `bidsByWeekModel` read that live doc for scope `all`, so
those bids were invisible — and the "N bids · N approved" header counted the surviving rows, so the
denominator lied too. §71's own comment had promised *"the Reports … read the archives"*; Edit Selections was
fixed for that in 295, the reports never were. **Nothing was ever lost** — both `completedPhases[N]` and
`p4Rounds[N]` archive the full pre-scrub `schedule`, `approvals`, `denials` and `projections`.

**THE DESIGN CHOICE, and Claude took the low-risk side deliberately.** Rather than restructure the model's
source — a refactor of the live auction's most important reporting function — the fix APPENDS the rows the
live pass cannot see: entries in an archive that are a new bid for that phase and absent from the live
schedule. It cannot change any row that renders today; it can only add missing ones. Proven: `current` and
`phN` are byte-identical before and after, `all` gains exactly the scrubbed bid.

**A legacy archive holding decisions but no stored schedule** emits its rows with the bid value shown as an
explicit dash — the value is unrecoverable but the fact of the bid and its result are not, and silently
omitting it is the very failure being repaired.

**Recorded against Claude:** defect A was first raised, hours earlier, under §147's audit cap as one line
calling it *"cosmetic, on a history view."* Seeing the actual screen, that was an understatement — it was every
winning row on the main look-back surface. Claude said so and corrected it. The lesson is the one §3 rule 14
already states: a defect described from code is a hypothesis about what a human sees, and one screenshot
outranks it.

## §150 — THE LOOK-BACK SCREEN, TOO: APPROVALS/DENIALS SHOWS THE RECORD (308) — 1 Sep 2026

**§149 fixed the reports. It did not fix the screen beside them, and he found that within minutes.** His
messages, in order: ***"This is still useless"*** · ***"what's the point of filtering past phases if the data
doesn't appear?"*** · ***"Closed phases there show projections and not results. What's the point?"*** ·
***"That page is mostly used for current phase. But if Admin uses it to look back, it should show useful
results like the reports"*** · ***"Filter needs to look back at whatever admin selects"***. His go: **"B"**.

**SAME ROOT AS §149, ONE FUNCTION OVER.** `renderAppDenials` opens `for(const u in scheduleData)` — the LIVE
schedule, which §71's boundary scrub empties of every non-winning bid from a finished phase. So looking back
at a closed phase showed the survivors (the winners) and **not one denial** — on a page named
Approvals/Denials. **And a second defect on the same screen:** `outcome` was already read from the phase
archive, but the `approved`/`denied` FLAGS that decide whether the solid ✓/✕ chip renders were still asking
the LIVE decision docs, which a closed phase no longer answers for. So historical rows showed a PROJECTION and
no result — exactly what he said. Both fixed: the archive pass adds the missing rows for whatever phase is
selected, and a historical row derives its result flags from the archive, as the archived-round branch always
had.

**"B" NEEDED NO CODE, AND CLAUDE SAID SO RATHER THAN BUILDING IT.** He chose the page defaulting to the
current phase. `populatePhaseFilter` already does exactly that on a fresh load — it only stays on "All phases"
because it remembers the last choice within a session. Checking before building saved a change that would have
altered nothing (§3 rule 14).

**TWO THINGS CLAUDE GOT WRONG IN THIS EXCHANGE, both said at the time.** (1) §149 was declared done without
checking whether any OTHER surface read the same scrubbed source; it did. The sweep afterwards found all 19
readers of the live schedule and confirmed `renderAppDenials` was the only remaining live user-facing one —
that sweep should have come BEFORE calling §149 finished. (2) Claude offered him an A/B choice in which B
defeated the feature's purpose, then read his *"what's the point of filtering…"* as rejecting B when it was
aimed at the bug. He then chose B. Misreading a terse answer is cheap to fix and was; offering a bad option is
the part worth not repeating.


## §151 — A CLOSED PHASE SHOWS THE PROJECTION THAT WAS RECORDED (309) — 1 Sep 2026

**The question put to him, in one sentence:** for a phase that is already closed, which projection is
the true one — the one recorded when it closed, or a fresh recalculation under today's settings?

**His answer: the recorded one.** Chosen from four options, and he declined to bundle it with the
filter redesign, so 309 ships alone.

**Why it mattered enough to ask.** The reports already read the recorded value; the Approvals/Denials
screen recomputed it live from today's caps, FTE and threshold. Those agree only until a cap moves —
and `TODO.md` PHASE-4 EXTRA FTE has him raising the cap on 34 weeks by hand between Phases 3 and 4.
The defect was scheduled to fire on his own planned workflow.

**He also settled a related worry himself:** *"I don't use any old archives at all. Everything so far
has just been testing. Not live yet."* So the pre-build-295 fallback path is unreachable in practice.
It is kept as cheap insurance, not because anything will exercise it.

## §152 — GO ON THE REST OF THE AUDIT'S FINDINGS (310, 311, and a tests-only gate) — 1 Sep 2026

**His words: *"Also go on other items f1-f8 that need doing."*** Read as the §92 decision for each of
those changes, and the phrase *that need doing* honoured literally: **F-3 needed nothing** (it is the
recorded cost of his own option-A ruling, not a defect) and **F-5 had already been withdrawn** by the
audit itself. So the work was F-1, F-2, F-4, F-5b, F-6, F-7 and F-8.

**F-7 became HIS design, not the audit's.** Shown the finding, he proposed the fix: *"Should it say
filter instead of outcome and then be able to filter by outcome - approved/denied OR by projection -
win/lose/underreview?"* That is better than what had been planned — the audit was going to patch the
mismatch; he saw that the concept was wrong, because the screen holds two different kinds of answer
and the dropdown pretended it held one. Built as he described, with two groups under one control.

**Two corrections Claude made against itself during this work, recorded rather than smoothed over:**
· The first cut of F-5b's guard checked only `completedPhases` and would have refused a legitimate
  advance whose archive was still staged. The battery caught it. The guard now accepts published or
  staged. **The suite was right and the code was wrong; the code changed.**
· Asked whether a Phase-4 label must always carry a round, Claude first agreed *with a qualifier* —
  that Phase 4 could run without rounds. He pushed back: *"how can p4 run without rounds? when p4
  begins, it always starts with p4r1."* **He was right.** Beginning Phase 4 always sets `p4Round=1`;
  the `_roundsMode` flag Claude had read as a mode switch is really only "has any round been archived
  yet". The qualifier was withdrawn.


## §153 — THE PHASE-4 ROUND ROWS: FOUR OWNER-FOUND DEFECTS (312, 313) — 1 Sep 2026

**He found all four in one screenshot**, taken on a rehearsal that had completed all four phases
including three rounds in P4 — minutes after a focused adversarial audit of that very screen had
reported it clean. **RA-7's fixture had no rounds, and RA-7's own report named a round fixture as
the biggest gap it was leaving open.** The audit's Q4 answer ("no double-counting") should have been
scoped to phases out loud rather than reported flat; that is recorded as the miss it was.

**His go: *"pushed. keep going."*** — read as the §92 decision for D1–D4, stated as an inference at
the time so he could stop it.

**What he saw, in his words:** *"some of the phase labels in p4 don't show a round. I am given the
option to revoke decisions despite p4 being closed."*

**And the correction that settled the design.** Claude said Phase 4 could run without rounds; he
pushed back — *"how can p4 run without rounds? when p4 begins, it always starts with p4r1. then
round 2, 3, and so on."* **He was right.** `_commitBeginPhase` always sets `p4Round=1` when Phase 4
begins; the `_roundsMode` flag Claude had read as a mode switch is only "has any round been archived
yet". So **every P4 bid belongs to a round and a bare P4 label is always wrong** — which is what made
D1's fix unconditional rather than defensive, and what exposed D4.

**Built as 312** (D1 duplicate rows · D2 every round row reading `proj: LOSE` · D3 Revoke still
offered on a completed Phase 4) **and 313** (D4, the round-boundary gate that could be skipped by
never completing a round). Nothing else on the page was touched.


## §154 — SWEEP THE REST OF THE ROUND SURFACES (314) — 1 Sep 2026

**Asked what was next, he chose the sweep** over fixing the one known remaining audit item: point the
new Phase-4-rounds fixture at every other surface that touches rounds. Then, shown three confirmed
defects, **"Go on all three."**

**The reasoning offered, and why it held.** RA-7 declared the Approvals/Denials screen clean and he
found four defects in it within the hour — not bad luck, but the fact that nothing had ever exercised
the rounds paths. The first sweep with a fixture that does found three more (D5, D6, D7), each
confirmed by executing the real function rather than by reading it.

**D6 is the one that mattered most:** the Under Review page had no completed-phase gate at all, and
its ✕ Cancel button deletes a bid. It was reachable after the auction had ended and its results were
announced.

**Filed, not built (D8):** a round-decided bid still sitting in the live schedule takes its projection
from the live engine rather than from its round's archive — the F-9 family again, in the report's live
pass. Raised rather than folded in, because the go was for D5–D7.

## §155 — THE LAST TWO PROJECTION-SOURCE DEFECTS: D8 AND F-9b (315) — 1 Sep 2026

**His go, verbatim: *"go with both"*** — given when the session's opening report put D8 and F-9b in
front of him as the only two items still needing a specific §92 decision. That is the decision for
those two changes and for nothing else; §92 still closes the auction code.

**And a second go on the approach, before a line was written**, per §0 rule 2: the plan named the
file, the three call sites, the edge cases, the one judgment call and how each fix would be verified.
He answered **"go"**. Recorded because §0 rule 2 is the gate that was actually honoured here — the
§92 go authorised the WORK, the second go authorised the SHAPE.

**They were one mistake, in one function, three lines apart.** `bidsByWeekModel` — the model behind
the reports and the Excel/CSV/PDF exports — asked the wrong source for the projection of a bid
belonging to a closed phase or round. Build 309 had already taught the Approvals/Denials screen the
right rule; the reports never learned it, so the two screens could answer differently about the same
closed phase. **That divergence is exactly what F-9 existed to close, and it was only half closed.**

- **D8** — the archived-round branch read its RESULT from the round's archive and its PROJECTION from
  the LIVE engine. A bid decided in a completed round is still in the live schedule whenever no later
  round retires it, and the last round never does. Measured on 314: a bid its round recorded as
  *under review* printed as *winning*.
- **F-9b** — the closed-phase branch and the archive pass looked the recording up ONE WEEK AT A TIME
  and recomputed under today's caps whenever a week was absent. `serializeProjections` omits exactly
  the weeks that had no winner, tie or review, so *absent* means *nobody won* — not *no record*.
  **PHASE-4 EXTRA FTE has him raising 34 weeks by +1 between Phases 3 and 4, so it fires on his own
  planned workflow.** Measured on 314 at a raised cap: a closed phase whose recording names ONE
  winner reported FIVE, one of them a bid that phase had DENIED.

**THE JUDGMENT CALL, PUT TO HIM AND APPROVED.** In one unreachable case — a round archive holding no
recorded projections — the reports said *losing* where the screen recomputes. The fix makes the
reports match the screen. It touches nothing reachable: every archive since build 295 records
projections, and he has stated (1 Sep) that none of his archives predate that. Flagged in the plan
rather than slipped in, with the offer to leave it alone; he said go.

**What cannot happen as a result:** the change can only make a projection MORE conservative. It never
removes a recorded win from anyone, and it never touches a RESULT — only the projection beside it.

**Gates:** new `tests/test-315-recorded-projections.mjs`, 16 assertions over two real archives, with a
raised-cap invariance on each rather than a pinned value (§3 r16). Honesty on the pushed 314 (SHA
`3060a91`) **7 of 16 RED, exit 1**. Auction battery **65 suites / 2,257 assertions**, isolation 36/36,
and the every-button sweep run on BOTH builds — identical at 603/137/126 apart from three backup ids
carrying the run's own clock. **Said plainly: the sweep proves no regression and nothing about the
fixes; its fixture has no completed phase, so no archive pass fires inside it.**

## §156 — E1: THE EDIT SELECTIONS LOCK AND THE GUARD THAT WAS MISSING (316) — 1 Sep 2026

**His go: *"go"***, on the E1 finding as raised. Before it, *"keep going"* with the queue empty —
read as **not** a §92 go (a general "keep going" never is, §0 rule 2), so that turn was reading and
executing only. The audit produced the finding; the finding got its own go. That order is the point.

**TWO OF THE THREE UNSWEPT SURFACES WERE CLEAN, and are recorded as clean rather than as silence.**
The **capacity report** builds its winners as a Set unioned across every completed phase,
`p4RoundWinnersOn` and the live approvals, and carries no projection at all — so D1/D5's duplicate
class cannot occur there. Driven on the two-round fixture: the week won in Round 1 reports taken 1,
the week whose bid Round 2 denied reports taken 0. The **staff page** tests `biddingOpen()` and
`isAuctionClosed()` on every write path, at the moment of action. Neither needed anything.

**E1, on the third surface.** On a completed Phase 4 whose results were sent, a bid a round DENIED is
still in the live schedule. Its Edit Selections row offered two controls that disagreed with each
other: **Remove refused** (292's guard) and wrote nothing; **the priority dropdown beside it wrote six
times with no refusal.** The guard was on six handlers and absent from that one, and the row was never
marked historical because the test was `bidPh < cur` — **the same test D3 and D6 were about.**

**The measured consequence, and its honest limit.** A round denial binds only while the exact denied
bid is on the schedule (259, deliberately value-aware). So the write detached the bid from the round
that decided it — driven, the lookup went from *round 2* to *nothing*. **The archive was never
corrupted. What broke was the live schedule's link to it.** Said that way round because the stronger
claim would have been wrong.

**A NEAR-MISS WORTH THE RECORD.** Reading the render alone, the **Remove button** looked like the
defect — a delete offered on a finished auction. Reading the handler, it refuses correctly. The
finding only survived because both controls were DRIVEN. §3 rule 5 in its exact form: dialogs are
paint, guards at the moment of action are the enforcement — and it cuts both ways, because it is also
the reason not to report a paint-level observation as a data risk.

**THE FIX: three parts, on 292's precedent** (which fixed a row lock and a handler guard in one
build): 312's D3 rule for the row, the round's archive for the outcome pill, and the seventh copy of
the guard. **The gate that matters is the INVARIANCE** — an open phase must stay fully editable; a
lock that locks everything would pass every other assertion in the suite.

**§3 r12 + r16 — an existing suite re-anchored, and STRICTER.** `test-p4-rounds.mjs` pinned the
*number* of refusal sites, so a seventh turned it red for making the guarantee stronger. Worse, a
count stays green when a NEW unguarded handler appears — **which is exactly how E1 survived four
consecutive builds of round fixes.** It now checks all seven handlers by name.

## §157 — THE SUITES INDEX IS DECLINED; THE SCHEDULE STAYS PARKED — 1 Sep 2026

**His words: *"ignore suites index, don't care about that. keep schedule parked."*** Both are settled.

**THE SUITES INDEX IS DEAD. DO NOT RE-PROPOSE IT.** It was Claude's own idea (a one-line-per-suite file
so a `tests` commit can never be single-file, and GitHub Desktop can never pre-fill over the written
message), raised twice and backed by a clean controlled comparison on the 316 push. **He does not want
it. That ends it** — the evidence being good is not a reason to raise it a third time. Same standing as
BULK-1 and the auction-board queue: closed, not deferred.

**The consequence he is accepting, stated once here so nobody re-litigates it:** a `tests` commit that
adds exactly one suite file will keep losing its written message to Desktop's auto-text. The real
message survives in `tests/COMMIT-MESSAGE.txt` either way, which is the part that matters. Note it in a
handover if it comes up; do not propose a fix.

**The schedule stays PARKED** where §143 left it — S-7, B-15, the §137 e-mail recheck and staff-site
link, and the schedule's own sender address. Not picked up unasked.

**He also emptied `_to_delete/`** (his own housekeeping, on the standing measurement in the STATUS block).

**What he DID choose: the surface inventory (§158).**

## §158 — THE SURFACE INVENTORY: STOP FINDING THIS FAMILY ONE SCREEN AT A TIME — 1 Sep 2026

**His choice: *"go with the inventory"***, picked over two alternatives when the auction queue emptied.
Read-only by its nature, so it needed no §92 go; its findings do.

**WHY IT WAS WORTH DOING, in one line:** builds 312, 313, 314, 315 and 316 each fixed the same idea on a
different screen. Five builds, five separate discoveries, none of them found by the fix before it. That
is not bad luck — it is what happens when a family of defects is chased by symptom.

**THE METHOD IS THE DELIVERABLE.** 154 surfaces that read phase/round/decision state, marked against the
four known shapes, cross-checked against one discriminator (does it ask which round decided this?), and
the survivors driven rather than read. The full account is in `TODO.md` §1.

**IT FOUND THREE, ALL ON THE ADMIN DASHBOARD** — the most-looked-at screen, and the one surface with the
full risk profile and no round awareness whatsoever: a round-DENIED bid grouped under **Win**, a round
scope silently showing the live view, and an export labelled "Phase 4 (current)" over Round N's data.

**F2 is D7 a second time, and that is the finding behind the findings.** D7 fixed `buildDashboardRows`,
which feeds the dashboard's export. `renderOverview` draws the dashboard on screen. **They read the same
dropdown.** One was fixed. **The rule this earns: when a defect is fixed, find every consumer of the
same input before calling it closed** — not every screen with a similar name.

**AND A NEAR-MISS THAT IS THE REASON TO WRITE PROBES CAREFULLY.** The first run of the dashboard probe
stubbed `bidMatchesPhaseFilter` — the very function that decides which bids a filter shows — and
reported that the per-user cards ignored the round filter. **That was the stub, not the code.** With the
real function in place the filter is honoured and the outcome is the defect. §3 rule 10, in the
direction that manufactures a false finding rather than hiding a real one.

**Nine flagged surfaces were classified but NOT driven, and are recorded as unchecked, not clean.**

## §159 — THE INVENTORY'S THREE FINDINGS, BUILT (317) — 1 Sep 2026

**His go: *"go on all"***, on F1, F2 and F3 as raised by §158's inventory. Read as covering the minor
export-filename item raised in the same breath; said out loud in the handover so he could say otherwise.

**These were found by method, not by symptom, and that is the difference worth keeping.** Builds
312–316 each fixed this family on a screen someone happened to look at. §158 enumerated instead, and the
dashboard — the most-looked-at screen in the admin — turned out to be the one surface carrying the full
risk profile with no round awareness whatsoever.

**F2 IS D7 A SECOND TIME, AND IT IS THE REAL LESSON.** D7 (build 314) fixed `buildDashboardRows`, which
feeds the dashboard's EXPORT. `renderOverview` draws the dashboard on SCREEN. **They read the same
dropdown.** One was fixed and nobody looked for the other. **The rule this earns, and it is narrow enough
to keep: when a defect is fixed, find every consumer of the same INPUT before calling it closed — not
every screen with a similar name.**

**A FALSE GATE IN CLAUDE'S OWN SUITE, CAUGHT BY THE HONESTY RUN.** The first draft's F3 assertions tested
`bwScopeLabel` — which was always round-aware — rather than what `exportDashboard` does with it, so all
three passed on the OLD build. The honesty run is what exposed it: a fix-test that stays green on the
build it is supposed to fail is not a weak test, it is a false one (§3 r10). Replaced with an assertion
over `exportDashboard`'s comment-stripped source, carrying its own proof that the stripper kept the code
— necessary because this build's comment quotes the very string being forbidden, which is rule 10's
tombstone trap in its exact recorded form. The originals are kept, relabelled `[control]`.

**Also fixed, raised as minor in the same handover:** the two report exports built their FILENAME from a
`^phN` match, so every round export downloaded as `phase4` and overwrote the last. One shared helper now.

**Nine flagged surfaces from §158 remain classified but NOT driven** — including the outbid-mail path.
They are recorded in `TODO.md` §1 as unchecked, which is not the same as clean.

## §160 — THE MAIL PATH, THEN STOP: THE INVENTORY IS CLOSED — 1 Sep 2026

**His words: *"Agree, do mail. then stop and prepare close session docs."*** — after asking the question
that ended the sweep: *"how much more of this do we have? i don't want to endlessly chase things that
might be fine."*

**He was right to ask, and the answer was a number rather than a feeling**, which is the only reason
stopping here is a decision instead of fatigue. 28 surfaces flagged, 9 fixed, 2 clean, 4 by design,
1 worth checking, 12 deliberately left. That list is in `TODO.md` §1 by name, with the reason.

**THE MAIL PATH WAS THE RIGHT ONE TO CHECK, and it found three chained defects (G1, G2, G3), NOT BUILT.**
The mailer compares the LIVE engine before and after a change, so a bystander whose bid a round already
DENIED is told **"your projection changed from UNDER REVIEW to WIN"** — over-promising, to a real
address, about a decision that is final. It is reachable because `adminAddSelection` has no
completed-phase gate at all: driven on a finished Phase 4, it wrote five times and refused nothing.

**THE PATTERN WORTH CARRYING FORWARD:** the archived-round guard on the other three write handlers
protects **the bid being acted on, never the bystanders on the same week.** Every one of D8, E1 and now
G1 lives in that gap. A future fix should be stated as a rule about the WEEK, not about the row.

**THE STOPPING RULE, so a fresh session does not restart this:** the twelve unchecked surfaces are
recorded by name with the reason (none can reach a person; ten only read, paint or warn). **Unchecked is
not clean — but it is also not a reason to reopen the sweep.** If one surfaces in real use it is a normal
finding, already on the list.

**Nothing auction-side was changed by this audit.** §92 stands: G1–G3 need his specific go.

## §161 — G1, G2, G3 BUILT (318), AND A SEVERITY CALL CORRECTED TWICE — 1 Sep 2026

**His go: *"you actually convinced that we should do all 3. It is possible, but unlikely admin would do
what you described. Just ensure these builds don't break anything else."*** Then, unprompted, *"go with
all 3."* **The second sentence is the governing constraint on this build and the suite reflects it —
most of its assertions are about what must NOT change.**

**HE ASKED TWO QUESTIONS FIRST, AND BOTH DESERVED CHECKING RATHER THAN ANSWERING:**

**1. *"Is this related to eliminating the Draw category?"* — NO, and it was verified, not reasoned.**
Build **305**, before §147, reads `const po=getOutcome(wk,user,prevAp), no=getOutcome(wk,user,newAp)`
against the same live engine. Identical defect, pre-merge. What §147 changed was the WORDING (DRAW →
UNDER REVIEW) and, by collapsing draw↔review transitions, it made these e-mails **less** frequent. The
merge neither caused this nor worsened it.

**2. *"I haven't noticed any problems with e-mails"* — expected, and it does not settle it.** But his
push-back was right on the merits and produced a better answer than the one it challenged.

**THE SEVERITY CALL WAS CORRECTED TWICE, IN OPPOSITE DIRECTIONS. Both corrections came from checking.**
· First write-up: G1 is the serious one. · **Corrected down** on his push-back: the staff site is
already right (build 133 drops a round-decided week from the live list the moment results go out), so
no result changes and the bad information lives in one e-mail — G1 ranked last of three. · **Corrected
back up** when the fix shape was being designed: G1 is reachable **MID-AUCTION** — round 1 announced,
round 2 open, phase not complete — where it needs only routine between-rounds admin activity, not the
odd post-completion action the middle position assumed. **The lesson is not "be more careful"; it is
that all three positions came from running something, and the two that moved were the ones argued from
reachability rather than driven.**

**THE PATTERN, NOW NAMED IN THE CODE:** every round guard before this one protects **the bid being
ACTED ON**. G1 is the first that protects the **BYSTANDERS on the same week** — which is where D8, E1
and G1 all lived. State future fixes in this family as a rule about the WEEK.

**G3 IS DEAD CODE AND IS RECORDED AS SUCH.** `confirmAdminEdit` has no invoker — verified by grep, not
taken from the comment that says so. It is guarded anyway, and named in `test-p4-rounds`'s handler list,
precisely because whoever re-wires it will not remember that it never had guards.

**§3 r16 EARNED AGAIN, SELF-INFLICTED, IN THIS BUILD.** The first draft of the G3 assertion pinned the
identifier's occurrence COUNT at two — and the comment written in the same build made it three, so a
correct build failed its own test. Re-anchored to the invariant. That is twice in one day that a pinned
count went red for a build that made the code better.

## §162 — RA-8 MANDATED: A THOROUGH AUDIT OF THE WEEK'S AUCTION BUILDS, AND TWO CAPACITY REQUIREMENTS — 1 Sep 2026 (evening)

Offered three options with the auction queue empty (the archive pass · a capped regression audit of 312–318 ·
stop), he chose the first two and widened the second well past what was offered. **His words, verbatim:**

> *"Do 1. For the audit, I definitely want this. Include everything that has been built with the vacation site
> in the last week. Do a thorough audit looking for items that would break the auction. I am not after small
> details that are unlikely to matter. Ensure the merge of Draw and Review is thorough and no items remain
> behind. Site must be consistent on this. Ensure the engine is behaving correctly since there have been some
> changes. Ensure the Under review page on admin is working correctly. There have been many problems with the
> reports. Reports will be instrumental in keeping a record of the auction as we progress and in case there's
> a problem. I need them to be 100% accurate. I would like you to also check something that could happen in
> phase 4. If admin changes the FTE available and adds a week, does that break anything? Capacity might be
> increased for certain weeks and I want to ensure this doesn't make any reports break or the engine. It must
> be seamless to add that capacity at some point during the auction. On the same note, it's possible we could
> reduce capacity if we have someone out on FMLA or something. I understand reducing is trickier and I would
> only reduce capacity between phases for remaining capacity, not reduce it below what's already been approved.
> Need that to work as well."*

**WHAT THIS RULES:**
1. **RA-8's scope is every auction build of the last week — 306 through 318 (§147–§161) — read-only under
   §92**, looking for what would BREAK THE AUCTION. **His cap, again: not small details unlikely to matter.**
   Five named targets: (a) the Draw→Under Review merge complete and CONSISTENT across the whole site, nothing
   left behind; (b) the engine correct after the week's changes; (c) the admin Under Review page working;
   (d) the reports **100% accurate** — *"instrumental in keeping a record of the auction as we progress and in
   case there's a problem"*; (e) capacity changes, below.
2. **CAPACITY MAY GO UP AT ANY POINT DURING THE AUCTION, Phase 4 included, and it must be SEAMLESS** — the
   engine and every report must absorb an admin raising a week's FTE without breaking. (This is the workflow
   PHASE-4 EXTRA FTE already describes, generalised: *"at some point during the auction"*, not only between
   Phases 3 and 4.)
3. **CAPACITY MAY GO DOWN, with two limits he set himself:** only BETWEEN phases, and only the REMAINING
   capacity — *"not reduce it below what's already been approved"*. The case he has in mind is someone out on
   FMLA. That must work too. **Whether the code refuses a reduction below the approved total, or merely
   assumes the admin will not do it, is one of the questions RA-8 must answer** — he said *"I understand
   reducing is trickier"*, which is a statement of expectation, not a waiver.
4. A finding earns a go, not a fix — §92 stands; the audit reports, he decides.

## §163 — A PHASE-4 ROUND GETS THE SAME TREATMENT AS A PHASE, EVERYWHERE — 1 Sep 2026 (evening)

Owner-found, on the admin Phases panel, while RA-8 was being planned. **His words, verbatim:**

> *"Phase 4 rounds are not being treated the same as phases and each round is supposed to get the same
> treatment as a phase. that means each round needs to show up here in phase history. Also the users without
> bids line needs to specify which round. I am concerned this behavior could mean there is something bigger
> here, so ensure there is not other concerning behavior related to this find."*

**WHAT THIS RULES:** (1) **the principle** — a Phase-4 round is a phase for every purpose the site has: history,
counts, labels, e-mails, records. This generalises §152 (*"every P4 bid belongs to a round"*) from labels to
behaviour. (2) Two named defects, UNBUILT, awaiting his go under §92: the Phases panel's **Phase history**
lists only `completedPhases` and never a round; the **"N users without bids in Phase 4"** line names no round.
(3) **RA-8 gains a lane:** every surface that decides something by "the current phase" must be checked for
whether, in Phase 4, it should mean "the current round" — his concern that *"there is something bigger here"*
is treated as a hypothesis to drive, not a worry to reassure. **Confirmed in code before this was written:**
the without-bids count (`renderNoBidders`) tests `getUserBidPhaseAdmin(u,wk)===cur`, so in round 2 anyone
still carrying a round-1 bid counts as having bid — and the reminder e-mail is documented (H-9) as sharing
that exact rule. Whether that reaches a person is for the audit to drive.

## §164 — RA-8'S THREE ANSWERS, AND THE STANDING ORDER FOR WHAT FOLLOWS IT: SAFE, NARROW, WINDING DOWN — 1 Sep 2026 (evening)

**His words, verbatim:** *"I read that as adding capacity to a week - correct. okay to allow admin to reduce
capacity below what's approved, it's unlikely and maybe not worth the build. perhaps a confirmation dialogue
stating that's happening to keep it simple? If it's just as easy to block it with an explanation why, that also
works. The key is no dangerous builds this late in the game. Narrow builds that are safe are still ok. baseline
of 305 good. Again, we are close to go-live and I want things to be safe and to wind down this high effort work."*

**WHAT THIS RULES:**
1. **"Adds a week" = adding capacity to an existing week** (raising its FTE), never adding a calendar week.
2. **Reducing capacity below the approved total is ALLOWED to remain possible.** If anything is built for it,
   it is the smallest thing: a confirm dialog that says it is happening, or — only if it is just as easy — a
   refusal with a plain explanation. Not a feature; possibly nothing at all.
3. **RA-8's baseline is build 305** (staff 164); scope 306–318 plus staff 165.
4. **THE STANDING ORDER FOR EVERYTHING AFTER RA-8: no dangerous builds this close to go-live. Narrow, safe
   builds remain acceptable. The high-effort work is WINDING DOWN.** Every RA-8 finding is to be presented with
   that test applied first — is the fix narrow and safe? — and a finding whose fix is not is reported as a risk
   to carry, not as work to do.
5. **Order (his go, same evening): *"go with audit. build later. i don't need an answer until audit is
   complete."*** Offered build-first for the §163 defects, Claude argued for audit-first (one narrow build
   closing the class beats two chasing it; the reminder-mail hypothesis must be driven before it is built;
   the audit's target should hold still) and he agreed. RA-8 runs to completion before anything is built.

## §165 — THE OWNER'S RUNNING LIST OF FINDINGS DURING RA-8: rounds open with the window, timer rules editable, two rules-text changes — 1 Sep 2026 (evening)

**His instruction, verbatim: *"I am going to keep listing my findings, don't lose track of any of them."*** The
list lives in `TODO.md` §1 under **OWNER FINDINGS, 1 Sep (evening)**, numbered O-1 onward; every item stays
there until it is built or he closes it. Rulings in this batch, verbatim:

- **O-1** — *"It seems that p4r1 opens with the 5 day window, but i need each round to open with the 5 day
  window. Again, each round of phase 4 must operate as an independent phase essentially. this additional
  finding makes it much more likely that there are more items like this that need to be found."* (RA-8 lane 7
  had independently driven the same thing: Start Round 2 arms the LAST timer stage — 3 h — because the phase
  clock is not restarted for a round; Begin Phase arms the opening window.) **Ruling: a round opens exactly as
  a phase opens.** This extends §163.
- **O-2** — *"I also want to be sure that i can change the timer rules between phases and rounds as needed."*
  **Ruling: the timer rules (stages, opening window, quiet hours, reset mode) must be editable between phases
  AND between rounds, and the edit must take effect for the next window.** RA-8 is to drive whether that is
  true today.
- **O-3** — *"do we list anywhere in the rules/reminders that losing bids are returned when a phase completes?
  Could go below this rule: Each number can only be used once… Also, change above existing rule to: 'Each
  number can only be used once, numbers from weeks that were approved in earlier phases are unavailable to be
  used again'. That's more accurate."* **Checked: the site's rules text says nothing about losing bids being
  returned** — the behaviour exists (the boundary scrub returns the numbers; a code comment calls it "phase
  parity") but is undocumented. **Ruling: (a) reword the existing rule as quoted; (b) add, directly below
  it, a rule saying that bids which did not win are returned when a phase completes (his wording to be
  confirmed at build time).** Two copies of the rules exist on the staff page (the Rules panel ~570 and the
  printed list ~4066) — both change together.
- **O-4** — *"Also add a new rule about Under review just below the existing one: Under Review includes times
  when your combined bid with other users exceeds the FTE cap."* **Ruling: add exactly that sentence below
  the Under Review rule**, both copies (~586 and ~4081).

O-3 and O-4 are text-only changes to the staff page — narrow and safe under §164 — and are his specific §92
decisions for those changes. Per his order in §164 item 5, nothing is built until RA-8 is complete.

## §166 — RA-8 IS FILED: NOTHING BREAKS THE AUCTION; THE RECORD AND THE ROUNDS-AS-PHASES CLASS ARE WHAT REMAINS — 1 Sep 2026 (late evening)

Report: `tests/docs/RA-8-2026-09-01.md`; lane and verifier reports and every probe under `tests/docs/RA-8/`. Eight
lanes plus a timer lane, four adversarial verifiers, baseline 305; **nothing built (§92)**. The verdict, for the
record: no wrong winner, lost bid, false e-mail or unrefused result-altering write was found; the engine is byte-identical
to 305 and passed 13,000 random states across three copies with zero divergence; the week's builds broke nothing in an
open phase; the merge is complete except one dialog; the Under Review page works; every report reconciles row-for-row
against a ground-truth ledger. What remains is (Tier 1) four record defects — round-scope capacity headers, bare P4 on
open-round bids, the live re-projection between Complete Phase and Send Results, and an admin add/approve on a completed
round that Start Round wipes — and (Tier 2) the rounds-as-phases class he predicted: nine surfaces, including the
reminder e-mail omitting round-1 winners and the timer arming a round at its last 3-hour stage (his O-1). **All
pre-existing on 305.** The report proposes ONE build, rated under §164 (safe one-liners and labels; render-only;
the rule with a gap guard; and two medium items — the per-round timer stamp on both pages, and freezing round capacity).
**Three decisions are his, not defects:** whether a capacity raise should e-mail the people it helps (today it is silent
by construction); whether lowering below approved gets the one-line confirm; and whether the 3-bid limit is per phase
or per round (today cumulative: a user who won three weeks in round 1 cannot bid in round 2). He has not yet ruled.

## §167 — HIS THREE ANSWERS TO RA-8'S DECISIONS: NO E-MAIL ON A CAPACITY RAISE; THE CONFIRM ON A CUT BELOW APPROVED; AND A CORRECTION — 1 Sep 2026 (late evening)

**His words: *"1 - no e-mail. 2 - I want the confirm. 3 - where did you get this? that's not what I have set. I have it
set to limit of 6 through P2 and none after that."***

1. **D-a RULED: a capacity RAISE sends no e-mail.** Today's behaviour (silent by construction) is the intended one.
2. **D-b RULED: lowering capacity below the approved total gets a CONFIRM dialog** that states it is happening (the
   two-line shape in `saveOneSlot` before `openConfirm`, using `weekLedger(wk).approvedFte`) — not a block.
3. **D-c WITHDRAWN — Claude was wrong.** The bid limit is `adminSettings.maxBidsCumulative`, a per-phase cumulative cap
   with "none" allowed; **his live setting is 6 through Phase 2 and none after.** The audit's "3 bids max" was a fixture
   default carried into the report as if it were his rule. No cap applies in Phase 4, so the round-2 concern does not
   exist. Corrected in the report and here; the memory line "3 bids max per user per phase" is retired.

## §168 — THE GO ON RA-8: ALL GROUPS A–F, HIS P4 COMMENTS AND HIS RULES TEXT INCLUDED — 1 Sep 2026 (late evening)

**His words: *"Do all fixes, group A-F. Also don't forget all my comments above about P4 problems and my rules
updates."*** This is his specific §92 decision for every item in `TODO.md` §1's RA-8 queue: Group A (the one-line gates
R-4 · P-4 · P-5, the labels R-2 · P-6, the Approve dialog M-1 · M-2, the confirm on cutting below approved (§167), and his
rules text O-3 · O-4), Group B (the Phases panel: P-3), Group C (the no-bidders rule and reminder e-mail: P-1, with the
gap guard), Group D (each round opens with the window on its own clock: P-2 / O-1, both pages), Group E (a round's
capacity frozen in its archive: R-1), and Group F (R-3 — the admin views treat a completed current phase as closed; the
staff half cannot be fixed without reading admin-only staged data, so the operating rule "cut capacity after Send
Results" stays for the staff page). §164 governs the shape: narrow, each build backed out on its own; §0 rule 2 governs
the order: the plan is presented and his go on it precedes code.

## §169 — THE TWO BUILD-2 FOLLOW-UPS: ONE DECLINED, ONE HIS OWN — 2 Sep 2026

**His words: *"don't care about that e-mail detail. I will do a full rehearsal myself."*** (1) The welcome e-mails'
sentence "Each phase opens with a N-day window…" stays as it is — DECLINED, same standing as BULK-1 and the suites
index: never re-raise. (2) The rehearsal of the per-round timer (and, by his wording, of the whole build set) is HIS —
off every list, not to be reminded, same standing as launch and the sign-in test. With §168's three builds filed
(319/166 and 321 live; 322/167 filed), RA-8's queue is EMPTY.

## §170 — THE WALKTHROUGH DECK, UPDATED BY HIM AND BROUGHT INTO LINE WITH THE DRAW MERGE — 2 Sep 2026

**His words: *"file this updated PPT and make necessary changes for Draw merge"*** (then *"use chrome control if
needed"* — not needed: every screenshot in the deck already shows only W badges and no Draw page). Filed as the single
current copy `tests/docs/VacationAuctionWalkthrough.pptx`; the 27 Aug deck moved to `_archive/tests/walkthrough-deck/`.
Changes made: slide 23's legend loses the D · Draw row and Under Review reads the site's own sentence plus his O-4
sentence; slide 33's rule reads "weeks that were approved in earlier phases" (O-3); slide 34's last bullet drops "in a
Draw or"; slide 35's timer line reads "Each phase — and each round of Phase 4 — opens with a 5-day window", which
build 322 made true. RA-8's M-3 is thereby CLOSED. The rehearsal user guide and bid tracker (.docx, site repo) were NOT
touched — not asked for.

## §171 — TWO WEEKS OUT: VACATION SITE ONLY; THE HUB'S SCHEDULE CARDS COME DOWN; A GO-LIVE RUNBOOK; BACKUPS GET A FOLDER — 2 Sep 2026

**His framing, verbatim:** *"I am only concerned about the vacation site at this point. We are 2 weeks out from
go-live. Schedule site will be on hold for some time."* §143's "keep schedule parked" is now indefinite.

Asked for recommendations, Claude's first was to build nothing on the auction (§92, §164 stand) and offered four
operational items. His answers: **(1) GO** — remove the two Daily Scheduling cards from the landing hub until the
schedule resumes (the §118 CRNA precedent; hub repo only, nothing the auction serves; plan first, §0 rule 2).
**(2) GO** — a plain-language go-live runbook in the private `tests/docs` (what to do when X happens during the
live run; read-only, no code). **(3) "All set and done"** — the mail meter and the Firebase billing alert are his and
handled; do not re-raise. **(4) "agree"** — back up at every phase boundary and cross-check one user's staff Phase
History against the admin User Summary after each phase (the 1 Sep lesson, §149/§150).

**Hero line:** asked whether *"…and daily scheduling tools"* should be trimmed with the cards gone — *"leave the hero line, it's fine."* Cut the same evening: 24 lines removed, nothing added.

**Later the same evening — the "denied in Phase 1, should have been approved" question.** He asked what an admin should
do if, after Phase 1 completes, someone denied in Phase 1 turns out to deserve the week. Claude's answer, from code:
no undo backwards (Revoke is guarded on completed phases by 319; a restore after results were sent is off the
table) — the path is forward: the user's number is back in hand, the week is bid again in Phase 2 (by them, or by
the admin via Edit Selections → Add bid), and the admin approves by hand; raise the week's capacity first when the
reason is "we now have room". Verified in the staff page: a high-demand week accepts a new bid in any phase as long
as it is not locked and the bid meets the week-category floor — there is no "Phase 1 only" rule on those weeks. His
instruction: **"don't check this in rehearsal"** — not a rehearsal step, not a build.

**Backups:** his old computer had a folder the local backups were filed into (the admin's restore help already
says *Downloads → Auction Backups*). He wants that again — every local backup lands in its own folder inside
Downloads — and asked for the steps. The steps are his to do on the Mac (a browser/Finder setting, not code).

## §172 — THE CURRENT PHASE CARD AFTER COMPLETE ROUND: HEADING FIXED, THE PROGRESS LINE STAYS — 2 Sep 2026

Owner-found while preparing his rehearsal (TODO O-5): after Complete Round the dashboard heading read
*"Phase 4: Round 1 ✓ Round complete"* in the card's largest type and wrapped to three lines — *"This looks
terrible."* Claude traced both halves to 319's P-3 and proposed two fixes. His ruling:

**1 — the heading:** *"Phase 4: Round 1 as the big line. Below that, just complete with the check mark."* — the
status moves to its own smaller line reading **✓ Complete**, for a completed round and a completed phase alike.
This is the §92 go for admin 323 (one rendering block, nothing else).

**2 — the progress line** (*"No bids placed in this round yet."* after a round is archived): *"I'm okay leaving this
as it is. That part is fine."* — NOT changed; do not re-raise.

## §173 — THE "SAME BID, SAME ANSWER" DIALOG: THE BLOCK IS WRONG; TRACE FIRST, THOROUGHLY — 2 Sep 2026 (late)

During his rehearsal the staff site refused a Phase-4 re-bid with *"This exact bid was already denied on this week
in Phase 4: Round 3 — same bid, same answer."* (build 134's guard). Claude first defended it as by-design; he
disagreed, then put the case that settles it: *"what if there is lower demand in a later round in P4? Couldn't a
user theoretically re-use a bid and get approved, especially if admin opened up additional capacity?"* — yes. Under
his rounds-as-phases principle (§165) a later-round bid is a new bid whatever its value. Claude conceded, dated here.

The mechanism, read in both engines: a live bid carries no round stamp, so the twin helpers (staff
`p4AnnouncedDecision`, admin `_p4ArchivedDecisionRound`) tell an old denied bid from a fresh one by VALUE alone;
the dialog exists only because a same-value re-bid would otherwise be mistaken for the old denial (the 10 Aug zombie).

**His order:** *"Trace it thoroughly. It's very important to have bids that have been used tracked properly,
returned to users when appropriate with denied bids, and not returned for approved bids. If the only problem is the
dialog, seems like an easy fix. I really want to be sure this isn't a sign of a bigger problem that we're not
seeing."* — a READ-ONLY trace of the bid-number lifecycle through Phase 4 (used · returned on denial · kept on
approval) and of every consumer of the two helpers, before any plan. §92 stands: no build without a separate go.

## §174 — THE GO: A ROUND'S DENIAL BINDS ONLY WHILE ITS ROUND IS CURRENT — admin 324 / staff 168 — 2 Sep 2026 (late)

The §173 trace (`tests/docs/TRACE-same-bid-2026-09-02.md`) came back: the bid-number ledger is sound on both
pages; the dialog is the fingerprint of the value-match rule in the two twin helpers, which also has an
admin-reachable face (Edit Selections → Add bid with a value an earlier round denied makes the 10 Aug zombie). He
pressed on the used-number formula ("you said won in Phases 1–3" / "what about phase 4?") and was walked through it
with numbers: a round win stays live and keeps its number; a round denial is deleted at Start Round and returns it;
Phase 4 behaves as a string of phases. Then: *"this build won't change or break anything else?"* — answered: one
question changes its answer in one situation (a same-value re-bid on a week denied in an EARLIER round); approvals,
Phases 1–3, the current round, the gap, the engine, the archives and the rules are untouched; proven by the suite,
not promised. Both pages must be pushed together. **His word: "go."**

Not included (offered, not chosen): the round archive as a second witness for used numbers — no behaviour change.

## §175 — HIS FULL REHEARSAL: DONE, ONE FINDING — 2 Sep 2026 (late)

*"rehearsal done. the only problem i found is the one you are fixing now."* — the 34-step run-through
(`tests/docs/REHEARSAL-SCRIPT.md`, simulator on, e-mails skipped) passed end to end on 323/167; the single
finding is the "same bid, same answer" refusal, filed as admin 324 / staff 168 under §174. Nothing else is open.

**After the push (324/168 served, verified twice):** he re-placed the refused NP bid — no alert — and checked the
surfaces: *"all worked as expected."* Session closed at his word: *"handoff. thank you."*

## §176 — THE SUMMER-FLOOR FUZZ: RUN, THEN PARKED — 3 Sep 2026

He asked whether the 6-bid cap through Phase 2 lets people win summer, spring break or ski week cheaper than history
(a 3 for ski/spring, a 6 for summer; the old platform had no bid limits) — *"it would be a problem if people can win a
summer week with an 8/9/10. we don't really want a floor for p2, but maybe we need one anyway."* His set-up rulings:
Phase 1 + Phase 2 only, 2 bids each in Phase 1 and 6 in total; the real FTE map (his 1 Sep backup); Under Review
settled at *"don't go more than 0.6 over capacity"*; *"there is no more draw"* — every over-cap bid is Under Review;
*"do many different varieties"*; bidders who *"improve their bids as needed for weeks they really want. it can't be
completely random."* His two week lists (7, 14, 15, 22–35; then 20–38) are where interest concentrates — **Phase 2
opens every week** (*"Yikes"* when v1 opened only those; v1 withdrawn). Report: `tests/docs/FUZZ-summer-floor-2026-09-03.md`
(v2), harness `tests/fuzz/`. Reading: cheap shoulder-week wins in every scenario; a third of summer open after Phase 2
regardless; a floor of 6 removes the cheap wins and doubles the open capacity; a Phase-2-only floor is settable in the
phase gap without a build.

He then asked for a way to find REAL demand (the other weeks people care about) — offered: last year's weeks-taken
history, a pre-auction survey, weeks-per-person — and ruled: *"forget all this for now. let's move on."* **PARKED at his
word: no floor decision, no demand calibration, no cap change. Do not re-raise.**

## §177 — MID-PHASE SETTINGS: ASKED, EXPLORED, DECLINED — 3 Sep 2026

Three questions in a row, answered from the code (build 324 + the live rules): the seven frozen settings (cap, floors,
NP-by-phase, review threshold, lowerings, per-phase cap, calendar) cannot change during a phase; a Global Lock or an
expired timer does NOT unlock them — only the phase gap (completed AND results sent) or "before Phase 1" does; a
settings change sends no e-mail and resets no timer, so a mid-phase change would re-score boards silently. He then
proposed keeping the BID CAP editable in a live phase, increase-only, with a strong warning and a double confirmation;
Claude called it reasonable with a server-side increase-only guard and a bidder notice, and asked two design questions.
**His ruling: *"nevermind, i don't want it."* DECLINED — no mid-phase edits of any frozen setting, cap included. Not to
be re-raised. The fallback for a live-run need stays: complete the phase early, change the setting in the gap, tell people.**
A per-user "numbers used / free" admin table was also discussed (read-only, narrow) and not asked for; editing used
numbers would need a new adjustments document across both pages, rules and backup — not proposed.

## §178 — THE GO: "USER BIDS" — A READ-ONLY PER-USER VIEW OF BID NUMBERS USED AND REMAINING — admin 325 — 4 Sep 2026 (morning)

His ask: a viewer in the admin side panel, People section, below Bid Lowerings — every user alphabetically, a clean view
of which bid numbers (1–10) each has used and which remain. Claude read the code first: the staff site's `bidPoolInfo`
is the rule (a number is used by any current-phase bid, denied ones included, or by a win in an earlier phase; NP never
uses one; Phase 4 round wins stay on the live board and so count), and every input the admin needs is already loaded on
the page — no new listener, no read, no write. Verdict: read-only, narrow and safe under §164. Plan presented; his
rulings: **(1) the page is called "User Bids"; (2) it shows remaining and used, and a used number is marked as either
WON — gone for good — or TIED UP by a live bid this phase, which comes back if it doesn't win** (his words: *"do this:
won, gone for good versus tied up by a live bid this phase, comes back if it doesn't win"*); **(3) — a minute later — the NP count IS in** (*"Do NP count as part of
this"*): how many no-preference bids each user has placed this phase, shown beside the numbers since NP uses none. Not
asked for: a weeks-won-vs-cap column, a weeks-won list (the reports' job). The admin's copy of the rule is a port of the staff
function, and the suite asserts the two agree on the same fixtures — so the admin never sees a different answer than the
user does. **BUILT as admin 325 the same morning and LIVE that afternoon** (`346522a`, verified served twice; the record and every gate: `vacation-kp.github.io/BUILD-LOG.md`).

## §179 — USER BIDS ON THE LIVE PAGE: THREE OWNER FINDINGS — 4 Sep 2026 (afternoon)

Seen on the served 325: **(1)** the red (won) and the palette's `--yellow` (`#7a4e00`, a dark gold that reads brown)
are too close — *"maybe yellow for live bids?"*; Claude proposed a true pale yellow (traffic light: green free, yellow
pending, red gone) or blue (the site's open/in-progress colour) — his choice pending; **(2)** the legend's placeholder
"n" chips are *"weird"* — proposed: the labels themselves become the swatches (three pills in the chip colours);
**(3)** *"remove the Left column, not needed."* All three are paint on one page; the rule and the data are untouched.
His answers: *"yellow"*, then *"go"*. **BUILT as admin 326 and LIVE the same afternoon** (`54cfc92`, verified served twice; record and gates: `vacation-kp.github.io/BUILD-LOG.md`).

## §180 — WITHHELD BID NUMBERS: HE WANTS IT NOW — 4 Sep 2026 (evening)

He asked what it would take to "take a bid away from a user". Removing a live bid already exists (Edit Selections → Remove Bid).
Taking a NUMBER away does not. His first shape — a placeholder "Week 0" only the admin writes — was examined and rejected on the
code: the rules confine a user to their own key and cannot see week keys, so a user could delete a Week-0 entry from devtools;
and every consumer that iterates a user's bid keys would show or count it. Claude's corrected finding: the engine does not
enforce prior-win numbers server-side (I2 catches same-phase duplicates only); prior-win numbers are a client guard fed by ONE
helper per site, so a `bidHolds` document (admin-only by rules) joining those helpers is honoured by the pool, both entry
guards and User Bids without an engine change. **His ruling: *"I want it for now."*** Plan and risk list to follow under §0
rule 2. His answers to the two design questions: **no notice line on the user's page — the number simply disappears from their pool; he tells the user himself. A hold is permanent until he releases it** (it survives every phase change). Build: admin 327 / staff 169 + rules. **BUILT, AUDITED (RA-9, §181) and FILED the same evening** (record and every gate: `vacation-kp.github.io/BUILD-LOG.md`); pushed by him 5 Sep in that order (RA-2, console, then the pages) and LIVE (`1c73971`, verified served twice).

## §181 — RA-9: THE FRESH-EYES AUDIT OF THE HOLDS BUILD, AND TWO RULINGS ON ITS EDGES — 4 Sep 2026 (night)

His concern — *"I am concerned it could break something else"* — and his choice of option 1: close the staff-side browser gap and
run a fresh-session adversarial audit before any push, rather than deploy as-is or defer to after Phase 1. RA-9 found nothing HIGH
and four MEDIUMs at the edges (restore, Reset Auction, remove-user, the admin Add Bid override), all fixed in the same build; a
second pass on the fixes found no page defect. **His rulings while it ran: (1) the user's page must look no different than the
bid greyed out in the dropdown and red in "Bids already used" — no wording change, no notice; (2) *"Reset auction should not keep
holds. I just mean within a single auction cycle"* — a hold is permanent until released WITHIN the cycle; Reset Auction (and Delete
All Users) wipe them, and the reset dialog says so.** A restore never touches them (backed up for the record, never restored — the
same treatment as adminAccess): a restore is a repair within the cycle, and the admin's standing holds are not part of what it repairs. Claude's own choice, stated for the record: a withheld number is
a hard refusal on every admin bid-entry path, not a warn-and-override, so a hold can never sit behind a live bid with no chip to
release it.

## §182 — RA-10 ORDERED: ONE MORE STRONG AUDIT OF THE LIVE HOLDS BUILD BEFORE HANDOFF — 5 Sep 2026

327 / 169 + rules live and his two-minute live check passed (*"seems to work"*). His order before handoff: *"1 more strong audit to
make sure everything this new build could touch is reviewed and still working."* Scope: not the diff — every CONSUMER of every
function and document the build touched, on both pages and in the rules, traced on the live bytes and exercised where a harness
exists. Fresh-session auditor (RA-9's method). Findings and verdict to be filed in `tests/docs/RA-10-2026-09-05.md`.

**Addendum, 5 Sep 2026 (night) — the go, and what he asked for.** *"The most important thing is that you confirm nothing was damaged by
this recent build. Anything that could have been effected needs to be tested to ensure it's working correctly. Look for any possible
unintended consequences. prepare a report and I'll review in the morning. Ensure you use adversarial claudes."* Run unattended as ordered:
five audit lanes, three adversarial verifiers with the opposite brief, and a browser lane on the live bytes. **RA-10 FILED (5 Sep 2026,
overnight): nothing damaged; two MEDIUM edges of the new feature (a hold hidden behind a live bid after a restore; the Struggling Users box
not taught about holds) and four suite holes.** Nothing built (§92). His rulings on the report's recommendation are `TODO.md` §1's first item.
