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

import {HamburgerIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {FC, ReactElement, ReactNode, MouseEvent, Fragment, MouseEventHandler} from 'react';
import {WithWrapperProps, Theme} from '../../models';
import {useTheme} from '../../theme';
import {composeComponentDisplayName} from '../../utils';
import Chip from '../Chip';
import Divider from '../Divider';
import Drawer, {DrawerProps} from '../Drawer';
import IconButton from '../IconButton';
import List from '../List';
import ListItem, {ListItemProps} from '../ListItem';
import ListItemButton from '../ListItemButton';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import './navbar.scss';
import Tooltip from '../Tooltip/Tooltip';
import Typography from '../Typography/Typography';

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
  items?: NavbarItem[];
  /**
   * Callback to be called when the hamburger is clicked.
   */
  onOpen?: () => void;
}

export interface NavbarItem extends ListItemProps {
  heading?: string;
  id?: string;
  items: {
    /**
     * Icon for the Navbar item.
     * @example <HomeIcon />
     */
    icon?: ReactNode;
    /**
     * Unique id for the item.
     */
    id?: string;
    /**
     * Name to display on the UI.
     * @example Overview.
     */
    name: ReactNode;
    /**
     * Callback to be called when the item is clicked.
     */
    onClick?: MouseEventHandler;
    /**
     * Is the item selected?
     * @example true | false.
     */
    selected?: boolean;
    tag?: string;
    tagClassName?: string;
  }[];
}

const COMPONENT_NAME: string = 'Navbar';

const Navbar: FC<NavbarProps> & WithWrapperProps = (props: NavbarProps): ReactElement => {
  const {className, fill, onClose, items, collapsible, open, onOpen, ...rest} = props;

  const theme: Theme = useTheme();
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
    <Drawer className={classes} variant="permanent" open={open} onClose={onClose} {...rest}>
      {collapsible && (
        <>
          <div className="oxygen-navbar-collapsible-hamburger">
            <IconButton onClick={handleCollapsibleHamburgerClick} aria-label="nav item icon">
              {theme.direction === 'rtl' ? <HamburgerIcon /> : <HamburgerIcon />}
            </IconButton>
          </div>
          <Divider className="oxygen-navbar-collapsible-divider" />
        </>
      )}
      {items !== undefined &&
        Array.isArray(items) &&
        items.map((itemSet: NavbarItem, itemSetIndex: number) => {
          const navBarListClass: string = clsx('oxygen-navbar-list', {'no-heading': !itemSet.heading});
          return (
            <Fragment key={itemSet.id}>
              <div>{renderDivider(itemSetIndex, itemSet.heading)}</div>
              <List className={navBarListClass}>
                {itemSet?.items?.map(
                  ({
                    icon,
                    id,
                    selected,
                    name,
                    onClick,
                    tag,
                    tagClassName,
                    ...otherItemProps
                  }: NavbarItem['items'][0]) => (
                    <Tooltip
                      className="oxygen-navbar-list-item-tooltip"
                      key={id}
                      title={!open && name}
                      placement="right"
                    >
                      <ListItem className={clsx('oxygen-navbar-list-item', {mini: !open, selected})} disablePadding>
                        <ListItemButton
                          selected={selected}
                          className={clsx('oxygen-navbar-list-item-button', {selected})}
                          onClick={onClick}
                          {...otherItemProps}
                        >
                          <ListItemIcon className="oxygen-navbar-list-item-button-icon">{icon}</ListItemIcon>
                          <ListItemText color="white" className="oxygen-navbar-list-item-button-text" primary={name} />
                          {open && tag ? (
                            <Chip
                              label={tag}
                              className={clsx(
                                `oxygen-navbar-list-item-chip oxygen-chip-${tag.toLowerCase()}`,
                                tagClassName,
                              )}
                            />
                          ) : null}
                        </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  ),
                )}
              </List>
            </Fragment>
          );
        })}
    </Drawer>
  );
};

Navbar.displayName = composeComponentDisplayName(COMPONENT_NAME);
Navbar.muiName = COMPONENT_NAME;
Navbar.defaultProps = {
  collapsible: true,
};

export default Navbar;
