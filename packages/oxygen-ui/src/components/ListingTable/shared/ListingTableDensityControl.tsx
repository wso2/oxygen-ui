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

import { ReactElement, useCallback } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { SxProps, Theme } from '@mui/material/styles';
import { AlignJustify, Menu, List } from '@wso2/oxygen-ui-icons-react';
import type { ListingTableDensity } from './types';
import { useListingTable } from '../context';

export interface ListingTableDensityControlProps {
  /**
   * Current density value.
   * When using with Provider, this is automatically derived from context if not provided.
   */
  value?: ListingTableDensity;
  /**
   * Change handler.
   * When using with Provider, this is automatically handled via context if not provided.
   */
  onChange?: (density: ListingTableDensity) => void;
  /**
   * Size of the toggle buttons
   * @default 'small'
   */
  size?: 'small' | 'medium';
  /**
   * Custom styles for the container
   */
  sx?: SxProps<Theme>;
}

const densityOptions: Array<{
  value: ListingTableDensity;
  label: string;
  icon: ReactElement;
}> = [
  { value: 'compact', label: 'Compact', icon: <AlignJustify size={18} /> },
  { value: 'standard', label: 'Standard', icon: <Menu size={18} /> },
  { value: 'comfortable', label: 'Comfortable', icon: <List size={18} /> },
];

export function ListingTableDensityControl({
  value: valueProp,
  onChange: onChangeProp,
  size = 'small',
  sx,
}: ListingTableDensityControlProps): ReactElement {
  // Get context (may be null for backward compatibility)
  const tableContext = useListingTable();

  // Derive value: props > context > default
  const value = valueProp ?? tableContext?.density ?? 'standard';

  // Derive onChange: props > context
  const effectiveOnChange = onChangeProp ?? tableContext?.onDensityChange;

  const handleChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newDensity: ListingTableDensity | null) => {
      if (newDensity !== null) {
        effectiveOnChange?.(newDensity);
      }
    },
    [effectiveOnChange],
  );

  return (
    <ToggleButtonGroup value={value} exclusive onChange={handleChange} size={size} sx={sx}>
      {densityOptions.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          <Tooltip title={option.label}>
            <span style={{ display: 'flex', alignItems: 'center' }}>{option.icon}</span>
          </Tooltip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ListingTableDensityControl;
