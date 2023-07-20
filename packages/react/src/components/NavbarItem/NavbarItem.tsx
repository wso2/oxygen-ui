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

import clsx from 'clsx';
import {ForwardRefExoticComponent, MutableRefObject, ReactElement, ReactNode, forwardRef} from 'react';
import type {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Box from '../Box';
import Chip from '../Chip';
import type {ListItemProps} from '../ListItem';
import ListItemButton from '../ListItemButton';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import type {NavbarProps} from '../Navbar/Navbar';
import Tooltip from '../Tooltip';
import './navbar-item.scss';

export interface NavbarItemProps extends ListItemProps, Pick<NavbarProps, 'fill' | 'open'> {
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
   * Label to display on the UI.
   * @example Overview
   */
  label: ReactNode;
  /**
   * Tag to display on the UI.
   * @example Beta
   */
  tag?: string;
  /**
   * Tag color variant.
   */
  tagClassName?: 'premium' | 'beta' | 'new' | 'experimental';
}

const COMPONENT_NAME: string = 'NavbarItem';

const NavbarItem: ForwardRefExoticComponent<NavbarItemProps> & WithWrapperProps = forwardRef(
  (props: NavbarItemProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {className, component, fill, icon, id, label, onClick, href, selected, tag, tagClassName, open, ...rest} =
      props;
    const classes: string = clsx(
      'oxygen-navbar-item',
      {
        [`${fill}`]: fill,
        fill,
        open,
      },
      className,
    );

    return (
      <Box ref={ref} className={classes} component={component}>
        <Tooltip ref={ref} key={id} title={!open && label} placement="right">
          <ListItemButton selected={selected} className={clsx({selected})} onClick={onClick} {...rest}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
            {open && tag ? (
              <Chip
                label={tag}
                className={clsx(`oxygen-chip-${tag.toLowerCase()}`, tagClassName)}
                classes={{label: 'oxygen-navbar-item-chip-label'}}
              />
            ) : null}
          </ListItemButton>
        </Tooltip>
      </Box>
    );
  },
) as ForwardRefExoticComponent<NavbarItemProps> & WithWrapperProps;

NavbarItem.displayName = composeComponentDisplayName(COMPONENT_NAME);
NavbarItem.muiName = COMPONENT_NAME;
NavbarItem.defaultProps = {
  collapsible: true,
  open: true,
};

export default NavbarItem;
