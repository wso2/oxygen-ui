#!/usr/bin/env node
/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '@oxygen-ui/logger';
import cheerio from 'cheerio';
import fs from 'fs-extra';
import merge from 'lodash.merge';
import { parseSync } from 'svgson';
import trimNewlines from 'trim-newlines';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const PATHS = {
  output: path.resolve(__dirname, '..', 'dist', 'icons', 'data.json'),
  source: {
    icons: path.resolve(__dirname, '..', 'src', 'icons'),
  },
};

const getSvgFilePaths = async () => {
  const iconFiles = await fs.readdir(PATHS.source.icons);
  return iconFiles.filter((file) => path.extname(file) === '.svg')
    .map((file) => path.resolve(PATHS.source.icons, file));
};

const processSvgFile = async (filepath) => {
  try {
    const filename = path.basename(filepath);
    const filenamePattern = /(.+)-([0-9]+).svg$/;

    if (!filenamePattern.test(filename)) {
      throw new Error(`${filename}: Invalid filename. Please append the height to the filename (e.g., alert-16.svg).`);
    }

    const [, name, height] = filename.match(filenamePattern);
    const svg = await fs.readFile(filepath, 'utf8');
    const svgElement = cheerio.load(svg)('svg');

    const svgWidth = parseInt(svgElement.attr('width'), 10);
    const svgHeight = parseInt(svgElement.attr('height'), 10);
    const svgViewBox = svgElement.attr('viewBox');
    const svgPath = trimNewlines(svgElement.html()).trim();
    const ast = parseSync(svg, { camelcase: true });

    if (!svgWidth || !svgHeight || !svgViewBox) {
      throw new Error(`${filename}: Missing required SVG attributes (width, height, or viewBox).`);
    }

    if (parseInt(height, 10) !== svgHeight) {
      throw new Error(`${filename}: Height in filename does not match height attribute of SVG.`);
    }

    const viewBoxPattern = /0 0 ([0-9]+) ([0-9]+)/;
    const viewBoxMatch = svgViewBox.match(viewBoxPattern);

    if (!viewBoxMatch || parseInt(viewBoxMatch[1], 10) !== svgWidth || parseInt(viewBoxMatch[2], 10) !== svgHeight) {
      throw new Error(`${filename}: viewBox dimensions do not match width and height attributes.`);
    }

    return {
      ast, height: svgHeight, name, path: svgPath, width: svgWidth,
    };
  } catch (error) {
    logger.error(error.message);
    return null;
  }
};

const main = async () => {
  const svgFilepaths = await getSvgFilePaths();

  if (svgFilepaths.length === 0) {
    logger.error('No input SVG file(s) found');
    process.exit(1);
  }

  const icons = (await Promise.all(svgFilepaths.map(processSvgFile))).filter(Boolean);

  if (icons.length === 0) {
    process.exit(1);
  }

  const iconsByName = icons.reduce((acc, icon) => merge(acc, {
    [icon.name]: {
      heights: {
        [icon.height]: { ast: icon.ast, path: icon.path, width: icon.width },
      },
      name: icon.name,
    },
  }), {});

  if (PATHS.output) {
    await fs.outputJson(PATHS.output, iconsByName);
  } else {
    process.stdout.write(JSON.stringify(iconsByName));
  }
};

main().catch((error) => {
  logger.error('Unexpected error:', error);
  process.exit(1);
});
