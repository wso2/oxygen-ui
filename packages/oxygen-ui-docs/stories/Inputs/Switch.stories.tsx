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
import { Switch, FormControlLabel, FormGroup } from '@wso2/oxygen-ui';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI switch component is a direct import of MUI switch component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-switch/](https://mui.com/material-ui/react-switch/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => <Switch />,
};

export const Checked: Story = {
  render: () => <Switch defaultChecked />,
};

export const WithLabel: Story = {
  render: () => (
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Enable notifications"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormGroup>
      <FormControlLabel control={<Switch disabled />} label="Disabled" />
      <FormControlLabel control={<Switch disabled checked />} label="Disabled checked" />
    </FormGroup>
  ),
};

export const Colors: Story = {
  render: () => (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Primary (default)" />
      <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Secondary" />
      <FormControlLabel control={<Switch defaultChecked color="success" />} label="Success" />
      <FormControlLabel control={<Switch defaultChecked color="error" />} label="Error" />
      <FormControlLabel control={<Switch defaultChecked color="warning" />} label="Warning" />
    </FormGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <FormControlLabel
        control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
        label={checked ? 'On' : 'Off'}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <FormGroup>
      <FormControlLabel control={<Switch size="small" />} label="Small" />
      <FormControlLabel control={<Switch />} label="Medium (default)" />
    </FormGroup>
  ),
};

export const LabelPlacement: Story = {
  render: () => (
    <FormGroup>
      <FormControlLabel control={<Switch />} label="End (default)" labelPlacement="end" />
      <FormControlLabel control={<Switch />} label="Start" labelPlacement="start" />
      <FormControlLabel control={<Switch />} label="Top" labelPlacement="top" />
      <FormControlLabel control={<Switch />} label="Bottom" labelPlacement="bottom" />
    </FormGroup>
  ),
};
