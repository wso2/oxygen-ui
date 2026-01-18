/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react'

// Custom hook to detect the current color scheme (light or dark).
export const useColorScheme = (themeMode: string): boolean => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof document === 'undefined') {
      return themeMode === 'dark'
    }
    const htmlElement = document.documentElement
    const colorScheme = htmlElement.getAttribute('data-color-scheme')
    return colorScheme === 'dark' || themeMode === 'dark'
  })

  React.useEffect(() => {
    if (typeof document === 'undefined') return

    const checkColorScheme = () => {
      const htmlElement = document.documentElement
      const colorScheme = htmlElement.getAttribute('data-color-scheme')
      setIsDark(colorScheme === 'dark' || themeMode === 'dark')
    }

    checkColorScheme()

    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(checkColorScheme)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-color-scheme'],
      })

      return () => observer.disconnect()
    }

    return undefined
  }, [themeMode])

  return isDark
}
