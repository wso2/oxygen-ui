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

import { useThemeSwitcher } from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';

/**
 * Hook to get theme-specific content based on the currently active theme.
 * Returns the appropriate content for the current theme from the provided mapping.
 *
 * @template T - The type of content being returned
 * @param contentMap - Object mapping theme keys to content values
 * @param fallback - Optional fallback content if current theme key is not in the map
 * @returns The content for the current theme, or fallback, or the first available content
 *
 * @example
 * Basic usage with strings
 * ```tsx
 * const greeting = useThemeContent({
 *   default: 'Welcome to Default Theme',
 *   purple: 'Welcome to Purple Theme',
 *   green: 'Welcome to Green Theme'
 * });
 * 
 * return <h1>{greeting}</h1>;
 * ```
 *
 * @example
 * With image URLs
 * ```tsx
 * const logoSrc = useThemeContent({
 *   default: '/logos/logo-blue.svg',
 *   purple: '/logos/logo-purple.svg'
 * }, '/logos/logo-default.svg');
 * 
 * return <img src={logoSrc} alt="Logo" />;
 * ```
 *
 * @example
 * With complex objects
 * ```tsx
 * const themeConfig = useThemeContent({
 *   default: { color: '#1976d2', icon: 'home' },
 *   purple: { color: '#9c27b0', icon: 'star' }
 * });
 * 
 * return <Icon name={themeConfig.icon} color={themeConfig.color} />;
 * ```
 *
 * @example
 * With React components
 * ```tsx
 * const ThemeIcon = useThemeContent({
 *   default: <HomeIcon />,
 *   purple: <StarIcon />,
 *   green: <NatureIcon />
 * });
 * 
 * return <div>{ThemeIcon}</div>;
 * ```
 */
export function useThemeContent<T>(
  contentMap: Record<string, T>,
  fallback?: T
): T {
  const { currentTheme } = useThemeSwitcher();

  // Return content for current theme, or fallback, or first available content
  return contentMap[currentTheme] ?? fallback ?? Object.values(contentMap)[0];
}

export default useThemeContent;
