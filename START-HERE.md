# START HERE — KP East Bay Anesthesia. Both sites. The ONLY document you paste.

Rewritten 17 Aug 2026 to one copy of every rule. The five files that govern everything:

| file | answers |
|---|---|
| **this file** | how we work — every binding rule, once |
| `TODO.md` (this repo) | what is outstanding, both sites — queue at top, STATUS block first |
| `HANDOFF.md` (this repo) | what happened, in detail, both sites |
| `DECISIONS.md` (this repo) | what the owner has ruled (§1–§57 + the buried-rulings index) |
| `schedule/BUILD-LOG.md` | what shipped, when, in which commit |

A fact lives in ONE of these. Before writing a rule or status anywhere, grep for it; if it
exists, point at it. The pre-merge documents drifted precisely because facts had copies.

---

## 1 · PRIORITIES — the owner's ruling, 17 Aug 2026, verbatim

> *"My current #1 priority is the vacation site. Nothing can corrupt that since we are close
> to launch. The schedule site is months away from actual use and I can continue to build and
> check that as long as it doesn't disturb the vacation site."*

**The Vacation Auction is LIVE** (~60 anesthesiologists, all year, launch near). **The Daily
Schedule is a prototype** built alongside it. If a schedule change carries ANY risk to the
auction, it does not ship. If the auction needs attention — a phase, a send, an incident —
schedule work stops. Check `TODO.md` §1 for the current standing constraint (e.g. a rehearsal
phase in flight) before doing anything.

## 2 · THE TWO SITES, AND WHAT THEY SHARE

**Vacation Auction** — `vacation-kp.github.io`, served at
`https://anesthesia-kp.github.io/vacation/`. **Daily Schedule** — `schedule`, in build.
**ONE Firebase project holds both**: `vacations/*` belongs to the auction, `dailysched/*` to
the schedule.

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

**Commit summaries** — one per build PER REPO touched, SHORT (a recognisable subject + 2–4
plain lines; the reasoning lives in BUILD-LOG/DECISIONS/HANDOFF). Delivered THREE ways,
every time: the chat outputs column (`COMMIT-<repo>.txt`), `<repo>/COMMIT-MESSAGE.txt` on
disk (NOT a dotfile — the old dotfile name was invisible in Finder AND GitHub Desktop at
once, which is how messages got lost), and the BUILD-LOG row. Copy from the outputs column
or COMMIT-MESSAGE.txt, never from a source or test file.

> ⛔ **THE OUTPUTS COLUMN IS THE DELIVERABLE, NOT A COURTESY. Owner ruling, 17 Aug 2026:**
> *"ALWAYS ALWAYS ALWAYS send them to the output so i can easily copy."*
> **Every time a `COMMIT-MESSAGE.txt` changes — every revision, not just the first — the
> same text goes to the chat outputs column IN THE SAME TURN.** The disk copy is the
> backup; the outputs column is what the owner actually copies from. This rule was broken
> once (three revisions went disk-only and the owner had stale messages on screen at push
> time); it does not get broken again. A repo whose message is not in the outputs column
> is NOT ready to push.

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

**File transfer when staging is blocked** (`untrusted_device`): `SendUserFile` →
`device_commit_files` works and is byte-exact — md5 both directions. Getting a file OFF the
device: diff + gzip + base64 in ~12 KB chunks, verify each; a single large blob printed
through `device_bash` LOSES BYTES.

## 7 · WAIT FOR INSTRUCTIONS BETWEEN BATCHES

The owner drives the order. Present the state, propose, and stop.
