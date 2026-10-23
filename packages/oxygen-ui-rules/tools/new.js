#!/usr/bin/env node

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

/* global console, process */

import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {parseArgs} from 'util';
import {repoPath, RULES_PACKAGE_DIR} from './lib/repo.js';

const HELP = `
Scaffold a rule or a catalog entry in @wso2/oxygen-ui-rules

Usage:
  pnpm rules:new --rule <rule-id> [--judgement]
  pnpm rules:new --component <ExportName> [--kind <kind>] [--exports <a,b>]
  pnpm rules:new --package <package-name>
  pnpm rules:new --guide "<Guides/Title>"

Options:
  --judgement   The rule needs UX review and has no automated check
  --kind        component (default), layout, provider, hook, theme, utility or animation
  --exports     Comma-separated exports for the entry (default: the component name)

New entries contain TODO placeholders. pnpm rules:coverage fails until they are filled in.
`;

const INSERT_MARKER = '  // rules:new:insert';
const KINDS = ['component', 'layout', 'provider', 'hook', 'theme', 'utility', 'animation'];
const HEADER = readFileSync(join(RULES_PACKAGE_DIR, 'src/defineRule.ts'), 'utf-8').split('\n').slice(0, 17).join('\n');

const {values} = parseArgs({
  options: {
    rule: {type: 'string'},
    judgement: {type: 'boolean', default: false},
    component: {type: 'string'},
    kind: {type: 'string', default: 'component'},
    exports: {type: 'string'},
    package: {type: 'string'},
    guide: {type: 'string'},
    help: {type: 'boolean', short: 'h', default: false},
  },
});

const fail = (message) => {
  console.error(`${message}\n${HELP}`);
  process.exit(2);
};

const created = [];
const updated = [];

if (values.help) {
  console.log(HELP);
} else if (values.rule) {
  newRule(values.rule, values.judgement);
} else if (values.component) {
  newComponent(values.component, values.kind, values.exports);
} else if (values.package) {
  newPackage(values.package);
} else if (values.guide) {
  newGuide(values.guide);
} else {
  fail('Choose what to create: --rule, --component, --package or --guide.');
}

for (const path of created) {
  console.log(`  created  ${repoPath(path)}`);
}
for (const path of updated) {
  console.log(`  updated  ${repoPath(path)}`);
}
if (created.length + updated.length > 0) {
  console.log('\nFill in the TODO placeholders, then run pnpm rules:generate and pnpm rules:coverage.');
}

function insertEntry(file, entry) {
  const path = join(RULES_PACKAGE_DIR, file);
  const source = readFileSync(path, 'utf-8');

  if (!source.includes(INSERT_MARKER)) {
    fail(`${file} has no "${INSERT_MARKER.trim()}" marker.`);
  }

  writeFileSync(path, source.replace(INSERT_MARKER, `${entry}\n${INSERT_MARKER}`));
  updated.push(path);
}

function assertNotListed(file, pattern, label) {
  if (pattern.test(readFileSync(join(RULES_PACKAGE_DIR, file), 'utf-8'))) {
    fail(`${label} is already in ${file}.`);
  }
}

function quote(text) {
  return `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function newComponent(name, kind, exportList) {
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(name)) {
    fail(`"${name}" is not a valid export name.`);
  }
  if (!KINDS.includes(kind)) {
    fail(`Unknown kind "${kind}". Use one of: ${KINDS.join(', ')}.`);
  }

  const exportsOfEntry = (exportList ?? name).split(',').map((item) => item.trim()).filter(Boolean);
  assertNotListed('src/catalog/components.ts', new RegExp(`name: '${name}'`), `Component ${name}`);

  insertEntry(
    'src/catalog/components.ts',
    [
      '  {',
      `    name: ${quote(name)},`,
      `    kind: ${quote(kind)},`,
      `    exports: [${exportsOfEntry.map(quote).join(', ')}],`,
      `    summary: 'TODO: what ${name} is for, in one sentence.',`,
      `    // story: 'TODO: Storybook title, such as App Elements/${name}',`,
      '  },',
    ].join('\n'),
  );
}

function newPackage(name) {
  if (!/^(@[a-z0-9-]+\/)?[a-z0-9-]+$/.test(name)) {
    fail(`"${name}" is not a valid package name.`);
  }
  assertNotListed('src/catalog/packages.ts', new RegExp(`name: '${name}'`), `Package ${name}`);

  insertEntry(
    'src/catalog/packages.ts',
    [
      '  {',
      `    name: ${quote(name)},`,
      `    summary: 'TODO: what the package provides, in one sentence.',`,
      `    usage: 'TODO: how products should import or depend on it.',`,
      '  },',
    ].join('\n'),
  );
}

function newGuide(title) {
  const id = title.startsWith('Guides/') ? title : `Guides/${title}`;
  assertNotListed('src/catalog/guides.ts', new RegExp(`id: ${quote(id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), `Guide ${id}`);

  insertEntry(
    'src/catalog/guides.ts',
    ['  {', `    id: ${quote(id)},`, `    summary: 'TODO: what the guide covers, in one sentence.',`, '  },'].join('\n'),
  );
}

function newRule(id, judgement) {
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id)) {
    fail(`"${id}" is not a kebab-case rule id.`);
  }

  const dir = join(RULES_PACKAGE_DIR, 'src/rules', id);
  if (existsSync(dir)) {
    fail(`Rule ${id} already exists.`);
  }

  const variable = id.replace(/-([a-z0-9])/g, (_, letter) => letter.toUpperCase());
  mkdirSync(dir, {recursive: true});

  const write = (file, content) => {
    const path = join(dir, file);
    writeFileSync(path, content);
    created.push(path);
  };

  write(
    'meta.ts',
    `${HEADER}

import type {RuleMeta} from '../../types.js';

const meta: RuleMeta = {
  id: '${id}',
  title: 'TODO: sentence-case title',
  summary: 'TODO: one sentence describing what the rule requires.',
  // imports, styling, components, patterns, accessibility, testability or content
  category: 'components',
  // mandatory, recommended or advisory
  level: 'recommended',
  severity: 'warning',
  enforcement: '${judgement ? 'judgement' : 'automated'}',
  // safe, suggestion, ai or manual
  fix: 'manual',
  // The Oxygen UI component, package or guide the rule enforces, and the product it was extracted from, e.g.
  // {type: 'component', name: 'ListingTable'}, {type: 'guide', id: 'Guides/Choosing a Table'},
  // {type: 'product', product: 'thunderid', reference: 'packages/configure-roles/src/components/RolesList.tsx'}
  sources: [],
  since: '${JSON.parse(readFileSync(join(RULES_PACKAGE_DIR, 'package.json'), 'utf-8')).version}',
};

export default meta;
`,
  );

  write(
    'docs.md',
    `## Why

TODO: the inconsistency the rule prevents, and why it matters.

## Impact

TODO: what users or developers experience when the rule is not followed.

## How to fix

TODO: the Oxygen UI component, token or pattern to use instead, with the exact API.

## Exceptions

TODO: when a product may deviate, and how to record it. "None" if there are no exceptions.
`,
  );

  write(
    'examples.ts',
    `${HEADER}

import type {RuleExamples} from '../../types.js';

const examples: RuleExamples = {
  valid: [
    {
      title: 'TODO: what the correct example shows',
      code: "TODO: correct code",
    },
  ],
  invalid: [
    {
      title: 'TODO: what the incorrect example shows',
      code: "TODO: incorrect code",${judgement ? '' : `
      // Number of findings, and the code after safe fixes (null if the rule does not fix it).
      errors: 1,
      output: null,`}
    },
  ],
};

export default examples;
`,
  );

  if (!judgement) {
    write(
      'detect.ts',
      `${HEADER}

import type {Rule} from 'eslint';

const detect: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'TODO: same as the summary in meta.ts',
    },
    schema: [],
    messages: {
      // TODO: the message shown for each finding.
      violation: 'TODO: what is wrong and what to use instead.',
    },
  },
  create(context: Rule.RuleContext) {
    // TODO: report findings with context.report({node, messageId: 'violation'}).
    void context;
    return {};
  },
};

export default detect;
`,
    );
  }

  write(
    'index.ts',
    `${HEADER}

import defineRule from '../../defineRule.js';
${judgement ? '' : "import detect from './detect.js';\n"}import docs from './docs.md';
import examples from './examples.js';
import meta from './meta.js';

export default defineRule({meta, docs, examples${judgement ? '' : ', detect'}});
`,
  );

  const indexPath = join(RULES_PACKAGE_DIR, 'src/rules/index.ts');
  const index = readFileSync(indexPath, 'utf-8');
  const imports = [...index.matchAll(/^import .*;$/gm)];
  const lastImport = imports[imports.length - 1];
  const withImport =
    index.slice(0, lastImport.index + lastImport[0].length) +
    `\nimport ${variable} from './${id}/index.js';` +
    index.slice(lastImport.index + lastImport[0].length);

  writeFileSync(indexPath, withImport.replace(INSERT_MARKER, `  ${variable},\n${INSERT_MARKER}`));
  updated.push(indexPath);
}
