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
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  Divider,
  Badge,
  Chip,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';

/**
 * Theme tokens used in this component:
 *
 * Semantic Colors (notification types):
 * - `success.main` / `success.light` - Success notifications
 * - `warning.main` / `warning.light` - Warning notifications
 * - `error.main` / `error.light` - Error notifications
 * - `info.main` / `info.light` - Info notifications
 *
 * Pattern: bgcolor uses `${type}.light`, color uses `${type}.main`
 * Example: { bgcolor: 'success.light', color: 'success.main' }
 *
 * Action Colors:
 * - `action.hover` - Unread notification background
 * - `action.selected` - Notification hover state
 *
 * UI Colors:
 * - `primary.main` - Unread indicator dot, tab badges, Chip color="primary"
 * - `text.secondary` - Secondary text, timestamps
 * - `text.disabled` - Tertiary text (smaller timestamps)
 * - `divider` - Section borders
 *
 * Components with color prop:
 * - Chip: color="primary" | "warning" | "outlined"
 * - Button: color="error" for destructive actions
 */

import {
  X,
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Trash2,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
} from '@wso2/oxygen-ui-icons-react';
import type { NotificationItem } from './types';
import { formatRelativeTime } from './mock-data';

/**
 * Tab panel component for notification tabs.
 */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`notification-tabpanel-${index}`}
    aria-labelledby={`notification-tab-${index}`}
    sx={{ flex: 1, overflow: 'auto' }}
  >
    {value === index && children}
  </Box>
);

/**
 * Get icon and color for notification type.
 */
const getNotificationTypeProps = (type: NotificationItem['type']) => {
  switch (type) {
    case 'success':
      return {
        icon: CheckCircle,
        color: 'success.main',
        bgcolor: 'success.light',
      };
    case 'warning':
      return {
        icon: AlertTriangle,
        color: 'warning.main',
        bgcolor: 'warning.light',
      };
    case 'error':
      return {
        icon: AlertCircle,
        color: 'error.main',
        bgcolor: 'error.light',
      };
    default:
      return {
        icon: Info,
        color: 'info.main',
        bgcolor: 'info.light',
      };
  }
};

/**
 * Props for individual notification item.
 */
interface NotificationItemRowProps {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onAction?: () => void;
}

/**
 * Individual notification item row.
 */
const NotificationItemRow: React.FC<NotificationItemRowProps> = ({
  notification,
  onMarkRead,
  onDismiss,
  onAction,
}) => {
  const typeProps = getNotificationTypeProps(notification.type);
  const Icon = typeProps.icon;

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(notification.id);
          }}
          sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
        >
          <X size={16} />
        </IconButton>
      }
      sx={{
        bgcolor: notification.read ? 'transparent' : 'action.hover',
        '&:hover': {
          bgcolor: 'action.selected',
        },
      }}
    >
      <ListItemButton
        onClick={() => {
          if (!notification.read) {
            onMarkRead(notification.id);
          }
          onAction?.();
        }}
        sx={{ pr: 6 }}
      >
        <ListItemAvatar>
          {notification.avatar ? (
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: typeProps.bgcolor,
                color: typeProps.color,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {notification.avatar}
            </Avatar>
          ) : (
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: typeProps.bgcolor,
                color: typeProps.color,
              }}
            >
              <Icon size={20} />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: notification.read ? 400 : 600,
                  flex: 1,
                }}
              >
                {notification.title}
              </Typography>
              {!notification.read && (
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
                {notification.message}
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
                  {formatRelativeTime(notification.timestamp)}
                </Typography>
                {notification.actionLabel && (
                  <Chip
                    label={notification.actionLabel}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      notification.onAction?.();
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

/**
 * Empty state component for notification panel.
 */
const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 3,
      textAlign: 'center',
    }}
  >
    <BellOff size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {message}
    </Typography>
  </Box>
);

/**
 * Props for the AppShellNotificationPanel component.
 */
export interface AppShellNotificationPanelProps {
  /** Whether the panel is open */
  open: boolean;
  /** Callback to close the panel */
  onClose: () => void;
  /** List of notifications */
  notifications: NotificationItem[];
  /** Callback when a notification is marked as read */
  onMarkRead: (id: string) => void;
  /** Callback when a notification is dismissed */
  onDismiss: (id: string) => void;
  /** Callback to mark all notifications as read */
  onMarkAllRead: () => void;
  /** Callback to clear all notifications */
  onClearAll: () => void;
  /** Panel width */
  width?: number;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellNotificationPanel - Slide-out notification drawer.
 *
 * A comprehensive notification panel that provides a centralized view of
 * all notifications. Includes filtering by status and bulk actions.
 *
 * Features:
 * - Right-anchored drawer that slides in
 * - Tabs for All, Unread, and Alerts
 * - Notification items with avatar, title, message, timestamp
 * - Type-based icons and colors (info, success, warning, error)
 * - Mark as read/unread functionality
 * - Individual dismiss and bulk clear actions
 * - Empty state handling
 * - Unread count badge on tabs
 *
 * Usage:
 * ```tsx
 * <AppShellNotificationPanel
 *   open={notificationPanelOpen}
 *   onClose={() => setNotificationPanelOpen(false)}
 *   notifications={notifications}
 *   onMarkRead={handleMarkRead}
 *   onDismiss={handleDismiss}
 *   onMarkAllRead={handleMarkAllRead}
 *   onClearAll={handleClearAll}
 * />
 * ```
 */
export const AppShellNotificationPanel: React.FC<AppShellNotificationPanelProps> = ({
  open,
  onClose,
  notifications,
  onMarkRead,
  onDismiss,
  onMarkAllRead,
  onClearAll,
  width = 380,
  sx,
}) => {
  const [tabValue, setTabValue] = React.useState(0);

  const unreadNotifications = notifications.filter((n) => !n.read);
  const alertNotifications = notifications.filter(
    (n) => n.type === 'warning' || n.type === 'error'
  );

  const getFilteredNotifications = () => {
    switch (tabValue) {
      case 1:
        return unreadNotifications;
      case 2:
        return alertNotifications;
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: width },
          maxWidth: '100%',
        },
        ...sx,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Bell size={20} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
          {unreadNotifications.length > 0 && (
            <Chip
              label={unreadNotifications.length}
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: 11 }}
            />
          )}
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
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
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                All
                <Chip
                  label={notifications.length}
                  size="small"
                  variant="outlined"
                  sx={{ height: 18, fontSize: 10 }}
                />
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Unread
                {unreadNotifications.length > 0 && (
                  <Chip
                    label={unreadNotifications.length}
                    size="small"
                    color="primary"
                    sx={{ height: 18, fontSize: 10 }}
                  />
                )}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Alerts
                {alertNotifications.length > 0 && (
                  <Chip
                    label={alertNotifications.length}
                    size="small"
                    color="warning"
                    sx={{ height: 18, fontSize: 10 }}
                  />
                )}
              </Box>
            }
          />
        </Tabs>
      </Box>

      {/* Actions bar */}
      {notifications.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
            p: 1,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'action.hover',
          }}
        >
          {unreadNotifications.length > 0 && (
            <Button
              size="small"
              startIcon={<CheckCheck size={14} />}
              onClick={onMarkAllRead}
              sx={{ textTransform: 'none', fontSize: 12 }}
            >
              Mark all read
            </Button>
          )}
          <Button
            size="small"
            startIcon={<Trash2 size={14} />}
            onClick={onClearAll}
            color="error"
            sx={{ textTransform: 'none', fontSize: 12 }}
          >
            Clear all
          </Button>
        </Box>
      )}

      {/* Notification list */}
      <TabPanel value={tabValue} index={0}>
        {notifications.length === 0 ? (
          <EmptyState message="No notifications" />
        ) : (
          <List disablePadding>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <NotificationItemRow
                  notification={notification}
                  onMarkRead={onMarkRead}
                  onDismiss={onDismiss}
                />
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {unreadNotifications.length === 0 ? (
          <EmptyState message="No unread notifications" />
        ) : (
          <List disablePadding>
            {unreadNotifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <NotificationItemRow
                  notification={notification}
                  onMarkRead={onMarkRead}
                  onDismiss={onDismiss}
                />
                {index < unreadNotifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {alertNotifications.length === 0 ? (
          <EmptyState message="No alerts" />
        ) : (
          <List disablePadding>
            {alertNotifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <NotificationItemRow
                  notification={notification}
                  onMarkRead={onMarkRead}
                  onDismiss={onDismiss}
                />
                {index < alertNotifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </TabPanel>
    </Drawer>
  );
};

export default AppShellNotificationPanel;
