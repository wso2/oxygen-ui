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
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ChevronDown, X } from '@wso2/oxygen-ui-icons-react';
import { LevelPanelContext, useContextSwitcher } from './context';
import { isContextSwitcherGroup } from './ContextSwitcherGroup';
import { isContextSwitcherOption } from './ContextSwitcherOption';
import { isTruncated, OverflowTooltip, tooltipLabel } from './OverflowTooltip';
import { clearFrom, matchesQuery, nodeText, selectLevel } from './model';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - Field surface
 * - `divider` - Field border
 * - `primary.main` - Ring around the whole field while it is open or focused
 * - `text.secondary` - Level label and empty-state copy
 * - `text.primary` - Selected value
 *
 * The label and the value each stay on one line and truncate. Hovering the
 * field shows the full "Label: value" text when either line is cut. The
 * field's accessible name keeps that full text.
 */

const LevelFrame = styled(Box, {
  name: 'MuiContextSwitcher',
  slot: 'Frame',
})({
  display: 'inline-flex',
  minWidth: 0,
  position: 'relative',
});

interface LevelOwnerState {
  open: boolean;
}

const FieldRoot = styled(Box, {
  name: 'MuiContextSwitcher',
  slot: 'Level',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: LevelOwnerState }>(({ theme, ownerState }) => {
  // One ring around the label and the close button. An outline on the label
  // button alone leaves the close control outside the highlight.
  const ring = `0 0 0 2px ${(theme.vars || theme).palette.primary.main}`;
  return {
    alignItems: 'center',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    borderRadius: theme.shape.borderRadius,
    boxShadow: ownerState.open ? ring : 'none',
    display: 'inline-flex',
    maxWidth: 220,
    minHeight: 48,
    minWidth: 0,
    '&:focus-within': {
      boxShadow: ring,
    },
  };
});

const FieldButton = styled('button', {
  name: 'MuiContextSwitcher',
  slot: 'LevelButton',
})(({ theme }) => ({
  alignItems: 'center',
  appearance: 'none',
  background: 'transparent',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  display: 'flex',
  flex: 1,
  font: 'inherit',
  gap: theme.spacing(1),
  minWidth: 0,
  padding: theme.spacing(0.5, 1),
  textAlign: 'left',
  '&:focus, &:focus-visible': {
    outline: 'none',
  },
}));

const FieldText = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'LevelText',
})({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  minWidth: 0,
});

const FieldLabel = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'LevelLabel',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
  display: 'block',
  lineHeight: 1.2,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const FieldValue = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'LevelValue',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.primary,
  fontSize: theme.typography.body2.fontSize,
  display: 'block',
  lineHeight: 1.3,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const EmptyCopy = styled(Typography, {
  name: 'MuiContextSwitcher',
  slot: 'Empty',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
  padding: theme.spacing(1, 0.5),
}));

const OptionList = styled('div', {
  name: 'MuiContextSwitcher',
  slot: 'List',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
  margin: 0,
  maxHeight: 240,
  outline: 'none',
  overflow: 'auto',
  padding: 0,
  '&:focus, &:focus-visible': {
    outline: 'none',
  },
}));

const PanelBody = styled(Box, {
  name: 'MuiContextSwitcher',
  slot: 'Panel',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  width: 280,
}));

/**
 * Props for one step in the chain.
 */
export interface ContextSwitcherLevelProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'id' | 'children' | 'onChange'> {
  /** Key used in the context value. */
  id: string;
  /** Name shown on the field, such as Organization. */
  label: string;
  /**
   * Whether the field shows a close button.
   * Defaults to false for the first level and true for every level after it.
   */
  clearable?: boolean;
  /** The panel shows a progress indicator instead of the options. */
  loading?: boolean;
  /** Options and groups for this level. */
  children?: React.ReactNode;
}

interface OptionEntry {
  value: string;
  text: string;
}

const collectOptions = (children: React.ReactNode): OptionEntry[] => {
  const options: OptionEntry[] = [];
  React.Children.forEach(children, (child) => {
    if (isContextSwitcherOption(child)) {
      options.push({ value: child.props.value, text: nodeText(child.props.children) });
      return;
    }
    if (isContextSwitcherGroup(child)) {
      options.push(...collectOptions(child.props.children));
    }
  });
  return options;
};

const focusableOptions = (root: HTMLElement): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])'));

/**
 * ContextSwitcher.Level - A labeled field in the chain, and the panel that picks its value.
 */
export const ContextSwitcherLevel = React.forwardRef<HTMLDivElement, ContextSwitcherLevelProps>(
  function ContextSwitcherLevel({ id, label, clearable, loading = false, children, ...rest }, ref) {
    const { value, levelIds, openId, setOpenId, onChange, collapseFrom } = useContextSwitcher();
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const labelRef = React.useRef<HTMLSpanElement>(null);
    const valueRef = React.useRef<HTMLSpanElement>(null);
    const fieldRef = React.useRef<HTMLDivElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const [query, setQuery] = React.useState('');
    const [nameTooltipOpen, setNameTooltipOpen] = React.useState(false);
    const popoverId = React.useId();
    const open = openId === id;
    const wasOpen = React.useRef(false);

    const selectedValue = value[id];
    const options = React.useMemo(() => collectOptions(children), [children]);
    const selectedText = options.find((option) => option.value === selectedValue)?.text ?? selectedValue;
    const canClear = clearable ?? levelIds[0] !== id;
    const matches = options.filter((option) => matchesQuery(option.text, query));
    const childList = React.Children.toArray(children);
    const ungroupedOptions = childList.filter(isContextSwitcherOption);
    const groups = childList.filter(isContextSwitcherGroup);

    React.useEffect(() => {
      if (!open) {
        setQuery('');
      }
    }, [open]);

    React.useLayoutEffect(() => {
      setAnchorEl((current) => (current === fieldRef.current ? current : fieldRef.current));
    });

    React.useLayoutEffect(() => {
      if (open && anchorEl) {
        searchRef.current?.focus();
      } else if (!open && wasOpen.current && openId === null) {
        buttonRef.current?.focus();
      }
      wasOpen.current = open;
    }, [open, openId, anchorEl]);

    React.useEffect(() => {
      if (!open) {
        return undefined;
      }
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') {
          return;
        }
        event.preventDefault();
        setOpenId(null);
      };
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [open, setOpenId]);

    const closePanel = () => {
      setOpenId(null);
    };

    const togglePanel = () => {
      setOpenId(open ? null : id);
    };

    const onSelect = (optionValue: string) => {
      setOpenId(null);
      if (selectedValue === optionValue) {
        return;
      }
      collapseFrom(id);
      onChange(selectLevel(levelIds, value, id, optionValue));
    };

    const onClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      setOpenId(openId === id ? null : openId);
      collapseFrom(id);
      onChange(clearFrom(levelIds, value, id));
    };

    const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!panelRef.current) {
        return;
      }
      if (event.key === 'Tab') {
        const tabbable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>('input, button, [tabindex="0"]')
        ).filter((element) => !element.hasAttribute('disabled') && element.tabIndex >= 0);
        if (tabbable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = tabbable[0];
        const last = tabbable[tabbable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        return;
      }
      const items = focusableOptions(panelRef.current);
      if (items.length === 0) {
        return;
      }
      event.preventDefault();
      const current = items.indexOf(document.activeElement as HTMLElement);
      let next = 0;
      if (event.key === 'ArrowDown') {
        next = current < 0 ? 0 : Math.min(current + 1, items.length - 1);
      } else if (event.key === 'ArrowUp') {
        next = current < 0 ? items.length - 1 : Math.max(current - 1, 0);
      } else if (event.key === 'End') {
        next = items.length - 1;
      }
      items[next]?.focus();
    };

    const accessibleName = selectedText ? `${label}: ${selectedText}` : label;
    const showNameTooltip = () => {
      setNameTooltipOpen(isTruncated(labelRef.current) || isTruncated(valueRef.current));
    };
    const hideNameTooltip = () => {
      setNameTooltipOpen(false);
    };

    const onClickAway = (event: MouseEvent | TouchEvent) => {
      if (!open) {
        return;
      }
      const target = event.target;
      if (target instanceof Node && panelRef.current?.contains(target)) {
        return;
      }
      closePanel();
    };

    return (
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={onClickAway}
      >
        <LevelFrame>
          <FieldRoot
            ownerState={{ open }}
            {...rest}
            ref={(node: HTMLDivElement | null) => {
              fieldRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
          >
            <OverflowTooltip
              title={tooltipLabel(accessibleName)}
              open={nameTooltipOpen}
              onClose={hideNameTooltip}
            >
              <FieldButton
                ref={buttonRef}
                type="button"
                aria-label={accessibleName}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={open ? popoverId : undefined}
                onClick={togglePanel}
                onMouseEnter={showNameTooltip}
                onMouseLeave={hideNameTooltip}
              >
                <FieldText>
                  <FieldLabel ref={labelRef}>{label}</FieldLabel>
                  {selectedText ? <FieldValue ref={valueRef}>{selectedText}</FieldValue> : null}
                </FieldText>
                <ChevronDown size={16} aria-hidden="true" />
              </FieldButton>
            </OverflowTooltip>
            {canClear ? (
              <IconButton size="small" aria-label={`Close ${label}`} onClick={onClear}>
                <X size={14} aria-hidden="true" />
              </IconButton>
            ) : null}
          </FieldRoot>
          <Popper
            open={open && anchorEl !== null}
            anchorEl={anchorEl}
            placement="bottom-start"
            role="presentation"
            disablePortal
            popperOptions={{ strategy: 'absolute' }}
            modifiers={[
              { name: 'offset', options: { offset: [0, 8] } },
              {
                name: 'preventOverflow',
                options: { altBoundary: false, rootBoundary: 'viewport' },
              },
            ]}
            sx={{ zIndex: (theme) => theme.zIndex.modal }}
          >
            <Paper
              id={popoverId}
              role="dialog"
              aria-label={label}
              aria-modal="true"
              tabIndex={-1}
              ref={panelRef}
              elevation={8}
              onMouseDown={(event) => event.stopPropagation()}
              onKeyDown={onPanelKeyDown}
              sx={{
                outline: 'none',
                '&:focus, &:focus-visible': { outline: 'none' },
              }}
            >
              <PanelBody>
                <OutlinedInput
                  inputRef={searchRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  slotProps={{ input: { 'aria-label': `Search ${label}` } }}
                />
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <CircularProgress size={20} aria-label={`Loading ${label}`} />
                  </Box>
                ) : null}
                {!loading && options.length === 0 ? <EmptyCopy>No options</EmptyCopy> : null}
                {!loading && options.length > 0 && matches.length === 0 ? (
                  <EmptyCopy>No matches</EmptyCopy>
                ) : null}
                {!loading && matches.length > 0 ? (
                  <LevelPanelContext.Provider value={{ query, selectedValue, onSelect }}>
                    <OptionList role="listbox" aria-label={label} tabIndex={0}>
                      {ungroupedOptions}
                      {groups}
                    </OptionList>
                  </LevelPanelContext.Provider>
                ) : null}
              </PanelBody>
            </Paper>
          </Popper>
        </LevelFrame>
      </ClickAwayListener>
    );
  }
);

ContextSwitcherLevel.displayName = 'ContextSwitcher.Level';

export default ContextSwitcherLevel;
