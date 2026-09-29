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
import { styled } from '@mui/material/styles';
import { APP_CARD_HEIGHT, AppSwitcherApp } from './AppSwitcherApp';
import type { AppSwitcherAppItem, AppSwitcherAppTone } from './AppSwitcherApp';
import { AppSwitcherFooterContext } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `text.secondary` - Section label color
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
 */
const AppSwitcherSectionRoot = styled(Box, {
  name: 'MuiAppSwitcher',
  slot: 'Section',
})(({ theme }) => ({
  padding: theme.spacing(2),
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
})<{ ownerState: { columns: number } }>(({ theme, ownerState }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: '1fr',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: `repeat(${ownerState.columns}, minmax(0, 1fr))`,
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
   * `url`, `onClick` or `component` renders as unavailable.
   */
  apps?: AppSwitcherAppItem[];
  /** Section heading, rendered as an uppercase label (e.g. `"Platforms"`) */
  label?: string;
  /** Number of grid columns from the `sm` breakpoint up (default: 3) */
  columns?: number;
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
 * <AppSwitcher.Section label="Platforms">
 *   <AppSwitcher.App name="Agent Manager" url="https://agent.wso2.com" />
 *   <AppSwitcher.App name="API Platform" url="https://api.wso2.com" />
 * </AppSwitcher.Section>
 *
 * <AppSwitcher.Section label="Platforms" apps={platforms} loading={isLoading} />
 * ```
 */
export const AppSwitcherSection: React.FC<AppSwitcherSectionProps> = ({
  children,
  apps,
  label,
  columns = 3,
  loading = false,
  loadingCount,
}) => {
  const labelId = React.useId();
  // Placeholders in the footer match its shorter cards.
  const inFooter = React.useContext(AppSwitcherFooterContext);
  const tone: AppSwitcherAppTone = inFooter ? 'manage' : 'platform';
  const gridRef = React.useRef<HTMLUListElement>(null);

  /**
   * Moves focus between app cards with the arrow keys.
   *
   * A grid of links is tedious to traverse with Tab alone, and the visual
   * layout implies arrow-key movement. Left/Right step through the cards and
   * Up/Down jump by a row; Home/End go to the first/last card. Disabled cards
   * stay in the sequence because they remain focusable and discoverable;
   * "Coming soon" cards have no action and are skipped.
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

    // Start position and step per key, so unavailable cards can be skipped
    // in the direction of travel.
    const moves: Record<string, [start: number, step: number]> = {
      ArrowRight: [currentIndex + 1, 1],
      ArrowLeft: [currentIndex - 1, -1],
      ArrowDown: [currentIndex + perRow, perRow],
      ArrowUp: [currentIndex - perRow, -perRow],
      Home: [0, 1],
      End: [cards.length - 1, -1],
    };
    const [start, step] = moves[event.key];

    // Unavailable cards are not focusable. They still count in `perRow` so
    // rows match the screen.
    let nextIndex = start;
    while (
      nextIndex >= 0 &&
      nextIndex < cards.length &&
      cards[nextIndex].hasAttribute('data-app-switcher-unavailable')
    ) {
      nextIndex += step;
    }

    // Clamp instead of wrapping: a vertical step off the last row would
    // otherwise land somewhere unrelated.
    if (nextIndex < 0 || nextIndex >= cards.length || nextIndex === currentIndex) {
      return;
    }

    // Stop the popover from also scrolling on arrow keys.
    event.preventDefault();
    cards[nextIndex].focus();
  };

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
    : (children ?? (apps && renderAppItems(apps, { missingUrlIsUnavailable: true })));

  return (
    <AppSwitcherSectionRoot>
      {label && <AppSwitcherSectionLabel id={labelId}>{label}</AppSwitcherSectionLabel>}
      <AppSwitcherSectionGrid
        ref={gridRef}
        ownerState={{ columns }}
        role="list"
        aria-labelledby={label ? labelId : undefined}
        aria-busy={loading ? 'true' : undefined}
        onKeyDown={handleKeyDown}
      >
        {React.Children.map(content, (child) =>
          React.isValidElement(child) ? <li>{child}</li> : child
        )}
      </AppSwitcherSectionGrid>
    </AppSwitcherSectionRoot>
  );
};

AppSwitcherSection.displayName = 'AppSwitcher.Section';

export default AppSwitcherSection;
