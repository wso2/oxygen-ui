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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Sparkles, Trash2, X, ChevronDown, Check } from '@wso2/oxygen-ui-icons-react';
import { useAIAssistant } from './context';

export interface AIAssistantHeaderProps {
  /** Optional custom title override */
  title?: string;
  /** Optional custom subtitle or active workspace override */
  subtitle?: string;
  /** Action buttons or custom elements in the header */
  children?: React.ReactNode;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

const HeaderRoot = styled(Box, {
  name: 'MuiAIAssistantHeader',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const IconBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 115, 0, 0.2)' : 'rgba(255, 115, 0, 0.1)',
  color: theme.palette.primary.main,
}));

export const AIAssistantHeader: React.FC<AIAssistantHeaderProps> = ({
  title: titleProp,
  subtitle: subtitleProp,
  children,
  sx,
}) => {
  const {
    title: ctxTitle,
    subtitle: ctxSubtitle,
    activeContext,
    model,
    models,
    onModelChange,
    onClearHistory,
    onClose,
    isGenerating,
  } = useAIAssistant();

  const title = titleProp ?? ctxTitle;
  const subtitle = subtitleProp ?? ctxSubtitle;

  const [modelMenuAnchor, setModelMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleOpenModelMenu = (event: React.MouseEvent<HTMLElement>) => {
    setModelMenuAnchor(event.currentTarget);
  };

  const handleCloseModelMenu = () => {
    setModelMenuAnchor(null);
  };

  const handleSelectModel = (modelId: string) => {
    onModelChange?.(modelId);
    handleCloseModelMenu();
  };

  const selectedModelObj = models?.find((m) => m.id === model);

  return (
    <HeaderRoot sx={sx}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
        <IconBadge>
          <Sparkles size={18} />
        </IconBadge>
        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {title}
            </Typography>
            {isGenerating && (
              <Chip
                label="Thinking..."
                size="small"
                color="primary"
                variant="outlined"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            )}
          </Stack>

          {subtitle && (
            <Typography variant="caption" color="text.secondary" noWrap display="block">
              {subtitle}
            </Typography>
          )}

          {activeContext && !subtitle && (
            <Typography variant="caption" color="text.secondary" noWrap display="block">
              {activeContext}
            </Typography>
          )}
        </Box>
      </Stack>

      <Stack direction="row" spacing={0.5} alignItems="center">
        {models && models.length > 0 && (
          <>
            <Chip
              label={selectedModelObj?.label ?? model ?? 'Select Model'}
              size="small"
              onClick={handleOpenModelMenu}
              onDelete={handleOpenModelMenu}
              deleteIcon={<ChevronDown size={14} />}
              variant="outlined"
              sx={{ height: 24, fontSize: '0.75rem', cursor: 'pointer' }}
              aria-label="Select AI Model"
              aria-haspopup="true"
              aria-expanded={Boolean(modelMenuAnchor)}
            />
            <Menu
              anchorEl={modelMenuAnchor}
              open={Boolean(modelMenuAnchor)}
              onClose={handleCloseModelMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {models.map((m) => (
                <MenuItem
                  key={m.id}
                  onClick={() => handleSelectModel(m.id)}
                  selected={m.id === model}
                  sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, minWidth: 160 }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={m.id === model ? 600 : 400}>
                      {m.label}
                    </Typography>
                    {m.provider && (
                      <Typography variant="caption" color="text.secondary">
                        {m.provider}
                      </Typography>
                    )}
                  </Box>
                  {m.id === model && <Check size={16} />}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}

        {children}

        {onClearHistory && (
          <Tooltip title="Clear Conversation">
            <IconButton
              size="small"
              onClick={onClearHistory}
              aria-label="Clear conversation history"
              sx={{ color: 'text.secondary' }}
            >
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        )}

        {onClose && (
          <Tooltip title="Close Assistant">
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="Close AI Assistant"
              sx={{ color: 'text.secondary' }}
            >
              <X size={18} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </HeaderRoot>
  );
};

AIAssistantHeader.displayName = 'AIAssistantHeader';

export default AIAssistantHeader;
