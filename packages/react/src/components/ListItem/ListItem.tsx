/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import MuiListItem, {ListItemProps as MuiListItemProps} from '@mui/material/ListItem';
import clsx from 'clsx';
import {ElementType, forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './list-item.scss';

export type ListItemProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiListItemProps<C>, 'component'>;

const COMPONENT_NAME: string = 'ListItem';

const ListItem: ForwardRefExoticComponent<ListItemProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>(props: ListItemProps<C>, ref: MutableRefObject<HTMLLIElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-list-item', className);

    return <MuiListItem className={classes} ref={ref} {...rest} />;
  },
) as ForwardRefExoticComponent<ListItemProps> & WithWrapperProps;

ListItem.displayName = composeComponentDisplayName(COMPONENT_NAME);
ListItem.muiName = COMPONENT_NAME;
ListItem.defaultProps = {};

export default ListItem;
