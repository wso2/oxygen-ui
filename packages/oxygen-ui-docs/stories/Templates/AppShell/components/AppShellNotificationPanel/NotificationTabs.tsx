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
import { Box, Tabs, Tab, Chip } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';

/**
 * Tab configuration for NotificationTabs.
 */
export interface NotificationTabConfig {
  /** Tab label */
  label: string;
  /** Count badge value */
  count?: number;
  /** Badge color */
  color?: 'default' | 'primary' | 'warning' | 'error';
}

/**
 * Props for NotificationTabs component.
 */
export interface NotificationTabsProps {
  /** Tab configurations */
  tabs: NotificationTabConfig[];
  /** Currently selected tab index */
  value: number;
  /** Callback when tab changes */
  onChange: (index: number) => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationTabs - Tab navigation for filtering notifications.
 *
 * Provides a tab interface for switching between notification views
 * (e.g., All, Unread, Alerts).
 *
 * Theme tokens used:
 * - `divider` - Bottom border
 */
export const NotificationTabs: React.FC<NotificationTabsProps> = ({
  tabs,
  value,
  onChange,
  sx,
}) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', ...sx }}>
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="fullWidth"
        sx={{
          minHeight: 44,
          '& .MuiTab-root': {
            minHeight: 44,
            textTransform: 'none',
            fontWeight: 500,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <Chip
                    label={tab.count}
                    size="small"
                    color={tab.color || 'default'}
                    variant={tab.color ? 'filled' : 'outlined'}
                    sx={{ height: 18, fontSize: 10 }}
                  />
                )}
              </Box>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default NotificationTabs;
