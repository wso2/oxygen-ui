# Choreo Oxygen UI - AI Development Guide

> Choreo Labs' React component library built on Material-UI v9

## Quick Start

```tsx
import OxygenUIThemeProvider from '@wso2/oxygen-ui/OxygenUIThemeProvider';
import OxygenTheme from '@wso2/oxygen-ui/OxygenTheme';
import Button from '@wso2/oxygen-ui/Button';

function App() {
  return (
    <OxygenUIThemeProvider theme={OxygenTheme}>
      <Button variant="contained">Click me</Button>
    </OxygenUIThemeProvider>
  );
}
```

## Critical Rules

1. **Import from `@wso2/oxygen-ui` paths** - `import Button from '@wso2/oxygen-ui/Button'`. Never import directly from `@mui/material`. The barrel (`import { Button } from '@wso2/oxygen-ui'`) still works, but write path imports in new code
2. **Always wrap with `OxygenUIThemeProvider`** - Required at app root
3. **Icons from `@wso2/oxygen-ui-icons-react`** - Separate package for icons
4. **MUI X uses namespaces** - `DataGrid.DataGrid`, `DatePickers.DatePicker`, `TreeView.TreeView`
5. **Use theme tokens** - Use `sx` prop with theme values, not hardcoded colors/spacing
6. **Fixed labels on inputs** - Give every labelled `TextField` and `Select` `labelPlacement="top"`; never use MUI's floating label (`InputLabel` inside `FormControl`) in new code
   - **`ComplexSelect` is the exception** - Pass `label` and keep the default `labelAnchor` (`inside`), which puts the label inside the field above the selected value. Do not set `labelAnchor="outside"` or `"border"` in new code
7. **Select placeholders come from the developer** - Give every `Select` and `TextField select` a `placeholder`; ask the developer for the text instead of inventing it. Native selects (`native` or `SelectProps={{ native: true }}`) ignore `placeholder`, so put that same text in the empty option instead: `<option value="">Select a role</option>`

## Import Patterns

```tsx
// Components - one path per component, with its parts, hook and types beside it
import Button from '@wso2/oxygen-ui/Button';
import TextField from '@wso2/oxygen-ui/TextField';
import Box from '@wso2/oxygen-ui/Box';
import Typography from '@wso2/oxygen-ui/Typography';
import ListingTable from '@wso2/oxygen-ui/ListingTable';

// Icons - import from @wso2/oxygen-ui-icons-react
import { HomeIcon, SettingsIcon, UserIcon } from '@wso2/oxygen-ui-icons-react';

// MUI X - lower-case paths, used as namespaces
import * as DataGrid from '@wso2/oxygen-ui/data-grid';
import * as DatePickers from '@wso2/oxygen-ui/date-pickers';
import * as TreeView from '@wso2/oxygen-ui/tree-view';
<DataGrid.DataGrid rows={rows} columns={columns} />
<DatePickers.DatePicker value={date} onChange={setDate} />
```

Path imports need `moduleResolution` set to `bundler`, `node16` or `nodenext`.

## Theme Tokens (Always Use)

```tsx
// CORRECT - Use theme tokens
<Box sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary' }} />

// WRONG - Never hardcode
<Box sx={{ padding: '16px', backgroundColor: '#ffffff', color: '#333' }} />
```

## Available Themes

- `OxygenTheme` - Default theme (recommended): brand colours, Sora font and flat surfaces
- `ClassicTheme` - Traditional styling
- `HighContrastTheme` - Accessibility-focused

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
