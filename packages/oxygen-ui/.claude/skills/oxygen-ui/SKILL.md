---
name: oxygen-ui
description: >-
  This project uses WSO2 Oxygen UI (@wso2/oxygen-ui) as its design system. Use this skill
  for ANY React UI work here — setting up Oxygen UI in a new or existing app, and building
  or editing any component, page, layout, form, table, dialog, wizard, dashboard, card,
  modal, or theme — even when the request does not mention Oxygen UI by name. It covers
  installing the correct packages and versions, the OxygenUIThemeProvider + router setup,
  the canonical app structure (layouts + pages) that mirrors the sample app, reusing
  composite components (AppShell, ListingTable, Form.*, Header, Sidebar, UserMenu, …) for
  consistency, theming, and migrating @mui/material / lucide-react code to Oxygen UI.
---

# Oxygen UI

WSO2's React component library, built on Material UI v7. Everything ships from
`@wso2/oxygen-ui` with the Oxygen theme already applied. The canonical reference app ships
**inside the installed package** (read its real source — see
[Reading the sample app](#reading-the-sample-app)); match its structure.

## Why this skill exists: consistency through reuse

Reuse Oxygen's composite components and its canonical app structure instead of rebuilding
from scratch. Oxygen ships ready-made experiences — an app shell, header, sidebar, listing
table, forms, user menu — and the sample app shows exactly how to wire them into a routed
app. Building from those keeps every Oxygen app visually and behaviorally consistent. Drop
to primitives (`Box`/`Grid`) only for genuinely custom UI.

## Setup

Oxygen UI bundles MUI and Emotion as dependencies — **never install `@mui/material`,
`@emotion/*`, or a MUI version yourself**; that causes version conflicts (a common cause of
broken/old setups). You only install the Oxygen packages plus React (and a router).

**Versions** (match the sample app): React **19**, `@wso2/oxygen-ui` **latest**, Vite,
`react-router` **v7**. Always install `@wso2/oxygen-ui@latest` rather than guessing a
version.

### New app (Vite + React + TypeScript)

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @wso2/oxygen-ui@latest @wso2/oxygen-ui-icons-react@latest react-router
# optional: charts
npm install @wso2/oxygen-ui-charts-react@latest
```

Then create the canonical structure (see `references/app-structure.md` — read it from the
installed package, see [Reading the references](#reading-the-references)): `src/main.tsx`
(provider + router), `src/App.tsx` (maps routes),
`src/config/appRoutes.tsx`, `src/layouts/` (`AppLayout` with `AppShell`), `src/pages/`.

### Existing React app

```bash
npm install @wso2/oxygen-ui@latest @wso2/oxygen-ui-icons-react@latest
```

Wrap the app root once in `OxygenUIThemeProvider` (see Quick start). Then build pages in
the canonical structure (`references/app-structure.md`, read from the installed package).

## Critical rules

1. **Import everything from `@wso2/oxygen-ui`** — never from `@mui/material`. The package
   re-exports the entire MUI API with the Oxygen theme applied (`Button`, `Box`,
   `TextField`, `Typography`, `styled`, …).
2. **Icons from `@wso2/oxygen-ui-icons-react`.** This package re-exports
   [lucide-react](https://lucide.dev/icons/) plus WSO2 brand icons (`WSO2`, `Github`,
   `Google`, …). **Use the bare lucide name — NOT an `Icon` suffix** — to match the sample
   app: `import { Search, Plus, Settings, Home, Bell, Users, FolderOpen } from
   '@wso2/oxygen-ui-icons-react'`. (e.g. `Search`, not `SearchIcon`; `Trash2`, not
   `TrashIcon`; there is no `EditIcon` — use `Pencil`.)
3. **Charts from `@wso2/oxygen-ui-charts-react`** (Recharts-based).
4. **MUI X is namespaced**: `DataGrid.DataGrid`, `DatePickers.DatePicker`,
   `TreeView.SimpleTreeView`.
5. **Wrap the app root in `OxygenUIThemeProvider`** with a theme.
6. **Style with theme tokens via `sx`** (`p: 2`, `bgcolor: 'background.paper'`,
   `color: 'text.primary'`) — never hardcode hex colors or pixel spacing.
7. **Page precedents first.** Before composing ANY page or page-level surface (header/title,
   listing, detail view, dashboard, login), check whether the sample app already has that
   page, **read its real source**, and match its composition — compose from primitives only
   when no page-level precedent exists. Skipping this rebuilds headers and listings from
   `Box`/`Typography`/`Grid` into pages that don't match the design system; the sample page is
   the spec. See [Reading the sample app](#reading-the-sample-app).

## Quick start

```tsx
// src/main.tsx
import { OxygenUIThemeProvider, OxygenTheme } from '@wso2/oxygen-ui';
import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OxygenUIThemeProvider theme={OxygenTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OxygenUIThemeProvider>
  </StrictMode>,
);
```

```tsx
import { Search, Plus } from '@wso2/oxygen-ui-icons-react';
import { DataGrid, DatePickers } from '@wso2/oxygen-ui';

<DataGrid.DataGrid rows={rows} columns={columns} />
<DatePickers.DatePicker value={date} onChange={setDate} />
```

## Canonical app structure (match the sample)

Read `references/app-structure.md` (from the installed package — see
[Reading the references](#reading-the-references)) before scaffolding an app or adding
pages/layouts — it has the full `main.tsx`, `appRoutes.tsx`, `AppLayout`, and page templates
from the sample app. In short:

- `src/main.tsx` — `OxygenUIThemeProvider` (with `theme` or a `themes={[…]}` switcher) →
  `<BrowserRouter>` → `<App/>`.
- `src/App.tsx` — maps `appRoutes` to `<Routes>/<Route>`.
- `src/config/appRoutes.tsx` — routes grouped under **layouts** (`AppLayout` for the signed-in
  app, `GateLayout` for login, `DefaultLayout` for standalone pages).
- `src/layouts/AppLayout.tsx` — the app shell: `AppShell` > `AppShell.Navbar` (`Header`),
  `AppShell.Sidebar` (`Sidebar`, items routed via `link={<Link to="…" />}`),
  `AppShell.Main` (renders `<Outlet/>`), `AppShell.Footer`.
- `src/pages/*.tsx` — **each page returns `PageContent` > `PageTitle.Header` /
  `PageTitle.SubHeader` > content** (a `ListingTable` for lists, a `Grid` of `Card`s, etc.).

## Reach for these composite components (not raw MUI)

| If you're about to build… | Use instead |
| --- | --- |
| Page layout with top bar + side nav | `AppShell` + `Header` + `Sidebar` (+ `Footer`) |
| A data table / list view | `ListingTable.*` (not MUI `Table`) |
| A form with grouped sections | `Form.Section` + `Form.Stack` (fields are normal `TextField`) |
| A multi-step flow / wizard | `Form.Wizard` |
| A user avatar + account menu | `UserMenu` |
| Light/dark toggle / theme picker | `ColorSchemeToggle` / `ThemeSwitcher` |
| Notifications | `NotificationPanel` / `NotificationBanner` |
| A page heading / page body wrapper | `PageTitle` / `PageContent` |
| A KPI/metric tile | `StatCard` |
| Breadcrumbs / search / rich select | `AppBreadcrumbs` / `SearchBar` / `ComplexSelect` |

`AppShell`, `Header`, `Sidebar`, `ListingTable`, `Form`, `NotificationPanel`, `UserMenu`,
and `ComplexSelect` are **compound components** (`AppShell.Main`, `Sidebar.Item`,
`ListingTable.Row`, `Form.Section`, …).

> This table is a quick guide; the authoritative component catalog is
> `references/components.md` (see [Reading the references](#reading-the-references) for
> which copy to read).

## Reading the references

The reference files are bundled in `references/` next to this SKILL.md, so they are always
available.

When this project also has `@wso2/oxygen-ui` installed, **prefer that package's copy of the
references** — they are matched to your installed version, so they stay accurate even if this
skill was installed a while ago (or by `npx skills add` from a different version). Locate
them:

```bash
node -p "require('path').dirname(require.resolve('@wso2/oxygen-ui/package.json'))"
# then read <that-dir>/.claude/skills/oxygen-ui/references/<file>.md
# fallback: find . -path '*@wso2/oxygen-ui/.claude/skills/oxygen-ui/references/*.md'
```

If the package isn't installed or can't be resolved, use the bundled `references/` next to
this file. During a fresh setup (before `npm install`), the [Setup](#setup) and
[Quick start](#quick-start) sections above are self-sufficient.

## Reading the sample app

The canonical reference app's full source ships **inside the installed `@wso2/oxygen-ui`
package**, under `.claude/skills/oxygen-ui/sample/src/`. Once the package is installed (which
it always is by the time you're building), read the real files instead of inferring structure
from prose. Locate them the same way as the references:

```bash
node -p "require('path').dirname(require.resolve('@wso2/oxygen-ui/package.json'))"
# then read <that-dir>/.claude/skills/oxygen-ui/sample/src/<file>
# in this monorepo, read samples/oxygen-ui-test-app/src/<file> directly
# fallback: find . -path '*@wso2/oxygen-ui/.claude/skills/oxygen-ui/sample/src/*'
```

Resolution order: the installed package's copy → (in this repo) the live
`samples/oxygen-ui-test-app/src`. Read the real files when scaffolding an app or matching an
existing pattern. Where to look:

| To see… | Read in `sample/src/` |
| --- | --- |
| Provider + router entry | `main.tsx` |
| Route table grouped by layout | `config/appRoutes.tsx` |
| App shell (Header/Sidebar/Footer/Outlet) | `layouts/AppLayout.tsx` |
| Login / unauthenticated layout | `layouts/GateLayout.tsx` |
| Listing page with a table | `pages/Organizations.tsx`, `pages/Projects.tsx` |
| Project / detail page (title, avatar, back button, repo link) | `pages/ProjectOverview.tsx` |
| Rows-as-cards listing (card-variant `ListingTable`) | `pages/ProjectOverview.tsx` (MCP Servers section), `pages/Organizations.tsx` |
| Multi-step form / wizard | `components/ComponentCreate/IntegrationWizard.tsx` |
| Settings page | `pages/SettingsPage.tsx` |
| Dashboard / analytics | `pages/Analytics.tsx` |
| Page heading / body wrapper pattern | `components/PageTitle.tsx` + any page |

## When to read which reference

| Task | Read |
| --- | --- |
| Setting up / scaffolding an app, layouts, routing, page structure | `references/app-structure.md` |
| Component APIs: tables, cards, dialogs, selects, MUI X | `references/components.md` |
| Forms, wizards, validation | `references/components.md` (Form) + `references/patterns.md` |
| App shell / header / sidebar / dashboard patterns | `references/patterns.md` |
| Theming, color schemes, custom themes (`createOxygenTheme`) | `references/theming.md` |
| Migrating `@mui/material` / `lucide-react` → Oxygen UI | `references/migration.md` |

## Themes

`OxygenTheme` (default), `AcrylicOrangeTheme`, `AcrylicPurpleTheme`, `ClassicTheme`,
`HighContrastTheme`, `PaleBaseTheme`, `PaleGrayTheme`, `PaleIndigoTheme`, `WSO2Theme`.
Custom theme: `createOxygenTheme(overrides)` (extends the Oxygen base). This list is a quick
guide; the authoritative set of themes is in `references/theming.md` (see
[Reading the references](#reading-the-references) for which copy to read).
