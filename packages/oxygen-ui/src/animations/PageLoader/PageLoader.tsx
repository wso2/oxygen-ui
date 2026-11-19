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
import { Box, Typography, useMediaQuery } from '@mui/material';
import type { BoxProps } from '@mui/material';
import PageLoaderIcon, { PAGE_LOADER_ICON_MOVE, PAGE_LOADER_ICON_STEP } from './PageLoaderIcon';
import PageLoaderWordmark, { PAGE_LOADER_WORDMARK_GAP } from './PageLoaderWordmark';

/**
 * Where the loader is in its sequence.
 * - `loading`: the icon animates while the background task runs.
 * - `settling`: the task is done; waiting for the icon to come to rest.
 * - `revealing`: the title slides out and pushes the icon to the left.
 * - `revealed`: the full logo is on screen, held for `holdDuration`.
 * - `exiting`: `onComplete` has fired and the overlay fades out.
 * - `done`: the overlay is gone and `children` are shown.
 */
export type PageLoaderPhase = 'loading' | 'settling' | 'revealing' | 'revealed' | 'exiting' | 'done';

export interface PageLoaderProps extends Omit<BoxProps, 'title' | 'children'> {
  /**
   * `true` while the background task runs. Set it to `false` when the task is done to
   * start the reveal; `onComplete` fires once the full logo has been shown.
   */
  loading: boolean;
  /**
   * Text or element revealed to the right of the icon. Defaults to the Oxygen UI wordmark.
   * Text is set in the theme font, sized and tracked to match the wordmark.
   */
  title?: React.ReactNode;
  /**
   * Replaces the animated mark. When it is not the default icon, the loader does not
   * wait for it to come to rest before revealing.
   */
  icon?: React.ReactNode;
  /**
   * Height of the icon in pixels. The title is sized to match.
   * @default 48
   */
  size?: number;
  /**
   * Called once the full logo has been shown, before the overlay fades out.
   */
  onComplete?: () => void;
  /**
   * Called on every phase change.
   */
  onPhaseChange?: (phase: PageLoaderPhase) => void;
  /**
   * Length of the reveal, in milliseconds.
   * @default 700
   */
  revealDuration?: number;
  /**
   * How long the full logo stays on screen before `onComplete`, in milliseconds.
   * @default 600
   */
  holdDuration?: number;
  /**
   * Length of the fade out after `onComplete`, in milliseconds.
   * @default 400
   */
  exitDuration?: number;
  /**
   * Covers the viewport. Set to `false` to fill the parent instead.
   * @default true
   */
  fullScreen?: boolean;
  /**
   * Label read out by screen readers while loading.
   * @default 'Loading'
   */
  loadingLabel?: string;
  /**
   * Content shown once the loader has finished. It mounts when the overlay starts
   * fading out, so it is already in place underneath.
   */
  children?: React.ReactNode;
}

const EASING = 'cubic-bezier(.25, .9, .3, 1)';

/**
 * PageLoader shows an animated icon in the middle of the page while a background task runs.
 * When `loading` turns `false`, the icon comes to rest, the title slides out to its right
 * pushing the icon to the left until the full logo is centred, and then `onComplete` fires.
 *
 * @example
 * ```tsx
 * const [loading, setLoading] = useState(true);
 *
 * useEffect(() => {
 *   bootstrap().finally(() => setLoading(false));
 * }, []);
 *
 * <PageLoader loading={loading} onComplete={() => track('app-ready')}>
 *   <App />
 * </PageLoader>
 * ```
 */
const PageLoader = React.forwardRef<HTMLDivElement, PageLoaderProps>(
  (
    {
      loading,
      title,
      icon,
      size = 48,
      onComplete,
      onPhaseChange,
      revealDuration = 700,
      holdDuration = 600,
      exitDuration = 400,
      fullScreen = true,
      loadingLabel = 'Loading',
      children,
      sx,
      ...rest
    },
    ref,
  ) => {
    const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
    const [phase, setPhase] = React.useState<PageLoaderPhase>(loading ? 'loading' : 'settling');
    const iconRef = React.useRef<SVGSVGElement>(null);

    const onCompleteRef = React.useRef(onComplete);
    const onPhaseChangeRef = React.useRef(onPhaseChange);
    onCompleteRef.current = onComplete;
    onPhaseChangeRef.current = onPhaseChange;

    const reveal = reducedMotion ? 0 : revealDuration;
    const exit = reducedMotion ? 0 : exitDuration;

    React.useEffect(() => {
      onPhaseChangeRef.current?.(phase);
    }, [phase]);

    // Turning `loading` back on before the reveal starts goes back to the loading state.
    React.useEffect(() => {
      if (loading && phase === 'settling') setPhase('loading');
      else if (!loading && phase === 'loading') setPhase('settling');
    }, [loading, phase]);

    // A still mark is easier on people who ask for less motion.
    React.useEffect(() => {
      if (reducedMotion) iconRef.current?.pauseAnimations?.();
      else if (phase === 'loading') iconRef.current?.unpauseAnimations?.();
    }, [reducedMotion, phase]);

    React.useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      const after = (ms: number, next: () => void) => {
        timer = setTimeout(next, ms);
      };

      switch (phase) {
        case 'settling': {
          // Every step of the mark ends in a hold where it is at rest in the same shape.
          // Wait for the current move to finish, then freeze it there.
          const svg = iconRef.current;
          let wait = 0;

          if (!icon && typeof svg?.getCurrentTime === 'function' && !svg.animationsPaused()) {
            const intoStep = svg.getCurrentTime() % PAGE_LOADER_ICON_STEP;
            if (intoStep < PAGE_LOADER_ICON_MOVE) {
              wait = (PAGE_LOADER_ICON_MOVE - intoStep) * 1000 + 20;
            }
          }

          after(wait, () => {
            iconRef.current?.pauseAnimations?.();
            setPhase('revealing');
          });
          break;
        }
        case 'revealing':
          after(reveal, () => setPhase('revealed'));
          break;
        case 'revealed':
          after(holdDuration, () => {
            onCompleteRef.current?.();
            setPhase('exiting');
          });
          break;
        case 'exiting':
          after(exit, () => setPhase('done'));
          break;
        default:
          break;
      }

      return () => clearTimeout(timer);
      // `icon` only matters at the moment settling starts.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, reveal, holdDuration, exit]);

    const isLoading = phase === 'loading' || phase === 'settling';
    const titleShown = phase === 'revealing' || phase === 'revealed' || phase === 'exiting';
    const showChildren = phase === 'exiting' || phase === 'done';

    return (
      <>
        {showChildren && children}
        {phase !== 'done' && (
          <Box
            ref={ref}
            role="status"
            aria-live="polite"
            aria-busy={isLoading}
            data-phase={phase}
            {...rest}
            sx={[
              theme => ({
                position: fullScreen ? 'fixed' : 'absolute',
                inset: 0,
                zIndex: fullScreen ? theme.zIndex.modal + 1 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                opacity: phase === 'exiting' ? 0 : 1,
                transition: `opacity ${exit}ms ease`,
                pointerEvents: phase === 'exiting' ? 'none' : undefined,
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            <Box
              component="span"
              sx={{
                position: 'absolute',
                width: 1,
                height: 1,
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                whiteSpace: 'nowrap',
              }}
            >
              {isLoading ? loadingLabel : null}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexShrink: 0, lineHeight: 0 }}>
                {icon ?? <PageLoaderIcon ref={iconRef} size={size} />}
              </Box>
              {/* Animating the column from 0fr to 1fr grows it to the title's own width, and the
                  centred row pushes the icon left by the same amount. */}
              <Box
                aria-hidden={!titleShown}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: titleShown ? '1fr' : '0fr',
                  transition: `grid-template-columns ${reveal}ms ${EASING}`,
                }}
              >
                <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      pl: `${size * PAGE_LOADER_WORDMARK_GAP}px`,
                      lineHeight: 0,
                      opacity: titleShown ? 1 : 0,
                      transform: titleShown ? 'none' : `translateX(-${size * 0.25}px)`,
                      transition: `opacity ${reveal}ms ease ${reveal * 0.15}ms, transform ${reveal}ms ${EASING}`,
                    }}
                  >
                    {title === undefined && <PageLoaderWordmark size={size} />}
                    {typeof title === 'string' || typeof title === 'number' ? (
                      // Sized and tracked like the wordmark in the Oxygen UI logo.
                      <Typography
                        component="span"
                        sx={{
                          fontSize: size * 0.79,
                          fontWeight: 500,
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {title}
                      </Typography>
                    ) : (
                      title
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
  },
);

PageLoader.displayName = 'PageLoader';

export default PageLoader;
