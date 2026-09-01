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
 * Props resolved for MUI Avatar from a UserMenu `avatar` value.
 */
export interface UserMenuAvatarProps {
  /** Image URL when `avatar` looks like a URL; otherwise undefined */
  src?: string;
  /** Initials or fallback letter shown when there is no image (or image fails) */
  children: string;
}

const IMAGE_URL_PATTERN = /^(https?:|\/|data:|blob:)/i;

/**
 * Returns whether a string should be treated as an avatar image URL.
 */
export function isUserMenuAvatarImageUrl(value: string): boolean {
  return IMAGE_URL_PATTERN.test(value);
}

/**
 * Resolves MUI Avatar `src` and children from a UserMenu `avatar` value.
 *
 * - Image-like values (`http(s):`, `/`, `data:`, `blob:`) are used as `src`,
 *   with the name initial as children for failed loads.
 * - Other non-empty strings (e.g. `"JD"`) are treated as initials children.
 * - Null/undefined falls back to the first character of `name`.
 */
export function getUserMenuAvatarProps(
  name: string,
  avatar?: string | null,
): UserMenuAvatarProps {
  const nameInitial = name.charAt(0);

  if (!avatar) {
    return { children: nameInitial };
  }

  if (isUserMenuAvatarImageUrl(avatar)) {
    return {
      src: avatar,
      children: nameInitial,
    };
  }

  return { children: avatar };
}
