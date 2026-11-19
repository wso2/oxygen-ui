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
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import SearchBarWithAdvancedFilter, { type AdvancedFilterState } from './SearchBarWithAdvancedFilter';

afterEach(cleanup);

const attributes = [
  { value: 'name', label: 'Name' },
  { value: 'owner', label: 'Owner' },
];
const conditions = [
  { value: 'contains', label: 'Contains' },
  { value: 'equals', label: 'Equals' },
];

const Harness = ({
  initial,
  onAdvancedSearch,
}: {
  initial: AdvancedFilterState;
  onAdvancedSearch?: React.ComponentProps<typeof SearchBarWithAdvancedFilter>['onAdvancedSearch'];
}) => {
  const [text, setText] = React.useState('acme');
  const [filter, setFilter] = React.useState(initial);
  return (
    <OxygenUIThemeProvider>
      <SearchBarWithAdvancedFilter
        value={text}
        onChange={setText}
        advancedFilter={filter}
        onAdvancedFilterChange={setFilter}
        attributeOptions={attributes}
        conditionOptions={conditions}
        onAdvancedSearch={onAdvancedSearch}
      />
    </OxygenUIThemeProvider>
  );
};

const empty: AdvancedFilterState = { attribute: '', condition: '', value: '' };
const openFilter = () => fireEvent.click(screen.getByRole('button', { name: 'Open advanced search' }));
const pick = (field: string, option: string) => {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: new RegExp(field) }));
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: option }));
};

describe('SearchBarWithAdvancedFilter', () => {
  it('names each field by its label and marks all three as required', () => {
    render(<Harness initial={empty} />);
    openFilter();
    expect(screen.getByRole('combobox', { name: /Filter attribute/ })).toBeTruthy();
    expect(screen.getByRole('combobox', { name: /Filter condition/ })).toBeTruthy();
    expect((screen.getByRole('textbox', { name: /Filter value/ }) as HTMLInputElement).required).toBe(true);
    expect(screen.getAllByText('*', { exact: false }).length).toBeGreaterThanOrEqual(3);
  });

  it('keeps Search disabled until the attribute, condition and value are all set', () => {
    render(<Harness initial={empty} />);
    openFilter();
    const search = () => screen.getByRole('button', { name: 'Search' }) as HTMLButtonElement;
    expect(search().disabled).toBe(true);
    pick('Filter attribute', 'Owner');
    pick('Filter condition', 'Equals');
    expect(search().disabled).toBe(true);
    fireEvent.change(screen.getByRole('textbox', { name: /Filter value/ }), { target: { value: 'jane' } });
    expect(search().disabled).toBe(false);
  });

  it('reports the search text with the filter and closes when Search is pressed', async () => {
    const onAdvancedSearch = vi.fn();
    render(<Harness initial={{ attribute: 'name', condition: 'contains', value: 'x' }} onAdvancedSearch={onAdvancedSearch} />);
    openFilter();
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(onAdvancedSearch).toHaveBeenCalledWith({
      searchText: 'acme',
      attribute: 'name',
      condition: 'contains',
      value: 'x',
    });
    await waitFor(() => expect(screen.queryByText('Advanced search')).toBeNull());
  });

  it('gives each instance its own popover id', () => {
    render(
      <>
        <Harness initial={empty} />
        <Harness initial={empty} />
      </>
    );
    const [first, second] = screen.getAllByRole('button', { name: 'Open advanced search' });
    fireEvent.click(first);
    const firstId = first.getAttribute('aria-describedby');
    fireEvent.click(screen.getByRole('button', { name: 'Search' }).closest('[role="presentation"]')!.querySelector('.MuiBackdrop-root')!);
    fireEvent.click(second);
    expect(firstId).toBeTruthy();
    expect(second.getAttribute('aria-describedby')).toBeTruthy();
    expect(second.getAttribute('aria-describedby')).not.toBe(firstId);
  });
});
