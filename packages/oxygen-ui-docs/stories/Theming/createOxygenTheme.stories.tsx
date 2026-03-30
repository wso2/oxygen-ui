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
import { Stack, Typography, CodeBlock, createOxygenTheme } from '@wso2/oxygen-ui';

/**
 * createOxygenTheme is a utility function for creating custom Oxygen UI themes.
 * It extends the base Oxygen theme with your custom configuration.
 */
const meta: Meta = {
  title: 'Theming/createOxygenTheme',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`createOxygenTheme\` utility function simplifies the creation of custom Oxygen UI themes by extending the base Oxygen theme with your configuration.

### Features
- **Type-Safe**: Full TypeScript support with type inference
- **Base Theme Extension**: Automatically extends the Oxygen base theme
- **CSS Variables**: Generates CSS custom properties for dynamic theming
- **Color Schemes**: Built-in support for light and dark modes
- **MUI Compatible**: Works seamlessly with Material-UI's theming system

### Function Signature
\`\`\`typescript
function createOxygenTheme(
  config?: Partial<ThemeOptions> | Record<string, unknown>,
  baseTheme?: Theme
): OxygenTheme
\`\`\`

### Parameters
- **config** (optional): Theme configuration object with your customizations
- **baseTheme** (optional): Base theme to extend from (defaults to OxygenThemeBase)

### Returns
- **OxygenTheme**: A fully configured theme object ready to use with OxygenUIThemeProvider

### When to Use
- Creating custom themes for your application
- Building runtime-configurable themes
- Extending themes loaded from external sources
- Converting theme configuration objects to theme instances
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Basic usage - create a theme with custom primary color.
 */
export const BasicUsage: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        The simplest way to create a custom theme with your brand colors.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { createOxygenTheme, OxygenUIThemeProvider } from "@wso2/oxygen-ui";

const customTheme = createOxygenTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#9c27b0", // Purple
        }
      }
    }
  }
});

function App() {
  return (
    <OxygenUIThemeProvider theme={customTheme}>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}`}
      />
    </Stack>
  ),
};

/**
 * Create a theme with custom colors for both light and dark modes.
 */
export const LightAndDarkModes: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Define different colors for light and dark color schemes.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { createOxygenTheme } from "@wso2/oxygen-ui";

const theme = createOxygenTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1976d2" },    // Blue
        secondary: { main: "#dc004e" },  // Red
        background: {
          default: "#f5f5f5",
          paper: "#ffffff",
        }
      }
    },
    dark: {
      palette: {
        primary: { main: "#90caf9" },    // Light blue
        secondary: { main: "#f48fb1" },  // Pink
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        }
      }
    }
  }
});`}
      />
    </Stack>
  ),
};

/**
 * Customize typography, spacing, and other theme properties.
 */
export const CustomTypography: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Beyond colors - customize typography, spacing, and more.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { createOxygenTheme } from "@wso2/oxygen-ui";

const theme = createOxygenTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#2196f3" }
      }
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    }
  },
  spacing: 8, // Base spacing unit
  shape: {
    borderRadius: 8, // Default border radius
  }
});`}
      />
    </Stack>
  ),
};

/**
 * Use createOxygenTheme for runtime theme configuration.
 */
export const RuntimeConfiguration: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Convert runtime configuration objects to theme instances.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { createOxygenTheme, OxygenUIThemeProvider } from "@wso2/oxygen-ui";

// Configuration loaded at runtime (e.g., from API or config file)
const runtimeConfig = {
  colorSchemes: {
    light: {
      palette: {
        primary: { main: window.__BRAND_COLOR__ || "#1976d2" }
      }
    }
  }
};

// Convert to theme instance
const theme = createOxygenTheme(runtimeConfig);

function App() {
  return (
    <OxygenUIThemeProvider theme={theme}>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}`}
      />
    </Stack>
  ),
};

/**
 * Use with OxygenUIThemeProvider's themes array for multi-theme support.
 */
export const MultiThemeSupport: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Create multiple themes and let users switch between them.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { createOxygenTheme, OxygenUIThemeProvider } from "@wso2/oxygen-ui";

const themes = [
  {
    key: "blue",
    label: "Blue Theme",
    theme: createOxygenTheme({
      colorSchemes: {
        light: { palette: { primary: { main: "#2196f3" } } }
      }
    })
  },
  {
    key: "purple",
    label: "Purple Theme",
    theme: createOxygenTheme({
      colorSchemes: {
        light: { palette: { primary: { main: "#9c27b0" } } }
      }
    })
  },
  {
    key: "green",
    label: "Green Theme",
    theme: createOxygenTheme({
      colorSchemes: {
        light: { palette: { primary: { main: "#4caf50" } } }
      }
    })
  }
];

<OxygenUIThemeProvider themes={themes} initialTheme="blue">
  <ThemeSwitcher />
  <YourApp />
</OxygenUIThemeProvider>`}
      />
    </Stack>
  ),
};

/**
 * Convert inline theme objects to theme instances for mixed configurations.
 */
export const MixedThemeSources: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Handle themes from multiple sources (objects, files, pre-built themes).
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { 
  createOxygenTheme, 
  OxygenUIThemeProvider,
  AcrylicOrangeTheme 
} from "@wso2/oxygen-ui";

// Runtime configuration from window object
declare global {
  interface Window {
    __APP_RUNTIME_CONFIG__?: {
      design?: {
        themes?: Array<{
          key: string;
          label: string;
          theme: string | object;
        }>;
      };
    };
  }
}

const config = window.__APP_RUNTIME_CONFIG__;

<OxygenUIThemeProvider 
  themes={[
    // Pre-built theme
    { key: "orange", label: "Orange", theme: AcrylicOrangeTheme },
    
    // Map runtime config themes
    ...(config?.design?.themes?.map((theme) => ({
      key: theme.key,
      label: theme.label,
      // Convert object configs to theme instances
      theme: typeof theme.theme === 'string' 
        ? theme.theme 
        : createOxygenTheme(theme.theme)
    })) ?? [])
  ]}
>
  <YourApp />
</OxygenUIThemeProvider>`}
      />
    </Stack>
  ),
};

/**
 * Advanced usage - custom theme with Oxygen-specific features.
 */
export const OxygenSpecificFeatures: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Use Oxygen-specific theme extensions like blur effects and acrylic backgrounds.
      </Typography>
      <CodeBlock 
        language="tsx"
        code={`import { createOxygenTheme } from "@wso2/oxygen-ui";

const theme = createOxygenTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1976d2" },
        background: {
          default: "#f8fafc",
          paper: "#ffffffc5",    // Semi-transparent
          acrylic: "#ffffff40",   // Acrylic effect
        }
      }
    }
  },
  // Oxygen-specific blur settings
  blur: {
    none: 'none',
    light: 'blur(10px)',
    medium: 'blur(16px)',
    heavy: 'blur(24px)',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none',
        }),
      },
    },
  },
});`}
      />
    </Stack>
  ),
};
