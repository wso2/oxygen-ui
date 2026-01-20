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
import { useTheme } from '@mui/material/styles'
import { useColorScheme } from '@wso2/oxygen-ui'
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
import { LineChartProps } from './LineChart.types'

/**
 * LineChart component for Oxygen UI powered by Recharts.
 */
const LineChart = ({
  data,
  lines,
  xAxisDataKey,
  height = 300,
  width = '100%',
  legend,
  grid,
  tooltip,
  layout = 'horizontal',
  margin,
  syncId,
  syncMethod,
  role,
  title,
  desc,
  accessibilityLayer = true,
  xAxis,
  yAxis,
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
  colors: customColors,
  children,
}: LineChartProps): React.ReactElement => {
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

  const lineColors = React.useMemo(() => {
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
      <RechartsLineChart
        data={data}
        layout={layout}
        margin={marginConfig}
        syncId={syncId}
        syncMethod={syncMethod}
        role={role}
        title={title}
        desc={desc}
        accessibilityLayer={accessibilityLayer}
        onClick={onClick as any}
        onMouseDown={onMouseDown as any}
        onMouseUp={onMouseUp as any}
        onMouseMove={onMouseMove as any}
        onMouseEnter={onMouseEnter as any}
        onMouseLeave={onMouseLeave as any}
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
            type={xAxisConfig.type || (layout === 'vertical' ? 'number' : 'category')}
            dataKey={layout === 'vertical' ? undefined : xAxisDataKey}
            stroke={colors.text}
            domain={xAxisConfig.domain}
            tickCount={xAxisConfig.tickCount}
            interval={xAxisConfig.interval}
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
            type={yAxisConfig.type || (layout === 'vertical' ? 'category' : 'number')}
            dataKey={layout === 'vertical' ? xAxisDataKey : undefined}
            stroke={colors.text}
            domain={yAxisConfig.domain}
            tickCount={yAxisConfig.tickCount}
            interval={yAxisConfig.interval}
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

        {lines?.map((line, index) => (
          <Line
            key={`${line.dataKey}-${index}`}
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.stroke || lineColors[index % lineColors.length]}
            strokeWidth={line.strokeWidth ?? 2}
            strokeDasharray={line.strokeDasharray}
            type={line.type || 'monotone'}
            hide={line.hide}
            label={line.label}
            dot={line.dot ?? true}
            activeDot={line.activeDot ?? true}
            connectNulls={line.connectNulls}
            unit={line.unit}
            legendType={line.legendType || 'line'}
            onClick={line.onClick as any}
            onMouseDown={line.onMouseDown as any}
            onMouseUp={line.onMouseUp as any}
            onMouseMove={line.onMouseMove as any}
            onMouseOver={line.onMouseOver as any}
            onMouseOut={line.onMouseOut as any}
            onMouseEnter={line.onMouseEnter as any}
            onMouseLeave={line.onMouseLeave as any}
            isAnimationActive={line.isAnimationActive ?? isAnimationActive}
            animationDuration={line.animationDuration ?? animationDuration}
            animationBegin={line.animationBegin ?? animationBegin}
            animationEasing={line.animationEasing ?? animationEasing}
          />
        ))}

        {children}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

LineChart.displayName = 'LineChart'
export default LineChart
