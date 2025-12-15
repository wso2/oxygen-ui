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
import {
  Box,
  Typography,
  Link,
  Divider,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';

/**
 * Props for the AppShellFooter component.
 */
export interface AppShellFooterProps {
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
 * AppShellFooter - Application footer component.
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
 * <AppShellFooter
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
export const AppShellFooter: React.FC<AppShellFooterProps> = ({
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
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Copyright section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary' }}
          >
            {copyrightText}
          </Typography>
          {version && (
            <>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: 'none', sm: 'block' } }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  fontFamily: 'monospace',
                  fontSize: 11,
                }}
              >
                {version}
              </Typography>
            </>
          )}
        </Box>

        {/* Links section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Link
            href={termsUrl}
            underline="hover"
            sx={{
              color: 'text.secondary',
              fontSize: 12,
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            Terms & Conditions
          </Link>
          <Link
            href={privacyUrl}
            underline="hover"
            sx={{
              color: 'text.secondary',
              fontSize: 12,
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            Privacy Policy
          </Link>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              underline="hover"
              sx={{
                color: 'text.secondary',
                fontSize: 12,
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AppShellFooter;
