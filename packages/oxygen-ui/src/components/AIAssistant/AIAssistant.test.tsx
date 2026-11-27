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
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { AIAssistant } from './AIAssistant';
import { AIAssistantTrigger } from './AIAssistantTrigger';
import { AIAssistantThought } from './AIAssistantThought';
import type { AIAssistantMessageItem, AIAssistantModel } from './types';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
});

const sampleModels: AIAssistantModel[] = [
  { id: 'wso2-ai', label: 'WSO2 Enterprise AI', provider: 'WSO2' },
  { id: 'claude-3-5', label: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
];

const sampleMessages: AIAssistantMessageItem[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'How do I deploy an integration service in Choreo?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: 'To deploy an integration in Choreo:\n```bash\nchoreo deploy --service backend\n```',
    thought: 'The user is asking about Choreo deployment steps. Provide CLI instructions.',
    citations: [
      { id: 'cite-1', title: 'Choreo Docs: Deployments', url: 'https://wso2.com/choreo/docs' },
    ],
  },
];

describe('AIAssistant', () => {
  it('renders correctly in drawer mode when open', () => {
    renderWithTheme(
      <AIAssistant
        open={true}
        title="WSO2 Copilot"
        messages={sampleMessages}
        models={sampleModels}
        model="wso2-ai"
      />
    );

    expect(screen.getByText('WSO2 Copilot')).toBeInTheDocument();
    expect(
      screen.getByText('How do I deploy an integration service in Choreo?')
    ).toBeInTheDocument();
    expect(screen.getByText(/To deploy an integration in Choreo:/)).toBeInTheDocument();
  });

  it('renders in floating mode when open', () => {
    renderWithTheme(
      <AIAssistant
        open={true}
        mode="floating"
        title="Floating Assistant"
        messages={[]}
        suggestions={[
          { id: 's-1', label: 'Explain error', prompt: 'Explain the 500 error in my logs' },
        ]}
      />
    );

    expect(screen.getByRole('dialog', { name: 'AI Assistant' })).toBeInTheDocument();
    expect(screen.getByText('Floating Assistant')).toBeInTheDocument();
    expect(screen.getByText('Explain error')).toBeInTheDocument();
  });

  it('renders in inline mode embedded in the page', () => {
    renderWithTheme(
      <AIAssistant
        open={true}
        mode="inline"
        title="Inline Assistant"
        messages={[]}
      />
    );

    expect(screen.getByRole('region', { name: 'AI Assistant' })).toBeInTheDocument();
    expect(screen.getByText('Inline Assistant')).toBeInTheDocument();
  });

  it('triggers onSendMessage when submitting via button', () => {
    const handleSend = vi.fn();

    renderWithTheme(
      <AIAssistant
        open={true}
        messages={[]}
        onSendMessage={handleSend}
      />
    );

    const input = screen.getByLabelText('AI prompt input');
    fireEvent.change(input, { target: { value: 'Analyze service latency' } });

    const sendButton = screen.getByLabelText('Send message');
    fireEvent.click(sendButton);

    expect(handleSend).toHaveBeenCalledTimes(1);
    expect(handleSend).toHaveBeenCalledWith('Analyze service latency', undefined);
  });

  it('submits on Enter key press without shift', () => {
    const handleSend = vi.fn();

    renderWithTheme(
      <AIAssistant
        open={true}
        messages={[]}
        onSendMessage={handleSend}
      />
    );

    const input = screen.getByLabelText('AI prompt input');
    fireEvent.change(input, { target: { value: 'Show deployment status' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: false });

    expect(handleSend).toHaveBeenCalledWith('Show deployment status', undefined);
  });

  it('calls onClearHistory when clear button is clicked', () => {
    const handleClear = vi.fn();

    renderWithTheme(
      <AIAssistant
        open={true}
        messages={sampleMessages}
        onClearHistory={handleClear}
      />
    );

    const clearButton = screen.getByLabelText('Clear conversation history');
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('calls onFeedback when user rates response', () => {
    const handleFeedback = vi.fn();

    renderWithTheme(
      <AIAssistant
        open={true}
        messages={sampleMessages}
        onFeedback={handleFeedback}
      />
    );

    const thumbsUp = screen.getByLabelText('Thumbs up');
    fireEvent.click(thumbsUp);

    expect(handleFeedback).toHaveBeenCalledWith('msg-2', 'positive');
  });

  it('renders citations with links', () => {
    renderWithTheme(
      <AIAssistant
        open={true}
        messages={sampleMessages}
      />
    );

    const citationLink = screen.getByText('Choreo Docs: Deployments');
    expect(citationLink).toBeInTheDocument();
  });
});

describe('AIAssistantTrigger', () => {
  it('renders floating action button and responds to click', () => {
    const handleClick = vi.fn();
    renderWithTheme(<AIAssistantTrigger onClick={handleClick} />);

    const fab = screen.getByLabelText('Open AI Assistant');
    expect(fab).toBeInTheDocument();

    fireEvent.click(fab);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders icon variant for header toolbars', () => {
    const handleClick = vi.fn();
    renderWithTheme(<AIAssistantTrigger variant="icon" onClick={handleClick} />);

    const button = screen.getByLabelText('Open AI Assistant');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('AIAssistantThought', () => {
  it('toggles thought content when clicked', () => {
    renderWithTheme(
      <AIAssistantThought thought="Analyzing backend logs for anomalies." />
    );

    const toggle = screen.getByLabelText('Toggle thinking process');
    expect(toggle).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(screen.getByText('Analyzing backend logs for anomalies.')).toBeInTheDocument();
  });
});
