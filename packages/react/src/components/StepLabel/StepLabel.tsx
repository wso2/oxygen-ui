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

import MuiStepLabel from '@mui/material/StepLabel';
import type {StepLabelProps as MuiStepLabelProps} from '@mui/material/StepLabel';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type StepLabelProps = MuiStepLabelProps;

/**
 * The StepLabel component is used to display a label for each step in a stepper.
 *
 * Demos:
 *
 * - [Stepper (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-stepper)
 * - [Stepper (MUI)](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepLabel API](https://mui.com/material-ui/api/step-label/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the StepLabel component.
 * @param ref - The ref to be forwarded to the MuiStepLabel component.
 * @returns The rendered StepLabel component.
 */
const StepLabel: ForwardRefExoticComponent<StepLabelProps> = forwardRef(
  ({className, ...rest}: StepLabelProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-step-label', className);

    return <MuiStepLabel ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<StepLabelProps>;

export default StepLabel;
