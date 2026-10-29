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
import { Avatar, AvatarGroup, Stack } from '@wso2/oxygen-ui';
import { Box, Layers, Package, ShieldCheck, TriangleAlert } from '@wso2/oxygen-ui-icons-react';
import React from 'react';

/**
 * The Avatar component displays user profile pictures, icons, or initials.
 * It supports different sizes, variants, and can be grouped together.
 * 
 * This is a direct import of MUI avatar component. 
 * Read more at: https://mui.com/material-ui/react-avatar/
 */
const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI avatar component is a direct import of MUI avatar component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-avatar/](https://mui.com/material-ui/react-avatar/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => <Avatar>A</Avatar>,
};

export const WithInitials: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Avatar>H</Avatar>
      <Avatar>JD</Avatar>
      <Avatar>AB</Avatar>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Avatar variant="circular">JD</Avatar>
      <Avatar variant="rounded">JD</Avatar>
      <Avatar variant="square">JD</Avatar>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>S</Avatar>
      <Avatar>M</Avatar>
      <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
      <Avatar sx={{ width: 72, height: 72, fontSize: '2rem' }}>XL</Avatar>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: 'primary.main' }}>P</Avatar>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>S</Avatar>
      <Avatar sx={{ bgcolor: 'success.main' }}>S</Avatar>
      <Avatar sx={{ bgcolor: 'error.main' }}>E</Avatar>
      <Avatar sx={{ bgcolor: 'warning.main' }}>W</Avatar>
    </Stack>
  ),
};

/**
 * The `light` variant has a tinted background (12% of the color) with the color itself for the icon.
 * Pick the color with the `color` prop (default `primary`). Use it with icons rather than text, as colored
 * text on the tint is below the 4.5:1 contrast ratio. It is always circular.
 */
export const Light: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Avatar variant="light" color="primary">
        <Box size={20} />
      </Avatar>
      <Avatar variant="light" color="secondary">
        <Layers size={20} />
      </Avatar>
      <Avatar variant="light" color="success">
        <ShieldCheck size={20} />
      </Avatar>
      <Avatar variant="light" color="error">
        <TriangleAlert size={20} />
      </Avatar>
      <Avatar variant="light" color="warning">
        <Package size={20} />
      </Avatar>
    </Stack>
  ),
};

export const Group: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <AvatarGroup max={4}>
        <Avatar>H</Avatar>
        <Avatar>T</Avatar>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
      </AvatarGroup>
      <AvatarGroup max={3}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
        <Avatar>D</Avatar>
        <Avatar>E</Avatar>
      </AvatarGroup>
    </Stack>
  ),
};
