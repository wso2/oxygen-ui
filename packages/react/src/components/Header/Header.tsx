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

import {useColorScheme} from '@mui/material/styles';
import {Mode} from '@mui/system/cssVars/useCurrentColorScheme';
import {ChevronDownIcon, BarsIcon, ArrowRightToBracketIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {FC, ReactElement, ReactNode} from 'react';
import {useIsMobile} from '../../hooks/use-is-mobile';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './header.scss';
import AppBar, {AppBarProps} from '../AppBar';
import Avatar from '../Avatar';
import Box from '../Box';
import {ButtonProps} from '../Button';
import IconButton from '../IconButton';
import Link from '../Link';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import UserDropdownMenu, {ModeList, UserTemplate} from '../UserDropdownMenu';

export interface HeaderProps extends AppBarProps {
  /**
   * Brand information.
   */
  brand?: BrandTemplate;
  /**
   * Left aligned elements to be rendered.
   * @remarks This will be rendered on the left side of the header following the brand section.
   */
  leftAlignedElements?: ReactNode[];
  /**
   * List of modes.
   */
  modes?: ModeList[];
  /**
   * Navbar toggle icon.
   */
  navbarToggleIcon?: ReactNode;
  /**
   * Function to handle the collapsible hamburger click.
   */
  onCollapsibleHamburgerClick?: () => void;
  /**
   * Right aligned elements to be rendered.
   * @remarks This will be rendered on the right side of the header preceding the user dropdown section.
   */
  rightAlignedElements?: ReactNode[];
  /**
   * Should show the collapsible hamburger icon?
   */
  showCollapsibleHamburger?: boolean;
  /**
   * Logged user information.
   */
  user?: UserTemplate;
  /**
   * Props to modify the action menu item in the user dropdown menu.
   */
  userDropdownMenu?: UserDropdownMenuHeaderProps;
}

export interface UserDropdownMenuHeaderProps {
  /**
   * Action icon for the user dropdown menu.
   */
  actionIcon?: ReactNode;
  /**
   * Action text for the user dropdown menu.
   */
  actionText?: string;
  /**
   * Footer content.
   */
  footerContent?: ReactNode[];
  /**
   * Menu items to be added to the user dropdown menu.
   */
  menuItems?: ReactNode[];
  /**
   * Callback to be called on clicking on the action button.
   */
  onActionClick?: () => void;
  triggerOptions?: Omit<ButtonProps, 'onClick'> & Record<string, any>;
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

const userDropdownMenuDefaultProps: UserDropdownMenuHeaderProps = {
  actionIcon: <ArrowRightToBracketIcon />,
  actionText: 'Logout',
  onActionClick: (): void => null,
};

const COMPONENT_NAME: string = 'Header';

const Header: FC<HeaderProps> & WithWrapperProps = ({
  brand,
  className,
  modes,
  showCollapsibleHamburger,
  leftAlignedElements,
  navbarToggleIcon = <BarsIcon />,
  onCollapsibleHamburgerClick,
  rightAlignedElements,
  user,
  userDropdownMenu = userDropdownMenuDefaultProps,
  ...rest
}: HeaderProps): ReactElement => {
  const userDropdownMenuProps: UserDropdownMenuHeaderProps = {...userDropdownMenuDefaultProps, ...userDropdownMenu};

  const {mode, setMode} = useColorScheme();
  const isMobile: boolean = useIsMobile();

  const classes: string = clsx(
    'oxygen-header',
    {
      mobile: isMobile,
      'with-hamburger': showCollapsibleHamburger,
    },
    className,
  );

  const onModeChange = (selectedMode: Mode): void => {
    setMode(selectedMode);
  };

  return (
    <AppBar
      position="static"
      color="default"
      variant="outlined"
      elevation={0}
      className={classes}
      role="banner"
      {...rest}
    >
      <Toolbar className="oxygen-header-toolbar">
        {showCollapsibleHamburger && (
          <div className="oxygen-header-collapsible-hamburger">
            <IconButton aria-label="Menu Icon" onClick={onCollapsibleHamburgerClick || ((): void => null)}>
              {navbarToggleIcon}
            </IconButton>
          </div>
        )}
        {brand && (
          <Box
            tabIndex={0}
            component={brand.onClick ? Link : Box}
            className={clsx('oxygen-brand', {
              'with-link': Boolean(brand.onClick),
            })}
            onClick={brand.onClick}
            underline="none"
            color="inherit"
          >
            <Box className="oxygen-brand-logo">
              {isMobile ? brand.logo.mobile ?? brand.logo.desktop : brand.logo.desktop}
            </Box>
            <Typography variant="h6" component="h1" className="oxygen-brand-portal-name">
              {brand.title}
            </Typography>
          </Box>
        )}
        {(leftAlignedElements || rightAlignedElements) && (
          <Box className="oxygen-header-elements">
            {leftAlignedElements?.length > 0 && (
              <Box className="oxygen-header-elements-left">{leftAlignedElements}</Box>
            )}
            {rightAlignedElements?.length > 0 && (
              <Box className="oxygen-header-elements-right">{rightAlignedElements}</Box>
            )}
          </Box>
        )}
        <Box className="oxygen-header-user-dropdown-menu">
          <UserDropdownMenu
            user={user}
            triggerOptions={{
              children: user?.name,
              color: 'inherit',
              endIcon: <ChevronDownIcon />,
              startIcon: (
                <Avatar
                  className="image"
                  alt="User Image"
                  src={user?.image}
                  randomBackgroundColor={!user?.image}
                  backgroundColorRandomizer={user?.name}
                >
                  {user?.name?.split('')[0]}
                </Avatar>
              ),
              ...userDropdownMenuProps.triggerOptions,
            }}
            modesHeading="Theme"
            modes={modes}
            onActionTrigger={userDropdownMenuProps.onActionClick}
            actionText={userDropdownMenuProps.actionText}
            actionIcon={userDropdownMenuProps.actionIcon}
            mode={mode}
            onModeChange={onModeChange}
            menuItems={userDropdownMenuProps.menuItems}
            footerContent={userDropdownMenu.footerContent}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.displayName = composeComponentDisplayName(COMPONENT_NAME);
Header.muiName = COMPONENT_NAME;

export default Header;
