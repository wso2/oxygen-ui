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

import MuiDivider from '@mui/material/Divider';
import type {DividerProps as MuiDividerProps, DividerTypeMap as MuiDividerTypeMap} from '@mui/material/Divider';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';

export type DividerProps<
  C extends ElementType = ElementType,
  D extends ElementType = MuiDividerTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiDividerProps<D, P>, 'component'>;

/**
 * The Divider provides a thin, unobtrusive line for grouping elements to reinforce visual hierarchy.
 *
 * Demos:
 *
 * - [Divider (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-divider)
 * - [Divider (MUI)](https://mui.com/material-ui/react-divider/)
 * - [Lists (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-list)
 * - [Lists (MUI)](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [Divider API](https://mui.com/material-ui/api/divider/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Divider component.
 * @param ref - The ref to be forwarded to the MuiDivider component.
 * @returns The rendered Divider component.
 */
const Divider: OverridableComponent<MuiDividerTypeMap<DividerProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: DividerProps<C>,
    ref: Ref<HTMLHRElement>,
  ): ReactElement => (
    <MuiDivider
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-divider',
        'OxygenDivider-root',
        className,
      )}
      {...rest}
    />
  ),
) as OverridableComponent<MuiDividerTypeMap<DividerProps>>;

export default Divider;
