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

import type { TimeRange } from '../TimeRangeFilter';
import type { LogFilterValue } from './types';

/**
 * True when the value of a filter is a time range, which is the only filter value that is an object.
 */
export const isRange = (value: LogFilterValue): value is TimeRange => typeof value === 'object' && value !== null;

/**
 * True when a filter has a value to show: a time range, or a text that is not empty. An unset
 * filter, or one set to an empty text, has none.
 */
export const isApplied = (value: LogFilterValue): boolean =>
  isRange(value) || (typeof value === 'string' && value !== '');
