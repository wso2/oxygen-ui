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

import MuiContainer from '@mui/material/Container';
import type {ContainerProps as MuiContainerProps, ContainerTypeMap} from '@mui/material/Container';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './container.scss';

export type ContainerProps<
  C extends ElementType = ElementType,
  D extends ElementType = ContainerTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiContainerProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Container';

/**
 * The container centers your content horizontally. It's the most basic layout element.
 *
 * Demos:
 *
 * - [Container (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/layout-container)
 * - [Container (MUI)](https://mui.com/material-ui/react-container/)
 *
 * API:
 *
 * - [Container API](https://mui.com/material-ui/api/container/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Container component.
 * @param ref - The ref to be forwarded to the MuiContainer component.
 * @returns The rendered Container component.
 */
const Container: OverridableComponent<ContainerTypeMap<ContainerProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: ContainerProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-container', className);

    return <MuiContainer ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<ContainerTypeMap<ContainerProps>> & WithWrapperProps;

Container.displayName = composeComponentDisplayName(COMPONENT_NAME);
Container.muiName = COMPONENT_NAME;

export default Container;
