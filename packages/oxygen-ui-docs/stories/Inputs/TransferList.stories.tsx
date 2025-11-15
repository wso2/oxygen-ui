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

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem, ListItemText, Checkbox, Button, Paper, Box, ListItemIcon } from '@wso2/oxygen-ui';

/**
 * Transfer List allows users to move items between two lists.
 * 
 * Read more at: https://mui.com/material-ui/react-transfer-list/
 */
const meta: Meta = {
  title: 'Inputs/Transfer List',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Transfer List is a compound component pattern using MUI List, Button, and Checkbox components. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-transfer-list/](https://mui.com/material-ui/react-transfer-list/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

/**
 * Basic transfer list
 */
export const Basic: Story = {
  render: () => {
    const [checked, setChecked] = useState<readonly number[]>([]);
    const [left, setLeft] = useState<readonly number[]>([0, 1, 2, 3]);
    const [right, setRight] = useState<readonly number[]>([4, 5, 6, 7]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly number[]) => intersection(checked, items).length;

    const handleToggleAll = (items: readonly number[]) => () => {
      if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
      } else {
        setChecked(union(checked, items));
      }
    };

    const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
    };

    const customList = (title: React.ReactNode, items: readonly number[]) => (
      <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
        <List dense component="div" role="list">
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={
                  numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                }
                disabled={items.length === 0}
                inputProps={{
                  'aria-label': 'all items selected',
                }}
              />
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
          {items.map((value: number) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem key={value} role="listitem" onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Item ${value + 1}`} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );

    return (
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Box>{customList('Choices', left)}</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Box>
        <Box>{customList('Chosen', right)}</Box>
      </Box>
    );
  },
};

/**
 * Enhanced transfer list with search
 */
export const Enhanced: Story = {
  render: () => {
    const [checked, setChecked] = useState<readonly number[]>([]);
    const [left, setLeft] = useState<readonly number[]>([0, 1, 2, 3, 4, 5, 6]);
    const [right, setRight] = useState<readonly number[]>([7, 8, 9, 10]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    const handleAllRight = () => {
      setRight(right.concat(left));
      setLeft([]);
    };

    const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
      setLeft(left.concat(right));
      setRight([]);
    };

    const customList = (items: readonly number[]) => (
      <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
        <List dense component="div" role="list">
          {items.map((value: number) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem key={value} role="listitem" onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );

    return (
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Box>{customList(left)}</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Box>
        <Box>{customList(right)}</Box>
      </Box>
    );
  },
};
