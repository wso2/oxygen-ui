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

import type * as React from 'react';

/**
 * One entry a level can switch to, such as an organization, a project or a component.
 */
export interface HeaderBreadcrumbsItem {
  /** Stable identifier. Stored in the breadcrumb value. */
  id: string;
  /** Display name, shown in the trail and in the switch menu. */
  name: string;
  /** Secondary text under the name in the switch menu. */
  description?: string;
  /** Leading node in the switch menu, such as an Avatar or an icon. */
  avatar?: React.ReactNode;
  /** When set, the trail name and the menu entry render as links to this URL. */
  href?: string;
  /** A disabled entry is listed but cannot be picked. */
  disabled?: boolean;
}

/**
 * What an action handler receives.
 */
export interface HeaderBreadcrumbsActionContext {
  /** The level whose menu holds the action. */
  levelId: string;
  /** Selected id of every level, such as the organization a new project goes into. */
  value: HeaderBreadcrumbsValue;
}

/**
 * An action at the bottom of a level's menu, such as "New project" or "Manage projects".
 */
export interface HeaderBreadcrumbsAction {
  /** Stable key. */
  key: string;
  /** Visible label. */
  label: React.ReactNode;
  /** Leading icon. */
  icon?: React.ReactNode;
  /** Renders the action as a link to this URL, through `linkComponent`. */
  href?: string;
  /**
   * Called after the menu closes. With `href`, call `event.preventDefault()` to run
   * your own logic in place of following the link.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>, context: HeaderBreadcrumbsActionContext) => void;
}

/**
 * Changes to a built-in action for one level. `false` hides it.
 */
export type HeaderBreadcrumbsActionOverride = false | Partial<Omit<HeaderBreadcrumbsAction, 'key'>>;

/**
 * One level of the trail, ready to render. `useHeaderBreadcrumbs` builds these.
 */
export interface HeaderBreadcrumbsLevel {
  /** Level key, for example `organization`. */
  id: string;
  /** Level name, for example `Organization`. Used in menu titles and accessible names. */
  label: string;
  /**
   * Icon for the level, such as a building for organizations. Shown before the name
   * unless `showIcons` is `false`.
   */
  icon?: React.ReactNode;
  /** Entries the level can switch to. */
  items: HeaderBreadcrumbsItem[];
  /** Selected entry id. A level without a selection ends the trail. */
  selectedId?: string | null;
  /**
   * The selected entry, used for its name while `items` does not include it yet,
   * such as a name kept in storage by another app.
   */
  selectedItem?: HeaderBreadcrumbsItem | null;
  /** Items are being fetched. The menu shows a progress indicator. */
  loading?: boolean;
  /** Fetching failed. Shown in the menu in place of the list. */
  error?: React.ReactNode;
  /** Shown in the menu when there are no items. Defaults to "No {label} found". */
  emptyText?: React.ReactNode;
  /**
   * Tooltip and accessible name of the › button shown while this level has no
   * selection, such as on an organization page. Defaults to "Open {label}".
   */
  openLabel?: string;
  /** Title over the menu. Defaults to "Switch {label}", or `openLabel` with no selection. */
  menuTitle?: React.ReactNode;
  /** Placeholder for the search field. Defaults to "Find {label}…". */
  searchPlaceholder?: string;
  /**
   * Show a search field in the menu. Defaults to `'auto'`, which shows it when the
   * level has more than 6 items.
   */
  searchable?: boolean | 'auto';
  /** Plural level name for "Manage {pluralLabel}". Defaults to `label` plus "s". */
  pluralLabel?: string;
  /**
   * "New {label}" for this level. Shown when HeaderBreadcrumbs has `onCreate`, or
   * when this sets `onClick` or `href`. `false` hides it.
   */
  createAction?: HeaderBreadcrumbsActionOverride;
  /**
   * "Manage {pluralLabel}" for this level. Shown when HeaderBreadcrumbs has
   * `onManage`, or when this sets `onClick` or `href`. `false` hides it.
   */
  manageAction?: HeaderBreadcrumbsActionOverride;
  /** More actions, after "New" and "Manage". */
  actions?: HeaderBreadcrumbsAction[];
}

/** Selected item id for each level id. */
export type HeaderBreadcrumbsValue = Record<string, string>;
