# WSO2 Oxygen-UI

**WSO2 Oxygen-UI** is the official design system and React component library for WSO2 products, built on top of [Material-UI v7](https://mui.com/material-ui/). It provides a consistent, modern, and accessible user experience across all WSO2 applications, enabling rapid development and seamless integration with the latest frontend technologies.

Oxygen-UI delivers:

- A comprehensive set of ready-to-use UI components + icons, themed for WSO2 brand and product needs
- Full compatibility with Material-UI v7.3.5 and its ecosystem
- Full compatibility with Lucide v0.553
- Support for custom WSO2 components, icons and design patterns
- Easy integration with Vite, Nx, and modern React workflows

# Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v24 or newer recommended)
- [pnpm](https://pnpm.io/) (v10 or newer recommended)

# Usage Example

## Installing Oxygen UI

Install the main Oxygen UI library:

```bash
pnpm add @wso2/oxygen-ui @wso2/oxygen-ui-icons-react
```

This will automatically install all required dependencies including Material-UI, Emotion, and other peer dependencies.

### Additional Packages

**Charts:**
```bash
pnpm add @wso2/oxygen-ui @wso2/oxygen-ui-charts-react
```

> **Note:** If using npm or yarn, you may need to install peer dependencies manually. With pnpm, peer dependencies are installed automatically.

## Using Components

Import any Material-UI or Oxygen-UI custom component:

```jsx
import { OxygenUIThemeProvider, Button, TextField } from '@wso2/oxygen-ui';

function App() {
  return (
    <OxygenUIThemeProvider>
      <Button variant="contained">Hello World</Button>
      <TextField label="Name" />
    </OxygenUIThemeProvider>
  );
}
```

> **Note**: `import { Button } from '@wso2/oxygen-ui'` is equivalent to `import { Button } from '@mui/material'`

Refer to [Material-UI documentation](https://mui.com/material-ui/all-components/) for component usage details.

## Using MUI X Components

For DataGrid and DatePickers, use namespace imports:

```jsx
import { DataGrid } from '@wso2/oxygen-ui';

function MyDataGrid() {
  return (
    <DataGrid.DataGrid
      rows={rows}
      columns={columns}
    />
  );
}
```

See the [@wso2/oxygen-ui README](./packages/oxygen-ui/README.md) for detailed usage.

## Using Icons

Import Lucide icons or Oxygen-UI custom icons:

```jsx
import { Bell, WSO2 } from '@wso2/oxygen-ui-icons-react';
```

> **Note**: `import { Bell } from '@wso2/oxygen-ui-icons-react'` is equivalent to `import { Bell } from 'lucide-react'`

Refer to [Lucide documentation](https://lucide.dev/icons) for the complete icon list.

# Build Instructions

Install required dependencies:

```sh
pnpm i
```

To build the project and all packages:

```sh
pnpm build
```

To see view the usage instructions:

```sh
pnpm storybook
```

To run the sample app:

```sh
cd samples/oxygen-ui-test-app
pnpm dev
```

# Project Structure

The workspace is organized as follows:

```
oxygen-ui/
├── packages/
│   ├── oxygen-ui/                        # Main Oxygen-UI component library (@wso2/oxygen-ui)
│   ├── oxygen-ui-charts-react/           # Oxygen-UI charts library (@wso2/oxygen-ui-charts-react)
│   ├── oxygen-ui-docs/                   # Oxygen-UI docs - storybook
│   ├── oxygen-ui-icons-react/            # Oxygen-UI icons library (@wso2/oxygen-ui-icons-react) 
│   └── eslint-plugin-oxygen-ui/          # ESLint plugin for enforcing Oxygen-UI import patterns
├── samples/
│   └── oxygen-ui-test-app/               # Example Vite + React app using Oxygen-UI
├── README.md
├── package.json
├── pnpm-workspace.yaml
└── nx.json
```

# AI-Assisted Development

Oxygen UI ships an agent **skill** (`oxygen-ui`) that teaches coding agents to set up and
build UIs with the design system — installing the right packages and versions, wiring
`OxygenUIThemeProvider`, and scaffolding pages/layouts that match the sample app
(`samples/oxygen-ui-test-app`). When `@wso2/oxygen-ui` is installed in the project, it prefers
that package's version-matched references so the guidance tracks your installed version.

## Install the skill

Use the [Vercel **skills** CLI](https://github.com/vercel-labs/skills) — it works with Claude
Code, Cursor, GitHub Copilot, Codex, Gemini CLI, and 15+ other agents:

```bash
npx skills add wso2/oxygen-ui
```

Or vendor it from the installed npm package:

```bash
cp -r node_modules/@wso2/oxygen-ui/.claude/skills/oxygen-ui .claude/skills/
```

## Use it

Ask your agent for UI work in the project — e.g. "set up Oxygen UI in this app", "add a users
page with a searchable table", "build a multi-step signup wizard", or "convert this
`@mui/material` screen to Oxygen UI". The skill imports from `@wso2/oxygen-ui`, wraps the app
in `OxygenUIThemeProvider`, and reuses Oxygen's composite components (`AppShell`,
`ListingTable`, `Form.*`, `Header`, `Sidebar`, `UserMenu`, …) so the UI stays consistent with
the design system.

To make the skill trigger reliably on generic UI prompts, add an always-in-context rule to
your project's `CLAUDE.md` (or `AGENTS.md` / Cursor / Copilot equivalent). See the
[skill README](./packages/oxygen-ui/.claude/skills/oxygen-ui/README.md) for the exact rule and
more details.

# License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.

---

(c) Copyright 2025 WSO2 LLC.
