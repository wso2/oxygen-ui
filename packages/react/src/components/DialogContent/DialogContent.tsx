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

import MuiDialogContent from '@mui/material/DialogContent';
import type {DialogContentProps as MuiDialogContentProps} from '@mui/material/DialogContent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type DialogContentProps = MuiDialogContentProps;

/**
 * The Dialog Content is an optional container for displaying the Dialog's content.
 *
 * Demos:
 *
 * - [Dialog (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-dialog)
 * - [Dialog (MUI)](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogContent API](https://mui.com/material-ui/api/dialog-content/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the DialogContent component.
 * @param ref - The ref to be forwarded to the MuiDialogContent component.
 * @returns The rendered DialogContent component.
 */
const DialogContent: ForwardRefExoticComponent<DialogContentProps> = forwardRef(
  ({className, ...rest}: DialogContentProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiDialogContent ref={ref} className={clsx('OxygenDialogContent-root', className)} {...rest} />
  ),
) as ForwardRefExoticComponent<DialogContentProps>;

export default DialogContent;
