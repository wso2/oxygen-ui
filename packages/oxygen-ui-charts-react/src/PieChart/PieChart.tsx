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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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

/**
 * PieChart component for Oxygen UI powered by Recharts.
 */
const PieChart = ({
  data,
  pies,
  nameKey,
  height = 300,
  width = '100%',
  legend = { show: true, align: 'center', verticalAlign: 'bottom' },
  margin = { top: 12, right: 24, left: 24, bottom: 40 },
  cx = '50%',
  cy = '50%',
  startAngle = 0,
  endAngle = 360,
  innerRadius = 0,
  outerRadius = '80%',
  paddingAngle = 0,
  cornerRadius = 0,
  minAngle = 0,
  isAnimationActive = true,
  animationDuration = 1500,
  animationBegin = 0,
  animationEasing = 'ease',
  colors: customColors,
  label,
  labelLine,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onContextMenu,
  onDoubleClick,
  children,
}: PieChartProps): React.ReactElement => {
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

  const syntaxColors =
    (isDark ? (theme.vars as any)?.syntax?.dark : (theme.vars as any)?.syntax?.light) ||
    defaultColors

  const chartColors = React.useMemo(() => {
    if (customColors) return customColors
    return [
      theme.palette.primary?.main,
      syntaxColors.keyword,
      syntaxColors.string,
      syntaxColors.function,
      syntaxColors.number,
      syntaxColors.operator,
    ]
  }, [theme, syntaxColors, customColors])

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsPieChart data={data} margin={margin}>
        {pies?.map((pie, index) => (
          <Pie
            key={pie.dataKey}
            data={data}
            dataKey={pie.dataKey as any}
            nameKey={pie.nameKey || nameKey}
            name={pie.name}
            cx={pie.cx || cx}
            cy={pie.cy || cy}
            startAngle={pie.startAngle ?? startAngle}
            endAngle={pie.endAngle ?? endAngle}
            innerRadius={pie.innerRadius || innerRadius}
            outerRadius={pie.outerRadius || outerRadius}
            paddingAngle={pie.paddingAngle ?? paddingAngle}
            cornerRadius={pie.cornerRadius ?? cornerRadius}
            minAngle={pie.minAngle ?? minAngle}
            isAnimationActive={pie.isAnimationActive ?? isAnimationActive}
            animationDuration={pie.animationDuration ?? animationDuration}
            animationBegin={pie.animationBegin ?? animationBegin}
            animationEasing={pie.animationEasing ?? animationEasing}
            label={pie.label ?? label}
            labelLine={pie.labelLine ?? labelLine}
            onClick={pie.onClick || onClick}
            onMouseEnter={pie.onMouseEnter || onMouseEnter}
            onMouseLeave={pie.onMouseLeave || onMouseLeave}
            onMouseDown={pie.onMouseDown || onMouseDown}
            onMouseUp={pie.onMouseUp || onMouseUp}
            onMouseMove={pie.onMouseMove || onMouseMove}
            onContextMenu={pie.onContextMenu || onContextMenu}
            onDoubleClick={pie.onDoubleClick || onDoubleClick}
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
        ))}

        {/* Only render default Tooltip if no children are provided */}
        {!children && (
          <Tooltip
            contentStyle={{
              backgroundColor: syntaxColors.background,
              border: `1px solid ${syntaxColors.text}`,
              borderRadius: theme.shape.borderRadius || 8,
              color: syntaxColors.text,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            itemStyle={{
              color: syntaxColors.text,
              fontSize: 12,
            }}
            labelStyle={{
              color: syntaxColors.text,
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
                  color: syntaxColors.text,
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

        {children}
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

PieChart.displayName = 'PieChart'
export default PieChart
