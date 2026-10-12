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
import { ListingTableBody } from './ListingTableBody';

function renderBody(rows?: React.ReactNode, props: { searchValue?: string } = { searchValue: 'abc' }) {
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
    expect(screen.getByText('No search results found')).toBeTruthy();
    expect(screen.getByText('Try a different search term.')).toBeTruthy();
  });

  it('shows nothing extra when not searching', () => {
    renderBody(null, {});
    expect(screen.queryByText('No search results found')).toBeNull();
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
    expect(screen.getByText('No search results found')).toBeTruthy();
  });

  it('supports custom text and description', () => {
    renderBody(null, { searchValue: 'abc', noSearchResultsText: 'Nothing here', noSearchResultsDescription: 'Try again' });
    expect(screen.getByText('Nothing here')).toBeTruthy();
    expect(screen.getByText('Try again')).toBeTruthy();
  });

  it('renders rows instead of empty state when rows exist', () => {
    renderBody(<tr><td>row</td></tr>);
    expect(screen.getByText('row')).toBeTruthy();
    expect(screen.queryByText('No search results found')).toBeNull();
  });
});
