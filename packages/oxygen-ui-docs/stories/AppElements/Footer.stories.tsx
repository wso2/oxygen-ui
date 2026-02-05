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
import type { Meta, StoryObj } from '@storybook/react';
import { Footer, Box } from '@wso2/oxygen-ui';

/**
 * Footer is a compound component for displaying application footer with copyright,
 * legal links, and version information.
 */
const meta: Meta<typeof Footer> = {
  title: 'App Elements/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Footer component displays copyright information and legal links at the bottom of the application.

### Features
- Compound component pattern for flexible composition
- Copyright text element
- Version display element
- Link elements for legal and custom links
- Divider elements for visual separation
- Responsive layout (stacks on mobile)
- Auto-organizes left (Copyright/Version/Divider) and right (Links) sections

### Usage
\`\`\`tsx
import { Footer } from '@wso2/oxygen-ui';

<Footer>
  <Footer.Copyright>© 2024 Your Company. All rights reserved.</Footer.Copyright>
  <Footer.Divider />
  <Footer.Version>v2.1.0</Footer.Version>
  <Footer.Link href="/terms">Terms & Conditions</Footer.Link>
  <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
  <Footer.Link href="/docs">Documentation</Footer.Link>
</Footer>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

/**
 * Basic footer with copyright and legal links.
 */
export const Default: Story = {
  render: () => (
    <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1 }} />
      <Footer>
        <Footer.Copyright>© {new Date().getFullYear()} Your Company. All rights reserved.</Footer.Copyright>
        <Footer.Link href="#terms">Terms & Conditions</Footer.Link>
        <Footer.Link href="#privacy">Privacy Policy</Footer.Link>
      </Footer>
    </Box>
  ),
};

/**
 * Footer with version number.
 */
export const WithVersion: Story = {
  render: () => (
    <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1 }} />
      <Footer>
        <Footer.Copyright>© {new Date().getFullYear()} Oxygen UI. All rights reserved.</Footer.Copyright>
        <Footer.Divider />
        <Footer.Version>v2.1.0</Footer.Version>
        <Footer.Link href="#terms">Terms & Conditions</Footer.Link>
        <Footer.Link href="#privacy">Privacy Policy</Footer.Link>
      </Footer>
    </Box>
  ),
};

/**
 * Footer with custom links.
 */
export const WithCustomLinks: Story = {
  render: () => (
    <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1 }} />
      <Footer>
        <Footer.Copyright>© {new Date().getFullYear()} Acme Corporation. All rights reserved.</Footer.Copyright>
        <Footer.Link href="/terms">Terms & Conditions</Footer.Link>
        <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
        <Footer.Link href="/docs">Documentation</Footer.Link>
        <Footer.Link href="/status">Status</Footer.Link>
        <Footer.Link href="/support">Support</Footer.Link>
      </Footer>
    </Box>
  ),
};

/**
 * Complete footer with all options.
 */
export const Complete: Story = {
  render: () => (
    <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1 }} />
      <Footer>
        <Footer.Copyright>© 2025 WSO2 LLC. All rights reserved.</Footer.Copyright>
        <Footer.Divider />
        <Footer.Version>v3.0.0-beta.1</Footer.Version>
        <Footer.Link href="https://wso2.com/terms">Terms & Conditions</Footer.Link>
        <Footer.Link href="https://wso2.com/privacy">Privacy Policy</Footer.Link>
        <Footer.Link href="https://docs.wso2.com">Documentation</Footer.Link>
        <Footer.Link href="https://github.com/wso2">GitHub</Footer.Link>
      </Footer>
    </Box>
  ),
};

/**
 * Minimal footer with just copyright.
 */
export const Minimal: Story = {
  render: () => (
    <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1 }} />
      <Footer>
        <Footer.Copyright>Made with love by the Oxygen UI team</Footer.Copyright>
      </Footer>
    </Box>
  ),
};

/**
 * Footer without divider.
 */
export const WithoutDivider: Story = {
  render: () => (
    <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1 }} />
      <Footer>
        <Footer.Copyright>© {new Date().getFullYear()} Your Company. All rights reserved.</Footer.Copyright>
        <Footer.Version>v2.1.0</Footer.Version>
        <Footer.Link href="#terms">Terms & Conditions</Footer.Link>
        <Footer.Link href="#privacy">Privacy Policy</Footer.Link>
      </Footer>
    </Box>
  ),
};
