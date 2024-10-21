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

import MuiDialogTitle from '@mui/material/DialogTitle';
import type {DialogTitleTypeMap, DialogTitleProps as MuiDialogTitleProps} from '@mui/material/DialogTitle';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, ElementType, Ref} from 'react';

export type DialogTitleProps<
  C extends ElementType = ElementType,
  D extends ElementType = DialogTitleTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiDialogTitleProps<D, P>, 'component'>;

/**
 * The Dialog Content Text is a wrapper used for the title of a Dialog.
 *
 * Demos:
 *
 * - [Dialog (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-dialog)
 * - [Dialog (MUI)](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogTitle API](https://mui.com/material-ui/api/dialog-title/)
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 *
 * @remarks
 * - ✔️ Props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the DialogTitle component.
 * @param ref - The ref to be forwarded to the MuiDialogTitle component.
 * @returns The rendered DialogTitle component.
 */
const DialogTitle: OverridableComponent<DialogTitleTypeMap<DialogTitleProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: DialogTitleProps<C>,
    ref: Ref<HTMLSpanElement>,
  ): ReactElement => <MuiDialogTitle ref={ref} className={clsx('OxygenDialogTitle-root', className)} {...rest} />,
) as OverridableComponent<DialogTitleTypeMap<DialogTitleProps>>;

export default DialogTitle;
