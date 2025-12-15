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

export { AppShellSidebarItem } from './AppShellSidebarItem';
export type { AppShellSidebarItemProps } from './AppShellSidebarItem';

export { AppShellSidebarFooter } from './AppShellSidebarFooter';
export type { AppShellSidebarFooterProps } from './AppShellSidebarFooter';

export { AppShellSidebarUser } from './AppShellSidebarUser';
export type { AppShellSidebarUserProps } from './AppShellSidebarUser';

export { AppShellSidebarContext, useAppShellSidebar } from './context';
export type { AppShellSidebarContextValue } from './context';
