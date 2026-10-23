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

import type { LogColumn } from './types';

/** The face the entries are set in. */
export const MONOSPACE = "'Consolas', 'Monaco', 'Courier New', monospace";

/** Width of the time column: YYYY-MM-DD HH:MM:SS.mmm in the monospace face. */
const TIME_TRACK = '24ch';
/** Width of the level column. */
const LEVEL_TRACK = '124px';

/** The narrowest a column without a width of its own gets, in pixels, before the list scrolls sideways. */
const MIN_COLUMN_PX = 140;
/** Space before the first column (the chevron) and after the last, in pixels. */
const ROW_PADDING_PX = 36 + 16;
/** Space between two columns, in pixels. */
const COLUMN_GAP_PX = 16;

/** A grid track size for a column. A flexible track never gets narrower than `MIN_COLUMN_PX`. */
const track = ({ id, width }: LogColumn): string => {
  if (width === undefined) {
    if (id === 'time') return TIME_TRACK;
    if (id === 'level') return LEVEL_TRACK;
    return `minmax(${MIN_COLUMN_PX}px, 1fr)`;
  }
  if (typeof width === 'number') return `${width}px`;
  return width.endsWith('fr') ? `minmax(${MIN_COLUMN_PX}px, ${width})` : width;
};

/**
 * The width of a column as a CSS length, or `undefined` when the column takes a share of what is
 * left. Used for the `<col>` of the table, which sizes its columns.
 */
export const columnWidth = (column: LogColumn): string | undefined => {
  const size = track(column);
  return size.startsWith('minmax(') ? undefined : size;
};

/**
 * The narrowest width the columns, their gaps and the row padding fit in, as a CSS length. A list
 * narrower than this scrolls sideways, and its heading row scrolls with it.
 */
export const columnsMinWidth = (columns: LogColumn[]): string => {
  const parts = columns.map((column) => {
    const size = track(column);
    return size.startsWith('minmax(') ? `${MIN_COLUMN_PX}px` : size;
  });
  const gaps = COLUMN_GAP_PX * (columns.length - 1);
  return `calc(${parts.join(' + ')} + ${gaps + ROW_PADDING_PX}px)`;
};

/**
 * The heading of a column: its label, or the standard one for the built-in columns.
 */
export const columnLabel = (column: LogColumn): string =>
  column.label ?? (column.id === 'time' ? 'Time' : column.id === 'level' ? 'Level' : column.id);
