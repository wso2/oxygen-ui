# @wso2/oxygen-ui-analyzer

Checks a project against the [Oxygen UI rules](../oxygen-ui-rules) and reports which files are inconsistent with the design system.

## Adding it to a project

```bash
pnpm add -D @wso2/oxygen-ui-analyzer
npx oxygen-ui-analyzer init       # create oxygen-ui-analyzer.config.js
npx oxygen-ui-analyzer baseline   # record the existing findings, if there are any
```

```jsonc
"scripts": {
  "oxygen": "oxygen-ui-analyzer dev",
  "oxygen:build": "oxygen-ui-analyzer build",
  "oxygen:fix": "oxygen-ui-analyzer fix",
  "oxygen:check": "oxygen-ui-analyzer check"
}
```

Commit the config and the baseline. `init` never overwrites an existing config and never changes `package.json`.

## Configuration

`oxygen-ui-analyzer.config.js` (or `.mjs`, `.cjs` or `.json`) at the project root belongs to the product. The analyzer reads it but never changes it. Use `--config <file>` to point to another file.

```js
/** @type {import('@wso2/oxygen-ui-analyzer').AnalyzerConfig} */
export default {
  include: ['src/**/*.{ts,tsx}'],
  ignore: ['src/generated/**'],
  rules: {
    'no-direct-lucide-imports': 'warning',
    'no-direct-mui-imports': {options: {allowedPackages: ['@mui/x-date-pickers/AdapterDayjs']}},
  },
  exceptions: [
    {
      rule: 'no-direct-mui-imports',
      files: ['src/legacy/**'],
      reason: 'The legacy audit log is replaced in the 2027 redesign.',
      expires: '2027-06-30',
    },
  ],
  failOn: 'error',
  verify: ['pnpm typecheck'],
  baseline: '.oxygen-ui/baseline.json',
};
```

| Option | Description |
|---|---|
| `include` | Files to analyze. `--include` replaces it |
| `ignore` | Files to skip, in addition to the defaults. `--ignore` adds to it |
| `rules` | Per rule id: `'error'`, `'warning'`, `'info'` or `'off'`, or `{severity, options}` with the rule's options |
| `exceptions` | Findings the product accepts on purpose. Each needs a `rule`, `files` (glob patterns) and a `reason`, and can have an `expires` date (YYYY-MM-DD) |
| `failOn` | The lowest severity of new findings that fails `check`. Default: `error` |
| `verify` | Commands `fix --apply` runs to check its changes. `--verify` replaces them |
| `baseline` | The baseline file. Default: `.oxygen-ui/baseline.json` |

Findings covered by an exception are listed separately in the report, with the reason, and do not count. After an exception expires, its findings count again. To keep exceptions visible to reviewers, every report and `check` notes:

- exceptions that have expired,
- exceptions that match no findings,
- mandatory rules that are turned off.

For a single line, a disable comment with a reason also works: `// eslint-disable-next-line @wso2/oxygen-ui/no-direct-mui-imports -- reason`.

## Baseline and check

```bash
npx oxygen-ui-analyzer baseline           # record the current findings
npx oxygen-ui-analyzer check              # fail on findings that are not in the baseline
npx oxygen-ui-analyzer baseline --prune   # after fixing findings, remove them from the baseline
```

The baseline lets an existing project adopt the rules without fixing everything first, while `check` stops new code from adding findings. It lists one finding per line, so changes to it are easy to review.

`check` exits with 1 when there are new findings at or above `failOn` (or `--fail-on`), and 0 otherwise. Findings in the baseline, findings below the threshold and findings covered by exceptions never fail it. Without a baseline, every finding counts as new.

`baseline --prune` only removes fixed findings and never adds new ones. Running `baseline` without `--prune` replaces the baseline with the current findings, and reports how many were added, so that reviewers notice when findings are being accepted.

Finding ids depend on the rule, the file and the code involved, not on the line number, so moving code around does not make known findings new. Changing the line that has the finding does, which is intended: code that is being edited should follow the rules.

In CI:

```bash
npx oxygen-ui-analyzer check
npx oxygen-ui-analyzer build --output oxygen-report.html   # keep as an artifact
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

`fix` applies the automatic fixes of rules whose fix type is `safe`, such as rewriting `@mui/material` imports to `@wso2/oxygen-ui`. Other findings are listed with what they need:

- **A suggested fix.** Some findings have a fix that is correct but changes more than one place, such as importing the Oxygen UI `DataGrid` namespace and rewriting every use of `DataGrid` and `GridColDef`. `--suggestions` includes them in the preview, marked for review, and `--apply --suggestions` writes them.
- **An AI-assisted or manual change.** `--ai` writes these findings to `.oxygen-ui/fix-plan.json`, with each rule's guidance, the surrounding code, any suggested diff, the installed Oxygen UI version and the verify commands. An AI coding assistant can then work through it. The analyzer never calls an AI model itself. The plan follows [`schema/fix-plan.schema.json`](schema/fix-plan.schema.json), and quotes project code, so keep it out of version control.

| Option | Description |
|---|---|
| `--apply` | Write the changes. Without it, `fix` only shows what would change |
| `--suggestions` | Also apply suggested fixes. Review them in the preview first |
| `--ai` | Write the findings that are not fixed automatically to `.oxygen-ui/fix-plan.json`, or `--output`, for an AI assistant. Not combined with `--apply` |
| `--rule <id>` | Only fix findings of this rule. Repeatable |
| `--limit <n>` | Fix at most this many files, to keep each change small enough to review |
| `--verify <command>` | Run a command after writing the changes, such as `"pnpm typecheck"`. Repeatable |
| `--allow-dirty` | Apply even when the files to change have uncommitted changes |
| `--include`, `--ignore`, `--format`, `--output`, `--no-color` | As for `analyze` |

With `--apply`, the changes are only kept if they pass every check:

1. Nothing is written if a file to change has uncommitted changes, if a file changed since the fixes were planned, or if the project is not a git repository (unless `--allow-dirty` is used).
2. After writing, the project is analyzed again. If the changes introduced any new finding, they are rolled back.
3. Each `--verify` command runs in order. If one fails, the changes are rolled back.

`fix --apply` exits with 1 when it did not write the changes or rolled them back. The config's `verify` commands run when `--verify` is not given, and findings covered by exceptions are never fixed.


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
