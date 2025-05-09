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
import clsx from 'clsx';
import { forwardRef } from 'react';
import type { Ref, ReactElement, ForwardRefExoticComponent } from 'react';
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers/TimePicker';
import type { TimePickerProps as MUIv6TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import type { InputLabelProps } from '../InputLabel';

export type TimePickerProps<TDate = unknown> = MUIv6TimePickerProps<TDate> & {
  InputLabelProps?: InputLabelProps;
};

/**
 * Oxygen UI wrapper for MUI v6 TimePicker.
 */
const TimePicker = forwardRef(function OxygenTimePicker<TDate = unknown>(
  { className, InputLabelProps, label, ...rest }: TimePickerProps<TDate>,
  ref: Ref<HTMLDivElement>
): ReactElement {
  return (
    <>
      {label && (
        <InputLabel
          {...InputLabelProps}
          className={clsx('OxygenTimePicker-label', InputLabelProps?.className)}
        >
          {label}
        </InputLabel>
      )}
      <MUITimePicker
        {...rest}
        ref={ref}
        className={clsx('OxygenTimePicker-root', className)}
        slotProps={{
          textField: {
            size: 'small',
          },
          ...rest.slotProps,
        }}
      />
    </>
  );
}) as ForwardRefExoticComponent<TimePickerProps & { ref?: Ref<HTMLDivElement> }>;

export default TimePicker;
