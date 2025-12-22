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
import { Box, Typography, Paper, Stack, Link, CodeBlock } from '@wso2/oxygen-ui';
import React from 'react';

const meta = {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Welcome to Oxygen UI - A comprehensive design system built on MUI',
      },
    }
  },
} satisfies Meta<{}>;

export default meta;
type Story = StoryObj<typeof meta>;

const WelcomeContent = () => (
  <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>

    <Box sx={{ my: 10 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Oxygen UI
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
        Oxygen UI is a design system built on MUI (Material-UI), providing a comprehensive set of 
        customizable components, themes, and utilities for building modern React applications.
      </Typography>
    </Box>

    <Stack spacing={3} sx={{ mb: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            🎨 Theme System
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built-in light/dark mode support with customizable themes. Easy theme switching 
            and theme-aware components.
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            🧩 Component Library
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Extended MUI components with additional features and custom components for 
            common use cases.
          </Typography>
        </Paper>
      </Stack>
      
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            🎭 Animations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Interactive animations like ParticleBackground for adding visual appeal to 
            your applications.
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            🔧 Developer Tools
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hooks and utilities for common tasks like theme-aware content and theme switching.
          </Typography>
        </Paper>
      </Stack>
    </Stack>

    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Getting Started
      </Typography>
      <Typography variant="body2" paragraph>
        Install Oxygen UI in your project:
      </Typography>
      <CodeBlock
        language="bash"
        code="npm install @wso2/oxygen-ui"
      />
      <Typography variant="body2" paragraph>
        Wrap your app with the OxygenUIThemeProvider:
      </Typography>
      <CodeBlock
        language="tsx"
        code={`import { OxygenUIThemeProvider, OxygenTheme } from '@wso2/oxygen-ui';

function App() {
  return (
    <OxygenUIThemeProvider 
      themes={[{ key: 'default', theme: OxygenTheme }]}
    >
      {/* Your app content */}
    </OxygenUIThemeProvider>
  );
}`}
      />
    </Paper>

    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="body1" color="text.secondary">
        Browse the sidebar to explore all available components, animations, and utilities.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        <Link href="https://github.com/wso2/oxygen-ui" target="_blank" rel="noopener">
          View on GitHub
        </Link>
      </Typography>
    </Box>
  </Box>
);

export const Welcome: Story = {
  render: () => <WelcomeContent />,
};
