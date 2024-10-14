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

import MuiMenuItem from '@mui/material/MenuItem';
import type {MenuItemTypeMap, MenuItemProps as MuiMenuItemProps} from '@mui/material/MenuItem';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import './menu-item.scss';

export type MenuItemProps<
  C extends ElementType = ElementType,
  D extends ElementType = MenuItemTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiMenuItemProps<D, P>, 'component'>;

/**
 * The Menu Item component is used to display a single item inside a menu.
 *
 * Demos:
 *
 * - [Menu (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-menu)
 * - [Menu (MUI)](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuItem API](https://mui.com/material-ui/api/menu-item/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 *
 * @remarks
 * - ✔️ Props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the MenuItem component.
 * @param ref - The ref to be forwarded to the MuiMenuItem component.
 * @returns The rendered MenuItem component.
 */
const MenuItem: OverridableComponent<MenuItemTypeMap<MenuItemProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: MenuItemProps<C>,
    ref: Ref<HTMLLIElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-menu-item', className);

    return <MuiMenuItem ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<MenuItemTypeMap<MenuItemProps>>;

export default MenuItem;
