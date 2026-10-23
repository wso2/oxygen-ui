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

import type {RuleExamples} from '../../types.js';

const examples: RuleExamples = {
  valid: [
    {
      title: 'MUI components imported from Oxygen UI',
      code: "import {Box, Button, styled} from '@wso2/oxygen-ui';",
    },
    {
      title: 'MUI X components used through the Oxygen UI namespace',
      code: "import {DataGrid} from '@wso2/oxygen-ui';\nconst Grid = DataGrid.DataGrid;",
    },
  ],
  invalid: [
    {
      title: 'Named imports from @mui/material',
      code: "import {Box, Stack} from '@mui/material';",
      output: "import {Box, Stack} from '@wso2/oxygen-ui';",
      errors: 1,
    },
    {
      title: 'Default import from a component subpath',
      code: "import Button from '@mui/material/Button';",
      output: "import {Button} from '@wso2/oxygen-ui';",
      errors: 1,
    },
    {
      title: 'Renamed default import from a component subpath',
      code: "import MuiButton from '@mui/material/Button';",
      output: "import {Button as MuiButton} from '@wso2/oxygen-ui';",
      errors: 1,
    },
    {
      title: 'Styling utilities from @mui/material/styles',
      code: "import {styled, useTheme} from '@mui/material/styles';",
      output: "import {styled, useTheme} from '@wso2/oxygen-ui';",
      errors: 1,
    },
    {
      title: 'MUI X import, which Oxygen UI exposes as a namespace (not fixed automatically)',
      code: "import {DataGrid} from '@mui/x-data-grid';",
      output: null,
      errors: 1,
    },
    {
      title: 'MUI colors, which Oxygen UI exposes as the colors namespace (not fixed automatically)',
      code: "import {red} from '@mui/material/colors';",
      output: null,
      errors: 1,
    },
    {
      title: 'MUI icons, which should come from Oxygen UI icons (not fixed automatically)',
      code: "import DeleteIcon from '@mui/icons-material/Delete';",
      output: null,
      errors: 1,
    },
    {
      title: 'Default and named imports together (not fixed automatically)',
      code: "import Button, {buttonClasses} from '@mui/material/Button';",
      output: null,
      errors: 1,
    },
  ],
};

export default examples;
