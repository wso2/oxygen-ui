---
'@wso2/oxygen-ui': patch
---

PR: #690
author: @aruniw

Align `ChoreoLabsTheme` breadcrumbs, links, page titles and `ComplexSelect` with the Choreo Labs component sheet. Breadcrumbs use a slash separator, 14px caption text and the sheet's link, hover and separator colours, for both `AppBreadcrumbs` and plain `Breadcrumbs`. Links without a `color` take the default text colour and turn orange on hover, links with a palette `color` use the brand colour, and the underline follows the `underline` prop, defaulting to `hover`. `PageTitle.Avatar` uses the light avatar style. `ComplexSelect` options, outside label and focus border match `Select`. `AppBreadcrumbs` now reads its default props from the theme, so a theme can set its separator.
