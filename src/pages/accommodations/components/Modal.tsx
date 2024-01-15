import { ConfirmationModalProps } from '@src/types/accommodation.types';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';

export default function ConfirmationModal({ open, onClose, onConfirm }: ConfirmationModalProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this accommodation?</DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>No</Button>
          <Button autoFocus onClick={onConfirm}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
