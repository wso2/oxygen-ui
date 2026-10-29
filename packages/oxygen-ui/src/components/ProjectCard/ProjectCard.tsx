/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { Box as BoxIcon, Trash2 } from '@wso2/oxygen-ui-icons-react';
import { Box, Card, CardActionArea, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import type { CardProps, TooltipProps, TypographyProps } from '@mui/material';
import RelativeTime from '../RelativeTime';

/**
 * Props for the ProjectCard component
 */
export interface ProjectCardProps extends Omit<CardProps, 'variant' | 'title' | 'children' | 'onClick'> {
  /**
   * Name of the project. Truncated when too long, with the full name in a tooltip on hover.
   */
  title: React.ReactNode;
  /**
   * Short description shown under the title. Cut off with an ellipsis after two lines, with the full text in a tooltip on hover.
   * Nothing is rendered when it is not set.
   */
  description?: React.ReactNode;
  /**
   * Icon shown in the round badge. Defaults to a cube icon.
   */
  icon?: React.ReactNode;
  /**
   * Theme color of the icon badge.
   * @default 'primary'
   */
  iconColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  /**
   * Relative time text for the footer, e.g. "1 minute ago" or "1 day ago", shown with a clock icon.
   * The time is hidden when not set.
   */
  updatedTime?: React.ReactNode;
  /**
   * Optional text before the time, e.g. "Updated".
   */
  updatedLabel?: React.ReactNode;
  /**
   * Machine-readable date/time for the footer time (e.g. an ISO 8601 string).
   */
  updatedDateTime?: string;
  /**
   * Content of the tooltip shown when hovering the time, e.g. the full date. No tooltip when not set.
   */
  updatedTooltip?: React.ReactNode;
  /**
   * Called when the delete button is clicked. The delete button is shown only when this is set,
   * and appears when the card is hovered or focused.
   */
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Accessible name (and tooltip) of the delete button.
   * @default 'Delete project'
   */
  deleteLabel?: string;
  /**
   * Custom content for the bottom right of the card, shown on hover like the delete button. Replaces the delete button.
   */
  actions?: React.ReactNode;
  /**
   * Called when the card is clicked. When set (or when `href` is set) the whole card is interactive.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * When set, the whole card renders as a link to this URL.
   */
  href?: string;
  /**
   * Highlights the card with a primary colored border, e.g. for the current project.
   * @default false
   */
  selected?: boolean;
}

const FOOTER_HEIGHT = 48;
const DESCRIPTION_LINES = 2;
const ACTIONS_OFFSET = 12;
const ACTIONS_GAP = 16;

interface TruncatedTextProps extends Omit<TypographyProps, 'title'> {
  title: React.ReactNode;
  lines?: number;
  placement?: TooltipProps['placement'];
  /** Opens the tooltip (when the text is cut off) without hover, e.g. while the card has keyboard focus. */
  forceOpen?: boolean;
}

/**
 * Text that is cut off with an ellipsis after `lines` lines, with the full content in a tooltip
 * on hover, only when it is actually cut off. Whether it is cut off is re-measured when the
 * content or the available width changes.
 */
const TruncatedText: React.FC<TruncatedTextProps> = ({
  title,
  lines = 1,
  placement = 'top-start',
  forceOpen = false,
  children,
  sx,
  ...props
}) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const [truncated, setTruncated] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const measure = () => {
      const isTruncated =
        lines === 1 ? element.scrollWidth > element.clientWidth : element.scrollHeight > element.clientHeight;
      setTruncated(isTruncated);
    };

    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [lines, children]);

  return (
    <Tooltip
      title={truncated ? title : ''}
      placement={placement}
      open={truncated && (hovered || forceOpen)}
      onOpen={() => setHovered(true)}
      onClose={() => setHovered(false)}
    >
      <Typography
        ref={ref}
        noWrap={lines === 1}
        sx={[
          lines > 1 && {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: lines,
            overflow: 'hidden',
            overflowWrap: 'anywhere',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...props}
      >
        {children}
      </Typography>
    </Tooltip>
  );
};

/**
 * ProjectCard component - A card for a project with an icon, name, description,
 * last updated time and an optional delete action shown on hover.
 *
 * @example
 * ```tsx
 * <ProjectCard
 *   title="Default"
 *   description="Default project"
 *   updatedTime="1 day ago"
 *   onClick={() => openProject(id)}
 *   onDelete={() => deleteProject(id)}
 * />
 * ```
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  icon,
  iconColor = 'primary',
  updatedTime,
  updatedLabel,
  updatedDateTime,
  updatedTooltip,
  onDelete,
  deleteLabel = 'Delete project',
  actions,
  onClick,
  href,
  selected = false,
  onFocus,
  onBlur,
  onKeyDown,
  sx,
  ...props
}) => {
  const interactive = Boolean(onClick || href);
  // Keyboard focus opens the tooltips of cut-off text, since the text itself cannot take focus.
  const [keyboardFocus, setKeyboardFocus] = React.useState(false);
  // The footer reserves the actual width of the hover actions, so wide custom actions do not overlap the time.
  const actionsRef = React.useRef<HTMLDivElement | null>(null);
  const [actionsWidth, setActionsWidth] = React.useState(0);
  const footerActions =
    actions ??
    (onDelete ? (
      <Tooltip title={deleteLabel}>
        <IconButton size="small" color="error" aria-label={deleteLabel} onClick={onDelete}>
          <Trash2 size={20} />
        </IconButton>
      </Tooltip>
    ) : null);
  const hasActions = Boolean(footerActions);
  const hasFooter = Boolean(updatedTime) || hasActions;

  React.useLayoutEffect(() => {
    const element = actionsRef.current;
    if (!element) {
      setActionsWidth(0);
      return undefined;
    }
    setActionsWidth(element.offsetWidth);
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(() => setActionsWidth(element.offsetWidth));
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasActions]);

  const content = (
    <>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
        <Box
          aria-hidden="true"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: 52,
            height: 52,
            borderRadius: '50%',
            bgcolor: `${iconColor}.main`,
            color: `${iconColor}.contrastText`,
          }}
        >
          {icon ?? <BoxIcon size={24} />}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          {/* A heading is not valid inside the button/link of a clickable card, so it is a plain block there. */}
          <TruncatedText
            title={title}
            variant="h6"
            component={interactive ? 'span' : 'h3'}
            forceOpen={keyboardFocus}
            sx={{ display: 'block', fontWeight: 700, fontSize: '1.125rem' }}
          >
            {title}
          </TruncatedText>
          {description && (
            <TruncatedText
              title={description}
              lines={DESCRIPTION_LINES}
              placement="bottom-start"
              forceOpen={keyboardFocus}
              variant="body2"
              color="text.secondary"
              // Slightly dimmed; any lower fails the 4.5:1 text contrast in light mode.
              sx={{ mt: 0.5, opacity: 0.9 }}
            >
              {description}
            </TruncatedText>
          )}
        </Box>
      </CardContent>
      {hasFooter && (
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: FOOTER_HEIGHT,
            px: 2.5,
            py: 0,
            // Leave room for the hover actions, which are positioned over the right side.
            pr: hasActions ? `${actionsWidth + ACTIONS_OFFSET + ACTIONS_GAP}px` : 2.5,
            '&:last-child': { pb: 0 },
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {updatedTime && (
            <RelativeTime
              action={updatedLabel}
              time={updatedTime}
              dateTime={updatedDateTime}
              tooltip={updatedTooltip}
            />
          )}
        </CardContent>
      )}
    </>
  );

  // The hover and selected highlight is an inset outline, so the theme's own card border (and its
  // width) is left alone and the layout does not shift.
  const highlight = { outline: '1px solid', outlineColor: 'primary.main', outlineOffset: '-1px' };

  return (
    <Card
      data-selected={selected || undefined}
      onFocus={event => {
        try {
          setKeyboardFocus(event.target.matches(':focus-visible'));
        } catch {
          setKeyboardFocus(false);
        }
        onFocus?.(event);
      }}
      onBlur={event => {
        setKeyboardFocus(false);
        onBlur?.(event);
      }}
      onKeyDown={event => {
        if (event.key === 'Escape') setKeyboardFocus(false);
        onKeyDown?.(event);
      }}
      sx={[
        {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 280,
          minHeight: 160,
          // Fills its grid cell, so cards in a row have the same height.
          height: '100%',
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          '&:hover': { ...highlight, boxShadow: 4, transform: 'translateY(-2px)' },
          '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
          '&:hover .ProjectCard-actions, &:focus-within .ProjectCard-actions': { opacity: 1 },
        },
        selected && highlight,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {interactive ? (
        <CardActionArea
          onClick={onClick}
          {...(href ? { component: 'a', href } : {})}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
          }}
        >
          {content}
        </CardActionArea>
      ) : (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {content}
        </Box>
      )}
      {footerActions && (
        // Sits over the footer, outside the clickable area, so the buttons are not nested in it.
        <Box
          ref={actionsRef}
          className="ProjectCard-actions"
          sx={{
            position: 'absolute',
            right: ACTIONS_OFFSET,
            bottom: 0,
            height: FOOTER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            opacity: 0,
            transition: 'opacity 150ms',
            '@media (hover: none)': { opacity: 1 },
          }}
        >
          {footerActions}
        </Box>
      )}
    </Card>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
