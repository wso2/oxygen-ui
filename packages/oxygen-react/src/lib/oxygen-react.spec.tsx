import { render } from '@testing-library/react';

import OxygenReact from './oxygen-react';

describe('OxygenReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OxygenReact />);
    expect(baseElement).toBeTruthy();
  });
});
