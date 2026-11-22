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
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  AppSwitcher,
  Box,
  Button,
  ColorSchemeToggle,
  Header,
  Typography,
  UserMenu,
  type AppSwitcherAppItem
} from '@wso2/oxygen-ui';
import { Blocks, Bot, ChartLine, Cpu, Home, Settings, ShieldUser } from '@wso2/oxygen-ui-icons-react';

/**
 * AppSwitcher lets users move between the Choreo Labs Cloud services from a
 * grid icon button in the header.
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
The AppSwitcher pairs a grid icon button with a popover. A Manage row at the top, with no visible heading, links back to the
Choreo Labs Cloud console (Cloud home and organization settings); below a divider, the **Services** grid lists
the products a user can switch to.

### Compound component
The switcher is composed from sub-components — \`AppSwitcher.Trigger\`, \`AppSwitcher.Section\`,
\`AppSwitcher.App\` and \`AppSwitcher.Footer\` — matching \`Header\`, \`Sidebar\` and \`UserMenu\`. The
trigger renders in place; every other child goes inside the popover. Sections own their own grid and
arrow-key navigation, so the layout stays consistent while products keep control of the destinations.

### Features
- Compound component pattern, matching the other app-shell components
- Grid icon button that matches the other header icon buttons, including hover styling
- Each service is a card with its icon above its name (the Choreo Labs mark by default); giving it a \`url\` renders a real link
- A card given a \`url\` opens in a new tab by default; every enabled card lifts with an accent border on hover
- Selecting a card leaves the popover open; only the trigger, an outside click or \`Esc\` dismisses it.
  The current app is the exception: it opens in the same tab and closes the popover
- Data-driven \`apps\` and \`links\`, with loading, unavailable and busy states
- An unavailable service can carry a \`tooltip\` (e.g. "Coming soon") explaining why
- A Manage row at the top (\`AppSwitcher.Section\` with \`tone="manage"\`) with Cloud home and
  Organization settings, separated from the services by a divider
- Neutral service icons, so the theme's primary color is left for hover, focus and the current app
- \`AppSwitcher.Footer\` remains available for links that belong below the services
- Exactly four cards lay out as a 2×2 grid; any other count uses three columns (set \`columns\` to override)
- Square service tiles of one fixed size (about 136px), with names wrapping to two lines; the popover
  sizes itself around them (about 320px for two columns, 460px for three) unless \`width\` is set
- Responsive popover: viewport-capped on mobile, where cards stack in one full-width column

### Usage
\`\`\`tsx
import { AppSwitcher, Header } from '@wso2/oxygen-ui';

<Header.Actions>
  <AppSwitcher>
    <AppSwitcher.Trigger />
    <AppSwitcher.Section aria-label="Manage" tone="manage" columns={2}>
      <AppSwitcher.App name="Cloud home" url="https://console.example.com" icon={<Home size={16} />} />
      <AppSwitcher.App
        name="Organization settings"
        url="https://console.example.com/settings"
        icon={<Settings size={16} />}
      />
    </AppSwitcher.Section>
    <AppSwitcher.Section label="Services">
      <AppSwitcher.App name="Agent Management" url="https://agent.example.com" icon={<Bot size={32} />} />
      <AppSwitcher.App name="API Management" url="https://api.example.com" icon={<Cpu size={32} />} />
      <AppSwitcher.App name="Analytics" disabled tooltip="Coming soon" icon={<ChartLine size={32} />} />
    </AppSwitcher.Section>
  </AppSwitcher>
</Header.Actions>
\`\`\`

### Data-driven switchers
Product consoles that share one list of services can pass it as data instead of composing cards.
\`AppSwitcher.Section\` takes \`apps\` (and \`AppSwitcher.Footer\` takes \`links\`), both using the same
\`AppSwitcherAppItem\` shape (\`id\`, \`name\`, \`url\`, plus the optional card props). The component does
not fetch anything; the console fetches the list and passes it in.

\`\`\`tsx
<AppSwitcher currentAppId="agent-management">
  <AppSwitcher.Trigger label="Switch platforms" />
  <AppSwitcher.Section aria-label="Manage" tone="manage" columns={2} apps={cloudLinks} loading={isLoading} />
  <AppSwitcher.Section label="Services" apps={services} loading={isLoading} />
</AppSwitcher>
\`\`\`

- **Current app.** The card whose \`id\` matches \`currentAppId\` (or that sets \`current\`) opens in the
  same tab, closes the popover on selection, carries \`aria-current="page"\` and keeps a border in the theme's primary color.
  A \`target\` on the item still wins.
- **Unavailable apps.** An app with \`url: null\` (or, in \`apps\`, no \`url\`) and no \`onClick\` or
  \`component\` has no action to offer, so it renders disabled with a "Coming soon" tooltip explaining why.
  Localise the tooltip with \`unavailableLabel\` on \`<AppSwitcher>\`, or override it per item with
  \`tooltip\`. A footer link with no \`url\` at all keeps its previous behavior; pass \`url: null\` to mark
  it unavailable.
- **Loading.** \`loading\` swaps the cards for placeholders of the same height (one row by default,
  \`loadingCount\` to change it) and marks the grid \`aria-busy\`.
- **Busy cards.** \`busy\` shows a progress indicator in place of the mark and ignores clicks while an
  action runs, e.g. granting access before opening the service. The card stays focusable. While busy it
  renders as a button rather than a link, so it cannot be opened from the context menu either.
- **Safe links.** Only \`http:\`, \`https:\` and relative URLs reach \`href\`. Anything else, such as
  \`javascript:\` or \`data:\`, renders the card disabled and logs a warning.

### Service icons
Pass \`icon\` to give each service a glyph that says what it is. The component draws it in a neutral
color (\`text.secondary\`, or \`text.disabled\` when the service is unavailable), so any
\`@wso2/oxygen-ui-icons-react\` icon fits the grid and the theme's primary color stays reserved for the
hover border, focus ring and current app. Size service icons at \`32\` and Manage icons at \`16\`. Without
\`icon\`, a service card falls back to the Choreo Labs mark in the theme's primary color. The switcher has no
fixed colors of its own; everything follows the active theme.

| Service | Icon |
| --- | --- |
| Agent Management | \`Bot\` |
| API Management | \`Cpu\` |
| Identity & Access Management | \`ShieldUser\` |
| Integration | \`Blocks\` |
| Analytics | \`ChartLine\` |
| Cloud home (Manage) | \`Home\` |
| Organization settings (Manage) | \`Settings\` |

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
- Each section's cards are grouped in a list named by its heading ("Services") or, for the Manage row, which has no visible heading, by \`aria-label="Manage"\`. A footer
  without a visible heading is named by \`aria-label\` ("Manage" by default).
- Services marked \`disabled\` carry \`aria-disabled\` and are drawn with a faded mark and muted label; they stay focusable so they remain discoverable, but never navigate.
- "Coming soon" services are disabled cards like the above, and their tooltip is read as the card's description. A card is one when its \`url\` is \`null\` or blank and it has no \`onClick\` or \`component\`; in a section's \`apps\`, an omitted \`url\` counts too.
- The current app is marked \`aria-current="page"\`; its border uses the theme's primary color, which the Oxygen themes keep at 3:1 or more against the card.
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
 * The Choreo Labs Cloud console links shown in the Manage row at the top: Cloud home
 * returns the user to the console home page and Organization settings opens the
 * organization's settings. Their glyphs sit on a neutral disc, so they read as
 * navigation rather than as products. They point at example.com here only so the
 * demo links resolve; a product passes its own console URLs.
 */
const cloudLinks = [
  <AppSwitcher.App key="home" name="Cloud home" url="https://example.com" icon={<Home size={16} />} />,
  <AppSwitcher.App
    key="organization-settings"
    name="Organization settings"
    url="https://example.com"
    icon={<Settings size={16} />}
  />,
];

/** Size of a service icon, matching the platform card's mark. */
const SERVICE_ICON_SIZE = 32;

/**
 * The service cards, as shown in the Choreo Labs Cloud design, each with a
 * glyph that matches what it manages. Analytics is not yet available, so it
 * renders faded and explains itself with a tooltip.
 *
 * Every card points at example.com purely to demo the navigation: cards open in a
 * new tab, so selecting one leaves Storybook intact.
 */
const services = [
  <AppSwitcher.App
    key="agent-management"
    name="Agent Management"
    url="https://example.com"
    icon={<Bot size={SERVICE_ICON_SIZE} />}
  />,
  <AppSwitcher.App
    key="api-management"
    name="API Management"
    url="https://example.com"
    icon={<Cpu size={SERVICE_ICON_SIZE} />}
  />,
  <AppSwitcher.App
    key="identity-access-management"
    name="Identity & Access Management"
    url="https://example.com"
    icon={<ShieldUser size={SERVICE_ICON_SIZE} />}
  />,
  <AppSwitcher.App
    key="integration"
    name="Integration"
    url="https://example.com"
    icon={<Blocks size={SERVICE_ICON_SIZE} />}
  />,
];

/**
 * Default app switcher, matching the agreed design. Click the grid icon to open
 * the popover; every card opens its service in a new tab and leaves the
 * popover open. Click the grid icon again, or outside, to dismiss it.
 */
export const Default: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Click the grid icon to switch between services
      </Typography>
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section aria-label="Manage" tone="manage" columns={2}>
          {cloudLinks}
        </AppSwitcher.Section>
        <AppSwitcher.Section label="Services">
          {services}
        </AppSwitcher.Section>
      </AppSwitcher>
    </Box>
  ),
};

/**
 * A single service. The grid does not stretch one card across the full width,
 * so an organization entitled to one service still gets a card the same size
 * as everywhere else, under the Manage row.
 */
export const SingleService: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section aria-label="Manage" tone="manage" columns={2}>
          {cloudLinks}
        </AppSwitcher.Section>
        <AppSwitcher.Section label="Services">
          <AppSwitcher.App
            name="API Management"
            url="https://example.com"
            icon={<Cpu size={SERVICE_ICON_SIZE} />}
          />
        </AppSwitcher.Section>
      </AppSwitcher>
    </Box>
  ),
};

/**
 * In context: the switcher sits in `Header.Actions` alongside the other header
 * icon buttons and shares their hover styling. Selecting a card opens example.com
 * in a new tab and leaves the popover open, so the user can pick another
 * service; the grid icon, an outside click or `Esc` dismisses it.
 */
export const InHeader: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Header>
      <Header.Brand>
        <Header.BrandTitle>Agent Management</Header.BrandTitle>
      </Header.Brand>
      <Header.Spacer />
      <Header.Actions>
        <AppSwitcher>
          <AppSwitcher.Trigger />
          <AppSwitcher.Section aria-label="Manage" tone="manage" columns={2}>
            {cloudLinks}
          </AppSwitcher.Section>
          <AppSwitcher.Section label="Services">
            {services}
          </AppSwitcher.Section>
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
 * The shared service list, as a console would receive it. `url: null` marks a
 * service that is not available in this environment. The current app points
 * at an in-page anchor only so that selecting it, which opens in the same tab,
 * does not navigate Storybook away.
 */
const serviceData: AppSwitcherAppItem[] = [
  {
    id: 'agent-management',
    name: 'Agent Management',
    url: '#agent-management',
    icon: <Bot size={SERVICE_ICON_SIZE} />,
  },
  {
    id: 'api-management',
    name: 'API Management',
    url: 'https://example.com',
    icon: <Cpu size={SERVICE_ICON_SIZE} />,
  },
  {
    id: 'identity-access-management',
    name: 'Identity & Access Management',
    url: 'https://example.com',
    icon: <ShieldUser size={SERVICE_ICON_SIZE} />,
  },
  {
    id: 'integration',
    name: 'Integration',
    url: 'https://example.com',
    icon: <Blocks size={SERVICE_ICON_SIZE} />,
  },
  { id: 'analytics', name: 'Analytics', url: null, icon: <ChartLine size={SERVICE_ICON_SIZE} /> },
];

const cloudData: AppSwitcherAppItem[] = [
  { id: 'cloud-home', name: 'Cloud home', url: 'https://example.com', icon: <Home size={16} /> },
  {
    id: 'organization-settings',
    name: 'Organization settings',
    url: 'https://example.com',
    icon: <Settings size={16} />,
  },
];

/**
 * Driven from data, as every console does with the shared service list. The
 * user is in Agent Management, so its card carries the current-app border, opens
 * in the same tab and closes the popover. Analytics has no URL here, so it
 * renders disabled with a "Coming soon" tooltip.
 */
export const DataDriven: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher currentAppId="agent-management">
        <AppSwitcher.Trigger label="Switch platforms" />
        <AppSwitcher.Section aria-label="Manage" tone="manage" columns={2} apps={cloudData} />
        <AppSwitcher.Section label="Services" apps={serviceData} />
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
        <AppSwitcher currentAppId="agent-management">
          <AppSwitcher.Trigger />
          <AppSwitcher.Section
            aria-label="Manage"
            tone="manage"
            columns={2}
            apps={cloudData}
            loading={loading}
          />
          <AppSwitcher.Section label="Services" apps={serviceData} loading={loading} />
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

    const apps = serviceData.map((app) =>
      app.id === 'api-management'
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
          Open the switcher and select API Management
        </Typography>
        <AppSwitcher currentAppId="agent-management">
          <AppSwitcher.Trigger />
          <AppSwitcher.Section aria-label="Manage" tone="manage" columns={2} apps={cloudData} />
          <AppSwitcher.Section label="Services" apps={apps} />
        </AppSwitcher>
      </Box>
    );
  },
};
