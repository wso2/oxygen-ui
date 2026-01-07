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
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useNotificationItemContext } from './NotificationItemContext';

/**
 * Styled action chip.
 */
const NotificationItemActionRoot = styled(Chip, {
  name: 'MuiNotificationPanel',
  slot: 'ItemAction',
})({
  height: 20,
  fontSize: 10,
  cursor: 'pointer',
});

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
 * <NotificationPanel.Item id="1" type="info">
 *   ...
 *   <NotificationPanel.ItemAction>View</NotificationPanel.ItemAction>
 * </NotificationPanel.Item>
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
    <NotificationItemActionRoot
      label={children}
      size="small"
      variant="outlined"
      onClick={handleClick}
      sx={sx}
    />
  );
};

// Add display name for child detection
NotificationItemAction.displayName = 'NotificationItemAction';

export default NotificationItemAction;
