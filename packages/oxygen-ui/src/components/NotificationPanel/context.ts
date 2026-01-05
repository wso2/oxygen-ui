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

/**
 * Context value for NotificationPanel compound component.
 */
export interface NotificationPanelContextValue {
  /** Callback to close the panel */
  onClose: () => void;
}

/**
 * Context for sharing state between NotificationPanel compound components.
 */
export const NotificationPanelContext =
  React.createContext<NotificationPanelContextValue | null>(null);

/**
 * Hook to access NotificationPanel context.
 * @throws Error if used outside NotificationPanel
 */
export const useNotificationPanel = (): NotificationPanelContextValue => {
  const context = React.useContext(NotificationPanelContext);
  if (!context) {
    throw new Error(
      'NotificationPanel compound components must be used within NotificationPanel'
    );
  }
  return context;
};
