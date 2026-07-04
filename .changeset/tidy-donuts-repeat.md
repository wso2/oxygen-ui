---
'@wso2/oxygen-ui': patch
---
Fix `showName` prop leaking to the DOM in `UserMenu.Trigger` by filtering it with `shouldForwardProp`
