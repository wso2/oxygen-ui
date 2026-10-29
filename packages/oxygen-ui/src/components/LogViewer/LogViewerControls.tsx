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
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Download, RefreshCw } from '@wso2/oxygen-ui-icons-react';
import { useLogViewerRequired } from './context';
import { buildLogText, saveTextFile } from './download';
import type { LogEntry, LogTimeZone } from './types';

/**
 * Props for LogViewer.Count. The rest of the props go to the text element.
 */
export interface LogViewerCountProps extends Omit<React.ComponentProps<typeof Typography>, 'children'> {
  /**
   * Text of the count, for the number of loaded entries. Use it to add a unit or a note such as the
   * time zone.
   * @default (count) => `${count} entries loaded`
   */
  label?: (count: number) => string;
}

const defaultCountLabel = (count: number): string => `${count} ${count === 1 ? 'entry' : 'entries'} loaded`;

/**
 * LogViewer.Count - The number of loaded entries. In the toolbar it sits on the left, after the
 * filters, wherever it is placed among the other controls. It passes `className`, `data-*` and other
 * text props to its element, and forwards its `ref` to it.
 */
export const LogViewerCount = React.forwardRef<HTMLSpanElement, LogViewerCountProps>(function LogViewerCount(
  { label = defaultCountLabel, sx, ...props },
  ref,
) {
  const { count, awaitingRange } = useLogViewerRequired();
  // Before a range is chosen, a count of 0 would read as a result.
  if (awaitingRange) return null;
  return (
    <Typography
      ref={ref}
      variant="body2"
      color="text.secondary"
      {...props}
      sx={[{ ml: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {label(count)}
    </Typography>
  );
});
LogViewerCount.displayName = 'LogViewerCount';

/**
 * Props for LogViewer.TimeZone. The rest of the props go to the switch.
 */
export interface LogViewerTimeZoneProps
  extends Omit<
    React.ComponentProps<typeof ToggleButtonGroup>,
    'children' | 'value' | 'exclusive' | 'onChange' | 'aria-label'
  > {
  /**
   * Accessible name of the switch.
   * @default 'Time zone'
   */
  label?: string;
  /**
   * Text of the UTC choice.
   * @default 'UTC'
   */
  utcLabel?: string;
  /**
   * Text of the local time choice.
   * @default 'Local'
   */
  localLabel?: string;
}

/**
 * LogViewer.TimeZone - The UTC and Local switch. It changes the zone timestamps are shown in; set
 * `timeZone` and `onTimeZoneChange` on the LogViewer to control it. It passes `className`, `data-*` and
 * other switch props to its element, and forwards its `ref` to it.
 */
export const LogViewerTimeZone = React.forwardRef<HTMLDivElement, LogViewerTimeZoneProps>(function LogViewerTimeZone(
  { label = 'Time zone', utcLabel = 'UTC', localLabel = 'Local', sx, ...props },
  ref,
) {
  const { timeZone, setTimeZone } = useLogViewerRequired();
  return (
    <ToggleButtonGroup
      ref={ref}
      size="small"
      {...props}
      exclusive
      value={timeZone}
      aria-label={label}
      onChange={(_event, next: LogTimeZone | null) => {
        if (next) setTimeZone(next);
      }}
      sx={[
        {
          mr: 0.5,
          '& .MuiToggleButton-root': {
            height: 24,
            py: 0,
            px: 1,
            fontSize: '0.75rem',
            textTransform: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <ToggleButton value="utc">{utcLabel}</ToggleButton>
      <ToggleButton value="local">{localLabel}</ToggleButton>
    </ToggleButtonGroup>
  );
});
LogViewerTimeZone.displayName = 'LogViewerTimeZone';

/**
 * Props for LogViewer.Sort. The rest of the props go to the button.
 */
export interface LogViewerSortProps
  extends Omit<React.ComponentProps<typeof IconButton>, 'children' | 'onClick' | 'aria-label'> {
  /**
   * Accessible name and tooltip while the newest entries are first.
   * @default 'Sorted newest first. Switch to oldest first'
   */
  newestFirstLabel?: string;
  /**
   * Accessible name and tooltip while the oldest entries are first.
   * @default 'Sorted oldest first. Switch to newest first'
   */
  oldestFirstLabel?: string;
}

/**
 * LogViewer.Sort - A button that switches between newest first and oldest first. It is not shown
 * when the `time` column is sortable, because that column's heading does the same, unless the
 * heading is hidden. It passes `className`, `data-*` and other button props to the button, and forwards
 * its `ref` to it.
 */
export const LogViewerSort = React.forwardRef<HTMLButtonElement, LogViewerSortProps>(function LogViewerSort(
  {
    newestFirstLabel = 'Sorted newest first. Switch to oldest first',
    oldestFirstLabel = 'Sorted oldest first. Switch to newest first',
    ...props
  },
  ref,
) {
  const { order, toggleOrder, columns, hideHeading } = useLogViewerRequired();
  // The time heading does the same, unless the heading is hidden.
  if (!hideHeading && columns.some((column) => column.id === 'time' && column.sortable)) return null;
  const newestFirst = order === 'newest-first';
  const label = newestFirst ? newestFirstLabel : oldestFirstLabel;
  return (
    <Tooltip title={label}>
      <IconButton ref={ref} size="small" {...props} aria-label={label} onClick={toggleOrder}>
        {newestFirst ? <ArrowDownWideNarrow size={16} /> : <ArrowUpNarrowWide size={16} />}
      </IconButton>
    </Tooltip>
  );
});
LogViewerSort.displayName = 'LogViewerSort';

/**
 * Props for LogViewer.Download. The rest of the props go to the button.
 */
export interface LogViewerDownloadProps
  extends Omit<React.ComponentProps<typeof IconButton>, 'children' | 'onClick' | 'aria-label'> {
  /**
   * Accessible name and tooltip. Use a function to say what the download holds: it receives the
   * number of loaded entries and whether older ones are still to load.
   * @default 'Download the N loaded entries', with 'Older entries are not included' added while
   * older entries remain
   */
  label?: string | ((info: { count: number; hasMoreOlder: boolean }) => string);
  /**
   * Replaces the default download, which saves the loaded entries, in the order shown, as a text
   * file with one line per entry. Called with the loaded entries in the order shown.
   */
  onDownload?: (entries: LogEntry[]) => void;
  /**
   * Name of the file the default download saves.
   * @default 'logs.log'
   */
  fileName?: string;
}

const defaultDownloadLabel = ({ count, hasMoreOlder }: { count: number; hasMoreOlder: boolean }): string =>
  `Download the ${count} loaded ${count === 1 ? 'entry' : 'entries'}${hasMoreOlder ? '. Older entries are not included' : ''}`;

/**
 * LogViewer.Download - A button that saves the loaded entries. It is disabled while there are none.
 * It passes `className`, `data-*` and other button props to the button, and forwards its `ref` to it.
 */
export const LogViewerDownload = React.forwardRef<HTMLButtonElement, LogViewerDownloadProps>(function LogViewerDownload(
  { label = defaultDownloadLabel, onDownload, fileName = 'logs.log', disabled, ...props },
  ref,
) {
  const { entries, count, hasMoreOlder, columns, timeZone, levelLabels } = useLogViewerRequired();
  const text = typeof label === 'string' ? label : label({ count, hasMoreOlder });
  const download = () => {
    if (onDownload) onDownload(entries);
    else saveTextFile(buildLogText(entries, columns, timeZone, levelLabels), fileName);
  };
  return (
    <Tooltip title={text}>
      <span>
        <IconButton
          ref={ref}
          size="small"
          {...props}
          aria-label={text}
          onClick={download}
          disabled={disabled || count === 0}
        >
          <Download size={16} />
        </IconButton>
      </span>
    </Tooltip>
  );
});
LogViewerDownload.displayName = 'LogViewerDownload';

/**
 * Props for LogViewer.Refresh. The rest of the props go to the button.
 */
export interface LogViewerRefreshProps
  extends Omit<React.ComponentProps<typeof IconButton>, 'children' | 'onClick' | 'aria-label'> {
  /**
   * Called when the button is used.
   */
  onRefresh?: () => void;
  /**
   * Accessible name and tooltip.
   * @default 'Refresh'
   */
  label?: string;
}

/**
 * LogViewer.Refresh - A button that asks the page to load the entries again. It is disabled while
 * the first page loads. It passes `className`, `data-*` and other button props to the button, and
 * forwards its `ref` to it.
 */
export const LogViewerRefresh = React.forwardRef<HTMLButtonElement, LogViewerRefreshProps>(function LogViewerRefresh(
  { onRefresh, label = 'Refresh', disabled, ...props },
  ref,
) {
  const { loading } = useLogViewerRequired();
  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          ref={ref}
          size="small"
          {...props}
          aria-label={label}
          onClick={onRefresh}
          disabled={disabled || loading}
        >
          <RefreshCw size={16} />
        </IconButton>
      </span>
    </Tooltip>
  );
});
LogViewerRefresh.displayName = 'LogViewerRefresh';
