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
import {
  AppSwitcher,
  Box,
  Button,
  ColorSchemeToggle,
  Header,
  Typography,
  UserMenu,
} from '@wso2/oxygen-ui';
import type { AppSwitcherAppItem, AppSwitcherFooterLink } from '@wso2/oxygen-ui';
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

### Compound component
The switcher is composed from sub-components — \`AppSwitcher.Trigger\`, \`AppSwitcher.Section\`,
\`AppSwitcher.App\` and \`AppSwitcher.Footer\` — matching \`Header\`, \`Sidebar\` and \`UserMenu\`. The
trigger renders in place; every other child goes inside the popover. Sections own their own grid and
arrow-key navigation, so the layout stays consistent while products keep control of the destinations.

### Features
- Compound component pattern, matching the other app-shell components
- Grid icon button that matches the other header icon buttons, including hover styling
- Each platform is a card with the WSO2 mark above its name; giving it a \`url\` renders a real link
- A card given a \`url\` opens in a new tab by default; every enabled card lifts with an accent border on hover
- Selecting a card leaves the popover open; only the trigger, an outside click or \`Esc\` dismisses it.
  The current app is the exception: it opens in the same tab and closes the popover
- Data-driven \`apps\` and \`links\`, with loading, unavailable and busy states
- An unavailable platform can carry a \`tooltip\` (e.g. "Coming soon") explaining why
- A \`Manage\` section for the WSO2 Cloud tabs (organizations, users, billing)
- Responsive popover: viewport-capped on mobile, fixed width from \`sm\` up

### Usage
\`\`\`tsx
import { AppSwitcher, Header } from '@wso2/oxygen-ui';

<Header.Actions>
  <AppSwitcher>
    <AppSwitcher.Trigger />
    <AppSwitcher.Section label="Platforms">
      <AppSwitcher.App name="Agent Manager" url="https://agent.wso2.com" />
      <AppSwitcher.App name="API Platform" url="https://api.wso2.com" />
      <AppSwitcher.App name="Analytics Platform" disabled tooltip="Coming soon" />
    </AppSwitcher.Section>
    <AppSwitcher.Footer label="Manage">
      <AppSwitcher.App name="Organizations" url="https://console.wso2.com/organizations" />
      <AppSwitcher.App name="Billing" url="https://console.wso2.com/billing" />
    </AppSwitcher.Footer>
  </AppSwitcher>
</Header.Actions>
\`\`\`

### Data-driven switchers
Product consoles that share one list of platforms can pass it as data instead of composing cards.
\`AppSwitcher.Section\` takes \`apps\` and \`AppSwitcher.Footer\` takes \`links\`, both using the same
\`AppSwitcherAppItem\` shape (\`id\`, \`name\`, \`url\`, plus the optional card props). The component does
not fetch anything; the console fetches the list and passes it in.

\`\`\`tsx
<AppSwitcher currentAppId="agent-manager">
  <AppSwitcher.Trigger label="Switch platforms" />
  <AppSwitcher.Section label="Platforms" apps={platforms} loading={isLoading} />
  <AppSwitcher.Footer label="Manage" links={manage} loading={isLoading} />
</AppSwitcher>
\`\`\`

- **Current app.** The card whose \`id\` matches \`currentAppId\` (or that sets \`current\`) opens in the
  same tab, closes the popover on selection, carries \`aria-current="page"\` and keeps a brand border.
  A \`target\` on the item still wins.
- **Unavailable apps.** An app with \`url: null\` (or, in \`apps\`, no \`url\`) and no \`onClick\` or
  \`component\` has no action to offer, so it renders disabled with a "Coming soon" tooltip explaining why.
  Localise the tooltip with \`unavailableLabel\` on \`<AppSwitcher>\`, or override it per item with
  \`tooltip\`. A footer link with no \`url\` at all keeps its previous behavior; pass \`url: null\` to mark
  it unavailable.
- **Loading.** \`loading\` swaps the cards for placeholders of the same height (one row by default,
  \`loadingCount\` to change it) and marks the grid \`aria-busy\`.
- **Busy cards.** \`busy\` shows a progress indicator in place of the mark and ignores clicks while an
  action runs, e.g. granting access before opening the platform. The card stays focusable. While busy it
  renders as a button rather than a link, so it cannot be opened from the context menu either.
- **Safe links.** Only \`http:\`, \`https:\` and relative URLs reach \`href\`. Anything else, such as
  \`javascript:\` or \`data:\`, renders the card disabled and logs a warning.

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
- Platforms marked \`disabled\` carry \`aria-disabled\` and are drawn with a faded mark and muted label; they stay focusable so they remain discoverable, but never navigate.
- "Coming soon" platforms are disabled cards like the above, and their tooltip is read as the card's description. A card is one when its \`url\` is \`null\` or blank and it has no \`onClick\` or \`component\`; in a section's \`apps\`, an omitted \`url\` counts too.
- The current app is marked \`aria-current="page"\`; its border uses the darker brand token for 3:1 contrast.
- A loading grid is marked \`aria-busy\`, and so is a busy card.
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
 * The WSO2 Cloud tabs. These take their own glyphs rather than the WSO2 mark,
 * so they read as settings rather than as products. They point at wso2.com here
 * only so the demo links resolve; a product passes its own console URLs.
 */
const manageLinks = [
  <AppSwitcher.App key="orgs" name="Organizations" url="https://wso2.com" icon={<Building2 size={16} />} />,
  <AppSwitcher.App key="users" name="Users & roles" url="https://wso2.com" icon={<UserRoundPlus size={16} />} />,
  <AppSwitcher.App key="billing" name="Billing" url="https://wso2.com" icon={<CreditCard size={16} />} />,
];

/**
 * The platform cards, as shown in the WSO2 Cloud design. Analytics is not yet
 * available, so it renders faded and explains itself with a tooltip.
 *
 * Every card points at wso2.com purely to demo the navigation: cards open in a
 * new tab, so selecting one leaves Storybook intact.
 */
const platforms = [
  <AppSwitcher.App key="agent" name="Agent Manager" url="https://wso2.com" />,
  <AppSwitcher.App key="identity" name="Identity Platform" url="https://wso2.com" />,
  <AppSwitcher.App key="integration" name="Integration Platform" url="https://wso2.com" />,
  <AppSwitcher.App key="api" name="API Platform" url="https://wso2.com" />,
  <AppSwitcher.App key="analytics" name="Analytics Platform" disabled tooltip="Coming soon" />,
];

/**
 * Default app switcher, matching the agreed design. Click the grid icon to open
 * the popover; every card opens its platform in a new tab and leaves the
 * popover open. Click the grid icon again, or outside, to dismiss it.
 */
export const Default: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Click the grid icon to switch between platforms
      </Typography>
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms">
          {platforms}
        </AppSwitcher.Section>
        <AppSwitcher.Footer label="Manage">
          {manageLinks}
        </AppSwitcher.Footer>
      </AppSwitcher>
    </Box>
  ),
};

/**
 * A single platform. The grid does not stretch one card across the full width,
 * so an organization entitled to one platform still gets a card the same size
 * as everywhere else, with the manage section below it.
 */
export const SinglePlatform: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms">
          <AppSwitcher.App name="API Platform" url="https://wso2.com" />
        </AppSwitcher.Section>
        <AppSwitcher.Footer label="Manage">
          {manageLinks}
        </AppSwitcher.Footer>
      </AppSwitcher>
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
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Header>
      <Header.Brand>
        <Header.BrandTitle>Agent Manager</Header.BrandTitle>
      </Header.Brand>
      <Header.Spacer />
      <Header.Actions>
        <AppSwitcher>
          <AppSwitcher.Trigger />
          <AppSwitcher.Section label="Platforms">
            {platforms}
          </AppSwitcher.Section>
          <AppSwitcher.Footer label="Manage">
          {manageLinks}
        </AppSwitcher.Footer>
        </AppSwitcher>
        <ColorSchemeToggle />
        <UserMenu>
          <UserMenu.Trigger name="John Doe" avatar="JD" />
          <UserMenu.Header name="John Doe" email="john@example.com" avatar="JD" />
        </UserMenu>
      </Header.Actions>
    </Header>
  ),
};

/**
 * The shared platform list, as a console would receive it. `url: null` marks a
 * platform that is not available in this environment. The current app points
 * at an in-page anchor only so that selecting it, which opens in the same tab,
 * does not navigate Storybook away.
 */
const platformData: AppSwitcherAppItem[] = [
  { id: 'agent-manager', name: 'Agent Manager', url: '#agent-manager' },
  { id: 'identity-platform', name: 'Identity Platform', url: 'https://wso2.com' },
  { id: 'integration-platform', name: 'Integration Platform', url: 'https://wso2.com' },
  { id: 'api-platform', name: 'API Platform', url: 'https://wso2.com' },
  { id: 'api-analytics', name: 'API Analytics', url: null },
];

const manageData: AppSwitcherFooterLink[] = [
  { id: 'organizations', name: 'Organizations', url: 'https://wso2.com', icon: <Building2 size={16} /> },
  { id: 'users', name: 'Users & roles', url: 'https://wso2.com', icon: <UserRoundPlus size={16} /> },
  { id: 'billing', name: 'Billing', url: 'https://wso2.com', icon: <CreditCard size={16} /> },
];

/**
 * Driven from data, as every console does with the shared platform list. The
 * user is in Agent Manager, so its card carries the current-app border, opens
 * in the same tab and closes the popover. API Analytics has no URL here, so it
 * renders disabled with a "Coming soon" tooltip.
 */
export const DataDriven: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher currentAppId="agent-manager">
        <AppSwitcher.Trigger label="Switch platforms" />
        <AppSwitcher.Section label="Platforms" apps={platformData} />
        <AppSwitcher.Footer label="Manage" links={manageData} />
      </AppSwitcher>
    </Box>
  ),
};

/**
 * While the list is fetched, `loading` shows placeholders at the card height,
 * so the popover does not jump when the data arrives. Toggle it to compare.
 */
export const Loading: Story = {
  render: function LoadingStory() {
    const [loading, setLoading] = React.useState(true);

    return (
      <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" size="small" onClick={() => setLoading((value) => !value)}>
          {loading ? 'Finish loading' : 'Start loading'}
        </Button>
        <AppSwitcher currentAppId="agent-manager">
          <AppSwitcher.Trigger />
          <AppSwitcher.Section label="Platforms" apps={platformData} loading={loading} />
          <AppSwitcher.Footer label="Manage" links={manageData} loading={loading} />
        </AppSwitcher>
      </Box>
    );
  },
};

/**
 * A card that runs an action before opening, such as granting access. While
 * `busy`, it shows progress and ignores clicks; here the action takes two
 * seconds and then finishes without opening anything.
 */
export const BusyCard: Story = {
  render: function BusyCardStory() {
    const [busy, setBusy] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    React.useEffect(() => () => clearTimeout(timer.current), []);

    const apps = platformData.map((app) =>
      app.id === 'api-platform'
        ? {
            ...app,
            url: null,
            busy,
            onClick: () => {
              setBusy(true);
              timer.current = setTimeout(() => setBusy(false), 2000);
            },
          }
        : app,
    );

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          Open the switcher and select API Platform
        </Typography>
        <AppSwitcher currentAppId="agent-manager">
          <AppSwitcher.Trigger />
          <AppSwitcher.Section label="Platforms" apps={apps} />
          <AppSwitcher.Footer label="Manage" links={manageData} />
        </AppSwitcher>
      </Box>
    );
  },
};
