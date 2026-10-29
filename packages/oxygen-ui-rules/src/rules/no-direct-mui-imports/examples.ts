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
      title: 'MUI X import, with a suggestion to use the Oxygen UI namespace',
      code: "import {DataGrid} from '@mui/x-data-grid';\n\nexport const Grid = () => <DataGrid rows={[]} columns={[]} />;",
      output: null,
      errors: 1,
      messageId: 'noDirectMuiNamespaceImport',
      suggestions: [
        {
          description: "Import the DataGrid namespace from '@wso2/oxygen-ui', and use the imported names through it.",
          output: "import {DataGrid} from '@wso2/oxygen-ui';\n\nexport const Grid = () => <DataGrid.DataGrid rows={[]} columns={[]} />;",
        },
      ],
    },
    {
      title: 'The suggestion rewrites JSX tags, types and shorthand properties',
      code: [
        "import {DataGrid, type GridColDef} from '@mui/x-data-grid';",
        '',
        'const columns: GridColDef[] = [];',
        'export const meta = {GridColDef};',
        'export const Grid = () => <DataGrid columns={columns}></DataGrid>;',
      ].join('\n'),
      output: null,
      errors: 1,
      messageId: 'noDirectMuiNamespaceImport',
      suggestions: [
        {
          description: "Import the DataGrid namespace from '@wso2/oxygen-ui', and use the imported names through it.",
          output: [
            "import {DataGrid} from '@wso2/oxygen-ui';",
            '',
            'const columns: DataGrid.GridColDef[] = [];',
            'export const meta = {GridColDef: DataGrid.GridColDef};',
            'export const Grid = () => <DataGrid.DataGrid columns={columns}></DataGrid.DataGrid>;',
          ].join('\n'),
        },
      ],
    },
    {
      title: 'MUI colors, with a suggestion to use the colors namespace',
      code: "import {red} from '@mui/material/colors';\n\nexport const danger = red[500];",
      output: null,
      errors: 1,
      messageId: 'noDirectMuiNamespaceImport',
      suggestions: [
        {
          description: "Import the colors namespace from '@wso2/oxygen-ui', and use the imported names through it.",
          output: "import {colors} from '@wso2/oxygen-ui';\n\nexport const danger = colors.red[500];",
        },
      ],
    },
    {
      title: 'No suggestion when the namespace name is already used',
      code: "import {DataGrid as Grid} from '@mui/x-data-grid';\n\nconst DataGrid = 1;\nexport {Grid, DataGrid};",
      output: null,
      errors: 1,
      messageId: 'noDirectMuiNamespaceImport',
      suggestions: [],
    },
    {
      title: 'No suggestion when an imported name is re-exported',
      code: "import {DataGrid} from '@mui/x-data-grid';\n\nexport {DataGrid};",
      output: null,
      errors: 1,
      messageId: 'noDirectMuiNamespaceImport',
      suggestions: [],
    },
    {
      title: 'MUI icons, which should come from Oxygen UI icons (not fixed automatically)',
      code: "import DeleteIcon from '@mui/icons-material/Delete';",
      output: null,
      errors: 1,
    },
    {
      title: 'Default and named imports together',
      code: "import MuiButton, {buttonClasses} from '@mui/material/Button';",
      output: "import {Button as MuiButton, buttonClasses} from '@wso2/oxygen-ui';",
      errors: 1,
    },
  ],
};

export default examples;
