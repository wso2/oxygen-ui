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

import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Paper,
  Button,
  SearchBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
} from '@wso2/oxygen-ui';
import lucideReactPkg from 'lucide-react/package.json';
import lucideTags from 'lucide-static/tags.json';
import * as OxygenIcons from '@wso2/oxygen-ui-icons-react';
import {
  Home,
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
} from '@wso2/oxygen-ui-icons-react';
import customKeywords from './icon-keywords.json';

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
          'Use the **Icon Gallery** story below to search all icons by name or tags ' +
          '(for example, searching `logout` finds `LogOut`). ' +
          'Click an icon to see its import snippet and associated tags. ' +
          'You can also browse the full Lucide set at [lucide.dev/icons](https://lucide.dev/icons/).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

type IconComponent = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type IconEntry = {
  Icon: IconComponent;
  name: string;
  tags: string[];
};

const NON_ICON_EXPORTS = new Set([
  'Icon',
  'createLucideIcon',
  'icons',
  'default',
  'LucideProvider',
  'DynamicIcon',
]);

function kebabToPascal(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function normalizeForSearch(value: string): string {
  return value.toLowerCase().replace(/[-_\s]/g, '');
}

function buildTagMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};

  for (const [kebabName, tags] of Object.entries(lucideTags as Record<string, string[]>)) {
    map[kebabToPascal(kebabName)] = tags;
  }

  for (const [name, tags] of Object.entries(customKeywords as Record<string, string[]>)) {
    map[name] = [...new Set([...(map[name] ?? []), ...tags])];
  }

  return map;
}

const tagMap = buildTagMap();

function buildIconCatalog(): IconEntry[] {
  return Object.entries(OxygenIcons)
    .filter(([name, value]) => {
      if (!/^[A-Z]/.test(name)) return false;
      if (name.endsWith('Icon')) return false;
      if (NON_ICON_EXPORTS.has(name)) return false;
      return typeof value === 'function' || (typeof value === 'object' && value !== null);
    })
    .map(([name, Icon]) => ({
      Icon: Icon as IconComponent,
      name,
      tags: tagMap[name] ?? [],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const iconCatalog = buildIconCatalog();

/** Matches MUI default breakpoints used by the previous CSS grid. */
const GAP_PX = 16;
const ROW_HEIGHT_PX = 96;
const OVERSCAN_ROWS = 2;

function getColumnCount(width: number): number {
  if (width >= 1200) return 6;
  if (width >= 900) return 4;
  if (width >= 600) return 3;
  return 2;
}

function IconGalleryContent() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [selected, setSelected] = useState<IconEntry | null>(null);
  const [copied, setCopied] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredIcons = useMemo(() => {
    const trimmed = deferredQuery.trim();
    if (!trimmed) return iconCatalog;

    const lower = trimmed.toLowerCase();
    const normalized = normalizeForSearch(trimmed);

    return iconCatalog.filter(({ name, tags }) => {
      if (name.toLowerCase().includes(lower)) return true;
      if (normalizeForSearch(name).includes(normalized)) return true;
      return tags.some(
        (tag) => tag.toLowerCase().includes(lower) || normalizeForSearch(tag).includes(normalized),
      );
    });
  }, [deferredQuery]);

  useEffect(() => {
    setScrollTop(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [deferredQuery]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return undefined;

    const updateSize = () => {
      setContainerWidth(el.clientWidth);
      setViewportHeight(el.clientHeight);
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [filteredIcons.length]);

  const columnCount = containerWidth > 0 ? getColumnCount(containerWidth) : 6;
  const rowCount = Math.ceil(filteredIcons.length / columnCount);
  const totalHeight = rowCount * ROW_HEIGHT_PX;

  const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT_PX) - OVERSCAN_ROWS);
  const endRow = Math.min(
    rowCount,
    Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT_PX) + OVERSCAN_ROWS,
  );

  const visibleCells = useMemo(() => {
    const cells: { entry: IconEntry; row: number; col: number }[] = [];
    for (let row = startRow; row < endRow; row += 1) {
      for (let col = 0; col < columnCount; col += 1) {
        const index = row * columnCount + col;
        if (index >= filteredIcons.length) break;
        cells.push({ entry: filteredIcons[index], row, col });
      }
    }
    return cells;
  }, [startRow, endRow, columnCount, filteredIcons]);

  const cellWidthPercent = 100 / columnCount;

  const importSnippet = selected
    ? `import { ${selected.name} } from '@wso2/oxygen-ui-icons-react';`
    : '';

  const handleCopy = async () => {
    if (!importSnippet) return;
    try {
      await navigator.clipboard.writeText(importSnippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleClose = () => {
    setSelected(null);
    setCopied(false);
  };

  const SelectedIcon = selected?.Icon;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Icon Gallery
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Browse <strong>{iconCatalog.length}</strong> icons from{' '}
        <strong>lucide-react v{lucideReactPkg.version}</strong> plus Oxygen UI custom icons. Search by
        name or tags (e.g. <code>logout</code> finds <code>LogOut</code>).
      </Typography>

      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          bgcolor: 'background.paper',
          py: 1.5,
          mb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <SearchBar
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search icons by name or tag…"
          fullWidth
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Showing {filteredIcons.length} of {iconCatalog.length} icons
        </Typography>
      </Box>

      {filteredIcons.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No icons match &ldquo;{query.trim()}&rdquo;. Try a different name or tag.
          </Typography>
        </Box>
      ) : (
        <Box
          ref={scrollContainerRef}
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
          sx={{
            maxHeight: '60vh',
            overflow: 'auto',
            pr: 0.5,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: totalHeight,
              width: '100%',
            }}
          >
            {visibleCells.map(({ entry, row, col }) => {
              const { Icon, name } = entry;
              return (
                <Paper
                  key={name}
                  elevation={0}
                  component="button"
                  type="button"
                  title={name}
                  onClick={() => {
                    setSelected(entry);
                    setCopied(false);
                  }}
                  sx={{
                    position: 'absolute',
                    top: row * ROW_HEIGHT_PX,
                    left: `calc(${col * cellWidthPercent}% + ${GAP_PX / 2}px)`,
                    width: `calc(${cellWidthPercent}% - ${GAP_PX}px)`,
                    height: ROW_HEIGHT_PX - GAP_PX,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    cursor: 'pointer',
                    font: 'inherit',
                    color: 'inherit',
                    transition: 'border-color 0.15s, background-color 0.15s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover',
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
              );
            })}
          </Box>
        </Box>
      )}

      <Dialog open={selected !== null} onClose={handleClose} maxWidth="sm" fullWidth>
        {selected && SelectedIcon && (
          <>
            <DialogTitle>{selected.name}</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <SelectedIcon size={64} />
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Import
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 3,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  component="code"
                  variant="body2"
                  sx={{
                    flex: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    wordBreak: 'break-all',
                  }}
                >
                  {importSnippet}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                  onClick={handleCopy}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Tags
              </Typography>
              {selected.tags.length > 0 ? (
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {selected.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No tags available for this icon.
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export const IconGallery: Story = {
  render: () => <IconGalleryContent />,
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
