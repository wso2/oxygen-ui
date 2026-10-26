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

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import type { DialogProps } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { FullScreenWizardContext, resolveLabel } from './context';
import { FullScreenWizardProgress } from './FullScreenWizardProgress';
import { FullScreenWizardHeader } from './FullScreenWizardHeader';
import { FullScreenWizardContent } from './FullScreenWizardContent';
import { FullScreenWizardFooter } from './FullScreenWizardFooter';
import { FullScreenWizardPreview } from './FullScreenWizardPreview';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - Wizard surface in modal mode. In page mode the root is
 *   transparent, so the theme's page background shows through
 * - `text.primary` - Default text color
 *
 * Layout:
 * - Page mode fills the dynamic viewport height (`100dvh`), so mobile browser
 *   toolbars do not push the footer off screen
 * - Modal mode fills MUI's full-screen `Dialog`
 */

/**
 * Display names for slot detection.
 */
const SLOT_DISPLAY_NAMES = {
  Progress: 'FullScreenWizard.Progress',
  Content: 'FullScreenWizard.Content',
  Footer: 'FullScreenWizard.Footer',
  Preview: 'FullScreenWizard.Preview',
} as const;

const displayNameOf = (child: React.ReactNode): string | undefined =>
  React.isValidElement(child) ? (child.type as React.FC)?.displayName : undefined;

/**
 * Flattens fragments, so parts grouped in `<>...</>` are still found.
 */
const flattenChildren = (children: React.ReactNode): React.ReactNode[] =>
  React.Children.toArray(children).reduce<React.ReactNode[]>(
    (flat, child) =>
      React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === React.Fragment
        ? flat.concat(flattenChildren(child.props.children))
        : flat.concat([child]),
    []
  );

/**
 * Styled root of the wizard: the progress bar across the full width, then the
 * columns.
 */
const FullScreenWizardRoot = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'Root',
})<{ ownerState: { modal: boolean } }>(({ theme, ownerState }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: ownerState.modal ? '100%' : '100dvh',
  overflow: 'hidden',
  // Page mode stays transparent so the theme's page background shows through,
  // as it does around AppShell. The dialog supplies the surface in modal mode.
  backgroundColor: ownerState.modal ? (theme.vars || theme).palette.background.paper : 'transparent',
  color: (theme.vars || theme).palette.text.primary,
}));

/**
 * Styled row holding the form column and, when present, the preview.
 */
const FullScreenWizardColumns = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'Columns',
})({
  flex: 1,
  minHeight: 0,
  display: 'flex',
});

/**
 * Styled form column holding the header, content and footer.
 */
const FullScreenWizardBody = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'Body',
})({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
});

/**
 * Props for the FullScreenWizard component.
 */
export interface FullScreenWizardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'aria-label' | 'aria-labelledby'> {
  /**
   * Wizard parts: Progress, Header, Content, Footer and an optional Preview.
   * Parts are found by their `displayName`, so a product component that wraps
   * a part must set the same `displayName` (e.g. `'FullScreenWizard.Footer'`)
   * and pass its props (such as `variant` or `position`) through.
   */
  children: React.ReactNode;
  /**
   * Called by the built-in close button and, in modal mode, by Escape. Ask
   * for confirmation here when there are unsaved changes.
   */
  onClose?: () => void;
  /**
   * Accessible name of the built-in close button.
   * @default 'Close'
   */
  closeLabel?: string;
  /**
   * Renders the wizard in MUI's full-screen `Dialog`, which traps focus,
   * locks page scroll and closes on Escape.
   * @default false
   */
  modal?: boolean;
  /**
   * Whether the dialog is open. Modal mode only.
   * @default false
   */
  open?: boolean;
  /** Extra props for the `Dialog`. Modal mode only. */
  DialogProps?: Partial<Omit<DialogProps, 'open' | 'onClose' | 'fullScreen' | 'children'>>;
  /** Accessible name of the wizard: names the dialog in modal mode, the `main` region in page mode */
  'aria-label'?: string;
  /** Id of the element naming the wizard; takes precedence over `aria-label` */
  'aria-labelledby'?: string;
  /** Additional sx props applied to the root */
  sx?: SxProps<Theme>;
}

type FullScreenWizardComponent = React.ForwardRefExoticComponent<
  FullScreenWizardProps & React.RefAttributes<HTMLDivElement>
> & {
  Progress: typeof FullScreenWizardProgress;
  Header: typeof FullScreenWizardHeader;
  Content: typeof FullScreenWizardContent;
  Footer: typeof FullScreenWizardFooter;
  Preview: typeof FullScreenWizardPreview;
};

/**
 * FullScreenWizard - Full-screen layout for create and onboarding flows.
 *
 * A compound component that frames a flow in a progress bar, a header with a
 * close button, a scrolling content column with an actions footer, and an
 * optional live preview beside the form. It is a page layout by default; set
 * `modal` to render it in a full-screen dialog instead.
 *
 * Features:
 * - Compound component pattern, matching `AppShell`, `Header` and `PageTitle`
 * - Stateless: the consumer owns the steps (or uses `useWizardSteps`)
 * - Landmarks: `header`, `main` (page mode) and `aside` for the preview
 * - Focus moves to the new step when `Content`'s `focusKey` changes
 * - Split layout with a live preview (or a step rail) that hides on small screens
 * - Bar or segmented progress; inline, sticky or full-width bar footer
 *
 * The wizard has no routing and no product logic. Confirming a close and
 * warning about unsaved changes are up to the consumer, in `onClose`.
 *
 * @example
 * ```tsx
 * const wizard = useWizardSteps(['details', 'access', 'review']);
 *
 * <FullScreenWizard onClose={handleClose} aria-label="Create project">
 *   <FullScreenWizard.Progress
 *     value={wizard.progress}
 *     valueText={`Step ${wizard.activeIndex + 1} of ${wizard.count}`}
 *   />
 *   <FullScreenWizard.Header>
 *     <AppBreadcrumbs items={breadcrumbs} />
 *   </FullScreenWizard.Header>
 *   <FullScreenWizard.Content focusKey={wizard.activeStep}>
 *     {stepContent[wizard.activeStep]}
 *   </FullScreenWizard.Content>
 *   <FullScreenWizard.Footer>
 *     {!wizard.isFirst && (
 *       <Button variant="outlined" onClick={wizard.back} sx={{ mr: 'auto' }}>Back</Button>
 *     )}
 *     <Button variant="contained" onClick={wizard.isLast ? handleCreate : wizard.next}>
 *       {wizard.isLast ? 'Create' : 'Continue'}
 *     </Button>
 *   </FullScreenWizard.Footer>
 * </FullScreenWizard>
 * ```
 *
 * @example
 * ```tsx
 * <FullScreenWizard modal open={open} onClose={() => setOpen(false)} aria-label="Invite member">
 *   <FullScreenWizard.Header>
 *     <Typography variant="h5" component="h1">Invite member</Typography>
 *   </FullScreenWizard.Header>
 *   <FullScreenWizard.Content maxWidth="sm">...</FullScreenWizard.Content>
 *   <FullScreenWizard.Footer>
 *     <Button variant="contained" onClick={handleInvite}>Invite</Button>
 *   </FullScreenWizard.Footer>
 * </FullScreenWizard>
 * ```
 */
const FullScreenWizardBase = React.forwardRef<HTMLDivElement, FullScreenWizardProps>(
  function FullScreenWizard(
    {
      children,
      onClose,
      closeLabel,
      modal = false,
      open = false,
      DialogProps: dialogProps,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      sx,
      ...rootProps
    },
    ref
  ) {
    const childrenArray = flattenChildren(children);
    // The progress bar spans both columns, so it sits above them whatever the child order.
    const progress = childrenArray.filter(
      (child) => displayNameOf(child) === SLOT_DISPLAY_NAMES.Progress
    );
    const preview = childrenArray.filter(
      (child) => displayNameOf(child) === SLOT_DISPLAY_NAMES.Preview
    );
    const footer = childrenArray.find(
      (child) => displayNameOf(child) === SLOT_DISPLAY_NAMES.Footer
    );
    const hasContent = childrenArray.some(
      (child) => displayNameOf(child) === SLOT_DISPLAY_NAMES.Content
    );
    const isBarFooter =
      React.isValidElement<{ variant?: string }>(footer) && footer.props.variant === 'bar';
    // An inline footer moves into the content's scroll column when there is
    // one, so it flows (or sticks) with the step whatever the child order. A
    // bar footer goes to the bottom of the form column instead.
    const liftFooter = hasContent && !isBarFooter;
    const body = childrenArray.filter(
      (child) =>
        !progress.includes(child) &&
        !preview.includes(child) &&
        (child !== footer || (!liftFooter && !isBarFooter))
    );
    const previewAtStart = preview.some(
      (child) =>
        React.isValidElement<{ position?: string }>(child) && child.props.position === 'start'
    );

    const resolvedCloseLabel = resolveLabel(closeLabel, 'Close');
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const contextValue = React.useMemo(
      () => ({
        onClose,
        closeLabel: resolvedCloseLabel,
        modal,
        ariaLabel,
        ariaLabelledby,
        footer: liftFooter ? footer : null,
        headerHeight,
        setHeaderHeight,
      }),
      [onClose, resolvedCloseLabel, modal, ariaLabel, ariaLabelledby, liftFooter, footer, headerHeight]
    );

    const layout = (
      <FullScreenWizardContext.Provider value={contextValue}>
        <FullScreenWizardRoot ref={ref} ownerState={{ modal }} sx={sx} {...rootProps}>
          {progress}
          <FullScreenWizardColumns>
            {previewAtStart && preview}
            <FullScreenWizardBody>
              {body}
              {isBarFooter && footer}
            </FullScreenWizardBody>
            {!previewAtStart && preview}
          </FullScreenWizardColumns>
        </FullScreenWizardRoot>
      </FullScreenWizardContext.Provider>
    );

    if (!modal) {
      return layout;
    }

    const { slotProps, ...restDialogProps } = dialogProps ?? {};
    const paperSlot = slotProps?.paper;

    return (
      <Dialog
        {...restDialogProps}
        fullScreen
        open={open}
        onClose={onClose ? () => onClose() : undefined}
        aria-labelledby={ariaLabelledby}
        slotProps={{
          ...slotProps,
          // Keep a consumer's paper props, given as an object or a function of the owner state.
          paper: (ownerState) => ({
            ...(typeof paperSlot === 'function' ? paperSlot(ownerState) : paperSlot),
            'aria-label': ariaLabelledby ? undefined : ariaLabel,
            // Dialog generates an `aria-labelledby` id for a DialogTitle. With
            // no title it points at nothing, so drop it when `aria-label` names
            // the dialog instead.
            ...(!ariaLabelledby && { 'aria-labelledby': undefined }),
          }),
        }}
      >
        {layout}
      </Dialog>
    );
  }
);

/**
 * FullScreenWizard compound component with attached sub-components.
 *
 * Sub-components:
 * - `FullScreenWizard.Progress` - Determinate progress bar
 * - `FullScreenWizard.Header` - Header with the built-in close button
 * - `FullScreenWizard.Content` - Scroll region holding the active step
 * - `FullScreenWizard.Footer` - Actions row under the step
 * - `FullScreenWizard.Preview` - Live preview beside the form
 */
export const FullScreenWizard: FullScreenWizardComponent = Object.assign(FullScreenWizardBase, {
  Progress: FullScreenWizardProgress,
  Header: FullScreenWizardHeader,
  Content: FullScreenWizardContent,
  Footer: FullScreenWizardFooter,
  Preview: FullScreenWizardPreview,
});

FullScreenWizard.displayName = 'FullScreenWizard';

export default FullScreenWizard;
