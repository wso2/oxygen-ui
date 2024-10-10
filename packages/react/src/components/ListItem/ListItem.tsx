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

import MuiListItem from '@mui/material/ListItem';
import type {ListItemProps as MuiListItemProps, ListItemTypeMap} from '@mui/material/ListItem';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './list-item.scss';

export type ListItemProps<C extends ElementType = ElementType, D extends ElementType = 'li', P = {}> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiListItemProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'ListItem';

/**
 * The List Item is a common list item that renders as an <li> by default.
 *
 * Demos:
 *
 * - [Lists (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-list)
 * - [Transfer List (Oxygen UI)](TODO: Add a link after implementing: Tracker: https://github.com/wso2/oxygen-ui/issues/2)
 * - [Lists (MUI)](https://mui.com/material-ui/react-list/)
 * - [Transfer List (MUI)](https://mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [ListItem API](https://mui.com/material-ui/api/list-item/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the ListItem component.
 * @param ref - The ref to be forwarded to the MuiListItem component.
 * @returns The rendered ListItem component.
 */
const ListItem: OverridableComponent<ListItemTypeMap<ListItemProps, 'li'>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: ListItemProps<C>,
    ref: MutableRefObject<HTMLLIElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-list-item', className);

    return <MuiListItem ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<ListItemTypeMap<ListItemProps, 'li'>> & WithWrapperProps;

ListItem.displayName = composeComponentDisplayName(COMPONENT_NAME);
ListItem.muiName = COMPONENT_NAME;

export default ListItem;
