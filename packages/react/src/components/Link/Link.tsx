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

import MuiLink from '@mui/material/Link';
import type {LinkTypeMap, LinkProps as MuiLinkProps} from '@mui/material/Link';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './link.scss';

export type LinkProps<
  C extends ElementType = ElementType,
  D extends ElementType = LinkTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiLinkProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Link';

/**
 * A Link allows you to easily customize anchor elements with your theme colors and typography styles.
 *
 * Demos:
 *
 * - [Breadcrumbs (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-breadcrumbs)
 * - [Breadcrumbs (MUI)](https://mui.com/material-ui/react-breadcrumbs/)
 * - [Links (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-link)
 * - [Links (MUI)](https://mui.com/material-ui/react-link/)
 *
 * API:
 *
 * - [Link API](https://mui.com/material-ui/api/link/)
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 *
 * @remarks
 * - ✔️ Props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Link component.
 * @param ref - The ref to be forwarded to the MuiLink component.
 * @returns The rendered Link component.
 */
const Link: OverridableComponent<LinkTypeMap<LinkProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: LinkProps<C>,
    ref: Ref<HTMLAnchorElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-link', className);

    return <MuiLink ref={ref} className={classes} underline="hover" {...rest} />;
  },
) as OverridableComponent<LinkTypeMap<LinkProps>> & WithWrapperProps;

Link.displayName = composeComponentDisplayName(COMPONENT_NAME);
Link.muiName = COMPONENT_NAME;

export default Link;
