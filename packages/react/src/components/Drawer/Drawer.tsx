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

import MuiDrawer from '@mui/material/Drawer';
import type {DrawerProps as MuiDrawerProps} from '@mui/material/Drawer';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement, ForwardRefExoticComponent} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './drawer.scss';

export type DrawerProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiDrawerProps, 'component'>;

const COMPONENT_NAME: string = 'Drawer';

/**
 * The navigation drawers (or "sidebars") provide ergonomic access to destinations in a site or
 * app functionality such as switching accounts.
 *
 * Demos:
 *
 * - [Drawer (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-drawer)
 * - [Drawer (MUI)](https://mui.com/material-ui/react-drawer/)
 *
 * API:
 *
 * - [Drawer API](https://mui.com/material-ui/api/drawer/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - FIXME: ⚠️ `component` prop is temporarily not supported due to https://github.com/wso2/oxygen-ui/issues/283
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Drawer component.
 * @param ref - The ref to be forwarded to the MuiDrawer component.
 * @returns The rendered Drawer component.
 */
const Drawer: ForwardRefExoticComponent<DrawerProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: DrawerProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-drawer', className);

    return <MuiDrawer ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<DrawerProps> & WithWrapperProps;

Drawer.displayName = composeComponentDisplayName(COMPONENT_NAME);
Drawer.muiName = COMPONENT_NAME;

export default Drawer;
