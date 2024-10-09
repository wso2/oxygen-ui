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

import {useEffect, useState} from 'react';
import generatePastelColor from '../utils/generate-pastel-color';

export interface UsePastelColorGenerator {
  /**
   * Generated color.
   */
  color: string;
  /**
   * Function to update the text.
   * @param newText - New text to generate the color from.
   * @returns void
   */
  updateText: (newText: string) => void;
}

/**
 * Hook to generate a pastel color based on the given text.
 *
 * @example
 * const {color, updateText} = usePastelColorGenerator('John Doe');
 * console.log(color); // hsl(0 70% 80% / 50%)
 * updateText('Jane Doe');
 * console.log(color); // hsl(240 70% 80% / 50%)
 *
 * @param initialText - Text to generate the color from.
 * @returns Generated color and a function to update the text.
 */
const usePastelColorGenerator = (initialText: string): UsePastelColorGenerator => {
  const [text, setText] = useState<string>(initialText);
  const [color, setColor] = useState<string>(generatePastelColor(initialText));

  useEffect(() => {
    setColor(generatePastelColor(text));
  }, [text]);

  const updateText = (newText: string): void => {
    setText(newText);
  };

  return {color, updateText};
};

export default usePastelColorGenerator;
