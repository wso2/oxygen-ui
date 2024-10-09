/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

const hues: {
  [key: string]: number;
} = {
  A: 0,
  B: 60,
  C: 120,
  D: 180,
  E: 240,
  F: 300,
};

type GenerateColor = (display: string) => string;

// Simple cache to store generated colors
const colorCache: {[key: string]: string} = {};

/**
 * Generate a pastel color based on the given text.
 *
 * @example
 * const color = generatePastelColor('John Doe');
 * console.log(color); // hsl(0 70% 80% / 50%)
 *
 * @param text - Text to generate the color from.
 * @returns Generated color.
 */
const generatePastelColor: GenerateColor = (text: string): string | null => {
  // Check if the color is already in the cache
  if (colorCache[text]) {
    return colorCache[text];
  }

  // Check if the text is a non-empty string and return `null` if it is.
  if (typeof text !== 'string' || text.trim() === '') {
    return null;
  }

  const hash: number = text.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const baseHue: number = hash % 360;

  const firstChar: string = text[0].toUpperCase();
  const predefinedHue: number = hues[firstChar] || baseHue;

  const saturation: number = Math.random() * (80 - 70) + 70;
  const divisor: number = Math.random() * (100 - 90) + 90;

  // Generate the color
  const color: string = `hsl(${predefinedHue} 80% ${saturation}% / ${divisor}%)`;

  // Cache the color for future use
  colorCache[text] = color;

  return color;
};

export default generatePastelColor;
