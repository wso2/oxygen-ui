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

import {existsSync, readFileSync} from 'fs';
import parser from '@typescript-eslint/parser';
import {Linter} from 'eslint';
import {buildGeneratedFiles} from './generate.js';
import {listGuides, listPublishablePackages, repoPath} from './repo.js';

/**
 * @typedef {{message: string, hint?: string}} Problem
 * @typedef {{name: string, passed: boolean, summary: string, problems: Problem[], notes: string[]}} CheckResult
 */

/**
 * Runs every coverage check.
 *
 * @param {typeof import('../../dist/index.js')} registry
 * @param {Record<string, Record<string, object>>} api The owned API, from `readApi()`.
 * @returns {CheckResult[]}
 */
export function runChecks(registry, api) {
  return [
    checkComponents(registry, api),
    checkPackages(registry),
    checkGuides(registry),
    checkRuleSources(registry),
    checkGeneratedFiles(registry, api),
    checkRuleExamples(registry),
  ];
}

const isPlaceholder = (text) => typeof text === 'string' && /^\s*TODO\b/.test(text);

function placeholderProblems(file, label, entry, fields) {
  return fields
    .filter((field) => isPlaceholder(entry[field]))
    .map((field) => ({message: `${label} has a placeholder ${field}.`, hint: `Fill it in, in ${file}.`}));
}

function result(name, summary, problems, notes = []) {
  return {name, passed: problems.length === 0, summary, problems, notes};
}

function rulesReferencing(rules, type, key) {
  return rules.filter((rule) => rule.meta.sources.some((source) => source.type === type && (source.name ?? source.id) === key));
}

/** Every owned export of @wso2/oxygen-ui belongs to one catalog entry or is waived, and vice versa. */
export function checkComponents({catalog, rules}, api) {
  const exported = new Set(Object.keys(api['@wso2/oxygen-ui']));
  const waived = new Set(catalog.waivers.map((waiver) => waiver.export));
  const owners = new Map();
  const problems = [];

  for (const entry of catalog.components) {
    problems.push(...placeholderProblems('src/catalog/components.ts', `Component ${entry.name}`, entry, ['summary', 'story']));

    for (const name of entry.exports) {
      if (owners.has(name)) {
        problems.push({message: `"${name}" is listed in both the ${owners.get(name)} and ${entry.name} entries.`});
      }
      owners.set(name, entry.name);

      if (!exported.has(name)) {
        problems.push({
          message: `"${name}" (catalog entry ${entry.name}) is not exported by @wso2/oxygen-ui.`,
          hint: 'Remove it from src/catalog/components.ts, and update any rules that refer to it.',
        });
      }
    }
  }

  for (const name of waived) {
    if (!exported.has(name)) {
      problems.push({message: `Waived export "${name}" is not exported by @wso2/oxygen-ui.`, hint: 'Remove it from src/catalog/waivers.ts.'});
    }
  }

  for (const name of exported) {
    if (!owners.has(name) && !waived.has(name)) {
      problems.push({
        message: `New export "${name}" from @wso2/oxygen-ui has no catalog entry.`,
        hint: `pnpm rules:new --component ${name}, add it to an existing entry's exports, or waive it in src/catalog/waivers.ts.`,
      });
    }
  }

  const governed = catalog.components.filter((entry) => rulesReferencing(rules, 'component', entry.name).length > 0);
  const covered = [...exported].filter((name) => owners.has(name) || waived.has(name)).length;

  return result(
    'Components',
    `${covered}/${exported.size} exports catalogued in ${catalog.components.length} entries (${waived.size} waived)`,
    problems,
    [`${governed.length} of ${catalog.components.length} entries have rules so far`],
  );
}

/** Every publishable package is in the catalog, and vice versa. */
export function checkPackages({catalog, rules}) {
  const publishable = listPublishablePackages();
  const catalogued = new Set(catalog.packages.map((entry) => entry.name));
  const problems = [];

  for (const {name, dir} of publishable) {
    if (!catalogued.has(name)) {
      problems.push({
        message: `${name} (${repoPath(dir)}) is publishable but has no catalog entry.`,
        hint: `pnpm rules:new --package ${name}`,
      });
    }
  }

  for (const entry of catalog.packages) {
    problems.push(...placeholderProblems('src/catalog/packages.ts', `Package ${entry.name}`, entry, ['summary', 'usage']));
  }

  for (const name of catalogued) {
    if (!publishable.some((pkg) => pkg.name === name)) {
      problems.push({
        message: `Catalog package ${name} is not a publishable package in packages/.`,
        hint: 'Remove it from src/catalog/packages.ts, or check whether it was made private or renamed.',
      });
    }
  }

  const withoutRules = catalog.packages.filter((entry) => rulesReferencing(rules, 'package', entry.name).length === 0);

  return result(
    'Packages',
    `${publishable.length - problems.filter((problem) => problem.hint?.startsWith('pnpm')).length}/${publishable.length} publishable packages catalogued`,
    problems,
    withoutRules.length > 0 ? [`No rules yet: ${withoutRules.map((entry) => entry.name).join(', ')}`] : [],
  );
}

/** Every Storybook guide is in the catalog, and vice versa. */
export function checkGuides({catalog, rules}) {
  const guides = listGuides();
  const catalogued = new Set(catalog.guides.map((entry) => entry.id));
  const problems = [];

  for (const guide of guides) {
    if (!catalogued.has(guide.id)) {
      problems.push({
        message: `Guide "${guide.id}" (${repoPath(guide.file)}) has no catalog entry.`,
        hint: `pnpm rules:new --guide "${guide.id}"`,
      });
    }
  }

  for (const entry of catalog.guides) {
    problems.push(...placeholderProblems('src/catalog/guides.ts', `Guide ${entry.id}`, entry, ['summary']));
  }

  for (const id of catalogued) {
    if (!guides.some((guide) => guide.id === id)) {
      problems.push({
        message: `Catalog guide "${id}" is not a guide in the Storybook.`,
        hint: 'Remove it from src/catalog/guides.ts, and update any rules that refer to it.',
      });
    }
  }

  const withRules = catalog.guides.filter((entry) => rulesReferencing(rules, 'guide', entry.id).length > 0);

  return result(
    'Guides',
    `${guides.filter((guide) => catalogued.has(guide.id)).length}/${guides.length} guides catalogued`,
    problems,
    [`${withRules.length} of ${catalog.guides.length} guides have rules so far`],
  );
}

/** Every rule is filled in, and its sources point to something in the catalog. */
export function checkRuleSources({catalog, rules}) {
  const known = {
    component: new Set(catalog.components.map((entry) => entry.name)),
    package: new Set(catalog.packages.map((entry) => entry.name)),
    guide: new Set(catalog.guides.map((entry) => entry.id)),
  };
  const problems = [];

  for (const rule of rules) {
    const file = `src/rules/${rule.meta.id}`;

    problems.push(...placeholderProblems(`${file}/meta.ts`, `Rule ${rule.meta.id}`, rule.meta, ['title', 'summary']));

    if (/\bTODO\b/.test(rule.docs)) {
      problems.push({message: `Rule ${rule.meta.id} has placeholders in its docs.`, hint: `Fill them in, in ${file}/docs.md.`});
    }

    if ([...rule.examples.valid, ...rule.examples.invalid].some((example) => isPlaceholder(example.title) || isPlaceholder(example.code))) {
      problems.push({message: `Rule ${rule.meta.id} has placeholder examples.`, hint: `Fill them in, in ${file}/examples.ts.`});
    }

    if (rule.meta.sources.length === 0) {
      problems.push({
        message: `Rule ${rule.meta.id} has no sources.`,
        hint: `List the component, package or guide it enforces, in ${file}/meta.ts.`,
      });
    }

    for (const source of rule.meta.sources) {
      const key = source.name ?? source.id;

      if (known[source.type] && !known[source.type].has(key)) {
        problems.push({
          message: `Rule ${rule.meta.id} refers to ${source.type} "${key}", which is not in the catalog.`,
          hint: `Fix the source in src/rules/${rule.meta.id}/meta.ts, or add the ${source.type} to the catalog.`,
        });
      }
    }
  }

  const incomplete = new Set(problems.map((problem) => /^Rule (\S+)/.exec(problem.message)?.[1]));

  return result('Rules', `${rules.length - incomplete.size}/${rules.length} complete`, problems);
}

/** Generated files match what the registry and the API produce. */
export function checkGeneratedFiles(registry, api) {
  const files = buildGeneratedFiles(registry, api);
  const problems = [];

  for (const {path, content} of files) {
    if (!existsSync(path)) {
      problems.push({message: `${repoPath(path)} has not been generated.`, hint: 'pnpm rules:generate'});
    } else if (readFileSync(path, 'utf-8') !== content) {
      problems.push({
        message: `${repoPath(path)} is out of date.${path.endsWith('.snapshot.json') ? ` ${describeApiChanges(JSON.parse(readFileSync(path, 'utf-8')), api)}` : ''}`,
        hint: path.endsWith('.snapshot.json')
          ? 'Check whether the changed components need new or updated rules, then run pnpm rules:generate.'
          : 'pnpm rules:generate',
      });
    }
  }

  return result('Generated files', `${files.length - problems.length}/${files.length} up to date`, problems);
}

export function describeApiChanges(previous, current) {
  const changes = [];

  for (const [pkg, exports] of Object.entries(current)) {
    const before = previous[pkg] ?? {};

    for (const name of Object.keys(exports)) {
      if (!(name in before)) {
        changes.push(`added ${name}`);
      } else {
        changes.push(...diffDescription(name, before[name], exports[name]));
      }
    }

    for (const name of Object.keys(before)) {
      if (!(name in exports)) {
        changes.push(`removed ${name}`);
      }
    }
  }

  return changes.length > 0 ? `API changes: ${changes.join('; ')}.` : '';
}

function diffDescription(name, before, after) {
  const changes = [];
  const diffList = (label, previous = [], next = []) => {
    const added = next.filter((item) => !previous.includes(item));
    const removed = previous.filter((item) => !next.includes(item));

    if (added.length > 0 || removed.length > 0) {
      changes.push(`${label} ${[...added.map((item) => `+${item}`), ...removed.map((item) => `-${item}`)].join(' ')}`);
    }
  };

  diffList(`${name} props`, before.props, after.props);
  diffList(`${name} members`, Object.keys(before.members ?? {}), Object.keys(after.members ?? {}));

  for (const member of Object.keys(after.members ?? {})) {
    if (before.members?.[member]) {
      diffList(`${name}.${member} props`, before.members[member], after.members[member]);
    }
  }

  return changes;
}

/** Every automated rule behaves as its examples say. */
export function checkRuleExamples({rules, getEslintRules, ESLINT_PLUGIN_NAMESPACE}) {
  const linter = new Linter({configType: 'flat'});
  const plugin = {rules: getEslintRules(rules)};
  const problems = [];
  let count = 0;

  for (const rule of rules.filter((candidate) => candidate.detect)) {
    const config = [
      {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
        languageOptions: {parser, parserOptions: {ecmaFeatures: {jsx: true}}},
        plugins: {[ESLINT_PLUGIN_NAMESPACE]: plugin},
        rules: {[`${ESLINT_PLUGIN_NAMESPACE}/${rule.meta.id}`]: 'error'},
      },
    ];

    const lint = (example) => {
      const messages = linter.verify(example.code, config, example.filename ?? 'example.tsx');
      const unexpected = messages.find((message) => message.ruleId === null);

      if (unexpected) {
        throw new Error(`${rule.meta.id}: example "${example.title}" could not be linted: ${unexpected.message}`);
      }

      return messages;
    };

    const tryLint = (example) => {
      try {
        return lint(example);
      } catch (error) {
        problems.push({message: error.message});
        return null;
      }
    };

    for (const example of rule.examples.valid) {
      count += 1;
      const messages = tryLint(example);

      if (!messages) {
        continue;
      }

      if (messages.length > 0) {
        problems.push({message: `${rule.meta.id}: valid example "${example.title}" reports ${messages.map((message) => message.message).join('; ')}`});
      }
    }

    for (const example of rule.examples.invalid) {
      count += 1;
      const messages = tryLint(example);
      const expected = example.errors ?? 1;

      if (!messages) {
        continue;
      }

      if (messages.length !== expected) {
        problems.push({message: `${rule.meta.id}: invalid example "${example.title}" reports ${messages.length} finding(s), expected ${expected}.`});
        continue;
      }

      if (example.suggestions) {
        const suggestions = messages[0].suggestions ?? [];
        const actual = suggestions.map((suggestion) => ({
          description: suggestion.desc,
          output: example.code.slice(0, suggestion.fix.range[0]) + suggestion.fix.text + example.code.slice(suggestion.fix.range[1]),
        }));

        if (JSON.stringify(actual) !== JSON.stringify(example.suggestions)) {
          problems.push({
            message: `${rule.meta.id}: invalid example "${example.title}" suggests ${JSON.stringify(actual, null, 2)}\n    expected ${JSON.stringify(example.suggestions, null, 2)}`,
          });
          continue;
        }
      }

      const {output} = linter.verifyAndFix(example.code, config, example.filename ?? 'example.tsx');
      const expectedOutput = example.output ?? example.code;

      if (output !== expectedOutput) {
        problems.push({message: `${rule.meta.id}: invalid example "${example.title}" is fixed to:\n      ${output}\n    expected:\n      ${expectedOutput}`});
      }
    }
  }

  return result('Rule examples', `${count - problems.length}/${count} passing`, problems);
}
