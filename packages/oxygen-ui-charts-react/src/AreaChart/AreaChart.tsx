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
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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

/**
 * AreaChart component for Oxygen UI powered by Recharts.
 */
const AreaChart = ({
  data,
  areas,
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
}: AreaChartProps): React.ReactElement => {
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

  const areaColors = React.useMemo(() => {
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
      <RechartsAreaChart
        data={data}
        layout={layout}
        margin={margin}
        syncId={syncId}
        syncMethod={syncMethod}
        role={role}
        title={title}
        desc={desc}
        accessibilityLayer={accessibilityLayer}
      >
        <defs>
          {areas?.map((area, index) => {
            const color = area.fill || area.stroke || areaColors[index % areaColors.length]
            return (
              <linearGradient
                key={`gradient-${area.dataKey}`}
                id={`gradient-${area.dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={area.fillOpacity ?? 0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            )
          })}
        </defs>

        {grid?.show && (
          <CartesianGrid
            strokeDasharray={grid.strokeDasharray}
            stroke={colors.text}
            vertical={false}
          />
        )}

        {xAxis?.show && (
          <XAxis
            type={xAxis.type || (layout === 'vertical' ? 'number' : 'category')}
            dataKey={layout === 'vertical' ? undefined : xAxisDataKey}
            stroke={colors.text}
            domain={xAxis.domain}
            tickCount={xAxis.tickCount}
            interval={xAxis.interval}
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
            type={yAxis.type || (layout === 'vertical' ? 'category' : 'number')}
            dataKey={layout === 'vertical' ? xAxisDataKey : undefined}
            stroke={colors.text}
            domain={yAxis.domain}
            tickCount={yAxis.tickCount}
            interval={yAxis.interval}
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

        {!children && (
          <Tooltip
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

        {areas?.map((area, index) => (
          <Area
            key={area.dataKey}
            dataKey={area.dataKey}
            name={area.name}
            stroke={area.stroke || areaColors[index % areaColors.length]}
            fill={`url(#gradient-${area.dataKey})`}
            strokeWidth={area.strokeWidth ?? 2}
            strokeDasharray={area.strokeDasharray}
            type={area.type || 'monotone'}
            stackId={area.stackId}
            hide={area.hide}
            label={area.label}
            dot={area.dot ?? false}
            activeDot={area.activeDot ?? true}
            connectNulls={area.connectNulls}
            unit={area.unit}
            legendType={area.legendType || 'line'}
            onClick={(area.onClick || onClick) as any}
            onMouseDown={(area.onMouseDown || onMouseDown) as any}
            onMouseUp={(area.onMouseUp || onMouseUp) as any}
            onMouseMove={(area.onMouseMove || onMouseMove) as any}
            onMouseOver={area.onMouseOver as any}
            onMouseOut={area.onMouseOut as any}
            onMouseEnter={(area.onMouseEnter || onMouseEnter) as any}
            onMouseLeave={(area.onMouseLeave || onMouseLeave) as any}
            isAnimationActive={area.isAnimationActive ?? isAnimationActive}
            animationDuration={area.animationDuration ?? animationDuration}
            animationBegin={area.animationBegin ?? animationBegin}
            animationEasing={area.animationEasing ?? animationEasing}
          />
        ))}

        {children}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

AreaChart.displayName = 'AreaChart'
export default AreaChart
