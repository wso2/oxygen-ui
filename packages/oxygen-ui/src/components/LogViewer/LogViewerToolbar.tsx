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
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ChevronDown } from '@wso2/oxygen-ui-icons-react';
import { ListingTableFilterMenu } from '../ListingTable/shared/ListingTableFilterMenu';
import TimeRangeFilter from '../TimeRangeFilter';
import { useLogViewerRequired } from './context';
import { LogViewerCount } from './LogViewerControls';
import LogViewerSearch from './LogViewerSearch';
import LogFilterChip from './LogFilterChip';
import { formatShort } from './timestamps';
import { isApplied, isRange } from './filters';
import type { LogFilterValue, LogSelectFilter } from './types';

/**
 * Props for LogViewer.Toolbar. The rest of the props go to the root element.
 */
export interface LogViewerToolbarProps extends Omit<BoxProps, 'children'> {
  /**
   * The controls of the toolbar: `LogViewer.Search`, `LogViewer.TimeZone`, `LogViewer.Sort`,
   * `LogViewer.Download`, `LogViewer.Refresh` and `LogViewer.Count`. Include the ones you want. The
   * layout is the same in every product: the filters, the search and the count are on the left, in
   * that order, and the other controls are on the right, in the order given.
   */
  children?: React.ReactNode;
  /**
   * Accessible name of the toolbar.
   * @default 'Log toolbar'
   */
  label?: string;
  /**
   * Accessible name of the group of applied filter chips.
   * @default 'Applied filters'
   */
  appliedFiltersLabel?: string;
  /**
   * Shows a removable chip below the toolbar for each applied filter, with a button that removes them all. Without the chips, the
   * reader can no longer see which filters are active at a glance, so turn them off only when
   * the page shows that some other way.
   * @default true
   */
  showFilterChips?: boolean;
  /**
   * The action of an applied filter's chip, which reopens the filter. It receives the filter's label.
   * The chip's accessible name is the text it shows, then this: `Status: Failed, Change status filter`.
   * @default (name) => `Change ${name} filter`, with the name in lower case
   */
  changeFilterLabel?: (name: string) => string;
  /**
   * Accessible name of the remove icon of an applied filter's chip. It receives the filter's label.
   * @default (name) => `Remove ${name} filter`, with the name in lower case
   */
  removeFilterLabel?: (name: string) => string;
  /**
   * Text of the button that removes every applied filter. It is shown with the chips, when more than one is applied.
   * @default 'Clear all'
   */
  clearAllLabel?: string;
}

const defaultChangeFilterLabel = (name: string): string => `Change ${name.toLowerCase()} filter`;
const defaultRemoveFilterLabel = (name: string): string => `Remove ${name.toLowerCase()} filter`;

interface OpenMenu {
  id: string;
  anchor: HTMLElement;
}

/**
 * LogViewer.Toolbar - The filters of the viewer, the chips of the applied ones, and the controls
 * given as children. Filters that a column heading holds are not shown here as buttons, only as
 * chips. Place it above `LogViewer.Stream`. It passes `className`, `sx`, `data-*` and other props to
 * its root element, and forwards its `ref` to it.
 */
const LogViewerToolbar = React.forwardRef<HTMLDivElement, LogViewerToolbarProps>(function LogViewerToolbar(
  {
    children,
    label = 'Log toolbar',
    appliedFiltersLabel = 'Applied filters',
    showFilterChips = true,
    changeFilterLabel = defaultChangeFilterLabel,
    removeFilterLabel = defaultRemoveFilterLabel,
    clearAllLabel = 'Clear all',
    ...props
  },
  ref,
) {
  const {
    loading,
    filters,
    filterValues,
    onFilterChange,
    columns,
    hideHeading,
    timeZone,
    rangePicker,
    openRangePicker,
    closeRangePicker,
  } = useLogViewerRequired();
  const [openMenu, setOpenMenu] = React.useState<OpenMenu | null>(null);

  const closeMenu = () => setOpenMenu(null);

  const openSelectMenu = (id: string, anchor: HTMLElement) => setOpenMenu({ id, anchor });

  const change = (id: string, value: LogFilterValue) => onFilterChange?.(id, value);

  // Filters a column heading holds are drawn there, and not here as buttons. A hidden heading holds none.
  const inHeader = new Set(hideHeading ? [] : columns.map((column) => column.filterId).filter(Boolean));
  const toolbarFilters = filters.filter((filter) => !inHeader.has(filter.id));

  // The search and the count sit with the filters on the left, wherever they are among the other controls.
  const all = React.Children.toArray(children);
  const isLeft = (child: React.ReactNode, type: unknown) => React.isValidElement(child) && child.type === type;
  const searches = all.filter((child) => isLeft(child, LogViewerSearch));
  const counts = all.filter((child) => isLeft(child, LogViewerCount));
  const controls = all.filter((child) => !isLeft(child, LogViewerSearch) && !isLeft(child, LogViewerCount));
  const hasToolbar = toolbarFilters.length > 0 || all.length > 0;

  const activeSelect = openMenu
    ? (filters.find((filter) => filter.id === openMenu.id && filter.type === 'select') as
        | LogSelectFilter
        | undefined)
    : undefined;
  // The applied filters that a chip is drawn for.
  const appliedFilters = (showFilterChips ? filters : []).filter((filter) => {
    const value = filterValues[filter.id];
    return (
      (filter.type === 'timeRange' && isRange(value)) ||
      (filter.type === 'select' && typeof value === 'string' && isApplied(value))
    );
  });
  const chips = appliedFilters.map((filter) => {
    const value = filterValues[filter.id];
    if (filter.type === 'timeRange' && isRange(value)) {
      return (
        <LogFilterChip
          key={filter.id}
          name={filter.label}
          value={
            filter.formatValue
              ? filter.formatValue(value)
              : `${formatShort(value.start, timeZone)} - ${formatShort(value.end, timeZone)}`
          }
          onOpen={(event) => openRangePicker(filter.id, event.currentTarget)}
          onRemove={() => change(filter.id, null)}
          changeLabel={changeFilterLabel(filter.label)}
          removeLabel={removeFilterLabel(filter.label)}
        />
      );
    }
    if (filter.type === 'select' && typeof value === 'string') {
      const option = filter.options.find((candidate) => candidate.value === value);
      return (
        <LogFilterChip
          key={filter.id}
          name={filter.label}
          value={option?.label ?? value}
          onOpen={(event) => openSelectMenu(filter.id, event.currentTarget)}
          onRemove={() => change(filter.id, null)}
          changeLabel={changeFilterLabel(filter.label)}
          removeLabel={removeFilterLabel(filter.label)}
        />
      );
    }
    return null;
  });

  return (
    <Box ref={ref} {...props}>
      {hasToolbar && (
        <Box
          role="toolbar"
          aria-label={label}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            px: 2,
            py: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, flex: 1, minWidth: 0 }}
          >
            {toolbarFilters.map((filter) => {
              if (filter.type === 'timeRange') {
                const value = filterValues[filter.id];
                return (
                  <TimeRangeFilter
                    key={filter.id}
                    open={rangePicker?.id === filter.id}
                    anchorEl={rangePicker?.id === filter.id ? rangePicker.anchor : null}
                    onOpen={() => openRangePicker(filter.id, null)}
                    onClose={closeRangePicker}
                    value={isRange(value) ? value : null}
                    onChange={(range) => change(filter.id, range)}
                    label={filter.label}
                    presets={filter.presets}
                    maxRangeMs={filter.maxRangeMs}
                    disabled={loading}
                  />
                );
              }
              return (
                <Button
                  key={filter.id}
                  size="small"
                  variant="text"
                  color="inherit"
                  disabled={loading}
                  aria-haspopup="menu"
                  aria-expanded={openMenu?.id === filter.id}
                  endIcon={<ChevronDown size={14} />}
                  onClick={(event) => openSelectMenu(filter.id, event.currentTarget)}
                  sx={{ textTransform: 'none' }}
                >
                  {filter.label}
                </Button>
              );
            })}
            {searches}
            {counts}
          </Box>

          {controls.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{controls}</Box>
          )}
        </Box>
      )}

      {appliedFilters.length > 0 && (
        <Box
          role="group"
          aria-label={appliedFiltersLabel}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            px: 2,
            py: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          {chips}
          {appliedFilters.length > 1 && (
            <Button
              size="small"
              variant="text"
              onClick={() => appliedFilters.forEach((filter) => change(filter.id, null))}
              sx={{ textTransform: 'none' }}
            >
              {clearAllLabel}
            </Button>
          )}
        </Box>
      )}

      {activeSelect && (
        <ListingTableFilterMenu
          open
          anchorEl={openMenu?.anchor ?? null}
          onClose={closeMenu}
          options={activeSelect.options}
          value={typeof filterValues[activeSelect.id] === 'string' ? (filterValues[activeSelect.id] as string) : null}
          onChange={(next) => change(activeSelect.id, next)}
          searchable={activeSelect.searchable}
          label={activeSelect.label}
          allLabel={activeSelect.allLabel ?? `Any ${activeSelect.label.toLowerCase()}`}
          searchPlaceholder={activeSelect.searchPlaceholder ?? 'Search'}
          noMatchLabel={activeSelect.noMatchLabel ?? 'No matches'}
        />
      )}
    </Box>
  );
});

LogViewerToolbar.displayName = 'LogViewerToolbar';

export default LogViewerToolbar;
