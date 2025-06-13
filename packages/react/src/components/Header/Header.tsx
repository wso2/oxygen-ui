/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import {useColorScheme} from '@mui/material/styles';
import {Mode} from '@mui/system/cssVars/useCurrentColorScheme';
import {ChevronDownIcon, BarsIcon, ArrowRightToBracketIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement, ReactNode} from 'react';
import {useIsMobile} from '../../hooks/use-is-mobile';
import AppBar from '../AppBar';
import type {AppBarProps, AppBarTypeMap} from '../AppBar';
import Avatar from '../Avatar';
import Box from '../Box';
import type {ButtonProps} from '../Button';
import IconButton from '../IconButton';
import Link from '../Link';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import UserDropdownMenu from '../UserDropdownMenu';
import type {ModeList, UserTemplate} from '../UserDropdownMenu';
import './header.scss';

export type HeaderProps<C extends ElementType = ElementType> = AppBarProps<C> & {
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
};

export type UserDropdownMenuHeaderProps = {
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
};

export type BrandTemplate = {
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
};

const userDropdownMenuDefaultProps: UserDropdownMenuHeaderProps = {
  actionIcon: <ArrowRightToBracketIcon />,
  actionText: 'Logout',
  onActionClick: (): void => null,
};

/**
 * The Header displays the brand, left aligned elements, right aligned elements, and the user dropdown menu.
 *
 * Demos:
 *
 * - [Header (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-header)
 *
 * API:
 *
 * - [AppBar API](https://mui.com/material-ui/api/app-bar/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [AppBar](https://mui.com/material-ui/api/app-bar//) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Header component.
 * @param ref - The ref to be forwarded to the AppBar component.
 * @returns The rendered Header component.
 */
const Header: OverridableComponent<AppBarTypeMap<HeaderProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {
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
    }: HeaderProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const userDropdownMenuProps: UserDropdownMenuHeaderProps = {...userDropdownMenuDefaultProps, ...userDropdownMenu};

    const {mode, setMode} = useColorScheme();
    const isMobile: boolean = useIsMobile();

    const onModeChange = (selectedMode: Mode): void => {
      setMode(selectedMode);
    };

    return (
      <AppBar
        ref={ref}
        position="static"
        color="default"
        variant="outlined"
        elevation={0}
        className={clsx(
          /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
          'oxygen-header',
          'OxygenHeader-root',
          {
            'OxygenHeader-mobile': isMobile,
            'OxygenHeader-withHamburger': showCollapsibleHamburger,
            mobile: isMobile,
            'with-hamburger': showCollapsibleHamburger,
          },
          className,
        )}
        role="banner"
        {...rest}
      >
        <Toolbar className="OxygenHeader-toolbar oxygen-header-toolbar">
          {showCollapsibleHamburger && (
            <div className="OxygenHeader-collapsibleHamburger oxygen-header-collapsible-hamburger">
              <IconButton aria-label="Menu Icon" onClick={onCollapsibleHamburgerClick || ((): void => null)}>
                {navbarToggleIcon}
              </IconButton>
            </div>
          )}
          {brand && (
            <Box
              tabIndex={0}
              component={brand.onClick ? Link : Box}
              className={clsx(
                /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
                'oxygen-brand',
                'OxygenHeader-brand',
                {
                  'OxygenHeader-brandWithLink': Boolean(brand.onClick),
                  'with-link': Boolean(brand.onClick),
                },
              )}
              onClick={brand.onClick}
              color="inherit"
              {...(brand.onClick ? {underline: 'none'} : {})}
            >
              <Box className="OxygenHeader-brandLogo oxygen-brand-logo">
                {isMobile ? brand.logo.mobile ?? brand.logo.desktop : brand.logo.desktop}
              </Box>
              <Typography variant="h6" component="h1" className="OxygenHeader-brandPortalName oxygen-brand-portal-name">
                {brand.title}
              </Typography>
            </Box>
          )}
          {(leftAlignedElements || rightAlignedElements) && (
            <Box className="OxygenHeader-elements oxygen-header-elements">
              {leftAlignedElements?.length > 0 && (
                <Box className="OxygenHeader-elementsLeft oxygen-header-elements-left">{leftAlignedElements}</Box>
              )}
              {rightAlignedElements?.length > 0 && (
                <Box className="OxygenHeader-elementsRight oxygen-header-elements-right">{rightAlignedElements}</Box>
              )}
            </Box>
          )}
          <Box className="OxygenHeader-userDropdownMenu oxygen-header-user-dropdown-menu">
            <UserDropdownMenu
              user={user}
              triggerOptions={{
                children: user?.name,
                color: 'inherit',
                endIcon: <ChevronDownIcon />,
                startIcon: (
                  <Avatar
                    className="OxygenHeader-userDropdownMenuImage image"
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
  },
) as OverridableComponent<AppBarTypeMap<HeaderProps>>;

export default Header;
