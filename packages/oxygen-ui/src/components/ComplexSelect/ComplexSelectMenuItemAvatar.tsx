/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com).
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

import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';

const StyledAvatar = styled(MuiAvatar, {
  name: 'MuiComplexSelectMenuItemAvatar',
  slot: 'Avatar',
})(({ theme }) => ({
  width: 28,
  height: 28,
  fontSize: '1rem',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const StyledListItemAvatar = styled(MuiListItemAvatar, {
  name: 'MuiComplexSelectMenuItemAvatar',
  slot: 'Root',
})({
  minWidth: 0,
  marginRight: 12,
});

export interface ComplexSelectMenuItemAvatarProps extends AvatarProps {
  children?: ReactNode;
}

export function ComplexSelectMenuItemAvatar({ children, ...props }: ComplexSelectMenuItemAvatarProps) {
  return (
    <StyledListItemAvatar>
      <StyledAvatar {...props}>{children}</StyledAvatar>
    </StyledListItemAvatar>
  );
}

export default ComplexSelectMenuItemAvatar;
