/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com).
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
import { ListingTableDensity, ListingTableVariant } from './shared/types';

/**
 * Sort direction for table columns.
 */
export type ListingTableSortDirection = 'asc' | 'desc';

/**
 * Context value for ListingTable data operations.
 * All properties are optional to support progressive enhancement.
 */
export interface ListingTableContextValue {
  // ============ Search State ============
  /** Current search query */
  searchValue?: string;
  /** Handler for search value changes */
  onSearchChange?: (value: string) => void;

  // ============ Sort State ============
  /** Currently sorted field/column key */
  sortField?: string;
  /** Sort direction */
  sortDirection?: ListingTableSortDirection;
  /** Handler for sort changes */
  onSortChange?: (field: string, direction: ListingTableSortDirection) => void;

  // ============ Pagination State ============
  /** Current page (0-indexed) */
  page?: number;
  /** Items per page */
  rowsPerPage?: number;
  /** Total item count */
  totalCount?: number;
  /** Handler for page changes */
  onPageChange?: (page: number) => void;
  /** Handler for rows per page changes */
  onRowsPerPageChange?: (rowsPerPage: number) => void;

  // ============ Selection State ============
  /** Array of selected row IDs */
  selected?: readonly string[];
  /** Handler for selection changes */
  onSelectionChange?: (selected: readonly string[]) => void;
  /** Select all handler */
  onSelectAll?: () => void;
  /** Clear selection handler */
  onClearSelection?: () => void;
  /** Check if a row is selected */
  isSelected?: (id: string) => boolean;

  // ============ Filter State ============
  /** Active filters as key-value pairs */
  filters?: Record<string, unknown>;
  /** Handler for filter changes */
  onFilterChange?: (key: string, value: unknown) => void;
  /** Clear all filters handler */
  onClearFilters?: () => void;

  // ============ Bulk Actions ============
  /** Handler for bulk delete */
  onBulkDelete?: (ids: readonly string[]) => void;
  /** Handler for custom bulk actions */
  onBulkAction?: (actionId: string, ids: readonly string[]) => void;

  // ============ Extension Point ============
  /** Custom handlers for application-specific operations */
  customHandlers?: Record<string, (...args: unknown[]) => void>;

  // ============ Table UI State ============
  /** Current density setting */
  density?: ListingTableDensity;
  /** Handler for density changes */
  onDensityChange?: (density: ListingTableDensity) => void;
  /** Current variant setting */
  variant?: ListingTableVariant;

  // ============ Loading State ============
  /** Whether data is loading */
  loading?: boolean;
}

/**
 * React Context for ListingTable.
 * Initialized with null to detect usage outside provider.
 */
export const ListingTableContext = React.createContext<ListingTableContextValue | null>(null);

ListingTableContext.displayName = 'ListingTableContext';

/**
 * Hook to access ListingTable context.
 * Returns null if used outside provider (for backward compatibility).
 * Use useListingTableRequired() for strict mode.
 */
export const useListingTable = (): ListingTableContextValue | null => {
  return React.useContext(ListingTableContext);
};

/**
 * Hook to access ListingTable context with strict mode.
 * @throws Error if used outside ListingTableProvider
 */
export const useListingTableRequired = (): ListingTableContextValue => {
  const context = React.useContext(ListingTableContext);
  if (!context) {
    throw new Error(
      'useListingTableRequired must be used within a ListingTable.Provider. ' +
        'Use useListingTable() for optional context access.',
    );
  }
  return context;
};
