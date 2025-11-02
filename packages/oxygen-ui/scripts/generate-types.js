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

// Node.js script to copy generated .d.ts files for subpath exports (ESM)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src/components');
const distDir = path.join(__dirname, '../dist/components');

function copyDtsFiles(src, destRoot) {
  fs.readdirSync(src, { withFileTypes: true }).forEach(dirent => {
    const srcPath = path.join(src, dirent.name);
    if (dirent.isDirectory()) {
      copyDtsFiles(srcPath, destRoot);
    } else if (dirent.isFile() && dirent.name.endsWith('.d.ts')) {
      // Copy to dist/components (preserve structure)
      const relPath = path.relative(srcDir, srcPath);
      const destPath = path.join(distDir, relPath);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      // Also copy to dist root for top-level types
      const topLevelDest = path.join(__dirname, '../dist', relPath);
      fs.mkdirSync(path.dirname(topLevelDest), { recursive: true });
      fs.copyFileSync(srcPath, topLevelDest);
    }
  });
}

copyDtsFiles(distDir, distDir);
