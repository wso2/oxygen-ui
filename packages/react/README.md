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

### Locally Linking the Package

When working with the `@oxygen-ui/react` package in a project, you can locally link the package to test your changes. Locally linking allows you to make modifications to the package code and see the results in your project without publishing the package or relying on a remote package registry. Here's how you can locally link the package:

1. Open a terminal or command prompt and navigate to the root directory of the `@oxygen-ui/react` package.

2. Build the package in **watch mode** by running the following command:

```bash
pnpm build:watch
```

This command compiles the package source code and generates the necessary build artifacts.

3. Create a symbolic link for the package using the following command:

> **Warning**
> This command has to be run from inside the dist directory. Else, import like `import Button from '@oxygen-ui/react/Button';` will not work.

```bash
cd dist
pnpm link --global
```

This creates a symbolic link for the package in the global package registry.

4. Navigate to the project directory where you want to use the locally linked package.

5. In the project directory, run the following command to link the package:

```bash
pnpm link @oxygen-ui/react
```

This creates a symbolic link from the project's node_modules directory to the locally linked `@oxygen-ui/react` package.

Now, you should be able to import and use the @oxygen-ui/react package in your project as if it were installed from a remote package registry. Any changes you make to the package source code will be reflected in your project immediately since it's using the locally linked version.

Remember to revert back to using the published package from the remote registry once you are done testing and ready to distribute your changes to other users.

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
