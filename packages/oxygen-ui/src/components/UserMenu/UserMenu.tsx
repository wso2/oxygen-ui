/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import {
  User as UserIcon,
  Settings,
  CreditCard,
  LogOut,
  ChevronRight,
} from '@wso2/oxygen-ui-icons-react';

/**
 * Styled avatar button for the user menu trigger.
 */
const UserMenuTrigger = styled(IconButton, {
  name: 'MuiUserMenu',
  slot: 'Trigger',
})(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

/**
 * Styled avatar for the user menu.
 */
const UserMenuAvatar = styled(Avatar, {
  name: 'MuiUserMenu',
  slot: 'Avatar',
})(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: (theme.vars || theme).palette.primary.main,
  color: (theme.vars || theme).palette.primary.contrastText,
  fontSize: 14,
  fontWeight: 600,
}));

/**
 * Styled large avatar for the menu header.
 */
const UserMenuHeaderAvatar = styled(Avatar, {
  name: 'MuiUserMenu',
  slot: 'HeaderAvatar',
})(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: (theme.vars || theme).palette.primary.main,
  color: (theme.vars || theme).palette.primary.contrastText,
  fontSize: 16,
  fontWeight: 600,
}));

/**
 * Styled header container.
 */
const UserMenuHeader = styled(Box, {
  name: 'MuiUserMenu',
  slot: 'Header',
})(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

/**
 * Styled header content container.
 */
const UserMenuHeaderContent = styled(Box, {
  name: 'MuiUserMenu',
  slot: 'HeaderContent',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

/**
 * Styled user info container.
 */
const UserMenuUserInfo = styled(Box, {
  name: 'MuiUserMenu',
  slot: 'UserInfo',
})({
  flex: 1,
  minWidth: 0,
});

/**
 * Styled user name row.
 */
const UserMenuNameRow = styled(Box, {
  name: 'MuiUserMenu',
  slot: 'NameRow',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

/**
 * Styled user name.
 */
const UserMenuName = styled(Typography, {
  name: 'MuiUserMenu',
  slot: 'Name',
})({
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/**
 * Styled role chip.
 */
const UserMenuRoleChip = styled(Chip, {
  name: 'MuiUserMenu',
  slot: 'RoleChip',
})({
  height: 20,
  fontSize: 11,
  fontWeight: 600,
});

/**
 * Styled email text.
 */
const UserMenuEmail = styled(Typography, {
  name: 'MuiUserMenu',
  slot: 'Email',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

/**
 * Styled menu item.
 */
const UserMenuMenuItem = styled(MenuItem, {
  name: 'MuiUserMenu',
  slot: 'MenuItem',
})(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

/**
 * Styled logout menu item.
 */
const UserMenuLogoutItem = styled(MenuItem, {
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
 * Styled logout icon container.
 */
const UserMenuLogoutIcon = styled(ListItemIcon, {
  name: 'MuiUserMenu',
  slot: 'LogoutIcon',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.error.main,
}));

/**
 * Styled billing chip.
 */
const UserMenuBillingChip = styled(Chip, {
  name: 'MuiUserMenu',
  slot: 'BillingChip',
})({
  height: 18,
  fontSize: 10,
});

/**
 * User information for the UserMenu.
 */
export interface UserMenuUser {
  /** User display name */
  name: string;
  /** User email address */
  email: string;
  /** Avatar text or initials */
  avatar?: string;
  /** Role or plan badge (e.g., "Pro", "Admin") */
  role?: string;
}

/**
 * Props for the UserMenu component.
 */
export interface UserMenuProps {
  /** User information */
  user: UserMenuUser;
  /** Callback when profile is clicked */
  onProfileClick?: () => void;
  /** Callback when settings is clicked */
  onSettingsClick?: () => void;
  /** Callback when billing is clicked */
  onBillingClick?: () => void;
  /** Callback when logout is clicked */
  onLogout?: () => void;
}

/**
 * UserMenu - User profile dropdown menu component.
 *
 * Features:
 * - User avatar button that opens dropdown
 * - User info header with name, email, and role badge
 * - Menu items for Profile, Settings, Billing, and Logout
 * - Destructive styling for logout action
 * - Role/plan badge display (e.g., "Pro")
 *
 * Usage:
 * ```tsx
 * <UserMenu
 *   user={{
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     avatar: 'JD',
 *     role: 'Pro'
 *   }}
 *   onProfileClick={() => navigate('/profile')}
 *   onSettingsClick={() => navigate('/settings')}
 *   onBillingClick={() => navigate('/billing')}
 *   onLogout={() => handleLogout()}
 * />
 * ```
 */
export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  onProfileClick,
  onSettingsClick,
  onBillingClick,
  onLogout,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (callback?: () => void) => {
    handleClose();
    callback?.();
  };

  return (
    <>
      <Tooltip title="Account">
        <UserMenuTrigger
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <UserMenuAvatar>
            {user.avatar || user.name.charAt(0)}
          </UserMenuAvatar>
        </UserMenuTrigger>
      </Tooltip>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 240,
              mt: 1,
            },
          },
        }}
      >
        {/* User info header */}
        <UserMenuHeader>
          <UserMenuHeaderContent>
            <UserMenuHeaderAvatar>
              {user.avatar || user.name.charAt(0)}
            </UserMenuHeaderAvatar>
            <UserMenuUserInfo>
              <UserMenuNameRow>
                <UserMenuName variant="subtitle2">
                  {user.name}
                </UserMenuName>
                {user.role && (
                  <UserMenuRoleChip
                    label={user.role}
                    size="small"
                    color="primary"
                  />
                )}
              </UserMenuNameRow>
              <UserMenuEmail variant="caption">
                {user.email}
              </UserMenuEmail>
            </UserMenuUserInfo>
          </UserMenuHeaderContent>
        </UserMenuHeader>

        <Divider />

        {/* Menu items */}
        <UserMenuMenuItem onClick={() => handleMenuAction(onProfileClick)}>
          <ListItemIcon>
            <UserIcon size={18} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
          <ChevronRight size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
        </UserMenuMenuItem>

        <UserMenuMenuItem onClick={() => handleMenuAction(onSettingsClick)}>
          <ListItemIcon>
            <Settings size={18} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
          <ChevronRight size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
        </UserMenuMenuItem>

        <UserMenuMenuItem onClick={() => handleMenuAction(onBillingClick)}>
          <ListItemIcon>
            <CreditCard size={18} />
          </ListItemIcon>
          <ListItemText primary="Billing" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {user.role && (
              <UserMenuBillingChip
                label={user.role}
                size="small"
                variant="outlined"
              />
            )}
            <ChevronRight size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
          </Box>
        </UserMenuMenuItem>

        <Divider />

        {/* Logout - destructive action */}
        <UserMenuLogoutItem onClick={() => handleMenuAction(onLogout)}>
          <UserMenuLogoutIcon>
            <LogOut size={18} />
          </UserMenuLogoutIcon>
          <ListItemText primary="Log out" />
        </UserMenuLogoutItem>
      </Menu>
    </>
  );
};

export default UserMenu;
