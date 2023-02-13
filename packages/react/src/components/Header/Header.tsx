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

import {useMediaQuery} from '@mui/material';
import {useColorScheme, useTheme, Theme} from '@mui/material/styles';
import {Mode} from '@mui/system/cssVars/useCurrentColorScheme';
import {ChevronDownIcon, HamburgerIcon, PowerIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {FC, ReactElement, ReactNode} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './header.scss';
import AppBar, {AppBarProps} from '../AppBar';
import Avatar from '../Avatar';
import Box from '../Box';
import Button, {ButtonProps} from '../Button';
import IconButton from '../IconButton';
import Link from '../Link';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import UserDropdownMenu, {ModeListInterface, UserTemplate} from '../UserDropdownMenu';

export interface HeaderProps extends AppBarProps {
  /**
   * Brand information.
   */
  brand?: BrandTemplate;
  /**
   * Is the left navigation bar activated.
   */
  isLeftNavigationActive?: boolean;
  /**
   * Links available on the header.
   */
  links?: Omit<ButtonProps, 'color'>[];
  /**
   * List of modes.
   */
  modes?: ModeListInterface[];
  /**
   * Function to handle left navigation bar button toggle.
   */
  onLeftNavigationTrigger?: () => void;
  /**
   * Logged user information.
   */
  user?: UserTemplate;
}

export interface BrandTemplate {
  /**
   * Logo for the brand template.
   */
  logo?: {
    /**
     * Desktop logo for the brand template.
     */
    desktop?: ReactNode;
    /**
     * Mobile logo for the brand template.
     */
    mobile?: ReactNode;
  };
  /**
   * Function on clicking on the brand logo and name.
   */
  onClick?: () => void;
  /**
   * Title of the brand, portal name or company.
   */
  title?: ReactNode;
}

const COMPONENT_NAME: string = 'Header';

const Header: FC<HeaderProps> & WithWrapperProps = (props: HeaderProps): ReactElement => {
  const {className, children, isLeftNavigationActive, brand, user, links, modes, onLeftNavigationTrigger, ...rest} =
    props;

  const theme: Theme = useTheme();
  const {mode, setMode} = useColorScheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const classes: string = clsx(
    'oxygen-header',
    {
      mobile: isMobile,
    },
    className,
  );

  const onModeChange = (selectedMode: Mode): void => {
    setMode(selectedMode);
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      variant="outlined"
      elevation={0}
      className={classes}
      role="banner"
      {...rest}
    >
      <Toolbar>
        {isLeftNavigationActive && (
          <IconButton aria-label="Menu Icon" onClick={onLeftNavigationTrigger} className="menu-icon-button">
            <HamburgerIcon />
          </IconButton>
        )}
        {brand && (
          <Box
            tabIndex={0}
            component={Boolean(brand.onClick) && Link}
            className={clsx('logo-box', {
              'with-link': Boolean(brand.onClick),
            })}
            onClick={brand.onClick}
            color="inherit"
          >
            <Box className="logo">{isMobile ? brand.logo.mobile ?? brand.logo.desktop : brand.logo.desktop}</Box>
            <Typography variant="h1" className="portal-name">
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
                    <Button
                      key={links.indexOf(link)}
                      className="link"
                      href={href}
                      startIcon={startIcon}
                      color="inherit"
                      {...linkProps}
                    >
                      {linkChildren}
                    </Button>
                  );
                })}
              </Box>
            )}
          </>
        </Box>
        <Box className="dropdown-menu">
          <UserDropdownMenu
            user={user}
            triggerOptions={{
              children: user?.name,
              color: 'inherit',
              endIcon: <ChevronDownIcon />,
              startIcon: (
                <Avatar className="image" alt="User Image" src={user?.image}>
                  {user?.name?.split('')[0]}
                </Avatar>
              ),
            }}
            modesHeading="Theme"
            modes={modes}
            onActionTrigger={(): void => null}
            actionText="Log Out"
            actionIcon={<PowerIcon />}
            mode={mode}
            onModeChange={onModeChange}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.displayName = composeComponentDisplayName(COMPONENT_NAME);
Header.muiName = COMPONENT_NAME;

export default Header;
