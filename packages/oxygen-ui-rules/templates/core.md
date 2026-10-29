# Oxygen UI - {{title}}

> WSO2's React design system, built on Material UI v7. Rules version {{rulesetVersion}}.

## Quick start

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

## Rules

These rules are checked by the Oxygen UI analyzer and ESLint plugin. Follow them in all code you write. [{{docsPath}}rules.md]({{docsPath}}rules.md) has the reasons, how to fix each one, and correct and incorrect examples.

{{rules}}

## Guidelines

These are not checked automatically yet. Follow them too.

1. **Wrap the app with `OxygenUIThemeProvider`** at the root.
2. **Use MUI X through the Oxygen UI namespaces**: `DataGrid.DataGrid`, `DatePickers.DatePicker`, `TreeView.SimpleTreeView`.
3. **Use theme tokens** in the `sx` prop, not hardcoded colours or spacing.
4. **Prefer Oxygen UI components** to building your own, such as `ListingTable` for listings and `PageTitle` for page headings. See the components below.

## Import patterns

```tsx
// Components, including the MUI components that Oxygen UI re-exports
import { Button, TextField, Box, Typography, ListingTable } from '@wso2/oxygen-ui';

// Icons
import { HomeIcon, SettingsIcon, UserIcon } from '@wso2/oxygen-ui-icons-react';

// MUI X, as namespaces
import { DataGrid, DatePickers } from '@wso2/oxygen-ui';
<DataGrid.DataGrid rows={rows} columns={columns} />
<DatePickers.DatePicker value={date} onChange={setDate} />
```

## Theme tokens

```tsx
// Correct: theme tokens
<Box sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary' }} />

// Incorrect: hardcoded values
<Box sx={{ padding: '16px', backgroundColor: '#ffffff', color: '#333' }} />
```

## Themes

{{themes}}

## Oxygen UI components

Oxygen UI adds these to the MUI components it re-exports. [{{docsPath}}components.md]({{docsPath}}components.md) lists their props and sub-components.

{{components}}

## Detailed documentation

- [Component API reference]({{docsPath}}components.md), generated from the Oxygen UI type declarations
- [Rules]({{docsPath}}rules.md)
- [UI patterns and examples]({{docsPath}}patterns.md)
- [Theme customization]({{docsPath}}theming.md)
- [Migration guide]({{docsPath}}migration.md)
{{skills}}
