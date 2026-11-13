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
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import Footer from '../Footer';
import PageContent from './PageContent';

afterEach(() => {
  cleanup();
});

describe('PageContent', () => {
  it('renders the footer after the content when footer is set', () => {
    render(
      <OxygenUIThemeProvider>
        <PageContent
          footer={
            <Footer variant="plain">
              <Footer.Copyright>© 2026 WSO2 LLC.</Footer.Copyright>
              <Footer.Link href="#support">Support</Footer.Link>
            </Footer>
          }
        >
          <p>Content</p>
        </PageContent>
      </OxygenUIThemeProvider>,
    );

    const content = screen.getByText('Content');
    const footer = screen.getByRole('contentinfo');
    expect(footer.contains(screen.getByText('Support'))).toBe(true);
    expect(content.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders no footer without the footer prop', () => {
    render(
      <OxygenUIThemeProvider>
        <PageContent>
          <p>Content</p>
        </PageContent>
      </OxygenUIThemeProvider>,
    );

    expect(screen.queryByRole('contentinfo')).toBeNull();
  });
});
