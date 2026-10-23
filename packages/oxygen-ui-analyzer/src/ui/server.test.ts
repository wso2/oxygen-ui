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

import {cpSync, mkdtempSync, rmSync, writeFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {fileURLToPath} from 'url';
import {afterEach, describe, expect, it} from 'vitest';
import {startDevServer, type DevServer} from './server.js';

const FIXTURE = fileURLToPath(new URL('../../test/fixtures/basic', import.meta.url));
const assets = {script: 'window.started = true;', style: ''};
const cleanup: (() => Promise<void> | void)[] = [];

afterEach(async () => {
  for (const step of cleanup.splice(0).reverse()) {
    await step();
  }
});

async function start(options: {watch?: boolean} = {}): Promise<{server: DevServer; root: string}> {
  const root = mkdtempSync(join(tmpdir(), 'oxygen-ui-dev-'));
  cpSync(FIXTURE, root, {recursive: true});
  cleanup.push(() => rmSync(root, {recursive: true, force: true}));

  const server = await startDevServer({root, port: 0, assets, ...options});
  cleanup.push(() => server.close());

  return {server, root};
}

/** Reads server-sent events until one with the given name arrives. */
async function waitForEvent(url: string, name: string, trigger: () => void): Promise<string> {
  const controller = new AbortController();
  const response = await fetch(`${url}events`, {signal: controller.signal});
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let triggered = false;

  try {
    for (;;) {
      const {value, done} = await reader.read();
      if (done) throw new Error('The event stream ended');
      buffer += decoder.decode(value, {stream: true});

      if (!triggered && buffer.includes(': connected')) {
        triggered = true;
        trigger();
      }

      const match = new RegExp(`event: ${name}\\ndata: (.*)\\n\\n`).exec(buffer);
      if (match) return match[1];
    }
  } finally {
    controller.abort();
  }
}

describe('startDevServer', () => {
  it('serves the live report page and the report data', async () => {
    const {server} = await start({watch: false});

    const page = await fetch(server.url);
    expect(page.headers.get('content-type')).toContain('text/html');
    const html = await page.text();
    expect(html).toContain('window.__OXYGEN_UI_REPORT_LIVE__ = true;');
    expect(html).toContain('fixture-basic');

    const report = await (await fetch(`${server.url}report.json`)).json();
    expect(report.summary.findings).toBe(4);
  });

  it('only listens on this machine by default', async () => {
    const {server} = await start({watch: false});

    expect(server.url).toMatch(/^http:\/\/127\.0\.0\.1:\d+\/$/);
  });

  it('answers unknown paths and methods with errors', async () => {
    const {server} = await start({watch: false});

    expect((await fetch(`${server.url}nothing`)).status).toBe(404);
    expect((await fetch(server.url, {method: 'POST'})).status).toBe(405);
  });

  it('analyzes again and pushes the new report when a source file changes', async () => {
    const {server, root} = await start();

    const data = await waitForEvent(server.url, 'report', () => {
      writeFileSync(join(root, 'src/Clean.tsx'), "import {Settings} from 'lucide-react';\n\nexport {Settings};\n");
    });

    expect(JSON.parse(data).summary.findings).toBe(5);
    expect(server.report().summary.findings).toBe(5);
  }, 15000);
});
