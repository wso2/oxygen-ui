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
import { clearFrom, normalizeValue, selectLevel } from '../ContextSwitcher/model';
import type { HeaderBreadcrumbsProps } from './HeaderBreadcrumbs';
import {
  readHeaderBreadcrumbsState,
  subscribeHeaderBreadcrumbsState,
  writeHeaderBreadcrumbsState,
  type HeaderBreadcrumbsPersistOptions,
  type HeaderBreadcrumbsStoredState,
} from './persistence';
import type { HeaderBreadcrumbsItem, HeaderBreadcrumbsLevel, HeaderBreadcrumbsValue } from './types';

/**
 * What `fetchItems` receives.
 */
export interface HeaderBreadcrumbsFetchContext {
  /** Selected ids of the levels above this one, for example `{ organization: 'wso2' }`. */
  parents: HeaderBreadcrumbsValue;
  /** Aborted when the parents change, the level is refreshed again, or the hook unmounts. */
  signal: AbortSignal;
}

/**
 * One level the hook manages.
 */
export interface HeaderBreadcrumbsLevelConfig
  extends Omit<HeaderBreadcrumbsLevel, 'items' | 'selectedId' | 'loading' | 'error'> {
  /**
   * Loads the level's items. Called when every level above it has a selection, and
   * again when one of those selections changes. The first level without a selection
   * is fetched too, so its "Open {label}" menu is ready.
   */
  fetchItems?: (context: HeaderBreadcrumbsFetchContext) => Promise<HeaderBreadcrumbsItem[]>;
  /** Fixed items, used when there is no `fetchItems` or before it resolves. */
  items?: HeaderBreadcrumbsItem[];
}

/** Why the value changed. */
export interface HeaderBreadcrumbsChange {
  /** `sync` means another tab, app or breadcrumb changed the stored state. */
  type: 'select' | 'navigate' | 'clear' | 'set' | 'sync';
  /** The level that was acted on. Absent for `set`. */
  levelId?: string;
  /** The picked or clicked item, for `select` and `navigate`. */
  item?: HeaderBreadcrumbsItem;
}

/**
 * Options for useHeaderBreadcrumbs.
 */
export interface UseHeaderBreadcrumbsOptions {
  /** Levels in order. */
  levels: HeaderBreadcrumbsLevelConfig[];
  /** Controlled selection. Pair with `onChange`. */
  value?: HeaderBreadcrumbsValue;
  /** Initial selection when uncontrolled. */
  defaultValue?: HeaderBreadcrumbsValue;
  /** Called with the next selection, such as to route to the new context. */
  onChange?: (value: HeaderBreadcrumbsValue, change: HeaderBreadcrumbsChange) => void;
  /** Called when a name in the trail is clicked. */
  onNavigate?: (levelId: string, item: HeaderBreadcrumbsItem) => void;
  /**
   * Clicking a name drops the levels under it, because the user is now on that
   * entry's page.
   * @default true
   */
  truncateOnNavigate?: boolean;
  /**
   * Fetch a level again each time its menu opens.
   * @default false
   */
  refreshOnOpen?: boolean;
  /** Message for a failed fetch. Defaults to the error's `message`. */
  formatError?: (error: unknown, levelId: string) => React.ReactNode;
  /**
   * Keep the selection in `localStorage` (or the given storage) so other apps on the
   * same origin can read it and start where the user left off. Only the selected ids
   * are stored; each app fetches its own items. Read the value anywhere with
   * `useHeaderBreadcrumbsValue`.
   *
   * Uncontrolled, the stored selection wins over `defaultValue`. Controlled, `value`
   * wins and is written to storage. With `sync` (on by default), a change from another
   * tab, app or breadcrumb updates this one and calls `onChange` with type `sync`.
   * Read the state elsewhere with `readHeaderBreadcrumbsState`.
   * @default false
   */
  persist?: boolean | HeaderBreadcrumbsPersistOptions;
}

/**
 * What useHeaderBreadcrumbs returns.
 */
export interface UseHeaderBreadcrumbsReturn {
  /** Current selection. */
  value: HeaderBreadcrumbsValue;
  /** Levels with their items, selection and loading state, ready for HeaderBreadcrumbs. */
  levels: HeaderBreadcrumbsLevel[];
  /** The selected item of each level, or `null` while it is not selected or not loaded. */
  selected: Record<string, HeaderBreadcrumbsItem | null>;
  /** Select an item. Levels under it are cleared when the id changes. */
  select: (levelId: string, itemId: string) => void;
  /** Clear a level and every level under it. */
  clear: (levelId: string) => void;
  /** Replace the whole selection, for example from the URL. */
  setValue: (value: HeaderBreadcrumbsValue) => void;
  /** Fetch one level again, or every reachable level when no id is given. */
  refresh: (levelId?: string) => Promise<void>;
  /** Replace a level's items, for example after a mutation. */
  setItems: (
    levelId: string,
    items: HeaderBreadcrumbsItem[] | ((items: HeaderBreadcrumbsItem[]) => HeaderBreadcrumbsItem[])
  ) => void;
  /** Add an item to a level, such as a newly created project. */
  addItem: (levelId: string, item: HeaderBreadcrumbsItem) => void;
  /** Change fields of one item, such as after a rename. */
  updateItem: (levelId: string, itemId: string, patch: Partial<HeaderBreadcrumbsItem>) => void;
  /** Remove an item. Removing the selected item clears that level and those under it. */
  removeItem: (levelId: string, itemId: string) => void;
  /** Spread onto HeaderBreadcrumbs. */
  breadcrumbProps: Pick<HeaderBreadcrumbsProps, 'levels' | 'onNavigate' | 'onSelect' | 'onOpen'>;
}

interface LevelEntry {
  /** Parent selection the items belong to. */
  key: string;
  items: HeaderBreadcrumbsItem[];
  loading: boolean;
  error?: React.ReactNode;
}

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Something went wrong. Try again.';

/** Selections of the levels before `index`. */
const parentsOf = (
  levelIds: readonly string[],
  value: HeaderBreadcrumbsValue,
  index: number
): HeaderBreadcrumbsValue => {
  const parents: HeaderBreadcrumbsValue = {};
  levelIds.slice(0, index).forEach((id) => {
    parents[id] = value[id];
  });
  return parents;
};

const keyOf = (levelIds: readonly string[], value: HeaderBreadcrumbsValue, index: number): string =>
  JSON.stringify(levelIds.slice(0, index).map((id) => value[id] ?? null));

/**
 * useHeaderBreadcrumbs - Fetches and keeps the data behind a HeaderBreadcrumbs.
 *
 * Holds the selected id of each level, loads each level's items from its parents'
 * selection, and drops stale responses when the parents change. Picking a different
 * item clears the levels under it. Clicking a name drops the levels under it. Use the
 * item helpers to keep the menus current after creating, renaming or deleting.
 *
 * @example
 * ```tsx
 * const breadcrumb = useHeaderBreadcrumbs({
 *   levels: [
 *     { id: 'organization', label: 'Organization', fetchItems: () => api.organizations() },
 *     {
 *       id: 'project',
 *       label: 'Project',
 *       fetchItems: ({ parents, signal }) => api.projects(parents.organization, { signal }),
 *     },
 *   ],
 *   value: fromRoute,
 *   onChange: (next) => navigate(toRoute(next)),
 * });
 *
 * <HeaderBreadcrumbs {...breadcrumb.breadcrumbProps} />
 * ```
 */
export const useHeaderBreadcrumbs = (
  options: UseHeaderBreadcrumbsOptions
): UseHeaderBreadcrumbsReturn => {
  const {
    levels: configs,
    value: controlledValue,
    defaultValue,
    onNavigate,
    truncateOnNavigate = true,
    refreshOnOpen = false,
    persist = false,
  } = options;

  const persistOptions: HeaderBreadcrumbsPersistOptions | null =
    persist === false ? null : persist === true ? {} : persist;
  const persistKey = persistOptions?.key;
  const persistStorage = persistOptions?.storage;
  const persistSync = persistOptions ? persistOptions.sync !== false : false;
  const persistConfig = React.useMemo(
    () => (persistOptions ? { key: persistKey, storage: persistStorage } : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [persistOptions !== null, persistKey, persistStorage]
  );

  // Read storage once, for the first render.
  const [initialStored] = React.useState<HeaderBreadcrumbsStoredState | null>(() =>
    persistConfig ? readHeaderBreadcrumbsState(persistConfig) : null
  );

  // Configs and callbacks are often inline, so read them through a ref instead of
  // making every effect depend on their identity.
  const latest = React.useRef(options);
  latest.current = options;

  const levelIdsKey = configs.map((config) => config.id).join('\0');
  const levelIds = React.useMemo(
    () => (levelIdsKey.length === 0 ? [] : levelIdsKey.split('\0')),
    [levelIdsKey]
  );

  const [uncontrolledValue, setUncontrolledValue] = React.useState<HeaderBreadcrumbsValue>(
    () => initialStored?.value ?? defaultValue ?? {}
  );
  const isControlled = controlledValue !== undefined;
  const rawValue = isControlled ? controlledValue : uncontrolledValue;
  const value = React.useMemo(() => normalizeValue(levelIds, rawValue), [levelIds, rawValue]);
  const valueRef = React.useRef(value);
  valueRef.current = value;

  const [entries, setEntries] = React.useState<Record<string, LevelEntry>>({});
  const controllers = React.useRef<Record<string, AbortController>>({});
  const startedKeys = React.useRef<Record<string, string>>({});

  const commit = React.useCallback(
    (next: HeaderBreadcrumbsValue, change: HeaderBreadcrumbsChange) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      latest.current.onChange?.(next, change);
    },
    [isControlled]
  );

  const load = React.useCallback(
    (levelId: string): Promise<void> => {
      const index = levelIds.indexOf(levelId);
      const config = latest.current.levels[index];
      if (index < 0 || !config?.fetchItems) {
        return Promise.resolve();
      }
      const current = valueRef.current;
      const key = keyOf(levelIds, current, index);

      controllers.current[levelId]?.abort();
      const controller = new AbortController();
      controllers.current[levelId] = controller;
      startedKeys.current[levelId] = key;

      setEntries((prev) => ({
        ...prev,
        [levelId]: {
          key,
          // Keep the list on screen while the same parents load again.
          items: prev[levelId]?.key === key ? prev[levelId].items : [],
          loading: true,
        },
      }));

      return config
        .fetchItems({ parents: parentsOf(levelIds, current, index), signal: controller.signal })
        .then(
          (items) => {
            if (controller.signal.aborted) {
              return;
            }
            setEntries((prev) => ({ ...prev, [levelId]: { key, items, loading: false } }));
          },
          (error: unknown) => {
            if (controller.signal.aborted) {
              return;
            }
            const format = latest.current.formatError;
            setEntries((prev) => ({
              ...prev,
              [levelId]: {
                key,
                items: prev[levelId]?.key === key ? prev[levelId].items : [],
                loading: false,
                error: format ? format(error, levelId) : errorMessage(error),
              },
            }));
          }
        );
    },
    [levelIds]
  );

  // A level loads once every level above it is selected, which includes the next
  // level to open. Its key changes with those selections, which starts a new fetch
  // and aborts the old one.
  const selectedCount = Object.keys(value).length;
  const plan = levelIds.map((id, index) =>
    index <= selectedCount && configs[index]?.fetchItems ? keyOf(levelIds, value, index) : null
  );
  const planKey = JSON.stringify(plan);

  React.useEffect(() => {
    (JSON.parse(planKey) as (string | null)[]).forEach((key, index) => {
      const levelId = levelIds[index];
      if (key !== null && startedKeys.current[levelId] !== key) {
        void load(levelId);
      }
    });
  }, [planKey, levelIds, load]);

  React.useEffect(
    () => () => {
      Object.values(controllers.current).forEach((controller) => controller.abort());
      controllers.current = {};
      // A remount (such as in Strict Mode) must fetch again.
      startedKeys.current = {};
    },
    []
  );

  const resolvedLevels: HeaderBreadcrumbsLevel[] = configs.map((config, index) => {
    const display: HeaderBreadcrumbsLevel = { ...config, items: [] };
    delete (display as Partial<HeaderBreadcrumbsLevelConfig>).fetchItems;
    const fixedItems = config.items;
    const key = keyOf(levelIds, value, index);
    const entry = entries[config.id];
    const fresh = entry && entry.key === key ? entry : undefined;
    const waiting = Boolean(config.fetchItems) && index <= selectedCount && !fresh;
    const selectedId = value[config.id] ?? null;
    return {
      ...display,
      items: fresh?.items ?? fixedItems ?? [],
      selectedId,
      loading: waiting || Boolean(fresh?.loading),
      error: fresh?.error,
    };
  });

  const selected: Record<string, HeaderBreadcrumbsItem | null> = {};
  resolvedLevels.forEach((level) => {
    selected[level.id] =
      level.items.find((item) => item.id === level.selectedId) ??
      // The fallback only stands in for the entry that is selected now.
      (level.selectedId != null && level.selectedItem?.id === level.selectedId
        ? level.selectedItem
        : null);
  });

  // Only the selected ids are stored. Items are always fetched by each app.
  const snapshotKey = JSON.stringify(value);

  React.useEffect(() => {
    if (!persistConfig) {
      return;
    }
    const current = readHeaderBreadcrumbsState(persistConfig);
    // Skip a write that changes nothing, so two synced breadcrumbs do not echo.
    if (current && JSON.stringify(current.value) === snapshotKey) {
      return;
    }
    writeHeaderBreadcrumbsState(JSON.parse(snapshotKey) as HeaderBreadcrumbsValue, persistConfig);
  }, [snapshotKey, persistConfig]);

  React.useEffect(() => {
    if (!persistConfig || !persistSync) {
      return undefined;
    }
    return subscribeHeaderBreadcrumbsState((state) => {
      const next = normalizeValue(levelIds, state?.value ?? {});
      if (JSON.stringify(next) === JSON.stringify(valueRef.current)) {
        return;
      }
      if (!latest.current.value) {
        setUncontrolledValue(next);
      }
      latest.current.onChange?.(next, { type: 'sync' });
    }, persistConfig);
  }, [persistConfig, persistSync, levelIds]);

  const findItem = (levelId: string, itemId: string): HeaderBreadcrumbsItem | undefined =>
    resolvedLevels.find((level) => level.id === levelId)?.items.find((item) => item.id === itemId);

  const select = (levelId: string, itemId: string) => {
    if (!levelIds.includes(levelId) || value[levelId] === itemId) {
      return;
    }
    commit(selectLevel(levelIds, value, levelId, itemId), {
      type: 'select',
      levelId,
      item: findItem(levelId, itemId),
    });
  };

  const clear = (levelId: string) => {
    if (!levelIds.includes(levelId)) {
      return;
    }
    commit(clearFrom(levelIds, value, levelId), { type: 'clear', levelId });
  };

  const setValue = (next: HeaderBreadcrumbsValue) => {
    commit(normalizeValue(levelIds, next), { type: 'set' });
  };

  const refresh = (levelId?: string): Promise<void> => {
    if (levelId) {
      return load(levelId);
    }
    const reachable = levelIds.filter((_, index) => index <= selectedCount);
    return Promise.all(reachable.map((id) => load(id))).then(() => undefined);
  };

  const setItems: UseHeaderBreadcrumbsReturn['setItems'] = (levelId, next) => {
    const index = levelIds.indexOf(levelId);
    if (index < 0) {
      return;
    }
    const key = keyOf(levelIds, valueRef.current, index);
    const fixed = latest.current.levels[index]?.items ?? [];
    // A fetch for these parents that started before this change would overwrite it when
    // it resolves, so drop it. `startedKeys` keeps the key, so it is not fetched again.
    if (startedKeys.current[levelId] === key) {
      controllers.current[levelId]?.abort();
      delete controllers.current[levelId];
    }
    setEntries((prev) => {
      const entry = prev[levelId]?.key === key ? prev[levelId] : undefined;
      const items = typeof next === 'function' ? next(entry?.items ?? fixed) : next;
      return { ...prev, [levelId]: { key, items, loading: false } };
    });
  };

  const addItem = (levelId: string, item: HeaderBreadcrumbsItem) =>
    setItems(levelId, (items) => [...items.filter((existing) => existing.id !== item.id), item]);

  const updateItem = (levelId: string, itemId: string, patch: Partial<HeaderBreadcrumbsItem>) =>
    setItems(levelId, (items) =>
      items.map((item) => (item.id === itemId ? { ...item, ...patch } : item))
    );

  const removeItem = (levelId: string, itemId: string) => {
    setItems(levelId, (items) => items.filter((item) => item.id !== itemId));
    if (value[levelId] === itemId) {
      clear(levelId);
    }
  };

  const handleNavigate = (levelId: string, item: HeaderBreadcrumbsItem) => {
    const index = levelIds.indexOf(levelId);
    const nextId = levelIds[index + 1];
    if (truncateOnNavigate && nextId && value[nextId]) {
      commit(clearFrom(levelIds, value, nextId), { type: 'navigate', levelId, item });
    }
    onNavigate?.(levelId, item);
  };

  const handleSelect = (levelId: string, item: HeaderBreadcrumbsItem) => select(levelId, item.id);

  const handleOpen = (levelId: string) => {
    const index = levelIds.indexOf(levelId);
    const key = keyOf(levelIds, valueRef.current, index);
    if (refreshOnOpen || startedKeys.current[levelId] !== key) {
      void load(levelId);
    }
  };

  return {
    value,
    levels: resolvedLevels,
    selected,
    select,
    clear,
    setValue,
    refresh,
    setItems,
    addItem,
    updateItem,
    removeItem,
    breadcrumbProps: {
      levels: resolvedLevels,
      onNavigate: handleNavigate,
      onSelect: handleSelect,
      onOpen: handleOpen,
    },
  };
};

export default useHeaderBreadcrumbs;
