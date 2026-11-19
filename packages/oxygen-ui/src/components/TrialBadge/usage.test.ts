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

import { describe, expect, it } from 'vitest'
import { getUsageTone, itemsOf, sumOf } from './usage'

const item = (count: number, limit: number) => ({ label: 'x', count, limit })

describe('getUsageTone', () => {
  it('is success at or below the warning share', () => {
    expect(getUsageTone(0, 10, 0.5, 0.75)).toBe('success')
    expect(getUsageTone(5, 10, 0.5, 0.75)).toBe('success')
  })

  it('is warning above the warning share and below the critical share', () => {
    expect(getUsageTone(6, 10, 0.5, 0.75)).toBe('warning')
    expect(getUsageTone(7, 10, 0.5, 0.75)).toBe('warning')
  })

  it('is error at the critical share and over it', () => {
    expect(getUsageTone(7.5, 10, 0.5, 0.75)).toBe('error')
    expect(getUsageTone(12, 10, 0.5, 0.75)).toBe('error')
  })

  it('treats any use of a limit of 0 as over the limit', () => {
    expect(getUsageTone(0, 0, 0.5, 0.75)).toBe('error')
    expect(getUsageTone(3, 0, 0.5, 0.75)).toBe('error')
  })
})

describe('sumOf', () => {
  it('adds what the picker returns and counts a negative value as 0', () => {
    expect(sumOf([item(2, 10), item(-5, 4)], i => i.count)).toBe(2)
    expect(sumOf([item(2, 10), item(3, 4)], i => i.limit)).toBe(14)
  })
})

describe('itemsOf', () => {
  it('returns the loose rows before the rows nested in groups', () => {
    const rows = itemsOf({
      title: 's',
      items: [item(1, 1)],
      groups: [{ items: [item(2, 2)] }, { items: [item(3, 3)] }],
    })
    expect(rows.map(r => r.count)).toEqual([1, 2, 3])
  })

  it('counts a section that holds only groups', () => {
    expect(itemsOf({ title: 's', groups: [{ items: [item(4, 5)] }] })).toHaveLength(1)
  })

  it('returns nothing for an empty section', () => {
    expect(itemsOf({ title: 's' })).toEqual([])
  })
})
