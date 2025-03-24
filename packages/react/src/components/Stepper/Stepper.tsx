/**
 * Copyright (c) 2023-2024, WSO2 LLC. (https://www.wso2.com).
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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import MuiStepper from '@mui/material/Stepper';
import type {StepperProps as MuiStepperProps, StepperTypeMap} from '@mui/material/Stepper';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import './stepper.scss';

export type StepperProps<
  C extends ElementType = ElementType,
  D extends ElementType = StepperTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use an HTML element or a component.
   */
  component?: C;
} & Omit<MuiStepperProps<D, P>, 'component'>;

/**
 * The Stepper component is used to display a series of steps in a defined sequence.
 *
 * Demos:
 *
 * - [Stepper (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-stepper)
 * - [Stepper (MUI)](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [Stepper API](https://mui.com/material-ui/api/stepper/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Stepper component.
 * @param ref - The ref to be forwarded to the MuiStepper component.
 * @returns The rendered Stepper component.
 */
const Stepper: OverridableComponent<StepperTypeMap<StepperProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: StepperProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => (
    <MuiStepper
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-stepper',
        'OxygenStepper-root',
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
) as OverridableComponent<StepperTypeMap<StepperProps>>;

export default Stepper;
