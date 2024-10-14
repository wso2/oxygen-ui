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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement, ReactNode} from 'react';
import Box from '../Box';
import type {BoxProps, BoxTypeMap} from '../Box';
import './app-shell.scss';

export type AppShellProps<C extends ElementType = ElementType> = BoxProps<C> & {
  /**
   * Footer component.
   */
  footer?: ReactNode;
  /**
   * Header component.
   */
  header?: ReactNode;
  /**
   * Navigation component.
   */
  navigation?: ReactNode;
};

/**
 * The App Shell component is a layout component that can be used to create a common Header - Navbar - Footer - Aside - Content layout pattern.
 *
 * Demos:
 *
 * - [App Shell (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/layout-app-shell)
 *
 * API:
 *
 * - inherits [Box API](https://mui.com/material-ui/api/box/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Box](https://mui.com/material-ui/api/box/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the AppShell component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered AppShell component.
 */
const AppShell: OverridableComponent<BoxTypeMap<AppShellProps>> = forwardRef(
  <C extends ElementType>(
    {className, children, footer, header, navigation, ...rest}: AppShellProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-app-shell', className);

    return (
      <Box ref={ref} className={classes} {...rest}>
        {header}
        <Box className="oxygen-app-shell-content">
          <Box className="oxygen-app-shell-navigation-wrapper">{navigation}</Box>
          <Box className="oxygen-app-shell-main-wrapper">
            <Box component="main" className="oxygen-app-shell-main">
              {children}
            </Box>
            {footer}
          </Box>
        </Box>
      </Box>
    );
  },
) as OverridableComponent<BoxTypeMap<AppShellProps>>;

export default AppShell;
