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

import { act, renderHook } from '@testing-library/react';
import type * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { LogEntry } from './types';
import { scrolledTowardOlder, useOlderEntries, wheeledTowardOlder, type UseOlderEntriesOptions } from './useOlderEntries';

const entry = (id: string) => ({ id }) as LogEntry;
const geometry = (scrollTop: number, scrollHeight = 1000, clientHeight = 200) => ({ scrollTop, scrollHeight, clientHeight });

describe('scrolledTowardOlder', () => {
  it.each([
    ['oldest first, near the top, moving up', geometry(40), 60, true, true],
    ['oldest first, near the top, moving down', geometry(40), 20, true, false],
    ['oldest first, starting at the top without moving', geometry(0), 0, true, false],
    ['oldest first, moving up but far from the top', geometry(400), 500, true, false],
    ['newest first, near the bottom, moving down', geometry(740), 700, false, true],
    ['newest first, near the bottom, moving up', geometry(740), 760, false, false],
    ['newest first, moving down but far from the bottom', geometry(300), 200, false, false],
  ])('%s', (_label, scroll, previous, oldestFirst, expected) => {
    expect(scrolledTowardOlder(scroll, previous, oldestFirst, 72)).toBe(expected);
  });
});

describe('wheeledTowardOlder', () => {
  it.each([
    ['oldest first, at the top, wheel up', geometry(0), true, -10, true],
    ['oldest first, at the top, wheel down', geometry(0), true, 10, false],
    ['oldest first, off the top, wheel up', geometry(5), true, -10, false],
    ['newest first, at the bottom, wheel down', geometry(800), false, 10, true],
    ['newest first, at the bottom, wheel up', geometry(800), false, -10, false],
    ['newest first, off the bottom, wheel down', geometry(700), false, 10, false],
  ])('%s', (_label, scroll, oldestFirst, deltaY, expected) => {
    expect(wheeledTowardOlder(scroll, oldestFirst, deltaY)).toBe(expected);
  });
});

/** An element reduced to what the hook reads and writes, so no layout is needed. */
const scroller = (scrollTop = 0, scrollHeight = 1000, clientHeight = 200) =>
  ({ scrollTop, scrollHeight, clientHeight }) as HTMLElement;

const render = (overrides: Partial<UseOlderEntriesOptions> = {}, element: HTMLElement = scroller()) => {
  const options: UseOlderEntriesOptions = {
    scrollRef: { current: element },
    entries: [entry('a')],
    order: 'oldest-first',
    scrollTriggerPx: 72,
    hasMoreOlder: true,
    loadingOlder: false,
    loading: false,
    onLoadOlder: vi.fn(),
    ...overrides,
  };

  return { options, element, ...renderHook((props: UseOlderEntriesOptions) => useOlderEntries(props), { initialProps: options }) };
};

const deferred = () => {
  let resolve!: () => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<void>((done, fail) => {
    resolve = done;
    reject = fail;
  });

  return { promise, resolve, reject };
};

describe('useOlderEntries, asking for older entries', () => {
  it('asks once when two gestures arrive before the first request settles', () => {
    const request = deferred();
    const onLoadOlder = vi.fn(() => request.promise);
    const { result } = render({ onLoadOlder });

    act(() => {
      result.current.loadOlder();
      result.current.loadOlder();
    });

    expect(onLoadOlder).toHaveBeenCalledTimes(1);
  });

  it('reports loading while the returned promise is pending, and asks again once it resolves', async () => {
    const request = deferred();
    const onLoadOlder = vi.fn(() => request.promise);
    const { result } = render({ onLoadOlder });

    act(() => result.current.loadOlder());
    expect(result.current.loadingMore).toBe(true);

    await act(async () => request.resolve());
    expect(result.current.loadingMore).toBe(false);

    act(() => result.current.loadOlder());
    expect(onLoadOlder).toHaveBeenCalledTimes(2);
  });

  it('asks again after a request that fails', async () => {
    const request = deferred();
    const onLoadOlder = vi.fn(() => request.promise);
    const { result } = render({ onLoadOlder });

    act(() => result.current.loadOlder());
    await act(async () => {
      request.reject(new Error('no'));
      await request.promise.catch(() => undefined);
    });

    act(() => result.current.loadOlder());
    expect(onLoadOlder).toHaveBeenCalledTimes(2);
  });

  it('asks again after the consumer reports loading and then done, for a request that returns nothing', () => {
    const { result, rerender, options } = render();

    act(() => result.current.loadOlder());
    act(() => result.current.loadOlder());
    expect(options.onLoadOlder).toHaveBeenCalledTimes(1);

    rerender({ ...options, loadingOlder: true });
    expect(result.current.loadingMore).toBe(true);
    rerender({ ...options, loadingOlder: false });

    act(() => result.current.loadOlder());
    expect(options.onLoadOlder).toHaveBeenCalledTimes(2);
  });

  it('asks again when the entries change', () => {
    const { result, rerender, options } = render();

    act(() => result.current.loadOlder());
    rerender({ ...options, entries: [entry('z'), entry('a')] });
    act(() => result.current.loadOlder());

    expect(options.onLoadOlder).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['there is nothing older', { hasMoreOlder: false }],
    ['the consumer says older entries are loading', { loadingOlder: true }],
    ['the first page is loading', { loading: true }],
    ['there is no handler', { onLoadOlder: undefined }],
  ])('does not ask when %s', (_label, overrides) => {
    const onLoadOlder = vi.fn();
    const { result } = render({ onLoadOlder, ...overrides });

    act(() => result.current.loadOlder());

    expect(onLoadOlder).not.toHaveBeenCalled();
  });
});

describe('useOlderEntries, reading the scroll', () => {
  it('asks when the reader scrolls up near the top, and not when the list merely starts there', () => {
    const element = scroller(0);
    const onLoadOlder = vi.fn();
    const { result } = render({ onLoadOlder }, element);

    act(() => result.current.onScroll());
    expect(onLoadOlder).not.toHaveBeenCalled();

    element.scrollTop = 300;
    act(() => result.current.onScroll());
    element.scrollTop = 30;
    act(() => result.current.onScroll());

    expect(onLoadOlder).toHaveBeenCalledTimes(1);
  });

  it('asks when the reader scrolls down near the bottom of a newest-first list', () => {
    const element = scroller(100);
    const onLoadOlder = vi.fn();
    const { result } = render({ onLoadOlder, order: 'newest-first' }, element);

    act(() => result.current.onScroll());
    element.scrollTop = 760;
    act(() => result.current.onScroll());

    expect(onLoadOlder).toHaveBeenCalledTimes(1);
  });

  it('asks when the wheel turns toward the older end while already there', () => {
    const onLoadOlder = vi.fn();
    const { result } = render({ onLoadOlder });

    act(() => result.current.onWheel({ deltaY: 10 } as React.WheelEvent<HTMLElement>));
    expect(onLoadOlder).not.toHaveBeenCalled();

    act(() => result.current.onWheel({ deltaY: -10 } as React.WheelEvent<HTMLElement>));
    expect(onLoadOlder).toHaveBeenCalledTimes(1);
  });

  it('starts from the top again when the order flips', () => {
    const element = scroller(500);
    const { rerender, options } = render({}, element);

    rerender({ ...options, order: 'newest-first' });

    expect(element.scrollTop).toBe(0);
  });
});

describe('useOlderEntries, keeping the reader in place', () => {
  it('moves the scroll position down by the height of the entries added above, in an oldest-first list', () => {
    const element = scroller(0, 300);
    const { rerender, options } = render({ entries: [entry('b'), entry('c')] }, element);

    // Mounting starts the list from the top, so the reader's position is set after it.
    element.scrollTop = 50;
    (element as { scrollHeight: number }).scrollHeight = 500;
    rerender({ ...options, entries: [entry('a'), entry('b'), entry('c')] });

    expect(element.scrollTop).toBe(250);
  });

  it('leaves the position alone in a newest-first list', () => {
    const element = scroller(0, 300);
    const { rerender, options } = render({ entries: [entry('b'), entry('c')], order: 'newest-first' }, element);

    element.scrollTop = 50;
    (element as { scrollHeight: number }).scrollHeight = 500;
    rerender({ ...options, entries: [entry('a'), entry('b'), entry('c')] });

    expect(element.scrollTop).toBe(50);
  });

  it('leaves the position alone when the entries are replaced rather than added to', () => {
    const element = scroller(0, 300);
    const { rerender, options } = render({ entries: [entry('b'), entry('c')] }, element);

    element.scrollTop = 50;
    (element as { scrollHeight: number }).scrollHeight = 500;
    rerender({ ...options, entries: [entry('x'), entry('y')] });

    expect(element.scrollTop).toBe(50);
  });
});
