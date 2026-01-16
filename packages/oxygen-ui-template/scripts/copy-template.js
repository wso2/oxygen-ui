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

/**
 * This script copies the sample app to the template directory and transforms it
 * for use as a project template (replaces workspace dependencies, adds placeholders, etc.)
 */

import { cp, readFile, writeFile, rm, readdir, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PKG_DIR = join(__dirname, '..');
const SAMPLE_APP_DIR = join(TEMPLATE_PKG_DIR, '..', '..', 'samples', 'oxygen-ui-test-app');
const TEMPLATE_DIR = join(TEMPLATE_PKG_DIR, 'template');

// Files/folders to exclude from copy
const EXCLUDE = [
  'node_modules',
  'dist',
  '.tsbuildinfo',
  'stats.html',
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
];

// Oxygen UI package versions to use in template (will be replaced with actual versions)
const OXYGEN_UI_VERSION = '^0.0.1-alpha.12';

async function copyDirectory(src, dest, exclude = []) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    if (exclude.includes(entry.name)) continue;

    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath, exclude);
    } else {
      await cp(srcPath, destPath);
    }
  }
}

async function transformPackageJson(templateDir) {
  const pkgPath = join(templateDir, 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf-8'));

  // Transform to template format
  pkg.name = '{{PACKAGE_NAME}}';
  pkg.version = '0.1.0';
  pkg.description = '{{DESCRIPTION}}';
  delete pkg.publishConfig;

  // Replace workspace:* dependencies with actual versions
  if (pkg.dependencies) {
    for (const [name, version] of Object.entries(pkg.dependencies)) {
      if (version === 'workspace:*' || version.startsWith('workspace:')) {
        if (name.startsWith('@wso2/oxygen-ui')) {
          pkg.dependencies[name] = OXYGEN_UI_VERSION;
        }
      }
      // Replace catalog: references with actual versions
      if (version === 'catalog:') {
        if (name === 'react') pkg.dependencies[name] = '^19.0.0';
        else if (name === 'react-dom') pkg.dependencies[name] = '^19.0.0';
      }
    }
  }

  // Replace catalog: devDependencies
  if (pkg.devDependencies) {
    const devDepVersions = {
      '@eslint/js': '^9.12.0',
      '@types/node': '^24.0.0',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      '@vitejs/plugin-react-swc': '^4.2.0',
      'eslint': '^9.12.0',
      'eslint-plugin-react-hooks': '^5.0.0',
      'eslint-plugin-react-refresh': '^0.4.0',
      'globals': '^16.0.0',
      'typescript': '^5.7.0',
      'typescript-eslint': '^8.0.0',
      'vite': '^7.0.0',
    };

    for (const [name, version] of Object.entries(pkg.devDependencies)) {
      if (version === 'catalog:') {
        pkg.devDependencies[name] = devDepVersions[name] || version;
      }
    }

    // Remove rollup-plugin-visualizer (storybook specific)
    delete pkg.devDependencies['rollup-plugin-visualizer'];
  }

  // Update engines
  pkg.engines = { node: '>=20.0.0' };

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

async function transformViteConfig(templateDir) {
  const configPath = join(templateDir, 'vite.config.ts');

  // Simple vite config without storybook-specific code
  const newConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [react()],
})
`;

  await writeFile(configPath, newConfig);
}

async function transformIndexHtml(templateDir) {
  const htmlPath = join(templateDir, 'index.html');
  let html = await readFile(htmlPath, 'utf-8');

  // Replace title with placeholder
  html = html.replace(/<title>.*<\/title>/, '<title>{{PROJECT_NAME}}</title>');

  await writeFile(htmlPath, html);
}

async function addGitignore(templateDir) {
  const gitignore = `# Dependencies
node_modules/

# Build outputs
dist/
*.tsbuildinfo

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~
.DS_Store

# Environment files
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# OS
Thumbs.db

# Temporary files
*.tmp
*.temp
.cache/

# Package manager locks (keep one based on your preference)
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
`;

  await writeFile(join(templateDir, '.gitignore'), gitignore);
}

async function main() {
  console.log('Copying sample app to template directory...');

  // Remove existing template directory
  await rm(TEMPLATE_DIR, { recursive: true, force: true });

  // Copy sample app
  await copyDirectory(SAMPLE_APP_DIR, TEMPLATE_DIR, EXCLUDE);

  // Transform files
  console.log('Transforming package.json...');
  await transformPackageJson(TEMPLATE_DIR);

  console.log('Transforming vite.config.ts...');
  await transformViteConfig(TEMPLATE_DIR);

  console.log('Transforming index.html...');
  await transformIndexHtml(TEMPLATE_DIR);

  console.log('Adding .gitignore...');
  await addGitignore(TEMPLATE_DIR);

  console.log('Template prepared successfully!');
}

main().catch((err) => {
  console.error('Failed to prepare template:', err);
  process.exit(1);
});
