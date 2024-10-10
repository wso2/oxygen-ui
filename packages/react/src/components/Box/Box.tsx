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

import MuiBox from '@mui/material/Box';
import type {BoxProps as MuiBoxProps} from '@mui/material/Box';
import {BoxTypeMap} from '@mui/system';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type BoxProps<
  C extends ElementType = ElementType,
  D extends ElementType = BoxTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiBoxProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Box';

/**
 * The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.
 *
 * Demos:
 *
 * - [Box (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/layout-box)
 * - [Box (MUI)](https://mui.com/material-ui/react-box/)
 *
 * API:
 *
 * - [Box API](https://mui.com/material-ui/api/box/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Badge component.
 * @param ref - The ref to be forwarded to the MuiBadge component.
 * @returns The rendered Badge component.
 */
const Box: ForwardRefExoticComponent<BoxProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: BoxProps<C>,
    ref: MutableRefObject<HTMLSpanElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-box', className);

    return <MuiBox ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<BoxProps> & WithWrapperProps;

Box.displayName = composeComponentDisplayName(COMPONENT_NAME);
Box.muiName = COMPONENT_NAME;

export default Box;
