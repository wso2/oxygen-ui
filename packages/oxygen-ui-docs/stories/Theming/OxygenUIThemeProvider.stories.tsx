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
import { Stack, Typography, Paper, Box } from '@wso2/oxygen-ui';

const meta: Meta = {
  title: 'Theming/OxygenUIThemeProvider',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The root theme provider component for Oxygen UI applications. Wraps your application to provide theming capabilities ' +
          'with support for CSS variables, color schemes, and multiple themes.\n\n' +
          '**Features:**\n' +
          '- CSS variables for dynamic theming\n' +
          '- Built-in light and dark color schemes\n' +
          '- Support for single or multiple themes\n' +
          '- Theme switching capabilities\n' +
          '- SSR-safe implementation\n' +
          '- Persistent theme preferences\n\n' +
          '**Basic Usage:**\n' +
          '```tsx\n' +
          'import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";\n\n' +
          'function App() {\n' +
          '  return (\n' +
          '    <OxygenUIThemeProvider>\n' +
          '      <YourApp />\n' +
          '    </OxygenUIThemeProvider>\n' +
          '  );\n' +
          '}\n' +
          '```\n\n' +
          '**With Custom Theme:**\n' +
          '```tsx\n' +
          'import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";\n' +
          'import { extendTheme } from "@mui/material/styles";\n\n' +
          'const myTheme = extendTheme({\n' +
          '  cssVarPrefix: "custom",\n' +
          '  colorSchemes: {\n' +
          '    light: {\n' +
          '      palette: {\n' +
          '        primary: { main: "#9c27b0" }\n' +
          '      }\n' +
          '    },\n' +
          '    dark: {\n' +
          '      palette: {\n' +
          '        primary: { main: "#ce93d8" }\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '});\n\n' +
          '<OxygenUIThemeProvider theme={myTheme}>\n' +
          '  <YourApp />\n' +
          '</OxygenUIThemeProvider>\n' +
          '```\n\n' +
          '**With Multiple Themes:**\n' +
          '```tsx\n' +
          'const themes = [\n' +
          '  { id: "default", name: "Default", theme: defaultTheme },\n' +
          '  { id: "purple", name: "Purple", theme: purpleTheme },\n' +
          '  { id: "green", name: "Green", theme: greenTheme }\n' +
          '];\n\n' +
          '<OxygenUIThemeProvider \n' +
          '  themes={themes} \n' +
          '  initialTheme="default"\n' +
          '>\n' +
          '  <ThemeSwitcher showLabel />\n' +
          '  <YourApp />\n' +
          '</OxygenUIThemeProvider>\n' +
          '```\n\n' +
          '**Accessing Theme Switcher:**\n' +
          '```tsx\n' +
          'import { useThemeSwitcher } from "@wso2/oxygen-ui";\n\n' +
          'function MyComponent() {\n' +
          '  const { currentTheme, themes, switchTheme } = useThemeSwitcher();\n' +
          '  \n' +
          '  return (\n' +
          '    <div>\n' +
          '      <p>Current: {currentTheme?.name}</p>\n' +
          '      <button onClick={() => switchTheme("purple")}>\n' +
          '        Switch to Purple\n' +
          '      </button>\n' +
          '    </div>\n' +
          '  );\n' +
          '}\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SingleTheme: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Typography variant="h5">Single Theme Setup</Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body2" component="pre" sx={{ 
          bgcolor: 'action.hover', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto',
          fontSize: '0.875rem',
          whiteSpace: 'pre-wrap'
        }}>
{`import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";

function App() {
  return (
    <OxygenUIThemeProvider>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}`}
        </Typography>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        The simplest setup - uses the default Oxygen theme with built-in light/dark color schemes.
      </Typography>
    </Stack>
  ),
};

export const CustomTheme: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Typography variant="h5">Custom Theme</Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body2" component="pre" sx={{ 
          bgcolor: 'action.hover', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto',
          fontSize: '0.875rem',
          whiteSpace: 'pre-wrap'
        }}>
{`import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";
import { extendTheme } from "@mui/material/styles";

const customTheme = extendTheme({
  cssVarPrefix: "custom",
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
        </Typography>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Create a custom theme using MUI's extendTheme with your brand colors and preferences.
      </Typography>
    </Stack>
  ),
};

export const MultipleThemes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Typography variant="h5">Multiple Themes Support</Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body2" component="pre" sx={{ 
          bgcolor: 'action.hover', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto',
          fontSize: '0.875rem',
          whiteSpace: 'pre-wrap'
        }}>
{`import { OxygenUIThemeProvider, ThemeSwitcher } from "@wso2/oxygen-ui";
import { extendTheme } from "@mui/material/styles";

const defaultTheme = extendTheme({ /* ... */ });
const purpleTheme = extendTheme({
  colorSchemes: {
    light: { palette: { primary: { main: "#9c27b0" } } },
    dark: { palette: { primary: { main: "#ce93d8" } } }
  }
});

const themes = [
  { id: "default", name: "Default", theme: defaultTheme },
  { id: "purple", name: "Purple", theme: purpleTheme }
];

<OxygenUIThemeProvider 
  themes={themes} 
  initialTheme="default"
>
  <ThemeSwitcher showLabel />
  <YourApp />
</OxygenUIThemeProvider>`}
        </Typography>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Provide multiple themes and let users switch between them using the ThemeSwitcher component.
      </Typography>
    </Stack>
  ),
};

export const UsingHook: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Typography variant="h5">Using useThemeSwitcher Hook</Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body2" component="pre" sx={{ 
          bgcolor: 'action.hover', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto',
          fontSize: '0.875rem',
          whiteSpace: 'pre-wrap'
        }}>
{`import { useThemeSwitcher } from "@wso2/oxygen-ui";

function ThemeInfo() {
  const { currentTheme, themes, switchTheme } = useThemeSwitcher();
  
  return (
    <div>
      <p>Current Theme: {currentTheme?.name}</p>
      <p>Available Themes: {themes.length}</p>
      
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
        </Typography>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Access theme information and programmatically switch themes in your components.
      </Typography>
    </Stack>
  ),
};

export const Props: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Typography variant="h5">Props Reference</Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">theme</Typography>
            <Typography variant="body2" color="text.secondary">
              Type: <code>Theme</code> (optional)
            </Typography>
            <Typography variant="body2">
              A single MUI theme created with extendTheme(). If not provided, uses the default Oxygen theme.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">themes</Typography>
            <Typography variant="body2" color="text.secondary">
              Type: <code>ThemeOption[]</code> (optional)
            </Typography>
            <Typography variant="body2">
              Array of theme options for multi-theme support. Each option has: id (string), name (string), theme (Theme).
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">initialTheme</Typography>
            <Typography variant="body2" color="text.secondary">
              Type: <code>string</code> (optional)
            </Typography>
            <Typography variant="body2">
              The ID of the theme to use initially. Only applicable when themes prop is provided.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">children</Typography>
            <Typography variant="body2" color="text.secondary">
              Type: <code>React.ReactNode</code>
            </Typography>
            <Typography variant="body2">
              Your application components.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  ),
};
