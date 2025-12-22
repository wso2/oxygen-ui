/*
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { styled } from '@mui/material/styles';
import Link, { LinkProps } from '@mui/material/Link';
import Box from '@mui/material/Box';

/**
 * Props for the PageTitle Link component
 */
export interface PageTitleLinkProps extends LinkProps {
  /**
   * The content of the link
   */
  children: React.ReactNode;
  /**
   * Icon to display before the link text
   */
  icon?: React.ReactNode;
}

/**
 * Styled Link component for PageTitle
 */
const PageTitleLinkStyled = styled(Link, {
  name: 'MuiPageTitle',
  slot: 'Link',
})<LinkProps>(({ theme }) => ({
  fontSize: '0.875rem',
  lineHeight: 1.43,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  textDecoration: 'none',
  color: theme.palette.primary.main,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

/**
 * PageTitle Link component
 */
const PageTitleLink: React.FC<PageTitleLinkProps> = ({ children, icon, ...props }) => {
  return (
    <PageTitleLinkStyled {...props}>
      {icon && (
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', fontSize: '1rem' }}>
          {icon}
        </Box>
      )}
      {children}
    </PageTitleLinkStyled>
  );
};

PageTitleLink.displayName = 'PageTitle.Link';

export default PageTitleLink;
