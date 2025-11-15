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
import { Checkbox, FormControlLabel, FormGroup } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Checkbox component allows users to select one or more options from a set.
 * It supports different states such as checked, unchecked, and indeterminate.
 * 
 * This is a direct import of MUI checkbox component. 
 * Read more at: https://mui.com/material-ui/react-checkbox/
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI checkbox component is a direct import of MUI checkbox component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-checkbox/](https://mui.com/material-ui/react-checkbox/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => <Checkbox />,
};

export const Checked: Story = {
  render: () => <Checkbox defaultChecked />,
};

export const WithLabel: Story = {
  render: () => (
    <FormControlLabel
      control={<Checkbox defaultChecked />}
      label="Accept terms and conditions"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormGroup>
      <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
      <FormControlLabel control={<Checkbox disabled checked />} label="Disabled checked" />
    </FormGroup>
  ),
};

export const Indeterminate: Story = {
  render: () => <Checkbox indeterminate />,
};

export const Colors: Story = {
  render: () => (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Primary (default)" />
      <FormControlLabel control={<Checkbox defaultChecked color="secondary" />} label="Secondary" />
      <FormControlLabel control={<Checkbox defaultChecked color="success" />} label="Success" />
      <FormControlLabel control={<Checkbox defaultChecked color="error" />} label="Error" />
      <FormControlLabel control={<Checkbox defaultChecked color="warning" />} label="Warning" />
    </FormGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
        label={checked ? 'Checked' : 'Unchecked'}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <FormGroup>
      <FormControlLabel control={<Checkbox size="small" />} label="Small" />
      <FormControlLabel control={<Checkbox />} label="Medium (default)" />
      <FormControlLabel control={<Checkbox size="large" />} label="Large" />
    </FormGroup>
  ),
};
