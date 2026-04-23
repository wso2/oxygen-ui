/**
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com).
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

import { ColorSchemeImage, useThemeContent } from '@wso2/oxygen-ui'
import type { JSX } from 'react'

export default function Logo(props: {height?: number}): JSX.Element {
  const choreoLogo = (
    <ColorSchemeImage
      src={{
        light: `${import.meta.env.BASE_URL}assets/images/choreo-logo.svg`,
        dark: `${import.meta.env.BASE_URL}assets/images/choreo-logo.svg`,
      }}
      alt={{light: 'Choreo Logo (Light)', dark: 'Choreo Logo (Dark)'}}
      height={props.height ?? 24}
      width="auto"
    />
  );

  const asgardeoLogo = (
    <ColorSchemeImage
      src={{
        light: `${import.meta.env.BASE_URL}assets/images/asgardeo-logo.svg`,
        dark: `${import.meta.env.BASE_URL}assets/images/asgardeo-logo-inverted.svg`,
      }}
      alt={{light: 'Asgardeo Logo (Light)', dark: 'Asgardeo Logo (Dark)'}}
      height={props.height ?? 24}
      width="auto"
    />
  );

  const thunderLogo = (
    <ColorSchemeImage
      src={{
        light: `${import.meta.env.BASE_URL}assets/images/thunder-logo.svg`,
        dark: `${import.meta.env.BASE_URL}assets/images/thunder-logo-inverted.svg`,
      }}
      alt={{light: 'Thunder Logo (Light)', dark: 'Thunder Logo (Dark)'}}
      height={props.height ?? 24}
      width="auto"
      sx={{mt: -0.5}}
    />
  );

  const Logo = useThemeContent({
    default: (
      <ColorSchemeImage
        src={{
          light: `${import.meta.env.BASE_URL}assets/images/oxygen-ui-logo.svg`,
          dark: `${import.meta.env.BASE_URL}assets/images/oxygen-ui-logo-inverted.svg`,
        }}
        alt={{light: 'Oxygen UI Logo (Light)', dark: 'Oxygen UI Logo (Dark)'}}
        height={props.height ?? 22}
        width="auto"
      />),
    acrylicPurple: choreoLogo,
    asgardeoLogo: asgardeoLogo,
    thunder: thunderLogo,
    choreo: choreoLogo
  });

  return Logo;
}
