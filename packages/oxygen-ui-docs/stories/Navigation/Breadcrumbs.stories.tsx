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
import { Breadcrumbs, Link, Typography, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Breadcrumbs component displays the current location within a navigational hierarchy.
 * It helps users understand where they are and navigate back to previous levels.
 * 
 * This is a direct import of MUI breadcrumbs component. 
 * Read more at: https://mui.com/material-ui/react-breadcrumbs/
 */
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI breadcrumbs component is a direct import of MUI breadcrumbs component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-breadcrumbs/](https://mui.com/material-ui/react-breadcrumbs/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs>
      <Link underline="hover" color="inherit" href="#">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Catalog
      </Link>
      <Typography color="text.primary">Products</Typography>
    </Breadcrumbs>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Stack spacing={2}>
      <Breadcrumbs separator="›">
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Catalog
        </Link>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>
      <Breadcrumbs separator="-">
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Catalog
        </Link>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>
      <Breadcrumbs separator="/">
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Catalog
        </Link>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>
    </Stack>
  ),
};

export const MaxItems: Story = {
  render: () => (
    <Breadcrumbs maxItems={3}>
      <Link underline="hover" color="inherit" href="#">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Catalog
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Category
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Subcategory
      </Link>
      <Typography color="text.primary">Products</Typography>
    </Breadcrumbs>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Breadcrumbs maxItems={2} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
      <Link underline="hover" color="inherit" href="#">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Level 1
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Level 2
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Level 3
      </Link>
      <Typography color="text.primary">Current Page</Typography>
    </Breadcrumbs>
  ),
};
