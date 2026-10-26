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

import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useWizardSteps } from './useWizardSteps';
import type { WizardStepInput } from './useWizardSteps';

type Step = 'details' | 'access' | 'review';

const renderSteps = (steps: WizardStepInput<Step>[], initialStep?: Step) =>
  renderHook(({ input }) => useWizardSteps(input, { initialStep }), {
    initialProps: { input: steps },
  });

describe('useWizardSteps', () => {
  it('starts on the first step', () => {
    const { result } = renderSteps(['details', 'access', 'review']);

    expect(result.current.activeStep).toBe('details');
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.count).toBe(3);
    expect(result.current.steps).toEqual(['details', 'access', 'review']);
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
    expect(result.current.progress).toBeCloseTo(100 / 3);
  });

  it('starts on initialStep', () => {
    const { result } = renderSteps(['details', 'access', 'review'], 'access');
    expect(result.current.activeStep).toBe('access');
  });

  it('ignores an initialStep that is skipped', () => {
    const { result } = renderSteps(['details', { id: 'access', skip: true }, 'review'], 'access');
    expect(result.current.activeStep).toBe('review');
  });

  it('moves forward and back, clamping at both ends', () => {
    const { result } = renderSteps(['details', 'access', 'review']);

    act(() => result.current.back());
    expect(result.current.activeStep).toBe('details');

    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.activeStep).toBe('review');
    expect(result.current.isLast).toBe(true);
    expect(result.current.progress).toBe(100);

    act(() => result.current.next());
    expect(result.current.activeStep).toBe('review');

    act(() => result.current.back());
    expect(result.current.activeStep).toBe('access');
  });

  it('leaves skipped steps out of navigation, the count and the progress', () => {
    const { result } = renderSteps(['details', { id: 'access', skip: true }, 'review']);

    expect(result.current.count).toBe(2);
    expect(result.current.steps).toEqual(['details', 'review']);
    expect(result.current.progress).toBe(50);

    act(() => result.current.next());
    expect(result.current.activeStep).toBe('review');
    expect(result.current.activeIndex).toBe(1);
  });

  it('goes to a visible step and ignores unknown or skipped ones', () => {
    const { result } = renderSteps(['details', { id: 'access', skip: true }, 'review']);

    act(() => result.current.goTo('review'));
    expect(result.current.activeStep).toBe('review');

    act(() => result.current.goTo('access'));
    expect(result.current.activeStep).toBe('review');

    act(() => result.current.goTo('unknown' as Step));
    expect(result.current.activeStep).toBe('review');
  });

  it('falls forward to the next visible step when the active step becomes skipped', () => {
    const { result, rerender } = renderSteps(['details', 'access', 'review'], 'access');

    rerender({ input: ['details', { id: 'access', skip: true }, 'review'] });
    expect(result.current.activeStep).toBe('review');
  });

  it('falls back to the previous visible step when no later step is visible', () => {
    const { result, rerender } = renderSteps(['details', 'access', 'review'], 'review');

    rerender({ input: ['details', 'access', { id: 'review', skip: true }] });
    expect(result.current.activeStep).toBe('access');
    expect(result.current.isLast).toBe(true);
  });

  it('keeps callbacks stable when the same steps are passed inline', () => {
    const { result, rerender } = renderSteps(['details', 'access', 'review']);
    const { next, back, goTo } = result.current;

    rerender({ input: ['details', 'access', 'review'] });
    expect(result.current.next).toBe(next);
    expect(result.current.back).toBe(back);
    expect(result.current.goTo).toBe(goTo);
  });

  it('reports no progress when every step is skipped', () => {
    const { result } = renderSteps([{ id: 'details', skip: true }]);

    expect(result.current.activeStep).toBeUndefined();
    expect(result.current.activeIndex).toBe(-1);
    expect(result.current.count).toBe(0);
    expect(result.current.progress).toBe(0);
  });
});
