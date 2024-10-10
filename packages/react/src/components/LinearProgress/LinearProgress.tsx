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

import MuiLinearProgress from '@mui/material/LinearProgress';
import type {LinearProgressProps as MuiLinearProgressProps} from '@mui/material/LinearProgress';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type LinearProgressProps = MuiLinearProgressProps;

const COMPONENT_NAME: string = 'LinearProgress';

/**
 * The Linear Progress component is used to show the progress of a task in a linear fashion.
 *
 * Demos:
 *
 * TODO: Merge two progress components into one.
 * - [Progress (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-circular-progress)
 * - [Progress (MUI)](https://mui.com/material-ui/react-progress/)
 *
 * API:
 *
 * - [LinearProgress API](https://mui.com/material-ui/api/linear-progress/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the LinearProgress component.
 * @param ref - The ref to be forwarded to the MuiLinearProgress component.
 * @returns The rendered LinearProgress component.
 */
const LinearProgress: ForwardRefExoticComponent<LinearProgressProps> & WithWrapperProps = forwardRef(
  ({className, ...rest}: LinearProgressProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-linear-progress', className);

    return <MuiLinearProgress ref={ref} aria-label="progress-bar" className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<LinearProgressProps> & WithWrapperProps;

LinearProgress.displayName = composeComponentDisplayName(COMPONENT_NAME);
LinearProgress.muiName = COMPONENT_NAME;

export default LinearProgress;
