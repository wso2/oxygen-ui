/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import React, {FC, ReactElement, useState} from 'react';
import clsx from 'clsx';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Radio,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './top-nav.scss';
import Avatar from '../Avatar';
import Image from '../Image';
import Menu from '../Menu';
import Button from '../Button';

export interface TopNavProps extends MuiAppBarProps {
  /**
   * URL for user avatar.
   */
  avatarUrl?: string;
  /**
   * Handle left navigation menu on button toggle.
   */
  handleLeftNav?: () => void;
  /**
   * Log out function.
   */
  handleLogOut?: () => void;
  /**
   * Path to navigate to the Home/Landing page.
   */
  homePath?: string;
  /**
   * Is the left navigation bar activated.
   */
  isLeftNavActive?: boolean;
  /**
   * URL for the App Nav logo.
   */
  logoUrl?: string;
  /**
   * URL for the App Nav logo in mobile screens.
   */
  mobileLogoUrl?: string;
  /**
   * Application portal name.
   */
  portalName?: string;
  /**
   * URL for the App Nav logo.
   */
  settings?: MenuSettingsInterface[];
  /**
   * List of themes.
   */
  themes?: ThemeListInterface[];
  /**
   * Email of the logged user.
   */
  userEmail?: string;
  /**
   * Username of the logged user.
   */
  userName?: string;
}

export interface MenuSettingsInterface {
  icon?: string | ReactElement;
  name: string;
  path: string;
}

export interface ThemeListInterface {
  icon?: string | ReactElement;
  name: string;
}

const COMPONENT_NAME: string = 'TopNav';

const TopNav: FC<TopNavProps> & WithWrapperProps = (props: TopNavProps): ReactElement => {
  const {
    className,
    isLeftNavActive,
    logoUrl,
    avatarUrl,
    settings,
    themes,
    mobileLogoUrl,
    portalName,
    userName,
    userEmail,
    homePath,
    handleLogOut,
    handleLeftNav,
    ...rest
  } = props;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [selectedTheme, setSelectedTheme] = useState('System Default');

  const classes: string = clsx('oxygen-top-nav', className);

  const open: boolean = Boolean(anchorElUser);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const defaultThemes: ThemeListInterface[] = [
    {icon: <DisabledByDefaultOutlinedIcon />, name: 'System Default'},
    {icon: <LightModeOutlinedIcon />, name: 'Light'},
    {icon: <DarkModeOutlinedIcon />, name: 'Dark'},
    {icon: <ContrastOutlinedIcon />, name: 'High Contrast'},
  ];

  const onThemeChange = (theme: string) => () => {
    setSelectedTheme(theme);
  };

  const isMobile: boolean = useMediaQuery('(max-width:768px)');

  return (
    <MuiAppBar color="default" position="static" className={classes} {...rest}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isLeftNavActive && (
            <IconButton aria-label="Menu Icon" onClick={handleLeftNav} className="menu-icon-button">
              <MenuIcon />
            </IconButton>
          )}
          <Box
            component={homePath ? Link : Box}
            className={homePath ? 'logo-box with-link' : 'logo-box'}
            href={homePath}
            color="inherit"
            underline="none"
            aria-label="Home Page"
          >
            {(logoUrl || mobileLogoUrl) && (
              <Image
                className="logo"
                src={isMobile && mobileLogoUrl ? mobileLogoUrl : logoUrl}
                alt="Logo"
                width="auto"
              />
            )}
            <Typography variant="h6" className="portal-name">
              {portalName}
            </Typography>
          </Box>

          <Box className="settings">
            {settings?.map((setting: MenuSettingsInterface) => (
              <Button
                color="inherit"
                href={setting.path}
                key={setting.name}
                startIcon={
                  typeof setting.icon === 'string' ? (
                    <Image src={String(setting.icon)} alt={`${setting.name} icon`} />
                  ) : (
                    setting.icon
                  )
                }
              >
                {setting.name}
              </Button>
            ))}
          </Box>

          <Box className="user-dropdown-menu">
            <Button
              className="test"
              color="inherit"
              aria-controls={open ? 'user-menu' : undefined}
              aria-owns={open ? 'user-menu' : null}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenUserMenu}
              startIcon={<Avatar className="user-icon" alt="User Icon" src={avatarUrl} />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {userName}
            </Button>
            <Menu id="user-menu" anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              <List disablePadding>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={avatarUrl} alt="User" />
                  </ListItemAvatar>
                  <ListItemText primary={userName} secondary={userEmail} />
                </ListItem>
                <Box>
                  <Divider />
                </Box>
                <List subheader={<ListSubheader>Theme</ListSubheader>}>
                  {(themes || defaultThemes)?.map((theme: ThemeListInterface) => {
                    const labelId: string = `theme-label-${theme.name}`;
                    return (
                      <ListItem className="theme-list-item">
                        <ListItemIcon>{theme.icon}</ListItemIcon>
                        <ListItemText primary={theme.name} />
                        <Radio
                          checked={selectedTheme === theme.name}
                          onChange={onThemeChange(theme.name)}
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
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItem>
              </List>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

TopNav.displayName = composeComponentDisplayName(COMPONENT_NAME);
TopNav.muiName = COMPONENT_NAME;
TopNav.defaultProps = {
  isLeftNavActive: true,
  portalName: 'Account',
};

export default TopNav;
