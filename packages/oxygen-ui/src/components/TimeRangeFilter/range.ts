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

/**
 * A closed time range. `end` is later than `start`.
 */
export interface TimeRange {
  start: Date;
  end: Date;
}

/**
 * A quick choice that spans a fixed duration ending now (e.g. "Last 24 hours").
 */
export interface TimeRangePreset {
  /** Stable identifier of the preset. */
  id: string;
  /** Text shown in the list. */
  label: string;
  /** Length of the range in milliseconds. */
  durationMs: number;
}

export const HOUR_MS = 60 * 60 * 1000;
export const DAY_MS = 24 * HOUR_MS;

export const DEFAULT_PRESETS: TimeRangePreset[] = [
  { id: '1h', label: 'Last hour', durationMs: HOUR_MS },
  { id: '24h', label: 'Last 24 hours', durationMs: DAY_MS },
  { id: '7d', label: 'Last 7 days', durationMs: 7 * DAY_MS },
  { id: '30d', label: 'Last 30 days', durationMs: 30 * DAY_MS },
];

export const CUSTOM_ID = 'custom';

/** A length of time in the largest whole unit it fits, for the message about the longest range. */
export const describeSpan = (ms: number): string => {
  const unit = (count: number, name: string) => `${count} ${name}${count === 1 ? '' : 's'}`;
  if (ms % DAY_MS === 0) return unit(ms / DAY_MS, 'day');
  if (ms % HOUR_MS === 0) return unit(ms / HOUR_MS, 'hour');
  return unit(Math.max(1, Math.round(ms / 60000)), 'minute');
};

/**
 * How far from now the end of a range set by the app may be for it to count as a preset ("Last 24
 * hours" and so on). A preset always ends now, so a range of the same length that ended earlier is a
 * custom one. The margin covers a range the app set a little while before the picker is opened.
 */
export const PRESET_END_TOLERANCE_MS = 5 * 60 * 1000;

/** The choice made in the list, with the range it produced. */
export interface Selection {
  id: string;
  start: number;
  end: number;
}

/**
 * The MUI pickers work in local time. To enter and read UTC, a UTC instant is shown as the local
 * date with the same year, month, day, hour, minute and second, and converted back on change.
 *
 * Limit: in a time zone with daylight saving time, a UTC time that falls in the local hour that is
 * skipped when the clocks go forward (for example 02:30 on that day in the US) does not exist as a
 * local date, so the field shows it an hour later. Pick a range that avoids that hour, or one on
 * another day.
 */
export const toPickerDate = (date: Date): Date =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );

export const fromPickerDate = (date: Date): Date =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ),
  );

/** One end of the custom range as the two fields hold it: each keeps its own value while it is edited. */
export interface RangeEnd {
  date: Date | null;
  time: Date | null;
}

export const toRangeEnd = (date: Date): RangeEnd => {
  const picker = toPickerDate(date);
  return { date: picker, time: picker };
};

/** A field's value, or null while it is empty or only partly typed. */
export const validDate = (date: Date | null): Date | null =>
  date && !Number.isNaN(date.getTime()) ? date : null;

/** The instant of an end, once both its date and its time are complete; null until then. */
export const instantOf = (rangeEnd: RangeEnd): Date | null => {
  const date = validDate(rangeEnd.date);
  const time = validDate(rangeEnd.time);
  if (!date || !time) return null;
  return fromPickerDate(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds()),
  );
};

/**
 * Which choice to highlight. The choice made here while it still matches the value. Otherwise (a range the
 * consumer set, or one it changed since) the preset of the same length that ends about `now`, or custom. A fixed
 * past range is custom, whatever its length.
 */
export const resolveActiveId = (
  value: TimeRange | null | undefined,
  selection: Selection | null,
  presets: TimeRangePreset[],
  now: number,
): string | null => {
  if (!value) return null;
  if (selection && selection.start === value.start.getTime() && selection.end === value.end.getTime()) return selection.id;

  return (
    presets.find(
      (preset) =>
        preset.durationMs === value.end.getTime() - value.start.getTime() &&
        Math.abs(now - value.end.getTime()) <= PRESET_END_TOLERANCE_MS,
    )?.id ?? CUSTOM_ID
  );
};

/** What is wrong with a custom range, if anything: an end not complete, an end not after its start, or too long. */
export const checkCustomRange = (start: Date | null, end: Date | null, maxRangeMs?: number): 'invalid' | 'too-long' | null => {
  const span = start && end ? end.getTime() - start.getTime() : NaN;
  if (!start || !end || !Number.isFinite(span) || span <= 0) return 'invalid';
  if (maxRangeMs !== undefined && span > maxRangeMs) return 'too-long';
  return null;
};
