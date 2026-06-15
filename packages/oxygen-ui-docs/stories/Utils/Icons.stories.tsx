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
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Tooltip, Button } from '@wso2/oxygen-ui';
// lucide-react is a direct dependency of @wso2/oxygen-ui-icons-react; version is read from its installed package.json
import lucideReactPkg from 'lucide-react/package.json';
import {
  Home,
  User,
  Settings,
  Search,
  Mail,
  Bell,
  Download,
  Upload,
  Edit,
  Trash2,
  Save,
  Share2,
  Copy,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Menu,
  MoreVertical,
  Star,
  MessageSquare,
  Send,
  Phone,
  Video,
  Database,
  Server,
  Code,
  Terminal,
  GitBranch,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  GitLab,
  Bitbucket,
  MCP,
} from '@wso2/oxygen-ui-icons-react';

const meta: Meta = {
  title: 'Utils/Icons',
  parameters: {
    docs: {
      description: {
        component:
          'Oxygen UI Icons React is a comprehensive icon library built on top of Lucide Icons. ' +
          'It provides a wide range of beautifully crafted, consistent icons for your React applications. ' +
          'All icons are tree-shakeable and optimized for performance.\n\n' +
          '**Installation:**\n```bash\nnpm install @wso2/oxygen-ui-icons-react\n```\n\n' +
          '**Usage:**\n```tsx\nimport { Home, User, Settings } from "@wso2/oxygen-ui-icons-react";\n\n' +
          '<Home size={24} color="primary" />\n```\n\n' +
          'For the complete list of available icons, visit [Lucide Icons](https://lucide.dev/icons/).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

declare const require: {
  context(path: string, deep: boolean, filter: RegExp): { keys(): string[]; (id: string): any }
};

// NOTE: This only works with Storybook -> Webpack.
// If we switch to Vite, we will need to change this to use dynamic imports instead.
const iconModules = require.context(
  '../../node_modules/@wso2/oxygen-ui-icons-react/dist/icons',
  false,
  /^\.\/[A-Z]\w+\.js$/
);

const customIconsList: { Icon: React.ComponentType<any>; name: string }[] = iconModules
  .keys()
  .sort()
  .map((key: string) => {
    const name = key.replace(/^\.\//, '').replace(/\.js$/, '')
    return { Icon: iconModules(key)[name], name }
  });

const featuredBrandIcons = [
  { Icon: GitLab, name: 'GitLab' },
  { Icon: Bitbucket, name: 'Bitbucket' },
  { Icon: MCP, name: 'MCP' },
];

const iconsList = [
  { Icon: Home, name: 'Home' },
  { Icon: User, name: 'User' },
  { Icon: Settings, name: 'Settings' },
  { Icon: Search, name: 'Search' },
  { Icon: Mail, name: 'Mail' },
  { Icon: Bell, name: 'Bell' },
]

export const IconGallery: Story = {
  render: () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Icons from Lucide Library
      </Typography>
      <Box
        sx={{
          mb: 3,
          px: 2,
          py: 1.5,
          borderRadius: 1,
          bgcolor: 'info.50',
          border: '1px solid',
          borderColor: 'info.light',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography variant="body2" color="info.dark">
          Showing <strong>{iconsList.length}</strong> popular icons from{' '}
          <strong>lucide-react v{lucideReactPkg.version}</strong>. Visit{' '}
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
          >
            lucide.dev/icons
          </a>{' '}
          for the complete list of <strong>1000+ icons</strong>.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
          gap: 2,
        }}
      >
        {iconsList.map(({ Icon, name }) => (
          <Tooltip key={name} title={name} arrow>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Icon size={24} />
              <Typography
                variant="caption"
                align="center"
                sx={{
                  fontSize: '0.7rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                {name}
              </Typography>
            </Paper>
          </Tooltip>
        ))}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Custom Icons
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Custom SVG icons bundled with Oxygen UI Icons React, not part of the Lucide library.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
            },
            gap: 2,
          }}
        >
          {customIconsList.map(({ Icon, name }) => (
            <Tooltip key={name} title={name} arrow>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Icon size={24} />
                <Typography
                  variant="caption"
                  align="center"
                  sx={{
                    fontSize: '0.7rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                >
                  {name}
                </Typography>
              </Paper>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Home size={16} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          16px
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Home size={24} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          24px (default)
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Home size={32} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          32px
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Home size={48} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          48px
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Home size={64} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          64px
        </Typography>
      </Box>
    </Box>
  ),
};

export const IconColors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Star size={32} color="currentColor" />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Current Color
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Star size={32} color="#ff7400" />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Custom Hex
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Star size={32} color="rgb(74, 41, 165)" />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          RGB
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', color: 'error.main' }}>
        <Star size={32} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Inherit (Error)
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', color: 'success.main' }}>
        <Star size={32} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Inherit (Success)
        </Typography>
      </Box>
    </Box>
  ),
};

export const IconStrokeWidth: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Settings size={32} strokeWidth={1} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Thin (1)
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Settings size={32} strokeWidth={1.5} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Light (1.5)
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Settings size={32} strokeWidth={2} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Regular (2)
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Settings size={32} strokeWidth={2.5} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Medium (2.5)
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Settings size={32} strokeWidth={3} />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Bold (3)
        </Typography>
      </Box>
    </Box>
  ),
};

export const IconCategories: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Navigation & UI
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Home size={24} />
          <Menu size={24} />
          <Search size={24} />
          <Settings size={24} />
          <MoreVertical size={24} />
          <ChevronRight size={24} />
          <ChevronLeft size={24} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Communication
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Mail size={24} />
          <MessageSquare size={24} />
          <Phone size={24} />
          <Video size={24} />
          <Send size={24} />
          <Bell size={24} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Edit size={24} />
          <Trash2 size={24} />
          <Save size={24} />
          <Download size={24} />
          <Upload size={24} />
          <Copy size={24} />
          <Share2 size={24} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Status & Alerts
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Check size={24} />
          <X size={24} />
          <AlertCircle size={24} />
          <AlertTriangle size={24} />
          <Info size={24} />
          <CheckCircle size={24} />
          <XCircle size={24} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Development
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Code size={24} />
          <Terminal size={24} />
          <GitBranch size={24} />
          <Database size={24} />
          <Server size={24} />
        </Box>
      </Box>
    </Box>
  ),
};
