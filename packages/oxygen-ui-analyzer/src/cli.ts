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

import {mkdirSync, writeFileSync} from 'fs';
import {dirname, relative, resolve} from 'path';
import {parseArgs} from 'util';
import {rulesetVersion} from '@wso2/oxygen-ui-rules';
import {createBaseline, pruneBaseline, readBaseline, writeBaseline} from './baseline/baseline.js';
import {initConfig} from './config/init.js';
import {ConfigError, loadConfig} from './config/load.js';
import type {ResolvedConfig} from './config/types.js';
import {analyze, type AnalyzeOptions} from './engine/analyze.js';
import {applyFixes, planFixes} from './fix/fix.js';
import {evaluateCheck, formatCheck, formatCheckJson} from './reporters/check.js';
import {formatFixJson, formatFixPlan, formatFixResult} from './reporters/fix.js';
import {formatJson} from './reporters/json.js';
import {formatTerminal} from './reporters/terminal.js';
import {renderReportHtml} from './ui/html.js';
import {startDevServer} from './ui/server.js';

const HELP = `
Oxygen UI analyzer - Check a project against the Oxygen UI rules

Usage: oxygen-ui-analyzer <command> [dir] [options]

Commands:
  init [dir]          Create oxygen-ui-analyzer.config.js
  dev [dir]           Open the report in the browser, and update it as files change
  build [dir]         Write the report as one HTML file that opens without a server
  analyze [dir]       Print the report in the terminal, or as JSON
  fix [dir]           Preview the safe automatic fixes; add --apply to write them
  baseline [dir]      Record the current findings, so that check only fails on new ones
  check [dir]         Fail if there are findings that are not in the baseline (for CI)
  help                Show this help message

The directory defaults to the current directory.

Options for every command except init:
  --config <file>     The config file (default: oxygen-ui-analyzer.config.js in the directory)
  --include <glob>    Files to analyze, relative to the project (repeatable). Replaces the config's include
  --ignore <glob>     Files to skip, in addition to the defaults and the config (repeatable)

Options for analyze, fix and check:
  --format <format>   terminal (default) or json
  --output <file>     Write the output to a file instead of printing it
  --no-color          Print without colours

Options for dev:
  --port <port>       Port to listen on (default: 6007)
  --host <host>       Host to listen on (default: 127.0.0.1)

Options for build:
  --output <file>     The HTML file to write (default: oxygen-report.html)

Options for fix:
  --apply             Write the changes. Without it, fix only shows what would change
  --rule <id>         Only fix findings of this rule (repeatable)
  --limit <n>         Fix at most this many files
  --verify <command>  Run a command after writing the changes, such as "pnpm typecheck"; the
                      changes are rolled back if it fails (repeatable). Replaces the config's verify
  --allow-dirty       Apply even when the files to change have uncommitted changes

Options for baseline:
  --prune             Only remove findings that have been fixed; never add new ones

Options for check:
  --fail-on <level>   The lowest severity of new findings that fails: error, warning or info
                      (default: the config's failOn, or error)

General options:
  -h, --help          Show this help message
  -v, --version       Show the analyzer version
`;

const PROJECT_OPTIONS = ['config', 'include', 'ignore'];
const OUTPUT_OPTIONS = ['format', 'output', 'no-color'];

/** The options each command accepts. Any other option is an error. */
const COMMAND_OPTIONS: Record<string, string[]> = {
  init: [],
  dev: [...PROJECT_OPTIONS, 'port', 'host'],
  build: [...PROJECT_OPTIONS, 'output'],
  analyze: [...PROJECT_OPTIONS, ...OUTPUT_OPTIONS],
  fix: [...PROJECT_OPTIONS, ...OUTPUT_OPTIONS, 'apply', 'rule', 'limit', 'verify', 'allow-dirty'],
  baseline: [...PROJECT_OPTIONS, 'prune'],
  check: [...PROJECT_OPTIONS, ...OUTPUT_OPTIONS, 'fail-on'],
};

const OPTIONS = {
  config: {type: 'string'},
  include: {type: 'string', multiple: true},
  ignore: {type: 'string', multiple: true},
  format: {type: 'string'},
  output: {type: 'string'},
  'no-color': {type: 'boolean'},
  port: {type: 'string'},
  host: {type: 'string'},
  apply: {type: 'boolean'},
  rule: {type: 'string', multiple: true},
  limit: {type: 'string'},
  verify: {type: 'string', multiple: true},
  'allow-dirty': {type: 'boolean'},
  prune: {type: 'boolean'},
  'fail-on': {type: 'string'},
  help: {type: 'boolean', short: 'h'},
  version: {type: 'boolean', short: 'v'},
} as const;

type Values = ReturnType<typeof parseArgs<{options: typeof OPTIONS; allowPositionals: true}>>['values'];

/**
 * Runs the CLI with the given arguments and returns the process exit code.
 * - 0: the command ran. Findings only fail `check`.
 * - 1: `check` found new findings, or `fix --apply` did not keep its changes.
 * - 2: the command could not run, for example because of an unknown option or an invalid config.
 */
export async function run(argv: string[]): Promise<number> {
  let parsed;

  try {
    parsed = parseArgs({args: argv, allowPositionals: true, options: OPTIONS});
  } catch (error) {
    return usageError((error as Error).message);
  }

  const {values, positionals} = parsed;
  const [command, ...commandArgs] = positionals;

  if (values.version) {
    process.stdout.write(`${__ANALYZER_VERSION__}\n`);
    return 0;
  }

  if (values.help || !command || command === 'help') {
    process.stdout.write(HELP);
    return 0;
  }

  const allowed = COMMAND_OPTIONS[command];
  if (!allowed) {
    return usageError(`Unknown command: ${command}`);
  }

  const given = Object.entries(values).filter(([, value]) => value !== undefined && value !== false);
  const notAllowed = given.map(([name]) => name).filter((name) => !allowed.includes(name));
  if (notAllowed.length > 0) {
    return usageError(`The ${command} command does not accept ${notAllowed.map((name) => `--${name}`).join(', ')}.`);
  }

  if (commandArgs.length > 1) {
    return usageError(`The ${command} command takes one directory, not ${commandArgs.length}.`);
  }

  if (values.format !== undefined && values.format !== 'terminal' && values.format !== 'json') {
    return usageError(`Unknown format: ${values.format}. Use "terminal" or "json".`);
  }

  const root = commandArgs[0] ? resolve(commandArgs[0]) : process.cwd();

  if (command === 'init') {
    return runInit(root);
  }

  let config: ResolvedConfig;
  try {
    config = await loadConfig(root, values.config);
  } catch (error) {
    if (error instanceof ConfigError) {
      process.stderr.write(`${error.message}\n`);
      return 2;
    }
    throw error;
  }

  const analyzeOptions: AnalyzeOptions = {
    root,
    include: values.include ?? config.include,
    ignore: [...config.ignore, ...(values.ignore ?? [])],
    config,
  };

  try {
    switch (command) {
      case 'dev':
        return await runDev(values, analyzeOptions, config);
      case 'build':
        return await runBuild(values, analyzeOptions, config);
      case 'analyze':
        return await runAnalyze(values, analyzeOptions, config);
      case 'fix':
        return await runFix(values, analyzeOptions, config);
      case 'baseline':
        return await runBaseline(values, analyzeOptions, config);
      default:
        return await runCheck(values, analyzeOptions, config);
    }
  } catch (error) {
    if (error instanceof UsageError) {
      return usageError(error.message);
    }
    throw error;
  }
}

class UsageError extends Error {}

function runInit(root: string): number {
  const {created, existing} = initConfig(root);

  if (!created) {
    process.stdout.write(`${relative(process.cwd(), existing as string) || existing} already exists, so nothing was changed.\n`);
    return 0;
  }

  process.stdout.write(`Created ${relative(process.cwd(), created) || created}.

Add these scripts to package.json:

  "oxygen": "oxygen-ui-analyzer dev",
  "oxygen:build": "oxygen-ui-analyzer build",
  "oxygen:fix": "oxygen-ui-analyzer fix",
  "oxygen:check": "oxygen-ui-analyzer check"

If the project already has findings, record them with "oxygen-ui-analyzer baseline", so that
"check" only fails on new ones. Commit the baseline file.
`);
  return 0;
}

/** Loads the baseline named in the config, if it exists. */
function loadBaseline(analyzeOptions: AnalyzeOptions, config: ResolvedConfig): AnalyzeOptions['baseline'] {
  const baseline = readBaseline(resolve(analyzeOptions.root as string, config.baseline));
  return baseline ? {path: config.baseline, baseline} : null;
}

async function runDev(values: Values, analyzeOptions: AnalyzeOptions, config: ResolvedConfig): Promise<number> {
  const port = values.port === undefined ? 6007 : Number(values.port);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new UsageError(`--port must be a port number, not "${values.port}".`);
  }

  let server;
  try {
    server = await startDevServer({
      ...analyzeOptions,
      baseline: loadBaseline(analyzeOptions, config),
      port,
      host: values.host,
      onReport: (report) =>
        process.stdout.write(
          `${new Date().toLocaleTimeString()}  ${report.summary.findings} findings in ${report.summary.filesWithFindings} of ${report.summary.filesAnalyzed} files\n`,
        ),
      onError: (error) => process.stderr.write(`Analysis failed: ${(error as Error).message}\n`),
    });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    process.stderr.write(code === 'EADDRINUSE' ? `Port ${port} is in use. Choose another with --port.\n` : `${(error as Error).message}\n`);
    return 2;
  }

  process.stdout.write(`\nOxygen UI report running at ${server.url}\nThe report updates as files change. Press Ctrl+C to stop.\n\n`);

  return new Promise((resolveExit) => {
    const stop = () => void server.close().then(() => resolveExit(0));
    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
  });
}

async function runBuild(values: Values, analyzeOptions: AnalyzeOptions, config: ResolvedConfig): Promise<number> {
  const output = values.output ?? 'oxygen-report.html';
  const report = await analyze({...analyzeOptions, baseline: loadBaseline(analyzeOptions, config)});

  mkdirSync(dirname(resolve(output)), {recursive: true});
  writeFileSync(resolve(output), renderReportHtml(report));
  process.stdout.write(
    `Report written to ${output}: ${report.summary.findings} findings in ${report.summary.filesWithFindings} of ${report.summary.filesAnalyzed} files.\n`,
  );
  return 0;
}

function writer(values: Values): (text: string) => void {
  return (text) => {
    if (values.output) {
      mkdirSync(dirname(resolve(values.output)), {recursive: true});
      writeFileSync(resolve(values.output), text);
      process.stdout.write(`Written to ${values.output}\n`);
    } else {
      process.stdout.write(text);
    }
  };
}

function useColor(values: Values): boolean {
  return !values.output && !values['no-color'] && !process.env.NO_COLOR && Boolean(process.stdout.isTTY);
}

async function runAnalyze(values: Values, analyzeOptions: AnalyzeOptions, config: ResolvedConfig): Promise<number> {
  const report = await analyze({...analyzeOptions, baseline: loadBaseline(analyzeOptions, config)});

  writer(values)(values.format === 'json' ? formatJson(report) : formatTerminal(report, {color: useColor(values)}));
  return 0;
}

async function runFix(values: Values, analyzeOptions: AnalyzeOptions, config: ResolvedConfig): Promise<number> {
  const limit = values.limit === undefined ? undefined : Number(values.limit);
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 1)) {
    throw new UsageError(`--limit must be a positive whole number, not "${values.limit}".`);
  }

  const json = values.format === 'json';
  const color = useColor(values);
  const write = writer(values);

  let plan;
  try {
    plan = await planFixes({...analyzeOptions, ruleIds: values.rule, limit});
  } catch (error) {
    throw new UsageError((error as Error).message);
  }

  if (!values.apply) {
    write(json ? formatFixJson(plan) : formatFixPlan(plan, {color}));
    return 0;
  }

  if (!json) {
    process.stdout.write(formatFixPlan(plan, {color, applying: true}));
  }

  const result = await applyFixes(plan, {
    verify: values.verify ?? config.verify,
    allowDirty: values['allow-dirty'],
    onVerify: json ? undefined : (command) => process.stdout.write(`\n$ ${command}\n`),
  });

  write(json ? formatFixJson(plan, result) : formatFixResult(result, {color}));

  return result.status === 'applied' || (result.status === 'refused' && plan.files.length === 0) ? 0 : 1;
}

async function runBaseline(values: Values, analyzeOptions: AnalyzeOptions, config: ResolvedConfig): Promise<number> {
  const path = resolve(analyzeOptions.root as string, config.baseline);
  const existing = readBaseline(path);
  const report = await analyze(analyzeOptions);

  if (values.prune) {
    if (!existing) {
      throw new UsageError(`There is no baseline at ${config.baseline} to prune. Run baseline without --prune to create it.`);
    }

    const pruned = pruneBaseline(existing, report.findings);
    writeBaseline(path, {...pruned, rulesetVersion});
    process.stdout.write(
      `Removed ${existing.findings.length - pruned.findings.length} fixed findings from ${config.baseline}. ${pruned.findings.length} remain.\n`,
    );
    return 0;
  }

  const baseline = createBaseline(report.findings, rulesetVersion);
  writeBaseline(path, baseline);

  if (existing) {
    const before = new Set(existing.findings.map((entry) => entry.id));
    const after = new Set(baseline.findings.map((entry) => entry.id));
    const added = baseline.findings.filter((entry) => !before.has(entry.id)).length;
    const removed = existing.findings.filter((entry) => !after.has(entry.id)).length;

    process.stdout.write(
      `Updated ${config.baseline}: ${baseline.findings.length} findings (${added} added, ${removed} removed).` +
        (added > 0 ? ' Added findings will no longer fail check; review them before committing.' : '') +
        '\n',
    );
  } else {
    process.stdout.write(
      `Created ${config.baseline} with ${baseline.findings.length} findings. Commit it, so that check only fails on new findings.\n`,
    );
  }

  return 0;
}

async function runCheck(values: Values, analyzeOptions: AnalyzeOptions, config: ResolvedConfig): Promise<number> {
  const failOn = values['fail-on'] ?? config.failOn;
  if (failOn !== 'error' && failOn !== 'warning' && failOn !== 'info') {
    throw new UsageError(`--fail-on must be error, warning or info, not "${failOn}".`);
  }

  const report = await analyze({...analyzeOptions, baseline: loadBaseline(analyzeOptions, config)});
  const result = evaluateCheck(report, failOn);

  writer(values)(values.format === 'json' ? formatCheckJson(result) : formatCheck(result, {color: useColor(values)}));

  return result.passed ? 0 : 1;
}

function usageError(message: string): number {
  process.stderr.write(`${message}\n${HELP}`);
  return 2;
}

