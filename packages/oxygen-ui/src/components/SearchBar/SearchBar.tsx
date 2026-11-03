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

import * as React from 'react'
import { TextFieldProps } from '@mui/material/TextField'
import { SearchBarBase } from './SearchBarBase'

/** Width of a `width="standard"` search bar; fits about 30 visible characters. */
const SEARCH_BAR_STANDARD_WIDTH = 400

export interface SearchBarProps extends Omit<TextFieldProps, 'variant'> {
  /**
   * `standard` sizes the field to 400px, shrinking in narrower containers.
   * Use it for list and grid page search so it looks the same across the product.
   * `fullWidth` takes precedence when both are set.
   * @default 'auto'
   */
  width?: 'auto' | 'standard'
}

export const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(function SearchBar(
  { placeholder = 'Search', width = 'auto', fullWidth, sx, ...props },
  ref,
) {
  return (
    <SearchBarBase
      {...props}
      ref={ref}
      placeholder={placeholder}
      fullWidth={fullWidth}
      sx={
        width === 'standard' && !fullWidth
          ? { width: '100%', maxWidth: SEARCH_BAR_STANDARD_WIDTH, ...sx }
          : sx
      }
    />
  )
})

export default SearchBar
