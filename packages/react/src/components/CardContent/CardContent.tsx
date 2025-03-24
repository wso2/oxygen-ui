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

import MuiCardContent from '@mui/material/CardContent';
import type {CardContentProps as MuiCardContentProps, CardContentTypeMap} from '@mui/material/CardContent';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';

export type CardContentProps<
  C extends ElementType = ElementType,
  D extends ElementType = CardContentTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiCardContentProps<D, P>, 'component'>;

/**
 * The Card Content component is the wrapper for the Card content.
 *
 * Demos:
 *
 * - [Card (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-card)
 * - [Card (MUI)](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardContent API](https://mui.com/material-ui/api/card-content/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the CardContent component.
 * @param ref - The ref to be forwarded to the MuiCardContent component.
 * @returns The rendered CardContent component.
 */
const CardContent: OverridableComponent<CardContentTypeMap<CardContentProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: CardContentProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => (
    <MuiCardContent
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-card-content',
        'OxygenCardContent-root',
        className,
      )}
      {...rest}
    />
  ),
) as OverridableComponent<CardContentTypeMap<CardContentProps>>;

export default CardContent;
