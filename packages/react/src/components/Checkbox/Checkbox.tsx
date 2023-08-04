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

import MuiCheckbox, {CheckboxProps as MuiCheckboxProps} from '@mui/material/Checkbox';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, ReactElement, MutableRefObject} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';

export type CheckboxProps = MuiCheckboxProps;

const COMPONENT_NAME: string = 'Checkbox';

const Checkbox: ForwardRefExoticComponent<CheckboxProps> & WithWrapperProps = forwardRef(
  (props: CheckboxProps, ref: MutableRefObject<HTMLButtonElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-checkbox', className);

    return <MuiCheckbox className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<CheckboxProps> & WithWrapperProps;

Checkbox.displayName = composeComponentDisplayName(COMPONENT_NAME);
Checkbox.muiName = COMPONENT_NAME;
Checkbox.defaultProps = {};

export default Checkbox;
