/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { ChevronRight } from '@wso2/oxygen-ui-icons-react';
import { useUserMenu } from './UserMenuContext';

/**
 * Props for the UserMenu.Item component.
 */
export interface UserMenuItemProps {
  /** Icon to display on the left */
  icon?: React.ReactNode;
  /** Item label text */
  label: string;
  /** Optional badge/chip to display on the right */
  badge?: string;
  /** Callback when item is clicked */
  onClick?: () => void;
}

/**
 * Styled menu item.
 */
const StyledMenuItem = styled(MenuItem, {
  name: 'MuiUserMenu',
  slot: 'MenuItem',
})(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

/**
 * Styled billing chip.
 */
const StyledBillingChip = styled(Chip, {
  name: 'MuiUserMenu',
  slot: 'BillingChip',
})(() => ({
  height: 20,
  fontSize: 11,
  fontWeight: 600,
}));

/**
 * UserMenu.Item - Individual menu item with icon and label.
 */
export const UserMenuItem: React.FC<UserMenuItemProps> = ({
  icon,
  label,
  badge,
  onClick,
}) => {
  const { handleClose } = useUserMenu();

  const handleClick = () => {
    handleClose();
    onClick?.();
  };

  return (
    <StyledMenuItem onClick={handleClick}>
      {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText primary={label} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {badge && (
          <StyledBillingChip
            label={badge}
            size="small"
            variant="outlined"
          />
        )}
        <ChevronRight size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
      </Box>
    </StyledMenuItem>
  );
};
