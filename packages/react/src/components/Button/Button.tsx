/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

import MuiButton from '@mui/lab/LoadingButton';
import type {LoadingButtonTypeMap, LoadingButtonProps as MuiButtonProps} from '@mui/lab/LoadingButton';
import type {ButtonTypeMap} from '@mui/material';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ReactElement, Ref} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './button.scss';

export type ButtonProps<
  C extends ElementType = ElementType,
  D extends ElementType = LoadingButtonTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiButtonProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Button';

/**
 * The Button component allow users to take actions, and make choices, with a single tap.
 *
 * Demos:
 *
 * - [Button (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-button)
 * - [Button (MUI)](https://mui.com/material-ui/react-button/)
 *
 * API:
 *
 * - [LoadingButton API](https://mui.com/material-ui/api/loading-button/)
 * - inherits [Button API](https://mui.com/material-ui/api/button/)
 *
 * @remarks
 * - ✔️ Props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Button component.
 * @param ref - The ref to be forwarded to the MuiButton component.
 * @returns The rendered Button component.
 */
const Button: OverridableComponent<ButtonTypeMap<ButtonProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: ButtonProps<C>,
    ref: Ref<HTMLButtonElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-button', className);

    return <MuiButton ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<ButtonTypeMap<ButtonProps>> & WithWrapperProps;

Button.displayName = composeComponentDisplayName(COMPONENT_NAME);
Button.muiName = COMPONENT_NAME;

export default Button;
