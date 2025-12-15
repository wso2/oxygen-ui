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
 * Context value for AppShellNotificationPanel compound component.
 */
export interface AppShellNotificationPanelContextValue {
  /** Callback to close the panel */
  onClose: () => void;
}

/**
 * Context for sharing state between AppShellNotificationPanel compound components.
 */
export const AppShellNotificationPanelContext =
  React.createContext<AppShellNotificationPanelContextValue | null>(null);

/**
 * Hook to access AppShellNotificationPanel context.
 * @throws Error if used outside AppShellNotificationPanel
 */
export const useAppShellNotificationPanel = (): AppShellNotificationPanelContextValue => {
  const context = React.useContext(AppShellNotificationPanelContext);
  if (!context) {
    throw new Error(
      'AppShellNotificationPanel compound components must be used within AppShellNotificationPanel'
    );
  }
  return context;
};
