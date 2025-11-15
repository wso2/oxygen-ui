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
import { Tooltip, Button, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Tooltip component displays informative text when users hover over, focus on, or tap an element.
 * It provides helpful context without cluttering the interface.
 * 
 * This is a direct import of MUI tooltip component. 
 * Read more at: https://mui.com/material-ui/react-tooltip/
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI tooltip component is a direct import of MUI tooltip component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-tooltip/](https://mui.com/material-ui/react-tooltip/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip title="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tooltip title="Top Start" placement="top-start">
          <Button>Top Start</Button>
        </Tooltip>
        <Tooltip title="Top" placement="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip title="Top End" placement="top-end">
          <Button>Top End</Button>
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Tooltip title="Left" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip title="Right" placement="right">
          <Button>Right</Button>
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tooltip title="Bottom Start" placement="bottom-start">
          <Button>Bottom Start</Button>
        </Tooltip>
        <Tooltip title="Bottom" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip title="Bottom End" placement="bottom-end">
          <Button>Bottom End</Button>
        </Tooltip>
      </Stack>
    </Stack>
  ),
};

export const Arrow: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Tooltip title="With arrow" arrow>
        <Button>Arrow</Button>
      </Tooltip>
      <Tooltip title="Without arrow">
        <Button>No Arrow</Button>
      </Tooltip>
    </Stack>
  ),
};

export const FollowCursor: Story = {
  render: () => (
    <Tooltip title="Follows the cursor" followCursor>
      <Button>
        Hover me
      </Button>
    </Tooltip>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Tooltip title="Enabled tooltip">
        <Button>Enabled</Button>
      </Tooltip>
      <Tooltip title="This won't show">
        <span>
          <Button disabled>Disabled Button</Button>
        </span>
      </Tooltip>
    </Stack>
  ),
};
