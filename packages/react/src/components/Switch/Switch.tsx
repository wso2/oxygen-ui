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
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import MuiSwitch from '@mui/material/Switch';
import type {SwitchProps as MuiSwitchProps} from '@mui/material/Switch';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, Ref, ElementType} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './switch.scss';

export type SwitchProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiSwitchProps, 'component'>;

const COMPONENT_NAME: string = 'Switch';

/**
 * The Switch toggles the state of a single setting on or off.
 *
 * Demos:
 *
 * - [Switch (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-switch)
 * - [Switch (MUI)](https://mui.com/material-ui/react-switch/)
 * - [Transfer List (Oxygen UI)](TODO: Add a link after implementing: Tracker: https://github.com/wso2/oxygen-ui/issues/2)
 * - [Transfer List (MUI)](https://mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [Switch API](https://mui.com/material-ui/api/switch/)
 * - inherits [IconButton API](https://mui.com/material-ui/api/icon-button/)
 *
 * @remarks
 * - ✔️ Props of the [IconButton](https://mui.com/material-ui/api/icon-button/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Switch component.
 * @param ref - The ref to be forwarded to the MuiSwitch component.
 * @returns The rendered Switch component.
 */
const Switch: OverridableComponent<ButtonBaseTypeMap<SwitchProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: SwitchProps<C>,
    ref: Ref<HTMLButtonElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-switch', className);

    return <MuiSwitch ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<ButtonBaseTypeMap<SwitchProps>> & WithWrapperProps;

Switch.displayName = composeComponentDisplayName(COMPONENT_NAME);
Switch.muiName = COMPONENT_NAME;

export default Switch;
