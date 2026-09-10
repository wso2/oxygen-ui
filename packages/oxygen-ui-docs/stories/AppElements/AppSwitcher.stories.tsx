/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { AppSwitcherItem } from '@wso2/oxygen-ui';
import {
  AppSwitcher,
  Box,
  ColorSchemeToggle,
  Header,
  Typography,
  UserMenu,
} from '@wso2/oxygen-ui';
import {
  Bot,
  Braces,
  ChartColumn,
  Layers,
  ShieldCheck,
  Waypoints,
} from '@wso2/oxygen-ui-icons-react';

/**
 * AppSwitcher lets users move between the WSO2 Cloud applications from a grid
 * icon button in the header.
 */
const meta: Meta<typeof AppSwitcher> = {
  title: 'App Elements/App Switcher',
  component: AppSwitcher,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      // Known WCAG AA exception: the brand primary color (#FF7300) does not
      // meet the 4.5:1 text-contrast requirement in the default themes.
      // Tracked in https://github.com/wso2/oxygen-ui/issues/558 — remove
      // this override once the palette decision lands.
      options: {
        rules: { 'color-contrast': { enabled: false } },
      },
    },
    layout: 'centered',
    docs: {
      description: {
        component: `
The AppSwitcher pairs a grid icon button with a popover listing the platforms a user can switch to.

### Fixed layout by design
The switcher renders a **fixed layout** so it looks and behaves identically across every WSO2 product.
Consumers describe the applications with the \`apps\` prop rather than composing markup, which means a
product team cannot accidentally ship a switcher that differs from the rest of the platform.

### Features
- Consistent, non-composable layout across products
- Grid icon button that matches the other header icon buttons, including hover styling
- App cards render as real links when given an \`href\`, so middle-click and "open in new tab" keep working
- Per-app \`current\`, \`disabled\`, and status chip states
- Responsive popover: viewport-capped on mobile, fixed width from \`sm\` up

### Usage
\`\`\`tsx
import { AppSwitcher, Header } from '@wso2/oxygen-ui';
import { Bot, Braces } from '@wso2/oxygen-ui-icons-react';

<Header.Actions>
  <AppSwitcher
    apps={[
      { key: 'agent', name: 'Agent', icon: <Bot size={20} />, status: 'Current', current: true },
      { key: 'apim', name: 'API Management', icon: <Braces size={20} />, status: 'Try Now', href: '/apim' },
    ]}
    footer={{
      description: 'Manage Organization & Users, billing',
      label: 'WSO2 Cloud Console',
      href: 'https://console.wso2.com',
    }}
  />
</Header.Actions>
\`\`\`

### Routing
The component takes no router dependency. Use \`href\` for cross-app navigation (separate deployments),
\`component\` with a router \`Link\` for in-app routes, or \`onClick\` for programmatic navigation.

### Accessibility
- The trigger is a labeled button ("Switch app" by default) exposing \`aria-haspopup\`, \`aria-expanded\`, and \`aria-controls\`.
- Apps are grouped in a list labelled by the section heading, so the number of platforms is announced.
- The current app is marked with \`aria-current\`, and unavailable apps with \`aria-disabled\` (they stay focusable so they remain discoverable).
- The popover is an MUI Popover with \`role="dialog"\`: focus is trapped while open, Escape closes it and returns focus to the trigger.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppSwitcher>;

/**
 * Platforms as shown in the WSO2 Cloud design, covering current, available,
 * expired, and coming-soon states.
 */
const PLATFORMS: AppSwitcherItem[] = [
  {
    key: 'agent',
    name: 'Agent',
    icon: <Bot size={20} />,
    status: 'Current',
    statusColor: 'primary',
    current: true,
  },
  {
    key: 'apim',
    name: 'API Management',
    icon: <Braces size={20} />,
    status: 'Try Now',
    onClick: () => console.log('API Management clicked'),
  },
  {
    key: 'integration',
    name: 'Integration',
    icon: <Waypoints size={20} />,
    status: 'Try Now',
    onClick: () => console.log('Integration clicked'),
  },
  {
    key: 'identity',
    name: 'Identity',
    icon: <ShieldCheck size={20} />,
    status: 'Set up',
    onClick: () => console.log('Identity clicked'),
  },
  {
    key: 'engineering',
    name: 'Engineering Platform',
    icon: <Layers size={20} />,
    status: 'Trial expired',
    onClick: () => console.log('Engineering Platform clicked'),
  },
  {
    key: 'analytics',
    name: 'Analytics',
    icon: <ChartColumn size={20} />,
    status: 'Coming soon',
    statusColor: 'warning',
    disabled: true,
  },
];

const FOOTER = {
  description: 'Manage Organization & Users, billing',
  label: 'WSO2 Cloud Console',
  onClick: () => console.log('Cloud Console clicked'),
};

/**
 * Default app switcher. Click the grid icon to open the popover.
 */
export const Default: Story = {
  args: { apps: PLATFORMS, footer: FOOTER },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Click the grid icon to switch between platforms
      </Typography>
      <AppSwitcher {...args} />
    </Box>
  ),
};

/**
 * Apps as links. Providing `href` renders each card as an anchor, so users keep
 * native browser affordances like middle-click and "open in new tab".
 */
export const WithLinks: Story = {
  args: {
    apps: [
      {
        key: 'agent',
        name: 'Agent',
        icon: <Bot size={20} />,
        status: 'Current',
        statusColor: 'primary',
        current: true,
      },
      {
        key: 'apim',
        name: 'API Management',
        icon: <Braces size={20} />,
        status: 'Try Now',
        href: 'https://wso2.com',
        target: '_blank',
      },
      {
        key: 'integration',
        name: 'Integration',
        icon: <Waypoints size={20} />,
        status: 'Try Now',
        href: 'https://wso2.com',
        target: '_blank',
      },
      {
        key: 'identity',
        name: 'Identity',
        icon: <ShieldCheck size={20} />,
        status: 'Set up',
        href: 'https://wso2.com',
        target: '_blank',
      },
    ],
    footer: {
      description: 'Manage Organization & Users, billing',
      label: 'WSO2 Cloud Console',
      href: 'https://console.wso2.com',
      target: '_blank',
    },
  },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher {...args} />
    </Box>
  ),
};

/**
 * Without a footer. Omitting `footer` hides the bottom row entirely.
 */
export const WithoutFooter: Story = {
  args: { apps: PLATFORMS },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher {...args} />
    </Box>
  ),
};

/**
 * Single-column layout, suited to narrow popovers or short app lists.
 */
export const SingleColumn: Story = {
  args: { apps: PLATFORMS.slice(0, 3), columns: 1, width: 280 },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher {...args} />
    </Box>
  ),
};

/**
 * In context: the switcher sits in `Header.Actions` alongside the other
 * header icon buttons and shares their hover styling.
 */
export const InHeader: Story = {
  args: { apps: PLATFORMS, footer: FOOTER },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <Header>
      <Header.Brand>
        <Header.BrandTitle>Agent</Header.BrandTitle>
      </Header.Brand>
      <Header.Spacer />
      <Header.Actions>
        <AppSwitcher {...args} />
        <ColorSchemeToggle />
        <UserMenu>
          <UserMenu.Trigger name="John Doe" avatar="JD" />
          <UserMenu.Header name="John Doe" email="john@example.com" avatar="JD" />
        </UserMenu>
      </Header.Actions>
    </Header>
  ),
};
