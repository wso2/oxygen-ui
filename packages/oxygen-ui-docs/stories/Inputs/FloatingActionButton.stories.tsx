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
import { Fab, Stack, Box } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Floating Action Button (FAB) performs the primary action on a screen.
 * It appears in front of all screen content and is typically circular with an icon.
 * 
 * This is a direct import of MUI floating action button component. 
 * Read more at: https://mui.com/material-ui/react-floating-action-button/
 */
const meta: Meta<typeof Fab> = {
  title: 'Inputs/Floating Action Button',
  component: Fab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI floating action button component is a direct import of MUI floating action button component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-floating-action-button/](https://mui.com/material-ui/react-floating-action-button/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const Default: Story = {
  render: () => <Fab color="primary">+</Fab>,
};

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Fab color="primary">+</Fab>
      <Fab color="secondary">+</Fab>
      <Fab color="success">+</Fab>
      <Fab color="error">+</Fab>
      <Fab color="warning">+</Fab>
      <Fab color="info">+</Fab>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Fab size="small" color="primary">+</Fab>
      <Fab size="medium" color="primary">+</Fab>
      <Fab size="large" color="primary">+</Fab>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Fab variant="circular" color="primary">+</Fab>
      <Fab variant="extended" color="primary">
        <Box component="span" sx={{ mr: 1 }}>+</Box>
        Extended
      </Fab>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => <Fab disabled color="primary">+</Fab>,
};
