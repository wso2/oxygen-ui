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
 * Props for the PageTitle SubHeader component
 */
export interface PageTitleSubHeaderProps extends TypographyProps {
  /**
   * The content of the subheader
   */
  children: React.ReactNode;
}

/**
 * Styled SubHeader component for PageTitle
 */
const PageTitleSubHeaderStyled = styled(Typography, {
  name: 'MuiPageTitle',
  slot: 'SubHeader',
})<TypographyProps>(({ theme }) => ({
  fontSize: '0.875rem',
  lineHeight: 1.43,
  letterSpacing: '0.01071em',
  color: theme.palette.text.secondary,
}));

/**
 * PageTitle SubHeader component
 */
const PageTitleSubHeader: React.FC<PageTitleSubHeaderProps> = ({ children, variant = 'body2', ...props }) => {
  return (
    <PageTitleSubHeaderStyled variant={variant} {...props}>
      {children}
    </PageTitleSubHeaderStyled>
  );
};

PageTitleSubHeader.displayName = 'PageTitle.SubHeader';

export default PageTitleSubHeader;
