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
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { ContextSwitcher } from './index';
import type { ContextSwitcherValue } from './context';

const Harness = ({
  initial = {},
  back = false,
  loading = false,
  loadingLabel,
  onChange,
}: {
  initial?: ContextSwitcherValue;
  back?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  onChange?: (value: ContextSwitcherValue) => void;
}) => {
  const [value, setValue] = React.useState(initial);
  return (
    <OxygenUIThemeProvider>
      <ContextSwitcher
        back={back}
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
        <ContextSwitcher.Level id="component" label="Component" loading={loading} loadingLabel={loadingLabel}>
          <ContextSwitcher.Option value="mis-arr">MIS ARR Backend</ContextSwitcher.Option>
        </ContextSwitcher.Level>
      </ContextSwitcher>
    </OxygenUIThemeProvider>
  );
};

afterEach(() => {
  cleanup();
});

const fieldByLabel = (label: string) => {
  // An open MUI menu marks the page aria-hidden, so include hidden comboboxes.
  const combobox = screen.getAllByRole('combobox', {hidden: true}).find((candidate) => {
    const name = candidate.getAttribute('aria-label') ?? '';
    return name === label || name.startsWith(`${label}: `);
  });
  if (!combobox) {
    throw new Error(`No field named ${label}`);
  }
  return combobox;
};

const openLevel = (label: string) => {
  const field = fieldByLabel(label);
  if (field.getAttribute('aria-expanded') !== 'true') {
    fireEvent.mouseDown(field);
  }
};

describe('ContextSwitcher chain', () => {
  it('shows the first level when nothing is selected', () => {
    render(<Harness />);

    expect(fieldByLabel('Organization')).toBeDefined();
    expect(screen.queryByRole('combobox', {name: /Project/})).toBeNull();
  });

  it('shows the next empty level once the level above it has a selection', () => {
    render(<Harness initial={{organization: 'wso2'}} />);

    expect(fieldByLabel('Organization').getAttribute('aria-label')).toBe('Organization: WSO2');
    expect(screen.getByText('/')).toBeDefined();
    expect(fieldByLabel('Project').getAttribute('aria-label')).toBe('Project: Select project');
    expect(screen.queryByRole('combobox', {name: /Component/})).toBeNull();
  });

  it('ignores a value whose parent level is empty', () => {
    render(<Harness initial={{organization: 'wso2', component: 'mis-arr'}} />);

    expect(fieldByLabel('Organization')).toBeDefined();
    expect(fieldByLabel('Project')).toBeDefined();
    expect(screen.queryByRole('combobox', {name: /Component/})).toBeNull();
  });

  it('keeps the full value in the accessible name', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{organization: 'long'}} onChange={() => undefined}>
          <ContextSwitcher.Level id="organization" label="Organization">
            <ContextSwitcher.Option value="long">North American Enterprise Organization</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(fieldByLabel('Organization').getAttribute('aria-label')).toBe(
      'Organization: North American Enterprise Organization'
    );
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

describe('ContextSwitcher truncated names', () => {
  it('shows the full field name when the value is cut off', () => {
    const restore = mockTextWidth(320, 80);
    try {
      render(
        <OxygenUIThemeProvider>
          <ContextSwitcher value={{organization: 'long'}} onChange={() => undefined}>
            <ContextSwitcher.Level id="organization" label="Organization">
              <ContextSwitcher.Option value="long">
                North American Enterprise Organization
              </ContextSwitcher.Option>
            </ContextSwitcher.Level>
          </ContextSwitcher>
        </OxygenUIThemeProvider>
      );
      fireEvent.mouseEnter(fieldByLabel('Organization').closest('div')!);

      expect(screen.getByRole('tooltip').textContent).toBe(
        'Organization: North American Enterprise Organization'
      );
    } finally {
      restore();
    }
  });
});

describe('ContextSwitcher back', () => {
  it('shows the current level and names the level Back returns to', () => {
    render(<Harness initial={{organization: 'wso2', project: 'finance-web', component: 'mis-arr'}} back />);

    expect(fieldByLabel('Component').getAttribute('aria-label')).toBe('Component: MIS ARR Backend');
    expect(screen.queryByRole('combobox', {name: /Organization/})).toBeNull();
    expect(screen.queryByRole('combobox', {name: /Project/})).toBeNull();
    expect(screen.getByRole('button', {name: 'Go to the Project level'})).toBeDefined();
  });

  it('clears the current level and tells the product', () => {
    const onChange = vi.fn();
    render(
      <Harness
        initial={{organization: 'wso2', project: 'finance-web', component: 'mis-arr'}}
        back
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByRole('button', {name: 'Go to the Project level'}));

    expect(onChange).toHaveBeenCalledWith({organization: 'wso2', project: 'finance-web'});
    expect(fieldByLabel('Project').getAttribute('aria-label')).toBe('Project: Finance Web');
  });

  it('shows an empty level while its options are open and returns when they close', () => {
    render(<Harness initial={{organization: 'wso2'}} back />);

    openLevel('Organization');
    fireEvent.click(screen.getByRole('option', {name: 'WSO2'}));

    expect(fieldByLabel('Project').getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(screen.getByRole('listbox'), {key: 'Escape'});

    expect(fieldByLabel('Organization')).toBeDefined();
    expect(screen.queryByRole('combobox', {name: /Project/, hidden: true})).toBeNull();
  });

  it('joins Back and the field in one group', () => {
    render(<Harness initial={{organization: 'wso2', project: 'finance-web'}} back />);

    expect(screen.getByRole('group', {name: 'Project'})).toBeDefined();
    expect(
      within(screen.getByRole('group', {name: 'Project'})).getByRole('button', {
        name: 'Go to the Organization level',
      })
    ).toBeDefined();
  });
});

describe('ContextSwitcher selection', () => {
  it('picks an option, opens the next level, and keeps deeper levels for the same option', () => {
    const onChange = vi.fn();
    render(
      <Harness
        initial={{organization: 'wso2', project: 'finance-web', component: 'mis-arr'}}
        onChange={onChange}
      />
    );

    openLevel('Organization');
    fireEvent.click(screen.getByRole('option', {name: 'WSO2'}));

    expect(onChange).not.toHaveBeenCalled();
    expect(fieldByLabel('Project').getAttribute('aria-expanded')).toBe('true');
    expect(fieldByLabel('Component').getAttribute('aria-label')).toBe('Component: MIS ARR Backend');
  });

  it('clears deeper levels when a parent option changes', () => {
    const onChange = vi.fn();
    render(
      <Harness
        initial={{organization: 'wso2', project: 'finance-web', component: 'mis-arr'}}
        onChange={onChange}
      />
    );

    openLevel('Organization');
    fireEvent.click(screen.getByRole('option', {name: 'Demo Organization'}));

    expect(onChange).toHaveBeenCalledWith({organization: 'demo'});
    expect(fieldByLabel('Project').getAttribute('aria-label')).toBe('Project: Select project');
    expect(fieldByLabel('Project').getAttribute('aria-expanded')).toBe('true');
    expect(screen.queryByRole('combobox', {name: /Component/})).toBeNull();
  });

  it('lists options in source order and marks the current option', () => {
    render(<Harness initial={{organization: 'wso2'}} />);
    openLevel('Organization');

    const options = screen.getAllByRole('option').map((option) => option.textContent);
    expect(options).toEqual(expect.arrayContaining(['WSO2', 'Demo Organization', 'Personal']));
    expect(screen.getByRole('option', {name: 'WSO2'}).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Invited organizations')).toBeDefined();
  });

  it('keeps a disabled option visible and unselectable', () => {
    const onChange = vi.fn();
    render(<Harness initial={{organization: 'wso2'}} onChange={onChange} />);
    openLevel('Project');

    fireEvent.click(screen.getByRole('option', {name: 'Sales'}));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('ContextSwitcher panel', () => {
  it('says when a level has no options', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{}} onChange={() => undefined}>
          <ContextSwitcher.Level id="organization" label="Organization" />
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    openLevel('Organization');
    expect(screen.getByRole('option', {name: 'No options'})).toBeDefined();
  });

  it('shows a progress indicator while a level is loading', () => {
    render(
      <Harness initial={{organization: 'wso2', project: 'finance-web'}} loading loadingLabel="Loading components" />
    );
    openLevel('Component');
    expect(screen.getByRole('progressbar', {name: 'Loading components'})).toBeDefined();
  });
});

describe('ContextSwitcher dismissal', () => {
  it('closes on Escape and an outside click', () => {
    render(<Harness initial={{organization: 'wso2'}} />);
    openLevel('Organization');
    expect(fieldByLabel('Organization').getAttribute('aria-expanded')).toBe('true');

    fireEvent.keyDown(screen.getByRole('listbox'), {key: 'Escape'});
    expect(fieldByLabel('Organization').getAttribute('aria-expanded')).toBe('false');

    openLevel('Organization');
    fireEvent.click(document.querySelector('.MuiModal-backdrop, .MuiBackdrop-root')!);
    expect(fieldByLabel('Organization').getAttribute('aria-expanded')).toBe('false');
  });

  it('keeps only one panel open', () => {
    render(<Harness initial={{organization: 'wso2', project: 'finance-web'}} />);
    openLevel('Organization');
    openLevel('Project');

    expect(fieldByLabel('Organization').getAttribute('aria-expanded')).toBe('false');
    expect(fieldByLabel('Project').getAttribute('aria-expanded')).toBe('true');
  });
});

describe('ContextSwitcher keyboard', () => {
  it('moves between fields with the left and right arrows while closed', () => {
    render(<Harness initial={{organization: 'wso2', project: 'finance-web'}} />);
    const organization = fieldByLabel('Organization');
    organization.focus();
    fireEvent.keyDown(organization, {key: 'ArrowRight'});
    expect(document.activeElement).toBe(fieldByLabel('Project'));
    fireEvent.keyDown(fieldByLabel('Project'), {key: 'ArrowLeft'});
    expect(document.activeElement).toBe(organization);
  });
});

describe('ContextSwitcher', () => {
  it('reads levels wrapped in a fragment', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{organization: 'wso2'}} onChange={() => undefined}>
          <>
            <ContextSwitcher.Level id="organization" label="Organization">
              <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
            </ContextSwitcher.Level>
            <ContextSwitcher.Level id="project" label="Project">
              <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
            </ContextSwitcher.Level>
          </>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(fieldByLabel('Organization')).toBeDefined();
    expect(fieldByLabel('Project')).toBeDefined();
  });

  it('uses the prompt and Back name a product supplies', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher
          back
          value={{organization: 'wso2', project: 'finance-web'}}
          onChange={() => undefined}
        >
          <ContextSwitcher.Level id="organization" label="Organization" backLabel="Return to organization">
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          </ContextSwitcher.Level>
          <ContextSwitcher.Level id="project" label="Project" promptText="Choose a project">
            <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(screen.getByRole('button', {name: 'Return to organization'})).toBeDefined();
    expect(fieldByLabel('Project').getAttribute('aria-label')).toBe('Project: Finance Web');
  });
});

describe('ContextSwitcher.Level', () => {
  it('must be rendered inside the chain', () => {
    expect(() =>
      render(
        <OxygenUIThemeProvider>
          <ContextSwitcher.Level id="organization" label="Organization" />
        </OxygenUIThemeProvider>
      )
    ).toThrow('ContextSwitcher.Level must be rendered inside ContextSwitcher');
  });

  it('shows the raw value when no option has that value', () => {
    render(
      <OxygenUIThemeProvider>
        <ContextSwitcher value={{organization: 'missing'}} onChange={() => undefined}>
          <ContextSwitcher.Level id="organization" label="Organization">
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          </ContextSwitcher.Level>
        </ContextSwitcher>
      </OxygenUIThemeProvider>
    );

    expect(fieldByLabel('Organization').getAttribute('aria-label')).toBe('Organization: missing');
  });
});

describe('ContextSwitcher.Group', () => {
  it('must be rendered inside a level', () => {
    expect(() =>
      render(
        <OxygenUIThemeProvider>
          <ContextSwitcher.Group label="Invited organizations">
            <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          </ContextSwitcher.Group>
        </OxygenUIThemeProvider>
      )
    ).toThrow('ContextSwitcher.Group must be rendered inside a level');
  });
});

describe('ContextSwitcher.Option', () => {
  it('must be rendered inside a level', () => {
    expect(() =>
      render(
        <OxygenUIThemeProvider>
          <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
        </OxygenUIThemeProvider>
      )
    ).toThrow('ContextSwitcher.Option must be rendered inside a level');
  });
});
