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
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { ChoreoLabsTheme } from '../../styles/Themes';
import { createOxygenTheme } from '../../utils/createOxygenTheme';
import { ContextSwitcher } from '../ContextSwitcher';
import ComplexSelect, { type ComplexSelectProps } from './ComplexSelect';

const renderSelect = (props: Partial<ComplexSelectProps> = {}, theme = ChoreoLabsTheme) =>
  render(
    <OxygenUIThemeProvider theme={theme}>
      <ComplexSelect value="acme" onChange={() => {}} {...props}>
        <ComplexSelect.MenuItem value="acme">
          <ComplexSelect.MenuItem.Text primary="Acme Corp" secondary="Owner" />
        </ComplexSelect.MenuItem>
      </ComplexSelect>
    </OxygenUIThemeProvider>,
  );

afterEach(() => {
  cleanup();
});

describe('ComplexSelect inside label', () => {
  it('puts the label inside the field by default and hides the secondary text', () => {
    const { container } = renderSelect({ label: 'Organization' });
    const field = container.querySelector('.MuiSelect-select')!;

    expect(field.textContent).toBe('OrganizationAcme Corp');
    expect(field.textContent).not.toContain('Owner');
  });

  it('names the combobox with the label', () => {
    renderSelect({ label: 'Organization' });

    expect(screen.getByRole('combobox', { name: /organization/i })).toBeDefined();
  });

  it('renders no <label>, since the combobox is not a labelable element', () => {
    const { container } = renderSelect({ label: 'Organization' });

    expect(container.querySelectorAll('label')).toHaveLength(0);
  });

  it('keeps a consumer labelId on the element that names the combobox', () => {
    renderSelect({ label: 'Organization', labelId: 'org-label' });

    const combobox = screen.getByRole('combobox', { name: /organization/i });
    expect(combobox.getAttribute('aria-labelledby')?.split(' ')).toContain('org-label');
    expect(document.getElementById('org-label')?.textContent).toBe('Organization');
  });

  it('keeps an aria-label passed through inputProps', () => {
    renderSelect({ label: 'Organization', inputProps: { 'aria-label': 'Choose organization' } });

    expect(screen.getByRole('combobox').getAttribute('aria-label')).toBe('Choose organization');
  });

  it('names a ContextSwitcher level without a <label>', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <ContextSwitcher value={{ organization: 'wso2' }} onChange={() => {}}>
          <ContextSwitcher.Level id="organization" label="Organization">
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>,
    );

    expect(screen.getByRole('combobox', { name: /organization/i })).toBeDefined();
    expect(container.querySelectorAll('label')).toHaveLength(0);
  });
});

// jsdom does not resolve these rules by specificity, so the tests read the CSS emitted for the
// select's own class. The cascade against theme overrides was checked in a browser.
describe('ComplexSelect inside label spacing', () => {
  const renderedCss = () => Array.from(document.querySelectorAll('style')).map((style) => style.textContent).join('');
  const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Returns the bodies of the inside-label padding and margin rules emitted for the field's class.
  const spacingRules = (container: HTMLElement) => {
    const css = renderedCss();
    const classes = Array.from(container.querySelector('.MuiInputBase-root')!.classList).filter((cls) => cls.startsWith('css-'));
    const rulesFor = (selector: (cls: string) => string) =>
      classes.map((cls) => css.match(new RegExp(`${escape(selector(cls))}\\{([^}]*)\\}`))?.[1]).filter(Boolean);

    return {
      padding: rulesFor((cls) => `.${cls}.${cls}.MuiInputBase-root .MuiSelect-select.MuiInputBase-input`),
      margin: rulesFor((cls) => `.${cls} .MuiSelect-select .MuiListItemText-root`),
    };
  };

  it('is 48px tall without the theme single-line padding or the value text margins', () => {
    const { padding, margin } = spacingRules(renderSelect({ label: 'Organization' }).container);

    expect(padding).toEqual([
      `box-sizing:border-box;min-height:48px;padding-top:0;padding-bottom:0;padding-left:${ChoreoLabsTheme.spacing(1.5)};`,
    ]);
    expect(margin).toEqual(['margin-top:0;margin-bottom:0;']);
  });

  it.each([
    ['without a label', {}],
    ['with the label outside', { label: 'Organization', labelAnchor: 'outside' as const }],
    ['with the label on the border', { label: 'Organization', labelAnchor: 'border' as const }],
  ])('keeps the theme padding %s', (_, props) => {
    const { padding, margin } = spacingRules(renderSelect(props).container);

    expect(padding).toEqual([]);
    expect(margin).toEqual([]);
  });
});

describe('ComplexSelect size', () => {
  const inputRoot = (container: HTMLElement) => container.querySelector('.MuiInputBase-root')!;

  it('is small by default, even when the theme makes Select medium', () => {
    const theme = createOxygenTheme({ components: { MuiSelect: { defaultProps: { size: 'medium' } } } });
    const { container } = renderSelect({ label: 'Organization' }, theme);

    expect(inputRoot(container).classList.contains('MuiInputBase-sizeSmall')).toBe(true);
  });

  it('takes its default size from the theme', () => {
    const theme = createOxygenTheme({ components: { MuiComplexSelect: { defaultProps: { size: 'medium' } } } });
    const { container } = renderSelect({ label: 'Organization' }, theme);

    expect(inputRoot(container).classList.contains('MuiInputBase-sizeSmall')).toBe(false);
  });

  it('lets the size prop override the default', () => {
    const { container } = renderSelect({ size: 'medium' });

    expect(inputRoot(container).classList.contains('MuiInputBase-sizeSmall')).toBe(false);
  });
});
