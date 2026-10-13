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

import { Children, Fragment, ReactElement, ReactNode, isValidElement } from 'react';
import MuiTableBody, { TableBodyProps as MuiTableBodyProps } from '@mui/material/TableBody';
import MuiTableRow from '@mui/material/TableRow';
import MuiTableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { Search } from '@wso2/oxygen-ui-icons-react';
import { useListingTable } from '../context';
import { ListingTableEmptyState } from '../shared/ListingTableEmptyState';

export interface ListingTableBodyProps extends MuiTableBodyProps {
  /** Active search query; falls back to the ListingTable.Provider value */
  searchValue?: string;
  /** Skips the no-results state while data is loading; falls back to the ListingTable.Provider value */
  loading?: boolean;
  /** @default 'No results found' */
  noSearchResultsText?: string;
  /** @default 'Try a different keyword' */
  noSearchResultsDescription?: string;
  /** @default <Search /> */
  noSearchResultsIcon?: ReactNode;
  /** @default 1000 */
  emptyStateColSpan?: number;
}

function hasContent(node: ReactNode): boolean {
  return Children.toArray(node).some((child) =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment ? hasContent(child.props.children) : true,
  );
}

export function ListingTableBody({
  children,
  searchValue,
  loading,
  noSearchResultsText = 'No results found',
  noSearchResultsDescription = 'Try a different keyword',
  noSearchResultsIcon = <Search />,
  emptyStateColSpan = 1000,
  ...props
}: ListingTableBodyProps): ReactElement {
  const context = useListingTable();
  const isSearching = Boolean((searchValue ?? context?.searchValue)?.trim());
  const isLoading = loading ?? context?.loading ?? false;
  const hasRows = hasContent(children);

  if (isSearching && !isLoading && !hasRows) {
    return (
      <MuiTableBody {...props}>
        <MuiTableRow>
          <MuiTableCell colSpan={emptyStateColSpan} sx={{ border: 0 }}>
            <Box role="status" aria-live="polite">
              <ListingTableEmptyState
                title={noSearchResultsText}
                description={noSearchResultsDescription}
                illustration={noSearchResultsIcon}
              />
            </Box>
          </MuiTableCell>
        </MuiTableRow>
      </MuiTableBody>
    );
  }

  return <MuiTableBody {...props}>{children}</MuiTableBody>;
}

export default ListingTableBody;
