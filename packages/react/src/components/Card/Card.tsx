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

import MuiCard, {CardProps as MuiCardProps} from '@mui/material/Card';
import clsx from 'clsx';
import {ElementType, forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './card.scss';

export type CardProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiCardProps, 'component'>;

const COMPONENT_NAME: string = 'Card';

const Card: ForwardRefExoticComponent<CardProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>(
    {className, component, onClick, elevation = 0, variant = 'outlined', ...rest}: CardProps<C>,
    ref: MutableRefObject<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-card', {'with-hover': onClick}, className);

    return (
      <MuiCard className={classes} ref={ref} onClick={onClick} elevation={elevation} variant={variant} {...rest} />
    );
  },
) as ForwardRefExoticComponent<CardProps> & WithWrapperProps;

Card.displayName = composeComponentDisplayName(COMPONENT_NAME);
Card.muiName = COMPONENT_NAME;

export default Card;
