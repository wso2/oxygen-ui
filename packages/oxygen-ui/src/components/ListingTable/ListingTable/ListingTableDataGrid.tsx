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

import { ReactElement, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { loadListingTableDataGrid } from './loadListingTableDataGrid';
import type { ListingTableDataGridProps } from './ListingTableDataGridLoaded';

export type { ListingTableDataGridProps };

type LoadedComponent = Awaited<ReturnType<typeof loadListingTableDataGrid>>['default'];

let loadedComponent: LoadedComponent | undefined;

type LoadState =
  | { status: 'loading' }
  | { status: 'loaded'; Component: LoadedComponent }
  | { status: 'failed' };

const initialLoadState = (): LoadState =>
  loadedComponent ? { status: 'loaded', Component: loadedComponent } : { status: 'loading' };

/**
 * A `ListingTable` variant that renders an MUI DataGrid instead of a traditional HTML table.
 * Useful when built-in column sorting, filtering, virtual scrolling, or advanced row selection
 * are needed without manual wiring.
 *
 * Supports two display variants controlled via `ListingTable.Provider`:
 * - **`data-grid`** (default): standard grid rows separated by dividers
 * - **`data-grid-card`**: each row is rendered as a floating card with rounded corners and acrylic background
 *
 * Integrates with `ListingTable.Provider` context:
 * - `density` is read from context when not explicitly provided
 * - `loading` is read from context when not explicitly provided
 * - `variant` is driven by the parent `ListingTable.Provider` — use `'data-grid-card'` for card rows
 *
 * @example Table variant (default)
 * ```tsx
 * <ListingTable.Provider density="compact" loading={isFetching}>
 *   <ListingTable.Container>
 *     <ListingTable.Toolbar showSearch />
 *     <ListingTable.DataGrid rows={rows} columns={columns} autoHeight />
 *   </ListingTable.Container>
 * </ListingTable.Provider>
 * ```
 *
 * @example Card variant
 * ```tsx
 * <ListingTable.Provider variant="data-grid-card">
 *   <ListingTable.Container disablePaper>
 *     <ListingTable.DataGrid rows={rows} columns={columns} autoHeight />
 *   </ListingTable.Container>
 * </ListingTable.Provider>
 * ```
 */
export function ListingTableDataGrid(props: ListingTableDataGridProps): ReactElement {
  const [state, setState] = useState<LoadState>(initialLoadState);

  useEffect(() => {
    if (loadedComponent) {
      setState({ status: 'loaded', Component: loadedComponent });
      return undefined;
    }

    let mounted = true;
    loadListingTableDataGrid().then(
      module => {
        loadedComponent = module.default;
        if (mounted) setState({ status: 'loaded', Component: module.default });
      },
      () => {
        if (mounted) setState({ status: 'failed' });
      },
    );
    return () => {
      mounted = false;
    };
  }, []);

  if (state.status === 'loaded') {
    const { Component } = state;
    return <Component {...props} />;
  }

  if (state.status === 'failed') {
    return <Alert severity="error">The data grid could not be loaded.</Alert>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }} aria-busy="true">
      <CircularProgress aria-label="Loading data grid" />
    </Box>
  );
}

export default ListingTableDataGrid;
