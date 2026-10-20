/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
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
import type { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ListFilter } from '@wso2/oxygen-ui-icons-react';
import { useListingTable } from '../context';
import { ListingTableFilterMenu } from './ListingTableFilterMenu';
import type { ListingTableFilterOption } from './ListingTableFilterMenu';

export type { ListingTableFilterOption };

/**
 * Props for the ListingTable.Filter component. The rest of the props go to the funnel button.
 */
export interface ListingTableFilterProps extends Omit<IconButtonProps, 'onChange' | 'value' | 'children'> {
  /**
   * Field/column identifier for context-based filtering.
   * When provided and used with ListingTable.Provider, the component reads the applied value from
   * `filters[field]` and reports changes through `onFilterChange(field, value)`.
   */
  field?: string;
  /**
   * The choices.
   */
  options: ListingTableFilterOption[];
  /**
   * The applied value, or `null` or an empty string when the filter is not applied.
   * When using with Provider and the field prop, this is derived from context.
   */
  value?: string | null;
  /**
   * Called with the chosen value, or `null` when the "any" choice is picked.
   * When using with Provider and the field prop, this is handled via context.
   */
  onChange?: (value: string | null) => void;
  /**
   * Adds a search field above the choices, to narrow them by typing. Without it, the choices are
   * only picked.
   * @default false
   */
  searchable?: boolean;
  /**
   * Accessible name and tooltip of the button, for example "Filter by status".
   * @default 'Filter'
   */
  label?: string;
  /**
   * Text of the choice that clears the filter.
   * @default 'Any'
   */
  allLabel?: string;
  /**
   * Placeholder of the search field.
   * @default 'Search'
   */
  searchPlaceholder?: string;
  /**
   * Text shown when typing matches no choice.
   * @default 'No matches'
   */
  noMatchLabel?: string;
  /**
   * Keeps the funnel visible, at half strength until the column is pointed at, instead of hiding it
   * until then. Use it where discovering the filter matters more than a quiet heading.
   * @default false
   */
  alwaysShowIcon?: boolean;
}

/**
 * ListingTable.Filter - The filter counterpart of ListingTable.SortLabel: a funnel button for a
 * column heading that opens the choices for that column.
 *
 * Put it in a header cell, next to a `ListingTable.SortLabel` if the column also sorts. A column
 * without it has no filter, as a column without a SortLabel has no sort. The table never filters
 * rows: the application owns the applied values and filters its own rows.
 *
 * @example
 * ```tsx
 * <ListingTable.Cell>
 *   <ListingTable.SortLabel field="status">Status</ListingTable.SortLabel>
 *   <ListingTable.Filter field="status" label="Filter by status" options={statusOptions} />
 * </ListingTable.Cell>
 * ```
 */
export const ListingTableFilter = React.forwardRef<HTMLButtonElement, ListingTableFilterProps>(
  function ListingTableFilter(
    {
      field,
      options,
      value: valueProp,
      onChange: onChangeProp,
      searchable = false,
      label = 'Filter',
      allLabel = 'Any',
      searchPlaceholder = 'Search',
      noMatchLabel = 'No matches',
      alwaysShowIcon = false,
      onClick,
      sx,
      ...buttonProps
    },
    ref
  ) {
    // The table's state, when the filter is inside a ListingTable.Provider.
    const tableContext = useListingTable();
    const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

    // Derive the value: props > context (when field is given)
    const fromContext = field !== undefined ? tableContext?.filters?.[field] : undefined;
    const value = valueProp !== undefined ? valueProp : typeof fromContext === 'string' ? fromContext : null;
    const applied = value !== null && value !== '';

    const change = (next: string | null) => {
      if (onChangeProp) onChangeProp(next);
      else if (field && tableContext?.onFilterChange) tableContext.onFilterChange(field, next);
      else {
        // Nothing receives the choice, which is a setup mistake that would otherwise do nothing silently.
        console.warn(
          'ListingTable.Filter: a choice was picked but nothing handles it. Pass `onChange`, or give `field` ' +
            'inside a ListingTable.Provider that has `onFilterChange`.'
        );
      }
    };

    // At rest the funnel is hidden, or half visible with `alwaysShowIcon`, and fully visible once a
    // value is applied.
    const resting = applied ? 1 : alwaysShowIcon ? 0.5 : 0;

    return (
      <>
        {/* `describeChild` keeps the button's own label as its name; the tooltip only describes it. */}
        <Tooltip title={label} describeChild>
          <span>
            <IconButton
              size="small"
              color={applied ? 'primary' : 'default'}
              {...buttonProps}
              ref={ref}
              aria-label={label}
              aria-haspopup="menu"
              aria-expanded={Boolean(anchor)}
              onClick={(event) => {
                onClick?.(event);
                setAnchor(event.currentTarget);
              }}
              // Behaves like the arrow of a SortLabel: hidden until the column is pointed at, then
              // half visible, and fully visible once a value is applied. Unlike MUI's arrow,
              // keyboard focus reveals it too, and it stays while its list is open or where there
              // is no hover.
              sx={[
                (theme) => ({
                  p: 0.25,
                  opacity: resting,
                  transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shorter,
                  }),
                  '.MuiTableCell-root:hover &': { opacity: applied ? 1 : 0.5 },
                  // Inside a cell, the full-strength states repeat under the cell, so they match the
                  // specificity of the cell-hover rule above and come after it.
                  [[
                    '&:hover',
                    '&:focus-visible',
                    '&[aria-expanded="true"]',
                    '.MuiTableCell-root &:hover',
                    '.MuiTableCell-root &:focus-visible',
                    '.MuiTableCell-root &[aria-expanded="true"]',
                    '.MuiTableCell-root:focus-within &',
                  ].join(', ')]: {
                    opacity: 1,
                  },
                  '@media (hover: none)': { opacity: applied ? 1 : 0.5 },
                }),
                ...(Array.isArray(sx) ? sx : [sx]),
              ]}
            >
              <ListFilter size={14} />
            </IconButton>
          </span>
        </Tooltip>

        <ListingTableFilterMenu
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          options={options}
          value={value}
          onChange={change}
          searchable={searchable}
          label={label}
          allLabel={allLabel}
          searchPlaceholder={searchPlaceholder}
          noMatchLabel={noMatchLabel}
        />
      </>
    );
  }
);

ListingTableFilter.displayName = 'ListingTableFilter';

export default ListingTableFilter;
