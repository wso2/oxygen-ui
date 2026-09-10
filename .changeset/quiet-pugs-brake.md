---
"@wso2/oxygen-ui": minor
---

Add `AppSwitcher` component for navigating between WSO2 Cloud applications

Renders a grid icon button in the header that opens a popover listing the
available platforms. The layout is fixed by design so the switcher stays
consistent across every product: consumers describe the applications with the
`apps` prop rather than composing markup.

- `apps` - name, icon, status chip, and `current`/`disabled` state per application
- `footer` - optional supporting text with a trailing link action
- Navigation via `href` (cross-app), a router `Link` through `component` (in-app),
  or `onClick` (programmatic)
