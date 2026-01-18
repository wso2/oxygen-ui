/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com).
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

import MuiDivider, { DividerProps } from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

export type ComplexSelectDividerProps = DividerProps;

const StyledDivider = styled(MuiDivider, {
  name: 'MuiComplexSelectDivider',
  slot: 'Root',
})(({ theme }) => ({
  marginLeft: theme.spacing(-1),
  marginRight: theme.spacing(-1),
}));

export function ComplexSelectDivider({ ...props }: ComplexSelectDividerProps) {
  return <StyledDivider {...props} />;
}

export default ComplexSelectDivider;
