/**
 * Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Typography, Box, CodeBlock, Paper, Button, OxygenUIThemeProvider, extendTheme } from '@wso2/oxygen-ui';

/**
 * OxygenUIThemeProvider is the root theme provider component for Oxygen UI applications.
 * It wraps your application to provide theming capabilities with support for CSS variables,
 * color schemes, and multiple themes.
 */
const meta: Meta<typeof OxygenUIThemeProvider> = {
  title: 'Theming/OxygenUIThemeProvider',
  component: OxygenUIThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The OxygenUIThemeProvider component provides theming capabilities for your entire application.
It supports single or multiple themes, color scheme switching (light/dark), and persistent theme preferences.

### Features
- **CSS Variables**: Dynamic theming with CSS custom properties
- **Color Schemes**: Built-in light and dark mode support
- **Multiple Themes**: Allow users to switch between different themes
- **SSR-Safe**: Server-side rendering compatible
- **Persistent Preferences**: Remembers user theme choices
- **Theme Customization**: Fully customizable with MUI's extendTheme

### Basic Usage
\`\`\`tsx
import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";

function App() {
  return (
    <OxygenUIThemeProvider>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}
\`\`\`

### With Custom Theme
\`\`\`tsx
import { OxygenUIThemeProvider, extendTheme } from "@wso2/oxygen-ui";

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#9c27b0" }
      }
    }
  }
});

<OxygenUIThemeProvider theme={customTheme}>
  <YourApp />
</OxygenUIThemeProvider>
\`\`\`

### Content Security Policy (CSP)
For applications enforcing a strict \`style-src\` CSP directive, pass a nonce
(or a custom Emotion cache) so runtime-injected style tags are allowed:

\`\`\`tsx
<OxygenUIThemeProvider nonce={window.__MY_APP_NONCE__}>
  <YourApp />
</OxygenUIThemeProvider>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: false,
      description: 'A single MUI theme created with extendTheme()',
    },
    themes: {
      control: false,
      description: 'Array of theme options for multi-theme support. Each theme can have a `theme` property that is either a Theme object or a string path to a JavaScript file that exports the theme configuration.',
    },
    initialTheme: {
      control: 'text',
      description: 'The ID of the theme to use initially',
    },
    onThemesLoaded: {
      control: false,
      description: 'Callback function triggered after all themes are loaded. Receives an array of loaded themes with their key, label, and theme object. Useful for tracking when dynamically loaded theme files are ready.',
      table: {
        type: { summary: '(themes: LoadedTheme[]) => void' },
      },
    },
    nonce: {
      control: 'text',
      description: 'CSP (Content Security Policy) nonce applied to all style tags injected by the styling engine (Emotion). Use when your application enforces a strict `style-src` CSP directive. Ignored if `emotionCache` is provided.',
    },
    emotionCache: {
      control: false,
      description: 'A custom Emotion cache instance for full control over style injection (cache key, nonce, insertion point, stylis plugins, container). Create one with `createEmotionCache`. Takes precedence over the `nonce` prop.',
      table: {
        type: { summary: 'EmotionCache' },
      },
    },
    children: {
      control: false,
      description: 'Your application components',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OxygenUIThemeProvider>;

/**
 * Basic setup using the default Oxygen theme with built-in light/dark color schemes.
 */
export const Default: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        The simplest setup - wraps your app with the default Oxygen theme.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";

function App() {
  return (
    <OxygenUIThemeProvider>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}`}
      />
    </Stack>
  ),
};

/**
 * Create and use a custom theme with your brand colors and preferences.
 */
export const CustomTheme: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Extend the default theme with your own colors and typography.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { OxygenUIThemeProvider, extendTheme } from "@wso2/oxygen-ui";

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#dc004e" }
      }
    },
    dark: {
      palette: {
        primary: { main: "#90caf9" },
        secondary: { main: "#f48fb1" }
      }
    }
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  }
});

<OxygenUIThemeProvider theme={customTheme}>
  <YourApp />
</OxygenUIThemeProvider>`}
      />
    </Stack>
  ),
};

/**
 * Provide multiple themes and let users switch between them.
 */
export const MultipleThemes: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Enable theme switching by providing an array of themes.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { OxygenUIThemeProvider, ThemeSwitcher, extendTheme } from "@wso2/oxygen-ui";

const themes = [
  { 
    id: "default", 
    name: "Default", 
    theme: extendTheme({ /* ... */ }) 
  },
  { 
    id: "purple", 
    name: "Purple", 
    theme: extendTheme({
      colorSchemes: {
        light: { palette: { primary: { main: "#9c27b0" } } }
      }
    })
  }
];

<OxygenUIThemeProvider themes={themes} initialTheme="default">
  <ThemeSwitcher showLabel />
  <YourApp />
</OxygenUIThemeProvider>`}
      />
    </Stack>
  ),
};

/**
 * Programmatically access and control themes using the useThemeSwitcher hook.
 */
export const UsingHook: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Access theme state and switch themes programmatically.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { useThemeSwitcher } from "@wso2/oxygen-ui";

function ThemeInfo() {
  const { currentTheme, themes, switchTheme } = useThemeSwitcher();
  
  return (
    <div>
      <p>Current: {currentTheme?.name}</p>
      <p>Available: {themes.length}</p>
      
      {themes.map((theme) => (
        <button 
          key={theme.id}
          onClick={() => switchTheme(theme.id)}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}`}
      />
    </Stack>
  ),
};

/**
 * Make Oxygen UI compatible with a strict Content Security Policy (CSP)
 * by passing a nonce or a custom Emotion cache.
 */
export const ContentSecurityPolicy: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Pass your server-generated nonce so runtime-injected style tags satisfy a
        strict style-src CSP directive. For full control over style injection,
        pass a custom Emotion cache instead.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { OxygenUIThemeProvider, createEmotionCache } from "@wso2/oxygen-ui";

// Option 1: simple - pass the nonce directly
<OxygenUIThemeProvider nonce={window.__MY_APP_NONCE__}>
  <YourApp />
</OxygenUIThemeProvider>

// Option 2: advanced - pass a custom Emotion cache
// (full control: key, nonce, insertion point, stylis plugins, ...)
const cache = createEmotionCache({
  key: "css",
  nonce: window.__MY_APP_NONCE__,
  prepend: true,
});

<OxygenUIThemeProvider emotionCache={cache}>
  <YourApp />
</OxygenUIThemeProvider>`}
      />
      <Typography variant="body2" color="text.secondary">
        The bundled Inter font styles are injected at import time, so their nonce
        is resolved from the __webpack_nonce__ global (webpack) or a
        {' '}meta[property=&quot;csp-nonce&quot;] tag (Vite convention) instead of a prop.
      </Typography>
    </Stack>
  ),
};

/**
 * Track when themes are loaded using the onThemesLoaded callback.
 * Useful for themes loaded from external files or URLs.
 */
export const OnThemesLoadedCallback: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Get notified when all themes (including dynamically loaded ones) are ready.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { OxygenUIThemeProvider, createOxygenTheme } from "@wso2/oxygen-ui";

const themes = [
  { 
    key: "default", 
    label: "Default Theme",
    theme: DefaultTheme 
  },
  { 
    key: "custom", 
    label: "Custom Theme",
    // Theme loaded from external file
    theme: "/themes/custom-theme.js"
  },
  {
    key: "inline",
    label: "Inline Theme",
    // Theme created inline
    theme: createOxygenTheme({
      colorSchemes: {
        light: { palette: { primary: { main: "#ff5722" } } }
      }
    })
  }
];

function App() {
  const handleThemesLoaded = (loadedThemes) => {
    console.log('All themes loaded:', loadedThemes);
    // loadedThemes: [{ key: string, label: string, theme: Theme }]
    
    // You can now:
    // - Track loading completion
    // - Initialize app state
    // - Show UI that depends on theme data
  };

  return (
    <OxygenUIThemeProvider 
      themes={themes} 
      initialTheme="default"
      onThemesLoaded={handleThemesLoaded}
    >
      <YourApp />
    </OxygenUIThemeProvider>
  );
}`}
      />
    </Stack>
  ),
};
