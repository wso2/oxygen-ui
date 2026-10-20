/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Check } from '@wso2/oxygen-ui-icons-react';
import { SearchBarBase } from '../../SearchBar/SearchBarBase';

/**
 * One choice of a filter list.
 */
export interface ListingTableFilterOption {
  /**
   * Value reported when the choice is picked. It must not be empty: an empty value means no filter is
   * applied, so a choice with one is left out of the list. Use the "any" choice to clear the filter.
   */
  value: string;
  /** Text shown for the choice. */
  label: string;
}

export interface ListingTableFilterMenuProps {
  /** Whether the list is open. */
  open: boolean;
  /** The element the list is placed under. */
  anchorEl: HTMLElement | null;
  /** Called when the list asks to close: after a choice, on Escape, and on a click outside. */
  onClose: () => void;
  /** The choices. */
  options: ListingTableFilterOption[];
  /** The applied value, or `null` or an empty string when nothing is applied. */
  value: string | null;
  /** Called with the chosen value, or `null` when the "any" choice is picked. */
  onChange: (value: string | null) => void;
  /** Adds a search field above the choices, to narrow them by typing. */
  searchable?: boolean;
  /** Accessible name of the list and of the search field. */
  label: string;
  /** Id of the list of choices, for the `aria-controls` of the button that opens it. */
  listId?: string;
  /** Text of the choice that clears the filter. */
  allLabel: string;
  /** Placeholder of the search field. */
  searchPlaceholder: string;
  /** Text shown when typing matches no choice. */
  noMatchLabel: string;
}

interface MenuContentProps extends Omit<ListingTableFilterMenuProps, 'anchorEl'> {}

/** The search field and the choices. Its state starts fresh each time the list opens. */
const MenuContent: React.FC<MenuContentProps> = ({
  open,
  onClose,
  options,
  value,
  onChange,
  searchable = false,
  label,
  listId,
  allLabel,
  searchPlaceholder,
  noMatchLabel,
}) => {
  // What the reader has typed. It starts empty, whatever the current choice is.
  const [query, setQuery] = React.useState('');
  // The list stays mounted while it closes, so a quick reopen would keep the old text without this. It
  // runs before the browser paints, so the old text is never shown.
  React.useLayoutEffect(() => {
    if (open) setQuery('');
  }, [open]);
  const listRef = React.useRef<HTMLUListElement>(null);
  const searchRef = React.useRef<HTMLDivElement>(null);

  const current = value ?? '';
  const needle = query.trim().toLowerCase();
  // An empty value means nothing is applied, so only the "any" choice may have one. Typing narrows the
  // options only: "any" stays at the top and is not a match, so Enter never clears the filter.
  const matching = options.filter(
    (option) => option.value !== '' && option.label.toLowerCase().includes(needle)
  );
  const shown = [{ value: '', label: allLabel }, ...matching];

  const pick = (option: ListingTableFilterOption) => {
    onChange(option.value === '' ? null : option.value);
    onClose();
  };

  // ArrowUp on the first choice goes back to the search field, as ArrowDown in the field goes to the
  // first choice, instead of wrapping to the last choice. It is handled on capture, before the list's own
  // key handling moves focus.
  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const first = listRef.current?.querySelector<HTMLElement>('[role="menuitemradio"]');
    if (searchable && event.key === 'ArrowUp' && document.activeElement === first) {
      event.preventDefault();
      event.stopPropagation(); // keep the list from handling the key as well, which would wrap
      searchRef.current?.querySelector('input')?.focus();
    }
  };

  const focusFirst = () => listRef.current?.querySelector<HTMLElement>('[role="menuitemradio"]')?.focus();

  return (
    <Box sx={{ minWidth: 240, maxWidth: 320 }}>
      {searchable && (
        <Box ref={searchRef} sx={{ p: 1 }}>
          <SearchBarBase
            autoFocus
            fullWidth
            value={query}
            placeholder={searchPlaceholder}
            aria-label={label}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                focusFirst();
              } else if (event.key === 'Enter' && matching.length > 0) {
                event.preventDefault();
                pick(matching[0]);
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': { height: 32, fontSize: '0.8125rem' },
              '& .MuiInputBase-input': { padding: '4px 8px' },
            }}
          />
        </Box>
      )}
      <MenuList ref={listRef} id={listId} aria-label={label} autoFocusItem={!searchable} onKeyDownCapture={handleListKeyDown} sx={{ py: 0.5, maxHeight: 320, overflow: 'auto' }}>
        {shown.map((option) => {
          const selected = option.value === current;
          return (
            <MenuItem
              key={option.value}
              role="menuitemradio"
              aria-checked={selected}
              selected={selected}
              onClick={() => pick(option)}
              sx={{ justifyContent: 'space-between', gap: 2 }}
            >
              {option.label}
              {selected && <Check size={16} aria-hidden="true" />}
            </MenuItem>
          );
        })}
        {needle !== '' && matching.length === 0 && (
          // A list item, not a paragraph, because it sits directly in the list.
          <Typography component="li" role="presentation" variant="body2" color="text.secondary" sx={{ px: 2, py: 1, listStyle: 'none' }}>
            {noMatchLabel}
          </Typography>
        )}
      </MenuList>
    </Box>
  );
};

/**
 * The list of choices of a ListingTable.Filter: an optional search field above a menu of choices,
 * with the applied one marked. It is internal to the table: use `ListingTable.Filter`.
 */
export const ListingTableFilterMenu: React.FC<ListingTableFilterMenuProps> = ({
  open,
  anchorEl,
  onClose,
  ...content
}) => (
  <Popover
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  >
    <MenuContent open={open} onClose={onClose} {...content} />
  </Popover>
);

ListingTableFilterMenu.displayName = 'ListingTableFilterMenu';

export default ListingTableFilterMenu;
