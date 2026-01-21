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
import { useColorScheme, useTheme } from '@wso2/oxygen-ui'
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
import { BarChartProps } from './BarChart.types'

/**
 * BarChart component for Oxygen UI powered by Recharts.
 */
const BarChart = ({
  data,
  bars,
  xAxisDataKey,
  height = 300,
  width = '100%',
  legend,
  grid,
  tooltip,
  layout = 'horizontal',
  margin,
  barCategoryGap,
  barGap,
  barSize,
  maxBarSize,
  stackOffset = 'none',
  accessibilityLayer = true,
  xAxis,
  yAxis,
  isAnimationActive = true,
  animationDuration = 1500,
  animationBegin = 0,
  animationEasing = 'ease',
  colors: customColors,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}: BarChartProps): React.ReactElement => {
  const theme = useTheme()

  const { mode, systemMode } = useColorScheme()
  const isDark = mode === 'dark' || (mode === 'system' && systemMode === 'dark')

  const colors = React.useMemo(() => {
    const defaultColors = {
      primary: isDark ? '#F87643' : '#fa7b3f',
      background: isDark ? '#1e1e1e' : '#f5f5f5',
      text: isDark ? '#d4d4d4' : '#24292e',
      comment: isDark ? '#6a9955' : '#6a737d',
      keyword: isDark ? '#569cd6' : '#d73a49',
      string: isDark ? '#ce9178' : '#032f62',
      function: isDark ? '#dcdcaa' : '#6f42c1',
      number: isDark ? '#b5cea8' : '#005cc5',
      operator: isDark ? '#d4d4d4' : '#d73a49',
    }
    const themeSyntax = isDark
      ? (theme.vars as any)?.syntax?.dark
      : (theme.vars as any)?.syntax?.light

    return {
      ...defaultColors,
      ...themeSyntax,
      primary: theme.palette.primary?.main || themeSyntax?.primary || defaultColors.primary,
    }
  }, [isDark, theme.palette.primary?.main, theme.vars])

  const barColors = React.useMemo(() => {
    if (customColors && customColors.length > 0) return customColors
    return [
      colors.primary,
      colors.keyword,
      colors.string,
      colors.function,
      colors.number,
      colors.operator,
    ]
  }, [
    customColors,
    colors.primary,
    colors.keyword,
    colors.string,
    colors.function,
    colors.number,
    colors.operator,
  ])

  const legendConfig = React.useMemo(
    () => ({ show: true, align: 'center', verticalAlign: 'bottom', ...legend }) as const,
    [legend]
  )
  const gridConfig = React.useMemo(() => ({ show: true, strokeDasharray: '3 3', ...grid }), [grid])
  const marginConfig = React.useMemo(
    () => ({ top: 12, right: 24, left: 24, bottom: 40, ...margin }),
    [margin]
  )
  const xAxisConfig = React.useMemo(() => ({ show: true, ...xAxis }), [xAxis])
  const yAxisConfig = React.useMemo(() => ({ show: true, ...yAxis }), [yAxis])

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={marginConfig}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
        barSize={barSize}
        maxBarSize={maxBarSize}
        stackOffset={stackOffset}
        accessibilityLayer={accessibilityLayer}
      >
        {gridConfig?.show && (
          <CartesianGrid
            strokeDasharray={gridConfig.strokeDasharray}
            stroke={colors.text}
            vertical={false}
          />
        )}

        {xAxisConfig?.show && (
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
              xAxisConfig.name
                ? {
                    value: xAxisConfig.name,
                    position: 'insideBottom',
                    offset: -18,
                    fill: colors.text,
                    fontSize: 12,
                  }
                : undefined
            }
          />
        )}

        {yAxisConfig?.show && (
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
              yAxisConfig.name
                ? {
                    value: yAxisConfig.name,
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

        {tooltip?.show !== false &&
          (() => {
            const { contentStyle, itemStyle, labelStyle, show, ...rest } = tooltip || {}
            return (
              <Tooltip
                cursor={{
                  fill: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                }}
                {...rest}
                contentStyle={{
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.text}`,
                  borderRadius: theme.shape.borderRadius ?? 8,
                  color: colors.text,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  ...contentStyle,
                }}
                itemStyle={{
                  color: colors.text,
                  fontSize: 12,
                  ...itemStyle,
                }}
                labelStyle={{
                  color: colors.text,
                  fontWeight: 600,
                  marginBottom: 4,
                  ...labelStyle,
                }}
              />
            )
          })()}

        {legendConfig.show && (
          <Legend
            align={legendConfig.align}
            verticalAlign={legendConfig.verticalAlign}
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
            key={`${bar.dataKey}-${index}`}
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
            onClick={(bar.onClick || onClick) as any}
            onMouseEnter={(bar.onMouseEnter || onMouseEnter) as any}
            onMouseLeave={(bar.onMouseLeave || onMouseLeave) as any}
            onMouseDown={(bar.onMouseDown || onMouseDown) as any}
            onMouseUp={(bar.onMouseUp || onMouseUp) as any}
            onMouseMove={(bar.onMouseMove || onMouseMove) as any}
          />
        ))}

        {children}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

BarChart.displayName = 'BarChart'
export default BarChart
