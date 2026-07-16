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
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { Search } from '@wso2/oxygen-ui-icons-react'

export interface SearchBarBaseProps extends Omit<TextFieldProps, 'variant'> {
  endAdornment?: React.ReactNode
}

export const SearchBarBase = React.forwardRef<HTMLDivElement, SearchBarBaseProps>(function SearchBarBase(
  { placeholder = 'Search', endAdornment, slotProps, sx, label, inputProps, ...props },
  ref,
) {
  const htmlInputSlotProps = slotProps?.htmlInput as
    | { 'aria-label'?: string; 'aria-labelledby'?: string }
    | undefined;
  const inputPropsAria = inputProps as
    | { 'aria-label'?: string; 'aria-labelledby'?: string }
    | undefined;
  const hasAccessibleName =
    Boolean(label) ||
    Boolean(htmlInputSlotProps?.['aria-label']) ||
    Boolean(htmlInputSlotProps?.['aria-labelledby']) ||
    Boolean(inputPropsAria?.['aria-label']) ||
    Boolean(inputPropsAria?.['aria-labelledby']);
  // Avoid an empty htmlInput slot: MUI merges it over inputProps and would
  // drop a consumer-provided accessible name.
  const shouldInjectPlaceholderLabel = !hasAccessibleName && Boolean(placeholder);
  const htmlInput = shouldInjectPlaceholderLabel || slotProps?.htmlInput
    ? {
        // Placeholder alone is a weak accessible name; expose it as a label
        // unless the consumer supplied their own labelling.
        ...(shouldInjectPlaceholderLabel ? { 'aria-label': placeholder } : null),
        ...slotProps?.htmlInput,
      }
    : undefined;

  return (
    <TextField
      {...props}
      ref={ref}
      label={label}
      inputProps={inputProps}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      slotProps={{
        ...slotProps,
        ...(htmlInput ? { htmlInput } : null),
        input: {
          ...slotProps?.input,
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" aria-hidden="true" />
            </InputAdornment>
          ),
          endAdornment: endAdornment,
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: 40,
        },
        '& .MuiInputBase-input': {
          padding: '8.5px 14px',
        },
        ...sx,
      }}
    />
  )
})

export default SearchBarBase
