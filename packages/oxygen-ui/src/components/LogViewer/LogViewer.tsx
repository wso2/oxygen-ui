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
import Paper from '@mui/material/Paper';
import type { SxProps, Theme } from '@mui/material/styles';
import { LogViewerContext } from './context';
import type { LogViewerContextValue } from './context';
import {
  LogViewerCount,
  LogViewerDownload,
  LogViewerRefresh,
  LogViewerSort,
  LogViewerTimeZone,
} from './LogViewerControls';
import { DEFAULT_LEVEL_LABELS } from './LogLevelMarker';
import LogViewerSearch from './LogViewerSearch';
import LogViewerStream from './LogViewerStream';
import LogViewerToolbar from './LogViewerToolbar';
import type {
  LogEntry,
  LogColumn,
  LogFilterDefinition,
  LogFilterValue,
  LogFilterValues,
  LogLevel,
  LogSort,
  LogTimeZone,
  LogViewerOrder,
} from './types';

/**
 * Props for the LogViewer component. The root holds the data and the state of the viewer; what its
 * parts look like and say is set on the parts (`LogViewer.Toolbar`, `LogViewer.Stream` and the
 * controls in the toolbar).
 */
export interface LogViewerProps {
  /**
   * Entries, newest first, in the order a log is read from its source. The viewer reverses them
   * itself when the reader chooses oldest first.
   */
  entries: LogEntry[];
  /**
   * The columns of each entry, under a heading row. A column is `{ id, label, width, render, text,
   * filterId, sortable }`; `time` and `level` are built in. The heading of a column holds its sort
   * control (`sortable`) and its filter (`filterId`, an id from `filters`), so such a filter is not
   * also shown in the toolbar. When the columns do not fit, the list scrolls sideways.
   */
  columns: LogColumn[];
  /**
   * Hides the heading row, for a log that reads as one line per entry. The row stays in the table,
   * visually hidden, so assistive technology still announces each cell under its column, which is why
   * the columns should have labels. Its sort and filter controls are not offered: the filters appear in
   * the toolbar instead, and `LogViewer.Sort` switches the order.
   * @default false
   */
  hideHeading?: boolean;
  /**
   * The parts of the viewer, top to bottom: usually a `LogViewer.Toolbar` and a `LogViewer.Stream`.
   * Leave it out for a viewer with just the stream.
   */
  children?: React.ReactNode;
  /**
   * Which end of the list holds the newest entries. Older entries load at the other end. Set it
   * to control the order; leave it out and the viewer keeps the order itself, starting at
   * `defaultOrder`.
   */
  order?: LogViewerOrder;
  /**
   * The order the viewer starts in when `order` is not set.
   * @default 'newest-first'
   */
  defaultOrder?: LogViewerOrder;
  /**
   * Called when the reader switches the order.
   */
  onOrderChange?: (order: LogViewerOrder) => void;
  /**
   * True while the first page is loading.
   * @default false
   */
  loading?: boolean;
  /**
   * True while older entries are loading. Optional: when `onLoadOlder` returns its request's
   * promise, the viewer shows the load button as busy while the promise is pending. Set this when
   * `onLoadOlder` does not return the promise, or to show the busy state from elsewhere.
   * @default false
   */
  loadingOlder?: boolean;
  /**
   * True when entries older than the loaded ones can still be loaded.
   * @default false
   */
  hasMoreOlder?: boolean;
  /**
   * Called when older entries are wanted: when the reader scrolls toward the older end, or uses
   * the load older button. It is not called while loading or when `hasMoreOlder` is false, and
   * not again until the request finishes. Return the request's promise, so the viewer knows when it
   * finishes and shows the button as busy meanwhile; or set `loadingOlder` while it runs. With neither,
   * the viewer cannot tell when the request ends, so it asks again only after the entries change: a
   * request that fails without a promise or `loadingOlder` leaves the button unable to ask again.
   */
  onLoadOlder?: () => void | Promise<unknown>;
  /**
   * The time zone timestamps are shown in. Set it to control the zone; leave it out and the viewer
   * keeps the zone itself, starting at `defaultTimeZone`. Copied and downloaded lines always carry
   * the zone, as ISO 8601.
   */
  timeZone?: LogTimeZone;
  /**
   * The time zone the viewer starts in when `timeZone` is not set.
   * @default 'utc'
   */
  defaultTimeZone?: LogTimeZone;
  /**
   * Called when the reader switches the time zone.
   */
  onTimeZoneChange?: (timeZone: LogTimeZone) => void;
  /**
   * Filters of the viewer, in order, as buttons in the toolbar or in a column heading, with a chip
   * for each applied value. The viewer only displays them and reports changes; it never filters
   * the entries itself.
   */
  filters?: LogFilterDefinition[];
  /**
   * The applied filters, keyed by filter id. The viewer does not keep this state.
   */
  filterValues?: LogFilterValues;
  /**
   * Called with a filter's id and its new value when the reader picks a value (`null` when the
   * reader clears it). Apply the change to your data here.
   */
  onFilterChange?: (id: string, value: LogFilterValue) => void;
  /**
   * The column the entries are sorted by, when it is not the time. Sorting by the time is the
   * `order` of the viewer. The viewer does not sort: load the entries already sorted, in
   * `onSortChange`. While this is set, entries are shown in the order given.
   */
  sort?: LogSort | null;
  /**
   * Called when the reader sorts by a column other than the time, or clears that sort with
   * `null`. Reorder or reload the entries here.
   */
  onSortChange?: (sort: LogSort | null) => void;
  /**
   * Error shown above the list.
   */
  error?: React.ReactNode;
  /**
   * Called when the reader uses the Try again button, which the error shows when this is set.
   * Start the request that failed again.
   */
  onRetry?: () => void;
  /**
   * Warning shown above the list.
   */
  warning?: React.ReactNode;
  /**
   * Called after an entry's Copy button is used, with whether the text was copied. Use it to show
   * feedback.
   */
  onCopy?: (entry: LogEntry, copied: boolean) => void;
  /**
   * Gives the link to one entry, such as a URL that opens the page on that entry. Each entry shows a
   * Copy link button when this returns a link. The viewer cannot build the URL, because it does not
   * know your routes.
   */
  getEntryLink?: (entry: LogEntry) => string | undefined;
  /**
   * Called after an entry's Copy link button is used, with whether the link was copied. Use it to
   * show feedback.
   */
  onCopyLink?: (entry: LogEntry, copied: boolean) => void;
  /**
   * The entry to mark and scroll into view, such as the one a shared link points at. Load the page
   * of entries that holds it, then set its id here.
   */
  highlightedEntryId?: string;
  /**
   * Text of the markers for entry levels. Give only the levels you change.
   * @default { trace: 'Trace', debug: 'Debug', info: 'Info', warn: 'Warn', error: 'Error', fatal: 'Fatal' }
   */
  levelLabels?: Partial<Record<LogLevel, string>>;
  /**
   * Custom styles for the root element.
   */
  sx?: SxProps<Theme>;
}

const NO_FILTERS: LogFilterDefinition[] = [];
const NO_FILTER_VALUES: LogFilterValues = {};

/**
 * LogViewer component - A time-ordered list of log entries with expandable details, loading of
 * older entries at one end, and a toolbar for filters and the standard controls.
 *
 * It is built from parts, like ListingTable. The root holds the data and the state; you choose the
 * parts: `LogViewer.Toolbar` with the controls you want inside it (`Search`, `TimeZone`, `Sort`,
 * `Download`, `Refresh`, `Count`), and `LogViewer.Stream`. Each part has its own words and sizes.
 * Their layout is fixed, so every product's log viewer looks alike.
 *
 * The component fetches nothing and filters nothing. Your app owns the data and the paging: pass
 * the entries newest first, say whether more older entries exist, and load them in `onLoadOlder`.
 * Filters are described in `filters` and reported through `onFilterChange`.
 *
 * @example
 * ```tsx
 * <LogViewer
 *   entries={entries}
 *   columns={columns}
 *   hasMoreOlder={hasMore}
 *   onLoadOlder={loadOlder} // an async function: its promise shows the busy state
 *   filters={filters}
 *   filterValues={values}
 *   onFilterChange={(id, value) => setValues((previous) => ({ ...previous, [id]: value }))}
 * >
 *   <LogViewer.Toolbar>
 *     <LogViewer.Count />
 *     <LogViewer.Search value={search} onChange={setSearch} />
 *     <LogViewer.TimeZone />
 *     <LogViewer.Download />
 *     <LogViewer.Refresh onRefresh={reload} />
 *   </LogViewer.Toolbar>
 *   <LogViewer.Stream />
 * </LogViewer>
 * ```
 */
const LogViewerRoot: React.FC<LogViewerProps> = ({
  entries,
  columns,
  hideHeading = false,
  children,
  order: orderProp,
  defaultOrder = 'newest-first',
  onOrderChange,
  loading = false,
  loadingOlder = false,
  hasMoreOlder = false,
  onLoadOlder,
  timeZone: timeZoneProp,
  defaultTimeZone = 'utc',
  onTimeZoneChange,
  filters = NO_FILTERS,
  filterValues = NO_FILTER_VALUES,
  onFilterChange,
  sort = null,
  onSortChange,
  error,
  onRetry,
  warning,
  onCopy,
  getEntryLink,
  onCopyLink,
  highlightedEntryId,
  levelLabels: levelLabelsProp,
  sx,
}) => {
  const [ownOrder, setOwnOrder] = React.useState<LogViewerOrder>(defaultOrder);
  const chosenOrder = orderProp ?? ownOrder;
  // Entries sorted by another column are shown as given, newest-first layout: "older" is the next page.
  const order: LogViewerOrder = sort ? 'newest-first' : chosenOrder;

  const [ownTimeZone, setOwnTimeZone] = React.useState<LogTimeZone>(defaultTimeZone);
  const timeZone = timeZoneProp ?? ownTimeZone;

  const setTimeZone = (next: LogTimeZone) => {
    if (timeZoneProp === undefined) setOwnTimeZone(next);
    onTimeZoneChange?.(next);
  };

  const toggleOrder = () => {
    // A column sort fixes what the screen shows at newest-first, so the order to switch to is the opposite of the
    // one shown, not of the one held, and the sort is left first, as the time heading does. The button then does
    // what its label says.
    const next: LogViewerOrder = order === 'newest-first' ? 'oldest-first' : 'newest-first';
    if (sort) onSortChange?.(null);
    if (orderProp === undefined) setOwnOrder(next);
    onOrderChange?.(next);
  };

  // Entries arrive newest first. The list shows them as they are, or reversed for oldest first.
  const displayed = React.useMemo(
    () => (order === 'oldest-first' ? [...entries].reverse() : entries),
    [entries, order]
  );

  const levelLabels = React.useMemo<Record<LogLevel, string>>(
    () => ({ ...DEFAULT_LEVEL_LABELS, ...levelLabelsProp }),
    [levelLabelsProp]
  );

  // The time range picker that is open. A chip in the toolbar can open one drawn in a column heading.
  const [rangePicker, setRangePicker] = React.useState<{ id: string; anchor: HTMLElement | null } | null>(
    null
  );

  const value: LogViewerContextValue = {
    entries: displayed,
    count: entries.length,
    order,
    toggleOrder,
    loading,
    loadingOlder,
    hasMoreOlder,
    onLoadOlder,
    error,
    onRetry,
    warning,
    timeZone,
    setTimeZone,
    columns,
    hideHeading,
    filters,
    filterValues,
    onFilterChange,
    sort,
    onSortChange,
    rangePicker,
    openRangePicker: (id, anchor) => setRangePicker({ id, anchor }),
    closeRangePicker: () => setRangePicker(null),
    onCopy,
    getEntryLink,
    onCopyLink,
    highlightedEntryId,
    levelLabels,
  };

  return (
    <LogViewerContext.Provider value={value}>
      <Paper variant="outlined" sx={[{ overflow: 'hidden' }, ...(Array.isArray(sx) ? sx : [sx])]}>
        {children ?? <LogViewerStream />}
      </Paper>
    </LogViewerContext.Provider>
  );
};

LogViewerRoot.displayName = 'LogViewer';

interface LogViewerComponent extends React.FC<LogViewerProps> {
  Toolbar: typeof LogViewerToolbar;
  Stream: typeof LogViewerStream;
  Search: typeof LogViewerSearch;
  TimeZone: typeof LogViewerTimeZone;
  Sort: typeof LogViewerSort;
  Download: typeof LogViewerDownload;
  Refresh: typeof LogViewerRefresh;
  Count: typeof LogViewerCount;
}

const LogViewer: LogViewerComponent = Object.assign(LogViewerRoot, {
  Toolbar: LogViewerToolbar,
  Stream: LogViewerStream,
  Search: LogViewerSearch,
  TimeZone: LogViewerTimeZone,
  Sort: LogViewerSort,
  Download: LogViewerDownload,
  Refresh: LogViewerRefresh,
  Count: LogViewerCount,
});

export default LogViewer;
