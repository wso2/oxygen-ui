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
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { DrawerPanelContext } from './context';
import { DrawerPanelHeader } from './DrawerPanelHeader';
import { DrawerPanelTitle } from './DrawerPanelTitle';
import { DrawerPanelActions } from './DrawerPanelActions';
import { DrawerPanelExpandButton } from './DrawerPanelExpandButton';
import { DrawerPanelCloseButton } from './DrawerPanelCloseButton';
import { DrawerPanelBody } from './DrawerPanelBody';
import { DrawerPanelFooter } from './DrawerPanelFooter';

/**
 * Theme tokens used in this component:
 *
 * Drawer uses theme's paper background and elevation.
 * Responsive behavior:
 * - Full width on xs (mobile); the expand button is hidden there
 * - `width` or `expandedWidth` on sm+ (tablet/desktop), animated between the two
 */

/**
 * Props for styled DrawerPanelRoot.
 */
interface DrawerPanelRootProps {
  ownerState: {
    width: number | string;
    expandedWidth: number | string;
    expanded: boolean;
  };
}

/**
 * Styled drawer for the panel.
 */
const DrawerPanelRoot = styled(Drawer, {
  name: 'MuiDrawerPanel',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<DrawerPanelRootProps>(({ theme, ownerState }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: ownerState.expanded
        ? ownerState.expandedWidth
        : ownerState.width,
    },
  },
}));

/**
 * Props for the DrawerPanel component.
 */
export interface DrawerPanelProps {
  /** Whether the panel is open */
  open: boolean;
  /** Callback fired when the panel requests to close (close button, backdrop click, Escape) */
  onClose: () => void;
  /** Panel content, typically Header, Body and Footer */
  children: React.ReactNode;
  /** Panel width on sm+ screens (default: 560) */
  width?: number | string;
  /** Panel width on sm+ screens while expanded (default: `'100%'`) */
  expandedWidth?: number | string;
  /** Whether the panel is expanded (controlled) */
  expanded?: boolean;
  /** Initial expanded state when uncontrolled (default: false) */
  defaultExpanded?: boolean;
  /** Callback fired when the expand button toggles the width */
  onExpandedChange?: (expanded: boolean) => void;
  /** Drawer anchor position (default: 'right') */
  anchor?: 'left' | 'right';
  /** Drawer variant (default: 'temporary') */
  variant?: 'temporary' | 'persistent';
  /**
   * Accessible name for the drawer. Only needed when the panel has no
   * `DrawerPanel.Title`; otherwise the title names the drawer.
   */
  'aria-label'?: string;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * DrawerPanel - Slide-out side panel compound component.
 *
 * Use it to show details or secondary tasks for an item without leaving the
 * current page (for example build details, log entries or resource settings).
 *
 * Features:
 * - Right-anchored drawer that slides in over the page
 * - Title with optional icon that names the drawer for assistive technology
 * - Optional expand button that widens the panel (controlled or uncontrolled)
 * - Close button wired to `onClose` through context
 * - Fixed header and footer with a scrollable body
 * - Responsive width (full on mobile, fixed on desktop)
 *
 * @example
 * <DrawerPanel open={open} onClose={handleClose}>
 *   <DrawerPanel.Header>
 *     <DrawerPanel.Title icon={<ListTree size={20} />}>Build details</DrawerPanel.Title>
 *     <DrawerPanel.Actions>
 *       <DrawerPanel.ExpandButton />
 *       <DrawerPanel.CloseButton />
 *     </DrawerPanel.Actions>
 *   </DrawerPanel.Header>
 *   <DrawerPanel.Body>...</DrawerPanel.Body>
 *   <DrawerPanel.Footer>
 *     <Button variant="contained">Rerun build</Button>
 *   </DrawerPanel.Footer>
 * </DrawerPanel>
 */
const DrawerPanel: React.FC<DrawerPanelProps> & {
  Header: typeof DrawerPanelHeader;
  Title: typeof DrawerPanelTitle;
  Actions: typeof DrawerPanelActions;
  ExpandButton: typeof DrawerPanelExpandButton;
  CloseButton: typeof DrawerPanelCloseButton;
  Body: typeof DrawerPanelBody;
  Footer: typeof DrawerPanelFooter;
} = ({
  open,
  onClose,
  children,
  width = 560,
  expandedWidth = '100%',
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  anchor = 'right',
  variant = 'temporary',
  'aria-label': ariaLabel,
  sx,
}) => {
  const titleId = React.useId();
  const [expandedState, setExpandedState] = React.useState(defaultExpanded);
  const isControlled = expandedProp !== undefined;
  const expanded = isControlled ? expandedProp : expandedState;

  const toggleExpanded = React.useCallback(() => {
    const next = !expanded;
    if (!isControlled) {
      setExpandedState(next);
    }
    onExpandedChange?.(next);
  }, [expanded, isControlled, onExpandedChange]);

  const contextValue = React.useMemo(
    () => ({ open, onClose, expanded, toggleExpanded, titleId }),
    [open, onClose, expanded, toggleExpanded, titleId]
  );
  const ownerState = { width, expandedWidth, expanded };

  // The Slide transition writes `transition: transform ...` inline on the paper,
  // which overrides any stylesheet transition. Append the width transition once
  // the slide-in finishes; Slide replaces the inline value again on exit.
  const theme = useTheme();
  const handleEntered = React.useCallback(
    (node: HTMLElement) => {
      const widthTransition = theme.transitions.create('width', {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      });
      node.style.transition = node.style.transition
        ? `${node.style.transition}, ${widthTransition}`
        : widthTransition;
    },
    [theme]
  );

  return (
    <DrawerPanelContext.Provider value={contextValue}>
      <DrawerPanelRoot
        anchor={anchor}
        open={open}
        onClose={onClose}
        ownerState={ownerState}
        sx={sx}
        variant={variant}
        slotProps={{
          paper: ariaLabel ? { 'aria-label': ariaLabel } : { 'aria-labelledby': titleId },
          transition: { onEntered: handleEntered },
        }}
      >
        {children}
      </DrawerPanelRoot>
    </DrawerPanelContext.Provider>
  );
};

/**
 * DrawerPanel compound component with attached sub-components.
 *
 * Sub-components:
 * - `DrawerPanel.Header` - Top row holding the title and actions
 * - `DrawerPanel.Title` - Panel heading with optional icon; names the drawer
 * - `DrawerPanel.Actions` - Right-aligned group of header actions
 * - `DrawerPanel.ExpandButton` - Toggles between default and expanded width
 * - `DrawerPanel.CloseButton` - Closes the panel
 * - `DrawerPanel.Body` - Scrollable main content
 * - `DrawerPanel.Footer` - Sticky footer for panel actions
 */
DrawerPanel.Header = DrawerPanelHeader;
DrawerPanel.Title = DrawerPanelTitle;
DrawerPanel.Actions = DrawerPanelActions;
DrawerPanel.ExpandButton = DrawerPanelExpandButton;
DrawerPanel.CloseButton = DrawerPanelCloseButton;
DrawerPanel.Body = DrawerPanelBody;
DrawerPanel.Footer = DrawerPanelFooter;
DrawerPanel.displayName = 'DrawerPanel';

export { DrawerPanel };
export default DrawerPanel;
