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

import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher, Stack, Typography, Box, OxygenUIThemeProvider, extendTheme, CodeBlock } from '@wso2/oxygen-ui';
import React from 'react';

// Define example themes for stories
const defaultTheme = extendTheme({
  colorSchemes: {
    light: { palette: { primary: { main: '#1976d2' } } },
    dark: { palette: { primary: { main: '#90caf9' } } },
  },
});

const purpleTheme = extendTheme({
  colorSchemes: {
    light: { palette: { primary: { main: '#9c27b0' } } },
    dark: { palette: { primary: { main: '#ce93d8' } } },
  },
});

const greenTheme = extendTheme({
  colorSchemes: {
    light: { palette: { primary: { main: '#2e7d32' } } },
    dark: { palette: { primary: { main: '#66bb6a' } } },
  },
});

const exampleThemes = [
  { key: 'default', label: 'Default (Blue)', theme: defaultTheme },
  { key: 'purple', label: 'Purple', theme: purpleTheme },
  { key: 'green', label: 'Green', theme: greenTheme },
];

/**
 * ThemeSwitcher allows users to switch between multiple theme configurations.
 * Must be used within OxygenUIThemeProvider with the themes prop.
 */
const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Theming/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ThemeSwitcher component provides a dropdown interface for switching between multiple themes.
It must be used within an OxygenUIThemeProvider that has been configured with multiple themes.

### Features
- **Select Dropdown**: Intuitive theme selection interface
- **Label Display**: Optional label showing current theme
- **Multiple Variants**: Outlined, filled, or standard styles
- **Render Props**: Custom UI with complete control
- **Auto Switching**: Automatically applies selected theme

### Basic Usage
\`\`\`tsx
const themes = [
  { key: "default", label: "Default", theme: defaultTheme },
  { key: "purple", label: "Purple", theme: purpleTheme }
];

<OxygenUIThemeProvider themes={themes}>
  <ThemeSwitcher showLabel />
</OxygenUIThemeProvider>
\`\`\`

### ⚠️ Important
ThemeSwitcher requires OxygenUIThemeProvider with the \`themes\` prop.
It will not work with a single theme configuration.
        `,
      },
    },
  },
  argTypes: {
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the "Theme:" label',
      table: { defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'The variant of the select component',
      table: { defaultValue: { summary: 'standard' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the select component',
      table: { defaultValue: { summary: 'small' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  render: () => (
    <OxygenUIThemeProvider themes={exampleThemes}>
      <Stack spacing={2} alignItems="center" sx={{ minWidth: 250 }}>
        <ThemeSwitcher />
        <Typography variant="body2" color="text.secondary">
          Try switching themes to see the changes
        </Typography>
      </Stack>
    </OxygenUIThemeProvider>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <OxygenUIThemeProvider themes={exampleThemes}>
      <Stack spacing={2} alignItems="center" sx={{ minWidth: 250 }}>
        <ThemeSwitcher showLabel />
        <Typography variant="body2" color="text.secondary">
          With a label showing "Theme"
        </Typography>
      </Stack>
    </OxygenUIThemeProvider>
  ),
};

export const CustomLabel: Story = {
  render: () => (
    <OxygenUIThemeProvider themes={exampleThemes}>
      <Stack spacing={2} alignItems="center" sx={{ minWidth: 250 }}>
        <ThemeSwitcher showLabel label="Choose Theme" />
        <Typography variant="body2" color="text.secondary">
          With a custom label text
        </Typography>
      </Stack>
    </OxygenUIThemeProvider>
  ),
};

export const Variants: Story = {
  render: () => (
    <OxygenUIThemeProvider themes={exampleThemes}>
      <Stack spacing={3} sx={{ minWidth: 300 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Outlined
          </Typography>
          <ThemeSwitcher variant="outlined" showLabel />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Filled
          </Typography>
          <ThemeSwitcher variant="filled" showLabel />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Standard
          </Typography>
          <ThemeSwitcher variant="standard" showLabel />
        </Box>
      </Stack>
    </OxygenUIThemeProvider>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <OxygenUIThemeProvider themes={exampleThemes}>
      <Stack spacing={3} sx={{ minWidth: 300 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Small
          </Typography>
          <ThemeSwitcher size="small" showLabel />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Medium (Default)
          </Typography>
          <ThemeSwitcher size="medium" showLabel />
        </Box>
      </Stack>
    </OxygenUIThemeProvider>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 350, maxWidth: 600 }}>
      <Typography variant="h6">Complete Usage Example</Typography>
      
      <CodeBlock 
        language="tsx"
        code={`import { OxygenUIThemeProvider, ThemeSwitcher, extendTheme } from "@wso2/oxygen-ui";

// Define themes
const defaultTheme = extendTheme({ /* ... */ });
const purpleTheme = extendTheme({
  colorSchemes: {
    light: { 
      palette: { primary: { main: "#9c27b0" } } 
    }
  }
});

const themes = [
  { key: "default", label: "Default", theme: defaultTheme },
  { key: "purple", label: "Purple", theme: purpleTheme }
];

// In your app
function App() {
  return (
    <OxygenUIThemeProvider themes={themes}>
      <div>
        <ThemeSwitcher showLabel variant="outlined" />
        <YourContent />
      </div>
    </OxygenUIThemeProvider>
  );
}`}
      />
    </Stack>
  ),
};
