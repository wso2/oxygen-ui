/*
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useThemeSwitcher } from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';

export interface ThemeSelectProps {
  /**
   * Size of the select component
   */
  size?: 'small' | 'medium';
  /**
   * Show label for the select
   */
  showLabel?: boolean;
  /**
   * Custom label text
   */
  label?: string;
  /**
   * Variant of the select component
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Additional sx prop for styling
   */
  sx?: object;
}

/**
 * ThemeSelect - A select box component for theme switching
 * 
 * Must be used within OxygenUIThemeProvider with themes prop.
 * Provides a dropdown select interface for switching between available themes.
 * 
 * @example
 * ```tsx
 * <OxygenUIThemeProvider themes={myThemes}>
 *   <ThemeSelect />
 *   <App />
 * </OxygenUIThemeProvider>
 * ```
 */
export default function ThemeSelect({
  size = 'small',
  showLabel = false,
  label = 'Theme',
  variant = 'outlined',
  sx,
}: ThemeSelectProps) {
  const { currentTheme, themes, setTheme } = useThemeSwitcher();

  const handleChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value);
  };

  return (
    <FormControl size={size} variant={variant} sx={{ minWidth: 120, ...sx }}>
      { showLabel && <InputLabel id="theme-select-label">{label}</InputLabel> }
      <Select
        labelId={ showLabel ? 'theme-select-label' : undefined }
        value={ currentTheme }
        onChange={ handleChange }
        label={ showLabel ? label : undefined }
      >
        { themes.map((themeOption) => (
          <MenuItem key={themeOption.key} value={themeOption.key}>
            {themeOption.label}
          </MenuItem>
        )) }
      </Select>
    </FormControl>
  );
}
