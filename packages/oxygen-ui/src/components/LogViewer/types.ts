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

import type * as React from 'react';
import type { TimeRange, TimeRangePreset } from '../TimeRangeFilter';

/**
 * How serious a log entry is. These are the six severity names of OpenTelemetry, from least to
 * most serious.
 */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * The time zone timestamps are shown in: UTC, or the reader's own (browser) time zone.
 */
export type LogTimeZone = 'utc' | 'local';

/**
 * One entry in a LogViewer.
 */
export interface LogEntry {
  /**
   * Stable, unique identifier of the entry.
   */
  id: string;
  /**
   * When the entry happened. The viewer shows it in one standard format, in UTC or the reader's
   * time zone. A string is read as a date; one that is not a date is shown as given.
   */
  timestamp: string | Date;
  /**
   * How serious the entry is. The viewer draws one standard marker for it, the same in every
   * product, so do not color a column by hand to show severity. Leave it out for entries
   * that have no level.
   */
  level?: LogLevel;
  /**
   * Fields shown when the entry is expanded, in the order given. Nested objects and arrays
   * render as an expandable tree. The entry cannot be expanded when this is omitted and
   * `renderDetails` is not set. The columns can read their content from here.
   */
  details?: Record<string, unknown>;
  /**
   * Plain text copied by the entry's Copy button and saved by Download. Defaults to the text of the
   * entry's columns, joined by spaces. The button is hidden when there is no text to copy.
   */
  copyText?: string;
}

/**
 * One column of the column layout. The viewer shows a heading for each column, and a filter and
 * a sort control in it when the column has them.
 */
export interface LogColumn {
  /**
   * Stable identifier. `time` and `level` are built in: without `render` they show the entry's
   * time and level marker, and their label defaults to "Time" and "Level".
   */
  id: string;
  /** Heading of the column. */
  label?: string;
  /**
   * Width of the column: a number is pixels, a string is a CSS grid track size such as `'2fr'`.
   * @default '1fr'
   */
  width?: number | string;
  /** Content of the column for one entry. */
  render?: (entry: LogEntry) => React.ReactNode;
  /**
   * Plain text of the column for one entry, used for the Copy button and Download. Defaults to the
   * result of `render` when that is a string or a number, so it is only needed when `render` returns
   * an element.
   */
  text?: (entry: LogEntry) => string;
  /** Id of the entry of `filters` that is opened from this column's heading. */
  filterId?: string;
  /**
   * Makes the heading a sort control. Sorting the `time` column switches between newest first and
   * oldest first. Sorting any other column is reported through `onSortChange`.
   */
  sortable?: boolean;
}

/**
 * The column the entries are sorted by, and the direction.
 */
export interface LogSort {
  /** Id of the sorted column. */
  columnId: string;
  direction: 'asc' | 'desc';
}

/**
 * Which end of the list holds the newest entries.
 * - `newest-first`: older entries are loaded at the bottom.
 * - `oldest-first`: older entries are loaded at the top.
 */
export type LogViewerOrder = 'newest-first' | 'oldest-first';

/**
 * One choice of a `select` filter.
 */
export interface LogFilterOption {
  /**
   * Value reported through `onFilterChange` and kept in `filterValues`. It must not be empty: an empty
   * value means the filter is not applied, so a choice with one is left out of the list.
   */
  value: string;
  /** Text shown for the choice. */
  label: string;
}

/**
 * A filter whose value is one of a list of options.
 */
export interface LogSelectFilter {
  /** Stable identifier. It is the key in `filterValues` and the first argument of `onFilterChange`. */
  id: string;
  /** Name of the filter, on its button and before the value in its chip (e.g. "Status"). */
  label: string;
  type: 'select';
  /** Choices. Build them from the loaded entries or list them in advance. */
  options: LogFilterOption[];
  /**
   * Adds a search box above the choices, for long lists.
   * @default false
   */
  searchable?: boolean;
  /**
   * Text of the choice that clears the filter.
   * @default 'Any {label}' with the label in lower case, for example 'Any status'
   */
  allLabel?: string;
  /**
   * Placeholder of the search box.
   * @default 'Search'
   */
  searchPlaceholder?: string;
  /**
   * Text shown when the search matches no choice.
   * @default 'No matches'
   */
  noMatchLabel?: string;
}

/**
 * A filter whose value is a time range, picked from presets or entered as a custom range.
 */
export interface LogTimeRangeFilter {
  /** Stable identifier. It is the key in `filterValues` and the first argument of `onFilterChange`. */
  id: string;
  /** Name of the filter, on its button and before the range in its chip (e.g. "Time"). */
  label: string;
  type: 'timeRange';
  /** Quick ranges listed in the menu. Defaults to those of `TimeRangeFilter`. */
  presets?: TimeRangePreset[];
  /** Longest range, in milliseconds, that a custom range may span. Unlimited when omitted. */
  maxRangeMs?: number;
  /** Formats the range shown in the filter's chip. Defaults to UTC start and end times. */
  formatValue?: (range: TimeRange) => string;
}

/**
 * Describes one filter the viewer shows in its toolbar. The viewer only displays the filter and
 * reports changes; it never filters the entries. Load or filter them in `onFilterChange`.
 */
export type LogFilterDefinition = LogSelectFilter | LogTimeRangeFilter;

/**
 * The value of one filter: an option value for `select`, a range for `timeRange`. `null`,
 * `undefined` or an empty string means the filter is not applied.
 */
export type LogFilterValue = string | TimeRange | null | undefined;

/**
 * The applied filters, keyed by filter id.
 */
export type LogFilterValues = Record<string, LogFilterValue>;
