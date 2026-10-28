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

/**
 * A wizard step: its id, or an object that can mark the step as skipped.
 */
export type WizardStepInput<T extends string = string> = T | { id: T; skip?: boolean };

/**
 * Options for the useWizardSteps hook.
 */
export interface UseWizardStepsOptions<T extends string = string> {
  /** Step to start on. Falls back to the first visible step when it is unknown or skipped. */
  initialStep?: T;
}

/**
 * Return value of the useWizardSteps hook.
 */
export interface UseWizardStepsReturn<T extends string = string> {
  /** Id of the active step. `undefined` only when every step is skipped. */
  activeStep: T | undefined;
  /** Index of the active step among the visible steps (`-1` when there are none) */
  activeIndex: number;
  /** Ids of the visible steps, in order. Skipped steps are left out. */
  steps: T[];
  /** Number of visible steps */
  count: number;
  /** Whether the active step is the first visible step */
  isFirst: boolean;
  /** Whether the active step is the last visible step. `false` when every step is skipped. */
  isLast: boolean;
  /** Moves to the next visible step. Does nothing on the last step. */
  next: () => void;
  /** Moves to the previous visible step. Does nothing on the first step. */
  back: () => void;
  /** Moves to the given step. Unknown and skipped ids are ignored. */
  goTo: (step: T) => void;
  /** Progress through the visible steps, from 0 to 100, counting the active step as done */
  progress: number;
}

interface NormalizedStep<T extends string> {
  id: T;
  skip: boolean;
}

/**
 * Picks the step to show for a requested id. A skipped step falls back to the
 * nearest following visible step, then to the nearest previous one, so a step
 * that drops out of the flow does not send the user back to the start.
 */
const resolveActiveStep = <T extends string>(
  all: NormalizedStep<T>[],
  visible: T[],
  requested: T | undefined
): T | undefined => {
  if (visible.length === 0) {
    return undefined;
  }
  if (requested !== undefined && visible.includes(requested)) {
    return requested;
  }
  const requestedIndex = requested === undefined ? -1 : all.findIndex((step) => step.id === requested);
  if (requestedIndex >= 0) {
    const following = all.slice(requestedIndex + 1).find((step) => !step.skip);
    if (following) {
      return following.id;
    }
    const previous = all
      .slice(0, requestedIndex)
      .reverse()
      .find((step) => !step.skip);
    if (previous) {
      return previous.id;
    }
  }
  return visible[0];
};

/**
 * useWizardSteps - Step state for a `FullScreenWizard`.
 *
 * Tracks the active step of a linear flow. Steps marked `skip` are left out
 * of navigation, the count and the progress. Navigation clamps at both ends.
 * The hook has no side effects and does not touch the router, so a flow
 * driven by a server or by the URL can manage its own state instead.
 *
 * @example
 * ```tsx
 * const wizard = useWizardSteps(['details', { id: 'security', skip: !needsSecurity }, 'review']);
 *
 * <FullScreenWizard onClose={handleClose} aria-label="Create project">
 *   <FullScreenWizard.Progress
 *     value={wizard.progress}
 *     valueText={`Step ${wizard.activeIndex + 1} of ${wizard.count}`}
 *   />
 *   <FullScreenWizard.Content focusKey={wizard.activeStep}>
 *     {wizard.activeStep && stepContent[wizard.activeStep]}
 *   </FullScreenWizard.Content>
 *   <FullScreenWizard.Footer>
 *     {!wizard.isFirst && <Button onClick={wizard.back}>Back</Button>}
 *     <Button variant="contained" onClick={wizard.next}>Continue</Button>
 *   </FullScreenWizard.Footer>
 * </FullScreenWizard>
 * ```
 */
export const useWizardSteps = <T extends string>(
  steps: ReadonlyArray<WizardStepInput<T>>,
  { initialStep }: UseWizardStepsOptions<T> = {}
): UseWizardStepsReturn<T> => {
  // Steps are usually passed inline, so key the derived lists on their content
  // rather than on the array identity. Callbacks then stay stable across renders.
  const signature = JSON.stringify(
    steps.map((step) =>
      typeof step === 'string' ? { id: step, skip: false } : { id: step.id, skip: Boolean(step.skip) }
    )
  );
  const { all, visible } = React.useMemo(() => {
    const normalized = JSON.parse(signature) as NormalizedStep<T>[];
    return {
      all: normalized,
      visible: normalized.filter((step) => !step.skip).map((step) => step.id),
    };
  }, [signature]);

  const [requested, setRequested] = React.useState<T | undefined>(initialStep);
  const activeStep = resolveActiveStep(all, visible, requested);
  const activeIndex = activeStep === undefined ? -1 : visible.indexOf(activeStep);
  const count = visible.length;

  const next = React.useCallback(() => {
    setRequested((current) => {
      const index = visible.indexOf(resolveActiveStep(all, visible, current) as T);
      return visible[Math.min(index + 1, visible.length - 1)] ?? current;
    });
  }, [all, visible]);

  const back = React.useCallback(() => {
    setRequested((current) => {
      const index = visible.indexOf(resolveActiveStep(all, visible, current) as T);
      return visible[Math.max(index - 1, 0)] ?? current;
    });
  }, [all, visible]);

  const goTo = React.useCallback(
    (step: T) => {
      if (visible.includes(step)) {
        setRequested(step);
      }
    },
    [visible]
  );

  return {
    activeStep,
    activeIndex,
    steps: visible,
    count,
    isFirst: activeIndex <= 0,
    // With no visible steps both sides are -1; that is not a last step to finish on.
    isLast: count > 0 && activeIndex === count - 1,
    next,
    back,
    goTo,
    progress: count > 0 ? ((activeIndex + 1) / count) * 100 : 0,
  };
};

export default useWizardSteps;
