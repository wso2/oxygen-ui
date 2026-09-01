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
import { CircularProgress, LinearProgress, Stack, Box } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * Progress indicators inform users about the status of ongoing processes, such as loading an app,
 * submitting a form, or saving updates.
 * 
 * This is a direct import of MUI progress components. 
 * Read more at: https://mui.com/material-ui/react-progress/
 */
const meta: Meta<typeof CircularProgress> = {
  title: 'Feedback/Progress',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI progress components are direct imports of MUI progress components. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-progress/](https://mui.com/material-ui/react-progress/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Circular: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      {/* Progress indicators need an accessible name for screen readers */}
      <CircularProgress aria-label="Loading" />
      <CircularProgress color="secondary" aria-label="Loading" />
      <CircularProgress color="success" aria-label="Loading" />
      <CircularProgress color="inherit" aria-label="Loading" />
    </Stack>
  ),
};

export const CircularDeterminate: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <CircularProgress variant="determinate" value={25} aria-label="25 percent complete" />
      <CircularProgress variant="determinate" value={50} aria-label="50 percent complete" />
      <CircularProgress variant="determinate" value={75} aria-label="75 percent complete" />
      <CircularProgress variant="determinate" value={100} aria-label="100 percent complete" />
    </Stack>
  ),
};

export const CircularSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <CircularProgress size={20} aria-label="Loading" />
      <CircularProgress size={30} aria-label="Loading" />
      <CircularProgress aria-label="Loading" />
      <CircularProgress size={60} aria-label="Loading" />
      <CircularProgress size={80} aria-label="Loading" />
    </Stack>
  ),
};

export const Linear: Story = {
  render: () => (
    <Box sx={{ width: 400 }}>
      <Stack spacing={2}>
        <LinearProgress aria-label="Loading" />
        <LinearProgress color="secondary" aria-label="Loading" />
        <LinearProgress color="success" aria-label="Loading" />
        <LinearProgress color="inherit" aria-label="Loading" />
      </Stack>
    </Box>
  ),
};

export const LinearDeterminate: Story = {
  render: () => (
    <Box sx={{ width: 400 }}>
      <Stack spacing={2}>
        <LinearProgress variant="determinate" value={25} aria-label="25 percent complete" />
        <LinearProgress variant="determinate" value={50} aria-label="50 percent complete" />
        <LinearProgress variant="determinate" value={75} aria-label="75 percent complete" />
        <LinearProgress variant="determinate" value={100} aria-label="100 percent complete" />
      </Stack>
    </Box>
  ),
};

export const LinearBuffer: Story = {
  render: () => (
    <Box sx={{ width: 400 }}>
      <LinearProgress variant="buffer" value={60} valueBuffer={80} aria-label="Buffering" />
    </Box>
  ),
};
