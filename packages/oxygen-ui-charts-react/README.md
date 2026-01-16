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

```bash
pnpm add @wso2/oxygen-ui-charts-react
```

## Usage Patterns

You can use this library in two ways depending on your needs:

### 1. Configuration Pattern (Recommended)

The configuration pattern allows you to define chart series (bars, lines, areas, etc.) using a simple array prop. This reduces boilerplate and keeps your code clean.

