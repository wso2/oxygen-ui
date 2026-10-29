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

/**
 * Converts a glob pattern for project paths to a regular expression. Supports `**` (any number of
 * directories), `*` (anything except `/`), `?` (one character except `/`) and `{a,b}` alternatives.
 * Paths use forward slashes and are relative to the project root.
 */
export function globToRegExp(pattern: string): RegExp {
  let source = '';
  let depth = 0;

  for (let index = 0; index < pattern.length; index += 1) {
    const char = pattern[index];

    if (char === '*') {
      if (pattern[index + 1] === '*') {
        const atSegmentStart = index === 0 || pattern[index - 1] === '/';
        const atSegmentEnd = index + 2 === pattern.length || pattern[index + 2] === '/';
        index += 1;

        if (atSegmentStart && atSegmentEnd) {
          // "**/" matches zero or more directories; a trailing "**" matches everything below.
          if (pattern[index + 1] === '/') {
            source += '(?:.*/)?';
            index += 1;
          } else {
            source += '.*';
          }
          continue;
        }
      }

      source += '[^/]*';
    } else if (char === '?') {
      source += '[^/]';
    } else if (char === '{') {
      depth += 1;
      source += '(?:';
    } else if (char === '}' && depth > 0) {
      depth -= 1;
      source += ')';
    } else if (char === ',' && depth > 0) {
      source += '|';
    } else {
      source += char.replace(/[.+^$()|[\]\\]/g, '\\$&');
    }
  }

  return new RegExp(`^${source}$`);
}

/** Whether a project path matches any of the patterns. */
export function matchesAny(path: string, patterns: string[]): boolean {
  return patterns.some((pattern) => globToRegExp(pattern.replace(/^\.\//, '')).test(path));
}
