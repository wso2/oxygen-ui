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

The Inter font (`@fontsource-variable/inter`) is included as a dependency and will be installed automatically.

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

## License

Apache-2.0 © WSO2 LLC
