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

import MuiInputLabel, {inputLabelClasses, InputLabelProps as MuiInputLabelProps} from '@mui/material/InputLabel';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './input-label.scss';

export type InputLabelProps = MuiInputLabelProps;
export type InputLabelClasses = typeof inputLabelClasses;

const COMPONENT_NAME: string = 'InputLabel';

const InputLabel: FC<InputLabelProps> & WithWrapperProps = (props: InputLabelProps): ReactElement => {
  const {className, classes: labelClasses, ...rest} = props;

  const classes: string = clsx('oxygen-input-label', className);
  const mergedClasses: Partial<InputLabelClasses> = {
    ...labelClasses,
    asterisk: clsx(labelClasses?.asterisk, 'oxygen-input-label-asterisk'),
  };

  return <MuiInputLabel className={classes} classes={mergedClasses} {...rest} />;
};

InputLabel.displayName = composeComponentDisplayName(COMPONENT_NAME);
InputLabel.muiName = COMPONENT_NAME;
InputLabel.defaultProps = {};

export default InputLabel;
