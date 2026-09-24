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
import { styled } from '@mui/material/styles';
import { matchesQuery, nodeText } from './model';
import { isTruncated, OverflowTooltip, tooltipLabel } from './OverflowTooltip';
import { useLevelPanel } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `action.selected` - Background of the current option
 * - `action.hover` - Background while hovering an enabled option
 * - `text.primary` - Option label
 */

const OptionRoot = styled('div', {
  name: 'MuiContextSwitcher',
  slot: 'Option',
})(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: (theme.vars || theme).palette.text.primary,
  cursor: 'pointer',
  fontSize: theme.typography.body2.fontSize,
  lineHeight: 1.4,
  padding: theme.spacing(1, 1.5),
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.hover,
  },
  '&[aria-selected="true"]': {
    backgroundColor: (theme.vars || theme).palette.action.selected,
  },
  '&[aria-disabled="true"]': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '&[aria-disabled="true"]:hover': {
    backgroundColor: 'transparent',
  },
  '&:focus-visible': {
    outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
    outlineOffset: -2,
  },
}));

const OptionLabel = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'OptionLabel',
})({
  display: 'block',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/**
 * Props for a single choice in a level.
 */
export interface ContextSwitcherOptionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onKeyDown'> {
  /** Value written into the context map when this option is picked. */
  value: string;
  /** Shown, but cannot be picked. */
  disabled?: boolean;
  /** Label. This text is what search filters. */
  children: React.ReactNode;
}

/**
 * A listbox option is an owned `role="option"` node. A button cannot fill that
 * role, so the option is a div that handles click and Enter/Space.
 * The label stays on one line. Hovering or focusing a cut-off label shows
 * the full text.
 */
export const isContextSwitcherOption = (
  child: React.ReactNode
): child is React.ReactElement<ContextSwitcherOptionProps> =>
  React.isValidElement<ContextSwitcherOptionProps>(child) && child.type === ContextSwitcherOption;

/**
 * ContextSwitcher.Option - One choice in a level's panel.
 *
 * Renders nothing while the level's search query does not match its text.
 */
export const ContextSwitcherOption = React.forwardRef<HTMLDivElement, ContextSwitcherOptionProps>(
  function ContextSwitcherOption(
    { value, disabled = false, children, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest },
    ref
  ) {
    const { query, selectedValue, onSelect } = useLevelPanel();
    const text = nodeText(children);
    const textRef = React.useRef<HTMLSpanElement>(null);
    const [nameTooltipOpen, setNameTooltipOpen] = React.useState(false);

    if (!matchesQuery(text, query)) {
      return null;
    }

    const pick = () => {
      if (!disabled) {
        onSelect(value);
      }
    };

    const showNameTooltip = () => {
      setNameTooltipOpen(isTruncated(textRef.current));
    };
    const hideNameTooltip = () => {
      setNameTooltipOpen(false);
    };

    return (
      <OptionRoot
        {...rest}
        ref={ref}
        role="option"
        aria-selected={selectedValue === value}
        aria-disabled={disabled || undefined}
        tabIndex={-1}
        onClick={pick}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          showNameTooltip();
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          hideNameTooltip();
        }}
        onFocus={(event) => {
          onFocus?.(event);
          showNameTooltip();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          hideNameTooltip();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            pick();
          }
        }}
      >
        <OverflowTooltip
          title={tooltipLabel(text)}
          open={nameTooltipOpen}
          onClose={hideNameTooltip}
          placement="right-start"
        >
          <OptionLabel ref={textRef}>{children}</OptionLabel>
        </OverflowTooltip>
      </OptionRoot>
    );
  }
);

ContextSwitcherOption.displayName = 'ContextSwitcher.Option';

export default ContextSwitcherOption;
