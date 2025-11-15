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
import { Badge, Avatar, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Badge component generates a small badge to the top-right of its children.
 * It's commonly used to display notifications, counts, or status indicators.
 * 
 * This is a direct import of MUI badge component. 
 * Read more at: https://mui.com/material-ui/react-badge/
 */
const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI badge component is a direct import of MUI badge component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-badge/](https://mui.com/material-ui/react-badge/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => (
    <Badge badgeContent={4} color="primary">
      <Avatar>U</Avatar>
    </Badge>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Badge badgeContent={4} color="primary">
        <Avatar>P</Avatar>
      </Badge>
      <Badge badgeContent={4} color="secondary">
        <Avatar>S</Avatar>
      </Badge>
      <Badge badgeContent={4} color="success">
        <Avatar>S</Avatar>
      </Badge>
      <Badge badgeContent={4} color="error">
        <Avatar>E</Avatar>
      </Badge>
      <Badge badgeContent={4} color="warning">
        <Avatar>W</Avatar>
      </Badge>
    </Stack>
  ),
};

export const MaxValue: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Badge badgeContent={99} color="primary">
        <Avatar>U</Avatar>
      </Badge>
      <Badge badgeContent={100} color="primary">
        <Avatar>U</Avatar>
      </Badge>
      <Badge badgeContent={1000} max={999} color="primary">
        <Avatar>U</Avatar>
      </Badge>
    </Stack>
  ),
};

export const Dot: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Badge variant="dot" color="primary">
        <Avatar>U</Avatar>
      </Badge>
      <Badge variant="dot" color="secondary">
        <Avatar>U</Avatar>
      </Badge>
      <Badge variant="dot" color="success">
        <Avatar>U</Avatar>
      </Badge>
    </Stack>
  ),
};

export const Overlap: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Badge badgeContent={4} color="primary" overlap="circular">
        <Avatar>C</Avatar>
      </Badge>
      <Badge badgeContent={4} color="primary" overlap="rectangular">
        <Avatar variant="square">R</Avatar>
      </Badge>
    </Stack>
  ),
};

export const Invisible: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Badge badgeContent={0} color="primary">
        <Avatar>Z</Avatar>
      </Badge>
      <Badge badgeContent={0} showZero color="primary">
        <Avatar>Z</Avatar>
      </Badge>
    </Stack>
  ),
};
