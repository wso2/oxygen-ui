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

import MuiListItemIcon from '@mui/material/ListItemIcon';
import type {ListItemIconProps as MuiListItemIconProps} from '@mui/material/ListItemIcon';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, Ref, ReactElement} from 'react';
import './list-item-icon.scss';

export type ListItemIconProps = MuiListItemIconProps;

/**
 * The List Item Icon component is used to display an icon in a list item.
 *
 * Demos:
 *
 * - [Lists (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-list)
 * - [Lists (MUI)](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemIcon API](https://mui.com/material-ui/api/list-item-icon/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the ListItemIcon component.
 * @param ref - The ref to be forwarded to the MuiListItemIcon component.
 * @returns The rendered ListItemIcon component.
 */
const ListItemIcon: ForwardRefExoticComponent<ListItemIconProps> = forwardRef(
  ({className, ...rest}: ListItemIconProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-list-item-icon', className);

    return <MuiListItemIcon ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<ListItemIconProps>;

export default ListItemIcon;
