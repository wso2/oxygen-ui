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
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Message sender role.
 */
export type AIAssistantMessageRole = 'user' | 'assistant' | 'system';

/**
 * Citation or source reference for AI responses.
 */
export interface AIAssistantCitation {
  /** Unique citation identifier */
  id: string;
  /** Display title or file path */
  title: string;
  /** Optional link URL or anchor */
  url?: string;
  /** Snippet or reference excerpt */
  snippet?: string;
}

/**
 * Attachment provided to the AI prompt context.
 */
export interface AIAssistantAttachment {
  /** Attachment identifier */
  id: string;
  /** File or artifact name */
  name: string;
  /** Attachment type or MIME type */
  type?: string;
  /** Size in bytes or human-readable format */
  size?: string;
}

/**
 * Single message in an AI Assistant conversation.
 */
export interface AIAssistantMessageItem {
  /** Unique message identifier */
  id: string;
  /** Role of the sender */
  role: AIAssistantMessageRole;
  /** Message text content */
  content: string;
  /** Optional timestamp (e.g. ISO string or Date) */
  timestamp?: string | Date;
  /** Optional reasoning / chain-of-thought text */
  thought?: string;
  /** Citations or sources supporting this message */
  citations?: AIAssistantCitation[];
  /** Attachments linked with this message */
  attachments?: AIAssistantAttachment[];
  /** Whether this message is currently streaming/generating */
  isStreaming?: boolean;
  /** Optional error flag or details */
  error?: boolean;
}

/**
 * Quick prompt suggestion displayed in the assistant.
 */
export interface AIAssistantSuggestionItem {
  /** Suggestion identifier */
  id: string;
  /** Short prompt label or title */
  label: string;
  /** Full prompt text to populate or send */
  prompt: string;
  /** Optional description or hint */
  description?: string;
  /** Optional category or icon tag */
  category?: string;
}

/**
 * AI Model descriptor.
 */
export interface AIAssistantModel {
  /** Model ID (e.g. 'gpt-4o', 'claude-3-5-sonnet', 'wso2-cloud-ai') */
  id: string;
  /** Display label */
  label: string;
  /** Optional model provider (e.g. 'Anthropic', 'OpenAI', 'WSO2 AI') */
  provider?: string;
  /** Optional badge description (e.g. 'Fastest', 'Recommended') */
  badge?: string;
}

/**
 * Display mode of the AI Assistant.
 * - 'drawer': Slides in from the edge of the screen (AppShell integration).
 * - 'floating': Floating docked modal in the bottom-right corner.
 * - 'inline': Embedded directly within the page layout.
 */
export type AIAssistantMode = 'drawer' | 'floating' | 'inline';

/**
 * Props for the AIAssistant container.
 */
export interface AIAssistantProps {
  /** Whether the assistant panel is open */
  open?: boolean;
  /** Callback fired when the assistant should close */
  onClose?: () => void;
  /** Display mode of the assistant (default: 'drawer') */
  mode?: AIAssistantMode;
  /** Drawer anchor when mode is 'drawer' (default: 'right') */
  anchor?: 'left' | 'right';
  /** Width of the assistant panel (default: 420) */
  width?: number;
  /** Custom CSS styling overrides */
  sx?: SxProps<Theme>;
  /** Title of the assistant (default: 'AI Assistant') */
  title?: string;
  /** Subtitle or active workspace description */
  subtitle?: string;
  /** Currently selected AI model ID */
  model?: string;
  /** Available models to choose from */
  models?: AIAssistantModel[];
  /** Callback fired when the user selects a different model */
  onModelChange?: (modelId: string) => void;
  /** List of messages in the conversation */
  messages?: AIAssistantMessageItem[];
  /** Callback fired when user submits a new prompt */
  onSendMessage?: (content: string, attachments?: AIAssistantAttachment[]) => void;
  /** Callback fired when user clicks to stop generating */
  onStopStreaming?: () => void;
  /** Callback fired when user requests to clear conversation history */
  onClearHistory?: () => void;
  /** Callback fired when user rates a message */
  onFeedback?: (messageId: string, feedback: 'positive' | 'negative') => void;
  /** Callback fired when user retries a message */
  onRetry?: (messageId: string) => void;
  /** Whether the AI is currently generating a response */
  isGenerating?: boolean;
  /** Starter suggestions displayed when conversation is empty */
  suggestions?: AIAssistantSuggestionItem[];
  /** Active context pill (e.g., 'API: Petstore v1.0', 'Choreo Service: backend') */
  activeContext?: string;
  /** Children elements when using compound subcomponents */
  children?: React.ReactNode;
  /** Accessible label for the assistant dialog (default: 'AI Assistant') */
  'aria-label'?: string;
}
