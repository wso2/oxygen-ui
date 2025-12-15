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
import { Box, List, Divider } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';

/**
 * Props for NotificationList component.
 */
export interface NotificationListProps {
  /** Notification items */
  children: React.ReactNode;
  /** Whether to show dividers between items */
  showDividers?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationList - Scrollable container for notification items.
 *
 * Renders a list of NotificationItem components with optional dividers.
 */
export const NotificationList: React.FC<NotificationListProps> = ({
  children,
  showDividers = true,
  sx,
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <Box sx={{ flex: 1, overflow: 'auto', ...sx }}>
      <List disablePadding>
        {childArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {showDividers && index < childArray.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NotificationList;
