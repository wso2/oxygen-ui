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
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

/**
 * Styled copyright text.
 */
const StyledCopyrightText = styled(Typography, {
  name: 'MuiFooter',
  slot: 'CopyrightText',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
}));

/**
 * Props for the FooterCopyright component.
 */
export interface FooterCopyrightProps {
  /** Copyright text to display */
  children: React.ReactNode;
}

/**
 * FooterCopyright - Copyright text for the footer.
 *
 * Usage:
 * ```tsx
 * <Footer.Copyright>
 *   © 2024 Your Company. All rights reserved.
 * </Footer.Copyright>
 * ```
 */
export const FooterCopyright: React.FC<FooterCopyrightProps> = ({ children }) => {
  return (
    <StyledCopyrightText variant="caption">
      {children}
    </StyledCopyrightText>
  );
};

export default FooterCopyright;
