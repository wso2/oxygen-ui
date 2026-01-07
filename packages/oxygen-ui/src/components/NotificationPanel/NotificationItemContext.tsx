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
import type { NotificationType, NotificationTypeProps } from './utils';

/**
 * Context value for notification item state.
 */
export interface NotificationItemContextValue {
  /** Notification ID */
  id: string;
  /** Notification type */
  type: NotificationType;
  /** Type-based styling props */
  typeProps: NotificationTypeProps;
  /** Whether notification is read */
  read: boolean;
  /** Mark as read handler */
  onMarkRead?: () => void;
  /** Action handler */
  onAction?: () => void;
}

/**
 * Context for sharing state between NotificationItem and its children.
 */
export const NotificationItemContext = React.createContext<NotificationItemContextValue | null>(null);

/**
 * Hook to access the notification item context.
 * Must be used within a NotificationItem component.
 */
export const useNotificationItemContext = (): NotificationItemContextValue => {
  const context = React.useContext(NotificationItemContext);
  if (!context) {
    throw new Error(
      'useNotificationItemContext must be used within a NotificationItem component'
    );
  }
  return context;
};

/**
 * Provider component for notification item context.
 */
export const NotificationItemProvider: React.FC<{
  value: NotificationItemContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <NotificationItemContext.Provider value={value}>
      {children}
    </NotificationItemContext.Provider>
  );
};
