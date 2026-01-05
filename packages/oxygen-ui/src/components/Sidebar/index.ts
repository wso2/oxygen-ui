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
  Sidebar,
  default,
  SIDEBAR_WIDTH,
  COLLAPSED_SIDEBAR_WIDTH,
} from './Sidebar';
export type { SidebarProps } from './Sidebar';

export { SidebarNav } from './SidebarNav';
export type { SidebarNavProps } from './SidebarNav';

export { SidebarCategory } from './SidebarCategory';
export type { SidebarCategoryProps } from './SidebarCategory';

// Category sub-components for composable API
export { SidebarCategoryLabel } from './SidebarCategoryLabel';
export type { SidebarCategoryLabelProps } from './SidebarCategoryLabel';

export { SidebarItem } from './SidebarItem';
export type { SidebarItemProps } from './SidebarItem';

// Item sub-components for composable API
export { SidebarItemIcon } from './SidebarItemIcon';
export type { SidebarItemIconProps } from './SidebarItemIcon';

export { SidebarItemLabel } from './SidebarItemLabel';
export type { SidebarItemLabelProps } from './SidebarItemLabel';

export { SidebarItemBadge } from './SidebarItemBadge';
export type { SidebarItemBadgeProps } from './SidebarItemBadge';

export {
  SidebarItemContext,
  SidebarItemProvider,
  useSidebarItemContext,
} from './SidebarItemContext';
export type { SidebarItemContextValue } from './SidebarItemContext';

export { SidebarFooter } from './SidebarFooter';
export type { SidebarFooterProps } from './SidebarFooter';

export { SidebarUser } from './SidebarUser';
export type { SidebarUserProps } from './SidebarUser';

// User sub-components for composable API
export { SidebarUserAvatar } from './SidebarUserAvatar';
export type { SidebarUserAvatarProps } from './SidebarUserAvatar';

export { SidebarUserName } from './SidebarUserName';
export type { SidebarUserNameProps } from './SidebarUserName';

export { SidebarUserEmail } from './SidebarUserEmail';
export type { SidebarUserEmailProps } from './SidebarUserEmail';

export { SidebarContext, useSidebar } from './context';
export type { SidebarContextValue } from './context';
