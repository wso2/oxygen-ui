---
'@wso2/oxygen-ui': major
---

Stop re-exporting MUI X from the `@wso2/oxygen-ui` Published entry so Table-only apps do not evaluate Data Grid, Date Pickers, Tree View, or Prism. Import those surfaces from Oxygen subpaths (`@wso2/oxygen-ui/data-grid`, `date-pickers`, `tree-view`). CodeBlock and ListingTable.DataGrid load their heavy deps on mount.

Fixes #578
