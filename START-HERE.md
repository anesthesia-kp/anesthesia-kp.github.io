# START HERE — KP East Bay Anesthesia. Both sites. The ONLY document you paste.

**LAST REVISED: 19 Aug 2026.** (Structure rewritten 17 Aug to one copy of every rule;
substantially revised 19 Aug — §1 gained the where-to-start block and the audit hold, §3
gained the commit-length cap, §4 gained the explicit-SHA fixture rule, §6 gained the
skipped-honesty rule and the run-on-device route; §1 revised again later on 19 Aug — the
Firestore switch is DONE, and the owner has a FEW WEEKS before go-live, which re-times the
security work in `TODO.md` FB-4/FB-5.)

> ⚠️ **BUMP THAT DATE WHENEVER YOU EDIT THIS FILE, in the same turn.** The owner caught it
> reading "17 Aug" on 19 Aug after a day of edits. A governing document that misreports its
> own age is worse than no date at all — a fresh session trusts it.

The five files that govern everything:

| file | answers |
|---|---|
| **this file** | how we work — every binding rule, once |
| `TODO.md` (this repo) | what is outstanding, both sites — queue at top, STATUS block first |
| `HANDOFF.md` (this repo) | what happened, in detail, both sites |
| `DECISIONS.md` (this repo) | what the owner has ruled — **BOTH sites**, despite its legacy title (§1–§63 + the buried-rulings index). **§60 = every ruling of the 19 Aug session verbatim** (his standing instruction: never depend on chat history) · **§61** Firestore pay-as-you-go · **§62** the commit-summary length cap · **§63** the pre-launch security ruling (App Check across all six pages, staged enforcement, privacy after) |
| `schedule/BUILD-LOG.md` | what shipped, when, in which commit |

A fact lives in ONE of these. Before writing a rule or status anywhere, grep for it; if it
exists, point at it. The pre-merge documents drifted precisely because facts had copies.

---

## 1 · PRIORITIES — the owner's ruling, 17 Aug 2026, verbatim

> *"My current #1 priority is the vacation site. Nothing can corrupt that since we are close
> to launch. The schedule site is months away from actual use and I can continue to build and
> check that as long as it doesn't disturb the vacation site."*

**The Vacation Auction is LIVE** (**35 participating anesthesiologists** — owner, 19 Aug 2026; earlier docs said ~60, which was the roster size, not the number bidding — all year, launch near). **The Daily
Schedule is a prototype** built alongside it. If a schedule change carries ANY risk to the
auction, it does not ship. If the auction needs attention — a phase, a send, an incident —
schedule work stops. Check `TODO.md` §1 for the current standing constraint (e.g. a rehearsal
phase in flight) before doing anything.

> 🟢 **WHERE TO START (19 Aug 2026, end of session).** Everything is pushed and live —
> auction **280 / staff 145 / mobile 18**, schedule **admin 70 / staff 30**, all four repos
> clean and in sync, no locks.
>
> **TWO FACTS THAT CHANGED LATE ON 19 AUG AND RE-TIME EVERYTHING BELOW.**
> **(1) The Firestore pay-as-you-go switch is DONE** — the owner moved the project to Blaze
> and set billing alerts. That was the last launch blocker on the free plan, and the
> hard-denial cliff (reads stopping mid-phase at the daily cap) is gone. What replaces it is
> a bill, so the exposure is now abuse and runaway-read shaped, not outage shaped.
> **(2) The owner has A FEW WEEKS after the rehearsal to update and test before go-live**
> (his words, 19 Aug). Earlier docs read as though launch were days away; it is not. This is
> the single most important scheduling fact in this file — a few weeks with NO live auction
> running is the right window for changes that would be reckless mid-phase, and it is why
> `TODO.md` FB-4 (App Check) moved from "not before launch" to "do it now".
>
> **The security work the owner asked for on 19 Aug is `TODO.md` FB-4 and FB-5.** FB-4 is
> billing/abuse (App Check first, in monitoring mode, then enforce; plus a console key
> restriction). FB-5 is read-privacy (public reads that the login screen does not need —
> a client change first, then rules, one document at a time). **FB-4 before FB-5.**
> **Claude's next SCHEDULE build is still `S5c`** — the grid filter bar, whose role/site
> half is blocked until Stage 4 (`TODO.md` §1, item 5).
> The audit below is still the queue head for the AUCTION and still on hold at the owner's
> word ("audit later", 19 Aug).
>
> ⛔ **CURRENT STANDING ORDER — A-AUDIT, ON HOLD BY THE OWNER (19 Aug 2026).** The audit is
> still the queue head and still the next substantial piece of work, but the owner's word on
> 19 Aug was **"hold for now, will do soon."** So: **do not start the audit unsolicited, and
> do not start a feature either.** Ask what he wants, and if he says go, run the brief below.
>
> **Reality check for a fresh session, so the history reads honestly.** The original order
> (18 Aug) was *"the vacation site is complete in terms of build… I want the next session to
> perform a full audit with multiple claudes and adversarial review… focus on critical and
> high findings that could lead to trouble during the real auction."* That is still the
> brief. But on **19 Aug the owner reopened the queue five times in one evening**, each time
> for a defect HE found by using the site (builds 276 → 280 / staff 145 — see
> `HANDOFF.md` §5b). None of it was audit work. **The pattern to expect: the owner tests, he
> finds real things, and he will ask for a fix on the spot.** That is legitimate and it
> outranks the audit when he asks — but each fix is still a §3 build with its own "go",
> its suite, its executed honesty check and both batteries. Do not let "we're mid-audit"
> become a reason to lower that bar, and do not let a string of small fixes quietly become
> a reason never to run the audit.
>
> **The full brief — scope, priority order, the CRNA question, the deliverable — is
> `TODO.md` §1 `A-AUDIT`.** Read it before anything else. How an audit runs here, because it
> is not how a build runs:
> - **Audit the PUSHED bytes, not the working tree** — `versions.json` cache-busted first,
>   then BOTH batteries green as the baseline, so a failure means a finding.
> - **Fan out, then refute.** Independent reviewers, one lens each, blind to each other;
>   every candidate finding then handed to a separate skeptic whose job is to KILL it
>   against the real code. Survives = report it. No line and no auction-day consequence =
>   drop it, do not soften it. A padded list is how a real CRITICAL gets skimmed.
> - **CRITICAL/HIGH is the headline** (lost or corrupted bid · mis-awarded week · wrong
>   mass mail · people locked out mid-phase · wrong numbers the owner would act on).
>   MEDIUM/LOW live in an appendix. Shape only, never a reproduction — the repos are PUBLIC.
> - **Include the HUMAN lens (added 19 Aug, after the owner found two defects a code-reading
>   pass would have missed or downgraded).** Both were code doing exactly what it said, where
>   what it said was wrong for a person: a settings row that moved to a line the admin never
>   typed on, and a log line reading "bid for ALL on Wk 0 · undefined undefined NaN". So one
>   reviewer must EXECUTE the render functions against a DOM shim and read the produced
>   markup as a person would — and **"the screen tells the admin or a bidder something
>   untrue" is HIGH**, even with no data lost and no bid affected. Under the old bar the
>   first of those would have been logged cosmetic and killed by a skeptic. That was wrong.
> - **The audit produces a LIST, not commits.** Every fix that follows is a separate
>   smallest-change build with its own "go", its suite and its honesty check (§3). Priority
>   focus, owner's words: **calendar, timer, bid lowerings, bid floors** — *"Focus on those,
>   but look at everything."* The schedule site is OUT of scope except where it touches
>   vacation, and the CRNA site must be PROVEN clean of the MD site, not asserted.

## 2 · THE TWO SITES, AND WHAT THEY SHARE

**Vacation Auction** — `vacation-kp.github.io`, served at
`https://anesthesia-kp.github.io/vacation/`. **Daily Schedule** — `schedule`, in build.
**ONE Firebase project holds both** (`vacation-25e8e`): `vacations/*` belongs to the auction,
`dailysched/*` to the schedule. **That means ONE Firestore quota and ONE bill across both
sites** — verified in the code 19 Aug 2026. The CRNA auction is a SEPARATE project
(`crna-vacation`) with its own allowance. The schedule contributes nothing today, but it
carries 19–25 listeners per page and would run every working day all year, so once it goes
live it plausibly becomes the LARGER consumer — redo the arithmetic before that, not after
(`TODO.md` FB-3). The plan is moving to pay-as-you-go (DECISIONS §61, on the launch
checklist), so the failure mode is a bill rather than an outage — which is the right way
round, but is not the same as free. `isolation-test.mjs` guards shared WRITES; nothing guards
shared SPEND.

What they genuinely share — why a change to one can break the other:

- **One roster**: `vacations/userList` · `usernames` · `emails` · `loginEmails` ·
  `emailToUser`. Both sites read them. `emailToUser` is the auction's bid-security map —
  getting it wrong stops real people bidding.
- **THE ONE SANCTIONED EXCEPTION**: the schedule admin's **Users page** writes that shared
  roster (owner ruling, DECISIONS §1). It therefore stays LOCKED by default (§50a). The
  sanctioned handlers: `addSchedUser`, `saveSchedUser`, `saveSchedField`,
  `saveAllSchedUsers`, `removeSchedUser`, `syncEmailToUserFromLogin`.
- **FTE is SEPARATE** — `dailysched/fteMap` and the auction's FTE are different numbers for
  the same person, deliberately. Never sync, never fall back.
- **`firestore.rules` lives in the AUCTION repo** and contains the `dailysched` block. Any
  rules change is an auction deploy: gate it with auction discipline, publish in the
  Firebase console, and the console publish must land BEFORE dependent client code pushes.
- **EmailJS quota is shared.** The schedule sends nothing today; anything it ever sends
  draws on the auction's allowance.
- **The guard**: `tests/sched/isolation-test.mjs` fails if the schedule gains a write path
  to `vacations/*` outside the sanctioned handlers. Firestore rules CANNOT enforce this
  (same project, same signed-in person) — the code plus that test is the entire guarantee.
  Run it before filing anything. The auction suites also read the schedule admin page, so
  **the auction battery re-runs after schedule builds** — it has broken three times.
- **A push to the auction repo is a DEPLOY of the live site**, even docs-only (Pages
  redeploys). Docs-only pushes are harmless only while served bytes are identical and
  `versions.json` is unchanged. Anything that changes served bytes deploys BETWEEN phases.

## 3 · WORKING DISCIPLINE — every binding rule, one copy

**The change itself**
1. Smallest change → explicit "go" → only that change. Never rewrite whole files. When
   unsure, STOP and ask. Do not agree with bad ideas — push back.
2. Read → edit → `node --check` every inline script → run the suites. Extractor gotchas: no
   default-param braces (`opts={}`) and no stray `{` in comments inside extracted functions.
   Prefer grep + ranged reads (the admin files are large).
3. Every fix ships with tests that EXECUTE real extracted code, plus an honesty check
   proving they FAIL on the previous build. Small batches by subsystem, adversarial
   re-audit after each (measured fix→regression ≈ 1:1). Verify every assumption against
   code before acting.
4. Bump `var BUILD` AND `versions.json` together. Never deploy; never write production
   Firebase. **The owner does every push** (GitHub Desktop). Claude files to the working
   tree and byte-verifies (md5 device vs cloud). Delivered files are always also WRITTEN
   into the repo folders without asking.
5. No one-click destructive actions, rehearsal OR live: every auction-critical write or
   send passes through a dialog; dialogs are paint, GUARDS at the moment of action are the
   enforcement. Rehearsal Mode gates the simulator and the skip buttons; mail stays LIVE in
   rehearsal; every restore lands with rehearsal OFF. Duplicate login e-mails are refused
   at entry in BOTH admin sites and fail CLOSED in the map. Passcodes are retired forever.
6. **Never present invented data as the owner's** (§22). This repo set is PUBLIC — describe
   defects by shape, never by reproduction. Plain language always; the owner is not a coder.

**The paperwork — at these moments, these files, EVERY time**

| when | what changes |
|---|---|
| a ruling / an idea / a "we should eventually…" | `DECISIONS.md` (ruling) or `TODO.md` (idea) — **IN THE SAME TURN it is said.** A chat is one compaction from gone; this has already cost the owner ideas once |
| a build is filed | `BUILD-LOG.md` row (same breath as the code) · `COMMIT-MESSAGE.txt` per repo touched · the same summary to the chat outputs column · `TODO.md` defect/roadmap status |
| the owner pushes | run `node status.mjs` in this repo — it regenerates the STATUS block in `TODO.md` from `versions.json`, git and the suite counts. Derived facts are never hand-typed |
| a batch completes | tick it in `TODO.md` §1 |
| session end | `HANDOFF.md` if anything session-specific matters · status regenerated · stale-lock check (below) — the repos are the memory, not the chat |

**Commit summaries** — one per build PER REPO touched. **HARD CAP, owner ruling 19 Aug 2026:
a subject line plus AT MOST 4 short lines — about 50 words. If it is longer, it is wrong.**
His words: *"i am using only the summaries though and they are too long"* — cut to roughly a
QUARTER of what they had grown to. This rule already existed and Claude drifted past it all
through 18–19 Aug, writing 150–200-word messages; the cap is now numeric so drift is
detectable. Say WHAT changed, not why or how it was proven — the reasoning lives in
BUILD-LOG/DECISIONS/HANDOFF, and the gates live in BUILD-LOG. No test counts, no honesty
numbers, no battery results in a commit message. Delivered THREE ways,
every time: the chat outputs column as **ONE combined `COMMIT-MESSAGES.txt`** holding
every touched repo's message under a clear per-repo divider (owner ruling 18 Aug 2026 —
"I like the 1 commit message idea, ensure that sticks"; the old per-repo
`COMMIT-<repo>.txt` outputs are retired). The file MUST open with a banner line —
"⚠ COPY ONE SECTION PER REPO" — because a whole-file paste makes the divider the
commit subject (happened 18 Aug: `7fcd3f1`/`594778e`; recorded in BUILD-LOG, not
rewritten). Also delivered: `<repo>/COMMIT-MESSAGE.txt` on disk per repo
(NOT a dotfile — the old dotfile name was invisible in Finder AND GitHub Desktop at
once, which is how messages got lost), and the BUILD-LOG row. Copy from the combined
outputs file or COMMIT-MESSAGE.txt, never from a source or test file. Any revision to
any message = the WHOLE combined file re-sent to outputs in the same turn.

> ⛔ **THE OUTPUTS COLUMN IS THE DELIVERABLE, NOT A COURTESY. Owner ruling, 17 Aug 2026:**
> *"ALWAYS ALWAYS ALWAYS send them to the output so i can easily copy."*
> **Every time a `COMMIT-MESSAGE.txt` changes — every revision, not just the first — the
> same text goes to the chat outputs column IN THE SAME TURN.** The disk copy is the
> backup; the outputs column is what the owner actually copies from. This rule was broken
> once (three revisions went disk-only and the owner had stale messages on screen at push
> time); it does not get broken again. A repo whose message is not in the outputs column
> is NOT ready to push.

> 📋 **RULES FILES GET THE SAME TREATMENT. Owner ruling, 18 Aug 2026:** whenever
> `firestore.rules` (or any file the owner must copy-paste into a console) is created or
> changed, deliver it to the chat outputs column as ITS OWN clearly-captioned file in the
> same turn — never buried inside a multi-file batch, and ALWAYS as plain text (owner
> ruling 18 Aug: never a Word doc — Word's smart quotes and hidden characters break a
> console paste; anything a machine reads ships as plain text). The owner copies straight
> from the Claude desktop outputs viewer — so the standalone captioned send IS the
> delivery; no other format or channel is needed. The owner pastes rules into the
> Firebase console by hand; a rules change that is hard to find is a deploy blocker.

> 🧹 **OUTPUTS HYGIENE — owner ruling, 18 Aug 2026: the outputs column is CURATED.**
> Already-sent files cannot be removed by the session (no such tool — the column resets
> only in a fresh chat), so curation means what goes IN. Per build, the outputs column
> receives EXACTLY what the owner copy-pastes and nothing else:
>   1. ONE combined `COMMIT-MESSAGES.txt` (all repos' messages in one file), and
>   2. the rules file, ONLY when it changed (standalone, ⚙️-captioned, plain text).
>   3. ONE zip bundle (`build-<n>-files.zip`) holding every other changed file —
>      pages, tests, docs, versions.json, BUILD-LOG — which the session then commits
>      to `_to_delete/xfer/` on the owner's disk and UNPACKS into the repos with
>      `device_bash` + `unzip -p <zip> <name> > <repo path>` per file (NOT `unzip -o`,
>      which delete-then-replaces and the bridge forbids deletes — hit 18 Aug),
>      md5-verifying EVERY extracted file against its
>      cloud copy (a mismatch means redo, never shrug). The spent zip stays in
>      `_to_delete/` — that folder is designated junk the owner empties.
> So a normal build adds ~3 outputs, not 16. Do NOT ship file bytes as base64 through
> `device_bash` commands — tried 18 Aug, corrupted in transit (CRC fail), and it burns
> session context; the zip-through-the-pipe route is the one that works. If unzip or
> the bridge fails, fall back to committing files individually (they will then appear
> in outputs — caption them with the build number).
>
> 📄 **Copy-paste files ship with a `.txt` extension — owner caught this 18 Aug:** a
> `firestore.rules` filename is not a recognised type, so the viewer/macOS hands it to
> Word — and copying OUT of Word's window can smart-quote the clipboard even though
> the file itself is clean. Deliver `firestore-rules.txt` (and the like) to outputs;
> the repo copy keeps its real name via the zip bundle.
> Copy-paste items also go in chat text, so the column is a convenience, not a hunt.

**File hygiene** — a standing rule, not a one-off. Main folders hold only what is live or in
flight. Outdated → `~/Documents/GitHub/_archive/<area>/<category>/` (areas on disk:
`vacation`, `schedule`, `tests`, `anesthesia` — use the existing names, do not invent
sibling folders). True machine junk → `_to_delete/`. **Nothing is ever deleted.** Before
moving anything: grep the WHOLE GitHub folder; if unsure, it stays. Never move what the
live site serves — the junk-looking hash-named files are LIVE REDIRECTS (`0c0fd0a8….html`,
`2nd-admin-page-234asld.html`, `a5696c46….html`); open and read the `<title>` before
assuming. Record every move in `_archive/README.md`. Housekeeping is its own commit.
`.gitignore` does not apply to files git already tracks — verify with
`git --no-optional-locks -C <repo> check-ignore -v <file>`; silence means NOT ignored.

## 4 · EVERY SESSION — the re-grounding ritual, ONE turn, before any work

1. Read `TODO.md` (this repo) — the STATUS block and §1's queue and standing constraint.
2. Verify live builds: fetch both sites' `versions.json` cache-busted. **If a fetch
   disagrees with disk right after a push, fetch AGAIN before believing it** — the CDN has
   served a pre-push copy under a cache-buster within minutes of a push.
3. `git --no-optional-locks status --short --branch` on all four repos. Assume every build
   number you did not personally verify minutes ago is stale — the owner pushes
   mid-session, and has twice been the one to catch Claude quoting stale state.
   **HEAD MOVES UNDER YOU. 19 Aug: it moved three times in one evening.** Consequence that
   actually bit: a `--pre` honesty fixture built from `HEAD~1` silently became the WRONG
   build, and the honesty check then reported a **false PASS** — the worst possible failure,
   because it looks like proof. **Build every honesty fixture from an explicit SHA, and
   re-read `git log` immediately before building it.** Never `HEAD~n`. If a build was filed
   but never committed before the next one was written over it, that intermediate build has
   NO fixture and never will — baseline against the last PUSHED build and say so.
4. Stale-lock check: `find <repo>/.git -maxdepth 2 -name '*.lock'` — all four repos.
5. Report the state in a few lines. Then work. **When in doubt during the day: run it,
   don't recall it.** Files too — an hour once went to a "failing test" that was a stale
   in-session copy; read from disk, md5 both sides when it matters.

**⚠️ GIT OVER THE DEVICE BRIDGE — read-only, always `--no-optional-locks`, and even that is
not a guarantee.** The bridge cannot unlink files, so an interrupted git write strands
`.git/index.lock` and blocks GitHub Desktop. Never run `add`/`commit`/`checkout`/`stash`/
`merge`/`reset` over the bridge. **Corrected 16 Aug: two locks appeared in one session
DESPITE every command using `--no-optional-locks`** — the flag reduces the risk, it does
not remove it. So check for locks at session START and session END. Clearing one: `rm`
fails over the bridge; `mv` it to `_to_delete/` (or the owner runs `rm -f` in his own
Terminal). The bridge also cannot delete anything, ever — always `mv`.

**⚠️ SAY SO WHEN CONTEXT IS DEGRADING** (owner ruling, 16 Aug). The tells, in order: small
mechanical slips → **asserting things about code without re-reading it** (the dangerous
one — it sounds exactly as confident as a verified claim) → re-deriving settled questions →
losing the thread. Volunteer it, do not quietly compensate; offer a fresh session; make
sure the five files carry everything first. The gate that does not bend: every build still
ships with its suite, executed honesty check, and byte-verified file — tiredness is a
reason to hand over, never to lower the bar.

## 5 · ONE CHAT, BOTH SITES

Working both sites from one chat is the owner's settled preference and it has measurably
helped (the cardinal rule was enforced BETTER with both in context; auction patterns were
lifted verbatim into the schedule). What makes it safe: **the repos hold the memory, not
the chat** — which is why the paperwork table above is binding. Revisit only when the
schedule reaches the auction's scale. **One TODO file** (owner ruling, 17 Aug): the per-repo
TODO files are pointers; lists never fork again.

## 6 · RUNNING THE BATTERIES

**THE BATTERIES ARE CLAUDE'S JOB, IN-SESSION, EVERY BUILD. The owner does not run them —
his words, 17 Aug 2026: "yeah, i don't do those things." Never hand him a build with a
"run the battery first" instruction; run it, show the result, THEN hand over.** The
commands (`node run-all.mjs` in `tests/`, `node sched/run-all.mjs` for the schedule) are
recorded for Claude's use — from a cloud session, stage the files and run there (a full
auction battery ran green in-cloud on 17 Aug, so this is proven practice). From a cloud session: stage the CURRENT build as `ROOT` and the PREVIOUS build
to the uploads path for honesty checks — staging the current build to both makes every
honesty check compare a build to itself and fail, which looks exactly like a regression and
is not. Historical bytes come from read-only git:
`git --no-optional-locks show <sha>:admin/index.html`. Suites skip their honesty block
cleanly when the baseline is absent; feeding it current bytes is the only dishonest option.
Schedule suites take `PRE_ADMIN=`/`PRE_STAFF=`; auction suites `PREFIX_SRC=`;
`test-audit-fixes.mjs` has a HARDCODED schedule baseline path, no env override.

**⚠️ A SKIPPED HONESTY CHECK IS A FAILED GATE, NOT A PASS (19 Aug).** Suites skip their
honesty block cleanly when the baseline file is absent — and a skip prints tidily and exits
**0**. The device workspace restarted mid-session and wiped `/tmp`, so all three honesty
checks silently became skips. **Read the honesty line every time: it must say FAILED with a
non-zero exit.** If it says "skipped", regenerate the fixture from its SHA and re-run before
reporting anything.

**Running the batteries when file staging is blocked:** the device has node (`/usr/bin/node`,
v22) and the repos are mounted, so run the suites there with `device_bash` directly — no
staging needed. `device_bash` also edits files fine via `python3` heredocs, which sidesteps
the zip-transfer dance entirely for a code build. It CANNOT delete: use `mv` to `_to_delete/`.

**File transfer when staging is blocked** (`untrusted_device`): `SendUserFile` →
`device_commit_files` works and is byte-exact — md5 both directions. Getting a file OFF the
device: diff + gzip + base64 in ~12 KB chunks, verify each; a single large blob printed
through `device_bash` LOSES BYTES.

## 7 · WAIT FOR INSTRUCTIONS BETWEEN BATCHES

The owner drives the order. Present the state, propose, and stop.
