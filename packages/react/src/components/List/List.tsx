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

import MuiList from '@mui/material/List';
import type {ListTypeMap, ListProps as MuiListProps} from '@mui/material/List';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import './list.scss';

export type ListProps<
  C extends ElementType = ElementType,
  D extends ElementType = ListTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiListProps<D, P>, 'component'>;

/**
 * A Lists is a continuous, vertical index of text or images.
 *
 * Demos:
 *
 * - [Lists (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-list)
 * - [Lists (MUI)](https://mui.com/material-ui/react-list/)
 * - [Transfer List (Oxygen UI)](TODO: Add a link after implementing: Tracker: https://github.com/wso2/oxygen-ui/issues/2)
 * - [Transfer List (MUI)](https://mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [List API](https://mui.com/material-ui/api/list/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the List component.
 * @param ref - The ref to be forwarded to the MuiList component.
 * @returns The rendered List component.
 */
const List: OverridableComponent<ListTypeMap<ListProps>> = forwardRef(
  <C extends ElementType>({className, ...rest}: ListProps<C>, ref: Ref<HTMLUListElement>): ReactElement => (
    <MuiList
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-list',
        'OxygenList-root',
        className,
      )}
      {...rest}
    />
  ),
) as OverridableComponent<ListTypeMap<ListProps>>;

export default List;
