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
import type { Meta, StoryObj } from '@storybook/react';
import {
  AIAssistant,
  AIAssistantTrigger,
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
} from '@wso2/oxygen-ui';
import type {
  AIAssistantMessageItem,
  AIAssistantModel,
  AIAssistantSuggestionItem,
} from '@wso2/oxygen-ui';

const availableModels: AIAssistantModel[] = [
  { id: 'wso2-enterprise-ai', label: 'WSO2 Enterprise AI', provider: 'WSO2 Cloud', badge: 'Default' },
  { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { id: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI' },
];

const starterSuggestions: AIAssistantSuggestionItem[] = [
  {
    id: 's-1',
    label: 'Troubleshoot 500 error in deployment',
    prompt: 'Analyze why my Choreo backend integration is returning HTTP 500 Internal Server Error.',
  },
  {
    id: 's-2',
    label: 'Generate Ballerina REST API',
    prompt: 'Generate a Ballerina HTTP service exposing a CRUD REST API for Customer records.',
  },
  {
    id: 's-3',
    label: 'Explain Asgardeo OIDC flow',
    prompt: 'Explain how Authorization Code Flow with PKCE works in Asgardeo with React.',
  },
];

const initialConversation: AIAssistantMessageItem[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'How do I deploy a Ballerina integration service to Choreo using the CLI?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: `To deploy your Ballerina integration to Choreo using the CLI:

1. Log in to your Choreo organization:
\`\`\`bash
choreo login
\`\`\`

2. Initialize your project inside your Ballerina workspace:
\`\`\`bash
choreo init
\`\`\`

3. Trigger the deployment:
\`\`\`bash
choreo deploy --component backend-api --env development
\`\`\`

Once deployed, you can inspect real-time logs in the Choreo Console or via the Oxygen UI \`LogViewer\` component.`,
    thought: 'The user wants to deploy a Ballerina service to Choreo via CLI. Outline step-by-step commands: login, init, deploy.',
    citations: [
      { id: 'c-1', title: 'Choreo Docs: Deployments', url: 'https://wso2.com/choreo/docs' },
      { id: 'c-2', title: 'Ballerina on Choreo Guide', url: 'https://ballerina.io/learn/by-example/' },
    ],
  },
];

/**
 * AIAssistant is an enterprise-grade AI Copilot component for WSO2 cloud consoles,
 * developer portals, and integration applications.
 *
 * Supports drawer, floating, and inline modes, live streaming feedback,
 * chain-of-thought disclosures, code syntax formatting, model selection, and WCAG AA accessibility.
 */
const meta: Meta<typeof AIAssistant> = {
  title: 'App Elements/AI Assistant',
  component: AIAssistant,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`AIAssistant\` suite provides AI-powered conversational assistance across WSO2 applications.

### Features
- **3 Display Modes**: \`drawer\` (right slide-out), \`floating\` (docked bottom-right widget), and \`inline\` (embedded).
- **Compound Components**: \`Header\`, \`Messages\`, \`Message\`, \`Thought\`, \`Suggestions\`, \`PromptInput\`, and \`Trigger\`.
- **Reasoning Disclosures**: Shows collapsible chain-of-thought ("Thinking...") processes.
- **Code Block Rendering**: Syntax highlights code snippets with a copy-to-clipboard button.
- **Model Switcher**: Allows selecting between multiple enterprise AI models.
- **WCAG 2.1 AA Compliant**: Built-in screen-reader live announcements (\`role="status"\`), accessible keyboard bindings (\`Enter\` to submit).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AIAssistant>;

/**
 * Interactive slide-out drawer assistant simulating streaming and suggestions.
 */
export const DefaultDrawer: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    const [messages, setMessages] = React.useState<AIAssistantMessageItem[]>(initialConversation);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [model, setModel] = React.useState('wso2-enterprise-ai');

    const handleSendMessage = (content: string) => {
      const userMsg: AIAssistantMessageItem = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsGenerating(true);

      // Simulate streaming AI reply
      setTimeout(() => {
        setIsGenerating(false);
        const assistantMsg: AIAssistantMessageItem = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: `Here is the recommended solution for "${content}":\n\`\`\`ballerina\nimport ballerina/http;\n\nservice /api on new http:Listener(9090) {\n    resource function get health() returns string {\n        return "OK";\n    }\n}\n\`\`\`\nLet me know if you would like me to adjust security or rate limiting!`,
          thought: 'Synthesizing response for user prompt with best-practice Ballerina code.',
          citations: [
            { id: 'c-sim', title: 'WSO2 Integration Patterns', url: 'https://wso2.com' },
          ],
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }, 1200);
    };

    return (
      <Box sx={{ p: 4, minHeight: 400, textAlign: 'center' }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5">WSO2 Cloud Application</Typography>
          <Typography variant="body2" color="text.secondary">
            Click the button below or the trigger to open the AI Copilot.
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Open AI Assistant
          </Button>
        </Stack>

        <AIAssistantTrigger
          open={open}
          onClick={() => setOpen(!open)}
          tooltip="Open AI Copilot"
        />

        <AIAssistant
          open={open}
          onClose={() => setOpen(false)}
          title="Choreo Copilot"
          subtitle="Project: Online Banking API"
          model={model}
          models={availableModels}
          onModelChange={setModel}
          messages={messages}
          onSendMessage={handleSendMessage}
          onClearHistory={() => setMessages([])}
          isGenerating={isGenerating}
          suggestions={starterSuggestions}
          onFeedback={(id, rating) => alert(`Feedback for ${id}: ${rating}`)}
        />
      </Box>
    );
  },
};

/**
 * Floating docked chat widget pinned to the bottom-right corner.
 */
export const FloatingWidget: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    const [messages, setMessages] = React.useState<AIAssistantMessageItem[]>([]);

    return (
      <Box sx={{ width: 800, height: 650, position: 'relative', border: '1px dashed #ccc', p: 3 }}>
        <Typography variant="h6">Developer Console Playground</Typography>
        <Typography variant="body2" color="text.secondary">
          In floating mode, the AI Assistant docks neatly at the bottom right.
        </Typography>

        <AIAssistant
          open={open}
          mode="floating"
          onClose={() => setOpen(false)}
          title="WSO2 AI Copilot"
          activeContext="Workspace: Petstore Services"
          messages={messages}
          suggestions={starterSuggestions}
          onSendMessage={(content) => {
            setMessages((prev) => [
              ...prev,
              { id: `u-${Date.now()}`, role: 'user', content },
              {
                id: `a-${Date.now()}`,
                role: 'assistant',
                content: `Analyzing "${content}". Everything looks healthy in your environment!`,
              },
            ]);
          }}
        />

        {!open && (
          <AIAssistantTrigger onClick={() => setOpen(true)} />
        )}
      </Box>
    );
  },
};

/**
 * Inline mode embedded directly inside a diagnostics or configuration page.
 */
export const InlineEmbedded: Story = {
  render: () => {
    return (
      <Box sx={{ width: 750, p: 2 }}>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Integration Diagnostics</Typography>
            <Typography variant="body2" color="text.secondary">
              Embedded assistant directly within the deployment troubleshooting screen.
            </Typography>
          </CardContent>
        </Card>

        <AIAssistant
          open={true}
          mode="inline"
          title="Diagnostic Assistant"
          subtitle="Real-time log analyzer"
          messages={initialConversation}
          suggestions={starterSuggestions}
        />
      </Box>
    );
  },
};
