import React from 'react';
import {render} from '@testing-library/react';
import ColorModeToggle from './ColorModeToggle';

describe('ColorModeToggle', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<ColorModeToggle />);
    expect(baseElement).toBeTruthy();
  });
});
