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

interface NoDirectLucideImportsOptions {
  suggestedPackage?: string;
}

const noDirectLucideImportsRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct imports from lucide-react, suggest using @oxygen-ui/react-icons instead',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          suggestedPackage: {
            type: 'string',
            description: 'The package to suggest instead of lucide-react',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noDirectLucideImport:
        "Direct imports from 'lucide-react' are not allowed. Use '{{suggestedPackage}}' instead to import icons.",
    },
  },
  create(context: Rule.RuleContext) {
    const options: NoDirectLucideImportsOptions = (context.options?.[0] as NoDirectLucideImportsOptions) ?? {};
    const suggestedPackage: string = options.suggestedPackage ?? '@oxygen-ui/react-icons';

    return {
      ImportDeclaration(node: ImportDeclaration) {
        const importSource = node.source.value as string;

        // Check if it's a lucide-react import
        if (importSource !== 'lucide-react') {
          return;
        }

        context.report({
          node: node.source,
          messageId: 'noDirectLucideImport',
          data: {
            suggestedPackage,
          },
          fix(fixer: Rule.RuleFixer) {
            // Replace lucide-react with the suggested package
            const newSource = `'${suggestedPackage}'`;
            return fixer.replaceText(node.source, newSource);
          },
        });
      },
    };
  },
};

export default noDirectLucideImportsRule;
