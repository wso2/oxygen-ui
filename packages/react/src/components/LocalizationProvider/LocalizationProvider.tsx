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

import {
  LocalizationProvider as MuiLocalizationProvider,
  type LocalizationProviderProps as MuiLocalizationProviderProps,
} from '@mui/x-date-pickers';
import {ReactElement} from 'react';

/**
 * Oxygen UI wrapper for MUI's LocalizationProvider.
 * Behaves exactly the same as the MUI version.
 *
 * Example usage:
 * ```tsx
 * import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 * import { LocalizationProvider } from '@oxygen-ui/react/LocalizationProvider';
 *
 * <LocalizationProvider dateAdapter={AdapterDayjs}>
 *   <DatePicker ... />
 * </LocalizationProvider>
 * ```
 *
 * @see https://mui.com/x/react-date-pickers/localization/
 */
const LocalizationProvider = <TDate = unknown, TLocale = unknown>(
  props: MuiLocalizationProviderProps<TDate, TLocale>,
): ReactElement => <MuiLocalizationProvider {...props} />;

export default LocalizationProvider;
