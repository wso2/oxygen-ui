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

import clsx from 'clsx';
import {FC, PropsWithChildren, ReactElement, ReactNode} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Box, {BoxProps} from '../Box';
import './app-shell.scss';

export interface AppShellProps extends BoxProps {
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
}

const COMPONENT_NAME: string = 'AppShell';

const AppShell: FC<PropsWithChildren<AppShellProps>> & WithWrapperProps = ({
  className,
  children,
  footer,
  header,
  navigation,
  ...rest
}: PropsWithChildren<AppShellProps>): ReactElement => {
  const classes: string = clsx('oxygen-app-shell', className);

  return (
    <Box className={classes} {...rest}>
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
};

AppShell.displayName = composeComponentDisplayName(COMPONENT_NAME);
AppShell.muiName = COMPONENT_NAME;

export default AppShell;
