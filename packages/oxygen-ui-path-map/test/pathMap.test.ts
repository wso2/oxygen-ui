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

import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { parsePathMap, readInstalledPathMap, requireInstalledPathMap, PathMapError } from '../src/pathMap.js';
import { map } from './map.js';

let app: string;

const install = (files: { manifest?: object; map?: string }) => {
  const oxygen = path.join(app, 'node_modules/@wso2/oxygen-ui');
  mkdirSync(path.join(oxygen, 'dist'), { recursive: true });
  writeFileSync(
    path.join(oxygen, 'package.json'),
    JSON.stringify(files.manifest ?? { name: '@wso2/oxygen-ui', version: '1.0.0', exports: { './path-map.json': './dist/path-map.json' } }),
  );
  if (files.map !== undefined) writeFileSync(path.join(oxygen, 'dist/path-map.json'), files.map);
  return path.join(oxygen, 'dist/path-map.json');
};

beforeEach(() => {
  app = mkdtempSync(path.join(tmpdir(), 'path-map-'));
});

afterEach(() => {
  rmSync(app, { recursive: true, force: true });
});

describe('parsePathMap', () => {
  it('accepts a well formed map', () => {
    expect(parsePathMap(JSON.stringify(map))).toEqual({ map });
  });

  it.each([
    ['text that is not JSON', 'nope', 'not valid JSON'],
    ['an array', '[]', 'not an object'],
    ['a path outside the package', JSON.stringify({ A: { path: 'react/A', kind: 'default', typeOnly: false } }), '"A"'],
    ['an unknown kind', JSON.stringify({ A: { path: '@wso2/oxygen-ui/A', kind: 'star', typeOnly: false } }), '"A"'],
    ['a typeOnly that is not a boolean', JSON.stringify({ A: { path: '@wso2/oxygen-ui/A', kind: 'named', typeOnly: 'no' } }), '"A"'],
    ['an entry that is not an object', JSON.stringify({ A: null }), '"A"'],
  ])('rejects %s', (_label, text, mention) => {
    const parsed = parsePathMap(text);
    expect('reason' in parsed && parsed.reason).toContain(mention);
  });
});

describe('readInstalledPathMap', () => {
  it('says Oxygen is not installed when no folder above holds it', () => {
    expect(readInstalledPathMap(app)).toEqual({ status: 'not-installed' });
  });

  it('finds the map of the package installed in a parent folder', () => {
    install({ map: JSON.stringify(map) });
    mkdirSync(path.join(app, 'src/deep'), { recursive: true });
    expect(readInstalledPathMap(path.join(app, 'src/deep'))).toEqual({ status: 'found', map, version: '1.0.0' });
  });

  it('is unusable, with the version, when the package publishes no path map', () => {
    install({ manifest: { name: '@wso2/oxygen-ui', version: '0.23.1', exports: {} } });
    const reading = readInstalledPathMap(app);
    expect(reading.status).toBe('unusable');
    expect('reason' in reading && reading.reason).toMatch(/0\.23\.1 has no path map/);
  });

  it('is unusable when the map file is missing or malformed', () => {
    install({});
    expect(readInstalledPathMap(app).status).toBe('unusable');
    install({ map: JSON.stringify({ A: { path: 'x', kind: 'default', typeOnly: false } }) });
    const reading = readInstalledPathMap(app);
    expect(reading.status).toBe('unusable');
    expect('reason' in reading && reading.reason).toContain('malformed entry for "A"');
  });

  it('reads the file again when it changes', () => {
    const file = install({ map: JSON.stringify(map) });
    readInstalledPathMap(app);
    const changed = { Box: { path: '@wso2/oxygen-ui/Box', kind: 'default', typeOnly: false } };
    writeFileSync(file, JSON.stringify(changed));
    const later = new Date(Date.now() + 5000);
    utimesSync(file, later, later);
    expect(readInstalledPathMap(app)).toEqual({ status: 'found', map: changed, version: '1.0.0' });
  });
});

describe('requireInstalledPathMap', () => {
  it('throws a PathMapError for each reading that holds no map', () => {
    expect(() => requireInstalledPathMap(app)).toThrow(/is not installed/);
    install({ manifest: { name: '@wso2/oxygen-ui', version: '0.23.1', exports: {} } });
    expect(() => requireInstalledPathMap(app)).toThrow(PathMapError);
  });
});

describe('the path map the Oxygen build writes', () => {
  const built = path.resolve(__dirname, '../../oxygen-ui/dist/path-map.json');

  it.skipIf(!existsSync(built))('satisfies the schema the readers check', () => {
    const parsed = parsePathMap(readFileSync(built, 'utf8'));
    expect('reason' in parsed ? parsed.reason : '').toBe('');
  });
});
