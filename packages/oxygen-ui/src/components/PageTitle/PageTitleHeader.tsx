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
import Typography, { TypographyProps } from '@mui/material/Typography';

/**
 * Props for the PageTitle Header component
 */
export interface PageTitleHeaderProps extends TypographyProps {
  /**
   * The content of the header
   */
  children: React.ReactNode;
}

/**
 * Styled Header component for PageTitle
 */
const PageTitleHeaderStyled = styled(Typography, {
  name: 'MuiPageTitle',
  slot: 'Header',
})<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.5rem',
  lineHeight: 1.334,
  letterSpacing: '0em',
  color: theme.palette.text.primary,
}));

/**
 * PageTitle Header component
 */
const PageTitleHeader: React.FC<PageTitleHeaderProps> = ({ children, variant = 'h4', ...props }) => {
  return (
    <PageTitleHeaderStyled variant={variant} {...props}>
      {children}
    </PageTitleHeaderStyled>
  );
};

PageTitleHeader.displayName = 'PageTitle.Header';

export default PageTitleHeader;
