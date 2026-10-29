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

import {RuleTester} from 'eslint';
import parser from '@typescript-eslint/parser';
import {afterAll, describe, expect, it} from 'vitest';
import {getDocSection, rules} from './index.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {ecmaFeatures: {jsx: true}},
  },
});

const REQUIRED_DOC_SECTIONS = ['## Why', '## How to fix'];
// Product and technology names that are capitalised wherever they appear in a title.
const KNOWN_PROPER_NOUNS = new Set(['Oxygen', 'UI', 'MUI', 'Lucide', 'WSO2', 'ESLint', 'React', 'ARIA', 'WCAG']);

describe('rule registry', () => {
  it('has unique rule ids', () => {
    const ids = rules.map((rule) => rule.meta.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe.each(rules.map((rule) => [rule.meta.id, rule] as const))('%s', (id, rule) => {
    it('has a kebab-case id', () => {
      expect(id).toMatch(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/);
    });

    it('has a sentence-case title', () => {
      // Only the first word starts with a capital, apart from names written in code.
      const words = rule.meta.title.replace(/`[^`]*`/g, '').split(/\s+/).slice(1);
      const capitalised = words.filter((word) => /^[A-Z][a-z]/.test(word) && !KNOWN_PROPER_NOUNS.has(word));
      expect(capitalised).toEqual([]);
    });

    it('has a detect implementation only when it is automated', () => {
      expect(Boolean(rule.detect)).toBe(rule.meta.enforcement === 'automated');
    });

    it('lists at least one source', () => {
      expect(rule.meta.sources.length).toBeGreaterThan(0);
    });

    it.each(REQUIRED_DOC_SECTIONS)('documents "%s"', (section) => {
      expect(rule.docs).toContain(section);
    });

    it('has valid and invalid examples', () => {
      expect(rule.examples.valid.length).toBeGreaterThan(0);
      expect(rule.examples.invalid.length).toBeGreaterThan(0);
    });

    if (rule.detect) {
      const detect = rule.detect;

      it('declares the message id of every example with suggestions', () => {
        const withSuggestions = rule.examples.invalid.filter((example) => example.suggestions);
        expect(withSuggestions.every((example) => typeof example.messageId === 'string' && example.errors === 1)).toBe(true);
      });

      it('declares the number of findings for every invalid example', () => {
        expect(rule.examples.invalid.every((example) => typeof example.errors === 'number')).toBe(true);
      });

      describe('examples', () => {
        ruleTester.run(id, detect, {
          valid: rule.examples.valid.map((example) => ({
            name: example.title,
            code: example.code,
            filename: example.filename ?? 'example.tsx',
          })),
          invalid: rule.examples.invalid.map((example) => ({
            name: example.title,
            code: example.code,
            filename: example.filename ?? 'example.tsx',
            // Suggestions are checked on the example's single finding.
            errors: example.suggestions
              ? [
                  {
                    messageId: example.messageId as string,
                    suggestions: example.suggestions.map(({description, output}) => ({desc: description, output})),
                  },
                ]
              : (example.errors ?? 1),
            output: example.output ?? null,
          })),
        });
      });
    }
  });
});

describe('getDocSection', () => {
  const docs = '## Why\n\nBecause.\n\n## How to fix\n\nUse `Box`.\n\n- One\n\n## Exceptions\n\nNone.\n';

  it('returns the text of a section, up to the next heading', () => {
    expect(getDocSection(docs, 'How to fix')).toBe('Use `Box`.\n\n- One');
    expect(getDocSection(docs, 'Exceptions')).toBe('None.');
  });

  it('returns an empty string for a missing section', () => {
    expect(getDocSection(docs, 'Impact')).toBe('');
  });
});
