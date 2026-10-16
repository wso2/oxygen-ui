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
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, screen, fireEvent, act, waitFor, within } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import TimeRangeFilter from './TimeRangeFilter';
import type { TimeRange, TimeRangeFilterHandle } from './TimeRangeFilter';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

const HOUR = 60 * 60 * 1000;
const sampleRange: TimeRange = {
  start: new Date('2026-10-12T00:00:00Z'),
  end: new Date('2026-10-13T00:00:00Z'),
};

// Five hours long, so it matches none of the default presets.
const oddRange: TimeRange = {
  start: new Date('2026-10-12T00:00:00Z'),
  end: new Date('2026-10-12T05:00:00Z'),
};

const openMenu = () => fireEvent.click(screen.getByRole('button', { name: /time range/i }));

const openCustomPopover = () => {
  openMenu();
  fireEvent.click(screen.getByText('Custom'));
};

/**
 * The hidden input that holds the value of a picker field. A field is found by its label, inside
 * the group of the end of the range it belongs to ("Start from (UTC)" or "End on (UTC)").
 */
const pickerInput = (end: string, field: string): HTMLInputElement => {
  const group = within(screen.getByRole('group', { name: end })).getByRole('group', { name: field });
  return group.closest('.MuiPickersTextField-root')!.querySelector('input') as HTMLInputElement;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** What a date field reads for an ISO-like `yyyy-MM-ddTHH:mm`: `11 Oct, 2026`. Empty stays empty. */
const dateText = (value: string) =>
  value ? `${value.slice(8, 10)} ${MONTHS[Number(value.slice(5, 7)) - 1]}, ${value.slice(0, 4)}` : '';

/** What a time field reads for an ISO-like `yyyy-MM-ddTHH:mm`: `08:30:00`. Empty stays empty. */
const timeText = (value: string) => (value ? `${value.slice(11, 16)}:00` : '');

/** Types an ISO-like `yyyy-MM-ddTHH:mm` into the date and time fields of one end of the range. */
const fillEnd = (heading: string, dateField: string, timeField: string, value: string) => {
  fireEvent.change(pickerInput(heading, dateField), { target: { value: dateText(value) } });
  fireEvent.change(pickerInput(heading, timeField), { target: { value: timeText(value) } });
};

const fillCustomRange = (from: string, until: string) => {
  fillEnd('Start from (UTC)', 'Date', 'Time', from);
  fillEnd('End on (UTC)', 'Date', 'Time', until);
  fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
};

afterEach(() => {
  cleanup();
});

describe('TimeRangeFilter', () => {
  it('renders the trigger button with the menu closed', () => {
    renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
    const trigger = screen.getByRole('button', { name: /time range/i });
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('Last hour')).toBeNull();
  });

  it('lists the default presets and the custom range item', () => {
    renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
    openMenu();
    for (const text of ['Last hour', 'Last 24 hours', 'Last 7 days', 'Last 30 days', 'Custom']) {
      expect(screen.getByText(text)).not.toBeNull();
    }
  });

  it('reports a preset as a range ending now', () => {
    const onChange = vi.fn();
    const before = Date.now();
    renderWithTheme(<TimeRangeFilter value={null} onChange={onChange} />);
    openMenu();
    fireEvent.click(screen.getByText('Last hour'));

    expect(onChange).toHaveBeenCalledTimes(1);
    const range: TimeRange = onChange.mock.calls[0][0];
    expect(range.end.getTime() - range.start.getTime()).toBe(HOUR);
    expect(range.end.getTime()).toBeGreaterThanOrEqual(before);
    expect(range.end.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('uses the presets it is given', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <TimeRangeFilter
        value={null}
        onChange={onChange}
        presets={[{ id: '15m', label: 'Last 15 minutes', durationMs: 15 * 60 * 1000 }]}
      />,
    );
    openMenu();
    expect(screen.queryByText('Last hour')).toBeNull();
    fireEvent.click(screen.getByText('Last 15 minutes'));
    const range: TimeRange = onChange.mock.calls[0][0];
    expect(range.end.getTime() - range.start.getTime()).toBe(15 * 60 * 1000);
  });

  it('highlights the chosen preset, and nothing once the range is cleared', () => {
    const Harness = () => {
      const [value, setValue] = React.useState<TimeRange | null>(null);
      return (
        <>
          <TimeRangeFilter value={value} onChange={setValue} />
          <button onClick={() => setValue(null)}>clear</button>
        </>
      );
    };
    renderWithTheme(<Harness />);
    openMenu();
    fireEvent.click(screen.getByText('Last 24 hours'));

    openMenu();
    expect(screen.getByText('Last 24 hours').classList.contains('Mui-selected')).toBe(true);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    fireEvent.click(screen.getByText('clear'));
    openMenu();
    expect(screen.getByText('Last 24 hours').classList.contains('Mui-selected')).toBe(false);
  });

  it('highlights the preset matching a range set by the consumer, else custom', () => {
    const now = Date.now();
    const { rerender } = renderWithTheme(
      <TimeRangeFilter
        value={{ start: new Date(now - 24 * HOUR), end: new Date(now) }}
        onChange={() => undefined}
      />,
    );
    openMenu();
    expect(screen.getByText('Last 24 hours').classList.contains('Mui-selected')).toBe(true);
    expect(screen.getByText('Custom').classList.contains('Mui-selected')).toBe(false);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    rerender(
      <OxygenUIThemeProvider>
        <TimeRangeFilter value={oddRange} onChange={() => undefined} />
      </OxygenUIThemeProvider>,
    );
    openMenu();
    expect(screen.getByText('Custom').classList.contains('Mui-selected')).toBe(true);
    expect(screen.getByText('Last 24 hours').classList.contains('Mui-selected')).toBe(false);
  });

  it('stops highlighting a choice once the consumer changes the range', () => {
    const Harness = () => {
      const [value, setValue] = React.useState<TimeRange | null>(null);
      return (
        <>
          <TimeRangeFilter value={value} onChange={setValue} />
          <button onClick={() => setValue(oddRange)}>replace</button>
        </>
      );
    };
    renderWithTheme(<Harness />);
    openMenu();
    fireEvent.click(screen.getByText('Last hour'));
    fireEvent.click(screen.getByText('replace'));

    openMenu();
    expect(screen.getByText('Last hour').classList.contains('Mui-selected')).toBe(false);
    expect(screen.getByText('Custom').classList.contains('Mui-selected')).toBe(true);
  });

  it('applies a custom range, reading the entered values as UTC', async () => {
    const onChange = vi.fn();
    renderWithTheme(<TimeRangeFilter value={null} onChange={onChange} />);
    openCustomPopover();
    fillCustomRange('2026-10-11T08:30', '2026-10-12T09:45');

    expect(onChange).toHaveBeenCalledTimes(1);
    const range: TimeRange = onChange.mock.calls[0][0];
    expect(range.start.toISOString()).toBe('2026-10-11T08:30:00.000Z');
    expect(range.end.toISOString()).toBe('2026-10-12T09:45:00.000Z');
    await waitFor(() => expect(screen.queryByRole('group', { name: 'Select date range' })).toBeNull());
  });

  it('starts the custom fields from the current range', () => {
    renderWithTheme(<TimeRangeFilter value={sampleRange} onChange={() => undefined} />);
    openCustomPopover();
    expect(pickerInput('Start from (UTC)', 'Date').value).toBe('12 Oct, 2026');
    expect(pickerInput('Start from (UTC)', 'Time').value).toBe('00:00:00');
    expect(pickerInput('End on (UTC)', 'Date').value).toBe('13 Oct, 2026');
    expect(pickerInput('End on (UTC)', 'Time').value).toBe('00:00:00');
  });

  it('rejects an empty or reversed custom range', () => {
    const onChange = vi.fn();
    renderWithTheme(<TimeRangeFilter value={null} onChange={onChange} />);
    openCustomPopover();
    fillCustomRange('2026-10-12T09:45', '2026-10-11T08:30');
    expect(screen.getByText('Choose a valid time range.')).not.toBeNull();

    fillCustomRange('', '');
    expect(screen.getByText('Choose a valid time range.')).not.toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('rejects a custom range longer than maxRangeMs', () => {
    const onChange = vi.fn();
    renderWithTheme(<TimeRangeFilter value={null} onChange={onChange} maxRangeMs={24 * HOUR} />);
    openCustomPopover();
    fillCustomRange('2026-10-10T00:00', '2026-10-12T00:00');
    expect(screen.getByText('Choose a valid time range.')).not.toBeNull();
    expect(onChange).not.toHaveBeenCalled();

    fillCustomRange('2026-10-11T00:00', '2026-10-12T00:00');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('uses custom labels', () => {
    renderWithTheme(
      <TimeRangeFilter
        value={null}
        onChange={() => undefined}
        label="Period"
        customRangeLabel="Pick dates"
        panelTitle="Zeitraum"
        fromLabel="Start"
        untilLabel="Finish"
        dateLabel="Tag"
        timeLabel="Zeit"
        applyLabel="Go"
        cancelLabel="Stop"
        invalidRangeLabel="Bad dates"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Period' }));
    fireEvent.click(screen.getByText('Pick dates'));
    expect(screen.getByRole('group', { name: 'Zeitraum' })).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Stop' })).not.toBeNull();
    fillEnd('Start', 'Tag', 'Zeit', '2026-10-12T00:00');
    fillEnd('Finish', 'Tag', 'Zeit', '2026-10-11T00:00');
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(screen.getByText('Bad dates')).not.toBeNull();
  });

  it('shows the custom range fields only once Custom is chosen', () => {
    renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
    openMenu();
    expect(screen.queryByRole('group', { name: 'Select date range' })).toBeNull();
    const custom = screen.getByRole('menuitem', { name: 'Custom' });
    expect(custom.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(custom);
    expect(screen.getByRole('group', { name: 'Select date range' })).not.toBeNull();
    expect(custom.getAttribute('aria-expanded')).toBe('true');
    // The presets stay in view beside the fields.
    expect(screen.getByText('Last hour')).not.toBeNull();
  });

  it('shows the custom range fields at once when the current range is a custom one', () => {
    renderWithTheme(<TimeRangeFilter value={oddRange} onChange={() => undefined} />);
    openMenu();
    expect(screen.getByRole('group', { name: 'Select date range' })).not.toBeNull();
  });

  it('closes without applying when Cancel is used', async () => {
    const onChange = vi.fn();
    renderWithTheme(<TimeRangeFilter value={null} onChange={onChange} />);
    openCustomPopover();
    fillEnd('Start from (UTC)', 'Date', 'Time', '2026-10-11T08:30');
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => expect(screen.queryByRole('group', { name: 'Select date range' })).toBeNull());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('closes after a preset is chosen', async () => {
    renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
    openMenu();
    fireEvent.click(screen.getByText('Last hour'));
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  });

  it('reads seconds as well as minutes in a custom range', () => {
    const onChange = vi.fn();
    renderWithTheme(<TimeRangeFilter value={null} onChange={onChange} />);
    openCustomPopover();
    fireEvent.change(pickerInput('Start from (UTC)', 'Date'), { target: { value: '11 Oct, 2026' } });
    fireEvent.change(pickerInput('Start from (UTC)', 'Time'), { target: { value: '08:30:15' } });
    fireEvent.change(pickerInput('End on (UTC)', 'Date'), { target: { value: '11 Oct, 2026' } });
    fireEvent.change(pickerInput('End on (UTC)', 'Time'), { target: { value: '09:45:45' } });
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
    const range: TimeRange = onChange.mock.calls[0][0];
    expect(range.start.toISOString()).toBe('2026-10-11T08:30:15.000Z');
    expect(range.end.toISOString()).toBe('2026-10-11T09:45:45.000Z');
  });

  it('can be disabled', () => {
    renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} disabled />);
    expect((screen.getByRole('button', { name: /time range/i }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });

  it('opens the picker from outside through its ref', async () => {
    const ref = React.createRef<TimeRangeFilterHandle>();
    renderWithTheme(<TimeRangeFilter ref={ref} value={null} onChange={() => undefined} />);
    expect(screen.queryByText('Last hour')).toBeNull();

    act(() => ref.current?.open());
    expect(screen.getByText('Last hour')).not.toBeNull();

    act(() => ref.current?.close());
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  });
});
