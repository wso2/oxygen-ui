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

import { type RouteProps } from 'react-router'
import DefaultLayout from '../layouts/DefaultLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import GateLayout from '../layouts/GateLayout'
import ProjectOverview from '../pages/ProjectOverview'
import ComponentCreate from '../pages/ComponentCreate'
import ComponentList from '../pages/ComponentList'
import EmptyComponentList from '../pages/EmptyComponentList'
import LogView from '../pages/LogView'
import LoginEditorView from '../pages/LoginEditorView'
import SettingsPage from '../pages/SettingsPage'
import ErrorPage from '../pages/ErrorPage'
import AppLayout from '../layouts/AppLayout'
import OrganizationOverview from '../pages/OrganizationOverview'
import AnalyticsOverview from '../pages/Analytics'

/**
 * Interface representing an application route configuration.
 * Extends React Router's RouteProps but allows nested children of the same type.
 */
export interface AppRoute extends Omit<RouteProps, 'children'> {
  /**
   * Child routes nested under this route.
   */
  children?: AppRoute[]
  /**
   * Label to display in navigation links.
   */
  label?: string
  /**
   * Whether to show this route in navigation.
   */
  showInNav?: boolean
}

/**
 * Application routes configuration.
 * Defines the routing structure for the Thunder Gate application.
 *
 * @constant
 * @type {AppRoute[]}
 *
 * @example
 * ```tsx
 * import appRoutes from './config/appRoutes';
 *
 * // Use in React Router
 * <Routes>
 *   {appRoutes.map((route) => (
 *     <Route key={route.path} {...route} />
 *   ))}
 * </Routes>
 * ```
 */
const appRoutes: AppRoute[] = [
  {
    element: <GateLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        label: 'Login Page',
        showInNav: true,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/organizations',
        element: <OrganizationOverview />,
        label: 'Organizations List Page',
        showInNav: true,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/projects',
        element: <ProjectOverview />,
        label: 'Projects',
        showInNav: false,
      },
      {
        path: '/projects/:id',
        element: <ProjectOverview />,
        label: 'Project Overview',
        showInNav: false,
      },
      {
        path: '/analytics',
        element: <AnalyticsOverview />,
        label: 'Project Overview',
        showInNav: false,
      },
      {
        path: '/projects/:id/components',
        element: <ComponentList />,
        label: 'Components',
        showInNav: false,
      },
      {
        path: '/projects/:id/components/empty',
        element: <EmptyComponentList />,
        label: 'Empty Component List',
        showInNav: false,
      },
      {
        path: '/projects/:id/components/new',
        element: <ComponentCreate />,
        label: 'Create Component',
        showInNav: false,
      },
      {
        path: '/projects/:id/components/:componentId',
        element: <LoginEditorView />,
        label: 'Component Editor',
        showInNav: false,
      },
      {
        path: '/projects/:id/components/:componentId/edit',
        element: <LoginEditorView />,
        label: 'Edit Component',
        showInNav: false,
      },
      {
        path: '/projects/:id/logs',
        element: <LogView />,
        label: 'Activity Logs',
        showInNav: false,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
        label: 'Organization Settings',
        showInNav: false,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <HomePage />,
        label: 'Home',
        showInNav: false,
      },
      {
        path: '/error',
        element: <ErrorPage />,
        label: '404 Error Page',
        showInNav: true,
      },
    ],
  },
]

export default appRoutes
