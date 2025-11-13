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

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { createRequire } from 'module';
import type { Plugin } from 'esbuild';

const require = createRequire(import.meta.url);

export interface InlineCSSFontsOptions {
  /**
   * Attribute name to add to the injected style tag
   * @default 'data-inline-css'
   */
  styleAttribute?: string;
  /**
   * Whether to log warnings for unresolved imports/fonts
   * @default true
   */
  verbose?: boolean;
}

/**
 * ESBuild plugin to inline CSS and embed fonts as base64 data URIs
 * 
 * This plugin:
 * - Resolves CSS imports (including @import statements)
 * - Converts font file references to base64 data URIs
 * - Injects CSS as a style tag at runtime
 * 
 * @example
 * ```ts
 * import { inlineCSSFontsPlugin } from '@wso2/esbuild-plugin-inline-css-fonts';
 * 
 * esbuild.build({
 *   plugins: [inlineCSSFontsPlugin()],
 *   // ... other options
 * });
 * ```
 */
export function inlineCSSFontsPlugin(options: InlineCSSFontsOptions = {}): Plugin {
  const {
    styleAttribute = 'data-inline-css',
    verbose = true
  } = options;

  return {
    name: 'inline-css-fonts',
    setup(build) {
      build.onResolve({ filter: /\.css$/ }, (args) => {
        return {
          path: resolve(args.resolveDir, args.path),
          namespace: 'inline-css-fonts'
        };
      });

      build.onLoad({ filter: /.*/, namespace: 'inline-css-fonts' }, async (args) => {
        let css = readFileSync(args.path, 'utf8');
        let cssDir = dirname(args.path);

        // Handle @import statements recursively
        const importRegex = /@import\s+['"]([^'"]+)['"]/g;
        let match;
        while ((match = importRegex.exec(css)) !== null) {
          const importPath = match[1];
          try {
            // Resolve the import path
            let resolvedPath: string;
            if (importPath.startsWith('@')) {
              // Handle node_modules imports
              resolvedPath = require.resolve(importPath, { paths: [process.cwd()] });
            } else {
              resolvedPath = resolve(cssDir, importPath);
            }

            const importedCss = readFileSync(resolvedPath, 'utf8');
            // Update cssDir to the imported CSS directory for relative font paths
            cssDir = dirname(resolvedPath);
            css = css.replace(match[0], importedCss);
          } catch (e) {
            if (verbose) {
              console.warn(`[inline-css-fonts] Could not resolve CSS import: ${importPath}`);
            }
          }
        }

        // Convert font file references to base64 data URIs
        const fontRegex = /url\(["']?(\.\/)?([^"')]+\.(woff2?|ttf|eot|otf))["']?\)/g;
        css = css.replace(fontRegex, (match, prefix, fontFile) => {
          try {
            // Find the font file relative to the last resolved CSS directory
            const fontPath = resolve(cssDir, fontFile);
            const fontData = readFileSync(fontPath);
            const base64 = fontData.toString('base64');
            const ext = fontFile.split('.').pop()?.toLowerCase() || '';
            
            const mimeTypes: Record<string, string> = {
              'woff2': 'font/woff2',
              'woff': 'font/woff',
              'ttf': 'font/ttf',
              'otf': 'font/otf',
              'eot': 'application/vnd.ms-fontobject'
            };
            
            const mimeType = mimeTypes[ext] || 'application/octet-stream';
            return `url(data:${mimeType};base64,${base64})`;
          } catch (e) {
            if (verbose) {
              console.warn(`[inline-css-fonts] Could not embed font file: ${fontFile} from ${cssDir}`);
            }
            return match;
          }
        });

        // Convert CSS to JS that injects a style tag
        const jsCode = `
(function() {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.setAttribute('${styleAttribute}', 'true');
    style.textContent = ${JSON.stringify(css)};
    document.head.appendChild(style);
  }
})();
        `;

        return {
          contents: jsCode,
          loader: 'js'
        };
      });
    }
  };
}

export default inlineCSSFontsPlugin;
