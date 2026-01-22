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
import type { SxProps, Theme } from '@mui/material';
import PageTitleHeader from './PageTitleHeader';
import PageTitleSubHeader from './PageTitleSubHeader';
import PageTitleAvatar from './PageTitleAvatar';
import PageTitleLink from './PageTitleLink';
import PageTitleActions from './PageTitleActions';
import PageTitleBackButton from './PageTitleBackButton';

/**
 * Props for the PageTitle root component
 */
export interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the page title (can include Avatar, Header, SubHeader, and Link)
   */
  children: React.ReactNode;
  /**
   * The sx prop for styling with Material-UI system
   */
  sx?: SxProps<Theme>;
}

/**
 * Styled root container for PageTitle
 */
const PageTitleRoot = styled('div', {
  name: 'MuiPageTitle',
  slot: 'Root',
})(({ theme }) => ({
  marginBottom: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
}));

/**
 * Styled row 1 container for BackButton
 */
const PageTitleRow1 = styled('div', {
  name: 'MuiPageTitle',
  slot: 'Row1',
})();

/**
 * Styled row 2 container for Avatar, Content, and Actions
 */
const PageTitleRow2 = styled('div', {
  name: 'MuiPageTitle',
  slot: 'Row2',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100%',
}));

/**
 * Styled left column for Avatar and Content
 */
const PageTitleColumnLeft = styled('div', {
  name: 'MuiPageTitle',
  slot: 'ColumnLeft',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  '&:has(> [class*="Column1"] > *)': {
    gap: theme.spacing(2),
  },
}));

/**
 * Styled column 1 for Avatar
 */
const PageTitleColumn1 = styled('div', {
  name: 'MuiPageTitle',
  slot: 'Column1',
})();

/**
 * Styled column 2 for Content (Header, SubHeader, Link)
 */
const PageTitleColumn2 = styled('div', {
  name: 'MuiPageTitle',
  slot: 'Column2',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  flex: 1,
}));

/**
 * Styled right column for Actions
 */
const PageTitleColumnRight = styled('div', {
  name: 'MuiPageTitle',
  slot: 'ColumnRight',
})();

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
 * 
 * @example With Actions
 * ```tsx
 * <PageTitle>
 *   <PageTitle.Header>Dashboard</PageTitle.Header>
 *   <PageTitle.Actions>
 *     <Button>Action 1</Button>
 *     <Button>Action 2</Button>
 *   </PageTitle.Actions>
 * </PageTitle>
 * ```
 * 
 * @example With BackButton
 * ```tsx
 * <PageTitle>
 *   <Link to="/back">
 *     <PageTitle.BackButton />
 *   </Link>
 *   <PageTitle.Avatar>A</PageTitle.Avatar>
 *   <PageTitle.Header>Page Title</PageTitle.Header>
 * </PageTitle>
 * ```
 * 
 * @example With BackButton and custom text
 * ```tsx
 * <Link to="/back">
 *   <PageTitle.BackButton>Go Back</PageTitle.BackButton>
 * </Link>
 * ```
 */
const PageTitle: React.FC<PageTitleProps> & {
  Avatar: typeof PageTitleAvatar;
  Header: typeof PageTitleHeader;
  SubHeader: typeof PageTitleSubHeader;
  Link: typeof PageTitleLink;
  Actions: typeof PageTitleActions;
  BackButton: typeof PageTitleBackButton;
} = ({ children, sx, ...props }) => {
  // Separate Avatar, BackButton, and Actions from other children
  const childrenArray = React.Children.toArray(children);
  
  const avatar = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === PageTitleAvatar
  );
  
  const actions = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === PageTitleActions
  );
  
  // Find BackButton or Link wrapping BackButton
  let backButtonElement: React.ReactNode = null;
  childrenArray.forEach((child) => {
    if (React.isValidElement(child)) {
      if (child.type === PageTitleBackButton) {
        backButtonElement = child;
      }
      // Check if this is a Link wrapping BackButton
      if (
        child.props &&
        typeof child.props === 'object' &&
        'children' in child.props &&
        React.isValidElement(child.props.children)
      ) {
        if (child.props.children.type === PageTitleBackButton) {
          backButtonElement = child;
        }
      }
    }
  });
  
  const otherChildren = childrenArray.filter(
    (child) => {
      if (!React.isValidElement(child)) {
        return true;
      }
      
      // Exclude Avatar, Actions, and BackButton
      if (child.type === PageTitleAvatar || 
          child.type === PageTitleActions || 
          child.type === PageTitleBackButton) {
        return false;
      }
      
      // Exclude Links wrapping BackButton
      if (
        child.props &&
        typeof child.props === 'object' &&
        'children' in child.props &&
        React.isValidElement((child.props as { children?: React.ReactNode }).children)
      ) {
        const childrenProp = (child.props as { children?: React.ReactNode }).children;
        if (
          React.isValidElement(childrenProp) &&
          childrenProp.type === PageTitleBackButton
        ) {
          return false;
        }
      }
      
      return true;
    }
  );

  return (
    <PageTitleRoot sx={sx} {...props}>
      {backButtonElement && (
        <PageTitleRow1>
          {backButtonElement}
        </PageTitleRow1>
      )}
      <PageTitleRow2>
        <PageTitleColumnLeft>
          <PageTitleColumn1>
            {avatar}
          </PageTitleColumn1>
          <PageTitleColumn2>
            {otherChildren}
          </PageTitleColumn2>
        </PageTitleColumnLeft>
        <PageTitleColumnRight>
          {actions}
        </PageTitleColumnRight>
      </PageTitleRow2>
    </PageTitleRoot>
  );
};

PageTitle.Avatar = PageTitleAvatar;
PageTitle.Header = PageTitleHeader;
PageTitle.SubHeader = PageTitleSubHeader;
PageTitle.Link = PageTitleLink;
PageTitle.Actions = PageTitleActions;
PageTitle.BackButton = PageTitleBackButton;
PageTitle.Link = PageTitleLink;
PageTitle.displayName = 'PageTitle';

export default PageTitle;
