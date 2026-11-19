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

import * as React from 'react';

/** How long a hover-opened popover stays after the pointer leaves, so it can cross the gap to the popover. */
const HOVER_CLOSE_DELAY_MS = 100;

export interface UseCollapsedPopoverOptions {
  /** True when the sidebar is collapsed to its rail. */
  collapsed: boolean;
  hasNestedItems: boolean;
  /** Whether the item's nested items are expanded in the full sidebar. */
  isExpanded: boolean;
  /** Flips the item's expanded state, which the popover keeps in step with itself. */
  toggleExpanded: () => void;
}

export interface CollapsedPopover {
  /** The element the popover is open beside, or null while it is closed. */
  anchor: HTMLElement | null;
  open: boolean;
  /** True when a click or the keyboard opened it, which keeps it open until it is closed. */
  openedByClick: boolean;
  /** A click on the item. Returns false, doing nothing, when the item has no popover to toggle. */
  click: (element: HTMLElement) => boolean;
  /** The pointer enters the item. */
  enter: (element: HTMLElement) => void;
  /** The pointer leaves the item: a hover-opened popover closes after a short delay. */
  leave: () => void;
  /** The pointer is over the popover itself: a pending close is cancelled. */
  hold: () => void;
  close: () => void;
}

/**
 * The popover that shows the nested items of a sidebar item while the sidebar is collapsed to a rail. Hovering
 * opens it and leaving closes it after a short delay. A click, which is also how the keyboard opens it, makes it
 * stay until it is closed. Expanding the sidebar closes it, and it keeps the item's expanded state in step, so the
 * full sidebar shows what was opened on the rail.
 */
export function useCollapsedPopover({ collapsed, hasNestedItems, isExpanded, toggleExpanded }: UseCollapsedPopoverOptions): CollapsedPopover {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const [openedByClick, setOpenedByClick] = React.useState(false);
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPopover = collapsed && hasNestedItems;

  const clearCloseTimeout = React.useCallback(() => {
    if (closeTimeout.current != null) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const close = React.useCallback(() => {
    clearCloseTimeout();
    setAnchor(null);
    setOpenedByClick(false);
  }, [clearCloseTimeout]);

  React.useEffect(() => () => clearCloseTimeout(), [clearCloseTimeout]);

  // Expanding the sidebar unmounts the collapsed popover UI; clear leftover anchor state so collapsing again
  // does not reopen the menu without a new hover or click.
  React.useEffect(() => {
    if (!collapsed) close();
  }, [collapsed, close]);

  const click = (element: HTMLElement): boolean => {
    if (!hasPopover) return false;

    // Keyboard users can't hover: clicking (Enter/Space) the collapsed parent toggles the nested-items popover.
    const next = anchor ? null : element;
    clearCloseTimeout();
    setAnchor(next);
    setOpenedByClick(Boolean(next));
    // Keep the expanded state in sync so reopening the full sidebar reflects what the user toggled while the rail
    // was collapsed, but only toggle when the current state does not already match the popover.
    if (isExpanded !== Boolean(next)) toggleExpanded();

    return true;
  };

  const enter = (element: HTMLElement) => {
    if (!hasPopover) return;

    clearCloseTimeout();
    setAnchor(element);
    setOpenedByClick(false);
    // Keep the expanded state in sync so reopening the full sidebar reflects the nested items the user already
    // inspected in the hover popover.
    if (!isExpanded) toggleExpanded();
  };

  // Click or keyboard-opened menus stay open until Escape, backdrop, or item selection. Hover-opened menus use a
  // short leave delay so the pointer can bridge the gap from the rail item to the sibling popover paper.
  const leave = () => {
    if (openedByClick) return;

    clearCloseTimeout();
    closeTimeout.current = setTimeout(close, HOVER_CLOSE_DELAY_MS);
  };

  return { anchor, open: Boolean(anchor), openedByClick, click, enter, leave, hold: clearCloseTimeout, close };
}
