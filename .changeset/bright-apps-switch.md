---
'@wso2/oxygen-ui': minor
'@wso2/oxygen-ui-charts-react': minor
'@wso2/oxygen-ui-icons-react': minor
---

Let product consoles drive `AppSwitcher` from shared data: `currentAppId` marks the app the user is in (same-tab navigation, `aria-current`, closes the popover), `AppSwitcher.Section` takes `apps` and both `Section` and `Footer` take `loading`, apps with no URL render disabled with a "Coming soon" tooltip (localisable via `unavailableLabel`), cards take `busy`, and only `http:`, `https:` and relative URLs are used as card links.
