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

import {watch, type FSWatcher} from 'fs';
import {createServer, type ServerResponse} from 'http';
import type {AddressInfo} from 'net';
import {resolve} from 'path';
import {analyze, type AnalyzeOptions} from '../engine/analyze.js';
import type {Report} from '../report/types.js';
import {renderReportHtml, type UiAssets} from './html.js';

export interface DevServerOptions extends AnalyzeOptions {
  /** Port to listen on. Use 0 for any free port. Defaults to 6007. */
  port?: number;
  /** Host to listen on. Defaults to 127.0.0.1, so the report is only reachable from this machine. */
  host?: string;
  /** Whether to analyze again when files change. Defaults to true. */
  watch?: boolean;
  /** Called after each analysis, including the first. */
  onReport?: (report: Report) => void;
  /** Called when an analysis fails, for example because a file was removed while it ran. */
  onError?: (error: unknown) => void;
  /** The UI to serve. Defaults to the UI built into this package. */
  assets?: UiAssets;
}

export interface DevServer {
  url: string;
  /** The latest report. */
  report(): Report;
  close(): Promise<void>;
}

/** Files whose changes trigger a new analysis. */
const SOURCE_FILE = /\.(m|c)?[jt]sx?$/;
const IGNORED_SEGMENT = /(^|[\\/])(node_modules|\.git|dist|build|coverage|storybook-static)([\\/]|$)/;
const DEBOUNCE_MS = 200;
const KEEP_ALIVE_MS = 30_000;

/**
 * Serves the report UI for a project, and analyzes the project again whenever a source file
 * changes. Open pages receive the new report through server-sent events.
 */
export async function startDevServer(options: DevServerOptions = {}): Promise<DevServer> {
  const root = resolve(options.root ?? process.cwd());
  const analyzeOptions: AnalyzeOptions = {root, include: options.include, ignore: options.ignore, rules: options.rules};
  const clients = new Set<ServerResponse>();

  let report = await analyze(analyzeOptions);
  options.onReport?.(report);

  const send = (event: string, data: string) => {
    for (const client of clients) {
      client.write(`event: ${event}\ndata: ${data}\n\n`);
    }
  };

  const server = createServer((request, response) => {
    const path = new URL(request.url ?? '/', 'http://localhost').pathname;

    if (request.method !== 'GET') {
      response.writeHead(405, {Allow: 'GET'}).end();
    } else if (path === '/' || path === '/index.html') {
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store'});
      response.end(renderReportHtml(report, {live: true, assets: options.assets}));
    } else if (path === '/report.json') {
      response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'});
      response.end(JSON.stringify(report));
    } else if (path === '/events') {
      response.writeHead(200, {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive'});
      response.write(': connected\n\n');
      clients.add(response);
      request.on('close', () => clients.delete(response));
    } else {
      response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'}).end('Not found');
    }
  });

  // Analyze again after changes settle. Changes during an analysis lead to one more analysis.
  let timer: NodeJS.Timeout | undefined;
  let running = false;
  let pending = false;

  const reanalyze = async () => {
    if (running) {
      pending = true;
      return;
    }

    running = true;
    send('analyzing', '{}');

    try {
      report = await analyze(analyzeOptions);
      options.onReport?.(report);
      send('report', JSON.stringify(report));
    } catch (error) {
      options.onError?.(error);
    } finally {
      running = false;

      if (pending) {
        pending = false;
        void reanalyze();
      }
    }
  };

  let watcher: FSWatcher | undefined;
  if (options.watch !== false) {
    watcher = watch(root, {recursive: true}, (_event, filename) => {
      const file = filename?.toString();

      if (file && SOURCE_FILE.test(file) && !IGNORED_SEGMENT.test(file)) {
        clearTimeout(timer);
        timer = setTimeout(() => void reanalyze(), DEBOUNCE_MS);
      }
    });
  }

  const keepAlive = setInterval(() => {
    for (const client of clients) {
      client.write(': ping\n\n');
    }
  }, KEEP_ALIVE_MS);

  await new Promise<void>((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(options.port ?? 6007, options.host ?? '127.0.0.1', () => {
      server.off('error', rejectListen);
      resolveListen();
    });
  });

  const address = server.address() as AddressInfo;
  const host = address.family === 'IPv6' ? `[${address.address}]` : address.address;

  return {
    url: `http://${host}:${address.port}/`,
    report: () => report,
    close: async () => {
      clearTimeout(timer);
      clearInterval(keepAlive);
      watcher?.close();

      for (const client of clients) {
        client.end();
      }

      await new Promise<void>((resolveClose) => server.close(() => resolveClose()));
    },
  };
}
