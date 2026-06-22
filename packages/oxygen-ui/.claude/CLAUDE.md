# Oxygen UI - AI Development Guide

> WSO2's React component library built on Material-UI v7

> [!IMPORTANT]
> **For ANY UI work in this project, use the `oxygen-ui` skill.** All React UI —
> components, pages, layouts, forms, tables, dialogs, theming — must be built with Oxygen
> UI. Consult the `oxygen-ui` skill before writing or editing UI code, even when the
> request does not mention Oxygen UI by name. (Skill descriptions alone under-trigger on
> generic UI prompts, so this rule is what reliably routes UI tasks to the skill.)

## Quick Start

```tsx
import { OxygenUIThemeProvider, OxygenTheme, Button } from '@wso2/oxygen-ui';

function App() {
  return (
    <OxygenUIThemeProvider theme={OxygenTheme}>
      <Button variant="contained">Click me</Button>
    </OxygenUIThemeProvider>
  );
}
```

## Critical Rules

1. **Import from `@wso2/oxygen-ui`** - Never import directly from `@mui/material`
2. **Always wrap with `OxygenUIThemeProvider`** - Required at app root
3. **Icons from `@wso2/oxygen-ui-icons-react`** - Separate package for icons
4. **Charts from `@wso2/oxygen-ui-charts-react`** - Separate package, Recharts-based
5. **MUI X uses namespaces** - `DataGrid.DataGrid`, `DatePickers.DatePicker`, `TreeView.SimpleTreeView`
6. **Use theme tokens** - Use `sx` prop with theme values, not hardcoded colors/spacing
7. **Reuse composite components** - Prefer Oxygen's `AppShell`, `ListingTable`, `Form.*`, etc.
   over rebuilding the same experience from primitives, so apps stay consistent.

## Import Patterns

```tsx
// Components - import from @wso2/oxygen-ui
import { Button, TextField, Box, Typography, ListingTable } from '@wso2/oxygen-ui';

// Icons - import from @wso2/oxygen-ui-icons-react
import { HomeIcon, SettingsIcon, UserIcon } from '@wso2/oxygen-ui-icons-react';

// MUI X - use as namespaces
import { DataGrid, DatePickers, TreeView } from '@wso2/oxygen-ui';
<DataGrid.DataGrid rows={rows} columns={columns} />
<DatePickers.DatePicker value={date} onChange={setDate} />
```

## Theme Tokens (Always Use)

```tsx
// CORRECT - Use theme tokens
<Box sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary' }} />

// WRONG - Never hardcode
<Box sx={{ padding: '16px', backgroundColor: '#ffffff', color: '#333' }} />
```

## Available Themes

- `OxygenTheme` - Default theme (Acrylic Base, recommended)
- `AcrylicOrangeTheme` - Orange accent variant
- `AcrylicPurpleTheme` - Purple accent variant
- `ClassicTheme` - Traditional styling
- `HighContrastTheme` - Accessibility-focused
- `PaleBaseTheme` - Minimal color palette
- `PaleGrayTheme` - Soft gray tones
- `PaleIndigoTheme` - Soft indigo tones
- `WSO2Theme` - WSO2 brand theme

Create a custom theme with `createOxygenTheme(overrides)` (extends the Oxygen base theme).

## Custom Oxygen Components

- **Layout**: `AppShell`, `Layout`, `Header`, `Sidebar`, `Footer`, `PageContent`
- **Data Display**: `ListingTable`, `PageTitle`, `AppBreadcrumbs`, `CodeBlock`, `StatCard`
- **Forms**: `Form.Section`, `Form.Stack`, `Form.Header`, `Form.Subheader`, `Form.Body`,
  `Form.CardButton`, `Form.Wizard`, `Form.ElementWrapper`
- **Inputs**: `SearchBar`, `SearchBarWithAdvancedFilter`, `ComplexSelect`
- **Feedback**: `NotificationPanel`, `NotificationBanner`
- **Theming**: `OxygenUIThemeProvider`, `createOxygenTheme`, `ThemeSwitcher`,
  `ColorSchemeToggle`, `ColorSchemeImage`, `ColorSchemeSVG`
- **User**: `UserMenu`
- **Animations**: `ParticleBackground`

## Available Skills

- `oxygen-ui` - Build UIs with Oxygen UI: components, tables, cards, forms, wizards,
  layouts, theming, and MUI → Oxygen migration. Routes into the detailed references below.

## Detailed Documentation

For comprehensive API reference and examples, see:
- [Component API Reference](./components.md)
- [UI Patterns & Examples](./patterns.md)
- [Theme Customization](./theming.md)
- [Migration Guide](./migration.md)
