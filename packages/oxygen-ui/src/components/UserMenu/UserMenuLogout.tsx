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
import { styled } from '@mui/material/styles';
import { useUserMenu } from './UserMenuContext';

/**
 * Props for the UserMenu.Logout component.
 */
export interface UserMenuLogoutProps {
  /** Icon to display on the left */
  icon?: React.ReactNode;
  /** Item label text (default: "Log out") */
  label?: string;
  /** Callback when item is clicked */
  onClick?: () => void;
}

/**
 * Styled logout menu item with destructive styling.
 */
const StyledLogoutItem = styled(MenuItem, {
  name: 'MuiUserMenu',
  slot: 'LogoutItem',
})(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  color: (theme.vars || theme).palette.error.main,
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.error.main,
    color: (theme.vars || theme).palette.error.contrastText,
    '& .MuiListItemIcon-root': {
      color: (theme.vars || theme).palette.error.contrastText,
    },
  },
}));

/**
 * UserMenu.Logout - Destructive menu item for logout action.
 */
export const UserMenuLogout: React.FC<UserMenuLogoutProps> = ({
  icon,
  label = 'Log out',
  onClick,
}) => {
  const { handleClose } = useUserMenu();

  const handleClick = () => {
    handleClose();
    onClick?.();
  };

  return (
    <StyledLogoutItem onClick={handleClick}>
      {icon && (
        <ListItemIcon>
          {React.isValidElement(icon)
            ? React.cloneElement(icon, {
                size: (icon.props as { size?: number }).size ?? 18,
                ...(icon.props as object),
              } as React.Attributes)
            : icon}
        </ListItemIcon>
      )}
      <ListItemText primary={label} />
    </StyledLogoutItem>
  );
};

UserMenuLogout.displayName = 'UserMenu.Logout';
