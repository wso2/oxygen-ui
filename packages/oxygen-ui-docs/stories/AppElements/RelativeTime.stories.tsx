/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import type { Meta, StoryObj } from '@storybook/react';
import { RelativeTime, Stack } from '@wso2/oxygen-ui';
import { History } from '@wso2/oxygen-ui-icons-react';
import React from 'react';

/**
 * RelativeTime displays a clock icon, an optional action and a relative time.
 * Consumers provide the time text; the component provides the layout.
 */
const meta: Meta<typeof RelativeTime> = {
  title: 'App Elements/Relative Time',
  component: RelativeTime,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The RelativeTime component shows when something happened, such as "Updated 3 weeks ago".
Your app formats the time (for example with \`Intl.RelativeTimeFormat\` or a date library),
and the component handles the icon, spacing, typography and semantic markup.

### Features
- **Consumer-provided time**: Pass any formatted text, so localization stays in your app
- **Optional action**: Prefix the time with an operation such as Created, Updated or Deleted
- **Semantic markup**: Renders the time in a \`<time>\` element with an optional \`dateTime\`
- **Tooltip**: Optionally show the full absolute date on hover and keyboard focus
- **Sizes**: \`small\` for dense lists and tables, \`medium\` for general use

### Usage
\`\`\`tsx
import { RelativeTime } from '@wso2/oxygen-ui';

<RelativeTime
  action="Updated"
  time="3 weeks ago"
  dateTime="2026-09-17T10:00:00Z"
  tooltip="September 17, 2026, 10:00 AM"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    time: {
      control: 'text',
      description: 'The relative time text (e.g. "3 weeks ago")',
    },
    action: {
      control: 'text',
      description: 'Optional operation shown before the time',
    },
    dateTime: {
      control: 'text',
      description: 'Machine-readable date/time for the `<time>` element',
    },
    tooltip: {
      control: 'text',
      description: 'Optional tooltip content, typically the full absolute date',
    },
    icon: {
      control: false,
      description: 'Custom icon. Defaults to a clock icon',
    },
    hideIcon: {
      control: 'boolean',
      description: 'Hides the icon',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the text and icon',
      table: {
        type: { summary: 'small | medium' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RelativeTime>;

/**
 * Default usage with only the time.
 */
export const Default: Story = {
  args: {
    time: '3 weeks ago',
  },
};

/**
 * Prefix the time with a CRUD operation.
 */
export const WithAction: Story = {
  render: () => (
    <Stack spacing={1.5}>
      <RelativeTime action="Created" time="2 months ago" />
      <RelativeTime action="Updated" time="5 minutes ago" />
      <RelativeTime action="Deleted" time="1 year ago" />
    </Stack>
  ),
};

/**
 * Show the full date in a tooltip on hover or keyboard focus.
 */
export const WithTooltip: Story = {
  args: {
    action: 'Updated',
    time: '3 weeks ago',
    dateTime: '2026-09-17T10:00:00Z',
    tooltip: 'September 17, 2026, 10:00 AM',
  },
};

/**
 * Available sizes.
 */
export const Sizes: Story = {
  render: () => (
    <Stack spacing={1.5}>
      <RelativeTime size="small" action="Updated" time="3 weeks ago" />
      <RelativeTime size="medium" action="Updated" time="3 weeks ago" />
    </Stack>
  ),
};

/**
 * Custom icon or no icon.
 */
export const IconOptions: Story = {
  render: () => (
    <Stack spacing={1.5}>
      <RelativeTime icon={<History size={16} />} action="Modified" time="4 hours ago" />
      <RelativeTime hideIcon action="Updated" time="3 weeks ago" />
    </Stack>
  ),
};

/**
 * Formatting the time in the consuming app with Intl.RelativeTimeFormat.
 */
export const WithIntlFormatting: Story = {
  render: () => {
    const updatedAt = new Date(Date.now() - 3 * 7 * 24 * 60 * 60 * 1000);
    const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    return (
      <RelativeTime
        action="Updated"
        time={formatter.format(-3, 'week')}
        dateTime={updatedAt.toISOString()}
        tooltip={updatedAt.toLocaleString()}
      />
    );
  },
};
