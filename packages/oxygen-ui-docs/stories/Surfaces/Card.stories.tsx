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

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@wso2/oxygen-ui';

const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI card component is a direct import of MUI card component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-card/](https://mui.com/material-ui/react-card/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a basic card with some content. Cards contain content and actions about a single subject.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Card with Actions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cards can include actions like buttons at the bottom.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://picsum.photos/345/140"
        alt="Card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Card with Image
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cards can include media like images or videos.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Outlined Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card has an outlined variant with a border.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }} elevation={8}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Elevated Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card has a higher elevation for more prominent shadow.
        </Typography>
      </CardContent>
    </Card>
  ),
};
