/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

import type {} from '@mui/material/themeCssVarsAugmentation';

declare module '@mui/material/style' {
  interface SupportedColorScheme {
    /**
     * Provides extra visual weight to identify the primary action from a set of buttons.
     */
    highContrast: true;
  }
}

// TS doesn't accept the augmented namespaces without this.
// https://github.com/mui/material-ui/issues/28244#issuecomment-1181448039
export {};
