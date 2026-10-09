import React, { useState, useEffect, useRef } from 'react';
import { Box, type SxProps, type Theme } from '@wso2/oxygen-ui';
import { AnimatePresence, motion, type Transition } from 'motion/react';

export interface SmoothNavHighlightProps {
  children: React.ReactNode;
  /** CSS selector for the interactive buttons to highlight (e.g. '.MuiListItemButton-root' or '.MuiTab-root') */
  targetSelector?: string;
  /** CSS selector for the active/selected button */
  activeSelector?: string;
  /** Custom transition for the spring motion */
  transition?: Transition;
  /** Style for the floating highlight pill */
  highlightStyle?: React.CSSProperties;
  /** Whether the highlight returns to the active button when mouse leaves (default: true) */
  fallbackToActiveOnLeave?: boolean;
  /** Extra container sx props */
  sx?: SxProps<Theme>;
}

const DEFAULT_SPRING: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 30,
};

export function SmoothNavHighlight({
  children,
  targetSelector = '.MuiListItemButton-root',
  activeSelector = '.Mui-selected',
  transition = DEFAULT_SPRING,
  highlightStyle,
  fallbackToActiveOnLeave = true,
  sx,
}: SmoothNavHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Helper to compute bounds relative to the container
  const computeRelativeBounds = (element: HTMLElement, container: HTMLElement) => {
    const containerRect = container.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();
    return {
      top: elRect.top - containerRect.top,
      left: elRect.left - containerRect.left,
      width: elRect.width,
      height: elRect.height,
    };
  };

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const target = (e.target as HTMLElement).closest(targetSelector) as HTMLElement | null;

    if (target && containerRef.current.contains(target)) {
      if (hoveredEl !== target) {
        setIsHovering(true);
        setHoveredEl(target);
        setBounds(computeRelativeBounds(target, containerRef.current));
      }
    }
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredEl(null);

    if (fallbackToActiveOnLeave && containerRef.current) {
      const activeEl = containerRef.current.querySelector(
        `${targetSelector}${activeSelector}`
      ) as HTMLElement | null;

      if (activeEl) {
        setBounds(computeRelativeBounds(activeEl, containerRef.current));
        return;
      }
    }

    setBounds(null);
  };

  // Sync with active element when not hovering
  useEffect(() => {
    if (!containerRef.current || isHovering) return;

    // Small delay to let DOM render updated active classes
    const timer = setTimeout(() => {
      if (!containerRef.current || isHovering) return;
      const activeEl = containerRef.current.querySelector(
        `${targetSelector}${activeSelector}`
      ) as HTMLElement | null;

      if (activeEl) {
        setBounds(computeRelativeBounds(activeEl, containerRef.current));
      } else if (!fallbackToActiveOnLeave) {
        setBounds(null);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [children, targetSelector, activeSelector, isHovering, fallbackToActiveOnLeave]);

  // Handle resizing / DOM mutations (accordion open/close, collapses)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateCurrentBounds = () => {
      if (!container) return;
      if (isHovering && hoveredEl && container.contains(hoveredEl)) {
        setBounds(computeRelativeBounds(hoveredEl, container));
      } else if (fallbackToActiveOnLeave) {
        const activeEl = container.querySelector(
          `${targetSelector}${activeSelector}`
        ) as HTMLElement | null;
        if (activeEl) {
          setBounds(computeRelativeBounds(activeEl, container));
        }
      }
    };

    const resizeObserver = new ResizeObserver(updateCurrentBounds);
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(updateCurrentBounds);
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    window.addEventListener('resize', updateCurrentBounds);
    container.addEventListener('scroll', updateCurrentBounds, { capture: true, passive: true });
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', updateCurrentBounds);
      container.removeEventListener('scroll', updateCurrentBounds, { capture: true });
    };
  }, [hoveredEl, isHovering, targetSelector, activeSelector, fallbackToActiveOnLeave]);

  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const detectMode = () => {
      const html = document.documentElement;
      const muiScheme = html.getAttribute('data-mui-color-scheme');
      const oxyScheme = html.getAttribute('data-oxygen-color-scheme');
      const isLight = muiScheme === 'light' || oxyScheme === 'light' || html.classList.contains('light');
      setColorMode(isLight ? 'light' : 'dark');
    };

    detectMode();
    const observer = new MutationObserver(detectMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mui-color-scheme', 'data-oxygen-color-scheme', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  const highlightBg = colorMode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.09)';

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        width: '100%',
        ...sx,
        '& [data-slot="motion-highlight"]': {
          backgroundColor: highlightBg,
        },
        ':root[data-mui-color-scheme="light"] & [data-slot="motion-highlight"], [data-mui-color-scheme="light"] & [data-slot="motion-highlight"], [data-oxygen-color-scheme="light"] & [data-slot="motion-highlight"]': {
          backgroundColor: 'rgba(0, 0, 0, 0.08) !important',
        },
        ':root[data-mui-color-scheme="dark"] & [data-slot="motion-highlight"], [data-mui-color-scheme="dark"] & [data-slot="motion-highlight"], [data-oxygen-color-scheme="dark"] & [data-slot="motion-highlight"]': {
          backgroundColor: 'rgba(255, 255, 255, 0.09) !important',
        },
        [`& ${targetSelector}`]: {
          position: 'relative',
          zIndex: 1,
          transition: 'background-color 0.15s ease, color 0.15s ease',
          '&:hover': {
            backgroundColor: 'transparent !important',
          },
          '&.Mui-selected': {
            backgroundColor: 'transparent !important',
          },
        },
        '& .MuiListItemIcon-root, & .MuiListItemText-root, & .MuiChip-root, & .MuiBadge-root, & .MuiTypography-root, & .MuiSvgIcon-root': {
          position: 'relative',
          zIndex: 2,
        },
      }}
    >
      <AnimatePresence initial={false}>
        {bounds && (
          <motion.div
            data-slot="motion-highlight"
            animate={{
              top: bounds.top,
              left: bounds.left,
              width: bounds.width,
              height: bounds.height,
              opacity: 1,
            }}
            initial={{
              top: bounds.top,
              left: bounds.left,
              width: bounds.width,
              height: bounds.height,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
              transition: {
                ...transition,
                duration: 0.15,
              },
            }}
            transition={transition}
            style={{
              position: 'absolute',
              zIndex: 0,
              pointerEvents: 'none',
              borderRadius: 8,
              backgroundColor: highlightBg,
              ...highlightStyle,
            }}
          />
        )}
      </AnimatePresence>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default SmoothNavHighlight;
