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
 * @fileoverview Build a static version of the website with all the documentation. (Storybook, Examples, etc.)
 */

const cp = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { logger } = require('@oxygen-ui/logger');
require('dotenv').config({ path: path.resolve(path.join(__dirname, '..', '.env.local')) })

const PATHS = {
  docs: {
    root: path.resolve(path.join(__dirname, '..')),
    output: {
      examples: path.resolve(path.join(__dirname, '..', 'out', 'examples')),
      react: path.resolve(path.join(__dirname, '..', 'out', 'react'))
    }
  },
  react: {
    root: path.resolve(path.join(__dirname, '..', '..', '..', 'packages', 'react')),
    storybookStatic: path.resolve(path.join(__dirname, '..', '..', '..', 'packages', 'react', 'storybook-static')),
  },
  examples: {
    root: path.resolve(path.join(__dirname, '..', '..', '..', 'examples')),
  },
};

const ENV = {
  docs: {
    '.env.local': {
      context: {
        resolveAbsoluteFilePath: (file) => path.join(PATHS.docs.root, file),
      },
      vars: {
        'BUILD_MODE': 'static'
      }
    }
  },
  examples: {
    '.env.local': {
      context: {
        resolveAbsoluteFilePath: (file) => path.join(PATHS.examples.root, file),
      },
      vars: {
        'PUBLIC_URL': '<RESOLVED_DYNAMICALLY>'
      }
    }
  },
  react: {
    '.env.local': {
      context: {
        resolveAbsoluteFilePath: (file) => path.join(PATHS.react.root, file),
      },
      vars: {
        'STORYBOOK_BASE_URL': '/react/',
      }
    }
  }
}

const ENV_SAMPLE_FILE_NAME = '.env.example';

/**
 * Updates the environment variable in the given `.env` file.
 *
 * @param {string} varName - Name of the environment variable.
 * @param {string} varValue - Value of the environment variable.
 * @param {string} filePath - Path to the `.env` file.
 */
const updateEnv = (varName, varValue, filePath) => {
  logger.info(`Started updating environment file: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    logger.warn(`The provided environment file doesn't exist: ${filePath}`);

    if (!fs.existsSync(path.join(path.dirname(filePath), ENV_SAMPLE_FILE_NAME))) {
      logger.warn(`Couldn't find a sample environment file: ${path.join(path.dirname(filePath), ENV_SAMPLE_FILE_NAME)}`);
      logger.info(`Creating a new environment file: ${filePath}`);
      fs.writeFileSync(filePath, `${varName}=${varValue}`, 'utf8');

      return;
    }

    logger.info(`Found a sample environment file: ${path.join(path.dirname(filePath), ENV_SAMPLE_FILE_NAME)}`);
    logger.info(`Copying the sample environment file to: ${filePath}`);
    fs.copyFileSync(path.join(path.dirname(filePath), ENV_SAMPLE_FILE_NAME), filePath);
  }

  logger.info(`Found environment file: ${filePath}`);

  let data = '';
  try {
    data = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    logger.error(`Error reading file ${filePath}: ${err.message}`);
    return;
  }

  const lines = data.split('\n');
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith(`${varName}=`)) {
      lines[i] = `${varName}=${varValue}`;
      modified = true;
      break;
    }
  }

  if (!modified) {
    lines.push(`${varName}=${varValue}`);
  }

  const newContents = lines.join('\n');

  logger.info(`Writing to environment file: ${filePath}`);

  try {
    fs.writeFileSync(filePath, newContents, 'utf8');
    logger.info(`Updated ${filePath} successfully.`);
  } catch (err) {
    logger.error(`Error writing file ${filePath}: ${err.message}`);
  }
};

/* ====================================================================================== */
/* Execution starts from here                                                             */
/* ====================================================================================== */

logger.log('=====================  📃 Started Building Documentation 📃  ======================');
logger.log();
logger.log('                            🌲  Building Docs Root  🌲                             ');
logger.log();

Object.entries(ENV.docs).forEach(([file, config]) => {
  Object.entries(config.vars).forEach(([varName, varValue]) => {
    updateEnv(varName, varValue, config.context.resolveAbsoluteFilePath(file));
  });
});

cp.execSync('next build && next export', { stdio: 'inherit' });

logger.log();
logger.log('                            🎨  Building Storybook  🎨                            ');
logger.log();

Object.entries(ENV.react).forEach(([file, config]) => {
  Object.entries(config.vars).forEach(([varName, varValue]) => {
    updateEnv(varName, varValue, config.context.resolveAbsoluteFilePath(file));
  });
});

cp.execSync(`cd ${PATHS.react.root} && pnpm build:storybook`, { stdio: 'inherit' });
fs.copySync(path.resolve(PATHS.react.storybookStatic), path.resolve(PATHS.docs.output.react));

logger.log();
logger.log('                            🦋  Building Examples  🦋                            ');
logger.log();

const directories = fs.readdirSync(PATHS.examples.root, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const directory of directories) {
  const projectPath = path.join(PATHS.examples.root, directory);
  logger.info(`Building project ${directory}...`);

  try {
    Object.entries(ENV.examples).forEach(([file, config]) => {
      Object.entries(config.vars).forEach(([varName, _]) => {
        updateEnv(varName, `/examples/${directory}/`, config.context.resolveAbsoluteFilePath(path.join(directory, file)));
      });
    });

    cp.execSync(`pnpm build`, { cwd: projectPath, stdio: 'inherit' });
    fs.copySync(path.join(projectPath, 'build'), path.resolve(path.join(PATHS.docs.output.examples, directory)))
  } catch (err) {
    logger.error(`Error building project ${directory}: ${err.message}`);
  }
}
