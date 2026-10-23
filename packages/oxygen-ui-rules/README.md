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

Register the rule in `src/rules/index.ts`.

### Levels

- `mandatory`: products must follow it, unless they record an exception.
- `recommended`: products should follow it; deviations are reviewed.
- `advisory`: guidance only; never fails a check.

### Fix types

- `safe`: a mechanical change that cannot alter behaviour.
- `suggestion`: usually right, but a developer should confirm it.
- `ai`: needs judgement or several files; handled by the remediation skill.
- `manual`: only a person can decide.

## Testing

```bash
pnpm --filter @wso2/oxygen-ui-rules test
```

The tests check every rule's metadata and docs, and run every example of an automated rule through ESLint's `RuleTester`, including the expected autofix output.
