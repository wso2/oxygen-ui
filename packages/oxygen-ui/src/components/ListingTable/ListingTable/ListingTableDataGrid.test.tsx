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
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

const loadListingTableDataGrid = vi.hoisted(() => vi.fn());
vi.mock('./loadListingTableDataGrid', () => ({ loadListingTableDataGrid }));

const loadedModule = { default: () => <div>grid loaded</div> };

async function renderDataGrid() {
  const { default: ListingTableDataGrid } = await import('./ListingTableDataGrid');
  return render(<ListingTableDataGrid rows={[]} columns={[]} />);
}

describe('ListingTableDataGrid', () => {
  beforeEach(() => {
    vi.resetModules();
    loadListingTableDataGrid.mockReset();
  });

  afterEach(cleanup);

  it('shows a loading state while the grid loads, then the grid', async () => {
    let finishLoading: (module: typeof loadedModule) => void = () => undefined;
    loadListingTableDataGrid.mockReturnValue(new Promise(resolve => (finishLoading = resolve)));

    await renderDataGrid();
    expect(screen.getByLabelText('Loading data grid')).toBeTruthy();
    expect(screen.queryByText('grid loaded')).toBeNull();

    finishLoading(loadedModule);
    expect(await screen.findByText('grid loaded')).toBeTruthy();
    expect(screen.queryByLabelText('Loading data grid')).toBeNull();
  });

  it('leaves the loading state for an instance mounted while the load finishes before its effect runs', async () => {
    let finishLoading: () => void = () => undefined;
    loadListingTableDataGrid.mockReturnValue({
      then: (onLoaded: (module: typeof loadedModule) => void) => {
        finishLoading = () => onLoaded(loadedModule);
      },
    });
    const { default: ListingTableDataGrid } = await import('./ListingTableDataGrid');

    function FinishLoadingBeforeEffects() {
      React.useLayoutEffect(() => finishLoading(), []);
      return null;
    }

    const { rerender } = render(<ListingTableDataGrid rows={[]} columns={[]} />);
    rerender(
      <>
        <ListingTableDataGrid rows={[]} columns={[]} />
        <FinishLoadingBeforeEffects />
        <ListingTableDataGrid rows={[]} columns={[]} />
      </>,
    );

    await waitFor(() => expect(screen.getAllByText('grid loaded')).toHaveLength(2));
    expect(screen.queryByLabelText('Loading data grid')).toBeNull();
  });

  it('shows an error state when the load fails', async () => {
    loadListingTableDataGrid.mockRejectedValue(new Error('chunk failed'));

    await renderDataGrid();

    expect(await screen.findByText('The data grid could not be loaded.')).toBeTruthy();
  });

  it('tries again on the next mount after a failed load', async () => {
    loadListingTableDataGrid.mockRejectedValueOnce(new Error('chunk failed')).mockResolvedValue(loadedModule);

    const first = await renderDataGrid();
    await screen.findByText('The data grid could not be loaded.');
    first.unmount();

    await renderDataGrid();

    expect(await screen.findByText('grid loaded')).toBeTruthy();
    expect(loadListingTableDataGrid).toHaveBeenCalledTimes(2);
  });

  it('renders the grid at once on a later mount after a successful load', async () => {
    loadListingTableDataGrid.mockResolvedValue(loadedModule);

    const first = await renderDataGrid();
    await waitFor(() => expect(screen.getByText('grid loaded')).toBeTruthy());
    first.unmount();

    await renderDataGrid();

    expect(screen.getByText('grid loaded')).toBeTruthy();
    expect(loadListingTableDataGrid).toHaveBeenCalledTimes(1);
  });
});
