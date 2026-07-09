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

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { Button } from '@mui/material';
import createCache from '@emotion/cache';
import OxygenUIThemeProvider from './OxygenUIThemeProvider';

/**
 * Collects all Emotion-generated style tags for a given cache key.
 * In test/development mode Emotion runs in non-speedy mode, so every
 * inserted rule produces an inspectable `<style data-emotion="<key> <ids...>">`
 * tag. Match by prefix so both exact (`css`) and spaced (`css abc`) forms work.
 */
function getEmotionStyleTags(key: string): HTMLStyleElement[] {
  return Array.from(
    document.querySelectorAll<HTMLStyleElement>(
      `style[data-emotion="${key}"], style[data-emotion^="${key} "]`
    )
  );
}

describe('OxygenUIThemeProvider CSP support', () => {
  beforeEach(() => {
    // Remove style tags injected by previous tests so assertions only see
    // styles produced by the current render.
    document.head.querySelectorAll('style').forEach((el) => el.remove());
  });

  afterEach(() => {
    cleanup();
  });

  it('applies the nonce to all Emotion style tags when the `nonce` prop is set', () => {
    const nonce = 'test-nonce-abc123';

    render(
      <OxygenUIThemeProvider nonce={nonce}>
        <Button variant="contained">Click me</Button>
      </OxygenUIThemeProvider>
    );

    const styleTags = getEmotionStyleTags('css');
    expect(styleTags.length).toBeGreaterThan(0);
    styleTags.forEach((tag) => {
      expect(tag.getAttribute('nonce')).toBe(nonce);
    });
  });

  it('uses a custom Emotion cache passed via the `emotionCache` prop', () => {
    const nonce = 'custom-cache-nonce';
    const cache = createCache({ key: 'oxygen-csp', nonce, prepend: true });

    const { getByRole } = render(
      <OxygenUIThemeProvider emotionCache={cache}>
        <Button variant="contained">Click me</Button>
      </OxygenUIThemeProvider>
    );

    // Styles are injected through the custom cache (custom key)...
    const styleTags = getEmotionStyleTags('oxygen-csp');
    expect(styleTags.length).toBeGreaterThan(0);
    styleTags.forEach((tag) => {
      expect(tag.getAttribute('nonce')).toBe(nonce);
    });

    // ...and generated class names carry the custom cache key.
    const button = getByRole('button');
    const hasCustomKeyClass = Array.from(button.classList).some((cls) =>
      cls.startsWith('oxygen-csp-')
    );
    expect(hasCustomKeyClass).toBe(true);
  });

  it('prefers `emotionCache` over `nonce` when both are provided', () => {
    const cache = createCache({ key: 'wins', nonce: 'cache-nonce' });

    render(
      <OxygenUIThemeProvider emotionCache={cache} nonce="ignored-nonce">
        <Button variant="contained">Click me</Button>
      </OxygenUIThemeProvider>
    );

    expect(getEmotionStyleTags('wins').length).toBeGreaterThan(0);
    expect(document.querySelector('style[nonce="ignored-nonce"]')).toBeNull();
  });

  it('renders without a nonce or custom cache (default behavior)', () => {
    const { getByRole } = render(
      <OxygenUIThemeProvider>
        <Button variant="contained">Default render</Button>
      </OxygenUIThemeProvider>
    );

    expect(getByRole('button')).toHaveProperty('textContent', 'Default render');
  });
});
