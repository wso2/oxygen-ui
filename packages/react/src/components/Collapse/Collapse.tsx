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

import MuiCollapse from '@mui/material/Collapse';
import type {CollapseProps as MuiCollapseProps} from '@mui/material/Collapse';
import type {OverridableComponent, OverridableTypeMap} from '@mui/material/OverridableComponent';
import type {TransitionProps} from '@mui/material/transitions';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, Ref, ElementType} from 'react';

export type CollapseProps<C extends ElementType = ElementType<TransitionProps>> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiCollapseProps, 'component'>;

/**
 * A Transition component to expand from the start edge of the child element.
 *
 * Demos:
 *
 * - [Card (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-card)
 * - [Card (MUI)](https://mui.com/material-ui/react-card/)
 * - [Lists (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-list)
 * - [Lists (MUI)](https://mui.com/material-ui/react-list/)
 * - [Collapse (Oxygen UI)](https://mui.com/material-ui/transitions/)
 * - [Transitions (MUI)](https://mui.com/material-ui/transitions/)
 *
 * API:
 *
 * - [Collapse API](https://mui.com/material-ui/api/collapse/)
 * - inherits [Transition API](http://reactcommunity.org/react-transition-group/transition/#Transition-props)
 *
 * @remarks
 * - ✔️ Props of the [Transition](https://mui.com/material-ui/transitions/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Collapse component.
 * @param ref - The ref to be forwarded to the MuiCollapse component.
 * @returns The rendered Collapse component.
 */
const Collapse: OverridableComponent<OverridableTypeMap> = forwardRef(
  ({className, ...rest}: CollapseProps<ElementType<TransitionProps>>, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiCollapse ref={ref} className={clsx('OxygenCollapse-root', className)} {...rest} />
  ),
) as OverridableComponent<OverridableTypeMap>;

export default Collapse;
