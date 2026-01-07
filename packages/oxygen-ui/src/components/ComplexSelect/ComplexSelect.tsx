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

import { ReactNode, ReactElement } from 'react';
import MuiSelect, { SelectProps, selectClasses } from '@mui/material/Select';
import MuiFormControl from '@mui/material/FormControl';
import MuiInputLabel from '@mui/material/InputLabel';
import ComplexSelectListHeader from './ComplexSelectListHeader';
import ComplexSelectMenuItem from './ComplexSelectMenuItem';
import ComplexSelectDivider from './ComplexSelectDivider';

export interface ComplexSelectProps extends Omit<SelectProps, 'children'> {
  children: ReactNode;
}

export function ComplexSelect({ children, sx, label, labelId, ...props }: ComplexSelectProps) {
  const selectContent = (
    <MuiSelect
      {...props}
      label={label}
      labelId={labelId}
      sx={{
        maxHeight: 56,
        '&.MuiList-root': {
          p: '8px',
        },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          paddingRight: '42px',
        },
        [`& .${selectClasses.icon}`]: {
          marginLeft: '8px',
        },
        ...sx,
      }}
    >
      {children}
    </MuiSelect>
  );

  // If label is provided, wrap with FormControl and InputLabel
  if (label) {
    const generatedLabelId = labelId || `complex-select-label-${Math.random().toString(36).substr(2, 9)}`;
    return (
      <MuiFormControl fullWidth={props.fullWidth} sx={{ minWidth: 120 }}>
        <MuiInputLabel id={generatedLabelId}>{label}</MuiInputLabel>
        <MuiSelect
          {...props}
          label={label}
          labelId={generatedLabelId}
          sx={{
            maxHeight: 56,
            '&.MuiList-root': {
              p: '8px',
            },
            [`& .${selectClasses.select}`]: {
              display: 'flex',
              alignItems: 'center',
              paddingRight: '42px',
            },
            [`& .${selectClasses.icon}`]: {
              marginLeft: '8px',
            },
            ...sx,
          }}
        >
          {children}
        </MuiSelect>
      </MuiFormControl>
    );
  }

  return selectContent;
}

// Define the main component type with sub-components
interface ComplexSelectComponent {
  (props: ComplexSelectProps): ReactElement;
  ListHeader: typeof ComplexSelectListHeader;
  MenuItem: typeof ComplexSelectMenuItem;
  Divider: typeof ComplexSelectDivider;
}

// Create the compound component
const ComplexSelectCompound: ComplexSelectComponent = Object.assign(ComplexSelect, {
  ListHeader: ComplexSelectListHeader,
  MenuItem: ComplexSelectMenuItem,
  Divider: ComplexSelectDivider,
});

export default ComplexSelectCompound;
