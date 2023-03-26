<p align="center" style="color: #343a40">
  <h1 align="center">Oxygen UI Documentation</h1>
</p>
<p align="center" style="font-size: 1.2rem;">This is the official documentation for the Oxygen UI Design System, a collection of UI components and guidelines for building web applications.</p>

## 🚀 Getting Started

1. Clone the repository.

```bash
git clone https://github.com/wso2/oxygen-ui.git
```

2. Navigate to the documentation website directory.

```bash
cd oxygen-ui/docs/website
```

3. Install the dependencies.

```bash
pnpm install
```

4. Create a `.env.local` file based on the `.env.example` file.

```bash
cp .env.example .env.local
```

5. Update the values in the `.env.local` file based on your requirements.

```bash
# The port number that the server will listen to.
# Change this to the desired port number that the server should listen to.
PORT=3000

# The build mode to use during the build process.
# Possible values: "static", "server"
# - "static": build the app in static mode, which generates static HTML files that can be served from a static file server.
# - "server": build the app in server mode, which runs the app on a Node.js server that can dynamically generate HTML on the server.
BUILD_MODE=server

# The base path of the app.
NEXT_PUBLIC_BASE_PATH=/
```

6. Start the development server.

```bash
pnpm dev
```

This will start the app on [http://localhost:3000](http://localhost:3000).

## Production

### Server Build

To build the documentation in server mode for production, follow these steps:

1. Run the following command to build the app:

```bash
pnpm build
```

This will generate a production-ready version of the app in the `.next` directory.

2. Run the following command to start the server:

```bash
pnpm start
```

This will start the app on the port specified in the `PORT` environment variable (default is 3000).

### Static Build

To build the documentation in static mode for production, follow these steps:

1. Update the `.env.local` file to set `BUILD_MODE` to `static`.

```bash
BUILD_MODE=static
```

2. Run the following command to build the app:

```bash
pnpm build:static
```

This will generate a production-ready version of the app in the `out` directory.

3. You can now serve the app using any static file server.

💡The official documentation for the Oxygen UI Design System is built and deployed this way and hosted on GitHub Pages [here →](https://wso2.github.io/oxygen-ui/).

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
