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
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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

/**
 * RadialBarChart component for Oxygen UI powered by Recharts.
 */
const RadialBarChart = ({
  data,
  radialBars,
  height = 300,
  width = '100%',
  legend = { show: true, align: 'center', verticalAlign: 'bottom' },
  innerRadius = 0,
  outerRadius = '80%',
  cx = '50%',
  cy = '50%',
  startAngle = 0,
  endAngle = 360,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  barSize,
  barCategoryGap,
  barGap,
  maxBarSize,
  polarGrid = { show: false },
  polarAngleAxis = { show: false },
  polarRadiusAxis = { show: false },
  syncId,
  syncMethod,
  role,
  title,
  desc,
  id,
  className,
  style,
  tabIndex,
  stackOffset,
  reverseStackOrder,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onContextMenu,
  onDoubleClick,
  accessibilityLayer = true,
  children,
}: RadialBarChartProps): React.ReactElement => {
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
      <RechartsRadialBarChart
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        margin={margin}
        barSize={barSize}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
        maxBarSize={maxBarSize}
        syncId={syncId}
        syncMethod={syncMethod}
        role={role}
        title={title}
        desc={desc}
        id={id}
        className={className}
        style={style}
        tabIndex={tabIndex}
        stackOffset={stackOffset}
        reverseStackOrder={reverseStackOrder}
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
        {polarGrid?.show && (
          <PolarGrid
            gridType={polarGrid.gridType}
            radialLines={polarGrid.radialLines}
            polarAngles={polarGrid.polarAngles}
            polarRadius={polarGrid.polarRadius}
            stroke={colors.comment}
            strokeOpacity={0.3}
          />
        )}

        {polarAngleAxis?.show && (
          <PolarAngleAxis
            dataKey={polarAngleAxis.dataKey}
            tick={polarAngleAxis.tick ?? { fill: colors.text, fontSize: 12 }}
            axisLine={polarAngleAxis.axisLine ?? { stroke: colors.comment, strokeOpacity: 0.3 }}
            axisLineType={polarAngleAxis.axisLineType}
            orientation={polarAngleAxis.orientation}
            ticks={polarAngleAxis.ticks}
          />
        )}

        {polarRadiusAxis?.show && (
          <PolarRadiusAxis
            angle={polarRadiusAxis.angle}
            domain={polarRadiusAxis.domain}
            tick={polarRadiusAxis.tick ?? { fill: colors.text, fontSize: 10 }}
            axisLine={polarRadiusAxis.axisLine ?? { stroke: colors.comment, strokeOpacity: 0.3 }}
            orientation={polarRadiusAxis.orientation}
            reversed={polarRadiusAxis.reversed}
            ticks={polarRadiusAxis.ticks}
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
            layout={legend.layout}
            iconType={legend.iconType || 'circle'}
            formatter={(value: any) => (
              <span style={{ color: colors.text, fontSize: 13, fontWeight: 500 }}>{value}</span>
            )}
            wrapperStyle={{ paddingTop: 20 }}
          />
        )}

        {radialBars?.map((bar, index) => (
          <RadialBar
            key={bar.dataKey}
            name={bar.name}
            dataKey={bar.dataKey}
            fill={bar.fill || barColors[index % barColors.length]}
            background={bar.background ?? { fill: colors.comment, opacity: 0.1 }}
            cornerRadius={bar.cornerRadius}
            minPointSize={bar.minPointSize}
            maxBarSize={bar.maxBarSize}
            hide={bar.hide}
            label={bar.label}
            stackId={bar.stackId}
            legendType={bar.legendType}
            tooltipType={bar.tooltipType}
            isAnimationActive={bar.isAnimationActive}
            animationDuration={bar.animationDuration}
            animationBegin={bar.animationBegin}
            animationEasing={bar.animationEasing}
            onClick={bar.onClick}
            onMouseDown={bar.onMouseDown}
            onMouseUp={bar.onMouseUp}
            onMouseMove={bar.onMouseMove}
            onMouseOver={bar.onMouseOver}
            onMouseOut={bar.onMouseOut}
            onMouseEnter={bar.onMouseEnter}
            onMouseLeave={bar.onMouseLeave}
            onAnimationStart={bar.onAnimationStart}
            onAnimationEnd={bar.onAnimationEnd}
          />
        ))}

        {children}
      </RechartsRadialBarChart>
    </ResponsiveContainer>
  )
}

RadialBarChart.displayName = 'RadialBarChart'
export default RadialBarChart
