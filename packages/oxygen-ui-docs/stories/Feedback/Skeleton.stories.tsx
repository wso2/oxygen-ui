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
import { Skeleton, Stack, Box } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * Display a placeholder preview of content before the data gets loaded to reduce load-time frustration.
 * The Skeleton component provides a low fidelity UI that can improve perceived performance.
 * 
 * This is a direct import of MUI skeleton component. 
 * Read more at: https://mui.com/material-ui/react-skeleton/
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI skeleton component is a direct import of MUI skeleton component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-skeleton/](https://mui.com/material-ui/react-skeleton/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Variants: Story = {
  render: () => (
    <Stack spacing={1} sx={{ width: 300 }}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  ),
};

export const Animations: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Stack>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Skeleton variant="rectangular" width={300} height={140} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <Stack spacing={1} sx={{ width: 300 }}>
      {[...Array(3)].map((_, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
};
