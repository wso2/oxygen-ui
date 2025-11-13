# @wso2/esbuild-plugin-inline-css-fonts

ESBuild plugin to inline CSS and embed fonts as base64 data URIs.

## Features

- ✅ Resolves CSS `@import` statements (including from node_modules)
- ✅ Converts font file references to base64 data URIs
- ✅ Injects CSS as a `<style>` tag at runtime
- ✅ Supports `.woff`, `.woff2`, `.ttf`, `.otf`, and `.eot` font formats
- ✅ Zero configuration required
- ✅ TypeScript support

## Installation

```bash
npm install @wso2/esbuild-plugin-inline-css-fonts --save-dev
# or
pnpm add -D @wso2/esbuild-plugin-inline-css-fonts
# or
yarn add -D @wso2/esbuild-plugin-inline-css-fonts
```

## Usage

```typescript
import esbuild from 'esbuild';
import { inlineCSSFontsPlugin } from '@wso2/esbuild-plugin-inline-css-fonts';

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  plugins: [
    inlineCSSFontsPlugin()
  ],
  // ... other options
});
```

### With Options

```typescript
esbuild.build({
  plugins: [
    inlineCSSFontsPlugin({
      styleAttribute: 'data-my-styles',  // Custom attribute for style tag
      verbose: false                      // Disable warnings
    })
  ]
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `styleAttribute` | `string` | `'data-inline-css'` | Attribute name to add to the injected style tag |
| `verbose` | `boolean` | `true` | Whether to log warnings for unresolved imports/fonts |

## How It Works

1. **CSS Resolution**: The plugin intercepts CSS imports and resolves `@import` statements recursively, including imports from `node_modules`
2. **Font Embedding**: All font file references (`url(...)`) are converted to base64 data URIs
3. **Runtime Injection**: The processed CSS is converted to JavaScript that creates and injects a `<style>` tag when the module loads

## Example

**Input** (`src/index.ts`):
```typescript
import './fonts.css';
// ... rest of your code
```

**Input** (`src/fonts.css`):
```css
@import '@fontsource-variable/inter';
```

**Output**: The CSS with all fonts embedded as base64 is automatically injected into the page at runtime.

## Benefits

- 📦 **Single Bundle**: No separate CSS files or font files needed
- 🚀 **Zero Config**: Works out of the box with no additional setup
- 💪 **Font Embedding**: All fonts embedded, no 404 errors or CORS issues
- 🎯 **TypeScript**: Full type safety with TypeScript support

## License

Apache-2.0
