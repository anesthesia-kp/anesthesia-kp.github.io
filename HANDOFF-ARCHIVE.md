# HANDOFF ARCHIVE — sections moved out of HANDOFF.md
<!-- answers: sections archived from HANDOFF.md, verbatim and dated (moved by archive.mjs) — read when a working file points here, or when a fact is absent from the working file -->

Nothing here is deleted or paraphrased: each block below is a section of HANDOFF.md exactly as it stood, under a header saying when it moved. Grep this file before concluding something was never written.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 25 Aug 2026 (ARCHIVE PASS) — the tripwire pass ran, and a gate that had been lying for a week

## 25 Aug 2026 (ARCHIVE PASS) — the tripwire pass ran, and a gate that had been lying for a week

**No code shipped. Docs and one tooling fix.** Owner asleep for most of it, on a clear "do all
these"; everything is filed in the working tree and nothing is pushed.

**THE GATE THAT LIED, and it is the most reusable thing here.** `node status.mjs` opened the
session by declaring `START-HERE.md` STALE. It was not. The file said *25 Aug*; git said the last
commit touching it was *2026-08-24*. Both were right: the commit landed at **22:42 PDT on 24 Aug**,
which is already 25 Aug in UTC. **The old gate read its two clocks from different places** — the
git branch used `%cs`, the committer's LOCAL day (Pacific), while the not-yet-committed and mtime
branches used `new Date()`, the day of whatever BOX runs node (UTC in a cloud session, Pacific on
the Mac). So the same document could pass or fail depending on whether it happened to be committed
yet and on which machine asked. In practice it cried STALE for **seven hours out of every
twenty-four** — every session working past 5pm Pacific.

Fixed by pinning both sides to `America/Los_Angeles` (the owner types the date and the owner reads
it) and by asking the question the gate actually exists to ask: **does this document UNDER-report
its own age?** A stated day that is older than the last change is staleness. A stated day equal to
the change day, or one day after it, is the legitimate UTC/Pacific straddle. More than a day ahead
is a typo. **Proved four ways before it was trusted** — stated 17 Aug → exit 3 (the exact 17-Aug-
on-19-Aug failure the owner caught himself still fires) · 30 Aug → exit 3 as a typo · 25 Aug and
24 Aug → exit 0. The old gate on the same fixtures failed 24 Aug and passed 25 Aug on the mtime
branch, and did the exact reverse on the git branch — which is the bug, stated as a test.

**A gate that fails when nothing is wrong is the same disease as one that passes when something
is** — people stop reading both. Worth remembering the next time a green tick is the thing being
checked.








> ⚠️ **AND THE PASS CAUGHT ITSELF IN A LIE, which is worth more than the tidying.** Three bullets
> were cut in place and replaced with a note reading *"archived with the narrative"* — they were
> not; the surgery ran before the block move, so those lines existed nowhere. **The conservation
> check found it**: every line of the original is compared against the new file plus the archive,
> and anything in neither is listed. **Run that check on any pass that claims nothing was
> deleted.** A claim of conservation is worth exactly as much as the thing that verifies it.

⚠️ **A STANDING RISK, written down rather than acted on: `_archive/` IS NOT IN ANY GIT REPO.** It is
a plain folder under `~/Documents/GitHub`. The one place this project promises *nothing is ever
deleted* is the one place git has never seen — precisely the 22 Aug failure mode, when two
untracked files were recovered from iCloud with hours to spare. Every previous archive went there
too, so the convention was followed, not changed. **It is the owner's call whether it should be.**

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 25 Aug 2026 (LATE) — THREE BUILDS, AND EVERY ONE OF THEM FOUND A LYING GATE

## 25 Aug 2026 (LATE) — THREE BUILDS, AND EVERY ONE OF THEM FOUND A LYING GATE

**Shipped: admin 99 (collapse sweep), 100 (group rename, stripper), 101 (§103 "Staffing").**
99 is live; 100 and 101 are filed and awaiting a push. Detail is in `schedule/BUILD-LOG.md`;
this entry exists for the pattern, which is the part a fresh session would otherwise repeat.

**THE PATTERN: every one of the three builds was gated green by something that was not looking.**
· **99** — `toggleSect` ends in `else renderCatalog()`, so an unregistered key re-draws an
  unrelated page. Caught by a BEHAVIOURAL probe (plant a marker, toggle elsewhere, see if it
  survived), not by reading the source.
· **100** — a `/*` inside a line comment had been blanking 70% of the page before `build80-test`
  read it, so its `prompt()` gate never fired while a real blocking `prompt()` sat in the code.
· **101** — `sched/run-all.mjs` keeps a HAND-WRITTEN suite list, and builds 99, 100 and 101's
  suites were none of them in it. The battery said *"49 suites, all green"* over three suites it
  had never heard of.

⚠️ **AND CLAUDE ADDED A FOURTH, WHICH IS THE ONE WORTH READING.** It reported that two red suites
failed identically on three earlier builds, wrote **"proven by execution"** on it, and filed that
into `BUILD-LOG.md`. The bisect had never run: those suites read `SCHED_ROOT`, and `ADMIN=` was
being passed. **The input was ignored rather than rejected, so every run returned the same number
— which is exactly what a clean result looks like.** A subagent re-running it properly is what
caught it. Corrected in the row and in `TODO.md`. The general form is now §3 rule 8's third kind.

**What that says about the day: the code was fine and the instruments were not.** Three of the
four were found only because something ran the thing rather than reading it, and the fourth was
found only because a second pair of eyes re-ran it with different inputs. **Run it, don't recall
it — and when a gate agrees with you, ask what it would have said if it were broken.**

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 25–26 Aug 2026 — SIX BUILDS, AND EVERY ONE FOUND A GATE THAT WAS NOT LOOKING

## 25–26 Aug 2026 — SIX BUILDS, AND EVERY ONE FOUND A GATE THAT WAS NOT LOOKING

**Shipped live: 99 · 100 · 101 · 102 · 103. Filed and awaiting a push: 104.** Per-build detail is
in `schedule/BUILD-LOG.md`. This entry is the pattern, which is the part a fresh session would
otherwise repeat.

**THE PATTERN.** Six builds, six instruments that were wrong:
· **99** — `toggleSect` ends in `else renderCatalog()`, so an unregistered key redraws an
  unrelated page. Found by a BEHAVIOURAL probe (plant a marker, toggle elsewhere, see if it
  survived), never by reading the source.
· **100** — a `/*` inside a LINE comment had opened a block comment **347,322 characters long**,
  so `build80-test`'s stripper was testing ~30% of the page and its `prompt()` gate never fired
  while a real blocking `prompt()` sat in the group rename.
· **101** — `sched/run-all.mjs` keeps a HAND-WRITTEN suite list, and builds 99, 100 and 101's
  suites were none of them in it. The battery reported *"49 suites, all green"* over three suites
  it had never heard of. The runner now **exits 2 and names them** if any suite on disk is
  unregistered.
· **103 and 104** — the extractor gotcha, twice: `build78`, then `build69`/`build70`, all extract
  a function and eval it alone, and all broke the moment that function grew a dependency.

⚠️ **AND CLAUDE ADDED TWO OF HIS OWN, which are the ones worth reading.**
**① A false claim, filed.** He reported that two red suites failed identically on three earlier
builds and wrote **"proven by execution"** on it, into `BUILD-LOG.md`. The bisect had never run:
those suites read `SCHED_ROOT` and he was passing `ADMIN=`. **The input was ignored rather than
rejected, so every run returned the same number — which is exactly what a clean result looks
like.** A subagent re-running it properly is what caught it. Now §3 rule 8's third kind.
**② A near-miss in 104.** Fixing the extractor break by extracting the REAL `staffingOn` bypassed
the fixture map `build69`/`build70` drive everything from, silently turning every day into "not
asked for". The right fix was to stub it **in the SHAPE of the real function** beside the
`demandOn` stub those suites always had — §3 rule 10's FAST-1 lesson, arriving from a new angle.

**THE THING TO CARRY: the code was fine and the instruments were not.** Every one of these was
found by RUNNING something, or by a second reader re-running it with different inputs. When a
gate agrees with you, ask what it would have said if it were broken.

**ON CONTEXT.** This session ran past **580,000 tokens with no compaction**, having started the
day with Claude asserting a 160,000-token ceiling as fact. The thresholds were invented twice and
overruled twice by the owner, and §106 now records what the number does and does not measure.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 26 Aug 2026 (EVENING) — THE PIVOT BACK TO THE AUCTION, ONE OWNER-FOUND DEFECT, AND THE DECK

## 26 Aug 2026 (EVENING) — THE PIVOT BACK TO THE AUCTION, ONE OWNER-FOUND DEFECT, AND THE DECK

**Shipped, PUSHED and VERIFIED LIVE: auction admin 305 (TM-1, §117), and the CRNA suspension
(§118 — both CRNA addresses now 404, landing cards gone).** Rulings §116–§118. Per-build detail
is in `BUILD-LOG.md`. The deck (now 35 slides) is `tests/docs/VacationAuctionWalkthrough.pptx` —
one current copy, private repo, by his ruling that evening.

**THREE LATE-SESSION FACTS a fresh session needs, all owner-stated 26–27 Aug:**
· **The real auction runs TIMER MODE 2** (resets only when a bid affects others) — his words:
  *"With the real auction, we are going to use the mode currently set, resets only when affects
  others."* That is why TM-1 mattered and why 305's suite pins mode 2 hardest.
· **The live supply is reconfigured: THREE high-demand weeks** (Thanksgiving, Christmas,
  New Year's at 6 FTE with the 5-or-better floor); Ski Week and the 2 Spring Break weeks keep
  6 FTE but open in Phase 2 with no floor; Summer 5/30–9/5 at 5; every other week 4. Verified on
  the SERVED site 27 Aug; the deck's slides 6–10, 19 and 28–29 were rebuilt to match, with fresh
  screenshots (Week 47, his bid). Read the board, not this paragraph, for current numbers.
· **The Phase 4 extra FTE is a MANUAL step he owns** — see TODO.md, PHASE-4 EXTRA FTE.

**THE DEFECT, and why the owner found it and no battery did.** Mode 2 (affects-others only) was
gated on the staff page since 154/274 and never on the admin page — build 289 added the admin
reset AFTER the modes existed and wired only the classic guards. Every suite that touched it
stubbed `_adminBidTimerReset: () => {}`, and test-admin-timer-289 asserted only that the reset
FIRES. Nothing asserted that it must sometimes NOT fire. **A guard with only positive cases is
half a guard.** The 305 suite has both halves, and runs the real projection engine under them.

**Three small things that cost time, so they are written down:**
· **A `//` comment appended inside an argument list swallows the closing bracket.** The 289
  re-anchor was first written that way and produced a SyntaxError; the comment goes on its own
  line above the call.
· **A background process over the bridge dies when the `device_bash` call returns.** `nohup … &
  disown` survived only when the same call also slept. The auction battery runs in ~25 s, which
  fits the 45 s call limit — **run it in the foreground** and read the exit code directly.
· **`test-crna-stamp` regenerates `crna/` IN PLACE as its check.** After an admin build its first
  run goes red on the drift assertion and leaves the restamped files on disk; the second run is
  green. That red is the stamper doing its job, and the restamped `crna/admin/index.html` +
  `crna/versions.json` are part of the build to push — not a regression to chase.

**Deck notes for whoever touches it next:** python-pptx re-serialises every part on save (bytes
change, meaning does not — verified by C14N) and drops the `jpg` content-type Default; the
fix is one line in `[Content_Types].xml`. The cover art on slide 1 is a parody built from a
640-px source with a traced silhouette; `make_cover.py` in the session workspace rebuilds it,
but that script is NOT in any repo. The FTE numbers on slides 26–27 and 7 come from the table
he photographed on 26 Aug (6/5/4 FTE; 235 FTE-weeks in Phases 1–3; +1 FTE on 34 weeks in
Phase 4, shown in amber and excluded from the totals by his instruction).

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 28 Aug 2026 — STAGE 5 FINISHED IN ONE SESSION: SIX BUILDS (112–117), ALL FILED, NONE PUSHED

## 28 Aug 2026 — STAGE 5 FINISHED IN ONE SESSION: SIX BUILDS (112–117), ALL FILED, NONE PUSHED

**Rulings §119 (the schedule comes back; scope = Stage 5 only, cheap types first) and §120 (the
session runs on Claude's decisions, each recorded; §92 untouched).** Owner, mid-session: *"make
good decisions for what a complex physician staffing website needs to do. We can fix problems
later"* and *"Let's power through and finish the build that's left."* Per-build detail is in
`schedule/BUILD-LOG.md`; the decisions are listed under §120. The deck is done and many users
signed in successfully on 28 Aug (PART B).

**THE SHAPE OF THE SESSION, for whoever picks it up.** The whole build ran IN THE CLOUD: the two
public repos cloned, `tests` tarred from the Mac and staged, md5-verified against the device tree,
playwright installed in `tests/` and the chromium build symlinked into the expected path — so all
browser suites RAN. **Then the bridge to the Mac dropped mid-session and did not come back**, so
from build 113 on every file exists in the cloud workspace and in the delivered zip, and the Mac
holds only build 112 (applied and md5-verified before the drop). **The zip is the delivery; the
Mac is behind.** Unpack it per §3's zip route — `unzip -p`, never `unzip -o` — and md5-verify
every file against the manifest inside it before trusting the tree. The admin page is shipped as
a WHOLE FILE (the base on the Mac is the pushed 111 plus the verified 112 patch; the six patch
scripts are in the zip too, and each refuses to apply twice).

**THINGS THE GATES CAUGHT THIS SESSION, each one a rule already in START-HERE:**
· The runner's own unregistered-suite guard fired the moment a suite sat on disk unregistered.
· My own new suites pinned exact counts (`length===4`) and exact build numbers — §3 rule 16's
  decay, the same one I had just re-anchored in `build106`. All three re-anchored to invariants.
· Two honesty runs CRASHED on the baseline instead of failing legibly (§3 rule 11): a picker the
  old build never had, and an assertion MESSAGE that threw. Both guarded.
· Two batteries overlapped on one port (EADDRINUSE) because `pgrep` matched its own shell — §3
  rule 8's exact trap; the log's mtime, not the process table, said the first had died. Re-run
  cleanly before any number was recorded.
· A 400-char truncation in a suite's writes reader hid a correct write; the test was wrong.
· A design finding from a suite: quota A's top-up tipped quota B over and then reported B as a
  conflict — correct and unhelpful; the filler now prefers a shift that tips nothing.
· A frame defect from 106: the card header said "not checking anything" for ANY note. Fixed.

**BATTERIES (cloud, browser suites running):** schedule 63/2,192 on 112 · 65/2,280 on 114 ·
67/2,354 on 116 · 68 suites on 117 (number in the 117 row) — all zero failed, zero skipped.
Auction battery on unchanged auction bytes: 55 suites / 2,020 assertions / exit 0 after 112 and
again after 117 (no auction baseline supplied — §6's legitimate skip). Isolation guard green.

**THE AFTERNOON, under §120 ⑦ (he left for the day):** builds 118–124 and staff 38–39 — §121's
built-in switches, §122's collapse control, §123's Engine page (Simulator gone, Admin group moved
up), §5's draft/published months, §6's change feed, defect 3 closed, §90's in-grid marks. Every
build: suite, honesty check failing on the previous build, full battery. Nine older suites were
re-anchored by ruling (53, 60, 69, 70, 78, 98, 101, 105, 111, 117, the isolation guard's positive
control) — each one a premise the rulings changed, never a stub of the new behaviour. **Seven of
my own new suites had to be tightened the same day** (a 3,000-char grab window that over-reached
once `gridViolIndex` landed beside `mutateCell`; exact counts; unguarded baselines) — §3 rules
10, 11 and 16 apply to suites written that morning exactly as to old ones.
**By the evening the Mac holds everything — 112–126 and staff 38–40 — verified file by file
against the bundles' manifests** (the bridge dropped six times during the day; each bundle was
unpacked the moment it held). **He pushed that night; admin 126 / staff 40 were verified SERVED
(two cache-busters), the auction's 305/164/18 unchanged; `node status.mjs` exits 0 and START-HERE's
LIVE line names 126 / 40. Nothing in the cloud is ahead of the Mac.**

**WHAT A FRESH SESSION SHOULD KNOW IS LEFT (all in `TODO.md`):** uniform confirmations (40 raw
`confirm(`, cosmetic); the staff phone view beyond its existing small-screen rule; e-mail alerts
(shares the auction's EmailJS quota — his decision); the calendar feed's two decisions (§92 and a
deploy path); rules-level enforcement of the draft gate and the change feed (§92); holiday
multi-year equity from §90's list. The engine's month filler cannot see the last day of the
previous month for the post-call day (§121 ④ — his "no").

**NOT DONE, DELIBERATELY:** the `maintenance.lock` check after this session's fetch was done at
the start (three moved to `_to_delete/locks-2026-08-28/`); `tests/README.md` is still stale.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 28 Aug 2026 (NIGHT) — RA-6: THE AUDIT OF THE 118–126 WAVE, AND THREE TRAPS ON THE WAY

## 28 Aug 2026 (NIGHT) — RA-6: THE AUDIT OF THE 118–126 WAVE, AND THREE TRAPS ON THE WAY

**01:45 — 131–133 / 41–43 PUSHED AND VERIFIED LIVE (133/43, two cache-busters). SESSION CLOSED
by the owner ("will start fresh"), checklist run: fetch (three `maintenance.lock`s stranded again,
moved to `_to_delete/locks-2026-08-29/`), chat reviewed (§124, §125 on disk — grepped), state files
true, `status.mjs` exit 0, all four repos clean and in sync, no locks. Context at close ~313k tokens;
no compaction occurred. **Lesson worth keeping:** past ~290k the session stayed reliable by putting
every build in a sub-agent with a tight brief and verifying only exit codes and md5s in the main
context — five builds and an audit shipped that way with no detected slip. Auction live builds at
close: admin 305 / staff 164 / mobile 18, unchanged all session.**

**29 Aug, 00:40–01:30 — 127–130 PUSHED AND VERIFIED LIVE (130/40, two cache-busters); STAGE 2 BUILT.**
The cloud clone was reset to the pushed `3810e83` so 131's honesty baseline is an explicit SHA; 132 and
133 baseline on md5-named snapshots of 131 and 132 (no intermediate commits). Three builds by three
sub-agents in sequence, each verified from the exit code before the next started. Two findings turned
out to be *not* what the report said: V-3's run-together catalog header was an undefined CSS class, not
markup, and the staff grid's overflow was the column-flex `.content` sizing to max-content, not the
wrapper. The link dropped twice more; the Stage 2 zip waited in the chat outputs until it came back.

**LATER THE SAME NIGHT — §125: "you decide best order and start please."** Stage 0 and builds 127–130
shipped in the cloud clone, each by a sub-agent with a tight brief, each verified by Claude from the exit
code (rule 11) before filing; transferred by zip and md5-verified on the Mac (the link dropped four times
in the session; the zip in the chat outputs is the fallback delivery). One sub-agent decision was
REVERSED by Claude before filing: 127 first wrote a planned shift beside `off:true`; the admin's later
decision now beats the stale plan (skipped and reported). Two suites were re-anchored under rule 12
(build127 by 129; build123 by 130 — its 2-way had asserted a one-way gift as correct). Honesty
baselines: 126 = `c73fbde`; 127/128/129 = `/tmp/admin-12N.html` snapshots taken in the cloud between
builds (no intermediate commits exist, so those three baselines live only in the cloud session — the
suites carry their md5s in BUILD-LOG). Not pushed at the time of writing.

**Ruling §124.** After the §4 ritual (first schedule fetch returned a stale 111/37 from the CDN;
the second returned 126/40 — the exact trap §4 names), the owner accepted the recommendation to audit
before building and asked for a visual review with the standard *clean, organized, intuitive*. Method:
five subsystem auditors → five independent verifiers, each EXECUTING findings against the real page in
the suites' fake-Firebase rig → a headless screenshot pass with seeded data (62 shots) → a live-site
pass through his Chrome (39 shots, read-only). Report and evidence: `tests/docs/RA-6-2026-08-28.md`,
`tests/docs/RA-6-shots/` (headless harness `seed.mjs`/`shoot.mjs` is reusable). Queue: `TODO.md` §1.

**Three traps, all recorded so nobody pays twice.** (1) The first cloud schedule battery printed
"all 22 passed · 55 skipped" and EXITED 0 — `playwright` was resolvable from a global install for a
one-line `import()` check but not from the suites; `npm i playwright` in `tests/` fixed it and the
re-run was 77/77 with zero skips. The runner should fail hard on a missing browser dependency
(RA-6 N-19). (2) The Mac dropped off the bridge twice mid-session (Chrome extension and desktop
bridge together); the visual pass was done headless first and on the live site once he reconnected —
no time was spent retrying. (3) Context reached ~291k tokens after the five verifications returned;
every report was already written to disk by its agent, and the Chrome pass and the report assembly
were delegated to sub-agents so nothing was lost to a compaction.

**Paperwork gates:** `git fetch` over the bridge stranded `maintenance.lock` in all three public repos
again, moved to `_to_delete/locks-2026-08-28/`. `status.mjs` re-run. `tests` judged from `git log` and
disk (cannot be fetched over the bridge). Nothing in any repo was changed except the new docs.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 29 Aug 2026 (DAY) — §126: "GO WITH ALL ITEMS THAT YOU CAN" — SIX BUILDS, STAGE 3 AND HALF OF STAGE 4, ALL FILED, NONE PUSHED

## 29 Aug 2026 (DAY) — §126: "GO WITH ALL ITEMS THAT YOU CAN" — SIX BUILDS, STAGE 3 AND HALF OF STAGE 4, ALL FILED, NONE PUSHED

**The ruling, at session open:** *"Please go with all items that you can. i grant you authority to
press ahead with the needed fixes in your recommended order."* Filed as **§126** the same turn, read
the way §125 read §110 — no per-item go this session — and read with §92 and §125 intact: **B-2, B-7
and the rules are NOT in this wave**; their plans are in `TODO.md` §1 waiting for his specific go.

**What shipped, in RA-6's order** (rows in `schedule/BUILD-LOG.md`, the wave summary at
`tests/docs/RA-6-builds/build134-137-summary.md`): **staff 44** — Stage 3, N-9 first (the staff
month reader fails closed; a denied listener shows *Couldn't load*), then the blank-day states
(*Not published* / *Couldn't load* / *Nothing scheduled*, per day, on both panels, in the legend).
**Admin 134 / staff 45** — B-3/B-4: ONE `vacationDaysFrom` on both pages, the admin reads Phase-4
rounds at last, and a schedule-only admin gets a banner instead of a console line. **Admin 135** —
E-3 (rest check sees every overlap) and E-4/N-4 (the ceiling for THIS day, not day 0 of the month).
**Admin 136** — the change feed: D-15 (diff local to the call), D-4/N-10 (`clearCell` inside the
transaction), D-5 (the year run emits). **Admin 137** — D-11 (DRAFT on the printed sheet), E-15
(vacation map memoised by listener-object identity), E-6 (fairness fires at the moment of change;
the engine skips pool rules and says so). **Staff 46** — S-1 (the admin's eligibility checker,
byte-identical), S-8 (Quick View re-asks its months once a minute), N-14 (retractions audited).

**Every build:** its own browser-driven suite, an honesty run FAILING on an explicit baseline (all six
red, exit 1 — three of them reproduce the audit's exact wrong sentence), and the batteries: schedule
84/84 on the untouched tree, then the final tree (see the closing report), auction as a regression
gate on unchanged bytes. Six older suites re-anchored to invariants (build121, ra-fixes-36-76,
build134's own; then staff29, build80 and build120, which the final battery turned up) — rule 12,
never a stub.

**Traps this session:**
- **The battery reads the tree at each suite's start.** A patch applied to the clone while a run was
  in flight made `build121` red mid-run — not a defect, a moved string; but it is the reason the
  final battery ran on a frozen tree.
- **The fake's listener switches were overwritten at module load** (`window.__denyListenPath = null`
  after the init script had set it) — the N-9 sections passed vacuously on the first run. Caught by
  the honesty run, which is where absence lives; fixed with a guarded init.
- **Eleven `versions.json matches var BUILD` reds** on the 134/45 battery: the clone's
  `versions.json` had not been bumped with the page. Rule 4, and the gate doing its job.
- **The Mac's bridge dropped repeatedly** during the session (five reconnects), and was down at
  filing time — so the docs repo was cloned to the cloud and edited there; every file in this wave
  goes to the Mac as a patch script (count==1 anchors) or a zip, md5-verified, when the bridge is back.
**Then §127, at his review:** *"schedule can only populate vacations approved once admin has sent the
e-mail results"* — which overruled the build-134 decision within hours. Admin 138: the admin reads the
released view and no longer reads `vacations/approvals`; `build134-test` re-anchored by ruling, and
so were sixteen older suites that had seeded a vacation week through the live document (they now
seed an e-mailed completed phase — same week, same people, announced). Session
closed at his request ("complete this session and i'll start fresh").

- **S-8's first test was wrong, not the page:** pinning the clock to 23:59 on the 31st put April
  inside the seven-day window at FIRST render, so the baseline passed. The defect needs the window to
  reach April only AFTER load — the 25th. Rule 8: change the input and check the output changed.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 29 Aug 2026 (AFTERNOON) — §128–§130: B-2, B-7 AND THE STAGE 5 RULES, FILED; HIS TWO STEPS WAIT

## 29 Aug 2026 (AFTERNOON) — §128–§130: B-2, B-7 AND THE STAGE 5 RULES, FILED; HIS TWO STEPS WAIT

**The rulings, in order:** *"go as you think best and group what you can to keep working"* (§128 —
the go for B-2/B-7, not for the rules); *"We can do a firerules deploy as long as it's very low risk
to the auction site"* (§129 — the §92 decision, read as a design constraint: only the `dailysched`
block changes); *"i'll be gone for a while. keep going with what you can… rules okay if safe"* (§130).
The session opened on a stale snapshot: the pasted START-HERE said 134–138 were filed-not-pushed; disk
said he had pushed them at 13:36 PDT, and both served sites agreed (§3 rule 13 — disk beats the paste).

**What shipped** (rows in `schedule/BUILD-LOG.md`): **admin 139** — B-2 (Save-all refuses a stale grid,
writes only changed fields), N-20/N-21 (the count moves with the rows; a visible stale notice), B-7
(Remove clears this site's data only and points at the auction admin; a departed-users sweep; the
isolation guard's sanctioned set is FOUR). **Admin 140 / staff 47** — the page half of Stage 5: no
`dailysched` listener before Google sign-in on either page; the claim re-apply no longer creates a
decided document. **`firestore.rules` Stage 5** — filed in the auction repo, `vacations` block
byte-identical (prefix 34,304 bytes and suffix compared equal); `dailysched` reads need a verified
sign-in, writes are an allow-list (own request, own/party swap, one audit line), decisions admin-only.
**RA-2** — assertions extended (generational tallies; the Stage 5 gates all FAIL on `5994a1e`);
`RA-2.command` now takes its honesty fixture from `5994a1e`, the one-change baseline.

**Decisions Claude made for his review** (all in `TODO.md` §1): B-7 as a refusal-with-link rather
than a copy of the auction's ten-document cleanup; reads at `isVerifiedAccount` (the auction's own
bar), not per-person; staff can no longer act on pre-build-30 legacy request/swap items.

**Gates:** `build139-test` 34/34, honesty 22 red on 138; `staff47-test` 22/22, honesty 11 red on
46/139; isolation guard 36/36 and red three ways on 138; schedule battery **93 of 93 suites EXECUTED
in the cloud, 0 failed** on the frozen 140/47 tree (the first pass turned up one archive pin in
`staff30`, re-anchored); auction battery **55/55, 2,019 assertions, exit 0** (regression gate,
auction baseline absent by design; the rules-emulator suite skips loudly here — it is his RA-2).
Four older suites re-anchored: build64, build79 (its 2,600-char window had stopped reaching the
line), build89, staff30.

**Traps this session:**
- **Playwright is not on the Mac VM and ESM ignores `NODE_PATH`** — symlink the global module into
  `tests/node_modules` or every browser suite is a silent skip (the RA-6 trap, again).
- **`pkill -f chrome` from inside the tool shell killed the shell itself** (exit 144) and the battery
  with it. Detach long runs with `setsid nohup … & disown` and read the log's mtime, never the process table.
- **The bridge dropped for ~10 minutes right after he left** — a heredoc "did not respond within 190s"
  and did NOT land. Everything written before it was intact (md5-checked). The docs repo was cloned to
  the cloud and the edits kept as count==1 patch scripts (`~/kp/patches/`) until the bridge returned.
- **`device_bash` has an argument-size limit (E2BIG)** — a 60-line assertions block had to go over in
  two heredocs.

**Then, unattended (§130): staff 48** — S-3's client half: the staff page subscribes only to its own
requests (`where user == me`) and the swaps it is party to (three single-field slices merged), so no
colleague's note reaches another browser; no composite index, nothing to create in the console.
`staff48-test` 18/18, honesty 11 red on 47. The fake now throws on an unknown `where` operator instead
of returning true. `staff47-test`'s listener count was a pin — re-anchored.

**Last build of the session, at his instruction ("make this the last build here"): admin 141** —
RA-6 D-6: a draft month contributes no shifts to a calendar feed and carries one transparent
"Schedule not yet published" marker across its days; the feed document records the drafts; the
Feeds page names the real release blocker (the Stage 5 rules published, not "lock the token list").
`build141-test` 17/17, honesty 10 red on 140 (the baseline's feed carries the draft shift).
`build110-test` re-anchored. START-HERE's stale "five unbuilt rule types" paragraph corrected —
Stage 5 has been complete since 112–117. **Final batteries on the frozen 141/48 tree: schedule 95 of
95 suites EXECUTED in the cloud, 2,528 assertions, 0 failed, exit 0; auction 55/55, 2,020 assertions,
exit 0 (regression gate on unchanged auction bytes, auction baseline absent by design).** One more
trap: a detached `sh -c 'sleep …; node run-all.mjs'` inherited a `tests/sched` cwd and re-ran the
schedule battery under the auction log's name — check `/proc/<pid>/cwd` before trusting a log's
name, and `cd` inside the detached command.

**DONE on his return (30 Aug ~03:20 UTC):** pushed (one re-push after a GitHub Desktop glitch), 141/48 verified served twice, RA-2 136/136 with 46 of 46 Stage 5 gates red on the old rules, rules published. The auction served 305/164/18 throughout.

**For the record, the steps were:** `TODO.md` §1 — (1) push all four repos, verify schedule 141/48 served;
(2) double-click `tests/RA-2.command`, then paste `firestore-rules.txt` into the console. Until (2) the
old rules stay in force and both pages work under either file.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 30 Aug 2026 (EVENING) — §131/§132: THE REST OF RA-6 AND HALF THE §7b MENU, SIX BUILDS, ALL FILED, NONE PUSHED

## 30 Aug 2026 (EVENING) — §131/§132: THE REST OF RA-6 AND HALF THE §7b MENU, SIX BUILDS, ALL FILED, NONE PUSHED

**The rulings:** *"continue with the audit's findings… move ahead with all of those that you can fold
into this session. I authorize you to make decisions on my behalf as long as they are with the goal of
optimizing the schedule site"* (§131 — §0 rule 2 relaxed for the session, §92 untouched); asked whether
the §7b visual ideas were decided (they were not — §124 ② and §130 kept them as proposals), heard the
menu with a recommendation and four larger items flagged as his call, and said *"go as you think best,
thanks"* (§132). Both filed in `DECISIONS.md` in the turn they were said.

**Method:** every item was DISK-CHECKED against 141/48 before anything was built (an agent read the
code and cited the deciding line for each of ~45 findings — five were already closed, one partial).
The repos were cloned into the cloud and `tests/` staged as a tarball beside them; the battery ran
against a SNAPSHOT copy of the tree (`/tmp/snaprun.sh`) so building could continue while it ran — the
first run was contaminated by an edit landing mid-run (four `versions.json matches var BUILD` failures
that were not failures), which is why the snapshot exists.

**What shipped** (rows in `schedule/BUILD-LOG.md`): **admin 142** engine/rules tidy-ups (E-5, E-9,
E-10, E-12, E-13, E-14, N-15, N-16) · **143** requests, swaps and the change feed (R-6, R-9, R-10,
R-11, R-12, D-9, D-10, D-13 — the fake learned `serverTimestamp()`) · **144** B-8, B-9, N-20 and the
visual defects V-5, V-6, V-8, V-10, V-15, V-18 · **145** V-7, V-12, V-13, V-20 plus §7b "one collapse
control" (the two `<details>` folds are the site's bar, shut) and "one place for holidays" (a link
from Rules; the list stays where he built it) · **146** §7b the sidebar regrouped (*Run the month ·
Decide · Look at it · Set it up · Records*; a before/after picture sent to him) · **staff 49** twelve
staff items (D-12, D-13, D-14, S-5/B-13, B-14, S-11, S-13, S-14/B-10, R-7, R-8, R-13/S-15, V-7's
staff half). Every decision Claude made on his behalf is listed in `TODO.md` §1 for his review.

**Gates:** each build's suite green in a browser with an honesty run FAILING on its explicit
predecessor (142 on 141 `af1c5f6e…`: 10 red · 143 on 142: 15 · 144 on 143: 19 · 145 on 144: 21 ·
146 on 145: 7 · staff 49 on 48 `f136e70f…`: 28). Twelve older suites re-anchored to their invariants,
never stubbed. The final battery numbers are in the closing report below the traps.

**Traps this session:**
- **A battery run against the working tree is contaminated by the next edit.** Snapshot the tree and
  run against the copy; `versions.json`-vs-`var BUILD` assertions catch exactly this and look like
  four regressions.
- **Two suites on one port fight** — the snapshot battery and a hand run of the same suite. `PORT=`
  the hand run.
- **`pkill -P <old run>` while a new run is starting took a Chromium with it** — one suite reported
  "Target page closed" and was re-run alone. Never kill processes while a battery is warming up.
- **The 142 fixture was never saved before 143 was written over it** — rebuilt by re-applying the
  142 patch to 141 (deterministic, count==1 replacements), md5 recorded in the BUILD-LOG row. Save
  the fixture in the same breath as the bump.
- **The bridge to the Mac flapped all evening** (the remote-devices server connected and dropped
  five times). Everything was built in the cloud clones; the transfer to the Mac is the last step
  and is md5-verified per file.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 30 Aug 2026 (LATE) — §133/§134: THE HEADINGS, THE IN-PAGE DIALOG, THE PHONE DAY LIST

## 30 Aug 2026 (LATE) — §133/§134: THE HEADINGS, THE IN-PAGE DIALOG, THE PHONE DAY LIST

He pushed 142–146 / 49 (`ac725ac`; verified served twice), kept the sidebar grouping but wanted *"less
goofy titles"* (§133 — Schedule · Approvals · Reporting · Setup · Records, folded into 146 before the
push), then *"continue with what you can"* and, of the phone layout, *"the same code and just format
correctly for phones… like the vacation site"* (§134). **Admin 147:** Apply, Publish and Add-the-standard-
types ask through the page's own dialog (`schedConfirm` → a promise); Publish lists the standing
violations, Apply the over-ceiling days, Add the types; Escape/backdrop write nothing. Six suites that
auto-accepted the native confirm now press the page's OK (build120/121/122/127/128/129), and 129's
"asks nothing" also checks the page dialog did not open. **Staff 50:** the Full Schedule under 600 px is
one day per row, built in the same loop from the same cells, chosen by a style rule — a phone
screenshot went to him, and his answer became §135 (*"no text where you need to swipe"*): every panel was
measured at 390 px; the tab strip was the last sideways scroller and now wraps. Both filed, not pushed;
he went to sleep on *"finish this build and then prepare to hand off all other tasks for a new session"* —
the hand-off list is at the top of `TODO.md` §1. **Traps:** a `page.evaluate` that AWAITS a handler which
now awaits a dialog hangs for ever — fire the handler without awaiting, read the dialog, press OK; the
honesty run must `press()` a button that may not exist rather than `click()` it (a 30 s timeout crash
looks nothing like a red assertion); and **two copies of the docs repo diverged** — edits made on the Mac
after a push while the cloud copy carried later edits — resolved by staging the Mac's copies down and
re-applying. One copy is the truth at a time; say which.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 30 Aug 2026 (AFTERNOON, next session) — §136/§137: THE CALENDAR FEED GOES LIVE; ADMIN 148

## 30 Aug 2026 (AFTERNOON, next session) — §136/§137: THE CALENDAR FEED GOES LIVE; ADMIN 148

**He opened with the pasted START-HERE one push behind** (147 / 50 were already served — §3 rule 13 again); the
ritual found it, the paperwork was brought current, three `maintenance.lock`s from the fetch went to `_to_delete/`.
His goal for the day: *"finish all outstanding work with the schedule site."* Told plainly what was his (index, request
types, a functions deploy) and what was mine.

**The feed, end to end, in one afternoon.** §136: the two-line rules diff (feedTokens admin-read, feeds/items readable
by nobody) shown, his "go", filed with four RA-2 gates on a `28bae0c` fixture. **He pasted the rules BEFORE running
RA-2** ("forgot ra2") — same bytes, so the verdict still covered them: 146/146, honesty 4 of 4 red. Then the deploy: his
first try hit `EACCES` on a global npm install (fixed: the `npx` route, no sudo), ran the deploy line from `~` (no
`firebase.json` — it did not exist; added), then landed on Node 20 which Google retires 30 Oct 2026 — runtime moved to
22 the same turn and redeployed. Both the `cloudfunctions.net` and the `run.app` address answer; `FEED_URL_BASE` stays.
The three-row check: his own link returned a 522-byte calendar (after *Rebuild every feed* — Create alone mints no
calendar, which is what led to 148), a valid-shape token with nothing behind it and `/abc` both gave the same 404.
`functions/node_modules/` was NOT ignored (239 packages nearly offered to GitHub Desktop) — ignored now.

**§137, from his questions, verbatim:** *"why create each docs 1 at a time?"* → one button; *"I will need a way to send
all feeds to each user's phone, probably using gmail"* → both the e-mail AND the staff-site link, both queued; *"it needs
an obvious name… i'm worried now i'll confuse this testing schedule with my real work schedule on my phone"* → the
calendar is `KP Anesthesia — <Name>`, `TEST · ` in front while the gate is shut. Admin 148 carries the first and third and
makes the gate a stored switch so the e-mail build can read it.

**Traps this session.** The device bridge FLAPPED for ~40 minutes; every patch asserts `count(old)==1` so nothing landed
half-way, and the whole battery ran in the cloud (104/104 executed — on the Mac 82 would skip). The runner's 5-minute
kill and the `page.evaluate` that awaits a function waiting on a dialog: fire it, do not await it. `build148` caught a
real bug before filing (a `+` bound to one ternary branch). `status.mjs` wants the literal phrase "FILED, NOT YET PUSHED".

**THE SAME SESSION CONTINUED THROUGH THREE MORE BUILDS (afternoon–evening), all his gos:** 148 (§137/§138 — the
one-button link creation, the calendar named "KP Anesthesia Schedule" with TEST · while §54's gate is shut, the gate
as a stored switch, the live status card; §138 also records the CORRECTION that Apple Calendar reads a feed's name
only at subscribe time — 148's first dialog claimed renames reach phones on refresh, and does not any more), then
149 (§140, after he compared QGenda: feeds refresh themselves off emitChanges, vacation deliveries diffed, ONE
horizon load per rebuild instead of ~155 reads per person, the Auto-sync timestamp on every event), then 150
(§137 A/§139: the link e-mail — webcal + copy-paste, honest Android instructions, bulk behind the gate, failures
never recorded as sent, the schedule's OWN mailStats, the mailer loaded lazily so no suite sees a dead script tag;
the fake learned increment()). He pushed 148 and 149 mid-session, each verified served twice; **150 is the filed,
unpushed build.** He subscribed his own iPhone and it worked (Settings → Add Subscribed Calendar).

**Session-operation notes.** He set the context budget himself: *"we can easily go past 600k tokens… stop by 700k"*
— readings were reported on request (§106), never made into thresholds. The device bridge flapped for ~40 minutes
mid-session; count(old)==1 patches meant nothing landed half-way, and the batteries ran in the cloud throughout
(the only place the 80+ browser suites execute). A Stop hook demanded Claude commit and push; refused — §3 rule 4,
he does every push. **His open question, recorded in TODO §1:** an easier push flow ("it's quite cumbersome") —
the PUSH-ALL.command proposal awaits his ruling.

**Left for him:** push `schedule`, `tests`, this repo (150); send himself one link e-mail and READ THE SUBJECT
(the EmailJS template controls it, not our code — TODO §1); then next session: §137 B (the staff-site link, a §92
rules diff first), the PUSH-ALL ruling, the setup-checklist page, D-7's index, S-7, his call on the plan-diff and B-15.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 31 Aug 2026 (EVENING, fresh session) — §146 CLOSED THE BOARD QUEUE; §147 DESIGNED THE DRAW/UNDER-REVIEW MERGE. NO CODE WAS EDITED.

## 31 Aug 2026 (EVENING, fresh session) — §146 CLOSED THE BOARD QUEUE; §147 DESIGNED THE DRAW/UNDER-REVIEW MERGE. NO CODE WAS EDITED.

**What this session produced: two rulings and a build that is fully specified but NOT started.** The auction
pages are untouched — 305 / 164 on disk and live, verified cache-busted at the open.

**§146.** He cleared the whole 🔴 board block from `TODO.md` §1 — the abandoned rehearsal, the unverified
Phase-1 state, the Rehearsal-Mode question, the e-mail-switch finding. He asked for them "marked complete";
Claude pushed back (they were never done, and "complete" beside *"Rehearsal Mode must be OFF before launch"*
would be read by a later session as done) and he accepted **CLOSED**. He pushed it himself (`7d6a70a`).

**§147 — the merge.** His problem: a draw can occur on a week with no real room, and *"users in a draw may
have more hope than users who are under review."* Confirmed in code. The full design, every ruling and the
site-by-site inventory are in `TODO.md` §1 — **do not re-derive them.**

**Three things this session got WRONG and corrected, recorded so they are not repeated:**
1. **"E-mails never name the outcome" was false.** The results and round-results blasts don't, but the
   per-bid alert prints *"changed from DRAW to REVIEW"*. Found only by reading the sender.
2. **The scope estimate was roughly half the truth** — "8 and 16 sites" from a keyword survey became ~19 and
   ~32 once the trace ran outward from the functions that PRODUCE an outcome. The growth was almost entirely
   reports and, unmentioned until then, **the Excel exports**, which style cells by outcome colour and print
   outcome text in eight places. He had asked *"have you thoroughly thought through all aspects of this?"* —
   the honest answer at that moment was no, and saying so is what surfaced the rest.
3. **The timer and the alert e-mail share ONE comparison function by design.** So the alert fix could never
   be isolated: whatever the mailer treats as a change, the clock treats as a change. Missing this would have
   shipped a silent change to live auction timing. It is now §147's one ruled behavioural change, in his own
   framing: *"Change in projected outcome still drives the timer and the e-mails."*

**Method note worth keeping:** grep finds a WORD; it does not find a concept expressed without that word (an
inline hex colour, a set-size check). For anything that must be uniform, enumerate the CONSUMERS of the
functions that produce the value. That is what turned a plausible-looking inventory into a complete one.

**State at close:** all four repos clean and in sync after a fetch; the three `maintenance.lock` files that
fetch strands were moved to `_to_delete/`. Restore pair for the coming build is in
`_archive/vacation/restore-build-305/`, md5-verified. Context at close ≈ 287k — he asked, was given the
number, and chose to hand off rather than build through a compaction.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 1 Sep 2026 — §147 BUILT: ADMIN 306 / STAFF 165. FILED, NOT PUSHED.

## 1 Sep 2026 — §147 BUILT: ADMIN 306 / STAFF 165. FILED, NOT PUSHED.

**He gave the go with one condition, verbatim: *"be thorough so there are no stray instances of draw being
used somewhere you forgot to look. check all reports, all functions to ensure consistency."*** That shaped the
whole session, and it was the right instruction — the exploration found more than the plan had.

**THE INVENTORY IN `TODO.md` §1 WAS INCOMPLETE BY 14 ADMIN SITES.** All user-facing, all real: the sidebar nav
entry, the panel's blue phase banner, the "Need at least 2 users in draw" toast, the FTE-Overage settings help,
the Weekly Summary table's own legend AND its two columns, the Next-Decision button tooltip, the delete-user
checklist, the Struggling Users chip and section heading, the Complete-Phase note, "Draw, Review, and Lose bids
are not affected", the revoke dialog's "(draw, review, win, or lose)", the auto-approve log lines, and the
"(N in draw)" count on the spin button. **Plus two the inventory could not have known about:** the FTE
Availability page's own description, and `exportDashboard` — a whole Excel/CSV/PDF export with separate `Draws`
and `Under Review` columns. **The lesson is not "the plan was sloppy" — it is that a plan built by reading is a
hypothesis, and the first job of the build is to test it against the file.**

**AND THE OPPOSITE SURPRISE, which is the reason the approach worked:** the inventory listed eight Excel-export
sites to edit (`resultStyle`/`projStyle`/`resTxt` ×4 each). **None of them needed a single edit.** Every export
path — xlsx, CSV and PDF, on both reports — already funnels through `bwOutcomeLabel`, `bwOutcomeColor` and
`PROJ_LABEL`. Fixing those three fixed all eight. That is what routing every DISPLAY through one helper buys:
the sites you did not find are fixed anyway.

**THE ONE TRAP INSIDE THAT.** `PROJ_LABEL` looked like it should lose its `draw` key. It must NOT: `projTxt` is
`p=>p?(PROJ_LABEL[p]||p.toUpperCase()):'—'`, so a missing key falls back to `p.toUpperCase()` and puts **DRAW**
straight back into every export. Both keys are kept, both mapped to the merged word. Same shape as the
Approvals/Denials Outcome dropdown: dropping the DRAW `<option>` without also merging the FILTER comparison
(`uiOutcome(e.outcome)===uiOutcome(outcomeFilter)`) would have made "UNDER REVIEW" hide every tied user.

**HE ANSWERED THREE QUESTIONS MID-BUILD (§148)** — admin keeps the word "tie"; the approve/deny dialog note
stays tie-only. The third, about the dashboard's Weekly Summary table, **dissolved into a finding:** he could
not find the table because it is never displayed. `#dashUsersWrap` and `#dashWeeklyWrap` are hard-coded
`display:none`, nothing switches them on, `#dashPhaseFilter` is not in the page, and `window.exportDashboard`
has no caller. Merged anyway (six lines, no visible effect) so the stray-"Draw" gate can assert over the whole
file. **Claude also changed its own recommendation mid-conversation and said so** (§3 rule 14): two columns
wearing the same words is the old table with new labels, not a merge.

**GATES.** New suite `tests/test-306-165-under-review.mjs` 88/88, carrying the stray-"Draw" gate (every
surviving `draw` classified against an allowlist of internal identifiers, over comment-stripped source with a
stripper self-check) and the amber gate. **Honesty: 64 of 88 RED on the pushed 305/164, exit 1**, fixtures from
the explicit SHAs `420df42` and `04e00bf`, never `HEAD~n`. Auction battery 56 suites / 2,107 assertions.
**Schedule battery 108 of 108 EXECUTED** — the first run in a while where every browser suite actually ran.
Isolation 36/36. Seven older suites re-anchored, never stubbed.

**THE VERIFICATION THAT SETTLED IT, and it is worth repeating on any behavioural change:** the sandboxed
every-button sweep was run TWICE — once on this build, once on the pushed 305/164 — and the two runs are
identical in every number except one. The same 260-click admin walk sent **7 alert e-mails on 305 and 6 on
306**. Option A, observed rather than argued. The baseline run also reproduced the lone `unlocated=1` on
staff/confirm, which is how that was shown to be pre-existing instead of guessed at.

**⚠ A TRAP THAT COST TEN RED HONESTY CHECKS — the auction twin of §6's schedule-baseline note.** Five auction
suites default their honesty baseline to `/mnt/user-data/uploads/GitHub/vacation-kp.github.io/admin/index.html`
— **exactly where `device_stage_files` drops the CURRENT build.** Staging the working tree to run the battery
in the cloud therefore made those blocks compare 306 against itself and go red, which looks precisely like a
regression. Move the staged copy aside, or set `PREFIX_SRC`, and they skip correctly.

**Two other things worth keeping.** Staging was refused mid-session with `session_stale_relogin`; per §6's cost
gate the owner was told the 30-second fix INSTEAD of starting the chunked-transfer grind, and he re-signed in.
And **command-line `git` and `npm` both work in the device VM** — but Playwright's browser download does not
(blocked host), which is why the schedule browser suites can only run in the cloud.

**LEFT FOR HIM:** push three repos (order does not matter — no rules change, nothing schedule-side, no console
step). The undo is `_archive/vacation/restore-build-305/`, still md5-identical to the pre-build files.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 1 Sep 2026 (LATER, same session) — §149/§150: THE RECORD OF BIDDING. ADMIN 307 THEN 308, BOTH LIVE AS 308.

## 1 Sep 2026 (LATER, same session) — §149/§150: THE RECORD OF BIDDING. ADMIN 307 THEN 308, BOTH LIVE AS 308.

**He went looking at the live site right after the merge shipped and found two defects in an hour — both in the
surfaces that ARE the record of bidding.** Neither was caused by the merge; both had been there a long time.

**HOW HE FOUND THEM IS THE LESSON.** He compared two screens that should have agreed — a user's staff-side
**My Phase History** against that same user's **admin User Summary report** — and they didn't. Two denied bids
were in one and not the other, and the report's header said "7 bids" when he had placed nine. **A cross-check
between two surfaces that read the same underlying truth is worth more than any amount of reading one of them.**

**§149 (307) — the reports dropped retired bids, and every historical projection read LOSE.** §71's boundary
scrub deletes a finished phase's non-winners from the LIVE schedule; `bidsByWeekModel` read that live doc for
scope `all`, so those bids were invisible and the row count lied. §71's own comment had promised *"the Reports
… read the archives"* — Edit Selections got that in 295, the reports never did. Separately, the snapshot branch
emitted `winning`/`losing` while `projPill` keys on `win`/`lose`, and every miss fell into `m.lose`, so
**"proj: WIN" was unreachable for any historical row on 305 and 306.**

**§150 (308) — and then the same defect on the screen beside it.** Claude declared §149 done without checking
whether anything ELSE read the scrubbed source. `renderAppDenials` did. He found it within minutes:
*"This is still useless."* Same fix, one function over, plus a second defect on that screen — the
`approved`/`denied` flags gating the ✓/✕ chip still asked the LIVE decision docs, so historical rows showed a
projection and no result at all.

**THE PROCESS FAILURE, WRITTEN DOWN SO IT IS NOT REPEATED: fix the CLASS, not the instance.** After §150,
a sweep of all 19 readers of `scheduleData` took one command and proved `renderAppDenials` was the last live
user-facing one. **That sweep should have run before §149 was called finished, not after §150 was forced.**
The sweep is `grep -n "for(const u in scheduleData)\|Object.keys(scheduleData)"` plus an awk to name the
enclosing function — the other 17 are engine, gates and counters that correctly read live.

**THREE MORE THINGS CLAUDE GOT WRONG, all corrected in-session and all worth inheriting.**
· The projection pill was first raised as *"cosmetic, on a history view"* under §147's audit cap. One
  screenshot showed it was every winning row on the main look-back surface. **A defect described from code is
  a hypothesis about what a human sees.**
· An A/B choice was offered him in which B defeated the feature's purpose; his reply was then misread as
  rejecting B when it was aimed at the bug. He chose B.
· `node status.mjs > /tmp/st.txt` was refused (the path was not writable) and `tail` then printed a STALE file
  from earlier in the session, which read as the entire build having been reverted. **Read an exit code and an
  output directly — §3 rule 11 covers pipes; this was the redirect version of the same trap.**

**WHAT "B" TURNED OUT TO BE: nothing.** He asked for the page to default to the current phase.
`populatePhaseFilter` already did, on a fresh load — it only remembered his last pick within a session.
Checked before building (§3 rule 14) and reported as a non-change.

**GATES.** `test-307-record-of-bidding.mjs` 29/29 (honesty 18 of 29 red on 306) · `test-308-lookback-screen.mjs`
15/15 (honesty 10 of 15 red on 306) · auction battery 58 suites / 2,152 assertions · isolation 36/36 · the
every-button sweep run on 308 vs 307 and 307 vs 306, identical every time.
**307 was superseded before it was ever committed, so it has no fixture and never will (§4) — both suites
baseline on the last PUSHED build, 306 (`df9b460`), and say so in their own headers.**

**⚠ THE LIMIT ON THE SWEEP, stated in both builds and still true:** `tests/sweep/site/fake/seed.js` has
`completedPhases: {}`, so no archive path fires inside it. The sweep proves NO REGRESSION and proves NOTHING
about either fix. **Adding a completed phase with a denied bid to that seed is the highest-value unbuilt thing
in this area** — it would give every future look-back change a browser-level gate instead of a unit-level one.

**LIVE AND VERIFIED: admin 308, pushed by him (`408112d`), served twice cache-busted ~06:20 UTC. Staff 165.**

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 2 Sep 2026 — TWO WEEKS OUT. THE HUB, THE RUNBOOK, HIS REHEARSAL, AND THE "SAME BID" RULE (§171–§175). 323 AND 324/168 LIVE.

## 2 Sep 2026 — TWO WEEKS OUT. THE HUB, THE RUNBOOK, HIS REHEARSAL, AND THE "SAME BID" RULE (§171–§175). 323 AND 324/168 LIVE.

**What the day was.** He opened with *"only concerned about the vacation site… 2 weeks out from go-live"* and asked for
recommendations. The first was to build nothing; the four operational items and his answers are §171. The hub's schedule
cards came down (`0aa4c92`), a go-live runbook and a 34-step rehearsal script went into `tests/docs` (plus a Word copy), his
local backups now file themselves (Automator folder action on Downloads). Then he rehearsed, found two things, and both
shipped the same evening: admin 323 (§172, the Current Phase card heading) and admin 324 / staff 168 (§173/§174). His
close: *"all worked as expected."* Nothing is open on the auction.

**THE LESSON OF THE DAY — CLAUDE DEFENDED A GUARD IT HAD NOT TRACED (§3 r14 again, the other way round).** The staff
"same bid, same answer" dialog was explained from its own comment as "by design, guards a real failure, leave it." He
disagreed and put one sentence — lower demand or more capacity in a later round — that the comment could not answer.
Reading the two engines showed the dialog was a symptom of the value-match rule, the rule violated his rounds-as-phases
principle, and it had an admin-reachable twin (Add bid at the denied value). **A guard's comment says what it prevents,
never whether it is the only way to prevent it.** Before defending any gate: find the rule it papers over and ask whether
the rule is right. Conceded and dated in §173.

**Fixtures that model impossible states pass for the wrong reason.** Three suites (317, 318, p4-rounds) had "round 1
denied X, round 2 open, X's denied bid still live" — a state Start Round makes impossible (it deletes the denied bids in
the same atomic batch that advances `p4Round`). The old value-match rule happened to freeze that bid, so the assertions
were green on a state that cannot occur. Re-anchored to the reachable state (the Complete→Start gap). **When a suite
turns red after a rule change, check the fixture's reachability before the assertion's wording.**

**The trace that answered "is this a bigger problem?"** — three read-only agents in parallel (lifecycle · consumers ·
record), every claim line-numbered, the load-bearing ones re-read by the session, filed as
`tests/docs/TRACE-same-bid-2026-09-02.md`. Two hours; it found the admin-side hole nobody had hit. Worth the cost every
time the owner asks that question.

**The sweep in the cloud, two more recipe notes.** (1) ESM ignores `NODE_PATH`: symlink the global `node_modules` into
`tests/sweep/` (`ln -sfn $(npm root -g) node_modules`). (2) The four passes take ~4 minutes and the Bash tool killed the
run at exit 137 before it finished — run it detached (`setsid nohup … &`) and poll the log by mtime. On this
machine Playwright 1.56 wanted chromium-1194, which is what `/opt/pw-browsers` holds, so no symlink tree was needed.
Baseline run on 323/167 for comparison: 603 · 137 · 126 · 0, identical to 324/168 (staff/confirm `unlocated=1` on both —
pre-existing, not this build).

**Three small process slips, owned.** The `tests` divider carried guidance and became a commit subject (`7560869`; rule
added to START-HERE). The Automator directions were given from memory and were wrong twice until a screenshot arrived —
verify a UI walkthrough before giving it, or ask for the screenshot first. And the first "leave it" on the dialog, above.

**Baselines for the next session:** auction admin 324 / staff 168 (`34fc686`), schedule 151/51 unchanged, hub `1678ad6`
plus this session's closing docs commit. Honesty fixtures for anything after 324/168: `git show 34fc686:<file>`.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 3 Sep 2026 — THE SUMMER-FLOOR FUZZ (§176), THREE SETTINGS QUESTIONS (§177). NOTHING BUILT, NOTHING OPEN.

## 3 Sep 2026 — THE SUMMER-FLOOR FUZZ (§176), THREE SETTINGS QUESTIONS (§177). NOTHING BUILT, NOTHING OPEN.

**What the session did.** The §4 ritual (324/168 and 151/51 verified served twice; all four repos clean). Then his
question: does the 6-bid cap through Phase 2 let people win summer / spring break / ski week cheaper than history?
A strategic-bidder fuzz on the REAL engine (computeApprovals extracted from 324, md5-verified) with the REAL roster
and FTE (from his 1 Sep backup — only the non-sensitive subset kept, `tests/fuzz/live-config-2026-09-01.json`):
Phase 1 (2 bids each) then Phase 2, bidders who open weak and improve only when the board shows them losing,
Under Review settled at the wheel within 0.6. 21,600 auctions in v1, 9,720 in v2. Report
`tests/docs/FUZZ-summer-floor-2026-09-03.md`; harness `tests/fuzz/summer-floor-fuzz.mjs` (SELFCHECK, SENS, CELL
trace modes). He parked the whole topic (§176) and then declined every form of mid-phase settings editing (§177).
Both pushed by him (`32c4684` and the follow-on docs commit here; `288858e` in tests).

**Lessons, dated 3 Sep.**
1. **§0 rule 4 was skipped and it cost a full re-run.** *"have only the following weeks open in p2"* was read
   literally — Phase 2 with 17 weeks open — when the auction opens EVERY week in Phase 2 (the staff rules say so
   in one line). His *"Yikes"* caught it. The ambiguity was visible at the time (his next paragraph spoke of
   interest "throughout the entire year"); the fix was one question. Ask, do not guess — even when he is away.
   v1's numbers (30 cheap summer wins, summer always full) are WITHDRAWN; v2 (17, a third of summer open) stands.
2. **`pkill -f '<pattern>'` killed the shell that ran it** — the pattern matched the Bash tool's own command
   line, exactly the trap START-HERE §3 rule 8 records for `pgrep`. Use `kill $(pgrep -x node)` (process NAME)
   for a background node run, never `-f` with a string that appears in your own command.
3. **The desktop app writes a `Claude outputs/` folder INSIDE the first connected folder** — here the hub repo —
   holding a copy of every file sent to the outputs column. It shows in GitHub Desktop as untracked. Moved to
   `_to_delete/`; check for it at every close (`git status` shows it as `?? "Claude outputs/"`).
4. **Real Firestore data reaches the cloud only as his backup JSON attached to the chat.** Extract the subset the
   task needs into a file with no e-mails or names before it goes near a repo; never print the backup's keys
   blind (`emailToUser`'s keys ARE the e-mails — printed once by accident, not filed anywhere).
5. **A fuzz result is only as good as its demand assumptions, and he saw that before the report said it**
   (*"106 FTE weeks for 35 people"*). Lead with the supply/demand ratio next time; the grid is the appendix.

**Standing at close.** 324/168 live, §92 closed, §164 governs. Parked, not to be re-raised: the summer floor and
demand calibration (§176); mid-phase editing of any frozen setting, the cap included (§177); the per-user
numbers table was discussed and not asked for. `_to_delete/` holds ~15 MB (this session's zips, the tests
tarball from 2 Sep, lock files) — his to empty. Context at close ~420,000, no compaction.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 4 Sep 2026 — "USER BIDS" (§178): ADMIN 325 FILED, NOT PUSHED. THE MAC SLEPT THREE TIMES.

## 4 Sep 2026 — "USER BIDS" (§178): ADMIN 325 FILED, NOT PUSHED. THE MAC SLEPT THREE TIMES.

**What the session did.** The §4 ritual (324/168 and 151/51 served twice; four repos clean; the fetch stranded three
`maintenance.lock`s, moved). His ask: a read-only admin page of each user's bid numbers used and remaining, People section
below Bid Lowerings. Explored first: the staff site's `bidPoolInfo` is the rule and every input is already on the admin
page. Plan presented (§0 rule 2); his rulings arrived in four short messages — the name "User Bids", remaining + used,
then the won / live split, then the NP count, then "Go". Built as admin 325: one sidebar line, one panel, `adminBidPoolInfo`
(a port of the staff function) + `renderUserBids`, one line each in `nav()` and `refreshAll()`, four CSS rules, BUILD and
`versions.json`. Suite `tests/test-325-user-bids.mjs` (48 / 48; honesty on `34fc686` 42 RED exit 1); `test-324-168`
re-anchored (its exact BUILD pin → at-least; still red on `b1ff467`). Battery 75 / 2,642 / exit 0 on the Mac, audit 190 / 0,
isolation 36 / 36, both sweeps clean in cloud Chromium (14 admin panels now), the panel opened and read in that browser
on both seeds. Full record: the 325 row in `vacation-kp.github.io/BUILD-LOG.md`. **He has not pushed.** Three repos carry
the build: `vacation-kp.github.io` (admin page, versions.json, BUILD-LOG, COMMIT-MESSAGE), `tests` (the new suite, the
re-anchored 324 suite, COMMIT-MESSAGE), this repo (DECISIONS §178, TODO, START-HERE with its FILED marker, this entry).

**Lessons, dated 4 Sep.**
1. **The Mac sleeps the moment he walks away, every time — three drops in one build.** The first came seconds after
   his "Go". What worked: keep building in the cloud and hand the result across as an anchored patch (every anchor
   `count==1`, refuses to apply twice), dry-run on a stand-in page carrying the REAL anchor lines. The dry run caught a
   real bug before it touched his disk — the suite extractor reaches `function`s only, so a `const` the new code used was
   invisible to it. Three scheduled check-backs at 30 / 30 / 60 minutes found the Mac still asleep; after that, stop
   polling and wait for him.
2. **The vacation repo's remote is `https://github.com/anesthesia-kp/vacation.git` (the local folder name is not the repo
   name) — corrected 5 Sep 2026: it clones from the cloud in seconds, full history, and matched the device tree md5-for-md5.**
   The 4 Sep note that it "cannot be cloned without its URL" was true only because the URL was not written down; `git ls-remote`
   against guessed names is still refused by the sandbox, so use this one. The hub and schedule clone under `anesthesia-kp/`
   by their folder names.
3. **A background job started in `device_bash` dies when that call returns** — `setsid nohup` included. The battery
   stalled at suite 30 with nothing running. The shape that works: a resumable chunk runner (`$HOME/chunk.sh`: done-list,
   ~145-second budget per call, results appended), called until it prints ALL-DONE. 75 suites fit in one call.
4. **ESM `import` ignores `NODE_PATH`.** `import { chromium } from 'playwright'` fails in the cloud even with the global
   package installed; symlink the global `playwright` and `playwright-core` into `tests/node_modules/` and the sweep
   runs (it did, 3 m 34 s per full four-pass run).
5. **The device VM's clock was ~14 hours slow at session start** (00:11 UTC while the cloud said 14:04); the STATUS
   block and the first drafts of §178 / the TODO entry carried the wrong day and were corrected. When a timestamp
   matters, read `date -u` in BOTH shells and believe the one git agrees with.
6. **Rule 11 bit again in a one-off command** — `node … --pre | tail -8; echo $?` reported tail's 0 for an honesty run
   that exited 1. Caught in the dry run, re-run without the pipe; every exit code quoted above was read directly.

**Later the same afternoon — §179, admin 326 FILED, NOT PUSHED.** He looked at the served 325 and found three things in one message: red and "brown" too close (the palette's `--yellow` is `#7a4e00`), the legend's "n" chips, and a Left column he did not need. Paint only, one file; `test-326-user-bids-paint` 17 / 17, 11 RED on `346522a`; `test-325` re-anchored to five columns; battery 76 / 2,658 / exit 0; audit 190 / 0; isolation 36 / 36; sweep clean. Lesson: **look at the served page with his eyes before calling a build done** — the chip colours were "correct" by token name and wrong on screen; a screenshot was taken and not judged for contrast.

**Evening — §180, admin 327 / staff 169 + rules FILED, NOT PUSHED.** He asked what it would take to "take a bid away from a user".
Explored on the code: removing a live bid exists (Remove Bid); taking a NUMBER away did not. His "Week 0" shape was rejected (rules
cannot see week keys, so a user could delete it; every bid-key iterator would show it). The corrected finding — prior-win numbers are a
client guard fed by one helper per site, no engine involvement — made a `bidHolds` document a one-build item, and he wanted it now: no
notice for the user, permanent until released, the NP count and the yellow/legend/Left-column changes from 326 kept. Built across both
pages + rules; the record is the 327 row in `vacation-kp.github.io/BUILD-LOG.md`. Three things the gates caught before he could: the
audit flagged user text interpolated into an onclick (fixed with `data-u`/`data-n`); `normalizeEntry` dropped the hold reason on its way
to the Change Log (found only by walking the flow in a real browser); and a `typeof` sandbox guard was needed on both helpers or four
older suites went red. One thing that was mine, not the build's: a `cp` with two same-named sources put the ADMIN page at the staff path
of the sandbox, and the staff sweep aborted — diagnosed by md5, not by reading tea leaves. **RA-2 is his to run before anything is
published; the rules must land in the console BEFORE the pages are pushed (§2). Under the OLD rules `bidHolds` is an unknown
document, which the default rule lets any REGISTERED user write — so a page pushed ahead of the rules would open a window in which a
bidder could release their own hold. Reads are fine either way (the old default read is open); the order is about the write hole.**

**Standing at close.** Admin 327 / staff 169 + rules LIVE (`1c73971`, served twice, 5 Sep; suites `9987ecd`, docs `3f06cfc`); he ran RA-2 and published the rules before pushing, as ruled. His live check passed (*"seems to work"*). **Handed off with one job queued: RA-10 (§182), a fresh-session audit of the live build — brief in `tests/docs/RA-10-BRIEF-2026-09-05.md`.** This session closed at ~670k context, no compaction. `Claude outputs/` gitignored here (its tracked copy deleted in this commit). RA-9 (§181) ran on his choice before the push: no HIGH, four MEDIUM edge fixes and four LOW ones landed in the same build; the fixture now seeds a hold so every future staff sweep exercises it. The Mac slept six times in the session. The BUILD-LOG rows keep "pending" in their commit column, as the 324 row does. §92 closed, §164 governs; §176
and §177 parked. The desktop app's `Claude outputs/` folder appeared in this repo again and was moved to `_to_delete/`;
`_to_delete/xfer/` holds the build-325 zip and its unpacked copies, and three stranded lock files — his to empty. Noted,
not acted on: staff/confirm `unlocated=1` in the default-seed sweep (staff bytes unchanged in this build; not checked
whether it predates 325).

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 5 Sep 2026 (OVERNIGHT, unattended) — RA-10: THE ADVERSARIAL AUDIT OF THE LIVE HOLDS BUILD. NOTHING DAMAGED. NOTHING BUILT.

## 5 Sep 2026 (OVERNIGHT, unattended) — RA-10: THE ADVERSARIAL AUDIT OF THE LIVE HOLDS BUILD. NOTHING DAMAGED. NOTHING BUILT.

**What the session did.** The §4 ritual (327/169/18 and 151/51 served twice; four repos clean and in sync; the fetch stranded three
`maintenance.lock`s, moved). His go, at night, for RA-10 with the order recorded under §182's addendum. Cloud audit tree: the three public
repos cloned with full history (see the corrected lesson below), the private `tests` tarred, staged and md5-verified; the three live files
matched the brief's md5s. The 327 suite: 82/82 live, 62 RED on `54cfc92` exit 1. Then five parallel lanes (staff page · admin entry & User
Bids · record, backup/restore & lifecycle · rules & cross-cutting · suite honesty by mutation), three adversarial verifiers with the
opposite brief (a regression hunter — 15 hypotheses rejected; a disprover of every claimed defect; a full-battery run of every escaped
mutant), and a browser lane that drove the real pages in headless Chromium on the sweep harness (both sweeps, mobile bid flow, the full
phase run-through, and a 106-step hold walk). Gates: battery 77 suites exit 0 (regression run, no auction baseline — the 327 honesty ran
separately); isolation 36/36; handler audit 192/0; `node --check` 8/8. Report: `tests/docs/RA-10-2026-09-05.md` (md5 197681eb…), also in
the chat outputs. Docs: DECISIONS §182 addendum, TODO §1, START-HERE, this entry. Two repos to push: `tests` (ONE file — clear the Summary
box first), this repo (four files).

**Lessons, dated 5 Sep.**
1. **A build's own suite can be green for the wrong reasons and the whole battery will not tell you.** Fifty-seven planted single-line
   breakages, run against all 77 suites: four realistic ones (the staff dropdown/write guard, Add Bid's write-time `return`, a Phase-1-only
   gate, a typeof-guarded restore of `bidHolds`) stay green everywhere. Text pins on a helper say nothing about its callers; a sandbox that
   lacks the ref makes a `typeof`-guarded line a no-op in the test and live in production. Mutation runs are cheap (≈33 s a battery) and
   should be part of every audit of a build that adds a guard.
2. **"The UI cannot create the state" is not "the state cannot exist."** RA-9 closed the four manual entry paths; a restore re-places an
   older bid on a withheld number deterministically and the page then has no chip to release it. When a build adds a rule, walk the
   non-UI writers of the same document (restore, stale clients, hand edits) before writing "never" in the record.
3. **The sweep's fake `doc()` takes three arguments**, so every cloud backup in the harness collapses onto one path and every restore fails
   silently while "Cloud Backup & Continue" proceeds — the sweep has never exercised restore, and its confirm pass reaches Delete All
   Users before User Bids, so the record's confirms never include a hold. Harness gaps, dated 22 Aug; in `TODO.md` as F14.
4. **Chromium in the sandbox is v141 under a playwright pinned to v151**: the symlink recipe in START-HERE §6 still works with the new
   build numbers (`chromium-1234`, `chromium_headless_shell-1234`), plus `INSTALLATION_COMPLETE` / `DEPENDENCIES_VALIDATED` marker files.
5. **A recorded order of steps is not a recorded result.** §180 and TODO said 327 was "pushed in the order RA-2 → console → push", but no
   passed/failed line was written anywhere, and `tests/rules-emu/firestore-debug.log` (the emulator writes it on every run) was dated 30 Aug.
   He asked the next morning; it had not run. He ran it: 155 / 155, holds gates 4/4 red on the old rules. When a gate is HIS to run, the
   record needs his numbers, not the plan — and that log's mtime is the cheap way to check.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 5 Sep 2026 (MORNING, same session) — §183: ADMIN 328, RA-10's F1 + F2, FILED. RA-2 RUN BY HIM (155 / 155).

## 5 Sep 2026 (MORNING, same session) — §183: ADMIN 328, RA-10's F1 + F2, FILED. RA-2 RUN BY HIM (155 / 155).

**What the session did.** He asked whether RA-2 had run after the rules change; the record held the plan, not a result, and the emulator's
own log said 30 Aug — so he ran it: 155 / 155 current, the holds gates 4 / 4 red on the old rules (recorded in DECISIONS §182). Then *"proceed
with f1 anf f2"* (§183). Explored the three functions first, presented the plan (§0 rule 2), his "Go". Built in the cloud clone as an anchored
patch (`build328-patch.py`: base md5 pinned to 327, every anchor `count==1`, refuses to apply twice), suite `test-328-held-behind.mjs` written
against it, then the patch applied on his Mac by `device_bash` and every file md5-verified against the cloud (admin da2d7e7b…, versions
28f22a6b…, the two suites). Gates: see the 328 row in `vacation-kp.github.io/BUILD-LOG.md`. Three repos to push: `vacation-kp.github.io`
(admin page, versions.json, BUILD-LOG), `tests` (new suite, re-anchored 327 suite, the RA-10 report's RA-2 line — three files), this repo
(DECISIONS §182 addendum + §183, TODO, START-HERE, this entry).

**Lessons, dated 5 Sep (morning).**
1. **A `typeof helper==='function'` guard is a silent no-op in a test sandbox.** The first cut of F2 used the build-266 convention
   (`typeof _adminHeldNums==='function' ? … : []`) and the new suite went GREEN on a page where the seed did nothing, because the sandbox
   never defined the helper and `typeof` never throws. The suite only caught it once the helper was named in `need`. Rule: in a function the
   suites execute, either call the helper unguarded (a missing one then crashes loudly — rule 11) or name it explicitly in the sandbox; the
   328 page does the former and both suites now do the latter for `ubRelease`, which is CALLED after assembly and so cannot auto-resolve.
2. **A dialog's copy is part of the guard.** The 327 Release dialog said "goes back into the pool"; for a hold behind a bid that is false
   (the number stays on the bid). Found by the browser lane reading the DOM, not by any suite — the walk now asserts both bodies.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 5 Sep 2026 (LATE MORNING, same session) — §184: THE TESTS MADE HONEST ABOUT THE HOLDS BUILD. 328 LIVE. NOTHING OPEN.

## 5 Sep 2026 (LATE MORNING, same session) — §184: THE TESTS MADE HONEST ABOUT THE HOLDS BUILD. 328 LIVE. NOTHING OPEN.

**What the session did.** He pushed 328 (`e5eea70`, verified served twice), chose (2) of the recommendation and declined (3)
(*"skip 3"*). Two agents in parallel, no page touched: **F3/F4/F5** in `test-327` (82 → 108: the staff dropdown and write-time guard
EXECUTED with a hold — exact disabled/enabled option lists, `persistScheduleChange` not called, a free-number control that does persist;
Add Bid EXECUTED at click and at Confirm with the hold arriving in between — recorded writes, not text; a Phase-1 fixture through all four
helpers; honesty 62 → 80 RED on 326, no throw) and `'bidHoldsRef'` in `test-appcheck-login`'s MOVED list; **F6** in `test-backup-restore`
(177 → 182: `bidHoldsRef` in the restore harness; a 326-shaped backup commits the same 24 docs + phaseStaging; a backup carrying `bidHolds`
never writes it); **F14** in the sweep (fake `doc()` variadic, `getDocs` children-only; `userbids` hoisted before `users` in the walk).
Every escaped mutant from RA-10 is now red: #35 ×5, #36 ×4, #5c2 ×2, #5d2 ×2, #5d3 ×2, #42 ×4, #43 ×2, #44 ×1, #13c ×5 (+5 older restore
assertions that finally execute), #14b ×1. Battery 78 / exit 0 in the cloud; isolation 36 / 36; the three changed suites re-run on his Mac
(108 / 182 / 62). Sweeps on 328 with the fixed harness: default admin 338 + 281, staff 13 + 13, 151 dialogs, 136 confirms, 0 errors;
look-back 284 + 250, 11 + 11, 94, 54, 0 — the confirm pass now includes hold 2, hold 3, release 7, and `cloudRestore` opens its dialogs
(it stops at the typed RESTORE, which the driver never types; a probe that typed it completed Full and One-User restores with 0 errors).
Five files md5-verified on his Mac; he pushed `tests` (`2b85dc2`) and this repo (`51c654f`) at 09:07, then *"let's update and prepare
handoff docs"* — the closing checklist ran (fetch all four, three stranded locks moved, `status.mjs` exit 0, every repo clean and in sync,
`tests` judged from `git log` as always). **Nothing is open on the auction. Next auction honesty baseline: admin 328 = `e5eea70`,
staff 169 unchanged. he emptied `_to_delete/` himself during the close (what remains is this close's own patch script and
lock, 9 KB).** The cloud scratch (`/tmp/ra10-lanes/**`: every lane's scripts, the 57 mutant trees, the browser walks) dies with the
session; everything a reader needs is in the RA-10 report and the two BUILD-LOG rows.

**Lessons, dated 5 Sep (late morning).**
1. **`test-backup-restore`'s restore harness had never reached `commit()` on any build since 251** — the batch tail threw on a name the
   sandbox did not define, the "Restore FAILED" toast went to a no-op, and the assertions inspected the writes captured before the throw.
   Green for months on a half-run. Found only because F6 added the missing ref and the batch ran to the end. The same shape as rule 8's
   "check that a gate actually ran": record the terminal call (`commit`, `persist`, `send`) and assert on it, never on what preceded it.
2. **A one-line seed is not one line of test.** F2's `availableNumbersFor` seed passed a green suite with the seed inert (see the morning
   entry); F3's pins on the helper said nothing about its two callers. The rule that survives both: test the CALLER that enforces, with the
   terminal effect recorded, and keep a control that proves the harness can see a write at all.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 7 Sep 2026 (EVENING) — "Vacation Auction 5 Sep 2026 V2" (the session opened 5 Sep, resumed 7 Sep) — §186: THE FINAL CHROME REHEARSAL. NOTHING BROKE. ZERO E-MAILS. NOTHING BUILT.

## 7 Sep 2026 (EVENING) — "Vacation Auction 5 Sep 2026 V2" (the session opened 5 Sep, resumed 7 Sep) — §186: THE FINAL CHROME REHEARSAL. NOTHING BROKE. ZERO E-MAILS. NOTHING BUILT.

**What the session did.** Re-grounded (§4) on 5 Sep; two days later he ordered the full run-through (§186). Explored first: every
e-mail path on both pages read (three send sites each; outbid alerts not even queued with the switch OFF, welcome mail returns with its
switch OFF, results/round/reminder/whitelist mails are button-only; the one residual is the mail-queue sweep, so the queue was checked
empty first). Plan stated, questions asked, his approvals recorded, then driven from his Chrome: admin tab + staff tab as AF. Starting
state recorded from the Controls DOM, cloud + local backups taken (5:01 PM), timer ON with the opening window off for Phases 1–3 (back
on for Phase 4), timer mode 2 in P1, 1 in P2, 3 in P3, back to 2 for P4. Phase 1 slowly (dropdown floors and the hold, mode-2 resets,
lowering, Under Review filters, wheel, hand decisions, bulk approve/deny, revoke, close/complete/skip, reports, cross-check); Phase 2
(cap refusal on the 7th bid, 5 sims/user, auto-decide, capacity raise + the cut stop-sign); Phase 3 (NP, mode 3); Phase 4 in three
rounds (month picker, opening window per round, round-labelled history and reports, frozen round capacity, no Revoke on locked rounds),
Complete Phase 4 → Mark results sent. Full step list with times in `tests/docs/REHEARSAL-2026-09-07.md`.

**State left behind, at his word.** The live auction is in its FINISHED state (all rounds announced), Rehearsal Mode ON, timer ON
(mode 2, window 5 d), Wk 1/3/8 capacities raised to 5/5/6, both e-mail switches OFF as he set them. He restores from the "Sep 7, 2026,
5:01 PM · Phase 1 · 0 bids" cloud backup (or the local file) himself. Holds are not restored by design — his withheld 3 stays withheld.
Meter 1 of 2,000 before and after; queue 0 throughout. Chrome tabs left open for him.

**Late evening, same session (§187).** He read the six notes: O-E (no backup prompt on Complete Round) is the one to fix now if
trivial — it is one guard line, the same as every other transition — approved as admin 329 with the order "update handoff now, then build,
then finalize handoff"; O-B explained to him; the other four filed for a quiet day. Context at his 700k budget line: ~600k when he ruled.

**Admin 329 LIVE (`b0ed735`, pushed 7 Sep 19:10 PDT with the tests and docs commits, verified served twice cache-busted). Next auction honesty baseline: admin 329 = `b0ed735`, staff 169.** Filed as: One guard line in `completeP4Round` (the backup gate every other
transition has), BUILD 328 → 329, `versions.json`. Gates: `tests/test-329-round-backup-prompt.mjs` 11 / 11, honesty on 328 (`e5eea70`,
fixture from `git show` into `~/vac328/`) 4 RED exit 1; battery on his Mac 79 suites / 2,607 assertions exit 0, no skips; isolation 36 / 36;
every inline script `node --check` clean. Not run: the browser sweep (no browser on the Mac; not worth the cloud clone at his 700k line).
Paperwork: BUILD-LOG row, START-HERE LAST REVISED + LIVE line, DECISIONS §187, TODO §1, `status.mjs`. Next auction honesty baseline once
pushed: admin 329 (the SHA he pushes); staff 169 unchanged. **Closing checklist run at the end of this entry** (fetch, locks, status).

**Board state at close (his own hands, after the push):** he ran Reset Auction (not a restore), set Wk 1/3/8 back to 4, turned the
Bidding Timer master ON (it was OFF at the 5:01 PM start — his choice), and withheld his 3 again. Everything else matches the start.
Told him the one Reset side-effect: the welcome log is empty, so once Welcome e-mails go ON every user is welcomed at next login.

**Lessons, dated 7 Sep.**
1. **A background Chrome tab lies about time.** Chrome throttles a tab that is not in front, so the staff page's text lagged the paint by
   many seconds during bursts of admin writes; foregrounding it (a screenshot) repainted at once. Read a page after foregrounding it, and
   trust the painted screenshot over `innerText`.
2. **Click the page's own buttons; do not call the function.** A report opened from script is a blocked pop-up; the same button clicked
   by hand opens it. When a pop-up cannot be read (about:blank is off-limits to the extension), capture the HTML in-page instead.
3. **`find` can resolve to the wrong row.** A "priority select in the AF row" resolved to another user's row and opened a real change
   dialog (cancelled, nothing saved). Address rows by their `onclick` target, never by description, when a wrong click writes.
4. **Rounds are phases to the simulator's "existing bids" count too** (O-F) — the same class as §163, in the one tool that does not matter live.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 7 Sep 2026 (LATE EVENING) — "Vacation Auction 7 Sep 2026 V1" — §188: THE DOCS PASS IS PLANNED AND APPROVED. NOTHING BUILT. NOTHING MOVED.

## 7 Sep 2026 (LATE EVENING) — "Vacation Auction 7 Sep 2026 V1" — §188: THE DOCS PASS IS PLANNED AND APPROVED. NOTHING BUILT. NOTHING MOVED.

Opened with START-HERE attached; ritual run from disk (three public repos fetched, locks moved, live 329/169/18 and 151/51 fetched twice).
He pushed last night's two pending hub files (`e1452f5`). One small START-HERE edit, his go: §4 step 5 names the context reading as part of every
opening report; step 0 takes the session date in America/Los_Angeles (this session was first misnamed "8 Sep" from the UTC clock).
Three product questions answered from Anthropic's docs (Pro vs Max for small tweaks; Opus 4.8 vs 5 token use) — no ruling, he is weighing a smaller plan.
Then the docs question → the leaner-docs proposal → his *"I like this idea"*, his two concerns (his session start; whether everything gets read anyway),
his *"Go"* on the detailed plan, and §188 approving it in full with the self-updating requirement. **Plan: `tests/docs/DOCS-PASS-PLAN-2026-09-07.md`
(137 lines, §§0–8). The pass itself runs in a FRESH session, early — it is the next job.** HANDOFF is at 1,991 lines against its 2,000 tripwire.

**Lessons, dated 7 Sep (V1).**
1. **"Not readable from here" was asserted without running the recipe** — START-HERE §4 already said where the context number lives, and it was
   readable. He caught it in one line. Rule 8's shape again: a claim that sounds like a check is not one. The number is now part of step 5.
2. **Read the clock in his timezone before naming anything.** `TZ=America/Los_Angeles date`. Now in §4 step 0.
3. **The archiving rules already existed and one of my proposals contradicted them** (archive by age; his §101 ruling is "not by time").
   Caught by reading HANDOFF's maintaining section before writing the plan — §0 rule 1, and it changed the plan. Read the governing text first, every time.

Closing checklist run at the end of this entry: fetch (three public repos; `tests` judged from log/disk), chat reviewed (§188, the §4 edits, this
entry, the TODO item), no code touched so no battery, files accounted for below, `status.mjs`, locks. Context at close ≈ 250k.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 31 Aug 2026 — the §142 batch (admin 151 / staff 51 / PUSH-ALL), and two session-specific notes

## 31 Aug 2026 — the §142 batch (admin 151 / staff 51 / PUSH-ALL), and two session-specific notes
Shipped and verified per BUILD-LOG; rulings §141–§143. Worth keeping: (1) with `device_stage_files`
blocked by a stale sign-in, the current build reached the cloud by RE-APPLYING the same
count-guarded python substitutions to a fresh clone — md5 then proved byte-identity, no transfer
needed. (2) In-cloud, ESM suites ignore NODE_PATH — symlink the global node_modules to
`<root>/tests/node_modules`; and the full schedule battery (108 suites, browser suites RUN) takes
>10 min — run it with nohup in the background and read the log, never in a foreground call.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 31 Aug 2026 · the abandoned Chrome rehearsal (§144, §145)

## SESSION — 31 Aug 2026 · the abandoned Chrome rehearsal (§144, §145)

**Ended at his instruction**, mid-run: *"forget it, this a waste of my tine"* → *"prepare handoff, i need a
new session"* → *"stop working. just prepare end of session docs."* Nothing is half-written to disk; the one
uncommitted change is this paperwork.

**Done and durable**
· Re-grounding: four repos clean and in sync; auction 305/164/18 and schedule 151/51 verified served twice
  cache-busted; three stranded `maintenance.lock` files moved to `_to_delete/locks-31aug/`.
· §144 — PUSH-ALL dropped on its first run. Terminal git IS installed (the 22 Aug note was wrong, now
  corrected in START-HERE §6); the COMMIT succeeded, the PUSH failed for want of a saved GitHub sign-in
  (all four remotes are HTTPS; GitHub Desktop carries its own credential Terminal git cannot see). He
  declined both fixes. Do not re-propose it or the credential setup.
· **Pre-flight PASSED** — `tests/sweep/phase-runthrough.mjs` against live build 305, in the cloud container:
  all four phases begun/closed/decided/completed/sent, two P4 rounds, the auction-ending step,
  **0 console errors · 0 page errors · 0 native dialogs · 0 never-event findings**; the draw randomizer spun
  twice and both winners approved. Scope limit, stated honestly: fake backend, ~9 seeded users, its built-in
  NE checks cover only NE-2, NE-3 and a heuristic NE-1.
  **Cloud recipe (it is not obvious, save the rediscovery):** clone the two public repos beside a `tests`
  extracted from a tarball; `REPO_ROOT` must be `/root/kp` (the container's `~` is `/root`, NOT
  `/home/claude` — one run died on exactly this); ESM ignores `NODE_PATH`, so symlink the global
  `playwright` and `playwright-core` into `tests/node_modules/`; the script hardcodes
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, which exists. `make-site.mjs` lives in `sweep/`.
  And it reproduced §3 rule 11 live: `node … | tail` printed EXIT=0 for a run that died — read exit codes
  directly.

**The live run, and where it stopped**
Baseline captured (Phase 1 open, 5 bids from AF and GL on Wk 47/51/52, timer running, 49/52 locked, both
e-mail toggles OFF, queue 0, EmailJS 0 of 2,000). Two cloud backups taken, both *Phase 1 · 5 bids*. **He
performed the reset himself** (typed RESET) after Claude's flow was interrupted. Claude then clicked
`🔒 Lock standard weeks & Begin Phase 1` — **and the connection died before the result could be read, so
whether Phase 1 is open is UNVERIFIED.** Rehearsal Mode is ON and nobody has claimed arming it. All of this
is at the top of `TODO.md` §1 as the first job of the next session, with the findings.

**The disconnections — evidence, not a conclusion**
Four drops in roughly ninety minutes. Every one followed a heavy page operation (cloud backup ≈30 document
writes, the reset, Begin Phase 1's 52 lock writes). The tab reported `document.hidden = true` throughout, and
each recovery coincided with him switching to Chrome. Best current reading: **the extension's background
worker idles out while Chrome sits behind other windows, and a long busy page gives it the gap it needs** —
so it drops precisely when he comes to the Claude app to read a message. NOT PROVEN. What IS proven: clicks
work fine on a hidden tab (tested), so "hidden" alone is not the cause, and screenshots are not the cause
either (a screenshot-free batch timed out). **Do not repeat the two wrong diagnoses below by theorising
first.**

**Claude's own errors this session, recorded so they are not repeated**
· Diagnosed the drops twice from theory and was wrong twice, before running the one cheap test that settled
  each. §3 rule 14 — *run it, don't recall it* — applies to Claude's diagnoses as much as its assertions.
· Read button coordinates off a screenshot by eye and missed a button by seven pixels, then treated the
  silence as a failed backup. Screenshot pixels are CSS pixels × 1.133 here (1568/1384); get the rect from
  `getBoundingClientRect()` and scale it, never eyeball it.
· Worked screenshot-free for speed and left him unable to see what was happening — he said so: *"I can't see
  where you're working."* If the work is invisible to him, say where it is, every time.
· Spent his time on reconnaissance side-quests (the Fair Play report, the report-tab workaround) before the
  main run had started.

**Environment note:** this session's own safety classifier twice blocked the reset steps as destructive.
Both cleared on retry. Expect it around Reset/Delete flows; do not fight it — say so and let him decide.

---

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 1 Sep 2026 (later) · D8 and F-9b as admin 315 (§155)

## SESSION — 1 Sep 2026 (later) · D8 and F-9b as admin 315 (§155)

He opened with **"go with both"** on the two items the re-grounding report put in front of him, then
**"go"** on the plan. Both are filed, not pushed.

**They were one defect wearing two names.** D8 and F-9b sit in the SAME function a few lines apart —
`bidsByWeekModel`, which feeds the reports and all three export paths. Build 309 had already written
the correct rule for the Approvals/Denials screen (`_adSnapProj`: trust a phase's recording WHOLE,
never per week). Nobody carried it across. **The lesson is the one this project keeps paying for: a
rule applied to one surface is not a rule.** 309, 312 (D2), 314 (D5) and now 315 are four builds
fixing the same idea on four screens — each found separately, none found by the fix before it.

**The measurement that made F-9b concrete.** Argued in the abstract it sounds theoretical. Driven on
the pushed 314 at a raised cap — his own Phase-4 EXTRA FTE workflow — a closed phase whose recording
names ONE winner reported FIVE, one of them a bid that phase had DENIED. That is the whole case, and
it took a fixture, not a paragraph.

### The sweep had to move to the cloud, and the recipe gained two steps
The Mac's device VM has **no Playwright browser and no egress to download one** (`npx playwright
install chromium` dies with a download failure — the allowlist). So the every-button sweep ran in the
cloud container against a fresh clone of both public repos plus a staged `tests.tgz`, per §6.

**Two things §6 does not yet say, both of which cost a cycle:**
- The cloud's Chromium is build **1194**; the pinned Playwright wants **1234**, and it wants
  `chrome-linux64/`, not `chrome-linux/`. A writable `PLAYWRIGHT_BROWSERS_PATH` with symlinks fixes it.
- **The driver launches the HEADLESS SHELL, not chrome** — a second, differently-named binary
  (`chrome_headless_shell-<v>/chrome-headless-shell-linux64/chrome-headless-shell`, where the 1194
  build calls it `headless_shell`). Symlinking only `chromium-*` gets you an abort on all four passes.

**The sweep behaved well and deserves the note:** all four passes aborted on the missing binary and it
printed **"SWEEP FAILED — this run does NOT count as coverage"** with a non-zero exit, rather than
reporting zero errors over zero clicks. That is §3 rule 8's good direction, and it is rarer than the
bad one.

### One near-miss, Claude's, caught before the honesty run
The first draft of the 315 suite contained `ok(!Object.values(raised).some(v => v === 'winning' &&
false) && …)` — a clause that can never be true, so half that assertion was decoration. **§3 rule 10:
an assertion that cannot fail is not a weak test, it is a false one.** Replaced with the invariant
that actually matters (the only projected winner anywhere is the one the recording names), which is
strictly stronger than what it replaced. Recorded because it was written by the same session that
quotes rule 10 in its own plan.

### The single-file commit ate another message — the WARNING is not a fix (1 Sep 2026, after the 315 push)

315 pushed clean and was verified served twice (`89f9bda`, auction admin **315** live ~17:19 UTC;
schedule unchanged at 151/51). Two of the three commit messages landed whole. **The third did not.**

`tests` was a ONE-FILE commit, so GitHub Desktop pre-filled the Summary, and `ad9179d` reads
**`Create test-315-recorded-projections.mjs`** with an **empty body** — not merely a replaced subject,
the *whole message gone*. The written message survives only in `tests/COMMIT-MESSAGE.txt`.

**This is the third time in one day, and the second time AFTER the rule was written.** The handover
said, in bold, that `tests` was a single-file commit and that the Summary box had to be cleared first.
It still happened. **So the mitigation — "say so in the handover" — does not work, and repeating it
harder will not make it work.** A rule that depends on catching a pre-filled box at the moment of
pasting is a rule that fails at the rate people miss pre-filled boxes.

**PROPOSED, NOT BUILT, and it needs his go.** Make a `tests` commit structurally incapable of being
single-file: keep a one-line-per-suite index in `tests/README.md` (or a small `SUITES.md`) that every
new suite appends a row to. Two files change, Desktop pre-fills nothing, and the index is independently
useful — `sched/run-all.mjs`'s hand-kept list has its own rot problem recorded in TODO. Cost is one
line per new suite. **Do not build this unasked.**

Until it is ruled on, the honest statement of the situation is: **`tests` commit subjects will keep
being lost whenever a build adds exactly one suite file**, and the real message lives in that repo's
`COMMIT-MESSAGE.txt`. Recorded, not rewritten — the history stands, as it did in August.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 1 Sep 2026 (later still) · the audit that followed the empty queue, and E1 as 316

## SESSION — 1 Sep 2026 (later still) · the audit that followed the empty queue, and E1 as 316

With the auction queue empty he said **"keep going."** That is not a §92 go, so the turn was spent
**reading and executing, not building** — the two surfaces the round sweep never reached. Two were
clean. The third was E1, he gave it its own go, and it shipped as 316.

**The habit worth keeping from this:** an empty queue is not the end of the work, and "keep going"
against an empty queue is best answered with the audit that needs no permission rather than with a
question or with a change nobody authorised.

### Three process notes, each of which nearly cost something

**· The render lied in the safe direction, and reading it alone would have produced a wrong report.**
The Remove button looked like the finding. It refuses. The dropdown beside it did not. Driving both
is what separated them — §3 rule 5 read in the direction it is usually *not* used.

**· `PREFIX_SRC` was IGNORED, not rejected — §3 rule 8's third kind, hit live.** Checking whether the
re-anchored `test-p4-rounds` assertion was a real gate, `PREFIX_SRC=/tmp/vac315/... node
test-p4-rounds.mjs` printed a PASS. That looked like proof the assertion was weak. It was not: that
suite reads `adminSrc` from the **working tree**, and `PREFIX_SRC` only feeds its honesty blocks. The
answer came from running the check against the 315 bytes directly, which reports `adminChangePriority`
unguarded. **Change the input, check the output changed** — the rule already says it, and it still
took a second to notice.

**· A pinned COUNT went red for a build that made the code stronger.** `test-p4-rounds` asserted
"exactly 5 + exactly 1" refusal sites; a seventh broke it. That is rule 16's decay verbatim. The
important half is the other direction: **a count would have stayed green if someone added a new
UNGUARDED handler — which is precisely how E1 lived through 312, 313, 314 and 315**, four builds whose
whole subject was rounds. Re-anchored to the seven handlers by name.

### The single-file diagnosis is CONFIRMED by the 316 push (1 Sep 2026)

316 pushed clean — auction admin **316** live and verified served twice (`b295714`, ~18:00 UTC), schedule
unchanged at 151/51. **All three commit messages survived this time, `tests` included** (`b50f01d`,
"Suite for 316; the archived-decision pin re-anchored"), and the only thing that differed from the 315
push is that the `tests` commit carried TWO files rather than one.

**That is the diagnosis confirmed by a controlled comparison rather than by reasoning:** same repo, same
person, same paste, one variable changed, message preserved. It also means the proposed structural fix
— a suites index so a `tests` commit is never single-file — is now evidence-backed rather than a guess.
**Still PROPOSED, still needs his go.** Do not build it unasked.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 1 Sep 2026 (evening) · the inventory, and 317

## SESSION — 1 Sep 2026 (evening) · the inventory, and 317

The auction queue emptied after 316, he chose the surface inventory over the alternatives (§158), it
found three on the admin dashboard, he said **"go on all"**, and they shipped as 317.

**The inventory is repeatable and should be repeated.** Script both served pages into functions, keep the
ones that read phase/round/decision state (154), mark each against the four shapes, cross-check against
one discriminator — *does it ask which round decided this?* — and drive the survivors. It found in one
pass what five consecutive builds had been finding one screen at a time.

**Two mistakes of Claude's, both caught, both worth the record:**

**· A stub manufactured a false finding.** The first dashboard probe stubbed `bidMatchesPhaseFilter` —
the function that decides which bids a filter shows — and duly reported that the cards ignored the round
filter. With the real function in place the filter is honoured and the OUTCOME is the defect. §3 rule 10
is usually quoted as "a stub can hide a bug"; this is the other direction, where a stub invents one. The
suite now names that function explicitly and never stubs it, with a comment saying why.

**· A false gate survived into the suite and the honesty run caught it.** The F3 assertions tested
`bwScopeLabel`, which was already correct — the defect was that `exportDashboard` didn't call it. All
three passed on the old build. **That is exactly what the honesty run is for, and it is the second time
today it earned its place.** Replaced with an assertion over the function's own comment-stripped source,
plus a proof the stripper kept the code, because this build's comment quotes the forbidden string.

**The standing lesson from F2, in one line:** D7 fixed one of two consumers of the same dropdown. When a
defect is fixed, find every consumer of the same input — not every screen with a similar name.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 1 Sep 2026 (close) · the mail path, and the sweep stopped on purpose

## SESSION — 1 Sep 2026 (close) · the mail path, and the sweep stopped on purpose

**He ended the sweep with the right question:** *"how much more of this do we have? i don't want to
endlessly chase things that might be fine."* The answer existed only because §158 had counted: 28
flagged, 9 fixed, 2 clean, 4 by design, 1 worth checking, 12 not. **That is the value of the inventory,
and it is worth more than any single defect it found** — before it, "how much more" had no answer.

He chose the mail path and then to stop (§160). **The mail path was the right one, and it found three
chained defects — G1, G2, G3, all UNBUILT and needing his go.** A physician whose bid a round already
denied can be e-mailed *"your projection changed from UNDER REVIEW to WIN"*, and it is reachable
because `adminAddSelection` has no completed-phase gate at all (driven: five writes, no refusal).

### The pattern under D8, E1 and now G1 — say it as a rule about the WEEK
The archived-round guard on the other write handlers protects **the bid being acted on, never the
bystanders on the same week.** Three separate findings have now lived in that one gap. Whoever fixes G1
should state the rule that way rather than adding a fourth per-handler guard.

### Two disciplines that paid for themselves today, both recorded because they nearly did not
**· A stub INVENTED a finding** (`bidMatchesPhaseFilter`), and **a false gate survived into a suite**
(the F3 assertions tested a helper that was already correct, so they passed on the old build). The
honesty run caught the second. Both are the same lesson from opposite ends: **the thing you did not
write is the thing to check.**
**· The first mail fixture proved nothing** — it was built so the bidder won in both states, so no mail
was due and the run looked clean. A probe that cannot distinguish the two answers is not evidence. The
second fixture gave every scope a different right answer, and that is when it spoke.

### Housekeeping done at close
`TODO.md` crossed its **2,000-line tripwire** (2,013). The three shipped-and-live write-ups from this
session (315, 316, 317) were moved to `_archive/anesthesia/todo-sections/2026-09-01-shipped-315-317.md`
under the standing rule — a fact lives in ONE file, and all three have BUILD-LOG rows and DECISIONS
entries. **1,887 lines now. ⚠️ The older shipped sections (306–314, RA-7) are STILL in `TODO.md` and a
full archive pass is DUE before the next feature build** — deliberately left for a fresh session rather
than run at the tail end of a long one.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 1 Sep 2026 (late evening, fresh session) · the archive pass, then RA-8. NOTHING BUILT.

## SESSION — 1 Sep 2026 (late evening, fresh session) · the archive pass, then RA-8. NOTHING BUILT.

**What happened, in order.** §4 ritual clean (318/165/18 · 151/51 live, all repos in sync). He chose the archive pass
(TODO 1,902 → 1,587 with the new queue; START-HERE 687 → 667; the week's shipped write-ups in
`_archive/anesthesia/todo-sections/2026-09-01-shipped-306-318.md`) and MANDATED RA-8 (§162), then widened it three times
while it ran — §163 (rounds are phases), §165 (O-1…O-4, *"don't lose track of any of them"*) — and set the standing
order for everything after it (§164: narrow, safe, winding down). He asked whether to build the §163 fix first; Claude
argued audit-first (one build closing the class beats two chasing it) and he agreed.

**How RA-8 ran, so it can be repeated.** Cloud container; both public repos cloned and md5-verified against the Mac on the
five served files; `tests` staged as a tarball; baseline 305/164 from `git show 420df42:`. A shared brief
(`tests/docs/RA-8/PREAMBLE.md`) carried the domain, the house harness and the finding format. Eight lanes in parallel
(engine · merge · Under Review page · reports · capacity · diff review · battery+sweeps · rounds-as-phases), a ninth for
the timer when O-1/O-2 arrived, then **four adversarial verifiers with their own probes and their own fixtures**, told
to break the findings AND the clean verdicts. Every finding driven on 305 too. ~3.6M subagent tokens.

**Three things the verifiers earned their keep on:** (1) verifier C found R-4 (add/approve on a completed ROUND vanishes
at Start Round) inside the 30 "correct-as-phase" sites lane 7 had passed; (2) verifier B established WHEN a phase archive
becomes readable (admin tabs at once via the local merge; staff only after Send Results) — which decides whether R-3's
fix has data, and turned "users see nothing" into "users see Losing until Send Results"; (3) verifier D reconciled the
battery's 2,321 vs BUILD-LOG's 2,322 to one named assertion instead of a shrug.

**Traps hit, for the next session.** `md5` does not exist in the device VM — it is Linux: `md5sum`. A `&&` chain that
starts with a failing command silently skips the unzip loop that follows (good — nothing half-written — but read the
output). Per-file `unzip -p` for 338 files was fine; verify with ONE combined hash of the sorted per-file md5 list on both
sides rather than 338 lines of output. `rsync` is not in the cloud container; use `cp -r` and prune.

**State at close.** Four repos: `anesthesia-kp.github.io` has four modified docs; `tests` has the RA-8 files (338 new,
multi-file commit — no Summary-box trap); the auction and schedule repos are untouched and clean. Nothing filed but not
pushed on either site. His rulings on the RA-8 queue are the next step; §164 item 5: *"i don't need an answer until
audit is complete"* — it is complete.

**Addendum (same session, later).** §167: his three answers (no e-mail on a raise; the confirm on a cut below approved;
the "3-bid limit" was Claude's error — a fixture default, his setting is `maxBidsCumulative` 6 through Phase 2, none
after — withdrawn and recorded). §168: his go on ALL groups A–F including his P4 comments and rules text. A Plan agent
drafted the three-build plan (`tests/docs/RA-8/PLAN.md`, every anchor grep-verified unique on 318/165, baseline SHAs
`dd36c3b` / `df9b460`); it was presented and the session STOPPED there for his go (§0 rule 2). Also corrected: the
context-threshold rule in START-HERE §4 — his sessions never compact below 600k; Claude invented a third threshold at
300k and was overruled within the minute. If this session compacts before the go: everything above is on disk; the
cloud workspace (`/home/claude/ra8/`) holds the clones, the 305 baseline, the tests tarball and the probes, and is
rebuilt in ten minutes from START-HERE §6 if lost.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 2 Sep 2026 (continued) · RA-8 Build 1 filed: admin 319 / staff 166

## SESSION — 2 Sep 2026 (continued) · RA-8 Build 1 filed: admin 319 / staff 166

His *"pushed. go."* on the plan. Built in the cloud by one agent from `tests/docs/RA-8/PLAN.md` BUILD 1 with an
anchored patch script (`split(OLD).length===2` before, `count(NEW)==1` after; a second run refuses). Two plan anchors
were tightened by the builder and are recorded in the BUILD-LOG row (a phase-1–3 bid's `phase` stays numeric while
Phase 4 is open; the dashboard card says "round" only on the live view). Claude re-ran the new suite and BOTH honesty
checks itself before shipping (85/85 · 55 red on the 318 fixture, exit 1 · staff 20/20 · 11 red, exit 1) and read the
three re-anchored suites' diffs — all stricter, real extractions. Shipped as ONE zip of 19 files, unpacked per-file on
the Mac, combined md5 identical (`f4ffe262…`). **Thirteen existing suites changed** because the build routed existing
functions through new helpers; each change adds the real helper to a fixed sandbox. Nothing was committed by Claude.
Cloud workspace `/home/claude/ra8/` still holds the working tree with Build 1 applied (= the Mac's), the 318/165
fixtures under `/tmp/vac318`, `/tmp/vac165`, and the sweep symlink tree — Builds 3 and 2 start from it.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 2 Sep 2026 (continued) · RA-8 Build 3 filed: admin 321

## SESSION — 2 Sep 2026 (continued) · RA-8 Build 3 filed: admin 321

*"pushed. keep going"* after 319/166 (verified live twice, clone re-synced to `d533420`, md5-identical to the Mac).
Build 3 (the record: R-1 round capacity frozen, R-3 the closed-current-phase views) built the same way from PLAN §BUILD 3,
17 anchored edits, all anchors located by TEXT because Build 1 moved the plan's line numbers. Claude re-ran the suite and
its honesty check itself (56/56 · 24 red on the 319 fixture, exit 1). One thing to know: a round archived BEFORE 321 has no
frozen header and prints the live backfill under the "(as of completion)" label — accepted because he has said every
archive so far is test data; the first real auction archives every round on ≥321. Shipped as one zip of 7 files, combined
md5 identical (`d9050ce3…`). Build 2 (the per-round timer clock, admin 320 + staff 167) is the last and the one rated
MEDIUM; its honesty baseline is whatever he pushes next, so it starts only after this push.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION — 2 Sep 2026 (continued) · RA-8 Build 2 filed as admin 322 / staff 167 — ALL THREE BUILDS DONE

## SESSION — 2 Sep 2026 (continued) · RA-8 Build 2 filed as admin 322 / staff 167 — ALL THREE BUILDS DONE

*"pushed. go."* after 321 (verified live twice; clone re-synced to `dc9dcd8`, md5-identical to the Mac). **The plan's
"320" became 322** — Claude caught it while briefing the builder: a served admin whose `var BUILD` is below the live
`versions.json` number reads itself as stale. Built from PLAN §BUILD 2; the builder restarted once (a trailing comment
said `phaseBeganAt[cur]`, which the suite's own comment-stripped allow-list assertion flagged — the gate worked on the
build that created it), `git checkout` back to `dc9dcd8`, re-applied. Claude re-ran the suite and honesty itself
(70/70 · 29 red on the 321/166 fixtures, exit 1). Shipped as one zip of 10 files, combined md5 identical (`0d2d643d…`).
**Both pages must be pushed together** (one timer doc, two readers). Harness lesson filed in the BUILD-LOG row: a helper
called from inside a try/catch that swallows ReferenceError must be NAMED in fixed sandboxes — the auto-resolver never
sees it. Left for him: the welcome e-mails' "Each phase opens with" sentence (scope), and a rehearsal Start Round with
the timer ON. The cloud workspace (`/home/claude/ra8/`) holds every build's patch script, diff and logs under
`build1/`, `build3/`, `build2/` — not filed to the repos (the suites and BUILD-LOG rows are the record).

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — SESSION CLOSE — 2 Sep 2026 · RA-8 done, its three builds live, the deck updated. NOTHING OPEN ON THE AUCTION.

## SESSION CLOSE — 2 Sep 2026 · RA-8 done, its three builds live, the deck updated. NOTHING OPEN ON THE AUCTION.

**Checklist run.** Step 0: the three public repos fetched — all in sync with origin, nothing arrived from elsewhere;
`tests` judged from `git log` (private, cannot fetch over the bridge). The fetch stranded `objects/maintenance.lock` in
all three, as §4 says it will — moved to `_to_delete/locks/`; no locks remain. `node status.mjs` exit 0. START-HERE's
live line reads 322/167, verified served twice.

**What this session did, in one paragraph.** The archive pass (TODO 1,902 → ~1,600, START-HERE 687 → 667). RA-8: eight
lanes, a ninth for the timer, four adversarial verifiers, filed with every probe — verdict: nothing breaks the auction;
four record defects and the rounds-as-phases class remained, all pre-existing. His rulings §162–§170. Then three builds
from one plan, each with its own suite red on the previous pushed SHA, an open-phase invariance block, the full battery,
the handler audit, the isolation guard and both sweeps: **319/166** (gates, labels, dialogs, his rules text in three
copies), **321** (a round keeps its capacity; a completed-unsent phase is closed on the admin views), **322/167** (each
round opens with the window on its own clock — renumbered from the plan's 320 so no served page reads as stale). All
three pushed by him and verified live. Finally his updated walkthrough deck, brought into line with the Draw merge.

**Waiting on him at close:** two commits — the deck in `tests` (ONE file — clear GitHub Desktop's Summary box) and the
docs here (four files). Messages in the outputs column.

**Standing at close.** §92 closes the auction code again. §164 governs any future build: narrow and safe, winding down.
The rehearsal is HIS (§169) — do not remind. The schedule stays parked (§143/§157). `_to_delete/` holds ~15 MB (this
session's transfer zips, the tests tarball, the lock folder) — his to empty.

**For the next session, the things that are easy to get wrong:** (1) the honesty baseline for any new auction build is
now `d554242` (admin 322 / staff 167); (2) `tests/docs/RA-8/PLAN.md` describes the three builds as designed — the
BUILD-LOG rows describe them as shipped, and the two differ in small named ways (322's number, the numeric-phase
tightening, the round-relabel); read the rows; (3) the cloud workspace is gone with this session — START-HERE §6 rebuilds
it in ten minutes; (4) the context number at close was ~490,000, under his 600k floor, with no compaction.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — 📓 SESSION RECORD — 1 Sep 2026. RA-7, then eight owner-found defects. Builds 309–314.

# 📓 SESSION RECORD — 1 Sep 2026. RA-7, then eight owner-found defects. Builds 309–314.

**What shipped:** 309–311 (RA-7's own findings, §151/§152), 312–313 (his D1–D4, §153), 314 (D5–D7,
§154). All pushed by him and verified served twice. Battery grew 58 → 64 suites, 2,151 → 2,240
assertions. Detail is in the BUILD-LOG rows; this is only what the session itself taught.

### ⚠️ THE LESSON OF THE DAY: an audit's confidence is bounded by its fixture

RA-7 audited the Approvals/Denials screen, answered "no double-counting" to its own question 4, and
reported it clean. **The owner found four defects on that exact screen within the hour** — and then a
sweep with the right fixture found three more, on three further surfaces. Seven defects on ground an
audit had just walked over.

The cause was not carelessness in the reading. **RA-7's fixture had no Phase-4 rounds, and RA-7's own
report NAMED a round fixture as the biggest gap it was leaving open** — then reported the flat answer
anyway. The finding should have read *"no double-counting **for phases**; rounds untested"*.

**The rule this earns: a negative finding is only as wide as the fixture that produced it, and the
scope belongs IN the sentence, not in a caveat further down the page.** "No X" with an untested case
is not a cautious claim, it is a wrong one.

### ⚠️ AND THE INSTANCE/CLASS FAILURE REPEATED, HERE, HAVING JUST CRITICISED IT

RA-7's F-1 criticised §149 for fixing an instance rather than a class. Build 312 then fixed D1's
duplicate defect **on one screen** — and D5 turned out to be the identical defect in the report, one
surface over, found by the very next sweep. **The same mistake, in the same session, by the session
that had named it.** When a defect is a shape rather than a line, the fix is not done until every
surface with that shape has been checked — and "which other code has this shape?" is a grep, not a
judgement call.

### ⚠️ A FAILED REDIRECT LEAVES THE OLD LOG, AND `tail` THEN REPORTS SOMEBODY ELSE'S RUN AS YOURS

`node status.mjs > /tmp/st.log 2>&1` failed with **Permission denied** — `/tmp/st.log` existed from an
earlier session and was not writable. The command chain carried on, `tail` read the *31 Aug* file, and
the output looked like a completely normal status run: auction 305/164, START-HERE "31 Aug", suites
55. Every number stale, all of it presented as current. It was caught only because those numbers were
recognisably old.

This is §3 rule 8's family — a gate that lies — with a new mechanism. **Write logs somewhere you own
(`$HOME`), and check the log's mtime against `date` before believing it.** The existing rule already
says to check mtime for a hung process; the same medicine cures this.

### ⚠️ WHEN AN EXISTING SUITE BREAKS ON YOUR CHANGE, CONSIDER THAT IT IS RIGHT

F-5b's first cut guarded the phase advance on `completedPhases` alone. Four suites went red.
`test-admin-295-db1` was modelling the real mechanism correctly: at that moment the finished phase's
snapshot may still be in `phaseStaging`, about to be published by that very batch. **The suite was
right and the guard was wrong; the guard changed.** §3 rule 12 asks which is changing, what is TRUE
or what is ASSERTED — this is the case where the answer is "the code", and it is easy to miss when
you wrote the code an hour ago.

### ⚠️ A FIXTURE CAN FLATTER THE CODE

The first draft of the D5 fixture gave the phase-4 roll-up a full, correct `projections` map — and
three assertions then PASSED on the broken build. The real field is written by `serializeProjections()`
reading the **live** schedule at completion, which the round boundaries have already emptied, which is
precisely why every P4 row in his screenshot read LOSE. **Model what the code actually writes, not
what makes the test easy.** Two false-pass assertions were also caught and fixed the same day: a bare
`indexOf` ordering comparison that passed on the old build because `-1 < anything`, and a guard that
passed vacuously while its sandbox was crashing.

### ⚠️ AND THE DAY'S LAST MISTAKE WAS CLAUDE'S, ON THE VERY RULE IT HAD JUST WRITTEN

The docs commit for all of the above shipped as `fbea125` with the subject
`anesthesia-kp.github.io   (docs)    changed: START-HERE.md · …` — a whole-file paste, the divider
becoming the subject. **That is the identical failure START-HERE §3 already records from 18 Aug
(`7fcd3f1`/`594778e`), in the same turn that added a new rule about commit subjects being lost.**

**The cause was Claude's formatting, not the owner's paste.** Only one repo changed, so the standard
`⚠ COPY ONE SECTION PER REPO` banner was replaced with prose, and a helpful note about GitHub
Desktop's single-file behaviour was put INSIDE the file above the message. The file stopped looking
like "one block to copy" and started looking like a document.

**The rule this earns, and it is narrow enough to keep: the outputs file contains ONLY text that gets
pasted. Guidance goes in the chat, never in the file — however useful it is, and however few repos
changed.** The banner is not decoration; it is the thing that tells the eye where the copy starts.
Recorded, not rewritten — the history stands, as it did in August.

### Owner-facing facts settled today
- **The bridge drops were macOS sleep** — his own diagnosis. Mains covered by Settings; battery needs
  Amphetamine (installed) or `caffeinate -di`. Recorded in START-HERE §4.
- **GitHub Desktop silently replaces the commit subject on any SINGLE-FILE commit.** He spotted the
  symptom. Four commits in the history prove it. Recorded in START-HERE §3.
- **He does not use any old archives** — everything so far is testing, nothing live — so the
  pre-build-295 fallback paths are unreachable in practice (§151).
- **Phase 4 always opens on Round 1.** His correction; Claude had it wrong. §152/§153.

---
## ⤵ moved 8 Sep 2026 from HANDOFF.md — lines EDITED IN PLACE during the docs pass (§188 item 6: superseded numbers and destinations corrected, not duplicated). The originals, verbatim; pre-pass line numbers 69, 70, 167, 197, 198, 203, 210, 211, 212, 213

  is actually serving), checks that anything filed-but-unpushed is named, and checks the
  LAST REVISED date against git. If it cannot reach `origin/main` it says so LOUDLY — in that
Move it to `_archive/`, dated, in one file. **Never delete.**
> ⛔ **NEVER ARCHIVED, whatever the test says:** the closing checklist above · this section ·
> PART A (shared), PART B (auction), PART C (schedule) and PART D (rescued records) ·
**3a · `START-HERE.md` HAS A TRIPWIRE OF ITS OWN: 700 LINES** (owner ruling, 25 Aug 2026).
**3 · THE TRIPWIRE — if either file passes 2,000 lines, the archive pass is DUE**, and it is
taken before the next feature build rather than "when there's time". Measure it, do not estimate:
`wc -l TODO.md HANDOFF.md`. `TODO.md` carries the full pass procedure and its acceptance
criteria in its §1 queue.

---
## ⤵ moved 9 Sep 2026 from HANDOFF.md — 8 Sep 2026 — "Vacation Auction 8 Sep 2026 V1" — §188: THE DOCS PASS, RUN. NOTHING LOST. NOTHING BUILT ON EITHER SITE.

## 8 Sep 2026 — "Vacation Auction 8 Sep 2026 V1" — §188: THE DOCS PASS, RUN. NOTHING LOST. NOTHING BUILT ON EITHER SITE.

Opened with START-HERE attached (read from disk, md5 `1452e5ec…`); ritual clean: live 329/169/18 and 151/51 fetched twice, all four
repos clean and in sync (his 22:47/22:48 UTC pushes `b49a18e` / `f078c94`), three `maintenance.lock`s from the fetch moved to
`_to_delete/`. His *"yes, go"* on the approved plan (`tests/docs/DOCS-PASS-PLAN-2026-09-07.md`, §8 order). **Pre-pass SHAs: hub
`b49a18e`, tests `f078c94`.** Built in a cloud clone of the hub at `b49a18e` with `tests/docs` staged beside it; shipped to the Mac as
one zip, unpacked per file, md5-verified.

**What the pass did.** `docs-pass-check.mjs` (the lossless guard — red on a planted deletion, green on the untouched tree, then green
on the finished pass: 7,376 pre-pass lines, 0 unaccounted for). `archive.mjs` (one section per call, verbatim, into `<file>-ARCHIVE.md`;
refuses DECISIONS, non-unique headings, protected parts; tested). `status.mjs` gained the DOCS GATES: the MAP on START-HERE's first
screen generated from each file's line-2 `<!-- answers: … -->` note (24 files; a file with no note fails — the two site-repo
`BUILD-LOG.md`s were left untouched, a push there being a deploy, so `status.mjs` carries built-in notes for those two), tripwires 350 / 700 / 900
as a non-zero exit, the DECISIONS index generated from the headings (197 rulings; 114 status words filled by hand, the rest blank),
the never-re-raise § check, archive sizes in the STATUS block. HANDOFF: 34 dated entries archived after their lessons were promoted
into a new permanent STANDING TRAPS section (six groups, one line per trap, dated); the maintaining section and checklist step 2
edited in place for the new destinations and numbers. TODO: 43 sections archived; what remains is the STATUS block, the open queue
(the rehearsal's O-A…O-D/O-F, his-call items, the three kept owner sections, test gaps), the CLOSED / DECLINED table (32 rows),
the accepted residuals, the deferred items, and the schedule pile as pointers. START-HERE: the whole pre-pass file moved to
`START-HERE-ARCHIVE.md` under a search-hint table; the new file is rules + map + lookup paragraph. DECISIONS: an index prefix only;
the body proven byte-identical (`diff <(git show b49a18e:DECISIONS.md) <(tail -n +210 DECISIONS.md)` empty).

**Sizes (lines, before → after):** START-HERE 676 → 163 (with the map) · TODO 1,677 → 221 · HANDOFF 2,011 → 722 + this entry ·
DECISIONS 4,794 → 5,003 (index rows only). Archives: HANDOFF-ARCHIVE 1,520 · TODO-ARCHIVE 1,700 · START-HERE-ARCHIVE 816.
HANDOFF did not reach the plan's ≈500: the never-archived parts (checklist, maintaining, PART A–D, the new traps section) are ~600
on their own; the 900 tripwire is what is enforced.

**Gates:** `docs-pass-check.mjs` exit 0 · `node status.mjs` exit 0 (cloud, then on his Mac) · DECISIONS body diff empty · every
governing file under its tripwire · **the retrieval check: 12 / 12 found, 12 / 12 direct** (`tests/docs/DOCS-PASS-CHECK.md`
records the questions, answers and paths). No auction or schedule byte changed; no battery was due.

**Judgement calls made, recorded rather than asked (he approved the plan in full and said go):** (1) HANDOFF's lessons live in a
permanent HANDOFF section rather than in START-HERE §3, so START-HERE stays under 350 — the plan's "promote to §3" was read as
"promote to where rules of that kind live". (2) Every dated HANDOFF entry was archived — after promotion, none carried anything a
fresh session would act on that is not now in START-HERE, the traps, TODO or the archives. (3) Where a TODO section was trimmed,
the original was archived whole first, so the guard judges, not I. (4) Status words in the DECISIONS index were filled only where
the heading or a BUILD-LOG row says so; 83 rows are blank on purpose.

**Left for him:** push the hub (many files — no Summary-box trap) and `tests` (17 files: fifteen line-2 notes, this check record, `COMMIT-MESSAGE.txt`). Nothing to push in the site repos.
Then `node status.mjs` on the Mac must exit 0 (it will regenerate the map's "last changed" column and the STATUS block; that
is the churn the design accepts — the same churn `status.mjs` already caused in TODO). Delete the "docs pass FILED" line in
TODO §1 after the push. `_to_delete/` holds this session's zip, three lock files and the earlier lock folders — his to empty.

**Lessons, dated 8 Sep.** (1) `~` in the cloud container is `/root` — hit again while testing `archive.mjs` from a scratch
folder; the traps section now says so. (2) A `#`-level dated entry's section runs to the next `#`, so its `##` siblings must be
archived BEFORE it or they travel with it — `archive.mjs` documents the rule; the order of moves handled it. (3) A line changed in
place is a line the guard will name: edit, run the guard, and put the original in the archive's "edited in place" block —
cheaper than deciding by hand which lines changed.

Closing checklist run at the end of this entry: fetch (three public repos), chat reviewed (nothing ruled beyond §188's plan; the
four judgement calls above), no code touched, files accounted for above, `status.mjs` on the Mac, locks.

---
## ⤵ moved 9 Sep 2026 from HANDOFF.md — 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V2" — §189: USER ACTIVITY + KP E-MAIL DISABLE, BUILT AS ADMIN 330 / STAFF 170 / RULES. FILED, NOT PUSHED.

## 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V2" — §189: USER ACTIVITY + KP E-MAIL DISABLE, BUILT AS ADMIN 330 / STAFF 170 / RULES. FILED, NOT PUSHED.

Opened with START-HERE attached (read from disk); ritual clean: live 329/169/18 and 151/51 fetched twice, all four repos in sync, the hub's
two dirty files were `status.mjs`'s own post-push regeneration, three `maintenance.lock`s moved to `_to_delete/locks-2026-09-08-V2/`.
Context at open 134k. **Baseline SHA for this build: `b0ed735` (admin 329 / staff 169 / rules).**

**His ask, explored before anything was promised (§0 rule 1):** more data for the admin — last login with date, time and phase; active
bids now; "clean and easy to read"; suggestions. The exploration found the premise half wrong: the site recorded NO login time
(`welcomeLog` is a yes/no per address, marked only when a welcome sends) and NO per-user e-mail outcome (`mailStats` counts a month;
a queue entry dies on send). Offered A / B / C; he chose C and ruled the scope (§189): last login · "no bids this phase" (his name for
silent users) · last e-mail and whether it sent · a KP e-mail Disable with an unsubscribe note naming the Google address. Declined:
numbers remaining, an activity strip, time since last activity. Then the plan, then *"Go."*

**Built (cloud clone at `4508463`, tests staged from the Mac, md5-verified both ways):** staff `_recordLogin` at the end of
`completeSignIn` (after the board, never awaited, never throws) into `vacations/loginLog`; `_mailLogNote` on both pages beside every
`emailjs.send` — the failure branch notes and RETHROWS so every existing catch (strike count, queue retention, welcome log not marked)
is unchanged; the admin's User Activity page (`_activityRows` on the real `isCurrentPhaseBidAdmin`, `renderUserActivity`,
`clearActivityLogs`); `adminDisableEmail` → `__skip__` written FIRST, then `sendUnsubscribeNote` to the old KP address; Reset Auction
clears both logs; rules: both docs admin-read (`isAdminReadDoc`), loginLog own-key write, mailLog ≤1-row write, both out of the
catch-all, `dailysched` byte-identical. No ordering dependency between push and console paste — under the old rules the writes pass
via the catch-all and the admin read is public; the paste is the tightening.

**Gates, all run and read directly (no pipes):** `test-330-user-activity.mjs` 120 / 120, honesty on `b0ed735` 32 RED exit 1 (cloud AND
Mac); `test-high-fixes.mjs` re-anchored — its executed `completeSignIn` sandbox lacked the new collaborator (ReferenceError, legible),
fixed by adding `_recordLogin` to the fake world PLUS a stricter line (record after the board) that fails on 169 (`REPO_ROOT=/tmp/gh169`
proved it) and passes on 170; `rules-emu/assertions.mjs` gains the generation "User Activity logs (9 Sep)" — 28 assertions, 11 gates
that must fail on the old rules — **RA-2 is his run** (the jar is 403 from the cloud, checked again); battery **80 suites / 2,728
assertions exit 0** in the cloud and on the Mac, no skips (auction baseline left absent on purpose: the older honesty blocks are a
regression gate); isolation 36 / 36; every inline script `node --check` clean; Playwright sweep in the cloud **admin/cancel 361 ·
staff/cancel 13 · admin/confirm 294 · staff/confirm 13 clicks, 159 dialogs, 139 confirms, 0 errors** — Disable and Clear records
driven cancel + confirm, the sort buttons clicked; the lone staff/confirm `unlocated=1` is the known default-seed artifact (STANDING
TRAPS). **Adversarial fresh-agent review of the diff** (brief: what breaks the auction or the feature, nothing smaller): no confirmed
findings; nine areas checked sound; one observation — if a sign-in completes before the first `phases` snapshot, the record says
"before Phase 1" rather than "—" (one mislabeled row at worst; the sign-in screen already shows the phase by then).

**Delivered the three ways:** `COMMIT-MESSAGES.txt` (three repos, none a one-file commit), `firestore-rules.txt` (⚙️ caption, md5
`2999a64b…` = repo), `build-330-files.zip` → `_to_delete/xfer/`, unpacked per file with `unzip -p`, all ten md5s identical to the cloud.
BUILD-LOG row 330; §189 body extended with his go and the two judgement calls; TODO §1 box; START-HERE FILED line; `status.mjs` exit 0.

**Left for him (any order):** push `vacation-kp.github.io`, `tests`, the hub; paste the rules and Publish; run RA-2 (the new
generation must be green on the live rules). Then verify 330/170 twice and retire the FILED line. He said he will end this session
after this and have **a fresh session do the final audit** — his brief is in TODO §1's box. Rehearsal-era rows on User Activity:
🧹 Clear records, or Reset Auction. `_to_delete/` holds the zip, the tests tar and the lock folder — his to empty.

**Lessons, dated 9 Sep.** (1) "Data that's already available" was a premise, not a fact — the two things he most wanted were the two
the site never recorded; §0 rule 1 earned its keep before a line was written. (2) The extracted-code sandboxes are a fixture of
collaborators: adding a call inside a function other suites EXECUTE (`completeSignIn`) breaks them with a legible ReferenceError —
re-anchor stricter, prove the new line fails on the old build. (3) `grep exit=$?` after a pipe reports grep — rule 11, hit again on
the first honesty run; the second run read the exit directly.

**Pushed (same session):** auction `4f71695`, tests `459fc0f`, hub `a7566c9`; 330 / 170 / 18 served, fetched twice with different
cache-busters. **RA-2, his run:** 177 / 177 on the current rules; honesty against the old rules (`28bae0c` baseline) 19 red — Feed 4 / 4,
Bid holds 4 / 4, User Activity logs 11 / 11 — "BOTH: the current rules pass, and the old rules fail the new gates." **The 330 rules are
PUBLISHED in the console (his word, 9 Sep: "pasted")** — loginLog and mailLog are admin-read and contained-write on the live project. START-HERE's LIVE line
is 330 / 170 and the FILED line retired; BUILD-LOG row 330 carries the SHA and the RA-2 numbers; §189 marked LIVE. Three fetch locks moved
to `_to_delete/locks-2026-09-09-V2-push/`. **Next auction honesty baseline: `4f71695` (admin 330 / staff 170).**

**Closing checklist, run at his word ("run closing", 9 Sep 2026):** 0 · fetch on the three public repos — all `main...origin/main`, tests
judged from disk (in sync). 1 · chat reviewed — every ruling of the day is in §189 (scope, name, go, the two judgement calls, "pushed",
"pasted"); nothing raised and unrecorded. 2 · state files true — START-HERE LIVE 330 / 170, no FILED line, LAST REVISED 9 Sep; BUILD-LOG
row 330 with SHA + RA-2; TODO §1 carries only the one-line state and the next-session brief (the FILED box removed the turn the row
gained its SHA); `node status.mjs` exit 0, every governing file under its tripwire. 3 · code proven — the numbers above are from the
runs, honesty by explicit SHA `b0ed735` (32 red, exit 1 on both machines), 80 suites ran / 0 skipped on both machines, isolation 36 / 36,
`node --check` clean, sweep 0 errors, RA-2 177 / 177 by him. 4 · files — uncommitted on disk: `vacation-kp.github.io/BUILD-LOG.md`
(the SHA + RA-2 row edit) and the hub's DECISIONS / HANDOFF / START-HERE / TODO — all docs, their two commit messages are in the
outputs column; the cloud clone was at `4508463` when the build was made and is not a base for anything now. 4a · rubbish —
`_to_delete/` holds 13 MB / 27 files (this session's zip, the 11 MB tests tarball, the docs-pass zip, six lock folders, three loose
locks, a spent patch script) — his to empty; nothing loose in a repo; `firestore-debug.log` is gitignored where it sits.
5 · handed over: the next session opens with START-HERE and runs the final audit on 330 / 170 (his brief in TODO §1).

---
## ⤵ moved 9 Sep 2026 from HANDOFF.md — 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V3" — §190: THE FINAL AUDIT, RA-11. READ-ONLY. THREE FINDINGS AWAIT HIS RULING. NOTHING BUILT.

## 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V3" — §190: THE FINAL AUDIT, RA-11. READ-ONLY. THREE FINDINGS AWAIT HIS RULING. NOTHING BUILT.

Opened with START-HERE attached (read from disk); ritual clean: live 330 / 170 / 18 and 151 / 51 fetched twice with different cache-busters,
all four repos clean and in sync (hub `810fd06`, auction `a7c8f7d`, schedule `0a61585`, tests `459fc0f` judged from disk), three fetch
`maintenance.lock`s moved to `_to_delete/git-locks/`. TODO's STATUS block was stale (generated before his commits) — noted, regenerated
at the end of this session. Named V3 because V2 already heads today's earlier entry. Context at open 129k.

**His order:** *"Go with the audit. Ensure this includes a multi-agent review and adversarial pass."* Recorded as §190 the same turn.

**How it ran (the record is `tests/docs/RA-11-2026-09-09.md`, private):** cloud clone at the Mac's HEADs, `tests` tarred minus
`node_modules` and staged, every served file md5-identical Mac ↔ cloud (staff `f46bd976…`, admin `92e4eed0…`, rules `2999a64b…`).
Gates read directly: battery **80 suites / 2,728 assertions, exit 0, cloud AND Mac** (79 executed, `test-rules-emulator` skipped in both
sandboxes — his RA-2 of today, 177 / 177, is the coverage; auction honesty baseline left absent on purpose, regression gate on unchanged
bytes); isolation 36 / 36 both machines; `node --check` clean on 4 + 4 + 1 inline scripts. Then five independent review lanes from one
written brief (CRITICAL / HIGH only, cite the line you read, grep DECISIONS and the battery before calling anything a defect, a clean
lane is a valid result), a red-team agent that attacked the seams and executed extracted functions, and an independent verifier that
re-derived every surviving candidate from its own reads and executed the real functions in fixtures. Claude re-read the F1 sinks itself.
Agent spend ≈ 1.6 M tokens across the seven agents.

**Verdict:** the engine, caps, holds, floors, timer, close, results, phase and round boundaries, restore, auth, rules containment, spend
and the §189 code held against everything tried. Three findings survived the verifier — **F1** CRITICAL (insider precondition: three
admin report windows render a colleague's raw bid value unescaped into a same-origin window with a live opener; rules check the key,
never the value), **F2** CRITICAL blast radius (insider precondition, admin-recoverable: no size bound on own-key bid-doc writes, one
shared 1 MiB document), **F3** HIGH (no precondition: the FTE-overage dial never unlocks in any real between-phases gap — a second
client lock, older than the build-268 gap unlock; executed in three gap fixtures, refused in all three). Each needs his specific
decision under §92; the fix shapes are in the report; nothing was built. The red team's mail-quota HIGH was demoted by the verifier to
a documented operating condition (runbook 25–41; est. 750–1,100 mails in Phase 1 vs 2,000 / cycle). Below-the-bar items are listed
once in the report §3 and NOT queued.

**Paperwork this session:** `tests/docs/RA-11-2026-09-09.md` (new, with its line-2 answers note); RA-10's note no longer says "THE
CURRENT AUDIT"; DECISIONS §190 + index row; TODO §1 (the audit outcome and the three items awaiting his ruling, one line each);
this entry; `node status.mjs` re-run on the Mac. Two repos change — the hub and `tests` — neither a one-file commit. Delivered the three
ways: `COMMIT-MESSAGES.txt` in the outputs column, `<repo>/COMMIT-MESSAGE.txt` on disk, and the zip unpacked with `unzip -p`,
md5-verified per file. Memory correction from lane 1: users CAN cancel a bid on a projected-win week (rule removed 12 Jul 2026).

**Lessons, dated 9 Sep V3.** (1) The engines were audited for forged VALUES; the DISPLAYS never were — "the engine ignores it" is not
"the page ignores it". (2) A rules residual written for one dimension (value) said nothing about another (size); when a residual is
accepted, name what it does NOT cover. (3) Two gates AND-ed on one control, written at different times, can each be right and together be
always-false — execute the control in the state it promises, not just its parts. (4) An independent verifier that must EXECUTE the
claim killed one HIGH and hardened two CRITICALs — the second skeptic is worth its tokens.

**His ruling, same session:** *"go"* — asked which (a general go is not a §92 decision), he chose **F1 + F3 + F2** from written options
(§190). **BUILT as admin 331 + `firestore.rules`, honesty baseline `4f71695`.** Exploration first: every bid doc's per-user value is a
map (`{[user]:{[wk]:v}}`, `bidLowerings` `{used:n}`), `emailToUser` maps an address to a one-element list (collisions excluded), so a
key-count bound on `myInitials()[0]` is safe for every client shape. The edits, anchored and counted: three `${esc(b.bid)}` cells
(3980 / 7834 / 7935), `w.opener=null` after both `window.open` (7685 / 8168), `syncControls` and `_confirmSaveReviewThreshold` on
`cfgUnlockedNow()` alone with the status line and caption kept true, `var BUILD` 331 + `versions.json`, rules `ownMapBounded()` on the
bid-doc branch (60 keys; non-map own value left alone; no new document access).
**Gates, read directly:** `test-331-report-escape-threshold.mjs` 27 / 27 (executes the real builders, `openReportTab`, and the
threshold handler in five fixtures); honesty on `4f71695` **15 RED, exit 1**; `test-330`'s VERSIONS pin re-anchored (≥ and agrees
with `var BUILD` — what was ASSERTED moved, not what is true; its own honesty block untouched); `rules-emu/assertions.mjs` gains the
"Bid map bound (9 Sep, RA-11 F2)" generation — 10 assertions, 3 gates, **RA-2 is his run**; cloud battery **81 / 2,755 exit 0**
(emulator suite skipped, as always here); isolation 36 / 36; `node --check` clean; sweep **361 · 13 · 294 · 13 clicks, 159 dialogs,
139 confirms, 0 errors**; adversarial fresh-agent review of the diff: no findings (it re-checked `esc` hoisting, legitimate labels
unchanged, opener semantics, the gap freeze, every rules construct against forms already live in the file, every staff write shape,
the emulator seeds and gate polarity). **Mac, after the unpack (all 17 md5s identical): battery 81 / 2,755 exit 0; honesty on `4f71695` 15 red, exit 1; isolation 36 / 36; `status.mjs` exit 0 with the FILED line.**
**Delivered the three ways:** `COMMIT-MESSAGES.txt` (three repos; none a one-file commit), `firestore-rules.txt` (⚙️ caption,
md5 = repo), `build-331-files.zip` → `_to_delete/xfer/`, unpacked per file with `unzip -p`, every md5 identical to the cloud.
BUILD-LOG row 331 (*pending*); §190 ruling and status; TODO §1; START-HERE FILED line. This entry took HANDOFF over its 900-line
tripwire, so the 8 Sep V1 entry (the docs pass — its facts are §188, the plan doc and the retrieval check) was moved verbatim to
`HANDOFF-ARCHIVE.md` with `archive.mjs`; `status.mjs` exit 0.

**Pushed (same session):** auction `1a4e269`, tests `aa78be8`, hub `7781288`; 331 / 170 / 18 served, fetched twice with different
cache-busters. **Rules published in the console (his word: "updated rules"). RA-2, his run:** 186 / 186 on the current rules; honesty
against the old rules (`28bae0c` baseline) 22 red — Feed 4 / 4, Bid holds 4 / 4, User Activity 11 / 11, **Bid map bound 3 / 3** —
"BOTH: the current rules pass, and the old rules fail the new gates." START-HERE's LIVE line is 331 / 170 and the FILED line retired;
BUILD-LOG row 331 carries the SHA and the RA-2 numbers; §190 marked LIVE. Three fetch locks moved to `_to_delete/git-locks/`.
**Next auction honesty baseline: `1a4e269` (admin 331 / staff 170).**

**Closing checklist, run at his word ("run closing", 9 Sep 2026):** 0 · fetch on the three public repos — all `main...origin/main`,
tests judged from disk (in sync); nine fetch locks moved over the day to `_to_delete/git-locks/`. 1 · chat reviewed — his order, his
choice from options, "pushed", "updated rules" and the RA-2 numbers are in §190 (grepped on disk); the memory correction (cancel on a
projected-win week IS allowed) is in §190 and RA-11 §5; the lessons are above; the below-the-bar items are RA-11 §3 by his brief and
are NOT queued; the brief the lanes ran from is filed as `tests/docs/RA-11-BRIEF-2026-09-09.md` (it existed only in the cloud).
2 · state files true — START-HERE LIVE 331 / 170, no FILED line, LAST REVISED 9 Sep; BUILD-LOG row 331 with SHA + RA-2; TODO §1
carries the one-line state; `node status.mjs` exit 0, every governing file under its tripwire (HANDOFF 878 / 900 after the 8 Sep
V1 entry was archived). 3 · code proven — the numbers above are from the runs: battery 81 suites / 2,755 assertions exit 0 on BOTH
machines (80 executed, 1 skipped — the emulator suite, covered by his RA-2 186 / 186), honesty by explicit SHA `4f71695` 15 red exit 1
on both, isolation 36 / 36 both, `node --check` clean, sweep 0 errors (cloud), adversarial review of the diff no findings. 4 · files —
uncommitted on disk: `vacation-kp.github.io/BUILD-LOG.md` (the SHA + RA-2 row edit, a ONE-file commit), the hub's DECISIONS /
HANDOFF / START-HERE / TODO, and `tests/docs/RA-11-BRIEF-2026-09-09.md` (new, a ONE-file commit) — all docs, three commit messages in
the outputs column; the cloud clone is BEHIND origin since his pushes and is not a base for anything. 4a · rubbish — `_to_delete/`
holds 24 MB / 43 files (this session: the tests tarball, three zips, nine locks; earlier: the 330 zip, the docs-pass zip, a spent patch
script) — his to empty; nothing loose in a repo; `Claude outputs/`, `COMMIT-MESSAGE.txt` and `firestore-debug.log` are gitignored where
they sit. 5 · handed over: 331 / 170 / rules live; nothing queued on the auction; §92 and §164 stand; the schedule parked.

---
## ⤵ moved 9 Sep 2026 from HANDOFF.md — 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V4" — 331 VERIFIED END TO END (SERVED BYTES, CONSOLE RULES, LIVE SMOKE, APP CHECK); §191 THE RETURNED-BID SENTENCE, BUILT AS ADMIN 332 / STAFF 171. FILED, NOT PUSHED.

## 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V4" — 331 VERIFIED END TO END (SERVED BYTES, CONSOLE RULES, LIVE SMOKE, APP CHECK); §191 THE RETURNED-BID SENTENCE, BUILT AS ADMIN 332 / STAFF 171. FILED, NOT PUSHED.

Opened with START-HERE attached (read from disk); ritual clean: live 331 / 170 / 18 and 151 / 51 fetched twice with different cache-busters,
all four repos clean and in sync (hub `cc710af`, auction `ca923a2`, schedule `0a61585`, tests `b95a2bb` judged from disk); no locks before
the fetch, three `maintenance.lock`s after it, moved to `_to_delete/`. Context at open 118k.

**His question: "is there a useful check or confirmation for the recent build we did?"** Claude's reading: 331's repo bytes were proven every
way (tests, honesty, battery, sweep, review, his RA-2) but two inches between the repo and the world were not — the SERVED page vs the repo
(only `versions.json` had been fetched after the push) and the PUBLISHED rules vs the repo (RA-2 proves the file on disk, not what the
console holds). He chose all three offered checks, all read-only, run in his Chrome:
- **Served = repo:** `admin/index.html` (960,087 B) and `index.html` (287,081 B) fetched from origin (`x-cache: MISS`) hash SHA-256-identical
  to the disk copies at `1a4e269`; `mobile.html` and `versions.json` too. Method: `fetch` + `crypto.subtle` in a same-origin tab.
- **Console rules = repo:** the newest release in Firebase → Firestore → Rules (Today 10:15 AM, starred, no draft pending) read out of the
  CodeMirror model: 673 lines, 48,035 B + the trailing newline the editor drops = 48,036 B, SHA-256 identical to `firestore.rules`.
  `ownMapBounded` present. Note for next time: the Chrome extension redacts hex strings in tool output — return the digest as a byte array.
- **Live admin smoke:** he completed the Google popup; page runs BUILD 331, zero console errors across a full reload; the FTE-overage dial
  reads editable at 0.4 with "Phase 1 has not begun" (F3 as promised for the current state); Bids-by-Week report opened as a document —
  table rendered, `opener === null` (F1 live). No writes: the admin site logs no admin sign-ins (only the staff site writes `loginLog`).
- **App Check (he took the screenshots):** Cloud Firestore **Enforced**, 100 % valid / 0 % invalid; Authentication Monitoring (by the
  standing rule — never Auth), 93 / 7; the web app registered with reCAPTCHA v3; the key's Domains list = `anesthesia-kp.github.io` only,
  "Verify the origin" checked; Owners shows the single-owner triangle (explained, not acted on).
Struck by him: item 2 (e-mail end-to-end — his own live test is in the record) and the billing-alert half of item 3 (§171(3) "his and
handled" — Claude re-raised it and should not have). His "anything else?" twice: no.

**§191 — owner-found while reading the staff rules:** *"the bids are actually not returned until next phase starts."* Confirmed in code:
retirement is the Begin Phase batch (§71 boundary scrub) / Start Round — never Complete or Send Results; the sentence in the staff box, the
staff welcome e-mail and the admin's copy said "when the phase (or Phase 4 round) completes". His ideal (return at Send Results) pushed
back as a fairness-area engine change days from go-live; bidding is closed in the gap anyway, so the defect is what a user sees between
results and the next Begin. Options A (text) / B (text + gap hint) / C (keep the gap short) — **"Go with A"**, then his sentence verbatim:
*"Bids that do not win are returned to you when the next phase begins."* (his choice over the longer draft with the round and capacity
qualifiers). Deck checked at his ask: never carried the wrong sentence (slide 9 "subsequent phases", slide 34 "for the next phase") — no
change; adding the bullet to slide 33 for parity is his call. His question on the User Bids key chip "withheld AND on a bid" answered
from RA-10/§183: reachable only via restore, a stale tab, or a hand edit — never the UI's own paths.

**BUILT as admin 332 / staff 171** (edits made on the Mac with count-asserted `python3`, mirrored in the cloud clone, md5 identical both
ways): the sentence in three places, `var BUILD` 171 / 332, `versions.json`. `tests/test-332-returned-wording.mjs` (new): 19 / 19, executes
the REAL `buildWelcomeEmailBody` on both pages, plus the INVARIANCE that baseline box and baseline executed welcome bodies equal the current
ones once the one sentence is substituted; honesty on `1a4e269` **11 red, exit 1** (Mac and cloud). `test-166` / `test-319` S2 pins
re-anchored (the target moved, not the truth) — both still red on their own baselines (165: 11 red; 318/165: 55 red). Battery **82 / 2,774
exit 0** on BOTH machines; isolation 36 / 36 both; `node --check` 4 + 4 clean; sweep **361 · 13 · 294 · 13 clicks, 159 dialogs, 139
confirms, 0 errors** (the standing staff/confirm `unlocated=1`, unchanged since 323/167). No adversarial agent review — three sentence
substitutions and two build bumps, invariance-proven; said so in the BUILD-LOG row. `firestore.rules` untouched: no console paste, no RA-2.

**Paperwork this session:** DECISIONS §191 (+ index row, status FILED); BUILD-LOG row 332 (*pending*); TODO §1 FILED line; START-HERE FILED
line (LAST REVISED already 9 Sep); this entry, which took HANDOFF over its 900-line tripwire, so the 9 Sep V2 entry (its facts:
§189, BUILD-LOG row 330, the V3 entry) was moved verbatim to `HANDOFF-ARCHIVE.md` with `archive.mjs`; `node status.mjs` exit 0. Three repos change — auction (4 files), tests (3 files), hub (4 files) — none a one-file
commit. Delivered the three ways. **Pushed by him the same session:** auction `c0a5978`, tests `3344017`, hub `8148e84`; 332 / 171 / 18 served, fetched twice with different
cache-busters; the pushed page bytes md5-match the built ones. Two fetch locks moved to `_to_delete/`. START-HERE LIVE line 332 / 171, FILED line retired;
BUILD-LOG row 332 carries the SHA; §191 LIVE. **Next auction honesty baseline: `c0a5978` (admin 332 / staff 171).**

**§192 — the capacity-by-week report, his request after 332 went live:** Available as plain text; week labels green when the row's own
Available ≥ that week's Smart Lock Control, red when below (asked: "below Smart Lock Control", two states); legend; Excel the same. His side
question — does the phase dropdown change this report? — answered NO from code (271: cumulative by design). The one decision surfaced and
ruled: the colour is judged on the report's OWN Available (approved winners only), not Smart Lock's live remaining (which counts projected
bids mid-phase) — otherwise label and number could disagree. **BUILT as admin 333** (`CAPACITY_LEGEND_TEXT`, `_capacityWeekOpen`, `availCell`
plain, `wkCell` coloured with a hover title, xlsx `wkStyle` + legend row, `_capacityWeekRows` untouched). Gates: `test-333-capacity-colors`
30 / 30, honesty on `c0a5978` 19 red exit 1 (both machines); `test-capacity-float` harness given the builder's new inputs (45 / 45);
`test-332`'s whole-page length pin scoped to 332 / 171 after it went red on 333 (r16, within the hour — the box / welcome-body invariances
stay unconditional); battery 83 / 2,805 exit 0 Mac and cloud; isolation 36 / 36; `node --check` clean; sweep 361 · 13 · 294 · 13, 159
dialogs, 139 confirms, 0 errors (xlsx=3 — the capacity export ran in the confirm pass). Mac ↔ cloud md5 identical. FILED, not pushed.
His next ask, received while the gates ran: check that the Rules & Reminders are in a logical order (rules that build on another come
after it; shared topics adjacent) — a read-and-propose, no build without his go.

**333 pushed by him** (`a4d7fcc` auction, `b29d631` tests, `3776ff3` hub) while 334 was being built; 333 / 171 served twice; the pushed
admin bytes md5-match the built ones; START-HERE LIVE line 333 / 171; §192 LIVE. (His commit landed BEFORE the 334 edits touched disk —
checked: HEAD carries BUILD 333 / 171 and no numbers sentence.)

**§193 + §192 addendum — BUILT as staff 172 / admin 334.** Rules & Reminders: proposal from a whole-list read (the order was the order
of addition; strategy tips split, "Sniping" far from the timer rules, ATO stranded; gap — the page never said what the numbers are);
his rulings *"short one. Go with re-ordering plus the add."* then, mid-build, *"make the key with definitions in avail cap by week be
red/green"* and *"Also color code date and available with same coloring"* — folded into 334 as the §192 addendum (his later word
replaces the morning's plain Available). Deck slides 33–34 re-ordered at his ask (rendered through LibreOffice and looked at; all other
slides canonical-XML identical; the deck is also in the outputs column for him to re-send). Gates: `test-334-rules-order` 28 / 28,
honesty on `a4d7fcc` 11 red; `test-333` re-anchored 41 / 41 (honesty 25 red on `c0a5978`); `test-332`'s last 331-baseline pins scoped;
battery 84 / 2,844 exit 0 both machines; isolation 36 / 36; `node --check` clean; sweep 361 · 13 · 294 · 13, 0 errors. FILED, not pushed.
Lesson (r16 again, twice in one day): an invariance written against a fixed baseline is a proof for THAT build — scope it to the build
numbers it was written for the day it is written, not after it goes red.
**334 / 172 pushed by him** (`7862742` auction, `329e868` tests, `d085519` hub); served twice; pushed page bytes md5-match the build. LIVE line
334 / 172; BUILD-LOG row 334 carries the SHA; §193 LIVE. **Next auction honesty baseline: `7862742` (admin 334 / staff 172).**

**The deck check (his order: "run the deck, then close").** All 35 slides read against the live 334 / 172 pages and the LIVE configuration —
read off the site, not recalled: the staff page renders its rules panel before sign-in (anonymous bootstrap), so `#ruleMaxBids`,
`#ruleNpPhases`, `#rulePrioLock`, `#ruleBidFloors` and `#timerRulesInfoBody` give the live cap / NP phases / lowerings / floors / timer text
with no login and no write; the live `auctionConfig` (holidays, high-demand flags, summer range) is in the staff origin's
`localStorage.auctionConfigV1`. Live: HD = Thanksgiving W47 / Christmas W51 / New Year's W52 only; Ski Week W7; Spring Break W14 + W15;
summer May 30 – Sep 5 (W22–W36); cap 6 through Phase 2; NP Phases 3–4; lowerings 2 / 4 / 4 / 2; HD floor 5, no summer floor; 5-day window,
48 → 24 / 12 / 6 / 3 h at 10 / 12 / 14 / 16 days, quiet 12 AM – 7 AM. Every deck number and rule matched, including the 235 / 6.7 / 7.5
arithmetic and the 34-week Phase-4 extra. **One finding — slide 14:** "Red: already used on a week you are winning" is wrong; the staff
`bidPoolInfo` paints red every number on ANY current bid (winning, losing or under review) plus prior-phase wins. Proposed caption put to
him. NOT verified live: the per-week FTE values (slides 29–30) — the admin page was mid-rehearsal (Phase 3, live bids, Fair Play incidents)
when read, so no further clicks were made there; the deck matches the ruled 26 Aug supply table and the live values are his to set.
Note for the next reader: the live board had moved from "Not started" (this morning) to Phase 3 by the evening — his own walkthrough.
This paragraph took HANDOFF over 900 again, so the 9 Sep V3 entry (its facts: §190, BUILD-LOG row 331, `tests/docs/RA-11-2026-09-09.md`; its
lessons stand in the archive verbatim) was moved to `HANDOFF-ARCHIVE.md` with `archive.mjs`.

**Closing checklist, run at his word ("run the deck, then close", 9 Sep 2026):** 0 · fetch on the three public repos — all `main...origin/main`,
tests judged from disk (in sync at `329e868`); three fetch locks moved to `_to_delete/`. 1 · chat reviewed — every ruling of the day is in
DECISIONS (§191, §192 + its two addenda, §193) in his words; the struck items (his e-mail test; the billing alert, §171(3)) are in this entry;
the deck finding (slide 14) is put to him — his answer, when it comes, goes to §193. 2 · state files true — START-HERE LIVE 334 / 172, no FILED
line, LAST REVISED 9 Sep; BUILD-LOG rows 332–334 with SHAs; TODO §1 one line for the day, nothing queued; `node status.mjs` exit 0, every
governing file under its tripwire (HANDOFF 822 / 900 after the V3 entry was archived). 3 · code proven — numbers in the BUILD-LOG rows are from
the runs: final battery 84 suites / 2,844 assertions exit 0 on BOTH machines (83 executed, 1 skipped — the emulator suite; rules unchanged
all day, his RA-2 186 / 186 from V3 stands), honesty by explicit SHA for every new suite (332 on `1a4e269` 11 red, 333 on `c0a5978` 25 red,
334 on `a4d7fcc` 11 red), isolation 36 / 36, `node --check` clean, sweep 0 errors three times. 4 · files — uncommitted on disk: the hub's
DECISIONS / HANDOFF / HANDOFF-ARCHIVE / START-HERE / TODO and `vacation-kp.github.io/BUILD-LOG.md` (the two SHA rows — a ONE-file commit, clear
the Summary box); both docs-only; `tests` clean. Commit messages in the outputs column. The cloud clone is at `a4d7fcc` + the 334 patch and
is not a base for anything. 4a · rubbish — `_to_delete/` holds 17 MB / 22 files (he emptied part of it during the day; this session added the
tests tarball, three build zips, patches, locks) — his to empty. 5 · handed over below. **After the hand-over he ruled *"fix slide 14"*** — the deck caption corrected (one line, rendered), filed to
`tests/docs/` (md5 `0871d56e…`), recorded in §193; `tests` now has ONE uncommitted file (a ONE-file commit — clear the Summary box). Context at close ≈ 505k.
**Pushed by him** (auction, tests, hub — all docs / the deck). His last question: *"we did a lot here. is any audit indicated?"* Claude's reading: not a full
audit (prose and display only, engine untouched, invariance-proven, sweep clean) but a fresh-eyes diff review of `1a4e269 → 7862742`, because
none of the day's three diffs had a second reader. His choice: *"for a new session"* — queued as TODO §1's first item. Nothing else open.

**Lessons, dated 9 Sep V4.** (1) "Verified" had stopped one file short twice: the served page was inferred from `versions.json`, the published
rules from the repo file. The last inch is cheap to close and belongs in the post-push ritual. (2) A rules sentence written for the user is a
claim about the engine — the display audit of RA-11 (lesson 1 there) applies to PROSE too; the owner found it by reading his own site.

---
## ⤵ moved 11 Sep 2026 from HANDOFF.md — 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V5" — THE ROUNDS-AS-PHASES INVENTORY; ADMIN 335 THE CAPACITY PAGE (§194); THE 332–334 REVIEW CLEAN; STAFF 173 THE STALE CLOSED STATEMENT (§195). ALL PUSHED, ALL SERVED.

## 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V5" — THE ROUNDS-AS-PHASES INVENTORY; ADMIN 335 THE CAPACITY PAGE (§194); THE 332–334 REVIEW CLEAN; STAFF 173 THE STALE CLOSED STATEMENT (§195). ALL PUSHED, ALL SERVED.

Opened with START-HERE attached (read from disk); ritual clean: live 334 / 172 / 18 and 151 / 51 fetched twice with different cache-busters,
all four repos clean and in sync (auction `3971a23`, hub `7ca1177`, tests `fb33da9` from disk, schedule `0a61585`); no locks before the
fetch, three after it, moved. Context at open 126k; at close ~390k.

**His find at open — a P4R2 sim at "1 bid per user" gave 21 of 35 users a bid.** Read in code, not recalled: the simulator tops each user up
counting every live bid tagged Phase 4, and Start Round leaves Round-1 WINS on the live board, so the 14 skipped were the Round-1 winners —
O-F, already in the quiet-day pile. His real question: *"are there other things hiding with the same problem?"* — and *"that makes me not
trust our audits."* Answered with an inventory of every phase-of-bid call site on both pages (23 admin + 6 staff): the deciding paths
(engine, round boundary, number consumption, Add-bid, dashboard no-bidders, User Activity, reports) all consult the round archives; the
round-blind leftovers are the simulator and ONE new label (O-G, Insights counts round wins) — filed. The structural cause named: a bid has a
phase stamp and no round stamp, so every new counter must remember the helper. His idea — stamp each round as its own phase, label it for
users — recorded under HIS CALL as a post-auction change (Claude pushed back on doing it pre-launch under §164; the money paths are round-
correct). His *"you remain confident…?"* answered as a reading, not a verdict: the engine yes, "smoothly" no — the runbook, untested load,
and label-class quirks named.

**§194 — admin 335, the Capacity page.** His sizing question → "small" from the code (`_capacityWeekRows` already existed, round-aware) →
his rulings: report's definition, calendar order always, filter All / Available / Not available, no sort, clean. Built as one sidebar page
under Change Log; 42/42 new suite, honesty 35 red on `7862742`, batteries 85 Mac + cloud, isolation, sweep with the panel walked, sandbox
screenshot, independent review no findings. Pushed `6f2b0e2`, served twice. The reviewer's aside — the report TAB prints admin-typed
holiday names and initials unescaped — was carried into the pending diff review.

**The 332–334 review (his V4 order) ran and closed CLEAN** at CRITICAL / HIGH: independent agent + Claude's byte re-check; two LOW
pre-existing insider-only notes recorded in `tests/docs/REVIEW-332-334-2026-09-09.md`, not queued.

**§195 — staff 173, owner-found from his screenshot** after a Reset Auction: "Phase 1 · not started" beside "Phase 4: Round 3 bidding is
closed". Cause: the statement is painted at an expiry and its only clearing call sat below the not-started early return. His *"go"*; then
*"plus audit the fix of course"* and *"any other stale banners that could happen like this?"* — the audit approved the line, proposed a
hardening (recompute on every phase change) and found the sibling (timer OFF after an expiry left the statement above a live board; Close
with the timer off never showed it). His *"do both. go."* → 173 = three additions; 30/30, honesty 10 red on `1d056d4`, batteries 86 Mac +
cloud, sweep clean, a SECOND adversarial pass tracing every admin timer write: clean. Pushed `c10b825`, served twice. Two display leftovers
from the hunt stay in TODO §1 unruled (board controls at a clock expiry; two LOW labels).

**Closing checklist run at his "close":** 0 fetch on the three public repos, all in sync, locks moved · 1 chat reviewed — §194 and §195 in
DECISIONS with his words; O-G, his rounds-as-phases idea, the two leftovers and the LOW notes in TODO; the two BUILD-LOG rows carry their
commits · 2 status.mjs exit 0 after archiving V4 (HANDOFF was at 840/900 before this entry) · 3 numbers above are from the runs · 4 git
status: only the docs-only follow-ups of this close are uncommitted, delivered as COMMIT-MESSAGES.txt · 4a `_to_delete/` holds the day's
xfer zips and lock folders — his to empty, not raised · 5 handed over in the chat.

**Lessons, dated 9 Sep V5.** (1) The device VM is Linux — `md5`, not `md5sum`, aborted an `&&` chain BEFORE the edit ran and only the
grep count showed it; the trap was already in STANDING TRAPS (1 Sep). Read that section at open, not after. (2) The §6 staged-baseline
trap bit again: copying the NEW page into the cloud clone and leaving the staged copy at `/mnt/user-data/uploads/…/admin/index.html` made
eight honesty blocks run against the new build. Move the staged copy aside the moment it is copied in. (3) Two invariance assertions failed
on BOTH builds — the assumptions were wrong, not the code; rule 12 held. (4) Asking "what else has this shape?" after an owner-found defect
paid twice today (O-G; the timer-off statement) — make the class hunt part of every owner-found fix's audit brief.

---
## ⤵ moved 11 Sep 2026 from HANDOFF.md — 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V6" — THE SHIPPED §195 BULLET REMOVED (pushed `6b74b8f`); THEN §196 DESTINATION OF THE DAY: LIST, 100 LICENSED PHOTOS, BUILT AS STAFF 174 / ADMIN 336, GATED, PUSHED `158d81e` AND SERVED TWICE.

## 9 Sep 2026 — "Vacation Auction 9 Sep 2026 V6" — THE SHIPPED §195 BULLET REMOVED (pushed `6b74b8f`); THEN §196 DESTINATION OF THE DAY: LIST, 100 LICENSED PHOTOS, BUILT AS STAFF 174 / ADMIN 336, GATED, PUSHED `158d81e` AND SERVED TWICE.

Opened with START-HERE attached (read from disk); ritual clean: live 335 / 173 / 18 and 151 / 51 fetched twice with different cache-busters,
all four repos clean and in sync (auction `d518121`, hub `60952ff`, tests `cfa79de` from disk, schedule `0a61585`); no locks before the
fetch, three after it, moved to `_to_delete/locks-2026-09-09-V6/`. Context at open 124k.

**Found at open, fixed at his "fix docs":** TODO §1 still carried the pre-fix bullet for the stale "bidding is closed" statement — the
§195 mechanism and "one line, staff 173 … his decision" — after 173 had shipped and the NEXT line above it already said so. Removed; the
mechanism lives in DECISIONS §195, so nothing is lost. The NEXT line's hub SHA updated from `2f60e8d` to the V5 close commit `60952ff`.
`node status.mjs` exit 0; STATUS block and the MAP regenerated. No auction file touched; §92 untouched.

**§196 — his idea, ruled step by step, then built (the session ran into 11 Sep his time).** Idea → risk reading from the code (the hero is seen by every
returning user; feature Firebase-free; the pictures are the risk) → mockup of three looks → B chosen, then A, then A without the tile
(*"just right on the blue background"*), caption *"just location"*, phones *"both"*, admin switch above Reset Auction. The list: 100 from
Tripadvisor / Expedia / AAA / YouGov / Kayak, trimmed twice for variety and again by his taste (no people, more landmarks). The pictures:
Wikimedia Commons through his double-click `tests/destinations/FETCH-DESTINATIONS.command` (the cloud cannot reach Wikimedia); the
script grew a licence filter, a not-a-photo / historic / B&W / interior / people filter, short searches, a candidates mode (up to 8 per
place, he picks) and a named-file pin; seven fetch rounds, 100 / 100 licensed, `tests/destinations/manifest.json` is the record.
The build: staff 174 (`.dest-pill`, `DESTINATIONS`, `DEST_EPOCH`, `destinationIndexFor`, `renderDestinationPill`, hook in the adminSettings
listener, midnight tick), admin 336 (card + `toggleDestinationOfDay`, change-log sentences), `img/destinations/` (100 × 200px, 909 KB,
`CREDITS.md`), versions 174 / 336, rules untouched. Gates on the final bytes, both machines: suite 65 / 65 + honesty 57 red on `c10b825`
/ `6f2b0e2`, batteries 87 / 2,903 Mac and 2,902 cloud, isolation 36, sweep clean, `sweep/dest-pill-check.mjs` 12 / 12 (a Chromium-driven
check of the pill itself — rule 9), two adversarial passes (no CRITICAL / HIGH; two LOWs fixed). He pushed the same session: auction `158d81e` (105 files), tests `94483ef`, hub `34b5550`; 174 / 336 fetched twice with different
cache-busters, `CREDITS.md` served (100 rows), the day-1 picture served (the fetcher reports "image content", not a 404). START-HERE live
line updated, FILED line removed; `status.mjs` exit 0. Closing checklist run: 0 fetch (in sync, one lock moved) · 1 chat reviewed — every
ruling is in §196, the picture taste in the record · 2 state files true · 3 numbers from the runs · 4 only this close's docs are
uncommitted (auction BUILD-LOG commit column + hub) · 4a `_to_delete/` holds the fetch rounds and xfer zips, his to empty · 5 handed over. After the push: random-per-load asked and declined (*"leave as it is"*); deck slide 13 re-shot with the pill. He pushed the closing docs too: auction `4068f73`, tests `78afcc5`, hub `6702528` — all four repos
clean and in sync at close; 174 / 336 re-fetched live. Context at open 124k; at close ~683k (his "stop by 700k"). The only uncommitted
residue is `status.mjs`'s own post-push regeneration (STATUS timestamp, the map's dates) — the same as every close; no push needed.

**Next session:** nothing queued on the auction; the auction is closed under §92 / §164. Honesty baseline `158d81e` (staff 174 / admin 336).
The deck is current. `_to_delete/` is 178 MB (fetch rounds, xfer zips, lock folders) — his to empty.

**Traps met today (for STANDING TRAPS if they recur):** (1) `status.mjs` reads file mtimes in UTC — after 17:00 PDT an edit "happened
tomorrow" and the LAST REVISED gate stamps tomorrow's date; harmless, but the date in START-HERE runs a day ahead in the evening. (2) The
staged-copy trap (§6) bit once more: the cloud battery ran 8 honesty blocks against the CURRENT admin page until the staged copies at
`/mnt/user-data/uploads/…` were moved aside — now done the moment they are copied in. (3) Commons search ANDs every word: long, specific
queries return nothing; 2–3 words work. (4) `device_stage_files` takes at most 50 paths per call. (5) Playwright 1.6x wants
`chromium_headless_shell-<rev>/chrome-headless-shell-linux64/chrome-headless-shell` — a second symlink beside the `chrome-linux64` one.

---
## ⤵ moved 14 Sep 2026 from HANDOFF.md — 11 Sep 2026 — "Vacation Auction 11 Sep 2026 V1" — NOTHING LEFT TO BUILD; THE GO-LIVE RUNBOOK GETS ITS PRE-FLIGHT (§197), PUSHED `be6a46b`. GO-LIVE NEXT WEEK; CLAUDE PRO FROM 12 SEP.

## 11 Sep 2026 — "Vacation Auction 11 Sep 2026 V1" — NOTHING LEFT TO BUILD; THE GO-LIVE RUNBOOK GETS ITS PRE-FLIGHT (§197), PUSHED `be6a46b`. GO-LIVE NEXT WEEK; CLAUDE PRO FROM 12 SEP.

Opened with START-HERE attached (read from disk); ritual clean: live 174 / 336 / 18 and 151 / 51 fetched twice with different cache-busters,
all four repos clean (auction `4068f73`, schedule `0a61585`, tests `78afcc5` from disk, hub `e9416f6`), no locks before or after. `git fetch`
over the bridge FAILED today — the device proxy answered 403 for github.com on all three public repos — so origin/main was read from the
cloud with `git ls-remote` instead (all three equal to disk). Context at open 130k.

**His question:** anything at all left for the vacation site, with Max ending 12 Sep and go-live next week. Answer: no code (queue empty,
§92 / §164), one docs gap — the go-live runbook predated 329–336. **His go:** *"Do the runbook update please. keep it concise, but thorough.
Ensure all decisions that need to be made are listed so that auction begins without a hitch."* Delivered as a new §0 pre-flight plus the
329–336 features (§197 has the full list); every claim read off the admin code (`FROZEN_CONFIG_KEYS`, `clearEverything`, the 🧹 handler,
the holds release path) or the 7 Sep rehearsal record, never recalled — two memory errors caught that way (🧹 wipes ALL records; a hold can
be released on User Bids). Delivered per the outputs rule (COMMIT-MESSAGES.txt + zip → `_to_delete/xfer/` → `unzip -p` into
`tests/docs/GO-LIVE-RUNBOOK.md`, md5 `9a1e7462…` both sides), then at his ask as a loose `.md` and a `.docx` (pandoc + styled tables, 6
pages — not in any repo). He pushed mid-session: tests `be6a46b` (the runbook), hub `f2a77d0` (the generated map / STATUS from
`status.mjs`), and emptied `_to_delete/` (176.7 MB → 20 KB). No served bytes changed; no battery run — nothing to prove.

**Recorded:** DECISIONS §197 (his question, his go, what the runbook now lists, go-live week of 14 Sep, Claude Pro from 12 Sep); START-HERE
§1 go-live sentence and fact (1) corrected in place ("days", the week of 14 Sep). **Next session:** nothing queued on the auction; the
auction is closed under §92 / §164. Honesty baseline `158d81e` (staff 174 / admin 336). The runbook is current to 174 / 336. Sessions
from 12 Sep run on Claude Pro — plan for smaller sittings (read-and-advise is cheap; a V6-sized battery-and-audit day is not).
Closing checklist: 0 origin read via cloud `ls-remote` (bridge fetch 403) · 1 chat reviewed — §197, START-HERE §1, this entry · 2 state
files true, `status.mjs` exit 0 · 3 not applicable (docs only) · 4 hub closing docs uncommitted (his push) · 4a `_to_delete/` 20 KB · 5
handed over. Context at close ~212k.

**Traps met today (for STANDING TRAPS if they recur):** (1) `git fetch` in `device_bash` got "403 from proxy after CONNECT" for github.com
— the device VM's egress allowlist did not include it this session, though it did on 9 Sep. The cloud sandbox reaches github.com, so
`git ls-remote https://github.com/anesthesia-kp/<repo>.git refs/heads/main` from `Bash` is the substitute for the three public repos.
(2) pandoc's docx tables carry no borders and equal column widths — set `tblW`/`gridCol`/`tcW` and a `tblBorders` on the Table style
after conversion, then render to check.

---
## ⤵ moved 14 Sep 2026 from HANDOFF.md — 11 Sep 2026 — "Vacation Auction 11 Sep 2026 V2" — THE BRIDGE-FETCH TRAP PROMOTED (§198), PUSHED `c30f0cc`. TWO GATE-HONESTY DEFECTS FOUND AND FIXED ON HIS ORDER.

## 11 Sep 2026 — "Vacation Auction 11 Sep 2026 V2" — THE BRIDGE-FETCH TRAP PROMOTED (§198), PUSHED `c30f0cc`. TWO GATE-HONESTY DEFECTS FOUND AND FIXED ON HIS ORDER.

Opened with START-HERE attached (read from disk); ritual clean: live 174 / 336 / 18 and 151 / 51 fetched twice with different cache-busters,
all four repos clean, no locks before or after. `git fetch` over the bridge failed again — origin read from the cloud with `ls-remote`
(auction `4068f73`, schedule `0a61585`, hub `0427704`, all equal to disk; `tests` `be6a46b` judged from disk, private). Context at open ~123k.

**Three of his turns, in order.** (1) *"Why this?"* — a challenge to Claude's own opening sentence, and it was right to be challenged.
Claude had written "no egress to github.com"; testing five hosts showed the device shell had NO egress at all, and the proxy stated its own
reason in a header (`X-Proxy-Error: blocked-by-allowlist`). A command-length hypothesis was tested and refuted. **His go:** *"go"* — promote
it to STANDING TRAPS. Six lines under THE MAC AND THE BRIDGE; pushed as hub `c30f0cc`. (2) *"this bridge fetch block seems new. makes me
feel like something is wrong"* — see the next paragraph. (3) *"if it's fine, just fix it and/or get rid of it"*, then *"then redo handoff"*.

**WHY THE BLOCK IS NOT A SIGN OF TROUBLE, tested rather than asserted — the answer a future session should reuse.** Probing eight hosts from
`device_bash` separates a broken proxy from a working one: `api.anthropic.com` answered **404** and `claude.ai` answered **403 from the site
itself**, so CONNECT succeeded and TLS completed for both — while github.com, npm, PyPI, Google, Firebase and `storage.googleapis.com` were
all refused at CONNECT. **The allowlist is not empty and the proxy is not broken: it permits Anthropic's own hosts and nothing else.** That
is a deliberate, functioning policy on Anthropic's side, not a fault of his Mac, his repos or his Firebase project. Blast radius is exactly
two things: `git fetch` and package installs from inside the device VM. It cannot touch the live auction (GitHub Pages), Firebase (reached
from his users' browsers), or his pushes (GitHub Desktop runs on macOS proper, outside this sandbox — he pushed twice during this session).
The batteries need no network: the auction battery was run on the Mac to prove it — **87 suites, 2903 assertions, all green, 21 s**.

**Built on his order — two gate-honesty defects, both `START-HERE` §3 r8 shapes (a gate that passes without testing). Full detail in §198.**
**(1) `status.mjs`'s "vs origin" column** returned "in sync with origin" as a FALLTHROUGH: the same green covered a true match, refs left
stale by the blocked fetch, and git failing outright — the old code answers "in sync with origin" for a directory that does not exist. Every
not-known case now says UNKNOWN, and refs older than a day are named as such. Gate: **`status-sync-test.mjs`** in this repo, 9 assertions
executing the REAL extracted `sync()`/`refAgeDays()` against throwaway git repos it builds itself — 9 / 9 green, honesty 1 / 9 exit 1
against an explicit copy of the previous file. **It is deliberately not `test-*.mjs` and not in `tests/`** — `run-all.mjs` discovers by that
name, and the auction battery must not gain a dependency on this repo three days from go-live. Auction battery re-run after the change:
87 / 87, 2903 assertions. **(2) The commit-message blank line** — `START-HERE` §3 now requires one after the subject.

**The lesson this session paid for, three times, and it is one lesson — SAYING A CAUSE INSTEAD OF TESTING ONE.** The opening report named
github.com because that is the host the failing command happened to touch; one `curl` elsewhere would have corrected it before it was said.
Verifying the `status.mjs` claim before writing it into a permanent file is what turned it into §198(1). And "it's probably just policy"
only became worth telling him once eight hosts had been probed and two of them answered. **A symptom seen through one door is not a
diagnosis** — START-HERE §3 r14 (*run it, don't recall it*) applied to Claude's own prose, not just to its assertions about code.

**Claude's own error, owned:** the first draft of `COMMIT-MESSAGE.txt` had a blank line after its subject; Claude REMOVED it to match the
archived house format, and git took all four lines as one 318-character subject. Checking whether that was new found §198(2) — it is not
new, no commit in any repo has ever had a body, and that is the mechanism behind his commit-length complaint. `c30f0cc` is left as it is.

**HE ASKED WHETHER THE DESTINATION FEATURE (§196) HAD A PROBLEM — IT DOES NOT, CHECKED LIVE, NOT FROM THE CODE'S INTENTIONS.** Read on
the served staff page in the browser pane (Chrome's extension was not connected): build 174, `#destPill` present and NOT hidden, name
"Plitvice Lakes" / "Croatia" — correct for day 1, which is today — image loaded at its real 200px natural width, href on the right Commons
page, page clock in Pacific. The specific risk worth checking was the rollover firing on UTC rather than his midnight, the same class as the
`status.mjs` mtime trap: it is NOT present — `destinationIndexFor` builds its day difference from LOCAL date parts (`getFullYear` /
`getMonth` / `getDate`) normalised through `Date.UTC`, so it turns over at midnight where the viewer is, and `_destMidnightTick` re-paints a
tab left open across it. Nothing to do. (`DESTINATIONS` and `destinationIndexFor` read as undefined from the console because the page's
script is an ES module and only `renderDestinationPill` was put on `window` — that is not a defect; check the pill's DOM, not the globals.)

**A STANDING ORDER, 11 Sep 2026, VERBATIM — now in `START-HERE` §1 above the 25 Aug line it generalises:** *"i want you to stop mentioning
things that i've already decided are for later. if it's not current, don't mention it. I'll ask for the tabled items when it's time."* Said
after Claude put the bridge-fetch block in the opening report and then in both handovers, and followed by *"if it can't be fixed and is not
a problem, why do you keep mentioning it?"* — a fair hit. **The rule for every future report: only what is live, what changed this session,
and what he must act on now.** The deferred pile stays filed and stays out of the summary; he will ask. Filing it is not the same as
surfacing it, and a settled item that cannot be acted on is not worth a line however interesting its diagnosis was.

**TODO's ▶ NEXT SECTION STRIPPED TO WHAT IS ACTUALLY NEXT, on his order (*"do it now"*).** He asked whether the list was growing.
Measured across the last twenty commits touching `TODO.md`: §1 went 13 → 22 items during 9 Sep and has been FLAT at 22 through every
commit since; today added two and removed two. The growth he felt was real but older than he thought — and the count hid the actual fault:
of eight bullets under ▶ NEXT, SEVEN were records of shipped, live work, each already carrying its BUILD-LOG row and its DECISIONS §.
That is the standing rule of this file skipped seven times ("the moment something ships, `TODO.md` is not its home"), and it is exactly how
the file reached 2,600 lines before. Every one of the seven was verified present elsewhere BEFORE deletion — nine BUILD-LOG rows, eight
DECISIONS headings, the two named audit documents and the archived 8 Sep entry all confirmed by grep. ▶ NEXT now holds the one genuinely
open item and the standing constraint. **The lesson for the paperwork step: the deletion is not bookkeeping, it is what keeps the list
readable — a NEXT section that is seven-eighths finished work reads as a growing pile no matter how little is actually outstanding.**

**Recorded:** DECISIONS §198 (his question, the tested answer, his two orders, both fixes and their gates). `TODO.md` 🙋 HIS CALL gained the
two findings and then LOST them again the moment they were built — one deletion per build, same turn. STANDING TRAPS gained the bridge-fetch
line. **Next session:** nothing queued on the auction; §92 / §164 hold; honesty baseline `158d81e` (staff 174 / admin 336). Go-live is the
week of 14 Sep. Sessions from 12 Sep run on Claude Pro.

**THE ARCHIVE PASS RAN, on his order (*"do that now actually"*), at 897 / 900 — promote first, then move.** Four lessons in the two 9 Sep
entries lived nowhere else and were promoted BEFORE anything was archived: **START-HERE §3 gains rule 17** — after an owner-found defect,
hunt the CLASS before fixing the instance (*"are there other things hiding with the same problem?"*), which is why an owner-found item
outranks the queue; and **STANDING TRAPS gains three** — `device_stage_files` caps at 50 paths per call, `status.mjs` reads mtimes in UTC so
after 17:00 PDT START-HERE's date runs a day ahead, and Wikimedia Commons search ANDs every word (2–3 words work), which his
`FETCH-DESTINATIONS.command` needs and a CRNA revival would need again. Rule 17 was appended, NOT inserted: §3 r8 / r11 / r12 / r14 / r16
are cited by number across these files and a renumber would silently repoint every one of them. Then `node archive.mjs HANDOFF.md --line`
moved **9 Sep V5 (47 lines) and 9 Sep V6 (40 lines)** to `HANDOFF-ARCHIVE.md`, each dry-run first and each verified lossless by the tool.
**HANDOFF 897 → 815 / 900.** Both 11 Sep entries were KEPT — V1's pandoc-docx-tables trap is still unhoused, and uncertainty keeps a
section (§101). A `grep -ciE` with `\|` alternations was silently matching a literal pipe and reported four promoted lessons as missing;
re-run with real ERE before believing any such sweep.

Closing checklist: 0 origin read via cloud `ls-remote` (bridge fetch 403) · 1 chat reviewed — §198, TODO, START-HERE §3 r17, STANDING TRAPS,
this entry, plus the ▶ NEXT strip and the "not current" standing order · 2 state files true, `status.mjs` exit 0 and converged (run 1 regenerates the MAP after archiving, runs 2 and 3 identical) ·
3 code proved — `status-sync-test.mjs` 9 / 9 with honesty 1 / 9 exit 1 on an explicit previous copy, auction battery 87 / 87 (2903
assertions) and isolation 36 / 36 on the Mac; the schedule's browser suites do NOT run there and were not run, a coverage hole and not a
pass; nothing served changed, so no build number and no BUILD-LOG row · 4 all four repos accounted for, seven files uncommitted in the hub ·
4a `_to_delete/` 20 KB, 3 files — a 4-byte write-probe Claude left there, the bridge cannot delete it · 5 handed over.

---
## ⤵ moved 14 Sep 2026 from HANDOFF.md — 14 Sep 2026 — "Vacation Auction 14 Sep 2026 V1" — STAFF 175, THE DESTINATION PHOTO HANGS SQUARE (§199), PUSHED `7a33311` AND SERVED. THREE GATE DEFECTS FOUND IN THE GATES THEMSELVES. HIS EXPIRY REHEARSAL: THREE DISPLAY ITEMS RAISED AND RULED FOR LATER.

## 14 Sep 2026 — "Vacation Auction 14 Sep 2026 V1" — STAFF 175, THE DESTINATION PHOTO HANGS SQUARE (§199), PUSHED `7a33311` AND SERVED. THREE GATE DEFECTS FOUND IN THE GATES THEMSELVES. HIS EXPIRY REHEARSAL: THREE DISPLAY ITEMS RAISED AND RULED FOR LATER.

Opened with START-HERE attached. Ritual clean: live 174 / 336 / 18 fetched twice with different cache-busters, disk identical, all four repos
clean, no locks. Bridge `git fetch` refused again (§198) — origin read from the cloud with `ls-remote`: vacation `4068f73`, schedule
`0a61585`, hub `f41bc77`, all equal to disk; `tests` `be6a46b` judged from disk, private. Nothing had moved since 11 Sep.

**HE FOUND IT ON HIS PHONE.** A screenshot of the live sign-in screen: *"Why is this image crooked?"* Read off the served bytes — deliberate,
`transform:rotate(-2deg)` on `.dest-pill img`, shipped with §196. Told it was one declaration and that the shadow could stay independently,
he said **"go"**. Built as staff 175: rotation out, shadow kept, nothing else. Full record §199; BUILD-LOG row 175.

**Gates:** full battery 87 suites / 2903 assertions / 0 skipped; static honesty vs `158d81e` 67 green / 1 red on exactly the new invariant;
browser sweep 15/15 on 175, honesty 12 green / 3 red reading −2.000° and aspect 1.28839. `node --check` clean ×4.

**LESSONS — all three are gate defects the run exposed, and all three are already-written rules biting (§199 has the detail):**
1. **r16.** The suite pinned `var BUILD = 174` and `versions.json === 174`. Literals like that need hand-editing every bump and assert
   nothing afterwards. Repointed to the invariant "versions.json equals each page's own BUILD var" — stronger, and permanent.
2. **r8, aim not bar.** A new geometry assertion went red on the CORRECT build: the staff page sets `body{zoom:1.15}`, so painted boxes are
   1.15× their laid-out size. **A gate that fires on the wrong thing is worth nothing — measure the page before asserting about its pixels.**
3. **r11, and the one worth remembering.** An accidental empty baseline (a `--depth 1` cloud clone has no history, so `git show <sha>:<file>`
   wrote nothing) revealed the new tilt assertion PASSING on a page with no photo at all — `transform null`, angle initialised to `0`.
   **An assertion that cannot distinguish the good state from the absent state is not an assertion.** The accident was the only reason it
   was caught; a clean baseline would have hidden it. Absence now fails legibly.

**A NEW TRAP, for STANDING TRAPS if it recurs:** a `--depth 1` clone in the cloud silently cannot serve `git show <sha>:<file>` for an
honesty fixture — it writes an EMPTY file and the run proceeds. Build every fixture from a repo with history, and check the fixture's BUILD
number before believing the run.

**He asked two questions and I got one of them wrong first time.** (1) Whether a long-open tab needs periodic re-login: no — "Remember me" is
ticked by default, Google and App Check refresh silently, there is no idle timeout, and the page reloads itself when a new build is published.
(2) He then challenged my claim that the ✎ / ✕ controls depend on an admin tab: *"Are you saying that an admin page needs to be open at timer
expiration?"* **Claude's first answer implied something functional hung on an open admin tab. It does not** — `timerNotExpired()` rejects late
bid writes on Google's clock. Corrected and owned in-chat; the architecture question he raised from it is filed in TODO §1 HIS CALL.

**PUSHED AND LIVE.** He pushed from his desktop the same afternoon: vacation `7a33311`, tests `8254b5e`, hub `5a9ad6b` (the hub in two
commits — the docs, then this entry and the state files). Staff 175 verified live twice with different cache-busters (index 175 / mobile 18
/ admin 336) and origin read from the cloud matches disk on all three. **Standing note for any build that follows: do not push while a phase
is open** — a push redeploys the live site and every open staff tab reloads itself within a minute of being looked at.

### The same day, continued — HIS EXPIRY REHEARSAL, and what it turned up

He then ran a rehearsal of the case he had never tested: **what the user site does when the timer expires with no admin page open anywhere.**
Three things came out of it; all are display-only, none is a defect in what the auction DOES, and **he ruled them all for later** (*"i'm ok
with the above staying as it is for now"*). They are filed in `TODO.md` §1, with the full mechanism, and are NOT queued:
1. The admin's **"Auction window — Nh" readout shows the STAGE length, not the stored window** — which is why a manual 1h looked like it
   "reset itself" to 48h a few minutes later. Nothing wrote; the countdown, the staff site and the server rule stayed on the stored 1h.
   The focus guard in `syncDurationUI()` is why it took minutes: the readout is skipped only while the slider holds focus.
2. The trap that follows from it, and the fact that **a manual window is temporary anyway** (any bid re-applies the stage length).
3. **The "bidding is closed" alert sometimes overlaps other text** — owner-found, not yet traced.
His direction for whenever the browser-dependency item is unparked, in his words: *"would be good to have the same events happen whether
admin is logged in or not."* Filed onto that item.

**One question answered with no change needed, recorded so it is not re-litigated.** He placed a bid during the rehearsal and the timer did
not reset. Five gates can stop a reset (timer off · already expired · same value · opening window · the Timer Reset Mode gate), plus the
extend-only skip. It was the **Timer Reset Mode**: mode 2 restarts the countdown only when a bid changes another user's projected outcome.
That is not a rehearsal leftover — `GO-LIVE-RUNBOOK.md` already carries it as a `confirm` row in the §0 pre-flight and explains it in §3, so
**mode 2 is the ruled live setting and the behaviour he saw is what the real auction will do.** No gap, nothing filed.

**A CORRECTION CLAUDE OWES THE RECORD.** Asked whether a long-open tab needs periodic re-login, Claude answered correctly (no — "Remember
me" is on by default, Google and App Check refresh silently, there is no idle timeout, and the page reloads itself on a new build), but then
added a sentence implying the staff board's ✎ / ✕ controls depend on an admin tab being open. **He challenged it** — *"Are you saying that
an admin page needs to be open at timer expiration?"* — and he was right to. `timerNotExpired()` rejects late bid writes against
`request.time`, Google's clock; enforcement does not involve browsers at all. An open admin page only makes the repaint prompt, via the
auto-lock write. **The lesson is §3 r14's: the claim came from a TODO note rather than from the expiry path, and a line not re-read sounds
exactly like a verified one.**

**Bridge note:** it dropped mid-filing when he walked away from the machine, exactly as the standing trap predicts. The call that died had
written NOTHING — verified by grep on return before re-running it, rather than re-running blind.

---

---
## ⤵ moved 15 Sep 2026 from HANDOFF.md — 14 Sep 2026 — "Vacation Auction 14 Sep 2026 V2" — STAFF 176, THE FLOATING MESSAGE BOX IS OPAQUE (§200). THE ADMIN-TAB DEPENDENCY WEIGHED AND LEFT WHERE HE PARKED IT. THE BRIDGE DROPPED AFTER THE GATES; DELIVERY IS BY BUNDLE.

## 14 Sep 2026 — "Vacation Auction 14 Sep 2026 V2" — STAFF 176, THE FLOATING MESSAGE BOX IS OPAQUE (§200). THE ADMIN-TAB DEPENDENCY WEIGHED AND LEFT WHERE HE PARKED IT. THE BRIDGE DROPPED AFTER THE GATES; DELIVERY IS BY BUNDLE.

Opened with START-HERE attached and no message — the ritual. Folder access had to be requested twice: the first
`device_request_folder_access` was refused by this session's own auto-mode policy before it ever reached him, and it
went through on his word. Ritual clean: live staff 175 / admin 336 / mobile 18 and schedule 51 / 151, each fetched
TWICE with different cache-busters, all equal to disk and to START-HERE's LIVE line; all four repos clean; the three
public ones fetched and in sync (auction `4251378`, hub `0d3dbd7`, schedule `0a61585`), `tests` judged from disk at
`8254b5e`. The fetch stranded `objects/maintenance.lock` in all three, as always — moved to
`_to_delete/locks-14sep-v2/`. Context at the report: 130,072. Raised with him, not acted on: TODO's STATUS block was
generated before his 14 Sep push and still reported five uncommitted files, so `node status.mjs` is due.

**His report and the exploration (§200).** The red box that appears when a user clicks a week after the clock has
expired with no admin tab open. Traced to `#errorMessage` / `.flash.err` — `rgba(239,68,68,.15)`, 15% opaque,
`position:fixed` at `z-index:100000`. It is see-through every time it appears; the expiry case is the worst because
the board already carries `#phaseClosedBanner` with the same sentence, and the floating box lands on it. The class
hunt (rule 17) came back clean: `.flash` exists only on the staff page; the admin uses `toast()`; the only other
fixed translucent background is the modal backdrop, which is meant to be translucent.

**His second question, answered with an inventory.** Exactly ONE automatic action is admin-only:
`_autoCloseOnExpiry()`. The mail queue is already relayed by any signed-in staff tab through the claim protocol;
`updatePhaseOpen` runs on both pages and writes nothing. And `timerNotExpired()` in `firestore.rules` rejects every
late bid against Google's clock regardless, so the lock is paint. Claude pushed back on his own preferred route —
staff write access to the admin-only `locks` doc, or server-side compute that does not exist in this project — and
he took the small fix: **"A alone. Go."**

**Built as staff 176.** One declaration: `.flash.err` background → `#fde3e3`, the exact composite of the old wash
over white. `var BUILD` and `versions.json` bumped together. Two lines of diff in `index.html`, one in
`versions.json`; the rest byte-identical.

**Gates.** New `tests/test-176-flash-opaque.mjs` 19/19 — the invariant is that EVERY rule anywhere in the page that
paints the box is fully opaque, so a later cascade override fails too; plus invariance on border, colour, position,
z-index, shadow and the click path. New `tests/sweep/flash-opaque-check.mjs` 27/27 — headless Chromium, desktop AND
phone, driving his exact scenario through the fake store: expired timer, locks untouched, 0 weeks locked, 52 painted,
click a week, then read the BROWSER-RESOLVED background (`rgb(253,227,227)`, alpha 1) with 4–6 text-bearing elements
underneath. Honesty on `7a33311`: static 2 red exit 1, browser 2 red exit 1 (alpha 0.15, both viewports). Three
mutations prove absence FAILS rather than passes (rule deleted 5 red, element deleted 2 red, a later translucent rule
2 red). Battery 88 suites exit 0 — Mac 2,922 assertions, cloud 2,921; isolation 36/36; `node --check` clean ×4; sweep
382 / 13 / 315 / 13 clicks, 163 dialogs, 144 confirms, **0 errors**. Mac ↔ cloud md5 identical on both pages,
`versions.json`, `firestore.rules`, `mobile.html` and the schedule pages. Before/after screenshots taken and read.

**Two traps this session walked into, both caught by our own rules.**
1. `test-audit-fixes.mjs` went red in the cloud only. Its honesty baselines are HARDCODED at
   `/mnt/user-data/uploads/GitHub/vacation-kp.github.io/index.html` — exactly where `device_stage_files` drops the
   CURRENT page, which START-HERE §6 warns about in writing. Proved it was the path and not the build by putting the
   PUSHED 175 bytes there: the same 4 assertions failed. Cleared the staged path (as on the Mac) and the battery went
   green. Those blocks want a pre-126 baseline; there is no correct file for them today, and this build's honesty
   gate is `test-176 --pre` on `7a33311`, which ran red.
2. The new suite's summary line omitted the `(N assertions)` token that `run-all.mjs` parses, so the battery headline
   under-counted by 19 while still reporting pass/fail correctly — a quiet gate defect of the rule-8 family. Fixed;
   the cloud total went 2,902 → 2,921. The Mac battery had run the PRE-FIX file; once the bridge came back it was re-run
   on the corrected file and the headline went 2,903 → 2,922, the predicted +19. Separately, Claude read an
   exit code through `| tail` and briefly reported a honesty run as exit 0 — the exact mistake rule 11 names. Re-read
   directly: exit 1.

**The bridge dropped after the sweep**, so the build was delivered to the outputs column as `build-176-files.zip`
rather than written into the repos. It came back when he returned: the zip was committed to `_to_delete/xfer/` and
unpacked file by file with `unzip -p`, all 11 md5-verified against the cloud copies, and the Mac gates re-run on the
final disk state (suite 19/19, honesty 2 red exit 1 read directly, battery 88 suites / 2,922, isolation 36/36).
Everything is now on disk and filed. **He pushed all three the same session — auction `595bf77`, tests `1a602ca`,
hub `daa259e` — and the live site serves 176, fetched twice with different cache-busters.** Next auction honesty
baseline `595bf77`. `_to_delete/` gained `locks-14sep-v2/`, `tests-176.tgz` and
`xfer/build-176-files.zip` — his to empty.

---

---
## ⤵ moved 17 Sep 2026 from HANDOFF.md — 14–15 Sep 2026 — "Vacation Auction 14 Sep 2026 V3" — STAFF 177, THE TEST-MODE BANNER (§201), PUSHED AND LIVE; THEN ADMIN 337, THE REPORTS PAGE (§203), BUILT AND FULLY GATED, AWAITING HIS PUSH.

## 14–15 Sep 2026 — "Vacation Auction 14 Sep 2026 V3" — STAFF 177, THE TEST-MODE BANNER (§201), PUSHED AND LIVE; THEN ADMIN 337, THE REPORTS PAGE (§203), BUILT AND FULLY GATED, AWAITING HIS PUSH.


**⛔ AND IT CAME BACK OWNER-FOUND THE SAME DAY — read `TODO.md`'s top item before anything else.** He reported the Reports tab "glitchy", then "sometimes reports opens blank, sometimes with data", and asked for a selector so only ONE summary shows at a time. **The lesson, which is the reusable part:** 337 copied the capacity page's refresh hook without asking what that shape DOES in a different medium. The hook writes `innerHTML` into a div — cheap and invisible. Assigned to an iframe's `srcdoc` it tears down and loads a whole new document, so every data change reloads both frames (measured: 1 load on open, +1 per change), and a reassignment landing mid-load can be dropped, which is what "sometimes blank" almost certainly is. **Copying a working pattern is not free: the pattern was correct for a div and wrong for a frame, and nothing in the gates could catch that because every gate asserted about a single render, never about what a SECOND render costs.** No gate in this project yet asks "what happens when this runs again, and again, while someone is looking at it" — that is the hole this defect came through.

**ADMIN 337 — THE REPORTS PAGE (§203), built the same session, after the 177 work above.** His ask: the Weekly
and User summaries shown in the admin site as an alternative to the pop-ups, sortable by phase / Phase-4 round /
all phases, plus the export buttons repeated at the top ("I know it's redundant, but I want it").

**Placement cost two screenshots and a flip-flop, and that is worth carrying forward:** "just above the capacity
section" was read correctly first (a nav panel), then Claude let his screenshot of the Dashboard card move the
placement as well as the report identity, and his second screenshot (the nav menu, Capacity circled) put it back.
The lesson is narrow and reusable — **a screenshot answers the question it was sent for; it is not licence to
revise a decision it was not about.**

**Also corrected in the record:** Claude had said both pop-ups came from `openSummaryTab`. That function has zero
call sites. The card's buttons call `exportPhaseResults` (headed "Bids by Week") and `exportUserSummary` — so the
card's label and the report's title disagreed, live. His ruling renamed the report.

**The design.** `reportDocHtml()` factored out of `openReportTab`; both exports given a `parts` mode; the page
asks for parts and hands them to that one document function inside sandboxed frames. Identity is structural, not
maintained. Render hooks copied from the capacity page, so the page costs nothing while it is not open.

**Gates:** 73/73 static, 53/53 browser (desktop + phone), honesty 57 red exit 1, battery 90 suites / 3,031
assertions (the predicted +73), isolation 36/36, sweep compared per panel on both builds.

**Six gate defects, found before the gate was trusted.** Three negative assertions passed vacuously on an absent
function — `[].every()` is true and a cleared frame is indistinguishable from "nothing ran". One could not tell
"not wired into the dashboard" from "does not exist". **One asserted the Excel sheet tab inside the WRONG
FUNCTION** — it matched a string in `exportDashboard`, so it passed on the old build; that is rule 8's
gate-aimed-at-the-wrong-thing, and only the baseline-pass listing exposed it. And `test-335`'s "Capacity sits
directly beneath Change Log" was a line-count pin the new menu item legitimately broke: repointed to the
invariant it stood in for (first nav group, after Change Log, before People), which holds on 336 and 337 alike.

**A gap Claude found and closed while he was away.** `openReportTab` serves FOUR reports, not the two this build
is about. A new `sweep/report-refactor-check.mjs` captured all of them on both builds: **Fair Play, User Summary
(both scopes) and Capacity are byte-identical 336 vs 337**; the three Weekly variants differ only by the agreed
rename; zero unexplained differences; the PDF branch still carries auto-print and the view branch still does not.

**Bridge behaviour to expect:** it dropped roughly every few minutes through the afternoon and then his Mac was
off for hours. The build and every cloud-runnable gate were done against a staged copy, delivered by zip, and
unpacked with `unzip -p` when he returned — all four files md5-identical both ways, and the device's admin page
verified as still the exact 336 the build was made on before anything was overwritten.

---

Opened with START-HERE attached and no message — the ritual. His machine's clock still read 14 Sep (22:34 PDT)
though UTC had rolled over, so this is V3 of the 14th, not a V1 of the 15th (§185: the date is HIS). Live
verified twice per site: auction 336 / 176 / 18, schedule 151 / 51, all matching disk. All four repos clean and
in sync; the fetch stranded `objects/maintenance.lock` in the three public repos as always — moved to
`_to_delete/locks-2026-09-14-v3/`. `status.mjs` was NOT re-run: its last run (18:09 his time) already reflected
the pushed state, and re-running would only rewrite its own timestamp and dirty a clean tree; its LIVE-line claim
was verified by hand instead. Two docs-only commits had landed past the V2 handover (auction `b4691d5`, hub
`ff38c5f`) — served bytes unchanged, which the live check confirmed.

**His ask, and the exploration that preceded agreeing to it.** A "Simulation Running / Auction Not Live" banner
on the staff site while his simulator is switched on, stacking cleanly for users who still carry the whitelist
notification. Claude did NOT agree on the shape until the code was read. What it found: the switch is Rehearsal
Mode, stored as `adminSettings.simulatorEnabled`; the staff page has ALWAYS listened to `adminSettings`, so the
value was already arriving on every user's page and was simply ignored (`simulatorEnabled` appeared nowhere in
`index.html`); that snapshot resolves BEFORE sign-in; and the read is already public in the rules. So the build
is one file, with no rules change, no new document, no new listener and no extra reads. Full reasoning in §201.

**A stale comment corrected in the record, not in the code.** The header above `toggleSimulator` still claims
rehearsal mode "REFUSES to turn on. No click-through." once Phase 1 has started. Build 223 replaced that with a
single red danger confirm. Claude read the function before repeating the comment, and told him his safety
argument rests on his discipline rather than a lock — which makes the banner more valuable than he framed it,
since today the only warning is on his own dashboard. The stale comment is logged for a later docs fix; the
auction code was not touched for it (§92).

**His rulings.** The persistent switch, not a transient "run in progress" flag (Claude argued the transient one
strands users behind a banner nobody can clear if the admin tab dies mid-run). Wording: see below — he revised it after the build. Placement: he chose login screen + board, then changed
it mid-build to **board only**. He added, unprompted: *"I want it to look clean and not have text over other
text."* — which is why the browser gate below is geometric.

**Built as staff 177.** Empty `#simModeBanner` one line above `#whitelistBanner`; `renderSimModeBanner()` beside
the whitelist banner's own function; three call sites — the settings listener, `render()`, and the sign-in path
before the board is shown. Only an explicit `true` paints it. Amber, normal flow, no z-index.

**Gates.** New `test-177-sim-mode-banner.mjs` 36/36 and `sweep/sim-mode-check.mjs` 101/101 (Chromium, desktop and
phone, whitelist present AND absent, every pair of laid-out boxes tested for overlap, scroll-proof of normal
flow, stack proved to close back to the same header y). Honesty vs `595bf77`: 32 red static, 4 red browser, both
exit 1. Battery 89 suites / 2,958 assertions exit 0 — the predicted +36. Isolation 36/36. `node --check` clean on
all four inline scripts. Button sweep run on BOTH 176 and 177 and compared row by row: every number identical,
including the standing staff/confirm `unlocated=1`, which this session confirmed pre-existing rather than
assuming it.

**HE REVISED THE WORDING AFTER THE BUILD, and was right to.** *"the current one can be confusing since people
would be able to place bids."* "Please check back shortly" implies the site is unavailable, when bidding works
normally during a simulation. His proposed replacement carried a second sentence saying active bids "are for
testing purposes only and are not real" — **Claude pushed back and he took the correction**: Rehearsal Mode is
not a sandbox, so a bid placed during a sim is a genuine write to the live documents and fires real confirmation
and outbid mail. That wording is the same error pointed the other way, and the worse one, because it invites a
careless bid that then stands. Final text, his ruling: "🎭 The site is currently in testing mode and the auction
is not live right now. Any bids placed during testing are part of the test and will not be counted." — a promise
about HIS process (he resets), not about the data. 177 was amended in place rather than becoming 178, because
nothing had been committed or pushed (HEAD still `b4691d5`, live still 176 — both verified, not assumed). All
gates re-run on the new text: static 36/36, browser 101/101 (the phone banner grew from 2 lines to 3 — 76px to
121px — and still clears the whitelist notification by 14px), honesty 32 red static / 4 red browser, battery
89 / 2,958, isolation 36/36. One gate defect the longer sentence exposed: the browser check's measure function
truncated element text at 80 characters, so its text assertion would have failed on length rather than content —
widened to 220 before it could produce a false red.

**He pushed all three mid-session** (auction `cda15f7`, tests `707defa`, hub `1207985`, all 15 Sep 07:00 his time — his clock had rolled past midnight, so this session keeps its "14 Sep V3" name while the push carries the 15th). Verified after the fact rather than assumed: local HEAD == origin/main, the PUSHED commit's `index.html` md5 `9001bc87…` identical to the gated disk copy, the pushed bytes carry the final wording and `var BUILD = 177`, and live `versions.json` read 177 twice with different cache-busters.

**Two things he raised this session, neither built.** (1) The board-level "Bidding is closed" message in a
centered pop-up like the bid-cap alerts — filed in `TODO.md` under HIS CALL with the shape, and with the catch
that the button sweep cannot dismiss `#centerAlertOverlay` and would silently under-test after such a change.
Raised, answered, UNRULED at the close of this entry. (2) A real sandbox — sized in three shapes and **TABLED by
him** (§202); filed, not to be surfaced.

**Three traps worth carrying forward.**
1. **Anchors must be counted before substituting.** Two of the six edit anchors matched TWICE (`renderWhitelistBanner();`
   appears in `render()` and in the confirm retry; the `typeof` guard appears in the whitelist snapshot and the
   sign-in path). The `count(old)==1` assertion caught both before anything was written.
2. **Build pins decay, and the decay is a real failure.** `test-176-flash-opaque.mjs` pinned `BUILD === 176`
   and went red the moment 177 existed. Repointed to the house invariant (a floor, plus `versions.json` agreeing
   with the page's own BUILD var) — the shape `test-173` and `test-174` already use. 177's own pins were written
   that way from the start.
3. **Negative assertions pass vacuously on an absent function.** In the first honesty run, three of 177's checks
   ("not a .flash box", "no z-index", "no Firestore write") went GREEN on the 176 baseline because the extractor
   had returned a stub. Each was widened to require the extraction to have succeeded first; honesty went 28 red
   → 32 red. This is rule 11 in miniature and it will happen again to any negative assertion.

**Cloud setup note.** The Mac has playwright installed but no browser binary, so the browser half ran in the
cloud: staged staff + admin pages (md5-verified against the device), the sweep harness as a 39 KB tar, and the
documented symlink shim for the playwright/chromium version mismatch (1243 expected, 1194 present — chromium
`chrome-linux`, and the headless shell as `chrome-headless-shell-linux64/chrome-headless-shell`). The public
HEAD's `index.html` md5 matched the pre-edit Mac copy exactly, so the audited baseline was provably the live page.

---

---
## ⤵ moved 1 Oct 2026 from HANDOFF.md — 15–16 Sep 2026 — "Vacation Auction 15 Sep 2026 V1" — ADMIN 338, THE REPORTS PAGE: ONE AT A TIME, AND THE OWNER-FOUND BLANK FIXED. PUSHED AND LIVE.

## 15–16 Sep 2026 — "Vacation Auction 15 Sep 2026 V1" — ADMIN 338, THE REPORTS PAGE: ONE AT A TIME, AND THE OWNER-FOUND BLANK FIXED. PUSHED AND LIVE.

**Rulings:** §204 (User first, choice remembered), §205 (only the selected report's buttons; a failed report says so). Record of the build: `BUILD-LOG.md` row 338.

**Pushed 16 Sep 2026** — auction `57ac389`, tests `5494f54`, hub `33a86fb`; `versions.json` served admin 338 on two cache-busted fetches; the pushed `admin/index.html` is md5-identical to the gated copy (`3a40a298…`), as is the new browser gate. All three commits again carry the whole message as the SUBJECT with an empty body (START-HERE's blank-line warning).

**The lesson — a test browser that cannot show the defect passes it.** The first reproduction ran 26 scenarios and found ZERO blanks, and Claude withdrew its "almost certainly" on that evidence. His four screenshots then showed the blank on any phase after leaving and returning. The difference was the BROWSER: desktop Chrome isolates a sandboxed frame in its own process; Playwright's headless shell does not. With `--site-per-process --enable-features=IsolateSandboxedIframes` it reproduced every time. Before believing a clean browser run about frames, pop-ups or anything process-shaped, ask whether the test browser is built like his. (START-HERE rule 9, in a new costume: what would still pass if the defect were REAL?)

**Three smaller traps.** (1) A listener added by a helper called twice doubles every count — make instrumentation idempotent. (2) A report stamp that is precise to the minute makes a "nothing changed" check flaky across minute boundaries; compare with the stamp stripped, never loosen to "≤1". (3) A textual check that reads "anything after function X" matches new code elsewhere; extract X's own body.

**Also this session:** a live check in his Chrome was tried with his OK — the admin sign-in did not complete from the automation tab and it was abandoned after one Continue click, nothing written. His credit limit paused the build at ~9:45 PM; a scheduled resume picked it up at 1 AM with the cloud workspace intact (bases md5-verified on both sides before continuing).

---

---
## ⤵ moved 1 Oct 2026 from HANDOFF.md — 17 Sep 2026 — "Vacation Auction 17 Sep 2026 V2" — THE 12:15 RESTART: V1's WORK WAS ALREADY COMPLETE. VERIFIED OFF DISK, TWO PAPERWORK CORRECTIONS. NO CODE.

## 17 Sep 2026 — "Vacation Auction 17 Sep 2026 V2" — THE 12:15 RESTART: V1's WORK WAS ALREADY COMPLETE. VERIFIED OFF DISK, TWO PAPERWORK CORRECTIONS. NO CODE.

**Why this session exists:** his instruction in §213 — at the usage limit, restart at 12:15 PM and continue jobs 1 and 2. **Both were already finished before the limit hit.** The restart's real work was therefore to prove that off disk rather than take V1's word for it, and to finish the close that the limit interrupted.

**Live at the open and at the close, fetched twice per site with different cache-busters:** auction admin **343** / staff **178** / mobile 18, schedule 151 / 51 — matching `versions.json`, the disk `var BUILD` lines and START-HERE's LIVE line. All four repos clean against `origin/main`; `tests` judged from `git log` (`6d692a3`) as always. The `git fetch` stranded `objects/maintenance.lock` in all three public repos again; all three moved to `_to_delete/` and the post-check found none. Context at the close: **~133,000 tokens.**

**What was verified, not assumed.** Job 1's record (`tests/docs/REVIEW-337-343-2026-09-17.md`, 7.5 KB, line-2 note present so the MAP picks it up) and job 2's runbook bullet (`GO-LIVE-RUNBOOK.md` §3) were both read end to end. Two of the review's load-bearing claims were re-run rather than re-read: the eight deleted slider symbols return **zero** hits across all three served pages, and `weekLedger` really does return `remainingApproved` (defined at 3081, consumed at 9393 / 9416 / 11208). Both hold. Nothing the site serves was touched (§92).

**Two corrections.** (1) `TODO.md` called the review session V2; the HANDOFF entry and the review file's own heading both say V1 — the file was the truth and TODO was fixed to match, before this entry made V2 a real session name. (2) The §213 index row's hand-kept status word was blank; the ruling's work is complete and docs-only, so it now reads **DONE**.

**One deviation from his words, deliberate.** He asked for the verdict at `REVIEW-336-343-2026-09-17.md`; V1 had written it as `REVIEW-337-343-…`. 336 is the BASELINE of the diff (`158d81e`), not a reviewed build, so the name on disk is the more accurate one — and it is already cited by START-HERE's MAP, `TODO.md`, §213 and the file's own heading. Renaming would touch four documents to make a name less true, so it was left and raised instead. **His call; one rename and four edits if he wants it.**

**Lesson, dated 17 Sep.** A restart brief is written before the interruption and describes the work as unfinished; the disk describes it as it actually ended. Read the disk first and the brief second — this restart's two jobs were both done, and a session that had trusted its own brief would have written a second review over a good one. The re-grounding ritual is what makes that cheap: an hour of duplicated work avoided by twenty minutes of reading.

---

---
## ⤵ moved 1 Oct 2026 from HANDOFF.md — 16–17 Sep 2026 — "Vacation Auction 16 Sep 2026 V1" — FIVE BUILDS, ALL PUSHED AND LIVE: STAFF 178 + ADMIN 339 · 340 · 341 · 342 · 343. THE TIMER CARD REBUILT.

## 16–17 Sep 2026 — "Vacation Auction 16 Sep 2026 V1" — FIVE BUILDS, ALL PUSHED AND LIVE: STAFF 178 + ADMIN 339 · 340 · 341 · 342 · 343. THE TIMER CARD REBUILT.

**What shipped** (every row in `vacation-kp.github.io/BUILD-LOG.md`; each served twice on cache-busted fetches, pushed bytes md5-identical to the gated copies):
- **staff 178 + admin 339** `970c4bc` — the Freeze wording (§206).
- **admin 340** `47643ee` — the report legend, "Result = admin decision ("—" = not yet decided)" (§207).
- **admin 341** `612cebe` — the Timer card rebuilt and contested weeks reopen (§208 §209), after the read-only **timer review** (`tests/docs/TIMER-REVIEW-2026-09-17.md`, T-1…T-10, R-1, and the close-vs-expire correction; probes beside it).
- **admin 342** `539e5ee` — Reset Timer, Expire timer now and on/off each ask twice (§210).
- **admin 343** `b07e675` — that second box styled like the Reset Auction warning (§211).
Final battery on the pushed bytes: **96/96 suites, 3275 assertions, 0 skipped.** The user site and `firestore.rules` were byte-identical through 341–343 — his hard line: *"how user bids effect the timer countdown and expiration … absolutely cannot break."* **Go-live moved to the week of 21 Sep** (START-HERE §1). Runbook §3 corrected, with the habit: after a countdown runs out, do not switch the timer off.

**Lessons, dated 16–17 Sep:**
1. **Read the click path, not the guard.** Claude said a tap under the Freeze showed "This week is locked…"; he said it does not, and the code agreed — locked cards have no click handler. A guard's message is not what a user sees unless something routes the user to it.
2. **Two actions that end in the same state are not the same action.** Claude said Close bidding "does the same job, better" than expiring the timer; he remembered otherwise and was right — Close sets a server flag that survives switching the timer off, expiry does not. Compare the WRITES, then the next action after each, before calling two paths equivalent.
3. **Name which stored number "the window" means.** The Timer card's controls, its readout and the bids each owned a different one; every finding in the review came from that.
4. **He pushes while Claude is still amending a build.** 341 went live without §210 mid-build, and the amendment had to become 342. Before editing a filed build, `git log` the repo — if it moved, the change is a NEW build number.
5. **Gate slips caught this session, each before a push:** an assertion aimed at a string also matched a display column (aim at the named function); helpers used only inside an OK handler were invisible to the extractor suites (keep them local); `|| true` slipped into a draft assertion; two honesty greens passed only because the button under test was absent; a new section crashed instead of failing on the old build (guard every `confirms[n]`).
6. **Dates are his.** Entries were first stamped 17 Sep while his clock read 16 Sep — `TZ=America/Los_Angeles date` before writing any date.

**Nothing open.** He declined the Excel legend (*"leave excel alone"*, CLOSED table). Everything else from the review is filed under HIS CALL.

---

---
## ⤵ moved 1 Oct 2026 from HANDOFF.md — 17 Sep 2026 — "Vacation Auction 17 Sep 2026 V1" — THE 337–343 REVIEW (CLEAN) AND THE RUNBOOK'S DOUBLE CONFIRMATION. NO CODE.

## 17 Sep 2026 — "Vacation Auction 17 Sep 2026 V1" — THE 337–343 REVIEW (CLEAN) AND THE RUNBOOK'S DOUBLE CONFIRMATION. NO CODE.

**Ruling:** §213 (his *"Go on 1 and 2."*). Read-only and docs-only — nothing `vacation-kp.github.io` serves was touched, and no build number moved. Live at the close, as at the open: auction admin **343** / staff **178** / mobile 18, schedule 151 / 51, each fetched twice with different cache-busters.

**What was done.**
1. **Fresh-eyes review of `158d81e → b07e675`** — admin 287/132 lines over 42 hunks, staff 45 lines: builds 337 (Reports page), 338 (one report at a time + the blank frame), 339/178 (freeze wording), 340 (report legend), 341 (Timer card rebuilt), 342 (ask twice), 343 (second box restyled), staff 175–177. **No CRITICAL, no HIGH.** Three LOW notes recorded, not queued. Full record: `tests/docs/REVIEW-337-343-2026-09-17.md`.
2. **`tests/docs/GO-LIVE-RUNBOOK.md` §3** gained one bullet: ↺ Reset Timer, ⏱ Expire timer now and the timer on/off switch each ask twice since 342/343; nothing is written until the second OK; that OK is dead for one second; the state is re-checked there; Reset Timer reads the chosen length at the FIRST OK.

**The four checks that mattered, and why they were the four.** A build that DELETES a control and RENAMES a ledger field fails in ways that report nothing, so the review went after absence first: (a) every removed slider symbol — `DUR_STOPS`, `durIdxFor`, `onDurSlider*`, `setDuration`, `syncDurationUI`, `getResetLabel`, `durSlider`, `durationDisplay` — grepped for across all three pages: zero references left, so the one-second tick cannot throw; (b) `weekLedger` really returns `remainingApproved` — had it not, Smart Lock would have listed no weeks and the reopen picker no months, silently; (c) the new extend-only gates match the staff page's identical comparison and the rules' `timerNotExpired()`, so no surface disagrees about what a reset means; (d) the four new Change Log types carry `scope:'system'` and the staff page filters system entries out of both of its views, so nothing new reaches a doctor's browser.

**Lesson, dated 17 Sep.** A clean battery is not a second pair of eyes. 337–343 each shipped green with their own suites, and the gap the review closed was not a defect but an unanswered question: *what did the deletions leave behind?* A suite asserts what someone thought to assert; a diff read end to end is the only thing that sees what is no longer there. The review took one session hour and found nothing — which is the outcome to want four days before go-live, and is worth the hour only because nobody could have said so beforehand.

**Housekeeping.** The `git fetch` in step 3 stranded `objects/maintenance.lock` in all three public repos, as it always does; all three moved to `_to_delete/` (the bridge cannot delete) and the post-check found none. His instruction for the day: at the usage limit, restart at 12:15 PM — a scheduled task bound to his Mac carries the full brief.

---

---
## ⤵ moved 1 Oct 2026 from HANDOFF.md — 17–19 Sep 2026 — "Vacation Auction 17 Sep 2026 V3" — NO CODE. TWO RULINGS (§215, §216), THE WALKTHROUGH DECK CHECKED, TWO DECK NOTES FILED.

## 17–19 Sep 2026 — "Vacation Auction 17 Sep 2026 V3" — NO CODE. TWO RULINGS (§215, §216), THE WALKTHROUGH DECK CHECKED, TWO DECK NOTES FILED.

**Shape of the session:** three working stretches across three calendar days, with the owner away between them. Nothing the auction serves was touched (§92); no build, therefore no battery — that is a correct absence, not a skipped gate.

**Live at every check, fetched twice per site with different cache-busters on 17, 18 and 19 Sep:** auction admin **343** / staff **178** / mobile 18, schedule 151 / 51 — matching `versions.json`, disk and START-HERE's LIVE line throughout. All four repos clean against `origin/main` at open and close; `tests` judged from `git log` as always. The `git fetch` stranded `objects/maintenance.lock` in all three public repos on each of the three fetches; every one moved to `_to_delete/`, post-checks clean. Context at the close: **~244,000 tokens.**

**§215 — his finding: Reset Auction left Rehearsal Mode ON.** The code was read rather than recalled: `clearEverything` writes exactly one settings key (`fteEditEnabled:false`, a merge), so rehearsal survives by construction, and only four call sites ever clear it — the two disarm switches, Begin Phase 1's refusal, and every restore. The runbook's step A already pairs the reset with a manual "then Rehearsal Mode OFF". Claude offered one runbook sentence saying a reset does NOT clear it (the T-6 / T-10 shape: a true instruction that never says what does not happen). **RULED *"do nothing, it's ok"*** — filed so a later session finds the ruling instead of re-reporting the behaviour as a defect.

**§216 — there is no roster-wide FTE total anywhere.** He updated user FTEs before go-live and asked for the new total; the page cannot answer. Every FTE sum in the admin page is PER WEEK (capacity / taken / available); the only roster-level FTE logic is validity gating (`usersTrulyMissingFte`, `usersOffGridFte`). He read all 35 rows off the screen in three screenshots and the sum was computed in code, with exact decimals, not mentally. **RULED a future build, not now** — PARKED, with the build shape recorded so it is not re-derived.

**The deck.** He thought `tests/docs/VacationAuctionWalkthrough.pptx` (last touched 11 Sep, at 174/336) was out of date. All 35 slides were read: it is **entirely staff-facing — no admin screen appears in it**, so every admin build since (337–343: the Reports page, the rebuilt Timer card, the double confirmations, the report legend) leaves it untouched, and the three staff builds since (176 opaque flash, 177 rehearsal banner, 178 freeze wording) only show in states the deck never pictures. Two real findings: slide 29's FTE-bidding total and its derived weeks-per-FTE both predate the FTE update; and slides 21 / 35 HARD-CODE the timer reset steps, while the staff site generates that list live from the stored timer rules — so the site is always right and the deck is right only while the stored values still match. **RULED *"too late to change, doesnt matter too much"***; both filed in `TODO.md` against the next deck rebuild.

**Deliberately not written into any repo:** the roster's FTE values and their total. These repos are PUBLIC and a department's staffing numbers do not belong in them — §216 and the deck notes describe the shape only. **Also not filed:** a Google Cloud marketing e-mail asked about (Cloud SQL) was answered in chat — wrong fit, no server tier, per-instance billing against Firestore's per-operation billing, no live listeners, and `firestore.rules` is the whole security model — but he gave no ruling, so nothing was recorded.

**Lesson, dated 19 Sep — a session can outlive its own date.** This one spanned three days with long gaps, and §215 was first stamped with the date from the opening ritual, a day stale; it was caught and corrected inside the same turn, heading, index row and TODO row together. **Re-read `TZ=America/Los_Angeles date` before stamping anything after any gap** — the opening ritual's date is a reading, not a constant, and §4 step 0's "the date is HIS" applies to every stamp in the session, not just the session name.

**Pushed by him this session:** `cc95923` (§215) and `e98900d` (§216 + deck notes). Both carry an empty body, so §214 is holding — but `cc95923`'s subject begins with a stray `o ` from the paste. Not amended: rewriting it means a force-push over good history, the same call §214 made.

---

---
## ⤵ moved 5 Oct 2026 from HANDOFF.md — 1 Oct 2026 — "Vacation Auction 1 Oct 2026 V1" — STAFF 182 LIVE (§221 · §222 #4 · §226): THE ALERT E-MAIL SAYS "ANY BID X OR BETTER WOULD ALSO WIN".

## 1 Oct 2026 — "Vacation Auction 1 Oct 2026 V1" — STAFF 182 LIVE (§221 · §222 #4 · §226): THE ALERT E-MAIL SAYS "ANY BID X OR BETTER WOULD ALSO WIN".

**State at hand-over.** LIVE: **staff 182 (`7bd76b4`, pushed 1 Oct 3:56 PM during live Phase 1 — his decision) / admin 344 (`14807e1`)**, served twice, pushed bytes md5-equal to the gated copy (`0bf98504…`). All four repos clean and level with origin before the closing docs. Nothing is queued to build now; the between-phase items (§220 rename, §223 Fair Play + §224 Struggling Users) still need plans and his go. **Watch after this push:** the first real cancel or lowering that qualifies sends the new line — if he reports one that reads wrong, the suite's scenario helpers (`world` / `act`) reproduce any picture in a few lines.
**Rulings this session (§226):** EmailJS subject is "Vacation Scheduler" (the §220 rename is code-only); "and makes your bid easier to beat" removed; the still-winning line opens with the cause ("Another bid on this week was withdrawn / lowered."); the Phase-4 extra FTE task is not to be mentioned until he asks; go given for the build.
**Built in the cloud** (clone md5-equal to the Mac; `tests` staged as a tarball), filed by zip → `unzip -p`, all eight files md5-equal both sides; the invariance proof and the battery (100 / 3,344) re-run ON THE MAC after filing. Gates: the BUILD-LOG row.
**Lessons.** (1) A new suite's wrong EXPECTATIONS were five of its first failures — the page was right each time (a two-slot week where the chance already existed; a combined-bid list). Check the scenario against the engine before blaming the code. (2) `npm install <one package>` inside `tests/` replaced the symlinked playwright with a newer one that had no browser; re-link the global one. (3) `pgrep -f` matched its own shell again (rule 8) — a ten-minute wait on a finished job. (4) The cloud container runs in HIS timezone; the Mac VM in UTC — two suites care (TODO test gaps). (5) An older suite (`test-staff-158`) caught that a missing helper would have cost the ordinary alert: the battery, not the new suite, found the build's one real weakness.

---
## ⤵ moved 6 Oct 2026 from HANDOFF.md — 22 Sep 2026 — "Vacation Auction 22 Sep 2026 V1" — NO CODE. THE PHASE 1 REMINDER DECK (§217), GO-LIVE PINNED TO THU 24 SEP ~9 AM, §212 WIDENED TO SESSION START.

## 22 Sep 2026 — "Vacation Auction 22 Sep 2026 V1" — NO CODE. THE PHASE 1 REMINDER DECK (§217), GO-LIVE PINNED TO THU 24 SEP ~9 AM, §212 WIDENED TO SESSION START.

**Live at open, fetched twice per site with different cache-busters:** auction admin **343** / staff **178** / mobile 18, schedule 151 / 51 — matching `versions.json`, disk and START-HERE's LIVE line. All four repos clean against `origin/main`; `tests` judged from `git log`. Both fetches (open and close) stranded `objects/maintenance.lock` in all three public repos; every one moved to `_to_delete/`, zero left. Nothing the auction serves was touched (§92) — no build, so no battery: a correct absence, not a skipped gate.

**The deck (§217).** Built in the walkthrough's measured style, revised through eight rounds of his direction, and FILED AS HIS OWN FINAL FILE byte for byte — `tests/docs/Phase1-Reminders.pptx`, md5 `e6d953bc…`, pushed by him as tests `0f2e962` (subject "…projection slide": he committed the final bytes under the previous round's message; not amended — a force-push over good history, the §214 call). Every transfer went cloud → `_to_delete/xfer/` → `cat` into the repo with `device_bash`, md5-verified each time.

**Go-live pinned:** Thursday 24 Sep 2026, about 9 AM (owner, 22 Sep) — START-HERE §1 and fact (1), and TODO's NEXT line, edited in place.

**§212 widened** — his words and the audit are in DECISIONS §212. The finding worth keeping: §212 said the rule was "in Claude's memory"; checked, it was not. It is now (read back 22 Sep), and START-HERE carries it both as a banner under the LIVE line and in §4 step 5. **Lesson: a record that says something was saved somewhere else is a claim like any other — read the other place before trusting it.**

**Lesson — his mid-edit copies.** Twice he edited the deck in PowerPoint while Claude was also changing it: once in a copy that never reached disk (a typo in a screenshot that no file on disk contained — found by md5 of both copies before overwriting anything), once in a copy built on an OLDER round (slides he had since asked to change). Before merging a returned file, diff its TEXT against every recent round to find its base, then carry his edits onto the newest one and report every remaining difference, word by word.

---
## ⤵ moved 6 Oct 2026 from HANDOFF.md — 25 Sep 2026 — "Vacation Auction 25 Sep 2026 V1" — STAFF 179 FILED (§218): THE TIMER SAYS WHEN THE PHASE CAN END. THE AUCTION IS LIVE.

## 25 Sep 2026 — "Vacation Auction 25 Sep 2026 V1" — STAFF 179 FILED (§218): THE TIMER SAYS WHEN THE PHASE CAN END. THE AUCTION IS LIVE.

**The auction went LIVE Thu 24 Sep, about 7:45 AM** (owner) — START-HERE fact (1) and §1 now say so. Live at open, fetched twice with different cache-busters: auction 343 / 178 / 18, schedule 151 / 51.

**Staff 179, built and filed, NOT pushed** — he pushes late at night or early morning. His layout, in five rounds (§218). Most of it was built in the cloud while the Mac was asleep or off (the bridge dropped six times); parked as `build-179-files.zip` in the outputs column with a RESUME note so no work depended on the container surviving. Filed only after the Mac's `index.html` was md5-matched to live 178 (`4dcddbca…`), then every file md5-verified after `unzip -p`.

**Gates:** full battery 97/97, 3,275 assertions, none skipped; new suite 21/21, honesty on 178 FAILED (18 red, 3 greens read); `test-173` repointed (its harness lacked the two new helpers) — old and new copies identical on 172 and 178; and, at his demand, the INVARIANCE PROOF (`tests/prove-179-invariance.mjs`) — allow-listed diff, function-by-function identity, 50,000 random states side by side — with four planted faults each caught.

**Lesson — a harness that runs one extracted function will break when that function gains a collaborator.** `test-173` extracted `renderCountdown` with a fixed list of its helpers; the new display calls made it throw. The fix is to extract the new REAL helpers (never to stub them, never to soften the site's code for the test) and to prove the repointed suite is unchanged on the builds it was written against.

**Lesson — proof by three independent routes.** The side-by-side run cannot see a changed timer calculation (it stubs those); the function-identity check can. The diff allow-list catches what function parsing might miss (markup, top-level code). Each negative control was caught by the part designed for it — say which part, never just "the proof failed".

---
## ⤵ moved 7 Oct 2026 from HANDOFF.md — 25–30 Sep 2026 — "Vacation Auction 25 Sep 2026 V2" — STAFF 180 LIVE (§219): THE 24H CHANGES LIST FITS ON A PHONE. 179 RE-PROVEN.

## 25–30 Sep 2026 — "Vacation Auction 25 Sep 2026 V2" — STAFF 180 LIVE (§219): THE 24H CHANGES LIST FITS ON A PHONE. 179 RE-PROVEN.

**179 re-proven on his ask (25 Sep):** *"confirm the previous build in the timer box didn't alter anything about timer function or auction function"* — `prove-179-invariance.mjs` re-run on the PUSHED bytes (`4c5a4df` → `1a243d5`) exit 0, three planted timer changes each caught, full battery 97/97, test-179's honesty on 178 FAILED (18 red). No files changed.

**Staff 180 — owner-found during live Phase 1, built on his go, pushed 30 Sep (`7b6659e`), served twice.** Everything is in §219 and BUILD-LOG row 180. The build changed shape once on evidence: the sketch made the list only as wide as the Popcornometer box, and the width sweep showed long names squashed onto two lines on 720–860 px tablets — the list now keeps its 360 px and is capped at the screen.

**Lesson — the sandbox's users are two-letter codes, and a layout check fed codes cannot see squashing.** The first width sweep reported "0 rows wrapped" everywhere, including where the list had shrunk to 248 px; with names of realistic length staged, 4 of 14 rows wrapped. A check whose inputs are smaller than real data passes on anything. `sweep/dropdown-180-check.mjs` stages long names on purpose.

**Lesson — a new suite's LAST line must be `N passed, M failed (K assertions)` or `run-all.mjs` leaves it out of the total.** 98 suites reported the same 3,275 as 97 had; the runner parses only that shape, and test-180's first last line ended in the file path — as test-179's still does (filed in `TODO.md` 🧪). The suite still gated (a failure throws); only the count lied. **Read the total against the previous run before believing it.**

**Rule 18 paid again:** test-180's honesty run on 179 kept B6 green by absence (no block on 179, so "nothing in the block touches the other list" was vacuously true); fixed to require the block. And the invariance proof missed an extra rule slipped into the same `@media` line — the static suite caught that control; the proof now pins the line exactly.

**The bridge dropped three times** (the Mac asleep); the public repo was read from a cloud clone meanwhile (same commit, md5-checked), and no file on the Mac was written until it was back.

---
## ⤵ moved 7 Oct 2026 from HANDOFF.md — 30 Sep 2026 — "Vacation Auction 30 Sep 2026 V1" — NO CODE. FIVE RULINGS (§220–§224): THE ALERT AND FAIR-PLAY WORK FOR THE NEXT BETWEEN-PHASE WINDOW, ALL PLANNED OR QUEUED, NOTHING BUILT.

## 30 Sep 2026 — "Vacation Auction 30 Sep 2026 V1" — NO CODE. FIVE RULINGS (§220–§224): THE ALERT AND FAIR-PLAY WORK FOR THE NEXT BETWEEN-PHASE WINDOW, ALL PLANNED OR QUEUED, NOTHING BUILT.

**Start:** staff 180 / admin 343 served twice each; all repos in sync after his 07:51 pushes; three `maintenance.lock`s moved to `_to_delete/`. **No served byte changed all session.**

**Queued for the next between-phase window — each needs a plan and his go (§92 / §164):**
- **§220** rename "outbid alerts" → projection-change alerts (wording only). First ask what the EmailJS template's SUBJECT says.
- **§221 + §222 #4 — staff build, PLAN COMPLETE:** `tests/docs/PLAN-221-LOWER-AND-STILL-WIN-2026-09-30.md`. One short line when a winner (still winning, or just became winning) could bid weaker and still win; fires once when the chance opens, only on another user's cancel or lowering; staff side only; same switch; no cut-off; engine and timer byte-identical.
- **§223 — Fair Play Monitor (admin; plus a staff part):** drop Slow start; flag winning-bid cancels / lowerings, and late moves, only when they affected someone; keep 10%; record the real time left (and whether the clock restarted) in each bid's change-log entry from the build on, and read that — entries from before carry no late flag.
- **§224 — Struggling Users (admin):** the floor fix only.

**Declined today (in `TODO.md`'s table):** alert inventory #1–#3, #5–#8 (§222); Struggling Users extras and the section rename (§224). Inventory: `tests/docs/ALERT-EVENTS-INVENTORY-2026-09-30.md`.

**Found, by reading the code (filed, not fixed):** (1) the Fair Play "Late-timer move" replay assumes every bid restarts the clock (reset mode 1) while mode 2 is live per the runbook, so it can miss late moves (§223); (2) the Struggling Users "can improve" test hard-codes high-demand weeks to numbers 1–4 while the floor is 5 or better (§224) — the only hard-coded floor in either page.

**Lesson — a heuristic screen silently goes wrong when a setting changes the premise it was written on.** The Fair Play replay was correct for mode 1 and nobody re-read it when mode 2 was chosen for the live run. When a setting changes how the auction behaves, grep for every screen that RE-DERIVES that behaviour rather than reading it.

**Lesson — Claude changed position twice on evidence, and said so:** "B is safer than A" fell when he required the alert to fire only when an action could help (that needs A's what-if); and "a tie means Under Review" was corrected while finalising the wording (tied bids that cannot both fit lose the week).

---

---
## ⤵ moved 9 Oct 2026 from HANDOFF.md — 1 Oct 2026 — "Vacation Auction 1 Oct 2026 V2" — STAFF 183 / ADMIN 345 LIVE (§220 · §223 · §224 · §227).

## 1 Oct 2026 — "Vacation Auction 1 Oct 2026 V2" — STAFF 183 / ADMIN 345 LIVE (§220 · §223 · §224 · §227).

**State at hand-over.** LIVE: **staff 183 / admin 345 (`aa10c51`, pushed 1 Oct about 5:17 PM during live Phase 1 — his decision)**, served twice, pushed bytes md5-equal to the gated copies (staff `79dcd87a…`, admin `36379b08…`); tests `9004ee7`, hub `9820f6e`. All four repos level with origin before the closing docs. Nothing is queued to build. **Watch after this push:** the first bids made on 183 are the first change-log entries to carry `tRem` / `tDur` / `tReset` / `aff` — if the Fair Play report ever looks wrong, open the Change Log and read those fields on the entry.
**Rulings (§227):** *"1 - build now and i'll push when ready.  2 - that's fine.  3 - a.  4 - good.  5 - make sure it's accurate with the selected timer settings."* and, on stalling for old entries, *"good.  proceed."*
**Built ON THE MAC** (`device_bash`, python patches that refuse to apply twice; no cloud clone), the battery run there in the foreground. Gates and review: the BUILD-LOG row and `tests/docs/REVIEW-183-345-2026-10-01.md`.
**What the monitor shows after the push:** only bids made on staff 183 carry late-timer, stalling or winning-bid flags. Phase 1's earlier flags are gone from the report by his rulings — if he asks where they went, that is the answer. The report itself does NOT say so: he had the explanatory footnote removed (*"remove that footnote"*, same session).
**Lessons.** (1) `grep -o` with a fixed window HID a user-visible "outbid" on a 900-character line; the new suite's "nowhere outside comments" assertion found it. Assert the absence, do not eyeball a grep. (2) A heredoc over about 16 KB fails with `E2BIG` on the bridge — write the file in the cloud, `device_commit_files` to `_to_delete/xfer/`, then `cat` it into the repo with `device_bash`. (3) The reviewer's one MEDIUM was a question Claude had asked itself mid-build and waved through; the live 5-day window made it real. Check a doubt against the live settings in the runbook before dismissing it. (4) Six older suites failed on the first battery; each was re-anchored on what is TRUE now (rule 12), and the old `byte-identical` timer check became an undo-then-compare.

---
## ⤵ moved 9 Oct 2026 from HANDOFF.md — 1–3 Oct 2026 — "Vacation Auction 1 Oct 2026 V3" — ADMIN 346 LIVE (§228): THE PDF EXPORTS KEEP THEIR COLOURS · ADMIN 347 LIVE (§229): "WITH BIDS ONLY" ON THE REPORTS PAGE · ADMIN 348 LIVE (§230): THE CHANGE LOG EXPORTS · ADMIN 350 LIVE, CARRYING 349 (§231 the export drawn like the page · §232 the timer-reset row states a time).

## 1–3 Oct 2026 — "Vacation Auction 1 Oct 2026 V3" — ADMIN 346 LIVE (§228): THE PDF EXPORTS KEEP THEIR COLOURS · ADMIN 347 LIVE (§229): "WITH BIDS ONLY" ON THE REPORTS PAGE · ADMIN 348 LIVE (§230): THE CHANGE LOG EXPORTS · ADMIN 350 LIVE, CARRYING 349 (§231 the export drawn like the page · §232 the timer-reset row states a time).

**State at hand-over.** LIVE: **admin 350 (`1dc3cb9`, pushed 2 Oct about 4:39 PM) / staff 183 (`aa10c51`)**, served twice, the pushed admin page md5-equal to the gated copy (`7a546dd0…`). The day's admin builds: 346 `f09da91` (10:03 AM, between phases), 347 `c1b6382` (10:18 AM), 348 `41bc1a0` (4:08 PM), 350 `1dc3cb9` (4:39 PM, carrying 349, which was never pushed alone). Tests `07029e4`, hub `8e46123`. **Phase 1 is complete; Phase 2 starts 2 Oct (owner).** He confirmed 346 and 347 in his own browser ("works. thanks."), exported 348 himself and ruled its solid colour blocks distracting (§231); 350's restyled export and timer-reset row not yet confirmed by him. **OPEN, 3 Oct — THE NEXT SESSION'S JOB (his ruling: *"Build needs to happen in a new session"*): two valid alerts were parked and never sent (owner-found). NOTHING BUILT. Read `DECISIONS.md` §233 first (his eight rulings verbatim; settled: failure path only, success path proven unchanged, do not overbuild, never delete a parked e-mail, notices to the Vacation Goddess address, stuck = 2 minutes; size A chosen after close-out — *"A"*: the strike rule plus recording the reason, nothing else; NOT settled: what the ⛔ parked dialog offers, and the go on A's own plan), then `tests/docs/PLAN-MAIL-QUEUE-NO-FALSE-PARKING-2026-10-03.md` (its §0 says which parts are NOT approved). Honesty baselines: staff `aa10c51`, admin `1dc3cb9`. He pushes during Phase 2 with bidding closed.**
**Session start (1 Oct evening).** Six auction fetches: four said 183 / 345, one said 181 / 344 and one 136 / 17 / 265 — never explained (a stale edge or the fetch tool's own small model); disk and origin agreed with 183 / 345 throughout. He pushed V2's closing docs (hub `85759d6`, auction `ee2bd9a`).
**Lessons.** (1) A "PDF export" that is really the print dialog inherits the browser's print defaults — backgrounds are OFF. Anything drawn as a fill needs `print-color-adjust: exact`, and the test must print with backgrounds off or it proves nothing. (2) Playwright can be importable with no browser behind it (the Mac): launch inside the try, or "not run" becomes a throw (rule 11). (3) `BUILD = 345` pinned in a suite failed the first battery on 346 — the fourth time a pinned build number has done it; assert BUILD equals `versions.json`.
(4) A try/catch in the PAGE can hide a missing collaborator from the test resolver: the week label fell back to the raw key on BOTH sides of a screen-vs-export comparison, which then passed while both were wrong. When a comparison is the gate, also pin one literal value. (5) An older suite that extracts one function by name throws the day that function gains a helper — add the helper to its list; a null from an older build joins as nothing.
(6) A plan that says "coloured labels" approves the labels, not a look — Claude chose solid chips and dark bars for the Change Log export and he found them distracting within the hour. When a new document has a screen it mirrors, draw it like that screen unless told otherwise. (7) When the bridge drops mid-write, the first call after reconnecting is a READ of what is on disk (md5 and a grep for the new marker), never the write again.
(8) An assertion that calls a function with a RAW record proves nothing about a page that only ever calls it with the NORMALIZED one — `test-341` passed for two weeks while every timer-reset row on the live page read "to h". Drive the sentence through the real render. (9) Look at the owner's screenshots for what he did NOT mention: the defect of §232 was sitting in the picture he sent about colours.
(10) Before designing around an outside service's limits, read its documentation that day: "1 request per second" was a recollection for three turns and a fact only after the REST page was fetched. (11) When the owner asks "what else needs considering?", the answer is a list he can rule on — and the plan file is written BEFORE the go, so a compaction or a walk-away cannot lose it.
(12) **Size the fix to the evidence.** For a fault seen once, with its cause inferred, Claude designed seven parts including a rewrite of every send; he cut it three times (*"is this being done in the safest way possible?"* · *"Only address the failure path"* · *"This only happened once, so we shouldn't overbuild"*). Offer the smallest fix that removes the fault FIRST, and name anything larger as a separate, optional step. (13) Do not write the owner's choices for him: Claude's fallback said he could "delete it from the parked list"; his answer was that he never wants to delete one.
**Session close (3 Oct).** Checklist run: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed, rulings §228–§233 on disk and grepped · 2 `status.mjs` exit 0 · 3 no code changed since 350 (`1dc3cb9`), so no battery was owed; the last one ran on 350 — 105 suites, exit 0 · 4 uncommitted, all docs: hub 4 files, auction `BUILD-LOG.md`, tests the plan file · 4a `_to_delete/` reported to him · 5 START-HERE delivered. Context at close: about 530k.

---
## ⤵ moved 10 Oct 2026 from HANDOFF.md — 5 Oct 2026 — "Vacation Auction 5 Oct 2026 V2" — STAFF 192 FILED, NOT PUSHED (§243 · §244): "YOUR WITHDRAWN BID WOULD WIN AGAIN" · "THE LOWEST BID OF YOURS THAT WOULD ALSO WIN".

## 5 Oct 2026 — "Vacation Auction 5 Oct 2026 V2" — STAFF 192 FILED, NOT PUSHED (§243 · §244): "YOUR WITHDRAWN BID WOULD WIN AGAIN" · "THE LOWEST BID OF YOURS THAT WOULD ALSO WIN".

**State.** **LIVE: staff 191 / admin 357 (`86c99e2`), verified served at session start and again on his question. FILED, NOT PUSHED: staff 192 (`b624feec…`; first filed as `167528b7…`, replaced — see "The second audit" below), built on `86c99e2`; admin, mobile and rules untouched.** His idea of the morning (a notice to someone who left a week when it comes back within reach) was explored, planned and re-ruled across the evening — every ruling verbatim in DECISIONS §243 and §244, the plan as approved in `tests/docs/PLAN-LEFT-WEEK-WITHIN-REACH-2026-10-05.md`. Where it ended: WIN only; the withdrawn bid alone; within a phase only (*"bidding must remain independent in each phase"*); the existing line states the lowest bid of theirs that would also win, counting numbers live on their other weeks; neither line says where a number is. His go: *"Go"*. **The push is his — he said tonight, during live Phase 2.**
**Gates run:** suite 124/124 (6,000-auction fuzz against an oracle built on the real bid box and the real engine; 40,000 also clean); `--pre` on `86c99e2` FAILED 109 of 124, its 15 passes read; 23 mutations, 21 caught and 2 equivalent; invariance proof holds; `un192` wired into six older pins; battery ON THE MAC 115 suites / 4,431, exit 0; 4 inline scripts clean; browser check 12/12 on the real page and FAILED 6 of 12 on 191; button sweep clean. Independent review: one HIGH and two MEDIUM, fixed and re-reviewed clean (`tests/docs/REVIEW-192-2026-10-05.md`); the bid-limit case told to him. Schedule battery NOT run (no schedule byte changed).
**Lessons.** (1) **An oracle that shares the code's assumption cannot see the code's defect.** The first fuzz was green on 6,000 and 40,000 auctions and still missed the review's HIGH: code and oracle both "moved" a conflicting bid off a locked week. The cure was to stop re-deriving and ASK THE REAL BID BOX (on the conflicting week first, then on the target week). When an oracle re-implements a rule, name the rule's source and ask it instead. (2) **In the cloud, `test-333` and `test-335` fail on the untouched live build and `test-347` failed once in four runs; on the Mac all three pass.** The Mac battery is the gate for a build; say which machine a count came from. (3) **A later build breaks every older "nothing else moved" pin on the page it touches** — six this time. The `unNNN.mjs` pattern (an exact, proven undo, wired in front of each old comparison) is the standing answer; build it from the same pairs as the edits and assert the undo gives back the baseline before using it. (4) **He re-ruled the design five times in one evening, each time by quoting a sentence back.** A quoted line with no instruction is a question or a correction, never a go: ask what it means before touching a file (three of his quotes meant something other than the first reading).
**After his push:** fetch `versions.json` twice (wait a minute — Pages lagged twice today), md5 `origin/main:index.html` against `167528b7461142e87e3fc2f4cff75984` [CORRECTED 8 Oct 2026 (§253): superseded the next day — re-filed as `b624feec…`, and what went live is `9c70defb…`, `c8887e7`], then START-HERE's LIVE line, the BUILD-LOG row's commit, TODO, and `node status.mjs`. Not yet confirmed by him in use: 190, 191 / 357.
**The second audit (5–6 Oct, his question: *"Does this maybe deserve 1 more adversarial audit since items were found?"*).** Yes, and it did: a blind second agent said NO to the first filing — (H1) the existing line was going to different people than in 191, because the wider number list had leaked from NAMING the bid into DECIDING whether to send (and Claude had told him "less often, never more": wrong); (H2) a Confirm-Remove box left open across a phase close let a previous phase's bid produce the new line, then a narrower second-device route. Fixed inside the alert only: a `wide` flag asked for in one place; a third lock (the last thing they did on that week before the removal was to place that very bid). **Re-filed `b624feec…`.** Final gates: suite 140/140, `--pre` FAILED 125, Mac battery 115 / 4,448, straddle browser check 11/11 through the real ✕ on three pages, 120,000-case differential against 191 with 0 lines lost or gained; three re-audits, last verdict *safe to push — yes*. **Lessons.** (5) **"Since items were found" is the right trigger for another audit: a review that finds a HIGH has shown the build's own gates are blind somewhere, and the same reviewer re-checking its own fix shares its blind spots.** A second, BLIND auditor with a different method (a differential against the live build; the real page end to end) found two HIGH the first could not. (6) **When a ruling says "X does not change", the test for it is a DIFFERENTIAL against the live build, not an oracle** — an oracle is rebuilt by the person who changed the code. (7) **A lock that reads what the page stores is only as good as every path that stores it**: hand-staged floors and log entries hid the stale-box route; one check must take the state through the real controls. (8) Raised to him, not built: the stale Confirm-Remove box itself (TODO §1, HIS CALL).
**Session close (6 Oct, about 1 AM; context 601,441).** After reading why H1 mattered he ruled a narrowing (*"#2"*, §244): no "still projected to WIN" line when a bid the person holds would already have won — then asked for a new session (*"this has gotten long"*). **The Mac holds 192 `b624feec…` WITHOUT it: not to be pushed until the narrowing is built, gated and audited.** The edit (two lines in `_lwOpenings`) and the order of work are in the plan file §11; it was drafted in the cloud, proof-checked, NOT suite-tested, NOT filed. Also open, his call: the stale Confirm-Remove box (TODO §1). Not confirmed by him in use: 190, 191 / 357. Checklist: 0 fetch — NOT re-run at the close (HEADs read unchanged and unpushed at 12:30 AM) · 1 chat reviewed — every ruling of the session is verbatim in §243 / §244 · 2 `status.mjs` exit 0 · 3 commit messages delivered · 4 START-HERE delivered. Schedule: untouched all session.

---
## ⤵ moved 10 Oct 2026 from HANDOFF.md — 5 Oct 2026 — "Vacation Auction 5 Oct 2026 V1" — STAFF 190 FILED, NOT PUSHED (§241): THE BOARD WAITS FOR ITS DATA.

## 5 Oct 2026 — "Vacation Auction 5 Oct 2026 V1" — STAFF 190 FILED, NOT PUSHED (§241): THE BOARD WAITS FOR ITS DATA.

**State.** **LIVE: staff 190 (`ec66488`, pushed by him 5 Oct about 3:05 PM during live Phase 2, served twice, pushed page md5-equal to the gated copy `c1282126…`; tests `7c91f7d`, hub `c3d342e`; not yet confirmed by him in use)** / admin 356 (`0e2630a`). 190 was built on `0e2630a`; admin, mobile and rules untouched. Owner-found during live Phase 2 — users signing in saw no bids, or everyone Losing, until the page corrected itself. Cause: `render()` drew from whichever board documents had arrived (capacity not arrived = 0). 190 holds the board behind "Loading your bids…" until all ten have arrived and refuses a save until then. His go: *"1-yes.  2-now.  3-include.  go."* — the push moment is his.
**Gates run:** suite 124/124; `--pre` on `0e2630a` FAILED 111 of 119, its 8 passes read; 26 of 27 mutations caught (one equivalent in context); `un190` byte-identity with 189; browser check 241/241 three times, desktop and phone, and FAILED 188 on a site made from 189 — reproducing his report; battery 113 suites / 4,265, exit 0; isolation 36/0; 4 inline scripts clean; button sweep rows identical 189 vs 190; four other staff browser checks green, `dropdown-180-check` 571/1 on BOTH builds in the cloud browser (not this build). Independent review: one HIGH, fixed and re-reviewed clean (`tests/docs/REVIEW-190-2026-10-05.md`); M1 and L1–L5 told to him. Schedule battery NOT run (no schedule byte changed).
**Lessons.** (1) **A fake models what its author knew.** The review's HIGH — a document that does not exist sends no second snapshot after the offline stand-in — was found by reading the Firestore source, and no test could have failed for it: the sandbox's `release()` delivered a snapshot the real SDK never raises. The fake now behaves as the SDK does there; when a build leans on SDK event semantics, read the SDK. (2) **A "has it loaded" flag must name what counts as loaded** — "the callback ran" is not it (the stand-in runs the callback); "says it is from the server, or carries a document" is. (3) **Playwright's `clock.fastForward` jumps; `clock.runFor` runs.** A frame asked for by a timer was left waiting about one run in three; `runFor` made it deterministic. A flaky check is read as a finding until explained. (4) **`device_bash` refuses a command over roughly 30 KB (E2BIG).** A long new file goes: written in the cloud → `device_commit_files` into `_to_delete/xfer/` → `cat` into the repo with `device_bash` (so git sees it), md5 both ends. Do not `Write` it under the outputs folder — that puts a card in his column. (5) **The battery total can go DOWN honestly:** `test-189-356`'s byte-for-byte undo retires itself when a later build is on disk (−2); account for the count before believing or doubting it. (6) The "nothing else moved" pins of older suites are best served by an exact inverse of the new build's edits (`un190.mjs`) rather than by lengthening their lists again.
**Later the same session (5 Oct afternoon).** 190 pushed by him about 3:05 PM and verified live (`ec66488`, served twice, `origin/main:index.html` md5-equal to the gated copy). Then §242, his ask and his go: **staff 191 (`d4e9f3da…`) / admin 357 (`6db2551d…`) FILED, NOT PUSHED** — `popcornRate` × 1.2 again, one line a page. Gates: suite 34/34; `--pre` on `ec66488` FAILED 22 of 31, its 9 passes read; 12 of 12 mutations caught; `un191` byte-identity on both pages; battery 114 suites / 4,301; isolation 36/0; 8 inline scripts clean; real pages in Chromium at four counts; sweep rows identical; `board-waits-190-check` 241/241. No independent review (said to him). **Lessons.** (7) **A build that follows another the same day must not retire the earlier build's byte-identity proof — chain it:** `test-190` now puts 191's line back (`un191`) and goes on proving 190's insertions are all that separates the page from 189; 189's own proof had simply switched itself off. (8) **A loop that can throw one kernel a frame has a ceiling of the frame rate** — say so when a rate is raised toward it, and measure at 30 frames a second as well as 60. (9) A wide band on a noisy measurement passes on the old build (the 10-change loop check did, at one minute); lengthen the run until the old number is outside the band.
**Session close (5 Oct, about 4:40 PM).** **LIVE: staff 191 / admin 357 (`86c99e2`, pushed by him about 4:27 PM during live Phase 2, served twice after a minute's wait for Pages, pushed pages md5-equal to the gated copies; tests `ecd52f9`, hub `af7c4cd`).** Neither 190 nor 191 / 357 confirmed by him in use yet. Next in the queue: explore the leave-and-return e-mail alert (`TODO.md` §1 NEXT) — read and plan only. Checklist: 0 fetch (three public repos; `tests` judged from log and disk; three stranded locks moved) · 1 chat reviewed — §241, §242 and every verbatim ruling on disk; the 190 review's unbuilt notes and the `dropdown-180-check` cloud failure filed under HIS CALL · 2 `status.mjs` exit 0 · 3 battery re-run after the push: 114 suites / 4,301, exit 0, none skipped; isolation 36/0; `--pre` red on `ec66488` (191 / 357) and on `0e2630a` (190) · 4 uncommitted, all docs: hub `DECISIONS.md` `HANDOFF.md` `START-HERE.md` `TODO.md`, auction `BUILD-LOG.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered.

---
## ⤵ moved 10 Oct 2026 from HANDOFF.md — 4 Oct 2026 — "Vacation Auction 4 Oct 2026 V2" — STAFF 189 / ADMIN 356 LIVE (§240): LONE UNDER REVIEW ROWS SHOW THE UNUSED BIDS THAT WOULD HAVE WON OR TIED · 20% MORE POPCORN · 188 / 355 LIVE (§239): "POPCORN PANDEMONIUM!" AT 90 OR MORE · 187 / 354 CONFIRMED IN USE.

## 4 Oct 2026 — "Vacation Auction 4 Oct 2026 V2" — STAFF 189 / ADMIN 356 LIVE (§240): LONE UNDER REVIEW ROWS SHOW THE UNUSED BIDS THAT WOULD HAVE WON OR TIED · 20% MORE POPCORN · 188 / 355 LIVE (§239): "POPCORN PANDEMONIUM!" AT 90 OR MORE · 187 / 354 CONFIRMED IN USE.

**State.** LIVE: **staff 188 / admin 355 (`afb5f79`, pushed 4 Oct about 9:34 PM during live Phase 2, his decision)**, served twice, pushed bytes md5-equal to the gated copies (staff `be562f15…`, admin `123e5667…`); tests `729fcc9`. Staff 187 / admin 354 **confirmed by him in use, about 5:20 PM: *"confirmed new builds appear working"*** (186 / 353's step-aside: *"hasn't happened yet, so don't know"* — still unconfirmed). 188 / 355 is his request, his label, his number (100, then 90: *"more consistent"*); the go came before a plan file, so §239 and the BUILD-LOG row are the record. Not yet confirmed by him in use.
**Gates run:** suite 48/48; `--pre` on `ebe2ef4` FAILED 20 of 47 (exit 1), its 27 passes read; 12 of 12 hand mutations caught, control green; auction battery 110 suites / 4,034, exit 0 (`test-rules-emulator` reports rules not covered — no rules change); isolation 36/0; `node --check` clean on all 8 inline scripts; the real code rendered in Chromium at five counts on both pages. Schedule battery NOT run (no schedule byte changed). No independent review (said to him).
**Lessons.** (1) **Print the md5 AFTER the last edit, not the one before it.** The device md5 was read after the 100-change version; his "make it 90" came mid-turn and the staged cloud copies then disagreed with the remembered number — the pages were right, the remembered md5 was stale. (2) **A number he changes mid-build is three places:** the page, the suite's assertions, and the suite's own "undo" strings — grep the suite for the old number afterwards. (3) The 186 and 187 suites needed their "nothing else changed" lists extended again, as lesson (3) of V1 said they would. (4) A wider label is a layout change: measure the new text against the longest existing label before calling a wording change "one line".
**Later the same session (4 Oct evening → 5 Oct morning).** 188 / 355 pushed by him about 9:34 PM and verified live (`afb5f79`, served twice, a fresh clone md5-equal to the gated copies). Then §240: **staff 189 (`d0c3fc1e…`) / admin 356 (`9327b664…`) LIVE `0e2630a` — pushed by him 5 Oct about 6:23 AM, served twice (after one minute's wait for Pages), pushed bytes md5-equal to the gated copies; tests `5ca2b74`; not yet confirmed by him in use** — the unused-bids line on lone Under Review rows (both pages, ties and combined bids included, his wording), the renamed button, 20% more popcorn kernels. Gates: suite 80/80; `--pre` on `afb5f79` FAILED 53 of 79, its 26 passes read; 23 of 25 mutations caught (two equivalent in context); battery 111 / 4,114; isolation 36/0; 8 inline scripts clean; real rows rendered in Chromium; **independent review: no CRITICAL / HIGH / MEDIUM**. **Lessons.** (5) **A helper that catches its own faults hides a missing dependency in the sandbox AND on the page** — the first run returned "not a lone review" for everything because `availableNumbersFor` was not in the sandbox; the fault path now returns a different value and the row says so. (6) **Answers to a plan's questions are not a "go"** — he answered seven questions over five messages and added two requirements before saying it; asking each time cost three short turns and no rework. (7) **Take the competitors from the engine's own answer, not from a second copy of its filters** — the reviewer's 80,000-board run with floors, reuse and rounds found nothing because there was no second filter to drift. (8) He numbers his answers by the list he was FIRST shown; when a list is re-issued, keep its numbering.
**Session close (5 Oct, about 9:20 AM).** He asked for the handoff at about 6:50 AM while away from his Mac; the bridge was down, so the text was delivered as `HANDOFF-PENDING-2026-10-05.md` in the outputs column and filed when he returned. **New, filed at close:** (a) his next task — explore the leave-and-return e-mail alert, `TODO.md` §1 NEXT, his words verbatim; (b) his question *"is there any user who is favored over another user in the wheel of names spins?"* — answered NO from the code and from over 40 million spins of the page's own wheel; record `tests/docs/WHEEL-FAIRNESS-CHECK-2026-10-05.md`, standing gate `tests/test-wheel-fairness.mjs` (29 / 29; 8 of 8 deliberate tilts caught; no auction byte touched, so no build and no §92 decision). Checklist: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed — §239, §240 and every verbatim ruling on disk; the confirmation of 187 / 354 on disk; 189 / 356 not yet confirmed by him · 2 `status.mjs` exit 0 · 3 battery re-run with the new suite: 112 suites / 4,143, exit 0; isolation 36/0 · 4 uncommitted, all docs or tests: hub `DECISIONS.md` `HANDOFF.md` `START-HERE.md` `TODO.md`, auction `BUILD-LOG.md`, tests `test-wheel-fairness.mjs` `docs/WHEEL-FAIRNESS-CHECK-2026-10-05.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered. **Lessons.** (9) Two of the first five wheel runs wobbled past the 5% line; the honest move was to repeat and measure the spread (60 batches) before saying "fair", not to report the clean-looking rows. (10) **Unverified base → ship the patch:** away from the Mac the working files were ahead of GitHub by two unpushed commits, so the handoff went out as text to file, never as rebuilt copies of `TODO.md` / `HANDOFF.md`. (11) `device_commit_files` delivered an EARLIER saved copy of a file edited seconds before; the md5 on the device caught it — md5 after every transfer, both sides. **NEXT SESSION: explore the leave-and-return alert (TODO §1 NEXT).**

---
## ⤵ moved 10 Oct 2026 from HANDOFF.md — 4 Oct 2026 — "Vacation Auction 4 Oct 2026 V1" — STAFF 187 / ADMIN 354 LIVE (§237 · §238): THE REMOVE-BID BOX POINTS TO EDIT · THE E-MAIL LOG SAYS WHOSE PAGE MADE EACH ATTEMPT · THE CANCEL-ALERT HOLD PLANNED AND WITHDRAWN.

## 4 Oct 2026 — "Vacation Auction 4 Oct 2026 V1" — STAFF 187 / ADMIN 354 LIVE (§237 · §238): THE REMOVE-BID BOX POINTS TO EDIT · THE E-MAIL LOG SAYS WHOSE PAGE MADE EACH ATTEMPT · THE CANCEL-ALERT HOLD PLANNED AND WITHDRAWN.

**State.** LIVE: **staff 187 / admin 354 (`ebe2ef4`, pushed 4 Oct about 4:55 PM during live Phase 2, his decision)**, served twice, pushed bytes md5-equal to the gated copies (staff `b21d207b…`, admin `2642b938…`); tests `ac108d8`. He un-tabled §235 (*"it keeps happening"*). A one-minute hold on a cancel's alerts was planned, then WITHDRAWN on his own concern — a bidder who cancels and leaves, with no other page open, strands a real alert. Ruled instead (§237): one boxed note in the remove-bid box, above the priority-lock note, his wording; the lock note quieter; he e-mails the group himself; the swap stays parked. Then, from two E-mail Log screenshots (§238): the log's last column now reads `staff page · XYZ`, the initials signed in on the page that made the attempt — rolled into the same push at his ask. **Confirmed by him 4 Oct 2026, about 5:20 PM: *"confirmed new builds appear working"*.**
**Gates run:** suite `test-187-354-remove-note-sent-from.mjs` 88/88; `--pre` on `c127fac` FAILED 32 of 86 (exit 1), its 54 passes read; 7 of 7 hand mutations caught, control green; auction battery 109 suites / 3,986, exit 0, re-run on the pushed bytes at close (`test-rules-emulator` reports rules not covered — no rules change); isolation 36/0; `node --check` clean on all 8 inline scripts; the remove box rendered at 375 / 320 and the E-mail Log at 1440 / 1100 / 900 in Chromium, no sideways scroll. Schedule battery NOT run (no schedule byte changed). No independent review (wording, styling, one logged field; said to him).
**Lessons.** (1) **There is no server: before proposing anything that DELAYS a send, answer "who sends it if the bidder leaves and nobody else is on?"** Claude planned a hold twice (3 Oct, 4 Oct) and he found the hole in one question. A stale pair is a nuisance; a stranded alert breaks §236's "timely alerts". Work on the CAUSE (why people cancel), not the mail. (2) **A limit stated from memory was wrong:** "pages that haven't reloaded keep the old code" — the push gate (`requiredBuilds`, armed when the admin page loads) reloads every open tab in 5 seconds. He caught it; rule 14 — read the reload code before stating what an old tab does. (3) **A suite's "nothing else changed" list is a promise about the NEXT build too.** Rolling §238 into the unpushed 187 turned the 187 suite's own "admin untouched" check red within the hour, and each build since 184 has had to extend the previous suite's changed-function list — expect it, repoint to the invariant (the function differs by exactly the tagged line), never delete. (4) **Look at the picture.** The first E-mail Log render measured "no slider" and showed a loading overlay over an empty page; the numbers were right and the screenshot proved nothing until the overlay was hidden. (5) **The bridge dropped mid-edit when he stepped away;** two retries wrote nothing; on return `grep -c` showed the edit had NOT landed, and only then was it applied. A late self-scheduled check-in then arrived after the work was done — it was read and not acted on. (6) Twins stay twins cheaply: the one new line in `_mailHistNote` is byte-identical on both pages and guards on `typeof getCurrentUser`, so the 185 suite's twin check needed no edit.
**Session close (4 Oct, about 5:10 PM).** Checklist run: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed — §237, §238 and every verbatim ruling on disk and grepped; the hold plan kept, marked withdrawn · 2 `status.mjs` exit 0 · 3 battery re-run on the pushed bytes, honesty red, isolation green · 4 uncommitted, all docs: hub `DECISIONS.md` `HANDOFF.md` `TODO.md` `START-HERE.md`, auction `BUILD-LOG.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered. **NEXT SESSION: nothing is queued on the auction.**

---
## ⤵ moved 10 Oct 2026 from HANDOFF.md — 3–4 Oct 2026 — "Vacation Auction 3 Oct 2026 V2" — STAFF 186 / ADMIN 353 LIVE (§236): A PAGE THAT GETS NO ANSWER FROM THE MAIL SERVICE STEPS ASIDE · §235 TABLED.

## 3–4 Oct 2026 — "Vacation Auction 3 Oct 2026 V2" — STAFF 186 / ADMIN 353 LIVE (§236): A PAGE THAT GETS NO ANSWER FROM THE MAIL SERVICE STEPS ASIDE · §235 TABLED.

**State.** LIVE: **staff 186 / admin 353 (`c127fac`, pushed 4 Oct about 9:40 AM during live Phase 2, his decision)**, served twice, pushed bytes md5-equal to the gated copies (staff `6b757b23…`, admin `cdd8ea46…`); tests `8c710ea`. Owner-found in his new E-mail Log: one page that got no answer failed four times on a good alert (six minutes, three strikes, reason shown as "[object Object]"). Built: such a page lets go of its claim at once, takes a second attempt after 20 s, then steps aside 30 minutes; the log reason reads "no answer"; two pills beside Current Phase on the admin dashboard (waiting over 2 minutes · parked). His rulings are §236 1–5. **§235: cancel-and-re-bid sends several alerts — the swap and the hold are TABLED for a build when the auction is not live.** Not yet confirmed by him in use.
**Gates run:** new suite 172/172; `--pre` on `9af2c46` FAILED 88 of 152 (exit 1), its 64 passes read; 14 of 14 hand mutations caught, control green; auction battery 108 suites / 3,898 assertions, exit 0 (`test-rules-emulator` reports rules not covered — no rules change); isolation 36/0; `node --check` clean on all 8 inline scripts; the pills rendered with the Rehearsal pill in Chromium at five widths. Schedule battery NOT run (no schedule byte changed). Independent review before the push: no CRITICAL / HIGH; M1 fixed before filing; M2 / M3 in `TODO.md` HIS CALL.
**Lessons.** (1) **Count attempts, not failures.** The first cut counted every failed send, so one blip on a bid that alerts two people used up both attempts in a second; the reviewer found it, not the suite — the suite fed the counter by hand and so could not see the loop that feeds it twice. When a counter is fed from a loop, drive the loop's shape (N calls in one instant) in the test. (2) **His instinct beat the plan:** the first plan stepped a page aside on its first failure; his *"how about a 2nd attempt"* kept the self-heal a healthy page has today. Before removing a retry, write down what the retry is currently rescuing. (3) **`_mailLogNote` is the one place every send on both pages reports to** (ok / err) — anything that needs "did this page's send work" belongs there, with no send block touched. (4) Old suites that extract `_mailLogNote` or a relay need the two new real helpers in their harness (`_mqNoAnswer`, `_mqSendNote`) and the four page-memory values; three were repointed (184 / 351, 185 / 352, 330). (5) Rule 11 slipped once: `status.mjs | tail` reported tail's exit; caught on the next line and re-run bare. (6) E2BIG again at about 27 KB — a 39 KB suite went over in three appended heredocs, each under 17 KB.
**Session close (4 Oct, about 2:20 PM).** Checklist run: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed — §235, §236 rulings 1–5 on disk and grepped; Q11 left `TODO.md` when the build was filed; M2 / M3 and the test gaps filed there · 2 `status.mjs` exit 0 · 3 battery re-run on the pushed bytes at close · 4 uncommitted, all docs: hub `DECISIONS.md` `HANDOFF.md` `TODO.md` `START-HERE.md`, auction `BUILD-LOG.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered. **NEXT SESSION: nothing is queued on the auction.**

---
## ⤵ moved 10 Oct 2026 from HANDOFF.md — 3 Oct 2026 — "Vacation Auction 3 Oct 2026 V1" — STAFF 184 / ADMIN 351 LIVE (§233 size A): AN ANSWERED REFUSAL IS NEVER A MAIL-QUEUE STRIKE; EVERY FAILURE'S REASON IS KEPT.

## 3 Oct 2026 — "Vacation Auction 3 Oct 2026 V1" — STAFF 184 / ADMIN 351 LIVE (§233 size A): AN ANSWERED REFUSAL IS NEVER A MAIL-QUEUE STRIKE; EVERY FAILURE'S REASON IS KEPT.

**State.** LIVE: **staff 184 / admin 351 (`091b0f6`, pushed 3 Oct about 9:59 PM)**, served twice, pushed bytes md5-equal to the gated copies. Gated copies: staff 184 `a7647cb9…`, admin 351 `29241306…`, `versions.json` 184 / 351 — the SECOND cut (the first, which retried every non-422 failure without limit, was never pushed). His rulings this session are §233 rulings 10–14. **Nothing is open on the build. His e-mail-log idea is in `TODO.md` §1 — a separate build, needs a plan and a go.**
**Gates run:** the new suite 173/173 and 77 FAILED on the live pair (exit 1), passes read; auction battery 106 suites / 3608 assertions, exit 0; isolation 36/0; inline scripts `node --check` clean; schedule battery 22 of 108 on the Mac (browser suites cannot run there; no schedule byte changed). Independent review filed.
**Lessons.** (1) A change that removes a cap needs its own question: "what now stops this?" — the plan named the unlimited retry but not the duplicate-delivery case; the reviewer found it, he ruled *"I don't want duplicate messages"*, and the fix became narrower and safer: only a refusal the service ANSWERS with is exempt. Ask of every failure class: could the thing have happened anyway? (2) When two things share one write, make the cheaper one unable to fail: the helpers were hardened so a strange error value cannot lose the strike. (3) `device_bash` refuses a command over a certain size (`E2BIG`, seen at about 19 KB): write a large new file in the cloud, zip it, `device_commit_files` to `_to_delete/xfer/`, `unzip -p` into place, md5 both sides. (4) A test harness that extracts a page function must use THAT page's names for its data (`loginEmailsDataAdmin`, not `loginEmailsData`) — the first admin run failed on the harness, not the code.
**Later the same session — STAFF 185 / ADMIN 352 LIVE `9af2c46` (§234; pushed 3 Oct about 10:24 PM, served twice, pushed bytes md5-verified; tests `dedf99c`): THE E-MAIL LOG.** His idea, his go. One line in `_mailLogNote` on each page plus `_mailHistNote`; People → ✉️ E-mail Log on the admin page (filters, PDF / Excel export, newest 1,000 kept). Gated copies: staff `8e0a0089…`, admin `efc2c4d7…`. Suite 124/124, 42 fail on `091b0f6`; battery 107 suites / 3728, exit 0. Lessons: (5) an invariance proof against a fixed SHA ("the rest of the page is byte-identical") is a FILING proof — the next build ends it by nature; keep it out of the standing battery or retire it when the next build lands (rule 12), and keep the narrow promise (the relay through its catch) asserted for good. (6) A patch anchor that looks unique in a truncated grep is not: the loginLog and mailLog listeners end in the same words; the `count==1` assertion stopped it before any write (rule 15 earning its keep). (7) Reading the honesty passes found `[undefined, undefined]` serialising to the same text as `[null, null]` — a vacuous pass on a page with no history at all.
**Session close (3 Oct, about 10:35 PM).** He confirmed the E-mail Log in his own browser (*"looks good, do handoff"*). Checklist run: 0 fetch (three public repos; `tests` judged from log and disk) · 1 chat reviewed — rulings §233 10–14 and §234 on disk and grepped; the two shipped builds left `TODO.md` §1 as one paragraph each, after every verbatim ruling in the removed block was confirmed present in `DECISIONS.md` · 2 `status.mjs` exit 0 · 3 the last battery ran on the pushed bytes of 185 / 352: 107 suites, 3728 assertions, exit 0; isolation 36/0; the Mac ran 22 of 108 schedule suites earlier in the session (no schedule byte changed) · 4 uncommitted, all docs: hub `DECISIONS.md` `HANDOFF.md` `TODO.md` `START-HERE.md`, auction `BUILD-LOG.md` · 4a `_to_delete/` reported to him · 5 START-HERE delivered. **NEXT SESSION: nothing is queued on the auction.**

---
## ⤵ moved 11 Oct 2026 from HANDOFF.md — 6 Oct 2026 — "Vacation Auction 6 Oct 2026 V1" — STAFF 193 LIVE (§245): A WINNING BID CANNOT BE LOWERED BELOW THE WEAKEST WINNING BID · STAFF 192 WENT LIVE WITH THE §244 NARROWING BEFORE ITS AUDIT · §246 COMMIT LINES IN THE CHAT.

## 6 Oct 2026 — "Vacation Auction 6 Oct 2026 V1" — STAFF 193 LIVE (§245): A WINNING BID CANNOT BE LOWERED BELOW THE WEAKEST WINNING BID · STAFF 192 WENT LIVE WITH THE §244 NARROWING BEFORE ITS AUDIT · §246 COMMIT LINES IN THE CHAT.

**State.** **LIVE: staff 193 / admin 357 — staff `1173efd` (`a3720e21…`), pushed about 8:45 PM during live Phase 2 with bidding LOCKED by him, served twice, pushed page md5-identical to the gated copy; admin `86c99e2`.** At the close: auction `26650e2` and schedule `0a61585` clean and in sync; tests `67c4671` plus this hand-over's commit (`apply193.py`); hub `9176970` plus this hand-over's commit. Next auction honesty baseline: `1173efd` staff, `86c99e2` admin. Not confirmed by him in use: 190, 191 / 357, 192, 193.
**The day, in order.** (1) Opening report repeated START-HERE's "192 … the push is his"; the previous entry's last line said do not push (the §244 narrowing was ruled but not built). He caught it: *"192 needs an update before pushing. can you see that?"* (2) On his *"go"* the narrowing (two lines in `_lwOpenings`) was edited INTO THE REPO FOLDER; he pushed at 11:31 AM (`c8887e7`, `9c70defb…`) believing it was the original — so 192 went live with the narrowing before its audit. Measured afterwards on the live bytes: 120,000-case differential against the audited `b624feec…` — 359 lines withheld, all the rule, gained 0. His ruling on the rest: *"file this to do later"* (TODO §1). (3) He raised double e-mail sends and the Popcornometer to 12 hours, then: *"wait on 2/3/4 until we address this bigger issue"* (both explored read-only, in TODO §1, unruled). (4) About 6 PM he LOCKED all bidding: winners were lowering after losers left. The rule was settled in the chat over about an hour — every ruling verbatim in DECISIONS §245 — and built as staff 193 on *"Go. I will amphetamine on."*; filed about 8:40 PM, pushed 8:45 PM. (5) §246: commit lines pasted in the chat, one copy-box per repo, every time.
**Gates for 193** are in its BUILD-LOG row; the blind audit is `tests/docs/REVIEW-193-2026-10-06.md` (safe to push; M1 and M2 told to him, HIS CALL, not built). **[ADDED 8 Oct 2026 (§253): this entry was written before §247 — the same evening START-HERE pasted in the chat was tried once and WITHDRAWN (*"that starthere within the chat is terrible, don't do that"*); outputs column only.]**
**Lessons.** (1) **Build an auction page OUTSIDE the folder he pushes from** — now START-HERE rule 4. 193 was built by `tests/apply193.py` (exact once-only replacements from the live page; it also GENERATES `un193.mjs` from the same pairs, so the undo cannot drift from the build) in `_to_delete/wip193/`, and written into the repo only after the gates. (2) **Read the last HANDOFF entry to its last line at session start** — now START-HERE §4 step 1. (3) **A mutation run in which every mutant shows the SAME number of reds has tested nothing.** All 34 first "died" with exactly one red — the suite's undo guard no longer matched the mutated page. Read the red, not the count (rule 18); the suite takes its unmutated side from `S0_PAGE` in mutation runs. A second false alarm the same way: a shortened fuzz (`FUZZ_N`) trips the suite's own exercise thresholds — run mutants at the default size. (4) **A later build that changes what a user may DO breaks the behaviour suites of earlier builds, not just their byte pins**: the 182 / 192 alert suites and their three browser checks now take 193 out first with `un193` (a miss is a failed gate) and go on pinning their own build; `un192` calls `un193` first. The alerts UNDER the rule are pinned by the 193 suite. (5) **A battery can be run against an unfiled page**: a shadow root (`REPO_ROOT` / `GH_ROOT` at a folder of symlinks with only `index.html` and `versions.json` replaced) ran 115 of 116 green; the one red was `test-187`'s `git status` check seeing the symlinks. The real-tree battery after writing the page in is still the gate. (6) **Background processes do not survive between `device_bash` calls** — a `nohup … &` is killed when the call returns; run long jobs in the foreground in batches under 180 s. (7) **The auditor's browser scenarios were kept as the build's browser check** (`sweep/weakest-winning-193-check.mjs`) after making every assertion unconditional so it FAILS on 192 (as handed over, its 193-only assertions were skipped on 192 — green on the old build). (8) **A quoted sentence with no instruction was, twice more, a correction** (*"While a losing bid is still on the week, the rule changes nothing…"* → *"I don't think that's true"* → *"I think anyone can place a losing bid at any time"*): re-check the claim against the code before answering, then ask what is meant.
**For the next session — his order: *"I want the next agent to review what we did"*, then the items he raised at the top of this chat.** The brief is at the top of `TODO.md` §1.
**Session close (6 Oct, about 9 PM; context 592,773).** Checklist: 0 fetch run on the three public repos (tests judged from log and disk), three stranded `maintenance.lock` moved to `_to_delete/` · 1 chat reviewed — rulings in §244 (6 Oct entry), §245, §246; his raised items in TODO §1 · 2 `status.mjs` exit 0 after the archive pass (two September entries moved by `archive.mjs`) · 3 code proven on the filed bytes = the live bytes (md5) · 4 every repo accounted for · 5 commit lines in the chat (§246) and START-HERE delivered. Schedule: untouched all session.

---
## ⤵ moved 12 Oct 2026 from HANDOFF.md — 8 Oct 2026 — "Vacation Auction 8 Oct 2026 V1" — STAFF 198 / ADMIN 360 LIVE (§254 – §256): A COMPETITION WEEK STAYS ONE WHEN EMPTY · TWO PEOPLE MAKE A COMPETITION · BEGIN PHASE AND THE LOG RESET · THE WAY OUT.

## 8 Oct 2026 — "Vacation Auction 8 Oct 2026 V1" — STAFF 198 / ADMIN 360 LIVE (§254 – §256): A COMPETITION WEEK STAYS ONE WHEN EMPTY · TWO PEOPLE MAKE A COMPETITION · BEGIN PHASE AND THE LOG RESET · THE WAY OUT.

**State.** **LIVE: staff 198 / admin 360 — `1405d99`, pushed by him 8 Oct about 9:15 PM during live Phase 2, served twice, the pushed pages md5-identical to the gated copies `cf2d05cb…` / `42e12998…` (tests `e517349`, hub `4614e5f`).** Next auction honesty baseline: `1405d99`, both pages (this build's own was `a4de6d6`). Schedule untouched.
**The day, in order.** (1) 2 PM: re-grounding, START-HERE delivered; his "go." → exploration, ONE plan (`tests/docs/PLAN-198-360-…`); 2:19 PM his go (§255). (2) Built in the cloud with the Mac off (`apply198.py`); four blind audit lanes found ONE HIGH (three lanes independently) and three ways the level could read weak — fixed, verified. (3) Three items put to him as his call; 6:25 and 6:48 PM he ruled all three (§256) → built into the same unpushed build, audited again (two lanes, a second verifier), three MEDIUM of the way out fixed. (4) Mac back: zip unpacked with `unzip -p` (25 files md5-verified), Mac gates, filed.
**Lessons.** (1) **A what-if must ask about the world WITHOUT the thing being tried.** The first build asked "is this a competition week?" with the newcomer's bid already in the picture, so a big newcomer made a quiet week a competition week by arriving. Three independent lanes found it; the builder's own 97,500-question fuzz did not, because its fixture gave everyone 1.0 FTE on whole places. A fuzz is only as wide as its world: vary FTE, capacity and earlier holders or say the fuzz does not cover them. (2) **"Errs strict" has to be checked per case, not claimed.** A stale second removal, a lost last entry and a skewed clock each made the first build's level WEAKER. The fix reads "last" two ways (the log's order and the clocks) and takes both. (3) **A differential against the previous build stops meaning anything when the build also changes the definition** — the remembered-level fuzz now runs against a third sandbox (197 carrying the new definition), and the definition against an independent oracle. (4) **A flag that unlocks something must say what it unlocks FOR** (a phase), must be dropped when its reason goes away, and must be spent only when the thing has happened — all three were audit findings on the way out. (5) **`/tmp` on the Mac's VM does not survive between bridge calls and a background job dies with its call**: run gates in the foreground (the battery takes about 60 s) and keep logs and baselines under `_to_delete/wip…`.
**For the next session.** Nothing is queued on the auction; he drives the order. Filed for when he asks: the definition line's wording in Rules & Reminders ("file to look at it again another time").
**Session close (8 Oct, about 9:25 PM, after his push; context about 640,000).** Checklist: 0 fetch at the opening, locks moved · 1 chat reviewed — §255, §256 (every ruling verbatim), TODO · 2 `status.mjs` · 3 Mac battery 123 suites / 5,132 on the filed bytes, exit 0, none skipped; honesty on `a4de6d6` FAILED 57 of 96 (staff) and 34 of 54 (admin); isolation 36/36; invariance 7/7; cloud: 46 of 46 mutants killed, browser 51/51 and the checks of 182–197, button sweep compared with live · 4 every repo accounted for · 5 commit lines in the chat, START-HERE delivered.

---
## ⤵ moved 12 Oct 2026 from HANDOFF.md — 7–8 Oct 2026 — "Vacation Auction 7 Oct 2026 V3" — STAFF 197 / ADMIN 359 LIVE (§252 – §254): CLEAR LOG GONE, "RETRY LOG RESET", THE "MAY BE A REPEAT" RE-SEND, THE BID-BOX NOTE · NEXT: BUILD 198, A COMPETITION WEEK WITH NO EXCEPTION.

## 7–8 Oct 2026 — "Vacation Auction 7 Oct 2026 V3" — STAFF 197 / ADMIN 359 LIVE (§252 – §254): CLEAR LOG GONE, "RETRY LOG RESET", THE "MAY BE A REPEAT" RE-SEND, THE BID-BOX NOTE · NEXT: BUILD 198, A COMPETITION WEEK WITH NO EXCEPTION.

**State.** **LIVE: staff 197 / admin 359 — `a4de6d6`, pushed by him 8 Oct about 1:50 PM during live Phase 2, served twice, the pushed pages md5-identical to the gated copies `793a9f70…` / `870f770b…` (tests `1da7647`, hub `44b54d8`).** Next auction honesty baseline: `a4de6d6`, both pages. Schedule untouched.
**The day, in order.** (1) Opened 7 Oct 10 PM: re-grounding, START-HERE delivered. (2) 8 Oct morning: two ideas filed (a winner may cancel on a competition week only when the number is needed on another week; the "harvested number" alert); §253 — bail tracking WAITS, the mid-way question declined, the ten paperwork statements corrected, the wording of 194–196 checked (accurate; three notes), Clear Log and the double sends explored and planned. (3) His go with the Mac off: 197 / 359 built in the cloud from a clone of the live pages, own suites, three blind audits. (4) Midday: his worry about everyone leaving a competition week and returning lower → the last-person edit WITHDRAWN, "Retry log reset" ruled, build 198 ruled (§254). (5) Rebuilt, re-audited (final bytes + a verifier), the older suites repointed, battery and browser checks, filed.
**Lessons.** (1) **A scratch root for the battery needs the repo's git**: a copy without `.git` turned 20 suites red on "baseline unreadable"; a one-line `.git` file (`gitdir: <real repo>/.git`) in the scratch copy fixed it and let the whole battery run on unfiled pages (`_to_delete/wip197/root`). (2) **A mutation run that cannot take the build apart "catches" everything**: with no path to the live page, every staff mutant died on "197's edits can't be taken out", not on its own assertion — the tally looked perfect and meant nothing until the live page was passed in (`mutate197.mjs <built> <live index.html>`). Read WHICH assertion killed each mutant. (3) **A fuzz's clock can walk into the future**: the engine suite stamped log entries a second apart across 1,500 histories, ran past "now + 10 minutes", and the page (rightly) counted those entries as always there — the differential was exercising the strict fallback, not the replay. Reset the clock per history. (4) **A guard copied from the page's own state is not a guard at the moment of action** — the retry first re-checked `phasesData` (this page's mirror); the audit's reproduction was a stale page beside a restore on another device. For anything destructive: ask the SERVER, and use the feed-health gate the neighbouring actions use. (5) **When a rule edit and a wording edit ride together, withdraw them together**: "nobody else" belonged to the last-person edit and came out with it; the rule line's last sentence is 196's until 198.
**For the next session — in his order.** (1) The two admin fixes he ruled at filing (§254: *"1-yes, do this.  2-agree."*) — Begin Phase refuses while a change-log reset is owed; Complete Phase resets in the retry's order — **live before he completes Phase 2**. (2) BUILD 198 (§254): a competition week with no "everyone has left" freedom, a remembered level, the rule line corrected — explore, ONE plan, his go.
**Session close (8 Oct, about 2 PM; context about 665,000).** Checklist: 0 fetch on the public repos, stranded locks moved · 1 chat reviewed — §253, §254 (every ruling verbatim, incl. the 1:44 PM pair), the two ideas in TODO · 2 `status.mjs` exit 0 · 3 battery 121 suites / 4,980 on the Mac on the filed bytes, honesty FAILED 56 of 100 and 28 of 49 on `37d200c`, isolation 36/36, browser 38/38 and the eight older checks, sweep compared · 4 every repo accounted for (two docs commits handed over: auction BUILD-LOG, hub) · 5 commit lines in the chat, START-HERE delivered.

---
## ⤵ moved 12 Oct 2026 from HANDOFF.md — 7 Oct 2026 — "Vacation Auction 7 Oct 2026 V2" — STAFF 196 / ADMIN 358 LIVE (§250 · §251 · §252): A COMPETITION MEANS "AT THE SAME TIME"; THE LABEL; 12 HOURS.

## 7 Oct 2026 — "Vacation Auction 7 Oct 2026 V2" — STAFF 196 / ADMIN 358 LIVE (§250 · §251 · §252): A COMPETITION MEANS "AT THE SAME TIME"; THE LABEL; 12 HOURS.

**State.** **LIVE: staff 196 / admin 358 — `37d200c`, pushed by him about 9:45 PM during live Phase 2, served twice, the pushed pages md5-identical to the gated copies `aee2a457…` / `91b02a81…` (tests `84e1ee6`, hub `d258b94` · `6c9e263`, auction docs `472096f`).** Next auction honesty baseline: `37d200c`, both pages. Schedule untouched.
**The day, in order.** (1) Re-grounding; START-HERE delivered. (2) His *"Go"* on the label exploration, widened by him to the Popcornometer + changes chip on 12 hours and a correctness pass on Rules & Reminders (§250); one plan. (3) His placement (top right of the card), then his question *"is this only if it's more people all at the same time?"* → the definition changed (§251: same time; *"I want A"*); his wording of the definition line; his six answers; then *"Dr. A must come back with the same rules as anyone else"* withdrew 195's returning-winner exception — shown that it contradicted his morning ruling, he chose *"tonights rule.  go."* (4) Built outside the repo (`apply196.py`), gated, three blind audits; two rounds of fixes inside `_wwContested` only. (5) He pushed; then §252: the forged-log rules build is LATER (*"when phase 3 is complete maybe"*), and the NEXT build removes the admin's "Clear Change Log".
**Lessons.** (1) **When a test that read several records is replaced by one that reads fewer, list what each old record was covering first.** 196's first filing replayed the change log alone; the page itself ignores a failed log write, and the floors 195 also read were what covered it. The first audit found it (one lost write switched the rule off). (2) **A "never stricter than X" claim needs a fuzz that reaches the boundaries** — the suite's own times all sat near 1000, so `since` was never ahead of the clock and nothing was `-Infinity`; the third audit found an ordering slip that was stricter than 195. (3) **A fixture must keep the records the page keeps**: floors written for entries before the window made the Phase-4 tests wrong until the fixture cleared them as Start Round does. (4) **Run a failing browser check on the OLD page with the same fixture before blaming the build** — the 340px wrap in `dropdown-180-check` failed on 195 too (clock-dependent). (5) **An undo chain needs a sentinel the build alone owns**: four 196 edits put 194's text back, so "none of 196's texts present" was true again after un195 ran — `un196` keys on `function _wwLabelOn(` instead. (6) The time stated to him at filing ("about 11 PM") was wrong — it was about 9 PM; corrected in the BUILD-LOG row. Read the clock (`TZ=America/Los_Angeles date`) before writing a time.
**For the next session.** TODO §1's NEXT BUILD: remove the admin's "Clear Change Log" (explore, one plan, his go). Then, in his order, what TODO §1 lists after it.
**Session close (7 Oct, about 10 PM).** Checklist: 0 fetch on the three public repos, locks moved · 1 chat reviewed — §250, §251 (with every sub-ruling verbatim), §252, the TODO items · 2 `status.mjs` exit 0 · 3 battery 119 suites / 4,809 cloud and Mac, honesty FAILED 60 on `bff8c42` / `86c99e2`, isolation 36/36, browser 43/43 · 4 every repo accounted for (one docs commit handed over: hub); `_to_delete/` reported · 5 commit line in the chat, START-HERE delivered.

---
## ⤵ moved 12 Oct 2026 from HANDOFF.md — 7 Oct 2026 — "Vacation Auction 7 Oct 2026 V1" — STAFF 195 LIVE (§249): THE ENTRY LEVEL ON A COMPETITION WEEK.

## 7 Oct 2026 — "Vacation Auction 7 Oct 2026 V1" — STAFF 195 LIVE (§249): THE ENTRY LEVEL ON A COMPETITION WEEK.

**State.** **LIVE: staff 195 / admin 357 — staff `bff8c42` (`63afb2cc…`), pushed by him 7 Oct 2026 about 3:10 PM during live Phase 2, served twice, pushed page md5-identical to the gated copy (tests `b506fc8`, hub `310629e`).** Next auction honesty baseline: `bff8c42` staff, `86c99e2` admin. Schedule untouched.
**The day, in order.** (1) Re-grounding; his paste arrived whole; START-HERE delivered. (2) *"go"* on the exploration → ONE plan with four open points; he ruled all four (keeping his own ruling on the emptied week against Claude's recommendation, twice), the wording and the greyed numbers, then *"go"* on the build. (3) Built outside the repo (`apply195.py`), gated, first blind audit: the rule right, the Remove box now false. (4) His three rulings of the afternoon — the returning winner (*"same bid only or stronger"*), each Phase-4 round its own record (*"I want that done now"*), the Remove-box warning — built into the same unfiled 195. (5) Second blind audit: a win could be banked on a quiet week → narrowed (a win is recorded only when the bid leaves a competition week). (6) Third pass: safe to deploy; filed.
**Lessons.** (1) **A record that opens a door must be asked what it is a record OF.** "Was winning when it left" was built as "was projected WIN at removal" — true of a lone bid on an empty week, which is not what he meant. The audit banked it in three moves. Ask of every flag written at one moment and read at another: who can cause it to be written, cheaply, with nothing at stake? (2) **A rule that changes what comes back must be read against every sentence that says what comes back** (lesson 5 of the last entry, paid for again: the Remove box). Grep the page for the advice BEFORE the first audit, not after it. (3) **When he asks "are you sure that's a problem?", he has usually seen the simpler rule** — the returning winner was his, and it replaced a warning-only fix. Answer the question on the board he named before defending the build. (4) **A liveness counter is not an assertion**: "23 bids were offered" stayed green on the old build; tie every "it really ran" count to the independent statement, or it proves only that the loop turned. (5) **A fuzz run at a smaller N can fail a liveness assertion and look like a killed mutant** — a kill counts only when a DIRECTED assertion is among the reds (two false kills caught this way). (6) **`pkill -f <name>` from the bridge kills the shell that typed it** (START-HERE rule 8's `pgrep` trap, the other direction); background jobs do not outlive a bridge call — batch long runs inside the 180 s limit. (7) **Claude told him the greyed numbers would newly reveal the level; the week card already shows every bid.** A claim about what the page shows is a claim about code: it was not re-read before it was made (rule 14).
**For the next session.** His call on R1 (TODO §1). Then, in his order, what TODO §1's NEXT block lists after item 1.
**Session close (7 Oct, about 3:20 PM; context reading in the chat).** Checklist: 0 fetch on the two public repos touched, locks moved · 1 chat reviewed — every ruling of the day is in §249 (verbatim), R1 and the test-clock note in TODO §1 · 2 `status.mjs` exit 0 · 3 live 195 = the gated bytes (md5 of `origin/main:index.html`), served twice · 4 every repo accounted for (two docs commits handed over: auction BUILD-LOG, hub) · 5 commit lines in the chat (§246), START-HERE delivered to the outputs column.
**AFTER THE CLOSE (7 Oct, 4:56–5:30 PM, from his phone; the Mac link was down).** He read a live Week 31 card and asked three questions about the rule as it now runs (TODO §1, the FIRST item, has them and the answers), then gave the next session its first item: **label competition weeks as such, and join the name to its definition in Rules & Reminders** — plan first; then the other pending items in the order already set. Nothing was read from the Mac for those answers: they rest on the page as read that morning and on his statement that Week 31 is a competition week. Filed by `handoff-patch-7oct.py` when the link returned (about 6 PM), and the page's wording then re-read and confirmed. Closing checklist re-run: `status.mjs` exit 0, repos accounted for (two docs commits handed over), commit lines in the chat, START-HERE delivered.

---
## ⤵ moved 12 Oct 2026 from HANDOFF.md — 6–7 Oct 2026 — "Vacation Auction 6 Oct 2026 V2" — THE OWNER-ORDERED REVIEW OF THE 6 OCT WORK · STAFF 194 FILED, NOT PUSHED (§248): ON A COMPETITION WEEK A BID MAY BE WEAKENED ONLY IF IT WOULD STILL WIN.

## 6–7 Oct 2026 — "Vacation Auction 6 Oct 2026 V2" — THE OWNER-ORDERED REVIEW OF THE 6 OCT WORK · STAFF 194 FILED, NOT PUSHED (§248): ON A COMPETITION WEEK A BID MAY BE WEAKENED ONLY IF IT WOULD STILL WIN.

**State.** **LIVE: staff 194 / admin 357 — staff `e154617` (`857cf83d…`), pushed 7 Oct 2026 about 7:48 AM during live Phase 2, served twice, pushed page md5-identical to the gated copy (tests `db6042d`, hub `9f04f7d`).** Next auction honesty baseline: `e154617` staff, `86c99e2` admin. **RULED and NOT built: §249 — no weakening at all on a competition week (staff 195, to be planned in a new session; wordings proposed, not ruled).** Schedule untouched.
**The night, in order.** (1) Re-grounding; his paste arrived whole. Before anything he asked whether 193 lets a winner on his live Week 14 board drop from a 7 to a 9 — yes (a weaker bid that would not win was allowed); *"perfect"*. (2) On his *"go"* the review ran to his audit standard — four lanes, a red team, an independent verifier: `tests/docs/REVIEW-6OCT-WORK-2026-10-06.md`. The code of 193 does what was built; the §244 narrowing is safe (its owed audit and mutations DONE); **one HIGH in the rule's reach** — a two-move way to a lowered winning bid while a weaker bid is still on the week. (3) His answer was his own, and better than Claude's fix (remember the strongest bid): *"I would prefer to block dropping to a 9."* Claude: it also has to cover a re-bid after removing, and a drop into Under Review; he first kept Under Review, weighed option B, found it *"too complicated"*, and ruled A — §248, every sentence verbatim there. (4) *"Go"* about 11:30 PM; the Mac link dropped at that moment, so 194 was built and gated in the cloud and written in when the link returned (bundle, `unzip -p`, 12 files md5-verified; the 193 page saved first as `_to_delete/xfer/index-193-a3720e21.html`). (5) His idea for the NEXT session: track "bailing" in the Fair Play report (TODO §1, his words and the suggestions).
**Lessons.** (1) **A rule that judges a change against the CURRENT state can be walked around in two moves** — ask of every "may not be made weaker / later / larger" rule what it remembers. 193's own audit tested single steps only; the fuzz now WALKS (any offered move or a removal, then a move refused at the start). (2) **A walk's model of the save path must be read off the code, not assumed**: the first walk "found" a route by removal that was the model forgetting that a removal stamps the floor (`removeSelection` → `saveBestBid`). Read the red before believing it. (3) **In the browser sandbox the seed already uses numbers**: a bid whose number the person holds on another seed week is silently invalid to the engine and shows as Losing — assert the BOARD on the week card before asserting the rule (the two-slot case was wrong twice for this). (4) **`un<N>` must be safe to run twice** once `un<N-1>` calls it (un193 → un194): an edit already taken out is left alone, anything else is a miss. (5) **A build that makes a page's own advice false is not finished at the gates**: the blind audit found the Remove box still offering what 194 refuses (M2). Grep the page for every sentence that describes the thing a rule changes. (6) `test-334`'s INVARIANCE block has compared against 333/171 with four assertions that no longer hold on ANY recent build; it only runs when a baseline is supplied, so nobody sees it — a decayed gate, filed here, not fixed.
**The morning of 7 Oct.** He took up the all-grey box: the bid box now says why and the way back (§248 addendum) — added to 194 BEFORE any push (one build, one push; *"Please don't push yet"* said in the same turn as the first edit), re-gated, audited a second time, re-filed about 7:45 AM as `857cf83d…`. Two more lessons: (7) **a stress test's own statement of WHEN something should show is a claim too** — its first version expected the note in a box the rule refuses nothing in, and the page was right; (8) **an audit's surviving mutant is closed by a test that makes the thing happen** (the paint made to throw), not by a text pin.
**For the next session.** After his push: the three checks on START-HERE's FILED line. His two calls from the audit (TODO §1: M1 in-flight; M2 the Remove box wording, proposed and not taken up). Then, in his order: bail tracking (plan first), the double e-mail sends, the Popcornometer to 12 hours. The ten paperwork corrections listed in REVIEW-6OCT-WORK are still NOT made.
**After the push (7 Oct, 7:48–8:30 AM): the "week with room left" gap, §249.** He ruled "no weakening at all", saw within ten minutes that it ends the come-down he wants (*"this is a problem"*), and then gave the better rule himself: *"Why can't each person lower to a 5 and a new person would have to come in with a 5?"* — an ENTRY LEVEL. Ruled in full the same half-hour; staff 195, new session (TODO §1, item 1). Lesson (9): **when he picks one of Claude's options in a few words, restate what it costs him in a concrete board BEFORE filing it as settled** — the cost line was in the options, but only the table made him see it; the ruling was filed, pushed past and withdrawn in ten minutes.
**Second session close (7 Oct, about 8:35 AM; context 622,947).** Checklist: 0 fetch on the three public repos, locks moved · 1 chat reviewed — §248 addendum, §249 (every turn of it), the bail idea and its answers in TODO §1 · 2 `status.mjs` exit 0; TODO §1's NEXT block rewritten for the next session · 3 live 194 = the gated bytes (md5), served twice · 4 every repo accounted for (two docs commits handed over) · 5 commit lines in the chat, START-HERE delivered.
**First session close (7 Oct, about 1:15 AM; context reading in the chat).** Checklist: 0 fetch at the start (three public repos; `tests` judged from log and disk), locks moved · 1 chat reviewed — rulings in §248; his idea and its answers in TODO §1 · 2 `status.mjs` exit 0 after the archive pass (two September entries moved by `archive.mjs`) · 3 code proven on the filed bytes (md5 both sides, Mac battery 117 / 4,562) · 4 every repo accounted for · 5 commit lines in the chat (§246), START-HERE delivered to the outputs column. He was asleep from about midnight (*"done for tonight… will pick up in the morning"*, *"amphetamine on"*); everything after that ran unattended on his standing go.

---
## ⤵ moved 13 Oct 2026 from HANDOFF.md — 10 Oct 2026 — "Vacation Auction 10 Oct 2026 V1" — STAFF 202 / ADMIN 363 LIVE (§259): THE BID BOX'S CHOICES ARE BUTTONS · CONTINUE STAYS ON SCREEN · THE SWAP STEP THE SAME.

## 10 Oct 2026 — "Vacation Auction 10 Oct 2026 V1" — STAFF 202 / ADMIN 363 LIVE (§259): THE BID BOX'S CHOICES ARE BUTTONS · CONTINUE STAYS ON SCREEN · THE SWAP STEP THE SAME.

**State.** **LIVE: staff 202 / admin 363 — `2a0c329`, pushed by him 10 Oct about 4:01 PM during live Phase 3, served twice, the pushed pages md5-identical to the gated copies `e97198c5…` / `632abc2b…` (tests `cc975e6`, hub `e24e205`).** Next auction honesty baseline: `2a0c329`. (What follows in this paragraph is how the day stood before the filing: staff 201 / admin 362 (`f6a3761`) was live.) **BUILT AND GATED IN THE CLOUD, in `build-202-files.zip`: staff 202 `e97198c5…` / admin 363 `632abc2b…` — his Mac was off from 8:49 AM, so nothing is in his folders and nothing is pushed.** Phase 3 is running (his word, 9:55 AM); the push goes out during it, at his word. Schedule untouched. No rules change.
**The session, in order.** (1) 7:08 AM re-grounding, all clean (the fetch's three stranded locks moved). (2) 8:48 AM his ask about the bid drop-down; answered from the code, with a phone test page of three versions. (3) 9:55 AM "A is great" + Continue on screen + the Swap step + "Swap bids" larger; ONE plan and a second test page; 10:09 AM praise, not taken as a go; 10:10 AM *"1-all. 2-go. Mac not available."* (4) Built by `apply202.py` on a scratch copy; the suite, the browser check; two blind reviews; the build changed in answer; a verifier; changed again; a second verifier — clean. (5) The sweep compared with 201 row by row, which found a defect in the sweep itself.
**Lessons.** (1) **A CONTROL THAT APPEARS UNDER THE FINGER TAKES THE TAIL OF THE TAP THAT MADE IT APPEAR.** Buttons drawn where a week card, "← Edit" or "← Back" was pressed received the second tap of a double tap and chose silently. Any build that puts a tappable thing where another was pressed needs a guard, and the guard must start again on EVERY change of what is on screen, not only on a paint — the first fix covered the opening and the verifier found the step changes. (2) **A ROW THAT STAYS ON SCREEN COSTS FOUR THINGS, all found by review, none by the first gates:** it can be pressed from where a message at the top is out of view; it covers what the Tab key lands on unless the box has `scroll-padding`; on a short sideways screen it covers the content itself; and it hides the fact that there is more below. (3) **THE SWEEP CLICKED BY POSITION AMONG ALL CONTROLS** — a build that adds controls inside a dialog earlier in the page moves every later click, with no error. It was seen only because the 201 and 202 reports were compared ROW BY ROW, not by their totals (one total differed by one). The comparison is the gate; "sweep clean" alone was true and worthless. (4) **THE PAGE IS DRAWN AT 115% ON A WIDE SCREEN** (`body{zoom:1.15}` above 820px): a height in `vh`/`dvh` is 15% taller than it reads, and a phone held sideways can be wider than 820px. (5) `add_repo` reaches the private `tests` repo from the cloud — the whole battery ran with the Mac off; no tar-and-stage. (6) A slip of Claude's: a stray `git stash` in a diagnostic command line set the tests clone's edits aside for one command; popped at once, nothing lost — one command, one purpose, in a clone that holds unsaved work.
**For the next session.** Nothing is queued on the auction; he drives the order. He has not yet said how the bid box and the Swap step look on his iPhone on the live site. The three points put to him at the hand-over were all accepted as built (3:29 PM, *"I agree with you on all of the calls."*).
**Session close.** Checklist: 0 fetched at the opening, locks moved; the cloud clones match what the Mac held at 7:09 AM (all four clean and level then) · 1 chat reviewed — §259 carries every ruling verbatim · 2 `status.mjs` NOT run on the Mac (off) — OWED at filing · 3 gates as in the BUILD-LOG row, cloud only; Mac gates OWED · 4 repos: nothing pushed, nothing in his folders; everything is in the zip · 5 commit lines in the chat; START-HERE delivered from the cloud copy.
**FILED about 4:00 PM, 10 Oct 2026 (his *"back"*, 3:54 PM): the Mac's bases matched the zip's manifest, 20 files unpacked with `unzip -p` md5-identical, Mac gates green (inline scripts 4/4 both pages, battery 127 suites / 5,507 assertions exit 0, isolation 36/36, the new suite 80/80 and FAILED 52 of 55 on `f6a3761`), `status.mjs` clean.** The owed steps 2–4 of the close are done. **He pushed a minute later (4:01 PM, *"pushed.  handoff."*); live verified twice; the fetch's three stranded locks moved; `status.mjs` clean after; two docs-only commits handed over (hub, and the BUILD-LOG commit id).**

---
## ⤵ moved 14 Oct 2026 from HANDOFF.md — 8–9 Oct 2026 — "Vacation Auction 8 Oct 2026 V2" — STAFF 199 / ADMIN 361 LIVE (§257): "⇄ SWAP BIDS" · THE E-MAIL LOG SAYS WHAT EACH ALERT CARRIED.

## 8–9 Oct 2026 — "Vacation Auction 8 Oct 2026 V2" — STAFF 199 / ADMIN 361 LIVE (§257): "⇄ SWAP BIDS" · THE E-MAIL LOG SAYS WHAT EACH ALERT CARRIED.

**State.** **LIVE: staff 199 / admin 361 — `eb27f69`, pushed by him 9 Oct about 8:16 AM during live Phase 2, served twice, the pushed pages md5-identical to the gated copies `8824e819…` / `2910e403…` (tests `fb1bbbe`, hub `6cf09a6`).** Next auction honesty baseline: `eb27f69`, both pages (this build's own was `1405d99`). Schedule untouched. No rules change.
**The night, in order.** (1) 9:26 PM re-grounding; he asked what was pending and named the "harvest a bid" alert the most important. (2) Explored read-only: the engine throws out every bid of a person with one number on two weeks, so an exchange cannot be two saves; no alert-side fix exists (the hold of §237 is still wrong); ONE plan, the swap he had parked — five questions, all answered. (3) He widened it: every e-mail the site sends listed (fourteen), all kept; the E-mail Log tags; 10:19 PM "1-yes. 2-go." (4) Built in the cloud (`apply199.py`), two new suites, a Chromium check with screenshots. (5) Four blind agents: no CRITICAL / HIGH; two MEDIUM in the save's timing — fixed; a verifier found the fix had opened a smaller window — fixed its way; verified again. Three mutation runs. (6) Zip unpacked with `unzip -p` (19 files md5-verified), Mac gates, filed about 2:50 AM.
**Lessons.** (1) **`REPO_ROOT` ALONE DOES NOT POINT THE BATTERY AT A SCRATCH COPY** — 94 suites read `GH_ROOT`. Four cloud batteries "green on 199" had run them on 198; the Mac, where both roots are the same folder, showed three red (a count of messages, the rules-list order, a send-site pattern). Now in START-HERE §6. A gate that passes on the wrong input is rule 8 again: check what the suite says it tested. (2) **A fix made in answer to an audit needs its own audit.** Closing the box early (to stop a late close shutting another box) let an Edit start before the floor was written; the verifier, blind to round 1, found it. (3) **A fuzz against the real Edit box is the right oracle for "never looser than Edit"** — and it has a blind spot wherever the two weeks act jointly (two lowerings against one left); say so. (4) **Mutation testing found 36 gaps the honesty run could not**: the honesty run proves the suite fails on the OLD build, not that each gate of the NEW code is held by an assertion. A later test also disarmed an earlier one (forged bids left the box un-armed, so "closing an armed box" passed on anything) — when adding a case before an existing one, re-check the existing one's setup. (5) **A non-idempotent action needs its own busy flag** — re-saving a bid is harmless, re-confirming a swap swaps back.
**For the next session.** Nothing is queued on the auction; he drives the order. He accepted everything told to him at filing (*"I'm ok with all of this."*, 9 Oct 8:13 AM) and pushed three minutes later.
**Session close (first at about 3:00 AM while he was away; again 9 Oct about 8:25 AM after his push — context about 750,000, past his 700k line).** Checklist: 0 fetch at the opening, locks moved · 1 chat reviewed — §257 (every ruling verbatim), TODO, the plan · 2 `status.mjs` · 3 gates as in the BUILD-LOG row, cloud and Mac · 4 every repo accounted for (three with files to commit) · 5 commit lines in the chat, START-HERE delivered.

---
## ⤵ moved 14 Oct 2026 from HANDOFF.md — 9–10 Oct 2026 — "Vacation Auction 9 Oct 2026 V1" — STAFF 201 / ADMIN 362 LIVE (§258): THE BID BOX SAYS WHY · UNAVAILABLE NUMBERS UNDER A "NOT AVAILABLE" HEADING (200'S LINE THROUGH THEM WITHDRAWN) · UNDER-REVIEW ENTRY EXPLORED AND CLOSED.

## 9–10 Oct 2026 — "Vacation Auction 9 Oct 2026 V1" — STAFF 201 / ADMIN 362 LIVE (§258): THE BID BOX SAYS WHY · UNAVAILABLE NUMBERS UNDER A "NOT AVAILABLE" HEADING (200'S LINE THROUGH THEM WITHDRAWN) · UNDER-REVIEW ENTRY EXPLORED AND CLOSED.

**State.** **LIVE: staff 201 / admin 362 — `f6a3761`, pushed by him 10 Oct about 7:05 AM during live Phase 2, served twice, the pushed pages md5-identical to the gated copies `363d913b…` / `08186964…` (tests `8de5ef2`, hub `e5bb67b`).** Next auction honesty baseline: `f6a3761`. (Staff 200 = `1a07ba6` was live from 3:28 AM to 7:05 AM.) Schedule untouched. No rules change. (It was built in the cloud because his Mac went off at 12:24 AM, a minute after his go, and filed from `build-200-files.zip` when he came back at 3:21 AM.)
**The session, in order.** (1) 8:25 AM re-grounding, all clean. (2) His timer-window question (the overnight no-close window at a 6-hour reset) — answered from the code (`_quietAdjustExpiry` pushes a close inside the window to its end); a setting of his, nothing filed to build. (3) 10:54 AM: letting a bid ENTER a competition week when it would be Under Review — explored twice at his ask (what it breaks; four ways to build it); 12:11 AM *"Let's leave the design as it is."* — CLOSED, §258 and the CLOSED table. (4) In its place: the note and the line; go at 12:23 AM. (5) Built by `apply200.py`, gated, blind review, 21 mutants; delivered as a zip about 1:25 AM.
**Lessons.** (1) **THE CLOUD CONTAINER'S CLOCK IS NOT ALWAYS UTC** — this one was Pacific, and two admin suites went red on dates; run the cloud battery with `TZ=UTC` (now in START-HERE §6). (2) **A first battery "13 suites failed" was the un-chain, not the build:** every earlier build's invariance suite takes later builds' edits out through `un199`; a new build must generate its own `unNNN.mjs` and hook it into the previous one BEFORE the battery means anything. (3) **An approved sentence can still be untrue** — the reviewer counted, on the real rule, how often the short weakening wording stood over a number it did not explain (467 of 792); a wording check needs the rule run under it, not a read. (4) The env-var trap of §6 again: a `export GH_ROOT` does not survive to the next shell call — the first "run" of the new suite was on the 199 page; the build-number line caught it.
**For the next session.** Nothing is queued on the auction; he drives the order. Both wording points were put to him and accepted as built (*"all sounds good."*). The one thing no gate could look at is a real phone's drop-down.
**FILED 10 Oct about 3:25 AM** — he came back at 3:21 AM (*"back.  all sounds good."*): the Mac's base checked (199 page and the three hub docs exactly as the zip was built on), zip unpacked with `unzip -p` (19 files md5-identical), Mac gates: inline scripts 4/4, battery 126 suites / 5,428 exit 0, isolation 36/36, the 200 suite 67/67 and FAILED 43 of 67 on `eb27f69`; `status.mjs` exit 0 with the FILED, NOT YET PUSHED line. **He pushed three minutes later (3:28 AM); live verified twice; `status.mjs` clean after; two docs-only commits handed over (hub, and the BUILD-LOG commit id).**
**Session close (first at about 1:25 AM with his Mac off; the owed steps 2–4 done at 3:25 AM).** Checklist: 0 fetched at the opening, locks moved · 1 chat reviewed — §258 carries every ruling verbatim · 2 `status.mjs` ran clean at 12:23 AM; NOT re-run after the cloud edits (needs the Mac) — OWED · 3 gates as in BUILD-LOG row 200, cloud only; Mac gates OWED · 4 repos: nothing pushed; everything is in the zip · 5 commit lines in the chat; START-HERE delivered from the cloud copy.
**THEN, the same night — STAFF 201 / ADMIN 362 BUILT AND GATED IN THE CLOUD, NOT YET FILED.** 3:29 AM he found the line through unavailable numbers too faint on his iPhone (live 200); five options; 3:31 AM *"1-1 … Go."* (group them under a heading; leave the line until the replacement is ready). A published phone test page went to him before the build (*"It looks great"*), then his order to drop "greyed out" from the wording. Mac off again about 3:40 AM → `build-201-files.zip`; **FILED about 7:05 AM** when he came back (*"back"*, 7:00 AM): bases matched, 21 files md5-identical, Mac battery 126 / 5,427, isolation 36/36, honesty 37 red on `1a07ba6`, `status.mjs` clean. **He pushed the same minute; live verified twice; `status.mjs` clean after; two docs-only commits handed over.** Nothing is queued on the auction. **Lessons:** (1) **A CHAT PREVIEW IS NOT THE PHONE'S DROP-DOWN** — the struck numbers looked fine in the chat (full-strength text) and faint in the picker (grey text, grey line); what a phone draws is checked on a page he can open on that phone, BEFORE the build is filed (START-HERE rule 19). (2) When a later build WITHDRAWS an earlier build's promise, that build's suite is revised, not left to fail: each withdrawn assertion replaced by what the page now does, and the honesty run moved to the build just pushed.

---
## ⤵ moved 14 Oct 2026 from HANDOFF.md — 10 Oct 2026 — "Vacation Auction 10 Oct 2026 V2" — STAFF 203 / ADMIN 364 LIVE (§260): THE VISIT HISTORY · BLINDED BIDDING RULED AS THE NEXT BUILD.

## 10 Oct 2026 — "Vacation Auction 10 Oct 2026 V2" — STAFF 203 / ADMIN 364 LIVE (§260): THE VISIT HISTORY · BLINDED BIDDING RULED AS THE NEXT BUILD.

**State.** **LIVE: staff 203 / admin 364 — `b6b155b`, pushed by him 10 Oct about 5:49 PM during live Phase 3, served twice, the pushed pages md5-identical to the gated copies `a296fd78…` / `fff33be3…` (tests `d931096`, hub `56f392b`).** Next auction honesty baseline: `b6b155b`. Schedule untouched. No rules change.
**The session, in order.** (1) 4:06 PM re-grounding, all clean. (2) 4:12 PM his ask for a history of each user's visits; explored, ONE plan; 4:26 PM his answers and his second idea (a blinded-bidding switch); 4:32 PM *"1- Go"* and blinding ruled the next build. (3) Built by `apply203.py` on the cloud clone; suite, browser check, sweep compared row by row with 202 / 363; two blind reviews; the build changed in answer (below); a verifier on the final bytes — clean. (4) Filed about 5:45 PM (zip, 15 files md5-identical, Mac gates green); he pushed 5:49 PM. (5) 5:50 PM his question whether stored data will become a problem — answered from the code, then MEASURED from the backup he attached (TODO §1's top entry); 5:56 PM whether the E-mail Log's cap of 1,000 needs lowering — no, by count from the code.
**Lessons.** (1) **THE INDEX-ENTRY LIMIT** — promoted to STANDING TRAPS. The first design (a map per visit, 300 a person) would have filled the document and silently stopped the last-sign-in record too; no gate here could have seen it, a reviewer who knew the limit did. (2) **A "MARK" WRITTEN AS A FRAGMENT CAN OUTLIVE THE THING IT MARKS** — `{u:1}` merged into an entry that no longer existed made an entry with no phase. A follow-up write re-states the whole value. (3) **A TRIM THAT JUDGES BY TIME DELETES GOOD DATA ON A COMPUTER WITH A WRONG CLOCK, AND ONE THAT COUNTS ONLY WHAT IT SHOWS LETS THE REST PILE UP** — trim by shape and rank; filter by plausibility only for display. (4) The sweep's seed holds no visits, so the new button is never clicked by `driver.mjs` — the build's own browser check is what drives it (rule 9); a seed with visits would close that. (5) Both first suites let real mutants live (a second person on the same page, a clock set back, the trim tied to the open panel); `mutate203.py` now holds 26, none alive.
**For the next session.** His order: the BLINDED-bidding switch — explore every place the staff page (and the e-mails) names a colleague, ONE plan, his go. Ruled already (§260): a page-level blind is good enough; anonymous bids keep their number and W / R / L; next build. Advised and not yet ruled: switched only between phases; week FTE totals as words in blinded mode. He has not yet said whether his own visit appeared on User Activity after the push — the one proof no gate could give.
**Session close (10 Oct, about 6:00 PM; context 453,608 at 5:56 PM).** Checklist: 0 fetched after his push, all level, the fetch's two stranded locks moved · 1 chat reviewed — §260 carries every ruling verbatim; his two questions and the measurement are in TODO §1 · 2 `status.mjs` exit 0; six session entries (3–5 Oct) archived, this file 897 → under the tripwire · 3 gates as in the BUILD-LOG row, cloud AND Mac, honesty on the explicit SHA `2a0c329` FAILED as it must; 128 suites ran, none skipped on the auction battery · 4 repos: auction 1 uncommitted (BUILD-LOG commit id), hub docs uncommitted, tests and schedule clean — two docs-only commits handed over · 4a `_to_delete/` read (the 🧹 line) · 5 commit lines in the chat; START-HERE delivered from disk.

## ⤵ moved 15 Oct 2026 from HANDOFF.md — 30 Sep – 1 Oct 2026 — "Vacation Auction 30 Sep 2026 V2" — STAFF 181 + ADMIN 344 LIVE (§225): THE TIMER SAYS WHAT A BID REALLY DOES TO IT.

## 30 Sep – 1 Oct 2026 — "Vacation Auction 30 Sep 2026 V2" — STAFF 181 + ADMIN 344 LIVE (§225): THE TIMER SAYS WHAT A BID REALLY DOES TO IT.

**Start:** staff 180 / admin 343 served twice each; repos in sync after his 23:29 docs pushes; three `maintenance.lock`s moved to `_to_delete/`.

**His question first:** can a bid shorten the clock when the reset window has stepped down (19h left, reset 12h)? Read in code: NO — the save path skips a reset that would not extend, and `firestore.rules` `timerWriteSane()` clause 4 rejects one from a bidder. **He then found the defect:** the staff countdown still said "Resets to 12h with each bid change." Ruling §225, wording settled line by line with him; record of the build: BUILD-LOG row "staff 181 + admin 344".

**Pushed 1 Oct 2026, 1:42 PM** — auction `14807e1`, tests `11ad780`, hub `fec6946`; `versions.json` served 181 / 344 on two cache-busted fetches; pushed pages md5-identical to the gated copies. His word: *"It's working right."* **Also this session:** he questioned two outbid alerts (MA, AQ, 6:02 AM 1 Oct) — neither had touched her bid. Traced with his Change Log and Wk 51 card against `computeApprovals`: ADG's new 4 made the 4s the tied group, so both 5s went Under Review → Lose; alerts report a PROJECTION change, not a bid change. He agreed: *"you are right."* No change.

**Lesson — Claude offered a line that said the opposite of the truth, and corrected it itself:** "Never resets to more time than is already left" (it never leaves LESS). A short rewording of a rule must be re-derived from the code, not from the previous sentence.

**Lesson — work a rule through a full day before recommending how to word it.** Claude recommended showing the "real reset length" overnight; tabulating 3 PM → 3 AM showed the number jumping to 18h and ticking down every minute, and the recommendation changed to naming the end time — said so, dated 1 Oct.

**Lesson — he wants the plan, not the conversation.** After several rounds of piecemeal questions: *"This is all gotten confusing. Present the entire plan as you believe it to be correct."* Lead with one complete plan and the open questions numbered; do not drip options.

**Bridge:** dropped repeatedly while he was away from the Mac (one call hung 190 s). He said *"Stop trying to connect to it"* — the public repo cloned into the cloud was md5-identical to disk and answered every read-only question meanwhile.

## ⤵ moved 15 Oct 2026 from HANDOFF.md — 10–11 Oct 2026 — "Vacation Auction 10 Oct 2026 V3" — STAFF 204 / ADMIN 365 LIVE (§261): BLINDED BIDDING · THE OWN ROW'S ✕ STAYS ON THE BID'S LINE · VACATION BUCKS FILED (§262).

## 10–11 Oct 2026 — "Vacation Auction 10 Oct 2026 V3" — STAFF 204 / ADMIN 365 LIVE (§261): BLINDED BIDDING · THE OWN ROW'S ✕ STAYS ON THE BID'S LINE · VACATION BUCKS FILED (§262).

**State.** **LIVE: staff 204 / admin 365 — `a0fb452`, pushed by him 11 Oct about 7:07 AM during live Phase 3 (*"pushed all 3, decided it was ok"* — his decision, in place of waiting for the end of Phase 3), served twice, the pushed pages md5-identical to the gated copies `c44cc16c…` / `f20a9244…` (tests `55f470f`, hub `d8fd9ed`).** The blind's switch is OFF until he turns it on. Next auction honesty baseline: `a0fb452`. Schedule untouched. No rules change.
**The session, in order.** (1) 6:35 PM re-grounding, all clean (the first two live fetches came back a cached 201 / 362 — fetched again). (2) 6:39 PM his brief for the blind; explored (two independent inventories of the staff page, one of every e-mail), ONE plan and a phone test page of three looks; 8:04–8:10 PM his answers and *"2-go."* (3) 8:17 PM two ideas for a different session, filed as §262 (Vacation Bucks; no leaving a week from a winning position). (4) Built by `apply204.py` on a cloud copy; suite, browser check, battery, sweep on both builds; two blind lanes. (5) 9:01 PM owner-found: his own row's ✕ on a second line on a phone — in the live 203 too; built into 204; the verifier found the first fix made slivers under enlarged text; re-made with a 20px floor; the verifier clean on the final bytes. 9:04 PM: *"will check in tomorrow. mac should stay on."* (6) Filed about 10:35 PM (zip, 9 files md5-identical, Mac gates green).
**Lessons.** (1) **A ROW TOLD NOT TO WRAP HAS TO SAY WHAT GIVES INSTEAD.** The first own-row fix passed its own check (one line, 96 cases) and would have left a ✕ too thin to press for anyone with enlarged text — and those two buttons are the ONLY way to edit or cancel a bid from the card. The check asked "is it one line?" and never "can it still be pressed?"; the verifier measured sizes. A layout gate measures the thing the user must be able to DO (rule 9). (2) **A BYTE-FOR-BYTE "UN-DO" CHECK IS CIRCULAR AGAINST THE BUILD SCRIPT** — `unNNN.mjs` is generated from the same pairs that built the page, so it proves no stray edit exists and nothing about whether the edits are right. Lane 2 re-ran its mutants with it neutralised; eight survived the node suite. Count kills without it. (3) The cloud battery reads one assertion fewer than the Mac's on unchanged bytes (5,634 against 5,635) — a count that follows the machine, not the build; compare like with like.
**For the next session.** Nothing is queued on the auction. His answers 11 Oct, 7:10–7:12 AM (§261): *"looks good"*; a Full Restore takes the switch from the backup, Reset Auction leaves it alone — both as the live 365 does, so no build. He has not yet said how the mark or the own row look on his own phone. Then, in a different session at his word (§262): Vacation Bucks, and no leaving a week from a winning position.
**Session close (11 Oct, about 7:15 AM; context 520,309 at the filing).** Checklist: 0 fetched after his push, all four level with origin, the fetch's three stranded locks moved · 1 chat reviewed — §261 carries every ruling verbatim and his push, §262 the two ideas · 2 `status.mjs` exit 0 · 3 gates as in the BUILD-LOG row, cloud AND Mac, honesty on the explicit SHA `b6b155b` FAILED as it must; 129 suites ran, none skipped on the auction battery · 4 repos: auction 1 uncommitted (BUILD-LOG commit id), hub docs uncommitted, tests and schedule clean — two docs-only commits handed over · 4a `_to_delete/` read (the 🧹 line) · 5 commit lines in the chat; START-HERE delivered from disk.

## ⤵ moved 15 Oct 2026 from HANDOFF.md — 11 Oct 2026 — "Vacation Auction 11 Oct 2026 V1" — STAFF 205 / ADMIN 366 LIVE (§263): THE FAIR PLAY REPORT'S "BAIL" · VACATION BUCKS FILED AS A FUTURE ITEM (§262).

## 11 Oct 2026 — "Vacation Auction 11 Oct 2026 V1" — STAFF 205 / ADMIN 366 LIVE (§263): THE FAIR PLAY REPORT'S "BAIL" · VACATION BUCKS FILED AS A FUTURE ITEM (§262).

**State.** **LIVE: staff 205 / admin 366 — `999c85e`, pushed by him 11 Oct about 4:03 PM during live Phase 3; served twice; the pushed pages md5-identical to the gated copies `ac75830c…` / `9760e158…`** (tests `037b105`, hub `b59bdf5`). Next auction honesty baseline `999c85e`. Nothing is queued on the auction.
**The session, in order.** (1) 7:13 AM re-grounding, all clean. (2) Vacation Bucks talked through once, then *"file this as a future item todo"* (§262 addition). (3) 7:23 AM *"explore bail tracking… look back at the change log"*: the monitor already had a crude "Winning-bid cancel"; a read-only look back over his backup (`tests/bail-lookback.py`, `bail-needed.py`; the named list to him only). (4) His definition narrowed over six messages to: a winning bid taken off a competition week is FAIR when the number was needed where he had been knocked out, a "BAIL AND RETURN" when back before anyone else moved, a BAIL otherwise; no clocks; winning-bid lowering retired; the warning line in. 11:53 AM *"go. during p3."* (5) Built in the cloud by `tests/apply366.py`; two blind review lanes and three verifiers; filed about 3:25 PM.
**Lessons.** (1) **A MUTATION RUN ON A RED BASELINE KILLS EVERYTHING FOR NOTHING** — `mutate366.mjs` now refuses unless the suite is green unmutated, and does not count the invariance section (any change to the build's own text trips it). (2) **A REPLAY NEEDS EVERY ENTRY THAT MOVES THE BOARD, NOT ONLY THE BID ENTRIES** — a deleted user, a restore and a lost removal each left ghosts; a blind reviewer with an independent reference found what 94 green assertions had not. (3) **RENDER THE REPORT BEFORE FILING** — every gate was green while a bail's entry ran its table far off the page (the shared report style keeps cells on one line); one picture showed it (rule 19 applies to reports, not only phones). (4) An honesty run that CRASHES is not a red: one new assertion threw on the old page — made a legible failure.
**Session close (11 Oct, about 4:10 PM; context 728,351 at the filing).** Checklist: 0 fetched after his push, all four level with origin, stranded locks moved · 1 chat reviewed — §262 and §263 carry every ruling verbatim · 2 `status.mjs` exit 0 · 3 gates as in the BUILD-LOG row, cloud AND Mac · 4 two docs-only commits handed over · 5 commit lines in the chat; START-HERE delivered from disk.
**For the next session.** His first look at the real report is the remaining proof (it should list 3 bails, 8 fair-needed, 3 bail-and-return, all Phase 2). Residuals, all LOW and lenient: `tests/docs/REVIEW-366-205-2026-10-11.md`. HANDOFF is near its tripwire (900): the archive pass is due at the next close.

---
## ⤵ moved 16 Oct 2026 from HANDOFF.md — 11 Oct 2026 — "Vacation Auction 11 Oct 2026 V2" — ADMIN 367 LIVE (§263): THE FAIR PLAY REPORT'S ENTRIES AS AN OPENING LINE AND A LABELLED LIST · TWO HARD CONTEXT LINES (§264).

## 11 Oct 2026 — "Vacation Auction 11 Oct 2026 V2" — ADMIN 367 LIVE (§263): THE FAIR PLAY REPORT'S ENTRIES AS AN OPENING LINE AND A LABELLED LIST · TWO HARD CONTEXT LINES (§264).

**State.** **LIVE: admin 367 / staff 205 — `1a202bb`, pushed by him 11 Oct about 9:57 PM during live Phase 3; served twice; the pushed page md5-identical to the gated copy `d16270c6…`** (tests `fa1d55f`, hub `89dc5ea`). Next auction honesty baseline `1a202bb`. Nothing is queued on the auction.
**The session, in order.** (1) 4:34 PM re-grounding: all four repos level, live 366/205 and schedule 151/51 twice; his pasted START-HERE was older than disk (disk used). The V1 session had taken his go for 367 at 4:29 PM and was stopped by him while it tried to compact; nothing of its scratch build reached disk. (2) 4:37 PM his order, then 4:39 PM his ruling — **§264: no new build above 550,000 tokens; at 650,000 all work stops and this checklist runs; ABSOLUTE, no override** (*"i want it absolute because i never want a conversation compacted"*) — written into START-HERE §4, the head of this checklist and DECISIONS; he pushed it (`216bb57`). (3) 4:42 PM *"go"* — admin 367 built afresh in the cloud by `tests/apply367.py`, the real report drawn in Chromium on a made-up log and sent to him (about 4:50 PM) before filing, gated cloud and Mac, one blind review (safe to deploy; one wording slip fixed, six assertions added), filed about 5:40 PM; he pushed about 9:57 PM.
**Lessons.** (1) **A SHELL REDIRECT THAT FAILS LEAVES THE LAST RUN'S OUTPUT TO READ** — `node status.mjs > /tmp/x` on the device VM was refused (an old, unwritable `/tmp/x`), node never ran, and `tail /tmp/x` showed a stale run with other line counts and exit 1. Write gate output under `$HOME` on the device and check the file's time before reading it (rule 8). (2) **A FAITHFUL VIEW BESIDE THE OLD TEXT BEATS REWRITING THE OLD TEXT** — keeping `detail` byte-identical let every 366 assertion and a 10,000-log comparison prove that no verdict moved; the view is checked against it. (3) **A BYTE CHECK CATCHES EVERYTHING AND EXPLAINS NOTHING** — five of 36 mutants died only on "taking the edits out gives 366 back"; each now has an assertion of its own.
**Session close (11 Oct, about 10:05 PM; context 345,724 at the post-push reading).** Checklist: 0 fetched after his push, all four level with origin, stranded locks moved · 1 chat reviewed — §263 (the V2 build) and §264 carry every ruling verbatim · 2 `status.mjs` exit 0; the 6 Oct V1 entry archived (HANDOFF 881 → 872 before this entry); `archive.mjs` REFUSED the older "30 Sep – 1 Oct" entry as not a dated session entry — its date range is not read as a date (a gap in the tool, left in place, not fixed) · 3 gates as in the BUILD-LOG row, cloud AND Mac · 4 docs-only commits handed over (auction BUILD-LOG, hub) · 5 commit lines in the chat; START-HERE delivered from disk.
**For the next session.** His first look at the real report in the new layout is the remaining proof. Residuals, all LOW: `tests/docs/REVIEW-367-2026-10-11.md`.

---
## ⤵ moved 16 Oct 2026 from HANDOFF.md — 11–12 Oct 2026 — "Vacation Auction 11 Oct 2026 V3" — ADMIN 368 AND 369 LIVE (§265): THE ADMIN PAGE WAITS FOR ITS DATA BEFORE IT DRAWS, AND KEEPS LOOKING · BAIL PREVENTION FILED FOR LATER.

## 11–12 Oct 2026 — "Vacation Auction 11 Oct 2026 V3" — ADMIN 368 AND 369 LIVE (§265): THE ADMIN PAGE WAITS FOR ITS DATA BEFORE IT DRAWS, AND KEEPS LOOKING · BAIL PREVENTION FILED FOR LATER.

**State.** **LIVE: admin 368 / staff 205 — `ac9f859`, pushed by him 12 Oct about 6:20 AM during live Phase 3; served twice; the pushed page md5-identical to the gated copy `58a8bb98…`** (tests `648d7da`, hub `1ebc997`). Next auction honesty baseline `ac9f859`.
**The session, in order.** (1) 10:04 PM re-grounding: four repos level, live 367/205 and schedule 151/51 twice; his pasted START-HERE identical to disk but for its last line break. (2) 10:08 PM his idea, filed for later: solutions that make bailing in its worst form impossible; 10:58 PM his further thoughts on it, filed with it (TODO §1). (3) 10:09 PM his order (§265): the admin site to get a loading cover like staff 190; explored read-only, ONE plan (`tests/docs/PLAN-368-…`), four questions; 10:24 PM *"1-yes. 2-no. 3-yes. 4-don't know. Go"* ("3-yes" read as: pushed during Phase 3 — said back). (4) Built in the cloud by `tests/apply368.py`, gated (suite 68/68, `--pre` failed 59/66; browser check 95/95, failed on a 367 site; batteries cloud and Mac 132 / 6,023), phone test page published to him, one blind review (safe to deploy; one MEDIUM, M1, put to him), filed about 11:12 PM; he pushed 12 Oct about 6:20 AM.
**Lessons.** (1) **A CHANGE TO A SHARED WRAPPER BREAKS EVERY SUITE THAT EXTRACTS IT WITH A HAND-MADE CONTEXT** — `test-audit-fixes.mjs` builds `onSnapshot` and `_feedsHealthyOrExplain` inside `with(ctx)`; a new helper they call is a ReferenceError there, and the crash hid a third of its checks. Grep the suites for the function's name before building, and give them the REAL new helpers, not a stub. (2) **RUN THE FULL BATTERY BEFORE THE REVIEW, NOT BESIDE IT** — the reviewer spent effort reporting a red battery the builder was about to see. (3) **A POINT PROBE MUST AIM AT WHAT CAN HOLD A CONTROL** — "nothing behind the cover can be tapped" first failed on the page's own message strip (`#toast`, z 9999, always above everything by design). (4) **ASK EITHER/OR QUESTIONS SO "YES" CANNOT ANSWER THEM** — "during Phase 3, or between phases?" came back "3-yes".
**Session close (12 Oct, about 6:25 AM).** Checklist: 0 fetched after his push, all four level with origin, stranded locks moved · 1 chat reviewed — §265 carries his order and answers verbatim; both bail notes in TODO §1; M1 and the review's pre-existing items in TODO §1 (his call) · 2 `status.mjs` (below) · 3 gates as in the BUILD-LOG row, cloud AND Mac · 4 docs-only commits handed over (auction BUILD-LOG, hub) · 5 commit lines in the chat; START-HERE delivered from disk.
**For the next session.** His first look at the cover on his phone, in use, is the remaining proof. His ruling at the close (§265, 6:26 AM): the page keeps looking; 6:27 AM *"go"* — **admin 369 built and FILED about 6:46 AM, pushed by him about 6:47 AM — LIVE `ffdfad2`, served twice (Pages took about four minutes), md5-identical to the gated `e0aea875…`; tests `4d3e9b4`, hub `3a46231`; next honesty baseline `ffdfad2`** (one look a minute while the cover is up, and one on reconnect; gates in the BUILD-LOG row; review safe to deploy). The pre-existing e-mail items he filed for later (do not surface). **Lesson (5): A FAKE CLOCK THAT STARTS AT ZERO TESTS A PAGE THAT NEVER EXISTS** — the cover reads a zero start as "not begun"; the first 369 run failed seven checks on the harness, not the page. Start fake clocks at a real-looking time.

---
## ⤵ moved 16 Oct 2026 from HANDOFF.md — 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V1" — STAFF 206 / ADMIN 370 AND STAFF 207 LIVE (§266): LOCKED WEEKS GREY, IN PLACE BY A PER-PHASE SWITCH; A WON WEEK GREEN.

## 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V1" — STAFF 206 / ADMIN 370 AND STAFF 207 LIVE (§266): LOCKED WEEKS GREY, IN PLACE BY A PER-PHASE SWITCH; A WON WEEK GREEN.

**State.** LIVE: admin 369 / staff 205 `ffdfad2` (served twice at 6:52 AM). **LIVE: staff 206 / admin 370 — `77c1ed6`, pushed by him about 3:34 PM during live Phase 3; served twice; the pushed pages md5-identical to the gated copies `f5ddab2d…` / `29fe7b60…`** (tests `c581b52`, hub `b88ef93`). Next auction honesty baseline `77c1ed6`.
**The session, in order.** (1) 6:52 AM re-grounding: four repos level, three stranded fetch locks moved, live 369/205 and schedule 151/51 twice. (2) 8:10 AM his idea (locked weeks on the board, greyed); explored read-only; a phone test page published (versions 1–4) and his rulings 1:20–1:42 PM, all verbatim in §266 (grey everywhere, own bid only, won week green from results sent, an admin switch per phase with ONE for Phase 4, every week locked → in place, the tag "🔒 Locked — no bid changes"; "Full" withdrawn on Claude's push-back). ONE plan (`tests/docs/PLAN-206-370-…`); his *"go"* 1:42 PM. (3) Built in the cloud by `tests/apply206.py`, gated (suite 61/61, `--pre` failed 23 of 25; browser check 97/97, failed 52 of 84 on 205; battery cloud and Mac 134 / 6,118; isolation 36/36); one blind review + verifier (safe to deploy; fixes: contrast, the empty-view line, the tests' red scan / leak ban / filtered view); filed while he was away from the Mac, every base md5-checked first.
**Lessons.** (1) **THE SANDBOX BOARD HAS 52 WEEKS, NOT THE SEED'S 8** — "every week locked" first failed in the test, not the page; lock what the page draws. (2) **A BROWSER REWRITES INLINE STYLES** (`rgba(127,29,29,.4)` reads back as `rgba(127, 29, 29, 0.4)`) — match innerHTML with optional spaces. (3) **A REVIEWER CAN BE WRONG — CHECK BEFORE CHANGING**: its "a phase close does not lock every week" was refuted in the admin code (`_lockEveryWeek`) and withdrawn. (4) **MARKUP SCANS CANNOT SEE CSS COLOUR** — scan computed styles.
**Session close (12 Oct, about 3:40 PM).** After his push: fetched, all four level, stranded locks moved; live twice; BUILD-LOG commit id, START-HERE LIVE line (FILED line removed), §266 / TODO / this entry updated; `status.mjs`; docs-only commits handed over (auction BUILD-LOG, hub); START-HERE delivered from disk. Context at close about 480,000. **Then, the same session:** his owner-found item (3:36 PM) answered and ruled 3:40 PM (§266 (11) (12)) and built as **staff 207 — FILED about 4:36 PM, `ed34f097…`** (one review HIGH fixed: a Phase 4 round's denial showed "Winning" before Start Round). **LIVE `17d4e49` — pushed by him about 4:39 PM; served twice; md5-identical to the gated copy** (tests `6958ce0`, hub `866ffe0`); next honesty baseline `17d4e49`. **Lesson (5): A REVIEWER'S "SAFE" IS ONLY AS GOOD AS ITS FIXTURES — the 207 HIGH (a Phase 4 round's denial still "Winning") lived in a window no fixture had: between Send Round Results and Start Round.** **Session close (12 Oct, about 4:45 PM; context about 560,000 — past 550,000, so no new build).** All four repos level with origin, stranded locks moved; live twice; records updated; docs-only commits handed over; START-HERE delivered from disk. **For the next session:** his first look at the board on his iPhone; HANDOFF is at its tripwire — the archive pass (`node archive.mjs`) is due before the next hand-over. Told to him, his call: the holiday label keeps its own colour on a grey card; the admin toggle writes all four values; the empty-view sentence is new wording.

---
## ⤵ moved 17 Oct 2026 from HANDOFF.md — 14 Oct 2026 — "Vacation Auction 14 Oct 2026 V2" — ADMIN 378 LIVE (§277): EVERY ADMIN DIALOG FITS THE SCREEN · THE MESSAGE BOX LETS TAPS THROUGH · THE TEST SITE'S RED BAR GONE

## 14 Oct 2026 — "Vacation Auction 14 Oct 2026 V2" — ADMIN 378 LIVE (§277): EVERY ADMIN DIALOG FITS THE SCREEN · THE MESSAGE BOX LETS TAPS THROUGH · THE TEST SITE'S RED BAR GONE

**State.** LIVE: admin 378 `56a5f1c` / staff 212 (tests `ed8a847`, hub `7747c16` + this close's docs), served twice, the pushed page md5-identical to the gated `84cc823d…`. Next auction honesty baseline `56a5f1c` (admin), `23dfb11` (staff). Test site republished with 378 / 212 BEFORE the push and recorded.
**The session, in order.** (1) 10:54 AM re-grounding at 198,972. (2) §277 explored: the cause is the ONE shared admin dialog box (no height limit, nothing scrolls) — the LIVE page too on a short or sideways phone; plan 378. (3) His answers 11:03 AM; a phone test page (old box beside new); GO 11:08 AM. (4) Built in the cloud while he was away (§200 zip precedent), gated, blind review (H1: a dialog opened part-way down → scroll reset AFTER show), verifier found a pre-existing HIGH (the faded message box took taps meant for the month picker's buttons) → `#toast{pointer-events:none}`, his *"keep it."*; filed on his return, pushed ~1:58 PM. (5) §275 his *"fold into next build"* (the results sender's never-twice gap). (6) He asked for the pending list; then §279 (bail prevention A vs B, the minimum-bid label) and *"Handoff now."*
**Lessons.** (1) **A DIALOG CAP BELONGS TO THE SCREEN, NOT TO THE PADDED LAYER** — `max-height:100%` inside a 24px-padded flex layer shrank two dialogs that already fitted; the "same as the old build where it fitted" check is what caught it — keep that shape of check for any layout change. (2) **A HIDDEN ELEMENT IGNORES A SCROLL RESET** — set `scrollTop` after it is shown; the first fix (before "show") passed review by eye and failed the browser gate. (3) **ON THE MAC, `/tmp` IS NOT WRITABLE FROM `device_bash` AND MAY HOLD AN OLD FILE** — a `> /tmp/x; tail /tmp/x` read a stale file from an earlier session as if `status.mjs` had run (it had not); write scratch output under `$HOME`, and read the exit code directly (START-HERE rule 11). (4) **A TEST STUB'S NARROWNESS IS A CONSTRAINT ON THE PAGE'S STYLE, NOT A BUG** — `test-wheel-fairness` offers only `getElementById` on purpose; the page got an id instead of the suite getting `querySelector`.
**Next session.** The site-security build (§275 + the results sender's gap) — push order (rules first, RA-2 his) and his GO first; then §279.
**Session close** about 2:15 PM 14 Oct at about 445,000 tokens. `_to_delete/` holds `xfer378/` and moved locks — his to empty.

---
## ⤵ moved 17 Oct 2026 from HANDOFF.md — 14–15 Oct 2026 — "Vacation Auction 14 Oct 2026 V3" — STAFF 213 / ADMIN 379 + RULES LIVE (§275): ONLY COLLEAGUES READ ADDRESSES AND BIDS · RESULTS NEVER SENT TWICE, EVEN UNRECORDED · A/B

## 14–15 Oct 2026 — "Vacation Auction 14 Oct 2026 V3" — STAFF 213 / ADMIN 379 + RULES LIVE (§275): ONLY COLLEAGUES READ ADDRESSES AND BIDS · RESULTS NEVER SENT TWICE, EVEN UNRECORDED · A/B

**State.** LIVE `1a47c63` (staff 213 / admin 379 + firestore.rules published by him ~6:40 AM 15 Oct), served twice, pushed bytes md5-identical (`3e74039d…` / `3b7850c2…` / `0171f0d8…`); tests `6275774`, hub `6e96250` + this close's docs. RA-2 249 / 249 on the new rules, honesty 24 / 24 (run twice by him, the second on the published rules). Test site carries 213 / 379 (recorded). Next auction honesty baseline `1a47c63`.
**The session, in order.** (1) 2:11 PM re-grounding at 228,492. (2) Security plan refreshed on 378 / 212 with the sender gap folded in; his answers 2:21 PM (not-confirmed counts as reached; `signInMisses` admins only; push order) and GO; built in the cloud (Mac away). (3) He filed the private-repos idea for later (TODO §1). (4) Blind review: H1 (a refused first address re-written to the ledger) fixed; H2 ("no answer" also = a browser that cannot reach EmailJS) → pause after that doctor; filed 11:45 PM. (5) His questions (how is he told? can he send to one doctor?) → A (a dialog that stays; Dashboard "Review") and B (per-doctor red-confirmed "send again"); his GO 11:55 PM; built in the cloud; review H1 ("Send to the rest" replayed a stale send after a Reset elsewhere) fixed by rebuilding from current data; re-filed 6:35 AM; pushed 6:40 AM.
**Lessons.** (1) **ON THE MAC, `device_bash` BACKGROUND JOBS DIE WITH THE CALL** — `nohup … &` was killed when the call returned; run the auction battery in the FOREGROUND (it takes ~25 s; START-HERE §6 already says so). (2) **A TEST'S OWN LEFTOVER STATE CAN LOOK LIKE A RULES FAILURE** — RA-2's new last check failed because an earlier section left a 61-key board (the 60-key bound refused one more); re-seed before any check that writes. (3) **A "RESUME" BUTTON MUST REBUILD FROM CURRENT DATA, NEVER REPLAY A CLOSURE** — a dialog can outlive the auction it was opened in. (4) **SWAP-GENERATED UNDO MODULES MUST NOT OVERLAP** — the context of one swap stepped on the next (9 misses); `gen2` stops each swap's context where the next begins.
**Next session.** His order (§279): explore stopping the worst kind of bail (A vs B) and build the "minimum bid required" label. LOWs from the A/B review are in `tests/docs/REVIEW-213-379-2026-10-14.md`.
**Session close** about 6:45 AM 15 Oct at about 540,000 tokens. `_to_delete/` (562 MB) — his to empty.

---
## ⤵ moved 18 Oct 2026 from HANDOFF.md — 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V2" — STAFF 208 / ADMIN 371 LIVE (§267): WHEN BIDDING CLOSES NOTHING MOVES · A HAND UNLOCK AFTER THE CLOSE: DECLINED.

## 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V2" — STAFF 208 / ADMIN 371 LIVE (§267): WHEN BIDDING CLOSES NOTHING MOVES · A HAND UNLOCK AFTER THE CLOSE: DECLINED.

**State.** LIVE: staff 207 / admin 370 `17d4e49` (served twice at the opening). **FILED, NOT PUSHED: staff 208 / admin 371** — gated staff `83b39ae5…`, admin `251feb0a…`, versions.json `abc6f88a…`; the push is his. **PUSHED BY HIM about 7:50 PM — LIVE `ab7f2d8`** (tests `17ba1b7`, hub `7621028`); served twice; the pushed pages md5-identical to the gated copies. Next auction honesty baseline `ab7f2d8`. Phase 3 CLOSED 12 Oct 2026 (his word, 5:50 PM); Phase 4 opens next year.
**The session, in order.** (1) 4:42 PM re-grounding: four repos level, three stranded fetch locks moved, live 207/370 and schedule 151/51 twice; context 171,176. (2) His question on the last build, then owner-found: the board looked different at phase end depending on whether an admin page was open — the lock record is written only by an admin page; explored read-only; options A–D for Phase 1; he chose C; the plan; his go 6:09 PM (§267 verbatim). (3) Built in the cloud while the bridge was down; one blind review + verifier (safe to deploy; two LOW wording cases fixed); the old suites caught three more things (the retired word "draw" in two names, apostrophes in comments vs test-203's stripper, an empty-board edge) — all fixed in the page, 12 suites repointed, `un208.mjs` generated. (4) Bridge back: filed by zip — see the STANDING TRAP of today (18 files emptied by a stale `/tmp` manifest, restored from git the same minute, verified); then the safe unpack, 22 of 22 md5-verified; Mac battery 136 / 6,133.
**Lessons.** (1) **LOCK WHAT THE PAGE DRAWS, AGAIN** — the first browser check locked the seed's 8 weeks, not the board's 52 (206's lesson repeated): take the week list from the drawn board. (2) **A WRAPPER ON A SHARED WRITE TOUCHES EVERY SANDBOX THAT EXTRACTS ITS CALLERS** — seven suites needed the real `_withCloseLayout` added; add the real function, never a stub. (3) **THE STALE `/tmp` TRAP** (STANDING TRAPS).
**His ruling 7:53 PM (§267, verbatim there):** an admin unlock after the close puts that week on the board in its month (up from the bottom if it was there; no change if already in its month) — then, told it arises only after a close in a phase set to the bottom and only on a hand unlock: *"I would never do that"* — DECLINED 8:05 PM; nothing queued.

---
## ⤵ moved 18 Oct 2026 from HANDOFF.md — 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V3" — STAFF 209 / ADMIN 372 LIVE (§268): PHASE 4 COUNTS LEAVE AN ANNOUNCED ROUND'S RESULT OUT · THE AUCTION'S PENDING LIST TRIAGED (§269) · THE FORGED-LOG RULES BUILD DECLINED (§252).

## 12 Oct 2026 — "Vacation Auction 12 Oct 2026 V3" — STAFF 209 / ADMIN 372 LIVE (§268): PHASE 4 COUNTS LEAVE AN ANNOUNCED ROUND'S RESULT OUT · THE AUCTION'S PENDING LIST TRIAGED (§269) · THE FORGED-LOG RULES BUILD DECLINED (§252).

**State.** LIVE: staff 209 / admin 372 `7273296` (tests `575fc6b`, hub `6dc2c5b` + the triage docs commit), served twice, pushed pages md5-identical to the gated copies `96f5418f…` / `0ed2ab15…`. Next auction honesty baseline `7273296`. Phase 3 closed; Phase 4 next year. Nothing filed and unpushed but the hub's docs.
**The session, in order.** (1) 8:10 PM re-grounding at 180,157; live 208 / 371 twice. (2) The one current item, F1 (forged change-log entries, a rules build), judged low practical risk — DECLINED (§252). (3) He asked for the whole pending list; Claude recommended what Phase 4 touches; class hunt by one independent agent: nothing that decides anything is wrong, O-G already gone from screen, three real defects; ONE plan. (4) His rulings 8:52 / 8:57 PM: fix (not remove) Struggling Users, the simulator (O-F), the staff chip — built in a scratch copy by `apply209.py`; a blind review (3,000-board fuzz, safe to deploy; one LOW fixed, two LOW accepted by him 9:40 PM); pushed 9:41 PM. (5) §269: his goal to resolve the whole list; triage of groups 1–3 the same evening — the schedule and CRNA stay parked; out of it: the SMALL-FIX BATCH, the timer run-out piece, the TEST SITE, in that order (TODO §1). Owner-found on the way: the changes-list drop-down scroll; reports on his phone (Chrome, from a home-screen icon) with no way back.
**Lessons.** (1) **READ THE HONESTY RUN'S PASSES** (rule 18) paid again: two of 209's assertions passed on the old build by vacancy (an empty simulator result "never on the won week"; an un-chain that is a no-op on the old page) — both now demand the evidence exists. (2) **THE STALE `/tmp` TRAP, AGAIN, in a new form:** a `node status.mjs > /tmp/st.out` redirect failed (Permission denied) and `tail /tmp/st.out` showed an OLD run's output as if it were this one — write gate output into `_to_delete/`, never `/tmp`, and read the exit code. (3) **A MUTATION RUN ON THE MAC NEEDS A FRESH FOLDER PER MUTANT** — the bridge cannot delete, so a reused folder silently fails to reset. (4) **"Exactly the same test" carries that test's edges with it:** the shared round test also left out the CURRENT round's announced denial in the gap before Start Round — the review found it; he accepted it.
**Next session.** The SMALL-FIX BATCH (TODO §1 and §269): explore, ONE plan, his go. Read §269 whole first.
**Session close** about 10:15 PM at 486,149; hub docs to push; `_to_delete/` holds this session's scratch (`wip209/`) — his to empty.

---
## ⤵ moved 18 Oct 2026 from HANDOFF.md — 12–13 Oct 2026 — "Vacation Auction 12 Oct 2026 V4" — STAFF 210 / ADMIN 373 AND STAFF 211 LIVE (§269): THE SMALL-FIX BATCH · THE CHANGE LISTS REDONE · "🔒 LOCKED".

## 12–13 Oct 2026 — "Vacation Auction 12 Oct 2026 V4" — STAFF 210 / ADMIN 373 AND STAFF 211 LIVE (§269): THE SMALL-FIX BATCH · THE CHANGE LISTS REDONE · "🔒 LOCKED".

**State.** LIVE: staff 211 `ebb8438` / admin 373 `3699217` (tests `64337ba`, hub `9c38876` + the closing docs commit), each served twice, pushed bytes md5-identical to the gated copies. Next auction honesty baseline `ebb8438` (staff), `3699217` (admin). Phase 3 closed; Phase 4 next year. He looked at it all on his phone and computer: *"all looks good to me"* (9:19 AM).
**The session, in order.** (1) 10:15 PM re-grounding at 199,948; START-HERE delivered. (2) The small-fix batch explored by four read-only lanes; ONE plan (`tests/docs/PLAN-210-373-SMALL-FIX-BATCH-2026-10-12.md`); found already done: item 12 (admin 350), item 24 (208), two of three T-10 lines (181 / 344). His answers 10:29 PM and go. (3) Built by `apply210.py` in a cloud scratch copy; phone test page sent before filing (rule 19); gates — the new browser check caught a real defect (the sheet's blur override lost to #pcWidget's INLINE style); 29 old suites needed the un-chain (`un210.mjs`) + 13 repoints; blind review SAFE. Filed 6:10 AM on his phone-test approval; pushed 6:20 AM. (4) OWNER-FOUND on the live 210 (6:22 AM): the phone sheet blended in when empty, the ✕ was tiny, the computer list vanished while the cursor was in it (pre-existing `onmouseleave` + a 6 px gap). Redesigned on test pages v2 → v3 (his "can it not move up?" → a box in the MIDDLE of the phone screen; *"perfect now"*). Built as staff 211 with "🔒 Locked" on the locked card (heading kept, his word), the compact Close and sign-out tidying (the review's LOWs, at his word), and `_npFit` (a verifier found the computer list ran off the LEFT edge with the timer off — pre-existing; fixed under his "re-think the box logic" brief and told to him). Three review passes SAFE; pushed 8:42 AM.
**Lessons.** (1) **A TEST PAGE'S MOCK MUST CARRY THE REAL PAGE'S INLINE STYLES** — 210's phone test page used a stylesheet blur where the live box sets it inline, so the page looked right while the real override failed; the gate caught it. (2) **TEST THE EMPTY STATE** — 210's sheet was tried only with a full list; empty, it blended into the page. Every list or panel build now looks at empty and full. (3) **A STOPPED AGENT CAN STILL LEAVE FILES** — two gate runs he stopped had already written drafts (06:38 / 06:43); the next run found and reviewed them rather than trusting them. (4) Known flake: `test-347` "OFF is identical" can straddle a minute boundary; a re-run passes.
**Next session.** The timer run-out piece (TODO §1 ▶ NEXT): explore, ONE plan, his go; then the test site.
**Session close** about 9:25 AM at 512,768; docs to push (auction BUILD-LOG, hub); `_to_delete/` holds this session's transfer bundles (`xfer210/`, `xfer211/`) and moved locks — his to empty.

---
## ⤵ moved 18 Oct 2026 from HANDOFF.md — 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V1" — ADMIN 374 LIVE (§270): A RUN-OUT CLOSES BIDDING ON THE SERVER · THE TEST SITE PLANNED (§271)

## 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V1" — ADMIN 374 LIVE (§270): A RUN-OUT CLOSES BIDDING ON THE SERVER · THE TEST SITE PLANNED (§271)

**State.** LIVE: staff 211 `ebb8438` / admin 374 `de3fc98` (tests `887c1c5`, hub `675fa4e` + this close's docs), served twice, the pushed admin md5-identical to the gated `485bdb2d…`. Next auction honesty baseline `de3fc98` (admin), `ebb8438` (staff).
**The session, in order.** (1) 9:50 AM re-grounding at 169,470; START-HERE delivered (the attached copy was an OLDER draft `4e636dab…` than disk `cee9138b…` — disk used, rule 13). (2) The run-out piece explored read-only; ONE plan (`tests/docs/PLAN-374-RUNOUT-SETS-CLOSED-FLAG-2026-10-13.md`); his answers and go 11:23 AM (§270). (3) Rules & Reminders drawn like the change lists — raised by him, advised as its own build, then DECLINED (*"forget it.  the current drop down works well."*). (4) Admin 374 built by `apply374.py` in a cloud scratch copy; `un374` chained ahead of `un211`; four suites repointed; new `test-374` 56/56, FAILS on 373; cloud and Mac batteries 140 / 6,503 green, 0 skipped; blind review SAFE, its three suite gaps closed before filing; filed ~12:30 PM, pushed ~12:38 PM. (5) The test site explored read-only; ONE plan (`tests/docs/PLAN-TEST-SITE-2026-10-13.md`); his four answers 12:49 PM (§271). Not built.
**Lessons.** (1) **SAME-ORIGIN HOSTING SHARES BROWSER STORAGE WITH THE LIVE SITE** — every site on `anesthesia-kp.github.io` is one origin; both real pages read `auctionConfigV1` at start. Any copy of the pages served there could change what the live page shows in that browser. Test copies go on their own origin (a published page). (2) **A SHELL EXIT CODE IS NOT THE SCRIPT'S** — `node status.mjs > /tmp/st.txt` "exited 1" because the redirect was refused on the device, so status.mjs never ran; check the redirect target is writable (use `$HOME/…` on the device) before reading the number. (3) Rule 18 paid again: one new assertion passed on 373 through `[].every()` on an empty list — found by reading the honesty run's passes, closed before filing.
**Next session.** The test site build (TODO §1 ▶ NEXT): his go first; step 1 is the probe page on his phone and computer.
**Session close** about 1:20 PM at 411,050; docs to push (hub, tests); `_to_delete/` holds this session's transfer bundle (`xfer374/`) and moved locks — his to empty.

---
## ⤵ moved 18 Oct 2026 from HANDOFF.md — 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V2" — THE TEST SITE BUILT AND PUBLISHED (§271) · PHASE 3 RESULTS SENT TWICE, FOUND AND PLANNED (§272)

## 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V2" — THE TEST SITE BUILT AND PUBLISHED (§271) · PHASE 3 RESULTS SENT TWICE, FOUND AND PLANNED (§272)

**State.** LIVE unchanged: staff 211 `ebb8438` / admin 374 `de3fc98`, served twice at the opening. Nothing the auction serves changed this session. Next auction honesty baseline still `de3fc98` (admin), `ebb8438` (staff).
**The session, in order.** (1) 1:20 PM re-grounding at 190,544; START-HERE delivered (the attached copy was older than disk — disk used). (2) His go on the test site, 1:33 PM; the probe page published and run on both his devices (desktop app 13/13; iPhone app 12/13 — a new tab is refused there, as expected). (3) The test site built in `tests/testsite/` and `tests/test-testsite-make.mjs`, published privately (link in HANDOFF checklist step 3a and the plan §10); browser check 31/31 and red under six deliberate breaks; Mac battery 141 / 6,540, exit 0. Files unpacked from `_to_delete/xfer-testsite/` and md5-verified. (4) 6:19 PM his ask to remove the Messaging Users card's extra "Send Phase Results" → read: same function as the phase card's; then his two E-mail Log exports showed every Phase 3 results address e-mailed twice — two overlapping sends; cause read in the code and a five-part plan filed (§272, TODO top). Not built.
**Lessons.** (1) **AN E-MAIL LOG EXPORT ANSWERS WHAT THE CODE CANNOT** — the reading "the extra button caused it" was wrong twice over; the timestamps showed two overlapping sends, which no reading of the buttons could. Ask for the log early. (2) **A bare `fake/x.js` in an `import` is not a path** — the staff copy failed to load until it was `./fake/x.js`; the browser check found it. (3) **A guard that expires is only as good as the longest run it guards** — the results claim lasts 2 minutes; a sleeping phone made a send last 53.
**Next session.** §272 first (owner-found): put the plan to him as ONE plan, his go, build, full gate + independent review. Then the test site waits on his look.
**Session close** about 8:30 PM at about 465,000; his pushes owed: tests (`Tests: test site`) and hub (`Docs: test site built`) — the hub commit now also carries §272, the TODO entry and this entry. Test site: no page changed — not republished. `_to_delete/` holds `xfer-testsite/` and moved locks — his to empty.

---
## ⤵ moved 18 Oct 2026 from HANDOFF.md — 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V3" — ADMIN 375 LIVE (§272): RESULTS E-MAILS SENT ONCE, HOWEVER MANY ADMINS CLICK · A "BETWEEN PHASES" STATE FILED AS HIS IDEA

## 13 Oct 2026 — "Vacation Auction 13 Oct 2026 V3" — ADMIN 375 LIVE (§272): RESULTS E-MAILS SENT ONCE, HOWEVER MANY ADMINS CLICK · A "BETWEEN PHASES" STATE FILED AS HIS IDEA

**State.** LIVE: staff 211 `ebb8438` / admin 375 `ab6e2ea` (tests `ddd4a83`, hub `8f132e9` + this close's docs), served twice, the pushed admin md5-identical to the gated `38fb99f0…`. Next auction honesty baseline `ab6e2ea` (admin), `ebb8438` (staff).
**The session, in order.** (1) 8:45 PM re-grounding at 184,176; START-HERE delivered (attached copy older than disk — disk used). (2) §272 re-read on live 374 and put to him as ONE plan (`tests/docs/PLAN-375-RESULTS-SENT-ONCE-2026-10-13.md`); answers 8:55 PM, go 8:56 PM. (3) His new idea filed (TODO §1): a "between phases" state for the gap after Complete Phase and before Begin Phase — not explored. (4) His Mac went away: admin 375 built in the CLOUD (the private tests repo attached to the session and cloned — no Mac staging needed), gated, blind review + verifier (SAFE; the clock MEDIUM fixed with a heartbeat claim), delivered as `build-375-files.zip`, unpacked when he came back, pushed ~10:40 PM. Test site republished with 375.
**Lessons.** (1) **A LEASE JUDGED ACROSS TWO DEVICES' CLOCKS IS NOT CLOCK-SAFE** — the plan said a wrong clock could only cause an early handover; the review showed a clock 90 s fast takes over a LIVE send. Fix: never compare clocks — the holder counts a heartbeat, a watcher measures "unchanged for 2 minutes" on its own clock. (2) **A DOCTOR WITH TWO ADDRESSES IS TWO E-MAILS** — checks and records must be per ADDRESS; the new suite's first run found it. (3) **RUN-ALL COUNTS ONLY A LAST LINE ENDING "(N assertions)"** — a new suite without it is run but not counted (the total sat at last build's 6,540). (4) **THE BUTTON SWEEP CLICKS BY POSITION** — after a click changes the page, later clicks land one button off their log line (TODO test gaps). (5) **The private tests repo can be attached to a cloud session** (`add_repo`) — a build no longer needs the Mac to start.
**Next session.** His idea first if he asks: the "between phases" state — explore read-only (what each page shows and works from in that gap), ONE plan with wording.
**Session close** about 10:55 PM; docs to push (hub: TODO, START-HERE, HANDOFF, archive; auction: BUILD-LOG row 375). `_to_delete/` holds `xfer375/` and moved locks — his to empty.

---
## ⤵ moved 18 Oct 2026 from HANDOFF.md — 13–14 Oct 2026 — "Vacation Auction 13 Oct 2026 V4" — STAFF 212 / ADMIN 376 LIVE (§273): AFTER RESULTS ARE SENT, THE PAGES SAY WHAT IS COMPLETE AND WHAT IS NEXT

## 13–14 Oct 2026 — "Vacation Auction 13 Oct 2026 V4" — STAFF 212 / ADMIN 376 LIVE (§273): AFTER RESULTS ARE SENT, THE PAGES SAY WHAT IS COMPLETE AND WHAT IS NEXT

**State.** LIVE: staff 212 / admin 376 `23dfb11` (tests `40b62ae`, hub `40c4f22` + this close's docs), served twice, the pushed pages md5-identical to the gated `36749796…` / `9e610606…`. Next auction honesty baseline `23dfb11` (both pages). Test site carries 212 / 376.
**The session, in order.** (1) 10:48 PM re-grounding at 195,210; START-HERE delivered (the attached copy differed only by a final newline — disk used). (2) His "1-go": the "between phases" idea explored by three read-only lanes; ONE plan (`tests/docs/PLAN-212-376-BETWEEN-PHASES-STATE-2026-10-13.md`) and a phone test page. (3) "2-done": he tried the test site. (4) 11:07–11:12 PM his wording replaced "between phases" ("Phase N complete · Phase N+1 is next", "Fall Vacation Auction Complete", rounds the same, "Auction Complete", timer box hidden; "is next" over "starting soon" on Claude's push-back) and "Go". (5) Built in the cloud, gated, one blind review (SAFE; its MEDIUM fixed on admin, told for staff — the last round's line lasts until "Mark results sent"), verified, unpacked on the Mac from `build-212-376-files.zip` (20 files md5-verified; Mac battery 143 / 6,696, isolation 36/36), filed; pushed by him 14 Oct about 7:35 AM.
**Lessons.** (1) **A BROWSER CHECK THAT NEVER SIGNED IN STILL PASSED HALF ITS ASSERTIONS** — `textContent` reads fine on hidden elements, and an element's computed `display` ignores a hidden ancestor; the first assertion of any sandbox browser check is "signed in, the board is on screen". (2) **THE SANDBOX SIGN-IN NEEDS ITS INIT SCRIPT** — `window.__TEST_EMAIL` (a seeded user) and the fixed clock, as `locked-206-check.mjs` does; without them the page stays on the sign-in screen. (3) **A ROUNDS-RUN PHASE 4 HAS TWO "COMPLETE" CLICKS** — Complete Phase 4 stages, "Mark results sent" stamps; wording keyed on the stamps reads the gap between them as the last round's gap.
**Next session.** Nothing queued on the auction from this session.
**Session close** about 7:45 AM 14 Oct; docs to push (hub: TODO, START-HERE, DECISIONS, HANDOFF, archive; auction: BUILD-LOG row 212 / 376 commit). `_to_delete/` holds `xfer212/` and moved locks — his to empty.

---
## ⤵ moved 21 Oct 2026 from HANDOFF.md — 14 Oct 2026 — "Vacation Auction 14 Oct 2026 V1" — ADMIN 377 LIVE (§276): 📨 MESSAGES · THE TEST SITE GATED (§278) · "RISKY TO BUILD" LIFTED (§274)

## 14 Oct 2026 — "Vacation Auction 14 Oct 2026 V1" — ADMIN 377 LIVE (§276): 📨 MESSAGES · THE TEST SITE GATED (§278) · "RISKY TO BUILD" LIFTED (§274)

**State.** LIVE: admin 377 `d3f8b95` / staff 212 (tests `61d91a4`, hub `024f419` + this close's docs), served twice, the pushed page md5-identical to the gated `e7367ee7…`; rules published by him FIRST (RA-2 193 / 193, honesty 4 / 4 red). Next auction honesty baseline `d3f8b95` (admin), `23dfb11` (staff). Test site republished with 377 / 212 and RECORDED (`tests/testsite/published.json`).
**The session, in order.** (1) 7:41 AM re-grounding at 206,013. (2) §274 *"Remove the guidance that it's risky to do new builds"* — §164 item 4 lifted; §92 and the working method kept. (3) Survey questions and Google Forms answered in chat (not filed). (4) Privacy on the site: six concerns and the admin-only list; §275 *"only address site security for now"* — ONE plan `tests/docs/PLAN-SECURITY-REGISTERED-READS-2026-10-14.md`, his 1-yes (bid documents too) / 2-yes (adminAccess admins-only); the build is the NEXT session's (his order). (5) §276 Messages: explored, planned, ruled, GO 9:20 AM, built in the cloud, gated, blind review (H1 double-send after a page dies — fixed with the "trying" mark; four MEDIUM), verifier SAFE, filed, pushed rules-first. (6) §277 owner-found on the test site (Phase 4 dialog buttons) — filed for later at his word, FIRST next session. (7) §278 he found the test site behind; republished; the gate built (`status.mjs` exit 8).
**Lessons.** (1) **THE TEST SITE IS PART OF FILING, NOT OF CLOSING** — promoted: HANDOFF 3a and START-HERE's paperwork row; `status.mjs` enforces it. (2) **A RULES CHANGE THAT ADDS A DOCUMENT REVERSES THE PUSH ORDER** — under the old rules a new document falls to the public read default and the member write catch-all, so the console publish goes FIRST (the review's M4). (3) **"NEVER TWICE" NEEDS A MARK BEFORE THE SEND, NOT ONLY A RECORD AFTER** — a delivery and its record are two steps; a page can die between them. Admin 375's results sender has the same gap (the review's note) — not raised with him yet.
**Next session.** First §277 (owner-found), then the security build (§275, plan filed, his answers 1 / 2 given; push order to settle). The 375 results sender's same gap: mention when the security build is planned.
**Session close** about 11 AM 14 Oct at about 530,000 tokens; docs to push (hub; tests `published.json`, `mark-published.mjs`). `_to_delete/` holds `xfer377/` and moved locks — his to empty.

---
## ⤵ moved 21 Oct 2026 from HANDOFF.md — 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V1" — STAFF 214 FILED (§279): "MINIMUM NEW BID" AND THE BID BOX'S OWN-MINIMUM NOTE · THE BAIL FIX SHAPED FOR A NEW SESSION

## 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V1" — STAFF 214 FILED (§279): "MINIMUM NEW BID" AND THE BID BOX'S OWN-MINIMUM NOTE · THE BAIL FIX SHAPED FOR A NEW SESSION

**State.** LIVE: staff 214 / admin 379 + rules — staff 214 `405dda0` pushed by him about 11:30 AM, served twice, the pushed page md5-identical to the gated copy `980c57cf…`; tests `6f727cd`, hub `f69de09` + this close's docs. Mac battery 147 suites exit 0; the test site carries staff 214. Next auction honesty baseline `405dda0`.
**The session, in order.** (1) 6:43 AM re-grounding at 237,379. (2) §279 explored: a plain "block unless needed" would have stopped none of the real bails (Claude corrected its 14 Oct view); move-not-remove proposed; replay of his 15 Oct backup — 15 winning exits in Phases 1–3: 8 needed, 4 bails, 3 bail-and-return. (3) His rulings through the morning (all in §279): move-not-remove yes, then re-opened; exit allowance DECLINED ("terrible"); zero allowances; the zero-bail standard; his "no lowering after a move" idea and its warning; the label as "Minimum new bid" plus the box's note (wordings 1 and 2); bid-lowering items left out; remove bid lowerings later. (4) Staff 214 built in the cloud (Mac asleep 7:10–9:17), reviewed blind (one MEDIUM fixed), verified twice (one HIGH fixed: other weeks' numbers read as a rule limit), filed about 11:19 AM.
**Lessons.** (1) **A NUMBER A PERSON HOLDS ON ANOTHER WEEK IS NOT A RULE** — asking `_wwRefuses` on the live board mixes the engine's one-number-per-phase check into a "what do the rules allow" question; judge on a picture with the person's other weeks taken off. (2) **REASON ABOUT BIDDING OUTCOMES BY RUNNING THE ENGINE, NOT IN THE HEAD** — Claude miscounted a tie in the chat and the owner caught it. (3) **A TEST PAGE WITHOUT THE REAL CSS LIES ABOUT LAYOUT** — the approximate phone page showed clipping the real page does not have; measure with the page's own styles. (4) **THE CLOUD BATTERY'S 8 RED SUITES** read hard-coded baselines at the upload path, where staging had put the live 213 — red identically on a 213 control in the same tree; the Mac run is the clean one.
**Next session.** The bail fix — one full plan (TODO §1 top line).
**Session close** about 11:35 AM 15 Oct at about 595,000 tokens. `_to_delete/` — his to empty.

---
## ⤵ moved 22 Oct 2026 from HANDOFF.md — 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V2" — NO BUILD: THE SHORT START MESSAGE (§280), THE LIVE LINE SHORTENED (§281), THE RULE SETS SHAPED AND BUILD 1 PLANNED (§282), SETTINGS (§283), THE "LOWER AND STILL WIN" E-MAIL (§284)

## 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V2" — NO BUILD: THE SHORT START MESSAGE (§280), THE LIVE LINE SHORTENED (§281), THE RULE SETS SHAPED AND BUILD 1 PLANNED (§282), SETTINGS (§283), THE "LOWER AND STILL WIN" E-MAIL (§284)

**State.** LIVE unchanged: staff 214 / admin 379 + rules (`405dda0`); hub `068b473` + this session's docs, tests `6f727cd` + the new plan. No page changed — batteries not run, test site not republished. He set Bid Lowerings to UNLIMITED in all four phases on the live admin, about 12:35 PM (§282).
**The session, in order.** (1) 11:34 AM re-grounding at 190,259. (2) §280: START-HERE read from disk, never pasted, no longer to the outputs column; `SESSION-START.md` holds the short start message, given in the chat with the commit lines AT THE HAND-OVER ONLY. (3) §281: the LIVE line cut from 17,749 to 866 characters, its history archived verbatim. (4) §282: switchable rule sets — Open declined, Standard (as live) and Strict; lowering unchanged in both and now unlimited; the walled-week gap measured on his backup (19 cases, the newcomer's level dropped once, by a removal) and to be MANAGED BY ALERTS (build 2: personal alert settings, a "tell me when I can get in" alert, a timer restart); tabled at 12:52, un-tabled at 1:26 for exploring. (5) §283: settings survive the reset; the timer's 48 h at reset to fix later. (6) §284: Part A of the "lower and still win" e-mail to be removed, Part B kept — to build later. (7) Build 1 explored by four agents; ONE plan `tests/docs/PLAN-RULE-SETS-STRICT-2026-10-15.md`, fourteen questions.
**Lessons.** (1) **WHEN A LINE CONTRADICTS WHAT HE SAID MINUTES EARLIER, ASK — DO NOT PICK THE CONTRADICTING READING.** "Default them all to off" meant the lowering RESTRICTIONS off; his 12:09 message had just said a 1 lowered to a 10 is fine. (2) **A FIELD'S PRESENCE IS READ ON EVERY ENTRY, NOT THE FIRST** — Claude told him Phases 1–2 had no bid values from one admin entry's keys; every bid entry has them (corrected in §282). (3) **COUNTING CODE IS NOT THE RULE** — Claude said an NP could make a full week a competition week from `_wwContested` alone; the entry rule (`_weBlocks`) refuses that bid; he caught it by asking. (4) **A SKEPTIC FINDS WHAT A DESIGNER DOES NOT** — the red team found the move-then-remove two-click bail, the tie exit, the console shortcuts and the offline fail-open in a design the owner had already approved in outline; use one for every rule build.
**After the first close (2:07–2:12 PM, §282):** his answers — a move only where the moved bid would win AND his projection there went win → Under Review / losing or Under Review → losing; ties, Under Review and losing bids removable any time; the console shortcuts must go; the admin keeps every removal power and an admin change to a person's own bid is never their knock-out; in BOTH sets every bid save refused while the page is not live and re-judged on the server's copy at saving — split out as BUILD 0; a new idea filed: an admin warning when an admin action would be refused for a regular user.
**Next session.** BUILD 0 — explore, one plan, his go, build (TODO §1 ▶ ORDER). Then build 1's remaining questions (plan §10: q7–q14).
**Session close** about 2:15 PM 15 Oct at about 475,000 tokens. `_to_delete/` holds about 659 MB — his to empty.

---
## ⤵ moved 22 Oct 2026 from HANDOFF.md — 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V3" — NO BUILD: BUILD 0 (STAFF 215) EXPLORED, PLANNED, MEASURED AND APPROVED (§282) — TO BE BUILT IN A FRESH SESSION

## 15 Oct 2026 — "Vacation Auction 15 Oct 2026 V3" — NO BUILD: BUILD 0 (STAFF 215) EXPLORED, PLANNED, MEASURED AND APPROVED (§282) — TO BE BUILT IN A FRESH SESSION

**State.** LIVE unchanged: staff 214 / admin 379 + rules (`405dda0`), schedule 151 / 51 — each served twice at the opening. No page changed: batteries not run, test site not republished. Docs only: the plan, its supporting folder, DECISIONS §282, TODO §1, the MAP.
**The session, in order.** (1) 2:15 PM re-grounding at 175,438. (2) His "go" (2:16 PM) to explore build 0 — three agents (the code map; the real Firebase 10.12.0 measured against a stand-in server; the re-judge inventory) and a red team, which found four HIGH in the first design (a value-only "already saved" test silently killing a re-bid of a leftover number; a no-write retry failing while saved; late landings losing their follow-ups; the browser "offline" event stranding the page). ONE plan: `tests/docs/PLAN-215-SAVE-ONLY-WHEN-LIVE-2026-10-15.md`, nine questions. (3) 3:21 PM he agreed with all nine and asked whether a good connection stays quick — measured with his backup's document sizes (plan §10a): as quick or quicker, provided the reads are issued together. (4) 4:11 PM APPROVED, the phone test page waived. At 312,738 the build was judged not plainly finishable before 650,000 (§264) — a fresh session builds it.
**Lessons.** (1) **A REDIRECT THE SANDBOX CANNOT WRITE MEANS THE COMMAND NEVER RAN — AND AN OLD FILE OF THE SAME NAME THEN READS AS ITS OUTPUT.** `node status.mjs > /tmp/…` on the device failed on the redirect; `tail` showed a stale earlier run's text as though fresh. Caught only because `git status` showed START-HERE unchanged. Write outputs under `$HOME`, read the exit code directly, and check the file is new (rule 8). (2) **THE RED TEAM BEFORE THE PLAN, NOT AFTER** — V2's lesson 4 again: a design that read as complete had four HIGH. (3) **HIS PERFORMANCE QUESTION WAS ANSWERED BY MEASUREMENT, AND THE ANSWER DEPENDED ON ONE DESIGN DETAIL** (reads together: 0.18 s; one after another: 0.8–1.3 s) — that detail is now a requirement in the plan. (4) **AGENT WORK LIVES IN THE CLOUD SCRATCH AND DIES WITH THE SESSION** — the plan cited "kept" harnesses that existed only there; they were moved into `tests/docs/build0-2026-10-15/` (54 files, md5-verified) before the close.
**Next session.** BUILD staff 215 from the plan and `tests/docs/build0-2026-10-15/NOTES-FOR-THE-BUILDER.md` (re-read every line number first); the reads issued together; RA-2 by him after it (a new check of the combined save). Then build 1's remaining questions (rule-sets plan §10: q7–q14).
**Session close** about 4:15 PM 15 Oct at 334,693 tokens. `_to_delete/` holds about 654 MB — his to empty.

---
## ⤵ moved 22 Oct 2026 from HANDOFF.md — 15–16 Oct 2026 — "Vacation Auction 15 Oct 2026 V4" — STAFF 215 LIVE (§282, build 0): EVERY BID SAVE ONLY WHILE LIVE, JUDGED ON THE SERVER'S COPY · BUILD 1'S ANSWERS FILED

## 15–16 Oct 2026 — "Vacation Auction 15 Oct 2026 V4" — STAFF 215 LIVE (§282, build 0): EVERY BID SAVE ONLY WHILE LIVE, JUDGED ON THE SERVER'S COPY · BUILD 1'S ANSWERS FILED

**State.** LIVE: staff 215 `4aafdb2` (pushed by him 16 Oct about 5:39 AM after RA-2 255 / 255, honesty 24 / 24; served twice; pushed page md5-identical to the gated `539dbbff…`), admin 379 + rules `1a47c63`, schedule 151 / 51. Test site republished (carries 215 / 379). Next honesty baseline `4aafdb2`.
**The session, in order.** (1) 4:21 PM re-grounding at 181,990. (2) His "go" 4:23 PM; re-reading the code cost ~100k, so at 286,144 he chose "Go, with agents" (the heavy work in agents, a check at 480k). (3) Built by a builder agent from a written design (`tests/docs/build215/DESIGN.md`); two other agents repointed 17 suites and wrote the new suites; a blind review (NOT safe: one HIGH, two MEDIUM) and an independent verifier (two passes) — all fixed, SAFE conditional on RA-2. (4) 8:21 PM his Build 1 answers q7–q14 filed (DECISIONS §282; q13's wording to redraft — only a WINNING competition-week bid is held). (5) Filed about 10:30 PM; Mac per-suite run 149 / 149 exit 0, isolation 36 / 36. (6) 5:38 AM RA-2 255 / 255 — the combined save fits; pushed 5:39 AM.
**Lessons.** (1) **COUNT THE RULES' DOCUMENT-ACCESS CALLS BEFORE PUTTING WRITES IN ONE TRANSACTION** — Firestore sums them over a transaction's writes (limit 20; going over = permission-denied, which a page reads as "closed"); the plan missed it, the builder's correction caught it, the blind review showed the count was unproven, and the page now carries a split-shape safety net; RA-2 (the emulator) said it fits. (2) **DELEGATE THE READING, NOT ONLY THE WRITING** — the §4 ritual plus re-reading the code to the plan's line numbers took the session from 182k to 286k before a line was written; an agent can re-verify line numbers and hand back the conclusion. (3) **THE CONTAINER RESTARTED TWICE MID-WORK** — agents stopped; resuming them by message from their transcripts lost nothing, but a resumed agent must first check what it last wrote. (4) **THE MAC BATTERY OUTGREW ONE DEVICE CALL** — START-HERE §6 corrected; `tests/run-chunks.py`.
**Next session.** Build 1 (the rule sets): redraft q13's wording per his 8:21 PM answers and put it to him; then his go.
**Session close** about 5:45 AM 16 Oct at 482,231 tokens. `_to_delete/` holds about 655 MB — his to empty.

---
## ⤵ moved 22 Oct 2026 from HANDOFF.md — 16 Oct 2026 — "Vacation Auction 16 Oct 2026 V1" — STAFF 216 / ADMIN 380 + RULES LIVE (§282, build 1): THE STANDARD / STRICT RULE SET · COMBINATION BIDS EXPLORED AND ANSWERED (§285)

## 16 Oct 2026 — "Vacation Auction 16 Oct 2026 V1" — STAFF 216 / ADMIN 380 + RULES LIVE (§282, build 1): THE STANDARD / STRICT RULE SET · COMBINATION BIDS EXPLORED AND ANSWERED (§285)

**State.** LIVE: staff 216 / admin 380 + rules `d43d2ef` (pushed by him about 8:10 PM after RA-2 276 / 276, honesty 5 of 5 GOOD, the rules published; served twice; pushed pages md5-identical to the gated `b615591e…` / `5d76a2cb…`), schedule 151 / 51. Test site republished (216 / 380). Next honesty baseline `d43d2ef`. The setting is unsaved, so the site runs Standard, exactly as before.
**The session, in order.** (1) 5:45 AM re-grounding at 179,785. (2) Build 1's wording redrafted and approved (W1–W6); ties confirmed a legitimate way out; the backup re-run with "must win there". (3) 6:06 AM his go, with his critical gate: Standard identical to 215 / 379. (4) A designer agent, a builder, a test writer, three blind lanes (Standard, red team, data / rules); fix round F1–F7 (the Fair Play report's changes made Strict-only); his answers: the Edit-to-NP route left, ties always free, the info table in both sets; an independent verifier — SAFE TO DEPLOY, STANDARD IDENTICAL (bidder rules): yes. (5) The phone test page "Strict Mode Boxes"; wording approved 5:50 PM. (6) Filed about 6:40 PM; Mac 155 / 155, isolation 36 / 36; RA-2 by him; pushed. (7) Build 2 delayed; the tabled list given; combination bids (then "Strict only above n") set as next; explored, answered 8:43 PM (§285).
**Lessons.** (1) **AN INVARIANCE GATE MUST COVER THE ADMIN'S DERIVED VIEWS, NOT ONLY THE BIDDER'S** — the staff side was identical at the first try; the blind Standard lane found the Fair Play report judging differently under Standard, which no staff-side harness could see. (2) **STAGING A LIVE PAGE INTO `/mnt/user-data/uploads/GitHub/vacation-kp.github.io` STILL TRIPS EIGHT SUITES** (START-HERE §6 already warns) — move the staged copy aside before any cloud battery. (3) **AN INTERRUPT STOPS RUNNING AGENTS MID-EDIT** — a stopped agent had half-edited the RA-2 files; a fresh agent read `git diff` first and finished them. After any interrupt, check what each stopped agent last wrote. (4) **THE DEVICE `/tmp` HOLDS OTHER SESSIONS' FILES AND MAY REFUSE WRITES** — a refused redirect left `tail` reading a stale file from another day; write device outputs under `$HOME`, never `/tmp`. (5) **A SUITE LONGER THAN ONE DEVICE CALL** — `test-216-standard-invariance.mjs` (about 6 min at FUZZ=1200) ran on the Mac at FUZZ=150 / MUT_BOARDS=40 and in full in the cloud on md5-identical bytes; `run-chunks.py` stops on such a suite (an unhandled TimeoutExpired) — record its result by hand as done here, or teach the runner a per-suite FUZZ.
**Next session.** Combination bids (§285, `tests/docs/PLAN-COMBO-BIDS-2026-10-16.md` with his answers in §12): the phone test page first (two screens always, all combinations together on the second), then the build with agents, adversarial lanes and a verifier; ask him for a backup for the forged-combination count (Q17). Then "Strict only for bids stronger than n".
**Session close** about 8:50 PM 16 Oct at 503,855 tokens. `_to_delete/` holds about 734 MB — his to empty.

---
## ⤵ moved 23 Oct 2026 from HANDOFF.md — 16–17 Oct 2026 — "Vacation Auction 16 Oct 2026 V2" — STAFF 217 / ADMIN 381 + RULES FILED (§285): COMBINATION BIDS 2/3, 3/4, 4/5 AND THE TWO-SCREEN BID BOX · STRICT ABOVE N EXPLORED · LOWERINGS UNDER STRICT ANSWERED

## 16–17 Oct 2026 — "Vacation Auction 16 Oct 2026 V2" — STAFF 217 / ADMIN 381 + RULES FILED (§285): COMBINATION BIDS 2/3, 3/4, 4/5 AND THE TWO-SCREEN BID BOX · STRICT ABOVE N EXPLORED · LOWERINGS UNDER STRICT ANSWERED

**State.** LIVE unchanged: staff 216 / admin 380 + rules `d43d2ef`, schedule 151 / 51. **FILED, NOT PUSHED: staff 217 / admin 381 + rules** (gated `16b20a05…` / `507fb327…` / `b548004f…`, versions.json `eca64fe2…`); test site republished (217 / 381); `status.mjs` exit 0. **His order: RA-2 (expected 291 / 291; honesty "6 of 6 new-gate assertions FAILED — GOOD") → publish the rules → push the three repos.**
**The session, in order.** (1) 8:58 PM re-grounding at 198,328. (2) The phone test page "Combination Bids Test"; his wording "better than n", 1/2/3 "better than 1/2"; "perfect" 9:23 PM; "go" (the three recommendations taken: button hidden when none allowed, the second-screen hint, the admin label). (3) Build by agents in the cloud: designer-builder (61 once-only edits), test writer (9 new suites, 15 repointed), three blind lanes (all SAFE TO DEPLOY), fix round F1–F6 decided while he slept, an independent verifier — SAFE TO DEPLOY yes, STANDARD IDENTICAL (behaviour, unset) yes. Q17 from his backup: no forged combination. (4) Filed about 3:40 AM: 35 files md5-identical on the Mac; Mac 164 / 164 (8,161), isolation 36 / 36, honesty red on `d43d2ef`. (5) His bedtime order: Strict above n explored (`tests/docs/PLAN-STRICT-ABOVE-N-2026-10-17.md`, 14 questions); his lowerings question answered as findings (`tests/docs/FINDINGS-LOWERINGS-UNDER-STRICT-2026-10-17.md`).
**Lessons.** (1) **A FILE WRITTEN TO THE MAC BY `device_commit_files` MAY NOT BE VISIBLE TO `device_bash` FOR SEVERAL SECONDS** — a rewrite run straight after read the OLD bytes and put them back; wait until the md5 matches before touching the file (a loop on md5, as the unpack steps now do). (2) **A TEST HARNESS'S CACHE KEY MUST HASH THE WHOLE SOURCE** — `lib215` sampled every 7th character, so a mutant of equal length reused the real page's cached world and survived; now SHA-1 of the whole source, the 15 suites using it identical before and after. (3) **A SUBAGENT CAN BE REFUSED A SECOND DELIVERABLE FILE** — ask for long text deliverables to be returned in the report as well, and write them yourself. (4) **THE GAP AFTER RESULTS IS STILL JUDGED LIVE** — any setting an engine reads (floors, now combinations) can repaint a decided phase until the next Begin Phase; F1 closed it for combinations only.
**Next session.** First his three steps and, after the push: verify live twice, `status.mjs`, the BUILD-LOG commit id, START-HERE's LIVE line (delete the FILED line). Then his answers: the Phase-4 guard (switching a combination off between rounds — DECISIONS §285 last lines), the Strict-above-n plan's 14 questions, the findings.
**Session close** about 4:10 AM 17 Oct at 445,768 tokens; reopened 6:53 AM: RA-2 291 / 291 (honesty 6 of 6 GOOD), rules published, pushed by him about 6:55 AM as `2346239` (tests `a7b05e6`, hub `de04449`), served twice, md5-identical; START-HERE's LIVE line updated, the FILED line removed; his lock / lowerings exploration filed for later. Hand-over 7:05 AM. `_to_delete/` holds about 815 MB — his to empty.

---
## ⤵ moved 23 Oct 2026 from HANDOFF.md — 17 Oct 2026 — "Vacation Auction 17 Oct 2026 V1" — STAFF 218 / ADMIN 382 + RULES FILED (§286): THE STRICT LEVEL · AUCTION SETUP PLANNED AND APPROVED (§287)

## 17 Oct 2026 — "Vacation Auction 17 Oct 2026 V1" — STAFF 218 / ADMIN 382 + RULES FILED (§286): THE STRICT LEVEL · AUCTION SETUP PLANNED AND APPROVED (§287)

**State.** LIVE unchanged: staff 217 / admin 381 + rules `2346239`, schedule 151 / 51. **FILED, NOT PUSHED: staff 218 / admin 382 + rules** (gated `e24b05d2…` / `55eb9ce8…` / `4406bc79…`, versions.json `a42cbee8…`); test site republished (218 / 382); `status.mjs` exit 0. **His order: RA-2 (expected 312 / 312; honesty "9 of 9 new-gate assertions FAILED — GOOD") → publish the rules → push the three repos.** He is away from the Mac; he will push.
**The session, in order.** (1) 7:03 AM re-grounding at 183,681. (2) His 7:07 idea (settings set before Phase 1, never changeable) filed; Strict-above-n's 14 questions answered (§286), Q5 = B after Claude first mis-framed it as an exit allowance and then conceded it is his own §248 + n rule working together. (3) Phone page "Strict Level Test", "looks good" 7:29, "go" 7:30. (4) Build by agents: builder (21 edits, R2 comment approved by the lead), test writer (9 new suites, 15 repointed, RA-2 generation), three blind lanes + verifier — SAFE TO DEPLOY yes, no fix round. Filed about 10:50 AM: Mac 173 / 173 exit 0 (8,347), cloud 173 / 173 (7,853), isolation 36 / 36. (5) Afternoon: §287 explored (54 admin controls inventoried; ONE plan `tests/docs/PLAN-AUCTION-SETUP-2026-10-17.md`), answered in full and the phone page "Auction Setup Test" (v6) approved — one review per phase start, optional, with the FTE on the weeks about to open; a bail-out per setting behind two warnings and UNLOCK.
**Lessons.** (1) **THE HARDCODED HONESTY PATH BIT AGAIN** — the session staged the live pages to read them, which put them at `/mnt/user-data/uploads/GitHub/vacation-kp.github.io/`, and 8 old suites then "failed" their honesty blocks on the baseline run; move staged pages away before any battery (START-HERE §6 already warns — read it before staging). (2) **RE-DELIVERING A FILE UNDER THE SAME OUTPUTS NAME CAN LAND THE OLD BYTES ON THE MAC** — `device_commit_files` of a re-sent outputs file wrote the previous version; give every re-delivery a NEW outputs name (v2, v3 …) and loop on the md5 before copying. (3) **A PREMISE INHERITED FROM AN EARLIER SESSION IS NOT VERIFIED** — "undecided bids carry into the next Phase 4 round" (§285's note, the runbook's combination line 4) was repeated to him without reading the code; the inventory lane found it appears false. To be proven by a test first (plan Q1) — run it, don't recall it. (4) **THE 216 INVARIANCE SUITE OUTRUNS `run-chunks.py`'s 170 s ON THE MAC** — run it alone at `FUZZ=150` and record it by hand, as the BUILD-LOG row says.
**7:39 PM, his first RA-2 run:** every new [GATE] passed on the 218 rules and all 9 failed on 2346239, but the suite CRASHED after (4b) both times — a test defect, not the rules: the new "Strict level" section called `ctx.firestore()` twice in one `withSecurityRulesDisabled` callback ("Firestore has already been started"). Fixed (one `ctx.firestore()` per callback; `tests/rules-emu/assertions.mjs` → `fb1aced9…`), delivered, RA-2 to be re-run before the rules are published. Lesson: **an emulator section that cannot run here must at least be checked for one `ctx.firestore()` per callback**.
**Next session.** After his push: verify live twice, `status.mjs`, the BUILD-LOG commit id, START-HERE's LIVE line (delete the FILED sentence). Then, on his go, build §287 (the plan + its §11 answers + the test page `tests/docs/setup/phone-test-auction-setup.html`), starting with plan Q1's test of the Phase 4 premise.
**After the close (7:39–7:45 PM):** RA-2 re-run 312 / 312 after the test fix; rules published; pushed by him as `2705630` (tests `4867107`, hub `5254a45`), served twice as 218 / 382, md5-identical; START-HERE's LIVE line updated, the FILED sentence removed. **Session close** about 5:20 PM at 581,554 tokens; final hand-over 7:45 PM at 622,027 tokens. `_to_delete/` holds the transfer files of this build (see the chat) — his to empty.

---
## ⤵ moved 23 Oct 2026 from HANDOFF.md — 17–18 Oct 2026 — "Vacation Auction 17 Oct 2026 V2" — STAFF 219 / ADMIN 383 + RULES FILED (§287): AUCTION SETUP — THE WHOLE-AUCTION LOCK, THE SETUP PAGE, ONE REVIEW PER PHASE START, THE TWO-STEP MONTH PICKER

## 17–18 Oct 2026 — "Vacation Auction 17 Oct 2026 V2" — STAFF 219 / ADMIN 383 + RULES FILED (§287): AUCTION SETUP — THE WHOLE-AUCTION LOCK, THE SETUP PAGE, ONE REVIEW PER PHASE START, THE TWO-STEP MONTH PICKER

**State.** LIVE unchanged: staff 218 / admin 382 + rules `2705630`, schedule 151 / 51. **FILED, NOT PUSHED: staff 219 / admin 383 + rules** (gated `3cf7c53b…` / `09ce018e…` / `8f6d85be…`, versions.json `22530e2e…`); test site republished (219 / 383, `tests/testsite/published.json`). **His order: RA-2 ✅ 371 / 371, honesty 26 / 26 red (18 Oct ~7:43 AM) → publish the rules → push the three repos.**
**The session, in order.** (1) 7:45 PM re-grounding at 187,236. (2) 7:46 his go on §287. (3) Plan Q1 answered by test (`test-219-p4-carry`, 107 / 107; mutant caught): the Phase 4 carried-bid premise DISPROVED; one narrow admin-only route found (an Add Bid dialog left open across Complete Round) — his call, not built. (4) Built by agents from BRIEF-219 with his rulings of the evening (§287 7:58 PM – 11:55 PM: bail-out between phases only, 10-minute unlock with Lock again, clean-and-simple as a standing constraint, one screen per setting with Skip the rest = reviewed, the Dashboard button opens the page, ↩ Back to the review, UNLOCK in any capitals, the Phase 4 FTE check as a second step of the month picker with ↩ Back to Round N, "▶ Begin Phase 4: Round N"). Phone preview "Auction Setup Preview" (https://claude.ai/artifact/RGFcxW4tQievKG5C3FRgzK) iterated to v6; "Good" 11:55 PM. (5) Gates: three blind lanes (one HIGH: a leftover back link could resume a begin without the backup offer; one MEDIUM: a non-roster admin's address fragment), fix round F1–F10, independent verifier (SAFE yes; N1 fixed after). Cloud 184 / 184 (8,679), Mac 184 / 184 (8,659), isolation 36 / 36. Records: BUILD-LOG row, `tests/docs/REVIEW-219-383-2026-10-18.md`, `tests/docs/build219/`.
**Lessons.** (1) **A CONTAINER RESTART KILLS BACKGROUND JOBS** — the test writer's battery runs were lost mid-way; run batteries in foreground chunks with results on disk. (2) **A SUBAGENT CANNOT WRITE ITS REPORT FILE** here — have it return the findings and save them yourself. (3) **THE OWNER'S PREVIEW FOUND WHAT NO GATE COULD** — the live-updating table "bouncing all over the place"; rule 19 paid again. (4) **FILES THAT EXIST ONLY IN THE CLOUD COPY ARE EASY TO MISS** — make219 / un219 / gen_un219 were not in the test writer's list and the Mac battery failed until they were delivered; diff the whole tests tree against the staged original before delivering. (5) **test-218-fairplay was clock-dependent** (a minute boundary between two renders) — made deterministic.
**Next session.** After his push: verify live twice, `status.mjs`, the BUILD-LOG commit id, START-HERE's LIVE line (delete the FILED sentence).
**After the filing (7:43–7:50 AM, 18 Oct):** RA-2 371 / 371 (honesty 26 / 26 red on 2705630); rules published; pushed by him as `b1ca0f8` (tests `ba4fd73`, hub `50cf46e`); served twice as 219 / 383, md5-identical; START-HERE's LIVE line updated, the FILED sentence removed.
**After it went live (18 Oct, 7:51 AM – 5:57 PM):** answered how the setup lock can be changed once Phase 1 begins (the bail-out; between phases only for the five frozen keys; the year never; Reset). Pending list given on his ask; the Add Bid stale-dialog route and the Fair Play crafted-row fix **DECLINED** (§287). **§288 — E-MAIL ALERTS:** explored as ONE plan, `tests/docs/PLAN-ALERTS-2026-10-18.md` (15 e-mail kinds, three groups), and **ALL ANSWERED** the same day (plan §9 + DECISIONS §288): two switches; group 1 always sent; the get-in alert uncapped (one per week), ending at phase / round end, each one switchable off by its owner; **Part A AND Part B removed** (no e-mail suggests lowering); one confirmation e-mail per change of choices; the welcome e-mail sent by Begin Phase 1 (late joiners at first sign-in); no new alerts; **his 60-second hold on a CANCEL's alerts** (a bid on that same week inside the 60 s ends the hold and sends ONE netted e-mail at once; the held alert sits in the shared mail queue; no backup measurement); the countdown restart filed for the future.
**Next session.** The alerts build (§288): re-do the plan's §3–§6 wording and size for every §288 answer (plan §9 lists them), the phone test page, his go, then build (agents, blind lanes, verifier, RA-2 — the rules gain one document). The admin warning (§282 build 2) stays separate and later.
**Session close** 18 Oct 2026 about 6:00 PM at 593,458 tokens (no build started above 550,000; filing of 219 / 383 finished at about 495,000). Pending his push: the docs commits below. `_to_delete/` holds 21 entries, 165 MB — his to empty.

---
## ⤵ moved 23 Oct 2026 from HANDOFF.md — 18 Oct 2026 — "Vacation Auction 18 Oct 2026 V1" — NO BUILD (credits; his order, §289): THE ALERTS PLAN FINISHED AND SHOWN ON HIS PHONE (five versions), THREE MORE PLANS WRITTEN AND ANSWERED, THE RULES WORDING RE-DONE

## 18 Oct 2026 — "Vacation Auction 18 Oct 2026 V1" — NO BUILD (credits; his order, §289): THE ALERTS PLAN FINISHED AND SHOWN ON HIS PHONE (five versions), THREE MORE PLANS WRITTEN AND ANSWERED, THE RULES WORDING RE-DONE

**State.** LIVE unchanged: staff 219 / admin 383 + rules `b1ca0f8`, schedule 151 / 51 — each served twice with different cache-busters. Nothing built, no page touched, no battery run (no page changed). Test site not republished (no page changed; still 219 / 383).

**The session, in order:**
1. 6:12 PM — re-grounded at 211,239.
2. 7:04 / 7:05 PM — his order: no builds for a few days, planning only (§289).
3. The alerts plan finished as §10 of `tests/docs/PLAN-ALERTS-2026-10-18.md` (every §288 answer, read on the live code). Finding: the admin's Send Pending would send a held cancel alert early, so it must honour the hold.
4. Three plans written, each read-only on 219 / 383, and ALL ANSWERED at 7:21 PM (*"agree with all above"*):
   - `PLAN-ADMIN-WARNING-2026-10-18.md` — Option B first;
   - `PLAN-COUNTDOWN-RESTART-2026-10-18.md` — its own small build right after the alerts build;
   - `PLAN-PRIORITY-LOCK-UNDER-STRICT-2026-10-18.md` — keep as is, no build. Lowerings have been unlimited since 15 Oct, so the lock refuses nobody.
5. 7:21–7:34 PM — the Rules & Reminders and welcome e-mail wording re-done (plan §11a–§11h):
   - removed: the "now called bids" rule, the ATO, overpaying, early, sniping and bailing lines, and "Ideally…" (when unlimited);
   - the "No cap…" line shows only when a cap exists;
   - his merged phase rule;
   - the two alert lines;
   - the Strict-only competition line, with no set names, and nothing for Standard;
   - "1 is the strongest…" KEPT (Claude pushed back on removing it; he agreed);
   - the My Bids note removed.
6. 7:35 PM – 8:56 PM — the phone test page "E-mail Alerts Test" (https://claude.ai/artifact/GX5yAX85HLNVNEc21NMcX9), versions 1–5. His looks re-shaped the get-in alert (§11j–§11m):
   - set only in the 🔔 box;
   - any week, with the bid he would be willing to place (not what he holds);
   - no drop-downs;
   - a three-step full-screen alert window;
   - Change beside Remove;
   - a 🔔 marker on the week card with no tap of its own;
   - the 🔔 button on its own line under Sign out.
   Versions 4 and 5 were driven in headless Chromium at 390 × 800 before publishing — it caught the window drawn while hidden; fixed.

**Lessons (promoted to STANDING TRAPS):**
1. A re-used staged path makes `device_commit_files` deliver an old upload.
2. The device VM's `/tmp` can hand back a stale file after a failed redirect.

**Next session:**
- **When he has credits and gives his GO:** the alerts build (staff 220 / admin 384 + rules), from plan §10 and §11 whole. §11a–§11m supersede earlier sections where they differ. Open: §11k Q2 (locked weeks — recommended yes).
- **Then:** the countdown restart.
- **Then:** the admin warning, Option B.
- **Before building the bell:** read the real week card for where it fits.

**Session close** 18 Oct 2026 about 9:00 PM at 515,208 tokens (no build started). Pending his push: tests and hub docs commits below. `_to_delete/` holds about 165 MB — his to empty.

---
## ⤵ moved 26 Oct 2026 from HANDOFF.md — 21–22 Oct 2026 — "Vacation Auction 21 Oct 2026 V1" — STAFF 220 / ADMIN 384 + RULES FILED (§291): THE E-MAIL ALERTS BUILD · BUILDS FASTER (§290)

## 21–22 Oct 2026 — "Vacation Auction 21 Oct 2026 V1" — STAFF 220 / ADMIN 384 + RULES FILED (§291): THE E-MAIL ALERTS BUILD · BUILDS FASTER (§290)

**State.** LIVE unchanged: staff 219 / admin 383 + rules `b1ca0f8`, schedule 151 / 51 (served twice at the opening, 21 Oct 3:05 PM). **FILED, NOT PUSHED: staff 220 / admin 384 + `firestore.rules`** — gated staff `7330d1a5…`, admin `3b04191b…`, rules `1cc2d6ae…`, versions.json 220 / 18 / 384; unpacked on the Mac from `_to_delete/xfer/build-220-384-files.zip` (90 files, every md5 matched the cloud copy). Test site republished (220 / 384). `status.mjs` exit 0.
**The session, in order.**
1. 21 Oct 3:05 PM — re-grounded at 213,560. 3:07 PM his *"go"*, then *"mac will be away"*: the tests and hub trees were staged to the cloud (md5-verified) and the build ran there.
2. The baseline on the live bytes: 184 / 184 suites (the real-library suite needs `npm install` in `tests/docs/build0-2026-10-15/sdk` in a fresh cloud copy).
3. Built in three parts by agents from `tests/docs/build220/BRIEF-220.md` (make220.py, exact once-only edits; un220): (1) the rules wording, Part A / B removed, the welcome at ▶ Begin Phase 1, the `alertPrefs` rules clause; (2) the 🔔 E-mail alerts box, the three-step alert window, the bell marker, the get-in alert, the confirmation e-mail, the admin's one-line view; (3) the 60-second hold on a cancel's alerts. Two corrections ordered by Claude in part 3: no "outbid" in the switch-1 Off line (§220); a get-in line only when the person's own bid box would allow the bid. The container restarted once mid-part-2 (nothing lost; resumed).
4. 8:12 PM — his question on build times → **DECISIONS §290** (the full battery only at the gates; short fuzz while building; two-at-a-time measured and NOT adopted).
5. Three blind lanes (HIGHs: the bell clipped "Competition week" at 390 / 414; a held e-mail could arrive after a newer one), three fix rounds, three verifications — final SAFE TO DEPLOY yes. His rulings during it (§291): rehearsal welcome — no change (*"In a rehearsal, I turn off the e-mail sends."*); the slow-save wording approved.
6. Filed 22 Oct ~3:10 AM; the button sweep re-run on the final pages (320 / 375 / 390 / 1440, 0 errors); Mac battery 192 / 192 exit 0 (8,953).
**Lessons.** (1) The 60-second hold is a distributed-ordering problem on a queue with no server; each fix round pushed the ordering edge into a rarer corner (lost e-mail → wrong last e-mail → a middle e-mail out of order) — a fresh session touching `_hd*` must read `tests/docs/REVIEW-220-384-2026-10-22.md` and `build220/review/VERIFY.md` first. (2) Subagents cannot write report files — the lead saves their FINDINGS from the hand-back text. (3) The cloud battery is ~26 min; part 1 ran it three times — hence §290.
**22 Oct 5:44 AM — his answer (DECISIONS §291):** the 🔔 marker approved as built; OWNER-FOUND on the test site — after an alert is added through the window, Done says "nothing changed, no e-mail" though the window's e-mail went (cause: `_alDone`); RULED — the 60-second hold simplified: only a cancel and a re-bid from the SAME BROWSER are linked, the cross-page ordering machinery comes out, a held e-mail drops any line no longer true at its send; NEW STANDING RULE 21 (START-HERE §3): present the simpler option early. **The filed 220 / 384 is NOT to be pushed as filed** — revised first, re-gated, pushed once.
**Next.** A FRESH session (this one closes at about 475,000 — the revision is a build and could not plainly be gated and filed before 650,000): TODO §1's top item — explore read-only, ONE short plan to him (the simpler hold + the Done toast), his go, build on top of the filed `make220.py` (its FIX ROUND sections are generated by `tests/docs/build220/…`/the w220 fixsrc — the cloud workspace is gone; re-read `tests/make220.py` and `un220.mjs`), lanes on the changed parts + a verifier, republish the test site, then his RA-2 → rules → ONE push. After it, his order of 18 Oct: the countdown restart; then the admin warning (Option B).
**Session close** 22 Oct 2026 about 6:05 AM at about 475,000 tokens. Isolation 36 / 36; `status.mjs` exit 0; all four repos fetched, in sync with origin, no locks (three fetch locks moved to `_to_delete/`). Pending his COMMITS (not a push of the pages): the three docs/tests/filed-files commits below are safe to commit; the vacation repo's filed 220 / 384 must NOT be pushed until the revision.

---
## ⤵ moved 26 Oct 2026 from HANDOFF.md — 18–21 Oct 2026 — "Vacation Auction 18 Oct 2026 V2" — NO BUILD (his order, §289): §11k Q2 RULED, EIGHT ITEMS FILED FOR LATER, THE TEST SITE'S E-MAILS ANSWERED

## 18–21 Oct 2026 — "Vacation Auction 18 Oct 2026 V2" — NO BUILD (his order, §289): §11k Q2 RULED, EIGHT ITEMS FILED FOR LATER, THE TEST SITE'S E-MAILS ANSWERED

**State.** LIVE unchanged: staff 219 / admin 383 + rules `b1ca0f8`, schedule 151 / 51 — served twice at the opening (18 Oct 9:22 PM). No page changed: no battery run, test site not republished (still 219 / 383). The Mac link dropped several times; nothing was written while it was down.
**The session, in order.**
1. 18 Oct 9:22 PM — re-grounded at 202,963.
2. 9:42 PM — §11k Q2 RULED: *"locked weeks not choosable"* (DECISIONS §289, plan §11m; Claude's "yes" withdrawn on the code). The alerts plan has no open questions.
3. 19–21 Oct — filed for later in TODO §1, his words verbatim, each with Claude's first notes: the cosmetic redesign; NP line hidden when NP is off in every phase; bids 11–16 (his answer: extra numbers leave the bid caps untouched); a Phase 4 week picker with FTE set from it (rounds: no limit; one week alone not cleanly reachable today); FVA phases chosen per auction and Phase 4 as the RVA; the Remove box's note shorter with small ✎ Edit / ⇄ Swap buttons and no e-mail talk (inventory of other e-mail notices still to do); Smart Lock Control in the settings review (recommended with the admin warning build).
4. 20 Oct — owner-found on the test site, answered read-only (TODO §1): the simulator's batch sends alerts only for weeks a person already had a bid on, so an empty board gives none, live too; Swap lists every own week (no knock-out needed); the simulator does not apply the competition-week entry rule. Open: his test site's review threshold decides whether SS's "to LOSE" e-mail was right — asked, not answered.
5. 21 Oct 3:00 PM — *"I am ready to build now"*: the alerts build recommended for a FRESH session (this one at 365,241 and the plan says fresh); his *"then handoff"*.
**Lessons.** (1) Five unpromoted lessons of 14–15 Oct promoted to START-HERE rule 20 before their entries were archived — and 20(a) bit this session: the Wk 14 / Wk 52 outcomes were worked by hand from the engine's code, not run (said in TODO). (2) The device `/tmp` stale-file trap struck again (a failed redirect, then an old `/tmp/st.out` read back) — write `status.mjs` output under `$HOME`, never `/tmp`.
**Next session.** When he gives his GO: the alerts build (staff 220 / admin 384 + rules), from plan §10 and §11 whole (§11a–§11m supersede; §11k Q2 answered: locked weeks not choosable). Then the countdown restart; then the admin warning (Option B), with Smart Lock Control in the review if he agrees.
**Session close** 21 Oct 2026 about 3:10 PM at 391,715 tokens (no build started). Pending his push: hub and tests docs commits below. `_to_delete/` holds about 165 MB — his to empty.

---
## ⤵ moved 28 Oct 2026 from HANDOFF.md — 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V1" — STAFF 220 / ADMIN 384 REVISED AND RE-FILED (§291): THE SIMPLE HOLD · E-MAIL ONLY AT DONE · A SERVER? FILED

## 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V1" — STAFF 220 / ADMIN 384 REVISED AND RE-FILED (§291): THE SIMPLE HOLD · E-MAIL ONLY AT DONE · A SERVER? FILED
**State.** LIVE unchanged: staff 219 / admin 383 + rules `b1ca0f8`, schedule 151 / 51 (served twice at the opening, 7:02 AM). **FILED, NOT PUSHED: the REVISED staff 220 / admin 384** — gated staff `193ef364…`, admin `b4ca4e94…`, rules `1cc2d6ae…` (unchanged), versions.json 220 / 18 / 384 (unchanged). Test site republished (version 15, from the revised pages).
**The session, in order.** 7:02 AM re-grounded at 198,701 (his tests / hub docs commits had landed). 7:03 AM his *"1-yes. 2-I think all e-mails should send when done is clicked and not before."* → the plan `tests/docs/PLAN-220-REVISION-2026-10-22.md`, three questions. 7:11 AM *"sounds good"* + his order not to power through problematic builds (rule 21 extended). 7:16 AM *"will be away from mac. please do in the cloud."* 7:17 AM his server question → answered, filed as an idea. Built in the cloud as a REVISION section of `tests/make220.py` (staff 18 edits, admin 3; generator `tests/docs/build220/rev-gen_rev.py`); suites re-aimed (cancel-hold sections G / J retired, T new; alerts-browser B7 / B9 / B10, B19 new; invariance; three repoints); honesty on the filed bytes red as intended. Gate 1: 190 / 192 (the two red = the fix round's new assertions on the pre-fix pages). Lane A: one MEDIUM, fixed (one round); lane B: LOW only; verifier: SAFE yes, two LOWs on the same re-check → stopped and put to him (rule 21). Gate 2: 192 / 192 exit 0. Isolation 36 / 36. Button sweep on the final pages 320 / 375 / 390 / 1440: clean, 0 errors.
**Lessons.** (1) Rule 21 held: the second round's new gaps in the same check went to him, not into a third round. (2) The test-world needed `_alLoaded=true` on every page — the real listener's first snapshot — before the re-check at send could run; a re-check that waits for data must be modelled with the data arriving.
**After the filing.** 8:52 AM he was back: the bundle unpacked on the Mac (23 files, every md5 matched), hub paperwork applied, Mac battery 192 / 192 exit 0 (8,940; test-216-standard-invariance at FUZZ=150). 8:59 AM his ruling: the verifier's two LOWs accepted ("worth the trade off"). 9:15 AM RA-2 "✅ BOTH". 9:17 AM pushed: `6905471` (vacation) · `a7f41c1` (tests) · `1812dbc` (hub); pushed bytes md5-identical to the gated copies; served 220 / 18 / 384 confirmed twice after the docs push (`fed269e` / `c1e8763`).
**Next.** His order of 18 Oct: the countdown restart (plan written, five questions), then the admin warning (Option B). Read `tests/docs/REVIEW-220-384-2026-10-22.md` (both sections) before touching any `_hd*` or `_al*` function.
**Session close** 22 Oct 2026 about 9:25 AM at about 555,000 tokens. Isolation 36 / 36; status.mjs exit 0; all four repos fetched, in sync with origin; three fetch locks moved to `_to_delete/`.

---
## ⤵ moved 28 Oct 2026 from HANDOFF.md — 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V2" — NO BUILD: THE START SLIMMED (§293) · PLAN 221 / 385 WRITTEN AND ANSWERED (§292)

## 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V2" — NO BUILD: THE START SLIMMED (§293) · PLAN 221 / 385 WRITTEN AND ANSWERED (§292)
**State.** LIVE unchanged: staff 220 / admin 384 / mobile 18 + rules `6905471`, schedule 151 / 51 (served twice at the opening, 9:23 AM). Nothing filed; no page changed (test site not republished — no page changed).
**The session, in order.** 9:22 AM re-grounded at 239,718. He asked for every pending item; three were reported open that he had answered on 18 Oct (the countdown restart, the admin warning, the priority-lock plan) — TODO corrected. B revisited (§292): the priority lock and bid lowerings retired as a feature — finally as "ARCHIVED SETTINGS" below Auction Setup (defaults lock ON / unlimited; the user-facing text automatic, only while lowerings are limited or the lock is off; the Priority Locks page removed); the competition-week weakening rule kept (it is what makes Strict hold); the scare-off settled by information and time — a change that sends a get-in alert restarts the countdown (mode 2, every week), with the 18 Oct competition-week trigger; timer mode 3 removed; wording ruled (the get-in rule line, "Always sent: …" in the e-mail and the box, "Done — no changes.", the mode 1 / 2 descriptions, W1–W4, the KP prompt row into E-mail Sending Controls). The plan: `tests/docs/PLAN-221-385-RETIRE-LOCK-AND-COUNTDOWN-2026-10-22.md` (two read-only explorers + re-reads; §11 holds his answers and supersedes §3's shape A). The start slimmed (§293): the MAP to `MAP.md` (`status.mjs` writes it there), TODO §1's shipped records archived verbatim (lossless check: 0 lines missing), START-HERE 124,691 → 41,218 characters, TODO's start 121,503 → 31,631; a fresh-eyes retrieval check 12 / 12 (two by-kind lines added); two HANDOFF entries archived after their unpromoted lessons went to STANDING TRAPS.
**Lessons.** (1) **A TODO STATUS CAN BE A DAY STALE: before reporting a plan's questions as open, read the plan's own "His answers" section** — three answered plans were reported as waiting. (2) **The inventory found the simpler shape** — his live settings already gave the retirement's behaviour, so the plan moved settings instead of removing machinery (rule 21). (3) **A promise in a rule line must hold on every week** — the get-in line forced the get-in restart onto competition weeks too.
**Next.** A FRESH session: his go to build staff 221 / admin 385 from the plan (§11 first; W4 wording to confirm), no rules change (no RA-2); then the admin warning (Option B; its Clear-floor part changes with the retirement).
**Session close** 22 Oct 2026 about 10:55 AM at about 470,000 tokens. Isolation not run (no page or writer touched); `status.mjs` exit 0; all four repos checked, three fetched and in sync with origin (tests judged from disk), no locks (three fetch locks moved to `_to_delete/`).

---
## ⤵ moved 28 Oct 2026 from HANDOFF.md — 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V3" — STAFF 221 / ADMIN 385 SHIPPED (§292): ARCHIVED SETTINGS · THE COUNTDOWN RESTART · MODE 3 REMOVED · THE ADMIN GET-IN LIST

## 22 Oct 2026 — "Vacation Auction 22 Oct 2026 V3" — STAFF 221 / ADMIN 385 SHIPPED (§292): ARCHIVED SETTINGS · THE COUNTDOWN RESTART · MODE 3 REMOVED · THE ADMIN GET-IN LIST
**State.** LIVE: staff 221 / admin 385 / mobile 18 `bd738bf` (pushed about 7:05 PM; origin/main md5-identical to the gated copies; served twice 7:08 PM); rules unchanged since `6905471`; schedule 151 / 51. Test site carries 221 / 385. Next honesty baseline `bd738bf`.
**The session, in order.** 10:51 AM re-grounded at 159,066. His idea (10:57) — an admin view of the get-in alerts — answered (A, in E-mail Sending Controls), put into 385; W4 approved; **GO 11:05 AM**. Built in the cloud by builders working from `tests/docs/build221/BRIEF-221.md` (parts 1–3, his 1:23 / 1:25 PM answers as PART 1 FIX), gated (battery 200 / 200), reviewed blind by two lanes (admin safe; staff **H1**: false countdown restarts in later Phase 4 rounds), fixed; M1 put to him → **A** (3:39 PM: a get-in e-mail is no longer sent for a bid the bid box would refuse); the verifier found **V1** in the fix → rule 21 stop → his **B** (4:42 PM); the re-verify found **N1** in the guard → rule 21 stop → his **A** (5:19 PM: filed as is, N1 a recorded residual, `review/verify/mutant-v2.html` its tested fix). Final gate: battery 200 / 200, 9,314 assertions; sweep clean at 1440 / 390 / 375 / 320; test site 31 / 31. Filed 7:01 PM (144 files md5-checked both sides). 7:08 PM his redesign idea widened (oriona.ai; colours now open too) — read in Chrome, filed in TODO.
**Lessons.** (1) **A runner must export nothing a suite reads**: the battery runner exported `LOGS` (its log folder), which `test-216-380-ko-twin` reads as its fuzz size — it ran 0 logs and its own "the fuzz really ran" check failed it (rule 8 working). (2) **A comment that NAMES a function drags it into the house extractor's test copy**: one 220 comment naming `_subscribeSensitiveOnce` pulled the alert listener and 45 functions into the save's copy, changing what the harness sent (PART 2 FIX: describe it in words). (3) **An oracle that shares the page's assumption cannot catch it**: the restart suite's oracle judged the same incomplete "after" picture as the page; judge restarts and get-in e-mails against the board AFTER the save lands, with Phase 4 later-round boards (carried bids, no log rows). (4) **When a fix borrows a row into a log, ask whether the real row may already be there** (V1). (5) Subagents cannot write report files here — the session saves their reports itself (`review/*/FINDINGS.md`, `VERIFY.md`). (6) Rule 21 held twice and both times he chose in a minute.
**Next.** His choice: the redesign phone test pages (TODO: his 7:08 PM idea, a FRESH session) or the admin warning (Option B; its Clear-floor part drops).
**Session close** 22 Oct 2026 about 7:15 PM at about 470,000 tokens. All four repos checked; isolation not run (no schedule page or shared writer touched); `status.mjs` below.

---
## ⤵ moved 29 Oct 2026 from HANDOFF.md — 23–24 Oct 2026 — "Vacation Auction 23 Oct 2026 V2" — NO BUILD: SESSION A PART 2 — G3 / G3b / G5-DRAWN BUILT AND PROVEN · TWO GAPS IN PART 1'S SCANNER FIXED · RULINGS PAGE 2 PUBLISHED (20 ITEMS, HIS TO RULE)

## 23–24 Oct 2026 — "Vacation Auction 23 Oct 2026 V2" — NO BUILD: SESSION A PART 2 — G3 / G3b / G5-DRAWN BUILT AND PROVEN · TWO GAPS IN PART 1'S SCANNER FIXED · RULINGS PAGE 2 PUBLISHED (20 ITEMS, HIS TO RULE)
**State.** LIVE unchanged: staff 221 / admin 385 / mobile 18 `bd738bf`, schedule 151 / 51 (served twice at the opening, 9:45 PM). Nothing on either site changed; test site not republished. All work in `tests/docs/redesign-build-2026-10-23/` (README, part 2; `page2/` for the rulings page) and this file, TODO §1, the plan's §5 status. **Not yet on the Mac** — it went off at 11:03 PM ("mac will be off, keep going in the cloud"): every file is in the session's zip (`session-a2-files.zip`, sent in the chat); write it in and md5 it at the next session's start, then run `node status.mjs`.
**The session, in order.** 9:44 PM re-grounded at about 184,000 (`git fetch` refused again, origin confirmed from the cloud). 9:45 PM his go on part 2. Built `g3.mjs` (a recorder walking both auction pages the sweep's way, recording every database write, storage write, e-mail, Excel workbook, download, report window, alert and error after every click, plus each control's clickability) and `g5_drawn.mjs` (every colour, font and symbol actually drawn). Proven: three recordings of the unchanged pages identical (1,056 steps); the legal copy passes G3 and G3b; six behaviour faults refused (an admin database value, an e-mail word, an Excel heading, a staff database value — G3; an unclickable button — G3b; a hidden button — G3); G5 drawn fails old (505) and legal (40), passes the full proof copy (0). A separate agent built rulings page 2 (https://claude.ai/artifact/7BQtDnGyNKtFu7nsj4zbqZ, version 2, 20 items: dialogs, sign-in, toasts, alerts window, report sheet, the Daily Schedule's sign-in / staff / admin, the shift colours, and five newly found schedule symbols); checked here at phone width.
**Lessons.** (1) **A gate's first runs must be checked for determinism ALONE as well as side by side** — Playwright's page clock keeps running after install until paused; the sign-in wait moved the clock by load speed; the pages' one-time reload on a new stored setting runs in real time; two side-by-side runs agreed while both were load-dependent. (2) **Read the passes (rule 18), again:** the first Excel fault changed a heading no export in the walk draws, and passed. (3) **Part 1's static scanner had two gaps, both found by this session's work and checked before believed:** a quoted colour whose colour word sat more than 40 characters back (admin 10491, the capacity workbook — found by the drawn half); and a `<style>` inside a JS comment that hid schedule admin 1745–10639 from every tool (found by the rulings-page agent: 137 colour uses and 99 symbols newly read; the auction pages' counts exactly unchanged). Both fixed, the class hunted, G1 / G2 / static G5 re-proven. (4) **The static half passes a font rule that starts right but is broken** — the drawn half catches it. (5) **A slip in a batch script** (every recording written to one file named `x`) voided one run: write batches as a file, not a one-liner.
**24 Oct 2026 6:37 AM — his ruling on page 2** (verbatim in DECISIONS §294): all 20 as proposed except the sign-in screens, which are MOSS (items 7 and 12); the page redrawn to show it (v3). **Next.** Before session B: the Daily Schedule's own G3 run (not built); the schedule shift colours into the §3.1 data list; ruling 13's eight pale tints into `map.json`.
**Session close** 24 Oct 2026 about 12:40 AM at about 470,000 tokens. No build, so no battery or isolation run; test site — no page changed, not republished.
**24 Oct 2026, 6:37–10:57 AM — the session went on (the same chat), his rulings on the look, all verbatim in DECISIONS §294.** Rulings page 2: all 20 as proposed, except the sign-in screens. The sign-in panel: moss shown, then *"too much moss green"* — five options, **D grey-green `#646A5C`** chosen; and a standing rule, **no large area in the original moss anywhere** — Claude found three (the Excel header bands, the reports' phase badge, the Dashboard chart), shown, all moved to D in the colour map. Then a **dark sage stripe**, final: **no calendar picture, a 24-point stripe of `#36694A` above the panel's words** (option T1); the three small words on the panel **full white**. The options page: https://claude.ai/artifact/SH3KtgvZGbw1sVsgSoEvsz (v5; kit `tests/docs/redesign-build-2026-10-23/page2/moss-options/`). The stray broken copy of page 2 deleted at his word.
**Also this morning.** (1) **G1 had never passed the admin legal copy** — its last printed line reports the data-range check, not its verdict; read by EXIT CODE it was refused, part 1's own tools too (emoji written as JS escapes). Fixed; every page re-proven by exit code; B1 / B5 were G2's catches, two true in-script faults (B7 / B8) added (tools README items 13–14). (2) The Mac came back at 10:45: **all 119 files of this session written into the four folders and md5-verified** (the replaced files first checked against their last commit); `status.mjs` exit 0. The context reading fell from about 562,000 (6:57 AM) to about 462,000 (10:45 AM) with no work between — the whole conversation still visible, so not a compaction (most likely old tool output cleared); treated as past the 550,000 line all morning: rulings and filing only.
**Lessons.** (1) **Read a gate's EXIT CODE, never its last line (rule 11)** — the G1 miss stood a whole session. (2) **A colour shown in a large flat area reads far stronger than in a test-page swatch** — he rejected the moss only when a full panel was drawn; show large areas at full size before ruling a colour for them.
**Next — session B, the build, in a FRESH session.** Its first steps (no ruling needed): the Daily Schedule's own G3 run; the schedule shift colours into the §3.1 data list; ruling 13's eight pale tints into `map.json`; the style block's font / colour / `accent-color` on buttons and fields; today's sign-in changes (calendar hidden, the stripe, the three words white). Then apply, every gate, his phone look, file, push. His, any time: the EmailJS template (he sends its HTML, gets it back restyled, pastes it).
**Session close** 24 Oct 2026 about 11:00 AM at about 470,000 tokens. No build, so no battery or isolation run; test site — no page changed, not republished.

---
## ⤵ moved 29 Oct 2026 from HANDOFF.md — 23 Oct 2026 — "Vacation Auction 23 Oct 2026 V1" — NO BUILD: HIS GO ON THE REDESIGN PLAN (§294) · SESSION A PART 1 — THE SYMBOL LIST, THE COLOUR MAP, GATES G1 / G2 / G5-STATIC / G7, THE RULINGS PAGE (ALL 15 ITEMS RULED)

## 23 Oct 2026 — "Vacation Auction 23 Oct 2026 V1" — NO BUILD: HIS GO ON THE REDESIGN PLAN (§294) · SESSION A PART 1 — THE SYMBOL LIST, THE COLOUR MAP, GATES G1 / G2 / G5-STATIC / G7, THE RULINGS PAGE (ALL 15 ITEMS RULED)
**State.** LIVE unchanged: staff 221 / admin 385 / mobile 18 `bd738bf`, schedule 151 / 51 (served twice at the opening, 3:53 PM). Nothing on either site changed; test site not republished (no page changed). Recorded: DECISIONS §294 (his go, 3:55 PM; the 15 rulings, 9:31 PM), the plan's status line and §5, TODO §1, the tools `tests/docs/redesign-build-2026-10-23/` (its README is the record).
**The session, in order.** 3:52 PM re-grounded at 196,185 (`git fetch` over the bridge refused with 403 again — origin confirmed by `ls-remote` from the cloud, STANDING TRAPS). 3:55 PM his go, verbatim in §294: function unchanged first; every colour scheme and style changed; no old scheme left; no emoji; line icons where needed. 3:56 PM: both the auction and the Daily Schedule sites. About 4:00 PM the bridge dropped; 4:07 PM his order: "mac will be offline. cont in cloud." — the work was done in the cloud (all four repos cloned; `tests` attached read-only). Built and proven, each passing on unchanged and legal copies and refusing one-fault copies: the inventory scanner, the symbol sort, the colour map, G1 code tokens, G2 markup and stylesheets, G5's static half, G7 colour-blind sets. Published the rulings page https://claude.ai/artifact/WSbmiA4NbNVKezySy2AzGn (v4). 9:29 PM the Mac back; 9:31 PM his answer to all 15 items: *"proposal is good, all of it"*. This session had no file-transfer tool to the Mac, so the scripts were written over the bridge as text and every data file regenerated there — all md5-identical to the cloud.
**Lessons.** (1) **Hunt the class of a data hazard, not the instance (rule 17)** — the plan named the holiday EMOJI as data; the config loader showed the holiday COLOURS are written to the database too (`_acColorFor`), so the colour map leaves those lines byte-identical. (2) **A proof fault that lands outside the gate's reach passes it — read the passes (rule 18)**: two "broken" copies for G1 had their fault in markup; re-aimed, G1 refused both, and the markup copies became G2's proof. (3) **Never key a cache on Python's `id()`** — ids are reused, and the scanner gave one file wrong line numbers for a run. (4) **A quoted font name inside a quoted script string breaks the page** (admin 10139) — the build writes `Hanken Grotesk` unquoted. (5) **Text sent over the bridge: escape codes like `️` arrive as the real character** — build such lines from character numbers (`chr()`) and md5 every file.
**Next.** Session A part 2: G3 / G3b on the test site (the holiday-note setting added inside G3's own run, not to the shared seed), G5's drawn half, and the second rulings page (dialogs, sign-in, toasts, alerts window, report sheet, the Daily Schedule's pages). Session B (the build) only after that.
**Session close** 23 Oct 2026 about 9:50 PM at about 615,000 tokens. No build, so no battery or isolation run; test site — no page changed, not republished.
