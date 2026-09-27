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
import { styled } from '@mui/material/styles';
import { ContextSwitcherContext, type ContextSwitcherValue } from './context';
import { ContextSwitcherLevel, type ContextSwitcherLevelProps } from './ContextSwitcherLevel';
import { ContextSwitcherGroup } from './ContextSwitcherGroup';
import { ContextSwitcherOption } from './ContextSwitcherOption';
import { normalizeValue, selectedLevelCount } from './model';

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

/**
 * Props for the context switcher.
 */
export interface ContextSwitcherProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'children'> {
  /** Selected option value for each level id. A missing id means that level is empty. */
  value: ContextSwitcherValue;
  /** Called with the next map after a pick or a close. */
  onChange: (value: ContextSwitcherValue) => void;
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
 * The chain shows each selected level and the next empty one. Choosing a field
 * opens that level's panel: a search box and the level's options. A pick, Escape,
 * an outside click, or a second click on the field closes the panel. The close
 * button stays inside the field and clears that level and every level under it.
 * A name that does not fit stays on one line and ends in an ellipsis. Hovering it
 * shows the full text, and focusing an option does the same. The product
 * places the chain, usually in `Header.Switchers`, and routes from `onChange`.
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
  function ContextSwitcher({ value, onChange, children, ...rest }, ref) {
    const chainRef = React.useRef<HTMLDivElement>(null);
    const restoreFocusRef = React.useRef(false);
    const [openId, setOpenId] = React.useState<string | null>(null);
    const levels = levelElements(children);
    const levelIds = levels.map((level) => level.props.id);
    const levelKey = levelIds.join('\0');
    const normalized = React.useMemo(
      () => normalizeValue(levelKey.length === 0 ? [] : levelKey.split('\0'), value),
      [levelKey, value]
    );
    const selectedCount = selectedLevelCount(levelIds, normalized);
    const visibleCount = Math.min(levels.length, selectedCount + 1);
    const visible = levels.slice(0, visibleCount);
    const visibleKey = visible.map((level) => level.props.id).join('\0');

    React.useEffect(() => {
      const visibleIds = visibleKey.length === 0 ? [] : visibleKey.split('\0');
      if (openId && !visibleIds.includes(openId)) {
        setOpenId(null);
      }
    }, [openId, visibleKey]);

    const restoreFocus = React.useCallback(() => {
      restoreFocusRef.current = true;
    }, []);

    React.useLayoutEffect(() => {
      if (!restoreFocusRef.current) {
        return;
      }
      restoreFocusRef.current = false;
      const fields = chainRef.current?.querySelectorAll<HTMLButtonElement>(
        'button[aria-haspopup="dialog"]'
      );
      fields?.[fields.length - 1]?.focus();
    });

    const contextValue = React.useMemo(
      () => ({ value: normalized, levelIds, openId, setOpenId, onChange, restoreFocus }),
      [normalized, levelIds, openId, onChange, restoreFocus]
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
          {visible}
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
