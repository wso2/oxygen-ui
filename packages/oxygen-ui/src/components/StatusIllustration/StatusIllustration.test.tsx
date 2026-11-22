/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import StatusIllustration, { type StatusIllustrationProps } from './StatusIllustration';
import { STATUS_ILLUSTRATIONS, type StatusIllustrationStatus } from './illustrations';

afterEach(() => {
  cleanup();
});

const renderIllustration = (props: StatusIllustrationProps) =>
  render(
    <OxygenUIThemeProvider>
      <StatusIllustration {...props} />
    </OxygenUIThemeProvider>,
  );

describe('StatusIllustration', () => {
  it.each(Object.keys(STATUS_ILLUSTRATIONS))('renders the %s illustration with its label', key => {
    const status = (Number.isNaN(Number(key)) ? key : Number(key)) as StatusIllustrationStatus;
    renderIllustration({ status });

    expect(screen.getByRole('img', { name: STATUS_ILLUSTRATIONS[status].label })).toBeTruthy();
  });

  it('uses a custom label', () => {
    renderIllustration({ status: 404, label: 'Page missing' });

    expect(screen.getByRole('img', { name: 'Page missing' })).toBeTruthy();
  });

  it('hides a decorative illustration from assistive technology', () => {
    const { container } = renderIllustration({ status: 'no-records', decorative: true });

    expect(screen.queryByRole('img')).toBeNull();
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('keeps the 4:3 aspect ratio when only the width is given', () => {
    const { container } = renderIllustration({ status: 500, width: 200 });
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('width')).toBe('200');
    expect(svg?.getAttribute('height')).toBe('150');
  });

  it('gives each instance its own gradient ids', () => {
    const { container } = render(
      <OxygenUIThemeProvider>
        <StatusIllustration status={404} />
        <StatusIllustration status={404} />
      </OxygenUIThemeProvider>,
    );
    const ids = Array.from(container.querySelectorAll('radialGradient')).map(el => el.id);

    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    const refs = Array.from(container.querySelectorAll('[fill]'))
      .map(el => el.getAttribute('fill') ?? '')
      .filter(fill => fill.startsWith('url(#'))
      .map(fill => fill.slice(5, -1));

    expect(refs).toHaveLength(4);
    refs.forEach(ref => expect(ids).toContain(ref));
  });

  it('renders nothing for an unknown status', () => {
    const { container } = renderIllustration({ status: 418 as StatusIllustrationStatus });

    expect(container.querySelector('svg')).toBeNull();
  });
});
