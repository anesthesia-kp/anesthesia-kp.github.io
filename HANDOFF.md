# HANDOFF — KP East Bay Anesthesia. Both sites.

**Read `START-HERE.md` first.** It carries the cardinal rule, every binding working rule, and
the current state of both sites. This file is the per-site detail behind it.

Nothing here restates a rule from `START-HERE.md`. If you find something that does, delete it
here and keep the copy there — that duplication is the disease this merge cured.

---

# PART A — SHARED


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
