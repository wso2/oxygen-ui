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

export { FullScreenWizard, default } from './FullScreenWizard';
export type { FullScreenWizardProps } from './FullScreenWizard';
// Export sub-components separately for direct import
export { FullScreenWizardProgress } from './FullScreenWizardProgress';
export type { FullScreenWizardProgressProps } from './FullScreenWizardProgress';
export { FullScreenWizardHeader } from './FullScreenWizardHeader';
export type { FullScreenWizardHeaderProps } from './FullScreenWizardHeader';
export { FullScreenWizardContent } from './FullScreenWizardContent';
export type { FullScreenWizardContentProps } from './FullScreenWizardContent';
export { FullScreenWizardFooter } from './FullScreenWizardFooter';
export type { FullScreenWizardFooterProps } from './FullScreenWizardFooter';
export { FullScreenWizardPreview } from './FullScreenWizardPreview';
export type { FullScreenWizardPreviewProps } from './FullScreenWizardPreview';
export { FullScreenWizardContext, useFullScreenWizard } from './context';
export type { FullScreenWizardContextValue } from './context';
export { useWizardSteps } from './useWizardSteps';
export type {
  UseWizardStepsOptions,
  UseWizardStepsReturn,
  WizardStepInput,
} from './useWizardSteps';
