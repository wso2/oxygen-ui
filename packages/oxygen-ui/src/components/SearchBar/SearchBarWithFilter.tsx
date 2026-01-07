import * as React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'

export type AdvancedFilterOption = {
  value: string
  label: string
}

export interface AdvancedFilterState {
  attribute: string
  condition: string
  value: string
}

export interface SearchBarWithAdvancedFilterProps
  extends Omit<TextFieldProps, 'variant' | 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
  advancedFilter: AdvancedFilterState
  onAdvancedFilterChange: (next: AdvancedFilterState) => void
  attributeOptions: AdvancedFilterOption[]
  conditionOptions: AdvancedFilterOption[]
  onAdvancedSearch?: (payload: { searchText: string } & AdvancedFilterState) => void
  maxHeight?: number
  placeholder?: string
  popoverWidth?: number
}

export function SearchBarWithAdvancedFilter({
  value,
  onChange,
  advancedFilter,
  onAdvancedFilterChange,
  attributeOptions,
  conditionOptions,
  onAdvancedSearch,
  maxHeight = 56,
  placeholder = 'Search by name',
  popoverWidth = 460,
  sx,
  ...props
}: SearchBarWithAdvancedFilterProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleAttrChange = (e: any) => {
    onAdvancedFilterChange({ ...advancedFilter, attribute: e.target.value as string })
  }

  const handleCondChange = (
    e:
      | React.ChangeEvent<Omit<HTMLInputElement, 'value'> & { value: string }>
      | (Event & { target: { value: string; name: string } }),
    child: React.ReactNode
  ) => {
    onAdvancedFilterChange({ ...advancedFilter, condition: e.target.value as string })
  }

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAdvancedFilterChange({ ...advancedFilter, value: e.target.value })
  }

  const handleAdvancedSearch = () => {
    onAdvancedSearch?.({
      searchText: value,
      attribute: advancedFilter.attribute,
      condition: advancedFilter.condition,
      value: advancedFilter.value,
    })
    handleClose()
  }

  const popoverId = open ? 'advanced-search-popover' : undefined

  return (
    <>
      <TextField
        {...props}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        variant="outlined"
        sx={{
          maxHeight,
          '& .MuiInputBase-root': {
            maxHeight,
            pr: 0,
          },
          ...sx,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ m: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                <IconButton
                  aria-describedby={popoverId}
                  onClick={handleOpen}
                  size="small"
                  sx={{ mx: 0.5 }}
                >
                  <FilterListIcon fontSize="small" />
                </IconButton>
              </Box>
            </InputAdornment>
          ),
        }}
      />

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: popoverWidth,
            borderRadius: 1,
            p: 2,
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Advanced search
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Stack spacing={2} marginTop={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="adv-filter-attribute-label">
              Filter attribute{' '}
              <Box component="span" sx={{ color: 'error.main' }}>
                *
              </Box>
            </InputLabel>

            <Select
              labelId="adv-filter-attribute-label"
              value={advancedFilter.attribute}
              label="Filter attribute *"
              onChange={handleAttrChange}
            >
              {attributeOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="adv-filter-condition-label">
                Filter condition{' '}
                <Box component="span" sx={{ color: 'error.main' }}>
                  *
                </Box>
              </InputLabel>

              <Select
                labelId="adv-filter-condition-label"
                value={advancedFilter.condition}
                label="Filter condition *"
                onChange={handleCondChange}
              >
                {conditionOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              required
              label="Filter value"
              placeholder="Enter value to search"
              value={advancedFilter.value}
              onChange={handleFilterValueChange}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="contained"
              onClick={handleAdvancedSearch}
              disabled={
                !advancedFilter.attribute || !advancedFilter.condition || !advancedFilter.value
              }
              sx={{ borderRadius: 999, px: 3 }}
            >
              Search
            </Button>
          </Box>
        </Stack>
      </Popover>
    </>
  )
}

export default SearchBarWithAdvancedFilter
