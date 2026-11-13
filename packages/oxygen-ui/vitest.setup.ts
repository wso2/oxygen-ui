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
 * Newer Node versions ship their own `localStorage` and `sessionStorage` globals. Without
 * `--localstorage-file` they are unusable, and they hide jsdom's, so `window.localStorage`
 * is undefined or throws. Put jsdom's storage back whenever that happens, or an
 * in-memory one when jsdom's is not reachable.
 */
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

const isUsable = (name: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    const storage = window[name];
    const probe = '__vitest_storage_probe__';
    storage.setItem(probe, probe);
    storage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
};

/** jsdom's own storage, which its StorageEvent accepts as `storageArea`. */
const jsdomStorage = (name: 'localStorage' | 'sessionStorage'): Storage | undefined => {
  try {
    return (globalThis as { jsdom?: { window: Window } }).jsdom?.window[name];
  } catch {
    return undefined;
  }
};

(['localStorage', 'sessionStorage'] as const).forEach((name) => {
  if (typeof window === 'undefined' || isUsable(name)) {
    return;
  }
  const storage = jsdomStorage(name) ?? new MemoryStorage();
  Object.defineProperty(globalThis, name, { configurable: true, value: storage, writable: true });
  Object.defineProperty(window, name, { configurable: true, value: storage, writable: true });
});
