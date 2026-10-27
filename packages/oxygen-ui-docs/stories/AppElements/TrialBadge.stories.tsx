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
import { TrialBadge, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * TrialBadge shows the days left in a free trial. Its color follows the time left,
 * and in the last days and after expiry the second line becomes an "Upgrade now" link.
 */
const meta: Meta<typeof TrialBadge> = {
  title: 'App Elements/Trial Badge',
  component: TrialBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    daysLeft: { control: { type: 'number', min: 0, max: 30 } },
    totalDays: { control: 'number' },
    endingSoonThreshold: { control: 'number' },
    criticalThreshold: { control: 'number' },
    showUpgrade: { control: 'boolean' },
    upgradeLabel: { control: 'text' },
    expiredLabel: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: { daysLeft: 12, totalDays: 14 },
};

export default meta;
type Story = StoryObj<typeof TrialBadge>;

export const Default: Story = {};
export const EndingSoon: Story = { args: { daysLeft: 5 } };
export const Critical: Story = { args: { daysLeft: 2, onUpgrade: () => undefined } };
export const Expired: Story = { args: { daysLeft: 0, onUpgrade: () => undefined } };

const singleUsage = {
  title: 'Components',
  totalSuffix: 'used',
  items: [
    { label: 'LLM Providers', count: 1, limit: 5 },
    { label: 'MCP Proxies', count: 3, limit: 5 },
    { label: 'Rest APIs', count: 4, limit: 5 },
    { label: 'Agent Proxies', count: 5, limit: 5 },
  ],
  onUpgrade: () => undefined,
};

const sectionedUsage = {
  sections: [
    {
      title: 'Infrastructure',
      items: [
        { label: 'Projects', count: 1, limit: 3 },
        { label: 'Environments', count: 4, limit: 6 },
        { label: 'Gateways', count: 3, limit: 3 },
        { label: 'Portals', count: 1, limit: 2 },
      ],
    },
    {
      title: 'Components',
      totalSuffix: 'used',
      items: [
        { label: 'LLM Providers', count: 1, limit: 5 },
        { label: 'MCP Proxies', count: 4, limit: 10 },
        { label: 'Rest APIs', count: 6, limit: 10 },
        { label: 'Agent Proxies', count: 5, limit: 5 },
      ],
    },
  ],
  onUpgrade: () => undefined,
};

const withRoom = [(Story: React.ComponentType) => <div style={{ minHeight: 520 }}><Story /></div>];

/**
 * Pass `usage` to show a panel with the usage of each resource when the badge is hovered or
 * focused. Each bar is colored by `count / limit`: green up to 50%, yellow above that, and red
 * from 75%. Hover the badge to see it.
 */
export const WithUsagePanel: Story = {
  args: { daysLeft: 10, usage: singleUsage },
  decorators: withRoom,
};

/**
 * Group resources under titles with `usage.sections`. Each section shows its own total
 * (for example "8 of 14 used") above its rows.
 */
export const WithUsagePanelSections: Story = {
  args: { daysLeft: 10, usage: sectionedUsage },
  decorators: withRoom,
};

/**
 * Both cut-offs can be changed with `warningThreshold` and `criticalThreshold`.
 */
export const WithUsagePanelCustomThresholds: Story = {
  args: { daysLeft: 10, usage: { ...singleUsage, warningThreshold: 0.2, criticalThreshold: 0.9 } },
  decorators: withRoom,
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2} alignItems="flex-start">
      {[12, 5, 2, 0].map((d) => (
        <TrialBadge key={d} daysLeft={d} onUpgrade={() => undefined} />
      ))}
    </Stack>
  ),
};
