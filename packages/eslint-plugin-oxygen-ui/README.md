# @wso2/eslint-plugin-oxygen-ui

ESLint plugin to enforce Oxygen UI best practices by preventing direct imports from `@mui/*` packages and `lucide-react`.

## Installation

```bash
npm install --save-dev @wso2/eslint-plugin-oxygen-ui
# or
pnpm add -D @wso2/eslint-plugin-oxygen-ui
# or
yarn add -D @wso2/eslint-plugin-oxygen-ui
```

## Usage

### Flat Config (ESLint 9+)

```javascript
import oxygenUIPlugin from '@wso2/eslint-plugin-oxygen-ui';

export default [
  {
    plugins: {
      '@wso2/oxygen-ui': oxygenUIPlugin,
    },
    rules: {
      '@wso2/oxygen-ui/no-direct-mui-imports': 'error',
      '@wso2/oxygen-ui/no-direct-lucide-imports': 'error',
    },
  },
];
```

Or use the recommended config:

```javascript
import oxygenUIPlugin from '@wso2/eslint-plugin-oxygen-ui';

export default [
  oxygenUIPlugin.configs.recommended,
];
```

## Rules

### `no-direct-mui-imports`

Prevents direct imports from MUI packages (`@mui/*`) and points at the Oxygen path import instead.

❌ **Incorrect:**
```javascript
import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
```

✅ **Correct:**
```javascript
import Box from '@wso2/oxygen-ui/Box';
import Stack from '@wso2/oxygen-ui/Stack';
import Button from '@wso2/oxygen-ui/Button';
import { DataGrid } from '@wso2/oxygen-ui/data-grid';
import { AdapterDateFns } from '@wso2/oxygen-ui/date-pickers/AdapterDateFns';
```

The MUI X packages live on the lower-case paths `data-grid`, `date-pickers` and `tree-view`.

The autofix writes path imports:
- A Material UI path import such as `@mui/material/Button` keeps its imports and moves to `@wso2/oxygen-ui/Button`.
- An import from `@mui/material` becomes one import per Oxygen path. It uses the name-to-path map (`@wso2/oxygen-ui/path-map.json`) of the Oxygen version installed in your app, the same map the codemod uses. If that version has no map, or a name is not in it, the import is reported and left for you to fix.
- An MUI X import moves to the matching lower-case Oxygen path.
- Type-only names stay type-only, and a file without semicolons stays without them.

Every fix needs the path map of the installed Oxygen version, and a path import must exist there: a Material UI path the installed version does not have, or a named import that is not on that path, is reported and left for you to fix. The fix is also skipped when the nearest `tsconfig.json` sets `moduleResolution` to `node`, `node10` or `classic`, or sets `module` to `commonjs` without a `moduleResolution`, because those settings cannot resolve path imports. An import with a comment inside it is reported and left alone. An MUI X package that has no Oxygen path, such as `@mui/x-charts`, is reported with a message that says so.

**Options:**
- `suggestedPackage` (string): The package whose paths the fix writes (default: '@wso2/oxygen-ui')
- `allowedPackages` (array): List of MUI packages that are allowed (default: [])

### Flagging barrel imports

The barrel import (`import { Button } from '@wso2/oxygen-ui'`) still works. To flag it in your editor, use ESLint's built-in `no-restricted-imports` rule. No Oxygen rule is needed:

```javascript
export default [
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@wso2/oxygen-ui',
              message: "Import from a path instead, such as '@wso2/oxygen-ui/Button'.",
            },
          ],
        },
      ],
    },
  },
];
```

To rewrite the barrel imports you already have, run `npx @wso2/oxygen-ui-codemod path-imports`. Its `--check` flag fails when one remains.

### `no-direct-lucide-imports`

Prevents direct imports from `lucide-react` and suggests using `@wso2/oxygen-ui-icons-react` instead.

❌ **Incorrect:**
```javascript
import { Settings, Home, User } from 'lucide-react';
```

✅ **Correct:**
```javascript
import { Settings, Home, User } from '@wso2/oxygen-ui-icons-react';
```

**Options:**
- `suggestedPackage` (string): The package to suggest instead of lucide-react (default: '@wso2/oxygen-ui-icons-react')

## Auto-fixing

Both rules support auto-fixing with `eslint --fix`.

## License

Apache-2.0 © WSO2 LLC
