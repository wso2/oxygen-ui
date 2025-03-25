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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import MuiTab from '@mui/material/Tab';
import type {TabProps as MuiTabProps, TabTypeMap} from '@mui/material/Tab';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import './tab.scss';

export type TabProps<
  C extends ElementType = ElementType,
  D extends ElementType = TabTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiTabProps<D, P>, 'component'>;

/**
 * The Tab component is used to create a tab in a tab list.
 *
 * Demos:
 *
 * - [Tabs (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-tab)
 * - [Tabs (MUI)](https://mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [Tab API](https://mui.com/material-ui/api/tab/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 *
 * @remarks
 * - ✔️ Props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Tab component.
 * @param ref - The ref to be forwarded to the MuiTab component.
 * @returns The rendered Tab component.
 */
const Tab: OverridableComponent<TabTypeMap<TabProps>> = forwardRef(
  <C extends ElementType = ElementType>({className, ...rest}: TabProps<C>, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiTab
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-tab',
        'OxygenTab-root',
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
) as OverridableComponent<TabTypeMap<TabProps>>;

export default Tab;
