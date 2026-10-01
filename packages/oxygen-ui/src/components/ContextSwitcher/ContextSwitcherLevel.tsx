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
import { matchesQuery, nodeText, optionDomId } from './model';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - Field surface
 * - `divider` - Field border
 * - `text.secondary` - Level label and empty-state copy
 * - `text.primary` - Selected value, and the keyboard focus outline
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

const FieldRoot = styled(Box, {
  name: 'MuiContextSwitcher',
  slot: 'Level',
})(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  columnGap: theme.spacing(0.5),
  display: 'inline-grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gridTemplateRows: 'auto auto',
  maxWidth: 220,
  minHeight: 48,
  minWidth: 0,
  padding: theme.spacing(0.5, 0.75, 0.5, 1),
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
  display: 'grid',
  font: 'inherit',
  gridColumn: '1 / -1',
  gridRow: '1 / -1',
  gridTemplateColumns: 'subgrid',
  gridTemplateRows: 'subgrid',
  minWidth: 0,
  padding: 0,
  textAlign: 'left',
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: `2px solid ${(theme.vars || theme).palette.text.primary}`,
    outlineOffset: 2,
  },
}));

interface ChevronOwnerState {
  besideValue: boolean;
}

// Close sits on the label row. The chevron sits on the value row, in the same column.
const ChevronMark = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'Chevron',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: ChevronOwnerState }>(({ ownerState }) => ({
  alignItems: 'center',
  display: 'inline-flex',
  gridColumn: 2,
  gridRow: ownerState.besideValue ? 2 : 1,
  justifyContent: 'center',
  lineHeight: 0,
}));

const CloseButton = styled(IconButton, {
  name: 'MuiContextSwitcher',
  slot: 'Close',
})(({ theme }) => ({
  alignSelf: 'center',
  border: 0,
  color: 'inherit',
  gridColumn: 2,
  gridRow: 1,
  height: 16,
  justifySelf: 'center',
  minWidth: 16,
  padding: 0,
  width: 16,
  zIndex: 1,
  '&.Mui-focusVisible': {
    backgroundColor: 'transparent',
    outline: `2px solid ${(theme.vars || theme).palette.text.primary}`,
    outlineOffset: 2,
  },
}));

const FieldText = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'LevelText',
})({
  display: 'contents',
});

const FieldLabel = styled('span', {
  name: 'MuiContextSwitcher',
  slot: 'LevelLabel',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
  display: 'block',
  gridColumn: 1,
  gridRow: 1,
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
  gridColumn: 1,
  gridRow: 2,
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
  disabled: boolean;
}

const collectOptions = (children: React.ReactNode): OptionEntry[] => {
  const options: OptionEntry[] = [];
  React.Children.forEach(children, (child) => {
    if (isContextSwitcherOption(child)) {
      options.push({
        value: child.props.value,
        text: nodeText(child.props.children),
        disabled: Boolean(child.props.disabled),
      });
      return;
    }
    if (isContextSwitcherGroup(child)) {
      options.push(...collectOptions(child.props.children));
    }
  });
  return options;
};

/**
 * ContextSwitcher.Level - A labeled field in the chain, and the panel that picks its value.
 */
export const ContextSwitcherLevel = React.forwardRef<HTMLDivElement, ContextSwitcherLevelProps>(
  function ContextSwitcherLevel({ id, label, clearable, loading = false, children, ...rest }, ref) {
    const { value, levelIds, openId, setOpenId, restoreFocus, moveFocus, collapse, applyPick } =
      useContextSwitcher();
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const labelRef = React.useRef<HTMLSpanElement>(null);
    const valueRef = React.useRef<HTMLSpanElement>(null);
    const fieldRef = React.useRef<HTMLDivElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const [query, setQuery] = React.useState('');
    const [activeValue, setActiveValue] = React.useState<string | null>(null);
    const [nameTooltipOpen, setNameTooltipOpen] = React.useState(false);
    const popoverId = React.useId();
    const listId = `${popoverId}-list`;
    const open = openId === id;
    const wasOpen = React.useRef(false);
    const releaseFocusRef = React.useRef(false);

    const selectedValue = value[id];
    const options = React.useMemo(() => collectOptions(children), [children]);
    const selectedText = options.find((option) => option.value === selectedValue)?.text ?? selectedValue;
    const canClear = (clearable ?? levelIds[0] !== id) && Boolean(selectedValue);
    const matches = React.useMemo(
      () => options.filter((option) => matchesQuery(option.text, query)),
      [options, query]
    );
    const enabledMatches = React.useMemo(
      () => matches.filter((option) => !option.disabled),
      [matches]
    );
    const childList = React.Children.toArray(children);
    const ungroupedOptions = childList.filter(isContextSwitcherOption);
    const groups = childList.filter(isContextSwitcherGroup);

    React.useEffect(() => {
      if (!open) {
        setQuery('');
        setActiveValue(null);
        return;
      }
      setActiveValue((current) => {
        if (current && enabledMatches.some((option) => option.value === current)) {
          return current;
        }
        return enabledMatches[0]?.value ?? null;
      });
    }, [open, enabledMatches]);

    React.useLayoutEffect(() => {
      if (!open || !activeValue) {
        return;
      }
      document.getElementById(optionDomId(listId, activeValue))?.scrollIntoView?.({ block: 'nearest' });
    }, [open, activeValue, listId]);

    React.useLayoutEffect(() => {
      setAnchorEl((current) => (current === fieldRef.current ? current : fieldRef.current));
    });

    React.useLayoutEffect(() => {
      if (open && anchorEl) {
        searchRef.current?.focus();
      } else if (!open && wasOpen.current && openId === null) {
        if (releaseFocusRef.current) {
          releaseFocusRef.current = false;
          const active = document.activeElement;
          if (active instanceof HTMLElement && fieldRef.current?.contains(active)) {
            active.blur();
          }
        } else {
          buttonRef.current?.focus();
        }
      }
      wasOpen.current = open;
    }, [open, openId, anchorEl]);

    const closePanel = () => {
      setOpenId(null);
    };

    const togglePanel = () => {
      setOpenId(open ? null : id);
    };

    const onSelect = (optionValue: string) => {
      releaseFocusRef.current = true;
      setOpenId(null);
      applyPick(id, optionValue);
    };

    const onClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      setOpenId(openId === id ? null : openId);
      restoreFocus();
      collapse(id);
    };

    const moveActive = (key: string) => {
      if (enabledMatches.length === 0) {
        return;
      }
      const index = enabledMatches.findIndex((option) => option.value === activeValue);
      let next = 0;
      if (key === 'ArrowDown') {
        next = index < 0 ? 0 : Math.min(index + 1, enabledMatches.length - 1);
      } else if (key === 'ArrowUp') {
        next = index < 0 ? enabledMatches.length - 1 : Math.max(index - 1, 0);
      } else if (key === 'End') {
        next = enabledMatches.length - 1;
      }
      setActiveValue(enabledMatches[next]?.value ?? null);
    };

    const onFieldKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setOpenId(id);
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        moveFocus(id, event.key === 'ArrowRight' ? 1 : -1);
      }
    };

    const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setOpenId(null);
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        if (activeValue) {
          onSelect(activeValue);
        }
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        return;
      }
      event.preventDefault();
      moveActive(event.key);
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
                data-level-id={id}
                aria-label={accessibleName}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={open ? popoverId : undefined}
                onClick={togglePanel}
                onKeyDown={onFieldKeyDown}
                onMouseEnter={showNameTooltip}
                onMouseLeave={hideNameTooltip}
              >
                <FieldText>
                  <FieldLabel ref={labelRef}>{label}</FieldLabel>
                  {selectedText ? <FieldValue ref={valueRef}>{selectedText}</FieldValue> : null}
                </FieldText>
                <ChevronMark ownerState={{ besideValue: Boolean(selectedText) }}>
                  <ChevronDown size={16} aria-hidden="true" />
                </ChevronMark>
              </FieldButton>
            </OverflowTooltip>
            {canClear ? (
              <CloseButton aria-label={`Close ${label}`} onClick={onClear}>
                <X size={16} aria-hidden="true" />
              </CloseButton>
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
                  slotProps={{
                    input: {
                      'aria-label': `Search ${label}`,
                      'aria-autocomplete': 'list',
                      'aria-controls': listId,
                      'aria-activedescendant': activeValue ? optionDomId(listId, activeValue) : undefined,
                    },
                  }}
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
                  <LevelPanelContext.Provider
                    value={{ query, selectedValue, activeValue, listId, onSelect }}
                  >
                    <OptionList id={listId} role="listbox" aria-label={label} tabIndex={-1}>
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
