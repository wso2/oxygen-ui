# @wso2/vite-plugin-oxygen-ui

A Vite plugin that provides optimized module resolution for `@wso2/oxygen-ui` imports, enabling efficient tree-shaking and build optimization.

## What it does

This plugin creates aliases for individual Material-UI component imports through the Oxygen UI package. It maps:

```
@wso2/oxygen-ui/Button  →  @mui/material/Button
@wso2/oxygen-ui/TextField  →  @mui/material/TextField
```

This enables:
- **Better tree-shaking** - Only the components you use are bundled
- **Faster builds** - Direct imports skip unnecessary bundling steps
- **Smaller bundle size** - Unused components are excluded

## Installation

```bash
pnpm add -D @wso2/vite-plugin-oxygen-ui
```

## Usage

Add the plugin to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import oxygenUIPlugin from '@wso2/vite-plugin-oxygen-ui';

export default defineConfig({
  plugins: [
    react(),
    oxygenUIPlugin(),
  ],
});
```

## How to import components

### Named imports (Recommended)
```jsx
import { Button, TextField, Box } from '@wso2/oxygen-ui';
```

### Direct imports (Also works)
```jsx
import Button from '@wso2/oxygen-ui/Button';
import TextField from '@wso2/oxygen-ui/TextField';
```

Both approaches benefit from the plugin's optimizations.

## Custom Components

Custom Oxygen UI components (not from Material-UI) are handled by the `@wso2/oxygen-ui` package itself and don't need special aliasing.

## TypeScript Support

If you're using TypeScript, ensure your `tsconfig.json` includes proper path mappings:

```json
{
  "compilerOptions": {
    "paths": {
      "@wso2/oxygen-ui": ["./node_modules/@wso2/oxygen-ui/dist/index.d.ts"],
      "@wso2/oxygen-ui/*": ["./node_modules/@wso2/oxygen-ui/dist/*"]
    }
  }
}
```

## How it works

The plugin:
1. Reads the `@mui/material` directory to discover all available components
2. Creates Vite aliases for each component path
3. At build time, Vite resolves `@wso2/oxygen-ui/Button` directly to `@mui/material/Button`

This means your production bundle only includes the Material-UI components you actually use, resulting in optimal bundle size.

## License

Apache-2.0

## Contributing

See the main [Oxygen UI repository](https://github.com/wso2/oxygen-ui) for contribution guidelines.
