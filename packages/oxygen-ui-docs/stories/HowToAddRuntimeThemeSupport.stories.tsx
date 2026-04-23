/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import {Description, Primary, Subtitle, Title} from '@storybook/addon-docs/blocks';
import CenterContentLayout from '../layouts/CenterContentLayout';

/**
 * A comprehensive guide to adding runtime theme support to your application.
 * This allows users to configure themes dynamically without rebuilding your app.
 */
const meta: Meta = {
  title: 'How To Add Runtime Theme Support',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Introduction to runtime theme support in Oxygen UI.
 * Learn how to configure themes dynamically without rebuilding your application.
 */
export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={4} sx={{ maxWidth: 900 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Runtime Theme Support
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This guide demonstrates how to implement runtime theme support in your Oxygen UI application. 
            Runtime themes allow you to configure and modify themes without rebuilding your application.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            ✨ What You Can Do
          </Typography>
          <Stack spacing={2} sx={{ pl: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                📝 Configure themes via external configuration files
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Define themes in a config.js file that can be modified after deployment
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                📂 Load themes from relative paths without rebuilding
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Place theme files in your public folder and reference them by path
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                🔄 Support both inline theme objects and external theme files
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mix inline configurations with file-based themes for flexibility
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                🎨 Enable theme switching without code changes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Users can switch between all configured themes at runtime
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            🏗️ Architecture Overview
          </Typography>
          <Stack spacing={2} sx={{ pl: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                1. config.js
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Runtime configuration loaded via script tag before app initialization
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                2. index.html
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Loads config.js before your app bundle
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                3. main.tsx
              </Typography>
              <Typography variant="body2" color="text.secondary">
                App setup with theme loading and initialization logic
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                4. Theme Files
              </Typography>
              <Typography variant="body2" color="text.secondary">
                External .js files with theme configurations (optional)
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            🔒 Security
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            For security, only same-origin theme files are allowed:
          </Typography>
          <Stack spacing={1} sx={{ pl: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="success.main" sx={{ fontWeight: 'medium' }}>✅</Typography>
              <Typography variant="body2">
                <strong>Relative paths</strong> - <code>"themes/CustomTheme.js"</code>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="success.main" sx={{ fontWeight: 'medium' }}>✅</Typography>
              <Typography variant="body2">
                <strong>Absolute same-origin paths</strong> - <code>"/themes/CustomTheme.js"</code>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="error.main" sx={{ fontWeight: 'medium' }}>❌</Typography>
              <Typography variant="body2">
                <strong>External/cross-origin URLs</strong> - Blocked for security
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            💼 Perfect For
          </Typography>
          <Stack spacing={1} sx={{ pl: 2 }}>
            <Typography variant="body2">• Multi-tenant applications</Typography>
            <Typography variant="body2">• White-label solutions</Typography>
            <Typography variant="body2">• Environment-specific theming</Typography>
            <Typography variant="body2">• Customer-specific branding</Typography>
          </Stack>
        </Box>

        <Box sx={{ bgcolor: 'info.main', p: 2, borderRadius: 1, mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
            📖 Follow the Steps Below
          </Typography>
          <Typography variant="body2">
            This guide walks through the complete implementation process step by step.
            Start with Step 1 to create your runtime configuration file.
          </Typography>
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};



/**
 * Step 1: Create the runtime configuration file (config.js).
 * This file defines available themes and can be modified without rebuilding your app.
 */
export const Step1_ConfigFile: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Step 1: Create config.js
          </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
        // Relative path (same-origin, loaded at runtime)
        theme: "themes/CorporateTheme.js"
      },
      {
        key: "custom",
        label: "Custom Theme",
        // Absolute path (same-origin)
        theme: "/themes/CustomTheme.js"
      }
    ]
  }
};`}
      />

      <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
          💡 Key Points
        </Typography>
        <Typography variant="body2" component="ul" sx={{ mt: 1, pl: 2 }}>
          <li>Use <code>window.__APP_RUNTIME_CONFIG__</code> as the global variable</li>
          <li>Themes can be inline objects or string paths to same-origin files</li>
          <li>Both relative (<code>"themes/Theme.js"</code>) and absolute (<code>"/themes/Theme.js"</code>) paths are supported</li>
          <li>External/cross-origin URLs are blocked for security</li>
          <li>Set <code>initialTheme</code> to specify which theme loads by default</li>
          <li>This file can be modified after deployment without rebuilding</li>
        </Typography>
      </Box>
      </Stack>
    </CenterContentLayout>
  ),
};

/**
 * Step 2: Create an external theme file.
 * External theme files allow you to organize large theme configurations separately.
 */
export const Step2_ExternalThemeFile: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Step 2: Create External Theme File (Optional)
          </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
        <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
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
    </CenterContentLayout>
  ),
};

/**
 * Step 3: Load config.js in your HTML file.
 * The config must be loaded before your React app initializes.
 */
export const Step3_IndexHTML: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Step 3: Load Config in index.html
          </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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

      <Box sx={{ bgcolor: 'warning.main', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          ⚠️ Load Order is Critical
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          The config.js script must be loaded <strong>before</strong> your app bundle to ensure{' '}
          <code>window.__APP_RUNTIME_CONFIG__</code> is available when your app initializes.
        </Typography>
      </Box>
      </Stack>
    </CenterContentLayout>
  ),
};

/**
 * Step 4: Set up your main application file.
 * Configure TypeScript types and load the runtime configuration.
 */
export const Step4_MainSetup: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Step 4: Setup main.tsx
          </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
    </CenterContentLayout>
  ),
};

/**
 * Step 5: Initialize OxygenUIThemeProvider with runtime themes.
 * This is where runtime and built-in themes are combined.
 */
export const Step5_ThemeProvider: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Step 5: Initialize Theme Provider
          </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
        <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
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
    </CenterContentLayout>
  ),
};

/**
 * Step 6: Security Information.
 * Understanding the security model for loading theme files.
 */
export const Step6_Security: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Step 6: Security Information
          </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          OxygenUIThemeProvider includes built-in security validation that only allows 
          same-origin theme files for your protection.
        </Typography>
      </Box>

      <Box sx={{ bgcolor: 'success.main', p: 2, borderRadius: 1, mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
          ✅ Allowed (Same-Origin Only)
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li><strong>Relative paths</strong> - <code>"themes/CustomTheme.js"</code></li>
          <li><strong>Absolute paths</strong> - <code>"/themes/CustomTheme.js"</code></li>
          <li><strong>Full same-origin URLs</strong> - <code>https://your-app.com/themes/theme.js</code></li>
          <li><strong>Inline objects</strong> - No file loading, always safe</li>
        </Typography>
      </Box>

      <Box sx={{ bgcolor: 'error.main', p: 2, borderRadius: 1, mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
          🚫 Blocked for Security
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li><strong>External/cross-origin URLs</strong> - <code>https://cdn.example.com/theme.js</code></li>
          <li><strong>javascript: URLs</strong> - Always blocked</li>
          <li><strong>data: URLs</strong> - Always blocked</li>
          <li><strong>Invalid protocols</strong> - Non-http/https blocked</li>
          <li><strong>Files with eval()</strong> - Rejected during load</li>
          <li><strong>Files with Function()</strong> - Rejected during load</li>
          <li><strong>Files over 500KB</strong> - Rejected (DoS prevention)</li>
        </Typography>
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, mt: 3 }}>
        Example: Valid Theme Configurations
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`<OxygenUIThemeProvider 
  themes={[
    // ✅ Inline theme object
    {
      key: "inline",
      label: "Inline Theme",
      theme: { colorSchemes: { light: { palette: { primary: { main: '#1976d2' }}}}}
    },
    // ✅ Relative path
    {
      key: "relative",
      label: "Relative Theme",
      theme: "themes/CustomTheme.js"
    },
    // ✅ Absolute same-origin path
    {
      key: "absolute",
      label: "Absolute Theme",
      theme: "/themes/AnotherTheme.js"
    },
    // ❌ External URL (will be blocked)
    // {
    //   key: "external",
    //   label: "External Theme",
    //   theme: "https://cdn.example.com/theme.js"  // ❌ Not allowed
    // }
  ]}
>
  <App />
</OxygenUIThemeProvider>`}
      />

      <Box sx={{ bgcolor: 'info.main', p: 2, borderRadius: 1, mt: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
          🔒 Security Features
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li>Automatic same-origin validation for all theme URLs</li>
          <li>Protocol validation (http/https only)</li>
          <li>Content-Type header validation for loaded files</li>
          <li>Code size limits to prevent DoS attacks</li>
          <li>Static code analysis blocking dangerous patterns</li>
          <li>Safe module evaluation without arbitrary code execution</li>
        </Typography>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mt: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
          💡 Why Same-Origin Only?
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Theme files contain JavaScript code that runs in your application context. 
          Allowing external URLs would create security risks:
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2, mt: 1 }}>
          <li>Malicious code injection from compromised CDNs</li>
          <li>Data theft through theme code execution</li>
          <li>Supply chain attacks via third-party themes</li>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          By restricting to same-origin, themes must be deployed with your application,
          ensuring they go through your security review and deployment process.
        </Typography>
      </Box>
      </Stack>
    </CenterContentLayout>
  ),
};

/**
 * Complete example showing all files together.
 */
export const CompleteExample: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={4} sx={{ maxWidth: 900 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Complete Implementation
          </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          All files together in one view.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
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
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          🎨 Benefits of This Approach
        </Typography>
        <Stack spacing={2} sx={{ pl: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              ✅ No Rebuild Required
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update themes by modifying config.js - no compilation needed
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              ✅ Environment-Specific Themes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Different config.js for dev, staging, production
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              ✅ Customer Customization
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Each customer deployment can have unique themes
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              ✅ Secure by Default
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Same-origin restriction ensures themes go through your deployment process
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              ✅ Mix Built-in and Custom Themes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Combine Oxygen's built-in themes with your custom ones
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ bgcolor: 'info.main', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
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
    </CenterContentLayout>
  ),
};
