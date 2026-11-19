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
 * The text of a panel's polite live region, and the event that re-announces it.
 *
 * Announcements are events while the panel is open only: persistent and
 * permanent panels keep their content mounted when closed. The `message` is
 * cleared on close, and the `prop` publishes only when it changes while open,
 * so reopening the panel does not repeat it. A prop that becomes undefined
 * while open clears the stale text. The `nonce` changes on every publish so
 * that a repeated message is announced again when it is used as a React key.
 */
export const useLiveAnnouncement = (
  open: boolean,
  prop: string | undefined
): { message: string; nonce: number; publish: (message: string) => void } => {
  const [message, setMessage] = React.useState('');
  const [nonce, setNonce] = React.useState(0);
  // Start undefined so the first open with a prop still publishes once.
  const previousPropRef = React.useRef<string | undefined>(undefined);

  const publish = React.useCallback(
    (next: string) => {
      if (!open) return;
      setMessage(next);
      setNonce((n) => n + 1);
    },
    [open]
  );

  React.useEffect(() => {
    if (!open) {
      setMessage('');
      previousPropRef.current = prop;
      return;
    }

    const previous = previousPropRef.current;
    previousPropRef.current = prop;

    if (prop === undefined) {
      if (previous !== undefined) {
        setMessage('');
      }
      return;
    }

    if (prop !== previous) {
      publish(prop);
    }
  }, [open, prop, publish]);

  return { message, nonce, publish };
};
