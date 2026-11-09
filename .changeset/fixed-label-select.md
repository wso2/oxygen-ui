---
'@wso2/oxygen-ui': minor
---

PR: #687
author: @aruniw

Add an Oxygen `Select` with `labelPlacement="top"`, which draws a fixed label above the field; the floating label is unchanged. Add a `placeholder` prop to `Select` and to `TextField` selects. In `ChoreoLabsTheme`, select labels keep their default colour on focus and in error, fixed-label selects take the text field focus style, and menu items drop the clipped focus outline and use a neutral fill for the selected option. Add the `oxygen-select` skill.
