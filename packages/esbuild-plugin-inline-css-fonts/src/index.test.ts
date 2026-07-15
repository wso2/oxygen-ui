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

import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import * as esbuild from 'esbuild';
import { inlineCSSFontsPlugin } from './index';

async function buildCssInjectionScript(css: string): Promise<string> {
  const dir = mkdtempSync(join(tmpdir(), 'inline-css-fonts-'));
  const entry = join(dir, 'entry.css');
  writeFileSync(entry, css, 'utf8');

  try {
    const result = await esbuild.build({
      entryPoints: [entry],
      bundle: true,
      write: false,
      plugins: [inlineCSSFontsPlugin({ verbose: false })],
    });

    const js = result.outputFiles?.[0]?.text;
    if (!js) {
      throw new Error('esbuild produced no output');
    }
    return js;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function runInjection(
  js: string,
  options: {
    webpackNonce?: string;
    headHtml?: string;
  } = {}
): HTMLStyleElement | null {
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
    runScripts: 'outside-only',
  });
  const { window } = dom;

  if (options.headHtml) {
    window.document.head.innerHTML = options.headHtml;
  }

  if (options.webpackNonce !== undefined) {
    (window as unknown as { __webpack_nonce__: string }).__webpack_nonce__ = options.webpackNonce;
  }

  // Evaluate the generated IIFE against this document.
  window.eval(js);

  return window.document.querySelector<HTMLStyleElement>('style[data-inline-css="true"]');
}

describe('inlineCSSFontsPlugin CSP nonce resolution', () => {
  it('injects styles without a nonce when no source is present', async () => {
    const js = await buildCssInjectionScript('.root { color: red; }');
    const style = runInjection(js);

    expect(style).not.toBeNull();
    expect(style?.textContent).toContain('color: red');
    expect(style?.getAttribute('nonce')).toBeNull();
  });

  it('applies nonce from __webpack_nonce__', async () => {
    const js = await buildCssInjectionScript('.root { color: blue; }');
    const style = runInjection(js, { webpackNonce: 'webpack-nonce-123' });

    expect(style).not.toBeNull();
    expect(style?.getAttribute('nonce')).toBe('webpack-nonce-123');
  });

  it('applies nonce from Vite meta[property="csp-nonce"]', async () => {
    const js = await buildCssInjectionScript('.root { color: green; }');
    const style = runInjection(js, {
      headHtml: '<meta property="csp-nonce" nonce="vite-nonce-456" />',
    });

    expect(style).not.toBeNull();
    expect(style?.getAttribute('nonce')).toBe('vite-nonce-456');
  });

  it('applies nonce from MUI/Next meta[name="csp-nonce"] content', async () => {
    const js = await buildCssInjectionScript('.root { color: purple; }');
    const style = runInjection(js, {
      headHtml: '<meta name="csp-nonce" content="mui-nonce-789" />',
    });

    expect(style).not.toBeNull();
    expect(style?.getAttribute('nonce')).toBe('mui-nonce-789');
  });

  it('prefers __webpack_nonce__ over meta tags', async () => {
    const js = await buildCssInjectionScript('.root { color: orange; }');
    const style = runInjection(js, {
      webpackNonce: 'webpack-wins',
      headHtml: '<meta name="csp-nonce" content="mui-ignored" />',
    });

    expect(style?.getAttribute('nonce')).toBe('webpack-wins');
  });
});
