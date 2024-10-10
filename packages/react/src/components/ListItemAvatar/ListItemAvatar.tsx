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

import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import type {ListItemAvatarProps as MuiListItemAvatarProps} from '@mui/material/ListItemAvatar';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './list-item-avatar.scss';

export type ListItemAvatarProps = MuiListItemAvatarProps;

const COMPONENT_NAME: string = 'ListItemAvatar';

/**
 * The List Item Avatar component is used to display an avatar in a list item.
 *
 * Demos:
 *
 * - [Lists (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-list)
 * - [Lists (MUI)](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemAvatar API](https://mui.com/material-ui/api/list-item-avatar/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the ListItemAvatar component.
 * @param ref - The ref to be forwarded to the MuiListItemAvatar component.
 * @returns The rendered ListItemAvatar component.
 */
const ListItemAvatar: ForwardRefExoticComponent<ListItemAvatarProps> & WithWrapperProps = forwardRef(
  ({className, ...rest}: ListItemAvatarProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-list-item-avatar', className);

    return <MuiListItemAvatar ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<ListItemAvatarProps> & WithWrapperProps;

ListItemAvatar.displayName = composeComponentDisplayName(COMPONENT_NAME);
ListItemAvatar.muiName = COMPONENT_NAME;

export default ListItemAvatar;
