/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import { Stack, Typography, CodeBlock, Box, Divider } from '@wso2/oxygen-ui';

/**
 * A comprehensive guide to adding runtime theme support to your application.
 * This allows users to configure themes dynamically without rebuilding your app.
 */
const meta: Meta = {
  title: 'How To Add Runtime Theme Support',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
This guide demonstrates how to implement runtime theme support in your Oxygen UI application. 
Runtime themes allow you to:

- Configure themes via external configuration files
- Load themes from remote URLs without rebuilding
- Support both inline theme objects and external theme files
- Enable theme switching without code changes

### Architecture Overview

1. **config.js** - Runtime configuration loaded via script tag
2. **index.html** - Loads config.js before app initialization  
3. **main.tsx** - App setup with theme loading logic
4. **Theme Files** - External .js files with theme configurations

This approach is perfect for:
- Multi-tenant applications
- White-label solutions
- Environment-specific theming
- Customer-specific branding
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Step 1: Create the runtime configuration file (config.js).
 * This file defines available themes and can be modified without rebuilding your app.
 */
export const Step1_ConfigFile: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 1: Create config.js
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Create a <code>public/config.js</code> file in your project root. This file will be loaded at runtime.
        </Typography>
      </Box>

      <CodeBlock 
        language="javascript"
        code={`// public/config.js
/* eslint-disable no-undef */
window.__APP_RUNTIME_CONFIG__ = {
  design: {
    initialTheme: "default",
    themes: [
      {
        key: "default",
        label: "Default Theme",
        // Inline theme configuration
        theme: {
          colorSchemes: {
            light: {
              palette: {
                primary: { main: "#1976d2" }, // Blue
                secondary: { main: "#dc004e" }
              }
            },
            dark: {
              palette: {
                primary: { main: "#90caf9" },
                secondary: { main: "#f48fb1" }
              }
            }
          }
        }
      },
      {
        key: "corporate",
        label: "Corporate Theme",
        // External theme file (loaded at runtime)
        theme: "/themes/CorporateTheme.js"
      }
    ]
  }
};`}
      />

      <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" color="primary" fontWeight="medium">
          💡 Key Points
        </Typography>
        <Typography variant="body2" component="ul" sx={{ mt: 1, pl: 2 }}>
          <li>Use <code>window.__APP_RUNTIME_CONFIG__</code> as the global variable</li>
          <li>Themes can be inline objects or string paths to external files</li>
          <li>Set <code>initialTheme</code> to specify which theme loads by default</li>
          <li>This file can be modified after deployment without rebuilding</li>
        </Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Step 2: Create an external theme file.
 * External theme files allow you to organize large theme configurations separately.
 */
export const Step2_ExternalThemeFile: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 2: Create External Theme File (Optional)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Create <code>public/themes/CorporateTheme.js</code> for externally loaded themes.
        </Typography>
      </Box>

      <CodeBlock 
        language="javascript"
        code={`// public/themes/CorporateTheme.js
const corporateThemeConfig = {
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#0066cc' }, // Corporate blue
        secondary: { main: '#00b4d8' },
        background: {
          default: '#f8fafc',
          paper: '#ffffffc5',
          acrylic: '#ffffff40'
        }
      }
    },
    dark: {
      palette: {
        primary: { main: '#3b9eff' },
        secondary: { main: '#00d4ff' },
        background: {
          default: '#0c1222',
          paper: '#000000c5',
          acrylic: '#00000040'
        }
      }
    }
  },
  blur: {
    none: 'none',
    light: 'blur(10px)',
    medium: 'blur(16px)',
    heavy: 'blur(24px)'
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none'
        })
      }
    }
  }
};

// Export for CommonJS (required for runtime loading)
if (typeof module !== 'undefined' && module.exports) {
  module.exports.default = corporateThemeConfig;
}`}
      />

      <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" color="primary" fontWeight="medium">
          💡 File Requirements
        </Typography>
        <Typography variant="body2" component="ul" sx={{ mt: 1, pl: 2 }}>
          <li>Must export via <code>module.exports.default</code></li>
          <li>Export a plain configuration object (not a Theme instance)</li>
          <li>File will be loaded via fetch() and evaluated at runtime</li>
          <li>Configuration will be converted to a theme using <code>createOxygenTheme()</code></li>
        </Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Step 3: Load config.js in your HTML file.
 * The config must be loaded before your React app initializes.
 */
export const Step3_IndexHTML: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 3: Load Config in index.html
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Add a script tag to load <code>config.js</code> before your app bundle.
        </Typography>
      </Box>

      <CodeBlock 
        language="html"
        code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
    
    <!-- Load runtime config BEFORE app bundle -->
    <script src="/config.js"></script>
    
    <!-- Your app bundle -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`}
      />

      <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" fontWeight="medium">
          ⚠️ Load Order is Critical
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          The config.js script must be loaded <strong>before</strong> your app bundle to ensure{' '}
          <code>window.__APP_RUNTIME_CONFIG__</code> is available when your app initializes.
        </Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Step 4: Set up your main application file.
 * Configure TypeScript types and load the runtime configuration.
 */
export const Step4_MainSetup: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 4: Setup main.tsx
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Configure TypeScript types and implement the config loader.
        </Typography>
      </Box>

      <CodeBlock 
        language="tsx"
        code={`// src/main.tsx
import {
  OxygenUIThemeProvider,
  createOxygenTheme,
  type OxygenThemeType,
  // Import any built-in themes you want to use
  AcrylicOrangeTheme,
  ClassicTheme
} from '@wso2/oxygen-ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Define TypeScript interfaces
interface RuntimeTheme {
  key: string;
  label: string;
  theme: string | Partial<OxygenThemeType>;
}

interface LoadedTheme {
  key: string;
  label: string;
  theme: string | Partial<OxygenThemeType>;
}

// Declare global type for runtime config
declare global {
  interface Window {
    __APP_RUNTIME_CONFIG__?: {
      design?: {
        initialTheme?: string;
        themes?: RuntimeTheme[];
      };
    };
  }
}

// Load runtime configuration
function loadConfig() {
  if (typeof window !== 'undefined' && window.__APP_RUNTIME_CONFIG__) {
    return window.__APP_RUNTIME_CONFIG__;
  }
  
  throw new Error('Runtime configuration not available');
}

const APP_CONFIG = loadConfig();`}
      />
    </Stack>
  ),
};

/**
 * Step 5: Initialize OxygenUIThemeProvider with runtime themes.
 * This is where runtime and built-in themes are combined.
 */
export const Step5_ThemeProvider: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 5: Initialize Theme Provider
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Combine built-in themes with runtime-loaded themes in OxygenUIThemeProvider.
        </Typography>
      </Box>

      <CodeBlock 
        language="tsx"
        code={`// src/main.tsx (continued)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OxygenUIThemeProvider 
      themes={[
        // Built-in themes
        { 
          key: 'acrylicOrange', 
          label: 'Acrylic Orange', 
          theme: AcrylicOrangeTheme 
        },
        { 
          key: 'classic', 
          label: 'Classic', 
          theme: ClassicTheme 
        },
        
        // Runtime themes from config.js
        ...(APP_CONFIG.design?.themes?.map((theme) => ({
          key: theme.key,
          label: theme.label,
          // Convert inline objects to theme instances
          theme: typeof theme.theme === 'string' 
            ? theme.theme  // Keep string paths as-is (loaded by provider)
            : createOxygenTheme(theme.theme)  // Convert objects to themes
        })) ?? [])
      ]}
      initialTheme={APP_CONFIG.design?.initialTheme ?? "acrylicOrange"}
      onThemesLoaded={(loadedThemes: LoadedTheme[]) => {
        console.log('All themes loaded:', loadedThemes);
        // Track when external theme files finish loading
      }}
    >
      <App />
    </OxygenUIThemeProvider>
  </StrictMode>
);`}
      />

      <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" color="primary" fontWeight="medium">
          💡 How It Works
        </Typography>
        <Typography variant="body2" component="ul" sx={{ mt: 1, pl: 2 }}>
          <li>String paths (e.g., <code>"/themes/CorporateTheme.js"</code>) are loaded asynchronously by the provider</li>
          <li>Inline objects are converted to theme instances using <code>createOxygenTheme()</code></li>
          <li><code>onThemesLoaded</code> callback fires when all themes (including external files) are ready</li>
          <li>Users can switch between all themes via <code>ThemeSwitcher</code> component</li>
        </Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Complete example showing all files together.
 */
export const CompleteExample: Story = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 900 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Complete Implementation
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          All files together in one view.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          📁 Project Structure
        </Typography>
        <CodeBlock 
          language="bash"
          code={`my-app/
├── public/
│   ├── config.js              # Runtime configuration
│   └── themes/
│       ├── CorporateTheme.js  # External theme file
│       └── CustomTheme.js     # Another theme file
├── src/
│   ├── main.tsx               # App entry point
│   └── App.tsx                # Your app components
└── index.html                 # HTML template`}
        />
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          🎨 Benefits of This Approach
        </Typography>
        <Stack spacing={2} sx={{ pl: 2 }}>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              ✅ No Rebuild Required
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update themes by modifying config.js - no compilation needed
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" fontWeight="medium">
              ✅ Environment-Specific Themes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Different config.js for dev, staging, production
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" fontWeight="medium">
              ✅ Customer Customization
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Each customer deployment can have unique themes
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" fontWeight="medium">
              ✅ Remote Theme Loading
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Load theme files from CDN or remote servers
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" fontWeight="medium">
              ✅ Mix Built-in and Custom Themes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Combine Oxygen's built-in themes with your custom ones
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" fontWeight="medium" gutterBottom>
          🚀 Next Steps
        </Typography>
        <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
          <li>Add <code>ThemeSwitcher</code> component to let users switch themes</li>
          <li>Implement theme persistence using localStorage</li>
          <li>Add color scheme toggle for light/dark mode switching</li>
          <li>Create theme preview components for theme selection UI</li>
        </Typography>
      </Box>
    </Stack>
  ),
};
