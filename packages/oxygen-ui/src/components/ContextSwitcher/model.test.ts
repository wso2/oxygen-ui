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

import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { ContextSwitcherGroup } from './ContextSwitcherGroup';
import { ContextSwitcherOption } from './ContextSwitcherOption';
import { chainState, optionsOf, parseLevelChildren } from './model';

const ids = ['org', 'project', 'env'];

describe('chainState', () => {
  it('has nothing on screen without levels', () => {
    expect(chainState([], {}, null, false)).toEqual({
      currentIndex: -1,
      openEmptyId: null,
      visibleCount: 0,
      backIndex: -1,
    });
    expect(chainState([], {}, 'org', true).visibleCount).toBe(0);
  });

  it('shows the chain and the next empty level when Back is off', () => {
    const state = chainState(ids, { org: 'a' }, null, false);
    expect(state.visibleCount).toBe(2);
    expect(state.currentIndex).toBe(0);
    expect(state.backIndex).toBe(-1);
  });

  it('shows only the chain when Back is on, and joins Back to the last chosen level', () => {
    const state = chainState(ids, { org: 'a', project: 'b' }, null, true);
    expect(state.visibleCount).toBe(2);
    expect(state.backIndex).toBe(1);
  });

  it('shows the first level even when nothing is chosen', () => {
    expect(chainState(ids, {}, null, true).visibleCount).toBe(1);
    expect(chainState(ids, {}, null, false).visibleCount).toBe(1);
  });

  it('shows an empty level only while its list is open, when Back is on', () => {
    const value = { org: 'a' };
    const open = chainState(ids, value, 'project', true);
    expect(open.openEmptyId).toBe('project');
    expect(open.visibleCount).toBe(2);
    expect(open.backIndex).toBe(1);
    expect(chainState(ids, value, null, true).openEmptyId).toBeNull();
  });

  it('ignores an open level that is not in the chain yet or does not exist', () => {
    expect(chainState(ids, { org: 'a' }, 'env', false).currentIndex).toBe(0);
    expect(chainState(ids, { org: 'a' }, 'nope', false).currentIndex).toBe(0);
  });

  it('never shows more levels than there are', () => {
    expect(chainState(ids, { org: 'a', project: 'b', env: 'c' }, null, false).visibleCount).toBe(3);
  });
});

const option = (value: string) => React.createElement(ContextSwitcherOption, { key: value, value }, value);

describe('parseLevelChildren', () => {
  it('keeps loose options and groups in order, looking inside fragments', () => {
    const entries = parseLevelChildren(
      React.createElement(
        React.Fragment,
        null,
        option('a'),
        React.createElement(ContextSwitcherGroup, { label: 'G' }, option('b'), option('c'))
      )
    );
    expect(entries.map((entry) => entry.kind)).toEqual(['option', 'group']);
    expect(optionsOf(entries).map((o) => o.props.value)).toEqual(['a', 'b', 'c']);
  });

  it('leaves out a group with no options, and anything that is not an option or a group', () => {
    const entries = parseLevelChildren([
      React.createElement(ContextSwitcherGroup, { key: 'g', label: 'Empty' }),
      React.createElement('div', { key: 'd' }),
      'text',
      option('a'),
    ]);
    expect(entries).toHaveLength(1);
    expect(optionsOf(entries)).toHaveLength(1);
  });
});
