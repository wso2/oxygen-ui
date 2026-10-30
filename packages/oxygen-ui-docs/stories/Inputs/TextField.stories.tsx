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
        component: 'Oxygen UI text field component is MUI text field component, with MUI\'s floating label by default. ' +
        'Set `labelPlacement="top"` to draw a static label above the field instead, and `optional` to append "(Optional)" to the label. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-text-field/](https://mui.com/material-ui/react-text-field/)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labelPlacement: {
      control: 'inline-radio',
      options: ['unset', 'top'],
      mapping: { unset: undefined, top: 'top' },
      description: 'Leave unset for MUI\'s floating label; `top` draws a static label above the field.',
      table: { type: { summary: "'top'" }, defaultValue: { summary: 'unset (floating label)' } },
    },
    optional: {
      control: 'boolean',
      description: 'Appends "(Optional)" to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const LabelOnTop: Story = {
  args: {
    labelPlacement: 'top',
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const LabelOnTopWithError: Story = {
  args: {
    labelPlacement: 'top',
    label: 'Label',
    error: true,
    helperText: 'Error message',
    defaultValue: 'Value',
  },
};

export const Optional: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    optional: true,
  },
};

export const LabelOnTopOptional: Story = {
  args: {
    labelPlacement: 'top',
    label: 'Label',
    placeholder: 'Placeholder',
    optional: true,
  },
};

export const LabelOnTopFilled: Story = {
  args: {
    labelPlacement: 'top',
    label: 'Label',
    placeholder: 'Placeholder',
    variant: 'filled',
  },
};

export const LabelOnTopStandard: Story = {
  args: {
    labelPlacement: 'top',
    label: 'Label',
    placeholder: 'Placeholder',
    variant: 'standard',
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
