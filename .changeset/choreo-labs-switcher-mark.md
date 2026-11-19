---
'@wso2/oxygen-ui': patch
---

AppSwitcher: a platform card with no `icon` now shows the Choreo Labs mark (`ChoreoLabs` from `@wso2/oxygen-ui-icons-react`) instead of the WSO2 logo, at the same size. The mark is Midnight Ink (`#0B1633`) on a light card and white on a dark one instead of orange, and a platform that is not yet available fades it. The orange stays on the hover and current-app borders and the focus ring. The AppSwitcher docs and comments now say Choreo Cloud. The `@wso2/oxygen-ui-icons-react` peer range now starts at 0.26.0, the first release that exports `ChoreoLabs`.
