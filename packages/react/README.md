<p align="center" style="color: #343a40">
  <h1 align="center">@oxygen-ui/react</h1>
</p>
<p align="center" style="font-size: 1.2rem;">The React implementation of the Oxygen Design System.</p>

<div align="center">
  <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@oxygen-ui/react">
  <img alt="npm" src="https://img.shields.io/npm/dw/@oxygen-ui/react">
  <a href="https://github.com/storybooks/storybook" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
</div>

## Installation

```bash
# With npm
npm install @oxygen-ui/react

# With pnpm
pnpm add @oxygen-ui/react

# With yarn
yarn add @oxygen-ui/react
```

## Usage

### ThemeProvider

The `ThemeProvider` component is a wrapper around the Material UI's [CSSVarProvider](https://mui.com/material-ui/experimental-api/css-theme-variables/usage/#getting-started) and should be used at the root level of your application to provide a theme to all Oxygen UI components.

```jsx
import React from 'react';
import { ThemeProvider, extendTheme } from '@oxygen-ui/react';

const MyThemeProvider = ({ children }) => {
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#FF5499',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#FF5456',
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MyThemeProvider;
```

### Components: `Button`

Here's an example of how to use the `Button` component:

```jsx
import React from 'react';
import { Button } from '@oxygen-ui/react';

const MyButton = () => {
  return (
    <Button
      fullWidth
      color="primary"
      variant="contained"
      onClick={() => console.log('Button clicked!')}
    >
      Connect
    </Button>
  );
};

export default MyButton;
```

## Develop

To contribute to the package, follow the guide to set-up the project.

### Setup the Environment

1. Create a `.env.local` file based on the `.env.example` file.

```bash
cp .env.example .env.local
```

2. Update the values in the `.env.local` file based on your requirements.

```bash
# The subpath of the Storybook static deployment. Leave empty to serve from the root of the domain.
STORYBOOK_BASE_URL=

# The Figma personal access token (PAT) for the Storybook Design Plugin's Figspec integration.
# If this is not defined, the plugin will use the public API to fetch Figma files.
# Leave the placeholder value (<YOUR_FIGMA_ACCESS_TOKEN>) as it is to disable the integration.
# For more information, visit https://storybook.js.org/addons/storybook-addon-designs.
STORYBOOK_DESIGN_ADDON_FIGMA_ACCESS_TOKEN=<YOUR_FIGMA_ACCESS_TOKEN>
```

> **Note**
> By default, the `Design` addon does not provide any capabilities to inspect the Figma design.
> If you create a Figma personal access token and configure the setup, you could get a bit more richer preview
> with the help of [`Figspec`](https://github.com/pocka/figspec) in [`Design Addon`](https://storybook.js.org/addons/storybook-addon-designs).
> Follow the [official addon documentation](https://pocka.github.io/storybook-addon-designs/?path=/story/docs-figma-figspec-readme--page) for more info.

### Run Storybook

```bash
pnpm start
```

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
