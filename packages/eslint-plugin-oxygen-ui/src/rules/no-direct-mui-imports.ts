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

import type {Rule} from 'eslint';
import type {ImportDeclaration} from 'estree';

interface NoDirectMuiImportsOptions {
  allowedPackages?: string[];
  suggestedPackage?: string;
}

const noDirectMuiImportsRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct imports from MUI packages (@mui/*), suggest using @oxygen-ui/react instead',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          allowedPackages: {
            type: 'array',
            items: {type: 'string'},
            description: 'List of MUI packages that are allowed (e.g., @mui/x-data-grid)',
          },
          suggestedPackage: {
            type: 'string',
            description: 'The package to suggest instead of @mui/material',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noDirectMuiImport:
        "Direct imports from MUI packages are not allowed. Use '{{suggestedPackage}}' instead to import Material-UI components.",
      noDirectMuiSubpathImport:
        "Direct imports from '{{source}}' are not allowed. Use '{{suggestedPackage}}' instead.",
    },
  },
  create(context: Rule.RuleContext) {
    const options: NoDirectMuiImportsOptions = (context.options?.[0] as NoDirectMuiImportsOptions) ?? {};
    const allowedPackages: string[] = options.allowedPackages ?? [];
    const suggestedPackage: string = options.suggestedPackage ?? '@wso2/oxygen-ui';

    return {
      ImportDeclaration(node: ImportDeclaration) {
        const importSource = node.source.value as string;

        // Check if it's a @mui/* import
        if (!importSource.startsWith('@mui/')) {
          return;
        }

        // Check if the package is in the allowed list
        if (allowedPackages.some((pkg: string) => importSource.startsWith(pkg))) {
          return;
        }

        // Extract component name from subpath imports like '@mui/material/Box' or '@mui/x-data-grid/DataGrid'
        const componentMatch = /^@mui\/[^/]+\/(.+)$/.exec(importSource);
        const componentName = componentMatch ? componentMatch[1] : null;

        context.report({
          node: node.source,
          messageId: componentName ? 'noDirectMuiSubpathImport' : 'noDirectMuiImport',
          data: {
            source: importSource,
            component: componentName ?? '',
            suggestedPackage,
          },
          fix(fixer: Rule.RuleFixer) {
            // For subpath imports like "import Box from '@mui/material/Box'" or "import { DataGrid } from '@mui/x-data-grid'"
            // Convert to: "import {Box} from '@oxygen-ui/react'"
            if (componentName && node.specifiers.length === 1 && node.specifiers[0].type === 'ImportDefaultSpecifier') {
              const importedName = node.specifiers[0].local.name;
              const newImport = `import {${importedName}} from '${suggestedPackage}'`;
              return fixer.replaceText(node, newImport);
            }

            // For all other cases (direct imports from any @mui/* package)
            // Just replace the source with the suggested package
            const newSource = `'${suggestedPackage}'`;
            return fixer.replaceText(node.source, newSource);
          },
        });
      },
    };
  },
};

export default noDirectMuiImportsRule;
