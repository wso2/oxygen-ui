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
import {formatJson} from './reporters/json.js';
import {formatTerminal} from './reporters/terminal.js';

const HELP = `
Oxygen UI analyzer - Check a project against the Oxygen UI rules

Usage: oxygen-ui-analyzer <command> [options]

Commands:
  analyze [dir]       Analyze a project (default: the current directory) and print the report
  help                Show this help message

Options for analyze:
  --format <format>   terminal (default) or json
  --output <file>     Write the report to a file instead of printing it
  --include <glob>    Files to analyze, relative to the project (repeatable)
  --ignore <glob>     Files to skip, in addition to the defaults (repeatable)
  --no-color          Print without colours

General options:
  -h, --help          Show this help message
  -v, --version       Show the analyzer version

Planned commands: dev, build, check, fix
`;

const PLANNED_COMMANDS = new Set(['dev', 'build', 'check', 'fix']);

/**
 * Runs the CLI with the given arguments and returns the process exit code.
 * - 0: the command ran. Findings do not fail `analyze`; the planned `check` command will.
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
        help: {type: 'boolean', short: 'h', default: false},
        version: {type: 'boolean', short: 'v', default: false},
      },
    });
  } catch (error) {
    process.stderr.write(`${(error as Error).message}\n${HELP}`);
    return 2;
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
    process.stderr.write(`The "${command}" command is not available yet. Use "analyze" for now.\n`);
    return 2;
  }

  if (command !== 'analyze') {
    process.stderr.write(`Unknown command: ${command}\n${HELP}`);
    return 2;
  }

  if (values.format !== 'terminal' && values.format !== 'json') {
    process.stderr.write(`Unknown format: ${values.format}. Use "terminal" or "json".\n`);
    return 2;
  }

  const report = await analyze({
    root: commandArgs[0] ? resolve(commandArgs[0]) : process.cwd(),
    include: values.include,
    ignore: values.ignore,
  });

  const toFile = Boolean(values.output);
  const formatted =
    values.format === 'json'
      ? formatJson(report)
      : formatTerminal(report, {color: !toFile && !values['no-color'] && !process.env.NO_COLOR && process.stdout.isTTY});

  if (values.output) {
    const outputPath = resolve(values.output);
    mkdirSync(dirname(outputPath), {recursive: true});
    writeFileSync(outputPath, formatted);
    process.stdout.write(`Report written to ${values.output}\n`);
  } else {
    process.stdout.write(formatted);
  }

  return 0;
}
