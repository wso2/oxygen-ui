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

import MuiDialog from '@mui/material/Dialog';
import type {DialogProps as MuiDialogProps} from '@mui/material/Dialog';
import type {ModalTypeMap} from '@mui/material/Modal';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ReactElement, Ref} from 'react';

export type DialogProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiDialogProps, 'component'>;

/**
 * Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.
 *
 * Demos:
 *
 * - [Dialog (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-dialog)
 * - [Dialog (MUI)](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [Dialog API](https://mui.com/material-ui/api/dialog/)
 * - inherits [Modal API](https://mui.com/material-ui/api/modal/)
 *
 * @remarks
 * - ✔️ Props of the [Modal](https://mui.com/material-ui/api/modal/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Dialog component.
 * @param ref - The ref to be forwarded to the MuiDialog component.
 * @returns The rendered Dialog component.
 */
const Dialog: OverridableComponent<ModalTypeMap<ModalTypeMap['defaultComponent'], DialogProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: DialogProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => <MuiDialog ref={ref} className={clsx('OxygenDialog-root')} {...rest} />,
) as OverridableComponent<ModalTypeMap<ModalTypeMap['defaultComponent'], DialogProps>>;

export default Dialog;
