---
'@wso2/oxygen-ui': minor
---

Let product consoles drive `AppSwitcher` from shared data: `currentAppId` marks the app the user is in (same-tab navigation, `aria-current`, closes the popover), `AppSwitcher.Section` takes `apps` and both `Section` and `Footer` take `loading`, apps with no URL render as static "Coming soon" cards (localisable via `unavailableLabel`), cards take `busy`, and only `http:`, `https:` and relative URLs are used as card links.
