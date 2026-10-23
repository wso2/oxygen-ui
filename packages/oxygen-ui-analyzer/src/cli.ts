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

const HELP = `
Oxygen UI analyzer - Check a project against the Oxygen UI rules

Usage: oxygen-ui-analyzer <command> [dir] [options]

Commands:
  analyze [dir]       Analyze a project (default: the current directory) and print the report
  fix [dir]           Preview the safe automatic fixes; add --apply to write them
  help                Show this help message

Options for analyze and fix:
  --include <glob>    Files to analyze, relative to the project (repeatable)
  --ignore <glob>     Files to skip, in addition to the defaults (repeatable)
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

Planned commands: dev, build, check
`;

const PLANNED_COMMANDS = new Set(['dev', 'build', 'check']);

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

  if (command !== 'analyze' && command !== 'fix') {
    return usageError(`Unknown command: ${command}`);
  }

  if (values.format !== 'terminal' && values.format !== 'json') {
    return usageError(`Unknown format: ${values.format}. Use "terminal" or "json".`);
  }

  if (command === 'analyze') {
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

  const limit = values.limit === undefined ? undefined : Number(values.limit);
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 1)) {
    return usageError(`--limit must be a positive whole number, not "${values.limit}".`);
  }

  const root = commandArgs[0] ? resolve(commandArgs[0]) : process.cwd();
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

function usageError(message: string): number {
  process.stderr.write(`${message}\n${HELP}`);
  return 2;
}
