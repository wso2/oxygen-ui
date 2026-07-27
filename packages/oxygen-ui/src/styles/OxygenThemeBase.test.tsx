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

import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { Accordion, AccordionSummary } from '@mui/material';
import OxygenUIThemeProvider from '../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';

describe('OxygenThemeBase MuiAccordionSummary defaults', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a default ChevronDown expand icon when expandIcon is not provided', () => {
    const { container } = render(
      <OxygenUIThemeProvider>
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
        </Accordion>
      </OxygenUIThemeProvider>
    );

    const expandIconWrapper = container.querySelector(
      '.MuiAccordionSummary-expandIconWrapper'
    );
    expect(expandIconWrapper).not.toBeNull();
    expect(
      expandIconWrapper?.querySelector('svg.lucide-chevron-down')
    ).not.toBeNull();
  });

  it('allows overriding the default expand icon', () => {
    const { container, getByTestId } = render(
      <OxygenUIThemeProvider>
        <Accordion>
          <AccordionSummary
            expandIcon={<span data-testid="custom-expand-icon" />}
          >
            Summary
          </AccordionSummary>
        </Accordion>
      </OxygenUIThemeProvider>
    );

    expect(getByTestId('custom-expand-icon')).toBeTruthy();
    expect(
      container.querySelector('svg.lucide-chevron-down')
    ).toBeNull();
  });

  it('hides the expand icon when expandIcon is null', () => {
    const { container } = render(
      <OxygenUIThemeProvider>
        <Accordion>
          <AccordionSummary expandIcon={null}>Summary</AccordionSummary>
        </Accordion>
      </OxygenUIThemeProvider>
    );

    expect(
      container.querySelector('.MuiAccordionSummary-expandIconWrapper')
    ).toBeNull();
  });
});
