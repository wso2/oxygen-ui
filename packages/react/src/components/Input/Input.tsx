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

import MuiInput, {InputProps as MuiInputProps} from '@mui/material/Input';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './input.scss';

export type InputProps = MuiInputProps;

const COMPONENT_NAME: string = 'Input';

const Input: FC<InputProps> & WithWrapperProps = (props: InputProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-input', className);

  return <MuiInput className={classes} {...rest} />;
};

Input.displayName = composeComponentDisplayName(COMPONENT_NAME);
Input.muiName = COMPONENT_NAME;
Input.defaultProps = {};

export default Input;
