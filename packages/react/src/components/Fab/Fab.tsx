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

import MuiFab, {FabProps as MuiFabProps} from '@mui/material/Fab';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, ReactElement, MutableRefObject, ElementType} from 'react';
import {WithWrapperProps} from '../../models';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type FabProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiFabProps<C>, 'component'>;

const COMPONENT_NAME: string = 'Fab';

const Fab: ForwardRefExoticComponent<FabProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>(props: FabProps<C>, ref: MutableRefObject<HTMLButtonElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-fab', className);

    return <MuiFab className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<FabProps> & WithWrapperProps;

Fab.displayName = composeComponentDisplayName(COMPONENT_NAME);
Fab.muiName = COMPONENT_NAME;
Fab.defaultProps = {};

export default Fab;
