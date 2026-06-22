---
name: oxygen-ui
description: >-
  This project uses WSO2 Oxygen UI (@wso2/oxygen-ui, MUI v7) as its design system. Use
  this skill for ANY React UI work in this project — building or editing any component,
  page, layout, form, table, dialog, wizard, dashboard, card, modal, or theme — even when
  the request does not mention Oxygen UI by name. It covers importing from @wso2/oxygen-ui,
  the required OxygenUIThemeProvider setup, reusing composite components (AppShell,
  ListingTable, Form.*, Header, Sidebar, UserMenu, etc.) for design consistency, theming
  and color schemes, and migrating @mui/material / lucide-react code to Oxygen UI.
---

# Oxygen UI

WSO2's React component library, built on top of Material UI v7. Everything ships from
`@wso2/oxygen-ui` with the Oxygen theme already applied.

## Why this skill exists: consistency through reuse

The single most important thing: **reuse Oxygen's composite components instead of
rebuilding the same experience from atomic pieces.** Oxygen ships ready-made "experiences"
— an app shell, header, sidebar, listing table, forms, user menu, notification panel — that
already match the design system's spacing, color, density, and behavior. When you hand-roll
a layout out of `Box`/`Grid`/`Drawer`, or a data table out of MUI `Table`, the result drifts
from every other Oxygen app. Reach for the composite component first; drop to primitives
only for genuinely custom UI.

## Critical rules

1. **Import everything from `@wso2/oxygen-ui`** — never from `@mui/material` directly. The
   package re-exports the entire MUI API with the Oxygen theme applied, so `Button`, `Box`,
   `TextField`, `Typography`, `styled`, etc. all come from `@wso2/oxygen-ui`.
2. **Icons from `@wso2/oxygen-ui-icons-react`.** This package re-exports all of
   [lucide-react](https://lucide.dev/icons/) plus a few WSO2 brand icons (`Github`,
   `Google`, `Gitlab`, `Bitbucket`, `Facebook`, `Wso2`, `Lambda`, `Mcp`). Use real lucide
   names with the `Icon` suffix (`HomeIcon`, `SettingsIcon`, `TrashIcon`, `PencilIcon`,
   `PlusIcon`, `UsersIcon`); WSO2 brand icons have no suffix (`<Github />`). Don't invent
   names — if unsure an icon exists, check the lucide icon set rather than guessing
   (e.g. there's no `EditIcon`; use `PencilIcon`).
3. **Charts from `@wso2/oxygen-ui-charts-react`** (Recharts-based).
4. **MUI X is namespaced** to avoid name clashes: `DataGrid.DataGrid`,
   `DatePickers.DatePicker`, `TreeView.SimpleTreeView` / `TreeView.TreeItem`.
5. **Wrap the app root in `OxygenUIThemeProvider`** with a theme (default `OxygenTheme`).
6. **Style with theme tokens via `sx`** (`p: 2`, `bgcolor: 'background.paper'`,
   `color: 'text.primary'`) — never hardcode hex colors or pixel spacing.

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

MUI X usage:

```tsx
import { DataGrid, DatePickers, TreeView } from '@wso2/oxygen-ui';

<DataGrid.DataGrid rows={rows} columns={columns} />
<DatePickers.DatePicker value={date} onChange={setDate} />
```

## Reach for these composite components (not raw MUI)

| If you're about to build… | Use instead |
| --- | --- |
| A page layout with top bar + side nav | `AppShell` + `Header` + `Sidebar` (+ `Footer`) |
| A data table / list view with toolbar, search, density | `ListingTable.*` (not MUI `Table`) |
| A form with grouped sections | `Form.Section` + `Form.Stack` (fields are normal `TextField`) |
| A multi-step flow / wizard | `Form.Wizard` (or `Stepper` for a bare stepper) |
| A user avatar + account menu | `UserMenu` |
| Light/dark toggle | `ColorSchemeToggle` |
| A theme picker | `ThemeSwitcher` |
| Notifications (panel / inline) | `NotificationPanel` / `NotificationBanner` |
| A page heading block | `PageTitle`; page body wrapper `PageContent` |
| A KPI/metric tile | `StatCard` |
| Syntax-highlighted code | `CodeBlock` |
| Breadcrumbs | `AppBreadcrumbs` |
| A search input (with advanced filters) | `SearchBar` / `SearchBarWithAdvancedFilter` |
| A rich/grouped select | `ComplexSelect` |

`AppShell`, `Header`, `Sidebar`, `ListingTable`, `Form`, `NotificationPanel`, and `UserMenu`
are **compound components** (`AppShell.Main`, `Header.Brand`, `Sidebar.Item`,
`ListingTable.Row`, `Form.Section`, …). See `references/components.md` for their full
sub-component APIs and `references/patterns.md` for complete examples.

## When to read which reference

Read the relevant file before generating non-trivial code — they contain the exact
sub-components, props, and verified examples:

| Task | Read |
| --- | --- |
| Component APIs: tables, cards, dialogs, selects, MUI X | `references/components.md` |
| Forms, wizards, validation, login screens | `references/components.md` (Form) + `references/patterns.md` |
| App shell / header / sidebar / dashboard layouts | `references/patterns.md` |
| Theming, color schemes, custom themes (`createOxygenTheme`) | `references/theming.md` |
| Migrating `@mui/material` / `lucide-react` → Oxygen UI | `references/migration.md` |

## Available themes

`OxygenTheme` (default), `AcrylicOrangeTheme`, `AcrylicPurpleTheme`, `ClassicTheme`,
`HighContrastTheme`, `PaleBaseTheme`, `PaleGrayTheme`, `PaleIndigoTheme`, `WSO2Theme`.

Create a custom theme with `createOxygenTheme(overrides)` (extends the Oxygen base theme):

```tsx
import { OxygenUIThemeProvider, createOxygenTheme } from '@wso2/oxygen-ui';

const MyTheme = createOxygenTheme({
  colorSchemes: { light: { palette: { primary: { main: '#1976d2' } } } },
});

<OxygenUIThemeProvider theme={MyTheme}>{children}</OxygenUIThemeProvider>
```

See `references/theming.md` for the full theming model and `references/migration.md` for
converting existing MUI code.
