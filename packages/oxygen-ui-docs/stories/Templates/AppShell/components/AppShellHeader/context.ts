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
 * Context value for AppShellHeader compound component.
 */
export interface AppShellHeaderContextValue {
  /** Whether the header is in minimal mode (logo + user only) */
  minimal: boolean;
}

/**
 * Context for sharing state between AppShellHeader compound components.
 */
export const AppShellHeaderContext = React.createContext<AppShellHeaderContextValue | null>(null);

/**
 * Hook to access AppShellHeader context.
 * @throws Error if used outside AppShellHeader
 */
export const useAppShellHeader = (): AppShellHeaderContextValue => {
  const context = React.useContext(AppShellHeaderContext);
  if (!context) {
    throw new Error('AppShellHeader compound components must be used within AppShellHeader');
  }
  return context;
};
