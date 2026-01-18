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
import { useColorScheme } from '../../../hooks/useColorScheme'
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
import { RadarChartProps } from './RadarChart.types'

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
  tooltip,
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

  const isDark = useColorScheme(theme.palette.mode)

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

        {tooltip?.show !== false &&
          (() => {
            const { contentStyle, itemStyle, labelStyle, show, ...rest } = tooltip || {}
            return (
              <Tooltip
                {...rest}
                contentStyle={{
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.text}`,
                  borderRadius: theme.shape.borderRadius || 8,
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
