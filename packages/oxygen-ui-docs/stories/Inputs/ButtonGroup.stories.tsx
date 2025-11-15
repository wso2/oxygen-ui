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
import { Button, ButtonGroup, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The ButtonGroup component groups related buttons together.
 * It supports different variants, colors, and orientations.
 * 
 * This is a direct import of MUI button group component. 
 * Read more at: https://mui.com/material-ui/react-button-group/
 */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Inputs/Button Group',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI button group component is a direct import of MUI button group component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-button-group/](https://mui.com/material-ui/react-button-group/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup variant="contained">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="column" spacing={2}>
      <ButtonGroup variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="text">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="column" spacing={2}>
      <ButtonGroup variant="contained" color="primary">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="secondary">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="error">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="column" spacing={2} alignItems="center">
      <ButtonGroup size="small" variant="contained">
        <Button>Small</Button>
        <Button>Small</Button>
        <Button>Small</Button>
      </ButtonGroup>
      <ButtonGroup size="medium" variant="contained">
        <Button>Medium</Button>
        <Button>Medium</Button>
        <Button>Medium</Button>
      </ButtonGroup>
      <ButtonGroup size="large" variant="contained">
        <Button>Large</Button>
        <Button>Large</Button>
        <Button>Large</Button>
      </ButtonGroup>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" variant="contained">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ButtonGroup variant="contained" disabled>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};
