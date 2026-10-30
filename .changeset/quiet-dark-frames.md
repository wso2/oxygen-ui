---
'@wso2/oxygen-ui': minor
'@wso2/oxygen-ui-charts-react': minor
'@wso2/oxygen-ui-icons-react': minor
---

Add `noSsr` to `OxygenUIThemeProvider`, and pass MUI's other color-scheme options (`defaultMode`, `modeStorageKey`, `colorSchemeStorageKey`, `disableTransitionOnChange`, `storageManager`) through to its `ThemeProvider`. Client-rendered apps should pass `noSsr`, so that a page load in dark mode no longer paints the light scheme for a frame.
