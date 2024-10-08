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

import MuiCardContent, {CardContentProps as MuiCardContentProps} from '@mui/material/CardContent';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './card-content.scss';

export type CardContentProps = MuiCardContentProps;

const COMPONENT_NAME: string = 'CardContent';

const CardContent: ForwardRefExoticComponent<CardContentProps> & WithWrapperProps = forwardRef(
  (props: CardContentProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-card-content', className);

    return <MuiCardContent ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<CardContentProps> & WithWrapperProps;

CardContent.displayName = composeComponentDisplayName(COMPONENT_NAME);
CardContent.muiName = COMPONENT_NAME;

export default CardContent;
