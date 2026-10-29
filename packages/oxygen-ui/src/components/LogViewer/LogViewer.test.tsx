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
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, cleanup, screen, fireEvent, waitFor, within, act } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import BaseLogViewer from './index';
import type {
  LogColumn,
  LogEntry,
  LogFilterDefinition,
  LogLevel,
  LogViewerDownloadProps,
  LogViewerProps,
  LogViewerStreamProps,
} from './index';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

/**
 * Most tests only need an entry with a line of text, so entries carry a `message` that the default
 * columns below show. It is not part of `LogEntry`, which is why it is added through a cast.
 */
const entry = (id: string, extra: Partial<LogEntry> & { message?: React.ReactNode } = {}): LogEntry =>
  ({
    id,
    timestamp: `2026-10-13T10:00:0${id}.000Z`,
    message: `message ${id}`,
    ...extra,
  }) as LogEntry;

const messageOf = (item: LogEntry) => (item as LogEntry & { message?: React.ReactNode }).message;

/** The columns most tests use: the time, the level and the message. */
const defaultColumns: LogColumn[] = [
  { id: 'time' },
  { id: 'level' },
  { id: 'message', label: 'Message', render: messageOf },
];

/**
 * The options most tests use, written as one flat list. The viewer is built from parts, so this
 * helper turns the list into the parts: it is how these tests say "a viewer with a search box and a
 * download button" in one line. The parts used directly are tested in "composition" below.
 */
type FlatProps = Omit<LogViewerProps, 'columns' | 'children'> & {
  columns?: LogColumn[];
  showCount?: boolean;
  countLabel?: (count: number) => string;
  showTimeZone?: boolean;
  showSort?: boolean;
  showDownload?: boolean;
  onDownload?: (entries: LogEntry[]) => void;
  downloadFileName?: string;
  showRefresh?: boolean;
  onRefresh?: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchDebounceMs?: number;
  searchPlaceholder?: string;
  clearSearchLabel?: string;
  showFilterChips?: boolean;
  toolbarLabel?: string;
  appliedFiltersLabel?: string;
  clearAllLabel?: string;
  timeZoneLabel?: string;
  utcLabel?: string;
  localLabel?: string;
  sortNewestFirstLabel?: string;
  sortOldestFirstLabel?: string;
  downloadLabel?: LogViewerDownloadProps['label'];
  refreshLabel?: string;
} & Pick<
    LogViewerStreamProps,
    | 'renderDetails'
    | 'maxHeight'
    | 'scrollTriggerPx'
    | 'emptyTitle'
    | 'emptyDescription'
    | 'retryLabel'
    | 'loadOlderLabel'
    | 'noMoreOlderLabel'
    | 'newestLabel'
    | 'copyLabel'
    | 'copyLinkLabel'
    | 'copiedLabel'
    | 'detailsToggleLabel'
    | 'sortColumnLabel'
    | 'filterColumnLabel'
    | 'loadingLabel'
  > & { streamLabel?: string };

/** The viewer with the default columns, unless a test gives its own. */
const LogViewer = ({
  columns = defaultColumns,
  showCount,
  countLabel,
  showTimeZone,
  showSort,
  showDownload,
  onDownload,
  downloadFileName,
  showRefresh,
  onRefresh,
  showSearch,
  searchValue,
  onSearchChange,
  searchDebounceMs,
  searchPlaceholder,
  clearSearchLabel,
  showFilterChips,
  toolbarLabel,
  appliedFiltersLabel,
  clearAllLabel,
  timeZoneLabel,
  utcLabel,
  localLabel,
  sortNewestFirstLabel,
  sortOldestFirstLabel,
  downloadLabel,
  refreshLabel,
  renderDetails,
  maxHeight,
  scrollTriggerPx,
  emptyTitle,
  emptyDescription,
  retryLabel,
  loadOlderLabel,
  noMoreOlderLabel,
  newestLabel,
  copyLabel,
  copyLinkLabel,
  copiedLabel,
  detailsToggleLabel,
  sortColumnLabel,
  filterColumnLabel,
  loadingLabel,
  streamLabel,
  ...root
}: FlatProps) => (
  <BaseLogViewer columns={columns} {...root}>
    <BaseLogViewer.Toolbar
      label={toolbarLabel}
      appliedFiltersLabel={appliedFiltersLabel}
      clearAllLabel={clearAllLabel}
      showFilterChips={showFilterChips}
    >
      {showSearch && (
        <BaseLogViewer.Search
          value={searchValue}
          onChange={onSearchChange}
          debounceMs={searchDebounceMs}
          placeholder={searchPlaceholder}
          clearLabel={clearSearchLabel}
        />
      )}
      {showTimeZone && <BaseLogViewer.TimeZone label={timeZoneLabel} utcLabel={utcLabel} localLabel={localLabel} />}
      {showSort && (
        <BaseLogViewer.Sort newestFirstLabel={sortNewestFirstLabel} oldestFirstLabel={sortOldestFirstLabel} />
      )}
      {showDownload && (
        <BaseLogViewer.Download label={downloadLabel} onDownload={onDownload} fileName={downloadFileName} />
      )}
      {showRefresh && <BaseLogViewer.Refresh onRefresh={onRefresh} label={refreshLabel} />}
      {showCount && <BaseLogViewer.Count label={countLabel} />}
    </BaseLogViewer.Toolbar>
    <BaseLogViewer.Stream
      renderDetails={renderDetails}
      maxHeight={maxHeight}
      scrollTriggerPx={scrollTriggerPx}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      retryLabel={retryLabel}
      loadOlderLabel={loadOlderLabel}
      noMoreOlderLabel={noMoreOlderLabel}
      newestLabel={newestLabel}
      copyLabel={copyLabel}
      copyLinkLabel={copyLinkLabel}
      copiedLabel={copiedLabel}
      detailsToggleLabel={detailsToggleLabel}
      sortColumnLabel={sortColumnLabel}
      filterColumnLabel={filterColumnLabel}
      loadingLabel={loadingLabel}
      label={streamLabel}
    />
  </BaseLogViewer>
);

const entries = (...ids: string[]) => ids.map((id) => entry(id));

/** The hidden input that holds the value of a picker field, found by its label inside one end of the range. */
const pickerInput = (end: string, field: string): HTMLInputElement => {
  const group = within(screen.getByRole('group', { name: end })).getByRole('group', { name: field });
  return group.closest('.MuiPickersTextField-root')!.querySelector('input') as HTMLInputElement;
};

const stream = () => screen.getByRole('region', { name: 'Log stream' });

const rowOf = (id: string) => stream().querySelector(`[data-entry-id="${id}"]`) as HTMLElement;

/** The button that opens or closes an entry. */
const toggleFor = (id: string) => within(rowOf(id)).getByRole('button', { name: /show details|hide details/i });

/** Opens every entry that can be opened. */
const openAll = () =>
  screen.getAllByRole('button', { name: 'Show details' }).forEach((button) => fireEvent.click(button));

const withText = (id: string, extra: Partial<LogEntry> = {}) => entry(id, { details: { note: id }, ...extra });

/** jsdom does no layout, so give an element scroll geometry that tests control. */
const mockScroll = (element: HTMLElement, initial: { top: number; height: number; client: number }) => {
  const state = { ...initial };
  Object.defineProperty(element, 'scrollTop', {
    configurable: true,
    get: () => state.top,
    set: (value: number) => {
      state.top = value;
    },
  });
  Object.defineProperty(element, 'scrollHeight', { configurable: true, get: () => state.height });
  Object.defineProperty(element, 'clientHeight', { configurable: true, get: () => state.client });
  return state;
};

const scrollTo = (element: HTMLElement, state: { top: number }, top: number) => {
  state.top = top;
  fireEvent.scroll(element);
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('LogViewer', () => {
  it('renders the entries in the order given, with timestamp and message', () => {
    renderWithTheme(<LogViewer entries={entries('3', '2', '1')} />);
    const text = stream().textContent ?? '';
    expect(text.indexOf('message 3')).toBeLessThan(text.indexOf('message 2'));
    expect(text.indexOf('message 2')).toBeLessThan(text.indexOf('message 1'));
    expect(text).toContain('2026-10-13 10:00:03.000');
  });

  it('shows a spinner instead of the rows while loading, and keeps the heading row in place', () => {
    renderWithTheme(<LogViewer entries={entries('1')} loading />);
    expect(screen.getByLabelText('Loading logs')).not.toBeNull();
    expect(stream().querySelector('[data-entry-id]')).toBeNull();
    // The list stays, so the heading row does not move and the columns keep their size.
    expect(stream().querySelector('thead')).not.toBeNull();
  });

  it('shows the empty state, and the error and warning above the list', () => {
    const { unmount } = renderWithTheme(<LogViewer entries={[]} emptyTitle="Select a time range" />);
    expect(screen.getByText('Select a time range')).not.toBeNull();
    unmount();

    renderWithTheme(
      <LogViewer entries={entries('1')} error="Could not load" warning="Some logs are missing" />
    );
    expect(screen.getByText('Could not load')).not.toBeNull();
    expect(screen.getByText('Some logs are missing')).not.toBeNull();
    expect(stream()).not.toBeNull();
  });

  it('does not show the empty state next to an error', () => {
    renderWithTheme(<LogViewer entries={[]} error="Could not load" emptyTitle="Nothing here" />);
    expect(screen.queryByText('Nothing here')).toBeNull();
  });

  describe('expanding', () => {
    const withDetails = [
      entry('1', { details: { user: 'maria', info: { category: 'general', tags: ['a', 'b'] } } }),
      entry('2'),
    ];

    it('shows a Date in the details as an ISO 8601 time, at the top level and nested', () => {
      renderWithTheme(
        <LogViewer
          entries={[
            entry('1', {
              details: {
                started: new Date('2026-10-13T10:00:00.000Z'),
                info: { ended: new Date('2026-10-13T11:30:00.000Z'), broken: new Date('nope') },
              },
            }),
          ]}
        />
      );
      fireEvent.click(toggleFor('1'));
      expect(screen.getByText('2026-10-13T10:00:00.000Z')).not.toBeNull();
      expect(screen.getByText('2026-10-13T11:30:00.000Z')).not.toBeNull();
      expect(screen.getByText('Invalid Date')).not.toBeNull();
    });

    it('expands an entry to show its details, and collapses it again', async () => {
      renderWithTheme(<LogViewer entries={withDetails} />);
      const toggle = toggleFor('1');
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByText('user')).toBeNull();

      fireEvent.click(toggle);
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      expect(screen.getByText('user')).not.toBeNull();
      expect(screen.getByText('maria')).not.toBeNull();
      expect(toggle.getAttribute('aria-controls')).toBe(
        screen.getByRole('region', { name: 'Details for 1' }).id
      );

      fireEvent.click(toggle);
      await waitFor(() => expect(screen.queryByText('maria')).toBeNull());
    });

    describe('a click that selects text', () => {
      const isOpen = (id: string) => toggleFor(id).getAttribute('aria-expanded') === 'true';
      const textOf = (id: string) => within(rowOf(id)).getByText(`message ${id}`);
      const select = (element: HTMLElement) => window.getSelection()?.selectAllChildren(element);
      afterEach(() => window.getSelection()?.removeAllRanges());

      it('opens the entry when the text of its row is clicked', () => {
        renderWithTheme(<LogViewer entries={withDetails} />);
        fireEvent.click(textOf('1'));
        expect(isOpen('1')).toBe(true);
      });

      it('does not open the entry when the click ends a selection of its text', () => {
        renderWithTheme(<LogViewer entries={withDetails} />);
        select(textOf('1'));
        fireEvent.click(textOf('1'));
        expect(isOpen('1')).toBe(false);
      });

      it('does not toggle again on the later clicks of a double click', () => {
        renderWithTheme(<LogViewer entries={withDetails} />);
        fireEvent.click(textOf('1'), { detail: 1 });
        fireEvent.click(textOf('1'), { detail: 2 });
        expect(isOpen('1')).toBe(true);
      });

      it('still opens the entry when the text selected is in another entry', () => {
        renderWithTheme(<LogViewer entries={withDetails} />);
        select(textOf('2'));
        fireEvent.click(textOf('1'));
        expect(isOpen('1')).toBe(true);
      });
    });

    it('keeps the id of the details free of white space, whatever the entry id holds', () => {
      // aria-controls is a list of ids separated by white space, so an id with a space in it points at nothing.
      // Two different entry ids must still give two different ids.
      renderWithTheme(
        <LogViewer
          entries={[
            entry('a b', { timestamp: '2026-10-13T10:00:02.000Z', details: { user: 'maria' } }),
            entry('a%20b', { timestamp: '2026-10-13T10:00:01.000Z', details: { user: 'devon' } }),
          ]}
        />
      );
      const first = toggleFor('a b');
      const second = toggleFor('a%20b');
      fireEvent.click(first);
      fireEvent.click(second);
      const firstRegion = screen.getByRole('region', { name: 'Details for a b' });
      const secondRegion = screen.getByRole('region', { name: 'Details for a%20b' });

      expect(firstRegion.id).not.toMatch(/\s/);
      expect(first.getAttribute('aria-controls')).toBe(firstRegion.id);
      expect(second.getAttribute('aria-controls')).toBe(secondRegion.id);
      expect(firstRegion.id).not.toBe(secondRegion.id);
    });

    it('renders nested details as a tree that can be collapsed', () => {
      renderWithTheme(<LogViewer entries={withDetails} />);
      fireEvent.click(toggleFor('1'));
      expect(screen.getByText('"category"')).not.toBeNull();
      expect(screen.getByText('"general"')).not.toBeNull();

      const collapseButtons = screen.getAllByRole('button', { name: 'Collapse' });
      fireEvent.click(collapseButtons[0]);
      expect(screen.queryByText('"category"')).toBeNull();
    });

    it('does not make an entry without details expandable', () => {
      renderWithTheme(<LogViewer entries={withDetails} />);
      expect(within(rowOf('2')).queryByRole('button', { name: /details/i })).toBeNull();
      expect(stream().textContent).toContain('message 2');
    });

    it('uses renderDetails in place of the default view, and makes every entry expandable', () => {
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          renderDetails={(item) => <p>custom for {item.id}</p>}
        />
      );
      fireEvent.click(toggleFor('1'));
      expect(screen.getByText('custom for 1')).not.toBeNull();
    });
  });

  describe('copying', () => {
    const mockClipboard = (writeText: (text: string) => Promise<void>) => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    };

    it('copies the timestamp and message of a string message', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      mockClipboard(writeText);
      const onCopy = vi.fn();
      renderWithTheme(<LogViewer entries={[withText('1')]} onCopy={onCopy} />);

      fireEvent.click(toggleFor('1'));
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
      expect(writeText).toHaveBeenCalledWith('2026-10-13T10:00:01.000Z message 1');
      expect(onCopy).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), true);
    });

    it('builds the text to copy only for an entry that is open', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      mockClipboard(writeText);
      const text = vi.fn((item: LogEntry) => `line ${item.id}`);
      const columns: LogColumn[] = [{ id: 'time' }, { id: 'message', label: 'Message', render: messageOf, text }];
      renderWithTheme(<LogViewer entries={[withText('3'), withText('2'), withText('1')]} columns={columns} />);
      // Only an open entry shows Copy, so no closed entry needs its text built.
      expect(text).not.toHaveBeenCalled();

      fireEvent.click(toggleFor('2'));
      expect(text).toHaveBeenCalled();
      expect(text.mock.calls.every(([item]) => item.id === '2')).toBe(true);

      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => expect(writeText).toHaveBeenCalledWith('2026-10-13T10:00:02.000Z line 2'));
    });

    it('copies copyText when given, and reports a failed copy', async () => {
      const writeText = vi.fn().mockRejectedValue(new Error('denied'));
      mockClipboard(writeText);
      const onCopy = vi.fn();
      renderWithTheme(
        <LogViewer
          entries={[withText('1', { message: <b>rich</b>, copyText: 'plain text' })]}
          onCopy={onCopy}
          copyLabel="Copy line"
        />
      );

      fireEvent.click(toggleFor('1'));
      fireEvent.click(screen.getByRole('button', { name: 'Copy line' }));
      await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
      expect(writeText).toHaveBeenCalledWith('plain text');
      expect(onCopy).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), false);
    });

    it('shows the copied label on a button after its copy succeeded, then goes back', async () => {
      mockClipboard(vi.fn().mockResolvedValue(undefined));
      renderWithTheme(
        <LogViewer entries={[withText('1')]} getEntryLink={(item) => `https://logs.test/${item.id}`} />
      );

      fireEvent.click(toggleFor('1'));
      vi.useFakeTimers({ shouldAdvanceTime: true });
      try {
        fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
        expect(await screen.findByRole('button', { name: 'Copied' })).toBeTruthy();
        // Only the button that was used changes.
        expect(screen.getByRole('button', { name: 'Copy link' })).toBeTruthy();

        act(() => {
          vi.advanceTimersByTime(2000);
        });
        expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
        expect(screen.queryByRole('button', { name: 'Copied' })).toBeNull();
      } finally {
        vi.useRealTimers();
      }
    });

    it('does not show the copied label when the copy failed, and takes it from copiedLabel', async () => {
      const writeText = vi.fn().mockRejectedValueOnce(new Error('denied')).mockResolvedValue(undefined);
      mockClipboard(writeText);
      const onCopy = vi.fn();
      renderWithTheme(<LogViewer entries={[withText('1')]} onCopy={onCopy} copiedLabel="Copiado" />);

      fireEvent.click(toggleFor('1'));
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
      expect(screen.queryByRole('button', { name: 'Copiado' })).toBeNull();

      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(await screen.findByRole('button', { name: 'Copiado' })).toBeTruthy();
    });

    it('hides Copy when there is nothing to copy', () => {
      // No time column, and a message that is an element without a `text`: nothing is left to copy.
      renderWithTheme(
        <LogViewer
          entries={[withText('1', { message: <b>rich</b> })]}
          columns={[{ id: 'message', render: messageOf }]}
        />
      );
      fireEvent.click(toggleFor('1'));
      expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull();
    });

    it('copies the text of a column that renders an element, through its text', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      mockClipboard(writeText);
      renderWithTheme(
        <LogViewer
          entries={[withText('1', { message: <b>rich</b> })]}
          columns={[{ id: 'message', render: messageOf, text: () => 'rich text' }]}
        />
      );
      fireEvent.click(toggleFor('1'));
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => expect(writeText).toHaveBeenCalledWith('rich text'));
    });

    it('keeps the entry open when Copy is used', () => {
      mockClipboard(vi.fn().mockResolvedValue(undefined));
      renderWithTheme(<LogViewer entries={[entry('1', { details: { a: 'b' } })]} />);
      fireEvent.click(toggleFor('1'));
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(toggleFor('1').getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('loading older entries', () => {
    const base: Partial<LogViewerProps> = { hasMoreOlder: true };

    it('puts the button below the entries when newest-first, and above when oldest-first', () => {
      const { unmount } = renderWithTheme(
        <LogViewer entries={entries('2', '1')} order="newest-first" {...base} />
      );
      let text = stream().textContent ?? '';
      expect(text.indexOf('Load older logs')).toBeGreaterThan(text.indexOf('message 1'));
      unmount();

      renderWithTheme(<LogViewer entries={entries('2', '1')} order="oldest-first" {...base} />);
      text = stream().textContent ?? '';
      expect(text.indexOf('Load older logs')).toBeLessThan(text.indexOf('message 1'));
    });

    it('asks for older entries when the button is used', () => {
      const onLoadOlder = vi.fn();
      renderWithTheme(<LogViewer entries={entries('1')} onLoadOlder={onLoadOlder} {...base} />);
      fireEvent.click(screen.getByRole('button', { name: 'Load older logs' }));
      expect(onLoadOlder).toHaveBeenCalledTimes(1);
    });

    it('stays busy, not disabled, and does not ask again while loading', () => {
      const onLoadOlder = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('1')} onLoadOlder={onLoadOlder} loadingOlder {...base} />
      );
      const button = screen.getByRole('button', { name: 'Load older logs' });
      expect(button.getAttribute('aria-busy')).toBe('true');
      expect((button as HTMLButtonElement).disabled).toBe(false);
      fireEvent.click(button);
      expect(onLoadOlder).not.toHaveBeenCalled();
    });

    it('shows the button busy while the promise onLoadOlder returned is pending, without loadingOlder', async () => {
      let finish: () => void = () => undefined;
      const onLoadOlder = vi.fn(() => new Promise<void>((resolve) => (finish = resolve)));
      renderWithTheme(<LogViewer entries={entries('1')} onLoadOlder={onLoadOlder} {...base} />);
      const button = screen.getByRole('button', { name: 'Load older logs' });
      expect(button.getAttribute('aria-busy')).toBe('false');
      fireEvent.click(button);
      await waitFor(() => expect(button.getAttribute('aria-busy')).toBe('true'));
      // A second click while the request runs does not start another.
      fireEvent.click(button);
      expect(onLoadOlder).toHaveBeenCalledTimes(1);
      await act(async () => {
        finish();
      });
      await waitFor(() => expect(button.getAttribute('aria-busy')).toBe('false'));
    });

    it('stops showing busy when the returned promise rejects', async () => {
      let fail: (reason?: unknown) => void = () => undefined;
      const onLoadOlder = vi.fn(() => new Promise<void>((_resolve, reject) => (fail = reject)));
      renderWithTheme(<LogViewer entries={entries('1')} onLoadOlder={onLoadOlder} {...base} />);
      const button = screen.getByRole('button', { name: 'Load older logs' });
      fireEvent.click(button);
      await waitFor(() => expect(button.getAttribute('aria-busy')).toBe('true'));
      await act(async () => {
        fail(new Error('network'));
      });
      await waitFor(() => expect(button.getAttribute('aria-busy')).toBe('false'));
    });

    it('stops showing busy after the returned promise settles in StrictMode', async () => {
      let finish: () => void = () => undefined;
      const onLoadOlder = vi.fn(() => new Promise<void>((resolve) => (finish = resolve)));
      render(
        <React.StrictMode>
          <OxygenUIThemeProvider>
            <LogViewer entries={entries('1')} onLoadOlder={onLoadOlder} {...base} />
          </OxygenUIThemeProvider>
        </React.StrictMode>
      );
      const button = screen.getByRole('button', { name: 'Load older logs' });
      fireEvent.click(button);
      await waitFor(() => expect(button.getAttribute('aria-busy')).toBe('true'));
      await act(async () => {
        finish();
      });
      await waitFor(() => expect(button.getAttribute('aria-busy')).toBe('false'));
    });

    it('does not expose the spinner on the busy button as an unnamed progress bar', () => {
      renderWithTheme(<LogViewer entries={entries('1')} hasMoreOlder loadingOlder />);
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    it('shows a note instead of the button when nothing older remains', () => {
      renderWithTheme(<LogViewer entries={entries('1')} hasMoreOlder={false} />);
      expect(screen.queryByRole('button', { name: 'Load older logs' })).toBeNull();
      expect(screen.getByText('No older logs')).not.toBeNull();
    });

    it('shows the newest label at the newer end when given', () => {
      renderWithTheme(<LogViewer entries={entries('1')} newestLabel="End of range" />);
      expect(screen.getByText('End of range')).not.toBeNull();
    });

    it('uses custom labels', () => {
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          hasMoreOlder
          loadOlderLabel="Mehr laden"
          streamLabel="Protokoll"
        />
      );
      expect(screen.getByRole('button', { name: 'Mehr laden' })).not.toBeNull();
      expect(screen.getByRole('region', { name: 'Protokoll' })).not.toBeNull();
    });
  });

  describe('scrolling toward the older end', () => {
    it('loads when scrolling down near the bottom, newest-first', () => {
      const onLoadOlder = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('3', '2', '1')} hasMoreOlder onLoadOlder={onLoadOlder} />
      );
      const element = stream();
      const geometry = mockScroll(element, { top: 0, height: 1000, client: 400 });

      scrollTo(element, geometry, 200); // moved down, but far from the bottom
      expect(onLoadOlder).not.toHaveBeenCalled();
      scrollTo(element, geometry, 560); // moved down, 40px from the bottom
      expect(onLoadOlder).toHaveBeenCalledTimes(1);
    });

    it('does not load when near the bottom but moving away from it', () => {
      const onLoadOlder = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('3', '2', '1')} hasMoreOlder onLoadOlder={onLoadOlder} />
      );
      const element = stream();
      const geometry = mockScroll(element, { top: 0, height: 1000, client: 400 });
      scrollTo(element, geometry, 600); // the reader got to the bottom
      onLoadOlder.mockClear();
      scrollTo(element, geometry, 590); // then moved up while still near the bottom
      expect(onLoadOlder).not.toHaveBeenCalled();
    });

    it('loads when scrolling up near the top, oldest-first, but not on the first scroll event at the top', () => {
      const onLoadOlder = vi.fn();
      renderWithTheme(
        <LogViewer
          entries={entries('3', '2', '1')}
          order="oldest-first"
          hasMoreOlder
          onLoadOlder={onLoadOlder}
        />
      );
      const element = stream();
      const geometry = mockScroll(element, { top: 0, height: 1000, client: 400 });

      scrollTo(element, geometry, 0); // at the top, not moving
      expect(onLoadOlder).not.toHaveBeenCalled();
      scrollTo(element, geometry, 300); // scrolled away from the older end
      expect(onLoadOlder).not.toHaveBeenCalled();
      scrollTo(element, geometry, 40); // moving up, near the top
      expect(onLoadOlder).toHaveBeenCalledTimes(1);
    });

    it('loads on a wheel movement toward the older end when already at it', () => {
      const onLoadOlder = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('3', '2', '1')} hasMoreOlder onLoadOlder={onLoadOlder} />
      );
      const element = stream();
      mockScroll(element, { top: 600, height: 1000, client: 400 }); // at the bottom

      fireEvent.wheel(element, { deltaY: -50 }); // away from the older end
      expect(onLoadOlder).not.toHaveBeenCalled();
      fireEvent.wheel(element, { deltaY: 50 });
      expect(onLoadOlder).toHaveBeenCalledTimes(1);
    });

    it('does not load while loading, or when nothing older remains', () => {
      const onLoadOlder = vi.fn();
      const { rerender } = renderWithTheme(
        <LogViewer
          entries={entries('3', '2', '1')}
          hasMoreOlder
          loadingOlder
          onLoadOlder={onLoadOlder}
        />
      );
      let element = stream();
      mockScroll(element, { top: 600, height: 1000, client: 400 });
      fireEvent.wheel(element, { deltaY: 50 });
      expect(onLoadOlder).not.toHaveBeenCalled();

      rerender(
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('3', '2', '1')} hasMoreOlder={false} onLoadOlder={onLoadOlder} />
        </OxygenUIThemeProvider>
      );
      element = stream();
      mockScroll(element, { top: 600, height: 1000, client: 400 });
      fireEvent.wheel(element, { deltaY: 50 });
      expect(onLoadOlder).not.toHaveBeenCalled();
    });

    it('asks once when a scroll and a wheel event arrive before the request is reported', () => {
      const onLoadOlder = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('3', '2', '1')} hasMoreOlder onLoadOlder={onLoadOlder} />
      );
      const element = stream();
      const geometry = mockScroll(element, { top: 0, height: 1000, client: 400 });

      scrollTo(element, geometry, 600);
      fireEvent.wheel(element, { deltaY: 50 });
      scrollTo(element, geometry, 610);
      expect(onLoadOlder).toHaveBeenCalledTimes(1);
    });

    it('allows another request once the returned promise settles, including after a failure', async () => {
      let settle: (ok: boolean) => void = () => undefined;
      const onLoadOlder = vi.fn(
        () =>
          new Promise<void>((resolve, reject) => {
            settle = (ok) => (ok ? resolve() : reject(new Error('failed')));
          })
      );
      renderWithTheme(
        <LogViewer entries={entries('3', '2', '1')} hasMoreOlder onLoadOlder={onLoadOlder} />
      );
      const element = stream();
      mockScroll(element, { top: 600, height: 1000, client: 400 });

      fireEvent.wheel(element, { deltaY: 50 });
      fireEvent.wheel(element, { deltaY: 50 });
      expect(onLoadOlder).toHaveBeenCalledTimes(1);

      settle(false);
      await waitFor(() => {
        fireEvent.wheel(element, { deltaY: 50 });
        expect(onLoadOlder).toHaveBeenCalledTimes(2);
      });
    });

    it('allows another request after loadingOlder goes back to false, and when entries change', () => {
      const onLoadOlder = vi.fn();
      const tree = (props: Partial<LogViewerProps>) => (
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('3', '2', '1')} hasMoreOlder onLoadOlder={onLoadOlder} {...props} />
        </OxygenUIThemeProvider>
      );
      const { rerender } = render(tree({}));
      let element = stream();
      mockScroll(element, { top: 600, height: 1000, client: 400 });

      fireEvent.wheel(element, { deltaY: 50 });
      expect(onLoadOlder).toHaveBeenCalledTimes(1);

      rerender(tree({ loadingOlder: true }));
      rerender(tree({ loadingOlder: false }));
      element = stream();
      mockScroll(element, { top: 600, height: 1000, client: 400 });
      fireEvent.wheel(element, { deltaY: 50 });
      expect(onLoadOlder).toHaveBeenCalledTimes(2);

      rerender(tree({ entries: entries('4', '3', '2', '1') }));
      element = stream();
      mockScroll(element, { top: 900, height: 1300, client: 400 });
      fireEvent.wheel(element, { deltaY: 50 });
      expect(onLoadOlder).toHaveBeenCalledTimes(3);
    });

    it('keeps the reader in place when older entries are added above, oldest-first', () => {
      const { rerender } = renderWithTheme(
        <LogViewer entries={entries('3', '2')} order="oldest-first" hasMoreOlder />
      );
      const element = stream();
      const geometry = mockScroll(element, { top: 0, height: 500, client: 400 });
      rerender(
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('3', '2')} order="oldest-first" hasMoreOlder />
        </OxygenUIThemeProvider>
      ); // lets the viewer measure the list as it is before older entries arrive

      geometry.height = 700; // two older entries add 200px above
      rerender(
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('3', '2', '1', '0')} order="oldest-first" hasMoreOlder />
        </OxygenUIThemeProvider>
      );
      expect(geometry.top).toBe(200);
    });

    it('does not move the scroll position when entries are added at the newer end', () => {
      const { rerender } = renderWithTheme(
        <LogViewer entries={entries('2', '1')} order="oldest-first" hasMoreOlder />
      );
      const element = stream();
      const geometry = mockScroll(element, { top: 100, height: 500, client: 400 });
      rerender(
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('2', '1')} order="oldest-first" hasMoreOlder />
        </OxygenUIThemeProvider>
      );

      geometry.height = 700;
      rerender(
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('4', '3', '2', '1')} order="oldest-first" hasMoreOlder />
        </OxygenUIThemeProvider>
      );
      expect(geometry.top).toBe(100);
    });

    it('does not move the scroll position when entries are added, newest-first', () => {
      const { rerender } = renderWithTheme(
        <LogViewer entries={entries('2', '1')} order="newest-first" hasMoreOlder />
      );
      const element = stream();
      const geometry = mockScroll(element, { top: 100, height: 500, client: 400 });
      geometry.height = 700;
      rerender(
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('4', '3', '2', '1')} order="newest-first" hasMoreOlder />
        </OxygenUIThemeProvider>
      );
      expect(geometry.top).toBe(100);
    });
  });

  describe('toolbar', () => {
    it('shows no toolbar unless a control or a filter is asked for', () => {
      renderWithTheme(<LogViewer entries={entries('1')} />);
      expect(screen.queryByRole('toolbar')).toBeNull();
    });

    it('shows the number of loaded entries, and formats it with countLabel', () => {
      const { unmount } = renderWithTheme(<LogViewer entries={entries('2', '1')} showCount />);
      expect(screen.getByText('2 entries loaded')).not.toBeNull();
      unmount();

      const { unmount: unmountOne } = renderWithTheme(<LogViewer entries={entries('1')} showCount />);
      expect(screen.getByText('1 entry loaded')).not.toBeNull();
      unmountOne();

      renderWithTheme(
        <LogViewer
          entries={entries('2', '1')}
          showCount
          countLabel={(count) => `${count} events loaded · UTC`}
        />
      );
      expect(screen.getByText('2 events loaded · UTC')).not.toBeNull();
    });

    it('shows only the controls asked for', () => {
      renderWithTheme(<LogViewer entries={entries('1')} showSort />);
      const toolbar = screen.getByRole('toolbar', { name: 'Log toolbar' });
      expect(within(toolbar).getAllByRole('button')).toHaveLength(1);
      expect(within(toolbar).queryByRole('button', { name: /^Download the/ })).toBeNull();
      expect(within(toolbar).queryByRole('button', { name: 'Refresh' })).toBeNull();
      expect(toolbar.textContent).not.toContain('loaded');
    });

    it('keeps the controls on the right in a fixed order, after the filters', () => {
      const filters: LogFilterDefinition[] = [
        { id: 'status', label: 'Status', type: 'select', options: [] },
      ];
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          filters={filters}
          showCount
          showSort
          showDownload
          showRefresh
        />
      );
      const toolbar = screen.getByRole('toolbar', { name: 'Log toolbar' });
      const names = within(toolbar)
        .getAllByRole('button')
        .map((button) => button.getAttribute('aria-label') ?? button.textContent);
      expect(names).toEqual([
        'Status',
        'Sorted newest first. Switch to oldest first',
        'Download the 1 loaded entry',
        'Refresh',
      ]);
      const text = toolbar.textContent ?? '';
      expect(text.indexOf('Status')).toBeLessThan(text.indexOf('1 entry loaded'));
    });

    it('puts the toolbar above the list', () => {
      renderWithTheme(<LogViewer entries={entries('1')} showCount />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar.compareDocumentPosition(stream()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('uses custom labels for the toolbar and its controls', () => {
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          showSort
          showDownload
          showRefresh
          toolbarLabel="Werkzeuge"
          sortNewestFirstLabel="Neueste zuerst"
          downloadLabel="Herunterladen"
          refreshLabel="Aktualisieren"
        />
      );
      expect(screen.getByRole('toolbar', { name: 'Werkzeuge' })).not.toBeNull();
      expect(screen.getByRole('button', { name: 'Neueste zuerst' })).not.toBeNull();
      expect(screen.getByRole('button', { name: 'Herunterladen' })).not.toBeNull();
      expect(screen.getByRole('button', { name: 'Aktualisieren' })).not.toBeNull();
    });
  });

  describe('sorting', () => {
    const sortButton = (name: string) => screen.getByRole('button', { name });
    const position = (text: string, needle: string) => text.indexOf(needle);

    it('starts newest first, and the sort button reverses the list and moves the older end', () => {
      renderWithTheme(<LogViewer entries={entries('3', '2', '1')} showSort hasMoreOlder />);
      let text = stream().textContent ?? '';
      expect(position(text, 'message 3')).toBeLessThan(position(text, 'message 1'));
      expect(position(text, 'Load older logs')).toBeGreaterThan(position(text, 'message 1'));

      fireEvent.click(sortButton('Sorted newest first. Switch to oldest first'));
      text = stream().textContent ?? '';
      expect(position(text, 'message 1')).toBeLessThan(position(text, 'message 3'));
      expect(position(text, 'Load older logs')).toBeLessThan(position(text, 'message 1'));
      expect(sortButton('Sorted oldest first. Switch to newest first')).not.toBeNull();

      fireEvent.click(sortButton('Sorted oldest first. Switch to newest first'));
      text = stream().textContent ?? '';
      expect(position(text, 'message 3')).toBeLessThan(position(text, 'message 1'));
    });

    it('starts at defaultOrder', () => {
      renderWithTheme(<LogViewer entries={entries('3', '2', '1')} showSort defaultOrder="oldest-first" />);
      const text = stream().textContent ?? '';
      expect(position(text, 'message 1')).toBeLessThan(position(text, 'message 3'));
    });

    it('reports the new order through onOrderChange', () => {
      const onOrderChange = vi.fn();
      renderWithTheme(<LogViewer entries={entries('2', '1')} showSort onOrderChange={onOrderChange} />);
      fireEvent.click(sortButton('Sorted newest first. Switch to oldest first'));
      expect(onOrderChange).toHaveBeenCalledWith('oldest-first');
      fireEvent.click(sortButton('Sorted oldest first. Switch to newest first'));
      expect(onOrderChange).toHaveBeenLastCalledWith('newest-first');
    });

    describe('while a column sort is set', () => {
      // A column sort shows the entries as given, newest first, whatever order the viewer holds.
      const sort = { columnId: 'user', direction: 'asc' as const };
      const tree = (props: Partial<LogViewerProps>) => (
        <LogViewer entries={entries('3', '2', '1')} showSort sort={sort} {...props} />
      );

      it('leaves the sort and switches to the order the screen is not showing', () => {
        const onSortChange = vi.fn();
        const onOrderChange = vi.fn();
        renderWithTheme(tree({ onSortChange, onOrderChange }));
        fireEvent.click(sortButton('Sorted newest first. Switch to oldest first'));
        expect(onSortChange).toHaveBeenCalledWith(null);
        expect(onOrderChange).toHaveBeenCalledWith('oldest-first');
      });

      it('does that even when the viewer holds oldest first, which the sort hides', () => {
        const onSortChange = vi.fn();
        const onOrderChange = vi.fn();
        renderWithTheme(tree({ defaultOrder: 'oldest-first', onSortChange, onOrderChange }));
        fireEvent.click(sortButton('Sorted newest first. Switch to oldest first'));
        expect(onSortChange).toHaveBeenCalledWith(null);
        expect(onOrderChange).toHaveBeenCalledWith('oldest-first');
      });
    });

    it('leaves the order to the page when order is set', () => {
      const onOrderChange = vi.fn();
      const tree = (order: 'newest-first' | 'oldest-first') => (
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('2', '1')} showSort order={order} onOrderChange={onOrderChange} />
        </OxygenUIThemeProvider>
      );
      const { rerender } = render(tree('newest-first'));
      fireEvent.click(sortButton('Sorted newest first. Switch to oldest first'));
      expect(onOrderChange).toHaveBeenCalledWith('oldest-first');
      let text = stream().textContent ?? '';
      expect(position(text, 'message 2')).toBeLessThan(position(text, 'message 1')); // not changed by the viewer

      rerender(tree('oldest-first'));
      text = stream().textContent ?? '';
      expect(position(text, 'message 1')).toBeLessThan(position(text, 'message 2'));
    });

    it('returns to the start of the list when the order changes', () => {
      renderWithTheme(<LogViewer entries={entries('3', '2', '1')} showSort />);
      const element = stream();
      const geometry = mockScroll(element, { top: 120, height: 1000, client: 400 });
      fireEvent.click(sortButton('Sorted newest first. Switch to oldest first'));
      expect(geometry.top).toBe(0);
    });
  });

  describe('downloading', () => {
    let saved: { href: string; download: string } | null;
    let blobs: Blob[];

    const readBlob = (blob: Blob): Promise<string> =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.readAsText(blob);
      });

    beforeEach(() => {
      saved = null;
      blobs = [];
      Object.defineProperty(URL, 'createObjectURL', {
        configurable: true,
        value: (blob: Blob) => {
          blobs.push(blob);
          return 'blob:log';
        },
      });
      Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() });
      vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function click(
        this: HTMLAnchorElement
      ) {
        saved = { href: this.href, download: this.download };
      });
    });

    it('saves one line per loaded entry as logs.log by default', async () => {
      renderWithTheme(<LogViewer entries={entries('2', '1')} showDownload />);
      fireEvent.click(screen.getByRole('button', { name: /^Download the/ }));
      expect(saved?.download).toBe('logs.log');
      expect(blobs).toHaveLength(1);
      expect(await readBlob(blobs[0])).toBe(
        '2026-10-13T10:00:02.000Z message 2\n2026-10-13T10:00:01.000Z message 1\n'
      );
    });

    it('uses copyText, skips entries with no text, and writes timestamps as ISO 8601', async () => {
      renderWithTheme(
        <LogViewer
          entries={[
            entry('3', { copyText: 'custom three' }),
            entry('2', { message: <b>rich</b> }),
            entry('1'),
          ]}
          columns={[{ id: 'message', render: messageOf }]}
          showDownload
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /^Download the/ }));
      expect(await readBlob(blobs[0])).toBe('custom three\nmessage 1\n');
    });

    it('saves in the order shown, so oldest first after the sort button', async () => {
      renderWithTheme(<LogViewer entries={entries('2', '1')} showDownload showSort />);
      fireEvent.click(screen.getByRole('button', { name: 'Sorted newest first. Switch to oldest first' }));
      fireEvent.click(screen.getByRole('button', { name: /^Download the/ }));
      expect(await readBlob(blobs[0])).toBe(
        '2026-10-13T10:00:01.000Z message 1\n2026-10-13T10:00:02.000Z message 2\n'
      );
    });

    it('uses downloadFileName', () => {
      renderWithTheme(<LogViewer entries={entries('1')} showDownload downloadFileName="audit.log" />);
      fireEvent.click(screen.getByRole('button', { name: /^Download the/ }));
      expect(saved?.download).toBe('audit.log');
    });

    it('calls onDownload instead of saving, with the entries in the order shown', () => {
      const onDownload = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('2', '1')} showDownload showSort onDownload={onDownload} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Sorted newest first. Switch to oldest first' }));
      fireEvent.click(screen.getByRole('button', { name: /^Download the/ }));
      expect(saved).toBeNull();
      expect(onDownload).toHaveBeenCalledTimes(1);
      expect((onDownload.mock.calls[0][0] as LogEntry[]).map((item) => item.id)).toEqual(['1', '2']);
    });

    it('is disabled when there is nothing to download', () => {
      renderWithTheme(<LogViewer entries={[]} showDownload />);
      expect((screen.getByRole('button', { name: /^Download the/ }) as HTMLButtonElement).disabled).toBe(true);
    });
  });

  describe('saying what a download holds', () => {
    const button = () => screen.getByRole('button', { name: /^Download/ });

    it('names the number of loaded entries, in singular and plural', () => {
      const { unmount } = renderWithTheme(<LogViewer entries={entries('1')} showDownload />);
      expect(button().getAttribute('aria-label')).toBe('Download the 1 loaded entry');
      unmount();
      renderWithTheme(<LogViewer entries={entries('3', '2', '1')} showDownload />);
      expect(button().getAttribute('aria-label')).toBe('Download the 3 loaded entries');
    });

    it('warns that older entries are not included while some remain to load', () => {
      const { unmount } = renderWithTheme(<LogViewer entries={entries('2', '1')} showDownload hasMoreOlder />);
      expect(button().getAttribute('aria-label')).toBe('Download the 2 loaded entries. Older entries are not included');
      unmount();
      renderWithTheme(<LogViewer entries={entries('2', '1')} showDownload hasMoreOlder={false} />);
      expect(button().getAttribute('aria-label')).toBe('Download the 2 loaded entries');
    });

    it('follows the entries as more are loaded', () => {
      const tree = (items: LogEntry[]) => (
        <OxygenUIThemeProvider>
          <LogViewer entries={items} showDownload hasMoreOlder />
        </OxygenUIThemeProvider>
      );
      const { rerender } = render(tree(entries('2', '1')));
      expect(button().getAttribute('aria-label')).toContain('Download the 2 loaded entries');
      rerender(tree(entries('4', '3', '2', '1')));
      expect(button().getAttribute('aria-label')).toContain('Download the 4 loaded entries');
    });

    it('accepts a plain string, which stays the same', () => {
      renderWithTheme(<LogViewer entries={entries('2', '1')} showDownload hasMoreOlder downloadLabel="Herunterladen" />);
      expect(screen.getByRole('button', { name: 'Herunterladen' })).not.toBeNull();
    });

    it('accepts a function, given the count and whether older entries remain', () => {
      const downloadLabel = vi.fn(({ count, hasMoreOlder }: { count: number; hasMoreOlder: boolean }) =>
        `${count} Eintraege${hasMoreOlder ? ' (mehr vorhanden)' : ''}`
      );
      renderWithTheme(<LogViewer entries={entries('2', '1')} showDownload hasMoreOlder downloadLabel={downloadLabel} />);
      expect(screen.getByRole('button', { name: '2 Eintraege (mehr vorhanden)' })).not.toBeNull();
      expect(downloadLabel).toHaveBeenCalledWith({ count: 2, hasMoreOlder: true });
    });
  });

  describe('refreshing', () => {
    it('calls onRefresh, and is disabled while the first page loads', () => {
      const onRefresh = vi.fn();
      const { unmount } = renderWithTheme(<LogViewer entries={entries('1')} showRefresh onRefresh={onRefresh} />);
      fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
      expect(onRefresh).toHaveBeenCalledTimes(1);
      unmount();

      renderWithTheme(<LogViewer entries={[]} loading showRefresh onRefresh={onRefresh} />);
      expect((screen.getByRole('button', { name: 'Refresh' }) as HTMLButtonElement).disabled).toBe(true);
    });
  });

  describe('timestamps', () => {
    const zone = (offsetMinutes: number) =>
      vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(-offsetMinutes);
    const row = () => stream().textContent ?? '';

    it('shows one standard format in UTC, for a Date and for an ISO string alike', () => {
      renderWithTheme(
        <LogViewer
          entries={[
            entry('2', { timestamp: new Date('2026-10-13T10:00:02.5Z') }),
            entry('1', { timestamp: '2026-10-13T10:00:01Z' }),
          ]}
        />
      );
      expect(row()).toContain('2026-10-13 10:00:02.500');
      expect(row()).toContain('2026-10-13 10:00:01.000');
      expect(row()).not.toContain('T10:00');
    });

    it('shows a string that is not a date exactly as given', () => {
      renderWithTheme(<LogViewer entries={[entry('1', { timestamp: 'yesterday around noon' })]} />);
      expect(row()).toContain('yesterday around noon');
    });

    it('shows the reader\'s own time zone when asked, east or west of UTC', () => {
      const spy = zone(330);
      const { unmount } = renderWithTheme(<LogViewer entries={entries('1')} timeZone="local" />);
      expect(row()).toContain('2026-10-13 15:30:01.000');
      unmount();
      spy.mockReturnValue(300);
      renderWithTheme(<LogViewer entries={entries('1')} timeZone="local" />);
      expect(row()).toContain('2026-10-13 05:00:01.000');
    });

    it('rolls the date over when the zone crosses midnight', () => {
      zone(330);
      renderWithTheme(
        <LogViewer entries={[entry('1', { timestamp: '2026-10-13T20:00:00Z' })]} timeZone="local" />
      );
      expect(row()).toContain('2026-10-14 01:30:00.000');
    });

    it('offers the switch only when asked, with UTC chosen to begin with', () => {
      const { unmount } = renderWithTheme(<LogViewer entries={entries('1')} />);
      expect(screen.queryByRole('group', { name: 'Time zone' })).toBeNull();
      unmount();
      renderWithTheme(<LogViewer entries={entries('1')} showTimeZone />);
      const group = screen.getByRole('group', { name: 'Time zone' });
      expect(within(group).getByRole('button', { name: 'UTC' }).getAttribute('aria-pressed')).toBe('true');
      expect(within(group).getByRole('button', { name: 'Local' }).getAttribute('aria-pressed')).toBe('false');
    });

    it('switches every row, and reports the choice', () => {
      zone(330);
      const onTimeZoneChange = vi.fn();
      renderWithTheme(<LogViewer entries={entries('1')} showTimeZone onTimeZoneChange={onTimeZoneChange} />);
      expect(row()).toContain('2026-10-13 10:00:01.000');
      fireEvent.click(screen.getByRole('button', { name: 'Local' }));
      expect(row()).toContain('2026-10-13 15:30:01.000');
      expect(onTimeZoneChange).toHaveBeenCalledWith('local');
      fireEvent.click(screen.getByRole('button', { name: 'UTC' }));
      expect(row()).toContain('2026-10-13 10:00:01.000');
      expect(onTimeZoneChange).toHaveBeenLastCalledWith('utc');
    });

    it('starts at defaultTimeZone', () => {
      zone(330);
      renderWithTheme(<LogViewer entries={entries('1')} showTimeZone defaultTimeZone="local" />);
      expect(row()).toContain('15:30:01.000');
      expect(screen.getByRole('button', { name: 'Local' }).getAttribute('aria-pressed')).toBe('true');
    });

    it('leaves the zone to the page when timeZone is set', () => {
      zone(330);
      const onTimeZoneChange = vi.fn();
      const tree = (timeZone: 'utc' | 'local') => (
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('1')} showTimeZone timeZone={timeZone} onTimeZoneChange={onTimeZoneChange} />
        </OxygenUIThemeProvider>
      );
      const { rerender } = render(tree('utc'));
      fireEvent.click(screen.getByRole('button', { name: 'Local' }));
      expect(onTimeZoneChange).toHaveBeenCalledWith('local');
      expect(row()).toContain('10:00:01.000'); // not changed by the viewer
      rerender(tree('local'));
      expect(row()).toContain('15:30:01.000');
    });

    it('puts the switch between the count and the sort button', () => {
      renderWithTheme(<LogViewer entries={entries('1')} showCount showTimeZone showSort showDownload showRefresh />);
      const toolbar = screen.getByRole('toolbar');
      const names = within(toolbar)
        .getAllByRole('button')
        .map((button) => button.getAttribute('aria-label') ?? button.textContent);
      expect(names).toEqual(['UTC', 'Local', 'Sorted newest first. Switch to oldest first', 'Download the 1 loaded entry', 'Refresh']);
      const text = toolbar.textContent ?? '';
      expect(text.indexOf('1 entry loaded')).toBeLessThan(text.indexOf('UTC'));
    });

    it('writes copied text as ISO 8601 with the zone, so a pasted line is unambiguous', async () => {
      zone(330);
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
      const onCopy = vi.fn();
      renderWithTheme(<LogViewer entries={[withText('1')]} timeZone="local" onCopy={onCopy} />);
      fireEvent.click(toggleFor('1'));
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
      expect(writeText).toHaveBeenCalledWith('2026-10-13T15:30:01.000+05:30 message 1');
    });

    it('writes the download in the chosen zone too', async () => {
      zone(-300);
      const blobs: Blob[] = [];
      Object.defineProperty(URL, 'createObjectURL', {
        configurable: true,
        value: (blob: Blob) => {
          blobs.push(blob);
          return 'blob:log';
        },
      });
      Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() });
      vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
      renderWithTheme(<LogViewer entries={entries('1')} showDownload timeZone="local" />);
      fireEvent.click(screen.getByRole('button', { name: /^Download the/ }));
      const text = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.readAsText(blobs[0]);
      });
      expect(text).toBe('2026-10-13T05:00:01.000-05:00 message 1\n');
    });

    it('shows a time range chip in the chosen zone', () => {
      zone(330);
      const time: LogFilterDefinition = { id: 'time', label: 'Time Range', type: 'timeRange' };
      const range = { start: new Date('2026-09-14T10:03:42Z'), end: new Date('2026-10-14T10:03:42Z') };
      const { rerender } = renderWithTheme(
        <LogViewer entries={entries('1')} filters={[time]} filterValues={{ time: range }} />
      );
      expect(screen.getByRole('group', { name: 'Applied filters' }).textContent).toContain(
        '2026-09-14 10:03:42 - 2026-10-14 10:03:42'
      );
      rerender(
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('1')} filters={[time]} filterValues={{ time: range }} timeZone="local" />
        </OxygenUIThemeProvider>
      );
      expect(screen.getByRole('group', { name: 'Applied filters' }).textContent).toContain(
        '2026-09-14 15:33:42 - 2026-10-14 15:33:42'
      );
    });

    it('uses custom labels for the switch', () => {
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          showTimeZone
          timeZoneLabel="Zeitzone"
          utcLabel="UTC"
          localLabel="Lokal"
        />
      );
      const group = screen.getByRole('group', { name: 'Zeitzone' });
      expect(within(group).getByRole('button', { name: 'Lokal' })).not.toBeNull();
    });
  });

  describe('sharing a link to an entry', () => {
    const mockClipboard = (writeText: (text: string) => Promise<void>) => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    };
    const link = (item: LogEntry) => `https://example.test/logs?entry=${item.id}`;

    it('shows a Copy link button on each entry only when getEntryLink is given', () => {
      const { unmount } = renderWithTheme(<LogViewer entries={[withText('2'), withText('1')]} />);
      openAll();
      expect(screen.queryByRole('button', { name: 'Copy link' })).toBeNull();
      unmount();
      renderWithTheme(<LogViewer entries={[withText('2'), withText('1')]} getEntryLink={link} />);
      openAll();
      expect(screen.getAllByRole('button', { name: 'Copy link' })).toHaveLength(2);
    });

    it('copies the link for that entry and reports it', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      mockClipboard(writeText);
      const onCopyLink = vi.fn();
      renderWithTheme(
        <LogViewer entries={[withText('2'), withText('1')]} getEntryLink={link} onCopyLink={onCopyLink} />
      );
      openAll();
      fireEvent.click(screen.getAllByRole('button', { name: 'Copy link' })[1]);
      await waitFor(() => expect(onCopyLink).toHaveBeenCalledTimes(1));
      expect(writeText).toHaveBeenCalledWith('https://example.test/logs?entry=1');
      expect(onCopyLink).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), true);
    });

    it('reports a failed copy', async () => {
      mockClipboard(vi.fn().mockRejectedValue(new Error('denied')));
      const onCopyLink = vi.fn();
      renderWithTheme(<LogViewer entries={[withText('1')]} getEntryLink={link} onCopyLink={onCopyLink} />);
      fireEvent.click(toggleFor('1'));
      fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
      await waitFor(() => expect(onCopyLink).toHaveBeenCalledTimes(1));
      expect(onCopyLink).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), false);
    });

    it('shows the button only for entries that have a link', () => {
      renderWithTheme(
        <LogViewer
          entries={[withText('3'), withText('2'), withText('1')]}
          getEntryLink={(item) => (item.id === '2' ? link(item) : undefined)}
        />
      );
      openAll();
      expect(screen.getAllByRole('button', { name: 'Copy link' })).toHaveLength(1);
    });

    it('keeps Copy next to it, and works for an entry that has only a link', () => {
      renderWithTheme(
        <LogViewer
          entries={[withText('1', { message: <b>rich</b> })]}
          columns={[{ id: 'message', render: messageOf }]}
          getEntryLink={link}
        />
      );
      openAll();
      expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull(); // rich message, no text to copy
      expect(screen.getByRole('button', { name: 'Copy link' })).not.toBeNull();
      const { unmount } = renderWithTheme(<LogViewer entries={[withText('1')]} getEntryLink={link} />);
      openAll();
      expect(screen.getAllByRole('button', { name: 'Copy' }).length).toBeGreaterThan(0);
      unmount();
    });

    it('uses copyLinkLabel for the button text', () => {
      renderWithTheme(<LogViewer entries={[withText('1')]} getEntryLink={link} copyLinkLabel="Link kopieren" />);
      openAll();
      expect(screen.getByRole('button', { name: 'Link kopieren' })).not.toBeNull();
    });

    describe('opening a link', () => {
      let scrolled: HTMLElement[];
      beforeEach(() => {
        scrolled = [];
        Object.defineProperty(Element.prototype, 'scrollIntoView', {
          configurable: true,
          value: function scrollIntoView(this: HTMLElement) {
            scrolled.push(this);
          },
        });
      });
      afterEach(() => {
        delete (Element.prototype as { scrollIntoView?: unknown }).scrollIntoView;
      });

      const tree = (props: Partial<LogViewerProps>) => (
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('3', '2', '1')} {...props} />
        </OxygenUIThemeProvider>
      );
      const marked = () => stream().querySelectorAll('[aria-current="true"]');

      it('marks the entry and scrolls it into view', () => {
        render(tree({ highlightedEntryId: '2' }));
        expect(marked()).toHaveLength(1);
        expect(marked()[0].textContent).toContain('message 2');
        expect(scrolled).toHaveLength(1);
        expect(scrolled[0]).toBe(marked()[0].closest('tbody'));
      });

      it('marks nothing and does not scroll when no entry is named', () => {
        render(tree({}));
        expect(marked()).toHaveLength(0);
        expect(scrolled).toHaveLength(0);
      });

      it('scrolls once, not again each time the list changes', () => {
        const { rerender } = render(tree({ highlightedEntryId: '2' }));
        rerender(tree({ highlightedEntryId: '2', entries: entries('4', '3', '2', '1') }));
        rerender(tree({ highlightedEntryId: '2', hasMoreOlder: true }));
        expect(scrolled).toHaveLength(1);
      });

      it('waits for the entry to load, then scrolls to it', () => {
        const { rerender } = render(tree({ highlightedEntryId: '9', entries: entries('3', '2') }));
        expect(scrolled).toHaveLength(0);
        expect(marked()).toHaveLength(0);
        rerender(tree({ highlightedEntryId: '9', entries: entries('9', '3', '2') }));
        expect(scrolled).toHaveLength(1);
        expect(marked()).toHaveLength(1);
      });

      it('scrolls to the entry when loading ends with the same entries', () => {
        // The rows are not drawn while loading, so the entry cannot be found until it ends. The same list is
        // passed both times, so only the end of loading can make the viewer look again.
        const list = entries('3', '2', '1');
        const { rerender } = render(tree({ entries: list, highlightedEntryId: '2', loading: true }));
        expect(scrolled).toHaveLength(0);
        rerender(tree({ entries: list, highlightedEntryId: '2', loading: false }));
        expect(scrolled).toHaveLength(1);
        expect(marked()).toHaveLength(1);
      });

      it('scrolls again for a different entry, and marks nothing for an unknown one', () => {
        const { rerender } = render(tree({ highlightedEntryId: '2' }));
        rerender(tree({ highlightedEntryId: '1' }));
        expect(scrolled).toHaveLength(2);
        rerender(tree({ highlightedEntryId: 'nope' }));
        expect(marked()).toHaveLength(0);
        expect(scrolled).toHaveLength(2);
      });
    });
  });

  describe('empty state', () => {
    it('shows a standard title when there is nothing to show and nothing is set', () => {
      renderWithTheme(<LogViewer entries={[]} />);
      expect(screen.getByText('No logs found')).not.toBeNull();
      expect(stream().querySelector('[data-entry-id]')).toBeNull();
    });

    it('shows the product\'s title and description in the standard layout', () => {
      renderWithTheme(
        <LogViewer
          entries={[]}
          emptyTitle="No logs in this range"
          emptyDescription="Try a wider range or remove a filter."
        />
      );
      const title = screen.getByText('No logs in this range');
      const description = screen.getByText('Try a wider range or remove a filter.');
      expect(title.compareDocumentPosition(description) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(screen.queryByText('No logs found')).toBeNull();
    });

    it('shows no description unless one is given', () => {
      renderWithTheme(<LogViewer entries={[]} emptyTitle="Nothing yet" />);
      expect(screen.getByText('Nothing yet')).not.toBeNull();
      expect(document.querySelectorAll('p').length).toBe(0);
    });

    it('has the same layout whatever the words: an icon, then the title', () => {
      const { unmount } = renderWithTheme(<LogViewer entries={[]} emptyTitle="First" emptyDescription="One" />);
      const shape = () =>
        Array.from(document.querySelectorAll('svg')).length + ':' + (document.querySelector('.MuiTypography-h6') ? 'title' : 'none');
      const first = shape();
      unmount();
      renderWithTheme(<LogViewer entries={[]} emptyTitle="Second" emptyDescription="Two" />);
      expect(shape()).toBe(first);
      expect(first).toBe('1:title');
    });

    it('does not show while the first page loads, or when there are entries', () => {
      const { unmount } = renderWithTheme(<LogViewer entries={[]} loading />);
      expect(screen.queryByText('No logs found')).toBeNull();
      unmount();
      renderWithTheme(<LogViewer entries={entries('1')} />);
      expect(screen.queryByText('No logs found')).toBeNull();
    });

    it('hides the icon from screen readers', () => {
      renderWithTheme(<LogViewer entries={[]} />);
      expect(screen.queryByRole('img')).toBeNull();
    });
  });

  describe('retrying after an error', () => {
    it('shows a Try again button in the error when onRetry is given, and calls it', () => {
      const onRetry = vi.fn();
      renderWithTheme(<LogViewer entries={[]} error="Could not load logs." onRetry={onRetry} />);
      const alert = screen.getByRole('alert');
      expect(alert.textContent).toContain('Could not load logs.');
      fireEvent.click(within(alert).getByRole('button', { name: 'Try again' }));
      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('shows no button without onRetry', () => {
      renderWithTheme(<LogViewer entries={[]} error="Could not load logs." />);
      expect(within(screen.getByRole('alert')).queryByRole('button')).toBeNull();
    });

    it('shows no button without an error, even when onRetry is given', () => {
      renderWithTheme(<LogViewer entries={entries('1')} onRetry={vi.fn()} />);
      expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull();
    });

    it('does not put the button on a warning', () => {
      renderWithTheme(<LogViewer entries={entries('1')} warning="Some entries are missing." onRetry={vi.fn()} />);
      expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull();
    });

    it('keeps the entries and the button together when an error follows a partial load', () => {
      renderWithTheme(<LogViewer entries={entries('2', '1')} error="Could not load more." onRetry={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Try again' })).not.toBeNull();
      expect(stream().textContent).toContain('message 2');
    });

    it('uses retryLabel for the button text', () => {
      renderWithTheme(<LogViewer entries={[]} error="Fehler" onRetry={vi.fn()} retryLabel="Erneut versuchen" />);
      expect(screen.getByRole('button', { name: 'Erneut versuchen' })).not.toBeNull();
    });
  });

  describe('levels', () => {
    const markers = () => Array.from(stream().querySelectorAll('[data-level]')) as HTMLElement[];
    const levels: LogLevel[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

    it('shows a marker with the level as text, before the message', () => {
      renderWithTheme(
        <LogViewer entries={levels.map((level) => entry('1', { id: level, level, message: `says ${level}` }))} />
      );
      expect(markers().map((marker) => marker.textContent)).toEqual([
        'Trace',
        'Debug',
        'Info',
        'Warn',
        'Error',
        'Fatal',
      ]);
      const text = stream().textContent ?? '';
      expect(text.indexOf('Info')).toBeLessThan(text.indexOf('says info'));
      expect(text.indexOf('2026-10-13T10:00:01.000Z')).toBeLessThan(text.indexOf('Info'));
    });

    it('shows no marker for an entry without a level', () => {
      renderWithTheme(<LogViewer entries={[entry('1'), entry('2', { level: 'warn' })]} />);
      expect(markers()).toHaveLength(1);
      expect(markers()[0].textContent).toBe('Warn');
    });

    it('fills no marker, and draws every border the same width, fatal and error alike', () => {
      renderWithTheme(
        <LogViewer entries={[entry('2', { level: 'fatal' }), entry('1', { level: 'error' })]} />
      );
      const [fatal, error] = markers();
      expect(fatal.className).toContain('MuiChip-outlined');
      expect(error.className).toContain('MuiChip-outlined');
      expect(fatal.className).not.toContain('MuiChip-filled');
      expect(getComputedStyle(fatal).borderWidth).toBe(getComputedStyle(error).borderWidth);
      // Both stay readable as text, so severity never depends on colour alone.
      expect(fatal.textContent).not.toBe(error.textContent);
    });

    it('puts a warning icon before the text of fatal only, and keeps the text', () => {
      renderWithTheme(
        <LogViewer
          entries={['fatal', 'error', 'warn', 'info', 'debug'].map((level, index) =>
            entry(String(index), { level: level as LogLevel })
          )}
        />
      );
      const withIcon = markers().filter((marker) => marker.querySelector('svg'));
      expect(withIcon).toHaveLength(1);
      expect(withIcon[0].getAttribute('data-level')).toBe('fatal');
      expect(withIcon[0].textContent).toBe('Fatal');
      expect(withIcon[0].querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    });

    it('is inline, and sits in a cell of the row', () => {
      renderWithTheme(<LogViewer entries={[entry('1', { level: 'info', details: { a: 1 } })]} />);
      const marker = markers()[0];
      expect(marker.tagName).toBe('SPAN');
      expect(marker.closest('td')).not.toBeNull();
    });

    it('changes only the labels given, with levelLabels', () => {
      renderWithTheme(
        <LogViewer
          entries={[entry('2', { level: 'error' }), entry('1', { level: 'info' })]}
          levelLabels={{ error: 'FEHLER' }}
        />
      );
      expect(markers().map((marker) => marker.textContent)).toEqual(['FEHLER', 'Info']);
    });

    it('includes the level in the default copied text', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
      const onCopy = vi.fn();
      renderWithTheme(<LogViewer entries={[withText('1', { level: 'error' })]} onCopy={onCopy} />);
      fireEvent.click(toggleFor('1'));
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
      expect(writeText).toHaveBeenCalledWith('2026-10-13T10:00:01.000Z Error message 1');
    });

    it('includes the level in the default download, using levelLabels', async () => {
      const blobs: Blob[] = [];
      Object.defineProperty(URL, 'createObjectURL', {
        configurable: true,
        value: (blob: Blob) => {
          blobs.push(blob);
          return 'blob:log';
        },
      });
      Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() });
      vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
      renderWithTheme(
        <LogViewer
          entries={[entry('2', { level: 'warn' }), entry('1')]}
          showDownload
          levelLabels={{ warn: 'WARNUNG' }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /^Download the/ }));
      const text = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.readAsText(blobs[0]);
      });
      expect(text).toBe('2026-10-13T10:00:02.000Z WARNUNG message 2\n2026-10-13T10:00:01.000Z message 1\n');
    });
  });

  describe('searching', () => {
    const box = () => screen.getByRole('textbox', { name: 'Search logs' }) as HTMLInputElement;
    const type = (value: string) => fireEvent.change(box(), { target: { value } });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('shows a search box only when asked', () => {
      const { unmount } = renderWithTheme(<LogViewer entries={entries('1')} />);
      expect(screen.queryByRole('textbox')).toBeNull();
      unmount();
      renderWithTheme(<LogViewer entries={entries('1')} showSearch />);
      expect(box()).not.toBeNull();
      expect(screen.getByRole('toolbar')).not.toBeNull();
    });

    it('puts the filters, then the search and the count, first in the toolbar, before the time zone', () => {
      const filters: LogFilterDefinition[] = [{ id: 'status', label: 'Status', type: 'select', options: [] }];
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          showSearch
          filters={filters}
          showCount
          countLabel={() => 'N events'}
          showTimeZone
        />
      );
      const toolbar = screen.getByRole('toolbar');
      const text = Array.from(toolbar.querySelectorAll('input, button, p')).map((element) =>
        element.tagName === 'INPUT' ? 'search' : (element.textContent ?? '')
      );
      expect(text.slice(0, 4)).toEqual(['Status', 'search', 'N events', 'UTC']);
    });

    it('reports the text once typing pauses, not on every key', () => {
      vi.useFakeTimers();
      const onSearchChange = vi.fn();
      renderWithTheme(<LogViewer entries={entries('1')} showSearch onSearchChange={onSearchChange} />);
      type('t');
      vi.advanceTimersByTime(100);
      type('ti');
      vi.advanceTimersByTime(100);
      type('time');
      expect(onSearchChange).not.toHaveBeenCalled();
      vi.advanceTimersByTime(300);
      expect(onSearchChange).toHaveBeenCalledTimes(1);
      expect(onSearchChange).toHaveBeenCalledWith('time');
    });

    it('reports at once on Enter', () => {
      vi.useFakeTimers();
      const onSearchChange = vi.fn();
      renderWithTheme(<LogViewer entries={entries('1')} showSearch onSearchChange={onSearchChange} />);
      type('timeout');
      fireEvent.keyDown(box(), { key: 'Enter' });
      expect(onSearchChange).toHaveBeenCalledWith('timeout');
      vi.advanceTimersByTime(1000);
      expect(onSearchChange).toHaveBeenCalledTimes(1);
    });

    it('reports every change when searchDebounceMs is 0', () => {
      const onSearchChange = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('1')} showSearch searchDebounceMs={0} onSearchChange={onSearchChange} />
      );
      type('a');
      type('ab');
      expect(onSearchChange.mock.calls).toEqual([['a'], ['ab']]);
    });

    it('offers a clear button only when there is text, and clears at once', () => {
      const onSearchChange = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('1')} showSearch searchValue="error" onSearchChange={onSearchChange} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
      expect(box().value).toBe('');
      expect(onSearchChange).toHaveBeenCalledWith('');
      expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();
    });

    it('does not report text that has not changed', () => {
      const onSearchChange = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('1')} showSearch searchValue="same" searchDebounceMs={0} onSearchChange={onSearchChange} />
      );
      type('same');
      expect(onSearchChange).not.toHaveBeenCalled();
    });

    it('shows a value the page sets, for example to clear the search', () => {
      const tree = (value: string) => (
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('1')} showSearch searchValue={value} />
        </OxygenUIThemeProvider>
      );
      const { rerender } = render(tree('first'));
      expect(box().value).toBe('first');
      rerender(tree(''));
      expect(box().value).toBe('');
      rerender(tree('second'));
      expect(box().value).toBe('second');
    });

    it('keeps what the reader typed when the page echoes back an earlier value', () => {
      vi.useFakeTimers();
      const onSearchChange = vi.fn();
      const tree = (value: string) => (
        <OxygenUIThemeProvider>
          <LogViewer entries={entries('1')} showSearch searchValue={value} onSearchChange={onSearchChange} />
        </OxygenUIThemeProvider>
      );
      const { rerender } = render(tree(''));
      type('a');
      vi.advanceTimersByTime(300); // reported: the page now holds "a"
      type('ab'); // the reader kept typing
      rerender(tree('a')); // the page echoes the value it was given
      expect(box().value).toBe('ab');
    });

    it('stays enabled while the first page loads, so typing is not interrupted', () => {
      renderWithTheme(<LogViewer entries={[]} loading showSearch />);
      expect(box().disabled).toBe(false);
    });

    it('uses custom labels', () => {
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          showSearch
          searchValue="x"
          searchPlaceholder="Protokoll durchsuchen"
          clearSearchLabel="Suche löschen"
        />
      );
      expect(screen.getByRole('textbox', { name: 'Protokoll durchsuchen' })).not.toBeNull();
      expect(screen.getByRole('button', { name: 'Suche löschen' })).not.toBeNull();
    });

    it('does not report after it is removed from the page', () => {
      vi.useFakeTimers();
      const onSearchChange = vi.fn();
      const { unmount } = renderWithTheme(
        <LogViewer entries={entries('1')} showSearch onSearchChange={onSearchChange} />
      );
      type('late');
      unmount();
      vi.advanceTimersByTime(1000);
      expect(onSearchChange).not.toHaveBeenCalled();
    });
  });

  describe('filters', () => {
    const status: LogFilterDefinition = {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'success', label: 'Success' },
        { value: 'failure', label: 'Failure' },
      ],
    };
    const user: LogFilterDefinition = {
      id: 'user',
      label: 'User',
      type: 'select',
      searchable: true,
      options: [
        { value: 'maria', label: 'maria.silva@acme.example' },
        { value: 'devon', label: 'devon.park@acme.example' },
        { value: 'priya', label: 'priya.nair@acme.example' },
      ],
    };
    const time: LogFilterDefinition = { id: 'time', label: 'Time Range', type: 'timeRange' };

    it('shows a button per filter, in the order given, and no chip while none is applied', () => {
      renderWithTheme(<LogViewer entries={entries('1')} filters={[user, status]} />);
      const toolbar = screen.getByRole('toolbar');
      expect(within(toolbar).getAllByRole('button').map((button) => button.textContent)).toEqual(['User', 'Status']);
      expect(screen.queryByRole('group', { name: 'Applied filters' })).toBeNull();
    });

    it('leaves out a choice with an empty value, because an empty value means the filter is not applied', () => {
      const withBlank: LogFilterDefinition = {
        id: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: '', label: 'Blank' },
          { value: 'success', label: 'Success' },
        ],
      };
      renderWithTheme(<LogViewer entries={entries('1')} filters={[withBlank]} filterValues={{}} />);
      fireEvent.click(screen.getByRole('button', { name: 'Status' }));
      expect(screen.queryByRole('menuitemradio', { name: 'Blank' })).toBeNull();
      expect(screen.getByRole('menuitemradio', { name: 'Success' })).not.toBeNull();
    });

    it('lists the choices, reports a pick, and does not keep the value itself', () => {
      const onFilterChange = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('1')} filters={[status]} filterValues={{}} onFilterChange={onFilterChange} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Status' }));
      expect(screen.getByRole('menuitemradio', { name: 'Any status' })).not.toBeNull();
      expect(screen.getByRole('menuitemradio', { name: 'Success' })).not.toBeNull();
      fireEvent.click(screen.getByRole('menuitemradio', { name: 'Failure' }));
      expect(onFilterChange).toHaveBeenCalledWith('status', 'failure');
      expect(screen.queryByRole('group', { name: 'Applied filters' })).toBeNull(); // values are the page's to hold
    });

    it('shows a chip for an applied value, which can be changed or removed', () => {
      const onFilterChange = vi.fn();
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          filters={[status]}
          filterValues={{ status: 'failure' }}
          onFilterChange={onFilterChange}
        />
      );
      const group = screen.getByRole('group', { name: 'Applied filters' });
      expect(group.textContent).toContain('Status:');
      expect(group.textContent).toContain('Failure');

      fireEvent.click(within(group).getByRole('button', { name: 'Remove status filter' }));
      expect(onFilterChange).toHaveBeenCalledWith('status', null);

      fireEvent.click(within(group).getByRole('button', { name: 'Status: Failure, Change status filter' }));
      expect(screen.getByRole('menuitemradio', { name: 'Failure' }).getAttribute('aria-checked')).toBe('true');
    });

    it('draws the chips below the toolbar, and offers Clear all only when more than one is applied', () => {
      const onFilterChange = vi.fn();
      const level: LogFilterDefinition = {
        id: 'level',
        label: 'Level',
        type: 'select',
        options: [{ value: 'error', label: 'Error' }],
      };
      const { unmount } = renderWithTheme(
        <LogViewer
          entries={entries('1')}
          filters={[status]}
          filterValues={{ status: 'failure' }}
          onFilterChange={onFilterChange}
          showRefresh
        />
      );
      const toolbar = screen.getByRole('toolbar');
      const group = screen.getByRole('group', { name: 'Applied filters' });
      expect(toolbar.compareDocumentPosition(group) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(screen.queryByRole('button', { name: 'Clear all' })).toBeNull();
      unmount();

      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          filters={[status, level]}
          filterValues={{ status: 'failure', level: 'error' }}
          onFilterChange={onFilterChange}
          clearAllLabel="Alle löschen"
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Alle löschen' }));
      expect(onFilterChange).toHaveBeenCalledWith('status', null);
      expect(onFilterChange).toHaveBeenCalledWith('level', null);
    });

    it('hides the chips when showFilterChips is off, while the filter buttons stay', () => {
      const { rerender } = renderWithTheme(
        <LogViewer entries={entries('1')} filters={[status]} filterValues={{ status: 'failure' }} />
      );
      expect(screen.getByRole('group', { name: 'Applied filters' })).not.toBeNull();

      rerender(
        <OxygenUIThemeProvider>
          <LogViewer
            entries={entries('1')}
            filters={[status]}
            filterValues={{ status: 'failure' }}
            showFilterChips={false}
          />
        </OxygenUIThemeProvider>
      );
      expect(screen.queryByRole('group', { name: 'Applied filters' })).toBeNull();
      expect(screen.getByRole('button', { name: 'Status' })).not.toBeNull();
    });

    it('reports null when the "any" choice is picked', () => {
      const onFilterChange = vi.fn();
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          filters={[{ ...status, allLabel: 'Any status' }]}
          filterValues={{ status: 'failure' }}
          onFilterChange={onFilterChange}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Status' }));
      fireEvent.click(screen.getByRole('menuitemradio', { name: 'Any status' }));
      expect(onFilterChange).toHaveBeenCalledWith('status', null);
    });

    it('narrows a searchable list as the reader types, and says when nothing matches', () => {
      renderWithTheme(<LogViewer entries={entries('1')} filters={[user]} />);
      fireEvent.click(screen.getByRole('button', { name: 'User' }));
      const search = screen.getByRole('textbox', { name: 'User' });
      fireEvent.change(search, { target: { value: 'PRIYA' } });
      expect(screen.queryByRole('menuitemradio', { name: 'maria.silva@acme.example' })).toBeNull();
      expect(screen.getByRole('menuitemradio', { name: 'priya.nair@acme.example' })).not.toBeNull();
      // "Any" stays at the top while searching and is not a match, so it is never picked by Enter.
      expect(screen.getByRole('menuitemradio', { name: 'Any user' })).not.toBeNull();

      fireEvent.change(search, { target: { value: 'zzz' } });
      expect(screen.getByText('No matches')).not.toBeNull();
    });

    it('offers the choices as a menu of radio items, with a search field when searchable', () => {
      renderWithTheme(<LogViewer entries={entries('1')} filters={[user]} />);
      fireEvent.click(screen.getByRole('button', { name: 'User' }));
      expect(screen.getByRole('textbox', { name: 'User' })).not.toBeNull();
      expect(within(screen.getByRole('menu', { name: 'User' })).getAllByRole('menuitemradio').length).toBeGreaterThan(0);
    });

    it('is a plain list, without a search field, unless the filter is searchable', () => {
      renderWithTheme(<LogViewer entries={entries('1')} filters={[status]} />);
      fireEvent.click(screen.getByRole('button', { name: 'Status' }));
      expect(screen.queryByRole('textbox')).toBeNull();
      expect(screen.getByRole('menu', { name: 'Status' })).not.toBeNull();
    });

    it('shows a value that is not among the options as it is', () => {
      renderWithTheme(
        <LogViewer entries={entries('1')} filters={[status]} filterValues={{ status: 'unknown-status' }} />
      );
      expect(screen.getByRole('group', { name: 'Applied filters' }).textContent).toContain('unknown-status');
    });

    it('reports a time range picked from a preset, and shows it as a chip that can be removed', () => {
      const onFilterChange = vi.fn();
      const { rerender } = renderWithTheme(
        <LogViewer entries={entries('1')} filters={[time]} filterValues={{}} onFilterChange={onFilterChange} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Time Range' }));
      fireEvent.click(screen.getByRole('menuitem', { name: 'Last 24 hours' }));
      expect(onFilterChange).toHaveBeenCalledTimes(1);
      const [id, range] = onFilterChange.mock.calls[0];
      expect(id).toBe('time');
      expect(range.end.getTime() - range.start.getTime()).toBe(24 * 60 * 60 * 1000);

      rerender(
        <OxygenUIThemeProvider>
          <LogViewer
            entries={entries('1')}
            filters={[time]}
            filterValues={{
              time: { start: new Date('2026-09-14T10:03:42Z'), end: new Date('2026-10-14T10:03:42Z') },
            }}
            onFilterChange={onFilterChange}
          />
        </OxygenUIThemeProvider>
      );
      const group = screen.getByRole('group', { name: 'Applied filters' });
      expect(group.textContent).toContain('Time Range:');
      expect(group.textContent).toContain('2026-09-14 10:03:42 - 2026-10-14 10:03:42');
      fireEvent.click(within(group).getByRole('button', { name: 'Remove time range filter' }));
      expect(onFilterChange).toHaveBeenLastCalledWith('time', null);
    });

    it('formats a time range with formatValue', () => {
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          filters={[{ ...time, formatValue: () => 'custom text' }]}
          filterValues={{ time: { start: new Date('2026-10-13T00:00:00Z'), end: new Date('2026-10-14T00:00:00Z') } }}
        />
      );
      expect(screen.getByRole('group', { name: 'Applied filters' }).textContent).toContain('custom text');
    });

    it('limits a custom time range with maxRangeMs', () => {
      renderWithTheme(
        <LogViewer entries={entries('1')} filters={[{ ...time, maxRangeMs: 60 * 60 * 1000 }]} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Time Range' }));
      fireEvent.click(screen.getByRole('menuitem', { name: 'Custom' }));
      fireEvent.change(pickerInput('Start from (UTC)', 'Date'), { target: { value: '2026-10-01' } });
      fireEvent.change(pickerInput('Start from (UTC)', 'Time'), { target: { value: '00:00:00' } });
      fireEvent.change(pickerInput('End on (UTC)', 'Date'), { target: { value: '2026-10-05' } });
      fireEvent.change(pickerInput('End on (UTC)', 'Time'), { target: { value: '00:00:00' } });
      fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
      expect(screen.getByText('Choose a range of at most 1 hour.')).not.toBeNull();
    });

    it('disables the filter buttons while the first page loads', () => {
      renderWithTheme(<LogViewer entries={[]} loading filters={[status, time]} />);
      expect((screen.getByRole('button', { name: 'Status' }) as HTMLButtonElement).disabled).toBe(true);
      expect((screen.getByRole('button', { name: 'Time Range' }) as HTMLButtonElement).disabled).toBe(true);
    });

    it('uses custom labels', () => {
      renderWithTheme(
        <LogViewer
          entries={entries('1')}
          filters={[{ ...user, searchPlaceholder: 'Nutzer suchen', noMatchLabel: 'Keine Treffer' }]}
          appliedFiltersLabel="Aktive Filter"
          filterValues={{ user: 'maria' }}
        />
      );
      expect(screen.getByRole('group', { name: 'Aktive Filter' })).not.toBeNull();
      fireEvent.click(screen.getByRole('button', { name: 'User' }));
      fireEvent.change(screen.getByPlaceholderText('Nutzer suchen'), { target: { value: 'zzz' } });
      expect(screen.getByText('Keine Treffer')).not.toBeNull();
    });
  });
  describe('columns', () => {
    const columns = [
      { id: 'time', filterId: 'time', sortable: true },
      { id: 'user', label: 'User', filterId: 'user', sortable: true, render: (e: LogEntry) => `user of ${e.id}` },
      { id: 'action', label: 'Action', render: (e: LogEntry) => `action of ${e.id}` },
    ];
    const filters: LogFilterDefinition[] = [
      { id: 'time', label: 'Time Range', type: 'timeRange' },
      { id: 'user', label: 'User', type: 'select', options: [{ value: 'ann', label: 'Ann' }] },
      { id: 'status', label: 'Status', type: 'select', options: [{ value: 'ok', label: 'Ok' }] },
    ];

    describe('as a table', () => {
      it('is a table with a heading row of column headers and one row per entry', () => {
        renderWithTheme(<LogViewer entries={entries('2', '1')} columns={columns} />);
        const table = screen.getByRole('table');
        expect(within(table).getAllByRole('columnheader').map((header) => header.textContent)).toEqual([
          'Time',
          'User',
          'Action',
        ]);
        // The heading row, a row for the note at the older end, and one row per entry.
        expect(within(table).getAllByRole('row')).toHaveLength(4);
        expect(within(rowOf('1')).getAllByRole('cell')).toHaveLength(columns.length);
      });

      it('says which column is sorted, and in which direction, in the heading', () => {
        const { rerender } = renderWithTheme(<LogViewer entries={entries('1')} columns={columns} />);
        const sortOf = (name: string) =>
          screen.getByRole('columnheader', { name: new RegExp(name) }).getAttribute('aria-sort');
        expect(sortOf('Time')).toBe('descending'); // newest first
        expect(sortOf('User')).toBe('none');
        expect(screen.getByRole('columnheader', { name: /Action/ }).getAttribute('aria-sort')).toBeNull(); // not sortable

        rerender(
          <OxygenUIThemeProvider>
            <LogViewer
              entries={entries('1')}
              columns={columns}
              sort={{ columnId: 'user', direction: 'asc' }}
            />
          </OxygenUIThemeProvider>
        );
        expect(sortOf('User')).toBe('ascending');
        expect(sortOf('Time')).toBe('none');
      });

      it('opens and closes an entry with a named button in its first cell, and the keyboard reaches it', () => {
        renderWithTheme(<LogViewer entries={[withText('1')]} columns={columns} />);
        const toggle = toggleFor('1');
        expect(toggle.closest('td')).toBe(within(rowOf('1')).getAllByRole('cell')[0]);
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        fireEvent.click(toggle);
        expect(toggle.getAttribute('aria-label')).toBe('Hide details');
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
      });

      it('opens an entry when its row is clicked, and only once when the button is', () => {
        renderWithTheme(<LogViewer entries={[withText('1')]} columns={columns} />);
        fireEvent.click(within(rowOf('1')).getAllByRole('cell')[1]);
        expect(toggleFor('1').getAttribute('aria-expanded')).toBe('true');
        fireEvent.click(toggleFor('1'));
        expect(toggleFor('1').getAttribute('aria-expanded')).toBe('false');
      });

      it('uses detailsToggleLabel for the open and close button', () => {
        renderWithTheme(
          <LogViewer
            entries={[withText('1')]}
            columns={columns}
            detailsToggleLabel={({ open }) => (open ? 'Schliessen' : 'Oeffnen')}
          />
        );
        expect(within(rowOf('1')).getByRole('button', { name: 'Oeffnen' })).not.toBeNull();
      });
    });

    it('shows a heading row and each field of an entry in its own cell', () => {
      renderWithTheme(<LogViewer entries={entries('1', '2')} columns={columns} />);
      expect(screen.getByText('Time')).not.toBeNull();
      expect(screen.getByText('Action')).not.toBeNull();
      expect(screen.getByText('user of 1')).not.toBeNull();
      expect(screen.getByText('action of 2')).not.toBeNull();
      // The one-line message is not shown in this layout.
      expect(screen.queryByText('message 1')).toBeNull();
    });

    it('keeps one line of text per entry when no columns are given', () => {
      renderWithTheme(<LogViewer entries={entries('1')} />);
      expect(screen.getByText('message 1')).not.toBeNull();
      expect(screen.queryByText('User')).toBeNull();
    });

    it('opens a filter from its column heading, and not from the toolbar', () => {
      const onFilterChange = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('1')} columns={columns} filters={filters} onFilterChange={onFilterChange} />
      );
      // The user filter lives in a heading, so the toolbar has no button for it; the status filter has no column.
      expect(screen.queryByRole('button', { name: 'User' })).toBeNull();
      expect(screen.getByRole('button', { name: /^Status/ })).not.toBeNull();
      fireEvent.click(screen.getByRole('button', { name: 'Filter by User' }));
      fireEvent.click(screen.getByRole('menuitemradio', { name: 'Ann' }));
      expect(onFilterChange).toHaveBeenCalledWith('user', 'ann');
    });

    it('sorts by the time through the order, and by another column through onSortChange', () => {
      const onOrderChange = vi.fn();
      const onSortChange = vi.fn();
      renderWithTheme(
        <LogViewer entries={entries('1')} columns={columns} onOrderChange={onOrderChange} onSortChange={onSortChange} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Sort by Time' }));
      expect(onOrderChange).toHaveBeenCalledWith('oldest-first');
      fireEvent.click(screen.getByRole('button', { name: 'Sort by User' }));
      expect(onSortChange).toHaveBeenCalledWith({ columnId: 'user', direction: 'asc' });
    });

    it('shows entries as given while sorted by another column', () => {
      renderWithTheme(
        <LogViewer
          entries={entries('1', '2')}
          columns={columns}
          defaultOrder="oldest-first"
          sort={{ columnId: 'user', direction: 'asc' }}
        />
      );
      const cells = screen.getAllByText(/^user of/).map((cell) => cell.textContent);
      expect(cells).toEqual(['user of 1', 'user of 2']);
    });
  });
});

describe('composition', () => {
  const Base = BaseLogViewer;

  it('draws only the stream when no parts are given', () => {
    renderWithTheme(<Base entries={entries('1')} columns={defaultColumns} />);
    expect(stream()).not.toBeNull();
    expect(screen.queryByRole('toolbar')).toBeNull();
  });

  it('draws only the controls that are included', () => {
    renderWithTheme(
      <Base entries={entries('1')} columns={defaultColumns}>
        <Base.Toolbar>
          <Base.Search />
          <Base.Refresh />
        </Base.Toolbar>
        <Base.Stream />
      </Base>
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Log toolbar' });
    expect(within(toolbar).getByPlaceholderText('Search logs')).not.toBeNull();
    expect(within(toolbar).getByRole('button', { name: 'Refresh' })).not.toBeNull();
    expect(within(toolbar).queryByRole('button', { name: /Download/ })).toBeNull();
    expect(within(toolbar).queryByRole('group', { name: 'Time zone' })).toBeNull();
  });

  it('puts the controls on the right in the order given, and the count on the left wherever it is', () => {
    renderWithTheme(
      <Base entries={entries('1', '2')} columns={defaultColumns}>
        <Base.Toolbar>
          <Base.Download />
          <Base.Count />
          <Base.Refresh />
        </Base.Toolbar>
        <Base.Stream />
      </Base>
    );
    const toolbar = screen.getByRole('toolbar');
    const [left, right] = Array.from(toolbar.children) as HTMLElement[];
    expect(left.textContent).toContain('2 entries loaded');
    expect(right.textContent).not.toContain('entries loaded');
    const names = within(right)
      .getAllByRole('button')
      .map((button) => button.getAttribute('aria-label'));
    expect(names[0]).toMatch(/^Download/);
    expect(names[1]).toBe('Refresh');
  });

  it('puts the search on the left with the filters, wherever it is among the controls', () => {
    renderWithTheme(
      <Base entries={entries('1', '2')} columns={defaultColumns}>
        <Base.Toolbar>
          <Base.Download />
          <Base.Search />
          <Base.Refresh />
        </Base.Toolbar>
        <Base.Stream />
      </Base>
    );
    const toolbar = screen.getByRole('toolbar');
    const [left, right] = Array.from(toolbar.children) as HTMLElement[];
    expect(within(left).getByPlaceholderText('Search logs')).not.toBeNull();
    expect(within(right).queryByPlaceholderText('Search logs')).toBeNull();
  });

  it('gives each part its own words', () => {
    renderWithTheme(
      <Base entries={entries('1')} columns={defaultColumns}>
        <Base.Toolbar label="Protokoll-Werkzeuge">
          <Base.Download label="Laden" />
          <Base.TimeZone label="Zeitzone" utcLabel="UTC" localLabel="Lokal" />
        </Base.Toolbar>
        <Base.Stream label="Protokoll" emptyTitle="Leer" />
      </Base>
    );
    expect(screen.getByRole('toolbar', { name: 'Protokoll-Werkzeuge' })).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Laden' })).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Lokal' })).not.toBeNull();
    expect(screen.getByRole('region', { name: 'Protokoll' })).not.toBeNull();
  });

  it('switches the time zone from its part, and the stream follows', () => {
    renderWithTheme(
      <Base entries={entries('1')} columns={defaultColumns}>
        <Base.Toolbar>
          <Base.TimeZone />
        </Base.Toolbar>
        <Base.Stream />
      </Base>
    );
    const utc = screen.getByRole('button', { name: 'UTC' });
    expect(utc.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Local' }));
    expect(screen.getByRole('button', { name: 'Local' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('leaves out the sort button when the time column sorts itself', () => {
    renderWithTheme(
      <Base entries={entries('1')} columns={[{ id: 'time', sortable: true }, { id: 'level' }]}>
        <Base.Toolbar>
          <Base.Sort />
          <Base.Refresh />
        </Base.Toolbar>
        <Base.Stream />
      </Base>
    );
    expect(screen.queryByRole('button', { name: /Sorted newest first/ })).toBeNull();
  });

  it('throws when a part is used outside a LogViewer', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => renderWithTheme(<Base.Stream />)).toThrow(/inside a <LogViewer>/);
  });
});

describe('hidden heading', () => {
  const status: LogFilterDefinition = {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [{ value: 'failure', label: 'Failure' }],
  };
  const columns: LogColumn[] = [
    { id: 'time', sortable: true },
    { id: 'level' },
    { id: 'message', label: 'Message', render: messageOf, filterId: 'status', sortable: true },
  ];
  const headings = () => within(screen.getByRole('table')).getAllByRole('columnheader');

  it('keeps the column headers for assistive technology, with their labels', () => {
    renderWithTheme(<LogViewer entries={entries('1')} columns={columns} filters={[status]} hideHeading />);
    expect(headings().map((heading) => heading.textContent)).toEqual(['Time', 'Level', 'Message']);
  });

  it('hides the headings visually, so they take no room', () => {
    renderWithTheme(<LogViewer entries={entries('1')} columns={columns} filters={[status]} hideHeading />);
    headings().forEach((heading) => {
      const style = getComputedStyle(heading);
      expect(style.position).toBe('absolute');
      expect(style.width).toBe('1px');
    });
  });

  it('shows the headings as usual when it is not set', () => {
    renderWithTheme(<LogViewer entries={entries('1')} columns={columns} filters={[status]} />);
    expect(getComputedStyle(headings()[0]).position).not.toBe('absolute');
  });

  it('offers no sort or filter control in a heading, and no aria-sort', () => {
    renderWithTheme(<LogViewer entries={entries('1')} columns={columns} filters={[status]} hideHeading />);
    const table = screen.getByRole('table');
    expect(within(table).queryAllByRole('button', { name: /sort by|filter by/i })).toHaveLength(0);
    headings().forEach((heading) => expect(heading.getAttribute('aria-sort')).toBeNull());
  });

  it('shows the filter of a column in the toolbar instead, where its heading cannot hold it', () => {
    const { unmount } = renderWithTheme(<LogViewer entries={entries('1')} columns={columns} filters={[status]} />);
    // With the heading, the filter is in the heading of its column (here "Message") and not a button named "Status".
    expect(screen.queryByRole('button', { name: 'Status' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Filter by Message' })).not.toBeNull();
    unmount();
    renderWithTheme(<LogViewer entries={entries('1')} columns={columns} filters={[status]} hideHeading />);
    expect(within(screen.getByRole('toolbar')).getByRole('button', { name: 'Status' })).not.toBeNull();
  });

  it('offers the sort button even when the time column is sortable, since its heading cannot sort', () => {
    const { unmount } = renderWithTheme(<LogViewer entries={entries('1')} columns={columns} showSort />);
    expect(screen.queryByRole('button', { name: /Sorted newest first/ })).toBeNull();
    unmount();
    renderWithTheme(<LogViewer entries={entries('1')} columns={columns} showSort hideHeading />);
    fireEvent.click(screen.getByRole('button', { name: /Sorted newest first/ }));
    expect(screen.getByRole('button', { name: /Sorted oldest first/ })).not.toBeNull();
  });

  it('still shows each entry on one line and opens it', () => {
    renderWithTheme(<LogViewer entries={[withText('1')]} columns={columns} hideHeading />);
    fireEvent.click(toggleFor('1'));
    expect(screen.getByRole('region', { name: 'Details for 1' })).not.toBeNull();
  });
});

describe('props and refs of the parts', () => {
  const Base = BaseLogViewer;

  it('passes className, data-* and other props to each part, and forwards its ref to it', () => {
    const refs = {
      toolbar: React.createRef<HTMLDivElement>(),
      stream: React.createRef<HTMLDivElement>(),
      search: React.createRef<HTMLDivElement>(),
      count: React.createRef<HTMLSpanElement>(),
      timeZone: React.createRef<HTMLDivElement>(),
      sort: React.createRef<HTMLButtonElement>(),
      download: React.createRef<HTMLButtonElement>(),
      refresh: React.createRef<HTMLButtonElement>(),
    };
    renderWithTheme(
      <Base entries={entries('1')} columns={defaultColumns}>
        <Base.Toolbar ref={refs.toolbar} className="custom toolbar" data-part="toolbar" id="toolbar-root">
          <Base.Search ref={refs.search} className="custom search" data-part="search" />
          <Base.Count ref={refs.count} className="custom count" data-part="count" />
          <Base.TimeZone ref={refs.timeZone} className="custom zone" data-part="zone" />
          <Base.Sort ref={refs.sort} className="custom sort" data-part="sort" />
          <Base.Download ref={refs.download} className="custom download" data-part="download" />
          <Base.Refresh ref={refs.refresh} className="custom refresh" data-part="refresh" />
        </Base.Toolbar>
        <Base.Stream ref={refs.stream} className="custom stream" data-part="stream" id="stream-root" />
      </Base>
    );

    const parts: Array<[keyof typeof refs, string, unknown]> = [
      ['toolbar', 'toolbar', HTMLDivElement],
      ['stream', 'stream', HTMLDivElement],
      ['search', 'search', HTMLDivElement],
      ['count', 'count', HTMLElement],
      ['timeZone', 'zone', HTMLDivElement],
      ['sort', 'sort', HTMLButtonElement],
      ['download', 'download', HTMLButtonElement],
      ['refresh', 'refresh', HTMLButtonElement],
    ];
    for (const [key, name, type] of parts) {
      const element = document.querySelector(`[data-part="${name}"]`);
      expect(element, `the ${name} element`).not.toBeNull();
      expect(element?.classList.contains('custom'), `${name} class`).toBe(true);
      expect(refs[key].current, `${name} ref`).toBe(element);
      expect(refs[key].current, `${name} ref type`).toBeInstanceOf(type as typeof HTMLElement);
    }
    expect(document.getElementById('toolbar-root')).toBe(refs.toolbar.current);
    expect(document.getElementById('stream-root')).toBe(refs.stream.current);
  });

  it('keeps the part\'s own styles when a consumer gives sx', () => {
    renderWithTheme(
      <Base entries={entries('1')} columns={defaultColumns}>
        <Base.Toolbar>
          <Base.Count data-part="count" sx={{ color: 'rgb(1, 2, 3)' }} />
        </Base.Toolbar>
        <Base.Stream />
      </Base>
    );
    const style = getComputedStyle(document.querySelector('[data-part="count"]') as HTMLElement);
    expect(style.color).toBe('rgb(1, 2, 3)');
    expect(style.marginLeft).not.toBe('');
  });

  it('lets a consumer disable the buttons, and still disables them itself while it must', () => {
    renderWithTheme(
      <Base entries={entries('1')} columns={defaultColumns}>
        <Base.Toolbar>
          <Base.Download disabled />
          <Base.Refresh disabled />
        </Base.Toolbar>
        <Base.Stream />
      </Base>
    );
    expect((screen.getByRole('button', { name: /^Download/ }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Refresh' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('writes the retry button and a toolbar filter button in sentence case, not in capitals', () => {
    /**
     * jsdom does not compute the styles emotion writes, so this reads them: the last `text-transform`
     * in the rules of the element's own generated classes is the one that applies. The viewer is
     * drawn with a plain MUI theme, where buttons are in capitals, because some Oxygen themes already
     * reset that and would hide a button that does not.
     */
    const textTransformOf = (element: Element): string | undefined => {
      const css = Array.from(document.querySelectorAll('style'))
        .map((style) => style.textContent ?? '')
        .join('\n');
      const rules = Array.from(element.classList)
        .filter((name) => name.startsWith('css-'))
        .flatMap((name) => css.match(new RegExp(`\\.${name}[^{]*\\{[^}]*\\}`, 'g')) ?? [])
        .join('\n');
      return Array.from(rules.matchAll(/text-transform:\s*([a-z-]+)/g)).pop()?.[1];
    };
    const status: LogFilterDefinition = {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [{ value: 'ok', label: 'Ok' }],
    };
    render(
      <ThemeProvider theme={createTheme()}>
        <LogViewer entries={[]} error="Could not load logs." onRetry={vi.fn()} filters={[status]} />
      </ThemeProvider>
    );
    const retry = within(screen.getByRole('alert')).getByRole('button', { name: 'Try again' });
    const filter = within(screen.getByRole('toolbar')).getByRole('button', { name: 'Status' });
    expect(textTransformOf(retry)).toBe('none');
    expect(textTransformOf(filter)).toBe('none');
  });

  it('gives the sticky heading a solid ground, in a rule that the heading of ListingTable cannot override', () => {
    // The heading of ListingTable sets a translucent background on `.MuiTableCell-head`. A plainer
    // selector loses to it, and rows scrolling under the sticky heading then show through.
    renderWithTheme(<LogViewer entries={entries('1')} />);
    const css = Array.from(document.querySelectorAll('style'))
      .map((style) => style.textContent ?? '')
      .join('\n');
    const rule = (css.match(/[^{}]*thead\s*>\s*tr\s*>\s*th\.MuiTableCell-head\s*\{[^}]*\}/g) ?? []).find((candidate) =>
      candidate.includes('background-color')
    );
    expect(rule).toBeDefined();
    expect(rule).not.toMatch(/background-color:\s*transparent/);
    expect(rule).toMatch(/background-color:\s*(rgb\(|var\(|#)/);
  });

  it('lets a consumer word the accessible names of the chips, the details and the tree buttons', () => {
    const status: LogFilterDefinition = {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [{ value: 'failure', label: 'Failure' }],
    };
    renderWithTheme(
      <Base
        entries={[entry('1', { details: { info: { category: 'general' } } })]}
        columns={defaultColumns}
        filters={[status]}
        filterValues={{ status: 'failure' }}
      >
        <Base.Toolbar
          changeFilterLabel={(name) => `Ändern: ${name}`}
          removeFilterLabel={(name) => `Entfernen: ${name}`}
        />
        <Base.Stream
          detailsLabel={(item) => `Einzelheiten zu ${item.id}`}
          expandNodeLabel="Aufklappen"
          collapseNodeLabel="Zuklappen"
        />
      </Base>
    );
    const group = screen.getByRole('group', { name: 'Applied filters' });
    expect(within(group).getByRole('button', { name: 'Status: Failure, Ändern: Status' })).not.toBeNull();
    expect(within(group).getByRole('button', { name: 'Entfernen: Status' })).not.toBeNull();

    fireEvent.click(toggleFor('1'));
    expect(screen.getByRole('region', { name: 'Einzelheiten zu 1' })).not.toBeNull();
    const collapse = screen.getByRole('button', { name: 'Zuklappen' });
    fireEvent.click(collapse);
    expect(screen.getByRole('button', { name: 'Aufklappen' })).not.toBeNull();
  });
});

describe('LogViewer root element', () => {
  const root = (container: HTMLElement) => container.firstElementChild as HTMLElement;

  it('forwards its ref to the outer element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = renderWithTheme(<BaseLogViewer ref={ref} entries={entries('1')} columns={defaultColumns} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(root(container));
    expect(ref.current?.querySelector('[data-entry-id="1"]')).not.toBeNull();
  });

  it('passes className, data-* and other props to the outer element', () => {
    const { container } = renderWithTheme(
      <BaseLogViewer
        entries={entries('1')}
        columns={defaultColumns}
        className="my-viewer"
        data-testid="viewer"
        data-area="logs"
        id="logs-viewer"
        role="region"
        aria-label="Application logs"
      />
    );
    const element = root(container);
    expect(element.classList.contains('my-viewer')).toBe(true);
    expect(element.getAttribute('data-testid')).toBe('viewer');
    expect(element.getAttribute('data-area')).toBe('logs');
    expect(element.id).toBe('logs-viewer');
    expect(screen.getByRole('region', { name: 'Application logs' })).toBe(element);
  });

  it('keeps its own look when props are passed, and still takes sx', () => {
    const { container } = renderWithTheme(
      <BaseLogViewer entries={entries('1')} columns={defaultColumns} className="x" sx={{ marginTop: '7px' }} />
    );
    const element = root(container);
    expect(element.classList.contains('MuiPaper-outlined')).toBe(true);
    expect(getComputedStyle(element).marginTop).toBe('7px');
  });
});

describe('LogViewer level marker color', () => {
  afterEach(() => document.documentElement.removeAttribute('data-color-scheme'));

  const colorOf = (level: string) => getComputedStyle(document.querySelector(`[data-level="${level}"]`) as HTMLElement).color;

  it('follows the active color scheme: the main color on dark, the darker shade on light', () => {
    renderWithTheme(<LogViewer entries={[entry('1', { level: 'info' }), entry('2', { level: 'error' })]} />);

    document.documentElement.setAttribute('data-color-scheme', 'dark');
    expect(colorOf('info')).toBe('var(--oxygen-palette-info-main)');
    expect(colorOf('error')).toBe('var(--oxygen-palette-error-main)');

    document.documentElement.setAttribute('data-color-scheme', 'light');
    expect(colorOf('info')).toBe('var(--oxygen-palette-info-dark)');
    expect(colorOf('error')).toBe('var(--oxygen-palette-error-dark)');
  });
});
