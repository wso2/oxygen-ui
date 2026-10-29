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

import type {CatalogPackage} from '../types.js';

/**
 * Every publishable package in the Oxygen UI repository. `pnpm rules:coverage` fails when a
 * package that is not private is missing here, and `pnpm rules:new --package <name>` adds one.
 */
const packages: CatalogPackage[] = [
  {
    name: '@wso2/oxygen-ui',
    summary: 'The Oxygen UI component library: Oxygen components, themes and the re-exported MUI API.',
    usage: 'Import components, MUI X namespaces and styling utilities from this package instead of @mui/*.',
  },
  {
    name: '@wso2/oxygen-ui-icons-react',
    summary: 'Lucide icons plus WSO2 and brand icons.',
    usage: 'Import icons from this package instead of lucide-react or @mui/icons-material.',
  },
  {
    name: '@wso2/oxygen-ui-charts-react',
    summary: 'Oxygen-styled chart components built on Recharts.',
    usage: 'Use these chart components instead of Recharts or other chart libraries directly.',
  },
  // rules:new:insert
];

export default packages;
