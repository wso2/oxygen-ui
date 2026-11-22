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
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { APP_CARD_HEIGHT, APP_TILE_SIZE, AppSwitcherApp } from './AppSwitcherApp';
import type { AppSwitcherAppItem, AppSwitcherAppTone } from './AppSwitcherApp';
import { AppSwitcherFooterContext } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `text.secondary` - Section label color
 * - `divider` - Rule below a `manage` section that is followed by another section
 *
 * Spacing:
 * - `spacing(2.5)` - Section padding
 * - `spacing(1.5)` - Gap between the heading and its grid
 * - `spacing(1.5)` - Grid gap
 *
 * Typography:
 * - `typography.caption` - Section label size
 */

/**
 * Styled section container.
 *
 * A `manage` section is the Choreo Labs Cloud row (Cloud home, organization settings)
 * placed above the services. It takes the same faint wash as the footer and,
 * when another section follows, a divider below it so the two kinds of
 * destination read as separate groups.
 */
const AppSwitcherSectionRoot = styled(Box, {
  name: 'MuiAppSwitcher',
  slot: 'Section',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { manageRow: boolean } }>(({ theme, ownerState }) => ({
  padding: theme.spacing(2),
  // The footer draws its own wash and divider, so only a standalone manage
  // section takes them here.
  ...(ownerState.manageRow && {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.02)`
      : alpha(theme.palette.text.primary, 0.02),
    '&:not(:last-child)': {
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
  }),
}));

/**
 * Styled uppercase section label.
 */
const AppSwitcherSectionLabel = styled(Typography, {
  name: 'MuiAppSwitcher',
  slot: 'SectionLabel',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  // Wide tracking so the headings read as quiet labels rather than as titles.
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(1.5),
}));

/**
 * Styled responsive grid holding the app cards.
 */
const AppSwitcherSectionGrid = styled('ul', {
  name: 'MuiAppSwitcher',
  slot: 'SectionGrid',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { columns: number; tone: AppSwitcherAppTone } }>(({ theme, ownerState }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: '1fr',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  [theme.breakpoints.up('sm')]: {
    // Service columns have a fixed minimum, so they set the popover's width and
    // every tile keeps the same size whatever the column count. Manage columns
    // take whatever width that leaves.
    gridTemplateColumns:
      ownerState.tone === 'platform'
        ? `repeat(${ownerState.columns}, minmax(${theme.spacing(APP_TILE_SIZE)}, 1fr))`
        : `repeat(${ownerState.columns}, minmax(0, 1fr))`,
  },
  '& > li': {
    display: 'contents',
  },
}));

/**
 * Styled loading placeholder, sized like a card so the grid does not jump
 * when the real cards arrive.
 */
const AppSwitcherAppSkeleton = styled(Skeleton, {
  name: 'MuiAppSwitcher',
  slot: 'AppSkeleton',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { tone: AppSwitcherAppTone } }>(({ theme, ownerState }) => ({
  width: '100%',
  height: theme.spacing(APP_CARD_HEIGHT[ownerState.tone]),
  // The pulse is decoration; the placeholder alone signals loading.
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));

/**
 * Renders data items as cards.
 *
 * `missingUrlIsUnavailable` treats an omitted `url` as `null`. The footer's
 * older `links` turn it off so existing links without a `url` do not change.
 *
 * @internal
 */
export const renderAppItems = (
  items: ReadonlyArray<Omit<AppSwitcherAppItem, 'id'> & { id?: string; key?: string }>,
  { missingUrlIsUnavailable }: { missingUrlIsUnavailable: boolean },
): React.ReactNode =>
  items.map(({ key, url, ...item }, index) => (
    <AppSwitcherApp
      key={item.id ?? key ?? index}
      {...item}
      url={url === undefined && missingUrlIsUnavailable ? null : url}
    />
  ));

/**
 * Props for the AppSwitcher.Section component.
 */
export interface AppSwitcherSectionProps {
  /** App cards (typically `AppSwitcher.App` elements) */
  children?: React.ReactNode;
  /**
   * Apps rendered as cards, as an alternative to `children`. An app with no
   * `url`, `onClick` or `component` renders disabled.
   */
  apps?: AppSwitcherAppItem[];
  /** Section heading, rendered as an uppercase label (e.g. `"Services"`) */
  label?: string;
  /**
   * Accessible name for the grid when there is no visible `label`. Ignored
   * when `label` is set, since the heading already names the grid.
   */
  'aria-label'?: string;
  /**
   * Number of grid columns from the `sm` breakpoint up. Defaults to 3, or to 2
   * when the section holds exactly four cards, so four lay out as an even 2×2
   * grid rather than a row of three with one left over.
   */
  columns?: number;
  /**
   * Visual treatment for the section and its cards (default: `"manage"` inside
   * the footer, `"platform"` elsewhere). Use `"manage"` for the Choreo Labs Cloud row
   * (Cloud home, organization settings) placed above the services: its cards
   * take the smaller neutral glyph, and a divider separates it from the next
   * section.
   */
  tone?: AppSwitcherAppTone;
  /** Shows placeholder cards, e.g. while the apps are fetched */
  loading?: boolean;
  /** Number of placeholder cards while `loading` (default: one row, `columns`) */
  loadingCount?: number;
}

/**
 * AppSwitcher.Section - Labelled grid of applications inside the popover.
 *
 * Renders its children as a semantic list so assistive technology announces the
 * number of available applications. The grid collapses to a single column on
 * narrow viewports.
 *
 * @example
 * ```tsx
 * <AppSwitcher.Section label="Services">
 *   <AppSwitcher.App name="Agent Management" url="https://agent.example.com" icon={<Bot size={32} />} />
 *   <AppSwitcher.App name="API Management" url="https://api.example.com" icon={<Cpu size={32} />} />
 * </AppSwitcher.Section>
 *
 * <AppSwitcher.Section label="Services" apps={services} loading={isLoading} />
 *
 * <AppSwitcher.Section aria-label="Manage" tone="manage" columns={2} apps={cloudLinks} />
 * ```
 */
export const AppSwitcherSection: React.FC<AppSwitcherSectionProps> = ({
  children,
  apps,
  label,
  'aria-label': ariaLabel,
  columns: columnsProp,
  tone: toneProp,
  loading = false,
  loadingCount,
}) => {
  const labelId = React.useId();
  // The footer's cards, and its placeholders, take the shorter manage cards.
  const inFooter = React.useContext(AppSwitcherFooterContext);
  const tone: AppSwitcherAppTone = toneProp ?? (inFooter ? 'manage' : 'platform');
  const gridRef = React.useRef<HTMLUListElement>(null);

  /**
   * Moves focus between app cards with the arrow keys.
   *
   * A grid of links is tedious to traverse with Tab alone, and the visual
   * layout implies arrow-key movement. Left/Right step through the cards and
   * Up/Down jump by a row; Home/End go to the first/last card. Disabled cards
   * stay in the sequence because they remain focusable and discoverable.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) {
      return;
    }

    const cards = Array.from(
      gridRef.current?.querySelectorAll<HTMLElement>('[data-app-switcher-app]') ?? []
    );
    if (cards.length === 0) {
      return;
    }

    const currentIndex = cards.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) {
      return;
    }

    // The single-column layout below `sm` makes horizontal steps equivalent to
    // vertical ones, so derive the row stride from the rendered geometry rather
    // than the `columns` prop.
    const firstTop = cards[0].getBoundingClientRect().top;
    const perRow = Math.max(
      1,
      cards.filter((card) => card.getBoundingClientRect().top === firstTop).length
    );

    let nextIndex = currentIndex;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        nextIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        nextIndex = currentIndex + perRow;
        break;
      case 'ArrowUp':
        nextIndex = currentIndex - perRow;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = cards.length - 1;
        break;
      default:
        break;
    }

    // Clamp instead of wrapping: a vertical step off the last row would
    // otherwise land somewhere unrelated.
    if (nextIndex < 0 || nextIndex >= cards.length) {
      return;
    }

    // Stop the popover from also scrolling on arrow keys.
    event.preventDefault();
    cards[nextIndex].focus();
  };

  const cards = children ?? (apps && renderAppItems(apps, { missingUrlIsUnavailable: true }));
  // Four cards in three columns leave one on its own row; two columns keep the
  // grid even and give long names room for a full line. While loading, the
  // placeholders keep the usual single row of three.
  const columns =
    columnsProp ?? (!loading && React.Children.toArray(cards).length === 4 ? 2 : 3);

  const content = loading
    ? Array.from({ length: loadingCount ?? columns }, (_, index) => (
        <AppSwitcherAppSkeleton
          key={index}
          ownerState={{ tone }}
          variant="rounded"
          aria-hidden="true"
          data-app-switcher-skeleton=""
        />
      ))
    : cards;

  return (
    <AppSwitcherSectionRoot ownerState={{ manageRow: tone === 'manage' && !inFooter }}>
      {label && <AppSwitcherSectionLabel id={labelId}>{label}</AppSwitcherSectionLabel>}
      <AppSwitcherSectionGrid
        ref={gridRef}
        ownerState={{ columns, tone }}
        role="list"
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : ariaLabel}
        aria-busy={loading ? 'true' : undefined}
        onKeyDown={handleKeyDown}
      >
        {/* Composed cards pick up the section's tone without repeating it. */}
        <AppSwitcherFooterContext.Provider value={tone === 'manage'}>
          {React.Children.map(content, (child) =>
            React.isValidElement(child) ? <li>{child}</li> : child
          )}
        </AppSwitcherFooterContext.Provider>
      </AppSwitcherSectionGrid>
    </AppSwitcherSectionRoot>
  );
};

AppSwitcherSection.displayName = 'AppSwitcher.Section';

export default AppSwitcherSection;
