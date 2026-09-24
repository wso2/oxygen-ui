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
import { isContextSwitcherOption } from './ContextSwitcherOption';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `text.secondary` - Group label
 *
 * Typography:
 * - `typography.caption` - Group label size
 */

const GroupLabel = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'GroupLabel',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  display: 'block',
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  minWidth: 0,
  overflow: 'hidden',
  padding: theme.spacing(1, 1.5, 0.5),
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

/**
 * Props for a labelled cluster of options.
 */
export interface ContextSwitcherGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Accessible name of the group. */
  label: string;
  /** Options in this group. */
  children: React.ReactNode;
}

/**
 * ContextSwitcher.Group - A labelled cluster of options inside a level panel.
 *
 * The visible label is hidden from assistive tech. The group itself is named
 * with `aria-label` and owns only options, which is what a listbox group may own.
 * The group is omitted when every option is filtered out by search.
 * A label that does not fit is cut with an ellipsis. Hovering it shows the full text.
 */
export const isContextSwitcherGroup = (
  child: React.ReactNode
): child is React.ReactElement<ContextSwitcherGroupProps> =>
  React.isValidElement<ContextSwitcherGroupProps>(child) && child.type === ContextSwitcherGroup;

export const ContextSwitcherGroup = React.forwardRef<HTMLDivElement, ContextSwitcherGroupProps>(
  function ContextSwitcherGroup({ label, children, ...rest }, ref) {
    const { query } = useLevelPanel();
    const labelRef = React.useRef<HTMLSpanElement>(null);
    const [nameTooltipOpen, setNameTooltipOpen] = React.useState(false);
    const visible = React.Children.toArray(children).some(
      (child) => isContextSwitcherOption(child) && matchesQuery(nodeText(child.props.children), query)
    );

    if (!visible) {
      return null;
    }

    const showNameTooltip = () => {
      setNameTooltipOpen(isTruncated(labelRef.current));
    };
    const hideNameTooltip = () => {
      setNameTooltipOpen(false);
    };

    return (
      <div {...rest} ref={ref} role="group" aria-label={label}>
        <OverflowTooltip
          title={tooltipLabel(label)}
          open={nameTooltipOpen}
          onClose={hideNameTooltip}
          placement="right-start"
        >
          <GroupLabel
            ref={labelRef}
            aria-hidden="true"
            onMouseEnter={showNameTooltip}
            onMouseLeave={hideNameTooltip}
          >
            {label}
          </GroupLabel>
        </OverflowTooltip>
        {children}
      </div>
    );
  }
);

ContextSwitcherGroup.displayName = 'ContextSwitcher.Group';

export default ContextSwitcherGroup;
