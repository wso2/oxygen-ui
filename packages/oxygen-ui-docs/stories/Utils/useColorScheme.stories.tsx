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
import type {Meta, StoryObj} from '@storybook/react';
import {useColorScheme, Box, Button, Chip, Stack, Typography} from '@wso2/oxygen-ui';
import {Moon, Sun, Monitor} from '@wso2/oxygen-ui-icons-react';

/**
 * `useColorScheme` is a hook that reads and controls the active color scheme (light / dark / system).
 *
 * Oxygen UI re-exports it directly from MUI. It requires the theme to be set up with CSS variables
 * via `CssVarsProvider` or the `colorSchemes` option in `createTheme`.
 *
 * Read the MUI documentation for the complete API:
 * [https://mui.com/material-ui/customization/css-theme-variables/usage/#usecolorscheme-hook](https://mui.com/material-ui/customization/css-theme-variables/usage/#usecolorscheme-hook)
 */
const meta: Meta = {
  title: 'Utils/useColorScheme',
  parameters: {
    a11y: {
      // Known WCAG AA exception: the brand primary color (#FF7300) does not
      // meet the 4.5:1 text-contrast requirement in the default themes.
      // Tracked in https://github.com/wso2/oxygen-ui/issues/558 — remove
      // this override once the palette decision lands.
      options: {
        rules: { 'color-contrast': { enabled: false } },
      },
    },
    layout: 'centered',
    docs: {
      description: {
        component:
          'Oxygen UI `useColorScheme` is a direct re-export of the MUI hook of the same name. ' +
          'It returns the current `mode` (`"light"` | `"dark"` | `"system"`) and a `setMode` function ' +
          'to change it at runtime. The hook requires the theme to be configured with CSS variables.\n\n' +
          'Read the MUI documentation for the complete API: ' +
          '[https://mui.com/material-ui/customization/css-theme-variables/usage/#usecolorscheme-hook]' +
          '(https://mui.com/material-ui/customization/css-theme-variables/usage/#usecolorscheme-hook)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Reads the current color scheme mode and displays it as a chip.
 */
export const ReadMode: Story = {
  render: () => {
    const {mode} = useColorScheme();

    return (
      <Box sx={{p: 2, textAlign: 'center'}}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Current mode
        </Typography>
        <Chip
          icon={mode === 'dark' ? <Moon size={14} /> : mode === 'light' ? <Sun size={14} /> : <Monitor size={14} />}
          label={mode ?? 'system'}
          color="primary"
          variant="outlined"
        />
      </Box>
    );
  },
};

/**
 * Uses `setMode` to switch between light, dark, and system modes at runtime.
 * Toggle the Storybook color scheme switcher in the toolbar to see it update.
 */
export const SetMode: Story = {
  render: () => {
    const {mode, setMode} = useColorScheme();

    return (
      <Box sx={{p: 2}}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Active mode: <strong>{mode ?? 'system'}</strong>
        </Typography>
        <Stack direction="row" spacing={1} sx={{mt: 1}}>
          <Button
            size="small"
            variant={mode === 'light' ? 'contained' : 'outlined'}
            startIcon={<Sun size={16} />}
            onClick={() => setMode('light')}
          >
            Light
          </Button>
          <Button
            size="small"
            variant={mode === 'dark' ? 'contained' : 'outlined'}
            startIcon={<Moon size={16} />}
            onClick={() => setMode('dark')}
          >
            Dark
          </Button>
          <Button
            size="small"
            variant={mode === 'system' ? 'contained' : 'outlined'}
            startIcon={<Monitor size={16} />}
            onClick={() => setMode('system')}
          >
            System
          </Button>
        </Stack>
      </Box>
    );
  },
};

/**
 * Conditionally renders content based on the active color scheme.
 */
export const ConditionalRendering: Story = {
  render: () => {
    const {mode} = useColorScheme();
    const isDark = mode === 'dark';

    return (
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: isDark ? 'primary.dark' : 'primary.light',
          bgcolor: isDark ? 'grey.900' : 'grey.50',
          textAlign: 'center',
          minWidth: 260,
        }}
      >
        {isDark ? <Moon size={28} /> : <Sun size={28} />}
        <Typography variant="body1" sx={{mt: 1}}>
          {isDark ? 'Dark mode is active' : 'Light mode is active'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
          Switch the Storybook theme in the toolbar to see this update.
        </Typography>
      </Box>
    );
  },
};
