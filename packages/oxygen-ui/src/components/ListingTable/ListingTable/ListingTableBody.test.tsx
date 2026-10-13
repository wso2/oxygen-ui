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
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { ListingTableProvider } from '../ListingTableProvider';
import { ListingTableBody, ListingTableBodyProps } from './ListingTableBody';

function renderBody(rows?: React.ReactNode, props: ListingTableBodyProps = { searchValue: 'abc' }) {
  return render(
    <OxygenUIThemeProvider>
      <table>
        <ListingTableBody {...props}>{rows}</ListingTableBody>
      </table>
    </OxygenUIThemeProvider>,
  );
}

describe('ListingTableBody no search results', () => {
  afterEach(cleanup);

  it('shows default text and description when there are no rows', () => {
    renderBody();
    expect(screen.getByText('No results found')).toBeTruthy();
    expect(screen.getByText('Try a different keyword')).toBeTruthy();
  });

  it('shows nothing extra when not searching', () => {
    renderBody(null, {});
    expect(screen.queryByText('No results found')).toBeNull();
  });

  it('reads the search value from the provider', () => {
    render(
      <OxygenUIThemeProvider>
        <ListingTableProvider searchValue="abc">
          <table>
            <ListingTableBody />
          </table>
        </ListingTableProvider>
      </OxygenUIThemeProvider>,
    );
    expect(screen.getByText('No results found')).toBeTruthy();
  });

  it('supports custom text and description', () => {
    renderBody(null, { searchValue: 'abc', noSearchResultsText: 'Nothing here', noSearchResultsDescription: 'Try again' });
    expect(screen.getByText('Nothing here')).toBeTruthy();
    expect(screen.getByText('Try again')).toBeTruthy();
  });

  it('ignores a whitespace-only search', () => {
    renderBody(null, { searchValue: '   ' });
    expect(screen.queryByText('No results found')).toBeNull();
  });

  it('skips the empty state while loading', () => {
    renderBody(null, { searchValue: 'abc', loading: true });
    expect(screen.queryByText('No results found')).toBeNull();
  });

  it('announces the empty state to screen readers', () => {
    renderBody();
    expect(screen.getByRole('status').textContent).toContain('No results found');
  });

  it('treats an empty fragment as no rows', () => {
    renderBody(<></>);
    expect(screen.getByText('No results found')).toBeTruthy();
  });

  it('renders rows instead of empty state when rows exist', () => {
    renderBody(<tr><td>row</td></tr>);
    expect(screen.getByText('row')).toBeTruthy();
    expect(screen.queryByText('No results found')).toBeNull();
  });
});
