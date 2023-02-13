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

import {Divider, ListItemAvatar, ListSubheader, Radio} from '@mui/material';
import {capitalize} from '@mui/material/utils';
import clsx from 'clsx';
import {FC, MouseEvent, ReactElement, ReactNode, useState} from 'react';
import {WithWrapperProps} from 'src/models';
import {composeComponentDisplayName} from '../../utils';
import Avatar from '../Avatar';
import Button, {ButtonProps} from '../Button';
import ListItem from '../ListItem';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import Menu, {MenuProps} from '../Menu';
import MenuItem from '../MenuItem';
import './button-dropdown-menu.scss';

/**
 * Interface for the Button Dropdown Menu component props.
 */
export interface ButtonDropdownMenuProps {
  /**
   * List item icon.
   */
  actionIcon?: ReactNode;
  /**
   * List item button text.
   */
  actionText?: string;
  /**
   * Props sent to the Button component;
   */
  buttonProps?: Omit<ButtonProps, 'onClick'>;
  /**
   * Props sent to the Menu component;
   */
  menuProps?: Omit<MenuProps, 'open' | 'anchorEl'>;
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
   * Callback function on list item action trigger.
   */
  onActionTrigger?: () => void;
  /**
   * Callback function on mode change.
   */
  onModeChange?: (mode: string) => void;
  /**
   * Callback function on navigation to logged user's profile.
   */
  onUserProfileNavigation?: () => void;
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
 * Button Dropdown Menu component.
 */
const ButtonDropdownMenu: FC<ButtonDropdownMenuProps> & WithWrapperProps = (
  props: ButtonDropdownMenuProps & WithWrapperProps,
) => {
  const {
    buttonProps,
    user,
    modes,
    mode,
    onUserProfileNavigation,
    modesHeading,
    actionText,
    actionIcon,
    onModeChange,
    onActionTrigger,
    menuProps,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleModeChange = (selectedMode: string): void => {
    onModeChange(selectedMode);
  };

  const onCloseMenu = (): void => {
    setAnchorEl(null);
  };

  const handleUserProfileNavigation = (): void => {
    onCloseMenu();
    onUserProfileNavigation();
  };

  const handleActionTrigger = (): void => {
    onCloseMenu();
    onActionTrigger();
  };

  const openMenu: boolean = Boolean(anchorEl);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button aria-controls="oxygen-button-menu" aria-haspopup="true" onClick={handleOpenUserMenu} {...buttonProps} />
      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        className="oxygen-button-dropdown-menu"
        id="oxygen-button-menu"
        onClose={onCloseMenu}
        {...menuProps}
      >
        {menuProps?.children}
        {user && (
          <ListItem
            className={clsx('dropdown-list-item', {
              clickable: Boolean(onUserProfileNavigation),
            })}
            onClick={(): void => handleUserProfileNavigation()}
          >
            <ListItemAvatar>
              <Avatar src={user?.image} alt="User" />
            </ListItemAvatar>
            <ListItemText primary={user?.name} secondary={user?.email} />
          </ListItem>
        )}
        {modes?.length > 0 && (
          <>
            <Divider />
            <ListSubheader>{modesHeading}</ListSubheader>
            {modes?.map((theme: ModeListInterface) => {
              const {name, icon} = theme;
              return (
                <MenuItem className="dropdown-menu-item" key={name} onClick={(): void => handleModeChange(name)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={capitalize(name)} />
                  <Radio
                    edge="end"
                    checked={mode === name}
                    onChange={(): void => handleModeChange(name)}
                    value={name}
                    name="radio-buttons"
                    inputProps={{'aria-label': `mode-label-${name}`}}
                  />
                </MenuItem>
              );
            })}
          </>
        )}
        {actionText && (
          <>
            <Divider />
            <MenuItem className="dropdown-menu-item" onClick={(): void => handleActionTrigger()}>
              <ListItemIcon>{actionIcon}</ListItemIcon>
              <ListItemText primary={actionText} />
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
};

ButtonDropdownMenu.displayName = composeComponentDisplayName(COMPONENT_NAME);
ButtonDropdownMenu.muiName = COMPONENT_NAME;

export default ButtonDropdownMenu;
