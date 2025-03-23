/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import fs from 'fs/promises';
import path from 'path';
import { logger } from '@oxygen-ui/logger';

const packagePath = process.cwd();
const srcPath = path.join(packagePath, 'src');
const srcIconsPath = path.join(srcPath, 'icons');
const figmaPath = path.join(packagePath, 'figma');
const figmaExportPath = path.join(figmaPath, '.export');
const figmaIconsExportPath = path.join(figmaExportPath, 'icons');
const manifestDir = path.join(figmaIconsExportPath, 'manifest');
const iconManifestPath = path.join(manifestDir, 'icon-manifest.txt');

/**
 * Converts the icon file name to the required format.
 * @param {string} fileName - The name of the SVG file.
 * @returns {string} The converted icon name.
 */
function convertIconName(fileName) {
  const nameParts = fileName.split('-');
  nameParts.pop();

  const iconName = nameParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');

  return `${iconName}Icon.svg`;
}

/**
 * Processes the icons in the source directory and exports them to the Figma export directory.
 */
async function processIcons() {
  try {
    await fs.mkdir(figmaIconsExportPath, { recursive: true });

    const files = await fs.readdir(srcIconsPath);
    const svgFiles = files.filter((file) => file.endsWith('.svg'));

    const iconManifest = [];

    await Promise.all(
      svgFiles.map(async (fileName) => {
        const newIconName = convertIconName(fileName);
        const srcIconPath = path.join(srcIconsPath, fileName);
        const destIconPath = path.join(figmaIconsExportPath, newIconName);

        await fs.copyFile(srcIconPath, destIconPath);

        iconManifest.push(newIconName.replace('.svg', ''));
      }),
    );

    await fs.mkdir(manifestDir, { recursive: true });
    await fs.writeFile(iconManifestPath, iconManifest.join('\n'), 'utf8');

    logger.info('Icons processed and exported successfully!');
  } catch (err) {
    logger.error('Error processing icons:', err);
  }
}

async function run() {
  try {
    logger.info('Starting the icon processing script...');

    try {
      await fs.access(figmaExportPath);
      await fs.rm(figmaExportPath, { recursive: true });

      logger.info('`.export` directory exist. Removing the directory...');
    } catch (err) {
      logger.info('`.export` directory does not exist. Proceeding...');
    }

    await processIcons();

    logger.info('Icon processing completed.');
  } catch (err) {
    logger.error('Error in run function:', err);

    process.exit(1);
  }
}

run();
