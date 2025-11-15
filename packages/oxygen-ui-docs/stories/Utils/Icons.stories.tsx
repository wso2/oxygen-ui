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
import {
  Home,
  User,
  Settings,
  Search,
  Mail,
  Bell,
  Calendar,
  File,
  Folder,
  Download,
  Upload,
  Edit,
  Trash2,
  Save,
  Share2,
  Copy,
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Menu,
  MoreVertical,
  MoreHorizontal,
  Star,
  Heart,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  UserPlus,
  MessageSquare,
  Send,
  Phone,
  Video,
  Image,
  Camera,
  FileText,
  Package,
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  Wifi,
  WifiOff,
  Cloud,
  CloudOff,
  Database,
  Server,
  Code,
  Terminal,
  GitBranch,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  CheckCircle,
  XCircle,
  Loader,
  RefreshCw,
  Clock,
  MapPin,
  Navigation,
  Compass,
  Map,
  Award,
  Bookmark,
  Flag,
  Tag,
  Filter,
  Sliders,
  Printer,
  Clipboard,
  Link,
  ExternalLink,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  GitHub,
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

const iconsList = [
  { Icon: Home, name: 'Home' },
  { Icon: User, name: 'User' },
  { Icon: Settings, name: 'Settings' },
  { Icon: Search, name: 'Search' },
  { Icon: Mail, name: 'Mail' },
  { Icon: Bell, name: 'Bell' },
  { Icon: Calendar, name: 'Calendar' },
  { Icon: File, name: 'File' },
  { Icon: Folder, name: 'Folder' },
  { Icon: Download, name: 'Download' },
  { Icon: Upload, name: 'Upload' },
  { Icon: Edit, name: 'Edit' },
  { Icon: Trash2, name: 'Trash2' },
  { Icon: Save, name: 'Save' },
  { Icon: Share2, name: 'Share2' },
  { Icon: Copy, name: 'Copy' },
  { Icon: Check, name: 'Check' },
  { Icon: X, name: 'X' },
  { Icon: Plus, name: 'Plus' },
  { Icon: Minus, name: 'Minus' },
  { Icon: ChevronRight, name: 'ChevronRight' },
  { Icon: ChevronLeft, name: 'ChevronLeft' },
  { Icon: ChevronUp, name: 'ChevronUp' },
  { Icon: ChevronDown, name: 'ChevronDown' },
  { Icon: Menu, name: 'Menu' },
  { Icon: MoreVertical, name: 'MoreVertical' },
  { Icon: MoreHorizontal, name: 'MoreHorizontal' },
  { Icon: Star, name: 'Star' },
  { Icon: Heart, name: 'Heart' },
  { Icon: Eye, name: 'Eye' },
  { Icon: EyeOff, name: 'EyeOff' },
  { Icon: Lock, name: 'Lock' },
  { Icon: Unlock, name: 'Unlock' },
  { Icon: LogIn, name: 'LogIn' },
  { Icon: LogOut, name: 'LogOut' },
  { Icon: UserPlus, name: 'UserPlus' },
  { Icon: MessageSquare, name: 'MessageSquare' },
  { Icon: Send, name: 'Send' },
  { Icon: Phone, name: 'Phone' },
  { Icon: Video, name: 'Video' },
  { Icon: Image, name: 'Image' },
  { Icon: Camera, name: 'Camera' },
  { Icon: FileText, name: 'FileText' },
  { Icon: Package, name: 'Package' },
  { Icon: ShoppingCart, name: 'ShoppingCart' },
  { Icon: CreditCard, name: 'CreditCard' },
  { Icon: DollarSign, name: 'DollarSign' },
  { Icon: TrendingUp, name: 'TrendingUp' },
  { Icon: TrendingDown, name: 'TrendingDown' },
  { Icon: BarChart3, name: 'BarChart3' },
  { Icon: PieChart, name: 'PieChart' },
  { Icon: Activity, name: 'Activity' },
  { Icon: Zap, name: 'Zap' },
  { Icon: Globe, name: 'Globe' },
  { Icon: Wifi, name: 'Wifi' },
  { Icon: WifiOff, name: 'WifiOff' },
  { Icon: Cloud, name: 'Cloud' },
  { Icon: CloudOff, name: 'CloudOff' },
  { Icon: Database, name: 'Database' },
  { Icon: Server, name: 'Server' },
  { Icon: Code, name: 'Code' },
  { Icon: Terminal, name: 'Terminal' },
  { Icon: GitBranch, name: 'GitBranch' },
  { Icon: GitHub, name: 'GitHub' },
  { Icon: AlertCircle, name: 'AlertCircle' },
  { Icon: AlertTriangle, name: 'AlertTriangle' },
  { Icon: Info, name: 'Info' },
  { Icon: HelpCircle, name: 'HelpCircle' },
  { Icon: CheckCircle, name: 'CheckCircle' },
  { Icon: XCircle, name: 'XCircle' },
  { Icon: Loader, name: 'Loader' },
  { Icon: RefreshCw, name: 'RefreshCw' },
  { Icon: Clock, name: 'Clock' },
  { Icon: MapPin, name: 'MapPin' },
  { Icon: Navigation, name: 'Navigation' },
  { Icon: Compass, name: 'Compass' },
  { Icon: Map, name: 'Map' },
  { Icon: Award, name: 'Award' },
  { Icon: Bookmark, name: 'Bookmark' },
  { Icon: Flag, name: 'Flag' },
  { Icon: Tag, name: 'Tag' },
  { Icon: Filter, name: 'Filter' },
  { Icon: Sliders, name: 'Sliders' },
  { Icon: Printer, name: 'Printer' },
  { Icon: Clipboard, name: 'Clipboard' },
  { Icon: Link, name: 'Link' },
  { Icon: ExternalLink, name: 'ExternalLink' },
  { Icon: Maximize, name: 'Maximize' },
  { Icon: Minimize, name: 'Minimize' },
  { Icon: Volume2, name: 'Volume2' },
  { Icon: VolumeX, name: 'VolumeX' },
  { Icon: Play, name: 'Play' },
  { Icon: Pause, name: 'Pause' },
  { Icon: SkipBack, name: 'SkipBack' },
  { Icon: SkipForward, name: 'SkipForward' },
];

export const IconGallery: Story = {
  render: () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Icon Gallery
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Showing {iconsList.length} popular icons. Visit{' '}
        <a
          href="https://lucide.dev/icons/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          lucide.dev/icons
        </a>{' '}
        for the complete list of 1000+ icons.
      </Typography>
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
                cursor: 'pointer',
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
          <GitHub size={24} />
          <Database size={24} />
          <Server size={24} />
        </Box>
      </Box>
    </Box>
  ),
};
