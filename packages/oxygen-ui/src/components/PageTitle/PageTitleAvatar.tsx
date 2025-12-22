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
import Avatar, { AvatarProps } from '@mui/material/Avatar';

/**
 * Props for the PageTitle Avatar component
 */
export interface PageTitleAvatarProps extends AvatarProps {
  /**
   * The content of the avatar (typically an image or icon)
   */
  children?: React.ReactNode;
}

/**
 * Styled Avatar component for PageTitle
 */
const PageTitleAvatarStyled = styled(Avatar, {
  name: 'MuiPageTitle',
  slot: 'Avatar',
})(({ theme }) => ({
  width: 55,
  height: 55,
  marginRight: theme.spacing(2),
}));

/**
 * PageTitle Avatar component
 */
const PageTitleAvatar: React.FC<PageTitleAvatarProps> = ({ children, ...props }) => {
  return <PageTitleAvatarStyled {...props}>{children}</PageTitleAvatarStyled>;
};

PageTitleAvatar.displayName = 'PageTitle.Avatar';

export default PageTitleAvatar;
