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

import MuiTooltip, {TooltipProps as MuiTooltipProps} from '@mui/material/Tooltip';
import clsx from 'clsx';
import {ForwardRefExoticComponent, MutableRefObject, ReactElement, forwardRef} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './tooltip.scss';

export type TooltipProps = MuiTooltipProps;

const COMPONENT_NAME: string = 'Tooltip';

const Tooltip: ForwardRefExoticComponent<TooltipProps> & WithWrapperProps = forwardRef(
  ({className, ...rest}: TooltipProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-tooltip', className);

    return <MuiTooltip className={classes} ref={ref} {...rest} />;
  },
) as ForwardRefExoticComponent<TooltipProps> & WithWrapperProps;

Tooltip.displayName = composeComponentDisplayName(COMPONENT_NAME);
Tooltip.muiName = COMPONENT_NAME;

export default Tooltip;
