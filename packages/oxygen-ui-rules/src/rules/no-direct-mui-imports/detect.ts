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

import type {Rule, SourceCode} from 'eslint';
import type {Identifier, ImportDeclaration, ImportSpecifier, Node} from 'estree';

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
  sourceCode: SourceCode,
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

  // A default import, alone or with named imports, e.g. "import MuiButton, {buttonClasses} from
  // '@mui/material/Button'". The default export of a component subpath is the component, which
  // Oxygen UI exports by the same name.
  const exportedName = subpathMatch[1];
  const localName = defaultSpecifiers[0].local.name;
  const specifiers = [
    localName === exportedName ? exportedName : `${exportedName} as ${localName}`,
    ...node.specifiers.filter((specifier) => specifier.type === 'ImportSpecifier').map((specifier) => sourceCode.getText(specifier)),
  ];
  const importKind = (node as ImportDeclaration & {importKind?: string}).importKind === 'type' ? 'type ' : '';

  return (fixer: Rule.RuleFixer) =>
    fixer.replaceTextRange([node.range![0], node.source.range![1]], `import ${importKind}{${specifiers.join(', ')}} from ${newSource}`);
}

/**
 * Suggests importing the Oxygen UI namespace for a MUI X or MUI colors import, and rewriting every use
 * of the imported names, e.g. `<DataGrid />` to `<DataGrid.DataGrid />` and `GridColDef` to
 * `DataGrid.GridColDef`. It is a suggestion rather than a fix because it changes more than the
 * import. No suggestion is made when the rewrite might not be correct.
 */
function getNamespaceSuggestion(
  context: Rule.RuleContext,
  node: ImportDeclaration,
  importSource: string,
  suggestedPackage: string,
): Rule.SuggestionReportDescriptor[] {
  const namespace = NAMESPACES.find((candidate) => candidate.root === importSource)?.namespace;
  const specifiers = node.specifiers;

  if (!namespace || specifiers.length === 0 || specifiers.some((specifier) => specifier.type !== 'ImportSpecifier')) {
    return [];
  }

  // The namespace name must be free, or the rewritten code would refer to something else. The import
  // being replaced may itself declare it, as in "import {DataGrid} from '@mui/x-data-grid'".
  const scope = context.sourceCode.getScope(node);
  for (let current: typeof scope | null = scope; current; current = current.upper) {
    const existing = current.set.get(namespace);

    if (existing && !existing.defs.every((definition) => definition.parent === node)) {
      return [];
    }
  }

  const replacements: {range: [number, number]; text: string}[] = [];

  for (const variable of context.sourceCode.getDeclaredVariables(node)) {
    const specifier = (specifiers as ImportSpecifier[]).find((candidate) => candidate.local.name === variable.name);
    if (!specifier) {
      return [];
    }

    const imported = specifier.imported.type === 'Identifier' ? specifier.imported.name : String(specifier.imported.value);
    const qualified = `${namespace}.${imported}`;

    for (const reference of variable.references) {
      const identifier = reference.identifier as Identifier & {parent?: Node & Record<string, unknown>};
      const parent = identifier.parent;

      if (!parent || parent.type === 'ExportSpecifier') {
        // Re-exported names cannot be qualified.
        return [];
      }

      if (parent.type === 'Property' && parent.shorthand) {
        replacements.push({range: identifier.range!, text: `${identifier.name}: ${qualified}`});
      } else {
        replacements.push({range: identifier.range!, text: qualified});
      }
    }
  }

  const importKind = (node as ImportDeclaration & {importKind?: string}).importKind === 'type' ? 'type ' : '';

  return [
    {
      messageId: 'useNamespace',
      data: {namespace, suggestedPackage},
      fix: (fixer: Rule.RuleFixer) => [
        fixer.replaceTextRange([node.range![0], node.source.range![1]], `import ${importKind}{${namespace}} from '${suggestedPackage}'`),
        ...replacements.map(({range, text}) => fixer.replaceTextRange(range, text)),
      ],
    },
  ];
}

/**
 * MUI packages that Oxygen UI exposes as namespaces rather than as named exports.
 */
const NAMESPACES: {root: string; pattern: RegExp; namespace: string; example: string}[] = [
  {root: '@mui/x-data-grid', pattern: /^@mui\/x-data-grid(\/|$)/, namespace: 'DataGrid', example: '<DataGrid.DataGrid />'},
  {root: '@mui/x-date-pickers', pattern: /^@mui\/x-date-pickers(\/|$)/, namespace: 'DatePickers', example: '<DatePickers.DatePicker />'},
  {root: '@mui/x-tree-view', pattern: /^@mui\/x-tree-view(\/|$)/, namespace: 'TreeView', example: '<TreeView.SimpleTreeView />'},
  {root: '@mui/material/colors', pattern: /^@mui\/material\/colors$/, namespace: 'colors', example: 'colors.deepOrange[500]'},
];

/**
 * Picks the message that tells the developer what to use instead.
 */
function getMessage(importSource: string, componentName: string | null): {messageId: string; data?: Record<string, string>} {
  if (/^@mui\/icons-material(\/|$)/.test(importSource)) {
    return {messageId: 'noDirectMuiIconsImport'};
  }

  const namespace = NAMESPACES.find((candidate) => candidate.pattern.test(importSource));
  if (namespace) {
    return {messageId: 'noDirectMuiNamespaceImport', data: {namespace: namespace.namespace, example: namespace.example}};
  }

  return {messageId: componentName ? 'noDirectMuiSubpathImport' : 'noDirectMuiImport'};
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
    hasSuggestions: true,
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
      noDirectMuiNamespaceImport:
        "Direct imports from '{{source}}' are not allowed. Use the {{namespace}} namespace from '{{suggestedPackage}}' instead, for example {{example}}.",
      useNamespace: "Import the {{namespace}} namespace from '{{suggestedPackage}}', and use the imported names through it.",
      noDirectMuiIconsImport:
        "Direct imports from '{{source}}' are not allowed. Use icons from '@wso2/oxygen-ui-icons-react' instead.",
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

        const {messageId, data} = getMessage(importSource, componentName);

        context.report({
          node: node.source,
          messageId,
          data: {
            source: importSource,
            component: componentName ?? '',
            suggestedPackage,
            ...data,
          },
          fix: getFix(node, importSource, suggestedPackage, context.sourceCode),
          suggest: getNamespaceSuggestion(context, node, importSource, suggestedPackage),
        });
      },
    };
  },
};

export default noDirectMuiImportsRule;
