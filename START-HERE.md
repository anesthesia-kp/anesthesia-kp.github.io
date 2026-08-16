# START HERE — KP East Bay Anesthesia. Both sites. Read this first, in full.

**This is the only document you need to paste to start a session.** It covers BOTH sites,
carries every binding rule exactly once, and tells you where everything else lives.

Written 16 Aug 2026, replacing two handoffs and two start prompts in which five rules existed
in four copies each — and had already been observed to drift within a single session.

---

## 1. THE TWO SITES, AND HOW THEY INTERCONNECT

They are not two projects. They are one system with two front doors, and that is why one
document governs both.

**Vacation Auction** — LIVE, in use by the group all year.
`vacation-kp.github.io` → served at `https://anesthesia-kp.github.io/vacation/`
Doctors bid for vacation weeks; admin runs phases, approves, and mails results.

**Daily Schedule** — in active development, months from real use.
`schedule` → the daily shift schedule for ~60 anaesthesiologists.

**ONE Firebase project holds both.**

| collection | owner | notes |
|---|---|---|
| `vacations/*` | Vacation Auction | the schedule may READ; it must not write, with one exception below |
| `dailysched/*` | Daily Schedule | the auction knows nothing about it |

**What they genuinely share** — this is the interconnection, and it is why a change to one can
break the other:

- `vacations/userList` · `usernames` · `emails` · `loginEmails` · `emailToUser` — **one roster,
  one set of contact details, one bid-security map.** Both sites read them.
- The schedule READS approved vacations so it never books someone who is away.
- **FTE is SEPARATE.** `dailysched/fteMap` and the auction's own FTE are different numbers for
  the same person, deliberately. Never sync them, never fall back from one to the other.
- **THE ONE SANCTIONED EXCEPTION:** the schedule admin's **Users page** writes the shared
  roster. Removing a user there takes them off the LIVE auction; saving a login e-mail
  rebuilds the auction's bid-security map. That page therefore stays LOCKED by default even
  though every other schedule config page now opens unlocked (DECISIONS §50a).

---

## 2. WHERE THINGS STAND — 16 Aug 2026

**Vacation Auction — LIVE.** admin **269** · staff **139** · mobile **17** · rules PUBLISHED.
Battery: 14 suites, **1,075 assertions**, green (re-run 16 Aug). The auction suites READ the
schedule admin page, so they must be re-run after schedule builds too — that has broken three
times. Auction BUILD WORK IS PAUSED at the owner's request; the site runs untouched.

**Daily Schedule — in build.** admin **63** · staff **28**, all pushed and live.
Battery: 16 suites, **587 assertions**, green. Stages 1–3 shipped (shift definition, coverage,
the assignment model). Defects 1, 2, 6, 11, 14, 19, 30 closed.

**Next on the schedule:** defect 12 (`renderAll` eats unsaved typing in the Users grid),
defect 4's staff half (doctors can still REQUEST shifts they are not eligible for), then
**stage 4 — roles and subgroups (§53)**, which unblocks stage 5, the rules engine (§44) that
is the actual goal.

**Open, and needed from the owner before stage 4 (§53):** does a shift require ANY one of its
subgroups or ALL of them; may a person belong to subgroups across categories; and do subgroups
REPLACE the per-shift eligibility grid or filter it. Do not guess (§22).

---

## 3. THE MAP — what to read for what

| you need | read |
|---|---|
| current state, per-site detail, the traps | `anesthesia-kp.github.io/HANDOFF.md` |
| every ruling, §1–§53 | `schedule/DECISIONS.md` |
| open questions, known defects, future ideas | `schedule/TODO.md`, `vacation-kp.github.io/TODO.md` |
| what shipped in each build | `schedule/BUILD-LOG.md` |
| the schedule battery | `tests/sched/` — `node sched/run-all.mjs` |
| the auction battery | `tests/` — `node run-all.mjs` |
| designed but NOT built | `schedule/design/` |

**A fact has ONE home.** Anything true of BOTH sites lives in THIS file and is referenced,
never restated, everywhere else. Anything true of one site lives in that site's section of
`HANDOFF.md`. Before adding a rule anywhere, grep for it first; if it exists, point at it.
Duplicating a rule is exactly how the pre-merge documents drifted.

---


## ⛔ THE VACATION AUCTION COMES FIRST. ALWAYS.

The owner is building the schedule site **in parallel** with a **live, running** Vacation
Auction that serves ~60 anesthesiologists and continues **all year**.

> **No schedule work may degrade the auction. Not by a little, not temporarily, not
> "just while testing".** If a change to the schedule site carries any risk to the
> auction, it does not ship — regardless of how good it is or how much work went into it.

If the auction needs attention — a phase opening or closing, a results send, a live
incident — **schedule work stops** until it is settled. The auction is production. The
schedule is a prototype being built alongside it.

**What the two share, and therefore what to be careful with:**

| shared surface | why it matters |
|---|---|
| **One Firebase project** | Same database. The schedule uses `dailysched`; the auction uses `vacations`. |
| **`firestore.rules`** | Lives in the **auction repo**, and contains the `dailysched` block. A schedule rules change means editing an auction-repo file and publishing in the Firebase console — which is an auction deploy. Treat it as one. |
| **The roster** | `vacations/userList`, `usernames`, `loginEmails`, `emails`, `emailToUser` are written by the schedule's Users panel (owner ruling, `DECISIONS.md` §1). |
| **`vacations/emailToUser`** | The auction's bid-security map. The schedule rebuilds it on a login-e-mail save. Getting it wrong stops real people bidding. |
| **EmailJS quota** | Shared. The schedule sends nothing today; if notifications are ever built, they draw on the same allowance. |

**The guard:** `tests/sched/isolation-test.mjs` fails if the schedule gains a write
path to a `vacations/*` document outside the sanctioned Users-panel handlers
(`addSchedUser`, `saveSchedUser`, `saveSchedField`, `saveAllSchedUsers`, `removeSchedUser`,
`syncEmailToUserFromLogin`) — the rule the owner actually gave in §1, not the stricter
"zero writes" Claude first proposed and the owner rejected. Firestore rules
**cannot** enforce this — same project, same signed-in person — so the code plus that test
is the entire guarantee. Run it before filing anything.

---

## Working discipline — binding

**File hygiene is one of these rules** — outdated files are archived, never left to
pile up and never deleted. Full procedure in the FILE HYGIENE section below.

* **The owner does every git push.** Claude files to the working tree and byte-verifies
  (md5 device vs cloud); the owner commits and pushes in GitHub Desktop.
* Never deploy. Never write to production Firebase.
* Smallest change → explicit "go" → only that change.
* Every fix ships with tests that **execute** real extracted code, plus an honesty check
  proving they fail on the previous build.
* Bump `var BUILD` **and** `versions.json` together.
* **Never present invented data as the owner's** (`DECISIONS.md` §22).
* **No reassurance without an executed reproduction.**
* This repo is **PUBLIC** — describe defects by shape, never by reproduction.
* Plain language. The owner is not a coder. Push back on bad ideas.

## 0. STANDING RULES — binding, unchanged from the previous handoff

The user's eight rules verbatim (never rewrite whole files; read → edit → `node --check` every
inline script → run suites; bump `var BUILD` AND versions.json, deliver, commit summary; STOP and
ask when unsure; plain explanations, high-quality code; don't touch the deferred list (§6) without
asking; do not agree with bad ideas — push back; rules changes PUBLISHED in Firebase console before
dependent client code pushes). Plus the learned practices: small batches by subsystem with an
adversarial re-audit after each (measured fix→regression ≈ 1:1); tests must EXECUTE extracted real
code with an honesty check proving each new test FAILS against the pre-fix build; verify every
assumption against code before acting; extractor gotchas (no default-param braces `opts={}` in
extracted functions, no stray `{` in comments inside them); prefer grep + ranged reads (admin file
~590KB).

**New standing decisions this session (do not relitigate):**
- **No one-click destructive actions, in rehearsal OR live.** Every auction-critical write or send
  passes through a dialog; dialogs are paint, GUARDS at the moment of action are the enforcement.
- **Rehearsal Mode** (stored flag still `adminSettings.simulatorEnabled`) gates the simulator,
  "⏭ Skip backup (testing)", and "⏭ Skip sending (testing)". Mail stays LIVE in rehearsal (user
  tests e-mail constantly). Arming always confirms (danger-styled once phases run); disarm is
  one-click, including from the dashboard pill on the Current Phase card. Begin Phase 1 asks
  real-launch vs rehearsal-run. Every restore lands with rehearsal OFF. Visibility replaces
  unreachability — only the human knows a real run from a rehearsal.
- **Duplicate login e-mails are refused at entry in BOTH admin sites and fail CLOSED in the map**
  (collided address excluded → that Google account can bid as nobody; loud warning). Restore
  REBUILDS emailToUser from the restored loginEmails — never trusts the stored map.
- **passcodes: retired permanently** (user ruling 30 Jul). `passcodesEnabled` stays off forever;
  world-readable by design, unsecurable client-side; Google sign-in is the gate. Accepted.
- The user always wants delivered files WRITTEN into the repo folders without asking.

## Sessions: ONE chat for both sites is working — keep it that way for now

Owner decision, 16 Aug, after a full day of working across both:

> *"It seems to be working for us to move back and forth like this."*

Claude had initially recommended separate chats, reasoning from general principles
(context budget, mis-filing risk). **The evidence from that day pointed the other way**
and the recommendation was withdrawn:

* The best of the schedule work came *from* having the auction in context — `REPORT_CSS`
  lifted verbatim rather than approximated, the stale-build gate ported from auction 268,
  the holiday calendar reusing the auction's federal-holiday computation, the
  rulings/handoff discipline mirrored because it was in view.
* **The cardinal rule was enforced better, not worse.** The 25 schedule→auction write
  paths were found in the first hour precisely because both systems were held at once.
* A stale claim in the records was caught in passing: the old handoff said the vacation
  battery carried 8 documented reds; run on 16 Aug it was **14 suites, 1074 assertions,
  all green**.
* The predicted mis-filing never happened. The one collision — an overwritten
  `.claude-commit-msg.txt` — was a per-commit scratch file, harmless either way.

The deeper reason: **the two sites are deliberately convergent.** Same visual language,
same confirmation style, same test discipline, same paperwork. Splitting the sessions
works against the goal.

**What makes it safe:** the repos hold the memory, not the chat. `DECISIONS.md`,
`TODO.md` and this file are kept current as work happens, so a fresh session picks up
cold regardless.

**Revisit only when** the schedule reaches the auction's scale — its own era fixtures, a
full battery, real users. Not before.

**Unchanged either way:** a Firestore rules change is an **auction deploy**. `firestore.rules`
lives in the auction repo and contains the `dailysched` block; publishing it in the
Firebase console affects the live auction. Gate it with the auction's discipline no matter
which site the change is for.

## SWITCHING SITES — do this every time, before anything else

The owner works **both sites from one chat**, a day or a session at a time: today the
schedule, tomorrow possibly the auction. That works, but it has one failure mode worth
naming — **not** confusing the two sites, which is easy to keep straight, but **answering
from stale in-context memory instead of from disk.**

A real example from 16 Aug: the previous handoff stated the vacation battery carried
"8 documented honesty-baseline reds". Run that day, it was **14 suites, 1074 assertions,
all green.** Quoting the document instead of running the suite would have meant being
confidently wrong about the health of a live system's safety net.

**So on every switch, re-ground from disk first — one turn, before any work:**

1. Read that site's `NEXT-CHAT-START-PROMPT.md` and its `TODO.md`.
2. Verify the live build: fetch `versions.json` **cache-busted**. Do not assume the last
   thing this chat said about it is still true — the owner pushes between sessions.
3. `git --no-optional-locks status --short --branch` on that repo, and on the other one
   too if anything might have crossed over.
4. Report the state in a few lines. Then work.

Cheap, and it has already caught three things: build 269 being live when the notes said it
was awaiting push; the stale battery claim above; and — on 16 Aug — build 50 / 26 being
**pushed and live while this very file was still describing it as "awaiting push".** The
owner pushed mid-session and Claude did not notice until he questioned a build number in
the start prompt. Note the sequence: the owner caught it, not the process. Assume every
build number you did not personally verify in the last few minutes is stale.

**The same applies to files.** On 16 Aug an hour went into diagnosing a "failing test"
that was a stale in-session copy of a file the owner's machine had already had fixed for
hours. Read from disk. `md5sum` both sides when it matters.

**And when in doubt during the day: run it, don't recall it.** Both batteries run on the
owner's machine — `node run-all.mjs` (auction) and `node sched/run-all.mjs` (schedule).

## COMMIT SUMMARIES — one per build, PER REPO, and SHORT

Owner ruling, 16 Aug 2026, after finding several commits had lost their message:
*"ensure going forward and in the handoff docs that commit summaries are always provided
for every build and for every repo. These summaries would be better to be short and
concise, just so i recognize them, nothing more."*

**Binding, both sites:**

1. **Every repo touched by a push gets its own summary.** If a build changes `schedule/`
   and `tests/`, that is TWO summaries, not one. Same for the auction and its tests.
   A repo with no message is not ready to hand over.

2. **SHORT.** A subject line the owner can recognise at a glance, then two to four lines
   of plain description. Not the essay. The reasoning belongs in `BUILD-LOG.md`,
   `DECISIONS.md` and `HANDOFF.md` — all committed, none of them lost to a mis-paste.

3. **The shape:**

   ```
   Build 61 (admin) — approval now runs the same checks as hand-editing

   Request and swap approval were writing assignments with no eligibility,
   capacity, vacation or collision check. They now use the same checker the
   cell editor uses: it warns, you can override, the override is logged.

   Closes defect 1. DECISIONS §51. Battery: 13 suites, 542 assertions, green.
   Detail: BUILD-LOG.md.
   ```

4. **Where it goes — THREE places, every build, no exceptions.** The owner could not find
   the summaries when they lived in only one, and two of those places had hidden them:

   a. **The outputs column in Claude desktop.** Deliver each repo's summary with
      `SendUserFile`, named `COMMIT-<repo>.txt`. This is the one the owner actually reads —
      it is right there in the conversation, nothing to hunt for. **Do this every build.**
   b. **`<repo>/COMMIT-MESSAGE.txt`** — on disk, one per repo, overwritten each build.
      ⚠️ **NOT a dotfile.** It used to be `.claude-commit-msg.txt`, and the leading dot made
      macOS Finder hide it; gitignoring it then hid it from GitHub Desktop as well, so it
      was invisible in both places at once. The current name is gitignored but visible.
   c. **A row in `BUILD-LOG.md`**, committed, so the record survives regardless.

   **Copy from the outputs column or from `COMMIT-MESSAGE.txt`** — never from a source or
   test file. Pasting a test file is exactly how build 59's message and seven of the tests
   repo's were lost.

5. **`BUILD-LOG.md` gets its row in the same breath as the code**, so that even a
   mis-pasted commit message costs nothing. That file is the durable record; the commit
   message only has to be recognisable.

## FILE HYGIENE — a STANDING RULE, not a one-off tidy-up

The owner's instruction, 16 Aug 2026: *"As files in my github folder pile up, I would like
to remain organized and remove old files. Please ensure that all obsolete files are placed
into a to delete folder or archive folder for when a file might be useful in the future."*

That applies to **every future session, in every repo.** It is not a task that was done
once; it is how this folder is kept.

**Where things go.** The main folders hold only what is live or in flight. Anything
outdated moves to `~/Documents/GitHub/_archive/<repo>/<category>/`, which sits OUTSIDE
every repo — so GitHub never serves it and GitHub Desktop never shows it, while every byte
stays on disk. True junk (`.DS_Store` and the like) goes to `_to_delete/`. **Nothing is
ever deleted.** "Archive" is the default; "delete" is only for machine-generated litter.

**The test, before moving anything.** Grep the WHOLE GitHub folder and move a file only
after confirming that no live page, no test suite, and no current handoff/TODO reads it.
**If you are unsure, it stays.** Being wrong costs a broken URL or a red battery; leaving
one extra file costs nothing.

**Never move** anything the live site serves. Be careful with files whose names look like
junk hashes — `0c0fd0a8….html` (schedule), `2nd-admin-page-234asld.html` and
`a5696c46….html` (auction) are **live redirects for old admin URLs**, not litter. Open one
and read its `<title>` before assuming. That guess was made wrong once already.

**Record every move** in `_archive/README.md`: what moved, where to, why, and — just as
important — what was deliberately KEPT and the reason. That file is the inventory; this
rule is the procedure. Do not duplicate one into the other.

**Scratch files must be gitignored, never committed.** `.claude-commit-msg*.txt`,
`.DS_Store`, staged build folders. ⚠️ **`.gitignore` does NOT apply to files git already
tracks.** Adding the rule is not enough: the tracked path must be **absent** in that commit
for the removal to land, so write that build's message to a name that is not yet tracked
(e.g. `.claude-commit-msg-hk.txt`). Writing the usual name recreates the tracked file and
turns a clean deletion into a modification — the cleanup then silently does not happen.
Verify with `git --no-optional-locks -C <repo> check-ignore -v <file>`; it prints the rule
and line that matched, and silence means NOT ignored.

**Housekeeping is its own commit**, never mixed into a build, so the diff stays readable.
Prove it before handing it over: `git diff --stat` should show ~1 insertion and no modified
application code, and every deleted file should hash-match its archived copy.

**The device bridge cannot delete** — `rm` fails with "Operation not permitted". Use `mv`.

## ⚠️ SAY SO WHEN THE CONTEXT IS DEGRADING. Owner ruling, 16 Aug 2026.

*"I want to add to the handoff summary that you should alert me when you are starting to
suffer from context rot."*

**Binding. Volunteer it — do not wait to be asked.** A long session degrades gradually and
the failure mode is not dramatic: it is a slow rise in small errors, each individually
recoverable, on work whose whole value is that it is careful.

**The tells, in the order they actually appear:**

1. Small mechanical slips — a command run in the wrong directory, a malformed heredoc, a
   test probe that measures the wrong thing on the first try.
2. **Asserting something about the code without re-reading it.** This is the dangerous one,
   because it sounds exactly as confident as a verified statement. In this session the
   audit log was described as growing unbounded until it hit Firestore's 1 MB limit; it had
   trimmed itself at 400 entries all along. Reading the function is what caught it.
3. Re-deriving something already settled, or re-asking a question the owner has answered.
4. Losing the thread between the change and the reason for it.

**What to do:** say plainly which tells are showing and how confident you are in recent
work. Do NOT quietly compensate by working more slowly. Then offer a fresh session, and
before it ends make sure `HANDOFF.md`, `DECISIONS.md`, `BUILD-LOG.md` and `TODO.md` carry
everything the next session needs — those files are the memory, not the conversation.

**A gate that does NOT bend:** every build still ships with its suite, its executed honesty
check, and a byte-verified file. Tiredness is a reason to hand over, never a reason to
lower the bar or to describe a check as done when it was reasoned about.

---

## ⚠️ WRITE IDEAS DOWN THE MOMENT THEY ARE RAISED. Owner ruling, 16 Aug 2026.

*"ensure that all your recs from a long time ago remain on the to do list for future sessions.
there were a lot of good ideas in there such as linking to calendars on phones, e-mail setup…"*

Those recommendations were **lost**. They had been raised in conversation and never written to
a file, and by the time the owner asked for them the context had been compacted; the only
surviving transcript began after that point. They could not be recovered, and reconstructing
them from memory would have meant inventing the owner's words — §22 forbids exactly that.

**BINDING:** when the owner raises an idea, a preference, or a "we should eventually…", write
it into `TODO.md` → **FUTURE CAPABILITY** in the SAME TURN. One line is enough. Do not wait
for it to be specified or agreed. A chat is not storage — it is one compaction from gone.

The same applies to a recommendation YOU make and he seems to like: it is not on the record
until it is in a file.

## ⚠️ NEVER RUN A PLAIN `git` COMMAND OVER THE DEVICE BRIDGE

**This has now bitten the owner twice**, in two consecutive sessions, and it surfaces as a
GitHub Desktop alert: *"A lock file already exists in the repository, which blocks this
operation from completing."*

**What happens.** The bridge that lets Claude read and write `Documents/GitHub` mounts the
folder in a sandbox that **cannot unlink files** — `rm` returns *Operation not permitted*.
Git takes `.git/index.lock` while it works and deletes it afterwards. If the delete is the
thing that fails, a zero-byte `index.lock` is left behind, and every later git operation —
including GitHub Desktop's — refuses to run.

On 16 Aug a plain `git status --short --branch` in the **tests** repo at 05:56 left one
behind. A deliberate attempt to reproduce it later in the **schedule** repo did **not**
leave one, so the exact trigger is not pinned down. Treat it as: it can happen, and the
cost of avoiding it is nil.

**The rule, binding:**

1. **Read-only git only, and always with `--no-optional-locks`:**
   `git --no-optional-locks status --short --branch` · `... log` · `... rev-parse`.
   That flag exists precisely to stop git taking a lock it does not need.
2. **Never** run `add`, `commit`, `checkout`, `stash`, `merge` or `reset` over the bridge.
   Those are GitHub Desktop's job — §15, the owner does every push — so there is no
   legitimate reason to reach for them anyway.
3. **Check for a stale lock at the start of every session**, alongside the build check:
   `find <repo>/.git -maxdepth 2 -name '*.lock'`

**Clearing one when it happens.** `rm` cannot, but `mv` can:

```
mkdir -p ~/Documents/GitHub/_to_delete
mv ~/Documents/GitHub/<repo>/.git/index.lock ~/Documents/GitHub/_to_delete/
```

Then tell the owner what was moved there so he can empty it. From the owner's **own
Terminal** (outside the sandbox) a plain `rm -f .../.git/index.lock` works normally — that
is the faster fix if he is at the keyboard.

---

## RUNNING EITHER BATTERY FROM A CLOUD SESSION — the bit that is not obvious

Both batteries run fine in a cloud session once the files are staged. The trap is the
HONESTY CHECKS, and it wasted several runs before it was understood:

> A suite reads the CURRENT build from the repo (`ROOT`), and the PREVIOUS build from
> `/mnt/user-data/uploads/GitHub/...` — the staged copy. Stage the current build to both
> and every honesty check compares a build to ITSELF and fails. Those failures look
> exactly like regressions and are not.

So: copy the repo to a working dir for `ROOT`, and stage the *older* bytes to the uploads
path. Every suite skips its honesty block cleanly when the baseline is absent
(`if (PRE) { … }`), so leaving it out is honest; feeding it the current build is not.

Historical bytes come out of git read-only, which is safe over the bridge:

    git --no-optional-locks show <sha>:admin/index.html > _to_delete/hist/adminNN.html

`git log --format=%h` plus a `grep -o 'var BUILD = [0-9]*'` over each commit finds the
shas. Schedule suites take `PRE_ADMIN=` / `PRE_STAFF=`; the auction's take `PREFIX_SRC=`,
except `test-audit-fixes.mjs`, whose schedule baseline path (`PRE2S`) is HARDCODED to
`/mnt/user-data/uploads/GitHub/schedule/admin/index.html` and has no env override.

**AUCTION BATTERY, RUN ON BUILD 59 — 14 suites, 1,075 assertions, ALL GREEN.**
(audit-fixes 334 · backup-restore 177 · p4-rounds 154 · high-fixes 128 · delta-fixes 91 ·
fairplay 48 · zero-results 28 · round-months 25 · reopen-smartlock 23 · never-events 20 ·
send-inflight-guard 17 · lead-admin 16 · priority-inversion 10 · engine-fuzz 4.)
Baselines used: schedule admin 46 (`898535a`, genuinely pre the duplicate-login-email fix)
for the schedule twin; the auction's own pre-126 staff baseline was NOT available, so those
four honesty assertions skipped — an auction-session job, unrelated to build 59.
The #7 open-shift block, which broke on builds 50 and 52, is green on 59.

**Transferring files when staging is blocked.** `device_stage_files` failed with
`untrusted_device` three times this session. `SendUserFile` → `device_commit_files` still
worked and is byte-exact (verified by md5 both directions). To get a file OFF the device
when staging is down: file the new version to a scratch folder, `diff -u new old` there,
print the diff gzip+base64 in ~12 KB chunks, and reassemble — verify with md5 at every
step. A single large blob printed through `device_bash` LOSES BYTES; a 29 KB one arrived
386 bytes short. Chunk it and check it.

## 7. WAIT FOR INSTRUCTIONS between batches. The user drives the order.
