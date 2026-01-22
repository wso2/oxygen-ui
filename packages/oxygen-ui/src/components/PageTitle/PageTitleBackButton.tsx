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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowLeft } from '@wso2/oxygen-ui-icons-react';

/**
 * Props for the PageTitleBackButton component
 */
import type { ButtonProps } from '@mui/material/Button';

export interface PageTitleBackButtonProps extends Omit<ButtonProps, 'component'> {
  /**
   * The text to display for the back button. Defaults to "Back"
   */
  children?: React.ReactNode;
  /**
   * Custom component to use as wrapper (e.g., React Router Link)
   * Can be a component class or a React element
   * 
   * @example
   * // With React element
   * component={<Link to="/path" />}
   */
  component?: React.ComponentType<{ children: React.ReactNode; style?: React.CSSProperties }> | 
    React.ReactElement<{ children?: React.ReactNode }>;
}

/**
 * Styled container for PageTitle back button
 */
const PageTitleBackButtonRoot = styled('div', {
  name: 'MuiPageTitle',
  slot: 'BackButton',
})();

/**
 * PageTitleBackButton component for rendering a back button in PageTitle
 * 
 * Supports multiple usage patterns:
 * 1. Standalone - requires parent to handle navigation
 * 2. With component class - pass Link component and `to` prop separately
 * 3. With React element - pass configured Link element with `to` prop
 * 
 * @example
 * ```tsx
 * // With component class (React Router v7+)
 * import { Link } from 'react-router'
 * 
 * <PageTitle>
 *   <PageTitle.BackButton component={Link} to="/analytics" />
 *   <PageTitle.Header>My Page</PageTitle.Header>
 * </PageTitle>
 * ```
 * 
 * @example With React element
 * ```tsx
 * import { Link } from 'react-router'
 * 
 * <PageTitle.BackButton component={<Link to="/analytics" />} />
 * ```
 * 
 * @example With custom text
 * ```tsx
 * <PageTitle.BackButton component={<Link to="/back" />}>
 *   Go Back
 * </PageTitle.BackButton>
 * ```
 * 
 * @example Standalone (manual Link wrapping)
 * ```tsx
 * <Link to="/analytics">
 *   <PageTitle.BackButton />
 * </Link>
 * ```
 */
const PageTitleBackButton: React.FC<PageTitleBackButtonProps> = ({ 
  children = 'Back', 
  component: Component,
  ...props 
}) => {
  const button = (
    <Button 
      variant="text" 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginLeft: '-10px',
        textDecoration: 'none',
      }}
      {...props}
    >
      <ArrowLeft size={20} />
      <Typography variant="body2">{children}</Typography>
    </Button>
  );

  // If component is a React element, clone it with button as children
  if (React.isValidElement(Component)) {
    return (
      <PageTitleBackButtonRoot>
        {React.cloneElement(Component as React.ReactElement<Record<string, unknown>>, 
            { style: { textDecoration: 'none' } }, button)}
      </PageTitleBackButtonRoot>
    );
  }

  // If component is a component class, wrap button with it
  if (Component) {
    const WrapperComponent = Component as React.ComponentType<{
        children: React.ReactNode;
        style?: React.CSSProperties
    }>;

    return (
      <PageTitleBackButtonRoot>
        <WrapperComponent style={{ textDecoration: 'none' }}>
          {button}
        </WrapperComponent>
      </PageTitleBackButtonRoot>
    );
  }

  // Standalone button
  return (
    <PageTitleBackButtonRoot>
      {button}
    </PageTitleBackButtonRoot>
  );
};

PageTitleBackButton.displayName = 'PageTitle.BackButton';

export default PageTitleBackButton;
