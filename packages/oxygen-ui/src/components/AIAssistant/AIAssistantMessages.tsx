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
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { styled, keyframes } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Sparkles } from '@wso2/oxygen-ui-icons-react';
import { useAIAssistant } from './context';
import { AIAssistantMessage } from './AIAssistantMessage';
import { AIAssistantSuggestions } from './AIAssistantSuggestions';

const bounceAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
`;

export interface AIAssistantMessagesProps {
  /** Custom styles */
  sx?: SxProps<Theme>;
  /** Optional custom empty state override */
  emptyState?: React.ReactNode;
}

const MessagesRoot = styled(Box, {
  name: 'MuiAIAssistantMessages',
  slot: 'Root',
})(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: theme.spacing(1.2, 1.8),
  borderRadius: 12,
  width: 'fit-content',
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : theme.palette.grey[100],
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
}));

const Dot = styled('span')(({ theme }) => ({
  width: 6,
  height: 6,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  display: 'inline-block',
  animation: `${bounceAnimation} 1.4s infinite ease-in-out both`,
  '&:nth-of-type(1)': {
    animationDelay: '-0.32s',
  },
  '&:nth-of-type(2)': {
    animationDelay: '-0.16s',
  },
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  margin: 'auto 0',
  padding: theme.spacing(3, 1),
}));

export const AIAssistantMessages: React.FC<AIAssistantMessagesProps> = ({ sx, emptyState }) => {
  const { messages, isGenerating, suggestions } = useAIAssistant();
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const isEmpty = messages.length === 0;

  return (
    <MessagesRoot sx={sx} data-testid="ai-assistant-messages">
      {isEmpty &&
        (emptyState || (
          <EmptyStateContainer>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                mb: 2,
                backgroundColor: 'rgba(255, 115, 0, 0.1)',
                color: 'primary.main',
              }}
            >
              <Sparkles size={26} />
            </Avatar>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              How can I help you today?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, mb: 3 }}>
              Ask questions about your WSO2 integrations, troubleshoot deployment logs, or generate
              OpenAPI specs and code.
            </Typography>

            {suggestions && suggestions.length > 0 && (
              <Box sx={{ width: '100%', maxWidth: 360, textAlign: 'left' }}>
                <AIAssistantSuggestions items={suggestions} title="Suggested prompts" />
              </Box>
            )}
          </EmptyStateContainer>
        ))}

      {messages.map((message) => (
        <AIAssistantMessage key={message.id} message={message} />
      ))}

      {isGenerating && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sx={{
              width: 28,
              height: 28,
              backgroundColor: 'rgba(255, 115, 0, 0.1)',
              color: 'primary.main',
            }}
          >
            <Sparkles size={16} />
          </Avatar>
          <TypingIndicator aria-label="AI is generating response">
            <Dot />
            <Dot />
            <Dot />
          </TypingIndicator>
        </Stack>
      )}

      <div ref={bottomRef} />
    </MessagesRoot>
  );
};

AIAssistantMessages.displayName = 'AIAssistantMessages';

export default AIAssistantMessages;
