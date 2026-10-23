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

import type {RuleDefinition} from '../types.js';
import noDirectLucideImports from './no-direct-lucide-imports/index.js';
import noDirectMuiImports from './no-direct-mui-imports/index.js';

/**
 * Every rule in the registry. `pnpm rules:new --rule <id>` adds new rules here.
 */
const rules: RuleDefinition[] = [
  noDirectMuiImports,
  noDirectLucideImports,
  // rules:new:insert
];

export default rules;
