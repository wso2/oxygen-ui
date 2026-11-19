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

import type { TrialBadgeUsageItem, TrialBadgeUsageSection, TrialBadgeUsageTone } from './TrialBadge'

export const getUsageTone = (
  count: number,
  limit: number,
  warningThreshold: number,
  criticalThreshold: number
): TrialBadgeUsageTone => {
  // A limit of 0 means nothing is allowed, so any use is over the limit.
  const share = limit > 0 ? count / limit : 1
  if (share >= criticalThreshold) return 'error'
  if (share > warningThreshold) return 'warning'
  return 'success'
}

export const sumOf = (items: TrialBadgeUsageItem[], pick: (item: TrialBadgeUsageItem) => number) =>
  items.reduce((sum, item) => sum + Math.max(0, pick(item)), 0)

/**
 * Every row a section draws, loose ones and grouped ones alike.
 *
 * A section's total has to count the rows nested in its groups: a section that
 * holds nothing but groups would otherwise total "0 of 0" while displaying a
 * full set of bars.
 */
export const itemsOf = (section: TrialBadgeUsageSection): TrialBadgeUsageItem[] =>
  ([] as TrialBadgeUsageItem[]).concat(section.items ?? [], ...(section.groups ?? []).map(group => group.items))
