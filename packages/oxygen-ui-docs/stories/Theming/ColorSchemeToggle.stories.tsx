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
import { ColorSchemeToggle, Stack, Typography, Paper } from '@wso2/oxygen-ui';

const meta: Meta<typeof ColorSchemeToggle> = {
  title: 'Theming/ColorSchemeToggle',
  component: ColorSchemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle button component that cycles through light, dark, and system color schemes. ' +
          'Built on top of MUI\'s `useColorScheme` hook with automatic icon switching.\n\n' +
          '**Features:**\n' +
          '- Three modes: Light, Dark, and System (follows OS preference)\n' +
          '- Automatic icon updates based on current mode\n' +
          '- Tooltip labels for each mode\n' +
          '- Customizable icons\n' +
          '- Extends MUI IconButton props\n' +
          '- Fully interactive - click to cycle through modes!\n\n' +
          'Read MUI documentation for IconButton API: ' +
          '[https://mui.com/material-ui/api/icon-button/](https://mui.com/material-ui/api/icon-button/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorSchemeToggle>;

export const Default: Story = {
  render: () => (
    <Stack spacing={2} alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Click to cycle through: Light → Dark → System
      </Typography>
      <ColorSchemeToggle />
    </Stack>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">Size Variants</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack spacing={1} alignItems="center">
          <ColorSchemeToggle size="small" />
          <Typography variant="caption">Small</Typography>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <ColorSchemeToggle size="medium" />
          <Typography variant="caption">Medium</Typography>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <ColorSchemeToggle size="large" />
          <Typography variant="caption">Large</Typography>
        </Stack>
      </Stack>
    </Stack>
  ),
};

export const WithColors: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">Color Variants</Typography>
      <Stack direction="row" spacing={2}>
        <ColorSchemeToggle color="default" />
        <ColorSchemeToggle color="primary" />
        <ColorSchemeToggle color="secondary" />
        <ColorSchemeToggle color="error" />
        <ColorSchemeToggle color="info" />
        <ColorSchemeToggle color="success" />
        <ColorSchemeToggle color="warning" />
      </Stack>
    </Stack>
  ),
};

export const InToolbar: Story = {
  render: () => (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        minWidth: 400
      }}
    >
      <Typography variant="h6">Application Header</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Theme:
        </Typography>
        <ColorSchemeToggle />
      </Stack>
    </Paper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack spacing={2} alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Disabled state
      </Typography>
      <ColorSchemeToggle disabled />
    </Stack>
  ),
};
