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
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
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
   * Current mode.
   */
  mode?: string;
  /**
   * Array list of modes
   */
  modes?: ModeListInterface[];
  /**
   * Heading of the modes list.
   */
  modesHeading?: string;
  /**
   * Callback function on user logging out.
   */
  onLogOut?: () => void;
  /**
   * Callback function on mode change.
   */
  onModeChange?: (mode: string) => void;
  /**
   * Logged user information.
   */
  user?: UserTemplate;
}

/**
 * Interface for the modes list.
 */
export interface ModeListInterface {
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
  const {className, user, modes, mode, modesHeading, logOutText, onModeChange, onLogOut, menuID, ...rest} = props;

  const classes: string = clsx('oxygen-user-dropdown-menu', className);

  const handleModeChange = (selectedMode: string): void => {
    onModeChange(selectedMode);
  };

  return (
    <Menu className={classes} id={menuID} {...rest}>
      <List className="list" disablePadding>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={user?.image} alt="User" />
          </ListItemAvatar>
          <ListItemText primary={user?.name} secondary={user?.email} />
        </ListItem>
        <Divider />
        {modes?.length > 0 && (
          <List subheader={<ListSubheader>{modesHeading}</ListSubheader>}>
            {modes?.map((theme: ModeListInterface) => {
              const {name, icon} = theme;
              return (
                <ListItem
                  disablePadding
                  key={name}
                  secondaryAction={
                    <Radio
                      edge="end"
                      checked={mode === name}
                      onChange={(): void => handleModeChange(name)}
                      value={name}
                      name="radio-buttons"
                      inputProps={{'aria-label': `mode-label-${name}`}}
                    />
                  }
                >
                  <ListItemButton onClick={(): void => handleModeChange(name)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PowerIcon />
            </ListItemIcon>
            <ListItemText primary={logOutText} />
          </ListItemButton>
        </ListItem>
      </List>
    </Menu>
  );
};

UserDropdownMenu.displayName = composeComponentDisplayName(COMPONENT_NAME);
UserDropdownMenu.muiName = COMPONENT_NAME;

export default UserDropdownMenu;
