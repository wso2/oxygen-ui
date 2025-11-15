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

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@wso2/oxygen-ui';

/**
 * Number Field is a TextField with type="number" for numeric input.
 * 
 * Read more at: https://mui.com/material-ui/react-number-field/
 */
const meta: Meta<typeof TextField> = {
  title: 'Inputs/Number Field',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI Number Field is a direct import of MUI TextField with type="number". \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-number-field/](https://mui.com/material-ui/react-number-field/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

/**
 * Basic number field
 */
export const Basic: Story = {
  args: {
    type: 'number',
    label: 'Number',
    defaultValue: 0,
  },
};

/**
 * Number field with validation
 */
export const WithValidation: Story = {
  args: {
    type: 'number',
    label: 'Age',
    defaultValue: 18,
    inputProps: {
      min: 0,
      max: 120,
      step: 1,
    },
    helperText: 'Must be between 0 and 120',
  },
};

/**
 * Number field with decimal
 */
export const Decimal: Story = {
  args: {
    type: 'number',
    label: 'Price',
    defaultValue: 99.99,
    inputProps: {
      min: 0,
      step: 0.01,
    },
    InputProps: {
      startAdornment: '$',
    },
  },
};

/**
 * Required number field
 */
export const Required: Story = {
  args: {
    type: 'number',
    label: 'Quantity',
    required: true,
    defaultValue: 1,
    inputProps: {
      min: 1,
    },
  },
};

/**
 * Disabled number field
 */
export const Disabled: Story = {
  args: {
    type: 'number',
    label: 'Disabled',
    defaultValue: 42,
    disabled: true,
  },
};

/**
 * Number field variants
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '250px' }}>
      <TextField type="number" label="Outlined" variant="outlined" defaultValue={0} />
      <TextField type="number" label="Filled" variant="filled" defaultValue={0} />
      <TextField type="number" label="Standard" variant="standard" defaultValue={0} />
    </div>
  ),
};
