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
import { Chip } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { useNotificationItemContext } from './NotificationItemContext';

/**
 * Props for NotificationItemAction component.
 */
export interface NotificationItemActionProps {
  /** Action button label */
  children: React.ReactNode;
  /** Click handler (overrides context onAction) */
  onClick?: (e: React.MouseEvent) => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationItemAction - Action button for a notification item.
 *
 * Displays a small action chip/button. Clicking triggers the onAction
 * callback from context (unless overridden with onClick prop).
 *
 * @example
 * ```tsx
 * <AppShellNotificationPanel.Item id="1" type="info">
 *   ...
 *   <AppShellNotificationPanel.ItemAction>View</AppShellNotificationPanel.ItemAction>
 * </AppShellNotificationPanel.Item>
 * ```
 */
export const NotificationItemAction: React.FC<NotificationItemActionProps> = ({
  children,
  onClick,
  sx,
}) => {
  const { onAction } = useNotificationItemContext();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    } else {
      onAction?.();
    }
  };

  return (
    <Chip
      label={children}
      size="small"
      variant="outlined"
      sx={{
        height: 20,
        fontSize: 10,
        cursor: 'pointer',
        ...sx,
      }}
      onClick={handleClick}
    />
  );
};

// Add display name for child detection
NotificationItemAction.displayName = 'NotificationItemAction';

export default NotificationItemAction;
