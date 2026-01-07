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
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

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
 * Styled copyright section.
 */
const FooterCopyright = styled(Box, {
  name: 'MuiFooter',
  slot: 'Copyright',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

/**
 * Styled copyright text.
 */
const FooterCopyrightText = styled(Typography, {
  name: 'MuiFooter',
  slot: 'CopyrightText',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
}));

/**
 * Styled version text.
 */
const FooterVersion = styled(Typography, {
  name: 'MuiFooter',
  slot: 'Version',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.disabled,
  fontFamily: 'monospace',
  fontSize: 11,
}));

/**
 * Styled links container.
 */
const FooterLinks = styled(Box, {
  name: 'MuiFooter',
  slot: 'Links',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

/**
 * Styled footer link.
 */
const FooterLink = styled(Link, {
  name: 'MuiFooter',
  slot: 'Link',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: 12,
  '&:hover': {
    color: (theme.vars || theme).palette.text.primary,
  },
}));

/**
 * Props for the Footer component.
 */
export interface FooterProps {
  /** Copyright text (defaults to current year) */
  copyright?: string;
  /** Company/organization name */
  companyName?: string;
  /** Link to terms and conditions */
  termsUrl?: string;
  /** Link to privacy policy */
  privacyUrl?: string;
  /** Optional version string to display */
  version?: string;
  /** Additional links to display */
  links?: Array<{ label: string; url: string }>;
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
 *   companyName="Acme Corporation"
 *   termsUrl="/terms"
 *   privacyUrl="/privacy"
 *   version="v2.1.0"
 *   links={[
 *     { label: 'Documentation', url: '/docs' },
 *     { label: 'Status', url: '/status' },
 *   ]}
 * />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  copyright,
  companyName = 'Your Company',
  termsUrl = '#',
  privacyUrl = '#',
  version,
  links = [],
  sx,
}) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright || `© ${currentYear} ${companyName}. All rights reserved.`;

  return (
    <FooterRoot component="footer" sx={sx}>
      <FooterContent>
        {/* Copyright section */}
        <FooterCopyright>
          <FooterCopyrightText variant="caption">
            {copyrightText}
          </FooterCopyrightText>
          {version && (
            <>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: 'none', sm: 'block' } }}
              />
              <FooterVersion variant="caption">{version}</FooterVersion>
            </>
          )}
        </FooterCopyright>

        {/* Links section */}
        <FooterLinks>
          <FooterLink href={termsUrl} underline="hover">
            Terms & Conditions
          </FooterLink>
          <FooterLink href={privacyUrl} underline="hover">
            Privacy Policy
          </FooterLink>
          {links.map((link, index) => (
            <FooterLink key={index} href={link.url} underline="hover">
              {link.label}
            </FooterLink>
          ))}
        </FooterLinks>
      </FooterContent>
    </FooterRoot>
  );
};

export default Footer;
