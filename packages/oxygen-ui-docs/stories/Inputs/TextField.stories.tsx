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
import { TextField } from '@wso2/oxygen-ui';

const meta: Meta<typeof TextField> = {
  title: 'Inputs/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI text field component is a direct import of MUI text field component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-text-field/](https://mui.com/material-ui/react-text-field/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined',
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled',
    variant: 'filled',
  },
};

export const Standard: Story = {
  args: {
    label: 'Standard',
    variant: 'standard',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    helperText: 'Enter your email address',
    type: 'email',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    error: true,
    helperText: 'Invalid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    value: 'Disabled text field',
  },
};

export const Required: Story = {
  args: {
    label: 'Required',
    required: true,
  },
};

export const Multiline: Story = {
  args: {
    label: 'Multiline',
    multiline: true,
    rows: 4,
    placeholder: 'Enter multiple lines of text',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width',
    fullWidth: true,
  },
};
