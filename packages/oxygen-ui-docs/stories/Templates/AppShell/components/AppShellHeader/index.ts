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

export { AppShellHeader, default } from './AppShellHeader';
export type { AppShellHeaderProps } from './AppShellHeader';

export { AppShellHeaderToggle } from './AppShellHeaderToggle';
export type { AppShellHeaderToggleProps } from './AppShellHeaderToggle';

export { AppShellHeaderBrand } from './AppShellHeaderBrand';
export type { AppShellHeaderBrandProps } from './AppShellHeaderBrand';

// Brand sub-components for composable API
export { AppShellHeaderBrandLogo } from './AppShellHeaderBrandLogo';
export type { AppShellHeaderBrandLogoProps } from './AppShellHeaderBrandLogo';

export { AppShellHeaderBrandTitle } from './AppShellHeaderBrandTitle';
export type { AppShellHeaderBrandTitleProps } from './AppShellHeaderBrandTitle';

export { AppShellHeaderSwitchers } from './AppShellHeaderSwitchers';
export type { AppShellHeaderSwitchersProps } from './AppShellHeaderSwitchers';

export { AppShellHeaderActions } from './AppShellHeaderActions';
export type { AppShellHeaderActionsProps } from './AppShellHeaderActions';

export { AppShellHeaderContext, useAppShellHeader } from './context';
export type { AppShellHeaderContextValue } from './context';
