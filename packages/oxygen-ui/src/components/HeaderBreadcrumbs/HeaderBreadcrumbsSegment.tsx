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
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Check, ChevronDown, ChevronRight, Plus, Search, Settings } from '@wso2/oxygen-ui-icons-react';
import type {
  HeaderBreadcrumbsAction,
  HeaderBreadcrumbsActionContext,
  HeaderBreadcrumbsItem,
  HeaderBreadcrumbsLevel,
  HeaderBreadcrumbsValue,
} from './types';

/** More items than this shows the search field when `searchable` is `'auto'`. */
const AUTO_SEARCH_THRESHOLD = 6;

const SegmentRoot = styled('li', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Segment',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})({
  alignItems: 'center',
  display: 'inline-flex',
  minWidth: 0,
});

/** Height of the name row with labels, so names, carets and the open button line up. */
export const LABELED_ROW_HEIGHT = 32;

const SegmentRow = styled('span', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Row',
})({
  alignItems: 'center',
  display: 'inline-flex',
  height: LABELED_ROW_HEIGHT,
  minWidth: 0,
});

/** The level name above the entry name, inside the name button so it shares the highlight. */
const SegmentLabel = styled('span', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Label',
})(({ theme }) => ({
  ...theme.typography.caption,
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: theme.typography.pxToRem(11),
  lineHeight: 1,
  marginBottom: 2,
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  userSelect: 'none',
  whiteSpace: 'nowrap',
}));

/** The icon and the entry name, side by side. */
const SegmentNameRow = styled('span', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'NameRow',
})(({ theme }) => ({
  alignItems: 'center',
  display: 'inline-flex',
  gap: theme.spacing(0.75),
  maxWidth: '100%',
  minWidth: 0,
}));

/** Corner radius of the name and caret pill. */
const SEGMENT_RADIUS = 6;

const SegmentName = styled('button', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Name',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { current: boolean; labeled: boolean } }>(({ theme, ownerState }) => {
  const palette = (theme.vars || theme).palette;
  return {
    ...theme.typography.body1,
    alignItems: 'flex-start',
    appearance: 'none',
    background: 'transparent',
    border: 0,
    // After the shorthand, so it does not reset these corners.
    borderRadius: SEGMENT_RADIUS,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    color: palette.text.primary,
    cursor: 'pointer',
    display: 'inline-flex',
    flexDirection: 'column',
    fontWeight: theme.typography.fontWeightRegular,
    justifyContent: 'center',
    maxWidth: 220,
    minWidth: 0,
    padding: theme.spacing(0.5, 1),
    // A little more on top to balance the label against the name under it.
    ...(ownerState.labeled && { paddingTop: theme.spacing(0.875) }),
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: palette.action.selected,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${palette.primary.main}`,
      outlineOffset: 1,
    },
  };
});

const SegmentText = styled('span', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Text',
})({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const SegmentIcon = styled('span', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Icon',
})(({ theme }) => ({
  alignItems: 'center',
  color: (theme.vars || theme).palette.text.secondary,
  display: 'inline-flex',
  flex: 'none',
  '& svg': {
    height: 18,
    width: 18,
  },
}));

/** Hidden on screen, read by screen readers. */
const VisuallyHidden = styled('span')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

const SegmentCaret = styled('button', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Caret',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { open: boolean; labeled: boolean } }>(({ theme, ownerState }) => {
  const palette = (theme.vars || theme).palette;
  return {
    // With a label, sit level with the name under it rather than the middle of the pill.
    // The name's text centre is 16px above the bottom (4px padding + half its 24px line).
    alignItems: ownerState.labeled ? 'flex-end' : 'center',
    appearance: 'none',
    backgroundColor: ownerState.open ? palette.action.selected : 'transparent',
    border: 0,
    // After the shorthand, so it does not reset these corners.
    borderRadius: SEGMENT_RADIUS,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    color: palette.text.secondary,
    cursor: 'pointer',
    display: 'inline-flex',
    flex: 'none',
    justifyContent: 'center',
    padding: 0,
    paddingBottom: ownerState.labeled ? 9 : 0,
    width: 20,
    '& svg': {
      transform: ownerState.open ? 'rotate(180deg)' : 'none',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    '&:hover': {
      backgroundColor: palette.action.selected,
      color: palette.text.primary,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${palette.primary.main}`,
      outlineOffset: 1,
    },
  };
});

/**
 * Holds the name and the caret as one pill. Hovering either half, or opening the
 * menu, shades both halves, and the half under the pointer a step darker.
 */
const SegmentGroup = styled('span', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Group',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { open: boolean } }>(({ theme, ownerState }) => {
  const palette = (theme.vars || theme).palette;
  const attached = {
    // The name is a button, or a link when the entry has an href.
    '& > *:not(:hover):not([aria-expanded="true"])': {
      backgroundColor: palette.action.hover,
    },
  };
  return {
    alignItems: 'stretch',
    display: 'inline-flex',
    gap: 1,
    minWidth: 0,
    '&:hover': attached,
    ...(ownerState.open ? attached : {}),
  };
});

const SegmentOpen = styled('button', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'Open',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { open: boolean } }>(({ theme, ownerState }) => {
  const palette = (theme.vars || theme).palette;
  return {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: ownerState.open ? palette.action.selected : 'transparent',
    border: '1px dashed',
    borderColor: ownerState.open ? palette.text.secondary : palette.divider,
    borderRadius: '50%',
    boxSizing: 'border-box',
    color: palette.text.secondary,
    cursor: 'pointer',
    display: 'inline-flex',
    flex: 'none',
    height: 28,
    justifyContent: 'center',
    marginLeft: theme.spacing(0.25),
    padding: 0,
    width: 28,
    '&:hover': {
      backgroundColor: palette.action.hover,
      borderColor: palette.text.secondary,
      color: palette.text.primary,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${palette.primary.main}`,
      outlineOffset: 1,
    },
  };
});

const MenuHeader = styled('div', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'MenuHeader',
})(({ theme }) => ({
  ...theme.typography.caption,
  // Smaller, muted and bold, so the title does not read as another entry.
  color: (theme.vars || theme).palette.text.secondary,
  fontWeight: theme.typography.fontWeightBold,
  letterSpacing: '0.04em',
  padding: theme.spacing(1.5, 2, 1),
  textTransform: 'uppercase',
}));

const MenuStatus = styled('div', {
  name: 'MuiHeaderBreadcrumbs',
  slot: 'MenuStatus',
})(({ theme }) => ({
  alignItems: 'center',
  color: (theme.vars || theme).palette.text.secondary,
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

/**
 * Props for one segment of the trail.
 */
export interface HeaderBreadcrumbsSegmentProps {
  /** The level this segment shows. */
  level: HeaderBreadcrumbsLevel;
  /** The last segment is the current page, marked with `aria-current="page"`. */
  current: boolean;
  /** Element used for items with an `href`. */
  linkComponent: React.ElementType;
  /** Called when the name is clicked. */
  onNavigate?: (levelId: string, item: HeaderBreadcrumbsItem) => void;
  /** Called when an entry in the switch menu is picked. */
  onSelect?: (levelId: string, item: HeaderBreadcrumbsItem) => void;
  /** Called when the switch menu opens. */
  onOpen?: (levelId: string) => void;
  /** Show the level name in small text above the segment. */
  showLabel?: boolean;
  /** Show the level's `icon` before the name. Hovering the icon shows the level name. */
  showIcon?: boolean;
  /** Selected id of every level, passed to action handlers. */
  value?: HeaderBreadcrumbsValue;
  /** Adds "New {label}" to the menu. */
  onCreate?: (levelId: string, context: HeaderBreadcrumbsActionContext) => void;
  /** Adds "Manage {pluralLabel}" to the menu. */
  onManage?: (levelId: string, context: HeaderBreadcrumbsActionContext) => void;
}

const lower = (label: string): string => label.toLowerCase();

type HeaderBreadcrumbsHandler = (levelId: string, context: HeaderBreadcrumbsActionContext) => void;

const isSearchable = (level: HeaderBreadcrumbsLevel): boolean => {
  const searchable = level.searchable ?? 'auto';
  return searchable === 'auto' ? level.items.length > AUTO_SEARCH_THRESHOLD : searchable;
};

/**
 * HeaderBreadcrumbsSegment - The name of the selected entry, and a caret that opens
 * a menu to switch to another entry of the same level.
 */
export const HeaderBreadcrumbsSegment: React.FC<HeaderBreadcrumbsSegmentProps> = ({
  level,
  current,
  linkComponent,
  onNavigate,
  onSelect,
  onOpen,
  showLabel = false,
  showIcon = false,
  value = {},
  onCreate,
  onManage,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [query, setQuery] = React.useState('');
  const listRef = React.useRef<HTMLUListElement>(null);
  const menuId = React.useId();
  const labelId = React.useId();
  const open = Boolean(anchorEl);
  const levelName = lower(level.label);

  const selected =
    level.items.find((item) => item.id === level.selectedId) ??
    (level.selectedItem && level.selectedItem.id === level.selectedId ? level.selectedItem : null);
  const searchable = isSearchable(level);
  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed
    ? level.items.filter(
        (item) =>
          item.name.toLowerCase().includes(trimmed) ||
          item.description?.toLowerCase().includes(trimmed)
      )
    : level.items;

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onOpen?.(level.id);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setQuery('');
  };

  const pick = (item: HeaderBreadcrumbsItem) => {
    closeMenu();
    if (item.id !== level.selectedId) {
      onSelect?.(level.id, item);
    }
  };

  const focusFirstItem = () => {
    listRef.current
      ?.querySelector<HTMLElement>('[role="menuitemradio"]:not([aria-disabled="true"])')
      ?.focus();
  };

  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusFirstItem();
    } else if (event.key === 'Enter' && filtered.length > 0) {
      event.preventDefault();
      const first = filtered.find((item) => !item.disabled);
      if (first) {
        pick(first);
      }
    }
  };

  // A name that is still loading shows a placeholder bar. A name that loaded but
  // matches no item falls back to the raw id, so the trail never goes blank.
  let name: React.ReactNode;
  if (selected) {
    name = selected.name;
  } else if (level.loading) {
    name = <Skeleton variant="text" width={80} aria-label={`Loading ${levelName}`} />;
  } else {
    name = level.selectedId;
  }

  const nameLink = selected?.href
    ? { as: linkComponent, href: selected.href }
    : { type: 'button' as const };

  const renderStatus = () => {
    if (level.loading && level.items.length === 0) {
      return (
        <MenuStatus role="status">
          <CircularProgress size={16} />
          <Typography variant="body2">Loading {levelName}…</Typography>
        </MenuStatus>
      );
    }
    if (level.error) {
      return (
        <MenuStatus role="alert">
          <Typography variant="body2" color="error">
            {level.error}
          </Typography>
        </MenuStatus>
      );
    }
    if (level.items.length === 0) {
      return (
        <MenuStatus>
          <Typography variant="body2">{level.emptyText ?? `No ${levelName} available`}</Typography>
        </MenuStatus>
      );
    }
    if (filtered.length === 0) {
      return (
        <MenuStatus>
          <Typography variant="body2">
            No {levelName} matches “{query.trim()}”
          </Typography>
        </MenuStatus>
      );
    }
    return null;
  };

  const status = renderStatus();
  const isEmpty = !level.selectedId;
  const openLabel = level.openLabel ?? `Open ${levelName}`;
  const switchLabel = isEmpty ? openLabel : `Switch ${levelName}`;

  // "New" and "Manage" come first, then the level's own actions. A level can relabel,
  // link or hide each one; its own onClick wins over the shared handler.
  const actionContext: HeaderBreadcrumbsActionContext = { levelId: level.id, value };
  const builtIn = (
    key: 'create' | 'manage',
    override: HeaderBreadcrumbsLevel['createAction'],
    handler: HeaderBreadcrumbsHandler | undefined,
    defaults: Omit<HeaderBreadcrumbsAction, 'key' | 'onClick'>
  ): HeaderBreadcrumbsAction | null => {
    if (override === false) {
      return null;
    }
    const custom = override ?? {};
    if (!handler && !custom.onClick && !custom.href) {
      return null;
    }
    return {
      ...defaults,
      ...custom,
      key,
      onClick:
        custom.onClick ?? ((_event, context) => handler?.(context.levelId, context)),
    };
  };
  const pluralName = lower(level.pluralLabel ?? `${level.label}s`);
  const actions = [
    builtIn('create', level.createAction, onCreate, {
      label: `New ${levelName}`,
      icon: <Plus size={16} aria-hidden="true" />,
    }),
    builtIn('manage', level.manageAction, onManage, {
      label: `Manage ${pluralName}`,
      icon: <Settings size={16} aria-hidden="true" />,
    }),
    ...(level.actions ?? []),
  ].filter((action): action is HeaderBreadcrumbsAction => action !== null);

  // The level name describes the name or open button, from a hidden copy of the
  // label: the visible label sits inside the name button, hidden from screen readers
  // so it does not join the button's name.
  const hasIcon = showIcon && level.icon != null;
  const describedBy = showLabel || hasIcon ? labelId : undefined;
  const icon = hasIcon ? (
    <Tooltip title={level.label} enterDelay={400}>
      <SegmentIcon aria-hidden="true" data-level-icon="">
        {level.icon}
      </SegmentIcon>
    </Tooltip>
  ) : null;

  // A level with nothing selected yet is the next step down, such as a project
  // while the user is on an organization. It is one button that opens the menu.
  const trigger = isEmpty ? (
    <Tooltip title={openLabel} enterDelay={400}>
      <SegmentOpen
        type="button"
        ownerState={{ open }}
        aria-label={openLabel}
        aria-haspopup="menu"
        aria-expanded={open || undefined}
        aria-controls={open ? menuId : undefined}
        aria-describedby={describedBy}
        onClick={openMenu}
      >
        <ChevronRight size={14} aria-hidden="true" />
      </SegmentOpen>
    </Tooltip>
  ) : (
    <SegmentGroup ownerState={{ open }}>
      <SegmentName
        {...nameLink}
        ownerState={{ current, labeled: showLabel }}
        aria-current={current ? 'page' : undefined}
        aria-describedby={describedBy}
        title={selected?.name}
        onClick={() => {
          if (selected) {
            onNavigate?.(level.id, selected);
          }
        }}
      >
        {showLabel && <SegmentLabel aria-hidden="true">{level.label}</SegmentLabel>}
        <SegmentNameRow>
          {icon}
          <SegmentText>{name}</SegmentText>
        </SegmentNameRow>
      </SegmentName>
      <Tooltip title={switchLabel} enterDelay={400}>
        <SegmentCaret
          type="button"
          ownerState={{ open, labeled: showLabel }}
          aria-label={switchLabel}
          aria-haspopup="menu"
          aria-expanded={open || undefined}
          aria-controls={open ? menuId : undefined}
          onClick={openMenu}
        >
          <ChevronDown size={14} aria-hidden="true" />
        </SegmentCaret>
      </Tooltip>
    </SegmentGroup>
  );

  return (
    <SegmentRoot data-level={level.id}>
      {describedBy && <VisuallyHidden id={labelId}>{level.label}</VisuallyHidden>}
      {/* The open button shows no label; its name already says the level. */}
      {showLabel && isEmpty ? <SegmentRow>{trigger}</SegmentRow> : trigger}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { mt: 0.5, minWidth: 260, maxWidth: 360 } } }}
      >
        <MenuHeader>
          <Typography variant="inherit" component="p">
            {level.menuTitle ?? switchLabel}
          </Typography>
        </MenuHeader>
        {searchable && (
          <Box sx={{ px: 1.5, pb: 1 }}>
            <TextField
              autoFocus
              fullWidth
              size="small"
              value={query}
              placeholder={level.searchPlaceholder ?? `Find ${levelName}`}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onSearchKeyDown}
              slotProps={{
                htmlInput: { 'aria-label': level.searchPlaceholder ?? `Find ${levelName}` },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} aria-hidden="true" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        )}
        <Divider />
        {status ?? (
          <MenuList
            id={menuId}
            ref={listRef}
            dense
            autoFocusItem={open && !searchable}
            aria-label={switchLabel}
            sx={{ maxHeight: 320, overflowY: 'auto', py: 0.5 }}
          >
            {filtered.map((item) => {
              const isSelected = item.id === level.selectedId;
              return (
                <MenuItem
                  key={item.id}
                  role="menuitemradio"
                  aria-checked={isSelected}
                  selected={isSelected}
                  disabled={item.disabled}
                  {...(item.href ? { component: linkComponent, href: item.href } : {})}
                  onClick={() => pick(item)}
                >
                  {item.avatar && <ListItemIcon>{item.avatar}</ListItemIcon>}
                  <ListItemText
                    primary={item.name}
                    secondary={item.description}
                    slotProps={{ primary: { noWrap: true }, secondary: { noWrap: true } }}
                  />
                  <Box
                    component="span"
                    sx={{ display: 'inline-flex', ml: 1, visibility: isSelected ? 'visible' : 'hidden' }}
                  >
                    <Check size={16} aria-hidden="true" />
                  </Box>
                </MenuItem>
              );
            })}
          </MenuList>
        )}
        {actions.length > 0 && (
          <>
            <Divider />
            <MenuList dense aria-label={`${level.label} actions`} sx={{ py: 0.5 }}>
              {actions.map((action) => (
                <MenuItem
                  key={action.key}
                  data-action={action.key}
                  {...(action.href ? { component: linkComponent, href: action.href } : {})}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    closeMenu();
                    action.onClick?.(event, actionContext);
                  }}
                >
                  {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
                  <ListItemText primary={action.label} />
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Popover>
    </SegmentRoot>
  );
};

HeaderBreadcrumbsSegment.displayName = 'HeaderBreadcrumbsSegment';

export default HeaderBreadcrumbsSegment;
