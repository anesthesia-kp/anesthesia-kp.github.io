# HANDOFF — KP East Bay Anesthesia. Both sites.

**Read `START-HERE.md` first.** It carries the cardinal rule, every binding working rule, and
the current state of both sites. This file is the per-site detail behind it.

Nothing here restates a rule from `START-HERE.md`. If you find something that does, delete it
here and keep the copy there — that duplication is the disease this merge cured.

---

# PART A — SHARED

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
