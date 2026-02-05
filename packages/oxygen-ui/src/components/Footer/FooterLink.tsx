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
import Link, { LinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';

/**
 * Styled footer link.
 */
const StyledLink = styled(Link, {
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
 * Props for the FooterLink component.
 */
export interface FooterLinkProps extends Omit<LinkProps, 'underline'> {
  /** Link text */
  children: React.ReactNode;
  /** Link URL */
  href: string;
}

/**
 * FooterLink - Link element for the footer.
 *
 * Usage:
 * ```tsx
 * <Footer.Link href="/terms">Terms & Conditions</Footer.Link>
 * ```
 */
export const FooterLink: React.FC<FooterLinkProps> = ({ children, href, ...props }) => {
  return (
    <StyledLink href={href} underline="hover" {...props}>
      {children}
    </StyledLink>
  );
};

FooterLink.displayName = 'Footer.Link';

export default FooterLink;
