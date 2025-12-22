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
import { Button, Stack, CircularProgress, useTheme } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Button component triggers user actions such as submitting a form, opening a dialog, or performing navigation.
 * It supports different variants, colors, and sizes to suit various use cases and design contexts.
 * 
 * This is a direct import of MUI button component. 
 * Read more at: https://mui.com/material-ui/react-button/
 */
const meta = {
  component: Button,
  title: 'Inputs/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI button component is a direct import of MUI button component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-button/](https://mui.com/material-ui/react-button/)',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variations – variant, color, size
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="primary">Primary Contained</Button>
      <Button variant="contained" color="secondary">Secondary Contained</Button>
      <Button variant="contained" color="error">Error Contained</Button>
      <Button variant="outlined" color="success">Success Outlined</Button>
    </Stack>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" size="small">Small</Button>
      <Button variant="contained" size="medium">Medium</Button>
      <Button variant="contained" size="large">Large</Button>
    </Stack>
  ),
};

export const States: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <Stack direction="column" spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="contained">Default</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button
            variant="contained"
            startIcon={<CircularProgress color="inherit" size={16} />}
            disabled
          >
            Loading
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined">Default</Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
          <Button
            variant="outlined"
            startIcon={<CircularProgress color="inherit" size={16} />}
            disabled
          >
            Loading
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="text">Default</Button>
          <Button variant="text" disabled>
            Disabled
          </Button>
          <Button
            variant="text"
            startIcon={<CircularProgress color="inherit" size={16} />}
            disabled
          >
            Loading
          </Button>
        </Stack>
      </Stack>
    );
  },
};
