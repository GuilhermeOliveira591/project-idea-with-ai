---
name: verify-phase
description: "Audit the process integrity of a delivered phase and emit a scored report. Use whenever the user asks to verify, audit, or check the integrity of a phase delivery — variations like 'verify phase X', 'verifica a fase', 'rode o verify-phase', 'integrity report for the phase', or '/verify-phase phase-NN-name'. Cross-checks the plan, git commits, the progress file, and the files on disk, then writes docs/phases/<phase>.verification.md with an integrity score and a coverage matrix."
disable-model-invocation: true
---

# Verify Phase

A read-only QA gate. It does **not** produce the phase (that is what `research`,
`plan-phase`, and `implement-phase` do). It audits, *backwards*, whether what was
delivered matches what was planned, and where the holes are. It reads four
sources of truth for a phase — the plan, the git log, the progress file, and the
code/tests on disk — and writes a single integrity report with a 0–100 score.

This `SKILL.md` is a **prompt, not a program**. Follow the procedure below using
the repo's read tools (Read, Grep, Glob, Bash for `git`/`jest`). Anchor the
mechanics in the reference files:

- `reference/patterns.md` — every regex (SI id, plan headings, expected files, commit refs).
- `reference/weights.md` — the dimension ratios, the scoring formula, the 85% cut, empty-repo behavior.
- `reference/report-template.md` — the exact `.verification.md` layout to fill in.

## Input

The phase name, e.g. `phase-06-subscriptions`, passed as the argument:
`/verify-phase phase-06-subscriptions`. It is **phase-agnostic** — the same
procedure works for `phase-02-auth`, `phase-06-subscriptions`, or any future
phase. Derive `<NN>` (the two-digit number) from the phase name.

Resolve paths against the project root that contains `docs/phases/` and
`nestjs-project/` (the `mba-ia-greenfield-project` directory). Plan and progress
live under `docs/phases/`; source/test files named in the plan (`src/...`,
`test/...`) live under the `nestjs-project/` subproject — check them there.

## Hard constraints

- **Read-only.** The skill reads the repository and runs only read-only commands
  (`git log`, and optionally the test suite). The **only** file it writes is
  `docs/phases/<phase>.verification.md`. Never edit the plan, the progress file,
  the code, or the commits to make the score look better.
- **Never crash on an incomplete repo.** If the plan, progress file, or commits
  are missing, treat the corresponding counts as zero and continue. A phase with
  nothing implemented yet must still produce a report — with a low score. If the
  skill cannot run without an implementation, the bug is in the skill.
- **The score comes from the repo, not the author.** Compute every number from
  the actual sources. Do not hand-write or round a score toward the cut. The
  evaluator may re-run this skill; a report that diverges from what the skill
  produces is a failure.

## Procedure

### 1. Locate the four sources

- **Plan:** `docs/phases/<phase>.md`. If absent, record it as a fatal gap, set
  every plan-dependent ratio to 0, and skip to step 7 to emit a 0% report.
- **Progress:** `docs/phases/<phase>.progress.md` (may be absent).
- **Git log:** commits of this phase (see step 4).
- **Code/tests on disk:** under `nestjs-project/` (step 5).

### 2. Extract the plan SI set

From the plan, collect all distinct SI ids using the SI heading / SI id regex in
`reference/patterns.md`. This set (e.g. `{SI-06.1 … SI-06.5}`) is the denominator
for the first two dimensions. Record its size as `Y`.

### 3. Extract the expected files

From the plan, collect the distinct expected source/test paths (Tests-table
column + `Create/Add/Update` technical actions) per `reference/patterns.md`.
Remember the migration special case: match `*<MigrationName>*` by basename, not
exact path. This set is the denominator for the **Files** dimension.

### 4. Read the commit SI references

Run `git log` over the phase's commits and extract every `\bSI-\d{2}\.\d+\b` from
the messages (subject + body). Compute:

- `PlanCommits` = (plan SI ids that appear in commits) / `Y`.
- Orphan ids = commit SI ids **not** in the plan set; `OrphanRatio` per the
  formula in `reference/weights.md`.

### 5. Check the expected files on disk

For each expected file, test existence under `nestjs-project/` (Glob/`test -f`).
`Files` = (present) / (expected). List any missing file — it becomes a gap.

### 6. Read progress status and suite state

From the progress file, for each plan SI read its `Status` and `Tests` lines
(patterns in `reference/patterns.md`):

- `SIProgress` = (SIs marked `completed`) / `Y`.
- `SuiteGreen` per `reference/weights.md` — green if every SI with a Tests
  section reports passing (or `no tests`). **Optionally** run the suite live
  (`docker compose -f nestjs-project/compose.yaml exec -T nestjs-api npm test -- --runInBand`
  and `… npm run test:e2e`); if you run it and it fails, force `SuiteGreen = 0`
  and note the divergence as a gap.

### 7. Compute the score

Apply the formula in `reference/weights.md`. Clamp each ratio to `[0,1]`, weight,
sum, multiply by 100, round to an integer. Determine STATUS by the 85% cut.

### 8. Write the report

Fill `reference/report-template.md` and write it to
`docs/phases/<phase>.verification.md` (substitute `<NN>`). Requirements:

- The Coverage Matrix shows the raw `x/y` (or `verde`) for each dimension with a
  `✓` when full and a `⚠` plus a short detail when not.
- **Gaps** — one line per real gap, tagged `[LOW]` / `[MED]` / `[HIGH]`.
  Severity guide: missing planned file or red suite → `[HIGH]`; an SI in the plan
  with no commit or not completed in progress → `[MED]`; cosmetic/traceability
  drift (e.g. an orphan SI ref) → `[LOW]`. If there are no gaps, say so.
- **Recomendações** — concrete repo fixes that would raise the score (add the
  missing e2e, commit the missing SI, etc.). The note to the user: the score
  rises by **fixing the repository**, never by editing this report.
- Keep the trailing calculation comment so the numbers are auditable.

### 9. Report back

Tell the user the score, the STATUS, and the top gaps (if any). Do not modify
anything else.
