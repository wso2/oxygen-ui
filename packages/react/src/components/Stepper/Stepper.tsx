/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Box from '../Box';
import type {BoxProps, BoxTypeMap} from '../Box';
import './stepper.scss';

export type StepperProps<C extends ElementType = ElementType> = BoxProps<C> & {
  /**
   * Animate the slide transition.
   */
  animateOnSlide?: boolean;
  /**
   * Current step.
   */
  currentStep: number;
  /**
   * Steps to be rendered.
   */
  steps: ReactElement[];
};

const COMPONENT_NAME: string = 'Stepper';

/**
 * The Stepper can be used to compose wizards and carousels.
 *
 * Demos:
 *
 * - [Stepper (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-stepper--overview)
 *
 * API:
 *
 * - inherits [Box API](https://mui.com/material-ui/api/box/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Box](https://mui.com/material-ui/api/box/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Stepper component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered Stepper component.
 */
const Stepper: OverridableComponent<BoxTypeMap<StepperProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {animateOnSlide, className, currentStep = 0, steps}: StepperProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const [slideLeftPosition, setSlideLeftPosition] = useState<number>(0);
    const [slideContainerWidth, setSlideContainerWidth] = useState<number>(0);

    const slideContainerRef: Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const classes: string = clsx('oxygen-stepper', className);

    const slideContainer: (position: number) => void = useCallback(
      (position: number): void => {
        if (!animateOnSlide) {
          return;
        }

        const slideBy: number = position;
        setSlideLeftPosition(slideBy * -1 * currentStep);
      },
      [currentStep, animateOnSlide],
    );

    useEffect(() => {
      if (!slideContainerRef?.current || !animateOnSlide) {
        return () => {};
      }

      setSlideContainerWidth(slideContainerRef.current.offsetWidth);

      const handleResize = (): void => {
        const width: number = slideContainerRef.current.offsetWidth;
        setSlideContainerWidth(width);
        slideContainer(width);
      };

      window.addEventListener('resize', handleResize);

      return (): void => {
        window.removeEventListener('resize', handleResize);
      };
    }, [animateOnSlide, slideContainer]);

    useEffect(() => {
      slideContainer(slideContainerWidth);
    }, [slideContainerWidth, slideContainer]);

    if (animateOnSlide) {
      return (
        <Box className={classes} ref={slideContainerRef}>
          <Box className="oxygen-stepper-container" sx={{left: `${slideLeftPosition}px`}}>
            {steps.map((step: ReactElement) => (
              <Box key={step.key} ref={ref} sx={{width: slideContainerWidth}}>
                {step}
              </Box>
            ))}
          </Box>
        </Box>
      );
    }

    return steps[currentStep];
  },
) as OverridableComponent<BoxTypeMap<StepperProps>> & WithWrapperProps;

Stepper.displayName = composeComponentDisplayName(COMPONENT_NAME);
Stepper.muiName = COMPONENT_NAME;

export default Stepper;
