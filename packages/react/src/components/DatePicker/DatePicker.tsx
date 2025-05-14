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
import {DatePicker as MuiDatePicker} from '@mui/x-date-pickers/DatePicker';
import type {DatePickerProps as MuiDatePickerProps} from '@mui/x-date-pickers/DatePicker';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, Ref, ReactElement} from 'react';
import type {InputLabelProps} from '../InputLabel';

export type DatePickerProps<C extends ElementType = ElementType> = {
  /**
   * Props for the label of the DatePicker.
   * This is used to customize the label of the DatePicker.
   */
  InputLabelProps?: InputLabelProps;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiDatePickerProps<true>, 'component'>;

/**
 * The DatePicker component lets you select date values.
 *
 * Demos:
 *
 * - [DatePicker (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-date-picker)
 * - [DatePicker (MUI)](https://mui.com/x/react-date-pickers/date-picker/)
 *
 * API:
 *
 * - [DatePicker API](https://mui.com/x/react-date-pickers/date-picker/#api)
 *
 * @remarks
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the DatePicker component.
 * @param ref - The ref to be forwarded to the MuiDatePicker component.
 * @returns The rendered DatePicker component.
 */
const DatePicker: ForwardRefExoticComponent<DatePickerProps> = forwardRef(
  ({className, InputLabelProps, label, ...rest}: DatePickerProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <>
      {label && (
        <InputLabel className={clsx('OxygenDatePicker-label', InputLabelProps?.className)} {...InputLabelProps}>
          {label}
        </InputLabel>
      )}
      <MuiDatePicker
        ref={ref}
        className={clsx('OxygenDatePicker-root', className)}
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
) as ForwardRefExoticComponent<MuiDatePickerProps<true> & {ref?: Ref<HTMLDivElement>}>;

export default DatePicker;
