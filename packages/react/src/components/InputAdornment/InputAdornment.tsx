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

import MuiInputAdornment, {InputAdornmentProps as MuiInputAdornmentProps} from '@mui/material/InputAdornment';
import clsx from 'clsx';
import {ElementType, FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';

export type InputAdornmentProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiInputAdornmentProps, 'component'>;

const COMPONENT_NAME: string = 'InputAdornment';

const InputAdornment: FC<InputAdornmentProps> & WithWrapperProps = <C extends ElementType>({
  className,
  position,
  ...rest
}: InputAdornmentProps<C>): ReactElement => {
  const classes: string = clsx('oxygen-input-adornment', className);

  return <MuiInputAdornment position={position} className={classes} {...rest} />;
};

InputAdornment.displayName = composeComponentDisplayName(COMPONENT_NAME);
InputAdornment.muiName = COMPONENT_NAME;

export default InputAdornment;
