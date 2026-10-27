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
