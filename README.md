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

Oxygen UI includes built-in documentation for AI assistants, enabling AI coding tools to understand the component library and generate correct code.

## Universal Setup (Works with any AI)

```bash
npx @wso2/oxygen-ui init
```

Creates:
- `AGENTS.md` - Streamlined AI guide at project root
- `.ai/oxygen-ui/` - Detailed documentation:
  - `components.md` - Component API reference
  - `patterns.md` - Common UI patterns
  - `theming.md` - Theme customization
  - `migration.md` - Migration guide

## Claude Code Setup (Recommended for Claude)

```bash
npx @wso2/oxygen-ui init --claude
```

Creates:
- `.claude/oxygen-ui/` - Claude-optimized documentation
- `.claude/skills/` - Invokable skills:
  - `/oxygen-component` - Generate Oxygen UI components
  - `/oxygen-layout` - Generate app layouts
  - `/oxygen-form` - Generate forms with validation
  - `/oxygen-migrate` - Migrate MUI code
- Updates root `CLAUDE.md` with reference

## Updating After Upgrade

```bash
npx @wso2/oxygen-ui update           # Universal
npx @wso2/oxygen-ui update --claude  # Claude-specific
```

## AI Documentation

For detailed information, see the generated files:
- Components: `.ai/oxygen-ui/components.md` or `.claude/oxygen-ui/components.md`
- Patterns: `.ai/oxygen-ui/patterns.md` or `.claude/oxygen-ui/patterns.md`
- Theming: `.ai/oxygen-ui/theming.md` or `.claude/oxygen-ui/theming.md`
- Migration: `.ai/oxygen-ui/migration.md` or `.claude/oxygen-ui/migration.md`

See the [@wso2/oxygen-ui README](./packages/oxygen-ui/README.md#ai-assisted-development) for more details.

# License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.

---

(c) Copyright 2025 WSO2 LLC.
