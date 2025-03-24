/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import MuiStepContent from '@mui/material/StepContent';
import type {StepContentProps as MuiStepContentProps} from '@mui/material/StepContent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type StepContentProps = MuiStepContentProps;

/**
 * The StepContent component is used to display the content for each step in a vertical stepper.
 *
 * Demos:
 *
 * - [Stepper (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-stepper)
 * - [Stepper (MUI)](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepContent API](https://mui.com/material-ui/api/step-content/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the StepContent component.
 * @param ref - The ref to be forwarded to the MuiStepContent component.
 * @returns The rendered StepContent component.
 */
const StepContent: ForwardRefExoticComponent<StepContentProps> = forwardRef(
  ({className, ...rest}: StepContentProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiStepContent
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-step-content',
        'OxygenStepContent-root',
        className,
      )}
      {...rest}
    />
  ),
) as ForwardRefExoticComponent<StepContentProps>;

export default StepContent;
