/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import pc from 'picocolors';

export const logger = {
  info: (message: string) => console.log(pc.cyan('info') + ' ' + message),
  success: (message: string) => console.log(pc.green('✔') + ' ' + message),
  warn: (message: string) => console.log(pc.yellow('warn') + ' ' + message),
  error: (message: string) => console.log(pc.red('error') + ' ' + message),
  step: (message: string) => console.log(pc.blue('→') + ' ' + message),
};

export function printBanner(): void {
  console.log();
  console.log(pc.bold(pc.cyan('  Create Oxygen UI Project')));
  console.log(pc.dim('  WSO2 Design System Starter'));
  console.log();
}

export function printSuccess(projectName: string, packageManager: string = 'npm'): void {
  console.log();
  console.log(pc.green(pc.bold('✔ Project created successfully!')));
  console.log();
  console.log('  Next steps:');
  console.log();
  console.log(pc.cyan(`    cd ${projectName}`));
  console.log(pc.cyan(`    ${packageManager} run dev`));
  console.log();
  console.log(pc.dim('  Happy coding!'));
  console.log();
}

export function createSpinner(message: string): {
  start: () => void;
  stop: (success?: boolean, finalMessage?: string) => void;
} {
  let interval: ReturnType<typeof setInterval> | null = null;
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let frameIndex = 0;
  const isTTY = process.stdout.isTTY;

  return {
    start: () => {
      if (isTTY) {
        process.stdout.write(`  ${pc.cyan(frames[frameIndex])} ${message}`);
        interval = setInterval(() => {
          frameIndex = (frameIndex + 1) % frames.length;
          process.stdout.clearLine?.(0);
          process.stdout.cursorTo?.(0);
          process.stdout.write(`  ${pc.cyan(frames[frameIndex])} ${message}`);
        }, 80);
      } else {
        console.log(`  ${pc.cyan('○')} ${message}`);
      }
    },
    stop: (success = true, finalMessage?: string) => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      const icon = success ? pc.green('✔') : pc.red('✖');
      if (isTTY) {
        process.stdout.clearLine?.(0);
        process.stdout.cursorTo?.(0);
      }
      console.log(`  ${icon} ${finalMessage || message}`);
    },
  };
}
