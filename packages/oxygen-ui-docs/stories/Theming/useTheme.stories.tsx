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
import { useTheme, Paper, Typography, Stack, Box, Chip } from '@wso2/oxygen-ui';
import React from 'react';

// Demonstration component using useTheme hook
function ThemeInspector() {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h5" gutterBottom>
          Current Theme Configuration
        </Typography>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Breakpoints
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {Object.entries(theme.breakpoints.values).map(([key, value]) => (
              <Chip key={key} label={`${key}: ${value}px`} size="small" />
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Spacing Unit
          </Typography>
          <Typography variant="body2">
            Base unit: {theme.spacing(1)} (theme.spacing(1))
          </Typography>
          <Typography variant="body2">
            Double unit: {theme.spacing(2)} (theme.spacing(2))
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Shape (Border Radius)
          </Typography>
          <Typography variant="body2">
            Default: {theme.shape.borderRadius}px
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Typography
          </Typography>
          <Typography variant="body2">
            Font Family: {theme.typography.fontFamily}
          </Typography>
          <Typography variant="body2">
            Base Font Size: {theme.typography.fontSize}px
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

// Component demonstrating palette access
function PaletteDemo() {
  const theme = useTheme();

  const colorCategories = [
    { name: 'Primary', color: theme.palette.primary },
    { name: 'Secondary', color: theme.palette.secondary },
    { name: 'Error', color: theme.palette.error },
    { name: 'Warning', color: theme.palette.warning },
    { name: 'Info', color: theme.palette.info },
    { name: 'Success', color: theme.palette.success },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h5" gutterBottom>
          Theme Palette Colors
        </Typography>

        <Stack spacing={2}>
          {colorCategories.map((category) => (
            <Box key={category.name}>
              <Typography variant="subtitle2" gutterBottom>
                {category.name}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    width: 60,
                    height: 40,
                    bgcolor: category.color.light,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption">Light</Typography>
                </Box>
                <Box
                  sx={{
                    width: 60,
                    height: 40,
                    bgcolor: category.color.main,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.color.contrastText,
                  }}
                >
                  <Typography variant="caption">Main</Typography>
                </Box>
                <Box
                  sx={{
                    width: 60,
                    height: 40,
                    bgcolor: category.color.dark,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.color.contrastText,
                  }}
                >
                  <Typography variant="caption">Dark</Typography>
                </Box>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Main: {category.color.main}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}

// Component demonstrating responsive styling with breakpoints
function ResponsiveDemo() {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={2}>
        <Typography variant="h5" gutterBottom>
          Responsive Styling with Breakpoints
        </Typography>

        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            textAlign: 'center',
            // Using theme breakpoints for responsive styling
            [theme.breakpoints.down('sm')]: {
              bgcolor: 'error.main',
            },
            [theme.breakpoints.between('sm', 'md')]: {
              bgcolor: 'warning.main',
            },
            [theme.breakpoints.up('md')]: {
              bgcolor: 'success.main',
            },
          }}
        >
          <Typography variant="body1">
            Resize your browser to see different colors:
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Red (xs) → Orange (sm) → Green (md+)
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
          <Typography variant="subtitle2" gutterBottom>
            Code Example
          </Typography>
          <Typography
            component="pre"
            variant="caption"
            sx={{
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {`const theme = useTheme();

sx={{
  [theme.breakpoints.down('sm')]: {
    bgcolor: 'error.main',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    bgcolor: 'warning.main',
  },
  [theme.breakpoints.up('md')]: {
    bgcolor: 'success.main',
  },
}}`}
          </Typography>
        </Paper>
      </Stack>
    </Paper>
  );
}

// Component demonstrating custom styling with theme tokens
function CustomStyling() {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={2}>
        <Typography variant="h5" gutterBottom>
          Custom Styling with Theme Tokens
        </Typography>

        <Box
          sx={{
            p: theme.spacing(3),
            borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius * 2 : theme.shape.borderRadius,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: theme.shadows[4],
            transition: theme.transitions.create(['transform', 'box-shadow'], {
              duration: theme.transitions.duration.standard,
            }),
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <Typography variant="body1">
            Hover over this box to see smooth transitions
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
          <Typography variant="subtitle2" gutterBottom>
            Code Example
          </Typography>
          <Typography
            component="pre"
            variant="caption"
            sx={{
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {`const theme = useTheme();

sx={{
  p: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  bgcolor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[4],
  transition: theme.transitions.create(
    ['transform', 'box-shadow'],
    { duration: theme.transitions.duration.standard }
  ),
}}`}
          </Typography>
        </Paper>
      </Stack>
    </Paper>
  );
}

const meta: Meta = {
  title: 'Utils/useTheme',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI\'s `useTheme` hook provides access to the complete theme object, including palette, typography, spacing, breakpoints, and more. ' +
          'This is useful when you need direct access to theme tokens for custom styling or logic.\n\n' +
          '**Key Features:**\n' +
          '- Access all theme tokens (palette, typography, spacing, etc.)\n' +
          '- Use breakpoints for responsive styling\n' +
          '- Access transitions and shadows\n' +
          '- Type-safe with TypeScript\n' +
          '- Works with any MUI theme, including Oxygen UI themes\n\n' +
          '**Usage:**\n' +
          '```tsx\n' +
          'import { useTheme } from "@wso2/oxygen-ui";\n\n' +
          'function MyComponent() {\n' +
          '  const theme = useTheme();\n\n' +
          '  return (\n' +
          '    <Box sx={{ color: theme.palette.primary.main }}>\n' +
          '      Styled with theme tokens\n' +
          '    </Box>\n' +
          '  );\n' +
          '}\n' +
          '```\n\n' +
          '**Note:** This hook is re-exported from MUI and works seamlessly with Oxygen UI themes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Inspect the current theme configuration including breakpoints, spacing, shape, and typography.
 */
export const ThemeConfiguration: Story = {
  render: () => <ThemeInspector />,
};

/**
 * Access and display theme palette colors including primary, secondary, error, warning, info, and success.
 */
export const PaletteAccess: Story = {
  render: () => <PaletteDemo />,
};

/**
 * Use theme breakpoints for responsive styling that adapts to different screen sizes.
 */
export const ResponsiveStyling: Story = {
  render: () => <ResponsiveDemo />,
};

/**
 * Apply custom styling using theme tokens like spacing, border radius, shadows, and transitions.
 */
export const CustomStylingExample: Story = {
  render: () => <CustomStyling />,
};

/**
 * Minimal example showing basic theme access and usage.
 */
export const BasicUsage: Story = {
  render: () => {
    function BasicExample() {
      const theme = useTheme();

      return (
        <Box sx={{ p: 3, maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Basic useTheme Example
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Primary Color: {theme.palette.primary.main}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Spacing Unit: {theme.spacing(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Border Radius: {theme.shape.borderRadius}px
          </Typography>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: theme.shape.borderRadius,
            }}
          >
            Styled with theme tokens
          </Box>
        </Box>
      );
    }

    return <BasicExample />;
  },
};
