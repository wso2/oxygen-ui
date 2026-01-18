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

import React from 'react'
import { Tooltip } from "recharts"

export interface BarChartProps {
  /**
   * Data to be displayed in the chart.
   */
  data?: any[]
  /**
   * Configuration for the bars in the chart.
   */
  bars?: Array<{
    dataKey: string
    name?: string
    fill?: string
    /**
     * The id of the stack the bar belongs to.
     */
    stackId?: string | number
    /**
     * The radius of the bar's corners.
     */
    radius?: number | [number, number, number, number]
    /**
     * If true, the bar will be hidden.
     */
    hide?: boolean
    /**
     * Configuration for the bar's label.
     */
    label?: boolean | any
    /**
     * If true, the bar will be animated.
     * @default true
     */
    isAnimationActive?: boolean
    /**
     * Duration of the animation in ms.
     * @default 1500
     */
    animationDuration?: number
    /**
     * Delay before the animation begins in ms.
     * @default 0
     */
    animationBegin?: number
    /**
     * Easing function for the animation.
     * @default 'ease'
     */
    animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
    onClick?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseEnter?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseLeave?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseDown?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseUp?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseMove?: (data: any, index: number, event: React.MouseEvent) => void
  }>
  /**
   * Custom colors for the bars.
   */
  colors?: string[]
  /**
   * The key of each category/series label in data.
   */
  xAxisDataKey?: string
  /**
   * Height of the chart.
   * @default 300
   */
  height?: number | string
  /**
   * Width of the chart.
   * @default '100%'
   */
  width?: number | string
  /**
   * Legend configuration.
   */
  legend?: {
    show?: boolean
    align?: 'left' | 'center' | 'right'
    verticalAlign?: 'top' | 'middle' | 'bottom'
  }
  /**
   * Grid configuration.
   */
  grid?: {
    show?: boolean
    strokeDasharray?: string
  }
  /**
   * Tooltip configuration.
   */
  tooltip?: {
    show?: boolean
  } & React.ComponentProps<typeof Tooltip>
  /**
   * The layout of the chart.
   * @default 'horizontal'
   */
  layout?: 'horizontal' | 'vertical'
  /**
   * Margin around the chart.
   */
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  /**
   * The gap between two bar categories.
   */
  barCategoryGap?: number | string
  /**
   * The gap between two bars in the same category.
   */
  barGap?: number | string
  /**
   * The width or height of each bar.
   */
  barSize?: number | string
  /**
   * The maximum width or height of each bar.
   */
  maxBarSize?: number
  /**
   * The offset of the stacks.
   */
  stackOffset?: 'sign' | 'expand' | 'none' | 'wiggle' | 'silhouette' | 'positive'
  /**
   * If true, an accessibility layer will be added to the chart.
   * @default true
   */
  accessibilityLayer?: boolean
  /**
   * XAxis configuration.
   */
  xAxis?: {
    show?: boolean
    name?: string
  }
  /**
   * YAxis configuration.
   */
  yAxis?: {
    show?: boolean
    name?: string
  }
  /**
   * If true, the chart bars will be animated.
   * @default true
   */
  isAnimationActive?: boolean
  /**
   * Duration of the animation in ms.
   * @default 1500
   */
  animationDuration?: number
  /**
   * Delay before the animation begins in ms.
   * @default 0
   */
  animationBegin?: number
  /**
   * Easing function for the animation.
   * @default 'ease'
   */
  animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  /**
   * Optional children for composition.
   */
  children?: React.ReactNode
  /**
   * Default click event handler.
   */
  onClick?: (data: any, index: number, event: React.MouseEvent) => void
  /**
   * Default mouse enter event handler.
   */
  onMouseEnter?: (data: any, index: number, event: React.MouseEvent) => void
  /**
   * Default mouse leave event handler.
   */
  onMouseLeave?: (data: any, index: number, event: React.MouseEvent) => void
  /**
   * Default mouse down event handler.
   */
  onMouseDown?: (data: any, index: number, event: React.MouseEvent) => void
  /**
   * Default mouse up event handler.
   */
  onMouseUp?: (data: any, index: number, event: React.MouseEvent) => void
  /**
   * Default mouse move event handler.
   */
  onMouseMove?: (data: any, index: number, event: React.MouseEvent) => void
}
