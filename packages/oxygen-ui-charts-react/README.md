# @wso2/oxygen-ui-charts-react

WSO2 Oxygen UI Charts library - Powered by [Recharts](https://recharts.org/).

This package provides a comprehensive set of accessible, theme-aware chart components for building data visualizations in WSO2 Oxygen UI applications. It wraps Recharts components with WSO2-specific defaults, simplified configuration APIs, and automatic integration with the Oxygen UI system.

## Features

- **Theme Aware**: Automatically adapts to Oxygen UI light and dark modes.
- **Simplified API**: Use configuration objects (`bars`, `lines`, `pies`) to render charts with less boilerplate.
- **Composition Ready**: Supports standard Recharts composition pattern for complex, custom use cases.
- **Accessible**: Built-in accessibility features and ARIA attributes.
- **TypeScript**: First-class TypeScript support with comprehensive type definitions.

## Installation

Install the package:

```bash
pnpm add @wso2/oxygen-ui-charts-react
```

This will automatically install all required dependencies. If you're using npm or yarn, you may need to install peer dependencies manually:

```bash
pnpm add @wso2/oxygen-ui-charts-react @wso2/oxygen-ui
```

### Dependencies

This package includes:

- **recharts** (3.3.0) - Bundled as a dependency

### Peer Dependencies

This package requires the following peer dependencies (automatically installed with pnpm):

- `@wso2/oxygen-ui` (workspace:^)
- `react`
- `react-dom`
- `react-is` (19.0.0)

## Usage Patterns

You can use this library in two ways depending on your needs:

### 1. Configuration Pattern (Recommended)

The configuration pattern allows you to define chart series (bars, lines, areas, etc.) using a simple array prop. This reduces boilerplate and keeps your code clean.

#### Example: Stacked Bar Chart

```jsx
import { BarChart } from '@wso2/oxygen-ui-charts-react'

const data = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
]

function StackedBarChart() {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      xAxisDataKey="name"
      bars={[
        { dataKey: 'pv', name: 'Page Views', fill: '#8884d8', stackId: 'a' },
        { dataKey: 'uv', name: 'Unique Visitors', fill: '#82ca9d', stackId: 'a' },
      ]}
    />
  )
}
```

### 2. Composition Pattern (Advanced)

For advanced customization, you can use the standard Recharts composition pattern. Specifically useful when you need custom tooltips, specific legend formatting, complex layouts, or custom SVG elements.

#### Example: Custom Composition

```jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from '@wso2/oxygen-ui-charts-react'

function CustomSalesChart() {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* Manually render Bar components for full control */}
      <Bar dataKey="pv" fill="#8884d8" radius={[4, 4, 0, 0]} />
      <Bar dataKey="uv" fill="#82ca9d" radius={[4, 4, 0, 0]} />
    </BarChart>
  )
}
```

## Theming

Charts automatically detect the active Oxygen UI theme mode (light or dark) and adjust:

- **Axis Lines & Text**: Automatically contrast with the background.
- **Grid Lines**: Subtle visibility optimized for the mode.
- **Tooltips**: Styled to match the Oxygen UI Popover/Tooltip styles.
- **Default Check Colors**: Fallback colors are provided if no specific fill/stroke is defined.

No extra configuration is required if your app is wrapped in an Oxygen UI `ThemeProvider`.

## Component API

### Common Props

All Chart components (`BarChart`, `LineChart`, etc.) share these base props:

| Prop         | Type                | Description                                                  |
| ------------ | ------------------- | ------------------------------------------------------------ |
| `data`     | `any[]`           | Array of data objects.                                       |
| `width`    | `number \| string` | Chart width (default: '100%').                               |
| `height`   | `number \| string` | Chart height (default: 300).                                 |
| `margin`   | `object`          | Margin around the chart content.                             |
| `xAxis`    | `object`          | Configuration for XAxis (`{ show: true, name: '...' }`).   |
| `yAxis`    | `object`          | Configuration for YAxis.                                     |
| `legend`   | `object`          | Configuration for Legend (`{ show: true, align: '...' }`). |
| `grid`     | `object`          | Configuration for CartesianGrid (`{ show: true }`).        |
| `children` | `ReactNode`       | Children for composition pattern.                            |

### Event Handlers

Charts support the following mouse events (passed to the wrapper or individual series config):

- `onClick`
- `onMouseEnter`
- `onMouseLeave`
- `onMouseDown`
- `onMouseUp`
- `onMouseMove`

---

## Exported Components

This package re-exports all major Recharts components for flexibility.

**Charts:**

- `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialBarChart`

**Helpers:**

- `ResponsiveContainer`, `Legend`, `Tooltip`, `Cell`, `Label`, `LabelList`
- `XAxis`, `YAxis`, `ZAxis`, `PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`
- `CartesianGrid`, `ReferenceLine`, `ReferenceDot`, `ReferenceArea`, `Brush`

## License

See the main [Oxygen UI repository](https://github.com/wso2/oxygen-ui) for license information.

## Contributing

See the main [Oxygen UI repository](https://github.com/wso2/oxygen-ui) for contribution guidelines.
