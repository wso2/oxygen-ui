---
'@wso2/oxygen-ui': minor
---

Publish `@wso2/oxygen-ui` as one ES module per source module, so a bundler drops what an app does not use. A barrel import of `TextField`, `Select`, `Header` or `AppShell` no longer brings MUI X Data Grid, the date pickers, Tree View or Prism with it, and no import has to change. Inter now loads with the base theme instead of the barrel, so an app gets it whenever it uses an Oxygen theme, a theme made with `createOxygenTheme`, or `OxygenUIThemeProvider`. Sora loads from the same place for now.

The `exports` map now holds only the root. Type-only deep imports of internal declaration files, and the `index` path, stop resolving.
