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

import * as React from 'react';

/**
 * The `displayName` a compound component's parts are matched by
 * (`Sidebar.ItemLabel`, `AppShell.Main`). A product component that wraps a part
 * must set the same `displayName` to stay one.
 */
export const displayNameOf = (child: React.ReactNode): string | undefined =>
  React.isValidElement(child) ? (child.type as React.FC)?.displayName : undefined;

/**
 * Flattens fragments, so parts grouped in `<>...</>` are still found.
 * `React.Children.toArray` numbers keys afresh inside each fragment, so a
 * fragment's children take its key as a prefix to stay unique among siblings.
 * The prefix ends in `:`, which React escapes inside keys, so a direct key
 * can never match a prefixed one.
 */
export const flattenChildren = (children: React.ReactNode, keyPrefix = ''): React.ReactNode[] =>
  React.Children.toArray(children).reduce<React.ReactNode[]>((flat, child) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) {
      return flat.concat([child]);
    }
    if (child.type === React.Fragment) {
      return flat.concat(flattenChildren(child.props.children, `${keyPrefix}${child.key}:`));
    }
    return flat.concat([keyPrefix ? React.cloneElement(child, { key: `${keyPrefix}${child.key}` }) : child]);
  }, []);

/**
 * Splits the children, fragments flattened, into the parts named in `names`
 * and everything else, each in its original order.
 */
export const sortParts = (
  children: React.ReactNode,
  names: readonly string[]
): { parts: React.ReactElement[]; rest: React.ReactNode[] } => {
  const parts: React.ReactElement[] = [];
  const rest: React.ReactNode[] = [];
  flattenChildren(children).forEach((child) => {
    const name = displayNameOf(child);
    if (React.isValidElement(child) && name !== undefined && names.includes(name)) {
      parts.push(child);
    } else {
      rest.push(child);
    }
  });
  return { parts, rest };
};

/**
 * The last part with this name, or undefined: a repeated part replaces the one before it.
 */
export const lastPartNamed = (parts: React.ReactElement[], name: string): React.ReactElement | undefined =>
  parts.filter((part) => displayNameOf(part) === name).pop();

export const textOf = (part: React.ReactElement | undefined): string => {
  const content = (part?.props as { children?: React.ReactNode } | undefined)?.children;
  return content ? String(content) : '';
};
