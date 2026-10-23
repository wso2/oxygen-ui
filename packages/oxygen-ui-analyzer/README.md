# @wso2/oxygen-ui-analyzer

Checks a project against the [Oxygen UI rules](../oxygen-ui-rules) and reports which files are inconsistent with the design system.

## Usage

```bash
npx oxygen-ui-analyzer analyze [dir]
```

| Option | Description |
|---|---|
| `--format <format>` | `terminal` (default) or `json` |
| `--output <file>` | Write the report to a file instead of printing it |
| `--include <glob>` | Files to analyze, relative to the project. Repeatable |
| `--ignore <glob>` | Files to skip, in addition to the defaults. Repeatable |
| `--no-color` | Print without colours |

By default the analyzer checks all JavaScript and TypeScript files, and skips dependencies, build output, generated files and tests.

The analyzer runs its own ESLint instance with only the Oxygen UI rules, so a project's ESLint configuration does not change the results. Disable comments for the Oxygen UI rules are respected:

```tsx
// eslint-disable-next-line @wso2/oxygen-ui/no-direct-mui-imports -- reason
```

Planned commands: `dev` (local report UI), `build` (static HTML report), `check` (CI gate against a baseline) and `fix`.

## Report format

The JSON report follows [`schema/report.schema.json`](schema/report.schema.json). Each finding has a rule id, file, line and column, the source lines as evidence, severity, confidence, whether it is deterministic or needs review, and how it can be fixed.

Finding ids are derived from the rule, the file and the code involved, not the line number, so they stay the same when unrelated code moves.

## Programmatic use

```ts
import {analyze, formatTerminal} from '@wso2/oxygen-ui-analyzer';

const report = await analyze({root: 'path/to/project'});
console.log(formatTerminal(report));
```
