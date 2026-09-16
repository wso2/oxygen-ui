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
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `text.secondary` - Section label color
 *
 * Spacing:
 * - `spacing(2)` / `spacing(1.5)` - Padding and grid gap
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
  letterSpacing: '0.08em',
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
}));

/**
 * Props for the AppSwitcher.Section component.
 */
export interface AppSwitcherSectionProps {
  /** App cards (typically `AppSwitcher.App` elements) */
  children: React.ReactNode;
  /** Section heading, rendered as an uppercase label (e.g. `"Platforms"`) */
  label?: string;
  /** Number of grid columns from the `sm` breakpoint up (default: 2) */
  columns?: number;
  /** Additional sx props */
  sx?: SxProps<Theme>;
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
 *   <AppSwitcher.App name="Agent" icon={<Bot />} status="Current" current />
 *   <AppSwitcher.App name="API Management" icon={<Braces />} status="Try Now" />
 * </AppSwitcher.Section>
 * ```
 */
export const AppSwitcherSection: React.FC<AppSwitcherSectionProps> = ({
  children,
  label,
  columns = 2,
  sx,
}) => {
  const labelId = React.useId();
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

  return (
    <AppSwitcherSectionRoot sx={sx}>
      {label && <AppSwitcherSectionLabel id={labelId}>{label}</AppSwitcherSectionLabel>}
      <AppSwitcherSectionGrid
        ref={gridRef}
        ownerState={{ columns }}
        role="list"
        aria-labelledby={label ? labelId : undefined}
        onKeyDown={handleKeyDown}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? <li>{child}</li> : child
        )}
      </AppSwitcherSectionGrid>
    </AppSwitcherSectionRoot>
  );
};

AppSwitcherSection.displayName = 'AppSwitcher.Section';

export default AppSwitcherSection;
