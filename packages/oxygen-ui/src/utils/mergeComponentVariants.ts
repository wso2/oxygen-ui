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

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Variant {
  props: unknown;
  style?: unknown;
}

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

/** Props that are equal, key by key. A function cannot be compared, so it is never equal to anything. */
const sameProps = (a: unknown, b: unknown): boolean => {
  if (typeof a === 'function' || typeof b === 'function') return false;
  if (!isObject(a) || !isObject(b)) return a === b;

  const keys = Object.keys(a);

  return keys.length === Object.keys(b).length && keys.every((key) => key in b && sameProps(a[key], b[key]));
};

/**
 * A variant of the config replaces, in place, the variant of the base with the same props, and the rest
 * of the base stays. A variant with props that no base variant has comes after them.
 */
export function mergeVariants(base: Variant[], own: Variant[]): Variant[] {
  const unmatched = [...own];
  const kept = base.map((variant) => {
    const index = unmatched.findIndex((candidate) => sameProps(candidate.props, variant.props));

    return index < 0 ? variant : unmatched.splice(index, 1)[0];
  });

  return [...kept, ...unmatched];
}

/**
 * deepmerge replaces an array with the one that follows it, which would drop every variant a base theme
 * defines for a component as soon as a config defines one for the same component. This merges the
 * variants of `merged`, a deepmerge of the base and the config, by `mergeVariants` instead.
 */
export function mergeComponentVariants(merged: Record<string, any>, base: Record<string, any>, config: Record<string, any>): void {
  for (const [name, own] of Object.entries<any>(config.components ?? {})) {
    const inBase = base.components?.[name]?.variants;

    if (Array.isArray(own?.variants) && Array.isArray(inBase)) {
      merged.components[name].variants = mergeVariants(inBase, own.variants);
    }
  }
}
