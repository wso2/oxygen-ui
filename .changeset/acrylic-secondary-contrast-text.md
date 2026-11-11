---
'@wso2/oxygen-ui': patch
---

PR: #TBD
author: @aruniw

Give `AcrylicOrangeTheme` and `AcrylicPurpleTheme` a dark `secondary.contrastText` (`#40404B`) in light mode. Their light grey `secondary.main` inherited the base theme's white, which is 1.2:1, so text set in `secondary.contrastText` on `secondary.main` was unreadable. The light, dark and channel tokens are now derived from the light grey too, so hovered or focused secondary chips and FABs (`secondary.dark`, now `#d0d0d0`) and secondary chip delete icons stay readable. The Avatar `Colors` story now pairs each background with its `contrastText`, so the secondary avatar letter shows in every theme, including `ChoreoLabsTheme`, where the theme's Avatar text colour matches `secondary.main`.
