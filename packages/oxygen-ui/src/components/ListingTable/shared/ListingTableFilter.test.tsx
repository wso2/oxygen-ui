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
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { ListingTableProvider } from '../ListingTableProvider';
import { ListingTableFilter, type ListingTableFilterProps } from './ListingTableFilter';

const OPTIONS = [
  { value: 'running', label: 'Running' },
  { value: 'stopped', label: 'Stopped' },
  { value: 'failed', label: 'Failed' },
];

function renderFilter(props: Partial<ListingTableFilterProps> = {}) {
  return render(
    <OxygenUIThemeProvider>
      <table>
        <thead>
          <tr>
            <th>
              Status
              <ListingTableFilter label="Filter by status" options={OPTIONS} {...props} />
            </th>
          </tr>
        </thead>
      </table>
    </OxygenUIThemeProvider>,
  );
}

const button = () => screen.getByRole('button', { name: 'Filter by status' });
const choices = () => screen.getAllByRole('menuitemradio').map((item) => item.textContent);

describe('ListingTableFilter', () => {
  afterEach(cleanup);

  it('is a button named by its label, closed at first', () => {
    renderFilter();
    expect(button().getAttribute('aria-haspopup')).toBe('menu');
    expect(button().getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('has its label once, not on the tooltip wrapper as well', () => {
    renderFilter();
    expect(document.querySelectorAll('[aria-label="Filter by status"]')).toHaveLength(1);
  });

  it('opens a menu with the "any" choice first, then the options', () => {
    renderFilter();
    // The page behind an open popover is hidden from assistive technology, so keep the element.
    const trigger = button();
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('menu', { name: 'Filter by status' })).not.toBeNull();
    expect(choices()).toEqual(['Any', 'Running', 'Stopped', 'Failed']);
  });

  it('keeps the "any" choice distinct from a choice with an empty value', () => {
    const onChange = vi.fn();
    renderFilter({ onChange, options: [{ value: '', label: 'Blank' }, ...OPTIONS] });
    fireEvent.click(button());
    expect(choices()).toEqual(['Any', 'Blank', 'Running', 'Stopped', 'Failed']);
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Blank' }));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('clears the filter with the "any" choice when an empty-value choice exists', () => {
    const onChange = vi.fn();
    renderFilter({ onChange, options: [{ value: '', label: 'Blank' }, ...OPTIONS] });
    fireEvent.click(button());
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Any' }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('reports the picked value and closes', () => {
    const onChange = vi.fn();
    renderFilter({ onChange });
    fireEvent.click(button());
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Stopped' }));
    expect(onChange).toHaveBeenCalledWith('stopped');
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('reports null when "any" is picked, using allLabel for its text', () => {
    const onChange = vi.fn();
    renderFilter({ onChange, value: 'running', allLabel: 'All statuses' });
    fireEvent.click(button());
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'All statuses' }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('marks the applied choice, and only that one', () => {
    renderFilter({ value: 'failed' });
    fireEvent.click(button());
    const checked = screen.getAllByRole('menuitemradio').filter((item) => item.getAttribute('aria-checked') === 'true');
    expect(checked.map((item) => item.textContent)).toEqual(['Failed']);
  });

  it('marks "any" while nothing is applied', () => {
    renderFilter({ value: null });
    fireEvent.click(button());
    expect(screen.getByRole('menuitemradio', { name: 'Any' }).getAttribute('aria-checked')).toBe('true');
  });

  it('closes on Escape', () => {
    renderFilter();
    fireEvent.click(button());
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('does not open when disabled', () => {
    renderFilter({ disabled: true });
    expect((button() as HTMLButtonElement).disabled).toBe(true);
  });

  describe('search', () => {
    it('has no search field unless searchable', () => {
      renderFilter();
      fireEvent.click(button());
      expect(screen.queryByRole('textbox')).toBeNull();
    });

    it('narrows the choices as the reader types, and says when none match', () => {
      renderFilter({ searchable: true, noMatchLabel: 'Nothing here' });
      fireEvent.click(button());
      const field = screen.getByRole('textbox', { name: 'Filter by status' });
      fireEvent.change(field, { target: { value: 'fail' } });
      expect(choices()).toEqual(['Failed']);
      fireEvent.change(field, { target: { value: 'zzz' } });
      expect(screen.queryAllByRole('menuitemradio')).toHaveLength(0);
      expect(screen.getByText('Nothing here')).not.toBeNull();
    });

    it('starts with an empty field each time it opens', () => {
      renderFilter({ searchable: true });
      fireEvent.click(button());
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'fail' } });
      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
      fireEvent.click(button());
      expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
    });

    it('picks the first match on Enter', () => {
      const onChange = vi.fn();
      renderFilter({ searchable: true, onChange });
      fireEvent.click(button());
      const field = screen.getByRole('textbox');
      fireEvent.change(field, { target: { value: 'stop' } });
      fireEvent.keyDown(field, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith('stopped');
    });

    it('moves to the choices on ArrowDown', () => {
      renderFilter({ searchable: true });
      fireEvent.click(button());
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown' });
      expect(document.activeElement).toBe(screen.getAllByRole('menuitemradio')[0]);
    });
  });

  describe('as a button', () => {
    it('forwards its ref to the funnel button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderFilter({ ref });
      expect(ref.current).toBe(button());
    });

    it('passes className, data attributes and the id to the funnel button', () => {
      renderFilter({ className: 'mine', id: 'status-filter', 'data-testid': 'filter-button' } as Partial<ListingTableFilterProps>);
      const trigger = screen.getByTestId('filter-button');
      expect(trigger).toBe(button());
      expect(trigger.classList.contains('mine')).toBe(true);
      expect(trigger.id).toBe('status-filter');
    });

    it('calls the onClick it is given as well as opening', () => {
      const onClick = vi.fn();
      renderFilter({ onClick });
      fireEvent.click(button());
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('menu')).not.toBeNull();
    });

    it('is hidden until pointed at by default, and shown at half strength with alwaysShowIcon', () => {
      const { unmount } = renderFilter();
      expect(getComputedStyle(button()).opacity).toBe('0');
      unmount();
      renderFilter({ alwaysShowIcon: true });
      expect(getComputedStyle(button()).opacity).toBe('0.5');
    });

    it('is fully shown while a value is applied', () => {
      renderFilter({ value: 'failed' });
      expect(getComputedStyle(button()).opacity).toBe('1');
    });
  });

  describe('with a provider', () => {
    it('reads the applied value from filters[field] and reports through onFilterChange', () => {
      const onFilterChange = vi.fn();
      render(
        <OxygenUIThemeProvider>
          <ListingTableProvider filters={{ status: 'failed' }} onFilterChange={onFilterChange}>
            <table>
              <thead>
                <tr>
                  <th>
                    <ListingTableFilter field="status" label="Filter by status" options={OPTIONS} />
                  </th>
                </tr>
              </thead>
            </table>
          </ListingTableProvider>
        </OxygenUIThemeProvider>,
      );
      fireEvent.click(button());
      expect(screen.getByRole('menuitemradio', { name: 'Failed' }).getAttribute('aria-checked')).toBe('true');
      fireEvent.click(screen.getByRole('menuitemradio', { name: 'Running' }));
      expect(onFilterChange).toHaveBeenCalledWith('status', 'running');
    });
  });
});
