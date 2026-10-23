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

import {fileURLToPath} from 'url';
import {describe, expect, it} from 'vitest';
import * as registry from '../../src/index.ts';
import {readOwnedApi} from './api.js';
import {checkComponents, checkRuleExamples, checkRuleSources, describeApiChanges} from './checks.js';

const FIXTURE = fileURLToPath(new URL('../test/fixtures/api-package', import.meta.url));

const catalogWith = (overrides) => ({...registry.catalog, components: [], waivers: [], ...overrides});
const entry = (name, exports = [name], extra = {}) => ({name, kind: 'component', exports, summary: `${name}.`, ...extra});

describe('readOwnedApi', () => {
  const api = readOwnedApi({packageDir: FIXTURE});

  it('returns only values the package declares itself, not re-exports or types', () => {
    expect([...api.keys()]).toEqual(['Card', 'useCard', 'version']);
  });

  it('records a component\'s own props, without inherited ones', () => {
    expect(api.get('Card').props).toEqual(['elevation?', 'title']);
  });

  it('records compound sub-components with their props', () => {
    expect(api.get('Card').members).toEqual({Header: ['children']});
  });

  it('records no props for hooks and constants', () => {
    expect(api.get('useCard')).toEqual({});
    expect(api.get('version')).toEqual({});
  });
});

describe('checkComponents', () => {
  const api = {'@wso2/oxygen-ui': {Card: {}, useCard: {}, version: {}}};

  it('passes when every export is catalogued or waived', () => {
    const result = checkComponents(
      {rules: [], catalog: catalogWith({components: [entry('Card', ['Card', 'useCard'])], waivers: [{export: 'version', reason: 'Metadata.'}]})},
      api,
    );

    expect(result.problems).toEqual([]);
    expect(result.passed).toBe(true);
  });

  it('fails for a new export without an entry', () => {
    const result = checkComponents({rules: [], catalog: catalogWith({components: [entry('Card')]})}, api);

    expect(result.problems.map((problem) => problem.message)).toEqual([
      'New export "useCard" from @wso2/oxygen-ui has no catalog entry.',
      'New export "version" from @wso2/oxygen-ui has no catalog entry.',
    ]);
  });

  it('fails for catalogued exports that do not exist, duplicates and placeholders', () => {
    const result = checkComponents(
      {
        rules: [],
        catalog: catalogWith({
          components: [entry('Card', ['Card', 'useCard', 'version']), entry('Dialog', ['Dialog', 'Card'], {summary: 'TODO: what it is for.'})],
        }),
      },
      api,
    );

    expect(result.problems.map((problem) => problem.message)).toEqual([
      'Component Dialog has a placeholder summary.',
      '"Dialog" (catalog entry Dialog) is not exported by @wso2/oxygen-ui.',
      '"Card" is listed in both the Card and Dialog entries.',
    ]);
  });
});

describe('checkRuleSources', () => {
  it('fails for rules whose sources are not in the catalog', () => {
    const [rule] = registry.rules;
    const result = checkRuleSources({
      catalog: registry.catalog,
      rules: [{...rule, meta: {...rule.meta, sources: [{type: 'guide', id: 'Guides/Missing'}]}}],
    });

    expect(result.problems.map((problem) => problem.message)).toEqual([
      `Rule ${rule.meta.id} refers to guide "Guides/Missing", which is not in the catalog.`,
    ]);
  });

  it('passes for the registry', () => {
    expect(checkRuleSources(registry).problems).toEqual([]);
  });
});

describe('checkRuleExamples', () => {
  it('passes for the registry', () => {
    expect(checkRuleExamples(registry).problems).toEqual([]);
  });

  it('fails when an example\'s expected fix is wrong', () => {
    const rule = registry.rules.find((candidate) => candidate.meta.id === 'no-direct-lucide-imports');
    const broken = {
      ...rule,
      examples: {...rule.examples, invalid: [{...rule.examples.invalid[0], output: "import {Home} from 'somewhere-else';"}]},
    };

    expect(checkRuleExamples({...registry, rules: [broken]}).passed).toBe(false);
  });
});

describe('describeApiChanges', () => {
  it('names added, removed and changed props and members', () => {
    const before = {'@wso2/oxygen-ui': {Card: {props: ['title'], members: {Header: ['children']}}, Old: {}}};
    const after = {'@wso2/oxygen-ui': {Card: {props: ['title', 'variant?'], members: {Header: [], Footer: []}}, New: {}}};

    expect(describeApiChanges(before, after)).toBe(
      'API changes: Card props +variant?; Card members +Footer; Card.Header props -children; added New; removed Old.',
    );
  });
});
