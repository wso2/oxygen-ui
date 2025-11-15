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
import { Typography, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Typography component presents content clearly and efficiently.
 * It supports different variants, colors, and alignment options.
 * 
 * This is a direct import of MUI typography component. 
 * Read more at: https://mui.com/material-ui/react-typography/
 */
const meta: Meta<typeof Typography> = {
  title: 'Data Display/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI typography component is a direct import of MUI typography component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-typography/](https://mui.com/material-ui/react-typography/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Heading</Typography>
      <Typography variant="h3">h3. Heading</Typography>
      <Typography variant="h4">h4. Heading</Typography>
      <Typography variant="h5">h5. Heading</Typography>
      <Typography variant="h6">h6. Heading</Typography>
      <Typography variant="subtitle1">subtitle1. Lorem ipsum dolor sit amet</Typography>
      <Typography variant="subtitle2">subtitle2. Lorem ipsum dolor sit amet</Typography>
      <Typography variant="body1">body1. Lorem ipsum dolor sit amet</Typography>
      <Typography variant="body2">body2. Lorem ipsum dolor sit amet</Typography>
      <Typography variant="button">button text</Typography>
      <Typography variant="caption">caption text</Typography>
      <Typography variant="overline">overline text</Typography>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={1}>
      <Typography color="primary">Primary color</Typography>
      <Typography color="secondary">Secondary color</Typography>
      <Typography color="success">Success color</Typography>
      <Typography color="error">Error color</Typography>
      <Typography color="warning">Warning color</Typography>
      <Typography color="info">Info color</Typography>
      <Typography color="text.primary">Text primary</Typography>
      <Typography color="text.secondary">Text secondary</Typography>
      <Typography color="text.disabled">Text disabled</Typography>
    </Stack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Stack spacing={1} sx={{ width: 400 }}>
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify">
        Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </Stack>
  ),
};

export const Gutters: Story = {
  render: () => (
    <Stack spacing={0}>
      <Typography gutterBottom>
        Paragraph with gutterBottom. Lorem ipsum dolor sit amet.
      </Typography>
      <Typography gutterBottom>
        Another paragraph with gutterBottom. Consectetur adipiscing elit.
      </Typography>
      <Typography>
        Paragraph without gutterBottom. Sed do eiusmod tempor.
      </Typography>
    </Stack>
  ),
};

export const NoWrap: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 200 }}>
      <Typography noWrap>
        This text will not wrap and will be truncated with an ellipsis when it overflows.
      </Typography>
      <Typography>
        This text will wrap normally when it reaches the end of its container.
      </Typography>
    </Stack>
  ),
};
