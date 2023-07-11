<p align="center" style="color: #343a40">
  <h1 align="center">@oxygen-ui/react-icons</h1>
</p>
<p align="center" style="font-size: 1.2rem;">React components for Oxygen UI icons.</p>
<div align="center">
  <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@oxygen-ui/react-icons">
  <img alt="npm" src="https://img.shields.io/npm/dw/@oxygen-ui/react-icons">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
</div>

## Installation

### With npm

```bash
npm install @oxygen-ui/react-icons
```

### With pnpm

```bash
pnpm add @oxygen-ui/react-icons
```

### With yarn

```bash
yarn add @oxygen-ui/react-icons
```

## Usage

To use icons from `@oxygen-ui/react-icons`, simply import the desired icon as a React component and use it in your code:

```jsx
import { HomeIcon } from '@oxygen-ui/react-icons';

function CustomHomeIcon() {
  return <HomeIcon fill="#FFFFFF" size={16} />;
}
```

## API

### Icon Components

The `@oxygen-ui/react-icons` package exports all the available icons as React components, which can be used in your app as shown in the example above. The available icons are:

- `HomeIcon`
- `ChevronLeftIcon`
- `ChevronRightIcon`
- ... and more!

> View all available icons at https://wso2.github.io/oxygen-ui/react/?path=/docs/icons-icons-%F0%9F%9A%A7--page.

Each icon component accepts the following props:

- `aria-label`: The aria label to be used for the icon.
- `tabIndex`: The tab index to be used for the icon.
- `verticalAlign`: The vertical alignment to be used for the icon. This prop is optional and defaults to 'text-bottom'.
- `className`: The class name to be applied to the icon. This prop is optional.
- `fill`: The color to be used to fill the icon. This prop is optional.
- `size`: The size of the icon. This prop is optional.
- ... and all the other accepted props for the `svg` element.

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
