/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { GRADIENT_ANGLE_PROPERTY, GRADIENT_ANIMATED_CLASS } from '../../styles/OxygenThemeBase';

declare module '@mui/material/Button' {
  interface ButtonOwnProps {
    /**
     * Animates the gradient of a `color="gradient"` button: the outline of an `outlined` button
     * circles around it, and the fill of a `contained` button or the label of a `text` button flows
     * across. Ignored for other colors, and held still when the user prefers reduced motion.
     * @default false
     */
    animated?: boolean;
  }
}

export type ButtonProps = MuiButtonProps;

let angleRegistered = false;

/**
 * Registers the angle the circling outline rotates through, so the browser can animate it smoothly.
 * Where registration is unsupported the outline simply stays still.
 */
const registerGradientAngle = () => {
  if (angleRegistered || typeof window === 'undefined' || !window.CSS?.registerProperty) {
    return;
  }
  angleRegistered = true;
  try {
    window.CSS.registerProperty({
      name: GRADIENT_ANGLE_PROPERTY,
      syntax: '<angle>',
      inherits: false,
      initialValue: '0deg',
    });
  } catch {
    // Already registered, for example by another copy of the library on the page.
  }
};

/**
 * MUI's Button, with an `animated` prop for the `gradient` color. The prop is turned into a class
 * rather than passed on, since MUI would otherwise forward it to the DOM element.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { animated = false, className, ...props },
  ref,
) {
  const animate = animated && props.color === 'gradient';

  React.useEffect(() => {
    if (animate) {
      registerGradientAngle();
    }
  }, [animate]);

  return (
    <MuiButton
      ref={ref}
      {...props}
      className={animate ? [GRADIENT_ANIMATED_CLASS, className].filter(Boolean).join(' ') : className}
    />
  );
}) as typeof MuiButton;

export default Button;
