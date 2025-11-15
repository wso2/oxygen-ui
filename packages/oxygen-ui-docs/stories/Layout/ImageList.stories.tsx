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
import { ImageList, ImageListItem, ImageListItemBar } from '@wso2/oxygen-ui';

/**
 * Image List displays a collection of images in an organized grid.
 * 
 * Read more at: https://mui.com/material-ui/react-image-list/
 */
const meta: Meta<typeof ImageList> = {
  title: 'Layout/Image List',
  component: ImageList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI Image List is a direct import of MUI Image List. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-image-list/](https://mui.com/material-ui/react-image-list/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageList>;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=248&fit=crop&auto=format',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=248&fit=crop&auto=format',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=248&fit=crop&auto=format',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=248&fit=crop&auto=format',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=248&fit=crop&auto=format',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=248&fit=crop&auto=format',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=248&fit=crop&auto=format',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=248&fit=crop&auto=format',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=248&fit=crop&auto=format',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=248&fit=crop&auto=format',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=248&fit=crop&auto=format',
    title: 'Bike',
  },
];

/**
 * Standard image list
 */
export const Standard: Story = {
  render: () => (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}&dpr=2 2x`}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
};

/**
 * Image list with title bars
 */
export const WithTitleBar: Story = {
  render: () => (
    <ImageList sx={{ width: 500, height: 450 }} cols={3}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}&dpr=2 2x`}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} />
        </ImageListItem>
      ))}
    </ImageList>
  ),
};

/**
 * Quilted image list
 */
export const Quilted: Story = {
  render: () => {
    function srcset(image: string, size: number, rows = 1, cols = 1) {
      return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
          size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
      };
    }

    return (
      <ImageList
        sx={{ width: 500, height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {itemData.map((item, index) => (
          <ImageListItem
            key={item.img}
            cols={index % 3 === 0 ? 2 : 1}
            rows={index % 3 === 0 ? 2 : 1}
          >
            <img
              {...srcset(item.img, 121, index % 3 === 0 ? 2 : 1, index % 3 === 0 ? 2 : 1)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  },
};

/**
 * Woven image list
 */
export const Woven: Story = {
  render: () => (
    <ImageList sx={{ width: 500, height: 450 }} variant="woven" cols={3} gap={8}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}&dpr=2 2x`}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
};

/**
 * Masonry image list
 */
export const Masonry: Story = {
  render: () => (
    <ImageList sx={{ width: 500, height: 450 }} variant="masonry" cols={3} gap={8}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}&dpr=2 2x`}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
};

/**
 * Image list with custom bar position
 */
export const CustomBar: Story = {
  render: () => (
    <ImageList sx={{ width: 500, height: 450 }} cols={3}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}&dpr=2 2x`}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
};
