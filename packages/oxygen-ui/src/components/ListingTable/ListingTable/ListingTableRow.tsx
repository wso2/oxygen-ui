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
import MuiTableRow, { TableRowProps as MuiTableRowProps } from '@mui/material/TableRow';
import { styled, alpha } from '@mui/material/styles';
import { ListingTableVariant } from '../shared/types';
import type { OxygenTheme } from '../../../styles/Themes/OxygenThemeBase';

export interface ListingTableRowProps extends MuiTableRowProps {
  /**
   * Make the row clickable with pointer cursor
   * @default false
   */
  clickable?: boolean;
  /**
   * Display variant - controls card-like styling
   * When 'card', applies rounded corners and border
   * @default 'table'
   */
  variant?: ListingTableVariant;
}

interface StyledTableRowProps {
  clickable?: boolean;
  variant?: ListingTableVariant;
}

const StyledTableRow = styled(MuiTableRow, {
  shouldForwardProp: (prop) => !['clickable', 'variant'].includes(prop as string),
})<StyledTableRowProps>(({ theme: muiTheme, clickable, variant = 'table' }) => {
  const theme = muiTheme as OxygenTheme;
  const borderRadius = typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius * 3 : 12;
  const isDarkMode = theme.palette.mode === 'dark';

  return {
    ...(clickable && {
      cursor: 'pointer',
    }),
    // Card variant specific styles
    ...(variant === 'card' && {
      // Use acrylic background for glassmorphism effect, consistent with MuiCard/MuiPaper
      backgroundColor: theme.vars?.palette.background.acrylic ?? theme.palette.background.paper,
      backdropFilter: theme.blur?.light,
      WebkitBackdropFilter: theme.blur?.light,
      borderRadius,
      '& .MuiTableCell-root': {
        borderBottom: 'none',
        backgroundColor: 'transparent',
        '&:first-of-type': {
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        },
        '&:last-of-type': {
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        },
      },
      // Subtle border - slightly more visible in dark mode
      boxShadow: `inset 0 0 0 1px ${alpha(
        isDarkMode ? theme.palette.common.white : theme.palette.common.black,
        isDarkMode ? 0.1 : 0.06
      )}`,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    }),
    // Table variant - remove last child border
    ...(variant === 'table' && {
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }),
  };
});

export function ListingTableRow({
  clickable = false,
  variant = 'table',
  children,
  ...props
}: ListingTableRowProps): ReactElement {
  return (
    <StyledTableRow clickable={clickable} variant={variant} {...props}>
      {children}
    </StyledTableRow>
  );
}

export default ListingTableRow;
