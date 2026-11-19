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
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import {
  Sparkles,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Paperclip,
  ExternalLink,
} from '@wso2/oxygen-ui-icons-react';
import type { AIAssistantMessageItem } from './types';
import { AIAssistantThought } from './AIAssistantThought';
import { useAIAssistant } from './context';
import CodeBlock from '../CodeBlock';

export interface AIAssistantMessageProps {
  /** The message object to render */
  message: AIAssistantMessageItem;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

const MessageRoot = styled(Box, {
  name: 'MuiAIAssistantMessage',
  slot: 'Root',
})<{ ownerState: { role: string } }>(({ theme, ownerState }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2.5),
  alignItems: ownerState.role === 'user' ? 'flex-end' : 'flex-start',
}));

const MessageBubble = styled(Box, {
  name: 'MuiAIAssistantMessage',
  slot: 'Bubble',
})<{ ownerState: { role: string; error?: boolean } }>(({ theme, ownerState }) => ({
  maxWidth: '88%',
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  ...(ownerState.role === 'user'
    ? {
        backgroundColor: theme.palette.mode === 'dark' ? '#E65100' : '#FF7300',
        color: '#FFFFFF',
        borderBottomRightRadius: 4,
      }
    : {
        backgroundColor:
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : theme.palette.grey[100],
        color: theme.palette.text.primary,
        borderBottomLeftRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
      }),
  ...(ownerState.error && {
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(211, 47, 47, 0.1)' : '#FFEBEE',
  }),
}));

const AvatarBadge = styled(Avatar)<{ ownerState: { role: string } }>(({ theme, ownerState }) => ({
  width: 28,
  height: 28,
  backgroundColor:
    ownerState.role === 'user'
      ? theme.palette.primary.main
      : theme.palette.mode === 'dark'
      ? '#263238'
      : '#ECEFF1',
  color: ownerState.role === 'user' ? '#FFFFFF' : '#FF7300',
}));

/**
 * Splits message text into plain text chunks and fenced code blocks.
 */
function parseMessageContent(content: string) {
  const parts: Array<{ type: 'text' | 'code'; value: string; language?: string }> = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        value: content.slice(lastIndex, match.index),
      });
    }
    parts.push({
      type: 'code',
      language: match[1] || 'typescript',
      value: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      value: content.slice(lastIndex),
    });
  }

  return parts;
}

export const AIAssistantMessage: React.FC<AIAssistantMessageProps> = ({ message, sx }) => {
  const { onFeedback, onRetry, announce } = useAIAssistant();
  const [copied, setCopied] = React.useState(false);
  const [rated, setRated] = React.useState<'positive' | 'negative' | null>(null);

  const isUser = message.role === 'user';
  const parsedParts = React.useMemo(() => parseMessageContent(message.content), [message.content]);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        announce('Message copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback or ignore
    }
  };

  const handleRating = (rating: 'positive' | 'negative') => {
    setRated(rating);
    onFeedback?.(message.id, rating);
    announce(rating === 'positive' ? 'Rated response as helpful' : 'Rated response as unhelpful');
  };

  return (
    <MessageRoot ownerState={{ role: message.role }} sx={sx}>
      <Stack
        direction={isUser ? 'row-reverse' : 'row'}
        spacing={1}
        alignItems="flex-start"
        sx={{ width: '100%' }}
      >
        <AvatarBadge ownerState={{ role: message.role }}>
          {isUser ? <User size={16} /> : <Sparkles size={16} />}
        </AvatarBadge>

        <Box sx={{ maxWidth: '85%' }}>
          {/* Reasoning / Thought process if available */}
          {!isUser && message.thought && (
            <AIAssistantThought thought={message.thought} isThinking={message.isStreaming} />
          )}

          {/* Attachments preview */}
          {message.attachments && message.attachments.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 0.75 }}>
              {message.attachments.map((att) => (
                <Chip
                  key={att.id}
                  icon={<Paperclip size={12} />}
                  label={att.name}
                  size="small"
                  variant="outlined"
                  sx={{ height: 22, fontSize: '0.7rem' }}
                />
              ))}
            </Stack>
          )}

          <MessageBubble ownerState={{ role: message.role, error: message.error }}>
            {parsedParts.map((part, index) => {
              if (part.type === 'code') {
                return (
                  <Box key={index} sx={{ my: 1, borderRadius: 1, overflow: 'hidden' }}>
                    <CodeBlock
                      code={part.value}
                      language={part.language as any}
                      showLineNumbers={false}
                    />
                  </Box>
                );
              }
              return (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: 1.6,
                    color: 'inherit',
                  }}
                >
                  {part.value}
                </Typography>
              );
            })}
          </MessageBubble>

          {/* Citations / Sources */}
          {!isUser && message.citations && message.citations.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ mr: 1 }}>
                Sources:
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ display: 'inline-flex' }}>
                {message.citations.map((cite) => (
                  <Chip
                    key={cite.id}
                    label={cite.title}
                    size="small"
                    component={cite.url ? Link : 'div'}
                    {...(cite.url ? { href: cite.url, target: '_blank', rel: 'noopener' } : {})}
                    deleteIcon={cite.url ? <ExternalLink size={10} /> : undefined}
                    onDelete={cite.url ? () => {} : undefined}
                    sx={{ height: 20, fontSize: '0.68rem', cursor: cite.url ? 'pointer' : 'default' }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Action toolbar for assistant messages */}
          {!isUser && (
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
              <Tooltip title={copied ? 'Copied!' : 'Copy response'}>
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  aria-label="Copy response"
                  sx={{ color: 'text.secondary', p: 0.5 }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </IconButton>
              </Tooltip>

              {onFeedback && (
                <>
                  <Tooltip title="Helpful">
                    <IconButton
                      size="small"
                      onClick={() => handleRating('positive')}
                      aria-label="Thumbs up"
                      sx={{
                        color: rated === 'positive' ? 'primary.main' : 'text.secondary',
                        p: 0.5,
                      }}
                    >
                      <ThumbsUp size={14} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Not helpful">
                    <IconButton
                      size="small"
                      onClick={() => handleRating('negative')}
                      aria-label="Thumbs down"
                      sx={{
                        color: rated === 'negative' ? 'error.main' : 'text.secondary',
                        p: 0.5,
                      }}
                    >
                      <ThumbsDown size={14} />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {onRetry && (
                <Tooltip title="Regenerate response">
                  <IconButton
                    size="small"
                    onClick={() => onRetry(message.id)}
                    aria-label="Regenerate response"
                    sx={{ color: 'text.secondary', p: 0.5 }}
                  >
                    <RotateCcw size={14} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </MessageRoot>
  );
};

AIAssistantMessage.displayName = 'AIAssistantMessage';

export default AIAssistantMessage;
