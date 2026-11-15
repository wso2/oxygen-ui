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

export { default as AIAssistant } from './AIAssistant';
export { useAIAssistant, AIAssistantContext } from './context';
export type { AIAssistantContextValue } from './context';

export { default as AIAssistantTrigger } from './AIAssistantTrigger';
export type { AIAssistantTriggerProps } from './AIAssistantTrigger';

export { default as AIAssistantHeader } from './AIAssistantHeader';
export type { AIAssistantHeaderProps } from './AIAssistantHeader';

export { default as AIAssistantMessages } from './AIAssistantMessages';
export type { AIAssistantMessagesProps } from './AIAssistantMessages';

export { default as AIAssistantMessage } from './AIAssistantMessage';
export type { AIAssistantMessageProps } from './AIAssistantMessage';

export { default as AIAssistantThought } from './AIAssistantThought';
export type { AIAssistantThoughtProps } from './AIAssistantThought';

export { default as AIAssistantSuggestions } from './AIAssistantSuggestions';
export type { AIAssistantSuggestionsProps } from './AIAssistantSuggestions';

export { default as AIAssistantPromptInput } from './AIAssistantPromptInput';
export type { AIAssistantPromptInputProps } from './AIAssistantPromptInput';

export type {
  AIAssistantProps,
  AIAssistantMode,
  AIAssistantMessageRole,
  AIAssistantMessageItem,
  AIAssistantCitation,
  AIAssistantAttachment,
  AIAssistantSuggestionItem,
  AIAssistantModel,
} from './types';
