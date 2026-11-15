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

import * as React from 'react';
import type { HeaderBreadcrumbsValue } from './types';

/** Default storage key. Every app that uses the same key shares one selection. */
export const HEADER_BREADCRUMBS_STORAGE_KEY = 'oxygen-ui:header-breadcrumbs';

/** Event fired on `window` when this document writes the state, for same-page listeners. */
const LOCAL_CHANGE_EVENT = 'oxygen-ui:header-breadcrumbs-change';

/**
 * What is kept in storage: the selected id of each level, never the items. Readable by
 * any app on the same origin, with or without HeaderBreadcrumbs, through
 * `useHeaderBreadcrumbsValue` or `readHeaderBreadcrumbsState`.
 */
export interface HeaderBreadcrumbsStoredState {
  version: 1;
  /** Selected id of each level. */
  value: HeaderBreadcrumbsValue;
  /** When the state was written, in milliseconds since the epoch. */
  updatedAt: number;
}

/**
 * Where and how the state is kept.
 */
export interface HeaderBreadcrumbsPersistOptions {
  /**
   * Storage key. Apps that share a key share the selection.
   * @default 'oxygen-ui:header-breadcrumbs'
   */
  key?: string;
  /**
   * Storage area. Pass `sessionStorage` to keep it per tab.
   * @default window.localStorage
   */
  storage?: Storage;
  /**
   * Follow changes made by other tabs, windows and apps on the same origin, and by
   * other breadcrumbs on the same page.
   * @default true
   */
  sync?: boolean;
}

const defaultStorage = (): Storage | null => {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    // Access throws when storage is blocked, such as in some private windows.
    return null;
  }
};

const resolve = (options: HeaderBreadcrumbsPersistOptions = {}) => ({
  key: options.key ?? HEADER_BREADCRUMBS_STORAGE_KEY,
  storage: options.storage ?? defaultStorage(),
});

const isRecordOfStrings = (input: unknown): input is Record<string, string> =>
  typeof input === 'object' &&
  input !== null &&
  Object.values(input).every((entry) => typeof entry === 'string');

const parse = (raw: string | null): HeaderBreadcrumbsStoredState | null => {
  if (!raw) {
    return null;
  }
  try {
    const data = JSON.parse(raw) as Partial<HeaderBreadcrumbsStoredState>;
    if (data.version !== 1 || !isRecordOfStrings(data.value)) {
      return null;
    }
    return { version: 1, value: data.value, updatedAt: Number(data.updatedAt) || 0 };
  } catch {
    return null;
  }
};

/**
 * Reads the stored breadcrumb state, or `null` when there is none or it cannot be read.
 *
 * @example
 * ```ts
 * const organizationId = readHeaderBreadcrumbsState()?.value.organization;
 * ```
 */
export const readHeaderBreadcrumbsState = (
  options?: HeaderBreadcrumbsPersistOptions
): HeaderBreadcrumbsStoredState | null => {
  const { key, storage } = resolve(options);
  try {
    return parse(storage?.getItem(key) ?? null);
  } catch {
    return null;
  }
};

/**
 * Writes the selection and tells listeners on this page.
 */
export const writeHeaderBreadcrumbsState = (
  value: HeaderBreadcrumbsValue,
  options?: HeaderBreadcrumbsPersistOptions
): void => {
  const { key, storage } = resolve(options);
  if (!storage) {
    return;
  }
  const next: HeaderBreadcrumbsStoredState = {
    version: 1,
    value,
    updatedAt: Date.now(),
  };
  try {
    storage.setItem(key, JSON.stringify(next));
  } catch {
    // Quota exceeded or storage blocked: the selection still works in memory.
    return;
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LOCAL_CHANGE_EVENT, { detail: { key } }));
  }
};

/**
 * Removes the stored breadcrumb state, such as on sign-out.
 */
export const clearHeaderBreadcrumbsState = (options?: HeaderBreadcrumbsPersistOptions): void => {
  const { key, storage } = resolve(options);
  try {
    storage?.removeItem(key);
  } catch {
    return;
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LOCAL_CHANGE_EVENT, { detail: { key } }));
  }
};

/**
 * Calls `listener` when the stored state changes, from another tab, window or app on
 * the same origin, or from this page. Returns a function that stops listening.
 */
export const subscribeHeaderBreadcrumbsState = (
  listener: (state: HeaderBreadcrumbsStoredState | null) => void,
  options?: HeaderBreadcrumbsPersistOptions
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }
  const { key, storage } = resolve(options);

  const onStorage = (event: StorageEvent) => {
    if (event.key === key && (!storage || event.storageArea === storage)) {
      listener(parse(event.newValue));
    }
  };
  const onLocal = (event: Event) => {
    if ((event as CustomEvent<{ key: string }>).detail?.key === key) {
      listener(readHeaderBreadcrumbsState(options));
    }
  };

  window.addEventListener('storage', onStorage);
  window.addEventListener(LOCAL_CHANGE_EVENT, onLocal);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(LOCAL_CHANGE_EVENT, onLocal);
  };
};

const EMPTY_VALUE: HeaderBreadcrumbsValue = Object.freeze({}) as HeaderBreadcrumbsValue;

/**
 * Returns the stored selection, such as `{ organization: 'wso2', project: 'oxygen-ui' }`,
 * and re-renders when it changes in this page, another tab or another app on the same
 * origin. Returns an empty object when nothing is stored. Works without rendering
 * HeaderBreadcrumbs, so any app can read the current context.
 *
 * @example
 * ```tsx
 * const { organization, project } = useHeaderBreadcrumbsValue();
 * ```
 */
export const useHeaderBreadcrumbsValue = (
  options?: HeaderBreadcrumbsPersistOptions
): HeaderBreadcrumbsValue => {
  const key = options?.key;
  const storage = options?.storage;
  const read = React.useCallback(
    () => readHeaderBreadcrumbsState({ key, storage })?.value ?? EMPTY_VALUE,
    [key, storage]
  );
  const [value, setValue] = React.useState<HeaderBreadcrumbsValue>(read);

  React.useEffect(() => {
    // Keep the same object while the content is equal, to avoid extra renders.
    const update = (next: HeaderBreadcrumbsValue) =>
      setValue((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    update(read());
    return subscribeHeaderBreadcrumbsState(
      (state) => update(state?.value ?? EMPTY_VALUE),
      { key, storage }
    );
  }, [read, key, storage]);

  return value;
};
