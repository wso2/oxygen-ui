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
import Collapse from '@mui/material/Collapse';
import ButtonBase from '@mui/material/ButtonBase';
import { styled, keyframes } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { ChevronDown, ChevronRight, Brain } from '@wso2/oxygen-ui-icons-react';

const pulseShimmer = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export interface AIAssistantThoughtProps {
  /** Thought/reasoning text */
  thought: string;
  /** Whether the reasoning process is currently ongoing */
  isThinking?: boolean;
  /** Whether the thought panel defaults to expanded */
  defaultExpanded?: boolean;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

const ThoughtRoot = styled(Box, {
  name: 'MuiAIAssistantThought',
  slot: 'Root',
})(({ theme }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
  overflow: 'hidden',
}));

const ToggleButton = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0.75, 1.25),
  fontSize: '0.75rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textAlign: 'left',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ThoughtContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  borderTop: `1px dashed ${theme.palette.divider}`,
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
  whiteSpace: 'pre-wrap',
  fontFamily: 'monospace',
  lineHeight: 1.5,
}));

export const AIAssistantThought: React.FC<AIAssistantThoughtProps> = ({
  thought,
  isThinking = false,
  defaultExpanded = false,
  sx,
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded || isThinking);

  // Auto-expand while thinking
  React.useEffect(() => {
    if (isThinking) {
      setExpanded(true);
    }
  }, [isThinking]);

  if (!thought && !isThinking) {
    return null;
  }

  return (
    <ThoughtRoot sx={sx}>
      <ToggleButton
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="Toggle thinking process"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Brain
            size={14}
            style={{
              animation: isThinking ? `${pulseShimmer} 1.5s infinite` : 'none',
              color: isThinking ? '#FF7300' : 'inherit',
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {isThinking ? 'Reasoning in progress...' : 'Thought process'}
          </Typography>
        </Box>
        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </ToggleButton>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ThoughtContent>
          <Typography variant="caption" component="div" sx={{ fontFamily: 'inherit' }}>
            {thought || 'Analyzing context and formulating response...'}
          </Typography>
        </ThoughtContent>
      </Collapse>
    </ThoughtRoot>
  );
};

AIAssistantThought.displayName = 'AIAssistantThought';

export default AIAssistantThought;
