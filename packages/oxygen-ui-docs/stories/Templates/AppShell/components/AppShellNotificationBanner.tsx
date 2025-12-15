/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import * as React from 'react';
import {
  Alert,
  AlertTitle,
  Collapse,
  Button,
  Box,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import type { NotificationBannerProps } from './types';

/**
 * AppShellNotificationBanner - Dismissible system alert banner.
 *
 * A top-level notification banner that appears above the main application
 * content. Used for system-wide announcements, maintenance notices, or
 * important alerts that need high visibility.
 *
 * Features:
 * - Multiple severity levels (info, warning, error, success)
 * - Optional title for more prominent messages
 * - Optional action button
 * - Smooth collapse animation on dismiss
 * - Full-width design that sits at the top of the app
 *
 * Usage:
 * ```tsx
 * <AppShellNotificationBanner
 *   visible={showBanner}
 *   severity="info"
 *   title="Scheduled Maintenance"
 *   message="The system will be undergoing maintenance on Dec 20th."
 *   actionLabel="Learn More"
 *   onAction={() => openMaintenanceInfo()}
 *   onDismiss={() => setShowBanner(false)}
 * />
 * ```
 */
export const AppShellNotificationBanner: React.FC<
  NotificationBannerProps & { sx?: SxProps<Theme> }
> = ({
  visible = true,
  severity = 'info',
  title,
  message,
  actionLabel,
  onAction,
  onDismiss,
  sx,
}) => {
  const [isVisible, setIsVisible] = React.useState(visible);

  // Sync with external visible prop
  React.useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <Collapse in={isVisible}>
      <Alert
        severity={severity}
        variant="filled"
        onClose={handleDismiss}
        sx={{
          borderRadius: 0,
          '& .MuiAlert-message': {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          },
          '& .MuiAlert-action': {
            pt: 0,
            alignItems: 'center',
          },
          ...sx,
        }}
        action={
          actionLabel && onAction ? (
            <Button
              color="inherit"
              size="small"
              onClick={onAction}
              sx={{
                fontWeight: 600,
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'underline',
                  bgcolor: 'transparent',
                },
              }}
            >
              {actionLabel}
            </Button>
          ) : undefined
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.25,
            flex: 1,
          }}
        >
          {title && <AlertTitle sx={{ mb: 0 }}>{title}</AlertTitle>}
          <Box component="span">{message}</Box>
        </Box>
      </Alert>
    </Collapse>
  );
};

export default AppShellNotificationBanner;
