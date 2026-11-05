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

import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import TrialBadge, { getTrialBadgeStatus } from './TrialBadge';

afterEach(() => {
  cleanup();
});

const renderBadge = (props: React.ComponentProps<typeof TrialBadge>) =>
  render(
    <OxygenUIThemeProvider>
      <TrialBadge {...props} />
    </OxygenUIThemeProvider>,
  );

describe('TrialBadge', () => {
  it('resolves the status from the exact days left', () => {
    expect(getTrialBadgeStatus(12)).toBe('active');
    expect(getTrialBadgeStatus(5)).toBe('ending-soon');
    expect(getTrialBadgeStatus(2)).toBe('critical');
    expect(getTrialBadgeStatus(0.5)).toBe('critical');
    expect(getTrialBadgeStatus(0)).toBe('expired');
  });

  it('does not show a fractional trial as expired and rounds the displayed count up', () => {
    const { container } = renderBadge({ daysLeft: 0.5 });

    expect(screen.queryByText('Trial expired')).toBeNull();
    expect(screen.getByText('1 day left')).toBeTruthy();
    expect(container.querySelector('[data-status="critical"]')).not.toBeNull();
  });

  it('shows the expired state at 0 days', () => {
    renderBadge({ daysLeft: 0 });

    expect(screen.getByText('Trial expired')).toBeTruthy();
  });

  it('calls both onUpgrade and a consumer onClick when the badge is clicked', () => {
    const onUpgrade = vi.fn();
    const onClick = vi.fn();
    renderBadge({ daysLeft: 2, onUpgrade, onClick });

    fireEvent.click(screen.getByRole('button'));

    expect(onUpgrade).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe('usage panel', () => {
    const usage = {
      items: [
        { label: 'LLM Providers', count: 3, limit: 5 },
        { label: 'MCP Proxies', count: 0, limit: 10 },
      ],
    };

    it('does not render a panel without the usage prop', () => {
      renderBadge({ daysLeft: 10 });

      fireEvent.mouseEnter(screen.getByRole('group'));

      expect(screen.queryByText('Components left')).toBeNull();
    });

    it('opens on hover with the remaining totals and closes on Escape', () => {
      const { container } = renderBadge({ daysLeft: 10, usage });

      expect(screen.queryByText('Components left')).toBeNull();

      fireEvent.mouseEnter(container.firstElementChild as Element);

      expect(screen.getByText('Components left')).toBeTruthy();
      expect(screen.getByText('LLM Providers')).toBeTruthy();
      expect(screen.queryByText(/of 15/)).toBeNull();

      fireEvent.keyDown(container.firstElementChild as Element, { key: 'Escape' });

      expect(screen.queryByText('Components left')).toBeNull();
    });

    it('colors each bar by the share of the limit taken', () => {
      const { container } = renderBadge({
        daysLeft: 10,
        usage: {
          items: [
            { key: 'low', label: 'Low', count: 1, limit: 5 },
            { key: 'mid', label: 'Mid', count: 3, limit: 5 },
            { key: 'high', label: 'High', count: 4, limit: 5 },
            { key: 'full', label: 'Full', count: 5, limit: 5 },
          ],
        },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);

      const tones = Array.from(document.querySelectorAll('[data-tone]')).map(el =>
        el.getAttribute('data-tone'),
      );
      // rows: 20% green, 60% yellow, 80% red, 100% red; button: 13 of 20 is 65% yellow
      expect(tones).toEqual(['success', 'warning', 'error', 'error', 'warning']);
    });

    it('renders titled sections, each with its own total', () => {
      const { container } = renderBadge({
        daysLeft: 10,
        usage: {
          sections: [
            { title: 'Infrastructure', totalSuffix: 'used', items: [{ label: 'Projects', count: 2, limit: 3 }] },
            { title: 'Components', items: [{ label: 'Rest APIs', count: 6, limit: 10 }] },
          ],
        },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);

      expect(screen.getByText('Infrastructure')).toBeTruthy();
      expect(screen.getByText('Components')).toBeTruthy();
      expect(screen.getByText(/of 3 used/)).toBeTruthy();
      expect(screen.getByText('Projects')).toBeTruthy();
      expect(screen.getByText('Rest APIs')).toBeTruthy();
    });

    it('nests a group under its section heading, with its rows indented below it', () => {
      const { container } = renderBadge({
        daysLeft: 10,
        usage: {
          sections: [
            {
              title: 'Infrastructure',
              items: [{ label: 'Portals', count: 1, limit: 1 }],
              groups: [
                {
                  title: 'Gateways',
                  items: [
                    { label: 'WSO2 Managed', count: 0, limit: 1 },
                    { label: 'Self-Hosted', count: 1, limit: 1 },
                  ],
                },
              ],
            },
          ],
        },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);

      expect(screen.getByText('Infrastructure')).toBeTruthy();
      expect(screen.getByRole('group', { name: 'Gateways' })).toBeTruthy();
      // The group's rows live inside it; the section's loose row does not.
      const group = screen.getByRole('group', { name: 'Gateways' });
      expect(group.textContent).toContain('WSO2 Managed');
      expect(group.textContent).toContain('Self-Hosted');
      expect(group.textContent).not.toContain('Portals');
      expect(screen.getByText('Portals')).toBeTruthy();
    });

    it('counts grouped rows in the section total, not just the loose ones', () => {
      const { container } = renderBadge({
        daysLeft: 10,
        usage: {
          sections: [
            {
              title: 'Infrastructure',
              totalSuffix: 'used',
              // Every row is nested: summing section.items alone would read "0 of 0".
              groups: [
                {
                  title: 'Gateways',
                  items: [
                    { label: 'WSO2 Managed', count: 0, limit: 1 },
                    { label: 'Self-Hosted', count: 1, limit: 1 },
                  ],
                },
              ],
            },
          ],
        },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);

      expect(screen.getByText(/of 2 used/)).toBeTruthy();
      expect(screen.queryByText(/of 0 used/)).toBeNull();
    });

    it('colors the upgrade button from grouped rows as well as loose ones', () => {
      const { container } = renderBadge({
        daysLeft: 10,
        usage: {
          // Loose rows alone are 0/2 (green); counting the group takes it to 4/6, over
          // the 0.5 warning threshold. Green here would mean the group was ignored.
          sections: [
            {
              title: 'Infrastructure',
              items: [{ label: 'Portals', count: 0, limit: 2 }],
              groups: [{ title: 'Gateways', items: [{ label: 'WSO2 Managed', count: 4, limit: 4 }] }],
            },
          ],
        },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);

      expect(screen.getByRole('button', { name: /Upgrade/ }).getAttribute('data-tone')).toBe('warning');
    });

    it('renders a section\'s loose rows above its groups', () => {
      const { container } = renderBadge({
        daysLeft: 10,
        usage: {
          sections: [
            {
              title: 'Infrastructure',
              items: [{ label: 'Portals', count: 1, limit: 1 }],
              groups: [{ title: 'Gateways', items: [{ label: 'WSO2 Managed', count: 0, limit: 1 }] }],
            },
          ],
        },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);

      // The panel Card carries the first section's title too, so match the inner one.
      const groups = screen.getAllByRole('group', { name: 'Infrastructure' });
      const order = groups[groups.length - 1].textContent ?? '';
      expect(order.indexOf('Portals')).toBeLessThan(order.indexOf('Gateways'));
    });

    it('renders an untitled group as plain rows, after a titled one', () => {
      const { container } = renderBadge({
        daysLeft: 10,
        usage: {
          sections: [
            {
              title: 'Infrastructure',
              groups: [
                { title: 'Gateways', items: [{ label: 'WSO2 Managed', count: 0, limit: 1 }] },
                { items: [{ label: 'Portals', count: 1, limit: 1 }] },
              ],
            },
          ],
        },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);

      // No sub-heading of its own, and outside the titled group's subtree.
      expect(screen.getByRole('group', { name: 'Gateways' }).textContent).not.toContain('Portals');
      expect(screen.getByText('Portals')).toBeTruthy();

      const groups = screen.getAllByRole('group', { name: 'Infrastructure' });
      const order = groups[groups.length - 1].textContent ?? '';
      expect(order.indexOf('Gateways')).toBeLessThan(order.indexOf('Portals'));
    });

    it('shows a section total only when totalSuffix is passed', () => {
      const { container } = renderBadge({
        daysLeft: 10,
        usage: {
          sections: [
            { title: 'Infrastructure', items: [{ label: 'Projects', count: 2, limit: 3 }] },
            { title: 'Components', totalSuffix: 'used', items: [{ label: 'Rest APIs', count: 6, limit: 10 }] },
          ],
        },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);

      expect(screen.queryByText(/of 3/)).toBeNull();
      expect(screen.getByText(/of 10 used/)).toBeTruthy();
    });

    it('calls the panel onUpgrade from its button, not the badge handler', () => {
      const panelUpgrade = vi.fn();
      const badgeUpgrade = vi.fn();
      const { container } = renderBadge({
        daysLeft: 10,
        onUpgrade: badgeUpgrade,
        usage: { ...usage, onUpgrade: panelUpgrade },
      });

      fireEvent.mouseEnter(container.firstElementChild as Element);
      fireEvent.click(screen.getByRole('button', { name: /Upgrade/ }));

      expect(panelUpgrade).toHaveBeenCalledTimes(1);
      expect(badgeUpgrade).not.toHaveBeenCalled();
    });
  });
});
