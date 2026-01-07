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
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { X } from '@wso2/oxygen-ui-icons-react';
import { useNotificationPanel } from './context';

/**
 * Styled close button for the notification panel header.
 */
const NotificationHeaderCloseRoot = styled(IconButton, {
  name: 'MuiNotificationPanel',
  slot: 'HeaderClose',
})({});

/**
 * Props for NotificationHeaderClose component.
 */
export interface NotificationHeaderCloseProps {
  /** Custom icon (defaults to X) */
  children?: React.ReactNode;
  /** Click handler (overrides context onClose) */
  onClick?: () => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationHeaderClose - Close button for the notification panel header.
 *
 * Closes the notification panel when clicked. Uses onClose from context
 * unless overridden with onClick prop.
 *
 * @example
 * ```tsx
 * <NotificationPanel.Header>
 *   <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
 *   <NotificationPanel.HeaderClose />
 * </NotificationPanel.Header>
 * ```
 */
export const NotificationHeaderClose: React.FC<NotificationHeaderCloseProps> = ({
  children,
  onClick,
  sx,
}) => {
  const { onClose } = useNotificationPanel();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      onClose?.();
    }
  };

  return (
    <NotificationHeaderCloseRoot onClick={handleClick} size="small" sx={sx}>
      {children || <X size={20} />}
    </NotificationHeaderCloseRoot>
  );
};

// Add display name for child detection
NotificationHeaderClose.displayName = 'NotificationHeaderClose';

export default NotificationHeaderClose;
