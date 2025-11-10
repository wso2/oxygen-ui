# @oxygen-ui/eslint-plugin

ESLint plugin to enforce Oxygen UI best practices by preventing direct imports from `@mui/material` and `lucide-react`.

## Installation

```bash
npm install --save-dev @oxygen-ui/eslint-plugin
# or
pnpm add -D @oxygen-ui/eslint-plugin
# or
yarn add -D @oxygen-ui/eslint-plugin
```

## Usage

### Flat Config (ESLint 9+)

```javascript
import oxygenUIPlugin from '@oxygen-ui/eslint-plugin';

export default [
  {
    plugins: {
      '@oxygen-ui': oxygenUIPlugin,
    },
    rules: {
      '@oxygen-ui/no-direct-mui-imports': 'error',
      '@oxygen-ui/no-direct-lucide-imports': 'error',
    },
  },
];
```

Or use the recommended config:

```javascript
import oxygenUIPlugin from '@oxygen-ui/eslint-plugin';

export default [
  oxygenUIPlugin.configs.recommended,
];
```

## Rules

### `no-direct-mui-imports`

Prevents direct imports from all MUI packages (`@mui/*`) and suggests using `@oxygen-ui/react` instead.

❌ **Incorrect:**
```javascript
import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
```

✅ **Correct:**
```javascript
// Standard Material-UI components
import { Box, Stack, Button } from '@oxygen-ui/react';

// MUI X Data Grid components (namespace export)
import { DataGrid } from '@oxygen-ui/react';
const { DataGrid: Grid } = DataGrid;

// MUI X Date Pickers components (namespace export)
import { DatePickers } from '@oxygen-ui/react';
const { DatePicker } = DatePickers;
```

**Options:**
- `suggestedPackage` (string): The package to suggest instead of @mui/material (default: '@oxygen-ui/react')
- `allowedPackages` (array): List of MUI packages that are allowed (default: [])

### `no-direct-lucide-imports`

Prevents direct imports from `lucide-react` and suggests using `@oxygen-ui/react-icons` instead.

❌ **Incorrect:**
```javascript
import { Settings, Home, User } from 'lucide-react';
```

✅ **Correct:**
```javascript
import { Settings, Home, User } from '@oxygen-ui/react-icons';
```

**Options:**
- `suggestedPackage` (string): The package to suggest instead of lucide-react (default: '@oxygen-ui/react-icons')

## Auto-fixing

Both rules support auto-fixing with `eslint --fix`.

## License

Apache-2.0 © WSO2 LLC
