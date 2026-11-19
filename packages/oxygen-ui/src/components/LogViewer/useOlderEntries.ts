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
import type { LogEntry, LogViewerOrder } from './types';

interface ScrollGeometry {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

/**
 * Whether a scroll means the reader wants older entries: they are within `triggerPx` of the older end and
 * moved toward it. Position alone is not enough: the list starts at the top, so scrolling away from the
 * older end would otherwise load too.
 */
export const scrolledTowardOlder = (
  { scrollTop, scrollHeight, clientHeight }: ScrollGeometry,
  previousScrollTop: number,
  oldestFirst: boolean,
  triggerPx: number,
): boolean => {
  const nearTop = scrollTop < triggerPx;
  const nearBottom = scrollHeight - scrollTop - clientHeight < triggerPx;

  return oldestFirst ? nearTop && scrollTop < previousScrollTop : nearBottom && scrollTop > previousScrollTop;
};

/**
 * Whether a wheel turn means the reader wants older entries: the list is already at the older end and the
 * wheel turns further toward it. That produces no scroll event, so the wheel is the only signal.
 */
export const wheeledTowardOlder = (
  { scrollTop, scrollHeight, clientHeight }: ScrollGeometry,
  oldestFirst: boolean,
  deltaY: number,
): boolean => {
  const atTop = scrollTop <= 0;
  const atBottom = scrollHeight - scrollTop - clientHeight <= 1;

  return oldestFirst ? atTop && deltaY < 0 : atBottom && deltaY > 0;
};

export interface UseOlderEntriesOptions {
  /** The element that scrolls. */
  scrollRef: React.RefObject<HTMLElement | null>;
  entries: LogEntry[];
  order: LogViewerOrder;
  /** How close to the older end, in pixels, a scroll toward it loads older entries. */
  scrollTriggerPx: number;
  hasMoreOlder: boolean;
  /** True while a consumer says older entries are loading. */
  loadingOlder: boolean;
  /** True while the first page loads. */
  loading: boolean;
  onLoadOlder?: () => void | Promise<unknown>;
}

export interface OlderEntries {
  /** True while older entries load, whether the consumer says so or the request it returned is pending. */
  loadingMore: boolean;
  /** Asks for older entries, unless none can be loaded or a request is already on its way. */
  loadOlder: () => void;
  onScroll: () => void;
  onWheel: (event: React.WheelEvent<HTMLElement>) => void;
}

/**
 * Loading older entries for a scrolling list: when the reader asks for them by scrolling, or by calling
 * `loadOlder`, how a request in flight is tracked so that one scroll gesture asks once, and keeping the
 * entries being read where they are when the older ones arrive above them.
 */
export function useOlderEntries({
  scrollRef,
  entries,
  order,
  scrollTriggerPx,
  hasMoreOlder,
  loadingOlder,
  loading,
  onLoadOlder,
}: UseOlderEntriesOptions): OlderEntries {
  const oldestFirst = order === 'oldest-first';
  const lastScrollTop = React.useRef(0);
  const lastLayout = React.useRef<{ firstId?: string; height: number }>({ height: 0 });

  // Flipping the order puts the other end of the list at the top, so start from the top again.
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    lastScrollTop.current = 0;
  }, [order, scrollRef]);

  // True while the promise `onLoadOlder` returned is pending, so a page that returns its request
  // does not also have to set `loadingOlder` for the button to show it is busy.
  const [requestPending, setRequestPending] = React.useState(false);
  const mounted = React.useRef(true);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const loadingMore = loadingOlder || requestPending;

  const canLoadOlder = hasMoreOlder && !loadingMore && !loading && Boolean(onLoadOlder);

  // A scroll and a wheel event can both fire before the consumer re-renders with `loadingOlder`
  // set, so a request in flight is tracked here. It ends when the returned promise settles, when
  // `loadingOlder` goes back to false, or when the entries change.
  const requestInFlight = React.useRef(false);
  const sawLoadingOlder = React.useRef(false);
  React.useEffect(() => {
    if (loadingOlder) {
      sawLoadingOlder.current = true;
    } else if (sawLoadingOlder.current) {
      sawLoadingOlder.current = false;
      requestInFlight.current = false;
    }
  }, [loadingOlder]);
  React.useEffect(() => {
    requestInFlight.current = false;
  }, [entries]);

  const loadOlder = () => {
    if (!canLoadOlder || requestInFlight.current) return;
    requestInFlight.current = true;
    const request = onLoadOlder?.();
    if (request && typeof request.then === 'function') {
      setRequestPending(true);
      const done = () => {
        requestInFlight.current = false;
        if (mounted.current) setRequestPending(false);
      };
      request.then(done, done);
    }
  };

  // When older entries are added above the reader, move the scroll position down by their height
  // so the entries being read stay where they are.
  React.useLayoutEffect(() => {
    const element = scrollRef.current;
    const firstId = entries[0]?.id;
    const previous = lastLayout.current;
    if (
      element &&
      oldestFirst &&
      previous.firstId !== undefined &&
      firstId !== previous.firstId &&
      entries.some((entry) => entry.id === previous.firstId)
    ) {
      element.scrollTop += element.scrollHeight - previous.height;
    }
    lastLayout.current = { firstId, height: element?.scrollHeight ?? 0 };
  });

  const onScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const previousScrollTop = lastScrollTop.current;
    lastScrollTop.current = element.scrollTop;
    if (scrolledTowardOlder(element, previousScrollTop, oldestFirst, scrollTriggerPx)) loadOlder();
  };

  const onWheel = (event: React.WheelEvent<HTMLElement>) => {
    const element = scrollRef.current;
    if (element && wheeledTowardOlder(element, oldestFirst, event.deltaY)) loadOlder();
  };

  return { loadingMore, loadOlder, onScroll, onWheel };
}
