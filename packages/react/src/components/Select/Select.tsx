/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import MuiSelect, {SelectProps as MuiSelectProps} from '@mui/material/Select';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import InputLabel, {InputLabelProps as MuiInputLabelProps} from '../InputLabel';
import './select.scss';

export interface SelectProps extends MuiSelectProps {
  /**
   * Props for the `InputLabel` component.
   */
  InputLabelProps?: MuiInputLabelProps;
}

const COMPONENT_NAME: string = 'Select';

const Select: ForwardRefExoticComponent<SelectProps> & WithWrapperProps = forwardRef(
  (
    {
      className,
      InputLabelProps = {
        disableAnimation: true,
        focused: false,
        shrink: false,
      },
      label,
      name,
      required,
      ...rest
    }: SelectProps,
    ref: MutableRefObject<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-select', className);

    const labelProps: MuiInputLabelProps = {
      ...{
        disableAnimation: true,
        focused: false,
        required,
        shrink: false,
      },
      ...InputLabelProps,
    };

    return (
      <>
        {label && (
          <InputLabel
            id={name}
            htmlFor={name}
            {...labelProps}
            className={clsx('oxygen-select-static-label', InputLabelProps?.className)}
          >
            {label}
          </InputLabel>
        )}
        <MuiSelect ref={ref} labelId={name} className={classes} {...rest} />
      </>
    );
  },
) as ForwardRefExoticComponent<SelectProps> & WithWrapperProps;

Select.displayName = composeComponentDisplayName(COMPONENT_NAME);
Select.muiName = COMPONENT_NAME;

export default Select;
