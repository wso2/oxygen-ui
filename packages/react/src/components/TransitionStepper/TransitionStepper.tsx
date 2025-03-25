/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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
import Box from '../Box';
import type {BoxProps, BoxTypeMap} from '../Box';
import './transition-stepper.scss';

export type TransitionStepperProps<C extends ElementType = ElementType> = BoxProps<C> & {
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

/**
 * The TransitionStepper can be used to compose wizards and carousels.
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
 * @param props - The props for the TransitionStepper component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered TransitionStepper component.
 */
const TransitionStepper: OverridableComponent<BoxTypeMap<TransitionStepperProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {animateOnSlide, className, currentStep = 0, steps}: TransitionStepperProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const [slideLeftPosition, setSlideLeftPosition] = useState<number>(0);
    const [slideContainerWidth, setSlideContainerWidth] = useState<number>(0);

    const slideContainerRef: Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

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
        <Box
          className={clsx(
            /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
            'oxygen-transition-stepper',
            'OxygenTransitionStepper-root',
            className,
          )}
          ref={slideContainerRef}
        >
          <Box
            className="OxygenTransitionStepper-container oxygen-transition-stepper-container"
            sx={{left: `${slideLeftPosition}px`}}
          >
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
) as OverridableComponent<BoxTypeMap<TransitionStepperProps>>;

export default TransitionStepper;
