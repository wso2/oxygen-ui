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
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  Chip,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { X } from '@wso2/oxygen-ui-icons-react';
import { getNotificationTypeProps, NotificationType } from './utils';

/**
 * Props for NotificationItem component.
 */
export interface NotificationItemProps {
  /** Unique identifier */
  id: string;
  /** Notification type for icon/color */
  type: NotificationType;
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Timestamp string */
  timestamp: string;
  /** Whether notification has been read */
  read?: boolean;
  /** Optional avatar content */
  avatar?: string;
  /** Optional action button label */
  actionLabel?: string;
  /** Optional action callback */
  onAction?: () => void;
  /** Callback when marked as read */
  onMarkRead?: (id: string) => void;
  /** Callback when dismissed */
  onDismiss?: (id: string) => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationItem - Individual notification in the panel.
 *
 * Displays a notification with icon, title, message, and timestamp.
 * Supports read/unread state, action buttons, and dismiss functionality.
 *
 * Theme tokens used:
 * - `action.hover` - Unread notification background
 * - `action.selected` - Hover state
 * - `primary.main` - Unread indicator dot
 * - `text.secondary` - Message text
 * - `text.disabled` - Timestamp text
 */
export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  type,
  title,
  message,
  timestamp,
  read = false,
  avatar,
  actionLabel,
  onAction,
  onMarkRead,
  onDismiss,
  sx,
}) => {
  const typeProps = getNotificationTypeProps(type);
  const Icon = typeProps.icon;

  const handleClick = () => {
    if (!read) {
      onMarkRead?.(id);
    }
    onAction?.();
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        onDismiss && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(id);
            }}
            sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
          >
            <X size={16} />
          </IconButton>
        )
      }
      sx={{
        bgcolor: read ? 'transparent' : 'action.hover',
        '&:hover': {
          bgcolor: 'action.selected',
        },
        ...sx,
      }}
    >
      <ListItemButton onClick={handleClick} sx={{ pr: 6 }}>
        <ListItemAvatar>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: typeProps.bgcolor,
              color: typeProps.color,
              fontSize: avatar ? 14 : undefined,
              fontWeight: avatar ? 600 : undefined,
            }}
          >
            {avatar || <Icon size={20} />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: read ? 400 : 600,
                  flex: 1,
                }}
              >
                {title}
              </Typography>
              {!read && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    flexShrink: 0,
                  }}
                />
              )}
            </Box>
          }
          secondary={
            <Box component="span">
              <Typography
                component="span"
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.secondary',
                  mb: 0.5,
                }}
              >
                {message}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mt: 0.5,
                }}
              >
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ color: 'text.disabled', fontSize: 11 }}
                >
                  {timestamp}
                </Typography>
                {actionLabel && (
                  <Chip
                    label={actionLabel}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction?.();
                    }}
                  />
                )}
              </Box>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NotificationItem;
