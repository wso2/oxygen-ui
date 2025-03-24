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

import MuiAlert from '@mui/material/Alert';
import type {AlertProps as MuiAlertProps} from '@mui/material/Alert';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, ElementType, Ref} from 'react';
import type {PaperTypeMap} from '../Paper';

export type AlertProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiAlertProps, 'component'>;

/**
 * The Alert component displays brief messages to the user without interrupting their use of the app.
 *
 * Demos:
 *
 * - [Alert (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-alert)
 * - [Alert (MUI)](https://mui.com/material-ui/react-alert/)
 *
 * API:
 *
 * - [Alert API](https://mui.com/material-ui/api/alert/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 *
 * @remarks
 * - ✔️ Props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Alert component.
 * @param ref - The ref to be forwarded to the MuiAlert component.
 * @returns The rendered Alert component.
 */
const Alert: OverridableComponent<PaperTypeMap<AlertProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: AlertProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => (
    <MuiAlert
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-alert',
        'OxygenAlert-root',
        className,
      )}
      {...rest}
    />
  ),
) as OverridableComponent<PaperTypeMap<AlertProps>>;

export default Alert;
