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

import React from 'react';
import { Card, ButtonBase, Box, styled, BoxProps } from '@mui/material';

export interface CardButtonProps extends CardProps {
  alignItems?: 'flex-start' | 'center' | 'flex-end'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  selected?: boolean
}

type CardProps = React.ComponentProps<typeof Card>

interface StyledCardButtonProps extends Omit<CardProps, 'selected' | 'disabled'> {
  selected?: boolean
  disabled?: boolean
  alignItems?: 'flex-start' | 'center' | 'flex-end'
  component?: React.ElementType
}

const StyledCardButton = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'disabled',
})<StyledCardButtonProps>(({ theme, selected, disabled, alignItems = 'flex-start' }) => ({
  flexDirection: 'column',
  alignItems: alignItems,
  display: 'flex',
  textAlign: 'left',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  "&.MuiCard-root": {
    backgroundColor: selected ? "background.paper" : 'background.default',
    borderColor: selected && theme.palette.primary.main,
  },
  '.creation-flow-card-actions': {
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    '.creation-flow-card-actions': {
      opacity: disabled ? 0 : 1,
    },
    ...(!disabled && {
      borderColor: theme.palette.primary.main,
      boxShadow: theme.shadows[1],
    }),
  },
}));

export const CardButton = (props: CardButtonProps) => {
  const { disabled, selected, alignItems = 'flex-start', ...rest } = props;

  return (
    <StyledCardButton
      alignItems={alignItems}
      component={ButtonBase}
      selected={selected}
      disabled={disabled}
      {...rest}
    />
  );
};


export const DisappearingCardButtonContent = (props: BoxProps) => (
  <Box className="creation-flow-card-actions" {...props} />
);

export {CardHeader, CardContent, CardActions, CardMedia} from "@mui/material";