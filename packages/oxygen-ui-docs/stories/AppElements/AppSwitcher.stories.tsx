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
import type { AppSwitcherFooterLink, AppSwitcherItem } from '@wso2/oxygen-ui';
import {
  AppSwitcher,
  Box,
  ColorSchemeToggle,
  Header,
  Typography,
  UserMenu,
} from '@wso2/oxygen-ui';
import { Building2, CreditCard, UserRoundPlus } from '@wso2/oxygen-ui-icons-react';

/**
 * AppSwitcher lets users move between the WSO2 Cloud platforms from a grid
 * icon button in the header.
 */
const meta: Meta<typeof AppSwitcher> = {
  title: 'App Elements/App Switcher',
  component: AppSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The AppSwitcher pairs a grid icon button with a popover listing the platforms a user can switch to,
plus a manage section linking to the WSO2 Cloud tabs.

### Fixed layout by design
The switcher renders a **fixed layout** so it looks and behaves identically across every WSO2 product.
Consumers describe the destinations with the \`apps\` and \`footer\` props rather than composing markup,
which means a product team cannot accidentally ship a switcher that differs from the rest of the platform.

### Features
- Consistent, non-composable layout across products
- Grid icon button that matches the other header icon buttons, including hover styling
- Each platform is a card with the WSO2 mark above its name; giving it a \`url\` renders a real link
- A card given a \`url\` opens in a new tab by default; every enabled card lifts with an accent border on hover
- Selecting a card leaves the popover open; only the trigger, an outside click or \`Esc\` dismisses it
- An unavailable platform can carry a \`tooltip\` (e.g. "Coming soon") explaining why
- A \`Manage\` section for the WSO2 Cloud tabs (organizations, users, billing)
- Responsive popover: viewport-capped on mobile, fixed width from \`sm\` up

### Usage
\`\`\`tsx
import { AppSwitcher, Header } from '@wso2/oxygen-ui';

<Header.Actions>
  <AppSwitcher
    apps={[
      { key: 'agent', name: 'Agent Manager', url: 'https://agent.wso2.com' },
      { key: 'api', name: 'API Platform', url: 'https://api.wso2.com' },
    ]}
    footer={{
      links: [
        { key: 'orgs', name: 'Organizations', url: 'https://console.wso2.com/organizations' },
        { key: 'billing', name: 'Billing', url: 'https://console.wso2.com/billing' },
      ],
    }}
  />
</Header.Actions>
\`\`\`

### The platform mark
Every platform card carries the WSO2 mark, the \`WSO2\` icon from \`@wso2/oxygen-ui-icons-react\`. It is
supplied by the component, so products do not pick their own artwork and the grid stays uniform. Pass
\`icon\` only when a destination genuinely needs different artwork — the manage links do, which is why
they take neutral glyphs.

### Routing
The component takes no router dependency. Use \`url\` for cross-app navigation (separate deployments),
\`component\` with a router \`Link\` for in-app routes, or \`onClick\` for programmatic navigation.

### Dismissing the popover
Selecting a card does not close the popover: an enabled \`url\` card opens in a new tab, so the current
tab does not navigate and dismissing would look like the switcher had closed itself. The same applies
to the other modes — \`component\` and \`onClick\` cards leave dismissal to the consumer, and a disabled
card does nothing at all. A second click of the grid trigger, a click outside, or \`Esc\` closes it.

### Accessibility
- The trigger is a labeled button ("Switch Platforms" by default) exposing \`aria-haspopup\`, \`aria-expanded\`, and \`aria-controls\`.
- Platforms and manage links are each grouped in a list labelled by their section heading.
- Unavailable platforms are marked \`aria-disabled\` and drawn with a faded mark and muted label; they stay focusable so they remain discoverable, but never navigate.
- The popover is an MUI Popover with \`role="dialog"\`: focus is trapped while open, Escape closes it and returns focus to the trigger.
- The hover lift is suppressed under \`prefers-reduced-motion\`; the border and shadow still carry the state.

### Keyboard
Arrow keys move between cards so each grid is not a long Tab sequence:

| Key | Behavior |
| --- | --- |
| \`Tab\` | Moves into and through the cards |
| \`←\` / \`→\` | Previous / next card |
| \`↑\` / \`↓\` | One grid row at a time |
| \`Home\` / \`End\` | First / last card in the section |
| \`Esc\` | Closes the popover, returning focus to the trigger |

Focus clamps at the ends of a grid instead of wrapping.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppSwitcher>;

/**
 * Platforms as shown in the WSO2 Cloud design. Analytics is not yet available,
 * so it renders faded and explains itself with a "Coming soon" tooltip on
 * hover.
 *
 * Every card points at wso2.com here purely to demo the navigation: cards open
 * in a new tab, so selecting one leaves Storybook intact.
 */
const PLATFORMS: AppSwitcherItem[] = [
  { key: 'agent', name: 'Agent Manager', url: 'https://wso2.com' },
  { key: 'identity', name: 'Identity Platform', url: 'https://wso2.com' },
  { key: 'integration', name: 'Integration Platform', url: 'https://wso2.com' },
  { key: 'api', name: 'API Platform', url: 'https://wso2.com' },
  { key: 'analytics', name: 'Analytics Platform', disabled: true, tooltip: 'Coming soon' },
];

/**
 * The WSO2 Cloud tabs. These take their own glyphs rather than the WSO2 mark,
 * so they read as settings rather than as products. They point at wso2.com here
 * only so the demo links resolve; a product passes its own console URLs.
 */
const MANAGE_LINKS: AppSwitcherFooterLink[] = [
  {
    key: 'organizations',
    name: 'Organizations',
    url: 'https://wso2.com',
    icon: <Building2 size={16} />,
  },
  {
    key: 'users',
    name: 'Users & roles',
    url: 'https://wso2.com',
    icon: <UserRoundPlus size={16} />,
  },
  {
    key: 'billing',
    name: 'Billing',
    url: 'https://wso2.com',
    icon: <CreditCard size={16} />,
  },
];

const FOOTER = { label: 'Manage', links: MANAGE_LINKS };

/**
 * Default app switcher, matching the agreed design. Click the grid icon to open
 * the popover; every card opens its platform in a new tab and leaves the
 * popover open. Click the grid icon again, or outside, to dismiss it.
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
 * A single platform. The grid does not stretch one card across the full width,
 * so an organization entitled to one platform still gets a card the same size
 * as everywhere else, with the manage section below it.
 */
export const SinglePlatform: Story = {
  args: {
    apps: [{ key: 'api', name: 'API Platform', url: 'https://wso2.com' }],
    footer: FOOTER,
  },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher {...args} />
    </Box>
  ),
};

/**
 * In context: the switcher sits in `Header.Actions` alongside the other header
 * icon buttons and shares their hover styling. Selecting a card opens wso2.com
 * in a new tab and leaves the popover open, so the user can pick another
 * platform; the grid icon, an outside click or `Esc` dismisses it.
 */
export const InHeader: Story = {
  args: { apps: PLATFORMS, footer: FOOTER },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <Header>
      <Header.Brand>
        <Header.BrandTitle>Agent Manager</Header.BrandTitle>
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
