/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

// Matches only fixed-label fields: the Oxygen TextField's `top` mode puts a FormLabel right before
// an inner TextField that has no label of its own. Excluding TextFields with an InputLabel keeps a
// standalone FormLabel placed before a floating-label field from matching.
export const fixedLabelField = '.MuiFormLabel-root + .MuiTextField-root:not(:has(> .MuiInputLabel-root))';

// Prefixes that, followed by an input root state, match only fixed-label inputs: the Oxygen TextField's
// inner input, and the Oxygen Select's `top` mode, which puts a FormLabel (not an InputLabel) right
// before the select's input root.
export const fixedLabelInputs = [`${fixedLabelField} > &`, '.MuiFormLabel-root:not(.MuiInputLabel-root) + &'];
