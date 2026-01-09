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

import { ReactElement, ReactNode, useCallback } from 'react';
import MuiTableSortLabel, { TableSortLabelProps as MuiTableSortLabelProps } from '@mui/material/TableSortLabel';
import { styled } from '@mui/material/styles';
import { useListingTable } from '../context';

export type ListingSortDirection = 'asc' | 'desc' | false;

export interface ListingTableSortLabelProps extends Omit<MuiTableSortLabelProps, 'direction'> {
  /**
   * Field/column identifier for context-based sorting.
   * When provided and used with ListingTable.Provider, the component will
   * automatically connect to the context for sort state and handling.
   */
  field?: string;
  /**
   * Whether this column is currently sorted.
   * When using with Provider and field prop, this is automatically derived from context.
   */
  active?: boolean;
  /**
   * Sort direction.
   * When using with Provider and field prop, this is automatically derived from context.
   */
  direction?: 'asc' | 'desc';
  /**
   * Click handler for sorting.
   * When using with Provider and field prop, this is automatically handled via context.
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /**
   * Label text
   */
  children: ReactNode;
  /**
   * Hide sort icon when not active
   * @default false
   */
  hideSortIcon?: boolean;
}

const StyledTableSortLabel = styled(MuiTableSortLabel)(({ theme }) => ({
  color: 'inherit !important',
  '&.Mui-active': {
    color: 'inherit !important',
    '& .MuiTableSortLabel-icon': {
      color: `${theme.palette.primary.main} !important`,
    },
  },
}));

export function ListingTableSortLabel({
  field,
  active: activeProp,
  direction: directionProp,
  onClick: onClickProp,
  children,
  hideSortIcon = false,
  ...props
}: ListingTableSortLabelProps): ReactElement {
  // Get context (may be null for backward compatibility)
  const tableContext = useListingTable();

  // Derive active state: props > context (when field matches)
  const isActiveFromContext = field !== undefined && tableContext?.sortField === field;
  const active = activeProp ?? isActiveFromContext;

  // Derive direction: props > context > default
  const direction = directionProp ?? (isActiveFromContext ? tableContext?.sortDirection : undefined) ?? 'asc';

  // Create context-aware click handler
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      // If explicit onClick provided, use that
      if (onClickProp) {
        onClickProp(event);
        return;
      }

      // Otherwise, use context handler if field is provided
      if (field && tableContext?.onSortChange) {
        // Toggle direction if already active, otherwise start with 'asc'
        const newDirection = active && direction === 'asc' ? 'desc' : 'asc';
        tableContext.onSortChange(field, newDirection);
      }
    },
    [onClickProp, field, tableContext, active, direction],
  );

  return (
    <StyledTableSortLabel active={active} direction={direction} onClick={handleClick} hideSortIcon={hideSortIcon} {...props}>
      {children}
    </StyledTableSortLabel>
  );
}

export default ListingTableSortLabel;
