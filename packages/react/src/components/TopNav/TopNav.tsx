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
import {Box, Container, IconButton, Link, Toolbar, Typography, useMediaQuery} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './top-nav.scss';
import Avatar from '../Avatar';
import Image from '../Image';
import Button from '../Button';
import UserDropdownMenu from '../UserDropdownMenu';

export interface TopNavProps extends MuiAppBarProps {
  /**
   * Handle left navigation bar button toggle.
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
   * File path or URL for the logo in the top navigation bar.
   */
  logo?: string;
  /**
   * File path or URL for the logo in the top navigation bar for mobile screens.
   */
  mobileLogo?: string;
  /**
   * Settings available on the top navigation bar.
   */
  navSettings?: NavSettingsInterface[];
  /**
   * Application portal name.
   */
  portalName?: string;
  /**
   * List of themes.
   */
  themes?: ThemeListInterface[];
  /**
   * Email of the logged user.
   */
  userEmail?: string;
  /**
   * File path or URL for user's profile image.
   */
  userImage?: string;
  /**
   * Username of the logged user.
   */
  userName?: string;
}

export interface NavSettingsInterface {
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
    logo,
    userImage,
    navSettings,
    themes,
    mobileLogo,
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

  const onThemeChange = (theme: string): void => {
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
            {(logo || mobileLogo) && (
              <Image className="logo" src={isMobile && mobileLogo ? mobileLogo : logo} alt="Logo" width="auto" />
            )}
            <Typography variant="h6" className="portal-name">
              {portalName}
            </Typography>
          </Box>

          <Box className="nav-settings">
            {navSettings?.map((setting: NavSettingsInterface) => (
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
              color="inherit"
              aria-controls={open ? 'user-menu' : undefined}
              aria-owns={open ? 'user-menu' : null}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenUserMenu}
              startIcon={<Avatar className="user-icon" alt="User Icon" src={userImage} />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {userName}
            </Button>
            <UserDropdownMenu
              menuID="user-menu"
              userImage={userImage}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              userDisplayName={userName}
              userEmail={userEmail}
              themesHeading="Theme"
              themes={defaultThemes}
              handleLogOut={handleLogOut}
              logOutText="Log Out"
              selectedTheme={selectedTheme}
              onThemeChange={onThemeChange}
            />
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
