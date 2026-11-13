# Oxygen UI - AI Development Guide

> WSO2's React component library built on Material-UI v7

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
4. **MUI X uses namespaces** - `DataGrid.DataGrid`, `DatePickers.DatePicker`, `TreeView.TreeView`
5. **Use theme tokens** - Use `sx` prop with theme values, not hardcoded colors/spacing
6. **Fixed labels on inputs** - Give every labelled `TextField` and `Select` `labelPlacement="top"`; never use MUI's floating label (`InputLabel` inside `FormControl`) in new code
   - **`ComplexSelect` is the exception** - Pass `label` and keep the default `labelAnchor` (`inside`), which puts the label inside the field above the selected value. Do not set `labelAnchor="outside"` or `"border"` in new code
7. **Select placeholders come from the developer** - Give every `Select` and `TextField select` a `placeholder`; ask the developer for the text instead of inventing it. Native selects (`native` or `SelectProps={{ native: true }}`) ignore `placeholder`, so put that same text in the empty option instead: `<option value="">Select a role</option>`

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

- `OxygenTheme` - Default theme (recommended): brand colours, Sora font and flat surfaces
- `AcrylicOrangeTheme` - Orange accent variant
- `AcrylicPurpleTheme` - Purple accent variant
- `ClassicTheme` - Traditional styling
- `HighContrastTheme` - Accessibility-focused
- `PaleBaseTheme` - Minimal color palette
- `PaleGrayTheme` - Soft gray tones
- `PaleIndigoTheme` - Soft indigo tones

## Custom Oxygen Components

- **Layout**: `AppShell`, `Layout`, `Header`, `Sidebar`, `Footer`, `PageContent`
- **Data Display**: `ListingTable`, `PageTitle`, `CodeBlock`, `StatCard`
- **Forms**: `Form.CardButton`, `Form.Section`, `Form.Stack`, `Form.Wizard`, `FullScreenWizard`
- **Inputs**: `SearchBar`, `SearchBarWithAdvancedFilter`, `ComplexSelect`
- **Feedback**: `NotificationPanel`, `NotificationBanner`
- **Panels**: `DrawerPanel`
- **Theming**: `OxygenUIThemeProvider`, `ThemeSwitcher`, `ColorSchemeToggle`, `ColorSchemeImage`
- **User**: `UserMenu`
- **Navigation**: `ContextSwitcher`
- **Animations**: `ParticleBackground`

## Detailed Documentation

For comprehensive API reference and examples, see:
- [Component API Reference](./components.md)
- [UI Patterns & Examples](./patterns.md)
- [Theme Customization](./theming.md)
- [Migration Guide](./migration.md)
