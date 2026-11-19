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

import type * as React from 'react';
import { isSafeAppUrl } from './url';

/** What the card for one destination is given, and the state it is in. */
export interface CardLinkInput {
  url?: string | null;
  /** Whether the card was given an `onClick`. */
  hasHandler: boolean;
  component?: React.ElementType;
  componentProps?: Record<string, unknown>;
  target?: string;
  /** The current app opens in the same tab. */
  current: boolean;
  disabled: boolean;
  busy: boolean;
}

/** What to draw for a card, and the state it ended up in. */
export interface CardLink {
  /** True when the URL was given but only `http:`, `https:` and relative URLs are allowed. */
  unsafeUrl: boolean;
  /** True when the card has nothing to open: no URL, no `onClick` and no `component`. */
  unavailable: boolean;
  disabled: boolean;
  /** The target that reaches the element: the one in `componentProps`, else the card's own. */
  effectiveTarget: string;
  /** `component` is the consumer's, `anchor` a real link, `button` a card that cannot be opened. */
  element: 'component' | 'anchor' | 'button';
  /** The props for the element, `component` included, except for a `button`. */
  props: Record<string, unknown>;
}

/**
 * How a card opens its destination. URLs may come from fetched data, so one that could run script is not
 * used and the card is disabled. A consumer's `component` (typically a router Link) wins, so client-side
 * navigation works without the package depending on a router. Otherwise a navigable card is a real anchor,
 * so middle-click and "open in new tab" keep working. A busy card is a button, so the context menu or a
 * middle-click cannot open it past the click guard.
 */
export const resolveCardLink = ({
  url,
  hasHandler,
  component,
  componentProps,
  target: targetProp,
  current,
  disabled: disabledProp,
  busy,
}: CardLinkInput): CardLink => {
  // Fetched data may send a blank string for an app with no destination yet, so treat it like `null`.
  const normalizedUrl = typeof url === 'string' && url.trim() === '' ? null : url;
  const unsafeUrl = Boolean(normalizedUrl) && !isSafeAppUrl(normalizedUrl as string);
  const safeUrl = unsafeUrl ? undefined : normalizedUrl || undefined;
  const unavailable = normalizedUrl === null && !hasHandler && !component;
  const disabled = disabledProp || unavailable || unsafeUrl;

  // Opening the current app in a new tab would duplicate it.
  const target = targetProp ?? (current ? '_self' : '_blank');
  // `componentProps` may carry its own `target`, so the guard below is derived from whichever target actually
  // reaches the rendered element rather than from the `target` prop alone.
  const effectiveTarget = typeof componentProps?.target === 'string' ? componentProps.target : target;

  const canNavigate = !disabled && !busy;
  const linkProps = {
    ...(safeUrl && { href: safeUrl }),
    ...(effectiveTarget && { target: effectiveTarget }),
  };
  // Kept out of the overridable props so `componentProps` cannot drop the reverse-tabnabbing guard on a `_blank` target.
  const relProps = effectiveTarget === '_blank' ? { rel: 'noopener noreferrer' } : {};

  if (component && canNavigate) {
    return { unsafeUrl, unavailable, disabled, effectiveTarget, element: 'component', props: { component, ...componentProps, ...linkProps, ...relProps } };
  }
  if (safeUrl && canNavigate) {
    return { unsafeUrl, unavailable, disabled, effectiveTarget, element: 'anchor', props: { component: 'a', ...linkProps, ...relProps } };
  }
  return { unsafeUrl, unavailable, disabled, effectiveTarget, element: 'button', props: {} };
};

/** A click that opens in another tab or window, or is not the primary button. */
export const isModifiedClick = (event: { button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean }) =>
  event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

/**
 * Whether selecting a card closes the popover. Cards open in a new tab, so the current tab does not navigate and
 * closing would look like the switcher had dismissed itself for no reason: only the current app, which
 * navigates this tab, closes it.
 */
export const closesPopover = ({ current, effectiveTarget, modifiedClick }: { current: boolean; effectiveTarget: string; modifiedClick: boolean }) =>
  current && effectiveTarget !== '_blank' && !modifiedClick;
