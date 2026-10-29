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
import {isAbsolute, join, resolve} from 'path';
import {pathToFileURL} from 'url';
import {rules as registry, type RuleDefinition} from '@wso2/oxygen-ui-rules';
import type {AnalyzerConfig, ExceptionConfig, ResolvedConfig, RuleSetting} from './types.js';

/** Config file names, in the order they are looked for. */
export const CONFIG_FILES = [
  'oxygen-ui-analyzer.config.js',
  'oxygen-ui-analyzer.config.mjs',
  'oxygen-ui-analyzer.config.cjs',
  'oxygen-ui-analyzer.config.json',
];

export const DEFAULT_BASELINE = '.oxygen-ui/baseline.json';

const SEVERITIES = ['error', 'warning', 'info'];
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** A configuration problem, reported with the file it is in. */
export class ConfigError extends Error {
  constructor(path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = 'ConfigError';
  }
}

/**
 * Finds and loads the project's analyzer configuration. Returns the defaults if the project has no
 * config file. Throws a `ConfigError` if the file is invalid.
 *
 * @param configPath A specific config file. Defaults to the first of `CONFIG_FILES` in `root`.
 * @param rules The rules the config may refer to. Defaults to every rule in `@wso2/oxygen-ui-rules`.
 */
export async function loadConfig(
  root: string,
  configPath?: string,
  rules: RuleDefinition[] = registry,
): Promise<ResolvedConfig> {
  const path = configPath
    ? resolve(root, configPath)
    : (CONFIG_FILES.map((file) => join(root, file)).find((candidate) => existsSync(candidate)) ?? null);

  if (path === null) {
    return resolveConfig(null, {}, rules);
  }

  if (!existsSync(path)) {
    throw new ConfigError(path, 'The config file does not exist.');
  }

  let config: unknown;
  try {
    config = path.endsWith('.json')
      ? JSON.parse(readFileSync(path, 'utf-8'))
      : ((await import(`${pathToFileURL(path).href}?t=${Date.now()}`)) as {default?: unknown}).default;
  } catch (error) {
    throw new ConfigError(path, `The config file could not be loaded: ${(error as Error).message}`);
  }

  return resolveConfig(path, config, rules);
}

/**
 * Validates a configuration object and applies the defaults.
 */
export function resolveConfig(path: string | null, config: unknown, rules: RuleDefinition[] = registry): ResolvedConfig {
  const fail = (message: string): never => {
    throw new ConfigError(path ?? 'config', message);
  };

  if (typeof config !== 'object' || config === null || Array.isArray(config)) {
    fail('The config must export an object, for example "export default {rules: {}}".');
  }

  const value = config as AnalyzerConfig & Record<string, unknown>;
  const known = ['include', 'ignore', 'rules', 'exceptions', 'baseline', 'failOn', 'verify'];
  const unknown = Object.keys(value).filter((key) => !known.includes(key));
  if (unknown.length > 0) {
    fail(`Unknown option ${unknown.map((key) => `"${key}"`).join(', ')}. Known options: ${known.join(', ')}.`);
  }

  const stringList = (key: 'include' | 'ignore' | 'verify'): string[] | undefined => {
    const list = value[key];
    if (list === undefined) return undefined;
    if (!Array.isArray(list) || list.some((item) => typeof item !== 'string' || item === '')) {
      fail(`"${key}" must be a list of non-empty strings.`);
    }
    return list as string[];
  };

  const ruleIds = rules.map((rule) => rule.meta.id);
  const ruleSettings: ResolvedConfig['rules'] = {};

  if (value.rules !== undefined) {
    if (typeof value.rules !== 'object' || value.rules === null || Array.isArray(value.rules)) {
      fail('"rules" must be an object of rule ids and settings.');
    }

    for (const [id, setting] of Object.entries(value.rules as Record<string, RuleSetting>)) {
      if (!ruleIds.includes(id)) {
        fail(`"rules" has an unknown rule "${id}". Known rules: ${ruleIds.join(', ')}.`);
      }

      const resolved = typeof setting === 'string' ? {severity: setting} : setting;
      if (typeof resolved !== 'object' || resolved === null) {
        fail(`"rules.${id}" must be a severity or an object with "severity" and "options".`);
      }
      if (resolved.severity !== undefined && ![...SEVERITIES, 'off'].includes(resolved.severity)) {
        fail(`"rules.${id}" has an unknown severity "${String(resolved.severity)}". Use error, warning, info or off.`);
      }
      if (resolved.options !== undefined && (typeof resolved.options !== 'object' || Array.isArray(resolved.options))) {
        fail(`"rules.${id}.options" must be an object.`);
      }

      ruleSettings[id] = resolved;
    }
  }

  const exceptions: ExceptionConfig[] = [];
  if (value.exceptions !== undefined) {
    if (!Array.isArray(value.exceptions)) {
      fail('"exceptions" must be a list.');
    }

    (value.exceptions as unknown[]).forEach((exception, index) => {
      const at = `"exceptions[${index}]"`;
      const item = exception as Partial<ExceptionConfig>;

      if (typeof item !== 'object' || item === null) fail(`${at} must be an object.`);
      if (typeof item.rule !== 'string' || !ruleIds.includes(item.rule)) {
        fail(`${at} has an unknown rule "${String(item.rule)}". Known rules: ${ruleIds.join(', ')}.`);
      }
      if (!Array.isArray(item.files) || item.files.length === 0 || item.files.some((file) => typeof file !== 'string' || !file)) {
        fail(`${at} needs "files": a list of glob patterns.`);
      }
      if (typeof item.reason !== 'string' || item.reason.trim().length === 0) {
        fail(`${at} needs a "reason", so that reviewers can judge the exception.`);
      }
      if (item.expires !== undefined && (typeof item.expires !== 'string' || !DATE.test(item.expires) || Number.isNaN(Date.parse(item.expires)))) {
        fail(`${at} has an invalid "expires" date "${String(item.expires)}". Use YYYY-MM-DD.`);
      }

      exceptions.push(item as ExceptionConfig);
    });
  }

  if (value.baseline !== undefined && (typeof value.baseline !== 'string' || !value.baseline || isAbsolute(value.baseline))) {
    fail('"baseline" must be a path relative to the project root.');
  }

  if (value.failOn !== undefined && !SEVERITIES.includes(value.failOn)) {
    fail(`"failOn" must be error, warning or info, not "${String(value.failOn)}".`);
  }

  return {
    path,
    include: stringList('include'),
    ignore: stringList('ignore') ?? [],
    rules: ruleSettings,
    exceptions,
    baseline: value.baseline ?? DEFAULT_BASELINE,
    failOn: value.failOn ?? 'error',
    verify: stringList('verify') ?? [],
  };
}
