/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import IconButton from '@mui/material/IconButton';
import { X } from '@wso2/oxygen-ui-icons-react';
import { SearchBarBase } from '../SearchBar/SearchBarBase';
import type { SearchBarBaseProps } from '../SearchBar/SearchBarBase';

/**
 * Props for LogViewer.Search. The rest of the props go to the search field.
 */
export interface LogViewerSearchProps
  extends Omit<SearchBarBaseProps, 'value' | 'onChange' | 'placeholder' | 'endAdornment' | 'onKeyDown'> {
  /**
   * The search text the page holds. The box keeps what the reader types, and shows this value when
   * your page changes it, for example to clear the search.
   * @default ''
   */
  value?: string;
  /**
   * Called with the search text once typing pauses, at once on Enter, and when the reader clears
   * the box. The viewer does not search: apply the text to your data here.
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder, which is also the accessible name.
   * @default 'Search logs'
   */
  placeholder?: string;
  /**
   * Accessible name of the clear button.
   * @default 'Clear search'
   */
  clearLabel?: string;
  /**
   * How long typing must pause, in milliseconds, before `onChange` is called. Use 0 to report
   * every change.
   * @default 300
   */
  debounceMs?: number;
}

/**
 * LogViewer.Search - The search box of a LogViewer, for its toolbar. The text is reported once typing pauses, or at once on Enter or
 * when cleared, so a page that searches on a server does not send a request for every key. It is
 * never disabled while the page loads, because that would take the focus away mid-typing. It passes
 * `className`, `data-*` and other search field props to its field, and forwards its `ref` to it.
 */
const LogViewerSearch = React.forwardRef<HTMLDivElement, LogViewerSearchProps>(function LogViewerSearch(
  { value = '', onChange, placeholder = 'Search logs', clearLabel = 'Clear search', debounceMs = 300, sx, ...props },
  ref,
) {
  const [draft, setDraft] = React.useState(value);
  const reported = React.useRef(value);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // A value the page set itself (not one echoed back from here) replaces the text.
  React.useEffect(() => {
    if (value !== reported.current) {
      clearTimeout(timer.current);
      reported.current = value;
      setDraft(value);
    }
  }, [value]);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const report = (next: string) => {
    clearTimeout(timer.current);
    if (next === reported.current) return;
    reported.current = next;
    onChange?.(next);
  };

  const type = (next: string) => {
    setDraft(next);
    clearTimeout(timer.current);
    if (debounceMs <= 0) report(next);
    else timer.current = setTimeout(() => report(next), debounceMs);
  };

  return (
    <SearchBarBase
      ref={ref}
      {...props}
      value={draft}
      placeholder={placeholder}
      onChange={(event) => type(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') report(draft);
      }}
      endAdornment={
        draft ? (
          <IconButton
            size="small"
            edge="end"
            aria-label={clearLabel}
            onClick={() => {
              setDraft('');
              report('');
            }}
          >
            <X size={14} aria-hidden="true" />
          </IconButton>
        ) : undefined
      }
      sx={[
        {
          width: 240,
          minWidth: 160,
          '& .MuiOutlinedInput-root': { height: 32, fontSize: '0.8125rem' },
          '& .MuiInputBase-input': { padding: '4px 8px' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
});

LogViewerSearch.displayName = 'LogViewerSearch';

export default LogViewerSearch;
