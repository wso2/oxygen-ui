<h1 align="center" style="color: #343a40;margin: 20px 0">
  <img src="https://user-images.githubusercontent.com/25959096/207556831-df3104cd-f5bb-4e74-9cbe-226ebab20bac.svg#gh-light-mode-only" alt="WSO2 Oxygen UI light mode logo">
    <img src="https://user-images.githubusercontent.com/25959096/207556846-0e513a7c-2e59-413a-84ef-d11f1de81247.svg#gh-dark-mode-only" alt="WSO2 Oxygen UI dark mode logo">
</h1>

<p align="center" style="font-size: 1.2rem;">The
<span style="color: #47EBD8">Design System</span>
powering <a href="https://wso2.com">WSO2</a>'s core products.</p>

<div align="center">
  <a href="https://github.com/wso2/oxygen-ui/actions/workflows/test-runner.yml"><img src="https://img.shields.io/github/actions/workflow/status/wso2/oxygen-ui/test-runner.yml?label=%F0%9F%8C%B3%20Unit%20Tests" alt="🌳 Unit Tests"></a>
  <a href="https://github.com/wso2/oxygen-ui/actions/workflows/builder.yml"><img src="https://img.shields.io/github/actions/workflow/status/wso2/oxygen-ui/builder.yml?color=red&label=%F0%9F%A7%B1%20Builder" alt="🧱 Builder"></a>
  <a href="https://stackoverflow.com/questions/tagged/wso2is"><img src="https://img.shields.io/badge/Ask%20for%20help%20on-Stackoverflow-orange" alt="Stackoverflow"></a>
  <a href="https://discord.gg/wso2"><img src="https://img.shields.io/badge/Join%20us%20on-Discord-%23e01563.svg" alt="Discord"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
</div>

<br>

Oxygen UI is the underlying design system that powers WSO2's core products like Asgardeo, Choreo, WSO2 Identity Server, etc.

This repository contains the source code of the key components that works together for building resilient UIs.

## Packages

- [`@oxygen-ui/primitives`](./packages/primitives) - Low level building blocks of Oxygen UI (e.g. icons, fonts) 
- [`@oxygen-ui/react`](./packages/react) - The React implementation of Oxygen UI.
- [`@oxygen-ui/react-icons`](./packages/react) - React components for Oxygen UI icons.
- [`@oxygen-ui/logger`](./packages/logger) - Logger for the Oxygen UI packages

## Examples

* [💅 Multi Brand Identity Demo](https://wso2.github.io/oxygen-ui/examples/multi-brand-identity/)

    Sample app to showcase Oxygen Design System's multi-branding capabilities.

    ✨ Features
    
    * Ability to switch between different WSO2 brand identities. i.e. Asgardeo, Choreo, etc.
    * Ability to integrate with [Asgardeo Branding](https://wso2.com/asgardeo/docs/guides/branding/configure-ui-branding/) feature.

    Click [here →](./examples/multi-brand-identity/) for the source code 🧑‍💻

## Documentation

For more information on how to use Oxygen UI, check out the [documentation](https://oxygen-ui.vercel.app) website.

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](./CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](./LICENSE), You may not use this file except in compliance with the License.
