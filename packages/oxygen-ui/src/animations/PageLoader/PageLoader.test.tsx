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
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import PageLoader from './PageLoader';
import type { PageLoaderProps } from './PageLoader';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const renderLoader = (props: Partial<PageLoaderProps> = {}) => {
  const ui = (p: Partial<PageLoaderProps>) => (
    <OxygenUIThemeProvider>
      <PageLoader loading {...p}>
        <div>App content</div>
      </PageLoader>
    </OxygenUIThemeProvider>
  );
  const result = render(ui(props));
  return { ...result, update: (next: Partial<PageLoaderProps>) => result.rerender(ui({ ...props, ...next })) };
};

/** Each phase schedules its timer after React commits, so step through them one at a time. */
const runAllPhases = () => {
  for (let i = 0; i < 10; i += 1) {
    act(() => {
      vi.runOnlyPendingTimers();
    });
  }
};

const phase = () => screen.queryByRole('status')?.getAttribute('data-phase') ?? 'done';

describe('PageLoader', () => {
  it('shows a busy status with the loading label and keeps children hidden while loading', () => {
    renderLoader();

    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(screen.getByText('Loading')).toBeTruthy();
    expect(screen.queryByText('App content')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(phase()).toBe('loading');
  });

  it('reveals the title, fires onComplete after the hold, then shows children', () => {
    const onComplete = vi.fn();
    const { update } = renderLoader({ onComplete, revealDuration: 700, holdDuration: 600, exitDuration: 400 });

    update({ loading: false });
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(phase()).toBe('revealing');
    expect(screen.getByRole('img', { name: 'Oxygen UI' })).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(700);
    });
    expect(phase()).toBe('revealed');
    expect(onComplete).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(phase()).toBe('exiting');
    expect(screen.getByText('App content')).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.getByText('App content')).toBeTruthy();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('reports each phase in order', () => {
    const phases: string[] = [];
    const { update } = renderLoader({ onPhaseChange: p => phases.push(p) });

    update({ loading: false });
    runAllPhases();

    expect(phases).toEqual(['loading', 'settling', 'revealing', 'revealed', 'exiting', 'done']);
  });

  it('plays the reveal straight away when mounted with loading off', () => {
    const onComplete = vi.fn();
    renderLoader({ loading: false, onComplete, title: 'Acme' });

    runAllPhases();

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('renders a custom title and icon', () => {
    const { update } = renderLoader({ title: 'Acme Console', icon: <span data-testid="custom-icon" /> });

    expect(screen.getByTestId('custom-icon')).toBeTruthy();

    update({ loading: false });
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByText('Acme Console')).toBeTruthy();
  });
});
