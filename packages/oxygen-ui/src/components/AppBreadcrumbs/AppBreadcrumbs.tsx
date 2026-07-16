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

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import type {SxProps, Theme} from '@mui/material';
import {ChevronRight} from '@wso2/oxygen-ui-icons-react';
import type {JSX, MouseEvent} from 'react';
import {useId, useState} from 'react';

export interface BreadcrumbItem {
  key: string;
  label: string;
  onClick?: () => void;
}

export interface AppBreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The breadcrumb items to display.
   */
  items: BreadcrumbItem[];
  /**
   * Maximum number of items to show before truncating with an ellipsis.
   * @default 4
   */
  maxItems?: number;
  /**
   * The sx prop for styling with Material-UI system.
   */
  sx?: SxProps<Theme>;
}

const AppBreadcrumbsRoot = styled('div', {
  name: 'MuiAppBreadcrumbs',
  slot: 'Root',
})({
  display: 'inline-flex',
  alignItems: 'center',
});

const AppBreadcrumbsItem = styled(Typography, {
  name: 'MuiAppBreadcrumbs',
  slot: 'Item',
})<{ownerState: {isLast: boolean}}>(({theme, ownerState}) =>
  ownerState.isLast
    ? {
        whiteSpace: 'nowrap',
        color: theme.vars?.palette.text.primary ?? theme.palette.text.primary,
      }
    : {
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        color: theme.vars?.palette.text.secondary ?? theme.palette.text.secondary,
        '&:hover': {
          textDecoration: 'underline',
          color: theme.vars?.palette.text.primary ?? theme.palette.text.primary,
        },
      },
);

// A native <button> so the overflow control is keyboard focusable and
// announced as interactive (WCAG 2.1.1 / 4.1.2).
const AppBreadcrumbsEllipsis = styled('button', {
  name: 'MuiAppBreadcrumbs',
  slot: 'Ellipsis',
})<{ownerState: {active: boolean}}>(({theme, ownerState}) => ({
  ...theme.typography.h5,
  border: 0,
  padding: theme.spacing(0, 0.5),
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  borderRadius: theme.shape.borderRadius,
  color: theme.vars?.palette.text.secondary ?? theme.palette.text.secondary,
  backgroundColor: ownerState.active ? theme.vars?.palette.action.hover ?? theme.palette.action.hover : 'transparent',
  '&:hover': {
    backgroundColor: theme.vars?.palette.action.hover ?? theme.palette.action.hover,
  },
}));

export default function AppBreadcrumbs({items, maxItems = 4, sx, ...props}: AppBreadcrumbsProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [ellipsisHovered, setEllipsisHovered] = useState(false);
  const menuId = useId();
  const open = Boolean(anchorEl);

  const handleEllipsisClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(open ? null : e.currentTarget);
  };

  const handleMenuItemClick = (item: BreadcrumbItem) => {
    setAnchorEl(null);
    item.onClick?.();
  };

  const shouldTruncate = items.length > maxItems;
  const visibleItems: BreadcrumbItem[] = shouldTruncate ? [items[0], ...items.slice(items.length - 2)] : items;
  const hiddenItems: BreadcrumbItem[] = shouldTruncate ? items.slice(1, items.length - 2) : [];

  const renderItem = (item: BreadcrumbItem, isLast: boolean) => (
    <AppBreadcrumbsItem
      key={item.key}
      variant="h5"
      ownerState={{isLast}}
      role={isLast ? undefined : 'button'}
      tabIndex={isLast ? undefined : 0}
      onClick={isLast ? undefined : item.onClick}
      onKeyDown={
        isLast
          ? undefined
          : (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.onClick?.();
              }
            }
      }
    >
      {item.label}
    </AppBreadcrumbsItem>
  );

  const breadcrumbChildren: JSX.Element[] = [];

  if (shouldTruncate) {
    breadcrumbChildren.push(renderItem(visibleItems[0], false));
    breadcrumbChildren.push(
      <AppBreadcrumbsEllipsis
        key="__ellipsis__"
        type="button"
        ownerState={{active: ellipsisHovered || open}}
        onClick={handleEllipsisClick}
        onMouseEnter={() => setEllipsisHovered(true)}
        onMouseLeave={() => setEllipsisHovered(false)}
        aria-label="Show hidden breadcrumbs"
        aria-haspopup="menu"
        aria-expanded={open || undefined}
        aria-controls={open ? menuId : undefined}
      >
        ...
      </AppBreadcrumbsEllipsis>,
    );
    breadcrumbChildren.push(renderItem(visibleItems[1], false));
    breadcrumbChildren.push(renderItem(visibleItems[2], true));
  } else {
    items.forEach((item, index) => {
      breadcrumbChildren.push(renderItem(item, index === items.length - 1));
    });
  }

  return (
    <AppBreadcrumbsRoot sx={sx} {...props}>
      <Breadcrumbs
        separator={<ChevronRight size={16} aria-hidden="true" />}
        aria-label="breadcrumb"
        sx={{'& ol': {flexWrap: 'nowrap', alignItems: 'center'}}}
      >
        {breadcrumbChildren}
      </Breadcrumbs>

      <Menu
        id={menuId}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        slotProps={{paper: {elevation: 3, sx: {minWidth: 160, mt: 0.5}}, list: {dense: true}}}
      >
        {hiddenItems.map((item) => (
          <MenuItem key={item.key} onClick={() => handleMenuItemClick(item)}>
            <Typography variant="body2">{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </AppBreadcrumbsRoot>
  );
}

AppBreadcrumbs.displayName = 'AppBreadcrumbs';
