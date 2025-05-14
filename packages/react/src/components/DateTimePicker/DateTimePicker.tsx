/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import InputLabel from '@mui/material/InputLabel';
import {DateTimePicker as MUIDateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import type {DateTimePickerProps as MuiDateTimePickerProps} from '@mui/x-date-pickers/DateTimePicker';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {Ref, ReactElement, ForwardRefExoticComponent} from 'react';
import type {InputLabelProps} from '../InputLabel';

export type DateTimePickerProps = MuiDateTimePickerProps<true> & {
  InputLabelProps?: InputLabelProps;
};

/**
 * Oxygen UI wrapper for the MUI DateTimePicker.
 * Applies Oxygen class naming and adds a styled InputLabel.
 */
const DateTimePicker: ForwardRefExoticComponent<DateTimePickerProps> = forwardRef(
  ({className, InputLabelProps, label, ...rest}: DateTimePickerProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <>
      {label && (
        <InputLabel {...InputLabelProps} className={clsx('OxygenDateTimePicker-label', InputLabelProps?.className)}>
          {label}
        </InputLabel>
      )}
      <MUIDateTimePicker
        {...rest}
        ref={ref}
        slotProps={{
          textField: {
            size: 'small',
          },
          ...rest.slotProps,
        }}
        className={clsx('OxygenDateTimePicker-root', className)}
      />
    </>
  ),
) as ForwardRefExoticComponent<MuiDateTimePickerProps<true> & {ref?: Ref<HTMLDivElement>}>;

export default DateTimePicker;
