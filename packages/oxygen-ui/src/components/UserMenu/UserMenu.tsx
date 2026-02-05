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
import Menu from '@mui/material/Menu';
import { UserMenuContext } from './UserMenuContext';
import { UserMenuTrigger } from './UserMenuTrigger';
import { UserMenuHeader } from './UserMenuHeader';
import { UserMenuItem } from './UserMenuItem';
import { UserMenuLogout } from './UserMenuLogout';
import { UserMenuDivider } from './UserMenuDivider';

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
 * Props for the UserMenu root component (composition pattern).
 */
export interface UserMenuProps {
  /** Child elements (Trigger, Header, Item components) */
  children: React.ReactNode;
}

/**
 * UserMenu - Dropdown menu for user account actions.
 *
 * A compound component using the composition pattern for flexible menu customization.
 *
 * Composition pattern example:
 * ```tsx
 * <UserMenu>
 *   <UserMenu.Trigger user={mockUser} />
 *   <UserMenu.Header user={mockUser} />
 *   <UserMenu.Item icon={<UserIcon />} label="Profile" onClick={...} />
 *   <UserMenu.Item icon={<Settings />} label="Settings" onClick={...} />
 *   <UserMenu.Divider />
 *   <UserMenu.Item icon={<LogOut />} label="Log out" destructive onClick={...} />
 * </UserMenu>
 * ```
 */
const UserMenu: React.FC<UserMenuProps> & {
  Trigger: typeof UserMenuTrigger;
  Header: typeof UserMenuHeader;
  Item: typeof UserMenuItem;
  Logout: typeof UserMenuLogout;
  Divider: typeof UserMenuDivider;
} = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Separate trigger from menu content
  const childrenArray = React.Children.toArray(children);
  const triggerChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === UserMenuTrigger
  );
  const menuChildren = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type !== UserMenuTrigger
  );

  return (
    <UserMenuContext.Provider value={{ open, anchorEl, handleOpen, handleClose }}>
      {triggerChild}
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
        {menuChildren}
      </Menu>
    </UserMenuContext.Provider>
  );
};

// Attach sub-components
UserMenu.Trigger = UserMenuTrigger;
UserMenu.Header = UserMenuHeader;
UserMenu.Item = UserMenuItem;
UserMenu.Logout = UserMenuLogout;
UserMenu.Divider = UserMenuDivider;
UserMenu.displayName = 'UserMenu';

export { UserMenu };
export default UserMenu;
