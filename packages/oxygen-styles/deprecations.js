/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

/**
    Deprecated Selectors
    -------------------------
    These are deprecated selectors and should not be used. They include a replacement value,
    which can be an array or null.

      * 'deprecated-selector': 'replacement-selector'
          <-- Replace with this selector.
      * 'deprecated-selector': ['replacement-1', 'replacement-2']
          <-- Replace with one of these selectors.
      * 'deprecated-selector': null
          <-- No option available, remove selector.
*/

import fs from 'fs';

const deprecations = JSON.parse(fs.readFileSync('./dist/deprecations.json'));

const deprecatedSelectors = deprecations.selectors;
const deprecatedSassVariables = deprecations.variables;
const deprecatedSassMixins = deprecations.mixins;

export {
  deprecatedSelectors,
  deprecatedSassVariables,
  deprecatedSassMixins,
};
