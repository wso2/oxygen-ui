/**
 * Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
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

// Auto-import bundled fonts
import './fonts.css';

// Import package.json to extract version
import pkg from '../package.json';

// Export version
export const version =  pkg.version;

// Export custom Oxygen UI components and utilities
// Export styles (themes)
export * from "./styles";

// Export contexts
export * from "./contexts";

// Export components
export * from "./components";

export { default as Layout } from "./layouts";

// Export animations
export * from "./animations";

// Export hooks
export * from "./hooks";

// Export utils
export * from "./utils";

// Re-export the entire @mui/material API
// This allows consumers to import from @wso2/oxygen-ui instead of @mui/material
// and automatically get the Oxygen theme applied
export * from '@mui/material';

// Re-export MUI colors as namespace
// Usage: import { colors } from '@wso2/oxygen-ui';
// Then: colors.deepOrange[500], colors.deepPurple[500], etc.
export * as colors from '@mui/material/colors';

// MUI X (Data Grid, Date Pickers, Tree View) and Prism stay out of this
// Published entry. Import them from Oxygen subpaths (`@wso2/oxygen-ui/data-grid`,
// `date-pickers`, `tree-view`). CodeBlock and ListingTable.DataGrid load their
// heavy deps on mount. See https://github.com/wso2/oxygen-ui/issues/578.
