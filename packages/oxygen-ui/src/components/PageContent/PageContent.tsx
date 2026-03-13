/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import { Box, BoxProps } from '@mui/material';

/**
 * Props for the PageContent component
 */
export interface PageContentProps extends Omit<BoxProps, 'maxWidth'> {
  /**
   * The content to be rendered inside the page content container
   */
  children: React.ReactNode;
  /**
   * Maximum width of the content container
   * @default '1400px'
   */
  maxWidth?: string | number;
  /**
   * Whether to center the content horizontally
   * @default true
   */
  centered?: boolean;
  /**
   * Whether to use full width (overrides maxWidth)
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether to remove padding
   * @default false
   */
  noPadding?: boolean;
}

/**
 * Styled root container for PageContent - outer wrapper with scroll
 */
const PageContentRoot = styled(Box, {
  name: 'MuiPageContent',
  slot: 'Root',
})(() => ({
  width: '100%',
  overflow: 'auto',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

/**
 * Styled inner container for PageContent - applies sizing and layout
 */
const PageContentInner = styled(Box, {
  name: 'MuiPageContent',
  slot: 'Inner',
  shouldForwardProp: (prop) => prop !== 'maxWidth' && prop !== 'centered' && prop !== 'fullWidth' && prop !== 'noPadding',
})<PageContentProps>(({ theme, maxWidth = '1400px', centered = true, fullWidth = false, noPadding = false }) => ({
  width: '100%',
  ...(!fullWidth && { maxWidth }),
  ...(centered && { marginLeft: 'auto', marginRight: 'auto' }),
  ...(!noPadding && { padding: theme.spacing(8) }),
}));

/**
 * PageContent component - A container for page content with controllable max-width and centering
 * 
 * Provides a centered content area with a default max-width of 1400px and padding of 3.
 * The max-width can be customized and centering can be disabled if needed.
 * 
 * @example
 * ```tsx
 * // Default usage with 1400px max-width, centered, and padding
 * <PageContent>
 *   <YourContent />
 * </PageContent>
 * ```
 * 
 * @example
 * ```tsx
 * // Custom max-width
 * <PageContent maxWidth="1200px">
 *   <YourContent />
 * </PageContent>
 * ```
 * 
 * @example
 * ```tsx
 * // Full width
 * <PageContent fullWidth>
 *   <YourContent />
 * </PageContent>
 * ```
 * 
 * @example
 * ```tsx
 * // Not centered
 * <PageContent centered={false}>
 *   <YourContent />
 * </PageContent>
 * ```
 */
const PageContent: React.FC<PageContentProps> = ({
  children,
  maxWidth,
  centered,
  fullWidth,
  noPadding,
  ...props
}) => {
  return (
    <PageContentRoot>
      <PageContentInner
        maxWidth={maxWidth}
        centered={centered}
        fullWidth={fullWidth}
        noPadding={noPadding}
        {...props}
      >
        {children}
      </PageContentInner>
    </PageContentRoot>
  );
};

PageContent.displayName = 'PageContent';

export default PageContent;
