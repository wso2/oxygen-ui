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

import { useState } from 'react'
import { Fab, Menu, MenuItem, Box } from '@wso2/oxygen-ui'
import { Menu as MenuIcon } from '@wso2/oxygen-ui-icons-react'
import { useNavigate } from 'react-router'
import appRoutes from '../config/appRoutes'

export default function FloatingNavMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const navItems = appRoutes
    .flatMap((route) => route.children || [])
    .filter((child) => child.showInNav);

  return (
    <Box>
      <Fab
        color="primary"
        aria-label="navigation menu"
        onClick={handleClick}
        size="small"
        sx={{
          position: 'fixed',
          bottom: 60,
          right: 60,
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </Fab>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleNavigation('/')}>
          Home
        </MenuItem>
        {navItems.map((child) => (
          <MenuItem
            key={child.path}
            onClick={() => handleNavigation(child.path as string)}
          >
            {child.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
