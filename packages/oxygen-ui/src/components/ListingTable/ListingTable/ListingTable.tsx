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

import { ReactElement } from 'react';
import MuiTable, { TableProps as MuiTableProps } from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import { ListingTableDensity, ListingTableVariant, densityStyles } from '../shared/types';
import ListingTableContainer from './ListingTableContainer';
import ListingTableHead from './ListingTableHead';
import ListingTableBody from './ListingTableBody';
import ListingTableFooter from './ListingTableFooter';
import ListingTableRow from './ListingTableRow';
import ListingTableCell from './ListingTableCell';
import {
  ListingTableCellIcon,
  ListingTableRowActions,
  ListingTableEmptyState,
  ListingTableToolbar,
  ListingTableSortLabel,
  ListingTableDensityControl,
} from '../shared';
import { ListingTableProvider } from '../ListingTableProvider';

export interface ListingTableProps extends MuiTableProps {
  /**
   * Display variant
   * - 'table': Traditional table appearance (default)
   * - 'card': Card-like rows with rounded corners and borders
   * @default 'table'
   */
  variant?: ListingTableVariant;
  /**
   * Density control - affects row padding
   * @default 'standard'
   */
  density?: ListingTableDensity;
  /**
   * Enable striped rows (alternating background colors)
   * @default false
   */
  striped?: boolean;
  /**
   * Enable bordered cells
   * @default false
   */
  bordered?: boolean;
}

interface StyledTableProps {
  variant?: ListingTableVariant;
  density?: ListingTableDensity;
  striped?: boolean;
  bordered?: boolean;
}

const StyledTable = styled(MuiTable, {
  shouldForwardProp: (prop) => {
    const excludedProps = ['variant', 'density', 'striped', 'bordered'];
    return !excludedProps.some((excluded) => excluded === prop);
  },
})<StyledTableProps>(({ theme, variant = 'table', density = 'standard', striped, bordered }) => ({
  // Card variant specific styles
  ...(variant === 'card' && {
    borderCollapse: 'separate',
    borderSpacing: '0 12px',
    // Remove default table styling for card variant
    '& .MuiTableHead-root .MuiTableRow-root': {
      backgroundColor: 'transparent',
    },
    '& .MuiTableHead-root .MuiTableCell-root.MuiTableCell-head': {
      backgroundColor: 'transparent',
      borderBottom: 'none',
      fontWeight: 600,
      padding: '0 16px 8px 16px',
      ...theme.applyStyles('light', {
        color: theme.palette.text.secondary,
      }),
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[400],
      }),
    },
  }),
  // Standard table cell padding based on density
  '& .MuiTableCell-root': {
    padding: densityStyles[density].padding,
    ...(bordered &&
      variant === 'table' && {
        borderRight: `1px solid ${theme.palette.divider}`,
        '&:last-child': {
          borderRight: 'none',
        },
      }),
  },
  // Striped rows (for table variant only)
  ...(striped &&
    variant === 'table' && {
      '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    }),
}));

export function ListingTable({
  variant = 'table',
  density = 'standard',
  striped = false,
  bordered = false,
  children,
  sx,
  ...props
}: ListingTableProps): ReactElement {
  return (
    <StyledTable
      variant={variant}
      density={density}
      striped={striped}
      bordered={bordered}
      sx={sx}
      {...props}
    >
      {children}
    </StyledTable>
  );
}

// Define the main component type with sub-components
interface ListingTableComponent {
  (props: ListingTableProps): ReactElement;
  Provider: typeof ListingTableProvider;
  Container: typeof ListingTableContainer;
  Head: typeof ListingTableHead;
  Body: typeof ListingTableBody;
  Footer: typeof ListingTableFooter;
  Row: typeof ListingTableRow;
  Cell: typeof ListingTableCell;
  CellIcon: typeof ListingTableCellIcon;
  RowActions: typeof ListingTableRowActions;
  EmptyState: typeof ListingTableEmptyState;
  Toolbar: typeof ListingTableToolbar;
  SortLabel: typeof ListingTableSortLabel;
  DensityControl: typeof ListingTableDensityControl;
}

// Create the compound component
const ListingTableCompound: ListingTableComponent = Object.assign(ListingTable, {
  Provider: ListingTableProvider,
  Container: ListingTableContainer,
  Head: ListingTableHead,
  Body: ListingTableBody,
  Footer: ListingTableFooter,
  Row: ListingTableRow,
  Cell: ListingTableCell,
  CellIcon: ListingTableCellIcon,
  RowActions: ListingTableRowActions,
  EmptyState: ListingTableEmptyState,
  Toolbar: ListingTableToolbar,
  SortLabel: ListingTableSortLabel,
  DensityControl: ListingTableDensityControl,
});

export default ListingTableCompound;
