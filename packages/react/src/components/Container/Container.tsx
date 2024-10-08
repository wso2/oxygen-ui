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

import MuiContainer, {ContainerProps as MuiContainerProps} from '@mui/material/Container';
import clsx from 'clsx';
import {ElementType, FC, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './container.scss';

export type ContainerProps<C extends ElementType = ElementType> = {
  component?: C;
} & Omit<MuiContainerProps<C>, 'component'>;

const COMPONENT_NAME: string = 'Container';

const Container: FC<ContainerProps> & WithWrapperProps = <C extends ElementType>(
  props: ContainerProps<C>,
): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-container', className);

  return <MuiContainer className={classes} {...rest} />;
};

Container.displayName = composeComponentDisplayName(COMPONENT_NAME);
Container.muiName = COMPONENT_NAME;
Container.defaultProps = {};

export default Container;
