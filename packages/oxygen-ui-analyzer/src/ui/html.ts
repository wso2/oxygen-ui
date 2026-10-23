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

import {existsSync, readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import type {Report} from '../report/types.js';

/** The built report UI: its script and stylesheet. */
export interface UiAssets {
  script: string;
  style: string;
}

export interface RenderReportOptions {
  /** Whether the page receives updated reports from `oxygen-ui-analyzer dev`. */
  live?: boolean;
  /** The UI to inline. Defaults to the UI built into this package. */
  assets?: UiAssets;
}

let cachedAssets: UiAssets | undefined;

/**
 * Loads the report UI built into `dist/ui`. The bundled CLI runs from `dist/`; tests run from
 * `src/ui/`, so both locations are tried.
 */
export function loadUiAssets(): UiAssets {
  if (cachedAssets) {
    return cachedAssets;
  }

  for (const dir of ['./ui/', '../../dist/ui/']) {
    const script = fileURLToPath(new URL(`${dir}app.js`, import.meta.url));
    const style = fileURLToPath(new URL(`${dir}app.css`, import.meta.url));

    if (existsSync(script) && existsSync(style)) {
      cachedAssets = {script: readFileSync(script, 'utf-8'), style: readFileSync(style, 'utf-8')};
      return cachedAssets;
    }
  }

  throw new Error('The report UI has not been built. Run pnpm build in packages/oxygen-ui-analyzer.');
}

/**
 * Renders a report as one self-contained HTML page: the UI and the report data are inlined, so the
 * page opens from disk, from a CI artifact or from any static host.
 */
export function renderReportHtml(report: Report, options: RenderReportOptions = {}): string {
  const {script, style} = options.assets ?? loadUiAssets();

  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${escapeHtml(report.project.name)} | Oxygen UI report</title>`,
    `<style>${escapeClosingTag(style, 'style')}</style>`,
    '</head>',
    '<body>',
    '<div id="root"></div>',
    `<script id="oxygen-ui-report" type="application/json">${serializeForScript(report)}</script>`,
    ...(options.live ? ['<script>window.__OXYGEN_UI_REPORT_LIVE__ = true;</script>'] : []),
    `<script>${escapeClosingTag(script, 'script')}</script>`,
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

/**
 * JSON that is safe inside a `<script>` element: `<` is escaped, so code from the analyzed project,
 * which the report quotes as evidence, cannot close the element.
 */
export function serializeForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function escapeClosingTag(content: string, tag: string): string {
  return content.replace(new RegExp(`</(${tag})`, 'gi'), '<\\/$1');
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}
