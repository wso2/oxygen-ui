# WSO2 Oxygen-UI v3

**WSO2 Oxygen-UI** is the official design system and React component library for WSO2 products, built on top of [Material-UI v7](https://mui.com/material-ui/). It provides a consistent, modern, and accessible user experience across all WSO2 applications, enabling rapid development and seamless integration with the latest frontend technologies.

Oxygen-UI delivers:

- A comprehensive set of ready-to-use UI components, themed for WSO2 brand and product needs
- Full compatibility with Material-UI 7 and its ecosystem
- Support for custom WSO2 components and design patterns
- Easy integration with Vite, Nx, and modern React workflows

# Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v25 or newer recommended)
- [pnpm](https://pnpm.io/) (v10 or newer recommended)

# Usage Example

#### Oxygen UI

If you are using typescript, add `path` config to resolve oxygen-ui types.

```json
{
  "compilerOptions": {
    "paths": {
      "@oxygen-ui/react/*": ["../../node_modules/@oxygen-ui/react/dist/*"],
    },
  }
}
```

Simply import any Material-UI or Oxygen-UI custom component like:

```js
import { OxygenUIThemeProvider, Button } from '@oxygen-ui/react'
```

> Example: `import { Button } from '@oxygen-ui/react'` == `import { Button } from '@mui/material'`

Refer to [Material-UI documentation](https://mui.com/material-ui/all-components/) for component usage details.

#### Oxygen Icons

Simply import any Lucide icons or Oxygen-UI custom icons like:

```javascript
import { Bell, WSO2 } from '@oxygen-ui/react-icons'
```

Example: `import { Bell } from '@oxygen-ui/react-icons'` == `import { Bell } from 'lucide-react'`

Refer to [Lucide documentation](https://lucide.dev/icons) for list icons and for usage details.

# Build Instructions

Install required dependencies:

```sh
pnpm i
```

To build the project and all packages:

```sh
pnpm build
```

To see view the usage instructions:

```sh
pnpm storybook
```

To run the sample app:

```sh
cd samples/oxygen-ui-test-app
pnpm dev
```

# Project Structure

The workspace is organized as follows:

```
oxygen-ui/
├── packages/
│   ├── oxygen-ui-react-icons/             # Oxygen-UI icons library
│   ├── oxygen-ui-react/                # Main Oxygen-UI component library
│   └── ...
├── samples/
│   └── oxygen-ui-test-app/       # Example Vite + React app using Oxygen-UI
├── node_modules/
├── README.md
├── package.json
└── ...
```

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.

---

(c) Copyright 2025 WSO2 LLC.
