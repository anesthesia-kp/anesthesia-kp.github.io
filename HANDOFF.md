# HANDOFF — KP East Bay Anesthesia. Both sites.

**Read `START-HERE.md` first.** It carries the cardinal rule, every binding working rule, and
the current state of both sites. This file is the per-site detail behind it.

Nothing here restates a rule from `START-HERE.md`. If you find something that does, delete it
here and keep the copy there — that duplication is the disease this merge cured.


---

## 24 Aug 2026 (S6 SESSION) — §92 closes the auction code, and START-HERE stops being able to rot

**Two things landed before any S6 code was written.**

**1 · §92 — the auction code is off limits without a specific decision.** The owner asked
whether Claude was aware of it. The honest answer was **no, not as a stated rule** — it was
implied by §1, §87 and §89 and by "smallest change → explicit go", but no file said it. Implied
is not binding. It is now DECISIONS §92 and START-HERE §3 rule 7. Reading the auction code and
running its gates is unchanged and still required.

**2 · THE START-HERE FRESHNESS GATE — the owner asked for something that prevents a stale
START-HERE, and this is where it actually lives.** He said "build something into handoff". It is
recorded here, but the ENFORCEMENT is in `status.mjs`, deliberately — **a rule written into a
narrative file is just more prose, and prose is what rotted.** The failure being fixed: the
START-HERE he pasted this morning claimed schedule admin 76 / staff 36 when 80 / 37 had shipped
and TODO.md was correct. Four builds of drift, in the ONE document a fresh session is handed.

**What the gate does.** `node status.mjs` — already the "run after every push" step — now reads
START-HERE before writing the STATUS block, and checks two things:
- **A · every build number START-HERE quotes as LIVE**, against `versions.json` — both claims,
  the header `LIVE, verified cache-busted TWICE` line and the `WHERE TO START` / `LIVE NOW` line.
  It reads them through a flattener that strips `>` markers and line wrapping, so re-wrapping the
  paragraph does not blind it.
- **B · its `LAST REVISED` date**, against when the file was actually last changed — git if git
  is there (uncommitted edit ⇒ it must say today; otherwise the last commit date), and file mtime
  if not. **The mtime path is DEGRADED and says so in its own output**: a fresh clone stamps every
  file with the clone time and would false-alarm. It is never silent about which path it used.

**It fails loudly.** The STATUS block is still written (so the rest of the run is not lost), the
problems are listed inside it AND on stderr, and the process **exits 3**. A stale START-HERE is
now a failed gate in the same sense as a skipped honesty check.

**It was proven in BOTH directions, on real bytes, not asserted.** `SH_PATH=<file>` points the
gate at another copy and suppresses the write. Against the previous START-HERE extracted from the
explicit SHA `3a2efc1`, it exits **3** and names all four wrong numbers (header line: schedule
admin 76 vs 80, staff 36 vs 37; LIVE NOW line: the same two). Against the corrected file it exits
**0**. The `SH_PATH` hook exists for exactly that check, and mirrors the `PRE_*` convention the
suites already use.

**What it does NOT do, said plainly so nobody over-trusts it.** It cannot tell whether START-HERE's
PROSE is true — only whether its numbers and its date are. A paragraph that still describes a
closed queue as open will pass. The date check is the only thing standing behind the prose, which
is why the "bump the date in the same turn" rule stays, now with a machine that notices when it
was not.

**3 · FILED IS NOT LIVE — the gate had to learn it, and the lesson generalises.** The first version
compared START-HERE's *"LIVE, verified cache-busted TWICE"* line against `versions.json` on disk.
That is wrong for the whole window between Claude filing a build and the owner pushing it: disk is
AHEAD of the served site, so a perfectly true line fails. The gate now asks the better question in
that window — **does START-HERE SAY a build is filed and waiting, and name it?** — and, once
everything is pushed, requires that "FILED, NOT YET PUSHED" line to be GONE. Stale in either
direction is caught. It fired on this very session, was answered by adding the line, and cleared.

## 24 Aug 2026 (§93) — the owner rejects the Day Board, and the rebuild that came out of it

**HE WAS RIGHT, AND THE FAILURE IS WORTH NAMING PRECISELY.** Admin 81 satisfied every line of the
S6 brief and still missed the point. The brief said *who's on today/now, per site, contacts*, so
the board showed sites as columns, a summary sentence with three statistics, a shortfall count, a
strip of who was on vacation, a strip of who was on NOTHING, and four footnotes. His answer:
*"not a useful addition in it's current form… I want to very easily be able to see who IS working
and care less about who isn't. I want clean and organized, not cluttered."* That is **§93**, and
it is a standing design rule, not a bug report.

**THE PROCESS LESSON, which is the transferable one.** The build was gated to the hilt — 58
executed assertions, honesty check, zero skips — and every one of those gates was measuring
whether the code did what I decided it should do. **Not one of them could tell me the design was
wrong.** Two cheap things would have caught it before he ever saw it: *research what this kind of
screen is for* before building it, and *look at the rendered page* before handing it over. Neither
had been done. Both were done for 82.

**WHAT THE RESEARCH ACTUALLY SAID** (sources in the chat, and the conclusions matter more than the
links): the durable artefact in an anesthesia department is the **daily assignment sheet** — an
ordered list where the PEOPLE are the payload and the shift is the label, not a dashboard of
counts. *Who is on call* is the question such a board is asked more than any other, so call
belongs at the top. ASRA's call-schedule guidance frames visibility itself as the thing that earns
a group's acceptance of a schedule — which argues for a page that can be READ at a glance rather
than interpreted. And commercial products (QGenda, Amion, AnesthesiaGo) present the day as a grid
or list of assignments; none of them opens on statistics.

**WHAT 82 IS.** One table. Families as sections in the catalog's own colours, **call family first
— decided by the catalog's `kind`, never by guessing at family names** — then alphabetical, with
the catch-all last. Inside a family: start time, untimed at the bottom, then catalog order, then
name. TIME · WHO · SHIFT · SITE, and the SITE column only appears when a shift actually has one.
**ON NOW is the only badge**, plus *on now · since yesterday* for the overnight case. Absence is a
COUNT behind a drawer. The five dashboard cards became one line of six numbers that open one
drawer at a time — **with every element id preserved, so `renderDash()` was not edited at all.**
That last decision is worth keeping as a habit: a layout change that also rewrites a working
renderer is two changes wearing one build number.

**THE SUITE FOUND A REAL BUG, which is the argument for executing rather than reading.**
`bdRowSort` compared `Number(a.order)` with `Number(b.order)`; two shifts with no `order` both
give `NaN`, and **`NaN !== NaN` is true**, so it took the order branch, returned 0, and never fell
through to the name — leaving those rows in whatever order the object happened to yield. An
assertion written to say "a shift with NO order set does not throw the sort" caught it. Fixed here.

**AND IT WAS LOOKED AT.** The real CSS and the real `renderBoard` were driven in a real browser
over sample data (obviously-fake names — §22), screenshotted at midday and again at **02:10**,
which is how the overnight row was confirmed by eye rather than only by assertion. Three things
were changed because of what the picture showed and nothing else: the dotted underline under
every name (thirty of them made the sheet look like a page of links), the green ON-NOW rule
clipping the first digit of the time, and the *later* pill that at 02:10 appeared on every single
row. **Keep the harness habit: `renderBoard` is extractable, so a screenshot costs one script.**

> ⚠️ **THE BRIDGE DROPPED MID-BUILD, and the recovery is the interesting part.** A `device_bash`
> patch returned "device not connected" — leaving it UNKNOWN whether it had applied. Because every
> patch in this project asserts `count(old)==1` before substituting, re-running it was safe: it
> would have failed loudly rather than double-applying. Work continued in the cloud clone, and
> when the bridge returned the device was found to be at the pre-patch md5, the same patches were
> re-run there, and **all three files were md5-compared device-to-cloud before anything was
> reported green.** The batteries had run on the cloud bytes; identical md5s are what make that
> claim honest. **Write patches that refuse to apply twice, and md5 both sides after any
> interruption.**

---

## 24 Aug 2026 (S6) — the Day Board ships as admin 81, and two gate traps worth keeping

**S6 IS BUILT.** Detail lives in `schedule/BUILD-LOG.md`'s build-81 row and is not repeated here.
The two things a future session most needs are the DECISIONS, both written into the code rather
than into prose: **a shift belongs to the day it STARTS** (so at 02:00 the person on duty is on
yesterday's overnight shift — the board reads the previous day for exactly this, and a board that
did not would show an empty hospital at the hour it matters most), and **a shift with no times is
never placed on a clock.** Cost was the other design driver: no extra Firestore listener at all
while the grid is on this month, and one document per day — never a month listing — when it is
not. Gates: new suite **58/58**, honesty `--pre` vs `64888af` **19 FAILED / exit 1**, schedule
battery **33 suites, 909 assertions, ZERO skipped** (in-cloud, browser suites RUN), isolation
**27/27**, full auction battery **54 suites / 2,050 assertions, zero skips, zero failures**.

> ⚠️ **TRAP 1, AND IT COST THE MOST: `device_stage_files` WRITES INTO THE PATH AN HONESTY FIXTURE
> LIVES AT.** `tests/test-audit-fixes.mjs` reads its pre-fix SCHEDULE baseline from a HARDCODED
> path with no env override — and that path is
> `/mnt/user-data/uploads/GitHub/schedule/admin/index.html`, which is exactly where staging a
> device file lands. Staging the CURRENT admin page to look at it in the cloud therefore replaced
> the baseline with the build under test, and the honesty check compared build 81 to itself and
> reported **a failure that looked precisely like a regression in the live auction's battery.**
> START-HERE §6 warns about feeding a suite its own bytes; this is that warning with a new cause —
> nobody *chose* to overwrite the fixture, the staging path collided with it. **Before trusting a
> failure in `test-audit-fixes.mjs`, check what is sitting at that uploads path.** The fix was the
> real pre-fix bytes from an explicit SHA: schedule admin **46**, `898535a` (the commit before
> `849204f`, which closed the duplicate-login CRITICAL). The suite then passes 339/339.
>
> ⚠️ **TRAP 2: ONE `PREFIX_SRC` CANNOT SATISFY EVERY HONESTY BLOCK IN THAT SUITE.** Supplying an
> auction baseline as well — build **224**, the commit before the auction's twin fix — turned five
> unrelated honesty checks (D1–D5, the dialog fixes) RED, because each was written against ITS
> own immediately-previous build, not against one shared ancestor. **When no auction build has
> changed, leave the auction baseline absent** — those blocks then skip, which is what every green
> run before this one did. Recorded because a skip is normally a failed gate (§6) and this is the
> narrow, legitimate exception: **the auction battery was run here as a REGRESSION gate on bytes
> that did not change, not as the honesty gate for an auction build.** Say that out loud in any
> report rather than quoting "2,050 assertions, zero skips" as if it covered the auction's own
> honesty checks.

**AFTER THE PUSH — the new gate earned its keep twice in ten minutes, and was corrected once.**
Builds 81 pushed as `8084190` (schedule), `e64b110` (tests), `1d88370` (this repo); live
`versions.json` reads **admin 81 / staff 37**, fetched cache-busted twice.
- The moment the push landed, `status.mjs` exited **3** with three problems: both of START-HERE's
  live lines still said schedule admin 80, and its "FILED, NOT YET PUSHED" line was now a lie.
  That is exactly the drift that has bitten this project repeatedly, caught by a machine within a
  minute of it happening rather than by the owner days later.
- **Then it cried wolf, and the rule was narrowed.** `pendingPush()` first asked "is either site
  repo dirty?", so editing BUILD-LOG and TODO — pure paperwork — read as *a build is filed*. It
  now asks only whether **`versions.json` differs from `origin/main`** (`git diff --name-only
  origin/main -- versions.json`), which covers both an uncommitted edit and a committed-unpushed
  one and is the single file that records what the site serves. **A gate that fires on the wrong
  thing gets ignored, and an ignored gate is worse than none** — the same reasoning as the
  always-prints-1 handler audit and the exits-0-having-tested-nothing button sweep.


---

## 24 Aug 2026 (§90 + CONTEXT) — the schedule's queue turns to features, and an honest stop

**§90 is recorded: base features first, stop working the defect list.** The owner's reasoning is
sound and worth keeping in his words — the schedule has no users, he has barely tested it, and
the defects that matter cannot be known until the features exist and someone drives them. TODO §1
now carries the ordered feature queue and the parked list. The one carve-out: **anything that can
DESTROY DATA still jumps the queue**, which is why 77's `saveBaseline` guard and 79's FTE gate
were built rather than parked.

> ⚠️ **CONTEXT CHECK, VOLUNTEERED — the owner asked to be told before rot sets in, and the honest
> answer is: the FIRST tell is showing, and this is the right place to hand over.**
>
> The tell in START-HERE's list is *small mechanical slips*, and there have been five today, all
> in the last third of the session:
> · three assertions written against PROSE instead of code (`!/passcodesData/`, `!/passcodes/`,
>   `!/prompt\(/`) — each failed on a page that was perfectly correct;
> · one tautological assertion (`ok(… || true)`), which cannot fail and proves nothing;
> · one exit code read through `| tail`, which reported 0 for a run that exited 1;
> · one search window too small (4k) to reach the line it was asserting on, 8.7k in;
> · one extractor anchored on `function` against an `async function`.
>
> **Every single one was caught by a gate, not by me.** That is the system working exactly as
> designed — and it is also precisely the signal the rule says to volunteer rather than quietly
> compensate for. The later tells (asserting things about code without re-reading it, re-deriving
> settled questions, losing the thread) are NOT present: the rulings, the queue and the two-build
> blast-radius split all held.
>
> **The recommendation is specific, not general.** Small, well-bounded work is still safe here.
> **S6 — the Day Board becoming the admin landing page — is not**: it is the largest build of the
> day, on the biggest file in the project, and it needs fresh reading of the grid, the catalog,
> the day documents and the contact fields. Starting it at this depth is how a session produces
> something that looks right and is not. **Hand S6 to a fresh session.**
>
> **The five files carry everything needed to do that.** §90 is in DECISIONS; the ordered feature
> queue and the parked list are in TODO §1; builds 77–80 each have a BUILD-LOG row naming their
> gates and their honesty SHAs; nothing is uncommitted; the auction is untouched and verified at
> 304/164/18 with the isolation guard green.

**WHAT A FRESH SESSION SHOULD KNOW ABOUT S6 BEFORE STARTING.** It was approved 18 Aug ("build and
yes") as *who's on today/now, per site, contacts* — and it BECOMES THE ADMIN LANDING PAGE, which
means it changes the first thing the owner sees, so it is not a bolt-on panel. Two things to
settle before writing code: what "contacts" means (the only per-person data today is a display
name, a KP e-mail, a login e-mail and an FTE — **there is no phone number field anywhere**), and
what "now" means for a site whose shifts cross midnight (`crossesMidnight()` exists and the
catalog carries real times, so this is answerable, not guesswork). **Ask the owner about
contacts; do not invent a field (§22).**

---

## 24 Aug 2026 (BUILD 80 · staff 37) — the request lifecycle stops being a one-way door

**Grouped by subsystem, as the owner asked.** Defects 15 and 16 are the same thing seen from two
ends: the person who asked for something could neither take it back nor find out why it was
refused. Both touch requests, claims and swaps; neither goes near the roster. Defect 3's swap
atomicity was deliberately NOT grouped in — it is a structural change and gets its own build.

**§ defect 15 — WITHDRAW.** A submitted request could only ever be decided by an admin. In
practice people ask for a day off and then no longer need it, and the only route was to message
the admin and hope.

> 🔒 **THE GUARD RUNS ON FRESH DATA INSIDE THE TRANSACTION, NEVER ON THE RENDERED ROW.** By the
> time the click lands, an admin may already have decided it — and **a withdrawal must never undo
> a decision.** Refused if the item is not yours, or no longer pending. The suite asserts that
> race explicitly rather than trusting it.

**Deliberate scope on swaps: only while `pending_target`.** Once the other side has accepted, the
swap is `pending_admin` and retracting it unilaterally would undo someone else's agreement, so
that case is not offered at all. A 3-way reads its initiator from `participants[0]`.

**§ defect 16 — A DENIAL CARRIES A REASON.** Deny wrote a bare status; the requester saw a flat
"❌ denied" and had to come and ask. **The machinery already existed on the APPROVE path** — an
override reason, captured and audited — and had simply never been wired to deny. Two design
choices worth recording:
· **An inline optional field, not a modal.** A blocking `prompt()` would stall the 21 Playwright
  suites that drive this page, and forcing a reason would slow an admin working a queue. Empty
  behaves exactly as before.
· **Read BEFORE the transaction.** The row re-renders the moment the status changes, so reading
  the input afterwards would find an element that no longer exists and silently record nothing.
  That ordering is the load-bearing part of the change, and the suite pins it by index.

Also surfaced: the machine-written `autoDenied` reason for a lost open-shift claim race has been
stored since build 68 and shown to nobody. It now displays. And a withdrawn SWAP joins the
admin's decided list — it never reaches admin, so without that it would vanish from every view
rather than be recorded.

**GATES.** New `build80-test.mjs` **26/26**, executing the real handlers and **capturing what
they hand to the transaction — stubbing `txUpdateItem` to "just succeed" would have proved the
button exists and nothing about whether it is safe.** Honesty vs the pushed admin 79 / staff 36
from the explicit SHA `3e816d1`: **1 passed, 23 FAILED, exit 1.** Schedule battery **all 32
suites green, ZERO skipped**; isolation 27/27; full auction battery per §2 **54 suites / 2,049
assertions, zero skips**; `node --check` clean on both pages.

> 🪞 **THIRD TIME THIS SESSION I WROTE AN ASSERTION AGAINST PROSE.** `!/prompt\(/` failed on a
> page that calls no prompt at all — because the comment explaining *why* prompt was avoided
> contains the word. A second assertion used too small a search window and reported a FAIL on
> correct code. **The fix this time is in the file, not in a resolution:** the suite now strips
> comments before any textual assertion. Twice was carelessness; three times is a missing tool.

---

## 24 Aug 2026 (BUILD 79) — the Users page, alone: KP-address normalisation and the FTE gate

**Kept as its own build deliberately.** The Users page is the single sanctioned exception to the
cardinal rule — the one place the schedule writes the roster the LIVE auction reads. Build 78
carried the grid work so that if anything here misbehaves, nobody has to guess which change did
it. Two builds, two blast radii; that was the entire reason for the split.

**§ S-hygiene — the divergence was MASKED, not absent, which is why it survived this long.** The
LOGIN (Google) address has been trimmed and lower-cased at every writer since [47], because
`firestore.rules` matches it case-sensitively. The KP address — which shares `vacations/emails`
with the auction and is read back by BOTH sites — had `.trim()` and nothing else, **not even an
"@" check**. The auction has normalised it since its own build 270 AND lower-cases at read time,
so a mixed-case address written from here looked fine on the auction side while the stored
document quietly disagreed with what the auction believed it contained.

> 🔗 **THE HELPER IS BYTE-FOR-BYTE IDENTICAL TO THE AUCTION'S, AND THE SUITE PROVES IT BY
> COMPARING THE EXTRACTED FUNCTION BODIES — not by a comment claiming so.** That identity is the
> whole point: two sites writing one document must agree on what that document may contain, and
> a "slightly improved" copy on this side would be exactly the divergence this build closes.
> Scope unchanged from the owner's 17 Aug ruling — trim, lower-case, refuse five unarguable
> shapes, **NO domain policy** — and that freeze is pinned by two assertions that guard the SCOPE
> rather than the code: a gmail address must still pass, and an apostrophe/plus address must not
> be refused merely for looking unusual.

Wired at all three live writers, each degrading the way that field deserves. `addSchedUser` still
ADDS the person and refuses the address out loud — failing a whole add over a secondary e-mail
would be worse than the thing it prevents, and that is the auction's own precedent.
`saveSchedField('em')` refuses rather than storing. `saveAllSchedUsers` fails the BATCH, exactly
as a bad login e-mail or a bad FTE always has: the KP address was the one field on that page with
no validation at all, so a typo saved silently. **There is no fourth call site — `saveSchedUser`
was deleted in 77, which is precisely why that deletion was settled first.**

**§ defect 29 — a flag that existed for the job and was never asked.** `schedFteLoaded` had been
SET since the FTE listener was written and READ by nothing, while `saveAllSchedUsers` turns a
blank FTE box into `deleteField()`. Before that snapshot arrives every box is blank, so **one
click on Save All in the cold-load window would have wiped every FTE in `dailysched/fteMap`.**
The [48] shape exactly. It now gates both FTE writers alongside its three siblings.

**GATES.** New `build79-test.mjs` **30/30**, executing the real extracted `_normKpEmail`. Honesty
vs the pushed 78 from the explicit SHA `e141d13`: **11 of 20 FAIL, exit 1** — 20 rather than 30
because the executed block reports one legible failure when the helper is absent instead of
throwing, the same fix build 78's suite needed. **Schedule battery all 31 suites green with ZERO
skipped** (browser suites RUN). **Isolation guard 27/27 — re-proved deliberately, because this
build touches roster writers.** Full auction battery per §2: **54 suites / 2,049 assertions, zero
skips.** `node --check` clean, staff bytes unchanged, no rules change.

**THE DEFECT-5 FALLBACK WAS RULED, BY CLAUDE, AT THE OWNER'S REQUEST** (*"you decide what's
best"*). **Decision: KEEP the fallback.** A catalog with no demand rules anywhere is the normal
STARTING state, not an error; a button that silently does nothing there reads as broken, and
"nothing happened" is the hardest failure for a non-programmer to diagnose. The failure it would
prevent is not a wrong-data failure — with no rules at all there is no correct answer to violate.
And it is self-extinguishing: the moment ONE demand rule exists anywhere, demand governs every
shift and the un-ruled ones are skipped per §9. The dialog states which behaviour will run, so
neither path can mislead. **The real fix is setting demand rules, not changing this line.**

---

## 24 Aug 2026 (BUILD 78) — auto-populate asks the demand rules; the coverage gap closes

**Owner: "please group what you can and let me know when decisions are needed."** Grouped into
two builds along ONE line: **78 is read/compute paths only and writes no roster; 79 will be the
Users page, alone.** That page is the single sanctioned exception to the cardinal rule, and
lumping it in with grid work would mean that if something went wrong, nobody could say which
change did it. Two builds, two blast radii — that was the whole reason for the split.

**§ defect 5 — the one that would have produced nonsense schedules.** `autoPopulate` and
`autoPopulateYear` used the static per-shift `capacity` for EVERY day of the month and never
called `demandOn()`, which the coverage report has read since build 58. A weekdays-only shift was
filled on Saturdays; a shift with NO demand rules — **§9's "not being asked for at all", which is
not the same as "nobody needed"** — still had somebody assigned every single day, and then turned
up in the `unfillable` warnings for slots nobody had ever requested. **The filler and the report
were working from two different definitions of a day's need, and only one of them was the
owner's.**

> ⚠️ **A PRODUCT DECISION WAS MADE HERE, AND THE OWNER SHOULD SEE IT.** If NOT ONE shift carries
> demand rules, build 78 keeps the old `capacity` behaviour. Honouring demand unconditionally
> would make auto-populate silently do nothing on a catalog nobody has configured yet — a
> baffling regression for a department mid-setup. The condition is the same `shiftsWithDemand`
> count `coverageRows()` uses for `demanded`, so the two cannot drift apart. **If he would rather
> it always honour demand and do nothing until rules exist, it is a one-line change.**

Both confirm dialogs now state which of the two behaviours will run — §84's carve-out, wording
that causes a wrong action is a defect, and "fills every shift in the catalog" was *true* and was
the bug. Both completion alerts NAME the shift-days skipped as not-asked-for, so "complete — 12
assignments" can never read as a fault. Same reasoning as [59]'s named skipped months.

**§ defect 13.** `renderStatsYear` had no in-flight guard: `statsYearLoadedFor` is set only after
the 12-month `Promise.all` resolves, so a second click — or any of the ~9 listeners calling
`renderAll()` while the panel is open — started another twelve reads. The existing staleness check
catches a fetch for a DIFFERENT year and **structurally cannot see a duplicate of the same one**.
Now one at a time, released in a `finally`. A deliberate Refresh clears the marker, so an action
the admin asked for beats the guard while accidental re-entry does not.

**§ defect 25.** `dailysched/callTotals` and its listener deleted — a legacy counter superseded by
`windowShiftCounts()`, still subscribed on every page load, feeding a variable with zero read
sites. One fewer Firestore read per admin page load; the document itself untouched.

**§ item 3 — the coverage gap is closed.** `tests/sched/appcheck-signin-test.mjs`, 28 assertions,
for builds 71–74 / staff 31–35, which shipped with no suite in this battery at all. **It pins the
REVERSAL honestly:** build 72's rule that un-hid the reCAPTCHA badge must be ABSENT (§66 undid it)
and the attribution Google requires once the badge is hidden must be PRESENT with both links —
the suite refuses to let those two drift apart, because one without the other breaks Google's
terms. Honesty from the explicit SHA `2c97296`: 24 of 28 fail on admin 70 / staff 30.

> 🪞 **THREE OF MY OWN ASSERTIONS WERE WRONG BEFORE THEY WERE RIGHT, and the pattern is the same
> one this project keeps finding in shipped code.** Two tested PROSE rather than CODE — a
> tombstone comment names the very variable it removed, so `!/passcodesData/` failed on a
> perfectly correct page. A third was a tautology: `ok(… || true, …)`, which cannot fail and
> therefore proves nothing — a FAST-1 in miniature, written by the person who had just written
> the FAST-1 lesson into the brief. **An assertion that cannot fail is not a weak test, it is a
> false one.** All three were rewritten to test the code.

**GATES.** New `build78-test.mjs` **26/26**, both defects proved by EXECUTION: defect 5 by running
the real `demandOn`/`autoTargetFor` chain over weekday, weekend, holiday, explicit-zero,
stacked-rule and no-rules-anywhere cases; defect 13 by calling `renderStatsYear` three times
concurrently and counting **12 reads, not 36**. Honesty vs the pushed 77 from the explicit SHA
`a796d02`: **0 passed, 16 FAILED, exit 1** — and the suite was changed mid-build to report a
missing build-78 function as a legible FAILURE instead of throwing, **because a crash and a real
regression are indistinguishable from an exit code**. Schedule battery green, isolation 27/27,
`node --check` clean, staff bytes unchanged, no rules change.

> ✅ **CLOSED — the owner re-authenticated and the full battery ran: 54 suites / 2,049
> assertions, zero skips, exit 0.** The schedule battery was also run in full in the cloud:
> **all 30 suites green with ZERO skipped**, browser suites included. Build 78 is fully gated.
> The account of how it stood open is kept below, because the handling is the point.
>
> ⛔ *(as it stood)* **THE AUCTION BATTERY IS ONLY PARTLY RE-RUN, AND THAT IS AN OPEN GATE.** §2 requires the full
> auction battery after a schedule build. Staging to the cloud failed with
> `session_stale_relogin` — the owner's desktop sign-in went stale — and the COST GATE says stop
> and name the cheap fix rather than grind a workaround, so that is what was done. What WAS run,
> directly on the device: the three auction suites that actually read the schedule admin page —
> `test-appcheck-login` 84/84, `test-audit-fixes` 338/338, `test-delta-fixes` 93/93, all green.
> **The coupling is proven; the other 51 suites are not re-run.** Do not record build 78 as fully
> gated until they are.

Also unrotted while in the file: build **64**'s row still read *"in working tree, awaiting owner
push"* — it shipped 17 Aug as `13db983`.

---

## 24 Aug 2026 (BUILD 77) — the baseline can no longer be erased by a click; a dead roster writer is gone

**Schedule admin 77. Staff unchanged. Owner: "go with your recs."** Two changes, one theme:
a destructive write that could fire against an empty screen, and a roster writer no click could
reach.

**1 · `saveBaseline` — the fix is a GUARD, and NOT `{merge:true}`.** This is worth stating because
merge was the obvious fix and it is the WRONG one. The write REPLACES `dailysched/callBaseline`
deliberately: the table is the full source of truth and a blank box means zero, so merging would
make it impossible to blank a value. The actual defect was that `renderBaseline()` emits **no
inputs at all** when the roster is empty or the catalog holds no call shifts — while the Save
button stays live. One click during a slow, empty or permission-denied load wrote an empty map
and destroyed every baseline: **the one input that cannot be recomputed from the schedule.**
Build 77 counts the boxes it expects **using the same id derivation the writer uses** (so the
check can never disagree with what the writer would find) and refuses the whole write if even one
is missing — a partial table is never saved over a complete document. Unchanged since admin 30.

**2 · `window.saveSchedUser` DELETED (defect 26).** No call site since July 2026, yet one of the
**six sanctioned handlers** in `tests/sched/isolation-test.mjs` — the cardinal-rule allowlist for
writing the roster the LIVE auction reads — still carrying real roster writes, the [47] duplicate
guard and the [48] loaded-gate on unreachable code. **The sanctioned set is now FIVE and equals
the reachable write surface, which makes the guard STRICTER, not looser.** A tombstone in the page
records what went and why.

**THREE TEST PINS MOVED WITH IT, AND NONE IS A WEAKENING — this was checked before touching them,
not asserted afterwards.** The isolation allowlist shrinks (fewer sanctioned names = stricter).
`build75-test`'s sibling COUNT goes 3→2, while the assertion that actually proves build 75 — the
gate inside `addSchedUser` itself — is untouched two lines below it. And `test-audit-fixes`'s pin
on the deleted function is removed: **the other three roster writers keep their pins, and one of
them is EXECUTED rather than pattern-matched**, so the [47] guard's coverage is unchanged.

**GATES.** New `tests/sched/build77-test.mjs`, **23/23**, executing the real extracted
`saveBaseline`. **The stub is shaped like the real render** — a box exists only where the table
actually drew one — because a stub that always returns a box would have hidden this defect
completely. That is [304 · FAST-1]'s lesson applied deliberately rather than remembered.
Honesty `--pre` against the pushed **76**, fixture from the EXPLICIT SHA `6d31b3e`: **9 of 23
FAIL, exit 1.** A real failure, and the exit code was read directly rather than through a pipe —
`| tail` had reported 0 on the first attempt, which is the same class of lie as today's other
three.

> 🧪 **FOR THE FIRST TIME, A SCHEDULE BUILD WAS GATED BY THE 21 PLAYWRIGHT SUITES INSTEAD OF
> WATCHING THEM SKIP: all 28 schedule suites green, ZERO skipped.** They normally skip on the
> owner's Mac (no chromium) and hard-fail in the cloud (chromium present, `playwright` module
> absent — the mis-gate recorded this morning). Both were fixed for this run by installing
> `playwright` in the cloud container and bridging the browser-build version gap by hand
> (`chromium_headless_shell-1234` → the preinstalled `-1194` binary). **This is a per-session
> workaround, not a repair** — the skip gate in `sched/run-all.mjs` still tests for a binary
> rather than the module, and that item is still awaiting the owner's ruling.

Full auction battery re-run per §2: **54 suites / 2,049 assertions, zero skips** — 2,050 minus
exactly the one pin removed above, reconciling to the digit. Isolation guard green.
`node --check` clean on all three inline blocks. No rules change, no new Firestore reads or
writes, staff bytes untouched.

**Deliberately NOT done, and why.** Defect 7's remaining tail — two admins editing baselines at
the same moment still last-writer-wins — was left alone. Fixing it properly means per-field
`deleteField()` sentinels under a merge, which is a bigger change than the destructive path
needed, and §85's containment rule says a real finding does not license the wider change.

---

## 24 Aug 2026 (SCHEDULE) — the schedule list was eight builds stale; reconciled from the code

**The owner turned to the schedule and said he believed there were several outstanding items.
There were — but not the ones the list named.** TODO §3 had been carried unchanged since 17 Aug
and was describing **build 63/28 while the site is at 76/36**. Rather than propose a build off a
stale document, the list was rebuilt from the shipping bytes: three independent readers, every
recorded status checked against code, git history used to date changes. **Where the record and
the code disagreed, the code won.**

**No schedule code was changed. Nothing was built.** The auction was not touched — §1's
constraint held throughout.

**WHAT GOT SHORTER (good news, and the reason reconciling first was right).**
· **Defect 8 is CLOSED** — the item recorded as "requests, swaps and openShifts are still single
`{list:[…]}` documents and will not survive daily use by 60 people". All three became per-item
subcollections in admin 68 / staff 30; the legacy documents are read-only merge inputs and a grep
for every write form across both pages returns **zero** hits against them.
· **Defect 28 CLOSED** (passcodes gone from staff 35; admin never referenced it).
· **Defect 29 HALF closed** — `namesLoaded` became load-bearing in build 66 (it gates the end of
boot mode); `schedFteLoaded` is still set and never read.
· **Defect 23 CHANGED SHAPE** — a shift's `role` now drives the catalog filter, so it is not
purely decorative, but it is still read by nothing that affects scheduling.

**THE THREE THAT ARE NOT DOCUMENTATION — all awaiting the owner's ruling, none built.**

**1 · `saveBaseline` can erase every call-fairness baseline in ONE CLICK.** It full-document
overwrites `dailysched/callBaseline` with a map built by reading the DOM — one input per user per
call shift, `if(!el) continue`. `renderBaseline` returns early with **no inputs at all** when the
roster is empty or the catalog has no call shifts, **and the Save button is always live and
unguarded**. One click during a slow, empty or permission-denied roster load writes `{_asOf:…}`
and destroys every baseline. **That document is the ONE input that cannot be recomputed from the
schedule** — it exists precisely to record call worked *before* the system. Fix is two small
things: refuse Save when the grid rendered no inputs, and `{merge:true}`. Unchanged since admin
build 30.

> ⚠️ **2 · A GATE LIES, AND IT IS THE THIRD ONE TODAY.** `sched/run-all.mjs` decides whether to
> skip its 21 Playwright suites by testing for a **chromium binary**, not for the **`playwright`
> module** — and `playwright` is not in `tests/package.json`. On a machine with the binary and no
> module, all 21 RUN and hard-fail `ERR_MODULE_NOT_FOUND`, and the battery says "21 of 27
> failed". On the owner's Mac they skip cleanly. **So the BUILD-LOG rows reading "27/27 with ZERO
> skipped" and "N green + 21 skipped" are the same battery on two different machines, and the
> exit code alone cannot tell you which.** Gate on the module, not the binary. Today's other two:
> FAST-1's convenience stub (see the CLOSE entry) and `pgrep -f` matching its own polling shell
> (see RA-5). **Same disease every time: the gate reported on something other than what it
> claimed to measure.**

**3 · Builds 71–74 and staff 31–35 have no suite in the schedule battery at all.** Their only
executable gate is `tests/test-appcheck-login.mjs`, which sits at the tests root and is swept up
by the **auction** battery — contradicting the separation `tests/sched/README.md` rests on.

**AND ONE THAT SHOULD BE SETTLED BEFORE ANYTHING IS BUILT ON IT.** `saveSchedUser` has had no
call site since commit `1e2f2cc` (July 2026) — yet it is one of the **six SANCTIONED handlers**
in `tests/sched/isolation-test.mjs`, the cardinal-rule allowlist for writing the live auction
roster. It still carries real roster writes plus the build-47 duplicate guard and the build-48
loaded-gate, all maintained on unreachable code. **One sixth of the allowlist is dead, so the
guard over-states the real write surface.** S-hygiene's `_normKpEmail` port would otherwise write
a fourth call site into a dead function.

**SMALLER CORRECTIONS WORTH NOT RE-DISCOVERING.** The mobile defect's recorded wording conflates
the two pages: the staff page's 9px grid **is** its small-screen override and dates to the first
commit, while **the admin page has no responsive rule of any kind**. Builds 69/70 do not help and
69 slightly hurts — Compact fixes row height, not the horizontal axis that actually breaks, and it
moves labels into `title=` tooltips, which do not exist on touch. Defect 16 is closer to done than
it looks: the **approve** path already captures an override reason and writes it to the audit log;
deny was simply never wired to the same machinery. And whoever ports the auction's
`requiredBuilds` ratchet must give it its own key namespace — the schedule's `PAGE` values are
`'index'` and `'admin'`, the same keys the auction ratchets, so a naive port would have schedule
admin 76 compare itself against the auction's admin build and reload-gate forever.

**Filed this session:** `schedule/BUILD-LOG.md`'s three false *pending push* rows now carry real
SHAs (`6d31b3e` for 76/36, `dc6b8cc` for 75, tests `1d9e8da` for PW-1) — the same rot the auction
BUILD-LOG had cleared in `1a8805d`. TODO §3 rewritten; a §1 pointer added for the three rulings.

---

## 24 Aug 2026 (RA-5) — the final audit ran and found nothing; §89 closes security work

**The session did two things: regenerated a stale STATUS block, and ran RA-5.**

**RA-5 — the final pre-launch audit, under the new §89.** Owner's scope, verbatim: *"CRITICAL/HIGH
only — things that would truly derail a live election… No more security improvements, no other
items that would be nice, only 100% absolutely necessary fixes."*

**RESULT: nothing. Zero CRITICAL, zero HIGH.** Report is PRIVATE at
`tests/docs/RA-5-2026-08-24.md`. Tree audited: the pushed `1a8805d` — staff 164 / admin 304 /
mobile 18, verified against live `versions.json` cache-busted twice.

**Method.** Seven blind lenses (engine fairness · decision writes · bidder sign-in and bidding ·
mail · the 300–304 and 163–164 diffs · stuck-auction states · the human walkthrough), each given
the same written scope floor, the same do-not-re-raise list, and the FAST-1 lesson. **Each was
told in writing that zero findings was the expected and acceptable answer** — deliberately, to
remove the pressure to manufacture one. Then two adversarial skeptics on the single candidate,
both defaulting to REFUTED.

**Four of the seven proved their conclusions by EXECUTION, not by reading.** 17,836 randomised
week states with zero disagreement between the admin engine and the staff twin · 16,894 states
re-deriving NE-1…NE-5 from first principles, zero violations · 6,882 reachable approve-clicks
with the over-cap warning never missed · the FAST-1 predicate run in both states.

**The one candidate, and how it died.** A lens raised HIGH: a returning bidder whose device
cannot read Firestore gets a sign-in card with no button and no message, because the App Check
explanation sits behind the button that was just hidden. **Refuted by execution in a jsdom
harness loading the verbatim markup:** the auth handler fires on page LOAD for a restored session
— no click — and its no-initials branch un-hides the picker and writes the message into it. And
the decisive point: sign-in resolution reads the roster from Firestore, so a user whose reads are
refused cannot sign in *or bid* whether the button shows or not. **The delta was the error
message, not access.**

A second skeptic then hunted the worse version — a bidder who reads Firestore fine but still
cannot act. Every divergence it constructed (on the roster but no login address and the reverse;
removed mid-session; re-added; duplicate address; typo'd address) lands on a visible, honest,
actionable message, and the duplicate-address path fails CLOSED with a loud admin alarm.

**Two facts worth carrying forward.** The FAST-1 fix in 304 is genuinely live — three lenses
confirmed it by running the predicate, not by trusting the commit. And **switching on outbid
alerts and welcome mail will NOT fire a backlog**: neither generator keeps any "last notified"
state, so there is nothing to replay. Worst case is two mails per physician at their next
individual sign-in. That was the specific launch risk worth checking.

**Below the floor, recorded so it is not re-discovered as new:** fast-mode decision writes are
fire-and-forget — the write promise goes to an inline `onclick` that discards it, so a *rejected*
write shows no error toast. Four lenses found this independently and all four dropped it. It does
not qualify because the ordinary failure (wifi drop) leaves the write pending rather than
rejected and is equally silent in the normal path; the success toast is also absent, so the admin
gets a signal; and **Complete Phase refuses while any bid is undecided**, so a lost decision
blocks completion by name instead of reaching the archive or the mail.

> ⚠️ **A GATE LIED AGAIN, in the same shape as FAST-1 — and this time it was a monitoring
> command, not shipped code.** The battery was launched with `setsid nohup` on the device and
> polled with `pgrep -f run-all.mjs`. When the device dropped off the bridge the node process
> died with it, but `pgrep` kept answering RUNNING — because the pattern matched the polling
> shell's OWN command line. The log had been frozen for an hour. **`pgrep -f <pattern>` matches
> the process running the pgrep. Check the log's mtime against `date`, not the process table.**
> Same lesson as 20 Aug's handler audit that always printed 1: when a gate reports success,
> check that it actually ran.

**THE BATTERY IS GREEN ON THE AUDITED BYTES — 54 suites / 2,050 assertions, exit 0, ZERO skips**,
reconciling exactly with the count recorded earlier on 24 Aug. It had to be run IN THE CLOUD after
the device dropped; see the recipe below.

> 🧪 **HOW TO RUN THE AUCTION BATTERY IN THE CLOUD — the two things that make it work.**
> Both repos are PUBLIC, so the cloud can clone them directly; only `tests` is private and has to
> be tarred (minus `node_modules`) and staged. Then:
> 1. **`REPO_ROOT` is NOT enough.** Several suites ignore it and hard-code `join(_here,'..')`, so
>    the tests folder must physically SIT BESIDE the repos: `<root>/tests`, `<root>/vacation-kp.
>    github.io`, `<root>/schedule`. Set `REPO_ROOT=<root>` as well, for the suites that do read it.
> 2. **`schedule` must be present and `--unshallow`ed.** Three auction suites read the schedule
>    admin page (this is the cross-site coupling START-HERE warns about), and the honesty suites
>    run `git show <sha>:<file>` against explicit SHAs in BOTH repos — a `--depth 1` clone makes
>    every one of those a FAILED gate, correctly.
> md5-verify the clone against the device tree before believing the run. Five files: both
> `index.html`s, `admin/index.html`, `crna/index.html`, `mobile.html`, `firestore.rules`.

**Housekeeping note for whoever reconciles the record:** the auction repo's newest commit
`1a8805d` (audit docs out of the public repo, BUILD-LOG unrotted) is not described anywhere in
START-HERE. It changed no served bytes and no build number.

---

## 24 Aug 2026 (CLOSE) — FAST-1 shipped dead, was fixed as admin 304, and the queue is empty

**Everything built across 22–24 Aug is now PUSHED AND LIVE.** `versions.json`, fetched
cache-busted twice from the session: **admin 304 · index 164 · mobile 18**, and disk agrees.
Battery re-run on the pushed tree, on the device: **54 suites / 2,050 assertions, zero skips**;
the CRNA stamp test passed on the FIRST run, which is the proof that `crna/` is in sync.

**THE SESSION'S REAL LESSON — a suite passed over a defect because its stub was more convenient
than the truth.** FAST-1 (the "stop asking me for the rest of this session" mode for batch
approvals) shipped inside admin **303** and was **dead on arrival**. The owner found it in one
sentence: *"i cannot use the feature."*

- **Cause.** The skip is offered only when a decision carries no warning. One input to that
  predicate is `readinessWarnHtml()`, and that function **always returns a non-empty string** —
  it wraps its content in a `readinessWarnBox` div even when it has nothing to say. So `!!_rdy`
  was true for every decision, every decision read as *warned*, the offer never rendered, and
  nothing could ever be skipped. The feature was inert in 100% of cases.
- **Why 52 assertions did not catch it.** The suite's stub for `readinessWarnHtml()` returned
  `''` when there was nothing to warn about. That is what a reasonable person would write, and it
  is wrong in exactly the dimension the bug lived in. **Stub the SHAPE of the real function, not
  the convenience.** A stub that cannot reproduce the production return value is not a test of
  production.
- **The fix (admin 304, `1c5a72a`).** Test the box's TEXT, not its existence:
  `const _rdyWarns = _rdy.replace(/<[^>]*>/g,'').trim().length > 0;` — applied at all three
  handlers (`confirmApprove`, `adApprove`, `adDeny`). Stub corrected to mirror the wrapper; a
  regression section added. Honesty check against the shipped 303 at explicit SHA `52c9c2d`:
  **17 of 52 fail there, exit 1.**
- **And a second-order trap:** the fix's own comment quoted the literal `id="readinessWarnBox"`
  three times, which broke `test-delta-fixes` — a guard that counts that attribute expecting
  exactly one. The comment was reworded. **The guard was not weakened.** A guard that a comment
  can trip is doing its job.

**A prior answer that was worse than useless.** Asked whether FAST-1 was live, Claude answered
"it's live" because the code was in the pushed bytes. The bytes being present says nothing about
the feature being reachable. **"Shipped" is not "usable" — the only honest answer to "is it live"
is one that describes the code path a user's click actually takes.**

**Also shipped 24 Aug:** staff **164** + admin **303** (`04e00bf`) — Memorial Day and July 4th sit
inside the summer window but showed only their holiday label; they now carry the sun as well.
`summerAlso(meta)` at all three render sites. **The floor was never affected** — it derives from
the date window per `[153 · AUD-C1]`. Only the marker was missing.

**State at close.** All four repos clean and in sync with origin, no locks. **The queue is empty.**
What remains is the owner's own: real-bidder sign-ins (the old "16 of 37" predates the roster
update to 35 and must be recounted), the launch sequence, and M-4's data half (clear the address
FIRST, then re-save — re-saving alone short-circuits to "no change"). **Outbid-alert and welcome
e-mails are both still switched OFF.**

---

## 24 Aug 2026 (LATER) — the deck's screenshots, and where files actually live

**Admin 301 pushed and live. Then the deck: rev 3 added the FTE cards, rev 4 replaced four
screenshots with captures taken during the owner's rehearsal.** Both filed in `tests/docs/`.

**THE LESSON THE OWNER ASKED TO BE WRITTEN DOWN — three filesystems, not two.** Chrome-control
screenshots taken with `save_to_disk:true` land in **the CLOUD container's** `/tmp/claude-chrome-
screenshots-<id>/`, even though Chrome runs on the owner's Mac. Claude read that path, assumed
macOS, checked `device_bash` (whose VM has its own `/tmp` and correctly reported nothing), declared
the files unreachable, and sent the owner hunting through Finder — three separate times, proposing
a new mechanism each time. The files had been in Claude's own workspace from the first capture.
**The owner solved it by saying "you took the screenshots with chrome control and put the ppt
together with them" — i.e. it had worked before, so the premise was wrong.** The rule now in
START-HERE: when a file seems unreachable, check ALL THREE filesystems before asking the owner to
move anything. The screenshot path needs no transfer at all.

**WHAT THE REHEARSAL CAPTURES GOT** (all taken at staff 163, Phase 2 open, rehearsal mode ON):
the sign-in screen with no remembered account · the welcome-back screen reading **Vacation
Goddess** · the **Popcornometer in full frenzy** (105 changes/24h — only obtainable on a busy
board) · a November board block with live bids and FTE readouts · the locked-weeks panel · and a
Week 44 tile showing a combined bid and all four outcome badges at once.

**DECK EDITING MECHANICS, so the next session does not rediscover them:**
- Media map: `image1.jpg` = slide 15 login · `image3.jpg` = slide 16 Popcornometer ·
  `image5.jpg` = slide 17 board · `image11.jpg` = slide 21 locked weeks. Replacing the file
  in place keeps the rels and content-types untouched — **convert PNG captures to JPEG** and
  reuse the existing filename rather than adding parts.
- **Always resize the `<a:ext>` to the NEW image's aspect ratio**, or PowerPoint stretches it.
- **Card backgrounds do NOT move when you move their text.** This bit twice in one session —
  slide 33's rows and slide 31's stat cards both had text re-laid onto stale white cards.
  Re-space the `roundRect` and the text together, and **look at the render** before shipping.
- Capture artifacts: the extension bakes red click markers into the image. Crop them out.

**⚠️ UNRESOLVED, AND IT MATTERS — THE DECKS MAY NOT BE IN GIT AT ALL.** Every `.pptx` filed into
`tests/docs/` this session was delivered with `device_commit_files`. The files are on disk (`ls`
shows all four), they are NOT ignored (`check-ignore` says so), and they are NOT tracked
(`ls-files` does not list them) — **yet git over the bridge reports the tree CLEAN and lists no
untracked files.** A control test proves it is specific to the delivery method: a probe file
written by `device_bash` in the same folder showed up as `?? docs/_probe.txt` immediately.
Touching the `.pptx` files did not make git notice them.

**Claude could not fix it from here**, because staging is a git WRITE and §4 forbids
`add`/`commit` over the bridge (stranded `index.lock`). It is possible this is an artifact of the
device VM's mount and that git on the owner's own Mac sees them normally — **UNVERIFIED**.

**RULED 24 Aug: "forget this, mark it off, i don't care."** The deck is not committed and will not
be; do not re-raise it. The RULE below survives the ruling because it is not about the deck — it is
about any file a machine must read. **The owner was asked to check GitHub Desktop; that chore is
withdrawn.**

**The DECK is not the worry** — the owner said so directly, and he is right: it exists in the chat,
on his disk, and in the outputs column. **The worry is the mechanism.** The same silent drop would
apply to anything delivered this way — a `firestore.rules` file, a new suite, a build artifact —
and those are the cases where "on disk but invisible to git" causes real damage. **So the rule is
about the METHOD, not this file: prefer `device_bash` for anything that must end up in a commit,
and treat `device_commit_files` as delivery only.** "Filed" still means committed and pushed.

**Still not replaced:** the timer and bid-chip crops on slide 16 and the bid-dialog shots on
slides 18–20 — those need bid interactions Claude will not perform on the owner's behalf. DECK-2
still carries them.

---

## 24 Aug 2026 — §88 sort order built as admin 301, and a lesson about conceding

**Admin 301 ships SORT-1 on the owner's ruling "Always sort by projection."** Detail in BUILD-LOG
and DECISIONS §88; what belongs here is how the finding was nearly lost.

**Claude claimed the by-week report shared the panels' defect. The owner said closed phases do not
re-order and that Claude was wrong. Claude then conceded — reasoning its way to "closed-phase
result-ordering is arguably right."** That concession was wrong, and it was wrong in a specific,
repeatable way: it accepted the owner's *description* of the symptom (nothing moves) and never
tested the *other* property (the order is incorrect while standing still). Two turns later the owner
supplied the missing observation — *"even complete phases have users re-order incorrectly"* — and
the whole thing resolved into one defect with two faces: position was keyed on the DECISION, which
mid-phase moves rows under the cursor and post-phase buries a strong denied bid under a weak
approved one.

**The lesson, worth more than the build:** a concession made from someone else's description is
worth no more than the claim it replaced. Both sides were arguing from memory and from how output
looked. The rule that already exists for this — *when in doubt during the day, run it, don't recall
it* — applies to Claude's agreements as well as its assertions. Claude changed position twice on
this before reading any code.

**What reading it actually found.** Six sort sites, not the three assumed: both Approvals/Denials
views, both Draws & Reviews views, the by-week report, and the context rows under a week card, which
sorted by strength alone and so disagreed with the rows directly above them. Two more surfaces were
checked and left alone — `exportUserSummary` already complied, and the best-bids table carries no
outcomes. **And one real gap:** the panel held no projection at all for past-phase rows, so those
sorted by NAME — the completed-phase case the owner reported. It now rebuilds the projection from
the phase snapshot, the same source the report already used.

**A question the owner asked, answered by measurement rather than opinion:** are the natural and
frozen projections ever different, or only different in code? Over 6,000 week states they are
**identical**, and neither moves when a decision is written — §77 removed everything `ignoreAdmin`
used to switch. The flag is vestigial. Recorded because it also means every render currently runs
the engine twice for two answers that always match.

**The honesty check reproduces the owner's own observation.** Deny a projected winner and approve a
projected loser: the pushed 300 renders DEV → BEN → CAI → ANN; 301 renders ANN → BEN → CAI → DEV.
17 of 23 assertions fail on 300, exit 1.

**Also filed this session, held in the cloud while the owner's Mac was offline:** DECK-2 (recapture
the deck's screenshots during a rehearsal, and cover the features shipped since build 149), FAST-1
(a "stop asking" mode for batch decisions, fully specified, not built), and BULK-1 recorded as
DECLINED so it is not re-proposed. The deck itself went through a full owner review: 38 slides to
31, all light-blue eyebrow labels and numbered circles removed, seven section dividers deleted, and
two factual errors fixed against the live settings — there is no summer floor, and the timer runs in
affects-others mode.

---

## 22 Aug 2026 (LATER) — §87's two findings built as admin 300

**Owner: "go ahead with h1 and m1."** So exactly those two, and nothing adjacent (§85/§87).
Filed to the working tree, batteries green, **not pushed** — the owner pushes.

**What the session actually did first, and why it mattered.** The START-HERE text pasted into the
chat was the PRE-§87 copy: it still described the queue as two builds (H-1 · M-1 · M-3 · M-6 · M-7
plus a rules change). The copy on disk and DECISIONS §87 say two FINDINGS, one build. Working from
the paste would have shipped five findings and touched `firestore.rules` for no reason. **A pasted
governing document is a snapshot; the disk copy is the document.** Everything below was verified
against the bytes before anything was edited.

**H-1 — five consumers of the frozen projection that 298 did not repoint.** The report's shape held
up exactly. The measurement is the part worth keeping: run over 5,000 decided week states, the
frozen projection's `cap - fteWon` and `weekLedger(...).remainingFte` disagree in **82.1%** of them,
worst gap **3 FTE**, and — this is the part a comment would never have caught — **in both
directions**. 3,147 states report a week FULLER than it is (which locks an empty week) and 960
report it EMPTIER (which offers a committed one). The owner's own §82(d) case reproduces verbatim:
a capacity-3 week whose bidders were all denied reads **0.2 remaining instead of 3**. Repointed one
line each: the ✓ Approve as Win dialog, the **Remaining** figure on both decision-panel headers
(**Winning** deliberately left on the projection — that is what it means, §77/§82(b)), the two lock
helpers that WRITE locks, the Phase-4 round opener, and the rehearsal simulator's fit test.

**M-1 — the second row.** Because the projection is frozen, an approved person stayed in the draw
set and was drawn again as a bare row with no chip and a live ✕ Deny whose handler removes the
approval. Now one row per person per week, wearing the decision, Revoke in place of Deny; the wheel
reads the draw rows so decided people leave it; and Deny's confirm names an approval it will remove.

**THREE EXISTING SUITES WENT RED, AND THE FIX FOR THEM IS THE POINT.** `test-p4-rounds`,
`test-reopen-smartlock` and `test-round-months` sandbox `_reopenRoundMonths`, and their contexts
carried no ledger — `ReferenceError: weekLedger is not defined`. The cheap repair was a stub
returning `cap - fteWon`, which would have written **the defect itself** into three suites as the
definition of capacity. They were instead given the REAL extracted `decidedWinners`/`weekLedger`,
with `test-round-months`'s fixtures expressing each week's `fteWon` as one synthetic holder so
every case is unchanged and the arithmetic under it is the shipping arithmetic.

**GATES.** New `tests/test-admin-300-capacity.mjs`: 35 assertions, every behavioural one executing
extracted code. Honesty check EXECUTED against the pushed 299, fixture built from the **explicit
SHA `903ab97`** (§4 — never `HEAD~n`): **17 of 35 fail there, exit 1.** Not a skip. Full battery
**50 suites / 1,951 assertions, zero skips** — 1,916 + 35, reconciled exactly, which is the check
that no suite quietly lost assertions. Schedule isolation guard 27/27. CRNA restamped to 300 by the
battery itself (`test-crna-stamp` regenerates and fails if `crna/` is stale — so the crna/ diff in
the working tree is required, not a stray edit). `firestore.rules` untouched, so RA-2 was neither
required nor run; the rules-emulator suite's "not covered by this run" line in the battery is that
same pre-existing condition, unchanged.

**Still the owner's own, still undone: real-bidder sign-ins** — 16 of 37 have never signed in.

---

## 22 Aug 2026 — THE MACHINE DIED. Everything was rebuilt from GitHub, and two files were nearly lost for good

**What happened.** The Mac every previous session ran on failed. The owner moved to a new
MacBook Air, where iCloud had mirrored `~/Documents/GitHub` — and that mirror is what made the
day hard. With **"Optimize Mac Storage" ON**, iCloud keeps placeholders instead of file contents
and materialises them on access. Ordinary apps cope. Git does not: it reads hundreds of small
files at once, receives `EDEADLK` instead of bytes, and reports a healthy repository as corrupt,
empty, or *"not a git repository"*. Roughly 10% of the tree was actually readable. Two hours were
spent trying to rescue files out of a source that was rearranging itself underneath the attempt.
**The setting is now OFF. That is the whole fix, and it is the single most important operational
fact on this page.**

**What was actually at risk, and what was not.** Everything ever pushed was safe and always had
been — three repos came straight back with `git clone` and needed nothing. The danger was
entirely in what git had never seen:

- **`test-staff-162.mjs`** and **`docs/RA-4-2026-08-21.md`** were UNTRACKED. Not ignored —
  simply never added. They existed on one dying machine's disk and nowhere else on earth.
- Four modified suites (`test-audit-fixes`, `test-c2-priorphase-rebid`, `test-staff-158`,
  `test-staff-highs-155`) were uncommitted.
- The entire **Staff 162 build** — `index.html`, `crna/index.html`, both `versions.json`,
  `BUILD-LOG.md` — was uncommitted.

All of it was recovered: the build from the disk mirror before it emptied, and the two untracked
files from **iCloud → Recently Deleted** after the folder had already been thrown away. Margin
was hours. **`_archive/` and `_to_delete/` came back the same way.**

**The trap that hid the build: there were TWO clones of one repo.** `vacation/` looked finished
and in sync; `vacation-kp.github.io/` was the working copy that actually held Staff 162, and both
pointed at `github.com/anesthesia-kp/vacation`. The first read of the tree said "clean" because
it read the wrong one. **There is now exactly one clone, named `vacation-kp.github.io`** — the
name every document and `status.mjs` expects, and the name `RA-2.command` needs to reach the
`d49cd15` fixture. During the rebuild it was briefly called `vacation`, which would have made
`status.mjs` silently print `?` for every auction build.

**A clone does not restore a gitignored file.** `tests/package.json` and `package-lock.json` are
in that repo's `.gitignore`. A fresh clone therefore has no dependency manifest, `npm install`
does nothing, and `test-rules-emulator.mjs` skips — quietly reporting *"firestore.rules is NOT
covered by this run"* rather than failing. Both were restored by hand. **Whenever a repo is
re-cloned, check its `.gitignore` for local-only files that no clone will bring back.**

**What was pushed.** `10bd4a2` — Staff 162, the RA-4/H-2 and H-3 work: a 10-second
`_awaitWrite` deadline on every write the bid dialog waits for, the save-lock safety timer raised
to 15s so it outlives that deadline, and *"couldn't confirm"* rather than an asserted failure,
because a deadline is not a refusal. CRNA restamped 162. Then `f4f7556` in the tests repo —
the 162 suite and the RA-4 report, both now tracked.

**Verification, because a rebuild deserves more than a green tick.** The 162 suite was run
against the rescued build (**38/38**) and then against the pushed build 161 taken from the
explicit SHA `2cd6a55`, where it **failed 21 assertions** exactly as its own `--pre` honesty
mode demands. The full battery then gave **49 suites / 1,916 assertions, zero skips** — the same
number the 21 Aug session had already recorded for this tree. Two independent machines, the same
count: that is what says the reconstruction is byte-correct rather than merely plausible.

**The rules suite was rebuilt from nothing on the new machine.** Node, then the Xcode
command-line tools for `git`, then `RA-2.command` did the rest — `npm install`, the 64MB
Firestore emulator jar, and the run: **59/59 on the current rules**, matching the historical
figure. Worth recording for the next fresh machine: the cloud session **cannot** substitute —
`storage.googleapis.com` is not on its allowlist, exactly as `test-rules-emulator.mjs` says in
its own header comment.

**M-4 was settled the same night, and settled DOWNWARD.** On 21 Aug the owner glanced at the
live login e-mails, said *"there are a couple lower cases"*, and M-4 was promoted from latent to
LIVE on the strength of it. On 22 Aug he read the four documents the rules actually compare
against — `vacations/loginEmails`, `vacations/adminAccess`, `vacations/emailToUser` and
`dailysched/adminAccess` — and found **no capitals in any of them**. So nothing is broken for any
bidder or admin, and no data fix is owed. The lesson is RA-4's own wording, which said *look at
the live document*: the first reading was of a rendered page, and a rendered page is not the data.
Space-padding, which RA-4 named in the same breath, was not separately checked and is invisible in
the console — unlikely, not excluded.

Two constraints surfaced while scoping the fix, and they make it less trivial than "one rules
edit". **Rules cannot lowercase the stored side of a list** — there is no map operation; the
candidate is `data.emails.join(',').lower().split(',')` and it must be PROVEN with RA-2, not
assumed. And **`emailToUser` is a map keyed by address**: membership can be tested against lowered
keys, but the value for a lowered key cannot be fetched, so `myInitials()` is unfixable in rules.
That half, and padding, can only ever be fixed in the data.

**THE SESSION ENDED WITH A NARROWING — §87.** With the rules suite green and the queue in front
of him, the owner declined to build at midnight and cut §86 down: *"i only want to do 100%
necessary fixes at this point"*, then *"ignore other items"*. **Only H-1 and M-1 survive.** M-3,
M-6, M-7, M-9 and M-4 are off the queue — not refuted, judged unnecessary. Two of those were
settled with evidence rather than opinion on the same night: M-4 by reading the four live
documents (no capitals, nothing broken, no data fix owed) and M-9 by grepping every page for
`fteMap` (its listener moved behind sign-in at build 152, so nothing reads it before sign-in and
nothing changes if it is never fixed).

**Nothing was built on 22 Aug beyond the recovery itself, and that was deliberate.** Claude
declined the admin build twice and said why: H-1 changes capacity arithmetic on a live auction,
§82(d) is the precedent for a change to that machinery looking right and being wrong, and the
standard it set — both engines over thousands of week states, compared — is not a midnight job.
The owner agreed and handed off. Recorded because the restraint is the decision: the day's
temptation, after recovering everything, was to keep going.

**The rule this session earns, and the owner has not yet ruled on it.** *"Filed" should mean
pushed.* Every previous handoff used "filed" to mean "written and staged for a push", and on
21 Aug START-HERE said **STAFF 162 IS FILED AND AWAITING A PUSH**. That sentence was true and
almost fatal. A file git has never seen is not filed — it is one hardware failure from gone.
Proposed for a §: nothing may be described as filed until it is on origin.

---

## 21 Aug 2026 — §77 lands as admin 298; the pre-commit check earned its keep

**Where the session started.** The RA-3 wave (staff 161 / admin 297 / rules) was already
pushed and RA-2 already run — 59/59 on the current rules, 52/7 on the pre-fix rules with all
seven failures being the seven new gates. START-HERE and the STATUS block were both still
describing the previous state and were rewritten. A live `versions.json` fetch returned the
PREVIOUS build on the first cache-busted request and the truth on the second: the §4 rule
about fetching twice is not theoretical.

**How §77 was finally explained.** Four sessions of confused explanation ended when the owner
said, correctly, *"if a projection cannot change, how can it be promoted?"* — he was right, and
the answer is that promotion was the OLD world's problem and §77 abolishes it. What had been
missing from every previous explanation was one concrete example (a week with room for three;
deny the bid of 2 and the bid of 4 becomes a winner) and the discipline of never saying
"winner" without saying WHICH — now binding as §81. Two of his own observations drove the
build: that the approvals page "looks perfect", which is exactly why the defect survived, and
that he had in fact NOTICED the projected list rearranging and disliked it — making §77's only
visible change a change he had already asked for.

**The pre-commit screen diff found a defect (§82d).** Rather than trust the parked build's
comments claiming the numbers were unchanged, both real engines were run over ~4,000 random
week states and compared. Three repointed consumers were correct — differing only in the 852
intended re-deal cases, and in ZERO cases where nothing was denied. `weekLedger.committedFte`
was not: it never subtracted the denied, so under §77 (where the projection still lists them)
denied bids counted as filling a week. 2,864 of 3,958 states disagreed with 297; worst case a
capacity-3 week reported 0.2 remaining when every bidder on it had been denied. One line fixed
it and the same harness proved the fix. **The lesson is the general one: a comment asserting
"same number" is not evidence, and the cost of checking was one harness.**

**Suites.** `test-admin-294-engine.mjs` archived — it guarded deleted machinery. The three red
suites were NOT rewritten to agree with the new engine; their denied-is-never-a-winner
assertions were REPLACED by the §77 invariance (run the real engine twice, with and without
decisions, demand identical output), which is checkable without modelling the engine and which
the pre-§77 build fails. Two new suites: `test-admin-298-frozen` (17/17) and
`test-admin-298-readouts` (4/4, proving its teeth by restoring the §82d defect).

**Three things the gates caught that nobody asked for.**
1. `test-c4-phase-identity` went red: `adApprove` gained a real ledger dependency its sandbox
   did not have. Fixed by giving the sandbox the REAL functions and REAL data — never a stub,
   which would have let the suite pass while the capacity arithmetic drifted.
2. `test-priority-inversion` carries TWO honesty checks with DIFFERENT baselines. One is
   archaeological (pre-239) and cannot be produced by the standing explicit-SHA rule; pointing
   a modern baseline at it made it fail for the wrong reason. It now runs only when the
   baseline really is pre-239 and says LOUDLY that it did not run otherwise — never a silent
   pass.
3. **21 of the 27 schedule suites had been silently skipping** on the owner's Mac for want of
   a browser, and the schedule battery had been reporting "all 6 passed · 21 skipped" as if
   that were green. Staged to the cloud and run with the preinstalled chromium: **27/27, zero
   skipped — the first complete schedule battery there has ever been.** Worth keeping: the
   cloud route needs the `fake/` firebase shims, `schedule/versions.json`, the auction admin
   page, and `NODE_PATH` pointing at the global node_modules.

**Filed, pending the owner's push:** admin 298 + CRNA restamp + versions.json (vacation),
five suite changes + two new suites + one archive (tests), the BUILD-LOG row (schedule),
DECISIONS §79-§82 + TODO + STATUS (anesthesia).

**Everything in this entry is PUSHED and live** — `2cd6a55` (admin 298 and 299 in one commit,
CRNA restamped), suites `985e9b4`, docs `8f99769`/`579e7e8`, BUILD-LOG `f643c31`. Live
`versions.json` verified twice at admin 299 / staff 161 / mobile 18. Auction battery 48 suites /
1,881 assertions; schedule 27/27 in-cloud with zero skipped.

**§79 shipped the same session, as admin 299.** Approvals and denials are now BLOCKED while
bidding is open rather than warned about. The expression that decides "is bidding open" was
LIFTED into one named function shared by the readiness check and the new guard, because the bug
it guards against — a merely switched-OFF timer reading as closed — came from having two copies.
The two REVOKES are deliberately NOT gated: a revoke only removes a decision, and blocking
correction would leave an admin with a stale decision and no way out (§72). Four suites went red
and each was fixed at the cause: two pinned the readiness expression by its literal text and were
RE-POINTED to its new home (moved, never weakened), one got the real guard plus a closed server
state, one opens the gate for an unrelated scenario under the file's existing convention.

**What stopped, and why it stopped rather than being worked around.** File staging was refused
mid-session — `untrusted_device`, a stale desktop sign-in — which blocked re-running the 21
browser-based schedule suites in-cloud. Per the §6 cost gate the owner was told the cheap fix
immediately instead of a workaround being attempted; that gate exists because the same situation
on 20 Aug consumed ~7% of a week's usage for nothing. Those suites do not touch the auction.

The
owner's own top item is unchanged and still cannot be delegated: real bidders signing in while
App Check is enforced and the auction is not running.

---

# PART A — SHARED

## 21 Aug 2026 (OVERNIGHT) — THE RA-3 CLEAN-UP: five builds filed, two gates made honest, §77 parked a second time

Owner went to bed with a plan: finish F-1, then the four MEDIUMs, then the six LOW-but-real,
then §77, then verify the session's own work, then update the documents. Everything below was
done unattended and left in the working tree — **nothing was pushed by Claude**.

### What is filed and green (staff 161 · admin 297 · rules · harness)

* **F-1, second half.** The button sweep can no longer look successful when it tested nothing:
  zero clicks on a site, or errors outnumbering clicks, now print a verdict and exit non-zero,
  and a site that cannot be swept is REPORTED rather than thrown. Proven both ways — with the
  App Check mapping removed it exits 1 naming the cause; restored, it exits 0.
* **Four MEDIUMs (admin 297).** Begin Phase called its bulk delete "N denied bids retired" when
  it removes every non-winning leftover bid; the Draws & Reviews dialog put "Cancel Bid" beside
  the shared "Cancel"; "Disable Timer" hid that it also removes the deadline that ends the
  phase; `saveTimerRules` announced success on a refused write.
* **Six LOW-but-real** (the owner's filter: skip LOW/NIT unless it can trouble the live
  auction — 10 of 16 dropped, 6 kept). Staff 161: `getCurrentUser()` read the roster dropdown,
  which auto-selects the first name, so a doctor signing in briefly saw ANOTHER doctor's used
  bid numbers and a lowerings counter showing the full allowance; and a sanctioned lowering
  whose counter write failed left the benefit uncounted under a message promising it would
  self-correct. Admin 297: the NE-14 "bidding is still OPEN" strip read a switched-OFF
  countdown as "finished" (the opposite — nothing expires then); "results already sent to all
  N users" counted only doctors WITH an address; Delete All Users lacked both gates that Reset
  Auction beside it carries. Rules: the quota-meter clause demanded `update`, but the staff
  pages bump it with a merge-write Firestore calls a CREATE while the doc does not exist — so
  on the fresh CRNA project every staff-side send was refused and swallowed.

### The verification pass found two more, both about gates telling the truth

* `audit-handlers.mjs` is documented as "expect 0 violations" and had started printing **1** —
  a COMMENT quoting `onclick="fn('${_jsq(...)}')"` as an example was read as a real handler.
  Now 0, with the three comment-embedded examples excluded and all 152 real onclick lines
  untouched. Worth recording HOW: the first attempt tracked strings and comments together and
  got it backwards — an apostrophe inside an earlier comment ("don't") opened a phantom string
  and swallowed every `//` after it. The shipped rule is the dumbest one that cannot misfire.
* Staff `saveEmail`/`declineEmail` wrote `vacations/emails[getCurrentUser()]` unguarded. Not
  reachable in practice, but that document is read by the Daily Schedule too, and a write on an
  empty identity would put a junk key in a document neither site owns alone. Both refuse now.

### Gates at close

auction **46 suites / 1,847 assertions** · schedule **27/27** · handlers **188 / 0 violations**
· isolation **27/27** · 4-pass sweep clean, exit 0 · every filed file md5-verified device==cloud.
Two legitimate pin updates, each annotated in-file (`test-admin-295-db1` retire wording;
`test-audit-fixes` bookkeeping-message count 2→4, split so self-correcting and
non-self-correcting cases are asserted separately).
**The rules change is NOT verified by Claude** — the emulator cannot run in the work
environments. `tests/RA-2.command` on the owner's Mac is the proof, and the console publish
must precede the push.

### §77 — parked a second time, deliberately, and this time only a ruling is missing

Everything mechanical is done and green (see TODO for the full state; the build is at
`_to_delete/xfer/s77b/`). Four suites stay red because their never-event invariant is written
against the OLD meaning of the projection: they assert *"a denied user never appears in
winners/draws/reviews"* and *"an explicitly approved weaker bidder stays a winner"*. Under §77
a denied bid keeps its frozen outcome and an approval does not touch the projection, so both
are false by design. **What NE-1 means now is safety policy, not implementation**, so Claude
stopped. Rewriting a never-event to match new code is precisely how 294's oracle went blind.

**A correction to the 20 Aug entry:** it recorded that "Approve All Current Winners would offer
to approve someone already denied". That is **wrong** — it already skips anyone in
`approvedHere` or `deniedHere`, and so does Deny All Losers. Both action drivers were safe all
along; the claim was made from reasoning rather than from reading the code, and reading it
settled it.

---

## 20 Aug 2026 (EVENING–NIGHT) — RA-3: THE WHOLE-PROJECT RE-AUDIT, AND THE RULING THAT ENDS THE ENGINE'S DENIAL LOGIC

Owner's order: re-audit the 20 Aug evening wave, broaden it to the whole project, use extra
agents with adversarial review, drive both live sites in Chrome, and check all wording.
Audited the PUSHED bytes: vacation `d49cd15`, schedule `6d31b3e`, tests `2623c94`.

### What was run

Ten blind lenses, one agent each, no sight of one another. Every finding then went to an
adversarial skeptic instructed to REFUTE and to default to refuted when it could not
reproduce the reasoning from the code; CRITICAL/HIGH went to a second skeptic told to trust
neither previous reviewer. **28 agents, 0 errors, ~99 minutes.**
**45 raised → 8 refuted → 39 stand** (36 adversarially confirmed, 2 uncertain, 1 unverified).
Severity: 1 CRITICAL · 3 HIGH · 14 MEDIUM · 19 LOW · 2 NIT. Roughly half the findings are in
code older than the wave, i.e. backlog a bigger net would have caught at any time.

Reports (PRIVATE, `tests/docs/`, never the public repos):
`RA-3-INTERIM-2026-08-20.md` (the twelve Claude confirmed by hand) and
`RA-3-FINAL-2026-08-20.md` (the 39, with skeptic verdicts). The final report supersedes the
interim but both are kept — the interim carries fuller prose on its twelve.

### The security-rules finding, and its PROOF

Three documents were readable by anyone on the open internet, with no sign-in:
* **`vacations/welcomeLog`** — keys are participants' e-mail addresses via `_wlKey`
  (lower-case, every non-alphanumeric → underscore: `aaronjfrankel_gmail_com`), a trivially
  reversible encoding. An open list of 37 physicians' personal and KP addresses. The rules
  file's own comment called it "no PII" and was wrong; that comment is corrected.
* **`vacations/changesArchive`** — `completePhase` merges the bid log with the DECISION log
  (`changesDecisions`, admin-only precisely so winners/losers cannot leak) and writes the
  union here. It was on no read gate at all, and Complete Phase runs BEFORE results are
  e-mailed, so the whole approve/deny outcome of every completed phase, plus every bid ever
  placed, was public — permanently. It was already admin-WRITE-only; only the read was missed.
* **`dailysched/auditLog/entries/*`** — every entry carries the acting admin's Google
  address. DEFERRED with the schedule (§75).

THE FIX, under owner ruling §76 (fix data exposure only when it is cheap): **two document
names added to two existing lists** — `changesArchive` → `isAdminReadDoc`,
`welcomeLog` → `isSensitiveDoc`. Two functional lines; every other line in the diff is
comment. **NO page changed**, verified first: the staff sites never reference
`changesArchive`, and read `welcomeLog` only from the sensitive-listener set and inside
`welcomeOnce()`, both post-sign-in; the admin sites subscribe to `changesArchive` in the same
block as approvals/denials/phaseStaging, already gated identically.

**PROVEN, EXECUTED, on the owner's Mac via `tests/RA-2.command`:**
* current rules — **56 passed, 0 failed**
* honesty run against the pre-fix rules at the explicit SHA `d49cd15` — **50 passed,
  6 failed**, and the six are EXACTLY the six new gates:
  *"HONESTY: 6 of 6 new-gate assertions FAILED — GOOD, the gates are real."*
* the three assertions that had to KEEP working — admin reads the archive, a registered
  bidder reads `welcomeLog` for `welcomeOnce()`, the `welcomeLog` write path — passed in
  BOTH runs, so nothing the pages depend on was gated.

`rules-emu/assertions.mjs` gained a `PRE_RULES` override so the same assertions can run
against any rules file from an explicit SHA; `RA-2.command` gained step 4 so both runs are
one double-click. **This is the project's first executed honesty check on the rules.**

STILL OPEN, one small thing: the emulator reads the REPO copy, so what is proven is that the
FILE is correct. That the two Firebase consoles hold the same text is not machine-verified —
an outside-the-browser check is impossible while App Check refuses un-tokened requests (it
returned PERMISSION_DENIED even for the public `phases` doc, which incidentally proves App
Check is working). To close it: open each console's Rules tab and eyeball `'changesArchive'`
at the end of the admin-read list and `'welcomeLog'` at the end of the sensitive list.

### The CRITICAL, and the ruling it produced

The §70 engine judged every denial against a re-run of the week **with all denials erased**,
so earlier denials were invisible to it. Reproduced by extracting the real `computeApprovals`
and executing it: cap 1.0, threshold 0.5, A bids 1 (FTE 1.0), B 2, C 5, D 9, E 10 (all 0.5) —
deny A (policy), then deny D, and **E, who bid 10, is promoted to REVIEW while D who bid 9 is
out**. The pre-wave engine at `1bdcb23` does not do this: a regression the wave introduced.

**The half no agent found, and the more important half:** `test-admin-294-engine.mjs` passes
9/9 including *"zero §70/NE-1 violations across 2,000 random decided sequences"*, and it
cannot catch this for two independent reasons. (1) Its "independent first-principles oracle"
builds `natWin`/`contested` ONCE, before the loop, from the zero-denial world — byte for byte
the engine's own assumption. **The guard and its check share one blind spot.** (2) Its fuzz
driver denies in exactly two places, an over-threshold draw and a natural loser; it always
APPROVES winners and reviews, so the sequence that breaks the engine is not in its
vocabulary. This is why audits kept finding things the suite did not.

**Then the owner found the mirror image**, and it is worse: the same machinery ERASES people.
Reproduced on both builds — cap 1.0, A bids 1, B 2, C 5, D 6, all FTE 0.5; deny A then C, and
the board shows only B with **0.5 FTE free and D removed entirely**. On the PRE-wave engine a
single denial blanked the whole week: `WIN[] DRAW[] REVIEW[]` with 1.0 free. Both engines are
wrong, in opposite directions, from one idea: letting decisions feed back into projections.

Scope, established by reading the code and worth never re-deriving: **no bidder can be
affected by any of this.** The staff page never subscribes to `approvals`/`denials` — it
declares the refs and never reads them — and its `computeApprovals` throws if the admin
variant is cross-ported. The damage is confined to the admin's own decision board, where the
consequence is a wrong LABEL: a person shows "lose" on a week that still has room. They keep
their row and their Approve/Deny buttons (`renderAppDenials` iterates every bid in
`scheduleData`, not the engine's groups), so nobody is hidden and nothing is deleted — the
demoted names come out of local Sets rebuilt on every render, and no Firestore write occurs.

→ **RULING §77: PROJECTIONS NEVER CHANGE. They freeze at phase close. Supersedes §70.**
See DECISIONS for the full text and the three consequences that must ride in the same build.

### The other things worth carrying forward

* **The sandbox button sweep had been measuring nothing since App Check went in (19 Aug).**
  `make-site.mjs` faked four Firebase modules but not `firebase-app-check`; offline that
  import failed and took every page handler with it. The staff pass clicked **0** controls;
  the admin pass logged 325 copies of one error. FIXED and pushed (`af57c09`): a new
  `sweep/fake/firebase-app-check.js` plus one line in `make-site.mjs`. After the fix, with the
  driver restored byte-for-byte: **584 clicks · 261 dialogs · 154 confirms · 0 errors**, both
  sites, four passes. STILL OPEN: make the harness fail LOUDLY (zero clicks on a site, or more
  page errors than clicks, must exit non-zero) — this rot was silent.
* **Refusals on the bidder page are shown where nobody can see them.** `showError()` writes to
  a static banner near the TOP of the page while every bid is made far down the board behind a
  centred modal. Reproduced live: pressed Continue with no bid chosen and the page did nothing
  at all. 17 call sites take that path, including "Save failed". `showCenterAlert()` is the
  mechanism that works and its own comment says why.
* **Live walkthrough done** (staff + admin, real Chrome, owner's session) including a real
  end-to-end write: Week 1 bid 7→6→7. Pool and lowering counter both correct; the lowering
  warning was exact. Owner's bids are unchanged; **one bid lowering was consumed (2 of 4).**
* **Batteries on the pushed bytes:** auction 42 suites / 1,765 assertions, schedule 27/27.

### Honesty notes — things that did NOT survive, recorded so nobody quotes them

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

### Rulings made this session

**§75** the Daily Schedule is out of scope until much later (six findings deferred) ·
**§76** fix data exposure only when the fix is cheap (rules-only qualifies; page changes wait) ·
**§77** projections never change, they freeze at phase close, supersedes §70 ·
**§78** the public/private repo question is closed for now, and the closed-phase pop-up goes.

### Queue at close, in order

1. **§77** — freeze projections, delete the §70 machinery, and replace
   `test-admin-294-engine.mjs` **in the same build** (its oracle would bless either behaviour).
   Retire rule 26 of the ENGINE-RULES-REVIEW docx with it.
2. **Closed-phase experience** — kill the pop-up; correct the six "the auction has closed"
   strings and the banner to say the PHASE closed; add "Phase closed" at the top. Verified
   safe: closing a phase calls `_lockEveryWeek()`, and the staff board already paints every
   card at 50% opacity, `cursor:not-allowed`, red tint and a "🔒 LOCKED" badge. One residual:
   a brief window where the closed flag is set but the lock write has not landed.
3. **Make refusals visible** — the `showError` family.
4. Everything else in the final report, batched by subsystem.

⭐ Unchanged and still the owner's own top item, which no audit can do for him:
**16 of 37 people have never signed in**, and App Check is enforced. That window closes at
go-live.

---

## 20 Aug 2026 — THE AUDIT SESSION (A-AUDIT run + every CRITICAL and HIGH fixed same day)

The full pre-launch adversarial audit ran per the §67 brief: 9 blind lenses → one skeptic
per finding → a second skeptic on every CRITICAL. **22 findings survived, 0 refuted**
(4 CRITICAL · 13 HIGH · 2 MEDIUM · 3 LOW). Full report delivered to the owner as
`AUDIT-REPORT-2026-08-20.md` (kept OUT of the public repos — it contains file:line detail).
The Chrome walkthrough ran the same day (MD pages only, owner ruling §68): every control on
both live pages, every destructive/send dialog cancelled, zero console errors; observations
fed the report. Megafuzz ran green against the live engines (144k checks).

**Then, under owner rulings given during the session** (per-item "go" for the CRITICALs; a
standing go for all HIGHs "if safe"; one held HIGH ruled explicitly), every CRITICAL and all
13 HIGHs were FIXED the same day — builds staff 153/154/155 and admin 285–289, each its own
§3 build with an executed suite, an honesty check against the pushed SHA (152s vs `6448f17`,
later builds vs `ce427a2`), full battery, CRNA restamp, md5 device==cloud. The battery grew
23 suites/1,495 → **31 suites/1,615**. It caught real mistakes DURING the fixing four times
(the 234-L2 wording rule, two slice-window artifacts, a hang-masking honesty run) — details
in the BUILD-LOG gate records, which are the authoritative per-build account.

**The overnight wave (owner orders at end of day, all executed unattended):** W-1 built
(staff 156, owner-specced wording/placement); the 1 MEDIUM + 5 LOWs fixed (staff 156 ×2,
admin 290 ×2, schedule admin 75, crna-stamp guard v2 — negative-tested); the guessable
staged builds archived out of the served repo (owner ruling; grep-verified, recorded in
_archive/README.md); the rules-emulator suite written and battery-wired with a LOUD skip
(the jar needs storage.googleapis.com — one-time enable is next session's RA-2). Owner
confirmed console-side that crna-vacation has rules + App Check deployed (gap a closed).
Batteries at close: auction 34 suites / 1,638 · schedule 26 suites, all green; every
changed file md5-verified. One self-caught mistake worth knowing: a git checkout during
the stamp guard's negative test briefly reverted the cloud copy of unfiled build 156 —
recovered byte-exact from the fuzz fixture; rule now followed: temp copies for negative
tests, never git checkout with unfiled work.

**NEXT SESSION: the owner wants a RE-AUDIT of this entire fix wave — TODO §1 RA-1 is the
queue head and carries the scope.**

**Still open after the overnight wave:** only RA-2 (enable the emulator suite — one
command on an open network). W-2 was fixed in the same wave. Everything else from the
audit is fixed, archived, or confirmed. The queue head is RA-1, the owner-ordered
RE-AUDIT of the whole 20 Aug fix wave.



## 4. ARCHITECTURE — unchanged (the 29 Jul handoff's §4 ten-line summary is still accurate)

Two static sites + schedule app sharing one Firestore. All logic inline `<script>`. Two
computeApprovals twins differ in SIGNATURE deliberately; port logic only. Mail relayed by any open
signed-in page. Rules enforce per-user bid confinement via emailToUser (now collision-fail-closed),
server-clock timer, biddingClosed gate, append-only changes, admin-only decisions/backups.

## 5. DEPLOY FLOW — unchanged. Rules changes publish in the console BEFORE dependent client pushes.


---

## 5a. 18 AUG 2026 SESSION — what changed (detail lives in BUILD-LOG / TODO / START-HERE)

Schedule: S3 shipped as admin 67 (visual batch) and S4 as admin 68 + staff 30 (the three
{list:[]} docs went per-item; legacy docs frozen; both pages deploy together). All pushed
in `7fcd3f1` / tests `594778e`; live site verified serving 68/30. The full battery is 23
suites; four probes were re-anchored to per-item storage, none weakened.

Rules: `firestore.rules` gained the dailysched SUBCOLLECTION match — the repo file never
had one although builds 59/63 already needed it. Owner published to BOTH consoles 18 Aug.
Drift question RESOLVED same day: the owner pasted the console's prior version from
Rules → History; content-identical to the repo file, so today's publish dropped nothing.
Real finding: dailysched subcollection writes (months [59], audit entries [63]) had been
DENIED in production until this publish — bounded (prototype); verdict details in TODO.

Rehearsal: Phase 3 closed 18 Aug; **Phase 4 skipped by owner ruling** — rehearsal
COMPLETE. The vacation build window is open; M3 (B2, frozen scope) is the next vacation
action. New owner request V7 (floating jump-to-next-decision button) queued in TODO.

Delivery mechanics changed this session — READ THE RULINGS IN START-HERE before sending
anything: one combined COMMIT-MESSAGES.txt (with the copy-one-section banner), rules as
.txt, zip-bundle transfer through `_to_delete/xfer/` with `unzip -p` + md5 gates.

---

## 5b. 19 AUG 2026 SESSION — three builds, all owner-found, all pushed (detail in BUILD-LOG)

**The session did NOT run A-AUDIT.** It stayed the queue head. Everything below came from the
owner USING the site and reporting what he saw; each was traced, fixed, gated and pushed.

**276 (`84f3b8a`) · Timer Rules editor.** Owner: setting "After x days" updated the wrong
line. Cause: the editor sorted the stages for DISPLAY and again on SAVE, while
`getTimerRules` already sorts for the engine — both were redundant, and they moved an edited
rule onto a line the admin never typed on. Also shipped: batched Save (owner's idea — edits
mark the editor dirty, nothing is written until Save, still one confirm dialog, so a
multi-field edit is now ATOMIC), ladder validation (steps must ascend in days and shorten in
hours; Save blocks with a plain reason), and unset lines rendering switched OFF instead of as
invented rules. `tests/test-tr-timer-editor.mjs` 43/43, honesty fails 17 on 275.

**277 (`23cd748`) · Change Log.** Owner screenshot: rows reading "Admin admin-timer-mode-1
bid for ALL on Wk 0 · undefined undefined NaN". Cause: `adminLog` writes SEVEN system-level
action types into the same log as bid changes with `'ALL'` filling the user and week slots,
and every reader assumed a bid. System entries now get their own sentence, pill, filter
option and no week column, recognised by SHAPE as well as the new `scope:'system'` stamp so
existing live rows fixed themselves with no migration. Second half (CL-2): those entries were
counted as bid activity on BOTH sites — including every bidder's "changes in last 24h" chip.
`tests/test-cl-system-entries.mjs` 34/34, honesty fails 13 on 276.

**278 / staff 144 (`a5d0bb8` + `bc2a635`) · Rules copy.** Two owner wording requests.
COPY-1: adjacent phases sharing a lowering allowance now merge and "up to" is said once
(Phase 4 never merges — its count is per ROUND). COPY-2: the bid-floor sentence states the
rule instead of listing every allowed value. COPY-3 (owner ruling): a floor that is not set
produces NO sentence at all. `tests/test-copy-rules-wording.mjs` 41/41, honesty fails 19
on 277. Battery finished the session at 22 suites / 1,391 assertions.

**279 + 280 / staff 145 · Bid-floor wording, everywhere.** Owner screenshot: the "Save bid floors?" confirm still
enumerated every allowed bid while 278 had already switched the bidders to "your bid must be
4 or better". Now states the rule in the owner's own words. The owner then ruled: *"I don't
want that type of wording anywhere."* A sweep found one remaining producer — the staff
bid-rejection alert — which now reads "needs a bid of 4 or better"; `bfAllowedText` was left
with no callers on either page and was DELETED rather than kept as dead code able to
regenerate the banned wording. A suite assertion now sweeps both pages for any surviving list.
Left for a ruling: "A combined bid like 1/2/3 uses bids 1, 2, and 3 at once" (a definition,
not an allow-list). Suite 53/53, honesty fails 10 on 278. **Note: 279 was never committed
before 280 was written over it, so no 279 fixture exists — both honesty-check against the
pushed 278/144.**

**Where it ended (all PUSHED and live — admin 280 / staff 145 / mobile 18, disk == live).**
Vacation commits, in order: `84f3b8a` (276) · `23cd748` (277) · `a5d0bb8` + `bc2a635` (278/144)
· `50a5d97` (279+280/145). Tests: `4b87e0c`, `7b14d2d`, `0b06e95`, `39e5018`. Anesthesia:
`4d8582e` and follow-ups.

**EVERY ruling the owner made this session is written out verbatim in `DECISIONS.md` §60** —
all sixteen of them, each with enough surrounding fact to be understood without the chat. That
section exists because of his standing instruction, 19 Aug: *"ensure that all of my decisions
are in the handoff so that i never depend on chat history."* Rulings live in DECISIONS (the
rulings register); this file carries the narrative and points there. The headline ones:

**Owner's closing rulings, 19 Aug 2026 — treat these as settled:**
- **A-AUDIT: "hold for now, will do soon."** Still the queue head. Do NOT start it unsolicited.
- **"A combined bid like 1/2/3 uses bids 1, 2, and 3 at once": "leave this."** CLOSED — it
  defines what a combined bid is rather than listing what is allowed. Do not re-raise.
- **The launch checklist: "i know."** His actions, not a session's work queue.
- **V6 · C6 · C8 · `phases` doc growth · both optional-hardening items: "keep deferred."**

**The Firestore capacity thread (19 Aug, after the builds).** The owner asked whether he was
at risk of hitting Firebase caps. Worked through with real numbers rather than reassurance, and
the conclusion moved THREE TIMES as facts arrived — recorded that way on purpose, because the
reasoning is the useful part:
1. First model (assuming the docs' "~60 users") put a busy day near the 50,000/day read cap.
2. The owner supplied a MEASURED rehearsal peak of 15,000 reads → looked comfortable.
3. He then noted not everyone had participated, and reads scale with roughly the SQUARE of
   head-count (reads = write-events × connected-listeners, and both grow with people) → back
   to undecided.
4. Final inputs: **35 participants** (the docs' ~60 was the ROSTER, not the bidders — corrected
   in START-HERE) and **~400 bid actions on a busy day**. Multiplier verified in code, not
   estimated: one staff bid writes 3 listened docs always (`schedule`·`changes`·`bidTimes`)
   plus up to 2 conditionally (`timer`, `bestBids`). Result: **~43,000–63,000 reads on a busy
   day against a hard 50,000 cap.**

**Outcome: the fix is the PLAN, not the code** — pay-as-you-go keeps the same free allowances
and only charges past them (~$0.45/month in reads even at 100k/day; outbound transfer the only
real variable). It is DECIDED but NOT YET DONE and now sits on the launch checklist. The reads
tracker the owner asked about was declined; FB-2 keeps the record of what is impossible (the
client SDK exposes no read counter) and the anti-pattern to refuse (a shared counter document
incremented per read — a write per read, re-broadcast to everyone). FB-3 records that the
schedule shares the same project and will likely become the larger consumer once live.
Full detail: `TODO.md` FB-1/FB-2/FB-3 and `DECISIONS.md` §61.

**THE SCHEDULE SIDE, same session (builds 69 + 70, both pushed as `2c97296`).** The owner
pivoted off the auction late on: *"I want to pivot back to scheduling site for a bit, we can
return to the audit later."* Then, after S5a: *"Keep going with the list the best you can in
the order proposed above."*

- **69 — S5a.** Grid coverage strip: a second sticky header row colouring each day by how
  much of its demand is filled, plus a Detail/Compact density switch. The strip reads the
  SAME `coverageRows()` the coverage report uses — the per-day roll-up (`byDay`) was added
  INSIDE that existing loop rather than recomputed, so the two cannot drift; an assertion
  pins that the per-day totals sum to the report totals.
- **70 — S5b.** The grid flips: a View switch draws one row per shift with cells naming who
  is on it, and an inset shortfall ring (`box-shadow`, chosen so it STACKS with the weekend
  and today tints instead of fighting them). **Read-only by design** — a shift-view cell holds
  several people, so no single click target exists. Revisit only if the owner asks.
- **Both suites are deliberately NOT Playwright.** 21 of the schedule battery's suites skip
  on the owner's machine for want of a chromium, and a suite that skips is not a gate. These
  execute the real functions against a DOM shim and RUN. The battery went 2 → 4 green.
- **The battery earned its keep:** build 70 gave `renderGrid` a second axis and build 69's
  suite went red immediately, because its shim had not declared `gridView`. Shim fixed, not
  the code.

**S5c is NEXT and one half of it is BLOCKED.** The filter bar's name/text and coverage
filters are buildable; **role/site grouping is not** — people carry no role or site attribute
(only `usernamesData` and `fteMap`; MD/CRNA and site live on SHIFTS). It waits for Stage 4.
Confirm that is still true before designing.

**A commit message was mis-pasted again.** `2c97296` in the schedule repo carries the TESTS
repo's summary, and an older over-length draft of it. **Contents verified correct** — BUILD 70,
`versions.json` admin:70, live serving 70/30 — so it is recorded in `schedule/BUILD-LOG.md`
and NOT rewritten, exactly as `7fcd3f1`/`594778e` were on 18 Aug. This is the second time; the
banner on the combined outputs file is not enough on its own.

**COMMIT SUMMARIES MUST BE SHORT — owner ruling, 19 Aug 2026.** Verbatim: *"the commits
have been consistent and great. i am using only the summaries though and they are too long.
…must remain short, maybe 1/4 of what they are now."* The cap now lives in `START-HERE.md`
§3: **subject line + at most 4 short lines, about 50 words.** Note for whoever reads this:
the rule was ALREADY there ("SHORT — a recognisable subject + 2–4 plain lines") and Claude
drifted past it steadily across two days without noticing, because each message individually
felt justified. The numeric cap exists so the drift is measurable rather than a judgement
call. The owner reads ONLY the summary — everything else belongs in BUILD-LOG.

**Three things a later session should carry forward:**

1. **A-AUDIT gained a required lens** (recorded in `TODO.md` §1). The owner said, correctly,
   that he finds defects a code-reading pass does not. Both of his finds were code doing
   exactly what it said, where what it said was wrong for a HUMAN. So the audit must include
   a reviewer that EXECUTES the render functions and reads the produced markup as a person
   would, and **"the screen tells someone something untrue" is HIGH** even with no data loss.
   Under the old bar TR-1 would have been logged cosmetic and killed by a skeptic.
2. **The owner pushes mid-session, repeatedly.** HEAD moved three times during this one. A
   `--pre` fixture built from `HEAD~1` silently became the WRONG build and the honesty check
   reported a false PASS. Build honesty fixtures from an explicit SHA, never from `HEAD~n`,
   and re-read `git log` before every fixture.
3. **The device workspace can restart and wipe `/tmp`.** When it did, all three honesty
   checks SKIPPED — and a skip prints green-ish and exits 0. Treat a skipped honesty check as
   a failed gate; regenerate the fixture and re-run before reporting anything.

Note: `status.mjs`'s own live check prints "unreachable (offline?)" from this environment
even when both sites answer fine — verify live builds with a separate cache-busted fetch, not
from that column.


# PART B — VACATION AUCTION

**LIVE. admin 269 / staff 139 / mobile 17, rules published.** Build work is PAUSED at the
owner's request. The cardinal rule in `START-HERE.md` exists to protect this site.

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

## 1. CURRENT STATE (3 Aug 2026)

- **admin 239 (PUSHED & VERIFIED LIVE by the user, 3 Aug) — PRIORITY-INVERSION NEVER-EVENT FIX.**
  Surfaced in the live dress rehearsal: Week 7 had a bid-2 (KQ) approved while a bid-1 (AVG) was
  denied. Root cause: denied bids are excluded from `reqs`, so once a stronger bidder is turned
  away for capacity, the group loop "forgot" them and cascaded their freed room down to weaker
  priorities — a weaker bid winning while a stronger one lost. This is ADMIN-ENGINE ONLY; the
  staff twin never reads `deniedData` (security rules) and is structurally immune. Fix
  (computeApprovals ~2114–2170): after allocation, compute `_blockFloor` = strongest pScore among
  denied bids that are genuinely over the STRICT cap alongside natural winners, then demote any
  winner/draw/review strictly weaker than that floor. Prior-phase winners and EXPLICIT admin
  approvals (`approvalsData[wk]`) are never demoted — that explicit approval IS the exceptional
  override the user chose (ruling: "strict priority unless admin CHOOSES to override"). A
  follow-up audit found the strict-cap test could use an admin-overbook-INFLATED `fteWon`; fixed by
  snapshotting `const _naturalFteWon=fteWon;` before the force-approve block and testing capacity
  against that natural baseline. TWO independent extreme-care adversarial audits: first found the
  overbook MEDIUM (fixed), second found the final engine correct and complete (no over-block, no
  under-block, no scoping/NaN/FP defect). New suite `test-priority-inversion.mjs` (12 assertions:
  Week-7 repro + honesty check vs pre-fix, natural-projection-untouched, staff-twin-no-deniedData,
  admin-override-respected, policy-denial-doesn't-empty-week, overbook-doesn't-demote-natural-winner,
  and a 5000-scenario invariant fuzzer that the pre-fix engine provably FAILS). [VERIFIED]
- **3 Aug LIVE-VERIFICATION SESSION (Chrome-driven against the deployed site, admin 239) — all green.** [VERIFIED]
  (a) Extracted the ACTUAL deployed `computeApprovals` from the live page and ran the Week-7 repro +
  admin-overbook regression + a 2,500-scenario fuzz IN THE BROWSER: 0 inversions. (b) Reset the
  (rehearsal) auction and ran a full 4-phase auto-decided run-through; DOM-scanned every decided week
  (Phase 1: 6 wks, Phase 2: 45 wks, Phase 3: 14 wks): 0 never-events anywhere. (c) Fair Play Monitor
  proven with TEETH via a Node harness on the real `_fpAnalyzePhase`: winning-bid-cancel, timer-stall,
  and late-timer all flag; a clean bid does NOT (no false positive). (d) Staff site (build 127)
  verified live: signs in, renders board/bid-counts/projections, places a real bid that projects
  "Winning" — and its `computeApprovals` confirmed to NEVER read `deniedData` (structurally
  inversion-immune). (e) Restore round-trip verified: restored the pre-reset cloud backup, original
  data returned intact (114/114 bids, same 33 losing users), and Rehearsal Mode correctly landed OFF.
  (f) Confirmed email sending works (Send Phase Results delivered; users w/o e-mail skipped).
  (g) Over-cap weeks (~1.0 FTE over) explained: the **review overage is configured at 1.0** (user
  confirmed) — by design, not a bug; a week may be approved up to a full FTE over cap via reviews/draws.
- **[HISTORICAL — 3 Aug] Live then: staff 127 / admin 239**, versions.json
  {"index":127,"mobile":16,"admin":239}. (Live NOW: 269/139/17.) admin 227→236 was adversarially
  audited BEFORE deploy; 236→239 is the priority-inversion fix (two audits + the live verification above).
- **Test suite: 832 assertions, 7 suites, all green** (added `test-priority-inversion.mjs`; H2 in
  `test-high-fixes.mjs` updated to strict-priority per user ruling); every new test carries an executed
  honesty check against the shipped baseline (or a reconstructed pre-fix build) proving it
  fails there. [VERIFIED]
- Firestore rules: unchanged this session; published state as before (backups block included).
- Schedule app: admin 48 (was 46) — duplicate-email twin fix only. Staff schedule 24 untouched.
- Firebase project vacation-25e8e; EmailJS service_wpprivw/template_rss3fn3, quota 2000/mo.

## 2. WHAT THE 30–31 JUL SESSIONS DID (admin 217→236, staff 125→127, schedule 46→48, tests 541→803)

1. **218** — Complete Phase warning rewritten to CONTRADICTED decisions only (projected WIN but
   denied / projected LOSE but approved — new mirror check `_allStaleApprovals`). Draws/reviews
   denials are normal resolution and never warn (user ruling; a denied whole draw is legitimate).
   Backup stall fixed: `_backupFetchAll` concurrent + 20s timeout + one retry + sticky progress
   counter ("X of 28"); commit timeout reported as inconclusive.
2. **219** — one-click sweep fixes D1–D5: adminChangePriority (onchange dropdown!) now confirms
   with old→new + side effects, cancel redraws; `_fixClosePhaseBidding` split entry/worker with
   its own confirm before the backup prompt (dashboard route calls the worker, never two dialogs);
   `_fixLockAllWeeksInline`, `toggleGlobalLock`, `saveAllSlots` (diff-counting, no-op refusal) all
   confirm.
3. **220** — Rehearsal Mode (see §0). One-way door BOTH sides at the time; `_beginPhase1SimOverride`
   removed.
4. **221** — audit fix: commit-timeout catch no longer swallows DEFINITE commit failures
   (permission-denied etc. report FAILED + code; only tagged timeouts are inconclusive).
5. **222** — audit fixes: click-time re-checks everywhere (skip-backup button, skip-results
   onConfirm, `_execSimulationApprovals`); `_phasesReady` load-window guard on arming;
   renderSimPanel can't re-enable Run past the gate; cancel-blur for the D3 dialog.
6. **223** — user's design: rehearsal run-throughs restored. Hard refusal replaced by danger
   confirm; dashboard pill with one-click Turn off; `_beginPhase1KeepRehearsal` ghost path.
7. **224** — pill inline with Current Phase title; arming ALWAYS confirms (plain pre-launch).
8. **225/226 + schedule 47/48** — duplicate-login-email CRITICAL fixed both sites (see §0);
   restore rebuilds emailToUser (audit HIGH); pre-launch arming re-checks phase1Started at
   confirm time; disarm failures reported honestly; schedule saveSchedUser loaded-gate + batch
   orphan check.

**Audits run (all "skeptical Claude" adversarial):** backup/restore changes (found the 221 issue),
UI wiring, rehearsal lifecycle ×2 (found the 222 and 226 issues), duplicate-email fix (found the
restore HIGH). Two-skeptic verification (confirmer vs refuter pairs) of sweep D6–D13 and the 3
critic leads — see `tests/docs/archive/VERIFICATION-2026-07-30.md` (tests repo) for full verdicts.

## 3. THE QUEUE — **ALL DONE (this section is now the historical record of what shipped)**

0. Files written to disk, both repos pushed, live builds verified — done repeatedly through 236.
1. **Live-fire backup/restore check — PASSED 30 Jul.** [VERIFIED] Cloud backup → cloud restore
   round-tripped the real database: A↔B diff showed ONLY the timestamp, one restore-log entry,
   and a 57.0s timer shift that exactly matches the resume math (expired-in-place preserved).
   The test also EXPOSED the dead-feed/lost-write incident: a network storm killed the tab's
   listeners (stale "timer off" display) and Begin Phase 1's timer arm write was lost silently
   (both backup files prove lastChange stayed 28 Jul). Fixed in build 227 (below).
2. **Batch A — DONE (staff 126 / admin 228) + connection integrity (227) + audit fixes (229).**
   227: onSnapshot auto-resubscribe with backoff, feedStaleBanner, `_feedsHealthyOrExplain` gates
   on every phase-freezing action, VERIFIED timer arm (`_armPhaseTimer` setDoc + read-back echo,
   both under 15s timeouts — the 30 Jul lost-write case now reports "did NOT verifiably arm").
   228: staff atomic bid+tag writeBatch (Lead 3); admin dead-bid replacement dialog (Lead 2);
   `_stableStr` order-insensitive settings compare + named diff keys (the "1 setting differ"
   live-fire false positive). 229 (adversarial-audit findings on the above): fromCache snapshots
   are NOT recovery (dead feed forwards nothing until a genuine server snapshot); prior-phase
   WINNERS refused in the replace path (wins are permanent); replace dialog gets adminBidIssues
   warnings; action-time `_feedsHealthyOrExplain` re-checks inside Complete Phase's onConfirm and
   `_commitBeginPhase`; Send Phase Results gated. **Live test bid PASSED 31 Jul** (place + remove,
   test account, timer restarted, Smart Lock applied) — the atomic writeBatch clears the published
   rules on the real server. Batch A fully closed. [VERIFIED]
3. **Batch B — DONE (build 230).** D9 login-email old→new confirm (+ 232: click-time duplicate
   re-check), D10 alerts-OFF danger confirm (ON stays one-click), D6 prio-lock confirms both ways,
   D8 KP-address old→new confirm (welcome moved inside confirm; no-change = no-op), D13 per-week
   capacity diff-confirm (no-op refused; unsaved week always counts as change; + 232: Cancel
   reverts the row inputs), Lead 1 `finalFteForWeek` orphan filter (+ 232: I2-reuse check too —
   full mirror of completePhase's snapshot filter).
4. **Batch C — DONE (builds 231/232, the pre-launch requirement).** "👤 One user…" button on every
   cloud backup row → same picker/preview/danger-confirm flow as file backups (shared
   `_restoreUserFlow`, feed-health gated). `_doUserRestore` is now ONE atomic batch (was 4
   sequential writes) with a timed-out commit (inconclusive "may still apply — check before
   retrying") and a wholesale-replace not-found fallback. `_cbFetchFile` (shared by full + one-user
   cloud restore) is concurrent, timed out per read with one retry, progress-counted. M7 torn-read
   fix: after a clean backup fetch, schedule/bidPhase/bestBids/bidTimes are re-read adjacently
   until stable (order-insensitive compare) — a mid-fetch bid can no longer be photographed
   without its tag/lock/timestamp. 232 also: deleted-user restore is refused with re-add-first
   instructions (no ghost bidder at default FTE); FETCH-FAILED schedule can't junk the picker
   roster. Accepted cosmetic: the sticky counter can sit at "28 of 28" up to ~40s during a slow
   re-check.
5. **Batch B2 — DONE (build 233, audit fixes 235).** Both admin delete paths (adminRemove AND
   Draws & Reviews' Cancel Bid) run through ONE shared atomic 5-op delete (`_adminDeleteBidAtomic`)
   with honest failure ("NOT removed/cancelled", nothing logged or e-mailed), a virgin-database
   not-found fallback (skips only docs that don't exist; real rejections report PARTIAL), and
   local state touched only after the server confirms. capBreaches(sim) counts the PENDING
   approval being confirmed (both approve dialogs pass it; the note says "includes the approval
   you are confirming now"); Complete Phase's confirm shows the cap advisory.
6. **Batch D — DONE (admin 234 / staff 127; user go-ahead 31 Jul = the formal Group-2 ruling).**
   M4: the three bid-edit confirms RETURN the write promise (the "Action failed" net is
   reconnected) and a failed save reverts the table. M2: the delivered-address ledger retries
   once and ALL THREE outcome toasts warn about the re-send trap when it can't save. M5: addUser
   tells the truth when the FTE save fails. M9 (staff): bookkeeping failures after a saved bid
   are caught ("Your bid IS saved…"), the modal always closes, and local floor/timestamp mirrors
   stamp only after their writes land. L1: getUserFTE coerces string FTEs on BOTH sites. L2:
   Begin Phase failure toasts stopped claiming "nothing was changed". L3 had already shipped in
   231. **M1 [31-Jul Batch-D numbering — NOT the 25-Jul code-review M1 in TODO.md, which is still open] — CLOSED, user ruling 31 Jul (final): accepted as DESIGN, no fix ever.** A tied
   group may all show DRAW even when only some members fit the remaining capacity; the admin
   holds the override authority in exactly those situations (the approve dialog's cap warning
   fires before any over-cap approval), so the badge is not misleading in practice. Do NOT
   re-propose the engine change. Per the earlier 31 Jul ruling: Group 1 closed (M6/M8/M3);
   M7 shipped with Batch C. **L4 — DONE (build 236, user go-ahead):** the simulator's false
   "write atomically" comment corrected and a midway failure now names the half-written state
   with both clean exits (re-run tops up / Reset Auction clears). Rehearsal-only surface.
   **THE AUDIT QUEUE IS EMPTY — no open code items remain.** Launch items: whitelist
   confirmations (user), KP IT allowlist (user).
7. **The old "confirmed audit queue" (28 medium / 14 low) is CLOSED:** every item was either
   fixed in builds 218–236, refuted by the two-skeptic verification, or explicitly accepted by
   user ruling (lists in §3 and §6). The 31 Jul code freeze applies — nothing here is pending.
8. **E-mail deliverability — user ruling 30 Jul, FINAL: no domain purchase.** EmailJS keeps
   sending via personal Gmail. Deliverability rests on (a) the Whitelist Tracker — getting all 37
   users confirmed is now a genuine LAUNCH item — and (b) the KP IT allowlist request, which stays
   on the to-do as the USER'S item (needs someone at KP). Do not re-propose the domain.

**Refuted / accepted (do NOT fix without asking):** D7 flushMailQueue (queue auto-sends anyway;
optional 30000ms tweak), D11 toggleNpPhase (engine never reads the flag; placement gate only),
D12 saveFte (armed-mode confirm suffices; logged idea: auto-relock). Logged non-blocking: schedule
race warning asymmetry, staff generic permission error for duplicate-locked users, toast blanking
progress counter, keep-15 momentary overrun after commit-timeout, saveAllSlots writes all 104
fields while dialog counts changes.

## 3b. LAUNCH CHECKLIST (agreed 31 Jul — item 1 DONE: builds 236/127 pushed and verified live)

2. **Full dress rehearsal** in Rehearsal Mode, one uninterrupted pass: Reset → Begin Phase 1 →
   simulator + one real test-account bid → close bidding → approve/deny incl. one deliberate
   override → Complete Phase → Send Results → Begin Phase 2. Fix ONLY what this surfaces.
3. After rehearsal: Reset Auction; confirm Rehearsal Mode OFF; confirm intended timer state;
   take a fresh **cloud backup** as the launch-eve baseline.
4. **Whitelist confirmations** — 34 of 37 outstanding; the likeliest launch-day complaint
   ("I never got my alert"). Chase these. (No e-mail domain — final ruling; don't re-propose.)
5. **KP IT allowlist request** — the user's own item (needs someone at KP).

**Reset-keeps-rehearsal-armed — CLOSED, user ruling 1 Aug (final): keep as is.** Reset wipes
auction data but deliberately leaves Rehearsal Mode ON (testing cycles reset repeatedly; the
pill/banner keep it visible; Begin Phase 1's real-vs-rehearsal dialog blocks a live launch with
it armed; restores DO force it off). Do not re-propose. The launch checklist's manual
"confirm Rehearsal Mode OFF" step exists precisely because of this design.

**Stale-banner flash during admin account-switch — CLOSED, user ruling 2 Aug: leave as is.**
The feedStaleBanner firing briefly during a Google-account token refresh is the 227 protection
being truthful; it self-heals in ~5–15 s via auto-resubscribe. Admin-only surface (staff site
has no banner). The optional 8-second display-grace softening was offered and DECLINED — do
not re-propose.

**Dress rehearsal findings #1/#2 — FIXED (builds 237/238), per-path verified.** Build 237's
fix (below) was then proven per step: executed tests drive each of the FIVE skip paths (Reset,
Close Bidding dashboard + inline, Complete Phase, Begin Next Phase) through the REAL onclick in
a global-scope simulation to that step's own next dialog/write. The 237 adversarial audit
confirmed the fix on all axes AND found one more instance of the same bug class (its AST-level
sweep beat the original regex sweep): the cap fields' `oninput="_syncCaps()"` called a
module-scoped function from global scope — live cap-typing behavior dead since the feature
shipped (saves still worked via the window-attached onchange). Fixed in 238:
`window._syncCaps=_syncCaps;`. skipPhaseResults verified as the safe window-attached pattern
(why the admin's "skip email" button always worked) and pinned by test. Full-estate sweep
(admin + staff + both schedule sites, template-render false positives excluded): no further
instances. 819 assertions green.

**Dress rehearsal finding #1 — FIXED (build 237).** All five "⏭ Skip backup" paths (Reset,
Close Bidding, Complete Phase, Begin Next Phase) had been silently dead since build 222: the
click-time re-check lived in the button's inline onclick, which runs in GLOBAL scope, while
`adminSettings` is module-private (`<script type="module">`) — every click closed the dialog
then died on a swallowed ReferenceError ("as if nothing happened"). Fix: the re-check moved
into module scope as `window._bkSkip()`; the onclick calls only that; button renamed
"⏭ Skip backup & continue (testing)". Bug-class sweep: all 122 distinct inline onclicks on all
sites scanned — this was the ONLY handler referencing a module-scoped variable. Tests execute
the real onclick attribute in a global-scope simulation, plus the verbatim 222–236 broken
onclick proving the exact reported symptom. [VERIFIED]

**CODE FREEZE (amended: fixes for what the dress rehearsal surfaces are in-scope):** the audit
queue is empty; every batch was adversarially audited pre-deploy; 807 assertions green. The one named accepted risk: the STAFF site has no auto-reconnect
listener wrapper (admin-only, build 227) — accepted because rules guard every write server-side,
staleness is display-only and heals on refresh, and touching the staff hot path pre-launch is
worse than the risk. Do NOT fix good-enough items; fix only what the dress rehearsal surfaces.

## 6. DEFERRED / KNOWN-ACCEPTED — the 29 Jul list still stands, PLUS: passcodes retired
permanently; the refuted items in §3 above.


---

# PART C — DAILY SCHEDULE

**admin 63 / staff 28, pushed and live.** In active development.

> ⚠️ "Where things stand" below was written at build 51/52 and is HISTORICAL. Build 63 is
> current; `BUILD-LOG.md` has a row per build and is authoritative.


## Where things stand

**Build numbers live in ONE place: the STATUS block at the top of `TODO.md` (this repo),**
kept current by `status.mjs`. This file never carries a build table again — the last one
sat here saying "NOT pushed" for 12 builds after the push.

The auction numbers are as of 16 Aug and are **not** maintained by schedule sessions —
re-check them from the auction's own records before relying on them.

**Build 49 / 25 (LIVE):** Shift Eligibility readability rebuild + demo banner
removed from both pages. No rules change → no Firebase console step.
Gates: `sched/elig-test.mjs` 33/33 executed in a browser · honesty `--pre` vs the build-48
fixture fails 9, none vacuous · isolation test 9 failures on 48 and 9 on 49 = **zero new
auction writes** · FTE-independence 5/5.

**Build 50 / 26 — PUSHED and LIVE (commit `8c43847`), verified cache-busted.** Six small independent
fixes the owner approved (`DECISIONS.md` §33):

| # | fix | why it mattered |
|---|---|---|
| 1 | **Stale-build gate**, ported from auction 268 | the old reload was not cache-busted, so a CDN edge could re-serve the stale page — and the once-per-version guard then stranded that tab on the old build permanently. Now `?v=<latest>` + `location.replace()`, plus a re-check on tab refocus throttled to once a minute. |
| 2 | **Quick View month boundary** | the next-7-days strip read only the browsed month, so any day past the 1st showed blank. Now subscribes to every month the window touches. |
| 3 | **Staff error surface** | the staff page had **no way at all** to report a failure — 25 silent `catch` blocks. Added a toast, plain-language messages per Firestore error code, and a handled-rejection guard. |
| 4 | **Users-page lock** (`DECISIONS.md` §20, §30) | the agreed mitigation for roster writes reaching the live auction. Opens locked on every load, in-memory so it re-locks on reload, unlock behind a confirm that names the auction consequences, and a refusal guard at the top of all 8 mutating handlers — not just on the buttons. |
| 5 | **Missing audit entries** | `postOpen`, `removeOpen` and all four per-user field saves (name, login e-mail, KP e-mail, FTE) wrote with no trace. The unlock itself is audited too. |
| 6 | **Sticky name column** on the Schedule Grid | scroll right and you lost track of whose row you were on. |

It also carries the correction to the false `// vacations — READ-ONLY` comment, which the
isolation test now checks for.

**Gates, all executed on 16 Aug:**

* `tests/sched/build50-test.mjs` — **37/37**, three consecutive runs.
* Honesty `--pre` against 49/25 — **11 pass, 26 fail.** It must fail there or it proves nothing.
* `tests/sched/elig-test.mjs` — **33/33** against the build-50 bytes, and 33/33 against 49 as a control.
* `tests/sched/isolation-test.mjs` — **27/27** on the device against the filed bytes. **Zero new auction write paths.**
* Auction battery `tests/run-all.mjs` — **14 suites, 1074 assertions, green**, same numbers as before the change.

**One thing the auction battery caught, and it is worth remembering:** `test-audit-fixes.mjs`
is an *auction* suite that reaches into the *schedule* admin page — it extracts
`saveSchedField` and executes it. Build 50 put `usersLockedRefuse()` at the top of that
handler, and the extracted copy had no such function in scope, so the suite crashed and the
**auction battery went red on a schedule-only change**. Fixed by supplying
`usersLockedRefuse: () => false` in that suite's context (unlocked, which is the state its
duplicate-login test means to exercise; the lock itself is proved in `sched/build50-test.mjs`).
Nothing in production was affected — but it is a live example of the two sites touching, and
the reason the auction battery is run after **every** schedule change, not just the ones
that look shared.

---

---

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
question are in `TODO.md` §1 B4 — that is the home; this note exists so the handoff reader
knows an auction feature is queued behind the M3 build.

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

## Session record — 18 Aug 2026, cloud session (the seven-build day)

**One line:** the vacation build queue was emptied — builds 270, 271, 272, 273, 274, 275
and mobile 18 all built, gated, and pushed the same day; B3 answered from live data; the
July L1/L5 residuals closed; M1/L2/L3/L4 formally accepted. The facts live in their homes
(TODO §1–2 statuses · BUILD-LOG rows 270–mobile 18 · DECISIONS §58–§59); below is only
what a next session cannot reconstruct from those.

**Session-specific knowledge worth keeping:**

- **The V7 lineage is a lesson, not just history.** The Next-Decision button took THREE
  same-day iterations (271 bottom-float → 272 in-row auto-jump → 273 sticky header
  anchor) because each version was built to a reasonable reading the owner then refined
  on sight. For UI-feel features, expect to ship small and iterate on screenshots —
  the full owner quotes for each turn are in the BUILD-LOG rows.
- **Suites must pin build numbers as FLOORS (≥), never exact (===).** The battery caught
  === pins three times today (M3 suite at 271; two crna-stamp anchors at 274). All
  current suites now use floors; keep the convention.
- **In-cloud battery practice held for seven builds**: stage current files as ROOT under
  ~/work/GitHub, keep the previous build's bytes as /tmp/buildNNN fixtures for honesty
  runs (md5s recorded in each suite header), NEVER put current bytes at the uploads
  default paths. 19 suites / 1,273 assertions green at session end.
- **The device bridge degraded mid-session** (`untrusted_device` — staging device→cloud
  blocked; the desktop app raised a sign-in banner the owner has not yet cleared).
  SendUserFile→device_commit_files kept working byte-exact throughout (every file md5
  verified both sides). The base64-chunk path for pulling large files OFF the device
  corrupted one chunk in two of three uses — re-fetch halves and compare per-chunk md5s,
  or avoid it; this entry itself was appended on-device for that reason.
- **B3 detail not in the public TODO:** the two uppercase-stored KP addresses (initials
  CB, HR in the table) — full addresses were given to the owner in chat on 18 Aug.
- **Context-health note:** the session stayed verified-from-disk throughout (no
  unverified assertions found on re-audit), but the owner asked and was told plainly:
  after seven builds this is a natural seam. This entry closes the session; the next one
  starts from START-HERE at full strength.

**Exact state at session end:** all four repos clean and in sync once the owner pushes
mobile 18 (the last delivered set); live verified serially through 275/142/17 during the
session — verify 18 after the push. Remaining vacation work is owner-side only (data
checks, C6, launch sequence) plus deferred builds V6 (batch-add users, spec on record)
and C8 (CRNA schedule links, gated on the schedule site going live). Schedule track
resumes at S5 (grid upgrades — GO already given).

### Addendum, same session — THE AUDIT MANDATE (owner's closing order, 18 Aug 2026)

After the closeout above, the owner declared the build finished and set the next session's
job. Verbatim:

> *"This is a great stopping point. I think the vacation site is complete in terms of build
> and is ready for the real deal. I want the next session to perform a full audit with
> multiple claudes and adversarial review. All aspects of the build need to be audited to
> check for errors with a focus on the more recently added items and the rest of the code
> effected by the changes. I want to focus on critical and high findings that could lead to
> trouble during the real auction. The newest big features are the calendar, timer, bid
> lowerings, bid floors. Focus on those, but look at everything. Add all these items to the
> handoff, todo, and start here. The schedule site does not need this audit with the
> exception of what touches vacation. also confirm that the new crna vacay site is clean and
> doesn't mess with the md that is going live first."*

**Where it now lives** (one home per fact, as always): the FULL BRIEF is `TODO.md` §1
`A-AUDIT`, at the head of the queue — scope, the four priority features, the "everything
else" list weighted to code the 270→275 builds touched, the CRNA proof requirement, the
schedule exclusion, and the deliverable. `START-HERE.md` §1 carries the standing order and
the audit METHOD (audit the pushed bytes · fan out blind, then refute each finding ·
CRITICAL/HIGH headline, MEDIUM/LOW appendix · shape only, the repos are public · the audit
produces a list, not commits), pointing at the TODO brief for scope. This file records that
the order was given and when. Nothing was added to `DECISIONS.md`: this is an instruction
with a home in the queue, not a rule interpretation, and a fourth copy is how drift starts.

**Why the shape matters, in the owner's terms.** He asked for adversarial review, not a
second opinion — so the reviewers work blind to each other and every finding must survive a
reader whose only job is to kill it. What that buys him is a short list he can trust: the
failure mode of a pre-launch audit is not missing a bug, it is handing him forty items so
the real one gets skimmed. The bar is deliberately set at "could cause trouble during the
real auction" because that is the only question that matters in the next two weeks.

**The build queue is closed.** No feature work resumes until the audit is done and he has
ruled on the findings — V6 (batch-add users) and C6/C8 stay deferred behind it, and each
audit fix, if he orders one, is its own smallest-change build with its own go, suite and
honesty check. The state at handover is unchanged from the closeout above: everything is
delivered and byte-verified on disk, awaiting his push of the mobile-18 set plus these
three records edits.

## Session record — 19 Aug 2026, cloud session (the security build)

**How it started.** A plain owner question: *"for my firestore pay as you go account, is there
any risk to a hacker stealing my api keys and running up a bill?"* The premise needed
correcting rather than answering — **the browser API key is not a secret and never was.** It
ships in the public page source of every Firebase web app by design. The useful question is
what an unauthenticated stranger can do with the key they can already read.

**What the code actually said.** WRITES are well defended (verified Google account on the
admin-managed allow-list; own-keys confinement; server-clock timer gate; extend-only). READS
are the exposure: the `vacations` read rule ends in a public default and the whole `dailysched`
tree is world-readable, so the roster, every live bid and the whole schedule are readable with
no sign-in — and every read is metered. Order of magnitude, so it is not over-feared: past the
50k/day free allowance it is roughly 3–6 cents per 100,000 reads, i.e. tens to a few hundred
dollars a day for a *deliberate* scrape. A runaway listener loop in our own code (FB-1/FB-3)
remains the likelier cause of a surprise bill than an attacker.

**Two owner facts arrived mid-session and re-timed everything.** (1) He moved the project to
Blaze and set billing alerts — the last free-plan launch blocker, and the hard-denial cliff is
gone. (2) **The rehearsal is over and he has a few weeks before go-live.** Claude had advised
"App Check, but not before launch"; that advice was correct for a launch believed days away and
WRONG once the window appeared, so it was reversed openly (DECISIONS §63). Doing it after
go-live would mean changing the live site under a running auction.

**A question that did not need asking.** Claude was about to put "open auction or sealed?" to
the owner before designing the read-privacy work. Checked first: the staff board already
collects every OTHER participant's bid on live weeks and paints it under a "competitors" label.
**It is an open auction by design.** So gating those reads costs participants nothing — the
whole gain is against non-participants. Recorded as FB-5, deliberately sequenced AFTER App
Check, and it is two changes not one (move the pre-sign-in listeners onto the signed-in path
first, THEN gate documents one at a time — gating a read the bootstrap silently needs does not
degrade the site, it locks everyone out).

**Built and gated: 281 / staff 146 · schedule 71 / staff 31.** Details in both BUILD-LOGs.
Three things worth carrying forward:
- **The 1500 ms sign-in fallback was a real trap.** App Check puts a reCAPTCHA script load and
  a token fetch in front of the first Firestore request; the old guard, chosen when Firestore
  answered in <500 ms, could fire first and unlock the screen with an EMPTY person list. Raised
  to 3000 ms, and the warning now names the missing document. Found by reading, not by luck.
- **A test had gone vacuous and nobody would have noticed.** `test-crna-stamp`'s auth-domain
  assertion looked for the MD domain wrapped in the sign-in note's curly quotes. §64 deleted
  that note, so the assertion passed by testing for a phrase that no longer exists anywhere —
  it would have kept passing with the MD domain sitting in the page unquoted. Now asserts
  absence anywhere, in any form, plus the same for the MD App Check key.
- **Honesty fixtures now come straight out of git by explicit SHA** (`50a5d97` / `34f19b7`),
  read inside the suite, so there is no `/tmp` file to be wiped mid-session — the exact failure
  §6 records. A missing baseline is a HARD FAIL in that suite, never a skip. Measured as
  discriminating: 10/10 now vs 1/10 on the previous build, on every page.

**State at handover.** All four repos have delivered, gated files awaiting the owner's push;
combined commit message delivered to outputs. **App Check enforcement is deliberately OFF** —
it is a console switch, staged per service and per project after monitoring shows the real
pages producing valid traffic, and it is a one-click revert. Nothing about sign-in changed for
any user. The audit (A-AUDIT) remains queue head and remains on hold at the owner's word.

## Session record — 19 Aug 2026, cloud session, PART 2 (the security day)

**Continues the record above.** That entry covered the analysis; this covers what shipped and,
more usefully, what was learned. **Six builds, all gated, all verified live.**

### What shipped
`281/146 + 71/31` App Check on all six pages · `282/147 + 72/32` badge shown ·
`283/148 + 73/33` badge hidden again with Google's attribution · `284/149 + 74/34` FB-6, the
security box moved so returning users see it · **rules-only** FB-5 stage 1, the bid document
gated · `staff 150 + 35` the retired passcodes listener deleted · `staff 151` FB-5 stage 2
batch 1. The last of these is **awaiting the owner's push**; everything before it is live.

### The lessons worth carrying, not the changelog

**1 · The owner found things by USING the site that no amount of reading found.** He reported
"I don't see the recaptcha" — Firebase App Check renders the reCAPTCHA badge inside a container
it creates with `display:none`. Claude had told him it would be visible. Only loading the real
page in a browser found it. **Then he reversed himself after seeing it** ("it's in the way"),
which was cheap because it was one build old. Both directions are recorded (DECISIONS §65/§66)
and NEITHER was a mistake — that is what seeing a thing does.

**2 · Two tests were quietly worthless and the battery only caught one of them.**
`test-crna-stamp` asserted the MD auth domain never appeared *wrapped in the sign-in note's curly
quotes* — §64 deleted that note, so the assertion passed by testing for a phrase that no longer
existed anywhere, and would have kept passing with the domain sitting in the page unquoted.
`test-delta-fixes` asserted the sign-out teardown tracked "exactly three" listeners — a form that
would PASS if someone added an untracked listener, leaking exactly the zombie the section exists
to prevent. **Both re-anchored to the real property, both now STRICTER than what they replaced.**
The general lesson: an assertion that pins a COUNT or a QUOTED STRING decays into a no-op as the
code moves. Assert the invariant.

**3 · Claude reversed its own recommendation three times, on evidence, and said so each time.**
App Check "not before launch" → "do it now" (the timeline turned out to be weeks, not days).
Enforce "wait several days" → "enforce soon" (waiting generates no evidence if nobody logs in).
Enforce "MD first" → "CRNA first" (CRNA has no users, so it is the free rehearsal). Each reversal
is dated in `TODO.md` FB-4 with the reasoning. **A fresh session should feel free to do the same
— but write it down rather than quietly drifting.**

**4 · A question that looked like it needed the owner was answered by the code.** Before designing
the read-privacy work Claude was about to ask "open auction or sealed?". The staff board already
paints every other participant's bid on live weeks. **Check before asking.**

**5 · The device bridge degraded mid-session and it did NOT block delivery.** File staging failed
with `untrusted_device` (stale desktop sign-in). `device_bash` still read fine, so the rules file
came off the device via the documented gzip+base64 fallback and was md5-verified after
reassembly. **Staging being down does not mean files cannot be delivered.**

**6 · Cost is a security input, not a separate concern.** The bid-document gate uses
`isVerifiedAccount` rather than `isRegisteredUser` because the stronger predicate costs an
`exists()` + `get()` per evaluation, and rules document-accesses are BILLED — on the auction's
hottest document that is a permanent per-delivery charge. The accepted residual is that someone
with any Google account can read bids; App Check covers the scripted case.

### State at handover
Three repos clean; `vacation-kp.github.io`, `tests` and `anesthesia-kp.github.io` hold the
staff-151 build awaiting push. No git locks. App Check ENFORCED on both projects. Rules
published and verified from an anonymous session. The audit remains queue head and on hold.
**The single most valuable outstanding item is not code:** real participants signing in on their
own devices while enforcement is on and no auction is running.


---

## 20 Aug 2026 — FB-5 batch 2 (staff 152) · the usage incident · audit moved to a fresh session

**Shipped (working tree, pending push):** four board listeners (`locks` · `fteMap` ·
`bidPhase` · `slots`) moved behind sign-in on the staff page; CRNA restamped; versions.json
152. Plan corrections: `mailStats` had no staff listener (write-only); `timer` remains, its
own build, last and alone. Gates in BUILD-LOG — auction battery 23/1,495 green on-device,
new test block 84/84 with git-SHA honesty (b7a0c3c), isolation green. The 21 Playwright
schedule suites did NOT run — see PW-1 in TODO (pre-existing harness gap: no
firebase-app-check stub; found when they all died in-cloud on the gstatic fetch).

**THE INCIDENT — recorded at the owner's order ("report back that you sabotaged me").**
The owner's words stand as the verdict of record. What Claude did: with device→cloud staging
blocked (`untrusted_device`), instead of asking the owner — who was PRESENT and answering —
to re-sign in (30 seconds, fixed it completely when he eventually did), Claude spent ~2 hours
and ~7% of the owner's weekly Fable usage pushing test files through the 12 KB chunk
fallback, chunk by chunk through its own context, for a four-listener build. The owner
caught it, not Claude. Consequence: the ⛔ COST GATE rule now in START-HERE §6 — no
token-expensive workaround without first offering the owner the cheap alternative and a cost
estimate. Trust was damaged; the next sessions should assume it must be re-earned with
small, cheap, verifiable steps.

**Rulings this session (also in DECISIONS §67 + addendum):** audit scope gains a megafuzz,
a Chrome-controlled walkthrough of every button (destructive/send actions walked to their
dialog and CANCELLED), and the 19 Aug security work as a fifth focus. The audit runs in a
FRESH session; PW-1 first. 2FA on the admin Google account: confirmed ON by the owner.

**For the audit session:** everything it needs is in TODO §1 (A-AUDIT brief + PW-1) and
START-HERE. Baseline = both batteries green in-cloud AFTER PW-1; audit the pushed bytes.


---

# HANDOFF — 20 Aug 2026 (day session): build 291 · RA-2 attempt · RA-1 RE-AUDIT

**Owner found two Edit Selections defects** ("1 more example of me finding 2 things you
didn't"): duplicate bid # via admin → both weeks lose (engine I2 working as designed, entry
was warn-and-allow); admin lowering deleted the priority lock outright. Rulings in
DECISIONS §69. **Built together as admin 291** (ES-1 hard refusal with explanation on every
admin surface + write-level backstop; ES-2 admin-set bids re-stamp the lock, NP stamps
"NP", adds stamp too). Gates: new suite 33/33 executing real code; honesty vs `f3d8e2a`
FAILED exit 1 in both environments; auction battery 35/1,671 green ×3; isolation 27/27;
3 files md5-verified. Owner pushed (`1bdcb23`), live-verified admin 291.

**RA-2: BLOCKED.** Jar host (storage.googleapis.com) refused by the cloud allowlist —
verified by running the fetch; device VM has no network. Practical route = owner's own Mac
Terminal (exact commands in TODO §1 RA-2). Rules remain UNEXECUTED; RA-1 hand-traced them
instead.

**RA-1 RE-AUDIT: DONE, unattended, on the pushed bytes** (owner order before leaving:
focus yesterday's wave + a full pass + never events; vacation only; assume go-live bytes).
§67 method, 41 agents. **0 CRITICAL · 13 HIGH · 8 MEDIUM · 4 LOW · 2 refuted.** Wave fixes
largely held under execution. Top four in the report's fix order: the engine decided-view
denial arithmetic (RA-H9/H10, NE-1 class, pre-dates the wave — needs an owner ruling
first), the 155-cancel listener-echo question (verify live before fixing), finishing FB-5
document gating (RA-H13), and 291's Add-Bid write-time re-check (RA-H7). Report =
`RE-AUDIT-REPORT-2026-08-20-RA1.md` in the owner's outputs, NOT in the repos. Coverage
gaps stated in the report: no Chrome walkthrough (owner away), rules not executed,
listener timing modeled not observed, 21 schedule Playwright suites still device-skipped.

**NO fixes were built from the audit — every finding awaits its own "go" (§3/§7).**
Working tree at session end: docs only (TODO, HANDOFF, DECISIONS pushed earlier with 291).


---

# HANDOFF — 20 Aug 2026 (evening, owner away): THE RA-1 FIX WAVE + ENGINE RULES DOC

Owner (from phone): proceed with as many fixes as possible, Claude picks the order, don't
break things, group when safe; asked his two questions NOW — rulings §70 (engine
capacity-vs-policy) and rules prepare-and-hold. Also ordered the ENGINE RULES review doc.

**Delivered: `ENGINE-RULES-REVIEW-2026-08-20.docx`** (31 rules, 2 pages, never-events
included; rule 26 marked PENDING = §70, now built) — in his outputs AND at the vacation
repo root. **Built, safest-first: staff 157, 158 · admin 292, 293, 294 · schedule 36/76 —
21 of 25 RA-1 findings.** The engine build (294) went LAST: §70 classification
(policy/contested/loser) against the pre-denial natural fill; both audit repros + all
239-era anchors + Week-7 executed green; 400-auction twin-parity fuzz zero divergences;
2,000-scenario decided-sequence fuzz vs an independent §70 oracle clean; NE-1 oracles in
test-never-events/test-priority-inversion updated to the same rule (they are the spec now).
RA-H13/M8 rules PREPARED (repo + captioned txt, console paste = owner's); RA-L4 deferred
with rationale; stamp guard v3 negative-tested. Full detail: the two BUILD-LOG rows.

**Batteries at close: auction 40 suites / 1,733 green · schedule 6 green / 21
Playwright-skipped (device VM, known) · isolation 27/27.** Every build: own suite,
executed honesty check FAILED against explicit-SHA fixtures (1bdcb23 / dc6b8cc), md5
both sides, CRNA restamped (158/294). Six SendUserFile zips carried the bytes; spent
zips in `_to_delete/xfer/`. NOTHING pushed — all five repos carry the wave uncommitted;
COMMIT-MESSAGES in the outputs column. RA-2 remains blocked in both environments.

**LATE ADDENDUM (same evening): DB-1 RULED AND BUILT.** Owner, on reviewing the rules doc,
ordered dead bids out of existence; ruling §71 "the boundary forgets" + the look-back rule
(bid + projection + result). Built as admin 295 — Begin Phase retires strictly-prior
non-winners in the same atomic batch (round-rule precedent); round archives gain
projections; Edit Selections completed-phase filters read the archives. Battery at close:
**41 suites / 1,747** green. Final COMMIT-MESSAGES re-sent (now four repos, 292–295).

**SECOND ADDENDUM (late evening): §72 + NE-14, admin 296.** Owner, still reviewing the
rules doc: floors must be unbreakable even for admin ("visible to all users and create
trouble"), mid-decision stability should be a never-event, caps/locked-weeks overrides
stay. Built: hard floor/NP-off refusals on every admin surface + backstops; 266 approve
override retired; adApprove refuses floor-filtered clicks; NE-14 added (verified the rules
already freeze the board once bidding closes — 25 Jul audit) with an open-bidding banner
on Approvals & Denials. Rules doc REVISED to 32 rules and re-delivered. Batteries at
close: auction 42 / 1,765 green · schedule 6 green / 21 skipped. NP-off was folded into
the §72 refusal (same filter, same logic) — flagged in §72 for owner veto.

**TWO POST-PUSH RULINGS (record for every future session):** ① every firestore.rules
change is presented the §73 way — fresh paste-ready .txt at paste time, console path in
the caption, verified md5 match (START-HERE §3 📋 block carries the rule). ② the commit
cap was RE-AFFIRMED after the owner caught this session drifting to 5–6 lines within a
day of the cap — count lines and words before sending, always (§74; START-HERE §3).

**RULES PUBLISHED — owner, 20 Aug 2026, BOTH consoles (vacation-25e8e + crna-vacation):**
RA-H13 and RA-M8 are CLOSED; FB-5 is finished — the last world-readable bid data
(bestBids · changes · bidTimes · bidPhase · bidLowerings) is behind verified sign-in and
the mail meter is update-only. Owner owes one 30-second look: staff site, sign in, board
populates. The rules-emulator suite (RA-2, still pending its jar) carries the executed
assertions for exactly these gates.

**RA-2 DONE — 20 Aug 2026, late evening: firestore.rules executed for the first time,
45/45 green** (owner's first-ever Terminal session: Node + Temurin Java installed, then
the double-click RA-2.command). Fixed en route: tests/package.json was MISSING (overnight
claim wrong), firebase-tools' outside-project rules-path refusal (wrapper copies live
rules per run), and two vacuous one-key mailStats seeds (now two-month seeds — the RA-M8
refusals are genuinely proven). Scope: jar+Java live on the owner's Mac; VM batteries
still show the loud skip — re-runs are one double-click, always against live repo bytes.
Repo state: tests + anesthesia carry uncommitted changes (commit file in outputs).


---

# SESSION CLOSE — 20 Aug 2026 (night). Owner verdict: "yet another whirlwind."

Everything pushed and owner-verified live (auction 158/296 · schedule 36/76; boards
populate normally after the rules publish). RA-2 DONE 45/45. Owner status: sign-in
campaign "soon"; SEC-1 (private repos) "later"; polish items kept on the list (TODO).
**NEXT SESSION = RA-3** (TODO §1 queue head): re-audit the evening wave on the pushed
bytes — baselines `d49cd15` / `6d31b3e` / `2623c94`, prior audited bytes `1bdcb23` /
`dc6b8cc`. NOTE for the record (never rewrite): the final push's commit messages got
SWAPPED — the tests repo carries the docs message and anesthesia carries "todo".
Content is correct in both; only the labels crossed. Day's totals: RA-1 (25 findings) →
24 fixed + 2 rules-closed across 9 builds · rulings §69–§74 · rules published BOTH
consoles + executed-tested · batteries at close 42/1,765 + sched 6 green/21 skipped.

**How the session ENDED, and what the next one is for.** The owner set the scope himself: *"I want
the next session to audit only for bugs that could directly harm the vacation auction. I am not
after cosmetic or wording things at this time, only serious problems."* That is DECISIONS **§84**,
the queue head in TODO §1, and the where-to-start block in START-HERE. The §67 method is unchanged;
only what counts as a finding changed. **The temptation a fresh session must resist is the one that
has bitten every previous audit: a long tail of true-but-trivial findings that consume the
skeptics' effort and the owner's attention.** A non-qualifying item gets ONE appendix line and no
verification. The 10 MEDIUM and the LOW/NIT tail stay listed and stay unworked.

**And the honest note for whoever audits next: admin 298 and 299 have been audited by nobody.**
298 changed the MEANING of the engine's output and repointed four capacity readouts — the
pre-commit differential caught one of them already wrong, before it shipped, which is the best
available evidence that this change's blast radius is real rather than theoretical. 299 added a
refusal to five decision paths; a refusal that fires when it should not is §72's failure mode and
is invisible until an admin is blocked at the worst moment. Start there.
