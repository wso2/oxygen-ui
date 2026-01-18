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
import { Tooltip } from 'recharts'

export interface AreaChartProps {
  /**
   * Data to be displayed in the chart.
   */
  data?: any[]
  /**
   * Configuration for the areas in the chart.
   */
  areas?: Array<{
    dataKey: string
    name?: string
    stroke?: string
    strokeWidth?: number
    strokeDasharray?: string | number
    fill?: string
    fillOpacity?: number
    /**
     * When two Areas have the same axisId and same stackId, then the two Areas are stacked in the chart.
     */
    stackId?: string | number
    /**
     * The interpolation type of curve.
     * @default 'linear'
     */
    type?:
      | 'basis'
      | 'basisClosed'
      | 'basisOpen'
      | 'linear'
      | 'linearClosed'
      | 'natural'
      | 'monotoneX'
      | 'monotoneY'
      | 'monotone'
      | 'step'
      | 'stepBefore'
      | 'stepAfter'
    /**
     * If true, the area will be hidden.
     */
    hide?: boolean
    /**
     * Configuration for the area's label.
     */
    label?: boolean | any
    /**
     * If false, dots will not be drawn.
     * @default true
     */
    dot?: boolean | any
    /**
     * The dot is shown when user enter an area chart and this chart has tooltip.
     * @default true
     */
    activeDot?: boolean | any
    /**
     * Whether to connect the area across null points.
     * @default false
     */
    connectNulls?: boolean
    /**
     * The unit of data. This option will be used in tooltip.
     */
    unit?: string | number
    /**
     * The type of icon in legend.
     * @default 'line'
     */
    legendType?:
      | 'line'
      | 'plainline'
      | 'square'
      | 'rect'
      | 'circle'
      | 'cross'
      | 'diamond'
      | 'star'
      | 'triangle'
      | 'wye'
      | 'none'
    /**
     * Event handlers for individual areas.
     * Receives (props, event) where props contains all area properties including its data.
     */
    onClick?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseDown?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseUp?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseMove?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseOver?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseOut?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseEnter?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseLeave?: (data: any, index: number, event: React.MouseEvent) => void
    /**
     * If true, the area will be animated.
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
  }>
  /**
   * Custom colors for the areas.
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
   * Tooltip configuration.
   */
  tooltip?: {
    show?: boolean
  } & React.ComponentProps<typeof Tooltip>
  /**
   * Grid configuration.
   */
  grid?: {
    show?: boolean
    strokeDasharray?: string
  }
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
   * Charts with the same syncId will synchronize Tooltip and Brush events.
   */
  syncId?: number | string
  /**
   * Customize how the charts will synchronize tooltips and brushes.
   * @default 'index'
   */
  syncMethod?: 'index' | 'value' | ((ticks: any[], data: any[]) => number)
  /**
   * ARIA role for the chart.
   */
  role?: string
  /**
   * Accessible title and description.
   */
  title?: string
  desc?: string
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
    domain?: [any, any]
    type?: 'number' | 'category'
    tickCount?: number
    interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd'
  }
  /**
   * YAxis configuration.
   */
  yAxis?: {
    show?: boolean
    name?: string
    domain?: [any, any]
    type?: 'number' | 'category'
    tickCount?: number
    interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd'
  }
  /**
   * Event handlers for the entire chart.
   */
  onClick?: (data: any, index: number, event: React.MouseEvent) => void
  onMouseDown?: (data: any, index: number, event: React.MouseEvent) => void
  onMouseUp?: (data: any, index: number, event: React.MouseEvent) => void
  onMouseMove?: (data: any, index: number, event: React.MouseEvent) => void
  onMouseEnter?: (data: any, index: number, event: React.MouseEvent) => void
  onMouseLeave?: (data: any, index: number, event: React.MouseEvent) => void
  /**
   * If true, the chart areas will be animated.
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
}
