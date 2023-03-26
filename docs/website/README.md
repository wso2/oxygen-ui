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
# Port to run the server.
PORT=3000

# The build mode to use during the build process.
# Possible values: "static", "server"
# - "static": build the app in static mode, which generates static HTML files that can be served from a static file server.
# - "server": build the app in server mode, which runs the app on a Node.js server that can dynamically generate HTML on the server.
BUILD_MODE=server

# The base path of the app.
NEXT_PUBLIC_BASE_PATH=/
```

5. Start the development server.

```bash
pnpm dev
```

This will start the app on [http://localhost:3000](http://localhost:3000).

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
