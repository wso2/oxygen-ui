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
import { Pagination, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Pagination component enables the user to select a specific page from a range of pages.
 * 
 * This is a direct import of MUI pagination component. 
 * Read more at: https://mui.com/material-ui/react-pagination/
 */
const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI pagination component is a direct import of MUI pagination component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-pagination/](https://mui.com/material-ui/react-pagination/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => (
    <Pagination count={10} />
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2}>
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} color="standard" />
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Pagination count={10} variant="text" />
      <Pagination count={10} variant="outlined" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Pagination count={10} size="small" />
      <Pagination count={10} size="medium" />
      <Pagination count={10} size="large" />
    </Stack>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} shape="circular" />
    </Stack>
  ),
};

export const WithSiblingBoundary: Story = {
  render: () => (
    <Stack spacing={2}>
      <Pagination count={11} defaultPage={6} siblingCount={0} />
      <Pagination count={11} defaultPage={6} siblingCount={1} />
      <Pagination count={11} defaultPage={6} siblingCount={2} />
    </Stack>
  ),
};

export const WithButtons: Story = {
  render: () => (
    <Stack spacing={2}>
      <Pagination count={10} showFirstButton showLastButton />
      <Pagination count={10} hidePrevButton hideNextButton />
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Pagination count={10} disabled />
  ),
};
