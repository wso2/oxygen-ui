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

import MuiToolbar from '@mui/material/Toolbar';
import type {ToolbarProps as MuiToolbarProps, ToolbarTypeMap} from '@mui/material/Toolbar';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './toolbar.scss';

export type ToolbarProps<
  C extends ElementType = ElementType,
  D extends ElementType = ToolbarTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiToolbarProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Toolbar';

/**
 * The Toolbar component is a container for grouping elements such as AppBar.
 *
 * Demos:
 *
 * - [App Bar (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-app-bar)
 * - [App Bar (MUI)](https://mui.com/material-ui/react-app-bar/)
 *
 * API:
 *
 * - [Toolbar API](https://mui.com/material-ui/api/toolbar/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Skeleton component.
 * @param ref - The ref to be forwarded to the MuiSkeleton component.
 * @returns The rendered Skeleton component.
 */
const Toolbar: ForwardRefExoticComponent<ToolbarProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: ToolbarProps<C>,
    ref: MutableRefObject<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-toolbar', className);

    return <MuiToolbar ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<ToolbarProps> & WithWrapperProps;

Toolbar.displayName = composeComponentDisplayName(COMPONENT_NAME);
Toolbar.muiName = COMPONENT_NAME;

export default Toolbar;
