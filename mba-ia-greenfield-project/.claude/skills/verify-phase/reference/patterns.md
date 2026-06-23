# Extraction patterns (regex)

All regexes are POSIX/PCRE-compatible (usable with `grep -oE` / `grep -P`).

## SI identifiers

The canonical SI id pattern — use it everywhere SI ids are detected:

```
\bSI-\d{2}\.\d+\b
```

Examples that match: `SI-06.1`, `SI-02.13`. Non-matches: `SI-6.1`, `SI-06`, `SIX-06.1`.

## Plan — SI headings

In `docs/phases/<phase>.md`, each SI is a level-3 heading:

```
^###\s+SI-\d{2}\.\d+
```

The set of plan SI ids = all distinct matches of `\bSI-\d{2}\.\d+\b` found in
those headings.

## Plan — expected files

Files the plan expects appear in two places, both inside backticks:

- **Tests tables** — first column, e.g. `` `src/subscriptions/subscriptions.service.spec.ts` ``.
- **Technical actions** — `Create `/`Add `/`Update ` lines naming a path, e.g.
  `` Create `src/subscriptions/subscriptions.controller.ts` ``.

Extract every backtick-quoted token that looks like a source path:

```
`((?:src|test)/[^`]+\.ts)`
```

Collect the distinct set. **Migrations are a special case:** a plan reference
like `src/database/migrations/CreateSubscriptions` has no timestamp, but the
generated file is `<timestamp>-CreateSubscriptions.ts`. Match migrations by
basename substring (glob `src/database/migrations/*CreateSubscriptions*.ts`),
not by exact path.

## Progress — SI status

In `docs/phases/<phase>.progress.md` each SI is a block:

```
### SI-NN.x — <name>
- **Status:** completed | pending
- **Tests:** <result or — >
```

An SI counts as completed when its block's `Status` line is `completed`.
An SI counts as green when its `Tests` line shows passing tests (e.g. contains
`passed`, a green count, or `no tests`) and not `FAIL`/`failing`.

## Commits — SI references

Read the phase's commit history (subject + body) and extract SI ids:

```
git log <base>..HEAD --format=%s%n%b | grep -oE 'SI-\d{2}\.\d+' | sort -u
```

Pick `<base>` as the merge-base with the main branch, or simply scan all commits
whose message contains the phase's `SI-NN.` prefix. Orphan ids = commit SI ids
that are not in the plan SI set.
