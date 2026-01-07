/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import { extendTheme, type Shadows } from '@mui/material/styles';
import OxygenThemeBase, { type OxygenTheme } from './OxygenThemeBase';

/**
 * Classic Theme - MUI default theme with custom orange primary color
 * Features: Orange primary (#ff7300), all other MUI defaults preserved
 */
const ClassicTheme = extendTheme(OxygenThemeBase, {
  shadows: Array(25).fill('none') as Shadows,
}) as OxygenTheme;

export default ClassicTheme;
