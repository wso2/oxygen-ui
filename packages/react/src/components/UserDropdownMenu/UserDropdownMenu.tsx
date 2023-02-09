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
import clsx from 'clsx';
import {PowerIcon} from '@oxygen-ui/react-icons';
import {composeComponentDisplayName} from '../../utils';
import Menu, {MenuProps} from '../Menu';
import './user-dropdown-menu.scss';
import Avatar from '../Avatar';

/**
 * Interface for the User Dropdown Menu component props.
 */
export interface UserDropdownMenuProps extends MenuProps {
  /**
   * Log out button text.
   */
  logOutText?: string;
  /**
   * The id attribute of Menu component.
   */
  menuID?: string;
  /**
   * Function on user logging out.
   */
  onLogOut?: () => void;
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
   * Logged user information.
   */
  user?: UserTemplate;
}

/**
 * Interface for the themes list.
 */
export interface ThemeListInterface {
  icon?: string | ReactElement;
  name: string;
}

/**
 * Interface for the logged user template.
 */
export interface UserTemplate {
  email?: string;
  image?: string;
  name?: string;
}

const COMPONENT_NAME: string = 'UserDropdownMenu';

/**
 * User Dropdown Menu component.
 */
const UserDropdownMenu: FC<UserDropdownMenuProps> & WithWrapperProps = (props: UserDropdownMenuProps) => {
  const {className, user, themes, selectedTheme, themesHeading, logOutText, onThemeChange, onLogOut, menuID, ...rest} =
    props;

  const classes: string = clsx('oxygen-user-dropdown-menu', className);

  const handleThemeChange = (theme: string): void => {
    onThemeChange(theme);
  };

  return (
    <Menu className={classes} id={menuID} {...rest}>
      <List disablePadding>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={user?.image} alt="User" />
          </ListItemAvatar>
          <ListItemText primary={user?.name} secondary={user?.email} />
        </ListItem>
        <Box>
          <Divider />
        </Box>
        {themes?.length > 0 && (
          <List subheader={<ListSubheader>{themesHeading}</ListSubheader>}>
            {themes?.map((theme: ThemeListInterface) => {
              const {name, icon} = theme;
              return (
                <ListItem className="theme-list-item" key={name}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                  <Radio
                    checked={selectedTheme === name}
                    onChange={(): void => handleThemeChange(name)}
                    value={name}
                    name="radio-buttons"
                    inputProps={{'aria-label': `theme-label-${name}`}}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
        <Box>
          <Divider />
        </Box>
        <ListItem className="logout-list-item" onClick={onLogOut}>
          <ListItemIcon>
            <PowerIcon />
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
