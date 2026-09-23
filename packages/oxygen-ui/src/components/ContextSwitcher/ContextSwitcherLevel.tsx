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
import { ContextSwitcherGroup, type ContextSwitcherGroupProps } from './ContextSwitcherGroup';
import { ContextSwitcherOption, type ContextSwitcherOptionProps } from './ContextSwitcherOption';
import { clearFrom, matchesQuery, nodeText, selectLevel } from './model';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - Field surface
 * - `divider` - Field border at rest
 * - `primary.main` - Field border while the panel is open, and focus outline
 * - `text.secondary` - Level label and empty-state copy
 * - `text.primary` - Selected value
 *
 * The value truncates. The field's accessible name keeps the full
 * "Label: value" text.
 */

interface LevelOwnerState {
  open: boolean;
}

const FieldRoot = styled(Box, {
  name: 'MuiContextSwitcher',
  slot: 'Level',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: LevelOwnerState }>(({ theme, ownerState }) => ({
  alignItems: 'center',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  border: '1px solid',
  borderColor: ownerState.open
    ? (theme.vars || theme).palette.primary.main
    : (theme.vars || theme).palette.divider,
  borderRadius: theme.shape.borderRadius,
  display: 'inline-flex',
  maxWidth: 220,
  minHeight: 48,
  minWidth: 0,
}));

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
  '&:focus-visible': {
    outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
    outlineOffset: -2,
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
  lineHeight: 1.2,
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
  lineHeight: 1.3,
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
  overflow: 'auto',
  padding: 0,
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
export interface ContextSwitcherLevelProps {
  /** Key used in the context value. */
  id: string;
  /** Name shown on the field, such as Organization. */
  label: string;
  /**
   * Whether the field shows a close button once it has a selection.
   * Defaults to false for the first level and true for every level after it.
   */
  clearable?: boolean;
  /** The panel shows a progress indicator instead of the options. */
  loading?: boolean;
  /** Options and groups for this level. */
  children?: React.ReactNode;
}

const isOption = (
  child: React.ReactNode
): child is React.ReactElement<ContextSwitcherOptionProps> =>
  React.isValidElement<ContextSwitcherOptionProps>(child) && child.type === ContextSwitcherOption;

const isGroup = (
  child: React.ReactNode
): child is React.ReactElement<ContextSwitcherGroupProps> =>
  React.isValidElement<ContextSwitcherGroupProps>(child) && child.type === ContextSwitcherGroup;

interface OptionEntry {
  value: string;
  text: string;
}

const collectOptions = (children: React.ReactNode): OptionEntry[] => {
  const options: OptionEntry[] = [];
  React.Children.forEach(children, (child) => {
    if (isOption(child)) {
      options.push({ value: child.props.value, text: nodeText(child.props.children) });
      return;
    }
    if (isGroup(child)) {
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
export const ContextSwitcherLevel = React.forwardRef<HTMLButtonElement, ContextSwitcherLevelProps>(
  function ContextSwitcherLevel({ id, label, clearable, loading = false, children }, ref) {
    const { value, levelIds, openId, setOpenId, onChange } = useContextSwitcher();
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const [query, setQuery] = React.useState('');
    const popoverId = React.useId();
    const open = openId === id;
    const wasOpen = React.useRef(false);

    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    const selectedValue = value[id];
    const options = React.useMemo(() => collectOptions(children), [children]);
    const selectedText = options.find((option) => option.value === selectedValue)?.text ?? selectedValue;
    const canClear = (clearable ?? levelIds[0] !== id) && Boolean(selectedValue);
    const matches = options.filter((option) => matchesQuery(option.text, query));
    const childList = React.Children.toArray(children);
    const ungroupedOptions = childList.filter(isOption);
    const groups = childList.filter(isGroup);

    React.useEffect(() => {
      if (!open) {
        setQuery('');
      }
    }, [open]);

    React.useEffect(() => {
      if (open) {
        searchRef.current?.focus();
      } else if (wasOpen.current) {
        buttonRef.current?.focus();
      }
      wasOpen.current = open;
    }, [open]);

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
      onChange(selectLevel(levelIds, value, id, optionValue));
    };

    const onClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      setOpenId(openId === id ? null : openId);
      onChange(clearFrom(levelIds, value, id));
    };

    const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
        event.preventDefault();
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || !panelRef.current) {
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
        <FieldRoot ownerState={{ open }}>
          <FieldButton
            ref={buttonRef}
            type="button"
            aria-label={accessibleName}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? popoverId : undefined}
            onClick={togglePanel}
          >
            <FieldText>
              <FieldLabel>{label}</FieldLabel>
              {selectedText ? <FieldValue>{selectedText}</FieldValue> : null}
            </FieldText>
            <ChevronDown size={16} aria-hidden="true" />
          </FieldButton>
          {canClear ? (
            <IconButton size="small" aria-label={`Close ${label}`} onClick={onClear}>
              <X size={14} aria-hidden="true" />
            </IconButton>
          ) : null}
          <Popper
            open={open}
            anchorEl={buttonRef.current}
            placement="bottom-start"
            sx={{ zIndex: (theme) => theme.zIndex.modal }}
          >
            <Paper
              id={popoverId}
              role="dialog"
              aria-label={label}
              ref={panelRef}
              elevation={8}
              onMouseDown={(event) => event.stopPropagation()}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.stopPropagation();
                  closePanel();
                  return;
                }
                onPanelKeyDown(event);
              }}
              sx={{ mt: 0.5 }}
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
                    <OptionList role="listbox" aria-label={label}>
                      {ungroupedOptions}
                      {groups}
                    </OptionList>
                  </LevelPanelContext.Provider>
                ) : null}
              </PanelBody>
            </Paper>
          </Popper>
        </FieldRoot>
      </ClickAwayListener>
    );
  }
);

ContextSwitcherLevel.displayName = 'ContextSwitcher.Level';

export default ContextSwitcherLevel;
