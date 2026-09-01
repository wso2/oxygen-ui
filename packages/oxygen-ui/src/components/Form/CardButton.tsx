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
import { Card, Box, styled, BoxProps } from '@mui/material';

export interface CardButtonProps extends Omit<CardProps, 'component'> {
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
  overflow: 'hidden',
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
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

const isInteractiveDescendant = (target: HTMLElement, currentTarget: HTMLElement): boolean => {
  const interactiveElement = target.closest(
    'button, a, input, select, textarea, [role="button"], [role="link"]',
  );
  return !!interactiveElement && interactiveElement !== currentTarget;
};

export const CardButton = (props: CardButtonProps) => {
  const { disabled, selected, alignItems = 'flex-start', onClick, onKeyDown, ...rest } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (isInteractiveDescendant(event.target as HTMLElement, event.currentTarget)) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
    onKeyDown?.(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (isInteractiveDescendant(event.target as HTMLElement, event.currentTarget)) return;
    onClick?.();
  };

  return (
    <StyledCardButton
      alignItems={alignItems}
      component="div"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
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