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
import {dirname, resolve} from 'path';
import {parseArgs} from 'util';
import {analyze} from './engine/analyze.js';
import {applyFixes, planFixes} from './fix/fix.js';
import {formatFixJson, formatFixPlan, formatFixResult} from './reporters/fix.js';
import {formatJson} from './reporters/json.js';
import {formatTerminal} from './reporters/terminal.js';
import {renderReportHtml} from './ui/html.js';
import {startDevServer} from './ui/server.js';

const HELP = `
Oxygen UI analyzer - Check a project against the Oxygen UI rules

Usage: oxygen-ui-analyzer <command> [dir] [options]

Commands:
  dev [dir]           Open the report in the browser, and update it as files change
  build [dir]         Write the report as one HTML file that opens without a server
  analyze [dir]       Print the report in the terminal, or as JSON
  fix [dir]           Preview the safe automatic fixes; add --apply to write them
  help                Show this help message

The directory defaults to the current directory.

Options for dev:
  --port <port>       Port to listen on (default: 6007)
  --host <host>       Host to listen on (default: 127.0.0.1)

Options for build:
  --output <file>     The HTML file to write (default: oxygen-report.html)

Options for all commands:
  --include <glob>    Files to analyze, relative to the project (repeatable)
  --ignore <glob>     Files to skip, in addition to the defaults (repeatable)

Options for analyze and fix:
  --format <format>   terminal (default) or json
  --output <file>     Write the output to a file instead of printing it
  --no-color          Print without colours

Options for fix:
  --apply             Write the changes. Without it, fix only shows what would change
  --rule <id>         Only fix findings of this rule (repeatable)
  --limit <n>         Fix at most this many files
  --verify <command>  Run a command after writing the changes, such as "pnpm typecheck";
                      the changes are rolled back if it fails (repeatable)
  --allow-dirty       Apply even when the files to change have uncommitted changes

General options:
  -h, --help          Show this help message
  -v, --version       Show the analyzer version

Planned command: check
`;

const PLANNED_COMMANDS = new Set(['check']);
const COMMANDS = new Set(['dev', 'build', 'analyze', 'fix']);

/**
 * Runs the CLI with the given arguments and returns the process exit code.
 * - 0: the command ran. Findings do not fail `analyze`; the planned `check` command will.
 * - 1: `fix --apply` did not write the changes, or rolled them back.
 * - 2: the command could not run, for example because of an unknown option.
 */
export async function run(argv: string[]): Promise<number> {
  let parsed;

  try {
    parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        format: {type: 'string', default: 'terminal'},
        output: {type: 'string'},
        include: {type: 'string', multiple: true},
        ignore: {type: 'string', multiple: true},
        'no-color': {type: 'boolean', default: false},
        apply: {type: 'boolean', default: false},
        rule: {type: 'string', multiple: true},
        limit: {type: 'string'},
        verify: {type: 'string', multiple: true},
        'allow-dirty': {type: 'boolean', default: false},
        port: {type: 'string'},
        host: {type: 'string'},
        help: {type: 'boolean', short: 'h', default: false},
        version: {type: 'boolean', short: 'v', default: false},
      },
    });
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

  if (PLANNED_COMMANDS.has(command)) {
    process.stderr.write(`The "${command}" command is not available yet.\n`);
    return 2;
  }

  if (!COMMANDS.has(command)) {
    return usageError(`Unknown command: ${command}`);
  }

  if (values.format !== 'terminal' && values.format !== 'json') {
    return usageError(`Unknown format: ${values.format}. Use "terminal" or "json".`);
  }

  if (command !== 'dev' && (values.port !== undefined || values.host !== undefined)) {
    return usageError('--port and --host are options of the dev command.');
  }

  if (command === 'dev' && values.output !== undefined) {
    return usageError('--output is not an option of the dev command. Use build to write the report to a file.');
  }

  if (command === 'dev' || command === 'build' || command === 'analyze') {
    for (const option of ['apply', 'allow-dirty'] as const) {
      if (values[option]) {
        return usageError(`--${option} is an option of the fix command.`);
      }
    }
    for (const option of ['rule', 'limit', 'verify'] as const) {
      if (values[option] !== undefined) {
        return usageError(`--${option} is an option of the fix command.`);
      }
    }
  }

  const root = commandArgs[0] ? resolve(commandArgs[0]) : process.cwd();

  if (command === 'dev') {
    const port = values.port === undefined ? 6007 : Number(values.port);
    if (!Number.isInteger(port) || port < 0 || port > 65535) {
      return usageError(`--port must be a port number, not "${values.port}".`);
    }

    return runDevServer({root, include: values.include, ignore: values.ignore, port, host: values.host});
  }

  if (command === 'build') {
    const output = resolve(values.output ?? 'oxygen-report.html');
    const report = await analyze({root, include: values.include, ignore: values.ignore});

    mkdirSync(dirname(output), {recursive: true});
    writeFileSync(output, renderReportHtml(report));
    process.stdout.write(
      `Report written to ${values.output ?? 'oxygen-report.html'}: ${report.summary.findings} findings in ${report.summary.filesWithFindings} of ${report.summary.filesAnalyzed} files.\n`,
    );
    return 0;
  }

  const limit = values.limit === undefined ? undefined : Number(values.limit);
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 1)) {
    return usageError(`--limit must be a positive whole number, not "${values.limit}".`);
  }

  const json = values.format === 'json';
  const color = !values.output && !values['no-color'] && !process.env.NO_COLOR && Boolean(process.stdout.isTTY);
  const write = (text: string) => {
    if (values.output) {
      const outputPath = resolve(values.output);
      mkdirSync(dirname(outputPath), {recursive: true});
      writeFileSync(outputPath, text);
      process.stdout.write(`Written to ${values.output}\n`);
    } else {
      process.stdout.write(text);
    }
  };

  if (command === 'analyze') {
    const report = await analyze({root, include: values.include, ignore: values.ignore});
    write(json ? formatJson(report) : formatTerminal(report, {color}));
    return 0;
  }

  let plan;
  try {
    plan = await planFixes({root, include: values.include, ignore: values.ignore, ruleIds: values.rule, limit});
  } catch (error) {
    return usageError((error as Error).message);
  }

  if (!values.apply) {
    write(json ? formatFixJson(plan) : formatFixPlan(plan, {color}));
    return 0;
  }

  if (!json) {
    process.stdout.write(formatFixPlan(plan, {color, applying: true}));
  }

  const result = await applyFixes(plan, {
    verify: values.verify,
    allowDirty: values['allow-dirty'],
    onVerify: json ? undefined : (verifyCommand) => process.stdout.write(`\n$ ${verifyCommand}\n`),
  });

  write(json ? formatFixJson(plan, result) : formatFixResult(result, {color}));

  return result.status === 'applied' || (result.status === 'refused' && plan.files.length === 0) ? 0 : 1;
}

async function runDevServer(options: Parameters<typeof startDevServer>[0]): Promise<number> {
  let server;

  try {
    server = await startDevServer({
      ...options,
      onReport: (report) =>
        process.stdout.write(
          `${new Date().toLocaleTimeString()}  ${report.summary.findings} findings in ${report.summary.filesWithFindings} of ${report.summary.filesAnalyzed} files\n`,
        ),
      onError: (error) => process.stderr.write(`Analysis failed: ${(error as Error).message}\n`),
    });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    process.stderr.write(
      code === 'EADDRINUSE'
        ? `Port ${options?.port} is in use. Choose another with --port.\n`
        : `${(error as Error).message}\n`,
    );
    return 2;
  }

  process.stdout.write(`\nOxygen UI report running at ${server.url}\nThe report updates as files change. Press Ctrl+C to stop.\n\n`);

  return new Promise((resolveExit) => {
    const stop = () => {
      void server.close().then(() => resolveExit(0));
    };

    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
  });
}

function usageError(message: string): number {
  process.stderr.write(`${message}\n${HELP}`);
  return 2;
}
