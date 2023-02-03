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

const oxygenIcons = require('@oxygen-ui/primitives/dist/icons/data.json');
const {default: generate} = require('@babel/generator');
const t = require('@babel/types');
const fse = require('fs-extra');
const path = require('path');
const {logger} = require('@oxygen-ui/logger');

const PATHS = {
  get generated() {
    return path.join(this.src, '__generated__');
  },
  get iconTypesSrc() {
    return path.join(this.generated, 'icons.d.ts');
  },
  get iconsSrc() {
    return path.join(this.generated, 'icons.js');
  },
  src: path.resolve(__dirname, '..', 'src'),
};

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */';

const pascalCase = str => str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());

/**
 * Convert a given node from an svg AST into a JS AST of JSX Elements
 */
const svgToJSX = node => {
  if (node.type === 'element') {
    const children = node.children.map(svgToJSX);

    if (node.name === 'svg') {
      if (children.length === 0) {
        throw new Error(`No children available for icon`);
      }

      if (children.length > 1) {
        return t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), children);
      }

      return children[0];
    }

    const attrs = Object.entries(node.attributes).map(([key, value]) => {
      if (typeof value !== 'string') {
        throw new Error(`Unknown value type: ${value}`);
      }
      return t.jsxAttribute(t.jsxIdentifier(key), t.stringLiteral(value));
    });
    const openingElement = t.jsxOpeningElement(t.jsxIdentifier(node.name), attrs, children.length === 0);
    const closingElement = t.jsxClosingElement(t.jsxIdentifier(node.name));

    if (children.length > 0) {
      return t.jsxElement(openingElement, closingElement, children, false);
    }

    return t.jsxElement(openingElement, closingElement, [], true);
  }

  throw new Error(`Unknown type: ${node.type}`);
};

const icons = Object.entries(oxygenIcons)
  .map(([key, icon]) => {
    const name = `${pascalCase(key)}Icon`;

    const svgData = t.objectExpression(
      Object.entries(icon.heights).map(([svgHeight, svgIcon]) =>
        t.objectProperty(
          t.stringLiteral(svgHeight),
          t.objectExpression([
            t.objectProperty(t.stringLiteral('width'), t.numericLiteral(svgIcon.width)),
            t.objectProperty(t.stringLiteral('path'), svgToJSX(svgIcon.ast)),
          ]),
        ),
      ),
    );
    const {code} = generate(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(name),
          t.addComment(
            t.callExpression(t.identifier('CreateIconComponent'), [
              // The name of the generated icon
              t.stringLiteral(name),
              // The className used on the underlying <svg> element
              t.stringLiteral(`OxygenIcon OxygenIcon-${key}`),
              t.arrowFunctionExpression([], t.blockStatement([t.returnStatement(svgData)])),
            ]),
            'leading',
            '#__PURE__',
          ),
        ),
      ]),
    );

    return {
      code,
      key,
      name,
    };
  })
  .sort((a, b) => a.key.localeCompare(b.key));

const writeIcons = file => {
  const count = icons.length;
  const svgCode = `${GENERATED_HEADER}
import React from 'react'
import { CreateIconComponent } from '../create-icon-component.jsx'

${icons.map(({code}) => code).join('\n')}

export {
  ${icons.map(({name}) => name).join(',\n  ')}
}`;

  return fse.writeFile(file, svgCode, 'utf8').then(() => {
    logger.warn(`wrote ${file} with ${count} exports`);
    return icons;
  });
};

const writeTypes = file => {
  const count = icons.length;
  const code = `${GENERATED_HEADER}
import * as React from 'react'

type Size = 'small' | 'medium' | 'large'

interface IconProps {
  'aria-label'?: string
  className?: string
  fill?: string
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
}

type Icon = React.FC<IconProps>

${icons.map(({name}) => `declare const ${name}: Icon`).join('\n')}

export {
  Icon,
  IconProps,
  ${icons.map(({name}) => name).join(',\n  ')}
}`;
  return fse.writeFile(file, code, 'utf8').then(() => {
    logger.warn(`wrote ${file} with ${count} exports`);
    return icons;
  });
};

fse
  .mkdirs(PATHS.generated)
  .then(() => writeIcons(PATHS.iconsSrc))
  .then(() => writeTypes(PATHS.iconTypesSrc))
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });
