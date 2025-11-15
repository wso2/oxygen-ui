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
import { Link, Stack, Typography } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Link component allows users to navigate to different pages or resources.
 * It extends the Typography component with link-specific styling.
 * 
 * This is a direct import of MUI link component. 
 * Read more at: https://mui.com/material-ui/react-link/
 */
const meta: Meta<typeof Link> = {
  title: 'Navigation/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI link component is a direct import of MUI link component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-link/](https://mui.com/material-ui/react-link/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => (
    <Link href="#">Default Link</Link>
  ),
};

export const Underline: Story = {
  render: () => (
    <Stack spacing={2}>
      <Link href="#" underline="none">Underline: none</Link>
      <Link href="#" underline="hover">Underline: hover</Link>
      <Link href="#" underline="always">Underline: always</Link>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={1}>
      <Link href="#" color="primary">Primary color</Link>
      <Link href="#" color="secondary">Secondary color</Link>
      <Link href="#" color="success">Success color</Link>
      <Link href="#" color="error">Error color</Link>
      <Link href="#" color="warning">Warning color</Link>
      <Link href="#" color="inherit">Inherit color</Link>
    </Stack>
  ),
};

export const AsButton: Story = {
  render: () => (
    <Stack spacing={2}>
      <Link component="button" variant="body2" onClick={() => alert('Link clicked!')}>
        Link as button
      </Link>
      <Typography>
        This is text with a{' '}
        <Link component="button" variant="body2" onClick={() => alert('Inline link clicked!')}>
          link button
        </Link>{' '}
        inside.
      </Typography>
    </Stack>
  ),
};

export const WithTypography: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography>
        <Link href="#">This is a link</Link> within a Typography component.
      </Typography>
      <Typography variant="h6">
        <Link href="#">This is a link in h6</Link>
      </Typography>
      <Typography variant="body2">
        <Link href="#">This is a link in body2</Link>
      </Typography>
    </Stack>
  ),
};
