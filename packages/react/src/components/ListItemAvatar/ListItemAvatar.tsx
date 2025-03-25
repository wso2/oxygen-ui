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
import type {ForwardRefExoticComponent, Ref, ReactElement} from 'react';

export type ListItemAvatarProps = MuiListItemAvatarProps;

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
const ListItemAvatar: ForwardRefExoticComponent<ListItemAvatarProps> = forwardRef(
  ({className, ...rest}: ListItemAvatarProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiListItemAvatar
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-list-item-avatar',
        'OxygenListItemAvatar-root',
        className,
      )}
      {...rest}
    />
  ),
) as ForwardRefExoticComponent<ListItemAvatarProps>;

export default ListItemAvatar;
