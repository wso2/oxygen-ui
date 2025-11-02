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
import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
export const Variants = () => (
  <Stack direction="row" spacing={2}>
    <Button variant="text">Text</Button>
    <Button variant="contained">Contained</Button>
    <Button variant="outlined">Outlined</Button>
  </Stack>
);

export const ColorVariants = () => (
  <Stack direction="row" spacing={2}>
    <Button variant="contained" color="primary">Primary Contained</Button>
    <Button variant="contained" color="secondary">Secondary Contained</Button>
    <Button variant="contained" color="error">Error Contained</Button>
    <Button variant="outlined" color="success">Success Outlined</Button>
  </Stack>
);

export const SizeVariants = () => (
  <Stack direction="row" spacing={2}>
    <Button variant="contained" size="small">Small</Button>
    <Button variant="contained" size="medium">Medium</Button>
    <Button variant="contained" size="large">Large</Button>
  </Stack>
);

