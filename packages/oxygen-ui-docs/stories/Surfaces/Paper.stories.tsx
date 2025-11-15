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
import { Paper, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Paper component is a container with elevation (shadow).
 * It provides a surface for displaying content and actions on a single topic.
 * 
 * This is a direct import of MUI paper component. 
 * Read more at: https://mui.com/material-ui/react-paper/
 */
const meta: Meta<typeof Paper> = {
  title: 'Surfaces/Paper',
  component: Paper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI paper component is a direct import of MUI paper component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-paper/](https://mui.com/material-ui/react-paper/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  render: () => (
    <Paper sx={{ p: 2, width: 200, height: 100 }}>
      Default Paper
    </Paper>
  ),
};

export const Elevations: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Paper elevation={0} sx={{ p: 2, width: 100, height: 100 }}>elevation=0</Paper>
      <Paper elevation={1} sx={{ p: 2, width: 100, height: 100 }}>elevation=1</Paper>
      <Paper elevation={2} sx={{ p: 2, width: 100, height: 100 }}>elevation=2</Paper>
      <Paper elevation={3} sx={{ p: 2, width: 100, height: 100 }}>elevation=3</Paper>
      <Paper elevation={4} sx={{ p: 2, width: 100, height: 100 }}>elevation=4</Paper>
      <Paper elevation={6} sx={{ p: 2, width: 100, height: 100 }}>elevation=6</Paper>
      <Paper elevation={8} sx={{ p: 2, width: 100, height: 100 }}>elevation=8</Paper>
      <Paper elevation={12} sx={{ p: 2, width: 100, height: 100 }}>elevation=12</Paper>
      <Paper elevation={16} sx={{ p: 2, width: 100, height: 100 }}>elevation=16</Paper>
      <Paper elevation={24} sx={{ p: 2, width: 100, height: 100 }}>elevation=24</Paper>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Paper variant="elevation" elevation={3} sx={{ p: 2, width: 150, height: 100 }}>
        Elevation
      </Paper>
      <Paper variant="outlined" sx={{ p: 2, width: 150, height: 100 }}>
        Outlined
      </Paper>
    </Stack>
  ),
};

export const Square: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Paper sx={{ p: 2, width: 100, height: 100 }}>
        Rounded (default)
      </Paper>
      <Paper square sx={{ p: 2, width: 100, height: 100 }}>
        Square
      </Paper>
    </Stack>
  ),
};
