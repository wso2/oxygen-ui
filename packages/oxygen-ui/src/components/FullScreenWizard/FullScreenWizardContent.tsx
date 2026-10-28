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
import { styled } from '@mui/material/styles';
import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';
import { useForkRef } from '@mui/material/utils';
import { useFullScreenWizard } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `primary.main` - Focus ring shown to keyboard users after a step change
 *
 * Spacing:
 * - `spacing(3)` / `spacing(4)` - Vertical padding on xs / from md up
 * - `spacing(2)`, `spacing(4)`, `spacing(10)` - Horizontal padding on xs, from sm up, from md up
 *
 * Breakpoints:
 * - `maxWidth` given as a breakpoint key reads its width from `theme.breakpoints.values`
 */

/**
 * Styled scroll region for the wizard content.
 */
const FullScreenWizardContentRoot = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'Content',
})(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3, 4),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 10),
  },
  // Focus moves here programmatically when the step changes, so screen readers
  // start at the new step. The ring shows only for keyboard users, and is inset
  // because the wizard root clips overflow.
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
    outlineOffset: -2,
  },
}));

/**
 * Styled column constraining the step and the footer to a readable width.
 */
const FullScreenWizardContentColumn = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'ContentColumn',
})<{ ownerState: { maxWidth: Breakpoint | number | false; align: 'start' | 'center' } }>(({
  theme,
  ownerState,
}) => {
  const { maxWidth, align } = ownerState;
  let resolvedMaxWidth: string | number = 'none';
  if (typeof maxWidth === 'number') {
    resolvedMaxWidth = maxWidth;
  } else if (maxWidth === 'xs') {
    // `xs` is 0, which would collapse the column, so floor it as MUI's Container
    // does: a plain number, which is pixels whatever the breakpoint unit.
    resolvedMaxWidth = Math.max(theme.breakpoints.values.xs, 444);
  } else if (maxWidth) {
    resolvedMaxWidth = `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit ?? 'px'}`;
  }

  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: resolvedMaxWidth,
    // Auto margins centre the column in both directions and fall back to 0
    // when it overflows, so tall content still scrolls from the top.
    ...(align === 'center' && { margin: 'auto' }),
  };
});

/**
 * Empty space under centred content, as tall as the header above it, so the
 * column centres on the whole screen rather than on the space below the header.
 */
const FullScreenWizardContentBalance = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'ContentBalance',
})<{ ownerState: { height: number } }>(({ ownerState }) => ({
  flexShrink: 0,
  height: ownerState.height,
}));

/**
 * Props for the FullScreenWizard.Content component.
 */
export interface FullScreenWizardContentProps extends React.HTMLAttributes<HTMLElement> {
  /** The active step */
  children?: React.ReactNode;
  /**
   * Element the content region renders as. Pass `'div'` when the page around
   * the wizard already has a `main` landmark, such as an `AppShell`.
   * @default 'main' in page mode, 'div' in modal mode
   */
  component?: React.ElementType;
  /**
   * Maximum width of the content column: a breakpoint key, a width in pixels,
   * or `false` to fill the available width. `xs` is at least 444px, as in MUI's `Container`.
   * @default 'md'
   */
  maxWidth?: Breakpoint | number | false;
  /**
   * Position of the content column. `start` keeps the form left-aligned, so
   * showing or hiding a preview does not move it. `center` centres the column
   * in both directions, for a landing screen such as a welcome page.
   * @default 'start'
   */
  align?: 'start' | 'center';
  /**
   * Identifies the active step. When it changes, focus moves to the content
   * region and the region scrolls to the top, so screen readers start at the
   * new step. Nothing happens on the first render.
   */
  focusKey?: string | number;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * FullScreenWizard.Content - Scroll region holding the active step.
 *
 * Renders a `<main>` landmark in page mode and a plain region inside the
 * dialog in modal mode; `component` overrides the element. The step and the `FullScreenWizard.Footer` share a
 * left-aligned column capped at `maxWidth`, so showing or hiding a preview
 * does not move the form.
 *
 * @example
 * ```tsx
 * <FullScreenWizard.Content maxWidth="md" focusKey={wizard.activeStep}>
 *   {wizard.activeStep && stepContent[wizard.activeStep]}
 * </FullScreenWizard.Content>
 * ```
 */
export const FullScreenWizardContent = React.forwardRef<HTMLElement, FullScreenWizardContentProps>(
  function FullScreenWizardContent(
    { children, component, maxWidth = 'md', align = 'start', focusKey, ...props },
    ref
  ) {
    const { modal, footer, ariaLabel, ariaLabelledby, headerHeight } = useFullScreenWizard(
      'FullScreenWizard.Content'
    );
    const contentRef = React.useRef<HTMLElement>(null);
    const handleRef = useForkRef(contentRef, ref);

    // Compare with the previous key rather than skipping the first effect run:
    // StrictMode runs mount effects twice, which would otherwise steal focus on mount.
    const previousFocusKey = React.useRef(focusKey);
    React.useEffect(() => {
      if (Object.is(previousFocusKey.current, focusKey)) {
        return;
      }
      previousFocusKey.current = focusKey;
      const node = contentRef.current;
      if (!node) {
        return;
      }
      node.scrollTop = 0;
      node.focus({ preventScroll: true });
    }, [focusKey]);

    // The wizard's name labels the `main` landmark. In modal mode it names the
    // dialog instead, and a plain `div` cannot take a name, so it stays unnamed.
    const element = component ?? (modal ? 'div' : 'main');
    const landmarkProps =
      element === 'main'
        ? { 'aria-label': ariaLabelledby ? undefined : ariaLabel, 'aria-labelledby': ariaLabelledby }
        : {};

    return (
      <FullScreenWizardContentRoot
        as={element}
        ref={handleRef as React.Ref<HTMLDivElement>}
        tabIndex={-1}
        {...landmarkProps}
        {...props}
      >
        <FullScreenWizardContentColumn ownerState={{ maxWidth, align }}>
          {children}
          {footer}
        </FullScreenWizardContentColumn>
        {align === 'center' && headerHeight > 0 && (
          <FullScreenWizardContentBalance aria-hidden="true" ownerState={{ height: headerHeight }} />
        )}
      </FullScreenWizardContentRoot>
    );
  }
);

FullScreenWizardContent.displayName = 'FullScreenWizard.Content';

export default FullScreenWizardContent;
