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
import { Stack, Paper, Divider } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Stack component manages the layout of immediate children along the vertical or horizontal axis 
 * with optional spacing and dividers between each child.
 * 
 * This is a direct import of MUI stack component. 
 * Read more at: https://mui.com/material-ui/react-stack/
 */
const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI stack component is a direct import of MUI stack component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-stack/](https://mui.com/material-ui/react-stack/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Vertical: Story = {
  render: () => (
    <Stack spacing={2}>
      <Paper sx={{ p: 2 }}>Item 1</Paper>
      <Paper sx={{ p: 2 }}>Item 2</Paper>
      <Paper sx={{ p: 2 }}>Item 3</Paper>
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Paper sx={{ p: 2 }}>Item 1</Paper>
      <Paper sx={{ p: 2 }}>Item 2</Paper>
      <Paper sx={{ p: 2 }}>Item 3</Paper>
    </Stack>
  ),
};

export const Spacing: Story = {
  render: () => (
    <>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Paper sx={{ p: 1 }}>spacing=1</Paper>
        <Paper sx={{ p: 1 }}>spacing=1</Paper>
        <Paper sx={{ p: 1 }}>spacing=1</Paper>
      </Stack>
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Paper sx={{ p: 1 }}>spacing=3</Paper>
        <Paper sx={{ p: 1 }}>spacing=3</Paper>
        <Paper sx={{ p: 1 }}>spacing=3</Paper>
      </Stack>
      <Stack spacing={5}>
        <Paper sx={{ p: 1 }}>spacing=5</Paper>
        <Paper sx={{ p: 1 }}>spacing=5</Paper>
        <Paper sx={{ p: 1 }}>spacing=5</Paper>
      </Stack>
    </>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Paper sx={{ p: 2 }}>Item 1</Paper>
      <Paper sx={{ p: 2 }}>Item 2</Paper>
      <Paper sx={{ p: 2 }}>Item 3</Paper>
    </Stack>
  ),
};

export const ResponsiveDirection: Story = {
  render: () => (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Paper sx={{ p: 2 }}>Item 1</Paper>
      <Paper sx={{ p: 2 }}>Item 2</Paper>
      <Paper sx={{ p: 2 }}>Item 3</Paper>
    </Stack>
  ),
};
