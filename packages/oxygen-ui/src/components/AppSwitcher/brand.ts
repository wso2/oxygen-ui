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

/**
 * WSO2 brand colors used by the AppSwitcher.
 *
 * These are deliberately fixed rather than read from `palette.primary`: the
 * switcher is WSO2 Cloud chrome, so it shows the brand orange even in a product
 * running an indigo or grey theme.
 *
 * Contrast (WCAG 2.1 AA needs 4.5:1 for normal text): `main` (#FF7300) is
 * 2.73:1 on white, so it is used only for non-text surfaces — the WSO2 mark,
 * card borders and focus rings. Any brand-colored *text* would need a darker
 * shade; the switcher has none.
 *
 * See https://github.com/wso2/oxygen-ui/issues/558 for the palette-wide
 * contrast discussion.
 */
export const APP_SWITCHER_BRAND = {
  /** Full-strength WSO2 orange. Non-text surfaces only. */
  main: '#FF7300',
  /** Faded orange for the mark of a platform that is not yet available. */
  surfaceMark: '#FFC199',
} as const;
