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

export { NotificationPanel, default } from './NotificationPanel';
export type { NotificationPanelProps } from './NotificationPanel';

export { NotificationHeader } from './NotificationHeader';
export type { NotificationHeaderProps } from './NotificationHeader';

// Header sub-components for composable API
export { NotificationHeaderIcon } from './NotificationHeaderIcon';
export type { NotificationHeaderIconProps } from './NotificationHeaderIcon';

export { NotificationHeaderTitle } from './NotificationHeaderTitle';
export type { NotificationHeaderTitleProps } from './NotificationHeaderTitle';

export { NotificationHeaderBadge } from './NotificationHeaderBadge';
export type { NotificationHeaderBadgeProps } from './NotificationHeaderBadge';

export { NotificationHeaderClose } from './NotificationHeaderClose';
export type { NotificationHeaderCloseProps } from './NotificationHeaderClose';

export { NotificationTabs } from './NotificationTabs';
export type { NotificationTabsProps, NotificationTabConfig } from './NotificationTabs';

export { NotificationActions } from './NotificationActions';
export type { NotificationActionsProps } from './NotificationActions';

export { NotificationList } from './NotificationList';
export type { NotificationListProps } from './NotificationList';

export { NotificationItem } from './NotificationItem';
export type { NotificationItemProps } from './NotificationItem';

// Item sub-components for composable API
export { NotificationItemAvatar } from './NotificationItemAvatar';
export type { NotificationItemAvatarProps } from './NotificationItemAvatar';

export { NotificationItemTitle } from './NotificationItemTitle';
export type { NotificationItemTitleProps } from './NotificationItemTitle';

export { NotificationItemMessage } from './NotificationItemMessage';
export type { NotificationItemMessageProps } from './NotificationItemMessage';

export { NotificationItemTimestamp } from './NotificationItemTimestamp';
export type { NotificationItemTimestampProps } from './NotificationItemTimestamp';

export { NotificationItemAction } from './NotificationItemAction';
export type { NotificationItemActionProps } from './NotificationItemAction';

export {
  NotificationItemContext,
  NotificationItemProvider,
  useNotificationItemContext,
} from './NotificationItemContext';
export type { NotificationItemContextValue } from './NotificationItemContext';

export { NotificationEmptyState } from './NotificationEmptyState';
export type { NotificationEmptyStateProps } from './NotificationEmptyState';

export { NotificationPanelContext, useNotificationPanel } from './context';
export type { NotificationPanelContextValue } from './context';

export { getNotificationTypeProps } from './utils';
export type { NotificationType, NotificationTypeProps } from './utils';
