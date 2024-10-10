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

import MuiCircularProgress from '@mui/material/CircularProgress';
import type {CircularProgressProps as MuiCircularProgressProps} from '@mui/material/CircularProgress';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, ReactElement, Ref} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './circular-progress.scss';

export type CircularProgressProps = MuiCircularProgressProps;

const COMPONENT_NAME: string = 'CircularProgress';

/**
 * The Circular Progress indicators commonly known as spinners, express an unspecified wait
 * time or display the length of a process.
 *
 * Demos:
 *
 * TODO: Merge two progress components into one.
 * - [Progress (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-circular-progress)
 * - [Progress (MUI)](https://mui.com/material-ui/react-progress/)
 *
 * API:
 *
 * - [CircularProgress API](https://mui.com/material-ui/api/circular-progress/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the CircularProgress component.
 * @param ref - The ref to be forwarded to the MuiCircularProgress component.
 * @returns The rendered CircularProgress component.
 */
const CircularProgress: ForwardRefExoticComponent<CircularProgressProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>({className, ...rest}: CircularProgressProps, ref: Ref<HTMLSpanElement>): ReactElement => {
    const classes: string = clsx('oxygen-circular-progress', className);

    return <MuiCircularProgress ref={ref} aria-label="progress" className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<CircularProgressProps> & WithWrapperProps;

CircularProgress.displayName = composeComponentDisplayName(COMPONENT_NAME);
CircularProgress.muiName = COMPONENT_NAME;

export default CircularProgress;
