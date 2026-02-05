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

import * as React from 'react';

/**
 * Context for UserMenu state and actions.
 */
interface UserMenuContextType {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

export const UserMenuContext = React.createContext<UserMenuContextType | undefined>(undefined);

/**
 * Hook to use UserMenu context in sub-components.
 */
export const useUserMenu = () => {
  const context = React.useContext(UserMenuContext);
  if (!context) {
    throw new Error('UserMenu sub-components must be used within a UserMenu component');
  }
  return context;
};
