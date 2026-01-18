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
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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

/**
 * RadarChart component for Oxygen UI powered by Recharts.
 */
const RadarChart = ({
  data,
  radars,
  radialBars,
  angleKey,
  height = 300,
  width = '100%',
  legend,
  innerRadius = 0,
  outerRadius = '80%',
  cx = '50%',
  cy = '50%',
  startAngle = 90,
  endAngle = -270,
  margin,
  polarGrid,
  polarAngleAxis,
  polarRadiusAxis,
  syncId,
  syncMethod,
  role,
  title,
  desc,
  id,
  className,
  style,
  tabIndex,
  layout = 'centric',
  stackOffset,
  reverseStackOrder,
  barSize,
  barCategoryGap,
  barGap,
  maxBarSize,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onContextMenu,
  onDoubleClick,
  accessibilityLayer = true,
  colors: customColors,
  children,
}: RadarChartProps): React.ReactElement => {
  const theme = useTheme()

  // Check color scheme from DOM attribute (set by MUI's extendTheme)
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof document === 'undefined') return false
    const htmlElement = document.documentElement
    const colorScheme = htmlElement.getAttribute('data-color-scheme')
    return colorScheme === 'dark' || theme.palette.mode === 'dark'
  })

  React.useEffect(() => {
    const checkColorScheme = () => {
      const htmlElement = document.documentElement
      const colorScheme = htmlElement.getAttribute('data-color-scheme')
      setIsDark(colorScheme === 'dark' || theme.palette.mode === 'dark')
    }

    checkColorScheme()

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

  const radarColors = React.useMemo(() => {
    if (customColors && customColors.length > 0) return customColors
    return [
      theme.palette.primary?.main,
      colors.keyword,
      colors.string,
      colors.function,
      colors.number,
      colors.operator,
    ]
  }, [theme, colors, customColors])

  const legendConfig = { show: true, align: 'center', verticalAlign: 'bottom', ...legend } as const
  const marginConfig = { top: 20, right: 20, bottom: 20, left: 20, ...margin }
  const polarGridConfig = { show: true, gridType: 'polygon', ...polarGrid } as const
  const polarAngleAxisConfig = { show: true, ...polarAngleAxis }
  const polarRadiusAxisConfig = { show: false, ...polarRadiusAxis }

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsRadarChart
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        margin={marginConfig}
        syncId={syncId}
        syncMethod={syncMethod}
        role={role}
        title={title}
        desc={desc}
        id={id}
        className={className}
        style={style}
        tabIndex={tabIndex}
        layout={layout}
        stackOffset={stackOffset}
        reverseStackOrder={reverseStackOrder}
        barSize={barSize}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
        maxBarSize={maxBarSize}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
        accessibilityLayer={accessibilityLayer}
      >
        {polarGridConfig?.show && (
          <PolarGrid
            gridType={polarGridConfig.gridType}
            radialLines={polarGridConfig.radialLines}
            polarAngles={polarGridConfig.polarAngles}
            polarRadius={polarGridConfig.polarRadius}
            stroke={colors.comment}
            strokeOpacity={0.3}
          />
        )}

        {polarAngleAxisConfig?.show && (
          <PolarAngleAxis
            dataKey={polarAngleAxisConfig.dataKey || angleKey}
            tick={polarAngleAxisConfig.tick ?? { fill: colors.text, fontSize: 12 }}
            axisLine={
              polarAngleAxisConfig.axisLine ?? { stroke: colors.comment, strokeOpacity: 0.3 }
            }
            axisLineType={polarAngleAxisConfig.axisLineType}
            orientation={polarAngleAxisConfig.orientation}
            ticks={polarAngleAxisConfig.ticks}
          />
        )}

        {polarRadiusAxisConfig?.show && (
          <PolarRadiusAxis
            angle={polarRadiusAxisConfig.angle}
            domain={polarRadiusAxisConfig.domain}
            tick={polarRadiusAxisConfig.tick ?? { fill: colors.text, fontSize: 10 }}
            axisLine={
              polarRadiusAxisConfig.axisLine ?? { stroke: colors.comment, strokeOpacity: 0.3 }
            }
            orientation={polarRadiusAxisConfig.orientation}
            reversed={polarRadiusAxisConfig.reversed}
            ticks={polarRadiusAxisConfig.ticks}
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

        {legendConfig.show && (
          <Legend
            align={legendConfig.align}
            verticalAlign={legendConfig.verticalAlign}
            layout={legendConfig.layout}
            iconType={legendConfig.iconType || 'circle'}
            formatter={(value: any) => (
              <span style={{ color: colors.text, fontSize: 13, fontWeight: 500 }}>{value}</span>
            )}
            wrapperStyle={{ paddingTop: 20 }}
          />
        )}

        {radars?.map((radar, index) => (
          <Radar
            key={radar.dataKey}
            name={radar.name}
            dataKey={radar.dataKey}
            stroke={radar.stroke || radarColors[index % radarColors.length]}
            strokeWidth={radar.strokeWidth ?? 2}
            strokeDasharray={radar.strokeDasharray}
            fill={radar.fill || radarColors[index % radarColors.length]}
            fillOpacity={radar.fillOpacity ?? 0.6}
            hide={radar.hide}
            label={radar.label}
            dot={radar.dot ?? true}
            activeDot={radar.activeDot ?? true}
            connectNulls={radar.connectNulls}
            legendType={radar.legendType}
            tooltipType={radar.tooltipType}
            onMouseEnter={radar.onMouseEnter as any}
            onMouseLeave={radar.onMouseLeave as any}
            onClick={radar.onClick as any}
            isAnimationActive={radar.isAnimationActive}
            animationDuration={radar.animationDuration}
            animationBegin={radar.animationBegin}
            animationEasing={radar.animationEasing}
          />
        ))}

        {radialBars?.map((bar, index) => (
          <RadialBar
            key={bar.dataKey}
            name={bar.name}
            dataKey={bar.dataKey}
            fill={bar.fill || radarColors[index % radarColors.length]}
            background={bar.background}
            cornerRadius={bar.cornerRadius}
            minPointSize={bar.minPointSize}
            maxBarSize={bar.maxBarSize}
            hide={bar.hide}
            label={bar.label}
            stackId={bar.stackId}
            isAnimationActive={bar.isAnimationActive}
            animationDuration={bar.animationDuration}
            animationBegin={bar.animationBegin}
            animationEasing={bar.animationEasing}
            onClick={bar.onClick as any}
            onMouseEnter={bar.onMouseEnter as any}
            onMouseLeave={bar.onMouseLeave as any}
          />
        ))}

        {children}
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}

RadarChart.displayName = 'RadarChart'
export default RadarChart
