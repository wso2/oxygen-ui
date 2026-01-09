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

import { ReactElement } from 'react';
import MuiTableCell, { TableCellProps as MuiTableCellProps } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

export interface ListingTableCellProps extends MuiTableCellProps {
  /**
   * Truncate text with ellipsis when content overflows
   * @default false
   */
  truncate?: boolean;
  /**
   * Maximum width for the cell (useful with truncate)
   */
  maxWidth?: number | string;
}

interface StyledTableCellProps {
  truncate?: boolean;
  maxWidth?: number | string;
}

const StyledTableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => {
    const excludedProps = ['truncate', 'maxWidth'];
    return !excludedProps.some((excluded) => excluded === prop);
  },
})<StyledTableCellProps>(({ truncate, maxWidth }) => ({
  ...(truncate && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  ...(maxWidth && {
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
  }),
}));

export function ListingTableCell({
  truncate = false,
  maxWidth,
  children,
  ...props
}: ListingTableCellProps): ReactElement {
  return (
    <StyledTableCell truncate={truncate} maxWidth={maxWidth} {...props}>
      {children}
    </StyledTableCell>
  );
}

export default ListingTableCell;
