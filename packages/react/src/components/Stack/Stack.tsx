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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import MuiStack from '@mui/material/Stack';
import type {StackProps as MuiStackProps, StackTypeMap} from '@mui/material/Stack';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';

export type StackProps<
  C extends ElementType = ElementType,
  D extends ElementType = StackTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiStackProps<D, P>, 'component'>;

/**
 * The Stack is a container component for arranging elements vertically or horizontally.
 *
 * Demos:
 *
 * - [Stack (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/layout-stack)
 * - [Stack (MUI)](https://mui.com/material-ui/react-stack/)
 *
 * API:
 *
 * - [Stack API](https://mui.com/material-ui/api/stack/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Stack component.
 * @param ref - The ref to be forwarded to the MuiStack component.
 * @returns The rendered Stack component.
 */
const Stack: OverridableComponent<StackTypeMap<StackProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: StackProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => <MuiStack ref={ref} className={clsx('OxygenStack-root', className)} {...rest} />,
) as OverridableComponent<StackTypeMap<StackProps>>;

export default Stack;
