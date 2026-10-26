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
import type { SxProps, Theme } from '@mui/material/styles';
import { useFullScreenWizard } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors (sticky and bar footers):
 * - `background.paper` - Background, so content scrolling under it stays hidden
 * - `divider` - Top border
 *
 * Spacing:
 * - `spacing(2)` - Gap between actions
 * - `spacing(6)` - Space above a footer that flows with the content
 * - Bar footer: the content region's horizontal padding, so the actions line up with the header
 */

/**
 * Styled actions row for the wizard.
 */
const FullScreenWizardFooterRoot = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'Footer',
})<{ ownerState: { sticky: boolean; variant: 'inline' | 'bar' } }>(({ theme, ownerState }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  flexShrink: 0,
  marginTop: theme.spacing(6),
  ...(ownerState.sticky && {
    position: 'sticky',
    zIndex: 1,
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(2),
    backgroundColor: (theme.vars || theme).palette.background.paper,
    borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
    // Reach into the content region's bottom padding (spacing 3, or 4 from md
    // up) so the footer sits flush with the bottom edge and nothing shows below it.
    bottom: `calc(-1 * ${theme.spacing(3)})`,
    marginBottom: `calc(-1 * ${theme.spacing(3)})`,
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      bottom: `calc(-1 * ${theme.spacing(4)})`,
      marginBottom: `calc(-1 * ${theme.spacing(4)})`,
      paddingBottom: theme.spacing(6),
    },
  }),
  ...(ownerState.variant === 'bar' && {
    marginTop: 0,
    padding: theme.spacing(2),
    backgroundColor: (theme.vars || theme).palette.background.paper,
    borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 4),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2, 10),
    },
  }),
}));

/**
 * Props for the FullScreenWizard.Footer component.
 */
export interface FullScreenWizardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions, e.g. Back and Continue buttons */
  children?: React.ReactNode;
  /**
   * Pins the footer to the bottom of the scroll region, so the actions stay in
   * view on a long form.
   * @default false
   */
  sticky?: boolean;
  /**
   * `inline` renders the actions under the step, in the content column.
   * `bar` anchors them in a full-width bar along the bottom of the form
   * column, outside the scroll region, so they are always in view.
   * @default 'inline'
   */
  variant?: 'inline' | 'bar';
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * FullScreenWizard.Footer - Row of actions under the step content.
 *
 * Actions are end-aligned. Push a Back button to the start with
 * `sx={{ mr: 'auto' }}`. The inline footer renders inside the content's
 * scroll region, in the same column as the step, wherever it sits among the
 * wizard's children. The bar footer spans the bottom of the form column.
 *
 * @example
 * ```tsx
 * <FullScreenWizard.Footer>
 *   <Button variant="outlined" onClick={wizard.back} sx={{ mr: 'auto' }}>Back</Button>
 *   <Button variant="contained" onClick={wizard.next}>Continue</Button>
 * </FullScreenWizard.Footer>
 * ```
 */
export const FullScreenWizardFooter = React.forwardRef<HTMLDivElement, FullScreenWizardFooterProps>(
  function FullScreenWizardFooter({ children, sticky = false, variant = 'inline', ...props }, ref) {
  useFullScreenWizard('FullScreenWizard.Footer');

  return (
    <FullScreenWizardFooterRoot
      ref={ref}
      ownerState={{ sticky: sticky && variant === 'inline', variant }}
      {...props}
    >
      {children}
    </FullScreenWizardFooterRoot>
  );
  }
);

FullScreenWizardFooter.displayName = 'FullScreenWizard.Footer';

export default FullScreenWizardFooter;
