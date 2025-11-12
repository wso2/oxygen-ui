# Oxygen UI Test App

This is a sample Vite + React + TypeScript application demonstrating the usage of WSO2 Oxygen UI components.

## Features

This test app showcases:
- Integration of `@wso2/oxygen-ui` components
- Usage of `@wso2/oxygen-ui-icons-react` for icons
- Theme customization with `OxygenUIThemeProvider`
- MUI X Data Grid and Date Pickers integration
- TypeScript configuration for Oxygen UI

## Getting Started

### Prerequisites

- Node.js 24+ 
- pnpm 10+

### Installation

From the test app directory:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Create a production build:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Project Structure

```
oxygen-ui-test-app/
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── ...
├── public/               # Static assets
├── index.html
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## Using Oxygen UI Components

### Basic Components

```tsx
import { Button, TextField, Box, Stack } from '@wso2/oxygen-ui';

function MyComponent() {
  return (
    <Box>
      <Stack spacing={2}>
        <TextField label="Name" />
        <Button variant="contained">Submit</Button>
      </Stack>
    </Box>
  );
}
```

### Icons

```tsx
import { Settings, User, LogOut } from '@wso2/oxygen-ui-icons-react';

function Toolbar() {
  return (
    <div>
      <Settings size={20} />
      <User size={20} />
      <LogOut size={20} />
    </div>
  );
}
```

### Theme Provider

```tsx
import { OxygenUIThemeProvider } from '@wso2/oxygen-ui';

function App() {
  return (
    <OxygenUIThemeProvider>
      {/* Your app components */}
    </OxygenUIThemeProvider>
  );
}
```

## Technologies Used

- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/)
- [@wso2/oxygen-ui](../../packages/oxygen-ui/README.md) - WSO2 Oxygen UI component library
- [@wso2/oxygen-ui-icons-react](../../packages/oxygen-ui-icons-react/README.md) - Icon library
- [@wso2/eslint-plugin-oxygen-ui](../../packages/eslint-plugin-oxygen-ui/README.md) - ESLint plugin
- [@wso2/vite-plugin-oxygen-ui](../../packages/vite-plugin-oxygen-ui/README.md) - Vite plugin

## ESLint Configuration

This project uses the Oxygen UI ESLint plugin to enforce best practices:

```javascript
import oxygenUIPlugin from '@wso2/eslint-plugin-oxygen-ui';

export default [
  oxygenUIPlugin.configs.recommended,
];
```

This prevents direct imports from `@mui/*` and `lucide-react` packages.

## Learn More

- [Oxygen UI Documentation](../../README.md)
- [Material-UI Documentation](https://mui.com/material-ui/)
- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
