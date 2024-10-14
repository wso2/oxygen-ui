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
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement, ReactNode} from 'react';
import Box from '../Box';
import Chip from '../Chip';
import ListItemButton from '../ListItemButton';
import type {ListItemButtonProps, ListItemButtonTypeMap} from '../ListItemButton';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import type {NavbarProps} from '../Navbar';
import Tooltip from '../Tooltip';
import './navbar-item.scss';

export type NavbarItemProps<C extends ElementType = ElementType> = ListItemButtonProps<C> &
  Pick<NavbarProps, 'fill' | 'open'> & {
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
  };

/**
 * The Navbar Item component is used to represent an item in the Navbar.
 *
 * Demos:
 *
 * - [Navbar Item (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-navbar-item)
 *
 * API:
 *
 * - inherits [ListItemButton API](https://mui.com/material-ui/api/list-item-button/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [ListItemButton](https://mui.com/material-ui/api/list-item-button/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the NavbarItem component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered NavbarItem component.
 */
const NavbarItem: OverridableComponent<ListItemButtonTypeMap<NavbarItemProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, fill, icon, id, label, onClick, selected, tag, tagClassName, open = true, ...rest}: NavbarItemProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
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
      <Box ref={ref} className={classes}>
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
) as OverridableComponent<ListItemButtonTypeMap<NavbarItemProps>>;

export default NavbarItem;
