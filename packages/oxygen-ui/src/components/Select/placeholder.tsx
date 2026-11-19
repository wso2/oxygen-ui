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
import { styled } from '@mui/material/styles';

// Unlike an input's ::placeholder, this is real text, so it must meet 4.5:1 contrast: use
// text.secondary rather than the faded placeholder colour.
const Placeholder = styled('span', { name: 'MuiSelect', slot: 'Placeholder' })(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  '.Mui-disabled > &': {
    color: 'inherit',
  },
}));

// MUI's own test for an empty select value.
export const isEmptyValue = (value: unknown) => value == null || value === '' || (Array.isArray(value) && value.length === 0);

// MUI compares option values as strings, except for objects.
export const areEqualValues = (a: unknown, b: unknown) => (typeof b === 'object' && b !== null ? a === b : String(a) === String(b));

// MUI's default display: the children of the selected option(s), joined with ", " when multiple.
export function renderSelectedOptions(selected: unknown, children: React.ReactNode): React.ReactNode {
  const options = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{ value?: unknown; children?: React.ReactNode }>[];
  const labelOf = (value: unknown) => options.find((option) => areEqualValues(value, option.props.value))?.props.children;
  if (!Array.isArray(selected)) return labelOf(selected);
  return selected.map((value, index) => (
    <React.Fragment key={index}>
      {index > 0 && ', '}
      {labelOf(value)}
    </React.Fragment>
  ));
}

/** Select props that show `placeholder` while the value is empty; shared with `TextField select`. */
export function selectPlaceholderProps<Value>(
  placeholder: React.ReactNode,
  renderValue: ((value: Value) => React.ReactNode) | undefined,
  children: React.ReactNode,
) {
  return {
    displayEmpty: true,
    renderValue: (selected: Value) => {
      if (isEmptyValue(selected)) return <Placeholder>{placeholder}</Placeholder>;
      return renderValue ? renderValue(selected) : renderSelectedOptions(selected, children);
    },
  };
}
