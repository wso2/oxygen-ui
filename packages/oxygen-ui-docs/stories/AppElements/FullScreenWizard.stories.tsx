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
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  Alert,
  AppBreadcrumbs,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Form,
  FullScreenWizard,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useWizardSteps,
} from '@wso2/oxygen-ui';
import type { BreadcrumbItem } from '@wso2/oxygen-ui';
import { Building2, FolderPlus, Lock, Sparkles, UserPlus } from '@wso2/oxygen-ui-icons-react';

/**
 * FullScreenWizard frames create and onboarding flows that take over the
 * screen: a progress bar, a header with a close button, the active step, an
 * actions footer and an optional live preview.
 */
const meta: Meta<typeof FullScreenWizard> = {
  title: 'App Elements/Full Screen Wizard',
  component: FullScreenWizard,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      // Known WCAG AA exception: the brand primary color (#FF7300) does not
      // meet the 4.5:1 text-contrast requirement in the default themes.
      // Tracked in https://github.com/wso2/oxygen-ui/issues/558 — remove
      // this override once the palette decision lands.
      options: {
        rules: { 'color-contrast': { enabled: false } },
      },
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The FullScreenWizard is the shared layout for create and onboarding flows. It frames the flow in a
progress bar, a header with a close button, a scrolling content column with an actions footer, and an
optional live preview beside the form. It is a page layout by default; set \`modal\` to render it in a
full-screen dialog instead.

### Compound component
The wizard is composed from sub-components, matching \`AppShell\`, \`Header\` and \`PageTitle\`:

- \`FullScreenWizard.Progress\` – a determinate progress bar; leave it out for a single-step form
- \`FullScreenWizard.Header\` – a \`<header>\` with the built-in close button, then breadcrumbs or a title
- \`FullScreenWizard.Content\` – the scroll region holding the active step
- \`FullScreenWizard.Footer\` – the actions row, rendered under the step in the same column
- \`FullScreenWizard.Preview\` – a live preview; adding it switches to a split layout

The layout is stateless. The consumer owns the steps, or uses the \`useWizardSteps\` hook for the common
case of a linear flow. The wizard has no routing and no product logic: confirming a close and warning
about unsaved changes are the consumer's job, in \`onClose\`.

### When to use
- **FullScreenWizard** – a create or onboarding flow that deserves the whole screen: several steps, a
  long form, or a live preview of what is being created.
- **Form.Wizard** – a short stepper inside a page, where the app shell and navigation stay in view.
- **Dialog** – a short task, such as a confirmation or a few fields, that keeps the page in view.

### Usage
\`\`\`tsx
import { AppBreadcrumbs, Button, FullScreenWizard, useWizardSteps } from '@wso2/oxygen-ui';

const wizard = useWizardSteps(['details', 'access', 'review']);

<FullScreenWizard onClose={handleClose} aria-label="Create project">
  <FullScreenWizard.Progress
    value={wizard.progress}
    valueText={\`Step \${wizard.activeIndex + 1} of \${wizard.count}\`}
  />
  <FullScreenWizard.Header>
    <AppBreadcrumbs items={breadcrumbs} />
  </FullScreenWizard.Header>
  <FullScreenWizard.Content focusKey={wizard.activeStep}>
    {wizard.activeStep && stepContent[wizard.activeStep]}
  </FullScreenWizard.Content>
  <FullScreenWizard.Footer>
    {!wizard.isFirst && (
      <Button variant="outlined" onClick={wizard.back} sx={{ mr: 'auto' }}>Back</Button>
    )}
    <Button variant="contained" onClick={wizard.isLast ? handleCreate : wizard.next}>
      {wizard.isLast ? 'Create' : 'Continue'}
    </Button>
  </FullScreenWizard.Footer>
</FullScreenWizard>
\`\`\`

\`useWizardSteps\` takes step ids, or \`{ id, skip }\` objects to leave a step out of the flow. It returns
\`activeStep\`, \`activeIndex\`, \`steps\`, \`count\`, \`isFirst\`, \`isLast\`, \`next\`, \`back\`, \`goTo\` and
\`progress\`. Navigation clamps at both ends, and \`goTo\` ignores unknown and skipped steps.

### Variants
- **Stepped wizard** – progress bar, breadcrumbs that follow the steps, and Back, Continue and Create.
- **Wizard with live preview** – add \`FullScreenWizard.Preview\`. The preview takes the right half and
  hides below \`md\` (\`hideBelow\`), since it is supplementary.
- **Single-step form** – leave out \`FullScreenWizard.Progress\`.
- **Centred landing** – \`<FullScreenWizard.Content align="center">\` with no progress bar or footer, for a
  welcome or get-started screen. The column centres in both directions and still scrolls when it is taller
  than the screen. For a picker that goes back instead of closing, leave out \`onClose\` and start the content
  with a \`PageTitle\` and its \`PageTitle.BackButton\`.
- **Modal** – \`modal\` and \`open\` render the wizard in MUI's full-screen \`Dialog\`.
- **Sticky footer** – \`<FullScreenWizard.Footer sticky>\` keeps the actions in view on a long form.
- **Focused flow** – \`<FullScreenWizard.Progress variant="segmented" steps={count}>\` shows one segment per
  step, \`<FullScreenWizard.Header closePosition="end">\` moves the close button to the right, and
  \`<FullScreenWizard.Footer variant="bar">\` anchors the actions in a full-width bar along the bottom.
- **Step rail** – \`<FullScreenWizard.Preview position="start">\` puts the side panel on the left; with a
  narrower \`flexBasis\` and a vertical \`Stepper\`, it lists every step.
- **Top stepper** – a horizontal \`Stepper\` in the header and the step in a \`Paper\` card, composed
  without extra options.

### Accessibility
- Landmarks: \`header\`, \`main\` in page mode (named by the wizard's \`aria-label\`) and \`aside\` for the
  preview (named "Preview" by default, \`previewLabel\` to change it). In modal mode the content is a plain
  region, since a dialog should not hold a \`main\` landmark. Inside a page that already has a \`main\`, such
  as an \`AppShell\`, pass \`component="div"\` to \`FullScreenWizard.Content\`.
- The close button is named "Close" by default (\`closeLabel\` to change it).
- The progress bar is named "Progress" by default (\`progressLabel\`) and reads \`valueText\`, such as
  "Step 2 of 3", in place of the percentage.
- When \`focusKey\` on \`FullScreenWizard.Content\` changes, focus moves to the content and it scrolls to
  the top, so screen readers start at the new step. The focus ring shows for keyboard users only.
- Modal mode traps focus, locks page scroll and is named by \`aria-label\` or \`aria-labelledby\`.
- Give each step a heading, so the new step is announced and easy to find.

### Keyboard
| Key | Behavior |
| --- | --- |
| \`Tab\` | Moves through the close button, the breadcrumbs, the step's fields and the footer actions |
| \`Shift\` + \`Tab\` | Moves backwards |
| \`Enter\` / \`Space\` | Activates the focused button |
| \`Esc\` | Calls \`onClose\` in modal mode |

### Part props
The table below lists the props of each part. Every part also accepts \`sx\`, a \`ref\` and the
attributes of its element, and the theme can restyle each part through \`MuiFullScreenWizard\`.
Parts are found by name, also inside fragments; a product component that wraps a part must set the
same \`displayName\`, such as \`'FullScreenWizard.Footer'\`, and pass its props through.

| Part | Prop | Default | Description |
| --- | --- | --- | --- |
| \`Progress\` | \`value\` | - | Progress from 0 to 100; values outside the range are clamped |
| \`Progress\` | \`valueText\` | - | Read by screen readers in place of the percentage, such as "Step 2 of 3" |
| \`Progress\` | \`progressLabel\` | \`'Progress'\` | Accessible name of the progress bar |
| \`Progress\` | \`variant\` | \`'bar'\` | \`bar\` is a thin full-width bar; \`segmented\` shows one segment per step |
| \`Progress\` | \`steps\` | - | Number of segments in the \`segmented\` variant |
| \`Header\` | \`children\` | - | Breadcrumbs or a title, shown beside the built-in close button |
| \`Header\` | \`closePosition\` | \`'start'\` | Side of the header the close button sits on: \`start\` or \`end\` |
| \`Header\` | \`closeIcon\` | X icon | Icon of the close button |
| \`Header\` | \`CloseButtonProps\` | - | Extra props for the close button, such as \`size\`, \`color\` or \`sx\` |
| \`Content\` | \`component\` | \`'main'\` (page), \`'div'\` (modal) | Element the region renders as; \`'div'\` when the page already has a \`main\` |
| \`Content\` | \`maxWidth\` | \`'md'\` | Width cap of the content column: a breakpoint key (\`xs\` is at least 444px, as in \`Container\`), a number of pixels, or \`false\` |
| \`Content\` | \`align\` | \`'start'\` | \`start\` keeps the column left-aligned; \`center\` centres it, for a landing screen |
| \`Content\` | \`focusKey\` | - | When it changes, focus moves to the content and it scrolls to the top |
| \`Footer\` | \`sticky\` | \`false\` | Keeps the actions at the bottom of the scroll region on a long form |
| \`Footer\` | \`variant\` | \`'inline'\` | \`inline\` sits under the step; \`bar\` is a full-width bar along the bottom of the form column |
| \`Preview\` | \`position\` | \`'end'\` | Side of the form the panel sits on: \`end\` (right) or \`start\` (left) |
| \`Preview\` | \`hideBelow\` | \`'md'\` | Breakpoint below which the preview is hidden, or \`false\` to always show it |
| \`Preview\` | \`previewLabel\` | \`'Preview'\` | Accessible name of the preview region |
`,
      },
    },
  },
  // On the docs page the wizard fills a fixed-height frame instead of the viewport, so each story stays
  // inline (and themed) without taking over the page. The canvas view keeps the full-screen layout.
  decorators: [
    (Story, context) =>
      context.viewMode === 'docs' ? (
        <Box sx={{ height: 640, overflow: 'hidden', '&& > *': { height: '100%' } }}>
          <Story />
        </Box>
      ) : (
        <Story />
      ),
  ],
  // Storybook reads props from the built bundle, which has no types, so they are listed here.
  argTypes: {
    children: {
      control: false,
      description: 'The wizard parts: Progress, Header, Content, Footer and an optional Preview',
      table: { type: { summary: 'ReactNode' } },
    },
    onClose: {
      control: false,
      description:
        'Called by the close button and, in modal mode, by Esc. Ask for confirmation here when there are unsaved changes. Without it, no close button is shown',
      table: { type: { summary: '() => void' } },
    },
    closeLabel: {
      control: false,
      description: 'Accessible name of the close button',
      table: { type: { summary: 'string' }, defaultValue: { summary: "'Close'" } },
    },
    modal: {
      control: false,
      description: "Renders the wizard in MUI's full-screen Dialog",
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    open: {
      control: false,
      description: 'Whether the dialog is open. Modal mode only',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    DialogProps: {
      control: false,
      description: 'Extra props for the Dialog. Modal mode only',
      table: { type: { summary: 'Partial<DialogProps>' } },
    },
    'aria-label': {
      control: false,
      description: 'Accessible name of the wizard: names the dialog in modal mode and the main region in page mode',
      table: { type: { summary: 'string' } },
    },
    'aria-labelledby': {
      control: false,
      description: 'Id of the element that names the wizard. Takes precedence over aria-label',
      table: { type: { summary: 'string' } },
    },
    sx: { control: false, description: 'Styles applied to the root', table: { type: { summary: 'SxProps<Theme>' } } },
  },
};

export default meta;
type Story = StoryObj<typeof FullScreenWizard>;

const STEP_LABELS = {
  details: 'Details',
  access: 'Access',
  review: 'Review',
} as const;

type ProjectStep = keyof typeof STEP_LABELS;

interface ProjectDraft {
  name: string;
  description: string;
  access: 'private' | 'organization';
}

const EMPTY_DRAFT: ProjectDraft = { name: '', description: '', access: 'private' };

const StepHeading = ({ title, description, step }: { title: string; description: string; step?: string }) => (
  <Box sx={{ mb: 4 }}>
    {step && (
      <Typography variant="overline" color="primary" component="p">
        {step}
      </Typography>
    )}
    <Form.Header component="h1" gutterBottom>
      {title}
    </Form.Header>
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

/**
 * A selectable option card, built on Oxygen's `Form.CardButton`.
 */
const OptionCard = ({
  icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}) => (
  <Form.CardButton variant="outlined" selected={selected} onClick={onClick} aria-pressed={selected} sx={{ height: '100%' }}>
    <Form.CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ color: 'primary.main', display: 'flex' }} aria-hidden="true">
        {icon}
      </Box>
      <Typography variant="h6" component="span">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Form.CardContent>
  </Form.CardButton>
);

const ProjectStepContent = ({
  step,
  draft,
  onChange,
}: {
  step: ProjectStep;
  draft: ProjectDraft;
  onChange: (draft: ProjectDraft) => void;
}) => {
  if (step === 'details') {
    return (
      <>
        <StepHeading step="Step 1 of 3" title="Name your project" description="You can change these details later." />
        <Stack spacing={3}>
          <Form.ElementWrapper label="Project name" name="projectName">
            <TextField
              id="projectName"
              placeholder="Enter a project name"
              value={draft.name}
              onChange={(event) => onChange({ ...draft, name: event.target.value })}
              required
              fullWidth
            />
          </Form.ElementWrapper>
          <Form.ElementWrapper label="Description" name="description">
            <TextField
              id="description"
              placeholder="Enter a description"
              value={draft.description}
              onChange={(event) => onChange({ ...draft, description: event.target.value })}
              multiline
              minRows={3}
              fullWidth
            />
          </Form.ElementWrapper>
        </Stack>
      </>
    );
  }

  if (step === 'access') {
    return (
      <>
        <StepHeading
          step="Step 2 of 3"
          title="Choose who can access it"
          description="Members you add later get this access by default."
        />
        <Box
          role="group"
          aria-label="Access"
          sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}
        >
          <OptionCard
            icon={<Lock size={24} />}
            title="Only people I invite"
            description="Keep the project private until you add members."
            selected={draft.access === 'private'}
            onClick={() => onChange({ ...draft, access: 'private' })}
          />
          <OptionCard
            icon={<Building2 size={24} />}
            title="Everyone in the organization"
            description="Anyone in your organization can find and open it."
            selected={draft.access === 'organization'}
            onClick={() => onChange({ ...draft, access: 'organization' })}
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <StepHeading
        step="Step 3 of 3"
        title="Review and create"
        description="Check the details before you create the project."
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2} divider={<Divider />}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Project name
            </Typography>
            <Typography variant="body1">{draft.name || 'Untitled project'}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Access
            </Typography>
            <Typography variant="body1">
              {draft.access === 'private' ? 'Only people I invite' : 'Everyone in the organization'}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </>
  );
};

/**
 * The create project flow shared by the stepped and modal stories.
 */
const CreateProjectWizard = ({
  modal = false,
  open,
  onClose,
}: {
  modal?: boolean;
  open?: boolean;
  onClose?: () => void;
}) => {
  const wizard = useWizardSteps<ProjectStep>(['details', 'access', 'review']);
  // `activeStep` is only undefined when every step is skipped, which this flow never does.
  const activeStep = wizard.activeStep ?? 'details';
  const [draft, setDraft] = React.useState<ProjectDraft>(EMPTY_DRAFT);
  const [created, setCreated] = React.useState(false);

  const reset = () => {
    wizard.goTo('details');
    setDraft(EMPTY_DRAFT);
    setCreated(false);
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { key: 'projects', label: 'Projects', onClick: handleClose },
    { key: 'create', label: 'Create project', onClick: () => wizard.goTo('details') },
    { key: activeStep, label: STEP_LABELS[activeStep] },
  ];

  return (
    <FullScreenWizard modal={modal} open={open} onClose={handleClose} aria-label="Create project">
      <FullScreenWizard.Progress
        value={created ? 100 : wizard.progress}
        valueText={`Step ${wizard.activeIndex + 1} of ${wizard.count}`}
      />
      <FullScreenWizard.Header>
        <AppBreadcrumbs items={breadcrumbs} />
      </FullScreenWizard.Header>
      <FullScreenWizard.Content focusKey={created ? 'created' : activeStep}>
        {created ? (
          <Alert severity="success">Project created.</Alert>
        ) : (
          <ProjectStepContent step={activeStep} draft={draft} onChange={setDraft} />
        )}
      </FullScreenWizard.Content>
      <FullScreenWizard.Footer>
        {created ? (
          <Button variant="contained" onClick={reset}>
            Create another project
          </Button>
        ) : (
          <>
            {!wizard.isFirst && (
              <Button variant="outlined" onClick={wizard.back} sx={{ mr: 'auto' }}>
                Back
              </Button>
            )}
            <Button variant="contained" onClick={wizard.isLast ? () => setCreated(true) : wizard.next}>
              {wizard.isLast ? 'Create' : 'Continue'}
            </Button>
          </>
        )}
      </FullScreenWizard.Footer>
    </FullScreenWizard>
  );
};

/**
 * A three-step flow driven by `useWizardSteps`. The breadcrumbs follow the
 * active step, and focus moves to each new step on Continue and Back.
 */
export const SteppedWizard: Story = {
  render: () => <CreateProjectWizard />,
};

type CornerStyle = 'rounded' | 'square';

/**
 * A split layout with a live preview of the sign-in page being branded. The
 * preview updates as the user types, can switch between desktop and mobile
 * sizes, and hides below the `md` breakpoint.
 */
export const WithLivePreview: Story = {
  render: function WithLivePreviewStory() {
    const wizard = useWizardSteps(['name', 'style']);
    const [appName, setAppName] = React.useState('Acme');
    const [welcome, setWelcome] = React.useState('Welcome back');
    const [corners, setCorners] = React.useState<CornerStyle>('rounded');
    const [device, setDevice] = React.useState<'desktop' | 'mobile'>('desktop');
    const radius = corners === 'rounded' ? 2 : 0;

    return (
      <FullScreenWizard onClose={() => wizard.goTo('name')} aria-label="Brand sign-in page">
        <FullScreenWizard.Progress
          value={wizard.progress}
          valueText={`Step ${wizard.activeIndex + 1} of ${wizard.count}`}
        />
        <FullScreenWizard.Header>
          <AppBreadcrumbs
            items={[
              { key: 'branding', label: 'Branding', onClick: () => wizard.goTo('name') },
              { key: 'sign-in', label: 'Brand sign-in page' },
            ]}
          />
        </FullScreenWizard.Header>
        <FullScreenWizard.Content focusKey={wizard.activeStep}>
          {wizard.activeStep === 'name' ? (
            <>
              <StepHeading title="Name the sign-in page" description="Users see this text when they sign in." />
              <Stack spacing={3}>
                <Form.ElementWrapper label="App name" name="appName">
                  <TextField id="appName" placeholder="Enter the app name" value={appName} onChange={(event) => setAppName(event.target.value)} fullWidth />
                </Form.ElementWrapper>
                <Form.ElementWrapper label="Welcome message" name="welcomeMessage">
                  <TextField id="welcomeMessage" placeholder="Enter a welcome message" value={welcome} onChange={(event) => setWelcome(event.target.value)} fullWidth />
                </Form.ElementWrapper>
              </Stack>
            </>
          ) : (
            <>
              <StepHeading title="Choose a style" description="The style applies to cards and buttons." />
              <FormControl>
                <FormLabel id="corner-style-label">Corners</FormLabel>
                <RadioGroup
                  aria-labelledby="corner-style-label"
                  value={corners}
                  onChange={(event) => setCorners(event.target.value as CornerStyle)}
                >
                  <FormControlLabel value="rounded" control={<Radio />} label="Rounded" />
                  <FormControlLabel value="square" control={<Radio />} label="Square" />
                </RadioGroup>
              </FormControl>
            </>
          )}
        </FullScreenWizard.Content>
        <FullScreenWizard.Footer>
          {!wizard.isFirst && (
            <Button variant="outlined" onClick={wizard.back} sx={{ mr: 'auto' }}>
              Back
            </Button>
          )}
          <Button variant="contained" onClick={wizard.isLast ? () => wizard.goTo('name') : wizard.next}>
            {wizard.isLast ? 'Save' : 'Continue'}
          </Button>
        </FullScreenWizard.Footer>
        <FullScreenWizard.Preview>
          {/* The frame is the consumer's content: a device toggle and a browser window around the live sign-in page. */}
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="overline" color="text.secondary" component="p">
              Preview
            </Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={device}
              onChange={(_event, value: 'desktop' | 'mobile' | null) => value && setDevice(value)}
              aria-label="Preview size"
            >
              <ToggleButton value="desktop">Desktop</ToggleButton>
              <ToggleButton value="mobile">Mobile</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              width: '100%',
              maxWidth: (theme) => (device === 'mobile' ? theme.spacing(50) : 'none'),
              mx: 'auto',
              transition: (theme) => theme.transitions.create('max-width'),
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Stack direction="row" spacing={0.75} aria-hidden="true">
                {(['error.main', 'warning.main', 'success.main'] as const).map((color) => (
                  <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
                ))}
              </Stack>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ flex: 1, py: 0.5, textAlign: 'center', borderRadius: 1, bgcolor: 'action.hover' }}
              >
                {appName || 'Your app'} preview
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, bgcolor: 'background.default' }}>
            <Paper variant="outlined" sx={{ width: '100%', maxWidth: (theme) => theme.spacing(48), p: 4, borderRadius: radius }}>
              <Typography variant="h5" component="p" gutterBottom>
                {appName || 'Your app'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {welcome}
              </Typography>
              <Box
                sx={{
                  py: 1,
                  textAlign: 'center',
                  borderRadius: radius,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              >
                <Typography variant="body2" component="span" sx={{ fontWeight: 'fontWeightMedium' }}>
                  Sign in
                </Typography>
              </Box>
            </Paper>
            </Box>
          </Paper>
        </FullScreenWizard.Preview>
      </FullScreenWizard>
    );
  },
};

/**
 * A single-step form: no progress bar, a narrower `sm` column, and Cancel
 * and Create actions.
 */
export const SingleStepForm: Story = {
  render: function SingleStepFormStory() {
    const [name, setName] = React.useState('');

    return (
      <FullScreenWizard onClose={() => setName('')} aria-label="Create team">
        <FullScreenWizard.Header>
          <AppBreadcrumbs
            items={[
              { key: 'teams', label: 'Teams', onClick: () => setName('') },
              { key: 'create', label: 'Create team' },
            ]}
          />
        </FullScreenWizard.Header>
        <FullScreenWizard.Content maxWidth="sm">
          <StepHeading title="Create team" description="Teams group members who work on the same projects." />
          <Stack spacing={3}>
            <Form.ElementWrapper label="Team name" name="teamName">
              <TextField id="teamName" placeholder="Enter a team name" value={name} onChange={(event) => setName(event.target.value)} required fullWidth />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Description" name="description">
              <TextField id="description" placeholder="Enter a description" multiline minRows={3} fullWidth />
            </Form.ElementWrapper>
          </Stack>
        </FullScreenWizard.Content>
        <FullScreenWizard.Footer>
          <Button variant="outlined" onClick={() => setName('')}>
            Cancel
          </Button>
          <Button variant="contained" disabled={!name.trim()}>
            Create
          </Button>
        </FullScreenWizard.Footer>
      </FullScreenWizard>
    );
  },
};

/**
 * A centred landing screen, such as a welcome page: the close button on the
 * right and centred content, with no progress bar or footer. The choices start the
 * product's own flows.
 */
export const CenteredLanding: Story = {
  render: function CenteredLandingStory() {
    const choices = [
      {
        key: 'project',
        icon: <FolderPlus size={24} />,
        title: 'Create a project',
        description: 'Group the apps and services you build together.',
      },
      {
        key: 'invite',
        icon: <UserPlus size={24} />,
        title: 'Invite your team',
        description: 'Add members and choose what they can access.',
      },
      {
        key: 'explore',
        icon: <Sparkles size={24} />,
        title: 'Explore a sample',
        description: 'Try the product with ready-made sample data.',
      },
    ];

    return (
      <FullScreenWizard onClose={() => undefined} aria-label="Welcome">
        <FullScreenWizard.Header closePosition="end" />
        <FullScreenWizard.Content align="center" maxWidth="md">
          <Stack spacing={1} sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1">
              Welcome
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose where to start. You can do the rest later.
            </Typography>
          </Stack>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
            {choices.map((choice) => (
              <OptionCard key={choice.key} icon={choice.icon} title={choice.title} description={choice.description} />
            ))}
          </Box>
        </FullScreenWizard.Content>
      </FullScreenWizard>
    );
  },
};

/**
 * The stepped flow in a full-screen dialog. The button opens it; the close
 * button or `Esc` closes it, and focus returns to the button.
 */
export const Modal: Story = {
  render: function ModalStory() {
    const [open, setOpen] = React.useState(false);

    return (
      <Box sx={{ p: 4 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create project
        </Button>
        <CreateProjectWizard modal open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Create project' }));
    const dialog = await within(canvasElement.ownerDocument.body).findByRole('dialog', {
      name: 'Create project',
    });
    // Wait for the dialog's fade-in, so the accessibility check runs on the open wizard.
    await waitFor(() => expect(dialog).toBeVisible());
    await expect(within(dialog).getByRole('button', { name: 'Close' })).toBeVisible();
  },
};

const NOTIFICATION_OPTIONS = [
  'Project created',
  'Member added',
  'Member removed',
  'Access changed',
  'Deployment finished',
  'Deployment failed',
  'Usage limit reached',
  'Weekly summary',
];

/**
 * A long single-step form with a sticky footer, so Save stays in view while
 * the user scrolls.
 */
export const StickyFooter: Story = {
  render: () => (
    <FullScreenWizard onClose={() => {}} aria-label="Set up workspace">
      <FullScreenWizard.Header>
        <AppBreadcrumbs
          items={[
            { key: 'workspaces', label: 'Workspaces', onClick: () => {} },
            { key: 'set-up', label: 'Set up workspace' },
          ]}
        />
      </FullScreenWizard.Header>
      <FullScreenWizard.Content>
        <StepHeading title="Set up workspace" description="Fill in the sections below. You can change them later." />
        <Stack spacing={5}>
          <Stack spacing={3}>
            <Typography variant="h6" component="h2">
              General
            </Typography>
            <Form.ElementWrapper label="Workspace name" name="workspaceName">
              <TextField id="workspaceName" placeholder="Enter a workspace name" fullWidth />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Description" name="description">
              <TextField id="description" placeholder="Enter a description" multiline minRows={3} fullWidth />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Contact email" name="contactEmail">
              <TextField id="contactEmail" placeholder="name@example.com" type="email" fullWidth />
            </Form.ElementWrapper>
          </Stack>
          <Stack spacing={3}>
            <Typography variant="h6" component="h2">
              Location
            </Typography>
            <Form.ElementWrapper label="Address" name="address">
              <TextField id="address" placeholder="Enter the street address" fullWidth />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="City" name="city">
              <TextField id="city" placeholder="Enter the city" fullWidth />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Postal code" name="postalCode">
              <TextField id="postalCode" placeholder="Enter the postal code" fullWidth />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Country" name="country">
              <TextField id="country" placeholder="Enter the country" fullWidth />
            </Form.ElementWrapper>
          </Stack>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography variant="h6" component="h2" color="text.primary">
                Email notifications
              </Typography>
            </FormLabel>
            <FormGroup>
              {NOTIFICATION_OPTIONS.map((option) => (
                <FormControlLabel key={option} control={<Checkbox defaultChecked />} label={option} />
              ))}
            </FormGroup>
          </FormControl>
          <Stack spacing={3}>
            <Typography variant="h6" component="h2">
              Advanced
            </Typography>
            <Form.ElementWrapper label="Custom domain" name="customDomain">
              <TextField id="customDomain" placeholder="app.example.com" fullWidth />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Data retention in days" name="dataRetention">
              <TextField id="dataRetention" placeholder="Enter the number of days" type="number" defaultValue={30} fullWidth />
            </Form.ElementWrapper>
          </Stack>
        </Stack>
      </FullScreenWizard.Content>
      <FullScreenWizard.Footer sticky>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Save</Button>
      </FullScreenWizard.Footer>
    </FullScreenWizard>
  ),
};

/**
 * The create project flow shared by the focused, step rail and top stepper stories.
 */
const useProjectFlow = () => {
  const wizard = useWizardSteps<ProjectStep>(['details', 'access', 'review']);
  const [draft, setDraft] = React.useState<ProjectDraft>(EMPTY_DRAFT);
  const reset = () => {
    wizard.goTo('details');
    setDraft(EMPTY_DRAFT);
  };
  const stepText = `Step ${wizard.activeIndex + 1} of ${wizard.count}`;
  // `activeStep` is only undefined when every step is skipped, which this flow never does.
  const content = <ProjectStepContent step={wizard.activeStep ?? 'details'} draft={draft} onChange={setDraft} />;
  const actions = (
    <>
      {!wizard.isFirst && (
        <Button variant="outlined" onClick={wizard.back} sx={{ mr: 'auto' }}>
          Back
        </Button>
      )}
      <Button variant="contained" onClick={wizard.isLast ? reset : wizard.next}>
        {wizard.isLast ? 'Create' : 'Continue'}
      </Button>
    </>
  );
  return { wizard, reset, stepText, content, actions };
};

/**
 * A focused flow: a segmented progress indicator with one segment per step,
 * the close button on the right, and the actions in a full-width bar along
 * the bottom that names the next step.
 */
export const FocusedFlow: Story = {
  render: function FocusedFlowStory() {
    const { wizard, reset, stepText, content, actions } = useProjectFlow();
    const nextStep = wizard.steps[wizard.activeIndex + 1];

    return (
      <FullScreenWizard onClose={reset} aria-label="Create project">
        <FullScreenWizard.Progress variant="segmented" steps={wizard.count} value={wizard.progress} valueText={stepText} />
        <FullScreenWizard.Header closePosition="end">
          <AppBreadcrumbs
            items={[
              { key: 'projects', label: 'Projects', onClick: reset },
              { key: 'create', label: 'Create project' },
            ]}
          />
        </FullScreenWizard.Header>
        <FullScreenWizard.Content maxWidth="sm" focusKey={wizard.activeStep}>
          {content}
        </FullScreenWizard.Content>
        <FullScreenWizard.Footer variant="bar">
          {nextStep && (
            <Typography variant="body2" color="text.secondary">
              Next: {STEP_LABELS[nextStep]}
            </Typography>
          )}
          {actions}
        </FullScreenWizard.Footer>
      </FullScreenWizard>
    );
  },
};

/**
 * A step rail on the left: `FullScreenWizard.Preview` with `position="start"`
 * and a narrower `flexBasis` holds a vertical stepper, so users see every
 * step and where they are. The rail hides below `md`, where the "Step 1 of
 * 3" label above the heading keeps the context.
 */
export const StepRail: Story = {
  render: function StepRailStory() {
    const { wizard, reset, content, actions } = useProjectFlow();

    return (
      <FullScreenWizard onClose={reset} aria-label="Create project">
        <FullScreenWizard.Preview
          position="start"
          previewLabel="Steps"
          sx={{ flexBasis: (theme) => theme.spacing(40), borderRight: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Typography variant="overline" color="text.secondary" component="p">
            Projects
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Create project
          </Typography>
          <Stepper activeStep={wizard.activeIndex} orientation="vertical">
            {wizard.steps.map((step) => (
              <Step key={step}>
                <StepLabel>{STEP_LABELS[step]}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </FullScreenWizard.Preview>
        <FullScreenWizard.Header />
        <FullScreenWizard.Content focusKey={wizard.activeStep}>{content}</FullScreenWizard.Content>
        <FullScreenWizard.Footer variant="bar">{actions}</FullScreenWizard.Footer>
      </FullScreenWizard>
    );
  },
};

/**
 * A horizontal stepper in the header, with the close button on the left and
 * the step in a card. Composed from Oxygen's `Stepper` and `Paper`; the wizard
 * needs no extra options for it.
 */
export const TopStepper: Story = {
  render: function TopStepperStory() {
    const { wizard, reset, content, actions } = useProjectFlow();

    return (
      <FullScreenWizard onClose={reset} aria-label="Create project">
        <FullScreenWizard.Header sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Typography variant="h6" component="p" sx={{ whiteSpace: 'nowrap' }}>
              Create project
            </Typography>
            <Stepper activeStep={wizard.activeIndex} sx={{ flex: 1, display: { xs: 'none', md: 'flex' } }}>
              {wizard.steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{STEP_LABELS[step]}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        </FullScreenWizard.Header>
        <FullScreenWizard.Content maxWidth="sm" align="center" focusKey={wizard.activeStep}>
          <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
            {content}
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 4 }}>
              {actions}
            </Stack>
          </Paper>
        </FullScreenWizard.Content>
      </FullScreenWizard>
    );
  },
};
