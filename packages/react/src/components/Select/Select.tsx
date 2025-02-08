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

import MuiSelect from '@mui/material/Select';
import type {SelectProps as MuiSelectProps} from '@mui/material/Select';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, Ref, ReactElement} from 'react';
import InputLabel from '../InputLabel';
import type {InputLabelProps as MuiInputLabelProps} from '../InputLabel';
import './select.scss';

export type SelectProps = MuiSelectProps & {
  /**
   * Props for the `InputLabel` component.
   */
  InputLabelProps?: MuiInputLabelProps;
};

/**
 * The Select components are used for collecting user provided information from a list of options.
 *
 * Demos:
 *
 * - [Select (Oxygen UI)](https://mui.com/material-ui/react-select/)
 * - [Select (MUI)](https://mui.com/material-ui/react-select/)
 *
 * API:
 *
 * - [Select API](https://mui.com/material-ui/api/select/)
 * - inherits [OutlinedInput API](https://mui.com/material-ui/api/outlined-input/)
 *
 * @remarks
 * - ✔️ Props of the [OutlinedInput](https://mui.com/material-ui/api/outlined-input/) component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the Select component.
 * @param ref - The ref to be forwarded to the MuiSelect component.
 * @returns The rendered Select component.
 */
const Select: ForwardRefExoticComponent<SelectProps> = forwardRef(
  (
    {
      className,
      InputLabelProps = {
        disableAnimation: true,
        focused: false,
        shrink: true,
      },
      label,
      name,
      required,
      size = 'small',
      variant = 'outlined',
      ...rest
    }: SelectProps,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const labelProps: MuiInputLabelProps = {
      ...{
        disableAnimation: true,
        focused: false,
        required,
        shrink: true,
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
            className={clsx(
              /**
               * @deprecated Use the `OxygenSelectLabel-root` class instead.
               * This will be removed in the next major release (v3.0.0).
               * Tracker: https://github.com/wso2/oxygen-ui/issues/274
               */
              'oxygen-select-static-label',
              'OxygenSelectLabel-root',
              InputLabelProps?.className,
            )}
          >
            {label}
          </InputLabel>
        )}
        <MuiSelect
          ref={ref}
          className={clsx(
            /**
             * @deprecated Use the `OxygenSelect-root` class instead.
             * This will be removed in the next major release (v3.0.0).
             * Tracker: https://github.com/wso2/oxygen-ui/issues/274
             */
            'oxygen-select',
            'OxygenSelect-root',
            className,
          )}
          labelId={name}
          size={size}
          variant={variant}
          {...rest}
        />
      </>
    );
  },
) as ForwardRefExoticComponent<SelectProps>;

export default Select;
