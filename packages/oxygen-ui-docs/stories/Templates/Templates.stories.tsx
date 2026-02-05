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

import { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Card, CardContent, Grid, Link } from '@wso2/oxygen-ui';
import React, { useState } from 'react';
import { Default as DashboardTemplate } from './DashboardTemplate.stories';
import { Default as EmptyStateTemplate } from './EmptyStateTemplate.stories';
import { Default as TabbedContentTemplate } from './TabbedContentTemplate.stories';
import { Default as LoginTemplate } from './LoginTemplate.stories';
import { Default as CreateServiceFormTemplate } from './CreateServiceFormTemplate.stories';
import { Default as WizardTemplate } from './WizardTemplate.stories';
import { Default as FormValidationTemplate } from './FormValidationTemplate.stories';

const meta: Meta = {
  title: 'Templates',
  parameters: {
    docs: {
      page: null,
    },
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

interface TemplateCard {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  liveUrl: string;
  component?: any;
}

const templates: TemplateCard[] = [
  {
    id: 'login',
    title: 'Login',
    description: 'A comprehensive login template with social login options and form validation',
    previewUrl: '/templates/login',
    liveUrl: '/?path=#',
    component: LoginTemplate,
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'A comprehensive dashboard template with stats cards, activity feed, and sidebar',
    previewUrl: '/templates/dashboard',
    liveUrl: '/?path=#',
    component: DashboardTemplate,
  },
  {
    id: 'empty-state',
    title: 'Empty State',
    description: 'A clean empty state template with centered call-to-action for new projects or features',
    previewUrl: '/templates/empty-state',
    liveUrl: '/?path=#',
    component: EmptyStateTemplate,
  },
  {
    id: 'tabbed-content',
    title: 'Tabbed Content',
    description: 'A full-width content area with tab navigation for organized data sections',
    previewUrl: '/templates/tabbed-content',
    liveUrl: '/?path=#',
    component: TabbedContentTemplate,
  },
  {
    id: 'create-service-form',
    title: 'Create Service Form',
    description: 'A comprehensive multi-section form for service creation with repository details, component configuration, and build preset selection',
    previewUrl: '/templates/create-service-form',
    liveUrl: '/?path=#',
    component: CreateServiceFormTemplate,
  },
  {
    id: 'wizard',
    title: 'Wizard',
    description: 'A multi-step wizard template for guided workflows like campaign creation with step navigation and progress tracking',
    previewUrl: '/templates/wizard',
    liveUrl: '/?path=#',
    component: WizardTemplate,
  },
  {
    id: 'form-validation',
    title: 'Form Validation',
    description: 'A registration form with React Hook Form and Zod validation, demonstrating real-time validation and error handling',
    previewUrl: '/templates/form-validation',
    liveUrl: '/?path=#',
    component: FormValidationTemplate,
  },
];

const TemplatePreview = ({ template }: { template: TemplateCard }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {template.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: '48px' }}>
          {template.description}
        </Typography>
      </Box>
      <Card 
        sx={{ height: '400px', width: '100%', maxWidth: 600, position: 'relative', overflow: 'hidden' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          {isHovered && (
            <Link
              href={template.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                textDecoration: 'none',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  textDecoration: 'none',
                },
              }}
            >
              View Template
            </Link>
          )}
          <Box
            sx={{
              width: '250%', /* 100 / 0.4 */
              transform: 'scale(0.4)',
              position: 'relative',
              top: 0,
              left: 0,
              translate: '0 0',
              transformOrigin: 'top left',
              pointerEvents: 'none',
              transition: 'filter 0.3s ease',
              filter: isHovered ? 'blur(4px)' : 'blur(0px)',
            }}
          >
            {template.component && <template.component.render />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export const ListTemplates: Story = {
  render: () => (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          Templates
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore our collection of ready-to-use templates for common UI patterns and layouts.
          Hover over any template to see the preview blur effect and click to view the live version.
        </Typography>
      </Box>

      <Grid container spacing={1} gap={4}>
        {templates.map((template) => (
          <Grid size={5}>
            <TemplatePreview template={template} />
          </Grid>
        ))}
      </Grid>
    </Box>
  ),
};
