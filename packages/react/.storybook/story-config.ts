/**
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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
 *
 */

enum StorybookCategories {
  DataDisplay = 'Data Display',
  Foundations = 'Foundations',
  Icons = 'Icons',
  Inputs = 'Inputs',
  Layout = 'Layout',
  Navigation = 'Navigation',
  Patterns = 'Patterns',
  Theme = 'Theme',
  Typography = 'Typography',
  Surfaces = 'Surfaces',
}

export type Stories =
  | 'AppBar'
  | 'Avatar'
  | 'Header'
  | 'Box'
  | 'Button'
  | 'ColorModeToggle'
  | 'Colors'
  | 'Grid'
  | 'Icons'
  | 'Image'
  | 'Link'
  | 'List'
  | 'ListItem'
  | 'ListItemButton'
  | 'ListItemIcon'
  | 'ListItemText'
  | 'Menu'
  | 'SignIn'
  | 'TextField'
  | 'Tooltip'
  | 'Typeset'
  | 'Typography'
  | 'Welcome';
export type StorybookConfig = Record<
  Stories,
  {
    hierarchy: string;
    design?: {
      type: 'figma';
      url: string;
    };
    story?: {
      [key: string]: {
        design?: {
          type: 'figma';
          url: string;
        };
      };
    };
  }
>;

const StoryConfig: StorybookConfig = {
  Header: {
    story: {
      Overview: {
        design: {
          type: 'figma',
          url: 'https://www.figma.com/file/HyEVOfDBGyXsvPSbNdgquW/Navigation%2FHeader?node-id=120%3A1437&t=NT0uoPAY3qLFlkmN-0',
        },
      },
    },
    hierarchy: `${StorybookCategories.Navigation}/Header`,
  },
  AppBar: {
    hierarchy: `${StorybookCategories.Surfaces}/App Bar`,
  }, 
  Avatar: {
    hierarchy: `${StorybookCategories.DataDisplay}/Avatar`,
  }, 
  Box: {
    hierarchy: `${StorybookCategories.Layout}/Box`,
  },
  Button: {
    hierarchy: `${StorybookCategories.Inputs}/Button`,
  },
  ColorModeToggle: {
    hierarchy: `${StorybookCategories.Theme}/Color Mode Toggle`,
  },
  Colors: {
    hierarchy: `${StorybookCategories.Foundations}/Colors`,
  },
  Grid: {
    hierarchy: `${StorybookCategories.Layout}/Grid`,
  },
  Image: {
    hierarchy: `${StorybookCategories.DataDisplay}/Image`,
  },
  Icons: {
    hierarchy: `${StorybookCategories.Icons}/Icons`,
  },
  Link: {
    hierarchy: `${StorybookCategories.Navigation}/Link`,
  },
  Menu: {
    hierarchy: `${StorybookCategories.Navigation}/Menu`,
  },
  List: {
    hierarchy: `${StorybookCategories.DataDisplay}/List`,
  },
  ListItem: {
    hierarchy: `${StorybookCategories.DataDisplay}/List Item`,
  },
  ListItemButton: {
    hierarchy: `${StorybookCategories.DataDisplay}/List Item Button`,
  },
  ListItemIcon: {
    hierarchy: `${StorybookCategories.DataDisplay}/List Item Icon`,
  },
  ListItemText: {
    hierarchy: `${StorybookCategories.DataDisplay}/List Item Text`,
  },
  SignIn: {
    hierarchy: `${StorybookCategories.Patterns}/Sign In`,
  },
  TextField: {
    hierarchy: `${StorybookCategories.Inputs}/Text Field`,
  },
  Tooltip: {
    hierarchy: `${StorybookCategories.DataDisplay}/Tooltip`,
  },
  Typeset: {
    hierarchy: `${StorybookCategories.Foundations}/Typeset`,
  },
  Typography: {
    hierarchy: `${StorybookCategories.DataDisplay}/Typography`,
  },
  Welcome: {
    hierarchy: 'Welcome',
  },
};

export default StoryConfig;
