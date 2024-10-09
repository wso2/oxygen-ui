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

import MuiFormControl, {FormControlProps as MuiFormControlProps} from '@mui/material/FormControl';
import clsx from 'clsx';
import {ElementType, FC, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './form-control.scss';

export type FormControlProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiFormControlProps, 'component'>;

const COMPONENT_NAME: string = 'FormControl';

const FormControl: FC<FormControlProps> & WithWrapperProps = <C extends ElementType>({
  className,
  ...rest
}: FormControlProps<C>): ReactElement => {
  const classes: string = clsx('oxygen-form-control', className);

  return <MuiFormControl className={classes} {...rest} />;
};

FormControl.displayName = composeComponentDisplayName(COMPONENT_NAME);
FormControl.muiName = COMPONENT_NAME;

export default FormControl;
