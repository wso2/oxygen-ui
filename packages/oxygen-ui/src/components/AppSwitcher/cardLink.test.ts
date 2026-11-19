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

import { describe, expect, it } from 'vitest';
import { closesPopover, isModifiedClick, resolveCardLink, type CardLinkInput } from './cardLink';

const link = (overrides: Partial<CardLinkInput> = {}) =>
  resolveCardLink({ url: 'https://example.com/app', hasHandler: false, current: false, disabled: false, busy: false, ...overrides });

describe('resolveCardLink, the element and its props', () => {
  it('draws a real anchor for a safe URL, opening in a new tab with the reverse-tabnabbing guard', () => {
    expect(link()).toMatchObject({
      element: 'anchor',
      disabled: false,
      props: { component: 'a', href: 'https://example.com/app', target: '_blank', rel: 'noopener noreferrer' },
    });
  });

  it('accepts a relative URL', () => {
    expect(link({ url: '/apps/one' }).props).toMatchObject({ href: '/apps/one' });
  });

  it('opens the current app in the same tab, without the guard it does not need', () => {
    const { props } = link({ current: true });

    expect(props).toMatchObject({ target: '_self' });
    expect(props).not.toHaveProperty('rel');
  });

  it('lets the card choose its target', () => {
    expect(link({ target: '_self' }).props).not.toHaveProperty('rel');
    expect(link({ target: '_blank', current: true }).props).toMatchObject({ target: '_blank', rel: 'noopener noreferrer' });
  });

  it('draws a button when there is no URL to open', () => {
    expect(link({ url: undefined })).toMatchObject({ element: 'button', disabled: false, props: {} });
  });

  it('draws a button for a card that is busy or disabled, even with a URL', () => {
    expect(link({ busy: true })).toMatchObject({ element: 'button', disabled: false });
    expect(link({ disabled: true })).toMatchObject({ element: 'button', disabled: true });
  });
});

describe('resolveCardLink, a URL that could run script', () => {
  it.each(['javascript:alert(1)', ' JaVa\tScript:alert(1)', 'data:text/html,hi', 'vbscript:x'])('does not use %j and disables the card', (url) => {
    expect(link({ url })).toMatchObject({ unsafeUrl: true, disabled: true, element: 'button', props: {} });
  });

  it('does not treat a safe URL as unsafe', () => {
    expect(link({ url: 'http://example.com' }).unsafeUrl).toBe(false);
  });
});

describe('resolveCardLink, a destination that is not there yet', () => {
  it.each([null, '', '   '])('makes a card unavailable and disabled when the URL is %j and nothing else opens it', (url) => {
    expect(link({ url })).toMatchObject({ unavailable: true, disabled: true, element: 'button' });
  });

  it('keeps a card with an onClick available without a URL', () => {
    expect(link({ url: null, hasHandler: true })).toMatchObject({ unavailable: false, disabled: false });
  });

  it('keeps a card with a component available without a URL', () => {
    expect(link({ url: null, component: 'span' })).toMatchObject({ unavailable: false, element: 'component' });
  });
});

describe('resolveCardLink, a consumer component', () => {
  const Router = (() => null) as React.ElementType;

  it('wins over an anchor, and gets the link props after its own', () => {
    expect(link({ component: Router, componentProps: { to: '/x', href: 'ignored' } })).toMatchObject({
      element: 'component',
      props: { component: Router, to: '/x', href: 'https://example.com/app', target: '_blank', rel: 'noopener noreferrer' },
    });
  });

  it('cannot drop the reverse-tabnabbing guard on a _blank target', () => {
    expect(link({ component: Router, componentProps: { rel: 'opener' } }).props).toMatchObject({ rel: 'noopener noreferrer' });
  });

  it('is judged by the target that reaches the element: one in componentProps beats the card\'s own', () => {
    const result = link({ component: Router, current: true, componentProps: { target: '_blank' } });

    expect(result.effectiveTarget).toBe('_blank');
    expect(result.props).toMatchObject({ rel: 'noopener noreferrer' });
  });

  it('is not used by a card that cannot be opened', () => {
    expect(link({ component: Router, busy: true }).element).toBe('button');
  });
});

describe('closesPopover', () => {
  it.each([
    ['the current app opened in this tab', { current: true, effectiveTarget: '_self', modifiedClick: false }, true],
    ['the current app sent to a new tab', { current: true, effectiveTarget: '_blank', modifiedClick: false }, false],
    ['the current app with a modified click', { current: true, effectiveTarget: '_self', modifiedClick: true }, false],
    ['another app, which opens elsewhere', { current: false, effectiveTarget: '_self', modifiedClick: false }, false],
  ])('%s', (_label, input, expected) => {
    expect(closesPopover(input)).toBe(expected);
  });
});

describe('isModifiedClick', () => {
  const click = (overrides = {}) => ({ button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, ...overrides });

  it('is false for a plain primary click and true for another button or any modifier', () => {
    expect(isModifiedClick(click())).toBe(false);
    expect(isModifiedClick(click({ button: 1 }))).toBe(true);
    for (const modifier of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey']) expect(isModifiedClick(click({ [modifier]: true }))).toBe(true);
  });
});
