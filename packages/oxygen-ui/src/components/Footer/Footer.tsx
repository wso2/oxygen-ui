/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { FooterCopyright } from './FooterCopyright';
import { FooterVersion } from './FooterVersion';
import { FooterLink } from './FooterLink';
import { FooterDivider } from './FooterDivider';

/**
 * Theme tokens used in this component:
 *
 * Text Hierarchy:
 * - `text.secondary` - Copyright text, link default color
 * - `text.primary` - Link hover color
 * - `text.disabled` - Version number (lowest emphasis)
 *
 * Background & Borders:
 * - `background.paper` - Footer background
 * - `divider` - Top border color
 *
 * Typography variants:
 * - variant="caption" - Small footer text (12px default)
 *
 * Link component:
 * - underline="hover" - Only show underline on hover
 * - Custom fontSize: 12 for consistent sizing
 *
 * Responsive Layout:
 * - flexDirection: { xs: 'column', sm: 'row' }
 * - alignItems: { xs: 'flex-start', sm: 'center' }
 */

/**
 * Styled root container for the footer.
 */
const FooterRoot = styled(Box, {
  name: 'MuiFooter',
  slot: 'Root',
})<{ component?: React.ElementType }>(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  marginTop: 'auto',
  borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
  backgroundColor: (theme.vars || theme).palette.background.paper,
}));

/**
 * Styled content container.
 */
const FooterContent = styled(Box, {
  name: 'MuiFooter',
  slot: 'Content',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

/**
 * Styled left section container.
 */
const FooterLeft = styled(Box, {
  name: 'MuiFooter',
  slot: 'Left',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

/**
 * Styled right section container (links).
 */
const FooterRight = styled(Box, {
  name: 'MuiFooter',
  slot: 'Right',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

/**
 * Props for the Footer root component.
 */
export interface FooterProps {
  /** Child elements (Copyright, Version, Link, Divider components) */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Footer - Application footer component.
 *
 * A minimal, clean footer that displays copyright information and legal links.
 * Designed to sit at the bottom of the main content area.
 *
 * Features:
 * - Copyright text with automatic year
 * - Terms & Conditions link
 * - Privacy Policy link
 * - Optional version display
 * - Custom additional links support
 * - Responsive layout (stacks on mobile)
 *
 * Usage:
 * ```tsx
 * <Footer
/**
 * Footer - Application footer component.
 *
 * A compound component for building flexible footer layouts.
 * Use the sub-components to compose your footer structure.
 *
 * Composition pattern example:
 * ```tsx
 * <Footer>
 *   <Footer.Copyright>© 2024 Your Company. All rights reserved.</Footer.Copyright>
 *   <Footer.Divider />
 *   <Footer.Version>v2.1.0</Footer.Version>
 *   <Footer.Link href="/terms">Terms & Conditions</Footer.Link>
 *   <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
 * </Footer>
 * ```
 */
const Footer: React.FC<FooterProps> & {
  Copyright: typeof FooterCopyright;
  Version: typeof FooterVersion;
  Link: typeof FooterLink;
  Divider: typeof FooterDivider;
} = ({ children, sx }) => {
  // Separate left section (Copyright, Version, Dividers) from right section (Links)
  const childrenArray = React.Children.toArray(children);
  
  const leftChildren: React.ReactNode[] = [];
  const rightChildren: React.ReactNode[] = [];
  
  childrenArray.forEach((child) => {
    if (React.isValidElement(child)) {
      // Copyright, Version, and Divider go to left section
      if (
        child.type === FooterCopyright ||
        child.type === FooterVersion ||
        child.type === FooterDivider
      ) {
        leftChildren.push(child);
      }
      // Links go to right section
      else if (child.type === FooterLink) {
        rightChildren.push(child);
      }
    }
  });

  return (
    <FooterRoot component="footer" sx={sx}>
      <FooterContent>
        {leftChildren.length > 0 && (
          <FooterLeft>{leftChildren}</FooterLeft>
        )}
        {rightChildren.length > 0 && (
          <FooterRight>{rightChildren}</FooterRight>
        )}
      </FooterContent>
    </FooterRoot>
  );
};

// Attach sub-components
Footer.Copyright = FooterCopyright;
Footer.Version = FooterVersion;
Footer.Link = FooterLink;
Footer.Divider = FooterDivider;

Footer.displayName = 'Footer';

export { Footer };
export default Footer;
