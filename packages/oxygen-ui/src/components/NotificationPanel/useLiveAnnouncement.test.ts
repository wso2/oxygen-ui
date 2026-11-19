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

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useLiveAnnouncement } from './useLiveAnnouncement';

type Props = { open: boolean; prop: string | undefined };

const setup = (initial: Props) =>
  renderHook(({ open, prop }: Props) => useLiveAnnouncement(open, prop), { initialProps: initial });

describe('useLiveAnnouncement', () => {
  it('publishes the prop once when the panel opens with one', () => {
    const { result } = setup({ open: true, prop: 'Two new' });
    expect(result.current.message).toBe('Two new');
    expect(result.current.nonce).toBe(1);
  });

  it('publishes again only when the prop changes while open', () => {
    const { result, rerender } = setup({ open: true, prop: 'Two new' });
    rerender({ open: true, prop: 'Two new' });
    expect(result.current.nonce).toBe(1);
    rerender({ open: true, prop: 'Three new' });
    expect(result.current.message).toBe('Three new');
    expect(result.current.nonce).toBe(2);
  });

  it('clears on close and does not repeat the same prop when the panel reopens', () => {
    const { result, rerender } = setup({ open: true, prop: 'Two new' });
    rerender({ open: false, prop: 'Two new' });
    expect(result.current.message).toBe('');
    rerender({ open: true, prop: 'Two new' });
    expect(result.current.message).toBe('');
    expect(result.current.nonce).toBe(1);
  });

  it('clears a stale message when the prop becomes undefined while open', () => {
    const { result, rerender } = setup({ open: true, prop: 'Two new' });
    rerender({ open: true, prop: undefined });
    expect(result.current.message).toBe('');
  });

  it('publishes a message while open and repeats it with a new nonce', () => {
    const { result } = setup({ open: true, prop: undefined });
    act(() => result.current.publish('Synced'));
    act(() => result.current.publish('Synced'));
    expect(result.current.message).toBe('Synced');
    expect(result.current.nonce).toBe(2);
  });

  it('ignores a message published while closed', () => {
    const { result } = setup({ open: false, prop: undefined });
    act(() => result.current.publish('Synced'));
    expect(result.current.message).toBe('');
    expect(result.current.nonce).toBe(0);
  });
});
