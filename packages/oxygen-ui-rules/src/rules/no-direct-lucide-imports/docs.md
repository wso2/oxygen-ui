## Why

`@wso2/oxygen-ui-icons-react` re-exports every Lucide icon, plus WSO2 and brand icons such as `WSO2`, `GitHub` and `Google`. Importing from `lucide-react` directly ties a product to its own Lucide version, which can differ from the one Oxygen UI ships and tests.

## Impact

- Icons can differ between products, or between pages of one product.
- Bundles can include two versions of Lucide.

## How to fix

Change the import source to `@wso2/oxygen-ui-icons-react`. The icon names are the same, so the fix is applied automatically.

## Exceptions

None. Every Lucide icon is available from `@wso2/oxygen-ui-icons-react`.
