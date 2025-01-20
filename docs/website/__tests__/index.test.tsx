/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import {render, RenderResult, screen} from '@unit-testing';
import '@testing-library/jest-dom';
import {RouterContext} from 'next/dist/shared/lib/router-context';
import {NextRouter} from 'next/router';
import Index from '../pages/index';
import {createMockRouter} from '../test-configs/__mocks__/create-mock-router';

describe('Index Page', () => {
  const renderWithRouter = (routerOptions: Partial<NextRouter> = {}): RenderResult =>
    render(
      <RouterContext.Provider value={createMockRouter(routerOptions)}>
        <Index />
      </RouterContext.Provider>,
    );

  it('renders the page title and description', () => {
    renderWithRouter({basePath: '/base'});

    // Verify main content
    const heroDescription: HTMLElement = screen.getByText((_: string, element: Element | null) => {
      const hasText = (node: Element | null): boolean => node?.textContent?.includes('Design System powering') || false;
      const elementHasText: boolean = hasText(element);
      const childrenDontHaveText: boolean = Array.from(element?.children || []).every(
        (child: Element) => !hasText(child),
      );
      return elementHasText && childrenDontHaveText;
    });

    expect(heroDescription).toBeInTheDocument();
  });

  it('renders all key links', () => {
    renderWithRouter({basePath: '/base'});

    // Verify the links
    const primitivesLink: Element | null = screen.getByTestId('primitives-link');
    expect(primitivesLink).toHaveAttribute('href', 'https://github.com/wso2/oxygen-ui/tree/main/packages/primitives');

    const reactLink: Element | null = screen.getByTestId('react-link');
    expect(reactLink).toHaveAttribute('href', '/base/react?path=/docs/welcome--page');

    const figmaLink: Element | null = screen.getByTestId('figma-link');
    expect(figmaLink).toHaveAttribute(
      'href',
      'https://www.figma.com/file/78epPbkczGFO5RM1sPyNtN/Oxygen?node-id=0%3A1&t=gsdIXRlJ1VChBa37-0',
    );
  });

  it('renders the footer', () => {
    renderWithRouter({basePath: '/base'});

    // Verify footer content
    expect(screen.getByText(/Built with ❤️ by/i)).toBeInTheDocument();
  });
});
