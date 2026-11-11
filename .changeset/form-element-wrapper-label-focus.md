---
'@wso2/oxygen-ui': patch
---

PR: #693
author: @aruniw

`Form.ElementWrapper` keeps its label at the default colour when the field inside it is focused, like the Oxygen `Select` fixed label. It used to turn the theme's primary colour (orange in `ChoreoLabsTheme` and the Acrylic themes). The field's border still shows focus.
