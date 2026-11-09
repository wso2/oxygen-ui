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
import { Select, MenuItem, FormControl, InputLabel } from '@wso2/oxygen-ui';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI select component is MUI select component, with an added `labelPlacement` prop. ' +
        'Use `labelPlacement="top"` with `label` to draw a fixed label above the select; this is the recommended variant. ' +
        'Without it, the select keeps MUI\'s floating label, which needs a surrounding `FormControl` and `InputLabel`. ' +
        'Set `placeholder` to show text while nothing is selected. \n\n' +
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-select/](https://mui.com/material-ui/react-select/)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labelPlacement: {
      control: 'inline-radio',
      options: ['unset', 'top'],
      mapping: { unset: undefined, top: 'top' },
      description: 'Leave unset for MUI\'s floating label; `top` draws a fixed label above the select.',
      table: { type: { summary: "'top'" }, defaultValue: { summary: 'unset (floating label)' } },
    },
    placeholder: {
      control: 'text',
      description: 'Shown in the field while nothing is selected. Ignored by `native` selects.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const LabelOnTop: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        labelPlacement="top"
        label="Environment"
        placeholder="Select an environment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ minWidth: 240 }}
      >
        <MenuItem value="dev">Development</MenuItem>
        <MenuItem value="staging">Staging</MenuItem>
        <MenuItem value="prod">Production</MenuItem>
      </Select>
    );
  },
};

export const LabelOnTopRequired: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        labelPlacement="top"
        label="Environment"
        placeholder="Select an environment"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ minWidth: 240 }}
      >
        <MenuItem value="dev">Development</MenuItem>
        <MenuItem value="prod">Production</MenuItem>
      </Select>
    );
  },
};

export const LabelOnTopWithError: Story = {
  render: () => (
    <Select labelPlacement="top" label="Environment" placeholder="Select an environment" error value="" sx={{ minWidth: 240 }}>
      <MenuItem value="dev">Development</MenuItem>
      <MenuItem value="prod">Production</MenuItem>
    </Select>
  ),
};

/** Floating label. Prefer `LabelOnTop`; keep this only for existing screens. */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormControl sx={{ minWidth: 200 }}>
        {/* Link the label to the select via id/labelId so the combobox has an accessible name */}
        <InputLabel id="select-age-label">Age</InputLabel>
        <Select labelId="select-age-label" value={value} label="Age" onChange={(e) => setValue(e.target.value)}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState(20);
    return (
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="select-default-value-label">Age</InputLabel>
        <Select
          labelId="select-default-value-label"
          value={value}
          label="Age"
          onChange={(e) => setValue(e.target.value as number)}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="select-multiple-label">Names</InputLabel>
        <Select
          multiple
          labelId="select-multiple-label"
          value={values}
          label="Names"
          onChange={(e) => setValues(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
        >
          <MenuItem value="Oliver">Oliver</MenuItem>
          <MenuItem value="Van">Van</MenuItem>
          <MenuItem value="April">April</MenuItem>
        </Select>
      </FormControl>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Age</InputLabel>
      <Select value={20} label="Age" disabled>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  ),
};

export const Error: Story = {
  render: () => (
    <FormControl sx={{ minWidth: 200 }} error>
      <InputLabel>Age</InputLabel>
      <Select value="" label="Age">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  ),
};
