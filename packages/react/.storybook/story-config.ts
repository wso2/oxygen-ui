/**
 * Copyright (c) 2022-2024, WSO2 LLC. (https://www.wso2.com).
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

enum StorybookCategories {
  ComponentAPI = 'Component API',
  DataDisplay = 'Data Display',
  Foundations = 'Foundations',
  Feedback = 'Feedback',
  Icons = 'Icons',
  Inputs = 'Inputs',
  Layout = 'Layout',
  Navigation = 'Navigation',
  Patterns = 'Patterns',
  Theme = 'Theme',
  Typography = 'Typography',
  Surfaces = 'Surfaces',
  Utils = 'Utils'
}

// NOTE: Please keep the stories in alphabetical order.
export type Stories =
  | 'Accordion'
  | 'AccordionDetails'
  | 'AccordionSummary'
  | 'AccountOverview'
  | 'ActionCard'
  | 'Alert'
  | 'AlertTitle'
  | 'AppBar'
  | 'AppShell'
  | 'Autocomplete'
  | 'Avatar'
  | 'Backdrop'
  | 'Badge'
  | 'Box'
  | 'Breadcrumbs'
  | 'Button'
  | 'Card'
  | 'CardActions'
  | 'CardContent'
  | 'CardHeader'
  | 'Carousel'
  | 'Checkbox'
  | 'Chip'
  | 'CircularProgress'
  | 'CircularProgressAvatar'
  | 'Code'
  | 'Colors'
  | 'Collapse'
  | 'CollapsibleNavbarItem'
  | 'ColorModeToggle'
  | 'Container'
  | 'CountryFlag'
  | 'DataGrid'
  | 'Dialog'
  | 'Divider'
  | 'DnD'
  | 'Drawer'
  | 'Fab'
  | 'Footer'
  | 'FormControl'
  | 'FormControlLabel'
  | 'FormGroup'
  | 'FormHelperText'
  | 'FormLabel'
  | 'Grid'
  | 'Header'
  | 'IconButton'
  | 'Icons'
  | 'Image'
  | 'Input'
  | 'InputAdornment'
  | 'InputLabel'
  | 'LinearProgress'
  | 'Link'
  | 'List'
  | 'ListItem'
  | 'ListItemAvatar'
  | 'ListItemButton'
  | 'ListItemIcon'
  | 'ListItemText'
  | 'Menu'
  | 'MenuItem'
  | 'Navbar'
  | 'NavbarItem'
  | 'OutlinedInput'
  | 'Paper'
  | 'PhoneNumberInput'
  | 'Popover'
  | 'Radio'
  | 'RadioGroup'
  | 'Select'
  | 'SignIn'
  | 'Skeleton'
  | 'Snackbar'
  | 'Stack'
  | 'Step'
  | 'StepContent'
  | 'StepLabel'
  | 'Stepper'
  | 'Switch'
  | 'Tab'
  | 'Table'
  | 'TableBody'
  | 'TableCell'
  | 'TableContainer'
  | 'TableFooter'
  | 'TableHead'
  | 'TableRow'
  | 'TabPanel'
  | 'Tabs'
  | 'TransitionStepper'
  | 'TextField'
  | 'Toolbar'
  | 'Tooltip'
  | 'Typography'
  | 'UserDropdownMenu'
  | 'Welcome'
  | 'Wizard';
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
  Accordion: {
    hierarchy: `${StorybookCategories.Surfaces}/Accordion`,
  },
  AccordionDetails: {
    hierarchy: `${StorybookCategories.ComponentAPI}/Accordion Details`,
  },
  AccordionSummary: {
    hierarchy: `${StorybookCategories.ComponentAPI}/Accordion Summary`,
  },
  AccountOverview: {
    hierarchy: `${StorybookCategories.Patterns}/Account Overview`,
  },
  ActionCard: {
    hierarchy: `${StorybookCategories.Surfaces}/Action Card`,
  },
  AppBar: {
    hierarchy: `${StorybookCategories.Surfaces}/App Bar`,
  },
  Alert: {
    hierarchy: `${ StorybookCategories.Feedback }/Alert`,
  },
  AlertTitle: {
    hierarchy: `${ StorybookCategories.Feedback }/Alert Title`,
  },
  AppShell: {
    hierarchy: `${StorybookCategories.Layout}/App Shell`,
  },
  Autocomplete: {
    hierarchy: `${StorybookCategories.Inputs}/Autocomplete`,
  },
  Avatar: {
    hierarchy: `${StorybookCategories.DataDisplay}/Avatar`,
  },
  Backdrop: {
    hierarchy: `${StorybookCategories.Feedback}/Backdrop`,
  },
  Badge: {
    hierarchy: `${StorybookCategories.DataDisplay}/Badge`,
  },
  Box: {
    hierarchy: `${StorybookCategories.Layout}/Box`,
  },
  Breadcrumbs: {
    hierarchy: `${StorybookCategories.Navigation}/Breadcrumbs`,
  },
  Button: {
    hierarchy: `${StorybookCategories.Inputs}/Button`,
  },
  Checkbox: {
    hierarchy: `${StorybookCategories.Inputs}/Checkbox`,
  },
  CircularProgress: {
    hierarchy: `${StorybookCategories.Feedback}/Circular Progress`,
  },
  Card: {
    hierarchy: `${StorybookCategories.Surfaces}/Card`,
  },
  CardActions: {
    hierarchy: `${StorybookCategories.Surfaces}/CardActions`,
  },
  CardContent: {
    hierarchy: `${StorybookCategories.Surfaces}/CardContent`,
  },
  CardHeader: {
    hierarchy: `${StorybookCategories.Surfaces}/CardHeader`,
  },
  Carousel: {
    hierarchy: `${StorybookCategories.Patterns}/Carousel`,
  },
  CircularProgressAvatar: {
    hierarchy: `${StorybookCategories.DataDisplay}/Circular Progress Avatar`,
  },
  Chip: {
    hierarchy: `${StorybookCategories.DataDisplay}/Chip`,
  },
  Code: {
    hierarchy: `${StorybookCategories.DataDisplay}/Code`,
  },
  Collapse: {
    hierarchy: `${StorybookCategories.Utils}/Collapse`,
  },
  CollapsibleNavbarItem: {
    hierarchy: `${StorybookCategories.Navigation}/Collapsible Navbar Item`,
  },
  ColorModeToggle: {
    hierarchy: `${StorybookCategories.Theme}/Color Mode Toggle`,
  },
  Colors: {
    hierarchy: `${StorybookCategories.Foundations}/Colors`,
  },
  Container: {
    hierarchy: `${StorybookCategories.Layout}/Container`,
  },
  DataGrid: {
    hierarchy: `${StorybookCategories.DataDisplay}/DataGrid`,
  },
  Dialog: {
    hierarchy: `${StorybookCategories.Feedback}/Dialog`,
  },
  Divider: {
    hierarchy: `${StorybookCategories.DataDisplay}/Divider`,
  },
  DnD: {
    hierarchy: `${StorybookCategories.Utils}/Drag & Drop`,
  },
  Drawer: {
    hierarchy: `${StorybookCategories.Navigation}/Drawer`,
  },
  CountryFlag: {
    hierarchy: `${StorybookCategories.Icons}/Country Flags`,
  },
  Fab: {
    hierarchy: `${StorybookCategories.Inputs}/Fab`,
  },
  Footer: {
    hierarchy: `${StorybookCategories.Navigation}/Footer`,
  },
  FormHelperText: {
    hierarchy: `${StorybookCategories.Inputs}/Form Helper Text`,
  },
  FormControl: {
    hierarchy: `${StorybookCategories.Inputs}/Form Control`,
  },
  FormControlLabel: {
    hierarchy: `${StorybookCategories.ComponentAPI}/Form Control Label`,
  },
  FormGroup: {
    hierarchy: `${StorybookCategories.ComponentAPI}/Form Group`,
  },
  FormLabel: {
    hierarchy: `${StorybookCategories.ComponentAPI}/Form Label`,
  },
  Grid: {
    hierarchy: `${StorybookCategories.Layout}/Grid`,
  },
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
  Image: {
    hierarchy: `${StorybookCategories.DataDisplay}/Image`,
  },
  Input: {
    hierarchy: `${StorybookCategories.Inputs}/Input`,
  },
  InputAdornment: {
    hierarchy: `${StorybookCategories.ComponentAPI}/Input Adornment`,
  },
  InputLabel: {
    hierarchy: `${StorybookCategories.Inputs}/Input Label`,
  },
  IconButton: {
    hierarchy: `${StorybookCategories.Inputs}/Icon Button`,
  },
  Icons: {
    hierarchy: `${StorybookCategories.Icons}/Icons 🚧`
  },
  LinearProgress: {
    hierarchy: `${ StorybookCategories.Feedback}/Linear Progress`,
  },
  Link: {
    hierarchy: `${StorybookCategories.Navigation}/Link`,
  },
  Menu: {
    hierarchy: `${StorybookCategories.Navigation}/Menu`,
  },
  MenuItem: {
    hierarchy: `${StorybookCategories.Navigation}/Menu Item`,
  },
  Navbar: {
    hierarchy: `${StorybookCategories.Navigation}/Navbar`,
  },
  NavbarItem: {
    hierarchy: `${StorybookCategories.Navigation}/Navbar Item`,
  },
  OutlinedInput: {
    hierarchy: `${StorybookCategories.Inputs}/Outlined Input`,
  },
  List: {
    hierarchy: `${StorybookCategories.DataDisplay}/List`,
  },
  ListItem: {
    hierarchy: `${StorybookCategories.DataDisplay}/List Item`,
  },
  ListItemAvatar: {
    hierarchy: `${StorybookCategories.DataDisplay}/List Item Avatar`,
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
  Paper: {
    hierarchy: `${StorybookCategories.Surfaces}/Paper`,
  },
  PhoneNumberInput: {
    hierarchy: `${StorybookCategories.Inputs}/Phone Number Input`,
  },
  Popover: {
    hierarchy: `${StorybookCategories.Utils}/Popover`,
  },
  Radio: {
    hierarchy: `${StorybookCategories.ComponentAPI}/Radio`,
  },
  RadioGroup: {
    hierarchy: `${StorybookCategories.Inputs}/Radio Group`,
  },
  Select: {
    hierarchy: `${StorybookCategories.Inputs}/Select`,
  },
  SignIn: {
    hierarchy: `${StorybookCategories.Patterns}/Sign In`,
  },
  Skeleton: {
    hierarchy: `${StorybookCategories.Feedback}/Skeleton`,
  },
  Snackbar: {
    hierarchy: `${StorybookCategories.Feedback}/Snackbar`,
  },
  Stack: {
    hierarchy: `${StorybookCategories.Layout}/Stack`,
  },
  Step: {
    hierarchy: `${StorybookCategories.Navigation}/Step`,
  },
  StepContent: {
    hierarchy: `${StorybookCategories.Navigation}/Step Content`,
  },
  StepLabel: {
    hierarchy: `${StorybookCategories.Navigation}/Step Label`,
  },
  Stepper: {
    hierarchy: `${StorybookCategories.Navigation}/Stepper`,
  },
  Switch: {
    hierarchy:  `${StorybookCategories.Inputs}/Switch`,
  },
  Tab: {
    hierarchy: `${StorybookCategories.Navigation}/Tab`,
  },
  Table: {
    hierarchy: `${StorybookCategories.DataDisplay}/Table`,
  },
  TableBody: {
    hierarchy: `${StorybookCategories.DataDisplay}/Table Body`,
  },
  TableCell: {
    hierarchy: `${StorybookCategories.DataDisplay}/Table Cell`,
  },
  TableContainer: {
    hierarchy: `${StorybookCategories.DataDisplay}/Table Container`,
  },
  TableFooter: {
    hierarchy: `${StorybookCategories.DataDisplay}/Table Footer`,
  },
  TableHead: {
    hierarchy: `${StorybookCategories.DataDisplay}/Table Head`,
  },
  TableRow: {
    hierarchy: `${StorybookCategories.DataDisplay}/Table Row`,
  },
  TabPanel: {
    hierarchy: `${StorybookCategories.Navigation}/Tab Panel`,
  },
  Tabs: {
    hierarchy: `${StorybookCategories.Navigation}/Tabs`,
  },
  TransitionStepper: {
    hierarchy: `${StorybookCategories.Navigation}/Transition Stepper`,
  },
  TextField: {
    hierarchy: `${StorybookCategories.Inputs}/Text Field`,
  },
  Toolbar: {
    hierarchy: `${StorybookCategories.Surfaces}/Toolbar`,
  },
  Tooltip: {
    hierarchy: `${StorybookCategories.DataDisplay}/Tooltip`,
  },
  Typography: {
    hierarchy: `${StorybookCategories.DataDisplay}/Typography`,
  },
  UserDropdownMenu: {
    hierarchy: `${StorybookCategories.Navigation}/User Dropdown Menu`,
  },
  Welcome: {
    hierarchy: 'Welcome',
  },
  Wizard: {
    hierarchy: `${StorybookCategories.Patterns}/Wizard`,
  }
};

export default StoryConfig;
