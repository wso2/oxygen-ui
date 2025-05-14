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
import {TimePicker as MuiTimePicker} from '@mui/x-date-pickers/TimePicker';
import type {TimePickerProps as MuiTimePickerProps} from '@mui/x-date-pickers/TimePicker';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {Ref, ReactElement, ForwardRefExoticComponent} from 'react';
import type {InputLabelProps} from '../InputLabel';

export type TimePickerProps<TDate = unknown> = {
  /**
   * Props for the label of the TimePicker.
   * This is used to customize the label of the TimePicker.
   */
  InputLabelProps?: InputLabelProps;
} & MuiTimePickerProps<TDate>;

/**
 * The TimePicker component lets you select time values.
 *
 * Demos:
 *
 * - [TimePicker (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-time-picker)
 * - [TimePicker (MUI)](https://mui.com/x/react-date-pickers/time-picker/)
 *
 * API:
 *
 * - [TimePicker API](https://mui.com/x/react-date-pickers/time-picker/#api)
 *
 * @remarks
 * - ✅ Props of the native component are also available
 * - ❌ `component` prop is not supported.
 * - ❌ The component cannot hold a ref.
 *
 * @param props - The props for the TimePicker component.
 * @param ref - The ref to be forwarded to the MuiTimePicker component.
 * @returns The rendered TimePicker component.
 */
const TimePicker: ForwardRefExoticComponent<TimePickerProps> = forwardRef(
  ({className, InputLabelProps, label, ...rest}: TimePickerProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <>
      {label && (
        <InputLabel className={clsx('OxygenTimePicker-label', InputLabelProps?.className)} {...InputLabelProps}>
          {label}
        </InputLabel>
      )}
      <MuiTimePicker
        ref={ref}
        className={clsx('OxygenTimePicker-root', className)}
        slotProps={{
          textField: {
            size: 'small',
          },
          ...rest.slotProps,
        }}
        {...rest}
      />
    </>
  ),
) as ForwardRefExoticComponent<TimePickerProps & {ref?: Ref<HTMLDivElement>}>;

export default TimePicker;
