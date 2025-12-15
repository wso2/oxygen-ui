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
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
  Divider,
  Chip,
  Tooltip,
} from '@wso2/oxygen-ui';
import {
  User as UserIcon,
  Settings,
  CreditCard,
  LogOut,
  ChevronRight,
} from '@wso2/oxygen-ui-icons-react';
import type { User } from './types';

/**
 * Props for the AppShellUserMenu component.
 */
export interface AppShellUserMenuProps {
  /** User information */
  user: User;
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
 * AppShellUserMenu - User profile dropdown menu component.
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
 * <AppShellUserMenu
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
export const AppShellUserMenu: React.FC<AppShellUserMenuProps> = ({
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
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ p: 0.5 }}
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {user.avatar || user.name.charAt(0)}
          </Avatar>
        </IconButton>
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
        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {user.avatar || user.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.name}
                </Typography>
                {user.role && (
                  <Chip
                    label={user.role}
                    size="small"
                    color="primary"
                    sx={{
                      height: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Menu items */}
        <MenuItem
          onClick={() => handleMenuAction(onProfileClick)}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <UserIcon size={18} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
          <ChevronRight size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuAction(onSettingsClick)}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <Settings size={18} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
          <ChevronRight size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuAction(onBillingClick)}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <CreditCard size={18} />
          </ListItemIcon>
          <ListItemText primary="Billing" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {user.role && (
              <Chip
                label={user.role}
                size="small"
                variant="outlined"
                sx={{
                  height: 18,
                  fontSize: 10,
                }}
              />
            )}
            <ChevronRight size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
          </Box>
        </MenuItem>

        <Divider />

        {/* Logout - destructive action */}
        <MenuItem
          onClick={() => handleMenuAction(onLogout)}
          sx={{
            py: 1.5,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.main',
              color: 'error.contrastText',
              '& .MuiListItemIcon-root': {
                color: 'error.contrastText',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: 'error.main' }}>
            <LogOut size={18} />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppShellUserMenu;
