# @wso2/oxygen-ui

Choreo Oxygen UI React component library - A comprehensive design system powered by Material-UI with TypeScript support.

## Installation

```bash
npm install @wso2/oxygen-ui @emotion/react @emotion/styled @mui/material
# or
yarn add @wso2/oxygen-ui @emotion/react @emotion/styled @mui/material
# or
pnpm add @wso2/oxygen-ui @emotion/react @emotion/styled @mui/material
```

**Note:** The Inter Variable and Sora Variable fonts are bundled and load with any Oxygen theme. No additional setup required, whichever way you import.

### Peer Dependencies

Make sure to install the required peer dependencies:

```bash
npm install react react-dom @emotion/react @emotion/styled @mui/material @mui/x-data-grid @mui/x-date-pickers @wso2/oxygen-ui-icons-react
```

## Usage

### Path imports

Import each component from its own path. A path import adds only that component and what it uses to your bundle, and it keeps your dev server from loading the whole package:

```typescript
import Button from '@wso2/oxygen-ui/Button';
import TextField from '@wso2/oxygen-ui/TextField';
```

A path gives the component as its default export, with its parts, hook and types beside it as named exports. `@wso2/oxygen-ui/TextField` and `@wso2/oxygen-ui/Select` give Oxygen's components, the same objects the barrel gives.

The barrel, `import { Button } from '@wso2/oxygen-ui'`, is still supported and is not deprecated. A barrel import is tree-shaken per module, so you can keep it and migrate when you choose.

Path imports need `moduleResolution` set to `bundler`, `node16` or `nodenext` in your `tsconfig.json`. An app on the legacy `node` setting keeps resolving the barrel.

#### Other paths

| Path | Gives |
| --- | --- |
| `@wso2/oxygen-ui/<Component>` | An Oxygen component or a re-exported Material UI component, with its parts, hook and types |
| `@wso2/oxygen-ui/<ThemeName>` | One theme as the default export, such as `OxygenTheme` or `AcrylicOrangeTheme` |
| `@wso2/oxygen-ui/OxygenUIThemeProvider` | The provider, plus `useThemeSwitcher`, its types and `createEmotionCache` |
| `@wso2/oxygen-ui/useAppShell`, `useNotifications`, `useThemeContent` | One shared hook |
| `@wso2/oxygen-ui/styles` | Material UI's `styles`, plus `createOxygenTheme`, `pxToRem` and `OxygenThemeType` |
| `@wso2/oxygen-ui/utils` | Material UI's `utils`, plus `formatRelativeTime` |
| `@wso2/oxygen-ui/colors`, `Layout`, `ParticleBackground`, `version` | The matching barrel export |
| `@wso2/oxygen-ui/data-grid` | All of MUI X Data Grid |
| `@wso2/oxygen-ui/date-pickers` | All of MUI X date pickers |
| `@wso2/oxygen-ui/date-pickers/AdapterDateFns` | A date adapter, with one path per first-party adapter |
| `@wso2/oxygen-ui/tree-view` | All of MUI X Tree View |

The MUI X paths are lower-case, so you can tell a package from a component at a glance. Import them as namespaces, as in the sections below.

`@wso2/oxygen-ui/path-map.json` records, for every name on the barrel, the path it lives on.

### Migrating from barrel imports

`@wso2/oxygen-ui-codemod` rewrites the barrel imports in your app to path imports in one step. Nothing to install and nothing to remove afterwards:

```bash
npx @wso2/oxygen-ui-codemod path-imports
```

It reads the name-to-path map of the `@wso2/oxygen-ui` installed in your app, so it never writes a path your version does not have. It keeps type-only imports type-only, keeps `as` renames, and rewrites barrel re-exports too. A whole-barrel namespace import, a dynamic import and a `require` are reported and left alone. A file that imports a name the map does not have is left untouched and reported.

In CI, check mode writes nothing, lists every barrel import that remains, and exits non-zero if there is any:

```bash
npx @wso2/oxygen-ui-codemod path-imports --check
```

The `no-direct-mui-imports` rule of `@wso2/eslint-plugin-oxygen-ui` fixes direct Material UI imports into Oxygen path imports.

### Material-UI Components

Re-exported Material UI components come from Oxygen paths too, so an app never needs to import from `@mui/material`:

```typescript
import Box from '@wso2/oxygen-ui/Box';
import Button from '@wso2/oxygen-ui/Button';
import Stack from '@wso2/oxygen-ui/Stack';
import TextField from '@wso2/oxygen-ui/TextField';

function MyComponent() {
  return (
    <Box>
      <Stack spacing={2}>
        <Button variant="contained">Click me</Button>
        <TextField label="Name" />
      </Stack>
    </Box>
  );
}
```

### Oxygen UI Custom Components

```typescript
import OxygenUIThemeProvider from '@wso2/oxygen-ui/OxygenUIThemeProvider';
import ColorSchemeToggle from '@wso2/oxygen-ui/ColorSchemeToggle';
import Layout from '@wso2/oxygen-ui/Layout';

function App() {
  return (
    <OxygenUIThemeProvider>
      <Layout>
        <ColorSchemeToggle />
        {/* Your app content */}
      </Layout>
    </OxygenUIThemeProvider>
  );
}
```

### MUI X Data Grid

Data Grid components are exported as a namespace to avoid naming conflicts:

```typescript
import * as DataGrid from '@wso2/oxygen-ui/data-grid';

// Destructure the components you need
const { 
  DataGrid: DataGridComponent, 
  GridColDef, 
  GridToolbarContainer 
} = DataGrid;

function MyDataGrid() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
  ];

  const rows = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  return (
    <DataGridComponent
      rows={rows}
      columns={columns}
    />
  );
}
```

### MUI X Date Pickers

Date Picker components are exported as a namespace:

```typescript
import * as DatePickers from '@wso2/oxygen-ui/date-pickers';

// Destructure the components you need
const { 
  DatePicker, 
  LocalizationProvider, 
  DateTimePicker 
} = DatePickers;

function MyDatePicker() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}
```

### MUI X Tree View

Tree View components are exported as a namespace:

```typescript
import * as TreeView from '@wso2/oxygen-ui/tree-view';

// Destructure the tree components you need
const { SimpleTreeView, TreeItem } = TreeView;

function MyTreeView() {
  return (
    <SimpleTreeView>
      <TreeItem itemId="1" label="Parent 1">
        <TreeItem itemId="2" label="Child 1.1" />
        <TreeItem itemId="3" label="Child 1.2" />
      </TreeItem>
      <TreeItem itemId="4" label="Parent 2">
        <TreeItem itemId="5" label="Child 2.1" />
      </TreeItem>
    </SimpleTreeView>
  );
}
```

## Theme Switching

Oxygen UI provides built-in theme switching capabilities through `OxygenUIThemeProvider` and UI components for easy theme selection.

### Basic Setup

Pass a `themes` array to `OxygenUIThemeProvider`:

```typescript
import OxygenUIThemeProvider from '@wso2/oxygen-ui/OxygenUIThemeProvider';
import OxygenTheme from '@wso2/oxygen-ui/OxygenTheme';
import AcrylicOrangeTheme from '@wso2/oxygen-ui/AcrylicOrangeTheme';

function App() {
  return (
    <OxygenUIThemeProvider 
      themes={[
        { key: 'default', label: 'Default', theme: OxygenTheme },
        { key: 'acrylic', label: 'Acrylic Orange', theme: AcrylicOrangeTheme },
      ]}
      initialTheme="default"
    >
      <YourApp />
    </OxygenUIThemeProvider>
  );
}
```

### Using ThemeSwitcher Component

Add the `ThemeSwitcher` component to provide a select dropdown:

```typescript
import OxygenUIThemeProvider from '@wso2/oxygen-ui/OxygenUIThemeProvider';
import ThemeSwitcher from '@wso2/oxygen-ui/ThemeSwitcher';
import OxygenTheme from '@wso2/oxygen-ui/OxygenTheme';
import AcrylicOrangeTheme from '@wso2/oxygen-ui/AcrylicOrangeTheme';

function App() {
  return (
    <OxygenUIThemeProvider 
      themes={[
        { key: 'default', label: 'Default', theme: OxygenTheme },
        { key: 'acrylic', label: 'Acrylic Orange', theme: AcrylicOrangeTheme },
      ]}
    >
      <header>
        <ThemeSwitcher />  {/* Default select dropdown */}
      </header>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}
```

### Custom Theme Switcher UI

Use render props for custom UI:

```typescript
<ThemeSwitcher>
  {({ currentTheme, themes, setTheme, isActive }) => (
    <ButtonGroup>
      {themes.map(theme => (
        <Button
          key={theme.key}
          variant={isActive(theme.key) ? 'contained' : 'outlined'}
          onClick={() => setTheme(theme.key)}
        >
          {theme.label}
        </Button>
      ))}
    </ButtonGroup>
  )}
</ThemeSwitcher>
```

### Custom Themes

Add your own custom themes:

```typescript
import { extendTheme } from '@mui/material/styles';

const customTheme = extendTheme({
  palette: {
    primary: { main: '#ff0000' },
  },
});

function App() {
  return (
    <OxygenUIThemeProvider
      themes={[
        { key: 'default', label: 'Default', theme: OxygenTheme },
        { key: 'custom', label: 'Custom Theme', theme: customTheme },
      ]}
    >
      <ThemeSwitcher showLabel label="Select Theme" />
      <YourApp />
    </OxygenUIThemeProvider>
  );
}
```

### Programmatic Access

Use the `useThemeSwitcher` hook to access theme state:

```typescript
import { useThemeSwitcher } from '@wso2/oxygen-ui/OxygenUIThemeProvider';

function MyComponent() {
  const { currentTheme, themes, setTheme, isActive } = useThemeSwitcher();

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <button onClick={() => setTheme('acrylic')}>Switch to Acrylic Orange</button>
    </div>
  );
}
```

## Content Security Policy (CSP)

Oxygen UI (via MUI and Emotion) injects styles at runtime using `<style>` tags. If your application enforces a strict CSP, pass a nonce so those tags are allowed. Follow the same directives recommended in the [MUI Content Security Policy guide](https://mui.com/material-ui/guides/content-security-policy/):

```text
Content-Security-Policy:
  default-src 'self';
  style-src-elem 'self' 'nonce-<value>';
  style-src-attr 'unsafe-inline';
  font-src 'self' data:;
```

- **`style-src-elem`** — Emotion injects `<style>` elements; each needs a matching nonce.
- **`style-src-attr 'unsafe-inline'`** — MUI components apply dynamic inline `style` attributes (dimensions, CSS custom properties, positioning). Nonces cannot cover style attributes.
- **`font-src 'self' data:`** — The bundled Sora and Inter fonts are embedded as base64 `data:` URIs. Without `data:` in `font-src` (which otherwise falls back to `default-src 'self'`), the browser blocks the fonts even when the style tag itself is allowed.
- **`script-src 'nonce-...'`** — Only required if your app uses MUI's `InitColorSchemeScript`. Oxygen UI does not ship that script.

### Using the `nonce` prop

Pass your server-generated nonce to `OxygenUIThemeProvider`. It is applied to every style tag injected by the styling engine (components, `CssBaseline`, theme styles). The value must match the nonce in your CSP header:

```typescript
import OxygenUIThemeProvider from '@wso2/oxygen-ui/OxygenUIThemeProvider';

// `serverNonce` is generated per request on the server and must match the CSP header.
function App({ serverNonce }: { serverNonce: string }) {
  return (
    <OxygenUIThemeProvider nonce={serverNonce}>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}
```

### Using a custom Emotion cache

For full control over style injection (cache key, insertion point, stylis plugins, shadow DOM containers, SSR caches), pass a custom Emotion cache. `createEmotionCache` is re-exported from `@emotion/cache` for convenience.

Set `prepend: true` to preserve the previous `injectFirst` cascade (application styles can override Oxygen UI styles). Omitting it changes style order.

```typescript
import OxygenUIThemeProvider, { createEmotionCache } from '@wso2/oxygen-ui/OxygenUIThemeProvider';

const cache = createEmotionCache({
  key: 'css',
  nonce: serverNonce,
  prepend: true,
});

function App() {
  return (
    <OxygenUIThemeProvider emotionCache={cache}>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}
```

`emotionCache` takes precedence over `nonce` if both are provided.

Note that the `nonce` prop creates an Emotion cache per provider instance. If your app mounts multiple providers or remounts the provider (for example, on route-level key changes), each mount injects a fresh set of style tags. In that case, prefer a module-level cache passed via `emotionCache` (as in the example above) so styles are injected only once.

### Server-side rendering (SSR)

Generate a unique nonce per request on the server, include it in the CSP header, and pass the same value to `OxygenUIThemeProvider` via `nonce` or a shared `emotionCache` on both server and client. Keep server and client Emotion caches aligned (same key, nonce, and insertion options). See the [MUI CSP guide](https://mui.com/material-ui/guides/content-security-policy/) for framework-specific examples (Next.js, Vite, and Emotion SSR).

### Bundled fonts and theme CSS

The bundled CSS — the Sora and Inter Variable font styles and the theme CSS — is injected as separate `<style>` tags when the module that holds it is imported (before React renders), so the nonce for those tags is resolved from well-known conventions instead of a prop:

1. The `__webpack_nonce__` global ([webpack convention](https://webpack.js.org/guides/csp/))
2. A `<meta property="csp-nonce" nonce="...">` tag ([Vite convention](https://vite.dev/guide/features.html#content-security-policy-csp)); `content` is also accepted as a fallback
3. A `<meta name="csp-nonce" content="...">` tag ([MUI / Next.js convention](https://mui.com/material-ui/guides/content-security-policy/))

Because the nonce is read at module evaluation time, the meta tag (or the `__webpack_nonce__` assignment) must already be present in the document before the app bundle executes. A meta tag added later from JavaScript silently results in style tags without a nonce.

```html
<!-- Vite convention -->
<meta property="csp-nonce" nonce="YOUR_SERVER_GENERATED_NONCE" />

<!-- MUI / Next.js convention -->
<meta name="csp-nonce" content="YOUR_SERVER_GENERATED_NONCE" />
```

### Known limitation: runtime theme loading

Loading themes from URLs (`themes: [{ key: 'x', label: 'X', theme: '/themes/x.js' }]`) evaluates the fetched theme file with `new Function(...)`, which additionally requires `script-src 'unsafe-eval'`. Under a strict CSP, prefer passing theme objects directly instead of URL-based themes.

## Available Exports

### Custom Oxygen UI Components

- `OxygenTheme` - Default theme configuration
- `AcrylicOrangeTheme`, `AcrylicPurpleTheme`, `ClassicTheme`, `HighContrastTheme`, `PaleBaseTheme`, `PaleGrayTheme`, `PaleIndigoTheme` - Alternative themes
- `OxygenUIThemeProvider` - Theme provider component with theme switching support
- `ThemeSwitcher` - Theme selection component (default select dropdown or render props)
- `ThemeSelect` - Standalone theme select dropdown component
- `ColorSchemeImage` - Image component that adapts to color scheme
- `ColorSchemeToggle` - Toggle for light/dark mode
- `Layout` - Layout components
- `useThemeSwitcher` - Hook to access theme switcher context
- `createEmotionCache` - Create a custom Emotion cache (re-export of `@emotion/cache`, for CSP and advanced style injection)
- `EmotionCache` - Type for Emotion cache instances

### Material-UI Components

All components from `@mui/material` are re-exported directly.

### MUI X Components

- `DataGrid` - Namespace containing all Data Grid components
- `DatePickers` - Namespace containing all Date Picker components
- `TreeView` - Namespace containing all TreeView components

## TypeScript Support

This package includes full TypeScript definitions. All types from Material-UI and MUI X are also available:

```typescript
import type { ButtonProps } from '@wso2/oxygen-ui/Button';
import type { BoxProps } from '@wso2/oxygen-ui/Box';
import * as DataGrid from '@wso2/oxygen-ui/data-grid';

const { GridColDef } = DataGrid;
type MyGridColDef = typeof GridColDef;
```

## AI-Assisted Development

Oxygen UI includes built-in documentation for AI assistants.

### Universal Setup (Works with any AI)

```bash
npx @wso2/oxygen-ui init
```

Creates:
- `AGENTS.md` - Streamlined AI guide at project root
- `.ai/oxygen-ui/` - Detailed documentation:
  - `components.md` - Component API reference
  - `patterns.md` - Common UI patterns
  - `theming.md` - Theme customization
  - `migration.md` - Migration guide

### Claude Code Setup (Recommended for Claude)

```bash
npx @wso2/oxygen-ui init --claude
```

Creates:
- `.claude/oxygen-ui/` - Claude-optimized documentation
- `.claude/skills/` - Invokable skills:
  - `/oxygen-component` - Generate Oxygen UI components
  - `/oxygen-layout` - Generate app layouts
  - `/oxygen-form` - Generate forms with validation
  - `/oxygen-textfield` - Use fixed-label text fields instead of floating labels
  - `/oxygen-select` - Use fixed-label selects instead of floating labels
  - `/oxygen-migrate` - Migrate MUI code
- Updates root `CLAUDE.md` with reference

### Updating After Upgrade

```bash
npx @wso2/oxygen-ui update           # Universal
npx @wso2/oxygen-ui update --claude  # Claude-specific
```

### AI Documentation

For detailed information, see the generated files:
- Components: `.ai/oxygen-ui/components.md` or `.claude/oxygen-ui/components.md`
- Patterns: `.ai/oxygen-ui/patterns.md` or `.claude/oxygen-ui/patterns.md`
- Theming: `.ai/oxygen-ui/theming.md` or `.claude/oxygen-ui/theming.md`
- Migration: `.ai/oxygen-ui/migration.md` or `.claude/oxygen-ui/migration.md`

## License

Apache-2.0 © WSO2 LLC
