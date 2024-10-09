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

import MuiCardHeader, {CardHeaderProps as MuiCardHeaderProps} from '@mui/material/CardHeader';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './card-header.scss';

export type CardHeaderProps = MuiCardHeaderProps;

const COMPONENT_NAME: string = 'CardHeader';

const CardHeader: FC<CardHeaderProps> & WithWrapperProps = (props: CardHeaderProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-card-header', className);

  return <MuiCardHeader className={classes} {...rest} />;
};

CardHeader.displayName = composeComponentDisplayName(COMPONENT_NAME);
CardHeader.muiName = COMPONENT_NAME;

export default CardHeader;
