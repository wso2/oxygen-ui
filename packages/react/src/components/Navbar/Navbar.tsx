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

import {HamburgerIcon} from '@oxygen-ui-experimental/react-icons';
import clsx from 'clsx';
import {FC, ReactElement, ReactNode, MouseEvent, Fragment} from 'react';
import {WithWrapperProps, Theme} from '../../models';
import {useTheme} from '../../theme';
import {composeComponentDisplayName} from '../../utils';
import Divider from '../Divider';
import Drawer, {DrawerProps} from '../Drawer';
import IconButton from '../IconButton';
import List from '../List';
import ListItem, {ListItemProps} from '../ListItem';
import ListItemButton from '../ListItemButton';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
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
  items?: NavbarItem[][];
  /**
   * Callback to be called when the hamburger is clicked.
   */
  onOpen?: () => void;
}

export interface NavbarItem extends ListItemProps {
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
   * Is the item selected?
   * @example true | false.
   */
  selected?: boolean;
}

const COMPONENT_NAME: string = 'Navbar';

const Navbar: FC<NavbarProps> & WithWrapperProps = (props: NavbarProps): ReactElement => {
  const {className, open, fill, onClose, items, collapsible, onOpen, ...rest} = props;

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
    if (open) {
      onClose(e, null);
      return;
    }

    onOpen();
  };

  return (
    <Drawer className={classes} variant="permanent" open={open} onClose={onClose} {...rest}>
      {collapsible && (
        <>
          <div className="oxygen-navbar-collapsible-hamburger">
            <IconButton onClick={handleCollapsibleHamburgerClick}>
              {theme.direction === 'rtl' ? <HamburgerIcon /> : <HamburgerIcon />}
            </IconButton>
          </div>
          <Divider />
        </>
      )}
      {items !== undefined && Array.isArray(items) && (
        <List>
          {items.map((itemSet: NavbarItem[], itemSetIndex: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={itemSetIndex}>
              {itemSet.map(({icon, id, selected, name}: NavbarItem) => (
                <ListItem key={id} className={clsx('oxygen-navbar-list-item', {mini: !open, selected})} disablePadding>
                  <ListItemButton selected={selected} className={clsx('oxygen-navbar-list-item-button', {selected})}>
                    <ListItemIcon className="oxygen-navbar-list-item-icon">{icon}</ListItemIcon>
                    <ListItemText color="white" className="oxygen-navbar-list-item-text" primary={name} />
                  </ListItemButton>
                </ListItem>
              ))}
              {items.length > 1 && itemSetIndex !== items.length - 1 && (
                <Divider className="oxygen-navbar-list-item-divider" />
              )}
            </Fragment>
          ))}
        </List>
      )}
    </Drawer>
  );
};

Navbar.displayName = composeComponentDisplayName(COMPONENT_NAME);
Navbar.muiName = COMPONENT_NAME;
Navbar.defaultProps = {
  collapsible: true,
};

export default Navbar;
