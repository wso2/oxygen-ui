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

import MuiFormGroup, {FormGroupProps as MuiFormGroupProps} from '@mui/material/FormGroup';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, ReactElement, MutableRefObject} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type FormGroupProps = MuiFormGroupProps;

const COMPONENT_NAME: string = 'FormGroup';

const FormGroup: ForwardRefExoticComponent<FormGroupProps> & WithWrapperProps = forwardRef(
  (props: FormGroupProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-form-group', className);

    return <MuiFormGroup className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<FormGroupProps> & WithWrapperProps;

FormGroup.displayName = composeComponentDisplayName(COMPONENT_NAME);
FormGroup.muiName = COMPONENT_NAME;
FormGroup.defaultProps = {};

export default FormGroup;
