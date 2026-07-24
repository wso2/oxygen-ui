# @wso2/oxygen-ui

WSO2 Oxygen UI React component library - A comprehensive design system powered by Material-UI with TypeScript support.

## Installation

```bash
npm install @wso2/oxygen-ui @emotion/react @emotion/styled @mui/material
# or
yarn add @wso2/oxygen-ui @emotion/react @emotion/styled @mui/material
# or
pnpm add @wso2/oxygen-ui @emotion/react @emotion/styled @mui/material
```

**Note:** The Inter Variable font is automatically bundled and loaded when you import from `@wso2/oxygen-ui`. No additional setup required!

### Peer Dependencies

Make sure to install the required peer dependencies:

```bash
npm install react react-dom @emotion/react @emotion/styled @mui/material @mui/x-data-grid @mui/x-date-pickers @wso2/oxygen-ui-icons-react
```

## Usage

### Material-UI Components

Import and use Material-UI components directly from `@wso2/oxygen-ui`:

```typescript
import { Box, Button, Stack, TextField } from '@wso2/oxygen-ui';

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
import { 
  OxygenUIThemeProvider, 
  ColorSchemeToggle, 
  Layout 
} from '@wso2/oxygen-ui';

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
import { DataGrid } from '@wso2/oxygen-ui';

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
import { DatePickers } from '@wso2/oxygen-ui';

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

### MUI X Charts

Chart components are exported as a namespace:

```typescript
import { Charts } from '@wso2/oxygen-ui';

// Destructure the chart components you need
const { LineChart, BarChart, PieChart } = Charts;

function MyChart() {
  const data = [
    { month: 'Jan', value: 30 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 60 },
  ];

  return (
    <LineChart
      xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
      series={[{ dataKey: 'value', label: 'Sales' }]}
      width={500}
      height={300}
      dataset={data}
    />
  );
}
```

### MUI X Tree View

Tree View components are exported as a namespace:

```typescript
import { TreeView } from '@wso2/oxygen-ui';

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
import { 
  OxygenUIThemeProvider, 
  OxygenTheme, 
  OxygenThemeWithRadialBackground 
} from '@wso2/oxygen-ui';

function App() {
  return (
    <OxygenUIThemeProvider 
      themes={[
        { key: 'default', label: 'Default', theme: OxygenTheme },
        { key: 'radial', label: 'Radial Background', theme: OxygenThemeWithRadialBackground },
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
import { 
  OxygenUIThemeProvider, 
  ThemeSwitcher, 
  OxygenTheme, 
  OxygenThemeWithRadialBackground 
} from '@wso2/oxygen-ui';

function App() {
  return (
    <OxygenUIThemeProvider 
      themes={[
        { key: 'default', label: 'Default', theme: OxygenTheme },
        { key: 'radial', label: 'Radial Background', theme: OxygenThemeWithRadialBackground },
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
import { useThemeSwitcher } from '@wso2/oxygen-ui';

function MyComponent() {
  const { currentTheme, themes, setTheme, isActive } = useThemeSwitcher();

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <button onClick={() => setTheme('radial')}>Switch to Radial</button>
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
- **`font-src 'self' data:`** — The bundled Inter font is embedded as base64 `data:` URIs. Without `data:` in `font-src` (which otherwise falls back to `default-src 'self'`), the browser blocks the fonts even when the style tag itself is allowed.
- **`script-src 'nonce-...'`** — Only required if your app uses MUI's `InitColorSchemeScript`. Oxygen UI does not ship that script.

### Using the `nonce` prop

Pass your server-generated nonce to `OxygenUIThemeProvider`. It is applied to every style tag injected by the styling engine (components, `CssBaseline`, theme styles). The value must match the nonce in your CSP header:

```typescript
import { OxygenUIThemeProvider } from '@wso2/oxygen-ui';

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
import { OxygenUIThemeProvider, createEmotionCache } from '@wso2/oxygen-ui';

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

The bundled CSS — the Inter Variable font styles and the theme CSS — is injected as separate `<style>` tags when the package is imported (before React renders), so the nonce for those tags is resolved from well-known conventions instead of a prop:

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
- `OxygenThemeWithRadialBackground` - Theme variant with radial gradient backgrounds
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
- `Charts` - Namespace containing all Chart components
- `TreeView` - Namespace containing all TreeView components

## TypeScript Support

This package includes full TypeScript definitions. All types from Material-UI and MUI X are also available:

```typescript
import type { ButtonProps, BoxProps } from '@wso2/oxygen-ui';
import { DataGrid } from '@wso2/oxygen-ui';

const { GridColDef } = DataGrid;
type MyGridColDef = typeof GridColDef;
```

## AI-Assisted Development

Oxygen UI ships an agent **skill** that teaches coding agents to set up
and build UIs with the design system — installing the right dependencies and versions,
wiring up `OxygenUIThemeProvider`, and scaffolding pages/layouts that match the canonical
sample app (`samples/oxygen-ui-test-app`).

The skill lives in this package at `.claude/skills/oxygen-ui/` (`SKILL.md` plus bundled
`references/`). When `@wso2/oxygen-ui` is installed in the project, it prefers the package's
version-matched references.

Install it with the [Vercel **skills** CLI](https://github.com/vercel-labs/skills) (Claude
Code, Cursor, GitHub Copilot, and 15+ other agents):

```bash
npx skills add wso2/oxygen-ui
```

Or vendor it by hand from the installed package:

```bash
mkdir -p .claude/skills
cp -r node_modules/@wso2/oxygen-ui/.claude/skills/oxygen-ui .claude/skills/
```

Then just ask your coding agent for UI work in your project ("add a users page with a
searchable table", "scaffold an admin dashboard with a sidebar", "set up Oxygen UI in this
app") and the skill handles the rest. See `.claude/skills/oxygen-ui/README.md` for setup and
the recommended `CLAUDE.md` routing rule.

## License

Apache-2.0 © WSO2 LLC
