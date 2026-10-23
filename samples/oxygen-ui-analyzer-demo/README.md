# Oxygen UI analyzer demo

A small product codebase with deliberate design system inconsistencies. It shows how a product adds the [Oxygen UI analyzer](../../packages/oxygen-ui-analyzer) and what the analyzer reports. The Storybook page **Tooling/Analyzer** is generated from it.

The code is only analyzed, never built or run, so it does not install the packages it imports.

## Try it

Build the analyzer first, from the repository root:

```bash
pnpm --filter @wso2/oxygen-ui-rules --filter @wso2/oxygen-ui-analyzer build
```

Then, in this directory:

```bash
pnpm oxygen              # open the report in the browser; it updates as you edit the files
pnpm oxygen:build        # write the report to oxygen-report.html
pnpm oxygen:analyze      # print the report in the terminal
pnpm oxygen:fix          # preview the safe automatic fixes
pnpm oxygen:check        # fail if there are findings that are not in the baseline, as CI would
```

`pnpm oxygen:check` fails, because the demo has no baseline. Run `pnpm exec oxygen-ui-analyzer baseline` to record the current findings; `check` then passes, and fails again when you add a new inconsistency. Delete `.oxygen-ui/` afterwards.

`pnpm oxygen:fix --apply` writes the fixes. Run `git checkout .` afterwards to restore the demo.

## What it contains

| File | Shows |
|---|---|
| `src/pages/UsersPage.tsx` | Direct MUI, MUI X and Lucide imports. Most are fixed automatically; the MUI X and MUI icons imports need a manual change |
| `src/components/StatusBadge.tsx` | Component subpath and `@mui/material/styles` imports, fixed automatically |
| `src/components/DateField.tsx` | A direct import suppressed with a disable comment and a reason |
| `src/legacy/AuditLogTable.tsx` | Direct MUI imports accepted by an exception in `oxygen-ui-analyzer.config.js`, with a reason and an expiry date |
| `src/pages/SettingsPage.tsx` | Code that already follows the rules |
