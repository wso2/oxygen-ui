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
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useUserMenu } from './UserMenuContext';

/**
 * Props for the UserMenu.Trigger component.
 */
export interface UserMenuTriggerProps {
  /** User display name */
  name: string;
  /** Avatar image URL (if null, falls back to initials) */
  avatar?: string | null;
  /** Whether to show the name text after the avatar */
  showName?: boolean;
}

/**
 * Styled avatar button for the user menu trigger.
 */
const StyledTrigger = styled(IconButton, {  name: 'MuiUserMenu',
  slot: 'Trigger',
})<{ showName?: boolean }>(({ theme, showName }) => ({
  padding: theme.spacing(0.5),
  gap: theme.spacing(1),
  ...(showName && {
    paddingRight: theme.spacing(1.5),
    borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius * 2 : theme.spacing(2),
  }),
}));

/**
 * Styled avatar for the user menu.
 */
const StyledAvatar = styled(Avatar, {
  name: 'MuiUserMenu',
  slot: 'Avatar',
})(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: (theme.vars || theme).palette.primary.main,
  color: (theme.vars || theme).palette.primary.contrastText,
  fontSize: 14,
  fontWeight: 600,
}));

/**
 * Styled name text.
 */
const StyledNameText = styled('span', {
  name: 'MuiUserMenu',
  slot: 'NameText',
})(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: (theme.vars || theme).palette.text.primary,
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

/**
 * UserMenu.Trigger - Avatar button that opens the menu.
 */
export const UserMenuTrigger: React.FC<UserMenuTriggerProps> = ({ name, avatar, showName = false }) => {
  const { open, handleOpen } = useUserMenu();

  return (
    <Tooltip title="Account">
      <StyledTrigger
        onClick={handleOpen}
        size="small"
        showName={showName}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <StyledAvatar src={avatar || undefined} alt={name}>
          {!avatar && name.charAt(0)}
        </StyledAvatar>
        {showName && <StyledNameText>{name}</StyledNameText>}
      </StyledTrigger>
    </Tooltip>
  );
};
