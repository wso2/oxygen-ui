/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import MuiStep from '@mui/material/Step';
import type {StepTypeMap, StepProps as MuiStepProps} from '@mui/material/Step';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement, ForwardRefExoticComponent} from 'react';

export type StepProps<
  C extends ElementType = ElementType,
  D extends ElementType = StepTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiStepProps<D, P>, 'component'>;

/**
 * The Step component is used to create a step in a sequence of steps.
 *
 * Demos:
 *
 * - [Stepper (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-stepper)
 * - [Stepper (MUI)](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [Tab API](https://mui.com/material-ui/api/step/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Step component.
 * @param ref - The ref to be forwarded to the MuiStep component.
 * @returns The rendered Step component.
 */
const Step: ForwardRefExoticComponent<StepProps> = forwardRef(
  ({className, ...rest}: StepProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiStep
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-step-content',
        'OxygenStep-root',
        className,
      )}
      {...rest}
    />
  ),
) as ForwardRefExoticComponent<StepProps>;

export default Step;
