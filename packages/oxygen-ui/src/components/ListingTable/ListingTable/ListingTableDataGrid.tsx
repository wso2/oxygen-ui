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

import { ReactElement, useCallback } from 'react';
import { DataGrid, DataGridProps, GridDensity, GridRowSpacingParams } from '@mui/x-data-grid';
import { styled, alpha } from '@mui/material/styles';
import { useListingTable } from '../context';
import { ListingTableDensity, densityStyles } from '../shared/types';
import type { OxygenTheme } from '../../../styles/Themes/OxygenThemeBase';

export interface ListingTableDataGridProps extends Omit<DataGridProps, 'density'> {
  /**
   * Density control - affects row padding.
   * Maps directly to DataGrid density values.
   * Falls back to the parent ListingTable.Provider density if not provided.
   * @default 'standard'
   */
  density?: ListingTableDensity;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  // Remove outer border for seamless integration within ListingTable.Container
  border: 'none',
  // Ensure the grid fills its container
  width: '100%',
  // Pin row divider color to theme.palette.divider — matches MUI TableCell default border
  '--DataGrid-rowBorderColor': theme.palette.divider,
  // Column headers: match ListingTableHead — grey[50] light / rgba dark background + bottom divider
  '& .MuiDataGrid-columnHeaders': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    ...theme.applyStyles('light', {
      backgroundColor: theme.palette.grey[50],
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
    }),
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
  },
  // Only the checkbox header column needs this — sortable/menu columns manage their own layout
  '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderDraggableContainer': {
    width: 'unset',
    height: 'unset',
  },
  // DataGrid v8 uses CSS :hover on rows (Mui-hovered JS class was removed)
  '& .MuiDataGrid-row:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  // Selected row — match MUI Table Mui-selected appearance
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
      ),
    },
  },
  // Remove default cell focus outline, rely on theme focus ring
  '& .MuiDataGrid-cell': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
  '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none',
  },
})) as typeof DataGrid;

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
export function ListingTableDataGrid({
  density: densityProp,
  loading: loadingProp,
  getRowSpacing: getRowSpacingProp,
  filterModel: filterModelProp,
  sx,
  ...props
}: ListingTableDataGridProps): ReactElement {
  const context = useListingTable();

  // Explicit props take priority over context values
  const density = (densityProp ?? context?.density ?? 'standard') as GridDensity;
  const loading = loadingProp !== undefined ? loadingProp : (context?.loading ?? false);
  // 'data-grid-card' context variant enables card styling; everything else is table
  const variant = context?.variant === 'data-grid-card' ? 'card' : 'table';

  // Wire Provider searchValue into DataGrid's quick filter when filterModel is not explicitly controlled
  const searchValue = context?.searchValue ?? '';
  const filterModel = filterModelProp ?? {
    items: [],
    quickFilterValues: searchValue ? [searchValue] : [],
  };

  // Default row spacing for the card variant — creates a 12 px gap between cards
  const defaultCardRowSpacing = useCallback(
    (params: GridRowSpacingParams) => ({ top: params.isFirstVisible ? 0 : 12, bottom: 0 }),
    [],
  );

  // Card-specific style overrides — mirrors ListingTableRow card variant exactly:
  // acrylic background, blur, 8 px rounded corners (no border)
  const cardSx = (muiTheme: OxygenTheme) => ({
      // Header: transparent background, no bottom divider, secondary-coloured labels — same as card table header
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: 'transparent',
        borderBottom: 'none',
        paddingBottom: '8px',
      },
      // Hide column resize handle/separator icon between headers
      '& .MuiDataGrid-columnSeparator': {
        visibility: 'hidden',
      },
      // Remove borders from individual column header cells (MuiDataGrid-withBorderColor adds these)
      '& .MuiDataGrid-columnHeader': {
        border: 'none',
      },
      // MuiDataGrid-withBorderColor is applied to headers and cells; zero out the CSS var
      // and the border shorthand so nothing leaks through in any DataGrid version
      '& .MuiDataGrid-withBorderColor': {
        '--DataGrid-rowBorderColor': 'transparent',
        borderColor: 'transparent',
        border: 'none',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        color: (muiTheme.vars || muiTheme).palette.text.secondary,
        fontWeight: 600,
      },
      // Card row: acrylic background + blur + rounded corners, no border
      '& .MuiDataGrid-row': {
        borderRadius: '8px',
        border: 'none',
        backgroundColor:
          muiTheme.vars?.palette.background.acrylic ??
          (muiTheme.vars || muiTheme).palette.background.paper,
        backdropFilter: muiTheme.blur?.light,
        WebkitBackdropFilter: muiTheme.blur?.light,
        '&:hover': {
          backgroundColor: (muiTheme.vars || muiTheme).palette.action.hover,
        },
        '&.Mui-selected': {
          border: 'none',
          backgroundColor: (muiTheme.vars || muiTheme).palette.action.selected,
          '&:hover': {
            backgroundColor: alpha(
              muiTheme.palette.primary.main,
              muiTheme.palette.action.selectedOpacity + muiTheme.palette.action.hoverOpacity,
            ),
          },
        },
      },
      // Remove ALL internal cell dividers and ensure vertical centering
      '& .MuiDataGrid-cell': {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
      },
      // Remove vertical column separator lines inside card rows
      '& .MuiDataGrid-cell--withRightBorder': {
        borderRight: 'none',
      },
      // Footer spaced away from the last card row
      '& .MuiDataGrid-footerContainer': {
        borderTop: `1px solid ${(muiTheme.vars || muiTheme).palette.divider}`,
        marginTop: '12px',
      },
  });

  // Override DataGrid's fixed 16px cell/header padding with density-aware values
  const resolvedDensity = (densityProp ?? context?.density ?? 'standard') as ListingTableDensity;
  const { padding: cellPadding } = densityStyles[resolvedDensity];
  const densitySx = {
    '& .MuiDataGrid-columnHeader': { padding: cellPadding },
    '& .MuiDataGrid-cell': { padding: cellPadding },
  };

  const mergedSx =
    variant === 'card'
      ? [cardSx as Parameters<typeof StyledDataGrid>[0]['sx'], densitySx, ...(Array.isArray(sx) ? sx : [sx])]
      : [densitySx, ...(Array.isArray(sx) ? sx : [sx])];

  return (
    <StyledDataGrid
      density={density}
      loading={loading}
      filterModel={filterModel}
      getRowSpacing={variant === 'card' ? (getRowSpacingProp ?? defaultCardRowSpacing) : getRowSpacingProp}
      sx={mergedSx}
      {...props}
    />
  );
}

export default ListingTableDataGrid;
