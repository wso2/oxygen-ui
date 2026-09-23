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
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { ContextSwitcher } from './index';
import type { ContextSwitcherValue } from './context';

const Harness = ({
  initial = {},
  loading = false,
  onChange,
}: {
  initial?: ContextSwitcherValue;
  loading?: boolean;
  onChange?: (value: ContextSwitcherValue) => void;
}) => {
  const [value, setValue] = React.useState(initial);
  return (
    <OxygenUIThemeProvider>
      <ContextSwitcher
        value={value}
        onChange={(next) => {
          onChange?.(next);
          setValue(next);
        }}
      >
        <ContextSwitcher.Level id="organization" label="Organization">
          <ContextSwitcher.Group label="Invited organizations">
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
            <ContextSwitcher.Option value="demo">Demo Organization</ContextSwitcher.Option>
          </ContextSwitcher.Group>
          <ContextSwitcher.Option value="personal">Personal</ContextSwitcher.Option>
        </ContextSwitcher.Level>
        <ContextSwitcher.Level id="project" label="Project">
          <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
          <ContextSwitcher.Option value="sales" disabled>
            Sales
          </ContextSwitcher.Option>
        </ContextSwitcher.Level>
        <ContextSwitcher.Level id="component" label="Component" loading={loading}>
          <ContextSwitcher.Option value="mis-arr">MIS ARR Backend</ContextSwitcher.Option>
        </ContextSwitcher.Level>
      </ContextSwitcher>
    </OxygenUIThemeProvider>
  );
};

afterEach(() => {
  cleanup();
});

const show = (label: string) => {
  fireEvent.click(screen.getByRole('button', { name: `Show ${label}` }));
};

describe('ContextSwitcher chain', () => {
  it('shows the first level when nothing is selected', () => {
    render(<Harness />);

    expect(screen.getByRole('button', { name: 'Organization' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.queryByRole('button', { name: /Close/ })).toBeNull();
  });

  it('shows the next level only after the chevron is used', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    expect(screen.getByRole('button', { name: 'Organization: WSO2' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();

    show('Project');

    expect(screen.getByRole('button', { name: 'Project' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Hide Project' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Component' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Hide Project' }));
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();
  });

  it('ignores a value whose parent level is empty', () => {
    render(<Harness initial={{ organization: 'wso2', component: 'mis-arr' }} />);

    expect(screen.getByRole('button', { name: 'Organization: WSO2' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();
    expect(screen.queryByRole('button', { name: /Component/ })).toBeNull();
  });

  it('keeps the full value in the accessible name', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{ organization: 'long' }} onChange={() => undefined}>
          <ContextSwitcher.Level id="organization" label="Organization">
            <ContextSwitcher.Option value="long">
              North American Enterprise Organization
            </ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(
      screen.getByRole('button', { name: 'Organization: North American Enterprise Organization' })
    ).toBeDefined();
  });
});

describe('ContextSwitcher close', () => {
  it('puts a close button on every selected level after the first', () => {
    render(
      <Harness
        initial={{ organization: 'wso2', project: 'finance-web', component: 'mis-arr' }}
      />
    );

    expect(screen.queryByRole('button', { name: 'Close Organization' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Close Project' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Close Component' })).toBeDefined();
  });

  it('clears that level and every level under it', () => {
    render(
      <Harness
        initial={{ organization: 'wso2', project: 'finance-web', component: 'mis-arr' }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close Project' }));

    expect(screen.getByRole('button', { name: 'Organization: WSO2' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();
    expect(screen.queryByRole('button', { name: /Component/ })).toBeNull();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('lets a product keep a later level required and clear the first level', () => {
    const onChange = vi.fn();
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher
          value={{ organization: 'wso2', project: 'finance-web' }}
          onChange={onChange}
        >
          <ContextSwitcher.Level id="organization" label="Organization" clearable>
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          </ContextSwitcher.Level>
          <ContextSwitcher.Level id="project" label="Project" clearable={false}>
            <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(screen.queryByRole('button', { name: 'Close Project' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Close Organization' }));
    expect(onChange).toHaveBeenCalledWith({});
  });
});

const declaredProperty = (element: Element, property: 'boxShadow' | 'outline'): string[] => {
  const classNames = Array.from(element.classList);
  const values: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let cssRules: CSSRuleList;
    try {
      cssRules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(cssRules)) {
      if (!(rule instanceof CSSStyleRule)) {
        continue;
      }
      if (!classNames.some((className) => rule.selectorText.includes(`.${className}`))) {
        continue;
      }
      const value = rule.style[property];
      if (value) {
        values.push(value);
      }
    }
  }
  return values;
};

const boxShadowsFor = (element: Element): string[] => declaredProperty(element, 'boxShadow');

describe('ContextSwitcher panel', () => {
  it('draws the open ring around the field and its close button', () => {
    render(<Harness initial={{ organization: 'wso2', project: 'finance-web' }} />);

    fireEvent.click(screen.getByRole('button', { name: 'Project: Finance Web' }));

    const close = screen.getByRole('button', { name: 'Close Project' });
    const field = close.parentElement;
    expect(field).not.toBeNull();
    expect(field?.contains(screen.getByRole('button', { name: 'Project: Finance Web' }))).toBe(true);
    expect(boxShadowsFor(field as Element).some((shadow) => shadow.includes('2px'))).toBe(true);
  });

  it('keeps the open panel outside the field it is anchored to', () => {
    render(<Harness />);
    const fieldButton = screen.getByRole('button', { name: 'Organization' });

    fireEvent.click(fieldButton);

    const dialog = screen.getByRole('dialog', { name: 'Organization' });
    expect(fieldButton.parentElement?.contains(dialog)).toBe(false);
  });

  it('places a panel that opens with its level under that level', () => {
    const original = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
      const trigger = this.querySelector(':scope > button[aria-haspopup="dialog"]');
      const name = trigger?.getAttribute('aria-label') ?? '';
      if (name.startsWith('Project')) {
        return new DOMRect(220, 8, 180, 48);
      }
      if (name.startsWith('Organization')) {
        return new DOMRect(16, 8, 180, 48);
      }
      return original.call(this);
    };

    try {
      render(<Harness initial={{ organization: 'wso2' }} />);
      show('Project');

      const popper = screen.getByRole('dialog', { name: 'Project' }).parentElement as HTMLElement;
      const translateX = Number(
        /translate(?:3d)?\(\s*(-?\d+(?:\.\d+)?)px/.exec(popper.style.transform)?.[1]
      );
      expect(popper.style.position).toBe('absolute');
      expect(translateX).toBeGreaterThanOrEqual(200);
      expect(translateX).toBeLessThan(240);
    } finally {
      HTMLElement.prototype.getBoundingClientRect = original;
    }
  });

  it('picks an option, closes, and offers the next level', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    show('Project');
    expect(screen.getByRole('dialog', { name: 'Project' })).toBeDefined();
    expect(screen.getByRole('textbox', { name: 'Search Project' })).toBeDefined();

    fireEvent.click(screen.getByRole('option', { name: 'Finance Web' }));

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Project: Finance Web' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Component' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Component' })).toBeDefined();

    show('Component');
    expect(screen.getByRole('button', { name: 'Component' })).toBeDefined();
    expect(screen.getByRole('dialog', { name: 'Component' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Show Component' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Hide Component' })).toBeNull();
  });

  it('clears deeper levels when a parent option changes', () => {
    render(
      <Harness
        initial={{ organization: 'wso2', project: 'finance-web', component: 'mis-arr' }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization: WSO2' }));
    fireEvent.click(screen.getByRole('option', { name: 'Demo Organization' }));

    expect(screen.getByRole('button', { name: 'Organization: Demo Organization' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();
    expect(screen.queryByRole('button', { name: /Component/ })).toBeNull();
  });

  it('does not report a change when the current option is picked again', () => {
    const onChange = vi.fn();
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{ organization: 'wso2' }} onChange={onChange}>
          <ContextSwitcher.Level id="organization" label="Organization">
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization: WSO2' }));
    fireEvent.click(screen.getByRole('option', { name: 'WSO2' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('lists ungrouped options before groups and marks the current option', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    const options = screen.getAllByRole('option').map((option) => option.textContent);
    expect(options).toEqual(['Personal', 'WSO2', 'Demo Organization']);
    expect(screen.getByRole('group', { name: 'Invited organizations' })).toBeDefined();
    expect(screen.getByRole('listbox', { name: 'Organization' }).getAttribute('tabindex')).toBe('0');

    fireEvent.click(screen.getByRole('option', { name: 'Personal' }));
    fireEvent.click(screen.getByRole('button', { name: 'Organization: Personal' }));
    expect(screen.getByRole('option', { name: 'Personal', selected: true })).toBeDefined();
  });

  it('keeps a disabled option visible and unselectable', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    show('Project');
    const sales = screen.getByRole('option', { name: 'Sales' });
    expect(sales.getAttribute('aria-disabled')).toBe('true');

    fireEvent.click(sales);

    expect(screen.getByRole('dialog', { name: 'Project' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Project' })).toBeDefined();
  });

  it('filters options and hides groups with no matches', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Search Organization' }), {
      target: { value: 'demo' },
    });

    expect(screen.queryByRole('option', { name: 'Personal' })).toBeNull();
    expect(screen.queryByRole('option', { name: 'WSO2' })).toBeNull();
    expect(screen.getByRole('option', { name: 'Demo Organization' })).toBeDefined();
    expect(screen.getByRole('group', { name: 'Invited organizations' })).toBeDefined();

    fireEvent.change(screen.getByRole('textbox', { name: 'Search Organization' }), {
      target: { value: 'zzz' },
    });

    expect(screen.getByText('No matches')).toBeDefined();
    expect(screen.queryByRole('option')).toBeNull();
    expect(screen.queryByRole('group', { name: 'Invited organizations' })).toBeNull();

    fireEvent.change(screen.getByRole('textbox', { name: 'Search Organization' }), {
      target: { value: '   ' },
    });
    expect(screen.getByText('No matches')).toBeDefined();
  });

  it('says when a level has no options', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{}} onChange={() => undefined}>
          <ContextSwitcher.Level id="organization" label="Organization" />
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    expect(screen.getByText('No options')).toBeDefined();
  });

  it('shows a progress indicator while a level is loading', () => {
    render(<Harness initial={{ organization: 'wso2', project: 'finance-web' }} loading />);

    show('Component');

    expect(screen.getByRole('progressbar', { name: 'Loading Component' })).toBeDefined();
    expect(screen.queryByRole('option', { name: 'MIS ARR Backend' })).toBeNull();
  });

  it('selects the first matching option from the keyboard', () => {
    const onChange = vi.fn();
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{}} onChange={onChange}>
          <ContextSwitcher.Level id="organization" label="Organization">
            <ContextSwitcher.Option value="personal">Personal</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Search Organization' }), {
      key: 'ArrowDown',
    });
    fireEvent.keyDown(screen.getByRole('option', { name: 'Personal' }), { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith({ organization: 'personal' });
  });
});

describe('ContextSwitcher dismissal', () => {
  it('keeps the open panel inside the chain', () => {
    const root = React.createRef<HTMLDivElement>();
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher ref={root} value={{}} onChange={() => undefined}>
          <ContextSwitcher.Level id="organization" label="Organization">
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));

    expect(root.current?.contains(screen.getByRole('dialog', { name: 'Organization' }))).toBe(true);
  });

  it('moves focus to the field that just opened', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    show('Project');
    fireEvent.click(screen.getByRole('button', { name: 'Organization: WSO2' }));

    expect(document.activeElement).toBe(
      screen.getByRole('textbox', { name: 'Search Organization' })
    );
  });

  it('closes on a second click, Escape, and an outside click', async () => {
    render(<Harness />);
    const organization = screen.getByRole('button', { name: 'Organization' });

    fireEvent.click(organization);
    expect(screen.getByRole('dialog', { name: 'Organization' })).toBeDefined();
    fireEvent.click(organization);
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(organization);
    fireEvent.keyDown(screen.getByRole('dialog', { name: 'Organization' }), { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(organization);
    // Click-away ignores the same turn as the open, the same way a second click cannot land yet.
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    });
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('keeps only one panel open', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    show('Project');
    fireEvent.click(screen.getByRole('button', { name: 'Organization: WSO2' }));
    fireEvent.click(screen.getByRole('button', { name: 'Project' }));

    expect(screen.queryByRole('dialog', { name: 'Organization' })).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Project' })).toBeDefined();
  });

  it('returns focus to the field that opened the panel', () => {
    render(<Harness />);
    const organization = screen.getByRole('button', { name: 'Organization' });

    fireEvent.click(organization);
    fireEvent.keyDown(screen.getByRole('dialog', { name: 'Organization' }), { key: 'Escape' });

    expect(document.activeElement).toBe(organization);
  });
});

describe('ContextSwitcher visibility', () => {
  it('does not draw a focus ring on the option list', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    const list = screen.getByRole('listbox', { name: 'Organization' });
    list.focus();

    expect(declaredProperty(list, 'outline')).toContain('none');
    expect(document.activeElement).toBe(list);
  });

  it('keeps the field ring while the option list is focused', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    show('Project');
    screen.getByRole('listbox', { name: 'Project' }).focus();

    const close = screen.getByRole('button', { name: 'Close Project' });
    expect(
      boxShadowsFor(close.parentElement as Element).some((shadow) => shadow.includes('2px'))
    ).toBe(true);
  });
});

describe('ContextSwitcher keyboard', () => {
  it('wraps Tab between the search box and the option list', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    const search = screen.getByRole('textbox', { name: 'Search Organization' });
    const list = screen.getByRole('listbox', { name: 'Organization' });

    list.focus();
    fireEvent.keyDown(list, { key: 'Tab' });
    expect(document.activeElement).toBe(search);

    fireEvent.keyDown(search, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(list);
  });

  it('moves to the last enabled option with End and skips a disabled option', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    show('Project');
    const search = screen.getByRole('textbox', { name: 'Search Project' });
    fireEvent.keyDown(search, { key: 'End' });

    expect(document.activeElement).toBe(screen.getByRole('option', { name: 'Finance Web' }));
    expect(document.activeElement).not.toBe(screen.getByRole('option', { name: 'Sales' }));
  });

  it('selects a focused option with Space', () => {
    const onChange = vi.fn();
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{ organization: 'wso2' }} onChange={onChange}>
          <ContextSwitcher.Level id="organization" label="Organization">
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          </ContextSwitcher.Level>
          <ContextSwitcher.Level id="project" label="Project">
            <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    show('Project');
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Search Project' }), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('option', { name: 'Finance Web' }), { key: ' ' });

    expect(onChange).toHaveBeenCalledWith({ organization: 'wso2', project: 'finance-web' });
  });
});

describe('ContextSwitcher accessibility', () => {
  it('points the open field at its dialog and marks that dialog modal', () => {
    render(<Harness />);
    const organization = screen.getByRole('button', { name: 'Organization' });

    expect(organization.getAttribute('aria-expanded')).toBe('false');
    expect(organization.getAttribute('aria-haspopup')).toBe('dialog');
    expect(organization.getAttribute('aria-controls')).toBeNull();

    fireEvent.click(organization);

    const dialog = screen.getByRole('dialog', { name: 'Organization' });
    expect(organization.getAttribute('aria-expanded')).toBe('true');
    expect(organization.getAttribute('aria-controls')).toBe(dialog.id);
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('names a group once and hides the visible label from assistive tech', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    const group = screen.getByRole('group', { name: 'Invited organizations' });
    const visibleLabel = group.querySelector('[aria-hidden="true"]');

    expect(visibleLabel?.textContent).toBe('Invited organizations');
  });

  it('hides the field chevron from assistive tech', () => {
    render(<Harness />);
    const organization = screen.getByRole('button', { name: 'Organization' });

    expect(organization.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('matches search without regard to case and clears the query when the panel reopens', () => {
    render(<Harness />);
    const organization = screen.getByRole('button', { name: 'Organization' });

    fireEvent.click(organization);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search Organization' }), {
      target: { value: 'DEMO' },
    });
    expect(screen.getByRole('option', { name: 'Demo Organization' })).toBeDefined();
    expect(screen.queryByRole('option', { name: 'WSO2' })).toBeNull();

    fireEvent.keyDown(screen.getByRole('dialog', { name: 'Organization' }), { key: 'Escape' });
    fireEvent.click(organization);

    expect(screen.getByRole('textbox', { name: 'Search Organization' })).toHaveProperty('value', '');
    expect(screen.getByRole('option', { name: 'WSO2' })).toBeDefined();
  });

  it('does not open the panel when the close button is used', () => {
    render(<Harness initial={{ organization: 'wso2', project: 'finance-web' }} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close Project' }));

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();
    expect(screen.queryByRole('button', { name: /Component/ })).toBeNull();
  });
});
