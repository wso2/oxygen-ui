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

import { ReactNode, ReactElement } from 'react';
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import ComplexSelectMenuItemAvatar from './ComplexSelectMenuItemAvatar';
import ComplexSelectMenuItemText from './ComplexSelectMenuItemText';
import ComplexSelectMenuItemIcon from './ComplexSelectMenuItemIcon';

const StyledMenuItem = styled(MuiMenuItem, {
  name: 'MuiComplexSelectMenuItem',
  slot: 'Root',
})(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.08)`
      : theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`
      : theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.16)`
        : theme.palette.action.selected,
    },
  },
}));

export interface ComplexSelectMenuItemProps extends MenuItemProps {
  children: ReactNode;
}

interface ComplexSelectMenuItemComponent {
  (props: ComplexSelectMenuItemProps): ReactElement;
  Avatar: typeof ComplexSelectMenuItemAvatar;
  Text: typeof ComplexSelectMenuItemText;
  Icon: typeof ComplexSelectMenuItemIcon;
}

export const ComplexSelectMenuItem: ComplexSelectMenuItemComponent = Object.assign(
  ({ children, ...props }: ComplexSelectMenuItemProps) => {
    return <StyledMenuItem {...props}>{children}</StyledMenuItem>;
  },
  {
    Avatar: ComplexSelectMenuItemAvatar,
    Text: ComplexSelectMenuItemText,
    Icon: ComplexSelectMenuItemIcon,
  }
);

export default ComplexSelectMenuItem;
