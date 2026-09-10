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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Grip } from '@wso2/oxygen-ui-icons-react';
import { useAppSwitcher } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `text.primary` - Icon color while open
 * - `action.selected` - Background while the popover is open
 *
 * The resting color and hover styling are inherited from the theme's
 * `IconButton` defaults (`action.active`), so the trigger matches the other
 * icon buttons in the header.
 */

/**
 * Styled trigger button for the app switcher.
 */
const AppSwitcherTriggerRoot = styled(IconButton, {
  name: 'MuiAppSwitcher',
  slot: 'Trigger',
})(({ theme }) => ({
  '&[aria-expanded="true"]': {
    backgroundColor: (theme.vars || theme).palette.action.selected,
    color: (theme.vars || theme).palette.text.primary,
  },
}));

/**
 * Props for the AppSwitcher.Trigger component.
 */
export interface AppSwitcherTriggerProps
  extends Omit<React.ComponentProps<typeof IconButton>, 'children'> {
  /** Tooltip and accessible label for the trigger (default: `"Switch app"`) */
  label?: string;
  /** Custom icon replacing the default grid icon */
  icon?: React.ReactNode;
}

/**
 * AppSwitcher.Trigger - Icon button that opens the app switcher popover.
 *
 * Renders the grid ("grip") icon used across WSO2 Cloud headers. Extra props,
 * including `aria-*` attributes and `ref`, are forwarded to the underlying button.
 *
 * @example
 * ```tsx
 * <AppSwitcher>
 *   <AppSwitcher.Trigger />
 *   ...
 * </AppSwitcher>
 * ```
 */
export const AppSwitcherTrigger = React.forwardRef<HTMLButtonElement, AppSwitcherTriggerProps>(
  function AppSwitcherTrigger(
    { label = 'Switch app', icon, onClick, 'aria-label': ariaLabel, ...props },
    ref
  ) {
    const { open, popoverId, handleOpen } = useAppSwitcher();

    // Empty/whitespace labels must not wipe the default accessible name.
    const resolvedAriaLabel =
      typeof ariaLabel === 'string' && ariaLabel.trim().length > 0 ? ariaLabel : label;

    return (
      <Tooltip title={label}>
        <AppSwitcherTriggerRoot
          {...props}
          ref={ref}
          onClick={(event) => {
            handleOpen(event);
            onClick?.(event);
          }}
          aria-label={resolvedAriaLabel}
          aria-controls={open ? popoverId : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <span aria-hidden="true" style={{ display: 'inline-flex' }}>
            {icon || <Grip size={24} />}
          </span>
        </AppSwitcherTriggerRoot>
      </Tooltip>
    );
  }
);

AppSwitcherTrigger.displayName = 'AppSwitcher.Trigger';

export default AppSwitcherTrigger;
