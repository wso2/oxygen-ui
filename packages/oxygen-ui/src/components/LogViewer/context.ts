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
import type {
  LogColumn,
  LogEntry,
  LogFilterDefinition,
  LogFilterValue,
  LogFilterValues,
  LogLevel,
  LogSort,
  LogTimeZone,
  LogViewerOrder,
} from './types';

/**
 * Context value shared by the parts of a LogViewer. It holds the data and the state the root
 * LogViewer owns; what the parts look like (their words and sizes) is set on the parts.
 */
export interface LogViewerContextValue {
  /** Entries in display order. */
  entries: LogEntry[];
  /** Number of entries loaded. */
  count: number;
  /** Which end of the list holds the newest entries. */
  order: LogViewerOrder;
  /** Switches between newest first and oldest first. */
  toggleOrder: () => void;
  /** True while the first page is loading. */
  loading: boolean;
  /** True while older entries are loading. */
  loadingOlder: boolean;
  /** True when entries older than the loaded ones can still be loaded. */
  hasMoreOlder: boolean;
  /** Asks for older entries. */
  onLoadOlder?: () => void | Promise<unknown>;
  /** Error shown above the list. */
  error?: React.ReactNode;
  /** Tries again after an error. The error shows a button for it when set. */
  onRetry?: () => void;
  /** Warning shown above the list. */
  warning?: React.ReactNode;
  /** The time zone timestamps are shown in. */
  timeZone: LogTimeZone;
  /** Switches the time zone. */
  setTimeZone: (timeZone: LogTimeZone) => void;
  /** The columns of each entry. */
  columns: LogColumn[];
  /** True when the heading row is visually hidden and its sort and filter controls are not offered. */
  hideHeading: boolean;
  /** The filters the viewer shows. */
  filters: LogFilterDefinition[];
  /**
   * True when there is a time range filter, no range is applied to it, and nothing is loaded. The viewer then asks
   * for a range instead of saying that no logs were found.
   */
  awaitingRange: boolean;
  /** The applied filters, keyed by filter id. */
  filterValues: LogFilterValues;
  /** Called with a filter's id and its new value. */
  onFilterChange?: (id: string, value: LogFilterValue) => void;
  /** The column the entries are sorted by, when it is not the time. */
  sort: LogSort | null;
  /** Called when the reader sorts by a column other than the time. */
  onSortChange?: (sort: LogSort | null) => void;
  /**
   * The time range picker that is open, if any: the id of its filter and the element it is placed
   * under (`null` for the filter's own button). A chip or a column heading opens a picker through
   * this, so each filter is drawn once, in the heading or in the toolbar.
   */
  rangePicker: { id: string; anchor: HTMLElement | null } | null;
  /** Opens the time range picker of a filter, under `anchor` (or under its own button when `null`). */
  openRangePicker: (id: string, anchor: HTMLElement | null) => void;
  /** Closes the open time range picker. */
  closeRangePicker: () => void;
  /** Called after a Copy button is used, with whether the text was copied. */
  onCopy?: (entry: LogEntry, copied: boolean) => void;
  /** Gives the link to one entry. Each entry shows a Copy link button when set. */
  getEntryLink?: (entry: LogEntry) => string | undefined;
  /** Called after a Copy link button is used, with whether the link was copied. */
  onCopyLink?: (entry: LogEntry, copied: boolean) => void;
  /** The entry to mark and scroll into view, such as the one a shared link points at. */
  highlightedEntryId?: string;
  /** The text each level is shown as. */
  levelLabels: Record<LogLevel, string>;
}

export const LogViewerContext = React.createContext<LogViewerContextValue | null>(null);

/**
 * Returns the LogViewer context and throws when used outside a LogViewer.
 */
export const useLogViewerRequired = (): LogViewerContextValue => {
  const context = React.useContext(LogViewerContext);
  if (!context) {
    throw new Error('LogViewer parts must be used inside a <LogViewer>');
  }
  return context;
};
