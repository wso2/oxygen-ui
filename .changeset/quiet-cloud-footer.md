---
'@wso2/oxygen-ui': minor
---

Let `AppSwitcher.Footer` sit below its divider without a heading, so the switcher can end with WSO2 Cloud links such as Cloud home and Settings. The footer no longer shows "Manage" unless a `label` is passed; it keeps "Manage" as its accessible name, which the new `aria-label` prop on `AppSwitcher.Footer` and `AppSwitcher.Section` can change.
