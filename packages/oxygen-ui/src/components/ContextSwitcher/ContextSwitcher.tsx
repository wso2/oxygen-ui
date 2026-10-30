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
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { ArrowLeft } from '@wso2/oxygen-ui-icons-react';
import AppBreadcrumbs from '../AppBreadcrumbs';
import { ContextSwitcherContext, type ContextSwitcherValue } from './context';
import { ContextSwitcherLevel, type ContextSwitcherLevelProps } from './ContextSwitcherLevel';
import { ContextSwitcherGroup } from './ContextSwitcherGroup';
import { ContextSwitcherOption } from './ContextSwitcherOption';
import { normalizeValue, selectedLevelCount, clearFrom, selectLevel } from './model';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - Surface of Back and the current level
 * - `divider` - Border around Back and the current level, and the line between them
 * - `primary.main` - Ring while the current level is open
 * - `action.hover` - Back at rest
 * - `action.selected` - Back on hover
 * - `text.primary` - Back arrow, and the keyboard focus outline
 *
 * Shape:
 * - `shape.borderRadius` - Corners of Back and the current level
 */

const ChainRoot = styled(Box, {
  name: 'MuiContextSwitcher',
  slot: 'Root',
})({
  alignItems: 'center',
  display: 'flex',
  minWidth: 0,
});

interface JoinedOwnerState {
  open: boolean;
}

const LevelGroup = styled('div', {
  name: 'MuiContextSwitcher',
  slot: 'Joined',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: JoinedOwnerState }>(({ theme, ownerState }) => {
  const palette = (theme.vars || theme).palette;
  return {
    alignItems: 'stretch',
    backgroundColor: palette.background.paper,
    border: '1px solid',
    borderColor: ownerState.open ? palette.primary.main : palette.divider,
    borderRadius: theme.shape.borderRadius,
    boxShadow: ownerState.open ? `0 0 0 2px ${palette.primary.main}` : 'none',
    display: 'inline-flex',
    minWidth: 0,
  };
});

const BackButton = styled('button', {
  name: 'MuiContextSwitcher',
  slot: 'Back',
})(({ theme }) => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  backgroundColor: (theme.vars || theme).palette.action.hover,
  border: 0,
  borderBottomLeftRadius: theme.shape.borderRadius,
  borderRight: '1px solid',
  borderRightColor: (theme.vars || theme).palette.divider,
  color: (theme.vars || theme).palette.text.primary,
  cursor: 'pointer',
  display: 'inline-flex',
  flex: 'none',
  justifyContent: 'center',
  borderTopLeftRadius: theme.shape.borderRadius,
  minWidth: 40,
  padding: 0,
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.selected,
  },
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: `2px solid ${(theme.vars || theme).palette.text.primary}`,
    outlineOffset: 2,
  },
}));

/**
 * Props for the context switcher.
 */
export interface ContextSwitcherProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'children'> {
  /** Selected option value for each level id. A missing id means that level is empty. */
  value: ContextSwitcherValue;
  /** Called with the next map when the selection changes. */
  onChange: (value: ContextSwitcherValue) => void;
  /**
   * Show only the current level, with Back in front of it. The current level is the
   * deepest level with a selection, or the empty level whose options are open.
   * Off by default, which shows the chain.
   */
  back?: boolean;
  /** Levels, in order. */
  children: React.ReactNode;
}

const isLevel = (
  child: React.ReactNode
): child is React.ReactElement<ContextSwitcherLevelProps> =>
  React.isValidElement<ContextSwitcherLevelProps>(child) && child.type === ContextSwitcherLevel;

/** Levels in child order. A fragment is transparent. Any other wrapper is not. */
const levelElements = (
  children: React.ReactNode
): React.ReactElement<ContextSwitcherLevelProps>[] => {
  const levels: React.ReactElement<ContextSwitcherLevelProps>[] = [];
  React.Children.forEach(children, (child) => {
    if (isLevel(child)) {
      levels.push(child);
      return;
    }
    if (
      React.isValidElement<{ children?: React.ReactNode }>(child) &&
      child.type === React.Fragment
    ) {
      levels.push(...levelElements(child.props.children));
    }
  });
  return levels;
};

/**
 * ContextSwitcher - A chain of labeled fields for selecting through a hierarchy.
 *
 * Without Back, each visible level is a ComplexSelect in an AppBreadcrumbs trail
 * separated by a slash. With Back, only the current level is on screen, joined to
 * Back in one field. Choosing an option opens the next level's list. The same
 * option keeps the levels under it. A different option clears them. The product
 * places the switcher, usually in `Header.Switchers`, and routes from `onChange`.
 *
 * @example
 * ```tsx
 * <Header.Switchers>
 *   <ContextSwitcher value={value} onChange={setValue}>
 *     <ContextSwitcher.Level id="organization" label="Organization">
 *       <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
 *     </ContextSwitcher.Level>
 *     <ContextSwitcher.Level id="project" label="Project">
 *       <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
 *     </ContextSwitcher.Level>
 *   </ContextSwitcher>
 * </Header.Switchers>
 * ```
 */
export const ContextSwitcher = React.forwardRef<HTMLDivElement, ContextSwitcherProps>(
  function ContextSwitcher({ value, onChange, back = false, children, ...rest }, ref) {
    const chainRef = React.useRef<HTMLDivElement>(null);
    const focusFieldRef = React.useRef(false);
    const openEmptyRef = React.useRef<string | null>(null);
    const [openId, setOpenId] = React.useState<string | null>(null);
    const levels = levelElements(children);
    const levelKey = levels.map((level) => level.props.id).join('\0');
    const levelIds = React.useMemo(
      () => (levelKey.length === 0 ? [] : levelKey.split('\0')),
      [levelKey]
    );
    const normalized = React.useMemo(() => normalizeValue(levelIds, value), [levelIds, value]);
    const selectedCount = selectedLevelCount(levelIds, normalized);
    const openIndex = openId === null ? -1 : levelIds.indexOf(openId);
    const currentIndex =
      levels.length === 0
        ? -1
        : openIndex >= 0 && openIndex <= selectedCount
          ? openIndex
          : Math.max(selectedCount - 1, 0);
    const openEmptyId =
      back && openId !== null && openId === levelIds[currentIndex] && !normalized[openId]
        ? openId
        : null;
    const chainCount =
      levels.length === 0 ? 0 : Math.min(levels.length, Math.max(selectedCount + 1, 1));
    const visible = back
      ? currentIndex < 0
        ? []
        : [levels[currentIndex]]
      : levels.slice(0, chainCount);
    const visibleKey = visible.map((level) => level.props.id).join('\0');
    const parentLevel = back && currentIndex > 0 ? levels[currentIndex - 1] : null;
    const joinedId = parentLevel ? levelIds[currentIndex] : null;

    React.useEffect(() => {
      const visibleIds = visibleKey.length === 0 ? [] : visibleKey.split('\0');
      if (openId && !visibleIds.includes(openId)) {
        setOpenId(null);
      }
    }, [openId, visibleKey]);

    const moveFocus = React.useCallback((from: HTMLElement, direction: -1 | 1) => {
      const stops = chainRef.current?.querySelectorAll<HTMLElement>('[data-chain-stop]');
      if (!stops) {
        return;
      }
      const list = Array.from(stops);
      const index = list.indexOf(from);
      if (index < 0) {
        return;
      }
      list[index + direction]?.focus();
    }, []);

    const applyPick = React.useCallback(
      (levelId: string, optionValue: string) => {
        const index = levelIds.indexOf(levelId);
        const nextId = levelIds[index + 1] ?? null;
        if (normalized[levelId] !== optionValue) {
          onChange(selectLevel(levelIds, normalized, levelId, optionValue));
        }
        setOpenId(nextId);
      },
      [levelIds, normalized, onChange]
    );

    const stepBack = () => {
      if (currentIndex <= 0) {
        return;
      }
      const levelId = levelIds[currentIndex];
      if (normalized[levelId]) {
        onChange(clearFrom(levelIds, normalized, levelId));
      }
      setOpenId(null);
      focusFieldRef.current = true;
    };

    React.useLayoutEffect(() => {
      const currentId = levelIds[currentIndex];
      const dismissedEmpty =
        openEmptyRef.current !== null &&
        openEmptyRef.current !== currentId &&
        openId !== currentId;
      openEmptyRef.current = openEmptyId;
      if (!focusFieldRef.current && !dismissedEmpty) {
        return;
      }
      focusFieldRef.current = false;
      chainRef.current?.querySelector<HTMLElement>('[data-chain-stop]')?.focus();
    });

    const contextValue = React.useMemo(
      () => ({
        value: normalized,
        levelIds,
        openId,
        joinedId,
        setOpenId,
        onChange,
        moveFocus,
        applyPick,
      }),
      [normalized, levelIds, openId, joinedId, onChange, moveFocus, applyPick]
    );

    const onBackKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
        return;
      }
      event.preventDefault();
      moveFocus(event.currentTarget, event.key === 'ArrowRight' ? 1 : -1);
    };

    const backLabel = parentLevel
      ? (parentLevel.props.backLabel ?? `Go to the ${parentLevel.props.label} level`)
      : '';

    const trail = back ? (
      visible
    ) : (
      <AppBreadcrumbs
        separator="/"
        maxItems={Math.max(visible.length, 1)}
        items={visible.map((level) => ({
          key: level.props.id,
          label: level.props.label,
          field: level,
        }))}
      />
    );

    return (
      <ContextSwitcherContext.Provider value={contextValue}>
        <ChainRoot
          ref={(node: HTMLDivElement | null) => {
            chainRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          {...rest}
        >
          {parentLevel && joinedId ? (
            <LevelGroup
              role="group"
              aria-label={levels[currentIndex].props.label}
              ownerState={{ open: openId === joinedId }}
            >
              <Tooltip title={backLabel} enterDelay={0} enterNextDelay={0}>
                <BackButton
                  type="button"
                  data-chain-stop=""
                  data-context-switcher-back=""
                  aria-label={backLabel}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={stepBack}
                  onKeyDown={onBackKeyDown}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                </BackButton>
              </Tooltip>
              {visible}
            </LevelGroup>
          ) : back ? (
            visible
          ) : (
            trail
          )}
        </ChainRoot>
      </ContextSwitcherContext.Provider>
    );
  }
) as React.ForwardRefExoticComponent<ContextSwitcherProps & React.RefAttributes<HTMLDivElement>> & {
  Level: typeof ContextSwitcherLevel;
  Group: typeof ContextSwitcherGroup;
  Option: typeof ContextSwitcherOption;
};

ContextSwitcher.Level = ContextSwitcherLevel;
ContextSwitcher.Group = ContextSwitcherGroup;
ContextSwitcher.Option = ContextSwitcherOption;
ContextSwitcher.displayName = 'ContextSwitcher';

export default ContextSwitcher;
