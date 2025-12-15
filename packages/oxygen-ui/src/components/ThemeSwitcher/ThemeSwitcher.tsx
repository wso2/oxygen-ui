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

import { ReactNode } from 'react';
import {
    useThemeSwitcher,
    type ThemeSwitcherContextValue
} from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import ThemeSelect from './ThemeSelect';

export interface ThemeSwitcherProps {
  /**
   * Optional render props function for custom UI.
   * If not provided, renders the default ThemeSelect component.
   */
  children?: (props: ThemeSwitcherContextValue) => ReactNode;
  /**
   * Size of the default select component (when not using render props)
   */
  size?: 'small' | 'medium';
  /**
   * Show label for the default select (when not using render props)
   */
  showLabel?: boolean;
  /**
   * Custom label text for the default select (when not using render props)
   */
  label?: string;
  /**
   * Variant of the default select (when not using render props)
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Additional sx prop for styling the default select (when not using render props)
   */
  sx?: object;
}

/**
 * ThemeSwitcher - UI component for theme switching
 * 
 * Must be used within OxygenUIThemeProvider with themes prop.
 * 
 * Default Usage (renders a select dropdown):
 * ```tsx
 * <OxygenUIThemeProvider themes={myThemes}>
 *   <ThemeSwitcher />
 *   <App />
 * </OxygenUIThemeProvider>
 * ```
 * 
 * Custom UI with Render Props:
 * ```tsx
 * <OxygenUIThemeProvider themes={myThemes}>
 *   <ThemeSwitcher>
 *     {({ currentTheme, themes, setTheme, isActive }) => (
 *       <div>
 *         {themes.map(t => (
 *           <button 
 *             key={t.key}
 *             onClick={() => setTheme(t.key)}
 *             style={{ fontWeight: isActive(t.key) ? 'bold' : 'normal' }}
 *           >
 *             {t.label}
 *           </button>
 *         ))}
 *       </div>
 *     )}
 *   </ThemeSwitcher>
 *   <App />
 * </OxygenUIThemeProvider>
 * ```
 */
export default function ThemeSwitcher({
  children,
  size,
  showLabel,
  label,
  variant,
  sx,
}: ThemeSwitcherProps) {
  const themeSwitcherContext = useThemeSwitcher();

  // If render props provided, use custom rendering
  if (children) {
    return <>{children(themeSwitcherContext)}</>;
  }

  // Otherwise, render default ThemeSelect
  return (
    <ThemeSelect
      size={size}
      showLabel={showLabel}
      label={label}
      variant={variant}
      sx={sx}
    />
  );
}
