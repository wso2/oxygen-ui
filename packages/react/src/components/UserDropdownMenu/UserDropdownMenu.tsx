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

import {PowerIcon} from '@oxygen-ui/react-icons';
import {capitalize} from '@mui/material/utils';
import {
  Divider,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Radio,
  ListItem,
} from '@mui/material';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from 'src/models';
import Avatar from '../Avatar';
import {composeComponentDisplayName} from '../../utils';
import Menu, {MenuProps} from '../Menu';
import './user-dropdown-menu.scss';

/**
 * Interface for the User Dropdown Menu component props.
 */
export interface UserDropdownMenuProps extends MenuProps {
  /**
   * List item button text.
   */
  actionText?: string;
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
 * User Dropdown Menu component.
 */
const UserDropdownMenu: FC<UserDropdownMenuProps> & WithWrapperProps = (
  props: UserDropdownMenuProps & WithWrapperProps,
) => {
  const {
    className,
    user,
    modes,
    mode,
    onUserProfileNavigation,
    modesHeading,
    actionText,
    onModeChange,
    onActionTrigger,
    menuID,
    ...rest
  } = props;

  const classes: string = clsx('oxygen-user-dropdown-menu', className);

  const handleModeChange = (selectedMode: string): void => {
    onModeChange(selectedMode);
  };

  const handleUserProfileNavigation = (): void => {
    onUserProfileNavigation();
  };

  return (
    <Menu className={classes} id={menuID} {...rest}>
      <ListItem
        className={clsx('list-item', {
          clickable: Boolean(onUserProfileNavigation),
        })}
        onClick={(): void => handleUserProfileNavigation()}
      >
        <ListItemAvatar>
          <Avatar src={user?.image} alt="User" />
        </ListItemAvatar>
        <ListItemText primary={user?.name} secondary={user?.email} />
      </ListItem>
      <Divider />
      {modes?.length > 0 && (
        <>
          <ListSubheader>{modesHeading}</ListSubheader>
          {modes?.map((theme: ModeListInterface) => {
            const {name, icon} = theme;
            return (
              <MenuItem className="menu-item" key={name} onClick={(): void => handleModeChange(name)}>
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
      <Divider />
      <MenuItem className="menu-item" onClick={onActionTrigger}>
        <ListItemIcon>
          <PowerIcon />
        </ListItemIcon>
        <ListItemText primary={actionText} />
      </MenuItem>
    </Menu>
  );
};

UserDropdownMenu.displayName = composeComponentDisplayName(COMPONENT_NAME);
UserDropdownMenu.muiName = COMPONENT_NAME;

export default UserDropdownMenu;
