/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import * as React from 'react';
import { Box, Divider } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';

/**
 * Props for AppShellSidebarFooter component.
 */
export interface AppShellSidebarFooterProps {
  /** Footer content */
  children: React.ReactNode;
  /** Whether to show divider above footer */
  showDivider?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarFooter - Fixed bottom section of the sidebar.
 *
 * Use this for settings navigation, user profile, or any content
 * that should stay visible at the bottom of the sidebar.
 */
export const AppShellSidebarFooter: React.FC<AppShellSidebarFooterProps> = ({
  children,
  showDivider = true,
  sx,
}) => {
  return (
    <>
      {showDivider && <Divider />}
      <Box sx={{ py: 1, ...sx }}>
        {children}
      </Box>
    </>
  );
};

export default AppShellSidebarFooter;
