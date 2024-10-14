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

import MuiFab from '@mui/material/Fab';
import type {FabProps as MuiFabProps, FabTypeMap} from '@mui/material/Fab';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, Ref, ElementType} from 'react';

export type FabProps<
  C extends ElementType = ElementType,
  D extends ElementType = FabTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiFabProps<D, P>, 'component'>;

/**
 * A Floating Action Button (FAB) performs the primary, or most common, action on a screen.
 *
 * Demos:
 *
 * - [Floating Action Button (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-fab)
 * - [Floating Action Button (MUI)](https://mui.com/material-ui/react-floating-action-button/)
 *
 * API:
 *
 * - [Fab API](https://mui.com/material-ui/api/fab/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 *
 * @remarks
 * - ✔️ Props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Fab component.
 * @param ref - The ref to be forwarded to the MuiFab component.
 * @returns The rendered Fab component.
 */
const Fab: OverridableComponent<FabTypeMap<FabProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: FabProps<C>,
    ref: Ref<HTMLButtonElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-fab', className);

    return <MuiFab ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<FabTypeMap<FabProps>>;

export default Fab;
