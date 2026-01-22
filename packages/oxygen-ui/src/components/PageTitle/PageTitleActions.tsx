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

/**
 * Props for the PageTitleActions component
 */
export interface PageTitleActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The action elements (buttons, switches, etc.)
   */
  children: React.ReactNode;
}

/**
 * Styled container for PageTitle actions
 */
const PageTitleActionsRoot = styled('div', {
  name: 'MuiPageTitle',
  slot: 'Actions',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginLeft: 'auto',
}));

/**
 * PageTitleActions component for rendering action elements in PageTitle
 * 
 * @example
 * ```tsx
 * <PageTitle>
 *   <PageTitle.Header>My Page</PageTitle.Header>
 *   <PageTitle.Actions>
 *     <Button>Action 1</Button>
 *     <Button>Action 2</Button>
 *   </PageTitle.Actions>
 * </PageTitle>
 * ```
 */
const PageTitleActions: React.FC<PageTitleActionsProps> = ({ children, ...props }) => {
  return <PageTitleActionsRoot {...props}>{children}</PageTitleActionsRoot>;
};

PageTitleActions.displayName = 'PageTitle.Actions';

export default PageTitleActions;
