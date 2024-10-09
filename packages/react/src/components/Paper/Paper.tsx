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

import MuiPaper, {PaperProps as MuiPaperProps} from '@mui/material/Paper';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, ReactElement, MutableRefObject, ElementType} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type PaperProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiPaperProps, 'component'>;

const COMPONENT_NAME: string = 'Paper';

const Paper: ForwardRefExoticComponent<PaperProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>({className, ...rest}: PaperProps<C>, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-paper', className);

    return <MuiPaper className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<PaperProps> & WithWrapperProps;

Paper.displayName = composeComponentDisplayName(COMPONENT_NAME);
Paper.muiName = COMPONENT_NAME;

export default Paper;
