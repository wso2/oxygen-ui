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

import type { PathMap } from '../src/pathMap.js';

export const map: PathMap = {
  TextField: { path: '@wso2/oxygen-ui/TextField', kind: 'default', typeOnly: false },
  TextFieldProps: { path: '@wso2/oxygen-ui/TextField', kind: 'named', typeOnly: true },
  textFieldClasses: { path: '@wso2/oxygen-ui/TextField', kind: 'named', typeOnly: false },
  Button: { path: '@wso2/oxygen-ui/Button', kind: 'default', typeOnly: false },
  useAppShell: { path: '@wso2/oxygen-ui/useAppShell', kind: 'default', typeOnly: false },
  ColorSchemeToggle: { path: '@wso2/oxygen-ui/ColorSchemeToggle', kind: 'default', typeOnly: false },
  ColorSchemeToggleDefault: { path: '@wso2/oxygen-ui/ColorSchemeToggle', kind: 'default', typeOnly: false },
  DataGrid: { path: '@wso2/oxygen-ui/data-grid', kind: 'namespace', typeOnly: false },
  colors: { path: '@wso2/oxygen-ui/colors', kind: 'namespace', typeOnly: false },
};
