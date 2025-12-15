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

import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Box,
  Typography,
  Divider,
} from '@wso2/oxygen-ui';
import { ChevronDown, Check, Building2, FolderKanban, Plus } from '@wso2/oxygen-ui-icons-react';
import type { Organization, Project, Environment } from './types';

/**
 * Theme tokens used in this component:
 *
 * Chip color prop (environment switcher):
 * - color="info" - Development environment (blue tones)
 * - color="warning" - Staging environment (orange/yellow tones)
 * - color="success" - Production environment (green tones)
 * - color="default" - Inactive/unselected chips
 *
 * Chip variant prop:
 * - variant="filled" - Selected state (solid background)
 * - variant="outlined" - Unselected state (border only)
 *
 * Colors:
 * - `text.primary` - Button text color
 * - `text.secondary` - Category labels, secondary descriptions
 * - `action.hover` - Button hover background
 * - `action.selected` - Selected menu item background
 * - `primary.main` - Selected avatar background, check icon
 *
 * Menu Paper:
 * - Uses theme's elevation and border radius
 * - slotProps.paper.sx for custom paper styling
 */

/**
 * Environment color mapping for visual distinction.
 */
const environmentColors: Record<Environment, 'default' | 'info' | 'warning' | 'success'> = {
  development: 'info',
  staging: 'warning',
  production: 'success',
};

/**
 * Environment labels for display.
 */
const environmentLabels: Record<Environment, string> = {
  development: 'Dev',
  staging: 'Staging',
  production: 'Prod',
};

/**
 * Props for organization/project switcher.
 */
interface OrgProjectSwitcherProps {
  type: 'organization' | 'project';
  items: (Organization | Project)[];
  selected: Organization | Project;
  onChange?: (item: Organization | Project) => void;
}

/**
 * Props for environment switcher.
 */
interface EnvironmentSwitcherProps {
  type: 'environment';
  environment: Environment;
  onEnvironmentChange: (env: Environment) => void;
  items?: never;
  selected?: never;
  onChange?: never;
}

/**
 * Combined props type for AppShellSwitcher.
 */
export type AppShellSwitcherProps = OrgProjectSwitcherProps | EnvironmentSwitcherProps;

/**
 * AppShellSwitcher - Visual placeholder for organization/project/environment switching.
 *
 * This component demonstrates the UI pattern for context switchers commonly found
 * in enterprise applications. It shows:
 * - Organization switcher: Dropdown with org avatars and names
 * - Project switcher: Dropdown with project names and colors
 * - Environment switcher: Chip-based toggle (Dev/Staging/Prod)
 *
 * Note: This is a visual demonstration. In a real application, you would
 * integrate this with your own state management and API calls.
 *
 * Usage:
 * ```tsx
 * // Organization switcher
 * <AppShellSwitcher
 *   type="organization"
 *   items={organizations}
 *   selected={currentOrg}
 *   onChange={handleOrgChange}
 * />
 *
 * // Project switcher
 * <AppShellSwitcher
 *   type="project"
 *   items={projects}
 *   selected={currentProject}
 *   onChange={handleProjectChange}
 * />
 *
 * // Environment switcher
 * <AppShellSwitcher
 *   type="environment"
 *   environment={currentEnv}
 *   onEnvironmentChange={handleEnvChange}
 * />
 * ```
 */
export const AppShellSwitcher: React.FC<AppShellSwitcherProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Environment switcher (chips)
  if (props.type === 'environment') {
    const { environment, onEnvironmentChange } = props;
    const environments: Environment[] = ['development', 'staging', 'production'];

    return (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {environments.map((env) => (
          <Chip
            key={env}
            label={environmentLabels[env]}
            size="small"
            color={environment === env ? environmentColors[env] : 'default'}
            variant={environment === env ? 'filled' : 'outlined'}
            onClick={() => onEnvironmentChange(env)}
            sx={{
              cursor: 'pointer',
              fontWeight: environment === env ? 600 : 400,
              minWidth: 60,
            }}
          />
        ))}
      </Box>
    );
  }

  // Organization or Project switcher (dropdown)
  const { type, items, selected, onChange } = props;
  const isOrg = type === 'organization';
  const Icon = isOrg ? Building2 : FolderKanban;

  const handleSelect = (item: Organization | Project) => {
    onChange?.(item);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="text"
        size="small"
        endIcon={<ChevronDown size={16} />}
        sx={{
          color: 'text.primary',
          textTransform: 'none',
          fontWeight: 500,
          px: 1.5,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isOrg && (selected as Organization).avatar && (
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: 12,
                bgcolor: 'primary.main',
              }}
            >
              {(selected as Organization).avatar}
            </Avatar>
          )}
          {!isOrg && (selected as Project).color && (
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: (selected as Project).color,
              }}
            />
          )}
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {selected.name}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              maxHeight: 320,
            },
          },
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {isOrg ? 'Organizations' : 'Projects'}
          </Typography>
        </Box>
        <Divider />

        {/* Items */}
        {items.map((item) => {
          const isSelected = item.id === selected.id;
          return (
            <MenuItem
              key={item.id}
              onClick={() => handleSelect(item)}
              selected={isSelected}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                {isOrg ? (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: 12,
                      bgcolor: isSelected ? 'primary.main' : 'action.selected',
                    }}
                  >
                    {(item as Organization).avatar || item.name.charAt(0)}
                  </Avatar>
                ) : (
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: (item as Project).color || 'primary.main',
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                secondary={item.description}
                primaryTypographyProps={{
                  fontWeight: isSelected ? 600 : 400,
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  noWrap: true,
                }}
              />
              {isSelected && (
                <Check size={16} style={{ marginLeft: 8, color: 'inherit' }} />
              )}
            </MenuItem>
          );
        })}

        {/* Create new action */}
        <Divider />
        <MenuItem
          sx={{
            py: 1.5,
            color: 'primary.main',
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Plus size={20} />
          </ListItemIcon>
          <ListItemText
            primary={isOrg ? 'Create Organization' : 'Create Project'}
            primaryTypographyProps={{
              fontWeight: 500,
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppShellSwitcher;
