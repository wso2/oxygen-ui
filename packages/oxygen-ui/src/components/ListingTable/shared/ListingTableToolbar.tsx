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

import { ReactElement, ReactNode, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { SxProps, Theme } from '@mui/material/styles';
import { Search, X } from '@wso2/oxygen-ui-icons-react';
import { useListingTable } from '../context';

export interface ListingTableToolbarProps {
  /**
   * Show search input
   * @default false
   */
  showSearch?: boolean;
  /**
   * Custom search component to render instead of built-in search.
   * When provided, overrides showSearch and built-in search behavior.
   * The custom component should use useListingTable() to connect to context.
   */
  searchSlot?: ReactNode;
  /**
   * Search value (controlled mode)
   */
  searchValue?: string;
  /**
   * Search change handler
   */
  onSearchChange?: (value: string) => void;
  /**
   * Search placeholder text
   * @default 'Search...'
   */
  searchPlaceholder?: string;
  /**
   * Minimum width for search input
   * @default 200
   */
  searchMinWidth?: number;
  /**
   * Maximum width for search input
   * @default 300
   */
  searchMaxWidth?: number;
  /**
   * Additional toolbar actions to render on the right side
   */
  actions?: ReactNode;
  /**
   * Children to render in the toolbar (between search and actions)
   */
  children?: ReactNode;
  /**
   * Custom styles for the container
   */
  sx?: SxProps<Theme>;
}

export function ListingTableToolbar({
  showSearch = false,
  searchSlot,
  searchValue: controlledSearchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  searchMinWidth = 200,
  searchMaxWidth = 300,
  actions,
  children,
  sx,
}: ListingTableToolbarProps): ReactElement {
  // Get context (may be null for backward compatibility)
  const tableContext = useListingTable();

  // Support both controlled and uncontrolled search
  const [internalSearchValue, setInternalSearchValue] = useState('');

  // Determine search value: props > context > internal state
  const isControlledByProp = controlledSearchValue !== undefined;
  const isControlledByContext = !isControlledByProp && tableContext?.searchValue !== undefined;
  const isControlled = isControlledByProp || isControlledByContext;

  const searchValue = isControlledByProp
    ? controlledSearchValue
    : isControlledByContext
      ? tableContext.searchValue
      : internalSearchValue;

  // Determine change handler: props > context
  const effectiveOnSearchChange = onSearchChange ?? tableContext?.onSearchChange;

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (!isControlled) {
        setInternalSearchValue(newValue);
      }
      effectiveOnSearchChange?.(newValue);
    },
    [isControlled, effectiveOnSearchChange],
  );

  const handleClearSearch = useCallback(() => {
    if (!isControlled) {
      setInternalSearchValue('');
    }
    effectiveOnSearchChange?.('');
  }, [isControlled, effectiveOnSearchChange]);

  // Render search based on priority: searchSlot > showSearch > none
  const renderSearch = (): ReactNode => {
    // Priority 1: Custom search slot
    if (searchSlot) {
      return searchSlot;
    }

    // Priority 2: Built-in search when showSearch is true
    if (showSearch) {
      return (
        <TextField
          size="small"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
          sx={{
            minWidth: searchMinWidth,
            maxWidth: searchMaxWidth,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
            endAdornment: searchValue ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch} edge="end">
                  <X size={16} />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      );
    }

    // Priority 3: No search
    return null;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        borderBottom: 1,
        borderColor: 'divider',
        ...sx,
      }}
    >
      {renderSearch()}
      {children}
      {actions && (
        <>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{actions}</Box>
        </>
      )}
    </Box>
  );
}

export default ListingTableToolbar;
