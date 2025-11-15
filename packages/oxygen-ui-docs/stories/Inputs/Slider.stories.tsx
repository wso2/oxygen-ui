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
import { Slider, Stack, Typography, Box } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Slider component allows users to select a value or range of values along a bar.
 * It supports continuous and discrete values, custom marks, and various orientations.
 * 
 * This is a direct import of MUI slider component. 
 * Read more at: https://mui.com/material-ui/react-slider/
 */
const meta: Meta<typeof Slider> = {
  title: 'Inputs/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI slider component is a direct import of MUI slider component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-slider/](https://mui.com/material-ui/react-slider/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={50} />
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Slider size="small" defaultValue={30} />
      <Slider defaultValue={50} />
    </Stack>
  ),
};

export const Discrete: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Slider
        defaultValue={30}
        step={10}
        marks
        min={0}
        max={100}
        valueLabelDisplay="auto"
      />
    </Box>
  ),
};

export const CustomMarks: Story = {
  render: () => {
    const marks = [
      { value: 0, label: '0°C' },
      { value: 20, label: '20°C' },
      { value: 37, label: '37°C' },
      { value: 100, label: '100°C' },
    ];
    return (
      <Box sx={{ width: 300 }}>
        <Slider defaultValue={20} step={10} marks={marks} />
      </Box>
    );
  },
};

export const Range: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={[20, 37]} valueLabelDisplay="auto" />
    </Box>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number>(30);
    return (
      <Stack spacing={2} sx={{ width: 300 }}>
        <Slider value={value} onChange={(e, newValue) => setValue(newValue as number)} />
        <Typography>Value: {value}</Typography>
      </Stack>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Slider disabled defaultValue={30} />
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Slider defaultValue={30} color="primary" />
      <Slider defaultValue={30} color="secondary" />
      <Slider defaultValue={30} color="success" />
      <Slider defaultValue={30} color="error" />
      <Slider defaultValue={30} color="warning" />
    </Stack>
  ),
};
