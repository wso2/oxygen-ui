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
import { render, cleanup, screen, fireEvent, waitFor, within } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import TimeRangeFilter from './TimeRangeFilter';
import type { TimeRange } from './TimeRangeFilter';

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
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
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

  it('opens a dialog, which is what the trigger announces', () => {
    renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
    openMenu();
    expect(screen.getByRole('dialog', { name: 'Time range' })).not.toBeNull();
  });

  it('moves focus into the list when it opens', async () => {
    renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
    openMenu();
    await waitFor(() => expect(document.activeElement?.getAttribute('role')).toBe('menuitem'));
  });

  it('stops highlighting the preset once the custom fields are open', () => {
    const now = Date.now();
    renderWithTheme(
      <TimeRangeFilter value={{ start: new Date(now - 24 * HOUR), end: new Date(now) }} onChange={() => undefined} />,
    );
    openMenu();
    expect(screen.getByText('Last 24 hours').classList.contains('Mui-selected')).toBe(true);
    fireEvent.click(screen.getByText('Custom'));
    expect(screen.getByText('Custom').classList.contains('Mui-selected')).toBe(true);
    expect(screen.getByText('Last 24 hours').classList.contains('Mui-selected')).toBe(false);
  });

  it('treats a fixed past range as custom, even when it is as long as a preset', () => {
    const end = Date.now() - 3 * 24 * HOUR;
    renderWithTheme(
      <TimeRangeFilter value={{ start: new Date(end - 24 * HOUR), end: new Date(end) }} onChange={() => undefined} />,
    );
    openMenu();
    expect(screen.getByText('Custom').classList.contains('Mui-selected')).toBe(true);
    expect(screen.getByText('Last 24 hours').classList.contains('Mui-selected')).toBe(false);
    expect(screen.getByRole('group', { name: 'Select date range' })).not.toBeNull();
  });

  it('still highlights the preset when the app set the range a little while ago', () => {
    const end = Date.now() - 2 * 60 * 1000;
    renderWithTheme(
      <TimeRangeFilter value={{ start: new Date(end - 24 * HOUR), end: new Date(end) }} onChange={() => undefined} />,
    );
    openMenu();
    expect(screen.getByText('Last 24 hours').classList.contains('Mui-selected')).toBe(true);
    expect(screen.queryByRole('group', { name: 'Select date range' })).toBeNull();
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

  it('keeps the time when the date is cleared, and the date when the time is cleared', () => {
    renderWithTheme(<TimeRangeFilter value={sampleRange} onChange={() => undefined} />);
    openCustomPopover();
    fireEvent.change(pickerInput('Start from (UTC)', 'Date'), { target: { value: '' } });
    expect(pickerInput('Start from (UTC)', 'Date').value).toBe('');
    expect(pickerInput('Start from (UTC)', 'Time').value).toBe('00:00:00');
    fireEvent.change(pickerInput('End on (UTC)', 'Time'), { target: { value: '' } });
    expect(pickerInput('End on (UTC)', 'Time').value).toBe('');
    expect(pickerInput('End on (UTC)', 'Date').value).toBe('13 Oct, 2026');
  });

  it('does not apply a range whose date is cleared', () => {
    const onChange = vi.fn();
    renderWithTheme(<TimeRangeFilter value={sampleRange} onChange={onChange} />);
    openCustomPopover();
    fireEvent.change(pickerInput('Start from (UTC)', 'Date'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('Choose a valid time range.')).not.toBeNull();
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
    expect(screen.getByText('Choose a range of at most 1 day.')).not.toBeNull();
    expect(onChange).not.toHaveBeenCalled();

    fillCustomRange('2026-10-11T00:00', '2026-10-12T00:00');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('uses its own text for a range that is too long', () => {
    renderWithTheme(
      <TimeRangeFilter value={null} onChange={() => undefined} maxRangeMs={24 * HOUR} rangeTooLongLabel="Too long" />,
    );
    openCustomPopover();
    fillCustomRange('2026-10-10T00:00', '2026-10-12T00:00');
    expect(screen.getByText('Too long')).not.toBeNull();
  });

  it('clears the error as soon as a field is edited', () => {
    renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
    openCustomPopover();
    fillCustomRange('2026-10-12T09:45', '2026-10-11T08:30');
    expect(screen.getByText('Choose a valid time range.')).not.toBeNull();
    fireEvent.change(pickerInput('End on (UTC)', 'Date'), { target: { value: '13 Oct, 2026' } });
    expect(screen.queryByText('Choose a valid time range.')).toBeNull();
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

  describe('controlled open', () => {
    it('opens and closes only as `open` says, and reports the requests', async () => {
      const onOpen = vi.fn();
      const onClose = vi.fn();
      const { rerender } = renderWithTheme(
        <TimeRangeFilter value={null} onChange={() => undefined} open={false} onOpen={onOpen} onClose={onClose} />
      );
      openMenu();
      expect(onOpen).toHaveBeenCalledTimes(1);
      // The page did not set `open`, so the picker stays closed.
      expect(screen.queryByText('Last hour')).toBeNull();

      rerender(
        <OxygenUIThemeProvider>
          <TimeRangeFilter value={null} onChange={() => undefined} open onOpen={onOpen} onClose={onClose} />
        </OxygenUIThemeProvider>
      );
      expect(screen.getByText('Last hour')).not.toBeNull();
      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
      // Still open: closing is up to the page.
      expect(screen.getByText('Last hour')).not.toBeNull();
    });

    it('closes itself after a choice when not controlled, and still reports it', async () => {
      const onClose = vi.fn();
      renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} onClose={onClose} />);
      openMenu();
      fireEvent.click(screen.getByText('Last hour'));
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('opens under `anchorEl` when it is given, for a control elsewhere such as a chip', () => {
      const Harness = () => {
        const [open, setOpen] = React.useState(false);
        const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
        return (
          <>
            <TimeRangeFilter
              value={sampleRange}
              onChange={() => undefined}
              open={open}
              anchorEl={anchor}
              onOpen={() => {
                setAnchor(null);
                setOpen(true);
              }}
              onClose={() => setOpen(false)}
              sx={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={(event) => {
                setAnchor(event.currentTarget);
                setOpen(true);
              }}
            >
              chip
            </button>
          </>
        );
      };
      renderWithTheme(<Harness />);
      fireEvent.click(screen.getByRole('button', { name: 'chip' }));
      expect(screen.getByText('Last hour')).not.toBeNull();
      expect(document.querySelector('.MuiPopover-root')).not.toBeNull();
    });
  });

  describe('as a button', () => {
    it('forwards its ref to the trigger button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(<TimeRangeFilter ref={ref} value={null} onChange={() => undefined} />);
      expect(ref.current).toBe(screen.getByRole('button', { name: /time range/i }));
    });

    it('passes className, data attributes and aria attributes to the trigger button', () => {
      renderWithTheme(
        <TimeRangeFilter
          value={null}
          onChange={() => undefined}
          className="mine"
          data-testid="range-trigger"
          id="range"
        />
      );
      const trigger = screen.getByTestId('range-trigger');
      expect(trigger.classList.contains('mine')).toBe(true);
      expect(trigger.id).toBe('range');
    });

    it('calls the onClick it is given as well as opening', () => {
      const onClick = vi.fn();
      renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} onClick={onClick} />);
      openMenu();
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Last hour')).not.toBeNull();
    });
  });

  describe('accessible names and state', () => {
    it('says it opens a menu, and whether it is open', () => {
      renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
      const trigger = screen.getByRole('button', { name: /time range/i });
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      fireEvent.click(trigger);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('names the list of choices after the trigger label', () => {
      renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} label="Period" />);
      fireEvent.click(screen.getByRole('button', { name: 'Period' }));
      expect(screen.getByRole('menu', { name: 'Period' })).not.toBeNull();
    });

    it('names the custom range panel and each end of the range', () => {
      renderWithTheme(<TimeRangeFilter value={null} onChange={() => undefined} />);
      openCustomPopover();
      expect(screen.getByRole('group', { name: 'Select date range' })).not.toBeNull();
      expect(screen.getByRole('group', { name: 'Start from (UTC)' })).not.toBeNull();
      expect(screen.getByRole('group', { name: 'End on (UTC)' })).not.toBeNull();
      expect(screen.getByRole('menuitem', { name: 'Custom' }).getAttribute('aria-expanded')).toBe('true');
    });
  });
});
