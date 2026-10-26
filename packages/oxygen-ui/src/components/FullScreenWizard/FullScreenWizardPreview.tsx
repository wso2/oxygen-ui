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
import { resolveLabel, useFullScreenWizard } from './context';

/**
 * Theme tokens used in this component:
 *
 * Spacing:
 * - `spacing(4)` - Inset around the preview, which shares the wizard surface;
 *   the consumer's content (such as a framed preview) supplies its own chrome
 *
 * Layout:
 * - Half the width by default; set `flexBasis` in `sx` for a narrower panel, such as a step rail
 * - `position` puts the panel on the right (`end`) or the left (`start`) of the form
 *
 * Responsive behavior:
 * - Hidden below the `hideBelow` breakpoint (`md` by default); the form column
 *   then takes the full width
 */

/**
 * Styled preview column for the wizard.
 */
const FullScreenWizardPreviewRoot = styled('aside', {
  name: 'MuiFullScreenWizard',
  slot: 'Preview',
})<{ ownerState: { hideBelow: Breakpoint | false } }>(({ theme, ownerState }) => ({
  flex: '0 0 50%',
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: theme.spacing(4),
  ...(ownerState.hideBelow && {
    [theme.breakpoints.down(ownerState.hideBelow)]: {
      display: 'none',
    },
  }),
}));

/**
 * Props for the FullScreenWizard.Preview component.
 */
export interface FullScreenWizardPreviewProps extends React.HTMLAttributes<HTMLElement> {
  /** Live preview of what the wizard creates, or other supporting content such as a step list or tips */
  children?: React.ReactNode;
  /**
   * Side of the form the panel sits on.
   * @default 'end'
   */
  position?: 'start' | 'end';
  /**
   * Hides the preview below this breakpoint. The preview is supplementary, so
   * small screens show the form alone. Pass `false` to always show it.
   * @default 'md'
   */
  hideBelow?: Breakpoint | false;
  /**
   * Accessible name of the preview region.
   * @default 'Preview'
   */
  previewLabel?: string;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * FullScreenWizard.Preview - Live preview beside the form.
 *
 * Adding a preview switches the wizard to a split layout: the header, content
 * and footer take one column and the preview takes the other at full height,
 * on the right by default or on the left with `position="start"`. It renders an `<aside>` landmark with its own
 * scroll.
 *
 * @example
 * ```tsx
 * <FullScreenWizard.Preview>
 *   <SignInPreview branding={branding} />
 * </FullScreenWizard.Preview>
 * ```
 */
export const FullScreenWizardPreview = React.forwardRef<HTMLElement, FullScreenWizardPreviewProps>(
  function FullScreenWizardPreview(
    {
  children,
  hideBelow = 'md',
  previewLabel,
  // Read by the wizard root, which places the panel; not a DOM attribute.
  position: _position,
  ...props
    },
    ref
  ) {
  useFullScreenWizard('FullScreenWizard.Preview');

  return (
    <FullScreenWizardPreviewRoot
      ref={ref}
      aria-label={resolveLabel(previewLabel, 'Preview')}
      ownerState={{ hideBelow }}
      {...props}
    >
      {children}
    </FullScreenWizardPreviewRoot>
  );
  }
);

FullScreenWizardPreview.displayName = 'FullScreenWizard.Preview';

export default FullScreenWizardPreview;
