/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCollapsedPopover, type UseCollapsedPopoverOptions } from './useCollapsedPopover';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const element = () => document.createElement('button');

const render = (overrides: Partial<UseCollapsedPopoverOptions> = {}) => {
  const toggleExpanded = vi.fn();
  const options: UseCollapsedPopoverOptions = { collapsed: true, hasNestedItems: true, isExpanded: false, toggleExpanded, ...overrides };

  return { toggleExpanded, options, ...renderHook((props: UseCollapsedPopoverOptions) => useCollapsedPopover(props), { initialProps: options }) };
};

describe('useCollapsedPopover, hovering', () => {
  it('opens beside the item on enter, not from a click, and flips the expanded state', () => {
    const { result, toggleExpanded } = render();
    const item = element();

    act(() => result.current.enter(item));

    expect(result.current).toMatchObject({ anchor: item, open: true, openedByClick: false });
    expect(toggleExpanded).toHaveBeenCalledTimes(1);
  });

  it('leaves the expanded state alone when the item is already expanded', () => {
    const { result, toggleExpanded } = render({ isExpanded: true });

    act(() => result.current.enter(element()));

    expect(result.current.open).toBe(true);
    expect(toggleExpanded).not.toHaveBeenCalled();
  });

  it.each([
    ['the sidebar is not collapsed', { collapsed: false }],
    ['the item has no nested items', { hasNestedItems: false }],
  ])('does nothing on enter when %s', (_label, overrides) => {
    const { result, toggleExpanded } = render(overrides);

    act(() => result.current.enter(element()));

    expect(result.current.open).toBe(false);
    expect(toggleExpanded).not.toHaveBeenCalled();
  });

  it('closes 100 ms after the pointer leaves, and not before', () => {
    const { result } = render();

    act(() => result.current.enter(element()));
    act(() => result.current.leave());
    act(() => void vi.advanceTimersByTime(99));
    expect(result.current.open).toBe(true);

    act(() => void vi.advanceTimersByTime(1));
    expect(result.current.open).toBe(false);
  });

  it('stays open when the pointer comes back in time, whether to the item or to the popover', () => {
    const { result } = render();

    act(() => result.current.enter(element()));
    act(() => result.current.leave());
    act(() => result.current.hold());
    act(() => void vi.advanceTimersByTime(1000));
    expect(result.current.open).toBe(true);

    act(() => result.current.leave());
    act(() => void vi.advanceTimersByTime(50));
    act(() => result.current.enter(element()));
    act(() => void vi.advanceTimersByTime(1000));
    expect(result.current.open).toBe(true);
  });
});

describe('useCollapsedPopover, clicking', () => {
  it('opens on a click, stays open when the pointer leaves, and flips the expanded state', () => {
    const { result, toggleExpanded } = render();
    const item = element();

    let taken = false;
    act(() => {
      taken = result.current.click(item);
    });

    expect(taken).toBe(true);
    expect(result.current).toMatchObject({ anchor: item, open: true, openedByClick: true });
    expect(toggleExpanded).toHaveBeenCalledTimes(1);

    act(() => result.current.leave());
    act(() => void vi.advanceTimersByTime(1000));
    expect(result.current.open).toBe(true);
  });

  it('closes on the next click, and flips the expanded state back when it was expanded by the open', () => {
    const { result, rerender, options, toggleExpanded } = render();

    act(() => void result.current.click(element()));
    rerender({ ...options, isExpanded: true });
    act(() => void result.current.click(element()));

    expect(result.current).toMatchObject({ anchor: null, open: false, openedByClick: false });
    expect(toggleExpanded).toHaveBeenCalledTimes(2);
  });

  it('closes on a click while it is only open from a hover', () => {
    const { result } = render();

    act(() => result.current.enter(element()));
    act(() => void result.current.click(element()));

    expect(result.current.open).toBe(false);
  });

  it('is not taken, and does nothing, when there is no popover to toggle', () => {
    const { result, toggleExpanded } = render({ hasNestedItems: false });

    let taken = true;
    act(() => {
      taken = result.current.click(element());
    });

    expect(taken).toBe(false);
    expect(result.current.open).toBe(false);
    expect(toggleExpanded).not.toHaveBeenCalled();
  });

  it('cancels a pending close', () => {
    const { result } = render();

    act(() => result.current.enter(element()));
    act(() => result.current.leave());
    act(() => void result.current.click(element()));
    act(() => void result.current.click(element()));
    act(() => void vi.advanceTimersByTime(1000));

    expect(vi.getTimerCount()).toBe(0);
  });
});

describe('useCollapsedPopover, closing', () => {
  it('closes at once, clearing a pending close', () => {
    const { result } = render();

    act(() => result.current.enter(element()));
    act(() => result.current.leave());
    act(() => result.current.close());

    expect(result.current.open).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('closes when the sidebar is expanded, so collapsing it again does not reopen the popover', () => {
    const { result, rerender, options } = render();

    act(() => void result.current.click(element()));
    rerender({ ...options, collapsed: false });
    expect(result.current.open).toBe(false);

    rerender({ ...options, collapsed: true });
    expect(result.current.open).toBe(false);
  });

  it('leaves no timer behind when it is unmounted with a close pending', () => {
    const { result, unmount } = render();

    act(() => result.current.enter(element()));
    act(() => result.current.leave());
    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
