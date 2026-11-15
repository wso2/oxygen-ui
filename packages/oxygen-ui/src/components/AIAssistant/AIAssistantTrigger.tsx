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
import { styled, keyframes } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import type { SxProps, Theme } from '@mui/material/styles';
import { Sparkles } from '@wso2/oxygen-ui-icons-react';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 115, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 115, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 115, 0, 0);
  }
`;

export interface AIAssistantTriggerProps {
  /** Callback fired when the trigger button is clicked */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether the assistant is currently open */
  open?: boolean;
  /** Variant of the trigger button: 'fab' (floating) or 'icon' (header / toolbar) */
  variant?: 'fab' | 'icon';
  /** Accessible label for the button */
  'aria-label'?: string;
  /** Tooltip text displayed on hover */
  tooltip?: string;
  /** Whether to show a pulse animation indicating active/ready status */
  pulse?: boolean;
  /** Custom sx styles */
  sx?: SxProps<Theme>;
}

const StyledFab = styled(Fab, {
  name: 'MuiAIAssistantTrigger',
  slot: 'Root',
})<{ ownerState: { pulse?: boolean } }>(({ theme, ownerState }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: theme.zIndex.speedDial,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #FF7300 0%, #E65100 100%)'
    : 'linear-gradient(135deg, #FF7300 0%, #F57C00 100%)',
  color: '#FFFFFF',
  '&:hover': {
    background: 'linear-gradient(135deg, #F57C00 0%, #D84315 100%)',
  },
  ...(ownerState.pulse && {
    animation: `${pulseAnimation} 2s infinite`,
  }),
}));

const StyledIconButton = styled(IconButton, {
  name: 'MuiAIAssistantTrigger',
  slot: 'IconButton',
})<{ ownerState: { open?: boolean } }>(({ theme, ownerState }) => ({
  color: ownerState.open ? theme.palette.primary.main : theme.palette.text.secondary,
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const AIAssistantTrigger = React.forwardRef<HTMLButtonElement, AIAssistantTriggerProps>(
  (props, ref) => {
    const {
      onClick,
      open = false,
      variant = 'fab',
      'aria-label': ariaLabel = 'Open AI Assistant',
      tooltip = 'Ask AI Assistant',
      pulse = true,
      sx,
      ...rest
    } = props;

    const buttonContent = (
      <Badge
        color="secondary"
        variant="dot"
        invisible={!pulse || open}
      >
        <Sparkles size={variant === 'fab' ? 24 : 20} />
      </Badge>
    );

    const triggerElement =
      variant === 'fab' ? (
        <StyledFab
          ref={ref}
          aria-label={ariaLabel}
          aria-expanded={open}
          color="primary"
          onClick={onClick}
          ownerState={{ pulse: pulse && !open }}
          sx={sx}
          {...rest}
        >
          {buttonContent}
        </StyledFab>
      ) : (
        <StyledIconButton
          ref={ref}
          aria-label={ariaLabel}
          aria-expanded={open}
          onClick={onClick}
          ownerState={{ open }}
          sx={sx}
          {...rest}
        >
          {buttonContent}
        </StyledIconButton>
      );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} placement="left">
          {triggerElement}
        </Tooltip>
      );
    }

    return triggerElement;
  }
);

AIAssistantTrigger.displayName = 'AIAssistantTrigger';

export default AIAssistantTrigger;
