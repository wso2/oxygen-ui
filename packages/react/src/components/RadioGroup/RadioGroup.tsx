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

import MuiRadioGroup from '@mui/material/RadioGroup';
import type {RadioGroupProps as MuiRadioGroupProps} from '@mui/material/RadioGroup';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type RadioGroupProps = MuiRadioGroupProps;

/**
 * The Radio Group allows the user to select one option from a set.
 *
 * Demos:
 *
 * - [Radio Group (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-radio-group)
 * - [Radio Group (MUI)](https://mui.com/material-ui/react-radio-button/)
 *
 * API:
 *
 * - [RadioGroup API](https://mui.com/material-ui/api/radio-group/)
 * - inherits [FormGroup API](https://mui.com/material-ui/api/form-group/)
 *
 * @remarks
 * - ✔️ Props of the [FormGroup](https://mui.com/material-ui/api/form-group/) component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the RadioGroup component.
 * @param ref - The ref to be forwarded to the MuiRadioGroup component.
 * @returns The rendered RadioGroup component.
 */
const RadioGroup: ForwardRefExoticComponent<RadioGroupProps> = forwardRef(
  ({className, ...rest}: RadioGroupProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiRadioGroup
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-radio-group',
        'OxygenRadioGroup-root',
        className,
      )}
      {...rest}
      ref={ref}
    />
  ),
) as ForwardRefExoticComponent<RadioGroupProps>;

export default RadioGroup;
