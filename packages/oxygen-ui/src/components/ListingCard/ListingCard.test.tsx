/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import ListingCard from './ListingCard';

afterEach(() => {
  cleanup();
});

const renderCard = (props: React.ComponentProps<typeof ListingCard>) =>
  render(
    <OxygenUIThemeProvider>
      <ListingCard {...props} />
    </OxygenUIThemeProvider>,
  );

describe('ListingCard', () => {
  it('renders the title, description and updated time', () => {
    renderCard({ title: 'Default', description: 'Default project', updatedTime: '1 day ago', updatedLabel: 'Updated' });

    expect(screen.getByText('Default')).toBeTruthy();
    expect(screen.getByText('Default project')).toBeTruthy();
    expect(screen.getByText('1 day ago')).toBeTruthy();
    expect(screen.getByText(/Updated/)).toBeTruthy();
  });

  it('renders no description text when none is given', () => {
    renderCard({ title: 'Default' });

    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(screen.queryByText('Default project')).toBeNull();
  });

  it('shows the delete button only when onDelete is set and calls it', () => {
    const onDelete = vi.fn();
    const { unmount } = renderCard({ title: 'Default', updatedTime: 'yesterday' });
    expect(screen.queryByRole('button', { name: 'Delete' })).toBeNull();
    unmount();

    renderCard({ title: 'Default', onDelete, deleteLabel: 'Remove' });
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('makes the whole card clickable, but the delete button does not trigger onClick', () => {
    const onClick = vi.fn();
    const onDelete = vi.fn();
    renderCard({ title: 'Default', onClick, onDelete });

    fireEvent.click(screen.getByRole('button', { name: /Default/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: /Default/ }).contains(screen.getByRole('button', { name: 'Delete' }))).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not put a heading inside the clickable area', () => {
    renderCard({ title: 'Default', onClick: vi.fn() });

    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('renders the top part as a link with href', () => {
    renderCard({ title: 'Default', href: '/projects/default' });

    expect(screen.getByRole('link', { name: /Default/ }).getAttribute('href')).toBe('/projects/default');
  });

  it('renders custom actions instead of the delete button and hides an empty footer', () => {
    const { unmount } = renderCard({
      title: 'Default',
      onDelete: vi.fn(),
      actions: <button type="button">Open</button>,
    });
    expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Delete' })).toBeNull();
    unmount();

    const { container } = renderCard({ title: 'Default' });
    expect(container.querySelectorAll('.MuiCardContent-root')).toHaveLength(1);
  });

  it('keeps working when the card gets focus', () => {
    const onFocus = vi.fn();
    renderCard({ title: 'Default', onClick: vi.fn(), onFocus });

    fireEvent.focus(screen.getByRole('button', { name: /Default/ }));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('marks the card as selected', () => {
    const { container } = renderCard({ title: 'Default', selected: true });

    expect(container.querySelector('[data-selected="true"]')).toBeTruthy();
  });
});
