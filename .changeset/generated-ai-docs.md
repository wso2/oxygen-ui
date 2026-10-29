---
'@wso2/oxygen-ui': patch
---

Generate the AI documentation that `npx @wso2/oxygen-ui init` installs from the Oxygen UI rules and type declarations. `components.md` now matches the installed API, including props and sub-components that were missing or wrong, and a new `rules.md` describes the design system rules with examples. Add the `oxygen-audit` and `oxygen-remediate` Claude Code skills. Fix theming and migration examples that used the removed `ChoreoTheme` and the unexported `OxygenThemeBase`; custom themes use `createOxygenTheme`.
