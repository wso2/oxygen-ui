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

export interface PieChartProps {
  /**
   * Data to be displayed in the chart.
   */
  data?: any[]
  /**
   * Configuration for the pies in the chart.
   */
  pies?: Array<{
    dataKey: string
    nameKey?: string
    name?: string
    cx?: number | string
    cy?: number | string
    innerRadius?: number | string
    outerRadius?: number | string
    paddingAngle?: number
    startAngle?: number
    endAngle?: number
    cornerRadius?: number | string
    minAngle?: number
    isAnimationActive?: boolean
    animationDuration?: number
    animationBegin?: number
    animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
    label?: any
    labelLine?: any
    onClick?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseEnter?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseLeave?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseDown?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseUp?: (data: any, index: number, event: React.MouseEvent) => void
    onMouseMove?: (data: any, index: number, event: React.MouseEvent) => void
    onContextMenu?: (data: any, index: number, event: React.MouseEvent) => void
    onDoubleClick?: (data: any, index: number, event: React.MouseEvent) => void
  }>
  /**
   * Default key of each sector's name in data.
   */
  nameKey?: string
  /**
   * Height of the chart.
   * @default 300
   */
  height?: number | `${number}%`
  /**
   * Width of the chart.
   * @default '100%'
   */
  width?: number | `${number}%`
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
   * Margin around the chart.
   */
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  /**
   * Default x-coordinate of center.
   * @default '50%'
   */
  cx?: number | string
  /**
   * Default y-coordinate of center.
   * @default '50%'
   */
  cy?: number | string
  /**
   * Default angle in degrees from which the chart should start.
   * @default 0
   */
  startAngle?: number
  /**
   * Default angle, in degrees, at which the chart should end.
   * @default 360
   */
  endAngle?: number
  /**
   * Default inner radius of all the sectors.
   * @default 0
   */
  innerRadius?: number | string
  /**
   * Default outer radius of all the sectors.
   * @default '80%'
   */
  outerRadius?: number | string
  /**
   * Default padding angle between sectors.
   * @default 0
   */
  paddingAngle?: number
  /**
   * Default corner radius of all the sectors.
   * @default 0
   */
  cornerRadius?: number | string
  /**
   * Default minimum angle of each unzero data.
   * @default 0
   */
  minAngle?: number
  /**
   * If true, the chart will be animated by default.
   * @default true
   */
  isAnimationActive?: boolean
  /**
   * Default duration of the animation in ms.
   * @default 1500
   */
  animationDuration?: number
  /**
   * Default delay before the animation begins in ms.
   * @default 0
   */
  animationBegin?: number
  /**
   * Default easing function for the animation.
   * @default 'ease'
   */
  animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  /**
   * Custom colors for the sectors.
   */
  colors?: string[]
  /**
   * Default labels for each pie sector.
   */
  label?: any
  /**
   * Default label lines.
   */
  labelLine?: any
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
  /**
   * Default context menu event handler.
   */
  onContextMenu?: (data: any, index: number, event: React.MouseEvent) => void
  /**
   * Default double click event handler.
   */
  onDoubleClick?: (data: any, index: number, event: React.MouseEvent) => void
  /**
   * Optional children for composition.
   */
  children?: React.ReactNode
}
