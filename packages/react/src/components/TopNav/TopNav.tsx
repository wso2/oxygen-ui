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
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {Box, Container, IconButton, Toolbar, Typography, useMediaQuery} from '@mui/material';
import {
  ChevronDownIcon,
  EclipseIcon,
  SunIcon,
  SunContrastIcon,
  CresentBrightIcon,
  HamburgerIcon,
} from '@oxygen-ui/react-icons';
import {useTheme, Theme} from '@mui/material/styles';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './top-nav.scss';
import Avatar from '../Avatar';
import Button from '../Button';
import Link from '../Link';
import UserDropdownMenu, {ThemeListInterface} from '../UserDropdownMenu';

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
  icon?: ReactElement;
  name: string;
  path: string;
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

  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const classes: string = clsx(
    'oxygen-top-nav',
    {
      mobile: isMobile,
    },
    className,
  );

  const open: boolean = Boolean(anchorElUser);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const defaultThemes: ThemeListInterface[] = [
    {icon: <EclipseIcon />, name: 'System Default'},
    {icon: <SunIcon />, name: 'Light'},
    {icon: <CresentBrightIcon />, name: 'Dark'},
    {icon: <SunContrastIcon />, name: 'High Contrast'},
  ];

  const onThemeChange = (mode: string): void => {
    setSelectedTheme(mode);
  };

  return (
    <MuiAppBar position="static" color="inherit" variant="outlined" elevation={0} className={classes} {...rest}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isLeftNavActive && (
            <IconButton aria-label="Menu Icon" onClick={handleLeftNav} className="menu-icon-button">
              <HamburgerIcon />
            </IconButton>
          )}
          <Box
            component={homePath ? Link : Box}
            className={clsx('logo-box', {
              'with-link': Boolean(homePath),
            })}
            href={homePath}
            underline="none"
            aria-label="Home Page"
            color="inherit"
          >
            <Box className="logo">{isMobile ? mobileLogo ?? logo : logo}</Box>
            <Typography variant="h6" className="portal-name">
              {portalName}
            </Typography>
          </Box>

          <Box className="nav-settings">
            {navSettings?.map((setting: NavSettingsInterface) => (
              <Button
                className="setting"
                href={setting.path}
                key={setting.name}
                startIcon={setting.icon}
                color="inherit"
              >
                {setting.name}
              </Button>
            ))}
          </Box>

          <Box className="user-dropdown-menu">
            <Button
              aria-controls={open ? 'user-menu' : undefined}
              aria-owns={open ? 'user-menu' : null}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenUserMenu}
              startIcon={<Avatar className="user-image" alt="User Image" src={userImage} />}
              endIcon={<ChevronDownIcon />}
              color="inherit"
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

export default TopNav;
