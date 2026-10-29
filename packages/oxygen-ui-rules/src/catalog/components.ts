/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import type {CatalogComponent} from '../types.js';

/**
 * Every public value export of `@wso2/oxygen-ui` that the package declares itself. MUI
 * re-exports are not listed. `pnpm rules:coverage` fails when this list and the package's
 * exports differ, and `pnpm rules:new --component <Name>` adds an entry.
 */
const components: CatalogComponent[] = [
  {
    name: 'AppBreadcrumbs',
    kind: 'component',
    exports: ['AppBreadcrumbs'],
    summary: 'Breadcrumb trail for the current location in an application.',
    story: 'App Elements/App Breadcrumbs',
  },
  {
    name: 'AppShell',
    kind: 'layout',
    exports: ['AppShell', 'useAppShell'],
    summary: 'Application frame that arranges the navbar, sidebar, main content, footer and notification panel.',
    story: 'App Elements/App Shell',
  },
  {
    name: 'AppSwitcher',
    kind: 'component',
    exports: ['AppSwitcher'],
    summary: 'Menu for switching between WSO2 applications, grouped into sections.',
    story: 'App Elements/App Switcher',
  },
  {
    name: 'CodeBlock',
    kind: 'component',
    exports: ['CodeBlock'],
    summary: 'Syntax-highlighted code with a copy action.',
    story: 'App Elements/Code Block',
  },
  {
    name: 'ColorSchemeImage',
    kind: 'component',
    exports: ['ColorSchemeImage'],
    summary: 'Image that switches its source between the light and dark colour schemes.',
    story: 'Theming/ColorSchemeImage',
  },
  {
    name: 'ColorSchemeSVG',
    kind: 'component',
    exports: ['ColorSchemeSVG'],
    summary: 'Inline SVG that switches between the light and dark colour schemes.',
    story: 'Theming/ColorSchemeSVG',
  },
  {
    name: 'ColorSchemeToggle',
    kind: 'component',
    exports: ['ColorSchemeToggle', 'ColorSchemeToggleDefault'],
    summary: 'Control for switching between the light and dark colour schemes.',
    story: 'Theming/ColorSchemeToggle',
  },
  {
    name: 'ComplexSelect',
    kind: 'component',
    exports: ['ComplexSelect'],
    summary: 'Select with rich menu items, list headers and dividers.',
    story: 'Inputs/ComplexSelect',
  },
  {
    name: 'Footer',
    kind: 'component',
    exports: ['Footer'],
    summary: 'Application footer with copyright, version and links.',
    story: 'App Elements/Footer',
  },
  {
    name: 'Form',
    kind: 'component',
    exports: ['Form'],
    summary: 'Form building blocks: sections, stacks, card buttons and the wizard.',
    story: 'App Elements/Form Elements',
  },
  {
    name: 'Header',
    kind: 'component',
    exports: ['Header'],
    summary: 'Application header with brand, switchers and actions.',
    story: 'App Elements/Header',
  },
  {
    name: 'Layout',
    kind: 'layout',
    exports: ['Layout'],
    summary: 'Low-level page layout with sidebar, navbar, header and content areas.',
    story: 'Layout/Layout',
  },
  {
    name: 'ListingTable',
    kind: 'component',
    exports: ['ListingTable', 'ListingTableContext', 'ListingTableProvider', 'useListingTable', 'useListingTableRequired'],
    summary: 'Listing of resources as a table, cards or data grid, with toolbar, filters, row actions and empty state.',
    story: 'App Elements/ListingTable',
  },
  {
    name: 'NotificationBanner',
    kind: 'component',
    exports: ['NotificationBanner'],
    summary: 'Banner for page-level or application-level announcements.',
    story: 'App Elements/Notification Banner',
  },
  {
    name: 'NotificationPanel',
    kind: 'component',
    exports: ['NotificationPanel', 'useNotifications'],
    summary: 'Panel listing notifications, with tabs, actions and an empty state.',
    story: 'App Elements/Notification Panel',
  },
  {
    name: 'OxygenUIThemeProvider',
    kind: 'provider',
    exports: ['OxygenUIThemeProvider', 'useThemeSwitcher'],
    summary: 'Root provider that applies the Oxygen theme and enables runtime theme switching.',
    story: 'Theming/OxygenUIThemeProvider',
  },
  {
    name: 'PageContent',
    kind: 'layout',
    exports: ['PageContent'],
    summary: 'Content area of a page, with standard width and padding.',
    story: 'App Elements/Page Content',
  },
  {
    name: 'PageTitle',
    kind: 'component',
    exports: ['PageTitle'],
    summary: 'Page heading with back button, avatar, subheading and actions.',
    story: 'App Elements/Page Title',
  },
  {
    name: 'ParticleBackground',
    kind: 'animation',
    exports: ['ParticleBackground'],
    summary: 'Animated particle background for landing and sign-in pages.',
    story: 'Animations/ParticleBackground',
  },
  {
    name: 'RelativeTime',
    kind: 'component',
    exports: ['RelativeTime', 'formatRelativeTime'],
    summary: 'Time shown relative to now, such as "5 minutes ago".',
    story: 'App Elements/Relative Time',
  },
  {
    name: 'SearchBar',
    kind: 'component',
    exports: ['SearchBar', 'SearchBarWithAdvancedFilter'],
    summary: 'Search input, optionally with an advanced filter builder.',
    story: 'Inputs/SearchBar',
  },
  {
    name: 'Sidebar',
    kind: 'component',
    exports: ['Sidebar', 'useSidebar'],
    summary: 'Collapsible application navigation with categories, items, badges and user details.',
    story: 'App Elements/Sidebar',
  },
  {
    name: 'StatCard',
    kind: 'component',
    exports: ['StatCard'],
    summary: 'Card showing a labelled metric with an icon.',
    story: 'App Elements/Stat Card',
  },
  {
    name: 'ThemeSwitcher',
    kind: 'component',
    exports: ['ThemeSwitcher', 'ThemeSelect'],
    summary: 'Controls for choosing between the themes registered with the theme provider.',
    story: 'Theming/ThemeSwitcher',
  },
  {
    name: 'Themes',
    kind: 'theme',
    exports: [
      'AcrylicOrangeTheme',
      'AcrylicPurpleTheme',
      'ClassicTheme',
      'HighContrastTheme',
      'OxygenTheme',
      'PaleBaseTheme',
      'PaleGrayTheme',
      'PaleIndigoTheme',
      'WSO2Theme',
      'createOxygenTheme',
    ],
    summary: 'The Oxygen themes, and the helper for creating a theme from the Oxygen base.',
    story: 'Theming/createOxygenTheme',
  },
  {
    name: 'TimeRangeFilter',
    kind: 'component',
    exports: ['TimeRangeFilter'],
    summary: 'Picker for preset and custom time ranges.',
    story: 'App Elements/Time Range Filter',
  },
  {
    name: 'UserMenu',
    kind: 'component',
    exports: ['UserMenu'],
    summary: 'Menu for the signed-in user, with profile details and sign-out.',
    story: 'App Elements/User Menu',
  },
  {
    name: 'useThemeContent',
    kind: 'hook',
    exports: ['useThemeContent', 'useThemeContentDefault'],
    summary: 'Returns content that depends on the active theme or colour scheme.',
    story: 'Theming/useThemeContent',
  },
  {
    name: 'pxToRem',
    kind: 'utility',
    exports: ['pxToRem'],
    summary: 'Converts pixel values to rem, based on the Oxygen base font size.',
  },
  // rules:new:insert
];

export default components;
