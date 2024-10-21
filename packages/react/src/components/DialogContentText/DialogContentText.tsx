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

import MuiDialogContentText from '@mui/material/DialogContentText';
import type {
  DialogContentTextTypeMap,
  DialogContentTextProps as MuiDialogContentTextProps,
} from '@mui/material/DialogContentText';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, ElementType, Ref} from 'react';

export type DialogContentTextProps<
  C extends ElementType = ElementType,
  D extends ElementType = DialogContentTextTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiDialogContentTextProps<D, P>, 'component'>;

/**
 * The Dialog Content Text is a wrapper for text inside of `<DialogContent />`.
 *
 * Demos:
 *
 * - [Dialog (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-dialog)
 * - [Dialog (MUI)](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogContentText API](https://mui.com/material-ui/api/dialog-content-text/)
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 *
 * @remarks
 * - ✔️ Props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the DialogContentText component.
 * @param ref - The ref to be forwarded to the MuiDialogContentText component.
 * @returns The rendered DialogContentText component.
 */
const DialogContentText: OverridableComponent<DialogContentTextTypeMap<DialogContentTextProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: DialogContentTextProps<C>,
    ref: Ref<HTMLSpanElement>,
  ): ReactElement => (
    <MuiDialogContentText ref={ref} className={clsx('OxygenDialogContentText-root', className)} {...rest} />
  ),
) as OverridableComponent<DialogContentTextTypeMap<DialogContentTextProps>>;

export default DialogContentText;
