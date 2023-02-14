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

import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  capitalize,
  Divider,
  Drawer,
  DrawerProps,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Radio,
  Typography,
} from '@mui/material';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Avatar from '../Avatar';
import './left-navigation-mobile.scss';
import MenuItem from '../MenuItem';
import {ModeList} from '../UserDropdownMenu';

export interface LeftNavigationMobileProps extends DrawerProps {
  avatarUrl?: string;
  mode?: string;
  modes?: ModeList[];
  modesHeading?: string;
  onModeChange?: (mode: string) => void;
  open?: boolean;
  openDrawerCallback?: (arg) => void;
}

const COMPONENT_NAME: string = 'LeftNavResponsive';

const LeftNavigationMobile: FC<LeftNavigationMobileProps> & WithWrapperProps = (
  props: LeftNavigationMobileProps,
): ReactElement => {
  const {className, avatarUrl, openDrawerCallback, modes, modesHeading, mode, onModeChange, open, ...rest} = props;

  const handleModeChange = (selectedMode: string): void => {
    onModeChange(selectedMode);
  };

  return (
    <Drawer variant="persistent" className="oxygen-ui-drawer" open={open} {...rest}>
      <Box className="sideMenu-profile-box">
        <Avatar src={avatarUrl} />
        <Box className="sideMenu-profile-text">
          <Typography>Matthew</Typography>
          <Typography className="email">matthew@wso2.com</Typography>
        </Box>
      </Box>
      <Divider className="divider" light />
      <Box className="sideMenu-settings-box">
        {/* TODO: Replace with component. */}
        <List
          sx={{width: '100%'}}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader className="list-header" component="div" id="nested-list-subheader">
              Menu
            </ListSubheader>
          }
        >
          <ListItemButton className="list-item-button">
            <ListItemIcon className="list-item-icon">
              <SendIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
          <ListItemButton className="list-item-button">
            <ListItemIcon className="list-item-icon">
              <SendIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Personal Info" />
          </ListItemButton>
          <ListItemButton className="list-item-button">
            <ListItemIcon className="list-item-icon">
              <SendIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Security" />
          </ListItemButton>
        </List>
      </Box>
      <Divider className="divider" light />
      <Box className="sideMenu-apps-box">
        <List
          sx={{width: '100%'}}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader className="list-header" component="div" id="nested-list-subheader">
              Apps
            </ListSubheader>
          }
        >
          <ListItemButton className="list-item-button">
            <ListItemIcon className="list-item-icon">
              <SendIcon className="icon" />
            </ListItemIcon>{' '}
            <ListItemText primary="Console" />
          </ListItemButton>
        </List>
      </Box>
      <Divider className="divider" light />

      <Box className="sideMenu-theme-box">
        {/* TODO: Replace with component. */}
        <List
          className="radio-items-list"
          component="nav"
          subheader={
            <ListSubheader className="list-header" component="div" id="nested-list-subheader">
              Menu
            </ListSubheader>
          }
        >
          {modes?.length > 0 && (
            <>
              <Divider />
              <ListSubheader>{modesHeading}</ListSubheader>
              {modes?.map((theme: ModeList) => {
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
        </List>
      </Box>
    </Drawer>
  );
};

LeftNavigationMobile.displayName = composeComponentDisplayName(COMPONENT_NAME);
LeftNavigationMobile.muiName = COMPONENT_NAME;

export default LeftNavigationMobile;
