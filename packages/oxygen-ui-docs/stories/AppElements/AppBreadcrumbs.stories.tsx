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

import type {Meta, StoryObj} from '@storybook/react';
import {AppBreadcrumbs} from '@wso2/oxygen-ui';
import type {BreadcrumbItem} from '@wso2/oxygen-ui';
import React from 'react';

/**
 * AppBreadcrumbs displays a breadcrumb trail for page navigation.
 * It automatically truncates long trails with a clickable ellipsis menu
 * that reveals hidden intermediate items.
 */
const meta: Meta<typeof AppBreadcrumbs> = {
  title: 'App Elements/App Breadcrumbs',
  component: AppBreadcrumbs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The AppBreadcrumbs component renders a navigable breadcrumb trail. When the number of items
exceeds \`maxItems\`, it collapses middle items into a clickable \`...\` ellipsis that opens
a dropdown menu listing the hidden entries.

### Features
- **Auto-truncation**: Collapses items beyond \`maxItems\` into an ellipsis dropdown
- **Keyboard accessible**: Clickable items respond to Enter and Space
- **Theme integration**: Uses MUI palette tokens and \`sx\` prop for custom overrides
- **Flexible items**: Each item can optionally carry an \`onClick\` handler for navigation

### Usage
\`\`\`tsx
import { AppBreadcrumbs } from '@wso2/oxygen-ui';

const items = [
  { key: 'home', label: 'Home', onClick: () => navigate('/') },
  { key: 'settings', label: 'Settings', onClick: () => navigate('/settings') },
  { key: 'profile', label: 'Profile' },
];

<AppBreadcrumbs items={items} />
\`\`\`

### Accessibility
- Renders an MUI Breadcrumbs \`nav\` landmark; separators are hidden from screen readers.
- Non-current crumbs are keyboard operable (Enter/Space).
- The "…" overflow control is a native button with \`aria-haspopup\`/\`aria-expanded\`; the hidden-crumbs menu supports Arrow keys and Escape with focus restoration.
        `,
      },
    },
  },
  argTypes: {
    items: {control: false},
    maxItems: {control: {type: 'number', min: 2, max: 10}},
  },
};

export default meta;
type Story = StoryObj<typeof AppBreadcrumbs>;

const threeItems: BreadcrumbItem[] = [
  {key: 'home', label: 'Home', onClick: () => {}},
  {key: 'settings', label: 'Settings', onClick: () => {}},
  {key: 'profile', label: 'Profile'},
];

const sixItems: BreadcrumbItem[] = [
  {key: 'home', label: 'Home', onClick: () => {}},
  {key: 'org', label: 'Organization', onClick: () => {}},
  {key: 'project', label: 'Project', onClick: () => {}},
  {key: 'environment', label: 'Environment', onClick: () => {}},
  {key: 'settings', label: 'Settings', onClick: () => {}},
  {key: 'advanced', label: 'Advanced'},
];

/**
 * Basic three-item breadcrumb trail.
 */
export const Default: Story = {
  render: () => <AppBreadcrumbs items={threeItems} />,
};

/**
 * Single item — just the current page label with no clickable ancestors.
 */
export const SingleItem: Story = {
  render: () => <AppBreadcrumbs items={[{key: 'home', label: 'Home'}]} />,
};

/**
 * When items exceed `maxItems` (default 4), middle items collapse into an ellipsis.
 * Click the `...` to reveal the hidden entries.
 */
export const WithTruncation: Story = {
  render: () => <AppBreadcrumbs items={sixItems} />,
};

/**
 * Override `maxItems` to control when truncation kicks in.
 */
export const CustomMaxItems: Story = {
  render: () => <AppBreadcrumbs items={sixItems} maxItems={5} />,
};

/**
 * Use the `sx` prop for custom container styling.
 */
export const WithSxProp: Story = {
  render: () => (
    <AppBreadcrumbs
      items={threeItems}
      sx={{px: 2, py: 1, bgcolor: 'action.hover', borderRadius: 1}}
    />
  ),
};
