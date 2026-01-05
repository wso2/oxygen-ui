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

export { Header, default } from './Header';
export type { HeaderProps, HeaderSpacerProps } from './Header';

export { HeaderToggle } from './HeaderToggle';
export type { HeaderToggleProps } from './HeaderToggle';

export { HeaderBrand } from './HeaderBrand';
export type { HeaderBrandProps } from './HeaderBrand';

// Brand sub-components for composable API
export { HeaderBrandLogo } from './HeaderBrandLogo';
export type { HeaderBrandLogoProps } from './HeaderBrandLogo';

export { HeaderBrandTitle } from './HeaderBrandTitle';
export type { HeaderBrandTitleProps } from './HeaderBrandTitle';

export { HeaderSwitchers } from './HeaderSwitchers';
export type { HeaderSwitchersProps } from './HeaderSwitchers';

export { HeaderActions } from './HeaderActions';
export type { HeaderActionsProps } from './HeaderActions';

export { HeaderContext, useHeader } from './context';
export type { HeaderContextValue } from './context';
