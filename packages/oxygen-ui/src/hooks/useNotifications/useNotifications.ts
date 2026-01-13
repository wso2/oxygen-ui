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

/**
 * Notification item data model.
 */
export interface NotificationItem {
  /** Unique identifier */
  id: string;
  /** Notification type for styling */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Timestamp of the notification */
  timestamp: Date;
  /** Whether the notification has been read */
  read: boolean;
  /** Optional avatar content */
  avatar?: React.ReactNode;
  /** Optional action button label */
  actionLabel?: string;
}

/**
 * Notification actions interface.
 */
export interface NotificationActions {
  /** Mark a single notification as read */
  markRead: (id: string) => void;
  /** Dismiss/remove a single notification */
  dismiss: (id: string) => void;
  /** Mark all notifications as read */
  markAllRead: () => void;
  /** Clear all notifications */
  clearAll: () => void;
  /** Add a new notification */
  add: (notification: Omit<NotificationItem, 'id'>) => void;
}

/**
 * Options for useNotifications hook.
 */
export interface UseNotificationsOptions {
  /** Initial notifications list */
  initialNotifications?: NotificationItem[];
}

/**
 * Return type for useNotifications hook.
 */
export interface UseNotificationsReturn {
  /** Current notifications list */
  notifications: NotificationItem[];
  /** Notification actions */
  actions: NotificationActions;
  /** Count of unread notifications */
  unreadCount: number;
  /** Filtered list of unread notifications */
  unreadNotifications: NotificationItem[];
}

/**
 * Generates a unique ID for notifications.
 */
const generateId = (): string => {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

/**
 * Custom hook for notification state management.
 *
 * Provides a clean pattern for managing notifications including:
 * - List of notifications
 * - CRUD operations (add, mark read, dismiss, clear)
 * - Computed values (unreadCount, unreadNotifications)
 *
 * @example
 * ```tsx
 * const { notifications, actions, unreadCount, unreadNotifications } = useNotifications({
 *   initialNotifications: myNotifications,
 * });
 *
 * // Add a notification
 * actions.add({
 *   title: 'New message',
 *   message: 'You have a new message',
 *   timestamp: new Date(),
 *   read: false,
 * });
 *
 * // Mark as read
 * actions.markRead(notificationId);
 *
 * // Display unread count
 * <Badge badgeContent={unreadCount} />
 * ```
 */
export const useNotifications = (
  options: UseNotificationsOptions = {}
): UseNotificationsReturn => {
  const { initialNotifications = [] } = options;

  const [notifications, setNotifications] = React.useState<NotificationItem[]>(
    initialNotifications
  );

  const markRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAllRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = React.useCallback(() => {
    setNotifications([]);
  }, []);

  const add = React.useCallback((notification: Omit<NotificationItem, 'id'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: generateId(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  }, []);

  const unreadCount = React.useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const unreadNotifications = React.useMemo(
    () => notifications.filter((n) => !n.read),
    [notifications]
  );

  const actions: NotificationActions = React.useMemo(
    () => ({
      markRead,
      dismiss,
      markAllRead,
      clearAll,
      add,
    }),
    [markRead, dismiss, markAllRead, clearAll, add]
  );

  return {
    notifications,
    actions,
    unreadCount,
    unreadNotifications,
  };
};

export default useNotifications;
