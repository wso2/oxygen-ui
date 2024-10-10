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

import MuiBackdrop from '@mui/material/Backdrop';
import type {BackdropProps as MuiBackdropProps, BackdropTypeMap} from '@mui/material/Backdrop';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './backdrop.scss';

export type BackdropProps<
  C extends ElementType = ElementType,
  D extends ElementType = BackdropTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiBackdropProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Backdrop';

/**
 * The Backdrop component narrows the user's focus to a particular element on the screen.
 *
 * Demos:
 *
 * - [Backdrop (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/feedback-backdrop)
 * - [Backdrop (MUI)](https://mui.com/material-ui/react-backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://mui.com/material-ui/api/backdrop/)
 * - inherits [Fade API](https://mui.com/material-ui/api/fade/)
 *
 * @remarks
 * - ✔️ Props of the [Fade](https://mui.com/material-ui/api/fade/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Backdrop component.
 * @param ref - The ref to be forwarded to the MuiBackdrop component.
 * @returns The rendered Backdrop component.
 */
const Backdrop: ForwardRefExoticComponent<BackdropProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: BackdropProps<C>,
    ref: MutableRefObject<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-backdrop', className);

    return <MuiBackdrop ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<BackdropProps> & WithWrapperProps;

Backdrop.displayName = composeComponentDisplayName(COMPONENT_NAME);
Backdrop.muiName = COMPONENT_NAME;

export default Backdrop;
