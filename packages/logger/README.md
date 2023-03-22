# @oxygen-ui/logger

`@oxygen-ui/logger` is a simple logger package for Oxygen UI.

## Installation

To install `@oxygen-ui/logger`, run the following command:

```sh
npm install @oxygen-ui/logger
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

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
