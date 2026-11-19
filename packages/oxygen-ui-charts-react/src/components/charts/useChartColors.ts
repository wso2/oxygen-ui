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
import { useColorScheme, useTheme } from '@wso2/oxygen-ui'
import { chartColors, type ChartColors, type ChartSyntaxTokens } from './chartColors'

/** The colours of a chart for the current theme and color scheme. See `chartColors`. */
export const useChartColors = (customColors?: string[]): ChartColors => {
  const theme = useTheme()
  const { mode, systemMode } = useColorScheme()
  const isDark = mode === 'dark' || (mode === 'system' && systemMode === 'dark')
  const syntaxTokens = (theme.vars as { syntax?: { dark?: ChartSyntaxTokens; light?: ChartSyntaxTokens } } | undefined)?.syntax
  const syntax = isDark ? syntaxTokens?.dark : syntaxTokens?.light
  const primary = theme.palette.primary?.main

  return React.useMemo(
    () => chartColors({ isDark, primary, syntax, customColors }),
    [isDark, primary, syntax, customColors]
  )
}
