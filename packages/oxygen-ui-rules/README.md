# @wso2/oxygen-ui-rules

The single source of truth for Oxygen UI governance rules. Each rule is defined once here and used by:

- [`@wso2/eslint-plugin-oxygen-ui`](../eslint-plugin-oxygen-ui), for lint feedback in editors and CI.
- [`@wso2/oxygen-ui-analyzer`](../oxygen-ui-analyzer), for project reports.
- The AI instructions that `npx @wso2/oxygen-ui init` installs (planned).

## Rule structure

Each rule lives in its own folder under `src/rules/<rule-id>/`:

| File | Purpose |
|---|---|
| `meta.ts` | Id, title, category, level, severity, enforcement, fix type and sources |
| `docs.md` | Why the rule exists, its impact, how to fix it, and allowed exceptions |
| `examples.ts` | Valid and invalid code. Used as tests, in docs and in AI instructions |
| `detect.ts` | The automated check, as an ESLint rule. Only for `automated` rules |
| `index.ts` | Combines the files with `defineRule` |

`pnpm rules:new --rule <id>` creates these files and registers the rule in `src/rules/index.ts`.

### Levels

- `mandatory`: products must follow it, unless they record an exception.
- `recommended`: products should follow it; deviations are reviewed.
- `advisory`: guidance only; never fails a check.

### Fix types

- `safe`: a mechanical change that cannot alter behaviour.
- `suggestion`: usually right, but a developer should confirm it.
- `ai`: needs judgement or several files; handled by the remediation skill.
- `manual`: only a person can decide.

## Catalog

`src/catalog/` lists what the rules govern:

| File | Lists |
|---|---|
| `components.ts` | Every value that `@wso2/oxygen-ui` exports itself (not the MUI re-exports), grouped into entries |
| `packages.ts` | Every publishable package in this repository, and how products should use it |
| `guides.ts` | Every guide in the Storybook (stories titled `Guides/...`) |
| `waivers.ts` | Exports that are deliberately not catalogued, with the reason |
| `api.snapshot.json` | Generated. The props and sub-components of every Oxygen UI component |

Rules refer to catalog entries in their `sources`. [RULES.md](RULES.md) is generated from the registry and shows which entries have rules so far.

## Keeping the rules in step with Oxygen UI

Run the coverage check from the repository root, like the tests:

```bash
pnpm rules:coverage          # human-readable; exits with 1 if any check fails
pnpm --filter @wso2/oxygen-ui-rules coverage --json   # machine-readable, after pnpm build
```

It fails when:

| Check | Fails when |
|---|---|
| Components | A new `@wso2/oxygen-ui` export has no catalog entry, or an entry lists an export that does not exist |
| Packages | A publishable package has no catalog entry, or an entry has no matching package |
| Guides | A Storybook guide has no catalog entry, or an entry has no matching guide |
| Rules | A rule has placeholders or no sources, or a source is not in the catalog |
| Generated files | `RULES.md` or the API snapshot is out of date. A stale snapshot lists the changed props, so you can check whether rules need updating |
| Rule examples | An automated rule does not report or fix its examples as declared |

Catalog entries and rules that have no rules yet are listed as notes, not failures.

### Adding things

```bash
pnpm rules:new --component ConfirmDialog              # a new Oxygen UI export
pnpm rules:new --package @wso2/oxygen-ui-example      # a new publishable package
pnpm rules:new --guide "Guides/Empty States"          # a new Storybook guide
pnpm rules:new --rule prefer-listing-table            # a new automated rule
pnpm rules:new --rule confirm-destructive-actions --judgement   # a rule that needs UX review
pnpm rules:generate                                   # update RULES.md and the API snapshot
```

New entries contain `TODO` placeholders, and `pnpm rules:coverage` fails until they are filled in.

## Testing

```bash
pnpm --filter @wso2/oxygen-ui-rules test
```

The tests check every rule's metadata and docs, and run every example of an automated rule through ESLint's `RuleTester`, including the expected autofix output. They also cover the coverage tooling in `tools/`.
