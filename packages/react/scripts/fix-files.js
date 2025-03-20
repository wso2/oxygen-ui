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

const fs = require('fs');
const path = require('path');
const {logger} = require('@oxygen-ui/logger');
const sass = require('sass');

const fixFiles = () => {
  // All files and directories in the src/components folder.
  const componentFiles = fs.readdirSync(path.resolve(__dirname, '..', 'src', 'components'));

  // All directories in the src/components folder.
  const componentDirs = componentFiles.filter(file => {
    const componentDir = path.resolve(__dirname, '..', 'src', 'components', file);

    return fs.lstatSync(componentDir).isDirectory();
  });

  // The directories containing the files bundled by Rollup.
  const moduleDirs = ['cjs', 'esm'];

  // The non-component directories in the dist folder.
  const nonComponentDirsInDist = fs
    .readdirSync(path.resolve(__dirname, '..', 'dist'))
    .filter(
      file =>
        !componentDirs.includes(file) &&
        fs.lstatSync(path.resolve(__dirname, '..', 'dist', file)).isDirectory() &&
        !moduleDirs.includes(file),
    );

  /**
   * This method fixes the references to the non-component directories in the dist folder such as utils, constants, etc.
   * in imports.
   *
   * @param {string} file - The file to be fixed.
   * @returns {string} - The fixed file.
   */
  const fixImportStatements = file => {
    // eslint-disable-next-line no-useless-escape
    const regExpString = `(import.*from.*[\"|'])(.*(${nonComponentDirsInDist.join('|')}).*)([\"|'].*)`;
    const regExp = new RegExp(regExpString, 'g');

    return file.replace(
      regExp,
      (_fullMatch, groupOne, groupTwo, _groupThree, groupFour) =>
        `${groupOne}${groupTwo.replace('../', '')}${groupFour}`,
    );
  };

  // The JS code that injects CSS into the head tag.
  const codeToInjectCSSIntoHeadTag =
    "function addCSS(css){var head = document.getElementsByTagName('head')[0];" +
    "var s = document.createElement('style');s.setAttribute('type', 'text/css');" +
    's.appendChild(document.createTextNode(css));head.appendChild(s);}';

  /**
   * This method injects the `addCSS` function into the file passed as the argument, compiles the
   * SASS code corresponding to the component into CSS, and calls the `addCSS` method with the CSS code as the argument.
   *
   * @param {string} file - The file to be injected with the `addCSS` function.
   * @param {string} filePath - The path to the file.
   * @returns {string} file - The file with the `addCSS` function injected.
   */
  const loadCSS = (file, filePath) => {
    const componentDir = filePath.split(path.sep).slice(-2)[0];
    let css = '';

    file.match(/['|"].*\.scss["|']/g)?.forEach(match => {
      const sassFilePath = path.resolve(
        __dirname,
        '..',
        'src',
        'components',
        componentDir,
        match.replace(/['|"]/g, ''),
      );
      css += sass.compile(sassFilePath).css;
    });

    const updatedFile = file.replace(/import.*['|"].*\.scss["|'].*/g, '');

    if (css === '' || path.extname(filePath) === '.ts') {
      return updatedFile;
    }

    return `${updatedFile}${codeToInjectCSSIntoHeadTag}\naddCSS(${JSON.stringify(css)});`;
  };

  /**
   * This method updates imports and injects CSS into component files.
   *
   * @param {string} filePath - The path to the file to be fixed.
   */
  const processFile = filePath => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        logger.error(err);
        return;
      }

      const fixedImports = fixImportStatements(data);
      const fixedCSS = loadCSS(fixedImports, filePath);

      fs.writeFile(filePath, fixedCSS, 'utf8', writeErr => {
        if (writeErr) {
          logger.error(writeErr);
        }
      });
    });
  };

  /**
   * Traverses through the directories and fixes imports and injects CSS.
   *
   * @param {string} directory - The directory to be parsed.
   */
  const parseComponents = directory => {
    fs.readdirSync(directory).forEach(file => {
      const absolutePath = path.resolve(directory, file);
      if (![...nonComponentDirsInDist, ...moduleDirs].includes(file)) {
        if (fs.statSync(absolutePath).isDirectory()) {
          parseComponents(absolutePath);
        } else if (
          (file.endsWith('.js') || file.endsWith('.ts')) &&
          componentDirs.includes(directory.split(path.sep).slice(-1)[0])
        ) {
          processFile(absolutePath);
        }
      }
    });
  };

  parseComponents(path.resolve(__dirname, '..', 'dist'));
};

module.exports = fixFiles;
