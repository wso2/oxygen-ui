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
import { IconButton, Tooltip } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { PanelLeftClose, PanelLeftOpen } from '@wso2/oxygen-ui-icons-react';

/**
 * Props for AppShellHeaderToggle component.
 */
export interface AppShellHeaderToggleProps {
  /** Whether the sidebar is collapsed */
  collapsed: boolean;
  /** Callback to toggle sidebar */
  onToggle: () => void;
  /** Label for expanded state tooltip */
  expandLabel?: string;
  /** Label for collapsed state tooltip */
  collapseLabel?: string;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellHeaderToggle - Sidebar toggle button for the header.
 *
 * Displays an animated icon that indicates the current sidebar state
 * and toggles between expanded/collapsed states.
 *
 * Theme tokens used:
 * - `text.secondary` - Icon color
 */
export const AppShellHeaderToggle: React.FC<AppShellHeaderToggleProps> = ({
  collapsed,
  onToggle,
  expandLabel = 'Expand sidebar',
  collapseLabel = 'Collapse sidebar',
  sx,
}) => {
  return (
    <Tooltip title={collapsed ? expandLabel : collapseLabel}>
      <IconButton
        onClick={onToggle}
        size="small"
        sx={{ color: 'text.secondary', ...sx }}
      >
        {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
      </IconButton>
    </Tooltip>
  );
};

export default AppShellHeaderToggle;
