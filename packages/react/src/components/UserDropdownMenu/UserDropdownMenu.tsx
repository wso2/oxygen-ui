/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import React, {FC, ReactElement} from 'react';
import {WithWrapperProps} from 'src/models';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Radio,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import clsx from 'clsx';
import {composeComponentDisplayName} from '../../utils';
import Menu, {MenuProps} from '../Menu';
import './user-dropdown-menu.scss';

export interface UserDropdownMenuProps extends MenuProps {
  /**
   * Function on user logging out.
   */
  handleLogOut?: () => void;
  /**
   * Log out button text.
   */
  logOutText?: string;
  /**
   * The id attribute of Menu component.
   */
  menuID?: string;
  /**
   * Function on theme change.
   */
  onThemeChange?: (theme: string) => void;
  /**
   * Current theme.
   */
  selectedTheme?: string;
  /**
   * Array list of themes
   */
  themes?: ThemeListInterface[];
  /**
   * Heading of the themes list.
   */
  themesHeading?: string;
  /**
   * Display name of logged user.
   */
  userDisplayName?: string;
  /**
   * Email of logged user.
   */
  userEmail?: string;
  /**
   * Profile image of logged user.
   */
  userImage?: string;
}

export interface ThemeListInterface {
  icon?: string | ReactElement;
  name: string;
}

const COMPONENT_NAME: string = 'UserDropdownMenu';

const UserDropdownMenu: FC<UserDropdownMenuProps> & WithWrapperProps = (props: UserDropdownMenuProps) => {
  const {
    className,
    userImage,
    userDisplayName,
    userEmail,
    themes,
    selectedTheme,
    themesHeading,
    logOutText,
    onThemeChange,
    handleLogOut,
    menuID,
    ...rest
  } = props;

  const classes: string = clsx('oxygen-user-dropdown-menu', className);

  const handleThemeChange = (theme: string): void => {
    onThemeChange(theme);
  };

  return (
    <Menu className={classes} id={menuID} {...rest}>
      <List disablePadding>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={userImage} alt="User" />
          </ListItemAvatar>
          <ListItemText primary={userDisplayName} secondary={userEmail} />
        </ListItem>
        <Box>
          <Divider />
        </Box>
        <List subheader={<ListSubheader>{themesHeading}</ListSubheader>}>
          {themes?.map((theme: ThemeListInterface) => {
            const labelId: string = `theme-label-${theme.name}`;
            return (
              <ListItem className="theme-list-item" key={theme.name}>
                <ListItemIcon>{theme.icon}</ListItemIcon>
                <ListItemText primary={theme.name} />
                <Radio
                  checked={selectedTheme === theme.name}
                  onChange={(): void => handleThemeChange(theme.name)}
                  value={theme.name}
                  name="radio-buttons"
                  inputProps={{'aria-label': labelId}}
                />
              </ListItem>
            );
          })}
        </List>
        <Box>
          <Divider />
        </Box>
        <ListItem className="logout-list-item" onClick={handleLogOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={logOutText} />
        </ListItem>
      </List>
    </Menu>
  );
};

UserDropdownMenu.displayName = composeComponentDisplayName(COMPONENT_NAME);
UserDropdownMenu.muiName = COMPONENT_NAME;
UserDropdownMenu.defaultProps = {
  logOutText: 'Log Out',
  themesHeading: 'Theme',
};

export default UserDropdownMenu;
