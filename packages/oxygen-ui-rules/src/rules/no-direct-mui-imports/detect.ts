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

/**
 * Returns a fix only for imports that `@wso2/oxygen-ui` re-exports unchanged:
 * `@mui/material`, its `styles` subpath, and its single-component subpaths such as
 * `@mui/material/Button`. Other packages are not fixed automatically, because
 * Oxygen UI exposes them differently (for example `@mui/x-data-grid` is the
 * `DataGrid` namespace and `@mui/material/colors` is the `colors` namespace).
 */
function getFix(
  node: ImportDeclaration,
  importSource: string,
  suggestedPackage: string,
): Rule.ReportFixer | null {
  const newSource = `'${suggestedPackage}'`;

  if (importSource === '@mui/material' || importSource === '@mui/material/styles') {
    return (fixer: Rule.RuleFixer) => fixer.replaceText(node.source, newSource);
  }

  const subpathMatch = /^@mui\/material\/([A-Z][A-Za-z]*)$/.exec(importSource);
  if (!subpathMatch) {
    return null;
  }

  const defaultSpecifiers = node.specifiers.filter((specifier) => specifier.type === 'ImportDefaultSpecifier');
  const namespaceSpecifiers = node.specifiers.filter((specifier) => specifier.type === 'ImportNamespaceSpecifier');

  if (namespaceSpecifiers.length > 0) {
    return null;
  }

  // Named imports only, e.g. "import { buttonClasses } from '@mui/material/Button'".
  if (defaultSpecifiers.length === 0) {
    return (fixer: Rule.RuleFixer) => fixer.replaceText(node.source, newSource);
  }

  // A single default import, e.g. "import MuiButton from '@mui/material/Button'".
  // Default and named imports together are left for the developer to fix.
  if (node.specifiers.length === 1) {
    const exportedName = subpathMatch[1];
    const localName = defaultSpecifiers[0].local.name;
    const specifier = localName === exportedName ? exportedName : `${exportedName} as ${localName}`;
    const importKind = (node as ImportDeclaration & {importKind?: string}).importKind === 'type' ? 'type ' : '';

    return (fixer: Rule.RuleFixer) =>
      fixer.replaceTextRange(
        [node.range![0], node.source.range![1]],
        `import ${importKind}{${specifier}} from ${newSource}`,
      );
  }

  return null;
}

const noDirectMuiImportsRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct imports from MUI packages (@mui/*), suggest using @wso2/oxygen-ui instead',
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

        // Check if the package is in the allowed list. Match the package name exactly,
        // so allowing '@mui/x-data-grid' does not also allow '@mui/x-data-grid-pro'.
        if (allowedPackages.some((pkg: string) => importSource === pkg || importSource.startsWith(`${pkg}/`))) {
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
          fix: getFix(node, importSource, suggestedPackage),
        });
      },
    };
  },
};

export default noDirectMuiImportsRule;
