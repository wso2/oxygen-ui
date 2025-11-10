# @oxygen-ui/react

WSO2 Oxygen UI React component library - A comprehensive design system powered by Material-UI with TypeScript support.

## Installation

```bash
npm install @oxygen-ui/react
# or
yarn add @oxygen-ui/react
# or
pnpm add @oxygen-ui/react
```

### Peer Dependencies

Make sure to install the required peer dependencies:

```bash
npm install react react-dom @emotion/react @emotion/styled @mui/material @mui/x-data-grid @mui/x-date-pickers @fontsource-variable/inter @oxygen-ui/react-icons
```

## Usage

### Material-UI Components

Import and use Material-UI components directly from `@oxygen-ui/react`:

```typescript
import { Box, Button, Stack, TextField } from '@oxygen-ui/react';

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
} from '@oxygen-ui/react';

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
import { DataGrid } from '@oxygen-ui/react';

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
import { DatePickers } from '@oxygen-ui/react';

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

## Available Exports

### Custom Oxygen UI Components
- `OxygenTheme` - Theme configuration
- `OxygenUIThemeProvider` - Theme provider component
- `ColorSchemeImage` - Image component that adapts to color scheme
- `ColorSchemeToggle` - Toggle for light/dark mode
- `Layout` - Layout components

### Material-UI Components
All components from `@mui/material` are re-exported directly.

### MUI X Components
- `DataGrid` - Namespace containing all Data Grid components
- `DatePickers` - Namespace containing all Date Picker components

## TypeScript Support

This package includes full TypeScript definitions. All types from Material-UI and MUI X are also available:

```typescript
import type { ButtonProps, BoxProps } from '@oxygen-ui/react';
import { DataGrid } from '@oxygen-ui/react';

const { GridColDef } = DataGrid;
type MyGridColDef = typeof GridColDef;
```

## License

Apache-2.0 © WSO2 LLC
