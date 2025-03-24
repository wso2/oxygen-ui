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

import MuiOutlinedInput from '@mui/material/OutlinedInput';
import type {OutlinedInputProps as MuiOutlinedInputProps} from '@mui/material/OutlinedInput';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, Ref, ReactElement} from 'react';
import './outlined-input.scss';

export type OutlinedInputProps = MuiOutlinedInputProps;

/**
 * The Outlined Input component is used to render a text input field with an outlined border.
 *
 * Demos:
 *
 * - [Text Field (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-text-field)
 * - [Text Field (MUI)](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [OutlinedInput API](https://mui.com/material-ui/api/outlined-input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the OutlinedInput component.
 * @param ref - The ref to be forwarded to the MuiOutlinedInput component.
 * @returns The rendered OutlinedInput component.
 */
const OutlinedInput: ForwardRefExoticComponent<OutlinedInputProps> = forwardRef(
  ({className, ...rest}: OutlinedInputProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiOutlinedInput
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-outlined-input',
        'OxygenOutlinedInput-root',
        className,
      )}
      {...rest}
    />
  ),
) as ForwardRefExoticComponent<OutlinedInputProps>;

export default OutlinedInput;
