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

import { ReactElement, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';

export interface ListingTableEmptyStateProps {
  /**
   * Main title text
   * @default 'No data available'
   */
  title?: string;
  /**
   * Description text below the title
   */
  description?: string;
  /**
   * Custom illustration element (e.g., icon or image)
   */
  illustration?: ReactNode;
  /**
   * Action button or link element
   */
  action?: ReactNode;
  /**
   * Minimum height of the empty state container
   * @default 300
   */
  minHeight?: number | string;
  /**
   * Custom styles for the container
   */
  sx?: SxProps<Theme>;
}

export function ListingTableEmptyState({
  title = 'No data available',
  description,
  illustration,
  action,
  minHeight = 300,
  sx,
}: ListingTableEmptyStateProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        p: 4,
        textAlign: 'center',
        ...sx,
      }}
    >
      {illustration && (
        <Box
          sx={{
            mb: 2,
            color: 'text.secondary',
            '& svg': {
              width: 64,
              height: 64,
            },
          }}
        >
          {illustration}
        </Box>
      )}
      <Typography variant="h6" component="div" sx={{ mb: description ? 1 : 0, fontWeight: 500 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: action ? 2 : 0, maxWidth: 400 }}>
          {description}
        </Typography>
      )}
      {action && <Box>{action}</Box>}
    </Box>
  );
}

export default ListingTableEmptyState;
