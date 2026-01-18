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

export interface RadarChartProps {
  /**
   * Data to be displayed in the chart.
   */
  data?: any[]
  /**
   * Configuration for the radars in the chart.
   */
  radars?: Array<{
    dataKey: string
    name?: string
    stroke?: string
    strokeWidth?: number
    strokeDasharray?: string | number
    fill?: string
    fillOpacity?: number
    /**
     * If true, the radar will be hidden.
     */
    hide?: boolean
    /**
     * Configuration for the radar's label.
     */
    label?: boolean | any
    /**
     * If false, dots will not be drawn.
     * @default true
     */
    dot?: boolean | any
    /**
     * The dot is shown when user enter a radar chart and this chart has tooltip.
     * @default true
     */
    activeDot?: boolean | any
    /**
     * Whether to connect the radar across null points.
     * @default false
     */
    connectNulls?: boolean
    /**
     * The type of icon in legend.
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
     * The type of tooltip.
     */
    tooltipType?: 'none'
    /**
     * Event handlers for individual radars.
     */
    onMouseEnter?: (props: any, e: React.MouseEvent) => void
    onMouseLeave?: (props: any, e: React.MouseEvent) => void
    onClick?: (props: any, e: React.MouseEvent) => void
    /**
     * If true, the radar will be animated.
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
   * Custom colors for the radars.
   */
  colors?: string[]
  /**
   * Configuration for radial bars in the chart.
   */
  radialBars?: Array<{
    dataKey: string
    name?: string
    fill?: string
    background?: boolean | any
    cornerRadius?: number | string
    minPointSize?: number
    maxBarSize?: number
    hide?: boolean
    label?: boolean | any
    stackId?: string | number
    isAnimationActive?: boolean
    animationDuration?: number
    animationBegin?: number
    animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
    onClick?: (props: any, e: React.MouseEvent) => void
    onMouseEnter?: (props: any, e: React.MouseEvent) => void
    onMouseLeave?: (props: any, e: React.MouseEvent) => void
  }>
  /**
   * The key of each sector's label in data.
   */
  angleKey?: string
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
    layout?: 'horizontal' | 'vertical'
    iconType?:
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
  }
  /**
   * Tooltip configuration.
   */
  tooltip?: {
    show?: boolean
  } & React.ComponentProps<typeof Tooltip>
  /**
   * Inner radius of the chart.
   * @default 0
   */
  innerRadius?: number | string
  /**
   * Outer radius of the chart.
   * @default '80%'
   */
  outerRadius?: number | string
  /**
   * The x-coordinate of center.
   * @default '50%'
   */
  cx?: number | string
  /**
   * The y-coordinate of center.
   * @default '50%'
   */
  cy?: number | string
  /**
   * Angle in degrees from which the chart should start.
   * @default 90
   */
  startAngle?: number
  /**
   * Angle, in degrees, at which the chart should end.
   * @default -270
   */
  endAngle?: number
  /**
   * Margin around the chart.
   */
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  /**
   * Grid configuration.
   */
  polarGrid?: {
    show?: boolean
    gridType?: 'polygon' | 'circle'
    radialLines?: boolean
    polarAngles?: number[]
    polarRadius?: number[]
  }
  /**
   * Angle axis configuration.
   */
  polarAngleAxis?: {
    show?: boolean
    dataKey?: string
    tick?: boolean | any
    axisLine?: boolean | any
    axisLineType?: 'polygon' | 'circle'
    orientation?: 'inner' | 'outer'
    ticks?: Array<{ value: any; coordinate: number }>
  }
  /**
   * Radius axis configuration.
   */
  polarRadiusAxis?: {
    show?: boolean
    angle?: number
    domain?: [any, any]
    tick?: boolean | any
    axisLine?: boolean | any
    orientation?: 'left' | 'right' | 'middle'
    reversed?: boolean
    ticks?: Array<{ value: any; coordinate: number }>
  }
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
  id?: string
  className?: string
  style?: React.CSSProperties
  tabIndex?: number
  /**
   * The layout of chart defines the orientation of axes, graphical items, and tooltip.
   * @default 'centric'
   */
  layout?: 'centric' | 'radial'
  /**
   * Determines how values are stacked.
   * @default 'none'
   */
  stackOffset?: 'expand' | 'none' | 'wiggle' | 'silhouette' | 'sign' | 'positive'
  /**
   * If false, the stack will be ordered from bottom to top.
   * @default false
   */
  reverseStackOrder?: boolean
  /**
   * Fixed bar size for radial bars.
   */
  barSize?: number | string
  /**
   * Gap between two bar categories.
   */
  barCategoryGap?: number | string
  /**
   * Gap between two bars in the same category.
   */
  barGap?: number | string
  /**
   * Maximum bar size.
   */
  maxBarSize?: number
  /**
   * Event handlers for the entire chart.
   */
  onClick?: (data: any, event: React.MouseEvent) => void
  onMouseDown?: (data: any, event: React.MouseEvent) => void
  onMouseUp?: (data: any, event: React.MouseEvent) => void
  onMouseMove?: (data: any, event: React.MouseEvent) => void
  onMouseEnter?: (data: any, event: React.MouseEvent) => void
  onMouseLeave?: (data: any, event: React.MouseEvent) => void
  onContextMenu?: (data: any, event: React.MouseEvent) => void
  onDoubleClick?: (data: any, event: React.MouseEvent) => void
  /**
   * If true, an accessibility layer will be added to the chart.
   * @default true
   */
  accessibilityLayer?: boolean
  /**
   * Optional children for composition.
   */
  children?: React.ReactNode
}