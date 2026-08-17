# MASTER TODO — the ordered work queue, BOTH sites

**Created 17 Aug 2026, from the owner's direction.** This file holds the ORDER and STATUS of
the work queue only. Detail stays in each item's own home (`DOC-AUDIT-2026-08-16.md`, the two
sites' TODO files, `DECISIONS.md`) — this file points, it does not restate.

---

## ⛔ THE STANDING CONSTRAINT, UNTIL THE OWNER SAYS OTHERWISE

**Phase 3 of the live rehearsal is UNDERWAY.** Until the owner says it is closed:

- **No vacation-site code changes.** None.
- **No push to `vacation-kp.github.io` at all, even docs-only** — a push redeploys GitHub
  Pages mid-phase. Working-tree edits are fine; the push waits.
- No Firestore writes, no rules changes — as always.
- Schedule work and documentation work proceed freely; they touch nothing the auction serves.

**Owner's priority ruling, 17 Aug 2026, verbatim:**
> *"My current #1 priority is the vacation site. Nothing can corrupt that since we are close
> to launch. The schedule site is months away from actual use and I can continue to build and
> check that as long as it doesn't disturb the vacation site."*

---

## NOW — documentation, accuracy, and the system (no vacation pushes needed)

- [x] **A0 · Rescue the orphans** (Batch 1). DONE 16 Aug — `OPEN-RESIDUALS.md` created,
      HANDOFF Part D added, superseded files banded. Verified by grep-back.
- [ ] **A1 · Fix the six actively-misleading items** (audit Part 1): mark §35 superseded and
      fix §43's mis-attribution · fix vacation TODO's two "AWAITING PUSH" lines · fix
      README's redirect-stub description · fix START-HERE's dead step 1 · complete HANDOFF's
      ruling index (§42–§53b) · correct the git-lock rule (locks appeared DESPITE
      `--no-optional-locks`; check at session end too).
- [ ] **A2 · The system that stops the rot.** (a) A small generator script — reads
      `versions.json`, git state, suite counts; writes ONE generated STATUS block; every other
      file deletes its copy and points there. (b) A one-page "WHAT UPDATES WHEN" table: at a
      build, at a ruling, at a push, at session end — which files change, every time. This is
      the owner's "updated at proper times" requirement made mechanical.
- [ ] **A3 · One home per fact** (Batch 4): delete duplicate build tables from HANDOFF /
      TODO / BUILD-LOG · replace HANDOFF's ruling index and TODO's answered table with
      pointers · merge START-HERE's two overlapping rules sections · fix the two documents
      still teaching the retired `.claude-commit-msg.txt` name.
- [ ] **A4 · The schedule's own records** (Batch 5): rewrite TODO's builds section and
      roadmap from BUILD-LOG · correct the eight wrong defect entries · delete the dead
      line-number anchors · dated status headers on the four design docs · fix `RULES.md`
      where it contradicts §53b and §46 · DECISIONS housekeeping (duplicate §47, ordering,
      heading styles, §53a's wrong arithmetic, the §30 quote flag, numbers for the twelve
      buried rulings).
- [ ] **A5 · Rewrite `START-HERE.md` as THE single next-chat prompt.** Owner's requirement:
      one prompt, both sites, priorities spelled out at the top — vacation #1 and near
      launch, schedule free to build as long as it cannot disturb the auction. Fix its
      structure (broken numbering, dangling §refs, empty final section). The commit-summary
      rule and the archive/delete rule stay in it, prominently.
- [ ] **A6 · File hygiene pass**: archive the three banded `tests/docs` files (now safe —
      content rescued) · `.DS_Store` cleanup · `_archive/README.md` inventory updated ·
      housekeeping is its own commit per repo, never mixed with content changes.
- [ ] **A7 · Fresh "what's left" lists, both sites**: a vacation LAUNCH CHECKLIST (what
      stands between today and launch, incl. the deferred M3 build and the open residuals
      decision points) · a schedule BUILD ROADMAP rewritten against reality (what shipped,
      what's next, what's blocked on which answer).
- [ ] **A8 · The ideas document for the schedule site** — the owner's request, 17 Aug: a
      thorough list of what would make the schedule site fully functional for ~60 busy
      physicians, modelled on the auction's format and discipline. Must cover at minimum:
      **phone access (Apple and Android)** · **e-mail updating and alerts** · the staff
      phone-first view (stage 8) · notifications infrastructure (shared EmailJS quota — a
      real constraint) · calendar subscription (.ics) · the rules engine (§44) · request
      types (designed, unbuilt) · draft/publish with per-person change feed (stage 7) ·
      what else the auction has that the schedule lacks (rehearsal mode parity, backup/
      restore, never-events charter, battery depth). Ideas only — no builds without a go.

## WHEN PHASE 3 CLOSES — the owner says when

- [ ] **B1 · Commit the held vacation-repo docs** (TODO.md edits; COMMIT-MESSAGE.txt is
      already written).
- [ ] **B2 · THE M3 BUILD — approved 17 Aug, scope FROZEN as follows.** One-line read-side
      fix: admin `recipientsFor` returns lower-cased addresses (what its comment already
      claims), which makes both sites agree regardless of stored case — no data migration
      needed. Plus save-path hygiene on BOTH sites' KP-address saves: trim + lower-case, and
      reject only the unarguable (whitespace inside, more than one `@`, domain without a
      dot, leading/trailing dot). **NO domain checking — even as a warning** (settled July;
      HANDOFF D5). Ships with a suite executing both sites' real functions against a
      mixed-case roster + honesty check failing on 269 + the full auction battery. Owner
      pushes **between phases**, never mid-send: the in-flight ledger may hold mixed-case
      entries and a mid-phase deploy could cause the very duplicate it prevents.
- [ ] **B3 · M3 exposure check after the fix ships**: stored KP addresses keep their case
      (harmless once the read side normalises); note for the record which addresses had
      uppercase, in case any duplicate e-mails from Phase 3 need explaining.

## THEN — the schedule's big builds (order set by the owner, session by session)

- [ ] Defect 12 (`renderAll` eats unsaved typing) — next per the standing plan.
- [ ] Defect 4's staff half (doctors can request ineligible shifts).
- [ ] **Stage 4 — roles and subgroups.** §53/§53a/§53b are settled; still owed first: how
      the eligibility-grid migration runs, and whether two same-named subgroups (one per
      category) is the intended shape (§53b).
- [ ] **Stage 5 — the rules engine (§44).** The actual goal.
- [ ] Then the A8 ideas list, prioritised by the owner: phones, e-mail, request types,
      stage 7, stage 8.

---

*Every completed item gets its checkbox ticked here IN THE SAME SESSION it completes, and its
detail recorded in the proper home. This file is the queue, not the record.*
