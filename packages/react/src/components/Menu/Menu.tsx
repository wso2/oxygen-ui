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

import MuiMenu from '@mui/material/Menu';
import type {MenuProps as MuiMenuProps} from '@mui/material/Menu';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement, ForwardRefExoticComponent} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './menu.scss';

export type MenuProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiMenuProps, 'component'>;

const COMPONENT_NAME: string = 'Menu';

/**
 * A Menus display a list of choices on temporary surfaces.
 *
 * Demos:
 *
 * - [App Bar (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-app-bar)
 * - [App Bar (MUI)](https://mui.com/material-ui/react-app-bar/)
 * - [Menu (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-menu)
 * - [Menu (MUI)](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/material-ui/api/menu/)
 * - inherits [Popover API](https://mui.com/material-ui/api/popover/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - FIXME: ⚠️ `component` prop is temporarily not supported due to https://github.com/wso2/oxygen-ui/issues/283
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the List component.
 * @param ref - The ref to be forwarded to the MuiList component.
 * @returns The rendered List component.
 */
const Menu: ForwardRefExoticComponent<MenuProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>({className, ...rest}: MenuProps<C>, ref: Ref<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-menu', className);

    return <MuiMenu ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<MenuProps> & WithWrapperProps;

Menu.displayName = composeComponentDisplayName(COMPONENT_NAME);
Menu.muiName = COMPONENT_NAME;

export default Menu;
