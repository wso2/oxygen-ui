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

const SIX_DIGIT_HEX = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

const rgbOf = (hex: string): number[] => {
  const match = SIX_DIGIT_HEX.exec(hex);

  if (!match) throw new Error(`Expected a six digit hex colour, got "${hex}".`);

  return match.slice(1).map((part) => parseInt(part, 16));
};

/** The CSS variable channel of a colour: `#5567d5` is `85 103 213`. */
export const channelOf = (hex: string): string => rgbOf(hex).join(' ');

/** A colour at an alpha, as `rgba(...)`. */
export const tint = (hex: string, alpha: number): string => `rgba(${rgbOf(hex).join(', ')}, ${alpha})`;

interface PaletteColorInput {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

/**
 * A palette colour with its main channel derived from `main`. A theme that extends a built theme keeps the
 * channels the base derived for its own colours, so a changed `main` needs its channel set again.
 */
export const paletteColor = ({ main, ...rest }: PaletteColorInput) => ({ main, mainChannel: channelOf(main), ...rest });
