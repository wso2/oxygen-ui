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

import MuiFormControlLabel from '@mui/material/FormControlLabel';
import type {FormControlLabelProps as MuiFormControlLabelProps} from '@mui/material/FormControlLabel';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type FormControlLabelProps = MuiFormControlLabelProps;

const COMPONENT_NAME: string = 'FormControlLabel';

/**
 * The Form Control Label can be used to display a label for a form control.
 *
 * Demos:
 *
 * - [Checkbox (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-checkbox)
 * - [Checkbox (MUI)](https://mui.com/material-ui/react-checkbox/)
 * - [Radio Group (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-radio-group)
 * - [Radio Group (MUI)](https://mui.com/material-ui/react-radio-button/)
 * - [Switch (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-switch)
 * - [Switch (MUI)](https://mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormControlLabel API](https://mui.com/material-ui/api/form-control-label/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the FormControlLabel component.
 * @param ref - The ref to be forwarded to the MuiFormControlLabel component.
 * @returns The rendered FormControlLabel component.
 */
const FormControlLabel: ForwardRefExoticComponent<FormControlLabelProps> & WithWrapperProps = forwardRef(
  ({className, ...rest}: FormControlLabelProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-form-control-label', className);

    return <MuiFormControlLabel className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<FormControlLabelProps> & WithWrapperProps;

FormControlLabel.displayName = composeComponentDisplayName(COMPONENT_NAME);
FormControlLabel.muiName = COMPONENT_NAME;

export default FormControlLabel;
