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

import { ReactElement } from 'react';
import MuiTableHead, { TableHeadProps as MuiTableHeadProps } from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';

export interface ListingTableHeadProps extends MuiTableHeadProps {}

const StyledTableHead = styled(MuiTableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    fontWeight: 600,
    ...theme.applyStyles('light', {
      backgroundColor: theme.palette.grey[50],
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
    }),
  },
}));

export function ListingTableHead({ children, ...props }: ListingTableHeadProps): ReactElement {
  return <StyledTableHead {...props}>{children}</StyledTableHead>;
}

export default ListingTableHead;
