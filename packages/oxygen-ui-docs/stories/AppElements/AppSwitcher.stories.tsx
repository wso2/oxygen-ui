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
 * AppSwitcher is a compound component that lets users move between the WSO2 Cloud
 * applications from a grid icon button in the header.
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

### Features
- Composable structure with Trigger, Section, App, and Footer sub-components
- Grid icon button that matches the other header icon buttons, including hover styling
- App cards render as real links when given an \`href\`, so middle-click and "open in new tab" keep working
- Per-app \`current\`, \`disabled\`, and status chip states
- Responsive popover: viewport-capped on mobile, fixed width from \`sm\` up

### Sub-components
- \`AppSwitcher.Trigger\` - Grid icon button that opens the popover
- \`AppSwitcher.Section\` - Labelled grid of applications
- \`AppSwitcher.App\` - Card button for a single application
- \`AppSwitcher.Footer\` - Supporting text with a trailing link action

### Usage
\`\`\`tsx
import { AppSwitcher, Header } from '@wso2/oxygen-ui';
import { Bot, Braces } from '@wso2/oxygen-ui-icons-react';

<Header.Actions>
  <AppSwitcher>
    <AppSwitcher.Trigger />
    <AppSwitcher.Section label="Platforms">
      <AppSwitcher.App
        name="Agent"
        icon={<Bot size={20} />}
        status="Current"
        current
      />
      <AppSwitcher.App
        name="API Management"
        icon={<Braces size={20} />}
        status="Try Now"
        href="/apim"
      />
    </AppSwitcher.Section>
    <AppSwitcher.Footer
      description="Manage Organization & Users, billing"
      actionLabel="WSO2 Cloud Console"
      href="https://console.wso2.com"
    />
  </AppSwitcher>
</Header.Actions>
\`\`\`

### Accessibility
- The trigger is a labeled button ("Switch app" by default) exposing \`aria-haspopup\`, \`aria-expanded\`, and \`aria-controls\`.
- Apps are grouped in a list labelled by the section heading, so the number of platforms is announced.
- The current app is marked with \`aria-current\`, and unavailable apps with \`aria-disabled\`.
- The popover is an MUI Popover: focus is trapped while open, Escape closes it and returns focus to the trigger.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppSwitcher>;

/**
 * Platforms rendered as in the WSO2 Cloud design, with current, available,
 * expired, and coming-soon states.
 */
const Platforms = () => (
  <AppSwitcher.Section label="Platforms">
    <AppSwitcher.App
      name="Agent"
      icon={<Bot size={20} />}
      status="Current"
      statusColor="primary"
      current
    />
    <AppSwitcher.App
      name="API Management"
      icon={<Braces size={20} />}
      status="Try Now"
      onClick={() => console.log('API Management clicked')}
    />
    <AppSwitcher.App
      name="Integration"
      icon={<Waypoints size={20} />}
      status="Try Now"
      onClick={() => console.log('Integration clicked')}
    />
    <AppSwitcher.App
      name="Identity"
      icon={<ShieldCheck size={20} />}
      status="Set up"
      onClick={() => console.log('Identity clicked')}
    />
    <AppSwitcher.App
      name="Engineering Platform"
      icon={<Layers size={20} />}
      status="Trial expired"
      onClick={() => console.log('Engineering Platform clicked')}
    />
    <AppSwitcher.App
      name="Analytics"
      icon={<ChartColumn size={20} />}
      status="Coming soon"
      statusColor="warning"
      disabled
    />
  </AppSwitcher.Section>
);

/**
 * Default app switcher. Click the grid icon to open the popover.
 */
export const Default: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Click the grid icon to switch between platforms
      </Typography>
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <Platforms />
        <AppSwitcher.Footer
          description="Manage Organization & Users, billing"
          actionLabel="WSO2 Cloud Console"
          onActionClick={() => console.log('Cloud Console clicked')}
        />
      </AppSwitcher>
    </Box>
  ),
};

/**
 * Apps as links. Providing `href` renders each card as an anchor, so users keep
 * native browser affordances like middle-click and "open in new tab".
 */
export const WithLinks: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms">
          <AppSwitcher.App
            name="Agent"
            icon={<Bot size={20} />}
            status="Current"
            statusColor="primary"
            current
          />
          <AppSwitcher.App
            name="API Management"
            icon={<Braces size={20} />}
            status="Try Now"
            href="https://wso2.com"
            target="_blank"
          />
          <AppSwitcher.App
            name="Integration"
            icon={<Waypoints size={20} />}
            status="Try Now"
            href="https://wso2.com"
            target="_blank"
          />
          <AppSwitcher.App
            name="Identity"
            icon={<ShieldCheck size={20} />}
            status="Set up"
            href="https://wso2.com"
            target="_blank"
          />
        </AppSwitcher.Section>
        <AppSwitcher.Footer
          description="Manage Organization & Users, billing"
          actionLabel="WSO2 Cloud Console"
          href="https://console.wso2.com"
          target="_blank"
        />
      </AppSwitcher>
    </Box>
  ),
};

/**
 * Apps with supporting descriptions, useful when names alone are ambiguous.
 */
export const WithDescriptions: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher width={520}>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms">
          <AppSwitcher.App
            name="Agent"
            description="Build and run AI agents"
            icon={<Bot size={20} />}
            status="Current"
            statusColor="primary"
            current
          />
          <AppSwitcher.App
            name="API Management"
            description="Design, publish and govern APIs"
            icon={<Braces size={20} />}
            status="Try Now"
          />
          <AppSwitcher.App
            name="Integration"
            description="Connect systems and automate flows"
            icon={<Waypoints size={20} />}
            status="Try Now"
          />
          <AppSwitcher.App
            name="Identity"
            description="Manage users, apps and access"
            icon={<ShieldCheck size={20} />}
            status="Set up"
          />
        </AppSwitcher.Section>
      </AppSwitcher>
    </Box>
  ),
};

/**
 * Single-column layout, suited to narrow popovers or short app lists.
 */
export const SingleColumn: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <AppSwitcher width={280}>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms" columns={1}>
          <AppSwitcher.App
            name="Agent"
            icon={<Bot size={20} />}
            status="Current"
            statusColor="primary"
            current
          />
          <AppSwitcher.App name="API Management" icon={<Braces size={20} />} status="Try Now" />
          <AppSwitcher.App name="Integration" icon={<Waypoints size={20} />} status="Try Now" />
        </AppSwitcher.Section>
      </AppSwitcher>
    </Box>
  ),
};

/**
 * In context: the switcher sits in `Header.Actions` alongside the other
 * header icon buttons and shares their hover styling.
 */
export const InHeader: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Header>
      <Header.Brand>
        <Header.BrandTitle>Agent</Header.BrandTitle>
      </Header.Brand>
      <Header.Spacer />
      <Header.Actions>
        <AppSwitcher>
          <AppSwitcher.Trigger />
          <Platforms />
          <AppSwitcher.Footer
            description="Manage Organization & Users, billing"
            actionLabel="WSO2 Cloud Console"
            onActionClick={() => console.log('Cloud Console clicked')}
          />
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
