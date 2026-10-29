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

import {Link, type LinkProps} from '@wso2/oxygen-ui';

/**
 * A link in the text colour, always underlined so it is recognisable without relying on colour.
 * Oxygen's primary orange does not reach 4.5:1 contrast as text, and the Oxygen theme removes the
 * underline from links, which the `underline` prop does not restore, so it is set here directly.
 */
export default function TextLink({sx, ...props}: LinkProps) {
  return <Link color="text.primary" sx={[{textDecoration: 'underline'}, ...(Array.isArray(sx) ? sx : [sx])]} {...props} />;
}
