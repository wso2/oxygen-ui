/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { AlertTriangle } from '@wso2/oxygen-ui-icons-react';
import type { ConfirmDialogProps } from './types';

/**
 * AppShellConfirmDialog - Reusable confirmation dialog component.
 *
 * A modal dialog for confirming user actions, especially for destructive
 * operations like deletions. Includes loading state support for async operations.
 *
 * Features:
 * - Customizable title, message, and button labels
 * - Destructive variant with red confirm button and warning icon
 * - Loading state with spinner on confirm button
 * - Proper focus management and accessibility
 * - Prevents closing while loading
 *
 * Usage:
 * ```tsx
 * // Standard confirmation
 * <AppShellConfirmDialog
 *   open={confirmOpen}
 *   title="Confirm Action"
 *   message="Are you sure you want to proceed?"
 *   onConfirm={handleConfirm}
 *   onCancel={() => setConfirmOpen(false)}
 * />
 *
 * // Destructive action (delete)
 * <AppShellConfirmDialog
 *   open={deleteOpen}
 *   title="Delete Item"
 *   message="This action cannot be undone. Are you sure?"
 *   destructive
 *   confirmLabel="Delete"
 *   loading={isDeleting}
 *   onConfirm={handleDelete}
 *   onCancel={() => setDeleteOpen(false)}
 * />
 * ```
 */
export const AppShellConfirmDialog: React.FC<
  ConfirmDialogProps & { sx?: SxProps<Theme> }
> = ({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
  sx,
}) => {
  const handleClose = (_event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    // Prevent closing while loading
    if (loading) return;
    // Only close on escape, not backdrop click for destructive actions
    if (destructive && reason === 'backdropClick') return;
    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={sx}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pb: 1,
        }}
      >
        {destructive && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'error.light',
              color: 'error.main',
            }}
          >
            <AlertTriangle size={20} />
          </Box>
        )}
        {title}
      </DialogTitle>

      <DialogContent>
        {typeof message === 'string' ? (
          <DialogContentText id="confirm-dialog-description">
            {message}
          </DialogContentText>
        ) : (
          <Box id="confirm-dialog-description">{message}</Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onCancel}
          disabled={loading}
          variant="outlined"
          color="inherit"
          sx={{
            color: 'text.secondary',
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'text.secondary',
              bgcolor: 'action.hover',
            },
          }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color={destructive ? 'error' : 'primary'}
          autoFocus={!destructive}
          sx={{ minWidth: 100 }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            confirmLabel
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppShellConfirmDialog;
