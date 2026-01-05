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

import type { LucideIcon } from '@wso2/oxygen-ui-icons-react';
import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
} from '@wso2/oxygen-ui-icons-react';

/**
 * Notification type variants.
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * Props returned for notification type styling.
 */
export interface NotificationTypeProps {
  /** Icon component for this type */
  icon: LucideIcon;
  /** Text/icon color */
  color: string;
  /** Background color */
  bgcolor: string;
}

/**
 * Get icon and color props for a notification type.
 *
 * Theme tokens used:
 * - `success.main` / `success.light` - Success notifications
 * - `warning.main` / `warning.light` - Warning notifications
 * - `error.main` / `error.light` - Error notifications
 * - `info.main` / `info.light` - Info notifications
 *
 * @param type - The notification type
 * @returns Icon, color, and bgcolor props
 */
export const getNotificationTypeProps = (type: NotificationType): NotificationTypeProps => {
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
