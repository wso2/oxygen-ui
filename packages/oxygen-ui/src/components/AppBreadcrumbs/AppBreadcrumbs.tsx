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
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import type {SxProps, Theme} from '@mui/material';
import {ChevronRight} from '@wso2/oxygen-ui-icons-react';
import type {JSX, MouseEvent} from 'react';
import {useEffect, useRef, useState} from 'react';

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

const AppBreadcrumbsEllipsis = styled(Typography, {
  name: 'MuiAppBreadcrumbs',
  slot: 'Ellipsis',
})<{ownerState: {active: boolean}}>(({theme, ownerState}) => ({
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  px: 0.5,
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
  const ellipsisRef = useRef<HTMLElement | null>(null);
  const popperRef = useRef<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!open) return undefined;

    const handleDocumentClick = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (ellipsisRef.current?.contains(target) || popperRef.current?.contains(target)) {
        return;
      }
      setAnchorEl(null);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [open]);

  const handleEllipsisClick = (e: MouseEvent<HTMLElement>) => {
    ellipsisRef.current = e.currentTarget;
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
        variant="h5"
        ownerState={{active: ellipsisHovered || open}}
        onClick={handleEllipsisClick}
        onMouseEnter={() => setEllipsisHovered(true)}
        onMouseLeave={() => setEllipsisHovered(false)}
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
        separator={<ChevronRight size={16} />}
        aria-label="breadcrumb"
        sx={{'& ol': {flexWrap: 'nowrap', alignItems: 'center'}}}
      >
        {breadcrumbChildren}
      </Breadcrumbs>

      <Popper open={open} anchorEl={anchorEl} placement="bottom-start" sx={{zIndex: 1400}}>
        <Paper ref={popperRef} elevation={3} sx={{minWidth: 160, mt: 0.5}}>
          <MenuList dense>
            {hiddenItems.map((item) => (
              <MenuItem key={item.key} onClick={() => handleMenuItemClick(item)}>
                <Typography variant="body2">{item.label}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popper>
    </AppBreadcrumbsRoot>
  );
}

AppBreadcrumbs.displayName = 'AppBreadcrumbs';
