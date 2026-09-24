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
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';

/** True when the element is clipping its text. */
export const isTruncated = (node: HTMLElement | null): boolean =>
  node !== null && node.scrollWidth > node.clientWidth;

/** Collapse whitespace so the tooltip matches the accessible name. */
export const tooltipLabel = (value: string): string => value.replace(/\s+/g, ' ').trim();

interface OverflowTooltipProps {
  /** Full text. Shown only while `open` is true. */
  title: string;
  open: boolean;
  onClose: () => void;
  /** Where the full name sits relative to the cut-off text. */
  placement?: TooltipProps['placement'];
  children: React.ReactElement;
}

/**
 * Tooltip for a name that has already been cut with an ellipsis.
 * The caller sets `open` after measuring the text, so a name that fits stays quiet.
 */
export const OverflowTooltip = ({
  title,
  open,
  onClose,
  placement = 'bottom-start',
  children,
}: OverflowTooltipProps): React.ReactElement => {
  if (title.length === 0) {
    return children;
  }

  return (
    <Tooltip
      title={title}
      open={open}
      onClose={onClose}
      disableInteractive
      disableFocusListener
      disableHoverListener
      disableTouchListener
      placement={placement}
    >
      {children}
    </Tooltip>
  );
};
