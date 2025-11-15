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
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Radio Group component allows users to select one option from a set.
 * Radio buttons should be used when only one choice is permitted.
 * 
 * This is a direct import of MUI radio component. 
 * Read more at: https://mui.com/material-ui/react-radio-button/
 */
const meta: Meta<typeof RadioGroup> = {
  title: 'Inputs/Radio Group',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI radio group component is a direct import of MUI radio component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-radio-button/](https://mui.com/material-ui/react-radio-button/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Gender</FormLabel>
      <RadioGroup defaultValue="female">
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  ),
};

export const Row: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Gender</FormLabel>
      <RadioGroup row defaultValue="female">
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Primary (default)</FormLabel>
        <RadioGroup row>
          <FormControlLabel value="1" control={<Radio />} label="Option 1" />
          <FormControlLabel value="2" control={<Radio />} label="Option 2" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Secondary</FormLabel>
        <RadioGroup row>
          <FormControlLabel value="1" control={<Radio color="secondary" />} label="Option 1" />
          <FormControlLabel value="2" control={<Radio color="secondary" />} label="Option 2" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Success</FormLabel>
        <RadioGroup row>
          <FormControlLabel value="1" control={<Radio color="success" />} label="Option 1" />
          <FormControlLabel value="2" control={<Radio color="success" />} label="Option 2" />
        </RadioGroup>
      </FormControl>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Options</FormLabel>
      <RadioGroup defaultValue="1">
        <FormControlLabel value="1" control={<Radio />} label="Enabled" />
        <FormControlLabel value="2" control={<Radio disabled />} label="Disabled" />
        <FormControlLabel value="3" control={<Radio disabled />} label="Disabled checked" />
      </RadioGroup>
    </FormControl>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <RadioGroup row defaultValue="1">
        <FormControlLabel value="1" control={<Radio size="small" />} label="Small" />
        <FormControlLabel value="2" control={<Radio />} label="Medium (default)" />
      </RadioGroup>
    </Stack>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('female');
    return (
      <FormControl>
        <FormLabel>Gender (Controlled)</FormLabel>
        <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    );
  },
};
