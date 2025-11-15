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
import { Rating, Stack, Typography } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Rating component provides users with a way to rate content using a set of icons.
 * It supports different precision levels, custom icons, and read-only modes.
 * 
 * This is a direct import of MUI rating component. 
 * Read more at: https://mui.com/material-ui/react-rating/
 */
const meta: Meta<typeof Rating> = {
  title: 'Inputs/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI rating component is a direct import of MUI rating component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-rating/](https://mui.com/material-ui/react-rating/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: () => <Rating name="simple-controlled" defaultValue={2.5} />,
};

export const ReadOnly: Story = {
  render: () => <Rating name="read-only" value={3.5} readOnly />,
};

export const Disabled: Story = {
  render: () => <Rating name="disabled" value={2} disabled />,
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={1}>
      <Rating name="size-small" defaultValue={2} size="small" />
      <Rating name="size-medium" defaultValue={2} />
      <Rating name="size-large" defaultValue={2} size="large" />
    </Stack>
  ),
};

export const Precision: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography>Half rating (0.5 precision)</Typography>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Typography>Full rating (1 precision)</Typography>
      <Rating name="full-rating" defaultValue={2} precision={1} />
    </Stack>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(2);
    return (
      <Stack spacing={1}>
        <Rating
          name="controlled-rating"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Typography>Current value: {value}</Typography>
      </Stack>
    );
  },
};

export const MaxRating: Story = {
  render: () => (
    <Stack spacing={2}>
      <Rating name="10-stars" defaultValue={5} max={10} />
      <Rating name="7-stars" defaultValue={3} max={7} />
    </Stack>
  ),
};
