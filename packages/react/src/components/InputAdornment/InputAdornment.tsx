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

import MuiInputAdornment from '@mui/material/InputAdornment';
import type {InputAdornmentTypeMap, InputAdornmentProps as MuiInputAdornmentProps} from '@mui/material/InputAdornment';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type InputAdornmentProps<
  C extends ElementType = ElementType,
  D extends ElementType = InputAdornmentTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiInputAdornmentProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'InputAdornment';

/**
 * The Input Adornment can be used to add a prefix, a suffix, or an action to an input. For instance,
 * you can use an icon button to hide or reveal the password.
 *
 * Demos:
 *
 * - [Text Field (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-text-field)
 * - [Text Field (MUI)](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [InputAdornment API](https://mui.com/material-ui/api/input-adornment/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the InputAdornment component.
 * @param ref - The ref to be forwarded to the MuiInputAdornment component.
 * @returns The rendered InputAdornment component.
 */
const InputAdornment: OverridableComponent<InputAdornmentTypeMap<InputAdornmentProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, position, ...rest}: InputAdornmentProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-input-adornment', className);

    return <MuiInputAdornment ref={ref} position={position} className={classes} {...rest} />;
  },
) as OverridableComponent<InputAdornmentTypeMap<InputAdornmentProps>> & WithWrapperProps;

InputAdornment.displayName = composeComponentDisplayName(COMPONENT_NAME);
InputAdornment.muiName = COMPONENT_NAME;

export default InputAdornment;
