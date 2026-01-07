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

export { default as CodeBlock } from './CodeBlock';
export type { CodeBlockProps } from './CodeBlock';
export { default as ColorSchemeImage } from './ColorSchemeImage';
export type { ColorSchemeImageProps, ColorSchemeImageAttribute } from './ColorSchemeImage';
export { ColorSchemeToggle, default as ColorSchemeToggleDefault } from './ColorSchemeToggle';
export { default as ComplexSelect } from './ComplexSelect';
export type { ComplexSelectProps } from './ComplexSelect';
export { default as PageTitle } from './PageTitle';
export type { PageTitleProps, PageTitleAvatarProps, PageTitleHeaderProps, PageTitleSubHeaderProps, PageTitleLinkProps } from './PageTitle';
export { default as ThemeSwitcher, ThemeSelect } from './ThemeSwitcher';
export type { ThemeSwitcherProps, ThemeSelectProps } from './ThemeSwitcher';
export { default as SearchBarWithAdvancedFilter } from './SearchBar/SearchBarWithAdvancedFilter';
export type { SearchBarWithAdvancedFilterProps } from './SearchBar/SearchBarWithAdvancedFilter';
export { default as SearchBar } from './SearchBar/SearchBar';
export type { SearchBarProps } from './SearchBar/SearchBar';

// App Shell Components
export { Header } from './Header';
export type {
  HeaderProps,
  HeaderSpacerProps,
  HeaderToggleProps,
  HeaderBrandProps,
  HeaderBrandLogoProps,
  HeaderBrandTitleProps,
  HeaderSwitchersProps,
  HeaderActionsProps,
  HeaderContextValue,
} from './Header';

export { Sidebar } from './Sidebar';
export type {
  SidebarProps,
  SidebarNavProps,
  SidebarCategoryProps,
  SidebarCategoryLabelProps,
  SidebarItemProps,
  SidebarItemIconProps,
  SidebarItemLabelProps,
  SidebarItemBadgeProps,
  SidebarFooterProps,
  SidebarUserProps,
  SidebarUserAvatarProps,
  SidebarUserNameProps,
  SidebarUserEmailProps,
  SidebarContextValue,
  SidebarItemContextValue,
} from './Sidebar';

export { NotificationPanel } from './NotificationPanel';
export type {
  NotificationPanelProps,
  NotificationHeaderProps,
  NotificationHeaderIconProps,
  NotificationHeaderTitleProps,
  NotificationHeaderBadgeProps,
  NotificationHeaderCloseProps,
  NotificationTabsProps,
  NotificationTabConfig,
  NotificationActionsProps,
  NotificationListProps,
  NotificationItemProps,
  NotificationItemAvatarProps,
  NotificationItemTitleProps,
  NotificationItemMessageProps,
  NotificationItemTimestampProps,
  NotificationItemActionProps,
  NotificationItemContextValue,
  NotificationEmptyStateProps,
  NotificationPanelContextValue,
  NotificationType,
  NotificationTypeProps,
} from './NotificationPanel';

export { Footer } from './Footer';
export type { FooterProps } from './Footer';

export { UserMenu } from './UserMenu';
export type { UserMenuProps, UserMenuUser } from './UserMenu';

export { NotificationBanner } from './NotificationBanner';
export type { NotificationBannerProps } from './NotificationBanner';
