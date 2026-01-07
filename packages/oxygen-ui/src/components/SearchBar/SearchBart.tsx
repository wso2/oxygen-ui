import * as React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

export interface SearchBarProps extends Omit<TextFieldProps, 'variant'> {
}

export function SearchBar({
  placeholder = 'Search',
  ...props
}: SearchBarProps) {
  return (
    <TextField
      {...props}
      placeholder={placeholder}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default SearchBar
