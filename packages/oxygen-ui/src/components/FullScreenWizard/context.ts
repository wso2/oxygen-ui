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
 * Context value for the FullScreenWizard compound component.
 */
export interface FullScreenWizardContextValue {
  /** Called by the built-in close button. The button is not rendered without it. */
  onClose?: () => void;
  /** Accessible name of the built-in close button */
  closeLabel: string;
  /** Whether the wizard is rendered inside a full-screen dialog */
  modal: boolean;
  /** Accessible name of the wizard; names the `main` region in page mode */
  ariaLabel?: string;
  /** Id of the element naming the wizard; names the `main` region in page mode */
  ariaLabelledby?: string;
  /**
   * The `FullScreenWizard.Footer` element, lifted out of the children so
   * `FullScreenWizard.Content` can render it inside its scroll region, under
   * the step content.
   */
  footer: React.ReactNode;
  /**
   * Height of `FullScreenWizard.Header` in pixels, measured as it renders, so
   * centred content can balance it and sit in the middle of the whole screen.
   */
  headerHeight: number;
  /** Reports the header's height; used by `FullScreenWizard.Header` */
  setHeaderHeight: (height: number) => void;
}

/**
 * Returns `label` when it is a non-blank string, otherwise `fallback`. An empty
 * or whitespace label must not wipe a control's default accessible name.
 */
export const resolveLabel = (label: string | undefined, fallback: string): string =>
  typeof label === 'string' && label.trim().length > 0 ? label : fallback;

/**
 * Context for sharing state between FullScreenWizard compound components.
 */
export const FullScreenWizardContext = React.createContext<FullScreenWizardContextValue | null>(
  null
);

FullScreenWizardContext.displayName = 'FullScreenWizard.Context';

/**
 * Hook to access the FullScreenWizard context with a helpful error message.
 *
 * @param componentName - Name of the component using the context (for error messages)
 * @returns FullScreenWizard context value
 * @throws Error if used outside FullScreenWizard
 *
 * @example
 * ```tsx
 * function StepTitle() {
 *   const { modal } = useFullScreenWizard('StepTitle');
 *   // ...
 * }
 * ```
 */
export const useFullScreenWizard = (
  componentName = 'FullScreenWizard sub-components'
): FullScreenWizardContextValue => {
  const context = React.useContext(FullScreenWizardContext);

  if (!context) {
    throw new Error(
      `${componentName} must be used as a child of <FullScreenWizard>. ` +
        `Wrap your component tree with <FullScreenWizard> to provide the necessary context.\n\n` +
        `Example:\n` +
        `<FullScreenWizard onClose={handleClose} aria-label="Create project">\n` +
        `  <FullScreenWizard.Progress value={50} />\n` +
        `  <FullScreenWizard.Header>...</FullScreenWizard.Header>\n` +
        `  <FullScreenWizard.Content>...</FullScreenWizard.Content>\n` +
        `  <FullScreenWizard.Footer>...</FullScreenWizard.Footer>\n` +
        `</FullScreenWizard>`
    );
  }

  return context;
};
