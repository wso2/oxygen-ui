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
import { ChevronLeft } from '@wso2/oxygen-ui-icons-react';
import { ContextSwitcherContext, type ContextSwitcherValue } from './context';
import { ContextSwitcherLevel, type ContextSwitcherLevelProps } from './ContextSwitcherLevel';
import { ContextSwitcherGroup } from './ContextSwitcherGroup';
import { ContextSwitcherOption } from './ContextSwitcherOption';
import { normalizeValue, selectedLevelCount, clearFrom, selectLevel, sameSelection } from './model';

/**
 * Theme tokens used in this component:
 *
 * Spacing:
 * - `spacing(1)` - Gap between level fields
 */

const ChainRoot = styled(Box, {
  name: 'MuiContextSwitcher',
  slot: 'Root',
})(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1),
  minWidth: 0,
}));

const LevelSlash = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'Slash',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  flex: 'none',
}));

const BackButton = styled('button', {
  name: 'MuiContextSwitcher',
  slot: 'Back',
})(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  borderRadius: theme.shape.borderRadius,
  color: (theme.vars || theme).palette.text.primary,
  cursor: 'pointer',
  display: 'inline-flex',
  flex: 'none',
  height: 48,
  justifyContent: 'center',
  minWidth: 40,
  padding: 0,
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.hover,
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
   * Show Back and only the current level. Off by default, which shows the chain.
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
 * The chain shows the first level, and each following level once the level above
 * it has a selection. An empty level stays on screen and reads "Select {label}".
 * A slash separates the levels. `back` shows Back and only the current level.
 * Back steps up one level. Choosing an option opens the next level's panel.
 * The same option keeps the levels under it. A different option clears them.
 * The product places the switcher, usually in `Header.Switchers`, and routes
 * from `onChange` when the selection changes.
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
    const emittedRef = React.useRef<ContextSwitcherValue | null>(null);
    const [openId, setOpenId] = React.useState<string | null>(null);
    const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
    const levels = levelElements(children);
    const levelKey = levels.map((level) => level.props.id).join('\0');
    const levelIds = React.useMemo(
      () => (levelKey.length === 0 ? [] : levelKey.split('\0')),
      [levelKey]
    );
    const normalized = React.useMemo(() => normalizeValue(levelIds, value), [levelIds, value]);
    const committedRef = React.useRef(normalized);
    const selectedCount = selectedLevelCount(levelIds, normalized);
    const derivedIndex =
      levels.length === 0 ? -1 : selectedCount < levels.length ? selectedCount : selectedCount - 1;
    const currentIndex =
      pinnedIndex !== null && pinnedIndex >= 0 && pinnedIndex < levels.length
        ? pinnedIndex
        : derivedIndex;
    const chainCount =
      levels.length === 0 ? 0 : Math.min(levels.length, Math.max(selectedCount + 1, 1));
    const visible = back
      ? currentIndex < 0
        ? []
        : [levels[currentIndex]]
      : levels.slice(0, chainCount);
    const visibleKey = visible.map((level) => level.props.id).join('\0');
    const parentLevel = back && currentIndex > 0 ? levels[currentIndex - 1] : null;

    const emit = React.useCallback(
      (next: ContextSwitcherValue) => {
        emittedRef.current = next;
        onChange(next);
      },
      [onChange]
    );

    React.useEffect(() => {
      const emitted = emittedRef.current;
      if (emitted && sameSelection(emitted, normalized)) {
        emittedRef.current = null;
        committedRef.current = normalized;
        return;
      }
      if (emitted && sameSelection(committedRef.current, normalized)) {
        return;
      }
      if (!sameSelection(committedRef.current, normalized)) {
        emittedRef.current = null;
        setPinnedIndex(null);
        committedRef.current = normalized;
      }
    }, [normalized]);

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
          emit(selectLevel(levelIds, normalized, levelId, optionValue));
        }
        if (nextId) {
          setPinnedIndex(index + 1);
          setOpenId(nextId);
          return;
        }
        setPinnedIndex(index);
        setOpenId(null);
      },
      [levelIds, normalized, emit]
    );

    const stepBack = () => {
      if (currentIndex <= 0) {
        return;
      }
      const levelId = levelIds[currentIndex];
      if (normalized[levelId]) {
        emit(clearFrom(levelIds, normalized, levelId));
      }
      setPinnedIndex(currentIndex - 1);
      setOpenId(null);
      focusFieldRef.current = true;
    };

    React.useLayoutEffect(() => {
      if (!focusFieldRef.current) {
        return;
      }
      focusFieldRef.current = false;
      chainRef.current
        ?.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]')
        ?.focus();
    });

    const contextValue = React.useMemo(
      () => ({
        value: normalized,
        levelIds,
        openId,
        setOpenId,
        onChange,
        moveFocus,
        applyPick,
      }),
      [normalized, levelIds, openId, onChange, moveFocus, applyPick]
    );

    const onBackKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
        return;
      }
      event.preventDefault();
      moveFocus(event.currentTarget, event.key === 'ArrowRight' ? 1 : -1);
    };

    const chainItems: React.ReactNode[] = [];
    visible.forEach((level, index) => {
      if (!back && index > 0) {
        chainItems.push(
          <LevelSlash key={`${level.props.id}-slash`} aria-hidden="true">
            /
          </LevelSlash>
        );
      }
      chainItems.push(level);
    });
    const backLabel = parentLevel ? `Go to the ${parentLevel.props.label} level` : '';

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
          {parentLevel ? (
            <Tooltip title={backLabel} enterDelay={0} enterNextDelay={0}>
              <BackButton
                type="button"
                data-chain-stop=""
                aria-label={backLabel}
                onClick={stepBack}
                onKeyDown={onBackKeyDown}
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </BackButton>
            </Tooltip>
          ) : null}
          {chainItems}
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
