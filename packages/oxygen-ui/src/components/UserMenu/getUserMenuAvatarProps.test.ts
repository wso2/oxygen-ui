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

import { describe, expect, it } from 'vitest';
import {
  getUserMenuAvatarProps,
  isUserMenuAvatarImageUrl,
} from './getUserMenuAvatarProps';

const NAME = 'Jane Doe';
const NAME_INITIAL = 'J';

describe('isUserMenuAvatarImageUrl', () => {
  it('returns true for http(s), root-relative, data, and blob URLs', () => {
    expect(isUserMenuAvatarImageUrl('https://cdn.example.com/a.png')).toBe(true);
    expect(isUserMenuAvatarImageUrl('http://cdn.example.com/a.png')).toBe(true);
    expect(isUserMenuAvatarImageUrl('/avatars/x.png')).toBe(true);
    expect(isUserMenuAvatarImageUrl('data:image/png;base64,abc')).toBe(true);
    expect(isUserMenuAvatarImageUrl('blob:https://example.com/uuid')).toBe(true);
  });

  it('returns false for initials and protocol-less hostnames', () => {
    expect(isUserMenuAvatarImageUrl('JD')).toBe(false);
    expect(isUserMenuAvatarImageUrl('avatar.example.com/pic.jpg')).toBe(false);
  });
});

describe('getUserMenuAvatarProps', () => {
  it('falls back to the name initial when avatar is omitted, null, or empty', () => {
    expect(getUserMenuAvatarProps(NAME)).toEqual({ children: NAME_INITIAL });
    expect(getUserMenuAvatarProps(NAME, null)).toEqual({ children: NAME_INITIAL });
    expect(getUserMenuAvatarProps(NAME, '')).toEqual({ children: NAME_INITIAL });
  });

  it('treats non-URL strings as initials children', () => {
    expect(getUserMenuAvatarProps(NAME, 'JD')).toEqual({ children: 'JD' });
  });

  it('uses https and http values as image src with name-initial children', () => {
    const httpsUrl = 'https://cdn.example.com/a.png';
    const httpUrl = 'http://cdn.example.com/a.png';

    expect(getUserMenuAvatarProps(NAME, httpsUrl)).toEqual({
      src: httpsUrl,
      children: NAME_INITIAL,
    });
    expect(getUserMenuAvatarProps(NAME, httpUrl)).toEqual({
      src: httpUrl,
      children: NAME_INITIAL,
    });
  });

  it('uses root-relative paths as image src with name-initial children', () => {
    const path = '/avatars/x.png';

    expect(getUserMenuAvatarProps(NAME, path)).toEqual({
      src: path,
      children: NAME_INITIAL,
    });
  });

  it('uses data and blob URLs as image src with name-initial children', () => {
    const dataUrl = 'data:image/png;base64,abc';
    const blobUrl = 'blob:https://example.com/uuid';

    expect(getUserMenuAvatarProps(NAME, dataUrl)).toEqual({
      src: dataUrl,
      children: NAME_INITIAL,
    });
    expect(getUserMenuAvatarProps(NAME, blobUrl)).toEqual({
      src: blobUrl,
      children: NAME_INITIAL,
    });
  });

  it('does not treat protocol-less hostnames as image URLs', () => {
    const protocolLess = 'avatar.example.com/pic.jpg';

    expect(getUserMenuAvatarProps(NAME, protocolLess)).toEqual({
      children: protocolLess,
    });
  });
});
