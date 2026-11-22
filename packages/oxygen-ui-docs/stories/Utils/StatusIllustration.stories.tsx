/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Box, Button, Stack, StatusIllustration, Typography } from '@wso2/oxygen-ui';
import type { StatusIllustrationStatus } from '@wso2/oxygen-ui';
import React from 'react';

const HTTP_STATUSES: StatusIllustrationStatus[] = [
  200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503, 504,
];
const STATES: StatusIllustrationStatus[] = ['no-records', 'failed', 'unsuccessful', 'mail-sent'];

/**
 * StatusIllustration shows an illustration for an HTTP status code or a common application state,
 * for error pages, empty states and confirmations. It renders through ColorSchemeSVG and takes its
 * colours from the theme palette, so it follows the active theme and light or dark mode.
 *
 * Set any `--illustration-*` CSS variable through `sx` to override a colour.
 */
const meta: Meta<typeof StatusIllustration> = {
  title: 'Utils/Status Illustration',
  component: StatusIllustration,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'select', options: [...HTTP_STATUSES, ...STATES] },
    width: { control: { type: 'number', min: 80, max: 800 } },
    label: { control: 'text' },
    decorative: { control: 'boolean' },
  },
  args: { status: 404, width: 400 },
};

export default meta;
type Story = StoryObj<typeof StatusIllustration>;

export const Default: Story = {};

const Gallery = ({ statuses }: { statuses: StatusIllustrationStatus[] }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 3, width: '100%' }}>
    {statuses.map(status => (
      <Stack key={status} alignItems="center" spacing={1}>
        <StatusIllustration status={status} width={200} decorative />
        <Typography variant="body2" color="text.secondary">
          {status}
        </Typography>
      </Stack>
    ))}
  </Box>
);

export const HttpStatuses: Story = {
  parameters: { layout: 'padded' },
  render: () => <Gallery statuses={HTTP_STATUSES} />,
};

export const States: Story = {
  parameters: { layout: 'padded' },
  render: () => <Gallery statuses={STATES} />,
};

/** An empty state: the heading describes the state, so the illustration is decorative. */
export const EmptyState: Story = {
  render: () => (
    <Stack alignItems="center" spacing={2} sx={{ maxWidth: 360, textAlign: 'center' }}>
      <StatusIllustration status="no-records" width={240} decorative />
      <Typography variant="h5">No records found</Typography>
      <Typography variant="body2" color="text.secondary">
        Try a different search, or create a new record to get started.
      </Typography>
      <Button variant="contained">Create record</Button>
    </Stack>
  ),
};

/** Override a colour by setting its CSS variable. */
export const CustomColors: Story = {
  args: {
    status: 500,
    sx: { '--illustration-danger': '#7c3aed', '--illustration-primary': '#0ea5e9' },
  },
};
