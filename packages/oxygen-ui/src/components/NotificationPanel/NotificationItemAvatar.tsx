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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useNotificationItemContext } from './NotificationItemContext';

/**
 * Props for styled avatar.
 */
interface NotificationItemAvatarStyledProps {
  ownerState: {
    bgcolor: string;
    color: string;
    hasChildren: boolean;
  };
}

/**
 * Styled avatar for notification item.
 */
const NotificationItemAvatarStyled = styled(Avatar, {
  name: 'MuiNotificationPanel',
  slot: 'ItemAvatar',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<NotificationItemAvatarStyledProps>(({ ownerState }) => ({
  width: 40,
  height: 40,
  backgroundColor: ownerState.bgcolor,
  color: ownerState.color,
  fontSize: ownerState.hasChildren ? 14 : undefined,
  fontWeight: ownerState.hasChildren ? 600 : undefined,
}));

/**
 * Props for NotificationItemAvatar component.
 */
export interface NotificationItemAvatarProps {
  /** Avatar content (initials/text) or icon */
  children?: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationItemAvatar - Avatar for a notification item.
 *
 * Displays an avatar with type-based colors. If no children are provided,
 * displays the default icon for the notification type.
 *
 * @example
 * ```tsx
 * <NotificationPanel.Item id="1" type="info">
 *   <NotificationPanel.ItemAvatar>A</NotificationPanel.ItemAvatar>
 *   ...
 * </NotificationPanel.Item>
 * ```
 */
export const NotificationItemAvatar: React.FC<NotificationItemAvatarProps> = ({
  children,
  sx,
}) => {
  const { typeProps } = useNotificationItemContext();
  const Icon = typeProps.icon;

  const ownerState = {
    bgcolor: typeProps.bgcolor,
    color: typeProps.color,
    hasChildren: !!children,
  };

  return (
    <ListItemAvatar>
      <NotificationItemAvatarStyled ownerState={ownerState} sx={sx}>
        {children || <Icon size={20} />}
      </NotificationItemAvatarStyled>
    </ListItemAvatar>
  );
};

// Add display name for child detection
NotificationItemAvatar.displayName = 'NotificationItemAvatar';

export default NotificationItemAvatar;
