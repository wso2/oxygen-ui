#!/usr/bin/env node
/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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
import { globby } from 'globby';
import path from 'path';
import fs from 'fs-extra';
import compiler from './compiler.js';

const {
  copy, remove, mkdirp, readFile, writeFile,
} = fs;

const inDir = 'src';
const outDir = 'dist';
const encoding = 'utf8';

const paths = {
  input: {
    sass: path.join(inDir, 'sass'),
  },
  output: {
    css: path.join(outDir, 'css'),
    sass: path.join(outDir, 'sass'),
  },
};

// Bundle paths are normalized in getPathName() using dirname() and then
// replacing any slashes with hyphens, but some bundles need to be
// special-cased. Keys in this object are the path minus the "src/" prefix,
// and values are the bundle file base name. ("oxygen" produces
// "dist/oxygen.css", etc.)
const bundleNames = {
  'index.scss': 'oxygen',
};

async function dist() {
  try {
    const bundles = {};

    await remove(outDir);
    await mkdirp(paths.output.css);

    await mkdirp(paths.output.sass);

    const copyFolderSync = (from, to) => {
      if (!fs.existsSync(to)) {
        fs.mkdirSync(to);
      }
      fs.readdirSync(from).forEach((element) => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
          if (/^.*\.(scss)$/.test(element)) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
          } else {
            console.log('Not a valid SASS file.');
          }
        } else {
          copyFolderSync(path.join(from, element), path.join(to, element));
        }
      });
    };

    try {
      copyFolderSync(paths.input.sass, paths.output.sass);
    } catch (err) {
      console.error('ERR', err);
    }

    const files = await globby([`${paths.input.sass}/**/index.scss`]);

    const inPattern = new RegExp(`^${paths.input.sass}/`);
    const tasks = files.map(async (from) => {
      const filePath = from.replace(inPattern, '');
      const name = bundleNames[filePath] || getPathName(path.dirname(filePath));

      const to = path.join(paths.output.css, `${name}.css`);
      const meta = {
        name,
        source: from,
        sass: `@oxygen/styles/${filePath}`,
        css: to,
        map: `${to}.map`,
      };

      const scss = await readFile(from, encoding);
      meta.imports = getExternalImports(scss, filePath).map(getPathName);
      const result = await compiler(scss, { from, to });
      const warnings = result.warnings();

      // We don't want to release changes that cause warnings with postcss. Fail the dist build if any warnings are detected.
      if (warnings.length) {
        for (const warning of warnings) {
          console.warn(warning.toString());
        }
        throw new Error(`Warnings while compiling ${from}.  See output above.`);
      }

      await Promise.all([
        writeFile(to, result.css, encoding),
        result.map ? writeFile(meta.map, result.map.toString(), encoding) : null,
      ]);
      bundles[name] = meta;
    });

    await Promise.all(tasks);

    const meta = { bundles };
    await writeFile(path.join(outDir, 'meta.json'), JSON.stringify(meta, null, 2), encoding);
    await copy(path.join(paths.input.sass, 'deprecations.json'), path.join(outDir, 'deprecations.json'));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

function getExternalImports(scss, relativeTo) {
  const imports = [];
  const dir = path.dirname(relativeTo);
  // XXX: this might *seem* fragile, but since we enforce double quotes via
  // stylelint, I think it's kosher.
  scss.replace(/@import "(.+)\/index\.scss";/g, (_, dep) => {
    imports.push(path.join(dir, dep));
  });
  return imports;
}

function getPathName(_path) {
  return _path.replace(/\//g, '-');
}

dist();
