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

import { describe, expect, it } from 'vitest'
import { chartColors } from './chartColors'

const lightFallback = ['#fa7b3f', '#d73a49', '#032f62', '#6f42c1', '#005cc5', '#d73a49']
const darkFallback = ['#F87643', '#569cd6', '#ce9178', '#dcdcaa', '#b5cea8', '#d4d4d4']

describe('chartColors, without a theme', () => {
  it('gives six series colours in order, for each scheme', () => {
    expect(chartColors({ isDark: false }).series).toEqual(lightFallback)
    expect(chartColors({ isDark: true }).series).toEqual(darkFallback)
  })

  it('gives the background, text and comment colours of each scheme', () => {
    expect(chartColors({ isDark: false })).toMatchObject({ background: '#f5f5f5', text: '#24292e', comment: '#6a737d', isDark: false })
    expect(chartColors({ isDark: true })).toMatchObject({ background: '#1e1e1e', text: '#d4d4d4', comment: '#6a9955', isDark: true })
  })
})

describe('chartColors, with a theme', () => {
  it('takes a syntax token over the fallback and keeps the fallback for the tokens the theme lacks', () => {
    const { series, text } = chartColors({ isDark: false, syntax: { keyword: '#111111', text: '#222222' } })

    expect(series).toEqual(['#fa7b3f', '#111111', '#032f62', '#6f42c1', '#005cc5', '#d73a49'])
    expect(text).toBe('#222222')
  })

  it('takes the primary colour of the theme first, then the primary of the syntax tokens, then the fallback', () => {
    expect(chartColors({ isDark: false, primary: '#123456', syntax: { primary: '#abcdef' } }).series[0]).toBe('#123456')
    expect(chartColors({ isDark: false, syntax: { primary: '#abcdef' } }).series[0]).toBe('#abcdef')
    expect(chartColors({ isDark: false, primary: '', syntax: {} }).series[0]).toBe('#fa7b3f')
  })
})

describe('chartColors, with colours of the chart\'s own', () => {
  it('uses them as the series, whatever the theme says', () => {
    expect(chartColors({ isDark: false, primary: '#123456', customColors: ['#a', '#b'] }).series).toEqual(['#a', '#b'])
  })

  it('still resolves the other colours from the theme', () => {
    expect(chartColors({ isDark: true, customColors: ['#a'], syntax: { text: '#999999' } })).toMatchObject({ text: '#999999', background: '#1e1e1e' })
  })

  it('ignores an empty list', () => {
    expect(chartColors({ isDark: false, customColors: [] }).series).toEqual(lightFallback)
  })
})
