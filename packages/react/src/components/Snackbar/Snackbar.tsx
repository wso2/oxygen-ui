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

import MuiSnackbar from '@mui/material/Snackbar';
import type {SnackbarProps as MuiSnackbarProps} from '@mui/material/Snackbar';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';
import './snackbar.scss';

export type SnackbarProps = MuiSnackbarProps;

/**
 * The Snackbar (also known as toasts) is used for brief notifications of processes that have been or will be performed.
 *
 * Demos:
 *
 * - [Snackbar (Oxygen UI)]](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-snackbar--overview)
 * - [Snackbar (MUI)](https://mui.com/material-ui/react-snackbar/)
 *
 * API:
 *
 * - [Snackbar API](https://mui.com/material-ui/api/snackbar/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the Snackbar component.
 * @param ref - The ref to be forwarded to the MuiSnackbar component.
 * @returns The rendered Snackbar component.
 */
const Snackbar: ForwardRefExoticComponent<SnackbarProps> = forwardRef(
  ({className, ...rest}: SnackbarProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-snackbar', className);

    return <MuiSnackbar className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<SnackbarProps>;

export default Snackbar;
