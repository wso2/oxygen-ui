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

import { Tooltip } from "recharts"

export interface RadialBarChartProps {
  /**
   * Data to be displayed in the chart.
   */
  data?: any[]
  /**
   * Configuration for the radial bars in the chart.
   */
  radialBars?: Array<{
    dataKey: string
    name?: string
    fill?: string
    background?: boolean | any
    cornerRadius?: number | string
    minPointSize?: number
    maxBarSize?: number
    /**
     * If true, the radial bar will be hidden.
     */
    hide?: boolean
    /**
     * Configuration for the radial bar's label.
     */
    label?: boolean | any
    /**
     * The ID of stack.
     */
    stackId?: string | number
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
     * If true, the radial bar will be animated.
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
     * Event handlers for individual radial bars.
     */
    onClick?: (props: any, index: number, e: React.MouseEvent) => void
    onMouseDown?: (props: any, index: number, e: React.MouseEvent) => void
    onMouseUp?: (props: any, index: number, e: React.MouseEvent) => void
    onMouseMove?: (props: any, index: number, e: React.MouseEvent) => void
    onMouseOver?: (props: any, index: number, e: React.MouseEvent) => void
    onMouseOut?: (props: any, index: number, e: React.MouseEvent) => void
    onMouseEnter?: (props: any, index: number, e: React.MouseEvent) => void
    onMouseLeave?: (props: any, index: number, e: React.MouseEvent) => void
    onAnimationStart?: () => void
    onAnimationEnd?: () => void
  }>
  /**
   * Custom colors for the radial bars.
   */
  colors?: string[]
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
   * @default 0
   */
  startAngle?: number
  /**
   * Angle, in degrees, at which the chart should end.
   * @default 360
   */
  endAngle?: number
  /**
   * Margin around the chart.
   */
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  /**
   * Fixed bar size.
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
