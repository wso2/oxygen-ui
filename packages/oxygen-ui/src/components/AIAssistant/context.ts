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
import type {
  AIAssistantAttachment,
  AIAssistantMessageItem,
  AIAssistantModel,
  AIAssistantMode,
  AIAssistantSuggestionItem,
} from './types';

/**
 * Context value provided by AIAssistant.
 */
export interface AIAssistantContextValue {
  /** Whether the assistant is open */
  open: boolean;
  /** Display mode */
  mode: AIAssistantMode;
  /** Title of the assistant */
  title: string;
  /** Subtitle or active workspace */
  subtitle?: string;
  /** Active context tag (e.g. project name, service, file) */
  activeContext?: string;
  /** Current model ID */
  model?: string;
  /** Available models */
  models?: AIAssistantModel[];
  /** On model change */
  onModelChange?: (modelId: string) => void;
  /** Message list */
  messages: AIAssistantMessageItem[];
  /** Whether the AI is currently generating */
  isGenerating: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Send message callback */
  onSendMessage?: (content: string, attachments?: AIAssistantAttachment[]) => void;
  /** Stop streaming callback */
  onStopStreaming?: () => void;
  /** Clear conversation history */
  onClearHistory?: () => void;
  /** Message feedback */
  onFeedback?: (messageId: string, feedback: 'positive' | 'negative') => void;
  /** Retry message */
  onRetry?: (messageId: string) => void;
  /** Suggestions */
  suggestions?: AIAssistantSuggestionItem[];
  /** Screen reader announcement callback */
  announce: (message: string) => void;
}

export const AIAssistantContext = React.createContext<AIAssistantContextValue | undefined>(undefined);

/**
 * Hook to access the AIAssistant context.
 */
export const useAIAssistant = (): AIAssistantContextValue => {
  const context = React.useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider or AIAssistant component');
  }
  return context;
};
