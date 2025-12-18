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

export {
  AppShellSidebar,
  default,
  SIDEBAR_WIDTH,
  COLLAPSED_SIDEBAR_WIDTH,
} from './AppShellSidebar';
export type { AppShellSidebarProps } from './AppShellSidebar';

export { AppShellSidebarNav } from './AppShellSidebarNav';
export type { AppShellSidebarNavProps } from './AppShellSidebarNav';

export { AppShellSidebarCategory } from './AppShellSidebarCategory';
export type { AppShellSidebarCategoryProps } from './AppShellSidebarCategory';

// Category sub-components for composable API
export { AppShellSidebarCategoryLabel } from './AppShellSidebarCategoryLabel';
export type { AppShellSidebarCategoryLabelProps } from './AppShellSidebarCategoryLabel';

export { AppShellSidebarItem } from './AppShellSidebarItem';
export type { AppShellSidebarItemProps } from './AppShellSidebarItem';

// Item sub-components for composable API
export { AppShellSidebarItemIcon } from './AppShellSidebarItemIcon';
export type { AppShellSidebarItemIconProps } from './AppShellSidebarItemIcon';

export { AppShellSidebarItemLabel } from './AppShellSidebarItemLabel';
export type { AppShellSidebarItemLabelProps } from './AppShellSidebarItemLabel';

export { AppShellSidebarItemBadge } from './AppShellSidebarItemBadge';
export type { AppShellSidebarItemBadgeProps } from './AppShellSidebarItemBadge';

export {
  AppShellSidebarItemContext,
  AppShellSidebarItemProvider,
  useAppShellSidebarItemContext,
} from './AppShellSidebarItemContext';
export type { AppShellSidebarItemContextValue } from './AppShellSidebarItemContext';

export { AppShellSidebarFooter } from './AppShellSidebarFooter';
export type { AppShellSidebarFooterProps } from './AppShellSidebarFooter';

export { AppShellSidebarUser } from './AppShellSidebarUser';
export type { AppShellSidebarUserProps } from './AppShellSidebarUser';

// User sub-components for composable API
export { AppShellSidebarUserAvatar } from './AppShellSidebarUserAvatar';
export type { AppShellSidebarUserAvatarProps } from './AppShellSidebarUserAvatar';

export { AppShellSidebarUserName } from './AppShellSidebarUserName';
export type { AppShellSidebarUserNameProps } from './AppShellSidebarUserName';

export { AppShellSidebarUserEmail } from './AppShellSidebarUserEmail';
export type { AppShellSidebarUserEmailProps } from './AppShellSidebarUserEmail';

export { AppShellSidebarContext, useAppShellSidebar } from './context';
export type { AppShellSidebarContextValue } from './context';
