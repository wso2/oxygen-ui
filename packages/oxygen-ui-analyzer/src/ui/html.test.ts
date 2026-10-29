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

import {fileURLToPath} from 'url';
import {beforeAll, describe, expect, it} from 'vitest';
import {analyze} from '../engine/analyze.js';
import type {Report} from '../report/types.js';
import {renderReportHtml, serializeForScript} from './html.js';

const FIXTURE = fileURLToPath(new URL('../../test/fixtures/basic', import.meta.url));
const assets = {script: 'window.started = true;', style: 'body { margin: 0; }'};

describe('renderReportHtml', () => {
  let report: Report;

  beforeAll(async () => {
    report = await analyze({root: FIXTURE});
  });

  it('inlines the UI and the report, so the page needs no other files', () => {
    const html = renderReportHtml(report, {assets});

    expect(html).toMatch(/^<!doctype html>/);
    expect(html).toContain('<style>body { margin: 0; }</style>');
    expect(html).toContain('<script>window.started = true;</script>');
    expect(html).toContain('<script id="oxygen-ui-report" type="application/json">');
    expect(html).not.toMatch(/<(script|link)[^>]+(src|href)=/);
  });

  it('embeds the report so that it parses back to the same data', () => {
    const html = renderReportHtml(report, {assets});
    const json = /<script id="oxygen-ui-report" type="application\/json">(.*)<\/script>/.exec(html)![1];

    expect(JSON.parse(json)).toEqual(report);
  });

  it('titles the page with the project name', () => {
    expect(renderReportHtml({...report, project: {name: 'A & <B>'}}, {assets})).toContain(
      '<title>A &#38; &#60;B&#62; | Oxygen UI report</title>',
    );
  });

  it('marks the page as live only for the dev server', () => {
    expect(renderReportHtml(report, {assets})).not.toContain('__OXYGEN_UI_REPORT_LIVE__');
    expect(renderReportHtml(report, {assets, live: true})).toContain('window.__OXYGEN_UI_REPORT_LIVE__ = true;');
  });

  it('keeps quoted project code from closing the script elements', () => {
    const hostile = {...report, findings: [{...report.findings[0], evidence: '</script><script>alert(1)</script>'}]};
    const html = renderReportHtml(hostile, {assets: {script: 'const tag = "</script>";', style: ''}});

    expect(html.match(/<\/script>/g)).toHaveLength(2);
    expect(html).toContain('const tag = "<\\/script>";');
  });
});

describe('serializeForScript', () => {
  it('escapes characters that could end the script or break JavaScript parsing', () => {
    expect(serializeForScript({text: '</script>\u2028\u2029'})).toBe('{"text":"\\u003c/script>\\u2028\\u2029"}');
  });
});
