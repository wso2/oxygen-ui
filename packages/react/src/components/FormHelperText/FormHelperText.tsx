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

import MuiFormHelperText from '@mui/material/FormHelperText';
import type {FormHelperTextProps as MuiFormHelperTextProps, FormHelperTextTypeMap} from '@mui/material/FormHelperText';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import './form-helper-text.scss';

export type FormHelperTextProps<
  C extends ElementType = ElementType,
  D extends ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiFormHelperTextProps<D, P>, 'component'>;

/**
 * A Form Helper Text component is used to provide additional information about the form inputs.
 *
 * Demos:
 *
 * - [Text Field (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-text-field)
 * - [Text Field (MUI)](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [FormHelperText API](https://mui.com/material-ui/api/form-helper-text/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Fab component.
 * @param ref - The ref to be forwarded to the MuiFab component.
 * @returns The rendered Fab component.
 */
const FormHelperText: OverridableComponent<FormHelperTextTypeMap<FormHelperTextProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: FormHelperTextProps<C>,
    ref: Ref<HTMLParagraphElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-form-helper-text', className);

    return <MuiFormHelperText ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<FormHelperTextTypeMap<FormHelperTextProps>>;

export default FormHelperText;
