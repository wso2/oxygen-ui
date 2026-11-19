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

/** The tokens a theme gives for the code colours, which the charts borrow for their series. */
export interface ChartSyntaxTokens {
  primary?: string;
  background?: string;
  text?: string;
  comment?: string;
  keyword?: string;
  string?: string;
  function?: string;
  number?: string;
  operator?: string;
}

export interface ChartColors {
  /** The colours of the series, in order: the custom ones when there are any. */
  series: string[];
  background: string;
  text: string;
  comment: string;
  isDark: boolean;
}

interface ChartColorInput {
  isDark: boolean;
  /** The primary colour of the theme. */
  primary?: string;
  /** The syntax tokens of the theme for the current scheme, if it has any. */
  syntax?: ChartSyntaxTokens;
  customColors?: string[];
}

const fallbackColors = (isDark: boolean) => ({
  primary: isDark ? '#F87643' : '#fa7b3f',
  background: isDark ? '#1e1e1e' : '#f5f5f5',
  text: isDark ? '#d4d4d4' : '#24292e',
  comment: isDark ? '#6a9955' : '#6a737d',
  keyword: isDark ? '#569cd6' : '#d73a49',
  string: isDark ? '#ce9178' : '#032f62',
  function: isDark ? '#dcdcaa' : '#6f42c1',
  number: isDark ? '#b5cea8' : '#005cc5',
  operator: isDark ? '#d4d4d4' : '#d73a49',
});

/**
 * The colours of a chart: its series, and the background, text and comment colours of the rest of it. The theme's syntax tokens win over
 * the fallbacks, and the theme's primary colour wins over the primary of the syntax tokens.
 */
export const chartColors = ({ isDark, primary, syntax, customColors }: ChartColorInput): ChartColors => {
  const fallback = fallbackColors(isDark);
  const resolved = { ...fallback, ...syntax, primary: primary || syntax?.primary || fallback.primary };
  const series =
    customColors && customColors.length > 0
      ? customColors
      : [resolved.primary, resolved.keyword, resolved.string, resolved.function, resolved.number, resolved.operator];

  return { series, background: resolved.background, text: resolved.text, comment: resolved.comment, isDark };
};
