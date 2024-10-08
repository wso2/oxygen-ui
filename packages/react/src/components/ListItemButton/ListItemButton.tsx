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

import MuiListItemButton, {ListItemButtonProps as MuiListItemButtonProps} from '@mui/material/ListItemButton';
import clsx from 'clsx';
import {ElementType, ForwardRefExoticComponent, MutableRefObject, ReactElement, forwardRef} from 'react';
import {WithWrapperProps} from '../../models';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './list-item-button.scss';

export type ListItemButtonProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiListItemButtonProps<C>, 'component'>;

const COMPONENT_NAME: string = 'ListItemButton';

const ListItemButton: ForwardRefExoticComponent<ListItemButtonProps> & WithWrapperProps = forwardRef(
  (props: ListItemButtonProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-list-item-button', className);

    return <MuiListItemButton className={classes} ref={ref} {...rest} />;
  },
) as ForwardRefExoticComponent<ListItemButtonProps> & WithWrapperProps;

ListItemButton.displayName = composeComponentDisplayName(COMPONENT_NAME);
ListItemButton.muiName = COMPONENT_NAME;
ListItemButton.defaultProps = {};

export default ListItemButton;
