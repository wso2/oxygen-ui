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

import React, {FC, MouseEvent, ReactElement, ReactNode, useState} from 'react';
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
import './top-navigation.scss';
import Avatar from '../Avatar';
import Button, {ButtonProps} from '../Button';
import Link from '../Link';
import UserDropdownMenu, {ThemeListInterface} from '../UserDropdownMenu';

/**
 * Interface for the Top Navigation component props.
 */
export interface TopNavigationProps extends MuiAppBarProps {
  /**
   * Brand information.
   */
  brand?: BrandTemplate;
  /**
   * Is the left navigation bar activated.
   */
  isLeftNavigationActive?: boolean;
  /**
   * Links available on the top navigation bar.
   */
  links: Omit<ButtonProps, 'color'>[];
  /**
   * Handle left navigation bar button toggle.
   */
  onLeftNavigationTrigger?: () => void;
  /**
   * Log out function.
   */
  onLogOut?: () => void;
  /**
   * List of themes.
   */
  themes?: ThemeListInterface[];
  /**
   * Logged user information.
   */
  user?: UserTemplate;
}

/**
 * Interface for the brand template.
 */
export interface BrandTemplate {
  logo?: {
    desktop?: ReactNode;
    mobile?: ReactNode;
  };
  onClick?: () => void;
  title?: ReactNode;
}

/**
 * Interface for the logged user template.
 */
export interface UserTemplate {
  email?: string;
  image?: string;
  name?: string;
}

const COMPONENT_NAME: string = 'TopNavigation';

/**
 * Top Navigation component.
 */
const TopNavigation: FC<TopNavigationProps> & WithWrapperProps = (props: TopNavigationProps): ReactElement => {
  const {
    className,
    children,
    isLeftNavigationActive,
    brand,
    user,
    links,
    themes,
    onLogOut,
    onLeftNavigationTrigger,
    ...rest
  } = props;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
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

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
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
          {isLeftNavigationActive && (
            <IconButton aria-label="Menu Icon" onClick={onLeftNavigationTrigger} className="menu-icon-button">
              <HamburgerIcon />
            </IconButton>
          )}
          {brand && (
            <Box
              component={brand.onClick ? Link : Box}
              className={clsx('logo-box', {
                'with-link': Boolean(brand.onClick),
              })}
              onClick={brand.onClick}
              underline="none"
              color="inherit"
            >
              <Box className="logo">{isMobile ? brand.logo.mobile ?? brand.logo.desktop : brand.logo.desktop}</Box>
              <Typography variant="h6" className="portal-name">
                {brand.title}
              </Typography>
            </Box>
          )}
          <Box className="nav-links-section">
            <>
              {children}
              {links?.length > 0 && (
                <Box className="nav-links">
                  {links?.map((link: ButtonProps) => {
                    const {children: linkChildren, href, startIcon, ...linkProps} = link;
                    return (
                      <Button className="link" href={href} startIcon={startIcon} color="inherit" {...linkProps}>
                        {linkChildren}
                      </Button>
                    );
                  })}
                </Box>
              )}
            </>
          </Box>
          <Box className="user-dropdown-menu">
            <Button
              aria-controls={open ? 'user-menu' : undefined}
              aria-owns={open ? 'user-menu' : null}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenUserMenu}
              startIcon={
                <Avatar className="user-image" alt="User Image" src={user?.image}>
                  {user?.name?.split('')[0]}
                </Avatar>
              }
              endIcon={<ChevronDownIcon />}
              color="inherit"
            >
              {user?.name}
            </Button>
            <UserDropdownMenu
              menuID="user-menu"
              user={user}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              themesHeading="Theme"
              themes={defaultThemes}
              onLogOut={onLogOut}
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

TopNavigation.displayName = composeComponentDisplayName(COMPONENT_NAME);
TopNavigation.muiName = COMPONENT_NAME;

export default TopNavigation;
