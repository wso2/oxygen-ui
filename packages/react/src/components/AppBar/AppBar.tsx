/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

import MuiAppBar from '@mui/material/AppBar';
import type {AppBarTypeMap, AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ReactElement, Ref} from 'react';

export type AppBarProps<
  C extends ElementType = ElementType,
  D extends ElementType = AppBarTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiAppBarProps<D, P>, 'component'>;

/**
 * The App Bar component displays information and actions relating to the current screen.
 *
 * Demos:
 *
 * - [App Bar (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-app-bar)
 * - [App Bar (MUI)](https://mui.com/material-ui/react-app-bar/)
 *
 * API:
 *
 * - [AppBar API](https://mui.com/material-ui/api/app-bar/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 *
 * @remarks
 * - ✔️ Props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the AppBar component.
 * @param ref - The ref to be forwarded to the MuiAppBar component.
 * @returns The rendered AppBar component.
 */
const AppBar: OverridableComponent<AppBarTypeMap<AppBarProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: AppBarProps<C>,
    ref: Ref<HTMLHeadingElement>,
  ): ReactElement => (
    <MuiAppBar
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-app-bar',
        'OxygenAppBar-root',
        className,
      )}
      {...rest}
    />
  ),
) as OverridableComponent<AppBarTypeMap<AppBarProps>>;

export default AppBar;
