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
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useHeader } from './context';

/**
 * Styled container for header switchers.
 */
const HeaderSwitchersRoot = styled(Box, {
  name: 'MuiHeader',
  slot: 'Switchers',
})(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

/**
 * Styled divider for switchers section.
 */
const HeaderSwitchersDivider = styled(Divider, {
  name: 'MuiHeader',
  slot: 'SwitchersDivider',
})(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

/**
 * Props for HeaderSwitchers component.
 */
export interface HeaderSwitchersProps {
  /** Switcher elements (org, project, environment) */
  children: React.ReactNode;
  /** Whether to show the leading divider */
  showDivider?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * HeaderSwitchers - Container for context switchers in the header.
 *
 * Provides a responsive container for organization, project, and environment
 * switchers. Hidden on mobile viewports and in minimal mode.
 *
 * Responsive behavior:
 * - Hidden on xs and sm (mobile/tablet)
 * - Visible from md up (desktop)
 *
 * Theme tokens used:
 * - `divider` - Vertical divider color
 */
export const HeaderSwitchers: React.FC<HeaderSwitchersProps> = ({
  children,
  showDivider = true,
  sx,
}) => {
  const { minimal } = useHeader();

  // Don't render in minimal mode
  if (minimal) {
    return null;
  }

  return (
    <HeaderSwitchersRoot sx={sx}>
      {showDivider && <HeaderSwitchersDivider orientation="vertical" flexItem />}
      {children}
    </HeaderSwitchersRoot>
  );
};

export default HeaderSwitchers;
