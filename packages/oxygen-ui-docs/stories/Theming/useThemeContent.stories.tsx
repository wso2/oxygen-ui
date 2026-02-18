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
import {
    OxygenUIThemeProvider,
    useThemeContent,
    Stack,
    Typography,
    Paper,
    Box,
    ThemeSwitcher,
    Card,
    CardContent,
    Avatar,
    Chip,
    extendTheme
} from '@wso2/oxygen-ui';
import { Smartphone, Settings, Plus } from '@wso2/oxygen-ui-icons-react';

// Define example themes for stories
const defaultTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#90caf9' },
      },
    },
  },
});

const purpleTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#9c27b0' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#ce93d8' },
      },
    },
  },
});

const greenTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#2e7d32' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#66bb6a' },
      },
    },
  },
});

const exampleThemes = [
  { key: 'default', label: 'Default (Blue)', theme: defaultTheme },
  { key: 'purple', label: 'Purple', theme: purpleTheme },
  { key: 'green', label: 'Green', theme: greenTheme },
];

// Dummy component using the hook
function ThemeGreeting() {
  const greeting = useThemeContent({
    default: 'Welcome to the Default Theme!',
    purple: 'Welcome to the Purple Theme!',
    green: 'Welcome to the Green Theme!',
  });

  return <Typography variant="h5">{greeting}</Typography>;
}

function ThemeIcon() {
  const Icon = useThemeContent({
    default: Smartphone,
    purple: Settings,
    green: Plus,
  });

  return <Icon style={{ fontSize: 48, color: '#1976d2' }} />;
}

function ThemeConfig() {
  const config = useThemeContent({
    default: { icon: '🔵', message: 'Clean and professional', color: '#1976d2' },
    purple: { icon: '🟣', message: 'Creative and bold', color: '#9c27b0' },
    green: { icon: '🟢', message: 'Natural and fresh', color: '#2e7d32' },
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h1">{config.icon}</Typography>
      <Typography variant="body1" sx={{ color: config.color, fontWeight: 'bold' }}>
        {config.message}
      </Typography>
    </Box>
  );
}

const meta: Meta = {
  title: 'Theming/useThemeContent',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A hook that returns theme-specific content based on the currently active theme. ' +
          '**⚠️ Must be used within `OxygenUIThemeProvider` with `themes` prop.**\n\n' +
          '**Features:**\n' +
          '- Generic hook that works with any content type\n' +
          '- String, numbers, objects, React components, etc.\n' +
          '- Automatic fallback support\n' +
          '- Type-safe with TypeScript generics\n' +
          '- Simple and flexible API\n\n' +
          '**Usage:**\n' +
          '```tsx\n' +
          'import { useThemeContent } from "@wso2/oxygen-ui";\n\n' +
          'function MyComponent() {\n' +
          '  const greeting = useThemeContent({\n' +
          '    default: "Hello Default",\n' +
          '    purple: "Hello Purple"\n' +
          '  });\n\n' +
          '  return <h1>{greeting}</h1>;\n' +
          '}\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const RequiredSetup: Story = {
  render: () => (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, bgcolor: 'warning.light' }}>
      <Stack spacing={2}>
        <Typography variant="h6" color="warning.dark">
          ⚠️ Setup Required
        </Typography>
        <Typography variant="body2">
          <strong>useThemeContent</strong> must be used within <code>OxygenUIThemeProvider</code> with multiple themes configured.
        </Typography>
        <Typography variant="body2" component="pre" sx={{ 
          bgcolor: 'background.paper', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto',
          fontSize: '0.75rem'
        }}>
{`import { OxygenUIThemeProvider, useThemeContent } from "@wso2/oxygen-ui";

const themes = [
  { key: "default", label: "Default", theme: defaultTheme },
  { key: "purple", label: "Purple", theme: purpleTheme }
];

function MyComponent() {
  const content = useThemeContent({
    default: "Default content",
    purple: "Purple content"
  });
  
  return <div>{content}</div>;
}

<OxygenUIThemeProvider themes={themes}>
  <MyComponent />
</OxygenUIThemeProvider>`}
        </Typography>
      </Stack>
    </Paper>
  ),
};

export const WithStrings: Story = {
  render: () => (
    <OxygenUIThemeProvider themes={exampleThemes}>
      <Stack spacing={3} alignItems="center" sx={{ minWidth: 400 }}>
        <ThemeSwitcher showLabel />
        <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper', width: '100%' }}>
          <ThemeGreeting />
        </Paper>
        <Typography variant="caption" color="text.secondary">
          The greeting text changes based on the selected theme
        </Typography>
      </Stack>
    </OxygenUIThemeProvider>
  ),
};

export const WithComponents: Story = {
  render: () => (
    <OxygenUIThemeProvider themes={exampleThemes}>
      <Stack spacing={3} alignItems="center">
        <ThemeSwitcher showLabel />
        <Paper elevation={2} sx={{ p: 4, bgcolor: 'background.paper' }}>
          <Stack spacing={2} alignItems="center">
            <ThemeIcon />
            <Typography variant="body2" color="text.secondary">
              Icon changes with theme
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </OxygenUIThemeProvider>
  ),
};

export const WithObjects: Story = {
  render: () => (
    <OxygenUIThemeProvider themes={exampleThemes}>
      <Stack spacing={3} alignItems="center" sx={{ minWidth: 350 }}>
        <ThemeSwitcher showLabel />
        <Paper elevation={2} sx={{ p: 4, bgcolor: 'background.paper', width: '100%' }}>
          <ThemeConfig />
        </Paper>
        <Typography variant="caption" color="text.secondary">
          Complex objects with multiple properties
        </Typography>
      </Stack>
    </OxygenUIThemeProvider>
  ),
};

export const RealWorldExample: Story = {
  render: () => {
    function DashboardCard() {
      const cardConfig = useThemeContent({
        default: {
          title: 'Enterprise Dashboard',
          description: 'Professional analytics and reporting',
          avatar: '💼',
          badge: 'Pro',
          badgeColor: 'primary' as const,
        },
        purple: {
          title: 'Creative Studio',
          description: 'Design tools and collaboration',
          avatar: '🎨',
          badge: 'Creative',
          badgeColor: 'secondary' as const,
        },
        green: {
          title: 'Eco Dashboard',
          description: 'Sustainability metrics and insights',
          avatar: '🌱',
          badge: 'Green',
          badgeColor: 'success' as const,
        },
      });

      return (
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {cardConfig.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{cardConfig.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cardConfig.description}
                    </Typography>
                  </Box>
                </Stack>
                <Chip label={cardConfig.badge} color={cardConfig.badgeColor} size="small" />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      );
    }

    return (
      <OxygenUIThemeProvider themes={exampleThemes}>
        <Stack spacing={3} alignItems="center">
          <ThemeSwitcher showLabel />
          <DashboardCard />
          <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 400, textAlign: 'center' }}>
            All content (title, description, avatar, badge) changes based on theme
          </Typography>
        </Stack>
      </OxygenUIThemeProvider>
    );
  },
};

export const WithFallback: Story = {
  render: () => {
    function FallbackExample() {
      // Only default theme has content, others will use fallback
      const message = useThemeContent(
        {
          default: 'This is the default theme message',
        },
        'Fallback message for themes without specific content'
      );

      return (
        <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="body1">{message}</Typography>
        </Paper>
      );
    }

    return (
      <OxygenUIThemeProvider themes={exampleThemes}>
        <Stack spacing={3} alignItems="center" sx={{ minWidth: 450 }}>
          <ThemeSwitcher showLabel />
          <FallbackExample />
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
            Try switching to Purple or Green theme to see the fallback
          </Typography>
        </Stack>
      </OxygenUIThemeProvider>
    );
  },
};
