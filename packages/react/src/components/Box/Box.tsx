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

import MuiBox, {BoxProps as MuiBoxProps} from '@mui/material/Box';
import clsx from 'clsx';
import {ElementType, forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type BoxProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiBoxProps<C>, 'component'>;

const COMPONENT_NAME: string = 'Box';

const Box: ForwardRefExoticComponent<BoxProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>(props: BoxProps<C>, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-box', className);

    return <MuiBox className={classes} ref={ref} {...rest} />;
  },
) as ForwardRefExoticComponent<BoxProps> & WithWrapperProps;

Box.displayName = composeComponentDisplayName(COMPONENT_NAME);
Box.muiName = COMPONENT_NAME;
Box.defaultProps = {};

export default Box;
