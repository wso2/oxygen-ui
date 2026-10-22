---
'@wso2/oxygen-ui': patch
---

Fix `Sidebar.Item` list markup: an expanded group's nested items are now rendered in an `<li>`, so the parent list contains only list items (axe `list` rule, WCAG 1.3.1).

Add side panel navigation rules to the `oxygen-layout` AI skill: when to use section titles and collapsible groups, how collapsible groups behave, and pinning footer items in `Sidebar.Footer`. Fix the skill's nested sidebar example, which used `hasChildren` and `nested` props that `Sidebar.Item` does not have.
