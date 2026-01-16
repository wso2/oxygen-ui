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
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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

/**
 * BarChart component for Oxygen UI powered by Recharts.
 */
const BarChart = ({
  data,
  bars,
  xAxisDataKey,
  height = 300,
  width = '100%',
  legend = { show: true, align: 'center', verticalAlign: 'bottom' },
  grid = { show: true, strokeDasharray: '3 3' },
  layout = 'horizontal',
  margin = { top: 12, right: 24, left: 24, bottom: 40 },
  barCategoryGap,
  barGap,
  barSize,
  maxBarSize,
  stackOffset = 'none',
  accessibilityLayer = true,
  xAxis = { show: true },
  yAxis = { show: true },
  isAnimationActive = true,
  animationDuration = 1500,
  animationBegin = 0,
  animationEasing = 'ease',
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}: BarChartProps): React.ReactElement => {
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

  const barColors = React.useMemo(() => {
    // Use specific colors from theme if available, otherwise fallbacks from syntax colors
    return [
      theme.palette.primary?.main,
      colors.keyword,
      colors.string,
      colors.function,
      colors.number,
      colors.operator,
    ]
  }, [theme, colors])

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={margin}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
        barSize={barSize}
        maxBarSize={maxBarSize}
        stackOffset={stackOffset}
        accessibilityLayer={accessibilityLayer}
      >
        {grid?.show && (
          <CartesianGrid
            strokeDasharray={grid.strokeDasharray}
            stroke={colors.text}
            vertical={false}
          />
        )}

        {xAxis?.show && (
          <XAxis
            type={layout === 'vertical' ? 'number' : 'category'}
            dataKey={layout === 'vertical' ? undefined : xAxisDataKey}
            stroke={colors.text}
            tick={{
              fill: colors.text,
              fontSize: 12,
            }}
            tickMargin={8}
            axisLine={{ stroke: colors.text }}
            tickLine={{ stroke: colors.text }}
            label={
              xAxis.name
                ? {
                    value: xAxis.name,
                    position: 'insideBottom',
                    offset: -18,
                    fill: colors.text,
                    fontSize: 12,
                  }
                : undefined
            }
          />
        )}

        {yAxis?.show && (
          <YAxis
            type={layout === 'vertical' ? 'category' : 'number'}
            dataKey={layout === 'vertical' ? xAxisDataKey : undefined}
            stroke={colors.text}
            tick={{
              fill: colors.text,
              fontSize: 12,
            }}
            tickMargin={8}
            axisLine={{ stroke: colors.text }}
            tickLine={{ stroke: colors.text }}
            label={
              yAxis.name
                ? {
                    value: yAxis.name,
                    angle: -90,
                    position: 'insideLeft',
                    offset: 0,
                    fill: colors.text,
                    fontSize: 12,
                  }
                : undefined
            }
          />
        )}

        {/* Only render default Tooltip if no children are provided, to avoid duplicates if user passes their own */}
        {!children && (
          <Tooltip
            cursor={{
              fill: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            }}
            contentStyle={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.text}`,
              borderRadius: theme.shape.borderRadius || 8,
              color: colors.text,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            itemStyle={{
              color: colors.text,
              fontSize: 12,
            }}
            labelStyle={{
              color: colors.text,
              fontWeight: 600,
              marginBottom: 4,
            }}
          />
        )}

        {legend.show && (
          <Legend
            align={legend.align}
            verticalAlign={legend.verticalAlign}
            iconType="circle"
            formatter={(value: any) => (
              <span
                style={{
                  color: colors.text,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {value}
              </span>
            )}
            wrapperStyle={{ paddingTop: 32 }}
          />
        )}

        {bars?.map((bar, index) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.fill || barColors[index % barColors.length]}
            radius={bar.radius ?? [4, 4, 0, 0]}
            stackId={bar.stackId}
            hide={bar.hide}
            label={bar.label}
            isAnimationActive={bar.isAnimationActive ?? isAnimationActive}
            animationDuration={bar.animationDuration ?? animationDuration}
            animationBegin={bar.animationBegin ?? animationBegin}
            animationEasing={bar.animationEasing ?? animationEasing}
            onClick={bar.onClick || onClick}
            onMouseEnter={bar.onMouseEnter || onMouseEnter}
            onMouseLeave={bar.onMouseLeave || onMouseLeave}
            onMouseDown={bar.onMouseDown || onMouseDown}
            onMouseUp={bar.onMouseUp || onMouseUp}
            onMouseMove={bar.onMouseMove || onMouseMove}
          />
        ))}

        {children}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

BarChart.displayName = 'BarChart'
export default BarChart
