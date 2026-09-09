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
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { AppSwitcherContext } from './context';
import { AppSwitcherTrigger } from './AppSwitcherTrigger';
import { AppSwitcherSection } from './AppSwitcherSection';
import { AppSwitcherApp } from './AppSwitcherApp';
import { AppSwitcherFooter } from './AppSwitcherFooter';

/**
 * Theme tokens used in this component:
 *
 * Popover surface uses the theme's paper background and elevation.
 *
 * Responsive behavior:
 * - Width capped to the viewport on xs (mobile)
 * - Fixed width from sm up (tablet/desktop)
 */

/**
 * Styled popover for the app switcher.
 */
const AppSwitcherRoot = styled(Popover, {
  name: 'MuiAppSwitcher',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { width: number } }>(({ theme, ownerState }) => ({
  '& .MuiPopover-paper': {
    width: `calc(100vw - ${theme.spacing(4)})`,
    maxWidth: '100%',
    marginTop: theme.spacing(1),
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      width: ownerState.width,
    },
  },
}));

/**
 * Props for the AppSwitcher component.
 */
export interface AppSwitcherProps {
  /** Switcher content (Trigger, Section, App, Footer) */
  children: React.ReactNode;
  /** Popover width in pixels from the `sm` breakpoint up (default: 440) */
  width?: number;
  /** Accessible name for the popover surface (default: `"Applications"`) */
  'aria-label'?: string;
  /** Additional sx props applied to the popover */
  sx?: SxProps<Theme>;
}

/**
 * AppSwitcher - Popover for navigating between WSO2 Cloud applications.
 *
 * A compound component that pairs a grid icon button in the header with a
 * popover listing the available platforms. Children other than the trigger are
 * rendered inside the popover.
 *
 * Features:
 * - Compound component pattern for maximum flexibility
 * - Context-based open/close state sharing
 * - Card buttons that render as links when given an `href`
 * - Current, disabled and status-chip states per application
 * - Responsive popover width (viewport-capped on mobile, fixed on desktop)
 *
 * @example
 * ```tsx
 * <Header.Actions>
 *   <AppSwitcher>
 *     <AppSwitcher.Trigger />
 *     <AppSwitcher.Section label="Platforms">
 *       <AppSwitcher.App
 *         name="Agent"
 *         icon={<Bot size={20} />}
 *         status="Current"
 *         current
 *       />
 *       <AppSwitcher.App
 *         name="API Management"
 *         icon={<Braces size={20} />}
 *         status="Try Now"
 *         href="/apim"
 *       />
 *     </AppSwitcher.Section>
 *     <AppSwitcher.Footer
 *       description="Manage Organization & Users, billing"
 *       actionLabel="WSO2 Cloud Console"
 *       href="https://console.wso2.com"
 *     />
 *   </AppSwitcher>
 * </Header.Actions>
 * ```
 */
const AppSwitcher: React.FC<AppSwitcherProps> & {
  Trigger: typeof AppSwitcherTrigger;
  Section: typeof AppSwitcherSection;
  App: typeof AppSwitcherApp;
  Footer: typeof AppSwitcherFooter;
} = ({ children, width = 440, 'aria-label': ariaLabelProp, sx }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverId = React.useId();

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Empty/whitespace labels must not wipe the default accessible name.
  const ariaLabel =
    typeof ariaLabelProp === 'string' && ariaLabelProp.trim().length > 0
      ? ariaLabelProp
      : 'Applications';

  const contextValue = React.useMemo(
    () => ({ open, anchorEl, popoverId, handleOpen, handleClose }),
    [open, anchorEl, popoverId, handleOpen, handleClose]
  );

  // Separate the trigger (rendered inline) from the popover content.
  const childrenArray = React.Children.toArray(children);
  const triggerChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === AppSwitcherTrigger
  );
  const popoverChildren = childrenArray.filter(
    (child) => !(React.isValidElement(child) && child.type === AppSwitcherTrigger)
  );

  return (
    <AppSwitcherContext.Provider value={contextValue}>
      {triggerChild}
      <AppSwitcherRoot
        id={popoverId}
        ownerState={{ width }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { 'aria-label': ariaLabel } }}
        sx={sx}
      >
        {popoverChildren}
      </AppSwitcherRoot>
    </AppSwitcherContext.Provider>
  );
};

/**
 * AppSwitcher compound component with attached sub-components.
 *
 * Sub-components:
 * - `AppSwitcher.Trigger` - Grid icon button that opens the popover
 * - `AppSwitcher.Section` - Labelled grid of applications
 * - `AppSwitcher.App` - Card button for a single application
 * - `AppSwitcher.Footer` - Bottom row with supporting text and a link action
 */
AppSwitcher.Trigger = AppSwitcherTrigger;
AppSwitcher.Section = AppSwitcherSection;
AppSwitcher.App = AppSwitcherApp;
AppSwitcher.Footer = AppSwitcherFooter;
AppSwitcher.displayName = 'AppSwitcher';

export { AppSwitcher };
export default AppSwitcher;
