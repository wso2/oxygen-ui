---
'@wso2/oxygen-ui': minor
---

Add `ChoreoLabsTheme`, a copy of `AcrylicOrangeTheme` with the Choreo Labs brand colours and the Sora typeface. The brand uses no gradients, so the page background, primary buttons and dark-mode surfaces are flat. Sora is bundled from `@fontsource-variable/sora` alongside Inter.

Existing themes and the default theme are unchanged. To use the new theme, pass it to the provider: `<OxygenUIThemeProvider theme={ChoreoLabsTheme}>`.
