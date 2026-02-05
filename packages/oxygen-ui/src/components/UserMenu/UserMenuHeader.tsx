/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import type { UserMenuUser } from './UserMenu';

/**
 * Props for the UserMenu.Header component.
 */
export interface UserMenuHeaderProps {
  /** User display name */
  name: string;
  /** User email address */
  email: string;
  /** Avatar image URL (if null, falls back to initials) */
  avatar?: string | null;
  /** Role or plan badge (e.g., "Pro", "Admin") */
  role?: string;
}

/**
 * Styled header container box.
 */
const StyledHeaderBox = styled(Box, {
  name: 'MuiUserMenu',
  slot: 'HeaderBox',
})(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(1.5),
}));

/**
 * Styled header content wrapper.
 */
const StyledHeaderContent = styled(Box, {
  name: 'MuiUserMenu',
  slot: 'HeaderContent',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

/**
 * Styled large avatar for the menu header.
 */
const StyledHeaderAvatar = styled(Avatar, {
  name: 'MuiUserMenu',
  slot: 'HeaderAvatar',
})(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: (theme.vars || theme).palette.primary.main,
  color: (theme.vars || theme).palette.primary.contrastText,
  fontSize: 16,
  fontWeight: 600,
}));

/**
 * Styled user info container.
 */
const StyledUserInfo = styled(Box, {
  name: 'MuiUserMenu',
  slot: 'UserInfo',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
  flex: 1,
  minWidth: 0,
}));

/**
 * Styled user name row.
 */
const StyledNameRow = styled(Box, {
  name: 'MuiUserMenu',
  slot: 'NameRow',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

/**
 * Styled user name.
 */
const StyledName = styled(Typography, {
  name: 'MuiUserMenu',
  slot: 'Name',
})({
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/**
 * Styled role chip.
 */
const StyledRoleChip = styled(Chip, {
  name: 'MuiUserMenu',
  slot: 'RoleChip',
})({
  height: 20,
  fontSize: 11,
  fontWeight: 600,
});

/**
 * Styled email text.
 */
const StyledEmail = styled(Typography, {
  name: 'MuiUserMenu',
  slot: 'Email',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

/**
 * UserMenu.Header - User info section with name, email, and role badge.
 */
export const UserMenuHeader: React.FC<UserMenuHeaderProps> = ({ name, email, avatar, role }) => {
  return (
    <>
      <StyledHeaderBox>
        <StyledHeaderContent>
          <StyledHeaderAvatar src={avatar || undefined} alt={name}>
            {!avatar && name.charAt(0)}
          </StyledHeaderAvatar>
          <StyledUserInfo>
            <StyledNameRow>
              <StyledName variant="subtitle2">
                {name}
              </StyledName>
              {role && (
                <StyledRoleChip
                  label={role}
                  size="small"
                  color="primary"
                />
              )}
            </StyledNameRow>
            <StyledEmail variant="caption">
              {email}
            </StyledEmail>
          </StyledUserInfo>
        </StyledHeaderContent>
      </StyledHeaderBox>
      <Divider />
    </>
  );
};
