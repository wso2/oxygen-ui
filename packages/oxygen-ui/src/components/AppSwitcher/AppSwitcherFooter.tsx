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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { ChevronRight } from '@wso2/oxygen-ui-icons-react';
import { useAppSwitcher } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `divider` - Top separator
 * - `action.hover` - Footer background
 * - `text.secondary` - Description text
 */

/**
 * Styled footer container.
 */
const AppSwitcherFooterRoot = styled(Box, {
  name: 'MuiAppSwitcher',
  slot: 'Footer',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2),
  borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
  backgroundColor: (theme.vars || theme).palette.action.hover,
}));

/**
 * Styled footer description text.
 */
const AppSwitcherFooterText = styled(Typography, {
  name: 'MuiAppSwitcher',
  slot: 'FooterText',
})(({ theme }) => ({
  fontSize: 13,
  color: (theme.vars || theme).palette.text.secondary,
}));

/**
 * Splits leftover props into those that describe the footer element itself
 * (`data-*`) and those intended for the trailing action (e.g. a router's `to`).
 */
const splitFooterProps = (
  props: Record<string, unknown>
): { rootProps: Record<string, unknown>; actionProps: Record<string, unknown> } => {
  const rootProps: Record<string, unknown> = {};
  const actionProps: Record<string, unknown> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('data-')) {
      rootProps[key] = value;
    } else {
      actionProps[key] = value;
    }
  });

  return { rootProps, actionProps };
};

/**
 * Props for the AppSwitcher.Footer component.
 */
export interface AppSwitcherFooterProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'color'> {
  /** Supporting text on the left (e.g. `"Manage Organization & Users, billing"`) */
  description?: React.ReactNode;
  /** Label of the trailing action (e.g. `"WSO2 Cloud Console"`) */
  actionLabel?: string;
  /**
   * Custom component for the trailing action, e.g. a router `Link`.
   * Router-specific props such as `to` are forwarded through.
   */
  component?: React.ElementType;
  /** Destination URL for the trailing action */
  href?: string;
  /** Anchor target, only applied together with `href` */
  target?: string;
  /** Click handler for the trailing action. The popover closes after it runs. */
  onActionClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Custom footer content, replacing the description/action layout */
  children?: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppSwitcher.Footer - Bottom row of the app switcher popover.
 *
 * Pairs supporting text with a trailing link action, typically pointing at the
 * cloud console. Pass `children` to render fully custom footer content instead.
 *
 * @example
 * ```tsx
 * <AppSwitcher.Footer
 *   description="Manage Organization & Users, billing"
 *   actionLabel="WSO2 Cloud Console"
 *   href="https://console.wso2.com"
 * />
 * ```
 */
export const AppSwitcherFooter: React.FC<AppSwitcherFooterProps> = ({
  description,
  actionLabel,
  component,
  href,
  target,
  onActionClick,
  children,
  sx,
  className,
  id,
  ...props
}) => {
  const { handleClose } = useAppSwitcher();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onActionClick?.(event);
    handleClose();
  };

  // `className`, `id` and `data-*` describe the footer itself, so they belong on
  // the root; anything else (e.g. a router's `to`) is meant for the action.
  const { rootProps, actionProps } = splitFooterProps(props);

  if (children) {
    return (
      <AppSwitcherFooterRoot sx={sx} className={className} id={id} {...rootProps}>
        {children}
      </AppSwitcherFooterRoot>
    );
  }

  return (
    <AppSwitcherFooterRoot sx={sx} className={className} id={id} {...rootProps}>
      {description && <AppSwitcherFooterText>{description}</AppSwitcherFooterText>}
      {actionLabel && (
        <Button
          size="small"
          color="primary"
          endIcon={<ChevronRight size={16} aria-hidden="true" />}
          {...actionProps}
          {...(component && { component })}
          {...(href
            ? {
                href,
                target,
                ...(target === '_blank' && { rel: 'noopener noreferrer' }),
              }
            : {})}
          onClick={handleClick}
        >
          {actionLabel}
        </Button>
      )}
    </AppSwitcherFooterRoot>
  );
};

AppSwitcherFooter.displayName = 'AppSwitcher.Footer';

export default AppSwitcherFooter;
