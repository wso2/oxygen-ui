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
import { ReactElement, ReactNode, useMemo } from 'react';
import { ListingTableContext, ListingTableContextValue } from './context';

export interface ListingTableProviderProps extends ListingTableContextValue {
  /** Children to render within the provider */
  children: ReactNode;
}

/**
 * Provider component for ListingTable context.
 * Enables centralized state management and data operations across table sub-components.
 *
 * @example
 * ```tsx
 * <ListingTable.Provider
 *   searchValue={search}
 *   onSearchChange={setSearch}
 *   sortField={sortField}
 *   sortDirection={sortDirection}
 *   onSortChange={handleSortChange}
 * >
 *   <ListingTable.Container>
 *     <ListingTable.Toolbar showSearch />
 *     <ListingTable>...</ListingTable>
 *   </ListingTable.Container>
 * </ListingTable.Provider>
 * ```
 */
export function ListingTableProvider({
  children,
  // Search
  searchValue,
  onSearchChange,
  // Sort
  sortField,
  sortDirection,
  onSortChange,
  // Pagination
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  // Selection
  selected,
  onSelectionChange,
  onSelectAll,
  onClearSelection,
  isSelected,
  // Filters
  filters,
  onFilterChange,
  onClearFilters,
  // Bulk Actions
  onBulkDelete,
  onBulkAction,
  // Extension
  customHandlers,
  // UI State
  density,
  onDensityChange,
  variant,
  // Loading
  loading,
}: ListingTableProviderProps): ReactElement {
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<ListingTableContextValue>(
    () => ({
      // Search
      searchValue,
      onSearchChange,
      // Sort
      sortField,
      sortDirection,
      onSortChange,
      // Pagination
      page,
      rowsPerPage,
      totalCount,
      onPageChange,
      onRowsPerPageChange,
      // Selection
      selected,
      onSelectionChange,
      onSelectAll,
      onClearSelection,
      isSelected,
      // Filters
      filters,
      onFilterChange,
      onClearFilters,
      // Bulk Actions
      onBulkDelete,
      onBulkAction,
      // Extension
      customHandlers,
      // UI State
      density,
      onDensityChange,
      variant,
      // Loading
      loading,
    }),
    [
      searchValue,
      onSearchChange,
      sortField,
      sortDirection,
      onSortChange,
      page,
      rowsPerPage,
      totalCount,
      onPageChange,
      onRowsPerPageChange,
      selected,
      onSelectionChange,
      onSelectAll,
      onClearSelection,
      isSelected,
      filters,
      onFilterChange,
      onClearFilters,
      onBulkDelete,
      onBulkAction,
      customHandlers,
      density,
      onDensityChange,
      variant,
      loading,
    ],
  );

  return <ListingTableContext.Provider value={contextValue}>{children}</ListingTableContext.Provider>;
}

export default ListingTableProvider;
