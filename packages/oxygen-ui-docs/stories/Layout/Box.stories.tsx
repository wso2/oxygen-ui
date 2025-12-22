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
import { Box, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Box component serves as a wrapper component for most CSS utility needs.
 * It provides a convenient way to apply styling through the sx prop.
 * 
 * This is a direct import of MUI box component. 
 * Read more at: https://mui.com/material-ui/react-box/
 */
const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI box component is a direct import of MUI box component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-box/](https://mui.com/material-ui/react-box/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => (
    <Box sx={{ width: 300, height: 300, border: '1px dashed grey', p: 2 }}>
      Box with primary background
    </Box>
  ),
};

export const WithStyling: Story = {
  render: () => (
    <Stack spacing={2}>
      <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 2 }}>
        Box with border and border radius
      </Box>
      <Box sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
        Box with success background
      </Box>
      <Box sx={{ p: 2, bgcolor: 'error.light', color: 'error.contrastText' }}>
        Box with error background
      </Box>
    </Stack>
  ),
};

export const AsComponent: Story = {
  render: () => (
    <Stack spacing={2}>
      <Box component="span" sx={{ p: 1, border: '1px dashed grey' }}>
        Box as span
      </Box>
      <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
        Box as section
      </Box>
      <Box component="article" sx={{ p: 2, bgcolor: 'background.paper' }}>
        Box as article
      </Box>
    </Stack>
  ),
};

export const WithFlexbox: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, p: 2, border: '1px solid grey' }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Item 1
      </Box>
      <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
        Item 2
      </Box>
      <Box sx={{ p: 2, bgcolor: 'success.main', color: 'success.contrastText' }}>
        Item 3
      </Box>
    </Box>
  ),
};

export const WithGrid: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
        p: 2,
        border: '1px solid grey',
      }}
    >
      <Box sx={{ p: 2, bgcolor: 'primary.light' }}>Grid Item 1</Box>
      <Box sx={{ p: 2, bgcolor: 'secondary.light' }}>Grid Item 2</Box>
      <Box sx={{ p: 2, bgcolor: 'success.light' }}>Grid Item 3</Box>
      <Box sx={{ p: 2, bgcolor: 'warning.light' }}>Grid Item 4</Box>
      <Box sx={{ p: 2, bgcolor: 'error.light' }}>Grid Item 5</Box>
      <Box sx={{ p: 2, bgcolor: 'info.light' }}>Grid Item 6</Box>
    </Box>
  ),
};
