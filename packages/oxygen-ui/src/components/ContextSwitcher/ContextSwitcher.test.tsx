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
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import {
  ContextSwitcher,
  ContextSwitcherGroup,
  ContextSwitcherLevel,
  ContextSwitcherOption,
} from './index';
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

const mockTextWidth = (scroll: number, client: number) => {
  const scrollWidth = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(scroll);
  const clientWidth = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(client);
  return () => {
    scrollWidth.mockRestore();
    clientWidth.mockRestore();
  };
};

const longOrganization = (value: ContextSwitcherValue = { organization: 'long' }) => (
  <OxygenUIThemeProvider>
    <ContextSwitcher value={value} onChange={() => undefined}>
      <ContextSwitcher.Level id="organization" label="Organization">
        <ContextSwitcher.Group label="North American enterprise organizations">
          <ContextSwitcher.Option value="long">
            North American Enterprise Organization
          </ContextSwitcher.Option>
        </ContextSwitcher.Group>
      </ContextSwitcher.Level>
    </ContextSwitcher>
  </OxygenUIThemeProvider>
);

describe('ContextSwitcher truncated names', () => {
  it('shows the full field name when the value is cut off', () => {
    const restore = mockTextWidth(320, 80);
    try {
      render(longOrganization());
      fireEvent.mouseEnter(
        screen.getByRole('button', { name: 'Organization: North American Enterprise Organization' })
      );

      expect(screen.getByRole('tooltip').textContent).toBe(
        'Organization: North American Enterprise Organization'
      );
    } finally {
      restore();
    }
  });

  it('stays quiet when the field name fits', () => {
    const restore = mockTextWidth(80, 80);
    try {
      render(<Harness initial={{ organization: 'wso2' }} />);
      fireEvent.mouseEnter(screen.getByRole('button', { name: 'Organization: WSO2' }));

      expect(screen.queryByRole('tooltip')).toBeNull();
    } finally {
      restore();
    }
  });

  it('shows the full option name when the option is cut off', async () => {
    const restore = mockTextWidth(320, 80);
    try {
      render(longOrganization({}));
      fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
      const option = screen.getByRole('option', { name: 'North American Enterprise Organization' });

      fireEvent.mouseEnter(option);
      expect(screen.getByRole('tooltip').textContent).toBe('North American Enterprise Organization');

      fireEvent.mouseLeave(option);
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).toBeNull();
      });

      fireEvent.focus(option);
      expect(screen.getByRole('tooltip').textContent).toBe('North American Enterprise Organization');
      expect(option.getAttribute('aria-label')).toBeNull();
    } finally {
      restore();
    }
  });

  it('shows the full group name when the group label is cut off', () => {
    const restore = mockTextWidth(320, 80);
    try {
      render(longOrganization({}));
      fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
      fireEvent.mouseEnter(
        screen.getByText('North American enterprise organizations', { selector: 'span' })
      );

      expect(screen.getByRole('tooltip').textContent).toBe(
        'North American enterprise organizations'
      );
      expect(
        screen.getByRole('group', { name: 'North American enterprise organizations' })
      ).toBeDefined();
    } finally {
      restore();
    }
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

  it('moves focus to Show Project after that level is closed', () => {
    render(<Harness initial={{ organization: 'wso2', project: 'finance-web' }} />);
    const close = screen.getByRole('button', { name: 'Close Project' });

    close.focus();
    fireEvent.click(close);

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Show Project' }));
  });

  it('moves focus to Show Project after an empty level is hidden', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);
    show('Project');
    const hide = screen.getByRole('button', { name: 'Hide Project' });

    hide.focus();
    fireEvent.click(hide);

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Show Project' }));
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

  it('does not bring back a level that was picked and then cleared by its parent', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    show('Project');
    fireEvent.click(screen.getByRole('option', { name: 'Finance Web' }));
    fireEvent.click(screen.getByRole('button', { name: 'Organization: WSO2' }));
    fireEvent.click(screen.getByRole('option', { name: 'Demo Organization' }));

    expect(screen.getByRole('button', { name: 'Organization: Demo Organization' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Hide Project' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();
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

  it('keeps Escape from also dismissing a parent dialog', () => {
    const onParentKeyDown = vi.fn();
    render(
      <div onKeyDown={onParentKeyDown}>
        <Harness />
      </div>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Search Organization' }), { key: 'Escape' });

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(onParentKeyDown).not.toHaveBeenCalled();
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
  it('lets Tab leave the panel', () => {
    render(
      <>
        <Harness />
        <button type="button">After the chain</button>
      </>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    const search = screen.getByRole('textbox', { name: 'Search Organization' });
    const list = screen.getByRole('listbox', { name: 'Organization' });
    const after = screen.getByRole('button', { name: 'After the chain' });

    list.focus();
    expect(fireEvent.keyDown(list, { key: 'Tab' })).toBe(true);
    expect(document.activeElement).toBe(list);

    search.focus();
    expect(fireEvent.keyDown(search, { key: 'Tab', shiftKey: true })).toBe(true);
    expect(document.activeElement).toBe(search);

    expect(list.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
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
  it('points the open field at its dialog', () => {
    render(<Harness />);
    const organization = screen.getByRole('button', { name: 'Organization' });

    expect(organization.getAttribute('aria-expanded')).toBe('false');
    expect(organization.getAttribute('aria-haspopup')).toBe('dialog');
    expect(organization.getAttribute('aria-controls')).toBeNull();

    fireEvent.click(organization);

    const dialog = screen.getByRole('dialog', { name: 'Organization' });
    expect(organization.getAttribute('aria-expanded')).toBe('true');
    expect(organization.getAttribute('aria-controls')).toBe(dialog.id);
    expect(dialog.getAttribute('aria-modal')).toBeNull();
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

describe('ContextSwitcher', () => {
  it('offers no show control while the first level is empty', () => {
    render(<Harness />);

    expect(screen.queryByRole('button', { name: /Show / })).toBeNull();
  });

  it('reads levels wrapped in a fragment', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{ organization: 'wso2' }} onChange={() => undefined}>
          <>
            <ContextSwitcherLevel id="organization" label="Organization">
              <ContextSwitcherOption value="wso2">WSO2</ContextSwitcherOption>
            </ContextSwitcherLevel>
            <ContextSwitcherLevel id="project" label="Project">
              <ContextSwitcherOption value="finance-web">Finance Web</ContextSwitcherOption>
            </ContextSwitcherLevel>
          </>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(screen.getByRole('button', { name: 'Organization: WSO2' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();
  });

  it('ignores a level that is wrapped in another component', () => {
    const Wrapped = () => (
      <ContextSwitcherLevel id="organization" label="Organization">
        <ContextSwitcherOption value="wso2">WSO2</ContextSwitcherOption>
      </ContextSwitcherLevel>
    );

    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{}} onChange={() => undefined}>
          <Wrapped />
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(screen.queryByRole('button', { name: 'Organization' })).toBeNull();
  });

  it('treats an empty-string selection as no selection', () => {
    render(<Harness initial={{ organization: '' }} />);

    expect(screen.getByRole('button', { name: 'Organization' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Show Project' })).toBeNull();
  });

  it('drops a value that does not belong to a level', () => {
    const onChange = vi.fn();
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{ organization: 'wso2', extra: 'nope' }} onChange={onChange}>
          <ContextSwitcherLevel id="organization" label="Organization">
            <ContextSwitcherOption value="personal">Personal</ContextSwitcherOption>
          </ContextSwitcherLevel>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization: wso2' }));
    fireEvent.click(screen.getByRole('option', { name: 'Personal' }));

    expect(onChange).toHaveBeenCalledWith({ organization: 'personal' });
  });

  it('closes a deeper panel when that level leaves the chain', () => {
    render(
      <Harness initial={{ organization: 'wso2', project: 'finance-web', component: 'mis-arr' }} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Component: MIS ARR Backend' }));
    expect(screen.getByRole('dialog', { name: 'Component' })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Organization: WSO2' }));
    fireEvent.click(screen.getByRole('option', { name: 'Demo Organization' }));

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByRole('button', { name: /Component/ })).toBeNull();
  });

  it('hides the show control icon from assistive tech', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);
    const showProject = screen.getByRole('button', { name: 'Show Project' });

    expect(showProject.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('ContextSwitcher.Level', () => {
  it('must be rendered inside the chain', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() =>
      render(
        <OxygenUIThemeProvider>
          <ContextSwitcherLevel id="organization" label="Organization" />
        </OxygenUIThemeProvider>
      )
    ).toThrow('ContextSwitcher.Level must be rendered inside ContextSwitcher');

    consoleError.mockRestore();
  });

  it('shows the raw value when no option has that value', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{ organization: 'retired' }} onChange={() => undefined}>
          <ContextSwitcherLevel id="organization" label="Organization">
            <ContextSwitcherOption value="wso2">WSO2</ContextSwitcherOption>
          </ContextSwitcherLevel>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(screen.getByRole('button', { name: 'Organization: retired' })).toBeDefined();
  });

  it('closes an empty revealed level without changing the selection', () => {
    const onChange = vi.fn();
    render(<Harness initial={{ organization: 'wso2' }} onChange={onChange} />);

    show('Project');
    fireEvent.click(screen.getByRole('button', { name: 'Close Project' }));

    expect(onChange).toHaveBeenCalledWith({ organization: 'wso2' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Project' })).toBeDefined();
  });

  it('moves between enabled options with Home, End, and the arrow keys', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{}} onChange={() => undefined}>
          <ContextSwitcherLevel id="organization" label="Organization">
            <ContextSwitcherOption value="personal">Personal</ContextSwitcherOption>
            <ContextSwitcherOption value="wso2">WSO2</ContextSwitcherOption>
          </ContextSwitcherLevel>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    const search = screen.getByRole('textbox', { name: 'Search Organization' });
    const personal = screen.getByRole('option', { name: 'Personal' });
    const wso2 = screen.getByRole('option', { name: 'WSO2' });

    fireEvent.keyDown(search, { key: 'Home' });
    expect(document.activeElement).toBe(personal);

    fireEvent.keyDown(personal, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(wso2);

    fireEvent.keyDown(wso2, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(wso2);

    fireEvent.keyDown(wso2, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(personal);

    search.focus();
    fireEvent.keyDown(search, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(wso2);

    search.focus();
    fireEvent.keyDown(search, { key: 'End' });
    expect(document.activeElement).toBe(wso2);
  });
});

describe('ContextSwitcher.Group', () => {
  it('must be rendered inside a level', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() =>
      render(
        <ContextSwitcherGroup label="Invited organizations">
          <ContextSwitcherOption value="wso2">WSO2</ContextSwitcherOption>
        </ContextSwitcherGroup>
      )
    ).toThrow('ContextSwitcher.Option and ContextSwitcher.Group must be rendered inside a level');

    consoleError.mockRestore();
  });

  it('keeps the group when one of its options still matches', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Search Organization' }), {
      target: { value: 'wso' },
    });

    expect(screen.getByRole('group', { name: 'Invited organizations' })).toBeDefined();
    expect(screen.getByRole('option', { name: 'WSO2' })).toBeDefined();
    expect(screen.queryByRole('option', { name: 'Demo Organization' })).toBeNull();
    expect(screen.queryByRole('option', { name: 'Personal' })).toBeNull();
  });

  it('omits a group that contains no options', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{}} onChange={() => undefined}>
          <ContextSwitcherLevel id="organization" label="Organization">
            <ContextSwitcherGroup label="Notes">
              <span>Not a choice</span>
            </ContextSwitcherGroup>
            <ContextSwitcherOption value="personal">Personal</ContextSwitcherOption>
          </ContextSwitcherLevel>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));

    expect(screen.queryByRole('group', { name: 'Notes' })).toBeNull();
    expect(screen.queryByText('Not a choice')).toBeNull();
    expect(screen.getByRole('option', { name: 'Personal' })).toBeDefined();
  });
});

describe('ContextSwitcher.Option', () => {
  it('must be rendered inside a level', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => render(<ContextSwitcherOption value="wso2">WSO2</ContextSwitcherOption>)).toThrow(
      'ContextSwitcher.Option and ContextSwitcher.Group must be rendered inside a level'
    );

    consoleError.mockRestore();
  });

  it('uses the nested label for search and for the field name', () => {
    const onChange = vi.fn();
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{}} onChange={onChange}>
          <ContextSwitcherLevel id="organization" label="Organization">
            <ContextSwitcherOption value="wso2">
              <em>WSO2</em> Cloud
            </ContextSwitcherOption>
          </ContextSwitcherLevel>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Search Organization' }), {
      target: { value: 'cloud' },
    });
    fireEvent.click(screen.getByRole('option', { name: 'WSO2 Cloud' }));

    expect(onChange).toHaveBeenCalledWith({ organization: 'wso2' });
  });

  it('stays out of the tab order and is unmarked when it can be picked', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Organization' }));
    const personal = screen.getByRole('option', { name: 'Personal' });

    expect(personal.getAttribute('tabindex')).toBe('-1');
    expect(personal.getAttribute('aria-disabled')).toBeNull();
    expect(personal.getAttribute('aria-selected')).toBe('false');
  });

  it('ignores Enter and Space when the option is disabled', () => {
    const onChange = vi.fn();
    render(<Harness initial={{ organization: 'wso2' }} onChange={onChange} />);

    show('Project');
    const sales = screen.getByRole('option', { name: 'Sales' });
    fireEvent.keyDown(sales, { key: 'Enter' });
    fireEvent.keyDown(sales, { key: ' ' });

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog', { name: 'Project' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Project' })).toBeDefined();
  });
});
