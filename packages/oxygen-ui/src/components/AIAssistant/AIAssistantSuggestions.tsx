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
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Sparkles } from '@wso2/oxygen-ui-icons-react';
import type { AIAssistantSuggestionItem } from './types';
import { useAIAssistant } from './context';

export interface AIAssistantSuggestionsProps {
  /** List of suggestions to display */
  items?: AIAssistantSuggestionItem[];
  /** Callback fired when a suggestion is clicked */
  onSelect?: (suggestion: AIAssistantSuggestionItem) => void;
  /** Section heading title (optional) */
  title?: string;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

const SuggestionsRoot = styled(Box, {
  name: 'MuiAIAssistantSuggestions',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
}));

const SuggestionsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

export const AIAssistantSuggestions: React.FC<AIAssistantSuggestionsProps> = ({
  items: itemsProp,
  onSelect,
  title,
  sx,
}) => {
  const { suggestions: ctxSuggestions, onSendMessage } = useAIAssistant();
  const items = itemsProp ?? ctxSuggestions ?? [];

  if (!items || items.length === 0) {
    return null;
  }

  const handleSuggestionClick = (item: AIAssistantSuggestionItem) => {
    if (onSelect) {
      onSelect(item);
    } else if (onSendMessage) {
      onSendMessage(item.prompt);
    }
  };

  return (
    <SuggestionsRoot sx={sx}>
      {title && (
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          {title}
        </Typography>
      )}
      <SuggestionsList>
        {items.map((item) => (
          <Chip
            key={item.id}
            icon={<Sparkles size={14} />}
            label={item.label}
            onClick={() => handleSuggestionClick(item)}
            variant="outlined"
            clickable
            size="small"
            sx={{
              borderRadius: 2,
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
          />
        ))}
      </SuggestionsList>
    </SuggestionsRoot>
  );
};

AIAssistantSuggestions.displayName = 'AIAssistantSuggestions';

export default AIAssistantSuggestions;
