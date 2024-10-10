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

import MuiInput from '@mui/material/Input';
import type {InputProps as MuiInputProps} from '@mui/material/Input';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './input.scss';

export type InputProps = MuiInputProps;

const COMPONENT_NAME: string = 'Input';

/**
 * The Input component is used to render a text input field.
 *
 * Demos:
 *
 * - [Text Field (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-text-field)
 * - [Text Field (MUI)](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [Input API](https://mui.com/material-ui/api/input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the Input component.
 * @param ref - The ref to be forwarded to the MuiInput component.
 * @returns The rendered Input component.
 */
const Input: ForwardRefExoticComponent<InputProps> & WithWrapperProps = forwardRef(
  ({className, ...rest}: InputProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-input', className);

    return <MuiInput ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<InputProps> & WithWrapperProps;

Input.displayName = composeComponentDisplayName(COMPONENT_NAME);
Input.muiName = COMPONENT_NAME;

export default Input;
