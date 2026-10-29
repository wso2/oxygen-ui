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
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from '@mui/material/ButtonBase';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Copy,
  FileSearch,
  Link2,
  ListFilter,
} from '@wso2/oxygen-ui-icons-react';
import { useLogViewerRequired } from './context';
import { entryText } from './download';
import { formatDisplay } from './timestamps';
import ListingTableCell from '../ListingTable/ListingTable/ListingTableCell';
import ListingTableHead from '../ListingTable/ListingTable/ListingTableHead';
import ListingTableRow from '../ListingTable/ListingTable/ListingTableRow';
import { ListingTableEmptyState } from '../ListingTable/shared/ListingTableEmptyState';
import { ListingTableProvider } from '../ListingTable/ListingTableProvider';
import { ListingTableFilter, ListingTableSortLabel } from '../ListingTable/shared';
import TimeRangeFilter from '../TimeRangeFilter';
import LogLevelMarker from './LogLevelMarker';
import LogViewerDetails from './LogViewerDetails';
import { columnLabel, columnsMinWidth, columnWidth, MONOSPACE } from './columns';
import { isApplied, isRange } from './filters';
import type { LogEntry, LogFilterValue } from './types';

/** Height of the viewer, in pixels, while the first page loads and there is nothing else to show. */
const LOADING_MIN_HEIGHT = 240;

/**
 * Props for the LogViewer.Stream component. The rest of the props go to the root element.
 */
export interface LogViewerStreamProps
  extends Omit<BoxProps, 'children' | 'maxHeight' | 'onScroll' | 'onWheel'> {
  /**
   * Replaces the default expanded view (a list of `details` fields) of an entry.
   */
  renderDetails?: (entry: LogEntry) => React.ReactNode;
  /**
   * Largest height of the list, in pixels, before it scrolls.
   * @default 640
   */
  maxHeight?: number;
  /**
   * Distance, in pixels, from the older end at which scrolling loads older entries.
   * @default 72
   */
  scrollTriggerPx?: number;
  /**
   * Title of the empty state, shown when there are no entries, nothing is loading and there is no
   * error. The layout is the same in every product; only the words are yours.
   * @default 'No logs found'
   */
  emptyTitle?: string;
  /**
   * Description under the title of the empty state, such as what the reader can try next. Nothing
   * is shown when omitted.
   */
  emptyDescription?: string;
  /**
   * Text of the retry button of the error.
   * @default 'Try again'
   */
  retryLabel?: string;
  /**
   * Text of the load older button.
   * @default 'Load older logs'
   */
  loadOlderLabel?: string;
  /**
   * Text shown at the older end when there is nothing older to load.
   * @default 'No older logs'
   */
  noMoreOlderLabel?: string;
  /**
   * Text shown at the newer end. Nothing is shown when omitted.
   */
  newestLabel?: string;
  /**
   * Text of each entry's Copy button.
   * @default 'Copy'
   */
  copyLabel?: string;
  /**
   * Text of each entry's Copy link button.
   * @default 'Copy link'
   */
  copyLinkLabel?: string;
  /**
   * Text that replaces the Copy and Copy link labels for a moment after the copy succeeded.
   * @default 'Copied'
   */
  copiedLabel?: string;
  /**
   * Accessible name of the button that opens or closes an entry.
   * @default ({ open }) => (open ? 'Hide details' : 'Show details')
   */
  detailsToggleLabel?: (info: { open: boolean }) => string;
  /**
   * Accessible name of the region that holds an opened entry's details. It receives the entry.
   * @default (entry) => `Details for ${entry.id}`
   */
  detailsLabel?: (entry: LogEntry) => string;
  /**
   * Accessible name of the button that opens a collapsed object or list in the default details.
   * @default 'Expand'
   */
  expandNodeLabel?: string;
  /**
   * Accessible name of the button that closes an open object or list in the default details.
   * @default 'Collapse'
   */
  collapseNodeLabel?: string;
  /**
   * Accessible name of a sort control in a column heading.
   * @default (label) => `Sort by ${label}`
   */
  sortColumnLabel?: (label: string) => string;
  /**
   * Accessible name of a filter control in a column heading.
   * @default (label) => `Filter by ${label}`
   */
  filterColumnLabel?: (label: string) => string;
  /**
   * Accessible name of the loading indicator.
   * @default 'Loading logs'
   */
  loadingLabel?: string;
  /**
   * Accessible name of the scrolling list.
   * @default 'Log stream'
   */
  label?: string;
  /**
   * Custom styles for the root element.
   */
  sx?: SxProps<Theme>;
}

const defaultDetailsToggleLabel = ({ open }: { open: boolean }) => (open ? 'Hide details' : 'Show details');
const defaultDetailsLabel = (entry: LogEntry) => `Details for ${entry.id}`;

interface EdgePillProps {
  label: string;
  loading: boolean;
  position: 'top' | 'bottom';
  onClick: () => void;
}

/**
 * Button at the older end of the list that loads older entries. It sits in normal flow, so it is
 * only seen once the reader has scrolled to that end.
 */
const EdgePill: React.FC<EdgePillProps> = ({ label, loading, position, onClick }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
    {/* Busy, not disabled: a disabled button greys its label, and the spinner would then differ in
        color from the arrow it replaces. The spinner inherits the button's own color. */}
    <Button
      size="small"
      variant="outlined"
      // Neutral text, not the brand primary: orange text fails the 4.5:1 contrast needed on light surfaces.
      color="inherit"
      onClick={() => {
        if (!loading) onClick();
      }}
      aria-busy={loading}
      aria-disabled={loading}
      startIcon={
        loading ? (
          // Decorative: the button's own label and aria-busy already say what is happening.
          <CircularProgress size={12} color="inherit" aria-hidden="true" />
        ) : position === 'top' ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        )
      }
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 5,
        textTransform: 'none',
        fontSize: '0.75rem',
        py: 0.25,
        boxShadow: 1,
        cursor: loading ? 'progress' : 'pointer',
      }}
    >
      {label}
    </Button>
  </Box>
);

/**
 * Quiet, non-interactive marker at an end of the list.
 */
const EdgeNote: React.FC<{ text: string }> = ({ text }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.75, px: 2 }}>
    <Typography variant="caption" color="text.secondary">
      {text}
    </Typography>
  </Box>
);

/** Copy and Copy link: quiet icon buttons in the colors of the viewer. */
/** How long the copied label stays on a button after its copy succeeded. */
const COPIED_MS = 1500;

const ICON_ACTION_SX = {
  color: 'text.secondary',
  border: 1,
  borderColor: 'divider',
  width: 26,
  height: 26,
  flexShrink: 0,
  borderRadius: 1,
  '&:hover': { bgcolor: 'action.selected', color: 'text.primary' },
} as const;

/**
 * A row of the table that holds one cell across all columns: the details of an entry, or a note at
 * an end of the list.
 */
const FullRow: React.FC<{ columnCount: number; children: React.ReactNode }> = ({
  columnCount,
  children,
}) => (
  <ListingTableRow>
    <ListingTableCell colSpan={columnCount} sx={{ p: 0, border: 0, font: 'inherit' }}>
      {children}
    </ListingTableCell>
  </ListingTableRow>
);

interface LogRowProps {
  entry: LogEntry;
  highlighted: boolean;
  open: boolean;
  detailsId: string;
  onToggle: () => void;
  renderDetails?: (entry: LogEntry) => React.ReactNode;
  copyLabel: string;
  copyLinkLabel: string;
  copiedLabel: string;
  detailsToggleLabel: (info: { open: boolean }) => string;
  detailsLabel: (entry: LogEntry) => string;
  expandNodeLabel: string;
  collapseNodeLabel: string;
}

const LogRow: React.FC<LogRowProps> = ({
  entry,
  highlighted,
  open,
  detailsId,
  onToggle,
  renderDetails,
  copyLabel,
  copyLinkLabel,
  copiedLabel,
  detailsToggleLabel,
  detailsLabel,
  expandNodeLabel,
  collapseNodeLabel,
}) => {
  const { columns, timeZone, onCopy, levelLabels, getEntryLink, onCopyLink } = useLogViewerRequired();
  const time = formatDisplay(entry.timestamp, timeZone);
  const expandable = Boolean(entry.details || renderDetails);
  // The text is needed only by Copy, which an open entry shows, so a closed entry does not build it. Building it
  // runs the render and text of every column, which would be done for every row of the list on every render.
  const copyText = open ? entryText(entry, columns, timeZone, levelLabels) : undefined;

  // Which button shows the copied label, for a moment after its copy succeeded.
  const [copied, setCopied] = React.useState<'text' | 'link' | null>(null);
  const copiedTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(copiedTimer.current), []);
  const markCopied = (which: 'text' | 'link') => {
    setCopied(which);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(null), COPIED_MS);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText ?? '');
      markCopied('text');
      onCopy?.(entry, true);
    } catch {
      onCopy?.(entry, false);
    }
  };

  const link = getEntryLink?.(entry);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link ?? '');
      markCopied('link');
      onCopyLink?.(entry, true);
    } catch {
      onCopyLink?.(entry, false);
    }
  };

  // A click that selects text must not also toggle the row. A repeated click (a double click picks a word, a
  // triple click a line) and the click that ends a drag over the text of this row are selecting, so they are skipped.
  const toggleFromRow = (event: React.MouseEvent<HTMLElement>) => {
    if (event.detail > 1) return;
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && event.currentTarget.contains(selection.anchorNode)) return;
    onToggle();
  };

  // Copy and Copy link are icons at the top right of the opened entry, so they never cover a column.
  const detailActions = (copyText !== undefined || link) && (
    <Box sx={{ float: 'right', display: 'flex', gap: 0.5, ml: 2 }}>
      {copyText !== undefined && (
        <Tooltip title={copied === 'text' ? copiedLabel : copyLabel}>
          <IconButton
            size="small"
            aria-label={copied === 'text' ? copiedLabel : copyLabel}
            onClick={() => void copy()}
            sx={ICON_ACTION_SX}
          >
            {copied === 'text' ? <Check size={14} /> : <Copy size={14} />}
          </IconButton>
        </Tooltip>
      )}
      {link && (
        <Tooltip title={copied === 'link' ? copiedLabel : copyLinkLabel}>
          <IconButton
            size="small"
            aria-label={copied === 'link' ? copiedLabel : copyLinkLabel}
            onClick={() => void copyLink()}
            sx={ICON_ACTION_SX}
          >
            {copied === 'link' ? <Check size={14} /> : <Link2 size={14} />}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  return (
    // One body per entry holds its row and, when it is open, its details.
    <Box component="tbody" data-entry-id={entry.id}>
      <ListingTableRow
        hover
        selected={open || highlighted}
        clickable={expandable}
        aria-current={highlighted ? 'true' : undefined}
        // Clicking anywhere on the row opens it, unless the click is selecting text. The button in the first cell
        // does the same for the keyboard.
        onClick={expandable ? toggleFromRow : undefined}
        sx={{
          // An open or shared entry is marked with the neutral selected color, not the table's tint.
          '&.Mui-selected': { bgcolor: 'action.selected' },
          '&.Mui-selected:hover': { bgcolor: 'action.hover' },
          // A divider above each entry. The last row of a table has none by default, but each
          // entry is its own body, so every row keeps it.
          '& > td, &:last-child > td': {
            font: 'inherit',
            verticalAlign: 'top',
            border: 0,
            borderTop: 1,
            borderColor: 'divider',
            // The room before the first column holds the open/close button; the rest is the gap.
            py: 0.75,
            pl: 0,
            pr: 2,
          },
          '& > td:first-of-type, &:last-child > td:first-of-type': {
            pl: '36px',
            // A bar on the left edge marks the entry a shared link points at.
            ...(highlighted && { boxShadow: (theme: Theme) => `inset 3px 0 0 ${(theme.vars ?? theme).palette.primary.main}` }),
          },
        }}
      >
        {columns.map((column, index) => {
          const content = column.render ? (
            column.render(entry)
          ) : column.id === 'time' ? (
            time
          ) : column.id === 'level' ? (
            entry.level && <LogLevelMarker level={entry.level} label={levelLabels[entry.level]} />
          ) : null;
          return (
            <ListingTableCell
              key={column.id}
              sx={{
                position: 'relative',
                minWidth: 0,
                color: column.id === 'time' ? 'text.secondary' : undefined,
              }}
            >
              {index === 0 && expandable && (
                <ButtonBase
                  onClick={(event) => {
                    // The row handles clicks too, so this one must not toggle twice.
                    event.stopPropagation();
                    onToggle();
                  }}
                  aria-expanded={open}
                  aria-controls={open ? detailsId : undefined}
                  aria-label={detailsToggleLabel({ open })}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: 6,
                    borderRadius: 0.5,
                    '&.Mui-focusVisible': { outline: 2, outlineStyle: 'solid', outlineOffset: 1 },
                  }}
                >
                  {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </ButtonBase>
              )}
              {/* Long content is cut with an ellipsis while the entry is closed. The cell itself is not
                  clipped, because the open/close button sits outside its left edge. */}
              <Box
                sx={{
                  minWidth: 0,
                  whiteSpace: open ? 'normal' : 'nowrap',
                  overflow: open ? 'visible' : 'hidden',
                  textOverflow: 'ellipsis',
                  overflowWrap: 'anywhere',
                }}
              >
                {content}
              </Box>
            </ListingTableCell>
          );
        })}
      </ListingTableRow>

      {expandable && open && (
        <FullRow columnCount={columns.length}>
          <Collapse in appear timeout="auto">
            <Box
              id={detailsId}
              role="region"
              aria-label={detailsLabel(entry)}
              sx={{ bgcolor: 'action.hover' }}
            >
              {/* The row is as wide as all the columns. The details stay at the left edge of what is
                  in view, and are as wide as the view, so they and the Copy buttons at their right
                  edge are never scrolled out of sight when the list is scrolled sideways. */}
              <Box
                sx={{
                  position: 'sticky',
                  left: 0,
                  width: '100cqw',
                  boxSizing: 'border-box',
                  pl: 6.5,
                  pr: 2,
                  py: 1.5,
                  display: 'flow-root',
                }}
              >
                {detailActions}
                {renderDetails
                  ? renderDetails(entry)
                  : entry.details && (
                      <LogViewerDetails
                        details={entry.details}
                        expandLabel={expandNodeLabel}
                        collapseLabel={collapseNodeLabel}
                      />
                    )}
              </Box>
            </Box>
          </Collapse>
        </FullRow>
      )}
    </Box>
  );
};

/**
 * LogViewer.Stream - The scrolling list of entries, with its loading, empty and error states.
 *
 * Older entries load when the reader scrolls toward the older end, or uses the button there. Only
 * movement toward that end loads, so the list does not load just because it starts at the top.
 */
const LogViewerStream = React.forwardRef<HTMLDivElement, LogViewerStreamProps>(function LogViewerStream(
  {
    renderDetails,
    maxHeight = 640,
    scrollTriggerPx = 72,
    emptyTitle = 'No logs found',
    emptyDescription,
    retryLabel = 'Try again',
    loadOlderLabel = 'Load older logs',
    noMoreOlderLabel = 'No older logs',
    newestLabel,
    copyLabel = 'Copy',
    copyLinkLabel = 'Copy link',
    copiedLabel = 'Copied',
    detailsToggleLabel = defaultDetailsToggleLabel,
    detailsLabel = defaultDetailsLabel,
    expandNodeLabel = 'Expand',
    collapseNodeLabel = 'Collapse',
    sortColumnLabel = (heading: string) => `Sort by ${heading}`,
    filterColumnLabel = (heading: string) => `Filter by ${heading}`,
    loadingLabel = 'Loading logs',
    label: streamLabel = 'Log stream',
    sx,
    ...props
  },
  ref,
) {
  const {
    entries,
    order,
    toggleOrder,
    loading,
    loadingOlder,
    hasMoreOlder,
    onLoadOlder,
    error,
    onRetry,
    warning,
    highlightedEntryId,
    columns,
    hideHeading,
    filters,
    filterValues,
    onFilterChange,
    sort,
    onSortChange,
    rangePicker,
    openRangePicker,
    closeRangePicker,
  } = useLogViewerRequired();

  const baseId = React.useId();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const lastScrollTop = React.useRef(0);
  const lastLayout = React.useRef<{ firstId?: string; height: number }>({ height: 0 });
  const [expanded, setExpanded] = React.useState<ReadonlySet<string>>(() => new Set());

  const oldestFirst = order === 'oldest-first';

  // Bring the entry a shared link points at into view, once, when it first appears in the list. The rows are
  // not drawn while loading, so the end of loading is a reason to look again even when the entries are the same.
  const scrolledTo = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    if (!highlightedEntryId) {
      scrolledTo.current = undefined;
      return;
    }
    if (scrolledTo.current === highlightedEntryId) return;
    const element = Array.from(scrollRef.current?.querySelectorAll<HTMLElement>('[data-entry-id]') ?? []).find(
      (row) => row.dataset.entryId === highlightedEntryId
    );
    if (element) {
      scrolledTo.current = highlightedEntryId;
      element.scrollIntoView?.({ block: 'center' });
    }
  }, [highlightedEntryId, entries, loading]);

  // Flipping the order puts the other end of the list at the top, so start from the top again.
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    lastScrollTop.current = 0;
  }, [order]);

  // True while the promise `onLoadOlder` returned is pending, so a page that returns its request
  // does not also have to set `loadingOlder` for the button to show it is busy.
  const [requestPending, setRequestPending] = React.useState(false);
  const mounted = React.useRef(true);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const loadingMore = loadingOlder || requestPending;

  const canLoadOlder = hasMoreOlder && !loadingMore && !loading && Boolean(onLoadOlder);

  // A scroll and a wheel event can both fire before the consumer re-renders with `loadingOlder`
  // set, so a request in flight is tracked here. It ends when the returned promise settles, when
  // `loadingOlder` goes back to false, or when the entries change.
  const requestInFlight = React.useRef(false);
  const sawLoadingOlder = React.useRef(false);
  React.useEffect(() => {
    if (loadingOlder) {
      sawLoadingOlder.current = true;
    } else if (sawLoadingOlder.current) {
      sawLoadingOlder.current = false;
      requestInFlight.current = false;
    }
  }, [loadingOlder]);
  React.useEffect(() => {
    requestInFlight.current = false;
  }, [entries]);

  const loadOlder = () => {
    if (!canLoadOlder || requestInFlight.current) return;
    requestInFlight.current = true;
    const request = onLoadOlder?.();
    if (request && typeof request.then === 'function') {
      setRequestPending(true);
      const done = () => {
        requestInFlight.current = false;
        if (mounted.current) setRequestPending(false);
      };
      request.then(done, done);
    }
  };

  // When older entries are added above the reader, move the scroll position down by their height
  // so the entries being read stay where they are.
  React.useLayoutEffect(() => {
    const element = scrollRef.current;
    const firstId = entries[0]?.id;
    const previous = lastLayout.current;
    if (
      element &&
      oldestFirst &&
      previous.firstId !== undefined &&
      firstId !== previous.firstId &&
      entries.some((entry) => entry.id === previous.firstId)
    ) {
      element.scrollTop += element.scrollHeight - previous.height;
    }
    lastLayout.current = { firstId, height: element?.scrollHeight ?? 0 };
  });

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const movedUp = element.scrollTop < lastScrollTop.current;
    const movedDown = element.scrollTop > lastScrollTop.current;
    lastScrollTop.current = element.scrollTop;
    const nearTop = element.scrollTop < scrollTriggerPx;
    const nearBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < scrollTriggerPx;
    // Position alone is not enough: the list starts at the top, so scrolling away from the older
    // end would otherwise load too.
    if (oldestFirst ? nearTop && movedUp : nearBottom && movedDown) loadOlder();
  };

  // Scrolling further toward the older end while already at it produces no scroll event, so the
  // wheel is the only signal that the reader wants more.
  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    const element = scrollRef.current;
    if (!element) return;
    const atTop = element.scrollTop <= 0;
    const atBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= 1;
    if (oldestFirst ? atTop && event.deltaY < 0 : atBottom && event.deltaY > 0) loadOlder();
  };

  const toggle = (id: string) =>
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Rows are shown once the first page has loaded and there is something to show.
  const showRows = !loading && entries.length > 0;

  // While entries reload, the list keeps the height it had, so what is below it does not jump up
  // and back down. The first load has no earlier height and uses the spinner's own room.
  const heldHeight = React.useRef(0);
  React.useLayoutEffect(() => {
    if (showRows && scrollRef.current) heldHeight.current = scrollRef.current.offsetHeight;
  });

  const newestFirst = order === 'newest-first';

  // The heading row: a cell per column, with its sort control and its filter.
  const headingRow = (
    <ListingTableRow>
      {columns.map((column) => {
        const heading = columnLabel(column);
        const filter = column.filterId ? filters.find((candidate) => candidate.id === column.filterId) : undefined;
        const active = column.id === 'time' ? !sort : sort?.columnId === column.id;
        const direction: 'asc' | 'desc' =
          column.id === 'time'
            ? newestFirst
              ? 'desc'
              : 'asc'
            : sort?.columnId === column.id
              ? sort.direction
              : 'asc';
        if (hideHeading) {
          // The heading is only there for assistive technology: the label, and nothing to operate.
          return (
            <ListingTableCell key={column.id} component="th" variant="head" scope="col">
              {heading}
            </ListingTableCell>
          );
        }
        const filterValue = filter ? filterValues[filter.id] : undefined;
        return (
          <ListingTableCell
            key={column.id}
            component="th"
            variant="head"
            scope="col"
            aria-sort={
              column.sortable ? (active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none') : undefined
            }
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
              {column.sortable ? (
                <ListingTableSortLabel field={column.id} aria-label={sortColumnLabel(heading)}>
                  {heading}
                </ListingTableSortLabel>
              ) : (
                <span>{heading}</span>
              )}
              {filter?.type === 'select' && (
                <ListingTableFilter
                  field={filter.id}
                  label={filterColumnLabel(heading)}
                  options={filter.options}
                  searchable={filter.searchable}
                  allLabel={filter.allLabel ?? `Any ${filter.label.toLowerCase()}`}
                  searchPlaceholder={filter.searchPlaceholder}
                  noMatchLabel={filter.noMatchLabel}
                  disabled={loading}
                />
              )}
              {filter?.type === 'timeRange' && (
                <>
                  {/* The picker itself has no button here: the funnel opens it. */}
                  <TimeRangeFilter
                    open={rangePicker?.id === filter.id}
                    anchorEl={rangePicker?.id === filter.id ? rangePicker.anchor : null}
                    onClose={closeRangePicker}
                    value={isRange(filterValue) ? filterValue : null}
                    onChange={(range) => onFilterChange?.(filter.id, range)}
                    label={filter.label}
                    presets={filter.presets}
                    maxRangeMs={filter.maxRangeMs}
                    disabled={loading}
                    sx={{ display: 'none' }}
                  />
                  <Tooltip title={filterColumnLabel(heading)}>
                    <span>
                      <IconButton
                        size="small"
                        disabled={loading}
                        aria-label={filterColumnLabel(heading)}
                        aria-haspopup="menu"
                        color={isApplied(filterValue) ? 'primary' : 'default'}
                        onClick={(event) => openRangePicker(filter.id, event.currentTarget)}
                        sx={{ p: 0.25 }}
                      >
                        <ListFilter size={14} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              )}
            </Box>
          </ListingTableCell>
        );
      })}
    </ListingTableRow>
  );

  const olderEdge = hasMoreOlder ? (
    <EdgePill
      label={loadOlderLabel}
      loading={loadingMore}
      position={oldestFirst ? 'top' : 'bottom'}
      onClick={loadOlder}
    />
  ) : (
    <EdgeNote text={noMoreOlderLabel} />
  );
  const newerEdge = newestLabel ? <EdgeNote text={newestLabel} /> : null;
  const edgeRow = (edge: React.ReactNode) =>
    edge ? (
      <tbody>
        <FullRow columnCount={columns.length}>
          {/* As wide as the view, so the note stays in sight when the list is scrolled sideways. */}
          <Box sx={{ position: 'sticky', left: 0, width: '100cqw', boxSizing: 'border-box' }}>{edge}</Box>
        </FullRow>
      </tbody>
    ) : null;

  return (
    // The heading's sort labels and filters read and report through the table's own state
    // (`field`), as in any ListingTable. The viewer owns that state; this only maps it.
    <ListingTableProvider
      sortField={sort ? sort.columnId : 'time'}
      sortDirection={sort ? sort.direction : newestFirst ? 'desc' : 'asc'}
      onSortChange={(field, direction) => {
        if (loading) return;
        if (field === 'time') {
          // Sorting by time again leaves any other sort; otherwise it flips the order.
          if (sort) onSortChange?.(null);
          else toggleOrder();
          return;
        }
        onSortChange?.({ columnId: field, direction: direction === 'desc' ? 'desc' : 'asc' });
      }}
      filters={filterValues}
      onFilterChange={(id, value) => onFilterChange?.(id, value as LogFilterValue)}
      loading={loading}
    >
      <Box ref={ref} {...props} sx={sx}>
        {error && (
          <Alert
            severity="error"
            sx={{ m: 2 }}
            action={
              onRetry ? (
                <Button color="inherit" size="small" onClick={onRetry} sx={{ textTransform: 'none' }}>
                  {retryLabel}
                </Button>
              ) : undefined
            }
          >
            {error}
          </Alert>
        )}
        {warning && (
          <Alert severity="warning" sx={{ m: 2 }}>
            {warning}
          </Alert>
        )}

        {/* The list is always drawn, even while loading or empty, so the heading row stays in the same
            place and the columns keep their size when entries are loaded. */}
        <Box
          ref={scrollRef}
          role="region"
          aria-label={streamLabel}
          onScroll={handleScroll}
          onWheel={handleWheel}
          sx={{
            maxHeight,
            minHeight: loading ? heldHeight.current : undefined,
            overflow: 'auto',
            fontFamily: MONOSPACE,
            fontSize: (theme) => theme.typography.body2.fontSize,
            // Keeps the room a scrollbar takes, so the heading row above lines up with the entries.
            scrollbarGutter: 'stable',
            // The width of the view, for the details of an entry (`cqw` in their styles).
            containerType: 'inline-size',
            // Many columns scroll sideways, and an overlay scrollbar hides until the list is
            // scrolled, so the reader would not see that there is more. Draw a persistent one.
            ...({
              '&::-webkit-scrollbar': { width: 12, height: 12 },
              '&::-webkit-scrollbar-track': { bgcolor: 'action.hover' },
              '&::-webkit-scrollbar-corner': { bgcolor: 'action.hover' },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'text.disabled',
                borderRadius: 6,
                border: '3px solid transparent',
                backgroundClip: 'content-box',
              },
              '&::-webkit-scrollbar-thumb:hover': { bgcolor: 'text.secondary' },
              '@supports (-moz-appearance: none)': {
                scrollbarColor: 'currentColor transparent',
                scrollbarWidth: 'auto',
              },
            }),
          }}
        >
          <Table
            sx={{
              width: '100%',
              minWidth: columnsMinWidth(columns),
              tableLayout: 'fixed',
              borderCollapse: 'separate',
              borderSpacing: 0,
              // The heading row, drawn sticky.
              '& > thead > tr > th': (theme: Theme) => ({
                position: 'sticky',
                top: 0,
                zIndex: 2,
                padding: '8px 16px 8px 0',
                textAlign: 'left',
                borderBottom: `1px solid ${(theme.vars ?? theme).palette.divider}`,
              }),
              // An opaque ground under the heading, so rows scrolling under it do not show through.
              // The heading's own tint is a layer on top of it, as in ListingTable's heading. This is its
              // own rule, with `.MuiTableCell-head`, because the heading of ListingTable sets a
              // translucent background of its own with that class, which a plainer selector loses to.
              // The ground is the theme's solid color: `background.default` can carry transparency.
              '& > thead > tr > th.MuiTableCell-head': (theme: Theme) => {
                const palette = (theme.vars ?? theme).palette;
                const channel = (palette.background as { defaultChannel?: string }).defaultChannel;
                return {
                  backgroundColor: channel ? `rgb(${channel})` : palette.background.default,
                  ...theme.applyStyles('light', {
                    backgroundImage: `linear-gradient(${theme.palette.grey[50]}, ${theme.palette.grey[50]})`,
                  }),
                  ...theme.applyStyles('dark', {
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04))',
                  }),
                };
              },
              // Lines the headings up with the entries: the room of the open button, then the columns.
              '& > thead > tr > th:first-of-type': { paddingLeft: '36px' },
              // A hidden heading is still read by assistive technology, but takes no room and shows nothing.
              ...(hideHeading && {
                '& > thead > tr > th, & > thead > tr > th:first-of-type': {
                  position: 'absolute',
                  // Pixels as text: a bare 1 in `sx` is a whole width.
                  width: '1px',
                  height: '1px',
                  p: 0,
                  m: '-1px',
                  border: 0,
                  overflow: 'hidden',
                  clip: 'rect(0 0 0 0)',
                  whiteSpace: 'nowrap',
                },
              }),
            }}
          >
            <colgroup>
              {columns.map((column, index) => {
                const width = columnWidth(column);
                return (
                  <col
                    key={column.id}
                    style={width ? { width: `calc(${width} + 16px${index === 0 ? ' + 36px' : ''})` } : undefined}
                  />
                );
              })}
            </colgroup>
            {/* The table's own heading, so its font, weight and colour are those of any ListingTable. */}
            <ListingTableHead>{headingRow}</ListingTableHead>
            {showRows && (oldestFirst ? edgeRow(olderEdge) : edgeRow(newerEdge))}
            {showRows &&
              entries.map((entry) => (
              <LogRow
                key={entry.id}
                entry={entry}
                highlighted={entry.id === highlightedEntryId}
                open={expanded.has(entry.id)}
                // aria-controls is a list of ids separated by white space, so the entry id is encoded: the result
                // has none, and two different entry ids cannot give the same one.
                detailsId={`${baseId}-details-${encodeURIComponent(entry.id)}`}
                onToggle={() => toggle(entry.id)}
                renderDetails={renderDetails}
                copyLabel={copyLabel}
                copyLinkLabel={copyLinkLabel}
                copiedLabel={copiedLabel}
                detailsToggleLabel={detailsToggleLabel}
                detailsLabel={detailsLabel}
                expandNodeLabel={expandNodeLabel}
                collapseNodeLabel={collapseNodeLabel}
              />
            ))}
            {showRows && (oldestFirst ? edgeRow(newerEdge) : edgeRow(olderEdge))}
          </Table>

      {loading && (
        // Centred in the viewer, with room to sit in the middle of it rather than a corner.
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: Math.min(maxHeight, LOADING_MIN_HEIGHT),
          }}
        >
          <CircularProgress size={28} aria-label={loadingLabel} />
        </Box>
      )}

      {!loading && entries.length === 0 && !error && (
        <ListingTableEmptyState
          title={emptyTitle}
          description={emptyDescription}
          illustration={<FileSearch aria-hidden="true" />}
          minHeight={200}
        />
      )}
        </Box>
      </Box>
    </ListingTableProvider>
  );
});

LogViewerStream.displayName = 'LogViewerStream';

export default LogViewerStream;
