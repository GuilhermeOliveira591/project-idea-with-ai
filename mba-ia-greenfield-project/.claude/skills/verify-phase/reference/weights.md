# Integrity Score — weights and formula

The integrity score is a weighted sum of five dimensions, each a ratio in `[0, 1]`:

```
Score = (
    PlanCommits   * 0.25 +
    SIProgress    * 0.20 +
    Files         * 0.25 +
    SuiteGreen    * 0.20 +
    (1 - OrphanRatio) * 0.10
) * 100
```

## Dimension definitions

| Symbol        | Ratio                                                                                  |
|---------------|----------------------------------------------------------------------------------------|
| `PlanCommits` | `#{plan SI ids referenced in git commit messages} / #{plan SI ids}`                    |
| `SIProgress`  | `#{plan SI ids marked completed in the progress file} / #{plan SI ids}`                |
| `Files`       | `#{expected files present on disk} / #{expected files declared in the plan}`           |
| `SuiteGreen`  | `1` if every SI that has a Tests section is green; else `#{green SIs} / #{SIs-with-tests}` |
| `OrphanRatio` | `#{distinct SI ids in commits that are NOT in the plan} / #{distinct SI ids in commits}` |

Rules:

- Every ratio is clamped to `[0, 1]`. A denominator of `0` makes that ratio `0`,
  **except** `OrphanRatio`, which is `0` when there are no SI ids in commits
  (no commits cannot create orphans).
- `SuiteGreen` is read from the progress file (each SI's `Tests` line). Running
  the live suite is optional; if run, a failing suite forces `SuiteGreen = 0`
  regardless of what the progress file claims.
- Round the final score to the nearest integer for display.

## Pass threshold

```
Score >= 85  → STATUS: APROVADO
Score <  85  → STATUS: REPROVADO
```

## Empty / partial repository

The skill must never crash. If the plan file is missing or declares zero SIs,
every dependent ratio is `0` and the score is `0` (REPROVADO) — the skill still
writes a `.verification.md` explaining that the plan was not found. A low score
on an unimplemented phase is the expected, correct output.
