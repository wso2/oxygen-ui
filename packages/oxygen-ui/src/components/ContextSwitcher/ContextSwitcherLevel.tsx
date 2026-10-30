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
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import ComplexSelect from '../ComplexSelect';
import { useContextSwitcher } from './context';
import { isContextSwitcherGroup } from './ContextSwitcherGroup';
import { isContextSwitcherOption, type ContextSwitcherOptionProps } from './ContextSwitcherOption';
import { isTruncated, OverflowTooltip, tooltipLabel } from './OverflowTooltip';
import { flattenElements, nodeText } from './model';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `action.hover` - Empty field at rest
 * - `primary.main` - Open ring when the field is not joined to Back
 *
 * Spacing:
 * - Field value truncates at 180px
 */

const FieldWidth = styled(Box, {
  name: 'MuiContextSwitcher',
  slot: 'Field',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { joined: boolean; empty: boolean } }>(({ theme, ownerState }) => {
  const palette = (theme.vars || theme).palette;
  return {
    minWidth: 0,
    width: 180,
    maxWidth: 180,
    ...(ownerState.joined && {
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: 0,
        borderBottomRightRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    }),
    ...(!ownerState.joined &&
      ownerState.empty && {
        '& .MuiOutlinedInput-root': {
          backgroundColor: palette.action.hover,
        },
      }),
    '& .MuiSelect-select': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& .MuiListItemText-root, & .MuiTypography-root': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  };
});

/**
 * Props for one level in the chain.
 */
export interface ContextSwitcherLevelProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'id' | 'children' | 'onChange'> {
  /** Key used in the context value. */
  id: string;
  /** Name shown on the field, such as Organization. */
  label: string;
  /** The list shows a progress indicator instead of the options. */
  loading?: boolean;
  /** Shown when the level has no options. */
  noOptionsText?: string;
  /** Accessible name of the progress indicator. Defaults to `Loading ${label}`. */
  loadingLabel?: string;
  /** Shown on the field while the level has no selection. Defaults to `Select ${label}`. */
  promptText?: string;
  /**
   * Name of the Back control that returns to this level. Defaults to
   * `Go to the ${label} level`.
   */
  backLabel?: string;
  /** Options and groups for this level, in the order they should appear. */
  children?: React.ReactNode;
}

const optionLabel = (option: React.ReactElement<ContextSwitcherOptionProps>): string =>
  nodeText(option.props.children);

const mapOption = (
  option: React.ReactElement<ContextSwitcherOptionProps>,
  onPick: (optionValue: string) => void
): React.ReactNode => (
  <ComplexSelect.MenuItem
    key={option.props.value}
    value={option.props.value}
    disabled={option.props.disabled}
    onClick={() => {
      if (option.props.disabled) {
        return;
      }
      // Select skips onChange when the value does not change. onClick still runs
      // so choosing the same option can open the next level.
      onPick(option.props.value);
    }}
  >
    <ComplexSelect.MenuItem.Text primary={option.props.children} />
  </ComplexSelect.MenuItem>
);

const mapChildren = (
  children: React.ReactNode,
  onPick: (optionValue: string) => void
): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  flattenElements(children).forEach((child) => {
    if (isContextSwitcherOption(child)) {
      nodes.push(mapOption(child, onPick));
      return;
    }
    if (isContextSwitcherGroup(child)) {
      const options = flattenElements(child.props.children).filter(isContextSwitcherOption);
      if (options.length === 0) {
        return;
      }
      nodes.push(
        <ComplexSelect.ListHeader key={`group-${child.props.label}`}>{child.props.label}</ComplexSelect.ListHeader>
      );
      options.forEach((option) => {
        nodes.push(mapOption(option, onPick));
      });
    }
  });
  return nodes;
};

const collectOptions = (children: React.ReactNode): React.ReactElement<ContextSwitcherOptionProps>[] => {
  const options: React.ReactElement<ContextSwitcherOptionProps>[] = [];
  flattenElements(children).forEach((child) => {
    if (isContextSwitcherOption(child)) {
      options.push(child);
      return;
    }
    if (isContextSwitcherGroup(child)) {
      options.push(...flattenElements(child.props.children).filter(isContextSwitcherOption));
    }
  });
  return options;
};

/**
 * ContextSwitcher.Level - One field in the chain, drawn as a ComplexSelect.
 *
 * The level name sits inside the field. The chosen option sits under it. An empty
 * level reads the prompt. A long name stops at 180px, and hovering shows the full
 * text. Groups become list headers. Options become menu items.
 */
export const ContextSwitcherLevel = React.forwardRef<HTMLDivElement, ContextSwitcherLevelProps>(
  function ContextSwitcherLevel(
    {
      id,
      label,
      loading = false,
      noOptionsText = 'No options',
      loadingLabel,
      promptText,
      backLabel: _backLabel,
      children,
      ...rest
    },
    ref
  ) {
    const { value, openId, joinedId, setOpenId, applyPick, moveFocus } = useContextSwitcher();
    const selected = value[id];
    const open = openId === id;
    const joined = joinedId === id;
    const prompt = promptText ?? `Select ${label.toLowerCase()}`;
    const options = collectOptions(children);
    const selectedOption = options.find((option) => option.props.value === selected);
    const displayName = selectedOption ? optionLabel(selectedOption) : selected || prompt;
    const fullName = `${label}: ${displayName}`;
    const valueRef = React.useRef<HTMLDivElement>(null);
    const [nameTooltipOpen, setNameTooltipOpen] = React.useState(false);

    const showNameTooltip = () => {
      setNameTooltipOpen(isTruncated(valueRef.current));
    };
    const hideNameTooltip = () => {
      setNameTooltipOpen(false);
    };

    const promptItem = (
      <ComplexSelect.MenuItem key="prompt" value="" disabled sx={{display: 'none'}}>
        <ComplexSelect.MenuItem.Text primary={prompt} />
      </ComplexSelect.MenuItem>
    );

    const pick = (optionValue: string) => {
      applyPick(id, optionValue);
    };

    const menuChildren = loading
      ? [
          promptItem,
          <ComplexSelect.MenuItem key="loading" value="__loading__" disabled>
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', py: 0.5}}>
              <CircularProgress size={20} aria-label={loadingLabel ?? `Loading ${label}`} />
            </Box>
          </ComplexSelect.MenuItem>,
        ]
      : options.length === 0
        ? [
            promptItem,
            <ComplexSelect.MenuItem key="empty" value="__empty__" disabled>
              <ComplexSelect.MenuItem.Text primary={noOptionsText} />
            </ComplexSelect.MenuItem>,
          ]
        : [promptItem, ...mapChildren(children, pick)];

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (open) {
        return;
      }
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      moveFocus(event.currentTarget, event.key === 'ArrowRight' ? 1 : -1);
    };

    return (
      <FieldWidth
        ref={ref}
        ownerState={{ joined, empty: !selected }}
        {...rest}
      >
        <OverflowTooltip
          title={tooltipLabel(fullName)}
          open={nameTooltipOpen}
          onClose={hideNameTooltip}
        >
          <div
            ref={valueRef}
            onMouseEnter={showNameTooltip}
            onMouseLeave={hideNameTooltip}
            onFocus={showNameTooltip}
            onBlur={hideNameTooltip}
          >
            <ComplexSelect
              label={label}
              labelAnchor="inside"
              displayEmpty
              fullWidth
              value={selected ?? ''}
              open={open}
              onOpen={() => setOpenId(id)}
              onClose={() => {
                // Keep a next-level open that applyPick just scheduled. Closing this
                // field must not clear that id.
                setOpenId((current) => (current === id ? null : current));
              }}
              SelectDisplayProps={
                {
                  'data-chain-stop': '',
                  'aria-label': fullName,
                  onKeyDown,
                } as React.HTMLAttributes<HTMLDivElement>
              }
              MenuProps={{
                MenuListProps: {
                  'aria-label': label,
                },
              }}
            >
              {menuChildren}
            </ComplexSelect>
          </div>
        </OverflowTooltip>
      </FieldWidth>
    );
  }
);

ContextSwitcherLevel.displayName = 'ContextSwitcher.Level';

export default ContextSwitcherLevel;
