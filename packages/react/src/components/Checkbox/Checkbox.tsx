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

import type {ButtonBaseTypeMap} from '@mui/material/ButtonBase';
import MuiCheckbox from '@mui/material/Checkbox';
import type {CheckboxProps as MuiCheckboxProps} from '@mui/material/Checkbox';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, Ref, ElementType} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type CheckboxProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiCheckboxProps, 'component'>;

const COMPONENT_NAME: string = 'Checkbox';

/**
 * The Checkboxes allow the user to select one or more items from a set.
 *
 * Demos:
 *
 * - [Checkbox (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-checkbox)
 * - [Checkbox (MUI)](https://mui.com/material-ui/react-checkbox/)
 * - [Transfer List (Oxygen UI)](TODO: Add a link after implementing: Tracker: https://github.com/wso2/oxygen-ui/issues/2)
 * - [Transfer List (MUI)](https://mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [Checkbox API](https://mui.com/material-ui/api/checkbox/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 *
 * @remarks
 * - ✔️ Props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Checkbox component.
 * @param ref - The ref to be forwarded to the MuiCheckbox component.
 * @returns The rendered Checkbox component.
 */
const Checkbox: OverridableComponent<ButtonBaseTypeMap<CheckboxProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: CheckboxProps<C>,
    ref: Ref<HTMLButtonElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-checkbox', className);

    return <MuiCheckbox ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<ButtonBaseTypeMap<CheckboxProps>> & WithWrapperProps;

Checkbox.displayName = composeComponentDisplayName(COMPONENT_NAME);
Checkbox.muiName = COMPONENT_NAME;

export default Checkbox;
