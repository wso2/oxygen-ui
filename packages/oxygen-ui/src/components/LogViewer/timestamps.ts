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

import type { LogTimeZone } from './types';

/**
 * The date format of the viewer, as a date-fns format string, for the date fields of the time range
 * picker. It is the date that `formatDisplay` and `formatShort` write, so a time reads the same in a row,
 * in a filter chip and in the picker.
 */
export const DATE_FORMAT = 'yyyy-MM-dd';

const pad = (value: number, length = 2): string => String(value).padStart(length, '0');

/**
 * The moment a timestamp stands for, or null when a string is not a date.
 */
export const toDate = (timestamp: string | Date): Date | null => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * A date moved so that its UTC fields read as the wall clock in the zone. Local time is the
 * browser's, found from the date's own offset, so daylight saving is handled for that moment.
 */
const wallClock = (date: Date, zone: LogTimeZone): { shifted: Date; offsetMinutes: number } => {
  const offsetMinutes = zone === 'utc' ? 0 : -date.getTimezoneOffset();
  return { shifted: new Date(date.getTime() + offsetMinutes * 60000), offsetMinutes };
};

const dateFields = (shifted: Date): string =>
  `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(shifted.getUTCDate())}`;

const timeFields = (shifted: Date): string =>
  `${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}:${pad(shifted.getUTCSeconds())}`;

const offsetText = (offsetMinutes: number): string => {
  const abs = Math.abs(offsetMinutes);
  return `${offsetMinutes < 0 ? '-' : '+'}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
};

/**
 * How a timestamp is shown in a row, for example "2026-10-15 08:16:55.622". A string that is not a
 * date is shown as it is.
 */
export const formatDisplay = (timestamp: string | Date, zone: LogTimeZone): string => {
  const date = toDate(timestamp);
  if (!date) return String(timestamp);
  const { shifted } = wallClock(date, zone);
  return `${dateFields(shifted)} ${timeFields(shifted)}.${pad(shifted.getUTCMilliseconds(), 3)}`;
};

/**
 * How a timestamp is written into copied and downloaded text: ISO 8601 with the zone, for example
 * "2026-10-15T08:16:55.622Z" or "2026-10-15T13:46:55.622+05:30", so a pasted line is unambiguous.
 */
export const formatIso = (timestamp: string | Date, zone: LogTimeZone): string => {
  const date = toDate(timestamp);
  if (!date) return String(timestamp);
  const { shifted, offsetMinutes } = wallClock(date, zone);
  const base = `${dateFields(shifted)}T${timeFields(shifted)}.${pad(shifted.getUTCMilliseconds(), 3)}`;
  if (offsetMinutes === 0) return `${base}Z`;
  return `${base}${offsetText(offsetMinutes)}`;
};

/**
 * A shorter form for filter chips, for example "2026-10-15 08:16:55". Local time adds its offset, for example
 * "2026-10-15 13:46:55 +05:30", because two moments an hour apart read the same where the clocks are set back.
 */
export const formatShort = (date: Date, zone: LogTimeZone): string => {
  const { shifted, offsetMinutes } = wallClock(date, zone);
  const base = `${dateFields(shifted)} ${timeFields(shifted)}`;
  return zone === 'utc' ? base : `${base} ${offsetText(offsetMinutes)}`;
};
