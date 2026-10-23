# @wso2/oxygen-ui-analyzer

Checks a project against the [Oxygen UI rules](../oxygen-ui-rules) and reports which files are inconsistent with the design system.

## Adding it to a project

```bash
pnpm add -D @wso2/oxygen-ui-analyzer
```

```jsonc
"scripts": {
  "oxygen": "oxygen-ui-analyzer dev",
  "oxygen:build": "oxygen-ui-analyzer build",
  "oxygen:fix": "oxygen-ui-analyzer fix"
}
```

## Report UI

```bash
npx oxygen-ui-analyzer dev [dir]     # serve the report at http://127.0.0.1:6007 and update it as files change
npx oxygen-ui-analyzer build [dir]   # write the report to oxygen-report.html
```

The report lists the files to update, most findings first, with filters for severity, category and automatic fixes. Each finding shows the code involved and its rule, and has a button that copies a fix prompt for an AI coding assistant. Each rule shows its documentation and the files it applies to.

| Option | Command | Description |
|---|---|---|
| `--port <port>` | `dev` | Port to listen on. Default: 6007 |
| `--host <host>` | `dev` | Host to listen on. Default: 127.0.0.1, so the report is only reachable from this machine |
| `--output <file>` | `build` | The HTML file to write. Default: `oxygen-report.html` |
| `--include`, `--ignore` | both | As for `analyze` |

`build` writes one self-contained HTML file, with the UI and the report inlined. It opens from disk, from a CI artifact or from any static host, with no server. The UI is built with Oxygen UI and bundled into the package, so products do not need React or Oxygen UI installed to use it.

## Analyze

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

## Fix

```bash
npx oxygen-ui-analyzer fix [dir]           # preview: shows the diff, changes nothing
npx oxygen-ui-analyzer fix [dir] --apply   # writes the changes
```

`fix` only applies fixes of rules whose fix type is `safe`, such as rewriting `@mui/material` imports to `@wso2/oxygen-ui`. Other findings are listed with what they need: a manual change, a suggested fix to review, or the AI remediation skill.

| Option | Description |
|---|---|
| `--apply` | Write the changes. Without it, `fix` only shows what would change |
| `--rule <id>` | Only fix findings of this rule. Repeatable |
| `--limit <n>` | Fix at most this many files, to keep each change small enough to review |
| `--verify <command>` | Run a command after writing the changes, such as `"pnpm typecheck"`. Repeatable |
| `--allow-dirty` | Apply even when the files to change have uncommitted changes |
| `--include`, `--ignore`, `--format`, `--output`, `--no-color` | As for `analyze` |

With `--apply`, the changes are only kept if they pass every check:

1. Nothing is written if a file to change has uncommitted changes, if a file changed since the fixes were planned, or if the project is not a git repository (unless `--allow-dirty` is used).
2. After writing, the project is analyzed again. If the changes introduced any new finding, they are rolled back.
3. Each `--verify` command runs in order. If one fails, the changes are rolled back.

`fix --apply` exits with 1 when it did not write the changes or rolled them back.

Planned command: `check` (CI gate against a baseline).

## Report format

The JSON report follows [`schema/report.schema.json`](schema/report.schema.json). Each finding has a rule id, file, line and column, the source lines as evidence, severity, confidence, whether it is deterministic or needs review, and how it can be fixed.

Finding ids are derived from the rule, the file and the code involved, not the line number, so they stay the same when unrelated code moves.

## Programmatic use

```ts
import {analyze, formatTerminal} from '@wso2/oxygen-ui-analyzer';

const report = await analyze({root: 'path/to/project'});
console.log(formatTerminal(report));
```

`renderReportHtml(report)` returns the report page as HTML, and `startDevServer(options)` starts the live report server.
