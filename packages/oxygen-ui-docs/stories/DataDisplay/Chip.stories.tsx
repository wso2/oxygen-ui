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
import { Chip, Stack, Avatar, Box } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Chip component represents small blocks of information.
 * Chips are used for tags, categories, or compact representations of data.
 * 
 * This is a direct import of MUI chip component. 
 * Read more at: https://mui.com/material-ui/react-chip/
 */
const meta: Meta<typeof Chip> = {
  title: 'Data Display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI chip component is a direct import of MUI chip component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-chip/](https://mui.com/material-ui/react-chip/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => <Chip label="Chip" />,
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip label="Filled" />
      <Chip label="Outlined" variant="outlined" />
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Error" color="error" />
      <Chip label="Warning" color="warning" />
      <Chip label="Info" color="info" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip label="Small" size="small" />
      <Chip label="Medium" />
    </Stack>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip label="Clickable" onClick={() => alert('Clicked!')} />
      <Chip label="Clickable" variant="outlined" onClick={() => alert('Clicked!')} />
    </Stack>
  ),
};

export const Deletable: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip label="Deletable" onDelete={() => alert('Delete clicked!')} />
      <Chip label="Deletable" variant="outlined" onDelete={() => alert('Delete clicked!')} />
    </Stack>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar>M</Avatar>} label="With Avatar" />
      <Chip avatar={<Avatar>M</Avatar>} label="With Avatar" variant="outlined" />
    </Stack>
  ),
};

// The dot takes the chip's colour through `currentColor`, so it matches the label in every variant and colour.
const StatusDot = (props: React.ComponentProps<typeof Box>) => (
  <Box
    component="span"
    {...props}
    sx={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      bgcolor: 'currentColor',
      // The chip's default icon spacing is sized for 18px icons, which leaves a small dot cramped
      '.MuiChip-root &.MuiChip-icon': { marginLeft: '10px', marginRight: '-4px' },
      '.MuiChip-root &.MuiChip-iconSmall': { marginLeft: '8px', marginRight: '-2px' },
    }}
  />
);

export const WithStatusDot: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip icon={<StatusDot />} label="Available" color="success" variant="outlined" />
      <Chip icon={<StatusDot />} label="Pending" color="warning" variant="outlined" />
      <Chip icon={<StatusDot />} label="Failed" color="error" variant="outlined" />
      <Chip icon={<StatusDot />} label="Draft" variant="outlined" />
      <Chip icon={<StatusDot />} label="Available" color="success" />
      <Chip icon={<StatusDot />} label="Available" color="success" variant="outlined" size="small" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pass a small dot as the `icon` to show a status. The chip colours the icon, so the dot matches the label.',
      },
    },
  },
};

export const Tag: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip variant="tag" label="Webinar" />
      <Chip variant="tag" color="primary" label="New" />
      <Chip variant="tag" color="success" label="Live" />
      <Chip variant="tag" label="Beta" size="small" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The `tag` variant is a filled, square-cornered uppercase label, styled by `ChoreoLabsTheme` only. ' +
          'It is dark blue by default; set `color` to use another palette colour.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip label="Disabled" disabled />
      <Chip label="Disabled" disabled onDelete={() => {}} />
    </Stack>
  ),
};
