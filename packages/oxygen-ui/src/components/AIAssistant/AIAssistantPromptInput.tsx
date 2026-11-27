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
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Send, Square, Paperclip, X } from '@wso2/oxygen-ui-icons-react';
import type { AIAssistantAttachment } from './types';
import { useAIAssistant } from './context';

export interface AIAssistantPromptInputProps {
  /** Placeholder text (default: 'Ask a question or describe an action...') */
  placeholder?: string;
  /** Disables input */
  disabled?: boolean;
  /** Max length in characters */
  maxLength?: number;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

const InputContainer = styled(Box, {
  name: 'MuiAIAssistantPromptInput',
  slot: 'Root',
})(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const InputCard = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: theme.spacing(1, 1.5),
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.mode === 'dark' ? 'rgba(255, 115, 0, 0.3)' : 'rgba(255, 115, 0, 0.2)'}`,
  },
}));

export const AIAssistantPromptInput: React.FC<AIAssistantPromptInputProps> = ({
  placeholder = 'Ask a question or describe an action...',
  disabled = false,
  maxLength = 4000,
  sx,
}) => {
  const { isGenerating, onSendMessage, onStopStreaming, announce } = useAIAssistant();
  const [value, setValue] = React.useState('');
  const [attachments, setAttachments] = React.useState<AIAssistantAttachment[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed && attachments.length === 0) return;
    if (isGenerating) return;

    onSendMessage?.(trimmed, attachments.length > 0 ? attachments : undefined);
    announce(`Sent prompt: ${trimmed}`);
    setValue('');
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: AIAssistantAttachment[] = Array.from(files).map((f) => ({
      id: `${f.name}-${Date.now()}`,
      name: f.name,
      type: f.type,
      size: `${Math.round(f.size / 1024)} KB`,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    e.target.value = '';
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <InputContainer sx={sx}>
      <InputCard>
        {attachments.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 1 }}>
            {attachments.map((att) => (
              <Chip
                key={att.id}
                icon={<Paperclip size={12} />}
                label={att.name}
                size="small"
                onDelete={() => handleRemoveAttachment(att.id)}
                deleteIcon={<X size={12} />}
                variant="outlined"
                sx={{ height: 22, fontSize: '0.72rem' }}
              />
            ))}
          </Stack>
        )}

        <InputBase
          multiline
          minRows={1}
          maxRows={6}
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          inputProps={{
            'aria-label': 'AI prompt input',
          }}
          sx={{
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1, pt: 0.5 }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple
            />
            <Tooltip title="Attach context or file">
              <IconButton
                size="small"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || isGenerating}
                aria-label="Attach file to AI prompt"
                sx={{ color: 'text.secondary' }}
              >
                <Paperclip size={16} />
              </IconButton>
            </Tooltip>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Press Enter ↵ to send
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            {isGenerating ? (
              <Tooltip title="Stop generating">
                <IconButton
                  size="small"
                  onClick={onStopStreaming}
                  aria-label="Stop generation"
                  color="error"
                >
                  <Square size={16} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Send message">
                <span>
                  <IconButton
                    size="small"
                    onClick={handleSend}
                    disabled={disabled || (!value.trim() && attachments.length === 0)}
                    aria-label="Send message"
                    color="primary"
                    sx={{
                      backgroundColor:
                        !value.trim() && attachments.length === 0
                          ? 'transparent'
                          : 'rgba(255, 115, 0, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 115, 0, 0.2)',
                      },
                    }}
                  >
                    <Send size={16} />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </InputCard>
    </InputContainer>
  );
};

AIAssistantPromptInput.displayName = 'AIAssistantPromptInput';

export default AIAssistantPromptInput;
