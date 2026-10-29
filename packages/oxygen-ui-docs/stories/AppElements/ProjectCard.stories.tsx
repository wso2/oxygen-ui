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
import { Grid, ProjectCard } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * ProjectCard shows a project with an icon, name, description, last updated time and an optional delete action.
 */
const meta: Meta<typeof ProjectCard> = {
  title: 'App Elements/Project Card',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ProjectCard component is a reusable card for listing projects. It is built from the Card and CardContent
components and extends the Card props, except \`variant\`.

### Features
- **Icon badge**: a round badge with a custom icon (a cube by default) in any theme color, light (tinted) or filled
- **Description and updated time**: both optional; the time (e.g. "1 day ago") reuses the RelativeTime component, and \`updatedTooltip\` shows anything on hover
- **Delete action**: appears on hover or focus when \`onDelete\` is set, or use \`actions\` for custom content
- **Clickable**: pass \`onClick\` or \`href\` to make the whole card interactive
- **Truncation**: a long title or description is cut off, with the full text in a tooltip on hover
- **Selected**: highlights the card with a primary border

### Usage
\`\`\`tsx
import { Grid, ProjectCard } from '@wso2/oxygen-ui';

<ProjectCard
  title="Default"
  description="Default project"
  updatedTime="yesterday"
  onDelete={() => deleteProject(id)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Name of the project' },
    description: { control: 'text', description: 'Short description under the title' },
    iconVariant: {
      control: 'radio',
      options: ['light', 'filled'],
      description: 'Light (tinted) or filled icon badge',
    },
    iconColor: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'Theme color of the icon badge',
    },
    updatedTime: { control: 'text', description: 'Relative time text in the footer' },
    updatedLabel: { control: 'text', description: 'Text before the time' },
    deleteLabel: { control: 'text', description: 'Accessible name of the delete button' },
    selected: { control: 'boolean', description: 'Highlights the card with a primary border' },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

const narrow = [
  (Story: React.ComponentType) => (
    <div style={{ width: 380 }}>
      <Story />
    </div>
  ),
];

export const Default: Story = {
  decorators: narrow,
  args: {
    title: 'Default',
    description: 'Default project',
    updatedTime: '1 day ago',
    updatedTooltip: 'October 28, 2026, 10:15 AM',
    onClick: () => undefined,
    onDelete: () => undefined,
  },
};

export const FourInARow: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <div style={{ width: '100%', padding: 24, boxSizing: 'border-box' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Grid container spacing={2}>
      {[
        ['Default', 'Default project', '1 minute ago'],
        ['Payments', 'Payment APIs, gateways and everything else the payments team needs to take, track and refund orders in one place', '3 hours ago'],
        ['Mobile app backend', undefined, '1 day ago'],
        ['Analytics', 'Reports and dashboards for every team, from the first sign-up all the way to the last renewal of a customer account', '2 weeks ago'],
      ].map(([title, description, time], index) => (
        <Grid key={title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <ProjectCard
            title={title}
            description={description}
            updatedTime={time}
            selected={index === 0}
            onClick={() => undefined}
            onDelete={() => undefined}
          />
        </Grid>
      ))}
    </Grid>
  ),
};

export const Truncated: Story = {
  decorators: narrow,
  args: {
    title: 'A project with a very long name that does not fit on one line',
    description:
      'A long description that wraps to a second line and is then cut off with an ellipsis, with the full text in a tooltip when you hover it',
    updatedTime: '3 weeks ago',
    onDelete: () => undefined,
  },
};
