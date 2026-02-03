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
4. **MUI X uses namespaces** - `DataGrid.DataGrid`, `Charts.LineChart`, `DatePickers.DatePicker`
5. **Use theme tokens** - Use `sx` prop with theme values, not hardcoded colors/spacing

## Import Patterns

```tsx
// Components - import from @wso2/oxygen-ui
import { Button, TextField, Box, Typography, ListingTable } from '@wso2/oxygen-ui';

// Icons - import from @wso2/oxygen-ui-icons-react
import { HomeIcon, SettingsIcon, UserIcon } from '@wso2/oxygen-ui-icons-react';

// MUI X - use as namespaces
import { DataGrid, Charts, DatePickers, TreeView } from '@wso2/oxygen-ui';
<DataGrid.DataGrid rows={rows} columns={columns} />
<Charts.LineChart series={series} />
```

## Theme Tokens (Always Use)

```tsx
// CORRECT - Use theme tokens
<Box sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary' }} />

// WRONG - Never hardcode
<Box sx={{ padding: '16px', backgroundColor: '#ffffff', color: '#333' }} />
```

## Available Themes

- `OxygenTheme` - Default theme (recommended)
- `AcrylicOrangeTheme` - Orange accent variant
- `AcrylicPurpleTheme` - Purple accent variant
- `ChoreoTheme` - Choreo product theme (indigo-violet gradient)
- `ClassicTheme` - Traditional styling
- `HighContrastTheme` - Accessibility-focused
- `LowColorBaseTheme` - Minimal color palette
- `PaleGrayTheme` - Soft gray tones
- `PaleIndigoTheme` - Soft indigo tones

## Custom Oxygen Components

- **Layout**: `AppShell`, `Header`, `Sidebar`, `Footer`, `PageContent`
- **Data Display**: `ListingTable`, `PageTitle`, `CodeBlock`, `StatCard`
- **Forms**: `Form.CardButton`, `Form.Section`, `Form.Stack`, `Form.Wizard`
- **Inputs**: `SearchBar`, `SearchBarWithAdvancedFilter`, `ComplexSelect`
- **Feedback**: `NotificationPanel`, `NotificationBanner`
- **Theming**: `OxygenUIThemeProvider`, `ThemeSwitcher`, `ColorSchemeToggle`, `ColorSchemeImage`
- **User**: `UserMenu`

## Detailed Documentation

For comprehensive API reference and examples, see:
- [Component API Reference](./components.md)
- [UI Patterns & Examples](./patterns.md)
- [Theme Customization](./theming.md)
- [Migration Guide](./migration.md)
