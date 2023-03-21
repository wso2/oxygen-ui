<p align="center" style="color: #343a40">
  <h1 align="center">@oxygen-ui-experimental/react</h1>
</p>
<p align="center" style="font-size: 1.2rem;">The React implementation of the Oxygen Design System.</p>

<div align="center">
  <a href="https://github.com/storybooks/storybook" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>
</div>

## Installation

```bash
# With npm
npm install @oxygen-ui-experimental/react

# With pnpm
pnpm add @oxygen-ui-experimental/react

# With yarn
yarn add @oxygen-ui-experimental/react
```

## Develop

To contribute to the package, follow the guide to set-up the project.

### Setup the Environment

#### Use [`Figspec`](https://github.com/pocka/figspec) in [`Design Addon`](https://storybook.js.org/addons/storybook-addon-designs)

By default, the `Design` addon does not provide any capabilities to inspect the Figma design.

If you create a personal access token and configure the setup, you could get a bit more richer preview.

Create a `.env.local` file under the root of `packages/react`, and add the following environment variable.

```bash
STORYBOOK_FIGMA_ACCESS_TOKEN="<YOUR_FIGMA_ACCESS_TOKEN>"
```

Follow the [official addon documentation](https://pocka.github.io/storybook-addon-designs/?path=/story/docs-figma-figspec-readme--page) for more info.

### Run Storybook

```bash
pnpm storybook
```
