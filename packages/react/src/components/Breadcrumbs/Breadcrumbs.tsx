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

import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import type {BreadcrumbsProps as MuiBreadcrumbsProps, BreadcrumbsTypeMap} from '@mui/material/Breadcrumbs';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './breadcrumbs.scss';

export type BreadcrumbsProps<
  C extends ElementType = ElementType,
  D extends ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiBreadcrumbsProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Breadcrumbs';

/**
 * The Breadcrumbs component is a list of links that help visualize a page's location within
 * a site's hierarchical structure, it allows navigation up to any of the ancestors.
 *
 * Demos:
 *
 * - [Breadcrumbs (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-breadcrumbs)
 * - [Breadcrumbs (MUI)](https://mui.com/material-ui/react-breadcrumbs/)
 *
 * API:
 *
 * - [Breadcrumbs API](https://mui.com/material-ui/api/breadcrumbs/)
 *
 * @remarks
 * - ✔️ Props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Breadcrumbs component.
 * @param ref - The ref to be forwarded to the MuiBreadcrumbs component.
 * @returns The rendered Breadcrumbs component.
 */
const Breadcrumbs: OverridableComponent<BreadcrumbsTypeMap<BreadcrumbsProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, children, ...rest}: BreadcrumbsProps<C>,
    ref: Ref<HTMLSpanElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-breadcrumbs', className);

    return (
      <MuiBreadcrumbs ref={ref} aria-label="breadcrumbs" className={classes} {...rest}>
        {children}
      </MuiBreadcrumbs>
    );
  },
) as OverridableComponent<BreadcrumbsTypeMap<BreadcrumbsProps>> & WithWrapperProps;

Breadcrumbs.displayName = composeComponentDisplayName(COMPONENT_NAME);
Breadcrumbs.muiName = 'Breadcrumbs';

export default Breadcrumbs;
