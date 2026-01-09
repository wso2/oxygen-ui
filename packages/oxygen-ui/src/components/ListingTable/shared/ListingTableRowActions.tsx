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

import { ReactElement, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

export interface ListingTableRowActionsProps {
  /**
   * Action buttons or elements
   */
  children: ReactNode;
  /**
   * Whether actions are always visible or only on row hover
   * @default 'always'
   */
  visibility?: 'always' | 'hover';
  /**
   * Alignment of action buttons
   * @default 'right'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Custom styles for the container
   */
  sx?: SxProps<Theme>;
}

const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export function ListingTableRowActions({
  children,
  visibility = 'always',
  align = 'right',
  sx,
}: ListingTableRowActionsProps): ReactElement {
  return (
    <Box
      className="table-row-actions"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: alignmentMap[align],
        gap: 0.5,
        ...(visibility === 'hover' && {
          opacity: 0,
          transition: 'opacity 0.2s ease-in-out',
          // Support both TableView rows and ListView items
          '.MuiTableRow-root:hover &, .list-view-item:hover &': {
            opacity: 1,
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default ListingTableRowActions;
