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
import { Divider, Box, Chip, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Divider component creates a thin line to separate content in lists and layouts.
 * It can be horizontal or vertical with various styling options.
 * 
 * This is a direct import of MUI divider component. 
 * Read more at: https://mui.com/material-ui/react-divider/
 */
const meta: Meta<typeof Divider> = {
  title: 'Data Display/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI divider component is a direct import of MUI divider component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-divider/](https://mui.com/material-ui/react-divider/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      Content above
      <Divider />
      Content below
    </Box>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: 100 }}>
      Left content
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      Right content
    </Box>
  ),
};

export const WithText: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <Divider>CENTER</Divider>
      <Divider textAlign="left">LEFT</Divider>
      <Divider textAlign="right">RIGHT</Divider>
    </Stack>
  ),
};

export const WithChips: Story = {
  render: () => (
    <Box sx={{ width: 400 }}>
      <Divider>
        <Chip label="CHIP" size="small" />
      </Divider>
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <Divider>FULLWIDTH</Divider>
      <Divider variant="inset">INSET</Divider>
      <Divider variant="middle">MIDDLE</Divider>
    </Stack>
  ),
};
