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
import { ContextSwitcher } from './ContextSwitcher';
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

describe('ContextSwitcher chain', () => {
  it('shows the first level when nothing is selected', () => {
    render(<Harness />);

    expect(screen.getByRole('button', { name: 'Organization' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Project' })).toBeNull();
    expect(screen.queryByRole('button', { name: /Close/ })).toBeNull();
  });

  it('shows each selected level and the next empty one', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    expect(screen.getByRole('button', { name: 'Organization: WSO2' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Project' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Component' })).toBeNull();
  });

  it('ignores a value whose parent level is empty', () => {
    render(<Harness initial={{ organization: 'wso2', component: 'mis-arr' }} />);

    expect(screen.getByRole('button', { name: 'Organization: WSO2' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Project' })).toBeDefined();
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
    expect(screen.getByRole('button', { name: 'Project' })).toBeDefined();
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

describe('ContextSwitcher panel', () => {
  it('picks an option, closes, and shows the next empty level', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    fireEvent.click(screen.getByRole('button', { name: 'Project' }));
    expect(screen.getByRole('dialog', { name: 'Project' })).toBeDefined();
    expect(screen.getByRole('textbox', { name: 'Search Project' })).toBeDefined();

    fireEvent.click(screen.getByRole('option', { name: 'Finance Web' }));

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Project: Finance Web' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Component' })).toBeDefined();
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
    expect(screen.getByRole('button', { name: 'Project' })).toBeDefined();
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

    fireEvent.click(screen.getByRole('option', { name: 'Personal' }));
    fireEvent.click(screen.getByRole('button', { name: 'Organization: Personal' }));
    expect(screen.getByRole('option', { name: 'Personal', selected: true })).toBeDefined();
  });

  it('keeps a disabled option visible and unselectable', () => {
    render(<Harness initial={{ organization: 'wso2' }} />);

    fireEvent.click(screen.getByRole('button', { name: 'Project' }));
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

    fireEvent.click(screen.getByRole('button', { name: 'Component' }));

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
