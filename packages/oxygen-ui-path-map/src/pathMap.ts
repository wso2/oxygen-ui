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

import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

export const OXYGEN_PACKAGE = '@wso2/oxygen-ui';

const MAP_EXPORT = './path-map.json';

export interface PathMapEntry {
  path: string;
  kind: 'default' | 'named' | 'namespace';
  typeOnly: boolean;
}

export type PathMap = Record<string, PathMapEntry>;

/** What reading the path map of the Oxygen package installed for a folder found. */
export type PathMapReading =
  | { status: 'found'; map: PathMap; version: string }
  | { status: 'not-installed' }
  | { status: 'unusable'; reason: string };

export class PathMapError extends Error {}

const KINDS: ReadonlySet<unknown> = new Set(['default', 'named', 'namespace']);

/** Checks the shape of a path map read from JSON, so a drifted producer fails here and nowhere downstream. */
export const parsePathMap = (text: string): { map: PathMap } | { reason: string } => {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return { reason: 'its path map is not valid JSON' };
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return { reason: 'its path map is not an object of names' };
  }
  for (const [name, entry] of Object.entries(value)) {
    const candidate = entry as Partial<PathMapEntry> | null;
    const wellFormed =
      typeof candidate === 'object' &&
      candidate !== null &&
      typeof candidate.path === 'string' &&
      candidate.path.startsWith(`${OXYGEN_PACKAGE}/`) &&
      KINDS.has(candidate.kind) &&
      typeof candidate.typeOnly === 'boolean';
    if (!wellFormed) return { reason: `its path map has a malformed entry for "${name}"` };
  }
  return { map: value as PathMap };
};

// Only the folder's own ancestors count: Node's lookup list also holds NODE_PATH and global folders, which
// say nothing about the project being checked.
const installedPackageDirectory = (from: string): string | undefined => {
  for (let directory = path.resolve(from); ; directory = path.dirname(directory)) {
    const candidate = path.join(directory, 'node_modules', OXYGEN_PACKAGE);
    if (existsSync(path.join(candidate, 'package.json'))) return candidate;
    if (path.dirname(directory) === directory) return undefined;
  }
};

const cache = new Map<string, { modified: number; map: PathMap }>();

/**
 * Reads the path map of the Oxygen package installed for a folder. It never throws: the caller decides what
 * each outcome means, such as a command failing where the lint rule stays quiet when Oxygen is absent.
 */
export const readInstalledPathMap = (from: string): PathMapReading => {
  const packageDirectory = installedPackageDirectory(from);
  if (!packageDirectory) return { status: 'not-installed' };

  let manifest: { version?: string; exports?: Record<string, unknown> };
  try {
    manifest = JSON.parse(readFileSync(path.join(packageDirectory, 'package.json'), 'utf8'));
  } catch {
    return { status: 'unusable', reason: `${OXYGEN_PACKAGE} has an unreadable package.json` };
  }
  const version = manifest.version ?? 'unknown';
  const exported = manifest.exports?.[MAP_EXPORT];
  const mapFile = typeof exported === 'string' ? path.join(packageDirectory, exported) : undefined;
  if (!mapFile || !existsSync(mapFile)) {
    return {
      status: 'unusable',
      reason: `${OXYGEN_PACKAGE} ${version} has no path map, so it is unknown which path each name lives on. Upgrade to a version that publishes ${OXYGEN_PACKAGE}/path-map.json.`,
    };
  }

  const modified = statSync(mapFile).mtimeMs;
  const cached = cache.get(mapFile);
  if (cached?.modified === modified) return { status: 'found', map: cached.map, version };

  const parsed = parsePathMap(readFileSync(mapFile, 'utf8'));
  if ('reason' in parsed) return { status: 'unusable', reason: `${OXYGEN_PACKAGE} ${version}: ${parsed.reason}.` };
  cache.set(mapFile, { modified, map: parsed.map });
  return { status: 'found', map: parsed.map, version };
};

/** The reading for a caller that cannot go on without a map. */
export const requireInstalledPathMap = (from: string): PathMap => {
  const reading = readInstalledPathMap(from);
  if (reading.status === 'found') return reading.map;
  throw new PathMapError(
    reading.status === 'not-installed' ? `${OXYGEN_PACKAGE} is not installed in ${from} or a parent folder.` : reading.reason,
  );
};
