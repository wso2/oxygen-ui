import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppBreadcrumbs from './AppBreadcrumbs';
import type { BreadcrumbItem } from './AppBreadcrumbs';

describe('AppBreadcrumbs', () => {
  const defaultItems: BreadcrumbItem[] = [
    { key: '1', label: 'Home', onClick: vi.fn() },
    { key: '2', label: 'Dashboard', onClick: vi.fn() },
    { key: '3', label: 'Settings' },
  ];

  it('renders default breadcrumb items correctly', () => {
    render(<AppBreadcrumbs items={defaultItems} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('triggers onClick event when a clickable breadcrumb is clicked', () => {
    render(<AppBreadcrumbs items={defaultItems} />);
    
    const homeItem = screen.getByText('Home');
    fireEvent.click(homeItem);
    expect(defaultItems[0].onClick).toHaveBeenCalled();
  });

  it('triggers onClick event on pressing Enter key', () => {
    render(<AppBreadcrumbs items={defaultItems} />);
    
    const homeItem = screen.getByText('Home');
    fireEvent.keyDown(homeItem, { key: 'Enter', code: 'Enter' });
    expect(defaultItems[0].onClick).toHaveBeenCalled();
  });
  
  it('triggers onClick event on pressing Space key', () => {
    render(<AppBreadcrumbs items={defaultItems} />);
    
    const homeItem = screen.getByText('Home');
    fireEvent.keyDown(homeItem, { key: ' ', code: 'Space' });
    expect(defaultItems[0].onClick).toHaveBeenCalled();
  });

  it('truncates items when items count exceeds maxItems', () => {
    const manyItems: BreadcrumbItem[] = [
      { key: '1', label: 'Home' },
      { key: '2', label: 'Library' },
      { key: '3', label: 'Data' },
      { key: '4', label: 'Users' },
      { key: '5', label: 'Admins' },
    ];
    
    // Default maxItems is 4, we have 5 items.
    render(<AppBreadcrumbs items={manyItems} />);
    
    // First (maxItems - 1) i.e. 3 items and the last item should be visible.
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    
    // Ellipsis button should be present
    const ellipsis = screen.getByRole('button', { name: /show hidden breadcrumbs/i });
    expect(ellipsis).toBeInTheDocument();

    // The hidden item shouldn't be immediately visible in the breadcrumbs, but in the menu
    expect(screen.queryByRole('menuitem', { name: 'Users' })).not.toBeInTheDocument();
    
    expect(screen.getByText('Admins')).toBeInTheDocument();
  });

  it('opens menu with hidden items when ellipsis is clicked', async () => {
    const manyItems: BreadcrumbItem[] = [
      { key: '1', label: 'Home' },
      { key: '2', label: 'Library' },
      { key: '3', label: 'Data' },
      { key: '4', label: 'Users', onClick: vi.fn() },
      { key: '5', label: 'Admins' },
    ];
    
    render(<AppBreadcrumbs items={manyItems} maxItems={4} />);
    
    const ellipsis = screen.getByRole('button', { name: /show hidden breadcrumbs/i });
    fireEvent.click(ellipsis);
    
    // The menu should open and 'Users' should be visible
    const hiddenItem = await screen.findByRole('menuitem');
    expect(hiddenItem).toHaveTextContent('Users');
    
    // Click on the hidden item
    fireEvent.click(hiddenItem);
    expect(manyItems[3].onClick).toHaveBeenCalled();
  });

  it('has appropriate accessibility roles and attributes', () => {
    render(<AppBreadcrumbs items={defaultItems} />);
    
    // MuiBreadcrumbs sets aria-label="breadcrumb" on the nav element
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb');
    
    // Clickable items should have role="button" and tabIndex={0}
    const homeItem = screen.getByText('Home');
    expect(homeItem).toHaveAttribute('role', 'button');
    expect(homeItem).toHaveAttribute('tabIndex', '0');
  });

  it('renders custom sx prop properly without crashing', () => {
    const { container } = render(<AppBreadcrumbs items={defaultItems} sx={{ mt: 5 }} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
