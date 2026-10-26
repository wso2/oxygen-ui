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

// Landmarks and accessible names are covered in `../accessibility.test.tsx`.

import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import FullScreenWizard from './FullScreenWizard';
import { useWizardSteps } from './useWizardSteps';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const SteppedWizard = ({ onClose }: { onClose?: () => void }) => {
  const wizard = useWizardSteps(['details', 'review']);
  return (
    <FullScreenWizard onClose={onClose} aria-label="Create project">
      <FullScreenWizard.Progress value={wizard.progress} />
      <FullScreenWizard.Header>Create project</FullScreenWizard.Header>
      <FullScreenWizard.Content focusKey={wizard.activeStep}>
        <p>Step {wizard.activeStep}</p>
      </FullScreenWizard.Content>
      <FullScreenWizard.Footer>
        <button type="button" onClick={wizard.next}>
          Continue
        </button>
      </FullScreenWizard.Footer>
    </FullScreenWizard>
  );
};

describe('FullScreenWizard', () => {
  it('calls onClose from the close button', () => {
    const onClose = vi.fn();
    renderWithTheme(<SteppedWizard onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render a close button without onClose', () => {
    renderWithTheme(<SteppedWizard />);
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
  });

  it('renders the footer inside the content column whatever the child order', () => {
    renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Footer data-testid="footer">Actions</FullScreenWizard.Footer>
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
      </FullScreenWizard>
    );

    expect(within(screen.getByRole('main')).getByTestId('footer')).toBeDefined();
  });

  it('renders the footer in place when there is no content', () => {
    renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Footer data-testid="footer">Actions</FullScreenWizard.Footer>
      </FullScreenWizard>
    );

    expect(screen.getByTestId('footer')).toBeDefined();
    expect(screen.queryByRole('main')).toBeNull();
  });

  it('does not move focus on the first render', () => {
    renderWithTheme(
      <React.StrictMode>
        <SteppedWizard />
      </React.StrictMode>
    );
    expect(document.activeElement).toBe(document.body);
  });

  it('focuses the content and scrolls it to the top when focusKey changes', () => {
    renderWithTheme(<SteppedWizard />);
    const main = screen.getByRole('main');
    main.scrollTop = 120;

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Step review')).toBeDefined();
    expect(document.activeElement).toBe(main);
    expect(main.getAttribute('tabindex')).toBe('-1');
    expect(main.scrollTop).toBe(0);
  });

  it('clamps the progress value', () => {
    renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Progress value={140} />
      </FullScreenWizard>
    );
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
  });

  it('applies the sticky treatment only when asked', () => {
    renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Content>
          Step
        </FullScreenWizard.Content>
        <FullScreenWizard.Footer sticky data-testid="footer">
          Actions
        </FullScreenWizard.Footer>
      </FullScreenWizard>
    );
    expect(getComputedStyle(screen.getByTestId('footer')).position).toBe('sticky');
  });

  it('places the progress bar above both columns whatever the child order', () => {
    const { container } = renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Header>Header</FullScreenWizard.Header>
        <FullScreenWizard.Preview>Preview</FullScreenWizard.Preview>
        <FullScreenWizard.Progress value={50} />
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
      </FullScreenWizard>
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.firstElementChild).toBe(screen.getByRole('progressbar'));
    expect(root.lastElementChild?.contains(screen.getByRole('complementary'))).toBe(true);
  });

  it('balances the header under centred content so it centres on the whole screen', () => {
    const offsetHeight = vi
      .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return this.tagName === 'HEADER' ? 88 : 0;
      });
    const { rerender } = renderWithTheme(
      <FullScreenWizard onClose={() => undefined}>
        <FullScreenWizard.Header />
        <FullScreenWizard.Content align="center">Welcome</FullScreenWizard.Content>
      </FullScreenWizard>
    );
    const main = screen.getByRole('main');
    const balance = main.lastElementChild as HTMLElement;
    expect(balance.getAttribute('aria-hidden')).toBe('true');
    expect(getComputedStyle(balance).height).toBe('88px');

    rerender(
      <OxygenUIThemeProvider>
        <FullScreenWizard onClose={() => undefined}>
          <FullScreenWizard.Header />
          <FullScreenWizard.Content>Welcome</FullScreenWizard.Content>
        </FullScreenWizard>
      </OxygenUIThemeProvider>
    );
    expect(screen.getByRole('main').querySelector('[aria-hidden="true"]')).toBeNull();
    offsetHeight.mockRestore();
  });

  it('centres the content column only when align is center', () => {
    renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Content>
          <span>Start</span>
        </FullScreenWizard.Content>
        <FullScreenWizard.Content align="center">
          <span>Centre</span>
        </FullScreenWizard.Content>
      </FullScreenWizard>
    );
    expect(getComputedStyle(screen.getByText('Start').parentElement as HTMLElement).marginLeft).not.toBe('auto');
    expect(getComputedStyle(screen.getByText('Centre').parentElement as HTMLElement).marginLeft).toBe('auto');
  });

  it('puts the close button at the end of the header when asked', () => {
    renderWithTheme(
      <FullScreenWizard onClose={() => undefined}>
        <FullScreenWizard.Header closePosition="end">
          <span>Title</span>
        </FullScreenWizard.Header>
      </FullScreenWizard>
    );
    const header = screen.getByRole('banner');
    expect(header.lastElementChild).toBe(screen.getByRole('button', { name: 'Close' }));
  });

  it('renders the segmented progress as a labelled progressbar with one segment per step', () => {
    renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Progress variant="segmented" steps={3} value={200 / 3} valueText="Step 2 of 3" />
      </FullScreenWizard>
    );
    const progress = screen.getByRole('progressbar', { name: 'Progress' });
    expect(progress.getAttribute('aria-valuenow')).toBe('67');
    expect(progress.getAttribute('aria-valuetext')).toBe('Step 2 of 3');
    expect(progress.children).toHaveLength(3);
  });

  it('renders a bar footer after the content region, outside its scroll', () => {
    renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Footer variant="bar" data-testid="footer">
          Actions
        </FullScreenWizard.Footer>
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
      </FullScreenWizard>
    );
    const main = screen.getByRole('main');
    const footer = screen.getByTestId('footer');
    expect(main.contains(footer)).toBe(false);
    expect(main.nextElementSibling).toBe(footer);
  });

  it('places the preview before the form column when its position is start', () => {
    renderWithTheme(
      <FullScreenWizard>
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
        <FullScreenWizard.Preview position="start">Steps</FullScreenWizard.Preview>
      </FullScreenWizard>
    );
    const aside = screen.getByRole('complementary');
    expect(aside.hasAttribute('position')).toBe(false);
    expect(aside.nextElementSibling?.contains(screen.getByRole('main'))).toBe(true);
  });

  it('forwards refs to the root and the content region', () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const contentRef = React.createRef<HTMLElement>();
    renderWithTheme(
      <FullScreenWizard ref={rootRef}>
        <FullScreenWizard.Content ref={contentRef}>Step</FullScreenWizard.Content>
      </FullScreenWizard>
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(contentRef.current).toBe(screen.getByRole('main'));
  });

  it('does not leak sx or ownerState onto the DOM', () => {
    const { container } = renderWithTheme(
      <FullScreenWizard sx={{ p: 1 }}>
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
        <FullScreenWizard.Footer variant="bar" sx={{ p: 1 }}>
          Actions
        </FullScreenWizard.Footer>
        <FullScreenWizard.Preview sx={{ p: 1 }}>Preview</FullScreenWizard.Preview>
      </FullScreenWizard>
    );
    expect(container.querySelector('[sx], [ownerstate], [ownerState]')).toBeNull();
  });

  it('passes extra attributes to the root', () => {
    renderWithTheme(
      <FullScreenWizard id="wizard" data-testid="root" className="custom">
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
      </FullScreenWizard>
    );
    const root = screen.getByTestId('root');
    expect(root.id).toBe('wizard');
    expect(root.classList.contains('custom')).toBe(true);
  });

  it('finds parts grouped in a fragment', () => {
    renderWithTheme(
      <FullScreenWizard>
        <>
          <FullScreenWizard.Content>Step</FullScreenWizard.Content>
          <FullScreenWizard.Footer data-testid="footer">Actions</FullScreenWizard.Footer>
        </>
      </FullScreenWizard>
    );
    expect(within(screen.getByRole('main')).getByTestId('footer')).toBeDefined();
  });

  it('lets the close button icon and props be customised but keeps its name and handler', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <FullScreenWizard onClose={onClose} closeLabel="Exit">
        <FullScreenWizard.Header
          closeIcon={<span data-testid="icon" />}
          CloseButtonProps={{ size: 'small', 'aria-label': 'Ignored', className: 'close' } as never}
        />
      </FullScreenWizard>
    );
    const button = screen.getByRole('button', { name: 'Exit' });
    expect(within(button).getByTestId('icon')).toBeDefined();
    expect(button.classList.contains('close')).toBe(true);
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('forwards refs on every part', () => {
    const refs = {
      progress: React.createRef<HTMLDivElement>(),
      header: React.createRef<HTMLElement>(),
      footer: React.createRef<HTMLDivElement>(),
      preview: React.createRef<HTMLElement>(),
    };
    renderWithTheme(
      <FullScreenWizard onClose={() => undefined}>
        <FullScreenWizard.Progress ref={refs.progress} value={50} />
        <FullScreenWizard.Header ref={refs.header} />
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
        <FullScreenWizard.Footer ref={refs.footer}>Actions</FullScreenWizard.Footer>
        <FullScreenWizard.Preview ref={refs.preview}>Preview</FullScreenWizard.Preview>
      </FullScreenWizard>
    );
    expect(refs.progress.current).toBe(screen.getByRole('progressbar'));
    expect(refs.header.current).toBe(screen.getByRole('banner'));
    expect(refs.footer.current?.textContent).toBe('Actions');
    expect(refs.preview.current).toBe(screen.getByRole('complementary'));
  });

  it('keeps paper slot props given as a function in modal mode', () => {
    renderWithTheme(
      <FullScreenWizard
        modal
        open
        aria-label="Invite member"
        DialogProps={{ slotProps: { paper: () => ({ className: 'custom-paper' }) } }}
      >
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
      </FullScreenWizard>
    );
    const dialog = screen.getByRole('dialog', { name: 'Invite member' });
    expect(dialog.classList.contains('custom-paper')).toBe(true);
  });

  it('closes the modal on Escape', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <FullScreenWizard modal open onClose={onClose} aria-label="Invite member">
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
      </FullScreenWizard>
    );

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders nothing while the modal is closed', () => {
    renderWithTheme(
      <FullScreenWizard modal open={false} aria-label="Invite member">
        <FullScreenWizard.Content>Step</FullScreenWizard.Content>
      </FullScreenWizard>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('throws a helpful error when a part is used outside the wizard', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<FullScreenWizard.Header />)).toThrow(
      /FullScreenWizard.Header must be used as a child of <FullScreenWizard>/
    );
  });
});
