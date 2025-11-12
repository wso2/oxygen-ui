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

// Export custom Oxygen UI components and utilities
export { default as OxygenTheme } from "./styles/OxygenTheme/OxygenTheme";
export { default as OxygenUIThemeProvider } from "./contexts/OxygenUIThemeProvider/OxygenUIThemeProvider";
export { default as ColorSchemeImage } from "./components/ColorSchemeImage/ColorSchemeImage";
export { default as ColorSchemeToggle } from "./components/ColorSchemeToggle/ColorSchemeToggle";
export { default as Layout } from "./layouts";

// Re-export the entire @mui/material API
// This allows consumers to import from @wso2/oxygen-ui instead of @mui/material
// and automatically get the Oxygen theme applied
export * from '@mui/material';

// Re-export @mui/x-charts as namespace to avoid conflicts
// Usage: import { Charts } from '@wso2/oxygen-ui';
export * as Charts from '@mui/x-charts';

// Re-export @mui/x-data-grid as namespace to avoid conflicts
// Usage: import { DataGrid } from '@wso2/oxygen-ui';
export * as DataGrid from '@mui/x-data-grid';

// Re-export @mui/x-date-pickers as namespace to avoid conflicts
// Usage: import { DatePickers } from '@wso2/oxygen-ui';
export * as DatePickers from '@mui/x-date-pickers';

// Re-export @mui/x-charts as namespace to avoid conflicts
// Usage: import { TreeView } from '@wso2/oxygen-ui';
export * as TreeView from '@mui/x-tree-view';
