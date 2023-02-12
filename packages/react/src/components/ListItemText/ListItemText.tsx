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

import MuiListItemText, {ListItemTextProps as MuiListItemTextProps} from '@mui/material/ListItemText';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';

export type ListItemTextProps = MuiListItemTextProps;

const COMPONENT_NAME: string = 'ListItemText';

const ListItemText: FC<ListItemTextProps> & WithWrapperProps = (props: ListItemTextProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-list-item-text', className);

  return <MuiListItemText className={classes} {...rest} />;
};

ListItemText.displayName = composeComponentDisplayName(COMPONENT_NAME);
ListItemText.muiName = COMPONENT_NAME;
ListItemText.defaultProps = {};

export default ListItemText;
