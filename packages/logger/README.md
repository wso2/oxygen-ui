<p align="center" style="color: #343a40">
  <h1 align="center">@oxygen-ui/logger</h1>
</p>
<p align="center" style="font-size: 1.2rem;">Simple logger package for Oxygen UI.</p>

<div align="center">
  <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@oxygen-ui/logger">
  <img alt="npm" src="https://img.shields.io/npm/dw/@oxygen-ui/logger">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
</div>

## Installation

To install `@oxygen-ui/logger`, run the following command:

```sh
# With npm
npm install @oxygen-ui/logger

# With pnpm
pnpm add @oxygen-ui/logger

# With yarn
yarn add @oxygen-ui/logger
```

## Usage

Here's an example of how to use `@oxygen-ui/logger`:

```js
const { logger } = require('@oxygen-ui/logger');

logger.log('======  🧱 Started Building Primitives 🧱  ======');
logger.success(pkg.name, `🏆 Successfully wrote the transformations.`);
logger.info(pkg.name, '💭 Processing the design tokens');
logger.warn(`wrote ${file} with ${count} exports`);
logger.error(logMessageOne, logMessageTwo);
```

## API

### logger.error(...args: Array<any>): void

Logs an error message to the console. Accepts any number of arguments.

### logger.info(...args: Array<any>): void

Logs an info message to the console. Accepts any number of arguments.

### logger.log(...args: Array<any>): void

Logs a message to the console. Accepts any number of arguments.

### logger.success(...args: Array<any>): void

Logs a success message to the console. Accepts any number of arguments.

### logger.warn(...args: Array<any>): void

Logs a warning message to the console. Accepts any number of arguments.

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
