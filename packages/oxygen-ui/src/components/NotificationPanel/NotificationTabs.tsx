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
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

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
/**
 * Styled container for tabs.
 */
const NotificationTabsRoot = styled(Box, {
  name: 'MuiNotificationPanel',
  slot: 'Tabs',
})(({ theme }) => ({
  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

/**
 * Styled tabs component.
 */
const NotificationTabsInner = styled(Tabs, {
  name: 'MuiNotificationPanel',
  slot: 'TabsInner',
})({
  minHeight: 44,
  '& .MuiTab-root': {
    minHeight: 44,
    textTransform: 'none',
    fontWeight: 500,
  },
});

/**
 * Styled tab label container.
 */
const NotificationTabLabel = styled(Box, {
  name: 'MuiNotificationPanel',
  slot: 'TabLabel',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

/**
 * Styled tab count chip.
 */
const NotificationTabCount = styled(Chip, {
  name: 'MuiNotificationPanel',
  slot: 'TabCount',
})({
  height: 18,
  fontSize: 10,
});

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
    <NotificationTabsRoot sx={sx}>
      <NotificationTabsInner
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="fullWidth"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <NotificationTabLabel>
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <NotificationTabCount
                    label={tab.count}
                    size="small"
                    color={tab.color || 'default'}
                    variant={tab.color ? 'filled' : 'outlined'}
                  />
                )}
              </NotificationTabLabel>
            }
          />
        ))}
      </NotificationTabsInner>
    </NotificationTabsRoot>
  );
};

export default NotificationTabs;
