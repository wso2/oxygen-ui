<p align="center" style="color: #343a40">
  <h1 align="center">@oxygen-ui/primitives</h1>
</p>
<p align="center" style="font-size: 1.2rem;">Contains common design primitives such as design tokens, fonts, and icons for Oxygen UI.</p>

<div align="center">
  <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@oxygen-ui/primitives">
  <img alt="npm" src="https://img.shields.io/npm/dw/@oxygen-ui/primitives">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
</div>

## Installation

To install `@oxygen-ui/primitives`, run the following command:

```sh
# With npm
npm install @oxygen-ui/primitives

# With pnpm
pnpm add @oxygen-ui/primitives

# With yarn
yarn add @oxygen-ui/primitives
```

## Usage

Here's an example of how to use the `@oxygen-ui/primitives` package:

### Design Tokens

You can import the design tokens by referencing the `@oxygen-ui/primitives/dist/design-tokens` directory. For example:

```js
import tokens from '@oxygen-ui/primitives/dist/design-tokens/web/oxygen/es/tokens';

export const Theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: tokens.OxygenColorsPrimaryDefault,
        },
      },
    }
  }
}
```

### Icons

To use the icons, you can import the generated JSON data from `@oxygen-ui/primitives/dist/icons/data.json`. For example:

```js
const oxygenIcons = require('@oxygen-ui/primitives/dist/icons/data.json');
```

> **Note**
> These icons are exported in a low level agnostic manner and are not meant to be used directly in your application.
> Instead, you should use the framework specific wrappers such as `@oxygen-ui/react-icons`.
> New libraries like `@oxygen-ui/vue-icons` or `@oxygen-ui/icon-font` could be written in the future by using the exported JSON data.

### API
`@oxygen-ui/primitives` does not export any APIs as of now, but instead provides a set of low level components for use in Oxygen UI.

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
