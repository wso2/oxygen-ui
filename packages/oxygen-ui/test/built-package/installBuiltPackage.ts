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

import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { rolldown, type Plugin } from 'rolldown';
import { build as viteBuild } from 'vite';

const packageRoot = fileURLToPath(new URL('../..', import.meta.url));

const markerCode = {
  // `MuiDataGrid` would not do: the Oxygen themes use it as a style override key.
  'Data Grid': 'GridRoot',
  'date pickers': 'MuiDateCalendar',
  'Tree View': 'MuiTreeItem',
  Prism: 'Prism.languages',
  'font injection': 'data-oxygen-fonts',
} as const;

export type Marker = keyof typeof markerCode;

export type Bundler = 'rolldown' | 'vite';

interface BundleReport {
  gzipBytes: number;
  markers: Marker[];
}

export interface InstalledPackage {
  bundle(appSource: string, bundler: Bundler): Promise<BundleReport>;
  barrelExportNames(): Promise<string[]>;
  remove(): void;
}

const reactIsExternal = [/^react($|\/)/, /^react-dom($|\/)/];

// rolldown refuses to bundle CSS, and the icons package and MUI X Data Grid both import a stylesheet.
const stylesheetsAsEmptyModules: Plugin = {
  name: 'stylesheets-as-empty-modules',
  load(id) {
    if (id.endsWith('.css')) {
      return { code: '', moduleType: 'js', moduleSideEffects: false };
    }
    return null;
  },
};

interface Chunk {
  code: string;
  exports: string[];
  isEntry: boolean;
}

type Bundle = (appRoot: string, entry: string) => Promise<Chunk[]>;

const bundleWithRolldown: Bundle = async (appRoot, entry) => {
  const build = await rolldown({
    input: entry,
    cwd: appRoot,
    platform: 'browser',
    external: reactIsExternal,
    logLevel: 'silent',
    plugins: [stylesheetsAsEmptyModules],
  });

  try {
    const { output } = await build.generate({ format: 'esm', minify: true });

    return output.filter(file => file.type === 'chunk');
  } finally {
    await build.close();
  }
};

// Vite takes NODE_ENV from the process, and under Vitest that is `test`, which selects the
// dependencies' development builds and keeps their development-only branches.
async function withProductionNodeEnv<T>(run: () => Promise<T>): Promise<T> {
  const runnerNodeEnv = process.env.NODE_ENV;

  process.env.NODE_ENV = 'production';
  try {
    return await run();
  } finally {
    if (runnerNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = runnerNodeEnv;
    }
  }
}

const bundleWithVite: Bundle = async (appRoot, entry) => {
  const result = await withProductionNodeEnv(() => viteBuild({
    root: appRoot,
    configFile: false,
    logLevel: 'silent',
    build: {
      write: false,
      minify: 'esbuild',
      rollupOptions: {
        input: entry,
        external: reactIsExternal,
        // Vite treats the entry as an app and drops its exports, which empties the bundle.
        preserveEntrySignatures: 'strict',
      },
    },
  }));

  return [result]
    .flat()
    .flatMap(built => ('output' in built ? built.output : []))
    .filter(file => file.type === 'chunk');
};

const bundleWith: Record<Bundler, Bundle> = { rolldown: bundleWithRolldown, vite: bundleWithVite };

function packInto(directory: string): string {
  execFileSync('pnpm', ['pack', '--pack-destination', directory], { cwd: packageRoot, stdio: 'pipe' });
  const [tarball] = readdirSync(directory).filter(file => file.endsWith('.tgz'));

  return join(directory, tarball);
}

function linkDependencies(installedPackage: string, nodeModules: string): void {
  const manifest = JSON.parse(readFileSync(join(installedPackage, 'package.json'), 'utf8'));

  for (const dependency of Object.keys({ ...manifest.dependencies, ...manifest.peerDependencies })) {
    const link = join(nodeModules, dependency);

    mkdirSync(dirname(link), { recursive: true });
    symlinkSync(join(packageRoot, 'node_modules', dependency), link, 'junction');
  }
}

/**
 * The app gets the packed files and only the dependencies their manifest declares, so the bundlers
 * read the published `exports` and `sideEffects`, and an undeclared import fails as it would in a product.
 */
export function installBuiltPackage(): InstalledPackage {
  if (!existsSync(join(packageRoot, 'dist'))) {
    throw new Error('@wso2/oxygen-ui is not built. Run `pnpm build` before this test.');
  }

  const appRoot = realpathSync(mkdtempSync(join(tmpdir(), 'oxygen-ui-built-package-')));
  const nodeModules = join(appRoot, 'node_modules');
  const installedPackage = join(nodeModules, '@wso2', 'oxygen-ui');
  let appCount = 0;

  const bundleApp = (appSource: string, bundler: Bundler): Promise<Chunk[]> => {
    appCount += 1;
    const entry = join(appRoot, `app-${appCount}.js`);

    writeFileSync(entry, appSource);

    return bundleWith[bundler](appRoot, entry);
  };

  mkdirSync(installedPackage, { recursive: true });
  execFileSync('tar', ['-xzf', packInto(appRoot), '-C', installedPackage, '--strip-components=1']);
  linkDependencies(installedPackage, nodeModules);
  writeFileSync(join(appRoot, 'package.json'), JSON.stringify({ private: true, type: 'module' }));

  return {
    async bundle(appSource, bundler) {
      const chunks = await bundleApp(appSource, bundler);
      const code = chunks.map(chunk => chunk.code).join('\n');
      const markers = (Object.keys(markerCode) as Marker[]).filter(marker => code.includes(markerCode[marker]));

      return { gzipBytes: gzipSync(code).length, markers };
    },
    async barrelExportNames() {
      const chunks = await bundleApp(`export * from '@wso2/oxygen-ui';\n`, 'rolldown');

      return chunks.flatMap(chunk => (chunk.isEntry ? chunk.exports : [])).sort();
    },
    remove() {
      rmSync(appRoot, { recursive: true, force: true });
    },
  };
}
