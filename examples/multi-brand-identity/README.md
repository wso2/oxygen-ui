<p align="center" style="color: #343a40">
  <h1 align="center">💅 Multi Brand Identity Demo</h1>
</p>
<p align="center" style="font-size: 1.2rem;">Sample app to showcase Oxygen Design System's multi-branding capabilities.</p>

## 👀 Live Preview

A live preview of this demo is available at [https://oxygen-multi-brand-example.vercel.app](https://oxygen-multi-brand-example.vercel.app).

## ✨ Features
    
  * Ability to switch between different WSO2 brand identities. i.e. Asgardeo, Choreo, etc.
  * Ability to integrate with [Asgardeo Branding](https://wso2.com/asgardeo/docs/guides/branding/configure-ui-branding/) feature.

## 🚀 Getting Started

1. Clone the repository.

```bash
git clone https://github.com/wso2/oxygen-ui.git
```

2. Navigate to the `multi-brand-identity` example.

```bash
cd oxygen-ui/examples/multi-brand-identity
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
PORT=3001

# Disables the "@typescript-eslint" plugin to prevent conflicts with "@wso2/eslint-plugin"
# and avoid breaking the build.
DISABLE_ESLINT_PLUGIN=true

# The subpath of the application as hosted on the web server.
# By default, it's configured to serve the app from the root of a domain.
PUBLIC_URL=/
```

5. Start the development server.

```bash
pnpm start
```

This will start the app on [http://localhost:3001](http://localhost:3001).

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
