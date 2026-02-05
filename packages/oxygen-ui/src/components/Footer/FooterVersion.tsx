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
 * Styled version text.
 */
const StyledVersion = styled(Typography, {
  name: 'MuiFooter',
  slot: 'Version',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.disabled,
  fontFamily: 'monospace',
  fontSize: 11,
}));

/**
 * Props for the FooterVersion component.
 */
export interface FooterVersionProps {
  /** Version text to display */
  children: React.ReactNode;
}

/**
 * FooterVersion - Version display for the footer.
 *
 * Usage:
 * ```tsx
 * <Footer.Version>v2.1.0</Footer.Version>
 * ```
 */
export const FooterVersion: React.FC<FooterVersionProps> = ({ children }) => {
  return <StyledVersion variant="caption">{children}</StyledVersion>;
};

export default FooterVersion;
