---
'@wso2/oxygen-ui': patch
---

PR: #693
author: @aruniw

`SearchBar` drops the input's left padding, so the gap between the search icon and the text is the icon's 8px margin instead of 22px. `SearchBarWithAdvancedFilter` gets the same fix. Themes can now style the search bar through `components.MuiSearchBar.styleOverrides`. In `ChoreoLabsTheme`, a focused search bar without a floating label gets the same 3px light Cobalt ring as a fixed-label text input (red on error).
