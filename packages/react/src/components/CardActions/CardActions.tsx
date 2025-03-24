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

import MuiCardActions from '@mui/material/CardActions';
import type {CardActionsProps as MuiCardActionsProps} from '@mui/material/CardActions';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, Ref, ReactElement} from 'react';

export type CardActionsProps = MuiCardActionsProps;

/**
 * The Card Actions component is an optional wrapper that groups a set of buttons.
 *
 * Demos:
 *
 * - [Card (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-card)
 * - [Card (MUI)](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardActions API](https://mui.com/material-ui/api/card-actions/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the CardActions component.
 * @param ref - The ref to be forwarded to the MuiCardActions component.
 * @returns The rendered CardActions component.
 */
const CardActions: ForwardRefExoticComponent<CardActionsProps> = forwardRef(
  ({className, ...rest}: CardActionsProps, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiCardActions
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-card-actions',
        'OxygenCardActions-root',
        className,
      )}
      {...rest}
    />
  ),
) as ForwardRefExoticComponent<CardActionsProps>;

export default CardActions;
