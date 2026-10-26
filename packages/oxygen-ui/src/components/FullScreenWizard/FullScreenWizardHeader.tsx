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
import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';
import { useForkRef } from '@mui/material/utils';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { X } from '@wso2/oxygen-ui-icons-react';
import { useFullScreenWizard } from './context';

/**
 * Theme tokens used in this component:
 *
 * Spacing:
 * - `spacing(2)` - Padding on xs (mobile)
 * - `spacing(3)` / `spacing(4)` - Padding from sm / md up
 *
 * The close button takes the theme's `IconButton` defaults (`action.active`),
 * so it matches the other icon buttons in the product.
 */

/**
 * Styled header row for the wizard.
 */
const FullScreenWizardHeaderRoot = styled('header', {
  name: 'MuiFullScreenWizard',
  slot: 'Header',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexShrink: 0,
  minWidth: 0,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3, 4),
  },
}));

/**
 * Styled slot for the header's own content (breadcrumbs or a title).
 */
const FullScreenWizardHeaderContent = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'HeaderContent',
})({
  flex: 1,
  minWidth: 0,
});

/**
 * Props for the FullScreenWizard.Header component.
 */
export interface FullScreenWizardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumbs or a title, shown beside the close button */
  children?: React.ReactNode;
  /**
   * Side of the header the close button sits on. Use `end` on a landing screen
   * or a flow whose header holds a title or a stepper on the left.
   * @default 'start'
   */
  closePosition?: 'start' | 'end';
  /**
   * Icon of the close button.
   * @default <X size={20} />
   */
  closeIcon?: React.ReactNode;
  /** Extra props for the close button, e.g. `size`, `color` or `sx`. Its name and click handler come from the wizard. */
  CloseButtonProps?: Partial<Omit<IconButtonProps, 'onClick' | 'children'>>;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * FullScreenWizard.Header - Header row with the built-in close button.
 *
 * Renders a `<header>` holding the close button, named by the wizard's
 * `closeLabel` and calling its `onClose`, and `children`. The close button
 * comes first by default; `closePosition="end"` moves it after `children`. It
 * is not rendered when the wizard has no `onClose`.
 *
 * @example
 * ```tsx
 * <FullScreenWizard.Header>
 *   <AppBreadcrumbs items={breadcrumbs} />
 * </FullScreenWizard.Header>
 * ```
 */
export const FullScreenWizardHeader = React.forwardRef<HTMLElement, FullScreenWizardHeaderProps>(
  function FullScreenWizardHeader(
    { children, closePosition = 'start', closeIcon, CloseButtonProps: closeButtonProps, ...props },
    ref
  ) {
  const { onClose, closeLabel, setHeaderHeight } = useFullScreenWizard('FullScreenWizard.Header');
  const headerRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(headerRef, ref);

  // Report the header's height, so centred content can balance it.
  React.useLayoutEffect(() => {
    const node = headerRef.current;
    if (!node) {
      return undefined;
    }
    setHeaderHeight(node.offsetHeight);
    if (typeof ResizeObserver === 'undefined') {
      return () => setHeaderHeight(0);
    }
    const observer = new ResizeObserver(() => setHeaderHeight(node.offsetHeight));
    observer.observe(node);
    return () => {
      observer.disconnect();
      setHeaderHeight(0);
    };
  }, [setHeaderHeight]);

  const closeButton = onClose && (
    <IconButton edge={closePosition} {...closeButtonProps} onClick={onClose} aria-label={closeLabel}>
      {closeIcon ?? <X size={20} aria-hidden="true" />}
    </IconButton>
  );

  return (
    <FullScreenWizardHeaderRoot ref={handleRef} {...props}>
      {closePosition === 'start' && closeButton}
      <FullScreenWizardHeaderContent>{children}</FullScreenWizardHeaderContent>
      {closePosition === 'end' && closeButton}
    </FullScreenWizardHeaderRoot>
  );
  }
);

FullScreenWizardHeader.displayName = 'FullScreenWizard.Header';

export default FullScreenWizardHeader;
