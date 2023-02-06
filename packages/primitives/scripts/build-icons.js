#!/usr/bin/env node
/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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
 * @fileoverview Build script to generate a JSON file that contains information about input SVGs.
 */

const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const cheerio = require('cheerio');
const { parseSync } = require('svgson');
const trimNewlines = require('trim-newlines');
const merge = require('lodash.merge');
const { logger } = require('@oxygen-ui/logger');

const PATHS = {
  output: path.resolve(path.join(__dirname, '..', 'dist', 'icons', 'data.json')),
  source: {
    icons: path.resolve(path.join(__dirname, '..', 'src', 'icons')),
  },
};

const filepaths = globby.sync(PATHS.source.icons);
const svgFilepaths = filepaths.filter((filepath) => path.parse(filepath).ext === '.svg');

if (svgFilepaths.length === 0) {
  logger.error('No input SVG file(s) found');
  process.exit(1);
}

let exitCode = 0;

const icons = svgFilepaths.map((filepath) => {
  try {
    const filename = path.parse(filepath).base;
    const filenamePattern = /(.+)-([0-9]+).svg$/;

    if (!filenamePattern.test(filename)) {
      throw new Error(
        `${filename}: Invalid filename. Please append the height of the SVG to the end of the filename (e.g. alert-16.svg).`,
      );
    }

    const [, name, height] = filename.match(filenamePattern);
    const svg = fs.readFileSync(path.resolve(filepath), 'utf8');
    const svgElement = cheerio.load(svg)('svg');
    const svgWidth = parseInt(svgElement.attr('width'), 10);
    const svgHeight = parseInt(svgElement.attr('height'), 10);
    const svgViewBox = svgElement.attr('viewBox');
    const svgPath = trimNewlines(svgElement.html()).trim();
    const ast = parseSync(svg, {
      camelcase: true,
    });

    if (!svgWidth) {
      throw new Error(`${filename}: Missing width attribute.`);
    }

    if (!svgHeight) {
      throw new Error(`${filename}: Missing height attribute.`);
    }

    if (!svgViewBox) {
      throw new Error(`${filename}: Missing viewBox attribute.`);
    }

    if (svgHeight !== parseInt(height, 10)) {
      throw new Error(`${filename}: Height in filename does not match height attribute of SVG`);
    }

    const viewBoxPattern = /0 0 ([0-9]+) ([0-9]+)/;

    if (!viewBoxPattern.test(svgViewBox)) {
      throw new Error(
        `${filename}: Invalid viewBox attribute. The viewBox attribute should be in the following format: "0 0 <width> <height>"`,
      );
    }

    const [, viewBoxWidth, viewBoxHeight] = svgViewBox.match(viewBoxPattern);

    if (svgWidth !== parseInt(viewBoxWidth, 10)) {
      throw new Error(`${filename}: width attribute and viewBox width do not match.`);
    }

    if (svgHeight !== parseInt(viewBoxHeight, 10)) {
      throw new Error(`${filename}: height attribute and viewBox height do not match.`);
    }

    return {
      ast,
      height: svgHeight,
      name,
      path: svgPath,
      width: svgWidth,
    };
  } catch (error) {
    logger.error(error);
    // Instead of exiting immediately, we set exitCode to 1 and continue
    // iterating through the rest of the SVGs. This allows us to identify all
    // the SVGs that have errors, not just the first one. An exit code of 1
    // indicates that an error occurred.
    // Reference: https://nodejs.org/api/process.html#process_exit_codes
    exitCode = 1;
    return null;
  }
});

// Exit early if any errors occurred.
if (exitCode !== 0) {
  process.exit(exitCode);
}

const iconsByName = icons.reduce(
  (acc, icon) => merge(acc, {
    [icon.name]: {
      heights: {
        [icon.height]: {
          ast: icon.ast,
          path: icon.path,
          width: icon.width,
        },
      },
      name: icon.name,
    },
  }),
  {},
);

if (PATHS.output) {
  fs.outputJsonSync(PATHS.output, iconsByName);
} else {
  process.stdout.write(JSON.stringify(iconsByName));
}
