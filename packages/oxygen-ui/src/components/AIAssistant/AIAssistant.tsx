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
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import type { AIAssistantProps } from './types';
import { AIAssistantContext } from './context';
import { AIAssistantHeader } from './AIAssistantHeader';
import { AIAssistantMessages } from './AIAssistantMessages';
import { AIAssistantMessage } from './AIAssistantMessage';
import { AIAssistantThought } from './AIAssistantThought';
import { AIAssistantSuggestions } from './AIAssistantSuggestions';
import { AIAssistantPromptInput } from './AIAssistantPromptInput';
import { AIAssistantTrigger } from './AIAssistantTrigger';

interface AIAssistantDrawerProps {
  ownerState: {
    width: number;
  };
}

const StyledDrawer = styled(Drawer, {
  name: 'MuiAIAssistant',
  slot: 'Drawer',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<AIAssistantDrawerProps>(({ theme, ownerState }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: ownerState.width,
    },
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[16],
  },
}));

const FloatingPaper = styled(Paper, {
  name: 'MuiAIAssistant',
  slot: 'Floating',
})<{ ownerState: { width: number } }>(({ theme, ownerState }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  width: `calc(100vw - ${theme.spacing(6)})`,
  [theme.breakpoints.up('sm')]: {
    width: ownerState.width,
  },
  height: 600,
  maxHeight: `calc(100vh - ${theme.spacing(12)})`,
  display: 'flex',
  flexDirection: 'column',
  zIndex: theme.zIndex.speedDial + 1,
  boxShadow: theme.shadows[20],
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

const InlinePaper = styled(Paper, {
  name: 'MuiAIAssistant',
  slot: 'Inline',
})(({ theme }) => ({
  width: '100%',
  height: 600,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

interface AIAssistantComponent
  extends React.ForwardRefExoticComponent<
    AIAssistantProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: typeof AIAssistantHeader;
  Messages: typeof AIAssistantMessages;
  Message: typeof AIAssistantMessage;
  Thought: typeof AIAssistantThought;
  Suggestions: typeof AIAssistantSuggestions;
  PromptInput: typeof AIAssistantPromptInput;
  Trigger: typeof AIAssistantTrigger;
}

export const AIAssistant = React.forwardRef<HTMLDivElement, AIAssistantProps>((props, ref) => {
  const {
    open = false,
    onClose,
    mode = 'drawer',
    anchor = 'right',
    width = 440,
    sx,
    title = 'AI Assistant',
    subtitle,
    model,
    models,
    onModelChange,
    messages = [],
    onSendMessage,
    onStopStreaming,
    onClearHistory,
    onFeedback,
    onRetry,
    isGenerating = false,
    suggestions,
    activeContext,
    children,
    'aria-label': ariaLabel = 'AI Assistant',
  } = props;

  const [announcement, setAnnouncement] = React.useState('');

  const announce = React.useCallback((text: string) => {
    setAnnouncement(text);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      open,
      mode,
      title,
      subtitle,
      activeContext,
      model,
      models,
      onModelChange,
      messages,
      isGenerating,
      onClose,
      onSendMessage,
      onStopStreaming,
      onClearHistory,
      onFeedback,
      onRetry,
      suggestions,
      announce,
    }),
    [
      open,
      mode,
      title,
      subtitle,
      activeContext,
      model,
      models,
      onModelChange,
      messages,
      isGenerating,
      onClose,
      onSendMessage,
      onStopStreaming,
      onClearHistory,
      onFeedback,
      onRetry,
      suggestions,
      announce,
    ]
  );

  const defaultContent = (
    <>
      <AIAssistantHeader />
      <AIAssistantMessages />
      <AIAssistantPromptInput />
    </>
  );

  const innerContent = (
    <>
      <Box
        component="div"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        sx={visuallyHidden}
        data-testid="ai-assistant-live-region"
      >
        {announcement}
      </Box>
      {children || defaultContent}
    </>
  );

  const ownerState = { width };

  if (mode === 'floating') {
    if (!open) return null;
    return (
      <AIAssistantContext.Provider value={contextValue}>
        <FloatingPaper
          ref={ref}
          role="dialog"
          aria-label={ariaLabel}
          ownerState={ownerState}
          sx={sx}
          elevation={16}
        >
          {innerContent}
        </FloatingPaper>
      </AIAssistantContext.Provider>
    );
  }

  if (mode === 'inline') {
    return (
      <AIAssistantContext.Provider value={contextValue}>
        <InlinePaper
          ref={ref}
          role="region"
          aria-label={ariaLabel}
          sx={sx}
          elevation={0}
        >
          {innerContent}
        </InlinePaper>
      </AIAssistantContext.Provider>
    );
  }

  return (
    <AIAssistantContext.Provider value={contextValue}>
      <StyledDrawer
        ref={ref}
        anchor={anchor}
        open={open}
        onClose={onClose}
        ownerState={ownerState}
        sx={sx}
        variant="temporary"
        slotProps={{
          paper: {
            'aria-label': ariaLabel,
            role: 'dialog',
          },
        }}
      >
        {innerContent}
      </StyledDrawer>
    </AIAssistantContext.Provider>
  );
}) as AIAssistantComponent;

AIAssistant.Header = AIAssistantHeader;
AIAssistant.Messages = AIAssistantMessages;
AIAssistant.Message = AIAssistantMessage;
AIAssistant.Thought = AIAssistantThought;
AIAssistant.Suggestions = AIAssistantSuggestions;
AIAssistant.PromptInput = AIAssistantPromptInput;
AIAssistant.Trigger = AIAssistantTrigger;
AIAssistant.displayName = 'AIAssistant';

export default AIAssistant;
