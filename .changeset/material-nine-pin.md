---
'@wso2/oxygen-ui': major
'@wso2/oxygen-ui-charts-react': major
'@wso2/oxygen-ui-icons-react': major
'@wso2/eslint-plugin-oxygen-ui': minor
'@wso2/oxygen-ui-path-map': minor
---

Oxygen UI 1.0.0 is built on Material UI 9 and MUI X 9. `@wso2/oxygen-ui` depends on `@mui/material` 9, `@mui/utils` 9 and `@mui/x-data-grid`, `@mui/x-date-pickers` and `@mui/x-tree-view` 9, so an app that imports from those packages moves to the same major versions.

What breaks for an app:

- Material UI 9 removed props and exports that Oxygen re-exports. `GridLegacy` is gone. The system props on `Box`, `Stack`, `Typography`, `Link`, `Grid` and `DialogContentText` (`alignItems`, `gap`, `mt`, `fontWeight`, `bgcolor` and the rest) are gone, as are `Typography`'s `paragraph` and `gutterBottom` and its dotted `color` strings. Move them into `sx`. Some deprecated slot props are gone too, such as `PaperProps` on `Dialog` and `MenuListProps` on `Menu`; use `slotProps`.
- A theme's Button overrides can no longer be keyed `containedPrimary`, `outlinedSecondary` and the like, because Material UI 9 does not read them. Oxygen's own themes use `variants` instead, and a custom theme that overrides those keys has to do the same.
- Material UI 9 changed class names, for example `MuiInputBase-inputHiddenLabel` is now `MuiInputBase-hiddenLabel` on the root, so a selector or a test that names a removed class stops matching.
- `@wso2/oxygen-ui` is published as one ES module per source module. Its `exports` map holds the root and the path imports, `@wso2/vite-plugin-oxygen-ui` is no longer needed, and its package is removed. See the path-import changes below.
- `@wso2/oxygen-ui` is ESM only. Its `exports` map has no `require` condition, so `require('@wso2/oxygen-ui')` fails with `ERR_PACKAGE_PATH_NOT_EXPORTED`. Load it with `import`, or with `import()` from a CommonJS file.
- MUI X 9 declarations use React types that `@types/react` 19.2.2 does not have, such as `React.SubmitEventHandler`. An app that type checks its dependencies (`skipLibCheck: false`) reports errors inside `@mui/x-tree-view` and `@mui/x-data-grid` until it moves to a newer `@types/react`. Apps with `skipLibCheck: true` are not affected.
- `createOxygenTheme` now merges `components.*.variants` instead of replacing them. A variant in your config replaces, in place, the base theme's variant with the same `props`, and the rest of the base theme's variants stay. Before, a config that defined variants for a component the base theme also defined them for, such as `MuiAvatar`, silently dropped the base's. Other arrays in a theme are still replaced.
- Material UI 9 narrows the default width of `ListItemIcon` from 56px to 36px, so the text of a list that uses it directly moves 20px to the left. Oxygen's own components, such as the Sidebar and the UserMenu, set their own icon width and do not change. To keep the old width in your app, set `components.MuiListItemIcon.styleOverrides.root.minWidth` to `56` in your theme.
- `createOxygenTheme` now derives the `...Channel` strings of a theme's palette colors, such as `mainChannel`, from the colors, instead of keeping the ones of the colors it replaced. A theme that extended a built theme and changed a color without setting its channel kept the old one, so anything tinted from the channel, such as a hover or selected background, used the old color: the HighContrast primary is blue but its channel was orange. The HighContrast, PaleGray and PaleIndigo themes change in those tints, and so does a custom theme that extends a built one. A channel you set yourself is kept.
- Components added since the Material 9 pin, such as `ContextSwitcher`, `FullScreenWizard`, `TimeRangeFilter` and `LogViewer`, are ported to the Material 9 APIs.

## Path imports and the per-module build

Publish `@wso2/oxygen-ui` as one ES module per source module, so a bundler drops what an app does not use. A barrel import of `TextField`, `Select`, `Header` or `AppShell` no longer brings MUI X Data Grid, the date pickers, Tree View or Prism with it, and no import has to change. Inter now loads with the base theme instead of the barrel, so an app gets it whenever it uses an Oxygen theme, a theme made with `createOxygenTheme`, or `OxygenUIThemeProvider`. Sora loads from the same place for now.

The `exports` map no longer points at files that were never published: it holds the root, `path-map.json` and the path imports described below. Type-only deep imports of internal declaration files, and the `index` path, stop resolving.

Add path imports for Oxygen components, for Material UI's and for MUI X, and for everything else on the barrel. `@wso2/oxygen-ui/TextField`, `@wso2/oxygen-ui/Sidebar` and one path for every other Oxygen component resolve to real modules, and `SearchBarWithAdvancedFilter` has a path of its own beside `SearchBar`. A path gives the component as its default export, with its parts, its hook and its types beside it, and it is the same object the barrel import gives. For `TextField` and `Select` that is the Override, not Material UI's component. Every Material UI path that has an index has an Oxygen path of the same name, so `@wso2/oxygen-ui/Button` and `@wso2/oxygen-ui/Box` give Material UI's component and an app never needs to import from `@mui/material`. They are generated from the installed Material UI. The `styles` and `utils` paths pass Material UI's through and add `createOxygenTheme`, `pxToRem` and `OxygenThemeType`, and `formatRelativeTime`; `colors` has a path. The paths of `TextField` and `Select` also carry the Material UI names the Overrides do not replace, such as `textFieldClasses`. Path imports need `moduleResolution` set to `bundler`, `node16` or `nodenext`.

`useAppShell`, `useNotifications` and `useThemeContent` each have a path, and so does every theme, named after its barrel name with the theme as the default export, so an app that imports one theme by path loads only that theme. `@wso2/oxygen-ui/OxygenUIThemeProvider` gives the provider as its default export and also carries `useThemeSwitcher`, its types and `createEmotionCache`. `Layout`, `PageLoader`, `ParticleBackground` and `version` each have a path, and the `version` path also carries Material UI's `major`, `minor`, `patch` and `prerelease`.

`@wso2/oxygen-ui/data-grid`, `@wso2/oxygen-ui/date-pickers` and `@wso2/oxygen-ui/tree-view` pass a whole MUI X package through by name, and each first-party date adapter has a path under `date-pickers`, such as `@wso2/oxygen-ui/date-pickers/AdapterDateFns`. The `DataGrid`, `DatePickers` and `TreeView` namespaces and `AdapterDateFns` stay on the barrel.

The package also publishes `@wso2/oxygen-ui/path-map.json`, which records for each name the path it lives on, whether it is that path's default export or a named export, and whether it is type-only. Declaration files now name their relative imports with an extension, so types resolve under `node16` and `nodenext`.

Load MUI X Data Grid only when `ListingTable.DataGrid` mounts. An app that uses only the plain table of `ListingTable` no longer ships Data Grid in its initial bundle, and an app that uses the Data Grid part needs no new import. The Data Grid part now renders after an asynchronous load: it shows a loading state while the load is pending and an error state if it fails, and the next mount tries again after a failure. An app's test that expects grid rows on the first render has to wait for them.

## `@wso2/oxygen-ui-path-map`

First release. It reads the `@wso2/oxygen-ui/path-map.json` that `@wso2/oxygen-ui` publishes, which records for each name the path it lives on, and tells a caller whether the map of the installed package was found, is missing or is unusable. The `@wso2/oxygen-ui` build and `@wso2/eslint-plugin-oxygen-ui` use it.

## `@wso2/eslint-plugin-oxygen-ui`

The autofix of `no-direct-mui-imports` writes Oxygen path imports where it wrote barrel imports. `@mui/material/Button` becomes `@wso2/oxygen-ui/Button`, an import from `@mui/material` becomes one path import per name using the path map of the installed `@wso2/oxygen-ui`, and the MUI X packages point at `@wso2/oxygen-ui/data-grid`, `date-pickers` and `tree-view`. Imports it cannot map are reported and left unchanged: a path the installed version does not have, a name that is not on that path, an import with a comment inside, and any import in a project whose `tsconfig.json` uses the legacy `node` module resolution. Type-only names stay type-only, and the path map is read again when the installed package changes.

The recommended config now suggests the packages that exist. It named `@oxygen-ui/react` and `@oxygen-ui/react-icons`, so its autofix rewrote imports to packages that cannot be installed; it now uses `@wso2/oxygen-ui` and `@wso2/oxygen-ui-icons-react`. It also no longer allows `@mui/x-data-grid` and `@mui/x-date-pickers`, which switched off their rewrites although Oxygen UI has paths for both; add them to `allowedPackages` to keep importing them directly.

## Other changes in `@wso2/oxygen-ui`

`SearchBarWithAdvancedFilter`'s popover now uses the Oxygen `Select` and `TextField` with the label above each field, and a placeholder in each select ("Select an attribute", "Select a condition"), where it used floating labels. The required marker comes from the field's `required` prop, and the popover has an id of its own, so two filters on one page no longer share `advanced-search-popover`.

Added `useResolvedColorScheme`, which returns `'light'` or `'dark'` for the scheme on screen, resolving the `system` mode. `ParticleBackground` drew its light colors when the mode was `system` and the operating system was dark; it now follows the scheme on screen. `CodeBlock` takes its scheme from the same hook, so it follows the color scheme provider and no longer watches the `data-color-scheme` attribute on the page.

The README, the AI docs and the Claude skills shipped in the package now teach path imports, such as `import Button from '@wso2/oxygen-ui/Button'`, and say that the barrel import is still supported. They explain that path imports need `moduleResolution` set to `bundler`, `node16` or `nodenext`, list the lower-case `data-grid`, `date-pickers` and `tree-view` paths. Run `npx @wso2/oxygen-ui update` to refresh the copies in your project. Examples that named exports the package does not have, such as `OxygenThemeBase`, `OxygenThemeWithRadialBackground`, `Charts`, `useHeader` and `useNotificationPanel`, are corrected.
