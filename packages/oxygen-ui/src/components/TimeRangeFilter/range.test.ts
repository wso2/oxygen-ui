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

import { afterEach, describe, expect, it } from 'vitest';
import {
  checkCustomRange,
  describeSpan,
  fromPickerDate,
  instantOf,
  resolveActiveId,
  toPickerDate,
  toRangeEnd,
  DAY_MS,
  HOUR_MS,
  PRESET_END_TOLERANCE_MS,
  type TimeRangePreset,
} from './range';

const originalZone = process.env.TZ;

/** The pickers work in local time, so these rules depend on the zone. It is set for the test and put back after. */
const inZone = (zone: string) => {
  process.env.TZ = zone;
};

afterEach(() => {
  if (originalZone === undefined) delete process.env.TZ;
  else process.env.TZ = originalZone;
});

const utc = (iso: string) => new Date(iso);

describe('describeSpan', () => {
  it.each([
    [DAY_MS, '1 day'],
    [3 * DAY_MS, '3 days'],
    [HOUR_MS, '1 hour'],
    [36 * HOUR_MS, '36 hours'],
    [90 * 1000, '2 minutes'],
    [60 * 1000, '1 minute'],
    [1000, '1 minute'],
  ])('%d ms is %s', (ms, expected) => {
    expect(describeSpan(ms)).toBe(expected);
  });
});

describe('the UTC instant as the pickers show it', () => {
  it.each(['UTC', 'Asia/Kolkata', 'America/New_York', 'Pacific/Auckland'])('goes to the picker and back unchanged in %s', (zone) => {
    inZone(zone);
    const instant = utc('2026-06-01T10:30:15Z');

    expect(fromPickerDate(toPickerDate(instant)).getTime()).toBe(instant.getTime());
  });

  it('shows the UTC wall clock as the local date, whatever the zone', () => {
    inZone('Asia/Kolkata');
    const shown = toPickerDate(utc('2026-06-01T10:30:15Z'));

    expect([shown.getFullYear(), shown.getMonth(), shown.getDate(), shown.getHours(), shown.getMinutes(), shown.getSeconds()]).toEqual([2026, 5, 1, 10, 30, 15]);
  });

  it('moves a UTC time that falls in the local hour skipped by daylight saving an hour later, the documented limit', () => {
    inZone('America/New_York');
    // On 2026-03-08 the clocks go from 02:00 to 03:00 in New York, so 02:30 does not exist there.
    const skipped = utc('2026-03-08T02:30:00Z');

    expect(fromPickerDate(toPickerDate(skipped)).getTime()).toBe(skipped.getTime() + HOUR_MS);
  });

  it('keeps a UTC time on the day of the change that falls outside the skipped hour', () => {
    inZone('America/New_York');
    const after = utc('2026-03-08T12:00:00Z');

    expect(fromPickerDate(toPickerDate(after)).getTime()).toBe(after.getTime());
  });
});

describe('instantOf', () => {
  it('takes the day from the date field and the time of day from the time field, as UTC', () => {
    inZone('Asia/Kolkata');

    expect(
      instantOf({ date: toPickerDate(utc('2026-06-01T23:59:59Z')), time: toPickerDate(utc('2020-01-01T08:15:30Z')) })?.toISOString(),
    ).toBe('2026-06-01T08:15:30.000Z');
  });

  it('is the instant the end was made from', () => {
    const instant = utc('2026-06-01T10:30:15Z');

    expect(instantOf(toRangeEnd(instant))?.getTime()).toBe(instant.getTime());
  });

  it.each([
    ['no date', { date: null, time: new Date() }],
    ['no time', { date: new Date(), time: null }],
    ['a date still being typed', { date: new Date(NaN), time: new Date() }],
    ['a time still being typed', { date: new Date(), time: new Date(NaN) }],
  ])('is null with %s', (_label, end) => {
    expect(instantOf(end)).toBeNull();
  });
});

describe('resolveActiveId', () => {
  const presets: TimeRangePreset[] = [
    { id: '1h', label: 'Last hour', durationMs: HOUR_MS },
    { id: '24h', label: 'Last 24 hours', durationMs: DAY_MS },
  ];
  const now = utc('2026-06-01T12:00:00Z').getTime();
  const rangeEndingAt = (end: number, durationMs: number) => ({ start: new Date(end - durationMs), end: new Date(end) });

  it('highlights nothing without a range', () => {
    expect(resolveActiveId(null, null, presets, now)).toBeNull();
    expect(resolveActiveId(undefined, null, presets, now)).toBeNull();
  });

  it('keeps the choice made here while it still matches the range', () => {
    const value = rangeEndingAt(now - 3 * DAY_MS, DAY_MS);
    const selection = { id: 'custom', start: value.start.getTime(), end: value.end.getTime() };

    expect(resolveActiveId(value, selection, presets, now)).toBe('custom');
  });

  it('drops the choice once the range is no longer the one it produced', () => {
    const value = rangeEndingAt(now, HOUR_MS);
    const selection = { id: '24h', start: now - DAY_MS, end: now };

    expect(resolveActiveId(value, selection, presets, now)).toBe('1h');
  });

  it('highlights the preset of the same length that ends about now', () => {
    expect(resolveActiveId(rangeEndingAt(now, DAY_MS), null, presets, now)).toBe('24h');
    expect(resolveActiveId(rangeEndingAt(now - PRESET_END_TOLERANCE_MS, DAY_MS), null, presets, now)).toBe('24h');
  });

  it('calls it custom once the end is older than the tolerance', () => {
    expect(resolveActiveId(rangeEndingAt(now - PRESET_END_TOLERANCE_MS - 1, DAY_MS), null, presets, now)).toBe('custom');
  });

  it('calls a range of no preset length custom', () => {
    expect(resolveActiveId(rangeEndingAt(now, 5 * HOUR_MS), null, presets, now)).toBe('custom');
  });
});

describe('checkCustomRange', () => {
  const start = utc('2026-06-01T00:00:00Z');
  const end = utc('2026-06-02T00:00:00Z');

  it('accepts a range that ends after it starts', () => {
    expect(checkCustomRange(start, end)).toBeNull();
  });

  it.each([
    ['an end that is missing', null, end],
    ['a start that is missing', start, null],
    ['an end equal to the start', start, start],
    ['an end before the start', end, start],
    ['a date that is not a number', new Date(NaN), end],
  ])('rejects %s as invalid', (_label, from, until) => {
    expect(checkCustomRange(from, until)).toBe('invalid');
  });

  it('rejects a range longer than the longest allowed, and accepts one exactly as long', () => {
    expect(checkCustomRange(start, end, DAY_MS - 1)).toBe('too-long');
    expect(checkCustomRange(start, end, DAY_MS)).toBeNull();
  });
});
