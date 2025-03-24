/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import MuiFormGroup from '@mui/material/FormGroup';
import type {FormGroupProps as MuiFormGroupProps} from '@mui/material/FormGroup';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type FormGroupProps = MuiFormGroupProps;

/**
 * The Form Group is a helpful wrapper used to group selection control components.
 *
 * Demos:
 *
 * - [Checkbox (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-checkbox)
 * - [Checkbox (MUI)](https://mui.com/material-ui/react-checkbox/)
 * - [Switch (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-switch)
 * - [Switch (MUI)](https://mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormGroup API](https://mui.com/material-ui/api/form-group/)
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the FormGroup component.
 * @param ref - The ref to be forwarded to the MuiFormGroup component.
 * @returns The rendered FormGroup component.
 */
const FormGroup: ForwardRefExoticComponent<FormGroupProps> = forwardRef(
  ({className, ...rest}: FormGroupProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiFormGroup
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-form-group',
        'OxygenFormGroup-root',
        className,
      )}
      {...rest}
    />
  ),
) as ForwardRefExoticComponent<FormGroupProps>;

export default FormGroup;
