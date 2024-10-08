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

import {BarsIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {FC, ReactElement, MouseEvent, Fragment, ReactNode} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Box from '../Box';
import CollapsibleNavbarItem from '../CollapsibleNavbarItem';
import Divider from '../Divider';
import Drawer, {DrawerProps} from '../Drawer';
import IconButton from '../IconButton';
import List from '../List';
import NavbarItem from '../NavbarItem';
import type {NavbarItemProps} from '../NavbarItem';
import Typography from '../Typography';
import './navbar.scss';

export interface NavbarProps extends DrawerProps {
  /**
   * Is the Navbar collapsible. If `true`, a hamburger will be shown.
   */
  collapsible?: boolean;
  /**
   * The fill color variant of the Navbar.
   */
  fill?: 'gradient' | 'solid';
  /**
   * Set of Navbar Items.
   */
  items?: NavbarItems[];
  /**
   * Callback to be called when the hamburger is clicked.
   */
  onOpen?: () => void;
  /**
   * Navbar toggle icon.
   * @default <BarsIcon />
   */
  toggleIcon?: ReactNode;
}

export type NavbarItems = {
  /**
   * Icon for the item set.
   */
  id?: string;
  /**
   * Set of Navbar Items.
   */
  items: NavbarItemProps[];
  /**
   * label for the item set.
   */
  label?: string;
};

const COMPONENT_NAME: string = 'Navbar';

const Navbar: FC<NavbarProps> & WithWrapperProps = (props: NavbarProps): ReactElement => {
  const {className, fill, onClose, items, collapsible, open, onOpen, toggleIcon, ...rest} = props;

  const classes: string = clsx(
    'oxygen-navbar',
    {
      collapsible,
      [`${fill}`]: fill,
      fill,
      open,
    },
    className,
  );

  const handleCollapsibleHamburgerClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (open && onClose && typeof onClose === 'function') {
      onClose(e, null);
      return;
    }

    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }
  };

  const renderDivider = (itemSetIndex: number, heading: string): ReactElement => {
    if (itemSetIndex !== 0 && !heading) {
      return <Divider className="oxygen-navbar-list-item-divider" />;
    }
    if (heading) {
      return (
        <Divider
          className="oxygen-navbar-list-item-divider"
          classes={{wrapper: 'oxygen-navbar-list-item-divider-wrapper'}}
          textAlign="left"
        >
          <Typography variant="overline">{heading}</Typography>
        </Divider>
      );
    }
    return null;
  };

  return (
    <Drawer variant="permanent" className={classes} onClose={onClose} open={open} {...rest}>
      {collapsible && (
        <>
          <div className="oxygen-navbar-collapsible-hamburger">
            <IconButton onClick={handleCollapsibleHamburgerClick} aria-label="nav item icon">
              {toggleIcon}
            </IconButton>
          </div>
          <Divider className="oxygen-navbar-collapsible-divider" />
        </>
      )}
      <Box className="oxygen-navbar-list-box">
        {items?.map((navbarItems: NavbarItems, itemsIndex: number) => {
          const navBarListClass: string = clsx('oxygen-navbar-list', {'no-heading': !navbarItems.label});

          return (
            <Fragment key={navbarItems.id}>
              <div>{renderDivider(itemsIndex, navbarItems.label)}</div>
              <List className={navBarListClass}>
                {navbarItems?.items?.map(
                  ({
                    expanded,
                    icon,
                    id,
                    selected,
                    items: navbarSubItems,
                    label,
                    onClick,
                    tag,
                    tagClassName,
                    ...otherListItemProps
                  }: NavbarItemProps) =>
                    navbarSubItems ? (
                      <CollapsibleNavbarItem
                        component="li"
                        expanded={expanded}
                        icon={icon}
                        id={id}
                        selected={selected}
                        items={navbarSubItems}
                        label={label}
                        onClick={onClick}
                        tag={tag}
                        tagClassName={tagClassName}
                        fill={fill}
                        open={open}
                        {...otherListItemProps}
                      />
                    ) : (
                      <NavbarItem
                        component="li"
                        icon={icon}
                        id={id}
                        selected={selected}
                        label={label}
                        onClick={onClick}
                        tag={tag}
                        tagClassName={tagClassName}
                        fill={fill}
                        open={open}
                        {...otherListItemProps}
                      />
                    ),
                )}
              </List>
            </Fragment>
          );
        })}
      </Box>
    </Drawer>
  );
};

Navbar.displayName = composeComponentDisplayName(COMPONENT_NAME);
Navbar.muiName = COMPONENT_NAME;
Navbar.defaultProps = {
  collapsible: true,
  open: true,
  toggleIcon: <BarsIcon />,
};

export default Navbar;
