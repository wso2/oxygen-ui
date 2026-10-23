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

import type {CatalogGuide} from '../types.js';

/**
 * Every guide in the Oxygen UI Storybook (stories titled `Guides/...`). `pnpm rules:coverage`
 * fails when a guide is missing here, and `pnpm rules:new --guide "<Title>"` adds one.
 */
const guides: CatalogGuide[] = [
  {
    id: 'Guides/Accessibility',
    summary: 'Accessibility baseline and practices for Oxygen UI based applications.',
  },
  {
    id: 'Guides/Browser Tab Title',
    summary: 'The browser tab title format for every page.',
  },
  {
    id: 'Guides/Choosing a Table',
    summary: 'Which table component to use, based on what users do with the data.',
  },
  {
    id: 'Guides/Favicon',
    summary: 'The favicon shown in browser tabs, bookmarks and history, and how to set it.',
  },
  {
    id: 'Guides/Side Panel Navigation',
    summary: 'Section titles, collapsible groups and footer items in the sidebar.',
  },
  {
    id: 'Guides/Writing UI Text',
    summary: 'Sentence case and wording for UI text.',
  },
  // rules:new:insert
];

export default guides;
