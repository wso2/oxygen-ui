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

import type {RuleMeta} from '../../types.js';

const meta: RuleMeta = {
  id: 'no-direct-mui-imports',
  title: 'Import MUI components from Oxygen UI',
  summary: 'Import MUI components, styles and MUI X namespaces from `@wso2/oxygen-ui`, not from `@mui/*` packages.',
  category: 'imports',
  level: 'mandatory',
  severity: 'error',
  enforcement: 'automated',
  fix: 'safe',
  sources: [{type: 'package', name: '@wso2/oxygen-ui'}],
  since: '0.0.1',
};

export default meta;
