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
import PageTitleHeader from './PageTitleHeader';
import PageTitleSubHeader from './PageTitleSubHeader';
import PageTitleAvatar from './PageTitleAvatar';
import PageTitleLink from './PageTitleLink';

/**
 * Props for the PageTitle root component
 */
export interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the page title (can include Avatar, Header, SubHeader, and Link)
   */
  children: React.ReactNode;
}

/**
 * Styled root container for PageTitle
 */
const PageTitleRoot = styled('div', {
  name: 'MuiPageTitle',
  slot: 'Root',
})(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'flex-start',
  gap: 0,
}));

/**
 * Styled content container for PageTitle text elements
 */
const PageTitleContent = styled('div', {
  name: 'MuiPageTitle',
  slot: 'Content',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  flex: 1,
}));

/**
 * PageTitle component with compound pattern support
 * 
 * @example
 * ```tsx
 * <PageTitle>
 *   <PageTitle.Avatar src="/avatar.png" />
 *   <PageTitle.Header>Welcome</PageTitle.Header>
 *   <PageTitle.SubHeader>Get started with your dashboard</PageTitle.SubHeader>
 *   <PageTitle.Link href="/docs" icon={<LinkIcon />}>View Documentation</PageTitle.Link>
 * </PageTitle>
 * ```
 */
const PageTitle: React.FC<PageTitleProps> & {
  Avatar: typeof PageTitleAvatar;
  Header: typeof PageTitleHeader;
  SubHeader: typeof PageTitleSubHeader;
  Link: typeof PageTitleLink;
} = ({ children, ...props }) => {
  // Separate Avatar from other children
  const childrenArray = React.Children.toArray(children);
  const avatar = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === PageTitleAvatar
  );
  const otherChildren = childrenArray.filter(
    (child) => !React.isValidElement(child) || child.type !== PageTitleAvatar
  );

  return (
    <PageTitleRoot {...props}>
      {avatar}
      <PageTitleContent>{otherChildren}</PageTitleContent>
    </PageTitleRoot>
  );
};

PageTitle.Avatar = PageTitleAvatar;
PageTitle.Header = PageTitleHeader;
PageTitle.SubHeader = PageTitleSubHeader;
PageTitle.Link = PageTitleLink;
PageTitle.displayName = 'PageTitle';

export default PageTitle;
