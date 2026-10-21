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

import type { Meta, StoryObj } from '@storybook/react';
import { LogViewer, Typography } from '@wso2/oxygen-ui';
import type {
  LogColumn,
  LogEntry,
  LogFilterDefinition,
  LogFilterValues,
  LogLevel,
  LogSort,
  TimeRange,
} from '@wso2/oxygen-ui';
import React from 'react';

const HOUR_MS = 60 * 60 * 1000;
const PAGE_SIZE = 20;
const STATUS_COLORS = {
  success: 'success.main',
  failure: 'error.main',
  denied: 'warning.main',
} as const;
const USERS = ['maria.silva@acme.example', 'devon.park@acme.example', 'priya.nair@acme.example'];
const ACTIONS = ['Service contact created', 'Role assigned', 'Component created', 'Project deleted'];

interface DemoEvent {
  id: string;
  time: Date;
  user: string;
  action: string;
  status: keyof typeof STATUS_COLORS;
}

/** Fake events, newest first, one roughly every hour. */
const DEMO_EVENTS: DemoEvent[] = Array.from({ length: 120 }, (_, index) => ({
  id: `event-${index}`,
  time: new Date(Date.UTC(2026, 9, 13, 12) - index * HOUR_MS),
  user: USERS[index % USERS.length],
  action: ACTIONS[(index * 3) % ACTIONS.length],
  status: index % 7 === 0 ? 'failure' : index % 11 === 0 ? 'denied' : 'success',
}));

/** The product only says how serious an event is; the viewer draws the marker. */
const levelOf = (event: DemoEvent): LogLevel =>
  event.status === 'failure' ? 'error' : event.status === 'denied' ? 'warn' : 'info';

const toEntry = (event: DemoEvent): LogEntry => ({
  id: event.id,
  timestamp: event.time,
  level: levelOf(event),
  details: {
    timestamp: event.time.toISOString(),
    level: levelOf(event),
    user: event.user,
    action: event.action,
    status: event.status,
    info: { category: 'general', source: { service: 'platform-api', attempt: 1 } },
  },
});

/** Stands in for a server: resolves one page of events, newest first, after a short delay. */
const fetchPage = (offset: number) =>
  new Promise<{ events: DemoEvent[]; hasMore: boolean }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          events: DEMO_EVENTS.slice(offset, offset + PAGE_SIZE),
          hasMore: offset + PAGE_SIZE < DEMO_EVENTS.length,
        }),
      600
    )
  );

const STATUS_OPTIONS = ['success', 'failure', 'denied'].map((value) => ({ value, label: value }));
const USER_OPTIONS = USERS.map((value) => ({ value, label: value }));
const ACTION_OPTIONS = ACTIONS.map((value) => ({ value, label: value }));

/**
 * The columns of the demo entries. The time and the level are built in. The others read their
 * content from the entry's details, and the status column gives its plain text for Copy and Download.
 */
const COLUMNS: LogColumn[] = [
  { id: 'time', sortable: true },
  { id: 'level' },
  { id: 'user', label: 'User', width: '1.2fr', render: (entry) => String(entry.details?.user) },
  { id: 'action', label: 'Action', width: '1.2fr', render: (entry) => String(entry.details?.action) },
  {
    id: 'status',
    label: 'Outcome',
    width: 120,
    text: (entry) => String(entry.details?.status),
    render: (entry) => {
      const status = String(entry.details?.status) as keyof typeof STATUS_COLORS;
      return (
        <Typography component="span" sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: STATUS_COLORS[status] }}>
          {status}
        </Typography>
      );
    },
  },
];

/** The same columns, with sorting and a filter in the heading of each. */
const FILTERABLE_COLUMNS: LogColumn[] = COLUMNS.map((column) =>
  column.id === 'time'
    ? column
    : { ...column, sortable: true, filterId: column.id === 'status' ? 'status' : column.id }
);

const FILTERS: LogFilterDefinition[] = [
  { id: 'time', label: 'Time range', type: 'timeRange', maxRangeMs: 30 * 24 * HOUR_MS },
  { id: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS },
  { id: 'user', label: 'User', type: 'select', options: USER_OPTIONS, searchable: true },
  { id: 'action', label: 'Action', type: 'select', options: ACTION_OPTIONS },
];

/**
 * LogViewer shows time-ordered log entries as rows of columns that expand to their details, loads
 * older entries at one end, and has one layout that every product shares.
 */
const meta: Meta<typeof LogViewer> = {
  title: 'App Elements/Log Viewer',
  component: LogViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The LogViewer component shows a stream of log entries, such as an audit trail or a deployment log.
It fetches nothing and filters nothing: your app owns the data and the paging, and passes entries in.

### Built from parts
Like ListingTable, the viewer is built from parts. The root \`LogViewer\` holds the data and the state.
Inside it you place a \`LogViewer.Toolbar\`, with the controls you want as its children
(\`Search\`, \`TimeZone\`, \`Sort\`, \`Download\`, \`Refresh\`, \`Count\`), and a \`LogViewer.Stream\`. A control
you leave out is not shown. Each part has its own words and sizes (\`LogViewer.Download label="..."\`),
so the root has no \`show*\` flags and no label props.
Every part passes \`className\`, \`sx\`, \`data-*\` and other props to its element, and forwards its
\`ref\` to it.

### One look in every product
The layout is fixed inside the parts, so every log viewer looks the same. The filters and the count
sit on the left of the toolbar and the other controls on the right, in the order given. A product
chooses **which** parts and **which columns** to show, and cannot move them.

### Columns
Each entry is a row of columns under a heading row. \`time\` and \`level\` are built in. Any other
column gives a \`label\`, a \`width\` and a \`render\` function, and usually reads its content from the
entry's \`details\`. When the columns do not fit, the list scrolls sideways and the heading row scrolls
with it. Keep to about five columns and leave the rest to the expanded entry.

The heading of a column can hold its **sort** control (\`sortable\`) and its **filter**
(\`filterId\`, the id of a filter in \`filters\`). Sorting the time switches between newest first and
oldest first. Sorting any other column is reported through \`onSortChange\`, and the viewer shows the
entries as you give them, so sort them yourself. Without \`filterId\`, a filter shows in the toolbar.

The list is a table for assistive technology: a row of column headers, with \`aria-sort\` on the
sorted one, and a row for each entry. The button in the first cell opens and closes the entry.

### Features
- **Share a link**: Set \`getEntryLink\` and each entry gets a Copy link button. Set \`highlightedEntryId\` and the viewer marks that entry and scrolls it into view, so the person who opens the link lands on it. The viewer cannot build the URL, because it does not know your routes
- **Timestamps**: Every viewer shows times in one standard format (\`2026-10-15 08:16:55.622\`), in UTC or the reader's own time zone. \`LogViewer.TimeZone\` adds a UTC and Local switch. Copied and downloaded lines carry the zone as ISO 8601
- **Search**: \`LogViewer.Search\` adds a search box. It reports the text through \`onChange\` once typing pauses (or on Enter), and never searches itself
- **Levels**: Give an entry a \`level\` (trace, debug, info, warn, error or fatal) and the viewer draws one standard marker for it, so severity looks the same in every product. Do not color a column by hand
- **Expandable entries**: Click a row, or its button, to see its fields. Nested objects render as a tree. Copy and Copy link are icons at the top right of the opened entry, so entries need \`details\` (or \`renderDetails\`) to be copied
- **Loading older entries**: Scrolling toward the older end, or the button there, calls \`onLoadOlder\`. Only movement toward that end loads, and the reader keeps their place when entries are added above them
- **Sorting**: Make the time column \`sortable\` and its heading switches between newest first and oldest first. The viewer reverses the list and moves the older end itself. Without a sortable time column, \`LogViewer.Sort\` adds the same switch to the toolbar
- **Download**: \`LogViewer.Download\` saves the loaded entries as a \`.log\` file, one line per entry made from its columns. Use its \`onDownload\` to replace it. The button says what it will save, for example \`Download the 25 loaded entries. Older entries are not included\`, so a reader is never surprised
- **Count and refresh**: \`LogViewer.Count\` and \`LogViewer.Refresh\`
- **Filters**: Describe them in \`filters\`. The viewer shows a button for each, a chip for each applied value, and reports changes through \`onFilterChange\`. Types: \`select\` (optionally searchable) and \`timeRange\`
- **Copy**: Copies the text of the entry's columns, or its \`copyText\`. A column that renders an element gives its plain text in \`text\`. Your app shows the feedback through \`onCopy\`
- **States**: Loading, empty, error and warning. The empty state has one layout in every product (an icon, and the \`emptyTitle\` and \`emptyDescription\` of the stream). Set \`onRetry\` and the error gets a standard Try again button
- **Localizable**: Every visible string is a prop of the part that shows it

### Usage
\`\`\`tsx
import { LogViewer } from '@wso2/oxygen-ui';

<LogViewer
  entries={entries} // newest first
  columns={[
    { id: 'time', sortable: true },
    { id: 'level' },
    { id: 'user', label: 'User', render: (entry) => String(entry.details?.user) },
    { id: 'action', label: 'Action', render: (entry) => String(entry.details?.action) },
  ]}
  hasMoreOlder={hasMore}
  onLoadOlder={loadOlder} // an async function that appends the next page
  filters={[
    { id: 'time', label: 'Time range', type: 'timeRange' },
    { id: 'status', label: 'Status', type: 'select', options: statusOptions },
  ]}
  filterValues={values}
  onFilterChange={(id, value) => setValues((previous) => ({ ...previous, [id]: value }))}
>
  <LogViewer.Toolbar>
    <LogViewer.Count />
    <LogViewer.Search value={search} onChange={setSearch} />
    <LogViewer.TimeZone />
    <LogViewer.Download />
    <LogViewer.Refresh onRefresh={reload} />
  </LogViewer.Toolbar>
  <LogViewer.Stream />
</LogViewer>
\`\`\`

Pass \`entries\` newest first, and return the request's promise from \`onLoadOlder\` (an \`async\`
function does): the viewer shows its load button as busy until the promise settles. Set
\`loadingOlder\` only when you cannot return the promise. The viewer never filters:
load or filter your data in \`onFilterChange\` and pass the result back in \`entries\`.
        `,
      },
    },
  },
  argTypes: {
    entries: { control: false, description: 'Entries, newest first' },
    columns: { control: false, description: 'The columns of each entry, under a heading row' },
    sort: { control: false, description: 'The column other than the time that the entries are sorted by' },
    onSortChange: { control: false, description: 'Called when the reader sorts by a column other than the time' },
    order: {
      control: 'select',
      options: ['newest-first', 'oldest-first'],
      description: 'Controls the order. Leave it out and the viewer keeps the order itself',
      table: { type: { summary: 'newest-first | oldest-first' } },
    },
    defaultOrder: {
      control: 'select',
      options: ['newest-first', 'oldest-first'],
      description: 'The order the viewer starts in when `order` is not set',
      table: { type: { summary: 'newest-first | oldest-first' }, defaultValue: { summary: 'newest-first' } },
    },
    onOrderChange: { control: false, description: 'Called when the reader switches the order' },
    loading: { control: 'boolean', description: 'True while the first page is loading' },
    loadingOlder: { control: 'boolean', description: 'True while older entries are loading. Optional when onLoadOlder returns its promise' },
    hasMoreOlder: { control: 'boolean', description: 'True when older entries can still be loaded' },
    onLoadOlder: { control: false, description: 'Called when older entries are wanted' },
    filters: { control: false, description: 'Filters shown in the toolbar or in a column heading' },
    children: { control: false, description: 'The parts: a LogViewer.Toolbar with its controls, and a LogViewer.Stream' },
    filterValues: { control: false, description: 'The applied filters, keyed by filter id' },
    getEntryLink: { control: false, description: 'Gives the link to one entry. Each entry shows a Copy link button when set' },
    onCopyLink: { control: false, description: 'Called after a Copy link button is used' },
    highlightedEntryId: { control: 'text', description: 'The entry to mark and scroll into view' },
    onFilterChange: { control: false, description: 'Called with a filter id and its new value' },
    error: { control: 'text', description: 'Error shown above the list' },
    onRetry: { control: false, description: 'Called by the Try again button, which the error shows when this is set' },
    warning: { control: 'text', description: 'Warning shown above the list' },
    timeZone: {
      control: 'select',
      options: ['utc', 'local'],
      description: 'Controls the time zone. Leave it out and the viewer keeps the zone itself',
      table: { type: { summary: 'utc | local' } },
    },
    defaultTimeZone: {
      control: 'select',
      options: ['utc', 'local'],
      description: 'The zone the viewer starts in when `timeZone` is not set',
      table: { type: { summary: 'utc | local' }, defaultValue: { summary: 'utc' } },
    },
    onTimeZoneChange: { control: false, description: 'Called when the reader switches the time zone' },
    onCopy: { control: false, description: 'Called after a Copy button is used' },
    levelLabels: { control: false, description: 'Text of the level markers. Give only the levels you change' },
  },
};

export default meta;
type Story = StoryObj<typeof LogViewer>;

/** The stream alone: no toolbar, only the heading row. */
const Stream = (props: React.ComponentProps<typeof LogViewer.Stream>) => <LogViewer.Stream maxHeight={360} {...props} />;

/** A viewer that pages through the demo events, and the state that goes with it. */
const usePagedEvents = () => {
  const [events, setEvents] = React.useState<DemoEvent[]>(() => DEMO_EVENTS.slice(0, PAGE_SIZE));
  const [hasMore, setHasMore] = React.useState(true);
  const loadOlder = async () => {
    const page = await fetchPage(events.length);
    setEvents((previous) => [...previous, ...page.events]);
    setHasMore(page.hasMore);
  };
  const reset = () => {
    setEvents(DEMO_EVENTS.slice(0, PAGE_SIZE));
    setHasMore(true);
  };
  return { events, hasMore, loadOlder, reset };
};

/**
 * Click a row to see its details. With no children the viewer draws just the stream, so this is
 * the smallest viewer: entries and columns.
 */
export const Default: Story = {
  render: () => <LogViewer columns={COLUMNS} entries={DEMO_EVENTS.slice(0, 8).map(toEntry)} />,
};

/**
 * Set `hideHeading` for a log that reads as one line per entry, with no column titles. The heading row
 * stays in the table, visually hidden, so assistive technology still announces each cell under its
 * column: give the columns labels. Its sort and filter controls are not offered, so the filters appear in
 * the toolbar, and `LogViewer.Sort` switches the order.
 */
export const HiddenHeading: Story = {
  render: () => (
    <LogViewer
      columns={[
        { id: 'time', label: 'Time' },
        { id: 'level', label: 'Level' },
        {
          id: 'entry',
          label: 'Entry',
          width: '1fr',
          render: (entry: LogEntry) => `${entry.details?.user} ${entry.details?.action} (${entry.details?.status})`,
        },
      ]}
      entries={DEMO_EVENTS.slice(0, 12).map(toEntry)}
      filters={FILTERS.slice(1)}
      filterValues={{}}
      hideHeading
    >
      <LogViewer.Toolbar>
        <LogViewer.Count />
        <LogViewer.Sort />
      </LogViewer.Toolbar>
      <Stream />
    </LogViewer>
  ),
};

/**
 * Older entries load as the reader scrolls down, or from the button, a page at a time. The words at
 * the two ends are props of the stream.
 */
export const LoadingOlderEntries: Story = {
  render: () => {
    const { events, hasMore, loadOlder } = usePagedEvents();
    return (
      <LogViewer columns={COLUMNS} entries={events.map(toEntry)} hasMoreOlder={hasMore} onLoadOlder={loadOlder}>
        <Stream
          maxHeight={400}
          noMoreOlderLabel="Start of the selected time range"
          newestLabel="End of the selected time range"
        />
      </LogViewer>
    );
  },
};

/**
 * Start with the oldest entries first. The older end is then at the top, and the reader keeps
 * their place as older entries are added above. Entries are still passed newest first.
 */
export const OldestFirst: Story = {
  render: () => {
    const { events, hasMore, loadOlder } = usePagedEvents();
    return (
      <LogViewer
        columns={COLUMNS}
        entries={events.map(toEntry)}
        defaultOrder="oldest-first"
        hasMoreOlder={hasMore}
        onLoadOlder={loadOlder}
      >
        <Stream maxHeight={400} />
      </LogViewer>
    );
  },
};

/**
 * The standard controls are parts you include: the count on the left of the toolbar, and download
 * and refresh on the right. Download saves the loaded entries as `logs.log`. The time heading
 * sorts, and reverses the list.
 */
export const StandardControls: Story = {
  render: () => {
    const { events, hasMore, loadOlder, reset } = usePagedEvents();
    return (
      <LogViewer columns={COLUMNS} entries={events.map(toEntry)} hasMoreOlder={hasMore} onLoadOlder={loadOlder}>
        <LogViewer.Toolbar>
          <LogViewer.Count label={(count) => `${count} events loaded · UTC`} />
          <LogViewer.Download />
          <LogViewer.Refresh onRefresh={reset} />
        </LogViewer.Toolbar>
        <Stream maxHeight={400} />
      </LogViewer>
    );
  },
};

/**
 * Filters are described as data, and a column takes one into its heading with `filterId`: the
 * funnel in the heading opens it. The time range has no column, so it stays in the toolbar. A chip
 * shows each applied value, and reports changes; this example applies them to its own list.
 * Sorting by the time switches the order. Sorting any other column is reported through
 * `onSortChange`, and this example sorts its own list. The User filter is searchable.
 */
export const WithFilters: Story = {
  render: () => {
    const [values, setValues] = React.useState<LogFilterValues>(() => ({
      time: {
        start: new Date(Date.UTC(2026, 9, 6, 12)),
        end: new Date(Date.UTC(2026, 9, 13, 12)),
      } satisfies TimeRange,
    }));
    const [sort, setSort] = React.useState<LogSort | null>(null);

    const entries = React.useMemo(() => {
      const range = values.time as TimeRange | null | undefined;
      const matching = DEMO_EVENTS.filter(
        (event) =>
          (!range || (event.time >= range.start && event.time < range.end)) &&
          (!values.status || event.status === values.status) &&
          (!values.user || event.user === values.user) &&
          (!values.action || event.action === values.action)
      );
      if (sort) {
        const key = sort.columnId as 'user' | 'action' | 'status';
        matching.sort((a, b) => a[key].localeCompare(b[key]) * (sort.direction === 'asc' ? 1 : -1));
      }
      return matching.map(toEntry);
    }, [values, sort]);

    return (
      <LogViewer
        columns={FILTERABLE_COLUMNS}
        entries={entries}
        filters={FILTERS}
        filterValues={values}
        onFilterChange={(id, value) => setValues((previous) => ({ ...previous, [id]: value }))}
        sort={sort}
        onSortChange={setSort}
      >
        <LogViewer.Toolbar>
          <LogViewer.Count />
          <LogViewer.Download />
        </LogViewer.Toolbar>
        <Stream emptyTitle="No logs match" emptyDescription="Try a wider range or remove a filter." />
      </LogViewer>
    );
  },
};

/**
 * Every level has one standard marker, with the level as text so severity never relies on color
 * alone. No marker is filled: fatal stands out from error by its heavier border. An entry with no level has no marker.
 */
export const Levels: Story = {
  render: () => (
    <LogViewer
      columns={[
        { id: 'time' },
        { id: 'level' },
        { id: 'message', label: 'Message', render: (entry: LogEntry) => String(entry.details?.message) },
      ]}
      entries={([
        ['fatal', 'Out of memory, process killed'],
        ['error', 'Build failed: exit code 2'],
        ['warn', 'Retrying connection to registry'],
        ['info', 'Deployment started'],
        ['debug', 'Resolved 14 dependencies'],
        ['trace', 'Entering reconcile loop'],
      ] as Array<[LogLevel, string]>).map(
        ([level, message], index): LogEntry => ({
          id: `level-${level}`,
          timestamp: new Date(Date.UTC(2026, 9, 13, 12, 0, 6 - index)),
          level,
          details: { message },
        })
      )}
    >
      <Stream />
    </LogViewer>
  ),
};

/**
 * `LogViewer.Search` is a control of the toolbar. It reports the text once typing pauses, or on
 * Enter, and clears it with the x. It never searches: this example filters its own list.
 */
export const WithSearch: Story = {
  render: () => {
    const [search, setSearch] = React.useState('');
    const entries = React.useMemo(
      () =>
        DEMO_EVENTS.filter((event) =>
          `${event.user} ${event.action} ${event.status}`.toLowerCase().includes(search.toLowerCase())
        )
          .slice(0, 40)
          .map(toEntry),
      [search]
    );
    return (
      <LogViewer columns={COLUMNS} entries={entries}>
        <LogViewer.Toolbar>
          <LogViewer.Count />
          <LogViewer.Search value={search} onChange={setSearch} />
        </LogViewer.Toolbar>
        <Stream />
      </LogViewer>
    );
  },
};

/**
 * One standard time format, in UTC or the reader's own time zone. `LogViewer.TimeZone` adds the
 * switch. Copy a line, or download, and the zone travels with it as ISO 8601.
 */
export const TimeZones: Story = {
  render: () => (
    <LogViewer columns={COLUMNS} entries={DEMO_EVENTS.slice(0, 8).map(toEntry)}>
      <LogViewer.Toolbar>
        <LogViewer.Count />
        <LogViewer.TimeZone />
        <LogViewer.Sort />
        <LogViewer.Download />
      </LogViewer.Toolbar>
      <Stream />
    </LogViewer>
  ),
};

/**
 * Set `getEntryLink` and each entry gets a Copy link button (open an entry). Set
 * `highlightedEntryId` and the viewer marks that entry and scrolls it into view, as when someone
 * opens a shared link. Here the link is fake and the highlighted entry is the fifteenth.
 */
export const SharedLink: Story = {
  render: () => (
    <LogViewer
      columns={COLUMNS}
      entries={DEMO_EVENTS.slice(0, 30).map(toEntry)}
      getEntryLink={(entry: LogEntry) => `https://example.test/audit-logs?entry=${entry.id}`}
      highlightedEntryId="event-14"
    >
      <Stream maxHeight={320} />
    </LogViewer>
  ),
};

/**
 * Shown in place of the list while the first page loads. The filters wait too.
 */
export const Loading: Story = {
  render: () => (
    <LogViewer columns={COLUMNS} entries={[]} loading filters={FILTERS}>
      <LogViewer.Toolbar>
        <LogViewer.Count />
        <LogViewer.Refresh />
      </LogViewer.Toolbar>
      <Stream />
    </LogViewer>
  ),
};

/**
 * Shown when there are no entries, nothing is loading and there is no error. The layout is the
 * same in every product: an icon, a title and an optional description. You supply only the words.
 * With no words set, the title is "No logs found".
 */
export const Empty: Story = {
  render: () => (
    <LogViewer columns={COLUMNS} entries={[]}>
      <Stream emptyTitle="No logs in this range" emptyDescription="Try a wider range or remove a filter." />
    </LogViewer>
  ),
};

/**
 * Set `onRetry` and the error shows a standard Try again button, in the same place in every
 * product. Without it, the error is text only.
 */
export const ErrorWithRetry: Story = {
  render: () => {
    const [error, setError] = React.useState<string>('Could not retrieve logs. The source may be unavailable.');
    return (
      <LogViewer columns={COLUMNS} entries={[]} error={error} onRetry={() => setError('')}>
        <Stream emptyTitle="Retried" emptyDescription="The error is gone. Reload the story to see it again." />
      </LogViewer>
    );
  },
};

/**
 * An error and a warning appear above the list.
 */
export const ErrorAndWarning: Story = {
  render: () => (
    <LogViewer
      columns={COLUMNS}
      entries={DEMO_EVENTS.slice(0, 4).map(toEntry)}
      error="Could not load all logs. The source may be unavailable."
      warning="A page reached its processing limit. Some matching events may need another load."
    >
      <Stream />
    </LogViewer>
  ),
};

/**
 * Replace the expanded view for entries whose details need their own layout.
 */
export const CustomDetails: Story = {
  render: () => (
    <LogViewer columns={COLUMNS} entries={DEMO_EVENTS.slice(0, 6).map(toEntry)}>
      <Stream
        renderDetails={(entry: LogEntry) => (
          <Typography variant="body2" sx={{ fontFamily: 'inherit' }}>
            Entry <strong>{entry.id}</strong> happened at {String(entry.timestamp)}.
          </Typography>
        )}
      />
    </LogViewer>
  ),
};

/**
 * Every visible string is a prop of the part that shows it, including the toolbar's.
 */
export const Localized: Story = {
  render: () => (
    <LogViewer
      columns={COLUMNS}
      entries={DEMO_EVENTS.slice(0, 5).map(toEntry)}
      hasMoreOlder
      onLoadOlder={() => undefined}
      filters={[
        {
          id: 'status',
          label: 'Status',
          type: 'select',
          options: [{ value: 'failure', label: 'Fehler' }],
          allLabel: 'Alle Status',
        },
      ]}
    >
      <LogViewer.Toolbar label="Protokollwerkzeuge">
        <LogViewer.Count label={(count) => `${count} Einträge geladen`} />
        <LogViewer.Sort newestFirstLabel="Neueste zuerst. Zu älteste zuerst wechseln" />
        <LogViewer.Download label="Geladene Protokolle herunterladen" />
        <LogViewer.Refresh label="Aktualisieren" />
      </LogViewer.Toolbar>
      <Stream loadOlderLabel="Ältere Protokolle laden" copyLabel="Kopieren" label="Protokollliste" />
    </LogViewer>
  ),
};
