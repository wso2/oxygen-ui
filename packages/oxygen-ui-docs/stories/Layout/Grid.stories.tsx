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
import { Paper, Box } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * Grid layouts using CSS Grid provide a responsive layout system.
 * This example demonstrates building responsive grids using Box component with CSS Grid properties.
 * 
 * For more complex grid layouts, you can also use MUI's Grid component.
 * Read more at: https://mui.com/material-ui/react-grid/
 */
const meta: Meta<typeof Box> = {
  title: 'Layout/Grid',
  component: Box,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Grid layouts using CSS Grid (via Box component) or MUI Grid component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-grid/](https://mui.com/material-ui/react-grid/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const BasicGrid: Story = {
  render: () => (
    <Box sx={{ width: 600 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Paper sx={{ p: 2 }}>span 8</Paper>
        </Box>
        <Box sx={{ gridColumn: 'span 4' }}>
          <Paper sx={{ p: 2 }}>span 4</Paper>
        </Box>
        <Box sx={{ gridColumn: 'span 4' }}>
          <Paper sx={{ p: 2 }}>span 4</Paper>
        </Box>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Paper sx={{ p: 2 }}>span 8</Paper>
        </Box>
      </Box>
    </Box>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Box sx={{ width: 600 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mb: 2 }}>
        <Paper sx={{ p: 2 }}>gap=1</Paper>
        <Paper sx={{ p: 2 }}>gap=1</Paper>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
        <Paper sx={{ p: 2 }}>gap=2</Paper>
        <Paper sx={{ p: 2 }}>gap=2</Paper>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
        <Paper sx={{ p: 2 }}>gap=3</Paper>
        <Paper sx={{ p: 2 }}>gap=3</Paper>
      </Box>
    </Box>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Box sx={{ width: 600 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        <Paper sx={{ p: 2 }}>Item 1</Paper>
        <Paper sx={{ p: 2 }}>Item 2</Paper>
        <Paper sx={{ p: 2 }}>Item 3</Paper>
        <Paper sx={{ p: 2 }}>Item 4</Paper>
        <Paper sx={{ p: 2 }}>Item 5</Paper>
      </Box>
    </Box>
  ),
};

export const AutoGrid: Story = {
  render: () => (
    <Box sx={{ width: 600 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 2 }}>
        <Paper sx={{ p: 2 }}>Auto</Paper>
        <Paper sx={{ p: 2 }}>Flexible (1fr)</Paper>
        <Paper sx={{ p: 2 }}>Auto</Paper>
      </Box>
    </Box>
  ),
};

export const NestedGrid: Story = {
  render: () => (
    <Box sx={{ width: 600 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
            <Paper sx={{ p: 1 }}>Nested 1</Paper>
            <Paper sx={{ p: 1 }}>Nested 2</Paper>
            <Paper sx={{ p: 1 }}>Nested 3</Paper>
          </Box>
        </Paper>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Paper sx={{ p: 2 }}>Item 1</Paper>
          <Paper sx={{ p: 2 }}>Item 2</Paper>
        </Box>
      </Box>
    </Box>
  ),
};
