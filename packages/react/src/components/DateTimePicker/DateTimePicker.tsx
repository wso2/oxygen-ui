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
import {DateTimePicker as MuiDateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import type {DateTimePickerProps as MuiDateTimePickerProps} from '@mui/x-date-pickers/DateTimePicker';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement, ForwardRefExoticComponent} from 'react';
import type {InputLabelProps} from '../InputLabel';

export type DateTimePickerProps<C extends ElementType = ElementType> = {
  /**
   * Props for the label of the TimePicker.
   * This is used to customize the label of the TimePicker.
   */
  InputLabelProps?: InputLabelProps;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiDateTimePickerProps<C>, 'component'>;

/**
 * The DateTimePicker component lets you select date and time values.
 *
 * Demos:
 *
 * - [DateTimePicker (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-date-time-picker)
 * - [DateTimePicker (MUI)](https://mui.com/x/react-date-pickers/date-time-picker/)
 *
 * API:
 *
 * - [DateTimePicker API](https://mui.com/x/react-date-pickers/date-time-picker/#api)
 *
 * @remarks
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the DateTimePicker component.
 * @param ref - The ref to be forwarded to the MuiDateTimePickerComponent.
 * @returns The rendered DateTimePicker component.
 */
const DateTimePicker: ForwardRefExoticComponent<DateTimePickerProps> = forwardRef(
  ({className, InputLabelProps, label, ...rest}: DateTimePickerProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <>
      {label && (
        <InputLabel className={clsx('OxygenDateTimePicker-label', InputLabelProps?.className)} {...InputLabelProps}>
          {label}
        </InputLabel>
      )}
      <MuiDateTimePicker
        ref={ref}
        slotProps={{
          textField: {
            size: 'small',
          },
          ...rest.slotProps,
        }}
        className={clsx('OxygenDateTimePicker-root', className)}
        {...rest}
      />
    </>
  ),
) as ForwardRefExoticComponent<DateTimePickerProps & {ref?: Ref<HTMLDivElement>}>;

export default DateTimePicker;
