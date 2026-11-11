---
'@wso2/oxygen-ui': patch
---

PR: #693
author: @aruniw

In `ChoreoLabsTheme`, buttons used as toggles no longer lift on hover or press in when clicked. This covers buttons in a `ButtonGroup` and buttons with `aria-pressed`. The lift pulled one segment out of line with its neighbours. Other filled and outlined buttons still lift.
