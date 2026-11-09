---
name: oxygen-form
description: Generate forms with Form.* components and validation. Use when creating input forms, multi-step wizards, or form validation. Covers field labels and required-field marking.
---

# Generate Oxygen UI Form

## Instructions

1. Read `.claude/oxygen-ui/components.md` for Form.* API
2. Use `Form.Section` for grouping fields
3. Use `Form.Stack` for field layout
4. Give every field a fixed label on top with `labelPlacement="top"` (see Field Labels)
5. Mark each required field with `required`; leave optional fields unmarked
6. Give every select a `placeholder`; ask the developer for the text (see Select and Autocomplete)
7. Add validation with `error` and `helperText` props

## Critical Rules

- Import form components from `@wso2/oxygen-ui`
- Use controlled components with state
- Show validation errors with `error` and `helperText` props
- Use theme tokens for spacing
- Use `labelPlacement="top"` on every `TextField` in a form; never use the floating label in forms
- Set `required` on every required field; never use the `optional` prop or write "(Optional)" in a label
- Write all UI text in sentence case (see below)

## UI Text

Write all titles, action text, and content in sentence case. Capitalize only the first word, proper nouns, product names, and acronyms.

```text
✓ First name    ✓ Create account    ✓ Enter your email address
✗ First Name    ✗ Create Account    ✗ ENTER YOUR EMAIL ADDRESS
```

- Applies to section headers, labels, placeholders, helper text, error messages, and buttons
- Write the text in sentence case in the source; never change case with `textTransform: 'uppercase'` or `'capitalize'`

## Field Labels

Forms use a fixed label above the input, not MUI's floating label. `labelPlacement` is an Oxygen UI prop, so import `TextField` from `@wso2/oxygen-ui`; the MUI `TextField` ignores it.

```tsx
<TextField labelPlacement="top" label="Display name" required />  // required: label shows a themed *
<TextField labelPlacement="top" label="Description" />            // optional: no marker
```

### Required fields

- The developer marks each required field with the `required` prop. Nothing is required by default
- `required` draws a `*` after the label, colored by the theme, and sets `required` on the native input, so screen readers announce it
- Do not add a `*` to the label text yourself, and do not color labels red; the theme handles it
- Keep `required` in sync with validation: every field the form rejects when empty is `required`, and no other field is

### Optional fields

- Leave optional fields unmarked. Do not pass the `optional` prop and do not write "(Optional)" in the label, placeholder, or helper text
- Do not describe a section as optional in its header or subheader; unmarked fields already read as optional

### Select and Autocomplete

The same rules apply. Use `TextField` with `select` (it supports `helperText` for validation messages), or `Select` with `labelPlacement="top"` (see the `oxygen-select` skill). Every select needs a `placeholder`; ask the developer for the text before writing the form, listing each select with a suggestion such as "Select a role", and never invent it. A select in error keeps its label colour; the error shows on the border and in `helperText`. For Autocomplete, pass `labelPlacement="top"` and `required` to the `TextField` in `renderInput`:

```tsx
<TextField select labelPlacement="top" label="Role" placeholder="Select a role" required value={role} onChange={...}>
  <MenuItem value="developer">Developer</MenuItem>
</TextField>

<Autocomplete
  options={countries}
  renderInput={(params) => <TextField {...params} labelPlacement="top" label="Country" required />}
/>
```

### Do and don't

```text
✓ <TextField labelPlacement="top" label="Email" required />
✗ <TextField label="Email" required />                       floating label in a form
✗ <TextField labelPlacement="top" label="Email *" />         hand-written asterisk
✗ <TextField labelPlacement="top" label="Phone" optional />  optional marker
✗ <TextField labelPlacement="top" label="Phone (Optional)" />
```

## Basic Form

```tsx
import { useState } from 'react';
import { Box, Form, TextField, Button } from '@wso2/oxygen-ui';

function BasicForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    // noValidate lets validate() show inline errors instead of the browser's required bubbles
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 400 }}>
      <Form.Stack spacing={2}>
        <TextField
          fullWidth
          labelPlacement="top"
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
          required
        />

        <TextField
          fullWidth
          labelPlacement="top"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
      </Form.Stack>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
}
```

## Form with Sections

```tsx
import { Form, TextField, MenuItem, Button, Box } from '@wso2/oxygen-ui';

function SectionedForm() {
  return (
    <Box sx={{ maxWidth: 600 }}>
      <Form.Section>
        <Form.Header>Personal information</Form.Header>
        <Form.Subheader>Enter your basic details</Form.Subheader>

        <Form.Stack spacing={2}>
          <TextField fullWidth labelPlacement="top" label="First name" required />
          <TextField fullWidth labelPlacement="top" label="Last name" required />
          <TextField fullWidth labelPlacement="top" label="Email" type="email" required />
        </Form.Stack>
      </Form.Section>

      <Form.Section>
        <Form.Header>Company details</Form.Header>
        <Form.Subheader>Tell us about your organization</Form.Subheader>

        <Form.Stack spacing={2}>
          {/* Optional fields: no marker */}
          <TextField fullWidth labelPlacement="top" label="Company name" />
          {/* Placeholder text comes from the developer */}
          <TextField fullWidth select labelPlacement="top" label="Role" placeholder="Select a role" defaultValue="">
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="designer">Designer</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </TextField>
        </Form.Stack>
      </Form.Section>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Save</Button>
      </Box>
    </Box>
  );
}
```

## Login Form

```tsx
import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Form,
} from '@wso2/oxygen-ui';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Login logic here
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom align="center">
          Sign in
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Form.Stack spacing={2}>
            <TextField
              fullWidth
              labelPlacement="top"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              labelPlacement="top"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Stack>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/forgot-password" variant="body2">
              Forgot password?
            </Link>
            <Link href="/register" variant="body2">
              Create account
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
```

## Multi-Step Wizard

Use a wizard only when later steps depend on earlier choices; otherwise use a page form (see Choosing a Container in the oxygen-component skill). The example below shows the stepper structure; real wizards also need:

- 3 to 7 named steps; order by dependency, optional steps last or skippable
- Validate each step before Next; Back never loses data
- A review step before submit, with an edit link per step
- Cancel always available, confirming if progress will be lost; save drafts for long flows
- A success state with clear next actions

```tsx
import { useState } from 'react';
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Form,
} from '@wso2/oxygen-ui';

const steps = ['Account', 'Profile', 'Review'];

function RegistrationWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Form.Stack spacing={2}>
            <TextField
              fullWidth
              labelPlacement="top"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <TextField
              fullWidth
              labelPlacement="top"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </Form.Stack>
        );
      case 1:
        return (
          <Form.Stack spacing={2}>
            <TextField
              fullWidth
              labelPlacement="top"
              label="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              labelPlacement="top"
              label="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </Form.Stack>
        );
      case 2:
        return (
          <Box>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {formData.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Company:</strong> {formData.company}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: 200 }}>{renderStepContent(activeStep)}</Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Paper>
  );
}
```

## Form with Select and Autocomplete

```tsx
import { useState } from 'react';
import { Box, Form, TextField, Button, Autocomplete } from '@wso2/oxygen-ui';

const countries = [
  { label: 'United States', code: 'US' },
  { label: 'United Kingdom', code: 'UK' },
  { label: 'Canada', code: 'CA' },
  // ...more
];

function AddressForm() {
  const [country, setCountry] = useState<typeof countries[0] | null>(null);
  const [region, setRegion] = useState('');

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Form.Stack spacing={2}>
        <Autocomplete
          options={countries}
          value={country}
          onChange={(_, newValue) => {
            setCountry(newValue);
            setRegion('');
          }}
          renderInput={(params) => (
            <TextField {...params} labelPlacement="top" label="Country" required />
          )}
        />

        {/* Free text, so it works for any country */}
        <TextField
          fullWidth
          labelPlacement="top"
          label="State, province, or region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        />

        <TextField fullWidth labelPlacement="top" label="City" required />
        <TextField fullWidth labelPlacement="top" label="Address" required multiline rows={2} />
        {/* Optional field: no marker */}
        <TextField fullWidth labelPlacement="top" label="Postal code" />
      </Form.Stack>

      <Button variant="contained" sx={{ mt: 3 }}>
        Save address
      </Button>
    </Box>
  );
}
```
