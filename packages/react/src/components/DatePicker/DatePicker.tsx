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
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import clsx from 'clsx';
import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, Ref, ReactElement } from 'react';
import { InputLabelProps } from '../InputLabel';

export type DatePickerProps = MuiDatePickerProps<true> & {
  InputLabelProps: InputLabelProps
};

/**
 * Oxygen UI wrapper for the MUI DatePicker.
 * Applies Oxygen class naming and allows responsive behavior.
 */
const DatePicker = forwardRef(function OxygenDatePicker(
  { className, InputLabelProps, label, ...rest }: DatePickerProps,
  ref: Ref<HTMLDivElement>
): ReactElement {
  return (
    <>
      {label && (
        <InputLabel
          {...InputLabelProps}
          className={clsx('OxygenDatePicker-label', InputLabelProps?.className)}
        >
          {label}
        </InputLabel>
      )}
      <MUIDatePicker
        {...rest}
        ref={ref}
        className={clsx('OxygenDatePicker-root', className)}
        slotProps={{
          textField: {
            size: 'small',
          },
          ...rest.slotProps,
        }}
      />
    </>
  );
}) as ForwardRefExoticComponent<MuiDatePickerProps<true> & { ref?: Ref<HTMLDivElement> }>;

export default DatePicker;
