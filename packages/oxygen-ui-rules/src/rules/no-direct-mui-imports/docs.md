## Why

`@wso2/oxygen-ui` re-exports the MUI API with the Oxygen theme, overrides and the MUI versions it was tested with. Importing from `@mui/*` directly can pull in a second copy of MUI, skip Oxygen's theme overrides, and break when Oxygen upgrades MUI.

## Impact

- Components can render without Oxygen styling.
- Bundles can include two versions of MUI.
- Products drift from the MUI version Oxygen UI supports.

## How to fix

Import from `@wso2/oxygen-ui` instead:

- `@mui/material`, `@mui/material/styles` and single-component subpaths such as `@mui/material/Button` become named imports from `@wso2/oxygen-ui`. The fix is applied automatically.
- `@mui/x-data-grid`, `@mui/x-date-pickers` and `@mui/x-tree-view` are exposed as the `DataGrid`, `DatePickers` and `TreeView` namespaces, for example `<DataGrid.DataGrid />`.
- `@mui/material/colors` is exposed as the `colors` namespace, for example `colors.deepOrange[500]`.
- `@mui/icons-material` icons should be replaced with icons from `@wso2/oxygen-ui-icons-react`.

These last cases need a manual change, because the import names differ.

## Exceptions

A product can allow a specific MUI package with the rule's `allowedPackages` option, for example a date-picker adapter that Oxygen UI does not re-export. Record the reason with the exception.
