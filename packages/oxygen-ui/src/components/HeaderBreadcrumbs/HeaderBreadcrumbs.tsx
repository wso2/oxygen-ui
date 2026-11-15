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

import * as React from 'react';
import { styled, useThemeProps } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { HeaderBreadcrumbsSegment, LABELED_ROW_HEIGHT } from './HeaderBreadcrumbsSegment';
import type {
  HeaderBreadcrumbsActionContext,
  HeaderBreadcrumbsItem,
  HeaderBreadcrumbsLevel,
  HeaderBreadcrumbsValue,
} from './types';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `text.primary` - Names
 * - `text.secondary` - Separators, carets, level labels and level icons
 * - `action.hover` - Name and caret pill on hover, and while its menu is open
 * - `action.selected` - The half under the pointer, and the caret while its menu is open
 * - `primary.main` - Keyboard focus outline
 *
 * Typography:
 * - `body1` - Names; the current name uses `fontWeightBold`
 * - `caption` - Level labels, with `showLabels`
 */

const HeaderBreadcrumbsRoot = styled('nav', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Root',
})({
  display: 'flex',
  minWidth: 0,
});

const HeaderBreadcrumbsList = styled('ol', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'List',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { labeled: boolean } }>(({ ownerState }) => ({
  // With labels, segments are taller, so line everything up on the name row.
  alignItems: ownerState.labeled ? 'flex-end' : 'center',
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  minWidth: 0,
  padding: 0,
}));

const HeaderBreadcrumbsSeparator = styled('li', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Separator',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { labeled: boolean } }>(({ theme, ownerState }) => ({
  ...theme.typography.body1,
  color: (theme.vars || theme).palette.text.secondary,
  flex: 'none',
  // Centre the slash on the name row under the labels.
  lineHeight: ownerState.labeled ? `${LABELED_ROW_HEIGHT}px` : undefined,
  padding: theme.spacing(0, 0.5),
  userSelect: 'none',
}));

/**
 * Props for HeaderBreadcrumbs.
 */
export interface HeaderBreadcrumbsProps
  extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'onSelect'> {
  /**
   * Levels in order, for example organization, project and component. The trail
   * runs up to the first level without a selection, which shows as a › button. Leave
   * a level out to remove it, such as the component level in an app without one.
   */
  levels: HeaderBreadcrumbsLevel[];
  /** Called when a name is clicked, to go to that entry's page. */
  onNavigate?: (levelId: string, item: HeaderBreadcrumbsItem) => void;
  /** Called when a different entry is picked in a level's switch menu. */
  onSelect?: (levelId: string, item: HeaderBreadcrumbsItem) => void;
  /** Called when a level's switch menu opens. Use it to load or refresh that level. */
  onOpen?: (levelId: string) => void;
  /**
   * Adds "New {label}" to every level's menu, such as "New project". Called with the
   * level and the current selection, so you can open a dialog or navigate. A level's
   * `createAction` can relabel, link or hide it.
   */
  onCreate?: (levelId: string, context: HeaderBreadcrumbsActionContext) => void;
  /**
   * Adds "Manage {pluralLabel}" to every level's menu, such as "Manage projects". A
   * level's `manageAction` can relabel, link or hide it.
   */
  onManage?: (levelId: string, context: HeaderBreadcrumbsActionContext) => void;
  /**
   * Show each level's name (such as "Organization") in small text above it, so users
   * can tell the levels apart.
   * @default false
   */
  showLabels?: boolean;
  /**
   * Show each level's `icon` before its name, so users can tell the levels apart
   * without labels. Hovering an icon shows the level name. Levels without an `icon`
   * show none, and `showLabels` replaces the icons.
   * @default true
   */
  showIcons?: boolean;
  /**
   * Element used for items with an `href`, such as a router `Link`.
   * @default 'a'
   */
  linkComponent?: React.ElementType;
  /**
   * Node between segments.
   * @default '/'
   */
  separator?: React.ReactNode;
  /** The sx prop for styling with the MUI system. */
  sx?: SxProps<Theme>;
}

/**
 * HeaderBreadcrumbs - A trail of the current organization, project and component.
 *
 * Each segment has two targets. The name goes to that entry's page. The caret opens a
 * menu to switch to another entry of the same level. The last segment is the current
 * page. While a level has no selection, it shows as a › button after the trail,
 * named "Open {label}", such as "Open project" on an organization page. Pair it with `useHeaderBreadcrumbs` to fetch each level's items and keep the
 * selection, and place it in `Header.Switchers`.
 *
 * @example
 * ```tsx
 * const breadcrumb = useHeaderBreadcrumbs({
 *   levels: [
 *     { id: 'organization', label: 'Organization', fetchItems: fetchOrganizations },
 *     { id: 'project', label: 'Project', fetchItems: ({ parents }) => fetchProjects(parents.organization) },
 *   ],
 *   defaultValue: { organization: 'thunder-id', project: 'thunderid' },
 *   onNavigate: (levelId, item) => navigate(item.href!),
 * });
 *
 * <Header.Switchers>
 *   <HeaderBreadcrumbs {...breadcrumb.breadcrumbProps} />
 * </Header.Switchers>
 * ```
 */
export const HeaderBreadcrumbs = React.forwardRef<HTMLElement, HeaderBreadcrumbsProps>(
  function HeaderBreadcrumbs(inProps, ref) {
    const {
      levels,
      onNavigate,
      onSelect,
      onOpen,
      onCreate,
      onManage,
      showLabels = false,
      showIcons = true,
      linkComponent = 'a',
      separator = '/',
      'aria-label': ariaLabel = 'Breadcrumb',
      ...rest
    } = useThemeProps({ props: inProps, name: 'MuiHeaderBreadcrumbs' });

    // The trail stops at the first level without a selection, so a later selection
    // whose parent is empty never shows.
    const firstEmpty = levels.findIndex((level) => !level.selectedId);
    const selectedCount = firstEmpty === -1 ? levels.length : firstEmpty;
    // The first level without a selection follows as a › button, if there is one.
    const visibleCount = Math.min(levels.length, selectedCount + 1);
    const visible = levels.slice(0, visibleCount);
    const lastSelectedIndex = selectedCount - 1;
    const value: HeaderBreadcrumbsValue = {};
    levels.slice(0, selectedCount).forEach((level) => {
      value[level.id] = level.selectedId as string;
    });

    return (
      <HeaderBreadcrumbsRoot ref={ref} aria-label={ariaLabel} {...rest}>
        <HeaderBreadcrumbsList ownerState={{ labeled: showLabels }}>
          {visible.map((level, index) => (
            <React.Fragment key={level.id}>
              {index > 0 && (
                <HeaderBreadcrumbsSeparator aria-hidden="true" ownerState={{ labeled: showLabels }}>
                  {separator}
                </HeaderBreadcrumbsSeparator>
              )}
              <HeaderBreadcrumbsSegment
                level={level}
                current={index === lastSelectedIndex}
                linkComponent={linkComponent}
                showLabel={showLabels}
                // Labels already tell the levels apart, so they replace the icons.
                showIcon={showIcons && !showLabels}
                value={value}
                onCreate={onCreate}
                onManage={onManage}
                onNavigate={onNavigate}
                onSelect={onSelect}
                onOpen={onOpen}
              />
            </React.Fragment>
          ))}
        </HeaderBreadcrumbsList>
      </HeaderBreadcrumbsRoot>
    );
  }
);

HeaderBreadcrumbs.displayName = 'HeaderBreadcrumbs';

export default HeaderBreadcrumbs;
