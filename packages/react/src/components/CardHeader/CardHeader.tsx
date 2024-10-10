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

import MuiCardHeader from '@mui/material/CardHeader';
import type {CardHeaderProps as MuiCardHeaderProps, CardHeaderTypeMap} from '@mui/material/CardHeader';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './card-header.scss';

export type CardHeaderProps<
  C extends ElementType = ElementType,
  D extends ElementType = CardHeaderTypeMap['defaultComponent'],
  P = {},
  T extends ElementType = 'span',
  S extends ElementType = 'span',
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiCardHeaderProps<D, P, T, S>, 'component'>;

const COMPONENT_NAME: string = 'CardHeader';

/**
 * The Card Header component is an optional wrapper for the Card header.
 *
 * Demos:
 *
 * - [Card (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-card)
 * - [Card (MUI)](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardHeader API](https://mui.com/material-ui/api/card-header/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the CardHeader component.
 * @param ref - The ref to be forwarded to the MuiCardHeader component.
 * @returns The rendered CardHeader component.
 */
const CardHeader: OverridableComponent<CardHeaderTypeMap<CardHeaderProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: CardHeaderProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-card-header', className);

    return <MuiCardHeader ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<CardHeaderTypeMap<CardHeaderProps>> & WithWrapperProps;

CardHeader.displayName = composeComponentDisplayName(COMPONENT_NAME);
CardHeader.muiName = COMPONENT_NAME;

export default CardHeader;
