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

import {InputLabel} from '@mui/material';
import MuiTextField, {TextFieldProps as MuiTextFieldProps} from '@mui/material/TextField';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './text-field.scss';

export type TextFieldProps = MuiTextFieldProps;

const COMPONENT_NAME: string = 'TextField';

const TextField: FC<TextFieldProps> & WithWrapperProps = (props: TextFieldProps): ReactElement => {
  const {className, label, InputLabelProps, id, ...rest} = props;

  const classes: string = clsx('oxygen-text-field', className);

  return (
    <div className={classes}>
      <InputLabel htmlFor="id" shrink className="oxygen-text-field__label" {...InputLabelProps}>
        {label}
      </InputLabel>
      <MuiTextField className="oxygen-text-field__input" id={id} {...rest} />
    </div>
  );
};

TextField.displayName = composeComponentDisplayName(COMPONENT_NAME);
TextField.muiName = COMPONENT_NAME;
TextField.defaultProps = {};

export default TextField;
