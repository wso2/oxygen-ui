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

export interface ListingTableCellIconProps {
  /**
   * Icon element to display
   */
  icon: ReactNode;
  /**
   * Primary text content
   */
  primary: string;
  /**
   * Secondary text content (optional)
   */
  secondary?: string;
  /**
   * Icon position relative to text
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  /**
   * Custom styles for the icon wrapper
   */
  iconSx?: SxProps<Theme>;
  /**
   * Custom styles for the container
   */
  sx?: SxProps<Theme>;
}

export function ListingTableCellIcon({
  icon,
  primary,
  secondary,
  iconPosition = 'left',
  iconSx,
  sx,
}: ListingTableCellIconProps): ReactElement {
  const iconElement = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'text.secondary',
        ...iconSx,
      }}
    >
      {icon}
    </Box>
  );

  const textContent = (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography
        variant="body2"
        component="div"
        sx={{
          fontWeight: 500,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {primary}
      </Typography>
      {secondary && (
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {secondary}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        minWidth: 0,
        ...sx,
      }}
    >
      {iconPosition === 'left' ? (
        <>
          {iconElement}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {iconElement}
        </>
      )}
    </Box>
  );
}

export default ListingTableCellIcon;
