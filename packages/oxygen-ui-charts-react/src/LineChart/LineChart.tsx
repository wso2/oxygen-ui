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
import { useTheme } from '@mui/material'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export interface LineChartProps {
  /**
   * Data to be displayed in the chart.
   */
  data?: any[]
  /**
   * Configuration for the lines in the chart.
   */
  lines?: Array<{
    dataKey: string
    name?: string
    stroke?: string
    strokeWidth?: number
    strokeDasharray?: string | number
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
     * If true, the line will be hidden.
     */
    hide?: boolean
    /**
     * Configuration for the line's label.
     */
    label?: boolean | any
    /**
     * If false, dots will not be drawn.
     * @default true
     */
    dot?: boolean | any
    /**
     * The dot is shown when user enter a line chart and this chart has tooltip.
     * @default true
     */
    activeDot?: boolean | any
    /**
     * Whether to connect the line across null points.
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
     * Z-index of the line.
     */
    zIndex?: number
    /**
     * Event handlers for individual lines.
     * Receives (props, event) where props contains all line properties including its data.
     */
    onClick?: (props: any, event: React.MouseEvent) => void
    onMouseDown?: (props: any, event: React.MouseEvent) => void
    onMouseUp?: (props: any, event: React.MouseEvent) => void
    onMouseMove?: (props: any, event: React.MouseEvent) => void
    onMouseOver?: (props: any, event: React.MouseEvent) => void
    onMouseOut?: (props: any, event: React.MouseEvent) => void
    onMouseEnter?: (props: any, event: React.MouseEvent) => void
    onMouseLeave?: (props: any, event: React.MouseEvent) => void
    /**
     * If true, the line will be animated.
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
   * The key of each sector's label in data.
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
  onClick?: (data: any, event: React.MouseEvent) => void
  onMouseDown?: (data: any, event: React.MouseEvent) => void
  onMouseUp?: (data: any, event: React.MouseEvent) => void
  onMouseMove?: (data: any, event: React.MouseEvent) => void
  onMouseEnter?: (data: any, event: React.MouseEvent) => void
  onMouseLeave?: (data: any, event: React.MouseEvent) => void
  /**
   * If true, the chart lines will be animated.
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

/**
 * LineChart component for Oxygen UI powered by Recharts.
 */
const LineChart = ({
  data,
  lines,
  xAxisDataKey,
  height = 300,
  width = '100%',
  legend = { show: true, align: 'center', verticalAlign: 'bottom' },
  grid = { show: true, strokeDasharray: '3 3' },
  layout = 'horizontal',
  margin = { top: 12, right: 24, left: 24, bottom: 40 },
  syncId,
  syncMethod,
  role,
  title,
  desc,
  accessibilityLayer = true,
  xAxis = { show: true },
  yAxis = { show: true },
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  isAnimationActive = true,
  animationDuration = 1500,
  animationBegin = 0,
  animationEasing = 'ease',
  children,
}: LineChartProps): React.ReactElement => {
  const theme = useTheme()

  // Check color scheme from DOM attribute (set by MUI's extendTheme)
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const checkColorScheme = () => {
      const htmlElement = document.documentElement
      const colorScheme = htmlElement.getAttribute('data-color-scheme')
      setIsDark(colorScheme === 'dark' || theme.palette.mode === 'dark')
    }

    checkColorScheme()

    // Watch for changes to the color scheme attribute
    const observer = new MutationObserver(checkColorScheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-scheme'],
    })

    return () => observer.disconnect()
  }, [theme.palette.mode])

  const defaultColors = {
    background: isDark ? '#1e1e1e' : '#f5f5f5',
    text: isDark ? '#d4d4d4' : '#24292e',
    comment: isDark ? '#6a9955' : '#6a737d',
    keyword: isDark ? '#569cd6' : '#d73a49',
    string: isDark ? '#ce9178' : '#032f62',
    function: isDark ? '#dcdcaa' : '#6f42c1',
    number: isDark ? '#b5cea8' : '#005cc5',
    operator: isDark ? '#d4d4d4' : '#d73a49',
  }

  const colors =
    (isDark ? (theme.vars as any)?.syntax?.dark : (theme.vars as any)?.syntax?.light) ||
    defaultColors

  const lineColors = React.useMemo(() => {
    return [
      theme.palette.primary?.main,
      colors.keyword,
      colors.string,
      colors.function,
      colors.number,
      colors.operator,
    ]
  }, [theme, colors])

