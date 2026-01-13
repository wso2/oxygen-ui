/*
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { Card, CardContent, Box, Typography, CardProps } from '@mui/material';

/**
 * Props for the StatCard component
 */
export interface StatCardProps extends CardProps {
  /**
   * The main value to display
   */
  value: string | number;
  /**
   * The label/title for the stat
   */
  label: string;
  /**
   * Optional icon element to display
   */
  icon?: React.ReactNode;
  /**
   * Optional color for the icon
   */
  iconColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

/**
 * StatCard component - A card for displaying statistics with an icon, value, and label
 * 
 * @example
 * ```tsx
 * <StatCard
 *   value="42"
 *   label="Total Users"
 *   icon={<Users size={24} />}
 *   iconColor="primary"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <StatCard
 *   value="99.9%"
 *   label="Uptime"
 *   icon={<Activity size={24} />}
 *   iconColor="success"
 * />
 * ```
 */
const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  iconColor = 'primary',
  ...props
}) => {
  return (
    <Card variant="outlined" {...props}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {icon && (
            <Box sx={{ color: `${iconColor}.main`, display: 'flex', alignItems: 'center' }}>
              {icon}
            </Box>
          )}
          <Box>
            <Typography variant="h5">{value}</Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
