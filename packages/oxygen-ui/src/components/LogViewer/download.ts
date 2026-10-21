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

import { formatIso } from './timestamps';
import type { LogColumn, LogEntry, LogLevel, LogTimeZone } from './types';

/**
 * The plain text of one column of an entry: the ISO 8601 time, the level's name, or the column's
 * `text`. Without `text`, the result of `render` when that is a string or a number.
 */
const columnText = (
  column: LogColumn,
  entry: LogEntry,
  timeZone: LogTimeZone,
  levelLabels: Record<LogLevel, string>
): string => {
  if (column.text) return column.text(entry);
  if (column.render) {
    const content = column.render(entry);
    return typeof content === 'string' || typeof content === 'number' ? String(content) : '';
  }
  if (column.id === 'time') return formatIso(entry.timestamp, timeZone);
  if (column.id === 'level') return entry.level ? levelLabels[entry.level] : '';
  return '';
};

/**
 * The plain text of an entry: its `copyText`, or the text of its columns joined by spaces. Entries
 * with no text have none.
 */
export const entryText = (
  entry: LogEntry,
  columns: LogColumn[],
  timeZone: LogTimeZone,
  levelLabels: Record<LogLevel, string>
): string | undefined => {
  if (entry.copyText !== undefined) return entry.copyText;
  const text = columns
    .map((column) => columnText(column, entry, timeZone, levelLabels))
    .filter((part) => part !== '')
    .join(' ');
  return text === '' ? undefined : text;
};

/**
 * One line per entry that has text, in the order given.
 */
export const buildLogText = (
  entries: LogEntry[],
  columns: LogColumn[],
  timeZone: LogTimeZone,
  levelLabels: Record<LogLevel, string>
): string =>
  entries
    .map((entry) => entryText(entry, columns, timeZone, levelLabels))
    .filter((text): text is string => text !== undefined)
    .join('\n');

/**
 * Saves text as a file through the browser. Does nothing outside a browser.
 */
export const saveTextFile = (text: string, fileName: string): void => {
  if (typeof document === 'undefined') return;
  const url = URL.createObjectURL(new Blob([`${text}\n`], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
