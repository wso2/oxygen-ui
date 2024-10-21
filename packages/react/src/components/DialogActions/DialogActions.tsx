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

import MuiDialogActions from '@mui/material/DialogActions';
import type {DialogActionsProps as MuiDialogActionsProps} from '@mui/material/DialogActions';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type DialogActionsProps = MuiDialogActionsProps;

/**
 * The Dialog Actions is an optional container for a Dialog's Buttons.
 *
 * Demos:
 *
 * - [Dialog (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-dialog)
 * - [Dialog (MUI)](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogActions API](https://mui.com/material-ui/api/dialog-actions/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the DialogActions component.
 * @param ref - The ref to be forwarded to the MuiDialogActions component.
 * @returns The rendered DialogActions component.
 */
const DialogActions: ForwardRefExoticComponent<DialogActionsProps> = forwardRef(
  ({className, ...rest}: DialogActionsProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiDialogActions ref={ref} className={clsx('OxygenDialogActions-root', className)} {...rest} />
  ),
) as ForwardRefExoticComponent<DialogActionsProps>;

export default DialogActions;
