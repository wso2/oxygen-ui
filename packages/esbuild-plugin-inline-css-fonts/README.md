# @wso2/esbuild-plugin-inline-css-fonts

ESBuild plugin to inline CSS and embed fonts as base64 data URIs.

## Features

- ✅ Resolves CSS `@import` statements (including from node_modules)
- ✅ Converts font file references to base64 data URIs
- ✅ Injects CSS as a `<style>` tag at runtime
- ✅ CSP-compatible: applies a nonce to the injected style tag when available
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

## Content Security Policy (CSP)

If the consuming application enforces a strict `style-src` / `style-src-elem` CSP directive, the injected `<style>` tag needs a nonce. Because injection happens at module load time (before any framework renders), the nonce is resolved from well-known conventions, in order:

1. The `__webpack_nonce__` global ([webpack convention](https://webpack.js.org/guides/csp/))
2. A `<meta property="csp-nonce" nonce="...">` tag in the document ([Vite convention](https://vite.dev/guide/features.html#content-security-policy-csp)); `content` is also accepted as a fallback
3. A `<meta name="csp-nonce" content="...">` tag ([MUI / Next.js convention](https://mui.com/material-ui/guides/content-security-policy/))

If none are present, the style tag is injected without a nonce (unchanged behavior).

Because the nonce is read at module evaluation time, the meta tag (or the `__webpack_nonce__` assignment) must already be present in the document before the bundle executes — a meta tag added later from JavaScript results in a style tag without a nonce.

```html
<!-- Vite convention -->
<meta property="csp-nonce" nonce="YOUR_SERVER_GENERATED_NONCE" />

<!-- MUI / Next.js convention -->
<meta name="csp-nonce" content="YOUR_SERVER_GENERATED_NONCE" />
```

Since fonts are embedded as base64 `data:` URIs, the CSP must also allow them via `font-src`, e.g. `font-src 'self' data:;` — otherwise `font-src` falls back to `default-src 'self'` and the browser blocks the embedded fonts even when the style tag itself is allowed.

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
